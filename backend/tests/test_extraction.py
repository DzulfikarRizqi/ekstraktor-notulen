import asyncio
import json

import pytest

from app.llm.gemini import gemini_provider
from app.pipeline.extraction import extract_stories

GOOD_STORIES = {
    "user_stories": [
        {"actor": "Admin", "action": "mencetak laporan", "benefit": "", "source_sentence_ids": [0]},
        {"actor": "Admin", "action": "mencetak laporan", "benefit": "", "source_sentence_ids": [0]},
    ]
}
INVALID_OUTPUT = '{"user_stories": "bukan array"}'


def _fake(monkeypatch, outputs):
    calls = []

    async def fake_generate(req):
        calls.append(req)
        result = outputs.pop(0) if isinstance(outputs, list) else outputs
        return result

    monkeypatch.setattr(gemini_provider, "generate_structured", fake_generate)
    return calls


def test_removes_duplicates(monkeypatch):
    _fake(monkeypatch, json.dumps(GOOD_STORIES))
    result = asyncio.run(extract_stories(gemini_provider, [{"index": 0, "text": "Admin cetak laporan."}]))
    assert len(result) == 1


def test_rejects_more_than_30_stories(monkeypatch):
    stories = [
        {"actor": "Admin", "action": f"aksi {i}", "benefit": "", "source_sentence_ids": [0]}
        for i in range(35)
    ]
    calls = _fake(monkeypatch, json.dumps({"user_stories": stories}))
    with pytest.raises(ValueError):
        asyncio.run(extract_stories(gemini_provider, [{"index": 0, "text": "x"}]))
    # repair dipanggil sekali lalu tetap gagal → total 2 panggilan
    assert len(calls) == 2


def test_repair_once_on_invalid_output(monkeypatch):
    calls = _fake(monkeypatch, [INVALID_OUTPUT, json.dumps(GOOD_STORIES)])
    result = asyncio.run(extract_stories(gemini_provider, [{"index": 0, "text": "x"}]))
    assert len(calls) == 2
    assert len(result) == 1


def test_fails_when_repair_still_invalid(monkeypatch):
    _fake(monkeypatch, INVALID_OUTPUT)
    with pytest.raises(ValueError):
        asyncio.run(extract_stories(gemini_provider, [{"index": 0, "text": "x"}]))