import asyncio
from datetime import datetime, timezone

from sqlmodel import Session, delete, select

from app.core.config import settings
from app.core.db import SessionLocal
from app.core.models import Document, Sentence, StorySentence, UserStory
from app.embedding import embedder
from app.embedding.similarity import cosine_similarity
from app.llm.gemini import gemini_provider
from app.llm.lmstudio import lm_studio_provider
from app.llm.prompts import IndexedSentence
from app.pipeline.extraction import StoryResult, extract_stories
from app.pipeline.prefilter import find_relevant_sentence_ids
from app.pipeline.segmenter import segment_text
from app.pipeline.verification import verify_sentence


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


def process_document(doc_id: str) -> None:
    db = SessionLocal()
    try:
        doc = db.get(Document, doc_id)
        if doc is None:
            return
        doc.status = "processing"
        doc.updated_at = _utcnow()
        db.commit()
        try:
            _process(doc, db)
            doc.status = "completed"
            doc.error = None
        except Exception as e:  # noqa: BLE001
            doc.status = "failed"
            doc.error = str(e)
        doc.updated_at = _utcnow()
        db.commit()
    finally:
        db.close()


def _process(doc: Document, db: Session) -> None:
    _reset_document_rows(db, doc.id)

    segments = segment_text(doc.content)
    if len(segments) == 0:
        raise RuntimeError("Teks tidak memiliki kalimat yang dapat diproses.")

    _persist_sentences(doc, db, segments)
    sentence_by_index = _index_sentences(db, doc.id)

    relevant = asyncio.run(
        find_relevant_sentence_ids(lm_studio_provider, segments)
    )
    relevant_set = set(relevant)
    filtered = [s for s in segments if s["index"] in relevant_set]

    stories = asyncio.run(extract_stories(gemini_provider, filtered))
    _persist_stories(db, doc, stories, sentence_by_index)


def _reset_document_rows(db: Session, document_id: str) -> None:
    db.exec(
        delete(StorySentence).where(
            StorySentence.story_id.in_(
                select(UserStory.id).where(UserStory.document_id == document_id)
            )
        )
    )
    db.exec(delete(UserStory).where(UserStory.document_id == document_id))
    db.exec(delete(Sentence).where(Sentence.document_id == document_id))
    db.flush()


def _persist_sentences(
    doc: Document, db: Session, segments: list[IndexedSentence]
) -> None:
    for seg in segments:
        db.add(Sentence(document_id=doc.id, index=seg["index"], text=seg["text"]))
    db.flush()


def _index_sentences(db: Session, document_id: str) -> dict[int, Sentence]:
    rows = db.exec(
        select(Sentence).where(Sentence.document_id == document_id)
    ).all()
    return {s.index: s for s in rows}


def _persist_stories(
    db: Session,
    doc: Document,
    stories: list[StoryResult],
    sentence_by_index: dict[int, Sentence],
) -> None:
    for idx, story in enumerate(stories):
        us = UserStory(
            document_id=doc.id,
            story_code=f"US-{idx + 1:02d}",
            actor=story["actor"],
            action=story["action"],
            benefit=story["benefit"],
            status="pending",
        )
        db.add(us)
        db.flush()
        db.refresh(us)

        source_ids = [
            i for i in story["source_sentence_ids"] if i in sentence_by_index
        ]
        if not source_ids:
            continue

        use_embedding = settings.use_embedding_fallback
        if use_embedding:
            claim_vectors = embedder.embed_texts(
                [f"query: {_claim(story)}"] * len(source_ids)
            )
            source_texts = [
                f"passage: {sentence_by_index[i].text}" for i in source_ids
            ]
            source_vectors = embedder.embed_texts(source_texts)

        for j, index in enumerate(source_ids):
            sentence = sentence_by_index[index]
            similarity = None
            if use_embedding:
                similarity = cosine_similarity(claim_vectors[j], source_vectors[j])
            status, confidence, reason = asyncio.run(
                verify_sentence(
                    lm_studio_provider,
                    sentence_index=index,
                    sentence_text=sentence.text,
                    story=story,
                    embedding_similarity=similarity,
                )
            )
            db.add(
                StorySentence(
                    story_id=us.id,
                    sentence_id=sentence.id,
                    llm_verdict=status == "valid",
                    confidence_score=confidence,
                    llm_reason=reason,
                    embedding_similarity=similarity,
                    verification_status=status,
                )
            )
        db.flush()


def _claim(story: StoryResult) -> str:
    parts = [story["actor"], story["action"], story["benefit"]]
    return " ".join(p for p in parts if p).strip()