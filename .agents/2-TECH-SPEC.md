# TECH SPEC — Aplikasi Ekstraksi User Story dari Notulensi Rapat Berbasis LLM dengan Penelusuran Sumber

> Acuan: `.agents/1-PRD.md`. Stack: Backend FastAPI (Python) + Frontend Next.js + SQLite (lokal) + LM Studio (model lokal). Ekstraksi = Gemini; prefilter & verifikasi = local LLM.

---

## Bagian 1: Tech Stack & Arsitektur

### Tech Stack

| Layer | Technology | Versi |
|-------|------------|-------|
| Frontend | Next.js (App Router) | 16.x |
| Language (frontend) | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| State (client) | React hooks + Server Components | - |
| Backend | **FastAPI** (Python, monorepo `backend/`) | 0.11x |
| Language (backend) | Python | 3.12 |
| Database | SQLite (file lokal, `sqlite:///./dev.db`) | - |
| ORM | SQLModel (SQLAlchemy 2.x) | - |
| Validasi schema | Pydantic v2 | 2.x |
| LLM API (ekstraksi) | `google-genai` — Gemini 2.5 Flash | - |
| LLM lokal (prefilter & verifikasi) | OpenAI-compatible via `openai` SDK → **LM Studio** (`http://localhost:1234/v1`) | - |
| Embedding cadangan | `sentence-transformers` (`intfloat/multilingual-e5-small`, python) | - |
| Auth | Tidak ada (V1 single-user lokal) | - |
| Hosting | Lokal (uvicorn `:8000` + `next dev :3000`, CORS) | - |

### Arsitektur Sistem

Pipeline inti (satu pemanggilan Gemini untuk ekstraksi; tugas lokal di LM Studio gratis):

```
UI (React)  →  API (FastAPI :8000)  →  [Job Runner in-memory (thread worker)]
                                             │
        ┌────────────────────────────────────┘
        ▼
  1. Segmenter ── kalimat + index
        ▼
  2. Prefilter (local LLM / LM Studio) ── klasifikasi kalimat relevan (structured JSON)
        ▼
  3. Ekstraksi (Gemini 2.5 Flash, 1× request, structured JSON)
        ▼
  4. Verifikasi (local LLM / LM Studio) ── is_valid + confidence_score + reason
        │        [embedding cosine = sinyal cadangan / double-check]
        ▼
  Simpan ke SQLite (Prisma) ── status: processing → completed/failed
        ▼
  UI: story ↔ kalimat sumber, konfidensi, review, ekspor
```

Prinsip biaya: **hanya tahap 3 yang menyentuh API berbayar (Gemini, 1 request/dokumen)**. Tahap 2 & 4 dijalankan model lokal melalui LM Studio (gratis, tanpa limit request). Embedding (`sentence-transformers`) hanya dipakai sebagai **sinyal cadangan** di tahap verifikasi.

### Kontrak Output LLM (JSON Schema)

Definisi tunggal schema ditentukan di `backend/app/llm/schema.py` (pydantic v2 → `model_json_schema()`), lalu diubah menjadi JSON Schema. Satu sumber kebenaran dipakai silang untuk **Gemini** (`response_schema`) dan **LM Studio/OpenAI-compatible** (`response_format.json_schema`). Tiga schema utama:

1. **`userStoriesSchema`** — output ekstraksi (dibawah).
2. **`prefilterSchema`** — output local LLM: `{ "relevant_sentence_ids": Array<integer> }`.
3. **`verificationSchema`** — output local LLM per citation: `{ "is_valid": boolean, "confidence_score": number (0–1), "reason": string }`.

Aturan main `userStoriesSchema`:
- **Flat & minimal `required`** — kepatuhan struktur lebih tinggi.
- **Field berbahasa Inggris** (actor/action/benefit), isi konten bebas bahasa Indonesia.
- **Tanpa field `id` dari LLM** — kode `US-01…n` dibuat server setelah array diterima (hindari duplikat).
- **`source_sentence_ids` berupa ANGKA (index kalimat 0-based)** — bukan teks — sehingga penunjukan ke `Sentence.index` di DB selalu persis dan hemat token.
- **Status verifikasi bukan ditentukan di schema ekstraksi** — diputuskan tahap verifikasi (local LLM + embedding cadangan).
- **`minItems: 1`** mendorong traceability sejak output; analis tetap bisa mengubah manual (FR-11).

JSON Schema yang dikirim sebagai `responseSchema`:

```json
{
  "type": "object",
  "properties": {
    "user_stories": {
      "type": "array",
      "maxItems": 30,
      "items": {
        "type": "object",
        "properties": {
          "actor": {
            "type": "string",
            "description": "Pelaku, mis. Admin"
          },
          "action": {
            "type": "string",
            "description": "Aktivitas, mis. 'mencetak laporan bulanan'"
          },
          "benefit": {
            "type": "string",
            "description": "Manfaat, mis. 'agar mudah merekap data'"
          },
          "source_sentence_ids": {
            "type": "array",
            "minItems": 1,
            "items": { "type": "integer", "minimum": 0 },
            "description": "Index kalimat di notulen (0-based) yang mendukung story ini"
          }
        },
        "required": ["actor", "action", "benefit", "source_sentence_ids"]
      }
    }
  },
  "required": ["user_stories"]
}
```

Contoh output yang LAZIM (setelah validasi pydantic, sebelum `id` ditambahkan server):

```json
{
  "user_stories": [
    {
      "actor": "Admin",
      "action": "mencetak laporan bulanan",
      "benefit": "agar mudah merekap data",
      "source_sentence_ids": [4, 7]
    }
  ]
}
```

Aturan validasi saat ekstraksi: output melanggar schema → **1× repair retry** (FR-05); array > 30 → **ditolak** (job `failed`, diminta batch ulang); `source_sentence_ids` di luar rentang kalimat → **dibuang** (tidak dibuat citation saat verifikasi).

### Struktur Folder

```text
ekstraktor-notulen/
├── backend/                               # FastAPI (Python)
│   ├── app/
│   │   ├── main.py                        # FastAPI app + CORS + lifespan init_db
│   │   ├── core/
│   │   │   ├── config.py                  # pydantic-settings (.env)
│   │   │   ├── db.py                      # engine SQLModel (SQLite) + SessionLocal
│   │   │   ├── models.py                  # ORM: Document/Sentence/UserStory/StorySentence
│   │   │   ├── schemas.py                 # DTO camelCase + request
│   │   │   ├── mappers.py                 # model → DTO
│   │   │   └── http.py                    # helper respon error BAD_REQUEST/NOT_FOUND/...
│   │   ├── llm/
│   │   │   ├── provider.py                # dataclass StructuredRequest + Protocol + generateStructured
│   │   │   ├── gemini.py                  # provider Gemini (response_schema)
│   │   │   ├── lmstudio.py                # provider LM Studio (response_format json_schema)
│   │   │   ├── schema.py                  # pydantic: userStories + prefilter + verification
│   │   │   ├── prompts.py                 # system + user prompt builders (3 tugas)
│   │   │   ├── parsing.py                 # parse_json: index min + code-fence
│   │   │   ├── retry.py                   # with_retry (hanya LlmError retryable)
│   │   │   └── errors.py                  # LlmError / is_retryable_status
│   │   ├── embedding/
│   │   │   ├── embedder.py                # sentence-transformers (lazy, cadangan)
│   │   │   └── similarity.py              # cosine similarity
│   │   ├── pipeline/
│   │   │   ├── segmenter.py               # regex sentence split (0-based index)
│   │   │   ├── prefilter.py               # LM Studio: klasifikasi kalimat relevan
│   │   │   ├── extraction.py              # Gemini + validasi pydantic
│   │   │   ├── verification.py            # LM Studio verdict + embedding cadangan
│   │   │   └── pipeline.py                # orkestrator 1→4 (thread worker)
│   │   ├── jobs/queue.py                  # job runner in-memory (thread + queue)
│   │   └── api/
│   │       ├── documents.py               # POST/GET documents, extract, export
│   │       └── stories.py                 # PATCH/DELETE story, sumber
│   ├── tests/                             # pytest (unit + TestClient API)
│   ├── requirements.txt
│   └── .env.example                       # GEMINI_API_KEY, LM_STUDIO_BASE_URL, dll.
├── frontend/                              # Next.js (UI only)
│   ├── src/app/                           # halaman + (UI tidak memanggil API Next; → backend :8000)
│   └── src/lib/                           # (referensi port TS → Python, DTO/dto)
├── postman/
│   └── collection.json                    # 9 request, baseUrl http://localhost:8000
└── data/                                  # (rencana) sample_minutes, model-tests, evaluation
```

### Justifikasi

- **FastAPI backend + Next.js frontend:** pisah domain — backend Python ideal untuk pipeline LLM/sklearn-numpy (embedding) & job runner thread; frontend Next.js hanya UI (Server Components). Dua proses lokal (`uvicorn :8000`, `next dev :3000`) terhubung via CORS.
- **SQLite + SQLModel:** tanpa server DB, file lokal, mudah dibawa/di-backup untuk keperluan skripsi; SQLModel memberi type-safety (Pydantic) atas SQLAlchemy.
- **Abstraksi OpenAI-compatible:** satu client `openai` SDK untuk LM Studio (lokal) dan nanti Groq/Together/OpenRouter (API open-source) — cukup ganti `base_url`.
- **LM Studio:** structured output via JSON schema terkonfirmasi; menjalankan prefilter & verifikasi tanpa biaya & tanpa limit request (ekstraksi tetap Gemini).
- **sentence-transformers (cadangan):** cosine similarity sebagai sinyal penunjang verifikasi — model `intfloat/multilingual-e5-small` lokal (offline setelah unduh).

---

## Bagian 2: Database Design

### Ringkasan Database

| Item | Detail |
|------|--------|
| Database | SQLite (file: `backend/dev.db`, `sqlite:///./dev.db`) |
| ORM | SQLModel (SQLAlchemy 2.x) |
| Pendekatan | Relasional |
| Migrasi | `init_db()` (SQLModel.metadata.create_all di lifespan) — reset DB dev disetujui, tanpa Alembic |

### Entity Overview

| Entity | Key Fields | Relasi |
|--------|-----------|--------|
| Document | id, title, content, status, truncated, error, createdAt, updatedAt | → Sentence (1:N), → UserStory (1:N) |
| Sentence | id, documentId, index, text | ← Document, ↔ UserStory (M:N via StorySentence) |
| UserStory | id, documentId, storyCode, actor, action, benefit, status, createdAt, updatedAt | ← Document, ↔ Sentence (M:N) |
| StorySentence | id, storyId, sentenceId, llmVerdict, confidenceScore, llmReason, embeddingSimilarity, verificationStatus | ← UserStory, ← Sentence |
| EvaluationRun | id, type (baseline/proposed), docCount, metricsJson, createdAt | - |

Constraints:
- `Sentence` — unik `(documentId, index)`.
- `StorySentence` — unik `(storyId, sentenceId)`.
- `Document.status` — `pending | processing | completed | failed`.
- `UserStory.status` — `pending | approved | rejected`.
- `StorySentence.verificationStatus` — `valid | needs_review`.

### Index Strategy

- `Sentence(documentId, index)` — lookup kalimat per dokumen (traceability).
- `UserStory(documentId)` — list story per dokumen.
- `StorySentence(storyId)`, `StorySentence(sentenceId)` — join cepat.

### Data Flow

Analis `POST /api/documents` (1) → document `pending`. `POST /api/documents/:id/extract` (2) → status `processing`, job runner menjalankan pipeline (3) → Sentence & UserStory & StorySentence dibuat, status `completed` (4). UI baca `GET /api/documents/:id` untuk menampilkan story ↔ sumber. Aksi review menulis ke UserStory/StorySentence. Benchmark (`scripts/evaluations/run.ts`) menulis ke EvaluationRun.

---

## Bagian 3: Interface Design

> Backend = FastAPI (di `backend/`, prefix `/api`, port `8000`). Frontend Next.js (di `frontend/`, port `3000`) = Server Components + client components.

### API Routes

| Method | Path | Deskripsi (FR) | Auth |
|--------|------|----------------|------|
| POST | `/api/documents` | Buat dokumen (FR-01) | N/A |
| GET | `/api/documents` | Daftar dokumen + status (FR-02) | N/A |
| GET | `/api/documents/:id` | Detail dokumen: story + sentences + citations (FR-07, FR-12) | N/A |
| POST | `/api/documents/:id/extract` | Mulai pipeline (FR-03..06) | N/A |
| GET | `/api/documents/:id/export?filter=approved` | Ekspor Markdown/CSV (FR-13) | N/A |
| PATCH | `/api/stories/:id` | Update status / edit story (FR-09, FR-10) | N/A |
| POST | `/api/stories/:id/sources` | Tambah tautan kalimat sumber (FR-11) | N/A |
| DELETE | `/api/stories/:id/sources?sentenceId=` | Hapus tautan kalimat sumber (FR-11) | N/A |

Detail request/response mengikuti Postman (`postman/collection.json`). Konvensi:
- Success → `{ "data": ... }`.
- Error → `{ "error": { "code", "message" } }` dengan status HTTP sesuai: 400/404/409/422 (`CONTENT_TOO_LONG`).
- DTO camelCase di `backend/app/core/schemas.py` (sesuai DTO TypeScript lama di `frontend/src/types/index.ts`).

### Halaman

- `/` — tabel dokumen (judul, tanggal, status, jumlah story) + tombol "Buat baru".
- `/new` — textarea paste notulen + field judul → submit → redirect ke `/documents/:id`.
- `/documents/:id` — layout dua panel: kiri daftar StoryCard, kanan SourcePanel (notulen + highlight). Badge konfidensi per citation. Ringkasan review di header. Tombol ekspor.
- `/evaluate` — form pilih tipe run (baseline/proposed) + path dataset → jalankan script benchmark → tampilkan hasil dari EvaluationRun.

---

## Bagian 4: Alur Logika & Business Rules

### Alur: Input Dokumen (FR-01, FR-02)
1. Analis kirim `{ title?, content }`.
2. Server validasi: `content` non-kosong, `≤ 50.000 karakter`; normalisasi whitespace.
3. Buat `Document` status `pending` → redirect detail.
4. Halaman detail menampilkan status.

### Alur: Ekstraksi (FR-03 s.d. FR-06)
1. `POST /api/documents/:id/extract` set status `processing`, enqueue job.
2. **Segmenter:** pecah `content` jadi kalimat via split regex (titik/!?/… + spasi) dengan normalisasi `\r\n` & spasi berlebih; simpan `Sentence(index, text)` (index 0-based).
3. **Prefilter (local LLM):** kirim daftar kalimat bernomor (index 0-based) ke LM Studio; schema `prefilterSchema` memaksa output JSON `{ "relevant_sentence_ids": [...] }`. Prompt memakai bias inklusif *("jika ragu, sertakan")* dan aturan anti-halusinasi *(hanya nomor yang ada di input)*. Kalimat di luar daftar dibuang dari prompt ekstraksi, **nomor index asli tetap dipertahankan**. Jika output kosong/tidak valid → fallback: semua kalimat dipakai.
4. **Ekstraksi (Gemini):** bangun prompt berisi kalimat tersaring + nomor index; panggil Gemini 2.5 Flash sekali, `response_mime_type: application/json` + `response_schema`; validasi output dengan pydantic.
   - Jika JSON/schema tidak valid → **1× repair retry** (prompt error-balancing). Jika tetap gagal → status `failed`.
   - Jika array story `> 30` → ditolak (minta batch ulang); tidak ada pemangkasan diam-diam.
5. **Verifikasi (local LLM + embedding cadangan):** untuk tiap `(user_story, kalimat sumber)`, minta LM Studio memberi `verificationSchema` → `{ is_valid, confidence_score, reason }`. Paralel, hitung juga `cosine(story, kalimat)` via embedding cadangan. Prompt verifikasi memuat aturan *coverage-gap* (klaim yang membutuhkan kalimat di luar acuan → turunkan skor) dan *"benefit kosong bukan kekurangan"*. Penggabungan putusan di backend:
   - `is_valid=false` ATAU `confidence_score < CONF_THRESHOLD` (default 0.6) → `needs_review`.
   - `is_valid=true` + embedding tinggi (≥ `EMBED_VERIFY_THRESHOLD`, default 0.5) → `valid`.
   - `is_valid=true` + embedding rendah → **diturunkan** `needs_review`.
   Simpan `llmVerdict (is_valid), confidenceScore, llmReason, embeddingSimilarity` ke `StorySentence`.
6. Set `Document.status = completed` (atau `failed` bila tahap kritikal gagal).

### Kebijakan & Sumber Sinyal Verifikasi

Dua sumber sinyal dengan sifat berbeda:

| Sinyal | Asal | Sifat | Contoh nilai |
|---|---|---|---|
| `is_valid` + `confidence_score` + `reason` | LLM lokal (LM Studio) | Subjektif — opini model; `confidence_score` **tidak terkalibrasi** (bisa over-confident) | 0.98 |
| `embedding_similarity` | Kode backend (cosine similarity) | Objektif — rumus matematis | 0.87 |

Aturan status final (`verificationStatus`) dihitung di backend:
- `needs_review` jika `is_valid=false` ATAU `confidence_score < CONF_THRESHOLD` ATAU `embedding_similarity < EMBED_VERIFY_THRESHOLD`.
- Embedding cadangan hanya **menurunkan** putusan LLM (`valid → needs_review`), tidak pernah menaikkan.
- `confidence_score` adalah masukan keputusan, bukan probabilitas statistik; ambang batas dikalibrasi lewat `scripts/model-tests/`.

### Environment Variables (`.env`)

| Var | Default | Fungsi |
|---|---|---|
| `GEMINI_API_KEY` | - | API key Google Generative AI (ekstraksi) |
| `GEMINI_MODEL` | `gemini-2.5-flash` | Model ekstraksi user story |
| `LM_STUDIO_BASE_URL` | `http://localhost:1234/v1` | Endpoint OpenAI-compatible LM Studio |
| `LM_STUDIO_MODEL` | `qwen2.5-3b` | Model lokal prefilter & verifikasi |
| `CONF_THRESHOLD` | `0.6` | Ambang `confidence_score` (verifikasi) |
| `EMBED_VERIFY_THRESHOLD` | `0.5` | Ambang cosine similarity (verifikasi) |
| `USE_EMBEDDING_FALLBACK` | `true` | Aktif/nonaktif embedding cadangan |

### Alur: Review (FR-09 s.d. FR-12)
1. PATCH story → ganti status `pending → approved/rejected`; edit actor/action/benefit → simpan + tandai.
2. Tambah/hapus sumber → update `StorySentence`, hanya menerima `sentenceId` yang valid untuk dokumen itu; saat menambah, hitung ulang skor verifikasi.
3. Ringkasan dihitung on-the-fly dari `GroupBy` status.

### Alur: Ekspor (FR-13)
- Query story (filter status), join `StorySentence + Sentence` → bangun Markdown (atau CSV) → unduh.

### Alur: Benchmark (FR-14, FR-15)
- `scripts/evaluations/run.ts --type baseline|proposed --dataset data/evaluation/dataset`
- Baseline = pipeline **tanpa** prefilter & verifikasi; Usulan = pipeline lengkap. Model LLM sama (Gemini 2.5 Flash).
- Metrics (`scripts/evaluations/metrics.ts`): precision/recall/F1 ekstraksi (penyocokan story ke golden), akurasi citation, efektivitas verifikasi (% `${needs_review}` yang benar). Hasil JSON + Markdown disimpan ke `data/evaluation/results/` dan row `EvaluationRun`.

### Business Rules (dari PRD)
- Persis **1 pemanggilan Gemini per dokumen** (kecuali 1× repair retry saat output tidak valid).
- Gemini 429/5xx → exponential backoff + retry; terus gagal → `failed`.
- Cap 30 story; output lebih → ditolak (batch ulang; tidak ada pemangkasan diam-diam).
- Prefilter & verifikasi dijalankan **model lokal (LM Studio)** — gratis; bila LM Studio tidak aktif → job `failed` dengan pesan jelas.
- Embedding cadangan (`sentence-transformers`) hanya menurunkan `valid → needs_review`, tidak pernah menaikkan putusan LLM.
- Story tanpa sumber tetap bisa disetujui oleh analis.
- Hanya `approved` story yang diekspor dalam mode default (filter "semua"/"pending"/"needs_review" tersedia).

---

## Bagian 5: Keamanan, Performa, & Deployment

### Keamanan
- `GEMINI_API_KEY` hanya di `backend/.env`; **tidak pernah** dikirim ke client (client hanya memanggil API backend lokal).
- Validasi panjang input di server (50.000 karakter) — anti input raksasa.
- Hanya index kalimat yang terverifikasi milik dokumen tersebut yang diterima saat kelola sumber.
- `.env`, `.venv/`, `*.db`, dan hasil uji/benchmark masuk `.gitignore`.

### Performa
- Pipeline 1 notulen (≤5.000 karakter) target < 60 detik s.d. story tampil (dengan job thread berjalan paralel).
- Jalankan pipeline di **job runner asinkron** (in-memory thread queue) agar request API cepat balik; UI memakai polling status ringan (mis. interval 2s s.d. `completed`).
- Panjang baris prompt dijaga: prefilter memangkas kalimat tidak relevan → token prompt Gemini lebih hemat & fokus.
- Embedding `sentence-transformers` dimuat sekali (lazy singleton) dan di-cache per dokumen; bila `USE_EMBEDDING_FALLBACK=false`, tahap embedding dilewati (tanpa dampak ke alur utama).
- Verifikasi local LLM berjalan per citation; pada dokumen dengan banyak story, proses bisa di-batch agar latency turun.

### Deployment (Lokal)
- Dev: `python -m venv .venv && .venv/bin/pip install -r requirements.txt && cp .env.example .env` lalu `.venv/bin/uvicorn app.main:app --port 8000` (di `backend/`).
- Frontend: `npm install && npm run dev` (di `frontend/`, port 3000).
- Tes: `.venv/bin/python -m pytest` (di `backend/`).
- Uji model lokal: `scripts/model-tests/` (rencana, belum dibuat).

### Development Setup

```bash
# Backend (terminal 1)
cd backend
python -m venv .venv && .venv/bin/pip install -r requirements.txt
cp .env.example .env                 # isi GEMINI_API_KEY + LM_STUDIO_BASE_URL
.venv/bin/python -m pytest            # uji (tanpa perlu layanan eksternal)
.venv/bin/uvicorn app.main:app --port 8000

# Frontend (terminal 2, opsional utk sekarang)
cd frontend && npm install && npm run dev   # http://localhost:3000

# LM Studio wajib dijalankan berbarengan:
# Load model lokal (mis. qwen2.5-3b) sebelum pipeline dipakai
```

> Catatan: `sentence-transformers` mengunduh model embedding `intfloat/multilingual-e5-small` pada pemakaian pertama (cache lokal; offline setelahnya). Ukuran model ±460 MB — sekali unduh saat setup (`backend/.venv` perlu `torch` CPU; lihat `requirements.txt`).

---

## Catatan Pembatas & Keputusan Terbuka
- **Upload file (.docx/.pdf)** ditunda v2 → V1 menerima teks paste.
- **Autentikasi/multi-user** ditunda v2 → single-user lokal.
- **Job runner in-memory** cukup untuk single-user; job hilang saat server restart (diterima pada skala skripsi).
- **Runtime model lokal = LM Studio** (OpenAI-compatible); Ollama/Groq/Together/OpenRouter dapat dipakai nanti tanpa mengubah interface provider.
- **Seleksi model lokal** (qwen2.5, gemma, llama3.1) dilakukan lewat `scripts/model-tests/`; threshold verifikasi dikalibrasi dari hasil uji.
- **Model lokal saat ini** disarankan mulai dari qwen2.5-3b (pas VRAM 4GB) sebagai baseline pipeline, lalu bandingkan kandidat lain saat step selection.
- **Index kalimat dikunci 0-based** di seluruh schema/prompt/DB; UI menampilkan `index + 1` agar terbaca "kalimat ke-N" oleh manusia.
- **Prompt final**: ekstraksi & prefilter terkunci (versi user); verifikasi v1 dipakai sementara — revisi lokal pengguna menyusul dan akan di-swap di `src/lib/llm/prompt.ts`.

**🎉 Tech Spec selesai!** — Simpan sebagai `.agents/2-TECH-SPEC.md`. Lanjut ke **buat Task/issue breakdown** kapan pun diminta.