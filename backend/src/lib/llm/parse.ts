const trimCodeFence = (raw: string): string => {
  const trimmed = raw.trim();
  const fence = trimmed.match(/^```(?:json)?\s*\n([\s\S]*?)\n```$/);
  return fence ? fence[1].trim() : trimmed;
};

export function parseJson(raw: string): unknown {
  const cleaned = trimCodeFence(raw);
  const opens = [cleaned.indexOf("{"), cleaned.indexOf("[")].filter(
    (i) => i !== -1,
  );
  const start = opens.length > 0 ? Math.min(...opens) : -1;
  if (start === -1) {
    throw new Error("Output bukan JSON: tidak ditemukan objek/array.");
  }
  const candidate = cleaned.slice(start);
  try {
    return JSON.parse(candidate) as unknown;
  } catch {
    throw new Error("Output bukan JSON yang valid.");
  }
}