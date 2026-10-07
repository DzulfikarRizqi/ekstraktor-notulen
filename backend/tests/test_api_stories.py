from sqlmodel import select

from app.core.db import SessionLocal
from app.core.models import Document, Sentence, StorySentence, UserStory


def _seed():
    with SessionLocal() as db:
        doc = Document(title="Rapat", content="Admin mencetak laporan.")
        db.add(doc)
        db.flush()
        sentence = Sentence(document_id=doc.id, index=0, text="Admin mencetak laporan.")
        story = UserStory(document_id=doc.id, story_code="US-01", actor="Admin", action="mencetak laporan")
        db.add_all([sentence, story])
        db.commit()
        db.refresh(doc)
        db.refresh(sentence)
        db.refresh(story)
        return {"doc": doc, "sent": sentence, "story": story}


def test_patch_story_ok(client):
    seed = _seed()
    res = client.patch(
        f"/api/stories/{seed['story'].id}",
        json={"status": "approved", "benefit": "mempercepat kerja"},
    )
    assert res.status_code == 200
    assert res.json()["data"]["status"] == "approved"


def test_patch_story_not_found(client):
    res = client.patch("/api/stories/nonexistent", json={"status": "approved"})
    assert res.status_code == 404
    assert res.json()["error"]["code"] == "NOT_FOUND"


def test_patch_story_invalid_status(client):
    seed = _seed()
    res = client.patch(f"/api/stories/{seed['story'].id}", json={"status": "bogus"})
    assert res.status_code == 400
    assert res.json()["error"]["code"] == "BAD_REQUEST"


def test_patch_story_empty_updates(client):
    seed = _seed()
    res = client.patch(f"/api/stories/{seed['story'].id}", json={})
    assert res.status_code == 400


def test_delete_story(client):
    seed = _seed()
    res = client.delete(f"/api/stories/{seed['story'].id}")
    assert res.status_code == 200
    assert res.json()["data"] == {"ok": True}
    assert client.get(f"/api/documents/{seed['doc'].id}").json()["data"]["userStories"] == []


def test_delete_story_with_citation_cascades(client):
    """Story hasil pipeline selalu punya citation; cascade harus ikut menghapus."""
    seed = _seed()
    with SessionLocal() as db:
        link = StorySentence(
            story_id=seed["story"].id,
            sentence_id=seed["sent"].id,
            llm_verdict=True,
            verification_status="valid",
        )
        db.add(link)
        db.commit()

    res = client.delete(f"/api/stories/{seed['story'].id}")
    assert res.status_code == 200
    assert res.json()["data"] == {"ok": True}

    with SessionLocal() as db:
        assert db.exec(
            select(StorySentence).where(StorySentence.story_id == seed["story"].id)
        ).all() == []


def test_add_source_ok(client):
    seed = _seed()
    res = client.post(
        f"/api/stories/{seed['story'].id}/sources",
        json={"sentenceId": seed["sent"].id},
    )
    assert res.status_code == 201
    assert "id" in res.json()["data"]


def test_add_source_missing_sentence_id(client):
    seed = _seed()
    res = client.post(f"/api/stories/{seed['story'].id}/sources", json={})
    assert res.status_code == 400
    assert "sentenceId" in res.json()["error"]["message"]


def test_add_source_foreign_sentence(client):
    seed = _seed()
    with SessionLocal() as db:
        other_sent = Sentence(document_id="other-doc", index=0, text="lintas dokumen")
        db.add(other_sent)
        db.commit()
        db.refresh(other_sent)
    res = client.post(
        f"/api/stories/{seed['story'].id}/sources",
        json={"sentenceId": other_sent.id},
    )
    assert res.status_code == 400
    assert "tidak dikenal" in res.json()["error"]["message"]


def test_add_source_duplicate_conflict(client):
    seed = _seed()
    first = client.post(
        f"/api/stories/{seed['story'].id}/sources",
        json={"sentenceId": seed["sent"].id},
    )
    assert first.status_code == 201
    second = client.post(
        f"/api/stories/{seed['story'].id}/sources",
        json={"sentenceId": seed["sent"].id},
    )
    assert second.status_code == 409
    assert second.json()["error"]["code"] == "CONFLICT"


def test_remove_source_ok(client):
    seed = _seed()
    client.post(
        f"/api/stories/{seed['story'].id}/sources",
        json={"sentenceId": seed["sent"].id},
    )
    res = client.delete(
        f"/api/stories/{seed['story'].id}/sources",
        params={"sentenceId": seed["sent"].id},
    )
    assert res.status_code == 200
    assert res.json()["data"] == {"ok": True}
    with SessionLocal() as db:
        from app.core.models import StorySentence
        from sqlmodel import select

        links = db.exec(
            select(StorySentence).where(StorySentence.story_id == seed["story"].id)
        ).all()
        assert len(links) == 0


def test_remove_source_missing_param(client):
    seed = _seed()
    res = client.delete(f"/api/stories/{seed['story'].id}/sources")
    assert res.status_code == 400
    assert "sentenceId" in res.json()["error"]["message"]