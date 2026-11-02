export class LlmError extends Error {
  readonly status: number | null;
  readonly retryable: boolean;
  readonly retryAfterMs: number | null;

  constructor(
    message: string,
    opts: { status?: number; retryable?: boolean; retryAfterMs?: number } = {},
  ) {
    super(message);
    this.name = "LlmError";
    this.status = opts.status ?? null;
    this.retryable = opts.retryable ?? false;
    this.retryAfterMs = opts.retryAfterMs ?? null;
  }
}

export const isRetryableStatus = (status: number): boolean =>
  status === 429 || status === 500 || status === 502 || status === 503 || status === 504;

export function isLlmError(e: unknown): e is LlmError {
  return e instanceof LlmError;
}