from sqlmodel import select

from app.core.db import SessionLocal
from app.core.models import Document, Sentence, StorySentence, UserStory
from app.pipeline.pipeline import process_document


def _patch_pipeline(monkeypatch):
    async def fake_prefilter(provider, sentences, temperature=0):
        return [s["index"] for s in sentences]

    async def fake_extract(provider, sentences):
        results = [
            {
                "id": 0,
                "actor": "Admin",
                "action": "setiap hari mencetak laporan",
                "benefit": "",
                "source_sentence_ids": [0],
            },
            {
                "id": 1,
                "actor": "Kasir",
                "action": "scan barcode pakai alat genggam",
                "benefit": "mengurangi antrean",
                "source_sentence_ids": [1],
            },
        ]
        return results

    async def fake_verify(
        provider,
        *,
        sentence_index,
        sentence_text,
        story,
        embedding_similarity=None,
        temperature=0,
    ):
        return ("valid", 0.95, "sesuai sumber")

    monkeypatch.setattr(
        "app.pipeline.pipeline.find_relevant_sentence_ids", fake_prefilter
    )
    monkeypatch.setattr("app.pipeline.pipeline.extract_stories", fake_extract)
    monkeypatch.setattr("app.pipeline.pipeline.verify_sentence", fake_verify)


def test_pipeline_completes(client, monkeypatch):
    _patch_pipeline(monkeypatch)
    created = client.post(
        "/api/documents",
        json={"title": "Rapat", "content": "Admin mencetak laporan tiap pagi di ruang kasir."},
    ).json()["data"]
    doc_id = created["id"]

    # bedakan dua kalimat agar source ids 0 dan 1 valid
    with SessionLocal() as db:
        doc = db.get(Document, doc_id)
        doc.content = "Admin cetak laporan pagi. Kasir scan barcode genggam."
        db.add(doc)
        db.commit()

    process_document(doc_id)

    with SessionLocal() as db:
        doc = db.get(Document, doc_id)
        assert doc.status == "completed", doc.error
        assert doc.error is None

        sentences = db.exec(select(Sentence).where(Sentence.document_id == doc_id)).all()
        assert len(sentences) == 2

        stories = db.exec(select(UserStory).where(UserStory.document_id == doc_id)).all()
        assert [s.story_code for s in sorted(stories, key=lambda x: x.story_code)] == ["US-01", "US-02"]

        links = db.exec(select(StorySentence)).all()
        assert len(links) == 2
        assert all(l.verification_status == "valid" for l in links)
        assert all(l.llm_verdict is True for l in links)


def test_pipeline_failed_state(client, monkeypatch):
    def boom(*args, **kwargs):
        raise RuntimeError("LLM outage")

    monkeypatch.setattr(
        "app.pipeline.pipeline.find_relevant_sentence_ids", boom
    )
    created = client.post("/api/documents", json={"content": "Kita bahas fitur login."}).json()["data"]
    process_document(created["id"])

    with SessionLocal() as db:
        doc = db.get(Document, created["id"])
        assert doc.status == "failed"
        assert doc.error is not None