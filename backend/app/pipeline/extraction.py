from typing import TypedDict

from app.llm.parsing import parse_json
from app.llm.provider import LlmProvider, StructuredRequest, generate_structured
from app.llm.prompts import (
    IndexedSentence,
    build_extraction_prompt,
    build_extraction_repair_prompt,
)
from app.llm.retry import with_retry
from app.llm.schema import (
    UserStoriesSchema,
    user_stories_gemini_json_schema,
    user_stories_json_schema,
)


class StoryResult(TypedDict):
    id: int
    actor: str
    action: str
    benefit: str
    source_sentence_ids: list[int]


async def _call_extraction(
    provider: LlmProvider, system_prompt: str, user_prompt: str
) -> str:
    req = StructuredRequest(
        system_prompt=system_prompt,
        user_prompt=user_prompt,
        json_schema=user_stories_gemini_json_schema,
        temperature=0.2,
    )
    return await generate_structured(provider, req, "Extraction")


async def extract_stories(
    provider: LlmProvider,
    sentences: list[IndexedSentence],
) -> list[StoryResult]:
    prompts = build_extraction_prompt(sentences)

    async def _attempt() -> str:
        return await _call_extraction(provider, prompts["system"], prompts["user"])

    raw = await with_retry(_attempt)

    # Repair 1x bila output pertama gagal diverifikasi (termasuk skema <30).
    try:
        data = parse_json(raw)
        parsed = UserStoriesSchema.model_validate(data)
        stories = parsed.user_stories
    except Exception as e:  # noqa: BLE001
        repair = f"{prompts['user']}\n\n{build_extraction_repair_prompt(str(e))}"

        async def _repair() -> str:
            return await _call_extraction(provider, prompts["system"], repair)

        repaired = await with_retry(_repair)
        data = parse_json(repaired)
        parsed = UserStoriesSchema.model_validate(data)
        stories = parsed.user_stories

    valid_indexes = {s["index"] for s in sentences}
    results: list[StoryResult] = []
    seen = set()
    for story in stories:
        ids = [i for i in story.source_sentence_ids if i in valid_indexes]
        key = (story.actor, story.action, story.benefit)
        if key in seen:
            continue  # dedupe
        seen.add(key)
        results.append(
            {
                "id": len(results),
                "actor": story.actor,
                "action": story.action,
                "benefit": story.benefit,
                "source_sentence_ids": ids,
            }
        )
    return results