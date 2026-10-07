import { describe, expect, it } from "vitest";
import { parseJson } from "@/lib/llm/parse";
import {
  userStoriesSchema,
  prefilterSchema,
  verificationSchema,
  userStoriesJsonSchema,
} from "@/lib/llm/schema";

describe("parseJson", () => {
  it("parse objek polos", () => {
    expect(parseJson('{"a":1}')).toEqual({ a: 1 });
  });

  it("mengabaikan fenced code block json", () => {
    expect(parseJson("```json\n{\"a\":1}\n```")).toEqual({ a: 1 });
  });

  it("membuang teks di depan JSON", () => {
    expect(parseJson("berikut hasilnya: {\"a\":1}")).toEqual({ a: 1 });
  });

  it("melempar error bila bukan JSON", () => {
    expect(() => parseJson("tidak ada json")).toThrow();
  });
});

describe("kontrak schema LLM", () => {
  it("user_stories: min 1, max 30, source_sentence_ids 0-based minimal 1", () => {
    expect(userStoriesJsonSchema).toMatchObject({
      type: "object",
      properties: {
        user_stories: { maxItems: 30 },
      },
      required: ["user_stories"],
    });
  });

  it("west source_sentence_ids memakai integer minimum 0", () => {
    const items = (userStoriesJsonSchema.properties as {
      user_stories: Record<string, unknown>;
    }).user_stories;
    expect(items).toMatchObject({
      items: {
        properties: {
          source_sentence_ids: { minItems: 1 },
        },
      },
    });
  });

  it("validasi output ekstraksi happy path", () => {
    const result = userStoriesSchema.safeParse({
      user_stories: [
        {
          actor: "Admin",
          action: "mencetak laporan",
          benefit: "",
          source_sentence_ids: [0, 3],
        },
      ],
    });
    expect(result.success).toBe(true);
  });

  it("tolak index negatif pada source_sentence_ids", () => {
    const result = userStoriesSchema.safeParse({
      user_stories: [
        { actor: "a", action: "b", benefit: "", source_sentence_ids: [-1] },
      ],
    });
    expect(result.success).toBe(false);
  });

  it("tolak lebih dari 30 story", () => {
    const stories = Array.from({ length: 31 }, (_, i) => ({
      actor: "a",
      action: `b${i}`,
      benefit: "",
      source_sentence_ids: [0],
    }));
    expect(userStoriesSchema.safeParse({ user_stories: stories }).success).toBe(false);
  });

  it("prefilter & verification schema factous", () => {
    expect(
      prefilterSchema.safeParse({ relevant_sentence_ids: [1, 2] }).success,
    ).toBe(true);
    expect(
      verificationSchema.safeParse({
        user_story_id: 0,
        is_valid: true,
        confidence_score: 0.98,
        reason: "ok",
      }).success,
    ).toBe(true);
  });
});