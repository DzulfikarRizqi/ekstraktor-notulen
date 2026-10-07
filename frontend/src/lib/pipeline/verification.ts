import { config } from "@/lib/config";
import { embedTexts } from "@/lib/embedding/embedder";
import { cosineSimilarity } from "@/lib/embedding/similarity";
import { lmStudioProvider } from "@/lib/llm/openai-compat";
import { generateStructured } from "@/lib/llm/provider";
import {
  verificationSchema,
  verificationJsonSchema,
} from "@/lib/llm/schema";
import {
  buildVerificationPrompt,
  type IndexedSentence,
} from "@/lib/llm/prompt";
import { parseJson } from "@/lib/llm/parse";
import type { VerificationStatus } from "@/types";

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

  const results: CitationVerdict[][] = [];
  for (let s = 0; s < stories.length; s++) {
    const story = stories[s];
    const citations: CitationVerdict[] = [];

    for (const sourceIndex of story.sourceIndices) {
      const sentence = textOf(sentences, sourceIndex);
      const similarity =
        storyVecs && sentenceVecs
          ? cosineSimilarity(storyVecs[s], vecByIndex.get(sourceIndex) ?? [])
          : null;

      if (!sentence) {
        citations.push({
          sourceIndex,
          llmVerdict: false,
          confidenceScore: null,
          llmReason: "Index sumber di luar rentang kalimat (butuh review).",
          embeddingSimilarity: similarity,
          verificationStatus: "needs_review",
        });
        continue;
      }

      const { system, user } = buildVerificationPrompt({
        sentenceIndex: sourceIndex,
        sentenceText: sentence.text,
        story: { id: story.id, actor: story.actor, action: story.action, benefit: story.benefit },
      });

      const raw = await generateStructured(
        lmStudioProvider,
        {
          systemPrompt: system,
          userPrompt: user,
          jsonSchema: verificationJsonSchema,
        },
        "verifikasi local",
      );
      const result = verificationSchema.parse(parseJson(raw));

      citations.push({
        sourceIndex,
        llmVerdict: result.is_valid,
        confidenceScore: result.confidence_score,
        llmReason: result.reason,
        embeddingSimilarity: similarity,
        verificationStatus: decideStatus(result, similarity),
      });
    }
    results.push(citations);
  }

  return results;
}