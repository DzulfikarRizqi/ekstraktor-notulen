import asyncio
import logging
import time
from datetime import datetime, timezone
from typing import Optional

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

logger = logging.getLogger("app.pipeline")


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


# ── entri utama (background job, dipakai endpoint /{id}/extract yang lama) ──


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
            run_full(doc_id, db)
            doc.status = "completed"
            doc.error = None
        except Exception as e:  # noqa: BLE001
            doc.status = "failed"
            doc.error = str(e)
        doc.updated_at = _utcnow()
        db.commit()
    finally:
        db.close()


# ── full run (panggil keempat tahap) ──


def run_full(doc_id: str, db: Session) -> None:
    run_segment(doc_id, db)
    run_prefilter(doc_id, db)
    run_extract(doc_id, db)
    run_verify(doc_id, db)


# ── tahap navigasi ──


def get_document_or_none(doc_id: str, db: Session) -> Optional[Document]:
    return db.get(Document, doc_id)


# ── tahap mahap: segment ──


def run_segment(doc_id: str, db: Session) -> dict:
    doc = db.get(Document, doc_id)
    if doc is None:
        raise RuntimeError("Dokumen tidak ditemukan.")

    t0 = time.monotonic()
    doc.status = "processing"
    doc.error = None
    db.commit()

    _reset_document_rows(db, doc_id)
    segments = segment_text(doc.content)
    if len(segments) == 0:
        raise RuntimeError("Teks tidak memiliki kalimat yang dapat diproses.")

    _persist_sentences(doc, db, segments)
    doc.status = "completed"
    db.commit()

    elapsed = time.monotonic() - t0
    logger.info(
        "[segment]   doc=%s %d kalimat (%.2fs)",
        doc_id[:8], len(segments), elapsed,
    )

    return {
        "documentId": doc_id,
        "stage": "segment",
        "count": len(segments),
        "sentences": [{"index": s["index"], "text": s["text"]} for s in segments],
    }


# ── tahap nahap: prefilter ──


def run_prefilter(doc_id: str, db: Session) -> dict:
    doc = db.get(Document, doc_id)
    if doc is None:
        raise RuntimeError("Dokumen tidak ditemukan.")

    sentences = db.exec(
        select(Sentence).where(Sentence.document_id == doc_id).order_by(Sentence.index)
    ).all()
    if len(sentences) == 0:
        raise RuntimeError("Segmentasi belum dijalankan. Jalankan /stages/segment terlebih dahulu.")

    t0 = time.monotonic()
    doc.status = "processing"
    doc.error = None
    db.commit()

    segments: list[IndexedSentence] = [
        {"index": s.index, "text": s.text} for s in sentences
    ]
    relevant = asyncio.run(
        find_relevant_sentence_ids(lm_studio_provider, segments)
    )
    relevant_set = set(relevant)

    for s in sentences:
        s.is_relevant = s.index in relevant_set
        db.add(s)
    db.flush()

    kept = sorted([s.index for s in sentences if s.index in relevant_set])
    dropped = sorted([s.index for s in sentences if s.index not in relevant_set])

    doc.status = "completed"
    db.commit()

    elapsed = time.monotonic() - t0
    logger.info(
        "[prefilter] doc=%s %d -> %d lolos, %d dibuang %s (%.2fs)",
        doc_id[:8], len(sentences), len(kept), len(dropped), dropped, elapsed,
    )

    return {
        "documentId": doc_id,
        "stage": "prefilter",
        "totalCount": len(sentences),
        "keptCount": len(kept),
        "droppedCount": len(dropped),
        "relevantIndices": kept,
        "droppedIndices": dropped,
        "sentences": [
            {"index": s.index, "text": s.text, "isRelevant": s.is_relevant}
            for s in sentences
        ],
    }


# ── tahap tihap: ekstraksi ──


def run_extract(doc_id: str, db: Session) -> dict:
    doc = db.get(Document, doc_id)
    if doc is None:
        raise RuntimeError("Dokumen tidak ditemukan.")

    sentences = db.exec(
        select(Sentence).where(Sentence.document_id == doc_id).order_by(Sentence.index)
    ).all()
    if len(sentences) == 0:
        raise RuntimeError("Segmentasi belum dijalankan.")
    if any(s.is_relevant is None for s in sentences):
        raise RuntimeError(
            "Prefilter belum dijalankan. Jalankan /stages/prefilter terlebih dahulu."
        )

    t0 = time.monotonic()
    doc.status = "processing"
    doc.error = None
    db.commit()

    _reset_document_rows(db, doc_id, keep_sentences=True)
    sentence_by_index = {s.index: s for s in sentences}

    relevant_segments: list[IndexedSentence] = [
        {"index": s.index, "text": s.text} for s in sentences if s.is_relevant
    ]
    stories = asyncio.run(extract_stories(gemini_provider, relevant_segments))
    _persist_stories(db, doc, stories, sentence_by_index)

    doc.status = "completed"
    db.commit()

    elapsed = time.monotonic() - t0
    logger.info(
        "[extract]   doc=%s %d kalimat -> %d user story (%.2fs)",
        doc_id[:8], len(relevant_segments), len(stories), elapsed,
    )

    return {
        "documentId": doc_id,
        "stage": "extract",
        "count": len(stories),
        "userStories": [
            {
                "storyCode": f"US-{s['id'] + 1:02d}",
                "actor": s["actor"],
                "action": s["action"],
                "benefit": s["benefit"],
                "sourceIndices": s["source_sentence_ids"],
            }
            for s in stories
        ],
    }


# ── tahap ke-8: verifikasi ──


def run_verify(doc_id: str, db: Session) -> dict:
    doc = db.get(Document, doc_id)
    if doc is None:
        raise RuntimeError("Dokumen tidak ditemukan.")

    stories = db.exec(
        select(UserStory).where(UserStory.document_id == doc_id)
    ).all()
    if len(stories) == 0:
        raise RuntimeError("Ekstraksi belum dijalankan. Jalankan /stages/extract terlebih dahulu.")

    t0 = time.monotonic()
    doc.status = "processing"
    doc.error = None
    db.commit()

    verified_now, skipped = _verify_pending(db, doc_id, stories)
    db.commit()

    total = verified_now + skipped
    valid_count = sum(
        1
        for s in stories
        for c in s.story_sentences
        if c.verification_status == "valid"
    )
    needs_review_count = sum(
        1
        for s in stories
        for c in s.story_sentences
        if c.verification_status == "needs_review"
    )

    doc.status = "completed"
    db.commit()

    elapsed = time.monotonic() - t0
    logger.info(
        "[verify]    doc=%s %d sitasi -> %d valid, %d needs_review (%.2fs)",
        doc_id[:8], total, valid_count, needs_review_count, elapsed,
    )

    return _build_verify_payload(doc_id, verified_now, skipped, stories)


# ── helper internal ──


def _reset_document_rows(
    db: Session, document_id: str, *, keep_sentences: bool = False
) -> None:
    db.exec(
        delete(StorySentence).where(
            StorySentence.story_id.in_(
                select(UserStory.id).where(UserStory.document_id == document_id)
            )
        )
    )
    db.exec(delete(UserStory).where(UserStory.document_id == document_id))
    if not keep_sentences:
        db.exec(delete(Sentence).where(Sentence.document_id == document_id))
    db.flush()


def _persist_sentences(
    doc: Document, db: Session, segments: list[IndexedSentence]
) -> None:
    for seg in segments:
        db.add(Sentence(document_id=doc.id, index=seg["index"], text=seg["text"]))
    db.flush()


def _persist_stories(
    db: Session,
    doc: Document,
    stories: list[StoryResult],
    sentence_by_index: dict[int, Sentence],
) -> None:
    for story in stories:
        us = UserStory(
            document_id=doc.id,
            story_code=f"US-{story['id'] + 1:02d}",
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

        for index in source_ids:
            sentence = sentence_by_index[index]
            db.add(
                StorySentence(
                    story_id=us.id,
                    sentence_id=sentence.id,
                    llm_verdict=False,
                    confidence_score=None,
                    llm_reason=None,
                    embedding_similarity=None,
                    verification_status="needs_review",
                )
            )
        db.flush()


def _verify_pending(
    db: Session, document_id: str, stories: list[UserStory]
) -> tuple[int, int]:
    use_embedding = settings.use_embedding_fallback
    verified_now = 0
    skipped = 0

    for story in stories:
        pending = [
            c
            for c in story.story_sentences
            if c.llm_reason is None
        ]
        if not pending:
            skipped += len(story.story_sentences)
            continue

        source_texts: list[str] = []
        claim_vectors: list[list[float]] = []
        if use_embedding:
            claim_vector = embedder.embed_texts([f"query: {_claim_text(story)}"])[0]
            for c in pending:
                claim_vectors.append(claim_vector)
                source_texts.append(f"passage: {c.sentence.text}")
            source_vectors = embedder.embed_texts(source_texts)

        for j, c in enumerate(pending):
            verified_now += 1
            similarity = None
            if use_embedding:
                similarity = cosine_similarity(claim_vectors[j], source_vectors[j])
            status, confidence, reason = asyncio.run(
                verify_sentence(
                    lm_studio_provider,
                    sentence_index=c.sentence.index,
                    sentence_text=c.sentence.text,
                    story={
                        "id": int(story.story_code.split("-")[-1]) - 1,
                        "actor": story.actor,
                        "action": story.action,
                        "benefit": story.benefit,
                        "source_sentence_ids": [],  # tidak dipakai verify
                    },
                    embedding_similarity=similarity,
                )
            )
            c.verification_status = status
            c.confidence_score = confidence
            c.llm_reason = reason
            c.llm_verdict = status == "valid"
            c.embedding_similarity = similarity
            db.add(c)
        db.flush()

    return verified_now, skipped


def _build_verify_payload(
    doc_id: str, verified_now: int, skipped: int, stories: list[UserStory]
) -> dict:
    citations = []
    for story in stories:
        for c in story.story_sentences:
            citations.append(
                {
                    "storyCode": story.story_code,
                    "sentenceIndex": c.sentence.index,
                    "verificationStatus": c.verification_status,
                    "confidenceScore": c.confidence_score,
                    "llmReason": c.llm_reason,
                    "embeddingSimilarity": c.embedding_similarity,
                }
            )
    return {
        "documentId": doc_id,
        "stage": "verify",
        "verifiedCount": verified_now,
        "skippedCount": skipped,
        "citations": citations,
    }


def _claim_text(story: UserStory) -> str:
    parts = [story.actor, story.action, story.benefit]
    return " ".join(p for p in parts if p).strip()