import type { IndexedSentence } from "@/lib/llm/prompt";

const segmenter = new Intl.Segmenter("id", { granularity: "sentence" });

// Penanda pembicara di awal baris: [PERSON5], (PERSON8), Budi:, Dr. Smith:
const SPEAKER_MARKER = /^\s*(\[[^\]]+\]|\([^)]+\)|[A-Z][\w .'-]{1,30}:)/;

// Baris tag korpus murni tanpa ucapan: <unintelligible/>, <parallel_talk/>, <laugh/>
const TAG_ONLY = /^\s*<[a-z_]+\/>\s*$/;

// Ambang rasio baris berpenanda agar teks dianggap transkrip berpenanda.
const TRANSCRIPT_MARKER_RATIO = 0.3;

const isSpeakerLine = (line: string): boolean => SPEAKER_MARKER.test(line);

/**
 * Transkrip gaya annot16: satu baris = satu unit kalimat, termasuk baris
 * lanjutan tanpa penanda pembicara. Baris tag murni dibuang.
 */
function segmentTranscript(lines: string[]): IndexedSentence[] {
  const parts: string[] = [];
  for (const line of lines) {
    const text = line.trim();
    if (text && !TAG_ONLY.test(text)) parts.push(text);
  }
  return parts.map((text, index) => ({ index, text }));
}

function segmentProse(normalized: string): IndexedSentence[] {
  const parts: string[] = [];
  for (const part of segmenter.segment(normalized)) {
    const text = part.segment.trim();
    if (text.length > 0) parts.push(text);
  }
  return parts.map((text, index) => ({ index, text }));
}

export function segmentText(content: string): IndexedSentence[] {
  const normalized = content
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .trim();
  if (normalized.length === 0) return [];

  const lines = normalized.split("\n");
  const contentLines = lines.filter((line) => line.trim().length > 0);

  const marked = contentLines.filter((line) => isSpeakerLine(line)).length;
  const isTranscript =
    contentLines.length >= 3 &&
    marked / contentLines.length >= TRANSCRIPT_MARKER_RATIO;

  return isTranscript ? segmentTranscript(lines) : segmentProse(normalized);
}
