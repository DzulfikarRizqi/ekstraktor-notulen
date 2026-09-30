from app.llm.errors import LlmError
from app.llm.parsing import parse_json
from app.llm.provider import LlmProvider, StructuredRequest, generate_structured
from app.llm.prompts import IndexedSentence, build_prefilter_prompt
from app.llm.retry import with_retry
from app.llm.schema import PrefilterSchema

PREFILTER_SCHEMA = {
    "type": "object",
    "properties": {
        "relevant_sentence_ids": {
            "type": "array",
            "items": {"type": "integer", "minimum": 0},
        }
    },
    "required": ["relevant_sentence_ids"],
    "additionalProperties": False,
}


async def find_relevant_sentence_ids(
    provider: LlmProvider,
    sentences: list[IndexedSentence],
    temperature: float = 0,
) -> list[int]:
    if len(sentences) == 0:
        return []

    prompts = build_prefilter_prompt(sentences)
    req = StructuredRequest(
        system_prompt=prompts["system"],
        user_prompt=prompts["user"],
        json_schema=PREFILTER_SCHEMA,
        temperature=temperature,
    )

    async def _call() -> str:
        return await generate_structured(provider, req, "PreFilter")

    try:
        raw = await with_retry(_call)
        data = parse_json(raw)
        parsed = PrefilterSchema.model_validate(data)
        valid = {s["index"] for s in sentences}
        # Dedup + buang indeks di luar daftar (anti-halusinasi), lalu urutkan.
        kept = sorted({i for i in parsed.relevant_sentence_ids if i in valid})
        if len(kept) == 0:
            return [s["index"] for s in sentences]
        return kept
    except LlmError:
        # Error layanan (timeout, rate-limit, 5xx) → biarkan gagal (job failed).
        raise
    except Exception:  # noqa: BLE001
        # Output invalid/kosong → fallback semua kalimat (verifikasi yang menilai).
        return [s["index"] for s in sentences]