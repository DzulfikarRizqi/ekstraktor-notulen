import { config } from "@/lib/config";
import { geminiProvider } from "@/lib/llm/gemini";
import { lmStudioProvider } from "@/lib/llm/openai-compat";
import { generateStructured } from "@/lib/llm/provider";
import {
  prefilterSchema,
  prefilterJsonSchema,
  prefilterGeminiSchema,
} from "@/lib/llm/schema";
import { buildPrefilterPrompt, type IndexedSentence } from "@/lib/llm/prompt";
import { parseJson } from "@/lib/llm/parse";
import { withRetry } from "@/lib/retry";
import type { PipelineProvider } from "@/types";

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
 * Menyaring kalimat relevan via provider pipeline. Mode LM Studio memecah
 * kalimat menjadi batch agar prompt tidak melampaui context window (mis.
 * n_ctx 8192); mode Gemini mengirim seluruh dokumen dalam satu panggilan.
 * Output kosong/invalid per batch → semua kalimat batch lolos. Kesalahan
 * layanan (provider tidak aktif) → dilempar ke atas agar pipeline gagal jelas.
 */
export async function prefilterSentences(
  sentences: IndexedSentence[],
  provider: PipelineProvider = config.EXTRACT_PROVIDER,
): Promise<number[]> {
  if (sentences.length === 0) return [];

  const llm = provider === "gemini" ? geminiProvider : lmStudioProvider;
  const jsonSchema =
    provider === "gemini" ? prefilterGeminiSchema : prefilterJsonSchema;
  // Gemini punya context window besar: satu panggilan untuk seluruh dokumen.
  const chunks =
    provider === "gemini"
      ? [sentences]
      : chunkSentences(sentences, config.PREFILTER_BATCH_TOKENS);
  const kept: number[] = [];

  for (const chunk of chunks) {
    const { system, user } = buildPrefilterPrompt(chunk);
    // Error layanan (ECONNREFUSED, 5xx) diteruskan ke atas → status dokumen failed.
    const raw = await withRetry(() =>
      generateStructured(
        llm,
        { systemPrompt: system, userPrompt: user, jsonSchema },
        `prefilter ${llm.name}`,
      ),
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
