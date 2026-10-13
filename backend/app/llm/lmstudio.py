from openai import AsyncOpenAI

from app.core.config import settings
from app.llm.provider import StructuredRequest


class LMStudioProvider:
    name = "lm-studio"

    async def generate_structured(self, req: StructuredRequest) -> str:
        client = AsyncOpenAI(
            api_key="lm-studio", base_url=settings.lm_studio_base_url, timeout=120.0
        )
        try:
            completion = await client.chat.completions.create(
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
        finally:
            await client.close()


lm_studio_provider = LMStudioProvider()