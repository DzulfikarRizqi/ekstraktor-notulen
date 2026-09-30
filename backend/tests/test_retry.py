import asyncio

import pytest

from app.llm.errors import LlmError
from app.llm.retry import with_retry

FAST = {"base_delay_ms": 1, "max_delay_ms": 2}


def test_retries_then_succeeds():
    counter = [0]

    async def inner():
        counter[0] += 1
        if counter[0] < 3:
            raise LlmError("rate limit", status=429, retryable=True)
        return "recovered"

    result = asyncio.run(with_retry(inner, **FAST))
    assert result == "recovered"
    assert counter[0] == 3


def test_non_retryable_propagates_immediately():
    counter = [0]

    async def inner():
        counter[0] += 1
        raise LlmError("invalid response", retryable=False)

    with pytest.raises(LlmError):
        asyncio.run(with_retry(inner, **FAST))
    assert counter[0] == 1


def test_gives_up_after_max_attempts():
    counter = [0]

    async def inner():
        counter[0] += 1
        raise LlmError("still failing", status=503, retryable=True)

    with pytest.raises(LlmError):
        asyncio.run(with_retry(inner, max_attempts=3, **FAST))
    assert counter[0] == 3


def test_non_llm_error_not_retried():
    counter = [0]

    async def inner():
        counter[0] += 1
        raise TypeError("bukan LlmError")

    with pytest.raises(TypeError):
        asyncio.run(with_retry(inner, **FAST))
    assert counter[0] == 1