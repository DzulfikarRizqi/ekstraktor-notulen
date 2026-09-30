from pytest import approx

from app.embedding.similarity import cosine_similarity
from app.pipeline.verification import decide_status


def test_cosine_identical():
    assert cosine_similarity([1, 0, 0], [1, 0, 0]) == approx(1, abs=1e-6)


def test_cosine_perpendicular():
    assert cosine_similarity([1, 0], [0, 1]) == approx(0, abs=1e-6)


def test_cosine_empty_or_mismatch():
    assert cosine_similarity([], []) == 0
    assert cosine_similarity([1, 0], [1]) == 0


def test_decide_valid():
    assert decide_status(
        llm_verdict=True, confidence_score=0.9, embedding_similarity=0.8
    ) == "valid"


def test_decide_invalid_verdict():
    assert decide_status(
        llm_verdict=False, confidence_score=0.9, embedding_similarity=0.9
    ) == "needs_review"


def test_decide_low_confidence():
    assert decide_status(
        llm_verdict=True, confidence_score=0.4, embedding_similarity=0.9
    ) == "needs_review"


def test_decide_low_similarity():
    assert decide_status(
        llm_verdict=True, confidence_score=0.9, embedding_similarity=0.3
    ) == "needs_review"


def test_decide_null_similarity():
    assert decide_status(
        llm_verdict=True, confidence_score=0.9, embedding_similarity=None
    ) == "valid"