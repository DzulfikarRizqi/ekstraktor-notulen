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

const mapStatus = (e: unknown, context: string): LlmError => {
  if (e instanceof LlmError) return e;
  const status = (e as { status?: number })?.status;
  if (typeof status === "number") {
    return new LlmError(`${context}: ${(e as Error).message ?? "request gagal"}`, {
      status,
      retryable: isRetryableStatus(status),
    });
  }
  return new LlmError(`${context}: ${(e as Error).message ?? "error tidak diketahui"}`);
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