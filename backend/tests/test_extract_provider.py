import asyncio
import json

from app.core.config import settings
from app.llm.gemini import gemini_provider
from app.llm.lmstudio import lm_studio_provider
from app.llm.schema import (
    user_stories_gemini_json_schema,
    user_stories_json_schema,
)
from app.pipeline.extraction import _call_extraction
from app.pipeline.pipeline import _extract_provider

STORIES_JSON = json.dumps(
    {
        "user_stories": [
            {
                "actor": "Admin",
                "action": "mencetak laporan",
                "benefit": "",
                "source_sentence_ids": [0],
            }
        ]
    }
)


def test_env_default_is_lmstudio():
    assert settings.extract_provider == "lmstudio"


def test_provider_lmstudio(monkeypatch):
    monkeypatch.setattr(settings, "extract_provider", "lmstudio")
    assert _extract_provider() is lm_studio_provider


def test_provider_gemini(monkeypatch):
    monkeypatch.setattr(settings, "extract_provider", "gemini")
    assert _extract_provider() is gemini_provider


def test_provider_unknown_falls_back_to_gemini(monkeypatch):
    monkeypatch.setattr(settings, "extract_provider", "lainnya")
    assert _extract_provider() is gemini_provider


def _capture_request(provider, monkeypatch):
    captured = {}

    async def fake_generate(req):
        captured["req"] = req
        return STORIES_JSON

    monkeypatch.setattr(provider, "generate_structured", fake_generate)
    return captured


def test_gemini_uses_gemini_schema(monkeypatch):
    captured = _capture_request(gemini_provider, monkeypatch)
    asyncio.run(_call_extraction(gemini_provider, "system", "user"))
    assert captured["req"].json_schema is user_stories_gemini_json_schema


def test_lmstudio_uses_openai_schema(monkeypatch):
    captured = _capture_request(lm_studio_provider, monkeypatch)
    asyncio.run(_call_extraction(lm_studio_provider, "system", "user"))
    assert captured["req"].json_schema is user_stories_json_schema
