import json
import pytest

from app.llm.prompts import (
    EXTRACTION_EXAMPLE_OUTPUT,
    PREFILTER_EXAMPLE_OUTPUT,
    VERIFICATION_EXAMPLE_INVALID_OUTPUT,
    VERIFICATION_EXAMPLE_VALID_OUTPUT,
    build_extraction_prompt,
    build_prefilter_prompt,
    build_verification_prompt,
)
from app.llm.schema import (
    PrefilterSchema,
    UserStoriesSchema,
    VerificationSchema,
)


def test_prefilter_example_output_validates():
    data = json.loads(PREFILTER_EXAMPLE_OUTPUT)
    PrefilterSchema.model_validate(data)


def test_extraction_example_output_validates():
    data = json.loads(EXTRACTION_EXAMPLE_OUTPUT)
    UserStoriesSchema.model_validate(data)


def test_verification_example_valid_output_validates():
    data = json.loads(VERIFICATION_EXAMPLE_VALID_OUTPUT)
    VerificationSchema.model_validate(data)


def test_verification_example_invalid_output_validates():
    data = json.loads(VERIFICATION_EXAMPLE_INVALID_OUTPUT)
    VerificationSchema.model_validate(data)


def test_prefilter_prompt_has_sections():
    sentences = [{"index": 0, "text": "test"}]
    prompts = build_prefilter_prompt(sentences)
    assert "=== CONTOH INPUT ===" in prompts["user"]
    assert "=== CONTOH OUTPUT ===" in prompts["user"]
    assert "=== INPUT NYATA ===" in prompts["user"]
    assert "=== FORMAT JSON WAJIB ===" in prompts["user"]


def test_extraction_prompt_has_sections():
    sentences = [{"index": 0, "text": "test"}]
    prompts = build_extraction_prompt(sentences)
    assert "=== CONTOH INPUT ===" in prompts["user"]
    assert "=== CONTOH OUTPUT ===" in prompts["user"]
    assert "=== INPUT NYATA ===" in prompts["user"]
    assert "=== FORMAT JSON WAJIB ===" in prompts["user"]


def test_verification_prompt_has_sections():
    prompts = build_verification_prompt(
        0, "test sentence", {"id": 0, "actor": "A", "action": "B", "benefit": ""}
    )
    assert "=== CONTOH INPUT (VALID) ===" in prompts["user"]
    assert "=== CONTOH OUTPUT (VALID) ===" in prompts["user"]
    assert "=== CONTOH INPUT (TIDAK VALID) ===" in prompts["user"]
    assert "=== CONTOH OUTPUT (TIDAK VALID) ===" in prompts["user"]
    assert "=== INPUT NYATA ===" in prompts["user"]
    assert "=== FORMAT JSON WAJIB ===" in prompts["user"]
    assert "User Story ID: 0" in prompts["user"]