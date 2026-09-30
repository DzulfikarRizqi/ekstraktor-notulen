from typing import List

from pydantic import BaseModel, Field, field_validator


def _non_negative(v: List[int]) -> List[int]:
    if any(i < 0 for i in v):
        raise ValueError("index tidak boleh negatif")
    return v


class UserStorySchema(BaseModel):
    actor: str = Field(min_length=1)
    action: str = Field(min_length=1)
    benefit: str = ""
    source_sentence_ids: List[int] = Field(min_length=1)

    _validate_ids = field_validator("source_sentence_ids")(_non_negative)


class UserStoriesSchema(BaseModel):
    user_stories: List[UserStorySchema] = Field(min_length=1, max_length=30)


class PrefilterSchema(BaseModel):
    relevant_sentence_ids: List[int] = Field(default_factory=list)

    _validate_ids = field_validator("relevant_sentence_ids")(_non_negative)


class VerificationSchema(BaseModel):
    is_valid: bool
    confidence_score: float = Field(ge=0, le=1)
    reason: str


# ---- JSON Schema untuk LLM ----

def _resolve_refs(node, defs):
    if isinstance(node, dict):
        if "$ref" in node:
            name = node["$ref"].split("/")[-1]
            return _resolve_refs(defs[name], defs)
        return {k: _resolve_refs(v, defs) for k, v in node.items() if k != "$defs"}
    if isinstance(node, list):
        return [_resolve_refs(i, defs) for i in node]
    return node


def _json_schema(model, keep_meta: bool) -> dict:
    schema = model.model_json_schema()
    inline = _resolve_refs({k: v for k, v in schema.items() if k != "$defs"}, schema.get("$defs", {}))
    if not keep_meta:
        inline.pop("$schema", None)
    return inline


user_stories_json_schema = _json_schema(UserStoriesSchema, keep_meta=False)
user_stories_gemini_json_schema = _json_schema(UserStoriesSchema, keep_meta=True)
prefilter_json_schema = _json_schema(PrefilterSchema, keep_meta=False)
verification_json_schema = _json_schema(VerificationSchema, keep_meta=False)