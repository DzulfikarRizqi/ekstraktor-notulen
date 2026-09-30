from google import genai
from google.genai import types as genai_types

from app.core.config import settings
from app.llm.errors import LlmError
from app.llm.provider import StructuredRequest

_client: genai.Client | None = None


def _get_client() -> genai.Client:
    global _client
    if _client is None:
        _client = genai.Client(api_key=settings.gemini_api_key)
    return _client


class GeminiProvider:
    name = "gemini"

    async def generate_structured(self, req: StructuredRequest) -> str:
        response = await _get_client().aio.models.generate_content(
            model=settings.gemini_model,
            contents=req.user_prompt,
            config=genai_types.GenerateContentConfig(
                system_instruction=req.system_prompt,
                response_mime_type="application/json",
                response_schema=req.json_schema,
                temperature=req.temperature if req.temperature is not None else 0.2,
            ),
        )
        text = response.text
        if not text:
            raise LlmError("Gemini tidak mengembalikan teks")
        return text


gemini_provider = GeminiProvider()