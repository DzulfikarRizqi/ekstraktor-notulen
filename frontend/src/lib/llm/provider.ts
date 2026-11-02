import { LlmError, isRetryableStatus } from "./errors";

export interface StructuredRequest {
  systemPrompt: string;
  userPrompt: string;
  jsonSchema: Record<string, unknown>;
  temperature?: number;
}

export interface LlmProvider {
  readonly name: string;
  generateStructured(req: StructuredRequest): Promise<string>;
}

export type LlmTask = "extract" | "prefilter" | "verify";

const MAX_RETRY_AFTER_MS = 120_000;

const retryAfterMsOf = (e: unknown): number | undefined => {
  const candidate = e as { retryAfterMs?: unknown; message?: unknown };
  if (typeof candidate?.retryAfterMs === "number") {
    return Math.min(candidate.retryAfterMs, MAX_RETRY_AFTER_MS);
  }
  const message = typeof candidate?.message === "string" ? candidate.message : "";
  const match =
    message.match(/"retryDelay"\s*:\s*"([\d.]+)s"/) ??
    message.match(/retry in\s+([\d.]+)\s*s/i);
  if (!match) return undefined;
  const seconds = Number.parseFloat(match[1]);
  if (!Number.isFinite(seconds)) return undefined;
  return Math.min(seconds * 1000, MAX_RETRY_AFTER_MS);
};

const statusOf = (e: unknown): number | undefined => {
  const candidate = e as {
    status?: unknown;
    code?: unknown;
    response?: { status?: unknown };
    sdkHttpResponse?: { responseInternal?: { status?: unknown } };
  };
  const values = [
    candidate?.status,
    candidate?.code,
    candidate?.response?.status,
    candidate?.sdkHttpResponse?.responseInternal?.status,
  ];
  return values.find((value): value is number => typeof value === "number");
};

const mapStatus = (e: unknown, context: string): LlmError => {
  if (e instanceof LlmError) return e;
  const status = statusOf(e);
  const message = e instanceof Error ? e.message : "request gagal";
  if (status != null) {
    return new LlmError(`${context}: ${message}`, {
      status,
      retryable: isRetryableStatus(status),
      retryAfterMs: retryAfterMsOf(e),
    });
  }
  return new LlmError(`${context}: ${message}`);
};

export async function generateStructured(
  provider: LlmProvider,
  req: StructuredRequest,
  context: string,
): Promise<string> {
  try {
    return await provider.generateStructured(req);
  } catch (e) {
    throw mapStatus(e, context);
  }
}