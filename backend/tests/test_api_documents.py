def test_create_document_201(client):
    res = client.post("/api/documents", json={"title": "Rapat A", "content": "Selamat pagi. Kita bahas fitur login."})
    assert res.status_code == 201
    assert "id" in res.json()["data"]


def test_create_default_title(client):
    res = client.post("/api/documents", json={"content": "Isi rapat saja."})
    assert res.status_code == 201
    doc_id = res.json()["data"]["id"]
    detail = client.get(f"/api/documents/{doc_id}").json()["data"]
    assert detail["title"] == "Tanpa Judul"


def test_create_content_too_long_422(client):
    res = client.post("/api/documents", json={"content": "a" * 50_001})
    assert res.status_code == 422
    err = res.json()["error"]
    assert err["code"] == "CONTENT_TOO_LONG"


def test_create_empty_content_400(client):
    res = client.post("/api/documents", json={"content": ""})
    assert res.status_code == 400
    assert res.json()["error"]["code"] == "VALIDATION_ERROR"


def test_create_not_json_400(client):
    res = client.post("/api/documents", data="bukan json")
    assert res.status_code == 400
    assert res.json()["error"]["code"] == "BAD_REQUEST"


def test_list_documents_empty(client):
    res = client.get("/api/documents")
    assert res.status_code == 200
    assert res.json()["data"] == []


def test_list_documents_item(client):
    client.post("/api/documents", json={"title": "Rapat A", "content": "konten"})
    res = client.get("/api/documents")
    item = res.json()["data"][0]
    assert item["title"] == "Rapat A"
    assert item["status"] == "pending"
    assert item["storyCount"] == 0
    assert item["truncated"] is False


def test_get_document_404(client):
    res = client.get("/api/documents/nonexistent")
    assert res.status_code == 404
    assert res.json()["error"]["code"] == "NOT_FOUND"


def test_get_document_detail(client):
    created = client.post("/api/documents", json={"title": "Rapat", "content": "konten"}).json()["data"]
    res = client.get(f"/api/documents/{created['id']}")
    assert res.status_code == 200
    data = res.json()["data"]
    assert data["title"] == "Rapat"
    assert data["sentences"] == []
    assert data["userStories"] == []