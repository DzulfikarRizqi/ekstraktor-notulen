import { describe, expect, it } from "vitest";
import { cosineSimilarity } from "@/lib/embedding/similarity";
import { decideStatus } from "@/lib/pipeline/verification";

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