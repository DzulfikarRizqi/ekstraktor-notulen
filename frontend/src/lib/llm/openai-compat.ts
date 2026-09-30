import OpenAI from "openai";
import { config } from "@/lib/config";
import type { LlmProvider, StructuredRequest } from "./provider";

let client: OpenAI | null = null;

const getClient = (): OpenAI => {
  if (!client) {
    client = new OpenAI({
      apiKey: "lm-studio",
      baseURL: config.LM_STUDIO_BASE_URL,
    });
  }
  return client;
};

export const lmStudioProvider: LlmProvider = {
  name: "lm-studio",
  async generateStructured(req: StructuredRequest): Promise<string> {
    const completion = await getClient().chat.completions.create({
      model: config.LM_STUDIO_MODEL,
      temperature: req.temperature ?? 0,
      messages: [
        { role: "system", content: req.systemPrompt },
        { role: "user", content: req.userPrompt },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "structured_output",
          strict: false,
          schema: req.jsonSchema,
        },
      },
    });
    const content = completion.choices[0]?.message?.content ?? null;
    if (content == null) {
      throw new Error("LM Studio tidak mengembalikan konten.");
    }
    return content;
  },
};