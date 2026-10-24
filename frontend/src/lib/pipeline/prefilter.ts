import { config } from "@/lib/config";
import { lmStudioProvider } from "@/lib/llm/openai-compat";
import { generateStructured } from "@/lib/llm/provider";
import { prefilterSchema, prefilterJsonSchema } from "@/lib/llm/schema";
import { buildPrefilterPrompt, type IndexedSentence } from "@/lib/llm/prompt";
import { parseJson } from "@/lib/llm/parse";

// Estimasi kasar: ~4 karakter per token untuk teks rapat campuran ID/EN.
const CHARS_PER_TOKEN = 4;

/**
 * Pecah kalimat menjadi batch agar prompt per panggilan tetap di bawah
 * context window model lokal. Aman terhadap salah estimasi: batch hanya
 * menentukan jumlah panggilan, bukan kebenaran hasil.
 */
function chunkSentences(
  sentences: IndexedSentence[],
  batchTokens: number,
): IndexedSentence[][] {
  const budget = batchTokens * CHARS_PER_TOKEN;
  const chunks: IndexedSentence[][] = [];
  let current: IndexedSentence[] = [];
  let used = 0;
  for (const sentence of sentences) {
    // "[index] text\n" — panjang teks + ~10 karakter markup.
    const cost = sentence.text.length + 10;
    if (current.length > 0 && used + cost > budget) {
      chunks.push(current);
      current = [];
      used = 0;
    }
    current.push(sentence);
    used += cost;
  }
  if (current.length > 0) chunks.push(current);
  return chunks;
}

/**
 * Menyaring kalimat relevan via local LLM, dalam batch agar prompt tidak
 * melampaui context window (mis. n_ctx 8192). Perilaku fallback per batch
 * konsisten dengan perilaku lama: output kosong/invalid → semua kalimat
 * batch lolos. Kesalahan layanan (LM Studio tidak aktif) → dilempar ke atas
 * agar pipeline gagal jelas.
 */
export async function prefilterSentences(
  sentences: IndexedSentence[],
): Promise<number[]> {
  if (sentences.length === 0) return [];

  const chunks = chunkSentences(sentences, config.PREFILTER_BATCH_TOKENS);
  const kept: number[] = [];

  for (const chunk of chunks) {
    const { system, user } = buildPrefilterPrompt(chunk);
    // Error layanan (ECONNREFUSED, 5xx) diteruskan ke atas → status dokumen failed.
    const raw = await generateStructured(
      lmStudioProvider,
      { systemPrompt: system, userPrompt: user, jsonSchema: prefilterJsonSchema },
      "prefilter local",
    );

    let batchKept: number[] | null = null;
    try {
      const parsed = prefilterSchema.safeParse(parseJson(raw));
      if (parsed.success) {
        const valid = new Set(chunk.map((s) => s.index));
        batchKept = [...new Set(parsed.data.relevant_sentence_ids)].filter((i) =>
          valid.has(i),
        );
      }
    } catch {
      batchKept = null;
    }

    if (!batchKept || batchKept.length === 0) {
      kept.push(...chunk.map((s) => s.index));
    } else {
      kept.push(...batchKept);
    }
  }

  return kept.sort((a, b) => a - b);
}
