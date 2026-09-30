from app.core.models import Document
from app.core.db import SessionLocal


def test_extract_202_then_processing(client, monkeypatch):
    def noop(_doc_id: str) -> None:
        pass

    monkeypatch.setattr("app.api.documents.process_document", noop)
    created = client.post("/api/documents", json={"content": "Kita bahas fitur login."}).json()["data"]
    res = client.post(f"/api/documents/{created['id']}/extract")
    assert res.status_code == 202
    assert res.json()["data"] == {"status": "processing"}

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