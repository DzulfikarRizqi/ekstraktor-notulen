import { z } from "zod";

export const userStorySchema = z.object({
  actor: z.string().min(1),
  action: z.string().min(1),
  benefit: z.string(),
  source_sentence_ids: z.array(z.number().int().min(0)).min(1),
});

export const userStoriesSchema = z.object({
  user_stories: z.array(userStorySchema).min(1).max(30),
});

export const prefilterSchema = z.object({
  relevant_sentence_ids: z.array(z.number().int().min(0)),
});

export const verificationSchema = z.object({
  is_valid: z.boolean(),
  confidence_score: z.number().min(0).max(1),
  reason: z.string(),
});

export type UserStoryOutput = z.infer<typeof userStorySchema>;
export type PrefilterOutput = z.infer<typeof prefilterSchema>;
export type VerificationOutput = z.infer<typeof verificationSchema>;

type JsonSchema = Record<string, unknown>;

const stripMeta = (schema: JsonSchema): JsonSchema => {
  const copy = { ...schema };
  delete copy.$schema;
  return copy;
};

const nativeJson = (schema: z.ZodType): JsonSchema =>
  stripMeta(schema.toJSONSchema());

export const userStoriesJsonSchema = nativeJson(userStoriesSchema);
export const prefilterJsonSchema = nativeJson(prefilterSchema);
export const verificationJsonSchema = nativeJson(verificationSchema);

export const userStoriesGeminiSchema = userStoriesSchema.toJSONSchema();