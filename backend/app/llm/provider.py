from dataclasses import dataclass, field
from typing import Protocol

from app.llm.errors import LlmError, is_retryable_status


@dataclass
class StructuredRequest:
    system_prompt: str
    user_prompt: str
    json_schema: dict
    temperature: float | None = field(default=None)


class LlmProvider(Protocol):
    name: str

    async def generate_structured(self, req: StructuredRequest) -> str:
        ...


def map_status(e: BaseException, context: str) -> LlmError:
    if isinstance(e, LlmError):
        return e
    status = getattr(e, "status", None) or getattr(e, "status_code", None)
    if isinstance(status, int):
        return LlmError(
            f"{context}: {e}",
            status=status,
            retryable=is_retryable_status(status),
        )
    message = str(e) if str(e) else "error tidak diketahui"
    return LlmError(f"{context}: {message}")


async def generate_structured(
    provider: LlmProvider, req: StructuredRequest, context: str
) -> str:
    try:
        return await provider.generate_structured(req)
    except LlmError:
        raise
    except Exception as e:  # noqa: BLE001 - dipetakan ke LlmError
        raise map_status(e, context) from e