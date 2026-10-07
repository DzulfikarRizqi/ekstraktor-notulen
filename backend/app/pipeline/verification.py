from app.core.config import settings
from app.embedding.similarity import cosine_similarity
from app.llm.parsing import parse_json
from app.llm.provider import LlmProvider, StructuredRequest, generate_structured
from app.llm.prompts import VerifiableStory, build_verification_prompt
from app.llm.retry import with_retry
from app.llm.schema import VerificationSchema

VERIFICATION_SCHEMA = {
    "type": "object",
    "properties": {
        "user_story_id": {"type": "integer", "minimum": 0},
        "is_valid": {"type": "boolean"},
        "confidence_score": {"type": "number", "minimum": 0, "maximum": 1},
        "reason": {"type": "string"},
    },
    "required": ["user_story_id", "is_valid", "confidence_score", "reason"],
    "additionalProperties": False,
}


def decide_status(
    *,
    llm_verdict: bool,
    confidence_score: float,
    embedding_similarity: float | None,
) -> str:
    if not llm_verdict:
        return "needs_review"
    if confidence_score < settings.conf_threshold:
        return "needs_review"
    if (
        embedding_similarity is not None
        and embedding_similarity < settings.embed_verify_threshold
    ):
        return "needs_review"
    return "valid"


async def verify_sentence(
    provider: LlmProvider,
    *,
    sentence_index: int,
    sentence_text: str,
    story: VerifiableStory,
    embedding_similarity: float | None = None,
    temperature: float = 0,
) -> tuple[str, float, str]:
    prompts = build_verification_prompt(sentence_index, sentence_text, story)
    req = StructuredRequest(
        system_prompt=prompts["system"],
        user_prompt=prompts["user"],
        json_schema=VERIFICATION_SCHEMA,
        temperature=temperature,
    )

    async def _call() -> str:
        return await generate_structured(provider, req, "Verification")

    raw = await with_retry(_call)
    data = parse_json(raw)
    parsed = VerificationSchema.model_validate(data)
    status = decide_status(
        llm_verdict=parsed.is_valid,
        confidence_score=parsed.confidence_score,
        embedding_similarity=embedding_similarity,
    )
    return status, parsed.confidence_score, parsed.reason