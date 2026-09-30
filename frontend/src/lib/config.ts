import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1).default("file:./dev.db"),
  GEMINI_API_KEY: z.string().min(1),
  GEMINI_MODEL: z.string().default("gemini-2.5-flash"),
  LM_STUDIO_BASE_URL: z.string().url().default("http://localhost:1234/v1"),
  LM_STUDIO_MODEL: z.string().default("qwen2.5-3b"),
  CONF_THRESHOLD: z.coerce.number().min(0).max(1).default(0.6),
  EMBED_VERIFY_THRESHOLD: z.coerce.number().min(0).max(1).default(0.5),
  USE_EMBEDDING_FALLBACK: z
    .enum(["true", "false"])
    .default("true")
    .transform((v) => v === "true"),
  EMBEDDING_MODEL: z.string().default("Xenova/multilingual-e5-small"),
});

export type AppConfig = z.infer<typeof envSchema>;

function loadConfig(): AppConfig {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("; ");
    throw new Error(`Konfigurasi environment tidak valid: ${issues}`);
  }
  return parsed.data;
}

export const config: AppConfig = loadConfig();