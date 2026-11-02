import { config } from "@/lib/config";
import { embedTexts } from "@/lib/embedding/embedder";
import { cosineSimilarity } from "@/lib/embedding/similarity";
import { geminiProvider } from "@/lib/llm/gemini";
import { lmStudioProvider } from "@/lib/llm/openai-compat";
import { generateStructured } from "@/lib/llm/provider";
import {
  verificationSchema,
  verificationJsonSchema,
  verificationGeminiSchema,
} from "@/lib/llm/schema";
import {
  buildVerificationPrompt,
  type IndexedSentence,
} from "@/lib/llm/prompt";
import { parseJson } from "@/lib/llm/parse";
import { withRetry } from "@/lib/retry";
import type { PipelineProvider, VerificationStatus } from "@/types";

export interface StoryToVerify {
  id: number;
  key: string;
  actor: string;
  action: string;
  benefit: string;
  sourceIndices: number[];
}

export interface CitationVerdict {
  sourceIndex: number;
  llmVerdict: boolean;
  confidenceScore: number | null;
  llmReason: string | null;
  embeddingSimilarity: number | null;
  verificationStatus: VerificationStatus;
}

const textOf = (sentences: IndexedSentence[], index: number): IndexedSentence | undefined =>
  sentences.find((s) => s.index === index);

export function decideStatus(
  verdict: { is_valid: boolean; confidence_score: number },
  similarity: number | null,
): VerificationStatus {
  if (!verdict.is_valid) return "needs_review";
  if (verdict.confidence_score < config.CONF_THRESHOLD) return "needs_review";
  if (similarity != null && similarity < config.EMBED_VERIFY_THRESHOLD) {
    return "needs_review";
  }
  return "valid";
}

export async function verifyStories(
  stories: StoryToVerify[],
  sentences: IndexedSentence[],
  mode: PipelineProvider = config.EXTRACT_PROVIDER,
): Promise<CitationVerdict[][]> {
  const useEmbedding = config.USE_EMBEDDING_FALLBACK;

  let sentenceVecs: number[][] | null = null;
  let storyVecs: number[][] | null = null;
  if (useEmbedding) {
    [sentenceVecs, storyVecs] = await Promise.all([
      embedTexts(sentences.map((s) => `passage: ${s.text}`)),
      embedTexts(stories.map((st) => `query: ${st.actor} ${st.action} ${st.benefit}`)),
    ]);
  }
  const vecByIndex = new Map<number, number[]>();
  if (sentenceVecs) {
    sentences.forEach((s, i) => vecByIndex.set(s.index, sentenceVecs![i]));
  }

  const llm = mode === "gemini" ? geminiProvider : lmStudioProvider;
  const jsonSchema =
    mode === "gemini" ? verificationGeminiSchema : verificationJsonSchema;
  // Satu panggilan per citation. Gemini lebih toleran konkurensi; LM Studio
  // lokal diproses berurutan agar tidak membebani model/VRAM.
  const concurrency = mode === "gemini" ? 4 : 1;

  const results: CitationVerdict[][] = stories.map(
    (story) => new Array<CitationVerdict>(story.sourceIndices.length),
  );
  const tasks: Array<() => Promise<void>> = [];

  for (let s = 0; s < stories.length; s++) {
    const story = stories[s];

    for (let c = 0; c < story.sourceIndices.length; c++) {
      const sourceIndex = story.sourceIndices[c];
      const sentence = textOf(sentences, sourceIndex);
      const similarity =
        storyVecs && sentenceVecs
          ? cosineSimilarity(storyVecs[s], vecByIndex.get(sourceIndex) ?? [])
          : null;

      if (!sentence) {
        results[s][c] = {
          sourceIndex,
          llmVerdict: false,
          confidenceScore: null,
          llmReason: "Index sumber di luar rentang kalimat (butuh review).",
          embeddingSimilarity: similarity,
          verificationStatus: "needs_review",
        };
        continue;
      }

      const { system, user } = buildVerificationPrompt({
        sentenceIndex: sourceIndex,
        sentenceText: sentence.text,
        story: { id: story.id, actor: story.actor, action: story.action, benefit: story.benefit },
      });

      tasks.push(async () => {
        const raw = await withRetry(() =>
          generateStructured(
            llm,
            {
              systemPrompt: system,
              userPrompt: user,
              jsonSchema,
            },
            `verifikasi ${llm.name}`,
          ),
        );
        const result = verificationSchema.parse(parseJson(raw));

        results[s][c] = {
          sourceIndex,
          llmVerdict: result.is_valid,
          confidenceScore: result.confidence_score,
          llmReason: result.reason,
          embeddingSimilarity: similarity,
          verificationStatus: decideStatus(result, similarity),
        };
      });
    }
  }

  let cursor = 0;
  const worker = async (): Promise<void> => {
    for (;;) {
      const index = cursor++;
      if (index >= tasks.length) return;
      await tasks[index]();
    }
  };
  await Promise.all(
    Array.from({ length: Math.min(concurrency, tasks.length) }, () => worker()),
  );

  return results;
}