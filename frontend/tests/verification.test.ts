import { afterEach, describe, expect, it, vi } from "vitest";
import { cosineSimilarity } from "@/lib/embedding/similarity";
import { geminiProvider } from "@/lib/llm/gemini";
import { lmStudioProvider } from "@/lib/llm/openai-compat";
import { decideStatus, verifyStories } from "@/lib/pipeline/verification";

vi.mock("@/lib/embedding/embedder", () => ({
  embedTexts: vi.fn(async (texts: string[]) => texts.map(() => [1, 1])),
}));

afterEach(() => vi.restoreAllMocks());

describe("cosineSimilarity", () => {
  it("kembalikan 1 untuk vektor identik", () => {
    expect(cosineSimilarity([1, 0, 0], [1, 0, 0])).toBeCloseTo(1, 6);
  });

  it("kembalikan 0 untuk vektor tegak lurus", () => {
    expect(cosineSimilarity([1, 0], [0, 1])).toBeCloseTo(0, 6);
  });

  it("menangani panjang berbeda / kosong", () => {
    expect(cosineSimilarity([], [])).toBe(0);
    expect(cosineSimilarity([1, 0], [1])).toBe(0);
  });
});

describe("decideStatus", () => {
  it("valid bila is_valid dan confidence & similarity tinggi", () => {
    expect(
      decideStatus({ is_valid: true, confidence_score: 0.9 }, 0.8),
    ).toBe("valid");
  });

  it("needs_review bila is_valid false", () => {
    expect(decideStatus({ is_valid: false, confidence_score: 0.9 }, 0.9)).toBe(
      "needs_review",
    );
  });

  it("needs_review bila confidence rendah", () => {
    expect(decideStatus({ is_valid: true, confidence_score: 0.4 }, 0.9)).toBe(
      "needs_review",
    );
  });

  it("diturunkan bila similarity rendah (embedding cadangan)", () => {
    expect(decideStatus({ is_valid: true, confidence_score: 0.9 }, 0.3)).toBe(
      "needs_review",
    );
  });

  it("valid bila similarity null (fallback nonaktif)", () => {
    expect(decideStatus({ is_valid: true, confidence_score: 0.9 }, null)).toBe(
      "valid",
    );
  });
});

describe("verifyStories", () => {
  it("memakai provider sesuai mode dan satu panggilan per citation", async () => {
    const gemini = vi
      .spyOn(geminiProvider, "generateStructured")
      .mockResolvedValue(
        JSON.stringify({
          user_story_id: 0,
          is_valid: true,
          confidence_score: 0.9,
          reason: "sesuai",
        }),
      );
    const local = vi.spyOn(lmStudioProvider, "generateStructured");

    const result = await verifyStories(
      [
        {
          id: 0,
          key: "story-1",
          actor: "Admin",
          action: "mencetak laporan",
          benefit: "",
          sourceIndices: [0, 1],
        },
      ],
      [
        { index: 0, text: "Admin mencetak laporan." },
        { index: 1, text: "Admin mencetak rekap." },
      ],
      "gemini",
    );

    expect(gemini).toHaveBeenCalledTimes(2);
    expect(local).not.toHaveBeenCalled();
    expect(result[0]).toHaveLength(2);
    expect(result[0][0].verificationStatus).toBe("valid");
  });
});