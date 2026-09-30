import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    env: {
      GEMINI_API_KEY: "test-key",
      GEMINI_MODEL: "gemini-2.5-flash",
      LM_STUDIO_BASE_URL: "http://localhost:1234/v1",
      LM_STUDIO_MODEL: "qwen2.5-3b",
      CONF_THRESHOLD: "0.6",
      EMBED_VERIFY_THRESHOLD: "0.5",
      USE_EMBEDDING_FALLBACK: "true",
      DATABASE_URL: "file:./dev.db",
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});