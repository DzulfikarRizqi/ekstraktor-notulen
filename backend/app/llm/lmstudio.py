from openai import AsyncOpenAI

from app.core.config import settings
from app.llm.provider import StructuredRequest

_client: AsyncOpenAI | None = None


def _get_client() -> AsyncOpenAI:
    global _client
    if _client is None:
        _client = AsyncOpenAI(
            api_key="lm-studio", base_url=settings.lm_studio_base_url
        )
    return _client


class LMStudioProvider:
    name = "lm-studio"

    async def generate_structured(self, req: StructuredRequest) -> str:
        completion = await _get_client().chat.completions.create(
            model=settings.lm_studio_model,
            temperature=req.temperature if req.temperature is not None else 0,
            messages=[
                {"role": "system", "content": req.system_prompt},
                {"role": "user", "content": req.user_prompt},
            ],
            response_format={
                "type": "json_schema",
                "json_schema": {
                    "name": "structured_output",
                    "strict": False,
                    "schema": req.json_schema,
                },
            },
        )
        content = completion.choices[0].message.content if completion.choices else None
        if content is None:
            raise RuntimeError("LM Studio tidak mengembalikan konten.")
        return content


lm_studio_provider = LMStudioProvider()