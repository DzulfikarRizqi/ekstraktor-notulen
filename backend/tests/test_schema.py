import pytest

from app.llm.schema import (
    PrefilterSchema,
    UserStoriesSchema,
    VerificationSchema,
    user_stories_json_schema,
)


def test_user_stories_json_schema_contract():
    assert user_stories_json_schema["type"] == "object"
    assert user_stories_json_schema["required"] == ["user_stories"]
    assert (
        user_stories_json_schema["properties"]["user_stories"]["maxItems"] == 30
    )
    items = user_stories_json_schema["properties"]["user_stories"]["items"]
    assert items["properties"]["source_sentence_ids"]["minItems"] == 1


def test_extraction_happy_path():
    data = UserStoriesSchema.model_validate(
        {
            "user_stories": [
                {
                    "actor": "Admin",
                    "action": "mencetak laporan",
                    "benefit": "",
                    "source_sentence_ids": [0, 3],
                }
            ]
        }
    )
    assert len(data.user_stories) == 1


def test_reject_negative_index():
    with pytest.raises(ValueError):
        UserStoriesSchema.model_validate(
            {
                "user_stories": [
                    {
                        "actor": "a",
                        "action": "b",
                        "benefit": "",
                        "source_sentence_ids": [-1],
                    }
                ]
            }
        )


def test_reject_more_than_30_stories():
    stories = [
        {
            "actor": "a",
            "action": f"b{i}",
            "benefit": "",
            "source_sentence_ids": [0],
        }
        for i in range(31)
    ]
    with pytest.raises(ValueError):
        UserStoriesSchema.model_validate({"user_stories": stories})


def test_prefilter_and_verification_schemas():
    assert PrefilterSchema.model_validate({"relevant_sentence_ids": [1, 2]}).relevant_sentence_ids == [1, 2]
    v = VerificationSchema.model_validate(
        {"is_valid": True, "confidence_score": 0.98, "reason": "ok"}
    )
    assert v.is_valid is True