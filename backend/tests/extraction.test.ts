import { afterEach, describe, expect, it, vi } from "vitest";

import { geminiProvider } from "@/lib/llm/gemini";
import { extractUserStories } from "@/lib/pipeline/extraction";

const goodStories = {
  user_stories: [
    { actor: "Admin", action: "mencetak laporan", benefit: "", source_sentence_ids: [0] },
    { actor: "Admin", action: "mencetak laporan", benefit: "", source_sentence_ids: [0] },
  ],
};

describe("extractUserStories", () => {
  afterEach(() => vi.restoreAllMocks());

  it("menghilangkan duplikat", async () => {
    vi.spyOn(geminiProvider, "generateStructured").mockResolvedValue(
      JSON.stringify(goodStories),
    );
    const result = await extractUserStories([
      { index: 0, text: "Admin cetak laporan." },
    ]);
    expect(result.stories).toHaveLength(1);
    expect(result.truncated).toBe(false);
  });

  it("menolak output >30 story (kontrak maks 30)", async () => {
    const stories = Array.from({ length: 35 }, (_, i) => ({
      actor: "Admin",
      action: `aksi ${i}`,
      benefit: "",
      source_sentence_ids: [0],
    }));
    vi.spyOn(geminiProvider, "generateStructured").mockResolvedValue(
      JSON.stringify({ user_stories: stories }),
    );
    await expect(extractUserStories([{ index: 0, text: "x" }])).rejects.toThrow();
  });

  it("melakukan 1× repair retry bila output pertama invalid", async () => {
    const spy = vi
      .spyOn(geminiProvider, "generateStructured")
      .mockResolvedValueOnce('{"user_stories": "bukan array"}')
      .mockResolvedValueOnce(JSON.stringify(goodStories));
    const result = await extractUserStories([{ index: 0, text: "x" }]);
    expect(spy).toHaveBeenCalledTimes(2);
    expect(result.stories).toHaveLength(1);
  });

  it("gagal bila repair retry tetap invalid", async () => {
    vi.spyOn(geminiProvider, "generateStructured").mockResolvedValue(
      '{"user_stories": "bukan array"}',
    );
    await expect(extractUserStories([{ index: 0, text: "x" }])).rejects.toThrow();
  });
});