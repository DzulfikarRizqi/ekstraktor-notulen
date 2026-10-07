import { describe, expect, it } from "vitest";
import {
  EXTRACTION_EXAMPLE_OUTPUT,
  PREFILTER_EXAMPLE_OUTPUT,
  VERIFICATION_EXAMPLE_INVALID_OUTPUT,
  VERIFICATION_EXAMPLE_VALID_OUTPUT,
  buildExtractionPrompt,
  buildPrefilterPrompt,
  buildVerificationPrompt,
} from "@/lib/llm/prompt";
import {
  prefilterSchema,
  userStoriesSchema,
  verificationSchema,
} from "@/lib/llm/schema";

describe("prompt examples validate against schemas", () => {
  it("prefilter example output validates", () => {
    const result = prefilterSchema.safeParse(JSON.parse(PREFILTER_EXAMPLE_OUTPUT));
    expect(result.success).toBe(true);
  });

  it("extraction example output validates", () => {
    const result = userStoriesSchema.safeParse(JSON.parse(EXTRACTION_EXAMPLE_OUTPUT));
    expect(result.success).toBe(true);
  });

  it("verification valid example output validates", () => {
    const result = verificationSchema.safeParse(JSON.parse(VERIFICATION_EXAMPLE_VALID_OUTPUT));
    expect(result.success).toBe(true);
  });

  it("verification invalid example output validates", () => {
    const result = verificationSchema.safeParse(JSON.parse(VERIFICATION_EXAMPLE_INVALID_OUTPUT));
    expect(result.success).toBe(true);
  });
});

describe("prompt sections structure", () => {
  it("prefilter prompt has standardized sections", () => {
    const sentences = [{ index: 0, text: "test" }];
    const prompts = buildPrefilterPrompt(sentences);
    expect(prompts.user).toContain("=== CONTOH INPUT ===");
    expect(prompts.user).toContain("=== CONTOH OUTPUT ===");
    expect(prompts.user).toContain("=== INPUT NYATA ===");
    expect(prompts.user).toContain("=== FORMAT JSON WAJIB ===");
  });

  it("extraction prompt has standardized sections", () => {
    const sentences = [{ index: 0, text: "test" }];
    const prompts = buildExtractionPrompt(sentences);
    expect(prompts.user).toContain("=== CONTOH INPUT ===");
    expect(prompts.user).toContain("=== CONTOH OUTPUT ===");
    expect(prompts.user).toContain("=== INPUT NYATA ===");
    expect(prompts.user).toContain("=== FORMAT JSON WAJIB ===");
  });

  it("verification prompt has standardized sections and user story id", () => {
    const prompts = buildVerificationPrompt({
      sentenceIndex: 0,
      sentenceText: "test sentence",
      story: { id: 0, actor: "A", action: "B", benefit: "" },
    });
    expect(prompts.user).toContain("=== CONTOH INPUT (VALID) ===");
    expect(prompts.user).toContain("=== CONTOH OUTPUT (VALID) ===");
    expect(prompts.user).toContain("=== CONTOH INPUT (TIDAK VALID) ===");
    expect(prompts.user).toContain("=== CONTOH OUTPUT (TIDAK VALID) ===");
    expect(prompts.user).toContain("=== INPUT NYATA ===");
    expect(prompts.user).toContain("=== FORMAT JSON WAJIB ===");
    expect(prompts.user).toContain("User Story ID: 0");
  });
});