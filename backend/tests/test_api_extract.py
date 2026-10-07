from app.core.models import Document
from app.core.db import SessionLocal


def _patch_for_combined(monkeypatch):
    async def fake_prefilter(provider, sentences, temperature=0):
        return [s["index"] for s in sentences]

    async def fake_extract(provider, sentences):
        return [
            {
                "id": 0,
                "actor": "Admin",
                "action": "login",
                "benefit": "aman",
                "source_sentence_ids": [0],
            },
        ]

    async def fake_verify(
        provider,
        *,
        sentence_index,
        sentence_text,
        story,
        embedding_similarity=None,
        temperature=0,
    ):
        return ("valid", 0.9, "ok")

    monkeypatch.setattr(
        "app.pipeline.pipeline.find_relevant_sentence_ids", fake_prefilter
    )
    monkeypatch.setattr("app.pipeline.pipeline.extract_stories", fake_extract)
    monkeypatch.setattr("app.pipeline.pipeline.verify_sentence", fake_verify)


def test_extract_202_then_processing(client, monkeypatch):
    def noop(_doc_id: str) -> None:
        pass

    monkeypatch.setattr("app.api.documents.process_document", noop)
    created = client.post("/api/documents", json={"content": "Kita bahas fitur login."}).json()["data"]
    res = client.post(f"/api/documents/{created['id']}/extract")
    assert res.status_code == 202
    assert res.json()["data"]["status"] == "processing"

    detail = client.get(f"/api/documents/{created['id']}").json()["data"]
    assert detail["status"] == "processing"


def test_extract_404(client):
    res = client.post("/api/documents/nonexistent/extract")
    assert res.status_code == 404
    assert res.json()["error"]["code"] == "NOT_FOUND"


def test_extract_conflict_when_processing(client):
    created = client.post("/api/documents", json={"content": "konten"}).json()["data"]
    with SessionLocal() as db:
        doc = db.get(Document, created["id"])
        doc.status = "processing"
        db.add(doc)
        db.commit()
    res = client.post(f"/api/documents/{created['id']}/extract")
    assert res.status_code == 409
    assert res.json()["error"]["code"] == "CONFLICT"


# ── combined one-shot ──

def test_combined_async_202(client, monkeypatch):
    monkeypatch.setattr("app.api.documents.process_document", lambda _doc_id: None)
    res = client.post("/api/documents/extract", json={"content": "A"})
    assert res.status_code == 202
    data = res.json()["data"]
    assert data["status"] == "processing"
    assert "documentId" in data


def test_combined_wait_returns_dto(client, monkeypatch):
    _patch_for_combined(monkeypatch)
    res = client.post(
        "/api/documents/extract?wait=300",
        json={"content": "Admin login. Kasir cetak laporan."},
    )
    assert res.status_code == 200
    data = res.json()["data"]
    assert "userStories" in data
    assert len(data["userStories"]) >= 1
    assert data["userStories"][0]["actor"] == "Admin"
    assert "sentences" in data


def test_combined_wait_timeout(client, monkeypatch):
    monkeypatch.setattr("app.api.documents.process_document", lambda _doc_id: None)
    monkeypatch.setattr("app.jobs.queue.wait_until_idle", lambda timeout: False)
    res = client.post(
        "/api/documents/extract?wait=1",
        json={"content": "A"},
    )
    assert res.status_code == 202
    assert "belum selesai" in res.json()["note"]


def test_combined_validation_content_empty(client):
    res = client.post("/api/documents/extract", json={"content": ""})
    assert res.status_code == 400
    assert res.json()["error"]["code"] == "VALIDATION_ERROR"


def test_combined_validation_content_too_long(client):
    long_text = "A" * 50_001
    res = client.post("/api/documents/extract", json={"content": long_text})
    assert res.status_code == 422
    assert res.json()["error"]["code"] == "CONTENT_TOO_LONG"


def test_combined_validation_wait_out_of_range(client):
    res = client.post(
        "/api/documents/extract?wait=999",
        json={"content": "A"},
    )
    assert res.status_code == 422


def test_extract_with_wait(client, monkeypatch):
    _patch_for_combined(monkeypatch)
    created = client.post(
        "/api/documents",
        json={"content": "Admin login. Kasir cetak laporan."},
    ).json()["data"]
    doc_id = created["id"]

    res = client.post(f"/api/documents/{doc_id}/extract?wait=300")
    assert res.status_code in (200, 202)

    data = res.json()["data"]
    if res.status_code == 200:
        assert "userStories" in data
        assert len(data["userStories"]) >= 1
    else:
        assert data["status"] == "processing"
        assert "documentId" in data