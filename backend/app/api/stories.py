from fastapi import APIRouter, Depends, Request
from sqlmodel import Session, select

from app.core.config import settings
from app.core.db import get_session
from app.core.http import bad_request, conflict, not_found
from app.core.models import Sentence, StorySentence, UserStory
from app.embedding import embedder
from app.embedding.similarity import cosine_similarity

router = APIRouter(prefix="/stories", tags=["stories"])

_ALLOWED_STATUS = {"pending", "approved", "rejected"}


@router.patch("/{story_id}")
async def update_story(
    story_id: str, request: Request, db: Session = Depends(get_session)
):
    story = db.get(UserStory, story_id)
    if story is None:
        return not_found("User story tidak ditemukan.")

    try:
        body = await request.json()
    except Exception:  # noqa: BLE001
        return bad_request("Body harus berupa JSON.")
    if not isinstance(body, dict):
        return bad_request("Body harus berupa objek JSON.")

    updates: dict = {}
    if "status" in body:
        if body["status"] not in _ALLOWED_STATUS:
            return bad_request("Nilai status tidak valid.")
        updates["status"] = body["status"]
    for key, min_len in (("actor", 1), ("action", 1)):
        if key in body:
            value = body[key]
            if not isinstance(value, str) or value.strip() == "":
                return bad_request(f"Field '{key}' minimal 1 karakter.")
            updates[key] = value.strip()
    if "benefit" in body:
        value = body["benefit"]
        if not isinstance(value, str):
            return bad_request("Field 'benefit' harus berupa teks.")
        updates["benefit"] = value.strip()

    if not updates:
        return bad_request("Tidak ada field yang valid untuk diperbarui.")

    for key, value in updates.items():
        setattr(story, key, value)
    db.add(story)
    db.commit()
    db.refresh(story)
    return {"data": {"id": story.id, "status": story.status}}


@router.delete("/{story_id}")
def delete_story(story_id: str, db: Session = Depends(get_session)):
    story = db.get(UserStory, story_id)
    if story is None:
        return not_found("User story tidak ditemukan.")
    db.delete(story)
    db.commit()
    return {"data": {"ok": True}}


@router.post("/{story_id}/sources", status_code=201)
async def add_source(
    story_id: str, request: Request, db: Session = Depends(get_session)
):
    story = db.get(UserStory, story_id)
    if story is None:
        return not_found("User story tidak ditemukan.")

    try:
        body = await request.json()
    except Exception:  # noqa: BLE001
        return bad_request("Body harus berupa JSON.")
    if not isinstance(body, dict) or not isinstance(body.get("sentenceId"), str):
        return bad_request("Field 'sentenceId' wajib diisi.")

    sentence_id = body["sentenceId"].strip()
    if not sentence_id:
        return bad_request("Field 'sentenceId' wajib diisi.")

    sentence = db.exec(
        select(Sentence).where(
            Sentence.id == sentence_id, Sentence.document_id == story.document_id
        )
    ).first()
    if sentence is None:
        return bad_request("Kalimat tidak dikenal dalam dokumen ini.")

    existing = db.exec(
        select(StorySentence).where(
            StorySentence.story_id == story.id,
            StorySentence.sentence_id == sentence.id,
        )
    ).first()
    if existing is not None:
        return conflict("Tautan kalimat sudah ada.")

    similarity = None
    if settings.use_embedding_fallback:
        try:
            claim = _claim_text(story)
            vectors = embedder.embed_texts(
                [f"query: {claim}", f"passage: {sentence.text}"]
            )
            similarity = cosine_similarity(vectors[0], vectors[1])
        except Exception as e:  # noqa: BLE001
            print(f"[sources] embedding gagal, simpan tanpa similarity: {e}")

    link = StorySentence(
        story_id=story.id,
        sentence_id=sentence.id,
        llm_verdict=False,
        llm_reason="Sumber ditambahkan manual (perlu review).",
        confidence_score=None,
        embedding_similarity=similarity,
        verification_status="needs_review",
    )
    db.add(link)
    db.commit()
    db.refresh(link)
    return {"data": {"id": link.id}}


@router.delete("/{story_id}/sources")
def remove_source(
    story_id: str, sentenceId: str = "", db: Session = Depends(get_session)
):
    if not sentenceId:
        return bad_request("Parameter 'sentenceId' wajib diisi.")
    story = db.get(UserStory, story_id)
    if story is None:
        return not_found("User story tidak ditemukan.")
    link = db.exec(
        select(StorySentence).where(
            StorySentence.story_id == story.id,
            StorySentence.sentence_id == sentenceId,
        )
    ).first()
    if link is not None:
        db.delete(link)
        db.commit()
    return {"data": {"ok": True}}


def _claim_text(story: UserStory) -> str:
    return " ".join(
        p for p in (story.actor, story.action, story.benefit) if p.strip()
    ).strip()