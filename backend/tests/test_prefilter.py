import asyncio
import pytest

from app.llm.errors import LlmError
from app.llm.lmstudio import lm_studio_provider
from app.pipeline.prefilter import find_relevant_sentence_ids

SENTENCES = [
    {"index": 0, "text": "Selamat pagi semuanya."},
    {"index": 1, "text": "Kita bahas fitur login."},
    {"index": 2, "text": "User harus bisa reset password via email."},
    {"index": 3, "text": "Ya sudah, mari kita makan siang."},
]


def _fake(monkeypatch, output: str | None = None, error: BaseException | None = None):
    async def fake_generate(req):
        if error is not None:
            raise error
        return output

    monkeypatch.setattr(
        lm_studio_provider, "generate_structured", fake_generate
    )


def test_uses_valid_sorted_ids(monkeypatch):
    _fake(monkeypatch, '{"relevant_sentence_ids": [2, 1]}')
    result = asyncio.run(find_relevant_sentence_ids(lm_studio_provider, SENTENCES))
    assert result == [1, 2]


def test_fallback_all_when_empty(monkeypatch):
    _fake(monkeypatch, '{"relevant_sentence_ids": []}')
    result = asyncio.run(find_relevant_sentence_ids(lm_studio_provider, SENTENCES))
    assert result == [0, 1, 2, 3]


def test_fallback_all_when_not_json(monkeypatch):
    _fake(monkeypatch, "maaf, tidak ada")
    result = asyncio.run(find_relevant_sentence_ids(lm_studio_provider, SENTENCES))
    assert result == [0, 1, 2, 3]


def test_drops_out_of_range_indices(monkeypatch):
    _fake(monkeypatch, '{"relevant_sentence_ids": [1, 99]}')
    result = asyncio.run(find_relevant_sentence_ids(lm_studio_provider, SENTENCES))
    assert result == [1]


def test_service_error_propagates(monkeypatch):
    _fake(monkeypatch, error=LlmError("LM Studio down", status=503, retryable=False))
    with pytest.raises(LlmError):
        asyncio.run(find_relevant_sentence_ids(lm_studio_provider, SENTENCES))


def test_empty_sentences_returns_empty(monkeypatch):  # hitung: guards service call
    called = False

    async def fake_generate(req):
        nonlocal called
        called = True
        return '{"relevant_sentence_ids": []}'

    monkeypatch.setattr(lm_studio_provider, "generate_structured", fake_generate)
    result = asyncio.run(find_relevant_sentence_ids(lm_studio_provider, []))
    assert result == []
    assert called is False