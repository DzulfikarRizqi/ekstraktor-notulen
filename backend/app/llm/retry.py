import asyncio

from app.llm.errors import is_llm_error


async def with_retry(
    fn,
    *,
    max_attempts: int = 3,
    base_delay_ms: float = 1000.0,
    max_delay_ms: float = 8000.0,
):
    attempt = 0
    while True:
        try:
            return await fn()
        except Exception as e:
            attempt += 1
            retryable = is_llm_error(e) and e.retryable  # type: ignore[union-attr]
            if attempt >= max_attempts or not retryable:
                raise
            delay = min(base_delay_ms * (2 ** (attempt - 1)), max_delay_ms)
            await asyncio.sleep(delay / 1000.0)