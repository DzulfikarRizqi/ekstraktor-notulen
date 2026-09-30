from fastapi import APIRouter, Depends, Request, Response
from sqlmodel import Session, select
from starlette.background import BackgroundTasks

from app.core.db import get_session
from app.core.http import bad_request, conflict, json_error, not_found
from app.core.mappers import to_document_dto
from app.core.models import Document
from app.core.schemas import DocumentListItem
from app.jobs import queue
from app.pipeline.pipeline import process_document

router = APIRouter(prefix="/documents", tags=["documents"])

EMPTY_TITLE = "Tanpa Judul"
MAX_CONTENT_CHARS = 50_000


@router.get("")
def list_documents(db: Session = Depends(get_session)):
    docs = db.exec(select(Document).order_by(Document.created_at.desc())).all()
    items: list[DocumentListItem] = []
    for doc in docs:
        items.append(
            DocumentListItem(
                id=doc.id,
                title=doc.title,
                status=doc.status,
                truncated=doc.truncated,
                createdAt=doc.created_at.isoformat(),
                storyCount=len(doc.user_stories),
            )
        )
    return {"data": [i.model_dump() for i in items]}


@router.post("", status_code=201)
async def create_document(request: Request, db: Session = Depends(get_session)):
    try:
        body = await request.json()
    except Exception:  # noqa: BLE001
        return bad_request("Body harus berupa JSON.")
    if not isinstance(body, dict):
        return json_error("VALIDATION_ERROR", "Body harus berupa objek JSON.", 400)

    content = body.get("content")
    title = body.get("title")
    if not isinstance(content, str) or content.strip() == "":
        return json_error("VALIDATION_ERROR", _content_min_message(), 400)
    if len(content) > MAX_CONTENT_CHARS:
        return json_error(
            "CONTENT_TOO_LONG",
            _content_max_message(),
            422,
        )
    if title is not None and (not isinstance(title, str) or len(title) > 200):
        return json_error("VALIDATION_ERROR", "Panjang judul maksimal 200 karakter.", 400)

    if isinstance(title, str) and title.strip():
        doc = Document(title=title.strip(), content=content)
    else:
        doc = Document(title=EMPTY_TITLE, content=content)
    db.add(doc)
    db.commit()
    db.refresh(doc)
    return {"data": {"id": doc.id}}


@router.get("/{document_id}")
def get_document(document_id: str, db: Session = Depends(get_session)):
    doc = db.get(Document, document_id)
    if doc is None:
        return not_found("Dokumen tidak ditemukan.")
    return {"data": to_document_dto(doc)}


@router.post("/{document_id}/extract", status_code=202)
def extract_document(
    document_id: str,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_session),
):
    doc = db.get(Document, document_id)
    if doc is None:
        return not_found("Dokumen tidak ditemukan.")
    if doc.status == "processing":
        return conflict("Dokumen sedang diproses.")

    doc.status = "processing"
    doc.truncated = False
    doc.error = None
    db.add(doc)
    db.commit()

    queue.enqueue_job(lambda: process_document(document_id))
    return {"data": {"status": "processing"}}


@router.get("/{document_id}/export")
def export_document(
    document_id: str,
    format: str = "md",
    filter: str = "approved",
    db: Session = Depends(get_session),
):
    doc = db.get(Document, document_id)
    if doc is None:
        return not_found("Dokumen tidak ditemukan.")

    filter_name = _parse_filter(filter)
    as_csv = format == "csv"
    stories = sorted(doc.user_stories, key=lambda s: s.story_code)
    selected = _filter_stories(stories, filter_name)

    if as_csv:
        lines = [
            ["story_code", "actor", "action", "benefit", "status", "source_indices"],
            *[
                [
                    s.story_code,
                    s.actor,
                    s.action,
                    s.benefit,
                    s.status,
                    ";".join(str(c.sentence.index) for c in s.story_sentences),
                ]
                for s in selected
            ],
        ]
        content = "\n".join(",".join(_escape_csv(cell) for cell in row) for row in lines)
        content_type = "text/csv"
        extension = "csv"
    else:
        blocks = []
        for s in selected:
            sources = "\n".join(
                f"  - `kalimat ke-{c.sentence.index + 1}` (`[{c.sentence.index}]` "
                f'"{c.sentence.text}") — {"valid" if c.verification_status == "valid" else "needs_review"}'
                for c in sorted(s.story_sentences, key=lambda x: x.sentence.index)
            )
            blocks.append(
                "\n".join(
                    [
                        f"### {s.story_code}",
                        f"**Sebagai** {s.actor}, **saya ingin** {s.action} **agar** {s.benefit}",
                        "",
                        f"Status: {s.status}",
                        sources if sources else "Sumber: -",
                    ]
                )
            )
        content = "\n\n---\n\n".join(blocks)
        parts = [f"# User Story — {doc.title}", "", content or "_Tidak ada user story._", ""]
        content = "\n".join(parts)
        content_type = "text/plain"
        extension = "md"

    safe_title = "".join(ch for ch in doc.title if ch.isalnum() or ch in " -_").strip()
    filename = f"{safe_title}-{filter_name}.{extension}"
    return Response(
        content=content,
        media_type=content_type,
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )


def _content_min_message() -> str:
    return "Konten wajib diisi minimal 1 karakter."


def _content_max_message() -> str:
    return f"Konten melebihi {MAX_CONTENT_CHARS:,} karakter.".replace(",", ".")


def _parse_filter(value: str) -> str:
    if value in {"approved", "all", "pending", "needs_review"}:
        return value
    return "approved"


def _filter_stories(stories, filter_name: str):
    if filter_name == "approved":
        return [s for s in stories if s.status == "approved"]
    if filter_name == "pending":
        return [s for s in stories if s.status == "pending"]
    if filter_name == "needs_review":
        return [
            s
            for s in stories
            if any(c.verification_status == "needs_review" for c in s.story_sentences)
        ]
    return stories


def _escape_csv(value: str) -> str:
    if any(ch in value for ch in [",", '"', "\n"]):
        return f'"{value.replace(chr(34), chr(34) + chr(34))}"'
    return value