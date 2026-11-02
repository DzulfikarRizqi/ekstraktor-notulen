import { afterEach, describe, expect, it, vi } from "vitest";

import { geminiProvider } from "@/lib/llm/gemini";
import { lmStudioProvider } from "@/lib/llm/openai-compat";
import { prefilterSentences } from "@/lib/pipeline/prefilter";

const sentences = [
  { index: 0, text: "Selamat pagi semuanya." },
  { index: 1, text: "Kita bahas fitur login." },
  { index: 2, text: "User harus bisa reset password via email." },
  { index: 3, text: "Ya sudah, mari kita makan siang." },
];

describe("prefilterSentences", () => {
  afterEach(() => vi.restoreAllMocks());

  it("memakai nomor relevan yang valid & diurutkan", async () => {
    vi.spyOn(lmStudioProvider, "generateStructured").mockResolvedValue(
      '{"relevant_sentence_ids": [2, 1]}',
    );
    const result = await prefilterSentences(sentences);
    expect(result).toEqual([1, 2]);
  });

  it("fallback semua bila output kosong", async () => {
    vi.spyOn(lmStudioProvider, "generateStructured").mockResolvedValue(
      '{"relevant_sentence_ids": []}',
    );
    const result = await prefilterSentences(sentences);
    expect(result).toEqual([0, 1, 2, 3]);
  });

  it("fallback semua bila output bukan JSON", async () => {
    vi.spyOn(lmStudioProvider, "generateStructured").mockResolvedValue(
      "maaf, tidak ada",
    );
    const result = await prefilterSentences(sentences);
    expect(result).toEqual([0, 1, 2, 3]);
  });

  it("membuang nomor di luar rentang (anti-halusinasi index)", async () => {
    vi.spyOn(lmStudioProvider, "generateStructured").mockResolvedValue(
      '{"relevant_sentence_ids": [1, 99]}',
    );
    const result = await prefilterSentences(sentences);
    expect(result).toEqual([1]);
  });

  it("memecah dokumen besar menjadi beberapa panggilan LLM", async () => {
    // Budget 6000 token × 4 char/token = 24.000 karakter per batch.
    // 26 kalimat × 910 char ≈ 23.660 → muat; kalimat ke-27 memicu batch baru.
    const long = Array.from({ length: 60 }, (_, i) => ({
      index: i,
      text: "K".repeat(900),
    }));
    const spy = vi
      .spyOn(lmStudioProvider, "generateStructured")
      .mockResolvedValue('{"relevant_sentence_ids": [0]}');
    const result = await prefilterSentences(long);
    expect(spy).toHaveBeenCalledTimes(3);
    // Setiap batch memvalidasi index di rentangnya sendiri; index 0 hanya
    // valid di batch pertama, dua batch berikutnya fallback penuh.
    expect(result).toEqual([
      0,
      ...Array.from({ length: 34 }, (_, i) => 26 + i),
    ]);
  });

  it("Gemini memakai satu panggilan untuk dokumen besar", async () => {
    const long = Array.from({ length: 60 }, (_, i) => ({
      index: i,
      text: "K".repeat(900),
    }));
    const spy = vi
      .spyOn(geminiProvider, "generateStructured")
      .mockResolvedValue('{"relevant_sentence_ids": [0]}');

    const result = await prefilterSentences(long, "gemini");

    expect(spy).toHaveBeenCalledTimes(1);
    expect(result).toEqual([0]);
  });

  it("fallback per-batch: batch invalid tidak membatalkan batch lain", async () => {
    const long = Array.from({ length: 60 }, (_, i) => ({
      index: i,
      text: "K".repeat(900),
    }));
    const spy = vi
      .spyOn(lmStudioProvider, "generateStructured")
      .mockResolvedValueOnce("maaf, tidak ada")
      .mockResolvedValueOnce('{"relevant_sentence_ids": [30]}')
      .mockResolvedValueOnce('{"relevant_sentence_ids": [55]}');
    const result = await prefilterSentences(long);
    expect(spy).toHaveBeenCalledTimes(3);
    // Batch 1 (0-25) invalid → fallback semua; batch 2 (26-51) → hanya 30; batch 3 (52-59) → hanya 55.
    expect(result).toEqual([
      ...Array.from({ length: 26 }, (_, i) => i),
      30,
      55,
    ]);
  });
});
