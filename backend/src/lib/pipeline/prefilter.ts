import { lmStudioProvider } from "@/lib/llm/openai-compat";
import { generateStructured } from "@/lib/llm/provider";
import { prefilterSchema, prefilterJsonSchema } from "@/lib/llm/schema";
import { buildPrefilterPrompt, type IndexedSentence } from "@/lib/llm/prompt";
import { parseJson } from "@/lib/llm/parse";

/**
 * Menyaring kalimat relevan via local LLM.
 * - Output valid namun kosong / tak sesuai skema → fallback semua kalimat.
 * - Kesalahan layanan (LM Studio tidak aktif) → dilempar agar pipeline gagal jelas.
 */
export async function prefilterSentences(
  sentences: IndexedSentence[],
): Promise<number[]> {
  if (sentences.length === 0) return [];

  const { system, user } = buildPrefilterPrompt(sentences);
  // Error layanan (ECONNREFUSED, 5xx) diteruskan ke atas → status dokumen failed.
  const raw = await generateStructured(
    lmStudioProvider,
    { systemPrompt: system, userPrompt: user, jsonSchema: prefilterJsonSchema },
    "prefilter local",
  );

  let kept: number[] | null = null;
  try {
    const parsed = prefilterSchema.safeParse(parseJson(raw));
    if (parsed.success) {
      const valid = new Set(sentences.map((s) => s.index));
      kept = [...new Set(parsed.data.relevant_sentence_ids)].filter((i) =>
        valid.has(i),
      );
    }
  } catch {
    kept = null;
  }

  if (!kept || kept.length === 0) {
    return sentences.map((s) => s.index);
  }
  return kept.sort((a, b) => a - b);
}