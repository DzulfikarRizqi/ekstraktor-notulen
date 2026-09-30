from sqlmodel import select

from app.core.db import SessionLocal
from app.core.models import Document, Sentence, StorySentence, UserStory


def _seed_completed_doc():
    with SessionLocal() as db:
        doc = Document(
            title="Rapat Perpustakaan",
            content="Admin menambah buku. Sistem mengirim email notifikasi.",
            status="completed",
        )
        db.add(doc)
        db.flush()
        sent0 = Sentence(document_id=doc.id, index=0, text="Admin menambah buku.")
        sent1 = Sentence(document_id=doc.id, index=1, text="Sistem mengirim email notifikasi.")
        db.add_all([sent0, sent1])
        db.flush()
        story = UserStory(
            document_id=doc.id,
            story_code="US-01",
            actor="Admin",
            action="menambah buku",
            benefit="koleksi lengkap",
            status="approved",
        )
        db.add(story)
        db.flush()
        db.add(
            StorySentence(
                story_id=story.id,
                sentence_id=sent0.id,
                llm_verdict=True,
                confidence_score=0.9,
                llm_reason="sesuai",
                embedding_similarity=0.8,
                verification_status="valid",
            )
        )
        db.commit()
        db.refresh(doc)
        return doc.id


def test_export_md(client):
    doc_id = _seed_completed_doc()
    res = client.get(f"/api/documents/{doc_id}/export?format=md&filter=approved")
    assert res.status_code == 200
    body = res.text
    assert "User Story — Rapat Perpustakaan" in body
    assert "### US-01" in body
    assert "kalimat ke-1" in body
    assert "Content-Disposition" in res.headers


def test_export_csv(client):
    doc_id = _seed_completed_doc()
    res = client.get(f"/api/documents/{doc_id}/export?format=csv&filter=all")
    assert res.status_code == 200
    assert res.headers["content-type"].startswith("text/csv")
    lines = res.text.strip().splitlines()
    assert lines[0] == "story_code,actor,action,benefit,status,source_indices"
    assert lines[1].split(",")[-1] == "0"


def test_export_needs_review_filter(client):
    doc_id = _seed_completed_doc()
    with SessionLocal() as db:
        story = db.exec(select(UserStory)).one()
        # tandai citation menjadi needs_review agar story terfilter
        link = db.exec(select(StorySentence)).one()
        link.verification_status = "needs_review"
        db.add(link)
        db.commit()

    res = client.get(f"/api/documents/{doc_id}/export?filter=needs_review")
    assert res.status_code == 200
    assert "US-01" in res.text


def test_export_empty_doc(client):
    created = client.post("/api/documents", json={"content": "konten"}).json()["data"]
    res = client.get(
        f"/api/documents/{created['id']}/export?format=md&filter=all"
    )
    assert res.status_code == 200
    assert "_Tidak ada user story._" in res.text