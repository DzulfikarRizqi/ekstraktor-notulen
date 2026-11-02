import { afterEach, describe, expect, it, vi } from "vitest";
import { LlmError } from "@/lib/llm/errors";
import { generateStructured } from "@/lib/llm/provider";
import { withRetry } from "@/lib/retry";

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("withRetry", () => {
  it("menghormati retryAfterMs dari provider", async () => {
    vi.useFakeTimers();
    const fn = vi
      .fn<() => Promise<string>>()
      .mockRejectedValueOnce(
        new LlmError("429", {
          status: 429,
          retryable: true,
          retryAfterMs: 35_000,
        }),
      )
      .mockResolvedValue("ok");

    const promise = withRetry(fn);

    await vi.advanceTimersByTimeAsync(34_999);
    expect(fn).toHaveBeenCalledTimes(1);

    await vi.advanceTimersByTimeAsync(1);
    await expect(promise).resolves.toBe("ok");
    expect(fn).toHaveBeenCalledTimes(2);
  });
});

describe("generateStructured", () => {
  it("membaca retryDelay Gemini dari pesan error 429", async () => {
    const provider = {
      name: "gemini",
      generateStructured: async () => {
        const error = new Error(
          '{"error":{"code":429,"status":"RESOURCE_EXHAUSTED","details":[{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay":"35s"}]}}',
        );
        Object.assign(error, { status: 429 });
        throw error;
      },
    };

    await expect(
      generateStructured(
        provider,
        { systemPrompt: "s", userPrompt: "u", jsonSchema: {} },
        "test",
      ),
    ).rejects.toMatchObject({
      status: 429,
      retryable: true,
      retryAfterMs: 35_000,
    });
  });
});
