import pytest
from sqlmodel import select

from app.core.models import Document, Sentence, StorySentence, UserStory


def _patch_stage(monkeypatch):
    async def fake_prefilter(provider, sentences, temperature=0):
        return [s["index"] for s in sentences]

    async def fake_extract(provider, sentences):
        return [
            {
                "id": 0,
                "actor": "Admin",
                "action": "login",
                "benefit": "masuk sistem",
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
        return ("valid", 0.95, "sesuai")

    monkeypatch.setattr(
        "app.pipeline.pipeline.find_relevant_sentence_ids", fake_prefilter
    )
    monkeypatch.setattr("app.pipeline.pipeline.extract_stories", fake_extract)
    monkeypatch.setattr("app.pipeline.pipeline.verify_sentence", fake_verify)


def _create_doc(client, content="Admin bisa login. Kasir cetak laporan."):
    return client.post("/api/documents", json={"content": content}).json()["data"]["id"]


# ── segment ──

def test_stage_segment_200(client):
    doc_id = _create_doc(client)
    res = client.post(f"/api/documents/{doc_id}/stages/segment")
    assert res.status_code == 200
    data = res.json()["data"]
    assert data["stage"] == "segment"
    assert data["count"] == 2
    assert len(data["sentences"]) == 2
    assert data["sentences"][0]["index"] == 0
    assert data["sentences"][0]["text"] == "Admin bisa login."
    assert data["sentences"][1]["text"] == "Kasir cetak laporan."


def test_stage_segment_404(client):
    res = client.post("/api/documents/notexist/stages/segment")
    assert res.status_code == 404


def test_stage_segment_deletes_previous(client, monkeypatch):
    _patch_stage(monkeypatch)
    doc_id = _create_doc(client, content="Admin login. Kasir cetak. Gudang stok.")
    client.post(f"/api/documents/{doc_id}/stages/segment")
    client.post(f"/api/documents/{doc_id}/stages/prefilter")
    client.post(f"/api/documents/{doc_id}/stages/extract")

    detail = client.get(f"/api/documents/{doc_id}").json()["data"]
    assert len(detail["userStories"]) > 0

    client.post(f"/api/documents/{doc_id}/stages/segment")
    detail = client.get(f"/api/documents/{doc_id}").json()["data"]
    assert len(detail["userStories"]) == 0
    assert len(detail["sentences"]) == 3


# ── prefilter ──

def test_stage_prefilter_200(client, monkeypatch):
    _patch_stage(monkeypatch)
    doc_id = _create_doc(client, content="Admin login. Kasir cetak.")
    client.post(f"/api/documents/{doc_id}/stages/segment")
    res = client.post(f"/api/documents/{doc_id}/stages/prefilter")
    assert res.status_code == 200
    data = res.json()["data"]
    assert data["stage"] == "prefilter"
    assert data["totalCount"] == 2
    assert data["keptCount"] == 2
    assert data["droppedCount"] == 0
    assert data["relevantIndices"] == [0, 1]
    assert data["droppedIndices"] == []
    for s in data["sentences"]:
        assert s["isRelevant"] is True


def test_stage_prefilter_404(client):
    res = client.post("/api/documents/notexist/stages/prefilter")
    assert res.status_code == 404


def test_stage_prefilter_409_no_sentences(client):
    doc_id = _create_doc(client)
    res = client.post(f"/api/documents/{doc_id}/stages/prefilter")
    assert res.status_code == 409
    assert "Segmentasi" in res.json()["error"]["message"]


def test_stage_prefilter_sets_is_relevant(client, monkeypatch):
    _patch_stage(monkeypatch)
    doc_id = _create_doc(client, content="Halo pagi. Admin login. Terima kasih.")
    client.post(f"/api/documents/{doc_id}/stages/segment")
    client.post(f"/api/documents/{doc_id}/stages/prefilter")

    detail = client.get(f"/api/documents/{doc_id}").json()["data"]
    for s in detail["sentences"]:
        assert s["isRelevant"] is not None


def test_stage_prefilter_isRelevant_visible_in_get(client, monkeypatch):
    _patch_stage(monkeypatch)
    doc_id = _create_doc(client, content="X. Y.")
    client.post(f"/api/documents/{doc_id}/stages/segment")
    client.post(f"/api/documents/{doc_id}/stages/prefilter")

    detail = client.get(f"/api/documents/{doc_id}").json()["data"]
    assert all(s["isRelevant"] is True for s in detail["sentences"])


# ── extract ──

def test_stage_extract_200(client, monkeypatch):
    _patch_stage(monkeypatch)
    doc_id = _create_doc(client, content="Admin login. Kasir cetak laporan.")
    client.post(f"/api/documents/{doc_id}/stages/segment")
    client.post(f"/api/documents/{doc_id}/stages/prefilter")
    res = client.post(f"/api/documents/{doc_id}/stages/extract")
    assert res.status_code == 200
    data = res.json()["data"]
    assert data["stage"] == "extract"
    assert data["count"] >= 1
    assert data["userStories"][0]["actor"] == "Admin"


def test_stage_extract_404(client):
    res = client.post("/api/documents/notexist/stages/extract")
    assert res.status_code == 404


def test_stage_extract_409_no_sentences(client):
    doc_id = _create_doc(client)
    res = client.post(f"/api/documents/{doc_id}/stages/extract")
    assert res.status_code == 409
    assert "Segmentasi" in res.json()["error"]["message"]


def test_stage_extract_409_no_prefilter(client, monkeypatch):
    _patch_stage(monkeypatch)
    doc_id = _create_doc(client, content="A. B.")
    client.post(f"/api/documents/{doc_id}/stages/segment")
    res = client.post(f"/api/documents/{doc_id}/stages/extract")
    assert res.status_code == 409
    assert "Prefilter" in res.json()["error"]["message"]


def test_stage_extract_unverified_citations(client, monkeypatch):
    _patch_stage(monkeypatch)
    doc_id = _create_doc(client, content="Admin login.")
    client.post(f"/api/documents/{doc_id}/stages/segment")
    client.post(f"/api/documents/{doc_id}/stages/prefilter")
    client.post(f"/api/documents/{doc_id}/stages/extract")

    detail = client.get(f"/api/documents/{doc_id}").json()["data"]
    story = detail["userStories"][0]
    assert len(story["citations"]) >= 1
    for c in story["citations"]:
        assert c["llmReason"] is None
        assert c["confidenceScore"] is None
        assert c["verificationStatus"] == "needs_review"


# ── verify ──

def test_stage_verify_200(client, monkeypatch):
    _patch_stage(monkeypatch)
    doc_id = _create_doc(client, content="Admin login. Kasir cetak.")
    client.post(f"/api/documents/{doc_id}/stages/segment")
    client.post(f"/api/documents/{doc_id}/stages/prefilter")
    client.post(f"/api/documents/{doc_id}/stages/extract")
    res = client.post(f"/api/documents/{doc_id}/stages/verify")
    assert res.status_code == 200
    data = res.json()["data"]
    assert data["stage"] == "verify"
    assert data["verifiedCount"] >= 1
    assert data["skippedCount"] == 0


def test_stage_verify_404(client):
    res = client.post("/api/documents/notexist/stages/verify")
    assert res.status_code == 404


def test_stage_verify_409_no_stories(client):
    doc_id = _create_doc(client)
    client.post(f"/api/documents/{doc_id}/stages/segment")
    res = client.post(f"/api/documents/{doc_id}/stages/verify")
    assert res.status_code == 409
    assert "Ekstraksi" in res.json()["error"]["message"]


def test_stage_verify_second_run_skips(client, monkeypatch):
    _patch_stage(monkeypatch)
    doc_id = _create_doc(client, content="Admin login.")
    client.post(f"/api/documents/{doc_id}/stages/segment")
    client.post(f"/api/documents/{doc_id}/stages/prefilter")
    client.post(f"/api/documents/{doc_id}/stages/extract")
    r1 = client.post(f"/api/documents/{doc_id}/stages/verify")
    assert r1.status_code == 200
    d1 = r1.json()["data"]
    assert d1["verifiedCount"] > 0
    assert d1["skippedCount"] == 0

    r2 = client.post(f"/api/documents/{doc_id}/stages/verify")
    assert r2.status_code == 200
    d2 = r2.json()["data"]
    assert d2["verifiedCount"] == 0
    assert d2["skippedCount"] > 0


def test_stage_verify_fills_citations(client, monkeypatch):
    _patch_stage(monkeypatch)
    doc_id = _create_doc(client, content="Admin login.")
    client.post(f"/api/documents/{doc_id}/stages/segment")
    client.post(f"/api/documents/{doc_id}/stages/prefilter")
    client.post(f"/api/documents/{doc_id}/stages/extract")
    client.post(f"/api/documents/{doc_id}/stages/verify")

    detail = client.get(f"/api/documents/{doc_id}").json()["data"]
    story = detail["userStories"][0]
    for c in story["citations"]:
        assert c["llmReason"] is not None
        assert c["confidenceScore"] is not None
        assert c["verificationStatus"] == "valid"


# ── e2e ──

def test_full_four_stages(client, monkeypatch):
    _patch_stage(monkeypatch)
    doc_id = _create_doc(client, content="Admin login. Kasir cetak laporan.")
    assert client.post(f"/api/documents/{doc_id}/stages/segment").status_code == 200
    assert client.post(f"/api/documents/{doc_id}/stages/prefilter").status_code == 200
    assert client.post(f"/api/documents/{doc_id}/stages/extract").status_code == 200
    assert client.post(f"/api/documents/{doc_id}/stages/verify").status_code == 200

    detail = client.get(f"/api/documents/{doc_id}").json()["data"]
    assert detail["status"] == "completed"
    assert len(detail["sentences"]) == 2
    assert len(detail["userStories"]) >= 1
    story = detail["userStories"][0]
    assert story["actor"] == "Admin"
    for c in story["citations"]:
        assert c["verificationStatus"] == "valid"


# ── logging ──

def test_prefilter_logged(client, monkeypatch, caplog):
    import logging

    caplog.set_level(logging.INFO, logger="app.pipeline")
    _patch_stage(monkeypatch)
    doc_id = _create_doc(client, content="Admin login. Kasir cetak.")
    client.post(f"/api/documents/{doc_id}/stages/segment")
    client.post(f"/api/documents/{doc_id}/stages/prefilter")

    logs = [r.message for r in caplog.records if "[prefilter]" in r.message]
    assert len(logs) >= 1
    assert "lolos" in logs[0]