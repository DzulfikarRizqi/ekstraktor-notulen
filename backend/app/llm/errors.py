class LlmError(Exception):
    def __init__(self, message: str, status: int | None = None,
                 retryable: bool = False) -> None:
        super().__init__(message)
        self.status = status
        self.retryable = retryable


def is_retryable_status(status: int) -> bool:
    return status == 429 or 500 <= status <= 504


def is_llm_error(e: BaseException | None) -> bool:
    return isinstance(e, LlmError)