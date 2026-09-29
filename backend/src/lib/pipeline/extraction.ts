import { geminiProvider } from "@/lib/llm/gemini";
import { generateStructured } from "@/lib/llm/provider";
import {
  userStoriesSchema,
  userStoriesGeminiSchema,
  type UserStoryOutput,
} from "@/lib/llm/schema";
import {
  buildExtractionPrompt,
  buildExtractionRepairPrompt,
  type IndexedSentence,
} from "@/lib/llm/prompt";
import { parseJson } from "@/lib/llm/parse";
import { withRetry } from "@/lib/retry";

export interface ExtractionResult {
  stories: UserStoryOutput[];
  truncated: boolean;
}

const parseStories = (raw: string): UserStoryOutput[] => {
  const parsed = userStoriesSchema.safeParse(parseJson(raw));
  if (!parsed.success) {
    const details = parsed.error.issues
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("; ");
    throw new TypeError(`Narasi halo: output tak memenuhi skema: ${details}`);
  }
  return dedupe(parsed.data.user_stories);
};

const dedupe = (stories: UserStoryOutput[]): UserStoryOutput[] => {
  const seen = new Set<string>();
  const result: UserStoryOutput[] = [];
  for (const s of stories) {
    const key = `${s.actor}|${s.action}|${s.benefit}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(s);
  }
  return result;
};

const capStories = (stories: UserStoryOutput[]): ExtractionResult => {
  const truncated = stories.length > 30;
  return { stories: truncated ? stories.slice(0, 30) : stories, truncated };
};

export async function extractUserStories(
  sentences: IndexedSentence[],
): Promise<ExtractionResult> {
  const { system, user } = buildExtractionPrompt(sentences);

  const attempt = async (userPrompt: string): Promise<UserStoryOutput[]> => {
    const raw = await generateStructured(
      geminiProvider,
      {
        systemPrompt: system,
        userPrompt,
        jsonSchema: userStoriesGeminiSchema,
      },
      "ekstraksi gemini",
    );
    return parseStories(raw);
  };

  let stories: UserStoryOutput[];
  try {
    stories = await withRetry(() => attempt(user));
  } catch (firstError) {
    const message = firstError instanceof Error ? firstError.message : "output tidak valid";
    const repairPrompt = `${user}\n\n${buildExtractionRepairPrompt(message)}`;
    stories = await withRetry(() => attempt(repairPrompt));
  }

  return capStories(stories);
}