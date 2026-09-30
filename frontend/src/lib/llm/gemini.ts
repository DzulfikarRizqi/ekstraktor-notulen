import { GoogleGenAI } from "@google/genai";
import { config } from "@/lib/config";
import { LlmError, isRetryableStatus } from "./errors";
import type { LlmProvider, StructuredRequest } from "./provider";

let client: GoogleGenAI | null = null;

const getClient = (): GoogleGenAI => {
  if (!client) {
    client = new GoogleGenAI({ apiKey: config.GEMINI_API_KEY });
  }
  return client;
};

export const geminiProvider: LlmProvider = {
  name: "gemini",
  async generateStructured(req: StructuredRequest): Promise<string> {
    try {
      const response = await getClient().models.generateContent({
        model: config.GEMINI_MODEL,
        contents: [{ role: "user", parts: [{ text: req.userPrompt }] }],
        config: {
          systemInstruction: req.systemPrompt,
          responseMimeType: "application/json",
          responseSchema: req.jsonSchema,
          temperature: req.temperature ?? 0.2,
        },
      });
      const text = response.text;
      if (!text) {
        const status = response.sdkHttpResponse?.responseInternal.status;
        throw new LlmError("Gemini tidak mengembalikan teks", {
          status,
          retryable: status != null && isRetryableStatus(status),
        });
      }
      return text;
    } catch (e) {
      if (e instanceof LlmError) throw e;
      throw e;
    }
  },
};