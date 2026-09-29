import type { IndexedSentence } from "@/lib/llm/prompt";

const segmenter = new Intl.Segmenter("id", { granularity: "sentence" });

export function segmentText(content: string): IndexedSentence[] {
  const normalized = content.replace(/\r\n/g, "\n").replace(/[ \t]+/g, " ");
  const parts: string[] = [];
  for (const part of segmenter.segment(normalized)) {
    const text = part.segment.trim();
    if (text.length > 0) parts.push(text);
  }
  return parts.map((text, index) => ({ index, text }));
}