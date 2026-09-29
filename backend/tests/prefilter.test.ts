import { afterEach, describe, expect, it, vi } from "vitest";

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
});