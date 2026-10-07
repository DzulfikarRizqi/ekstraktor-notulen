# ekstraktor-notulen

Pipeline 4-tahap untuk mengekstrak User Story dari notulen rapat:
**segmentasi** → **prefilter** → **ekstraksi** → **verifikasi**

## Jalankan MVP (rekomendasi)

```bash
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

Pastikan:
- `backend/.env` → `GEMINI_API_KEY` terisi
- [LM Studio](https://lmstudio.ai/) berjalan di `localhost:1234` dengan model `qwen2.5-3b-instruct`

### Cara paling cepat: endpoint gabungan (1 request)

```bash
curl -s -X POST 'http://localhost:8000/api/documents/extract?wait=90' \
  -H 'Content-Type: application/json' \
  -d '{"content": "Pasien ingin daftar online. Petugas panggil nomor otomatis."}' \
  | python3 -m json.tool
```

Hasil: DocumentDto lengkap (sentences + userStories + citations), semuanya dalam satu respons.

### Kalau mau lihat per tahap: 4 tahap + lihat hasil

```bash
DOC_ID=$(curl -s -X POST http://localhost:8000/api/documents \
  -H 'Content-Type: application/json' \
  -d '{"content":"Admin bisa login. Kasir cetak laporan."}' \
  | jq -r '.data.id')

curl -s -X POST "http://localhost:8000/api/documents/$DOC_ID/stages/segment" | jq '.data.count'
curl -s -X POST "http://localhost:8000/api/documents/$DOC_ID/stages/prefilter" | jq '.data.relevantIndices'
curl -s -X POST "http://localhost:8000/api/documents/$DOC_ID/stages/extract" | jq '.data.userStories'
curl -s -X POST "http://localhost:8000/api/documents/$DOC_ID/stages/verify" | jq '.data.citations'

curl -s "http://localhost:8000/api/documents/$DOC_ID" | jq '.data'
```

Console uvicorn mencatat setiap tahap:
```
INFO app.pipeline: [segment]   doc=a1b2 2 kalimat (0.00s)
INFO app.pipeline: [prefilter] doc=a1b2 2 -> 2 lolos, 0 dibuang (1.42s)
INFO app.pipeline: [extract]   doc=a1b2 2 -> 1 user story (5.10s)
INFO app.pipeline: [verify]    doc=a1b2 1 -> 1 valid, 0 needs_review (3.2s)
```

### Koleksi Postman

- `postman/mvp.json` — 9 request minimum untuk MVP (health, buat, 4 tahap, lihat, one-shot, async)
- `postman/collection.json` — 18 request lengkap (termasuk export, story management)

## Pengembangan

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env  # isi GEMINI_API_KEY
py.test       # ~99 test, <2 detik
```