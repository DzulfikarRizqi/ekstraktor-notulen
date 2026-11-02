# TECH SPEC — Aplikasi Ekstraksi User Story dari Notulensi Rapat Berbasis LLM dengan Penelusuran Sumber

> Acuan: `.agents/1-PRD.md`.
>
> **Status arsitektur:** folder `backend/` (FastAPI/Python) saat ini **tidak dipakai**. Seluruh implementasi aktif dialihkan ke `frontend/` sebagai aplikasi **Next.js fullstack** (App Router + API Route Handlers). Dokumen ini mendeskripsikan implementasi yang berjalan di `frontend/`.

---

## Bagian 1: Tech Stack & Arsitektur

### Tech Stack

| Layer | Technology | Versi |
|-------|------------|-------|
| Framework | Next.js (App Router + Route Handlers) | 16.3.x |
| Language | TypeScript | 5.x |
| UI | React | 19.2.x |
| Styling | Tailwind CSS | 4.x |
| Database | SQLite (file lokal `frontend/dev.db`) | - |
| ORM | Prisma + `@prisma/adapter-better-sqlite3` | 7.10.x |
| Validasi schema | Zod (dipakai juga untuk JSON Schema LLM) | 4.6.x |
| LLM ekstraksi | `EXTRACT_PROVIDER=lmstudio` (default) atau `gemini`; dapat dioverride per dokumen lewat body `POST /extract` | - |
| LLM lokal (prefilter, verifikasi, ekstraksi mode `lmstudio`) | OpenAI-compatible via `openai` SDK → **LM Studio** (`http://localhost:1234/v1`) | - |
| LLM cloud (ekstraksi mode `gemini`) | `@google/genai` — Gemini | 2.24.x |
| Embedding cadangan | `@huggingface/transformers` (Transformers.js), model `Xenova/multilingual-e5-small` | 4.3.x |
| Job runner | Queue async in-memory (satu proses Next.js) | - |
| Testing | Vitest | 5.x |
| Auth | Tidak ada (V1 single-user lokal) | - |
| Hosting | Lokal (`next dev :3000`) | - |

### Arsitektur Sistem

Pipeline inti berjalan di dalam proses Next.js:

```
UI (React client component: src/app/page.tsx)
        │  fetch relatif /api/*
        ▼
API Route Handlers (src/app/api/**/route.ts)
        │  enqueueJob()
        ▼
Job Queue in-memory (src/lib/jobs/queue.ts, serial)
        │
        ▼
1. Segmenter ── kalimat + index 0-based
        ▼
2. Prefilter (LM Studio, per batch) ── relevant_sentence_ids
        ▼
3. Ekstraksi (Gemini atau LM Studio, structured JSON)
        ▼
4. Verifikasi (LM Studio + cosine embedding lokal)
        ▼
Simpan ke SQLite via Prisma ── status: processing → completed/failed
        ▼
UI: story ↔ kalimat sumber, status verifikasi, ekspor
```

Prinsip biaya (hybrid):
- **Gemini hanya untuk ekstraksi** (1 panggilan per dokumen). Default mengikuti `EXTRACT_PROVIDER`; UI dapat mengirim `{ provider }` saat memulai dokumen baru.
- **Prefilter dan verifikasi selalu LM Studio lokal.** Prefilter dipecah per batch agar aman terhadap context window; verifikasi lokal menghindari lonjakan kuota karena satu panggilan per citation.
- **Mode `lmstudio`** memakai LM Studio untuk semua tahap. **Mode `gemini`** memakai Gemini hanya untuk ekstraksi.
- Embedding (`Xenova/multilingual-e5-small`) selalu **lokal** dan hanya dipakai sebagai sinyal cadangan di tahap verifikasi dan saat menambah sumber manual.
- Gemini API key tetap wajib ada di environment (lihat catatan di bagian Environment Variables), meskipun provider diset `lmstudio`.
- 429 Gemini yang menyertakan `retryDelay` dihormati oleh `withRetry` (maksimum tunggu 120 detik) agar kuota per menit tidak langsung menggagalkan dokumen.

### Kontrak Output LLM (JSON Schema)

Sumber kebenaran schema ada di `frontend/src/lib/llm/schema.ts` (Zod). JSON Schema diturunkan dengan `.toJSONSchema()`:

- `userStoriesJsonSchema` — untuk LM Studio (`$schema` dibuang).
- `userStoriesGeminiSchema` — untuk Gemini (`responseSchema`).
- `prefilterJsonSchema` / `prefilterGeminiSchema` — output prefilter untuk LM Studio / Gemini.
- `verificationJsonSchema` / `verificationGeminiSchema` — output verifikasi untuk LM Studio / Gemini.

Tiga schema utama:

1. **`userStoriesSchema`** — `{ user_stories: Array<{ actor, action, benefit, source_sentence_ids }> }`, minimal 1 dan maksimal 30 item.
2. **`prefilterSchema`** — `{ relevant_sentence_ids: Array<integer> }`.
3. **`verificationSchema`** — `{ user_story_id: integer, is_valid: boolean, confidence_score: number (0–1), reason: string }`.

Aturan main `userStoriesSchema`:
- **Flat & minimal `required`** — kepatuhan struktur lebih tinggi.
- **Field berbahasa Inggris** (actor/action/benefit), isi konten mengikuti bahasa sumber.
- **Tanpa field `id` dari LLM** — kode `US-01…n` dibuat server setelah array diterima.
- **`source_sentence_ids` berupa ANGKA (index kalimat 0-based)** — bukan teks.
- **Status verifikasi tidak ditentukan di schema ekstraksi** — diputuskan tahap verifikasi.
- **`minItems: 1`** mendorong traceability sejak output; analis dapat mengubah manual (FR-11).

JSON Schema yang dikirim ke provider:

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

Contoh output yang lazim (setelah validasi Zod, sebelum `id`/`storyCode` ditambahkan server):

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

Aturan validasi saat ekstraksi:
- Output melanggar schema → **1× repair retry** (FR-05); jika tetap gagal → job `failed`.
- Duplikat story (kombinasi `actor|action|benefit` sama) → dibuang.
- Array > 30 → **dipangkas ke 30** dan ditandai `truncated: true` (sesuai FR-05 PRD).
- `source_sentence_ids` di luar rentang kalimat → tidak dibuat citation saat verifikasi.

### Struktur Folder

```text
ekstraktor-notulen/
├── frontend/                              # Aplikasi aktif (Next.js fullstack)
│   ├── prisma/
│   │   ├── schema.prisma                  # Model Document/Sentence/UserStory/StorySentence/EvaluationRun
│   │   └── migrations/                    # Migrasi Prisma
│   ├── prisma.config.ts                   # Konfigurasi Prisma (schema, migrations, datasource)
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx                   # UI utama (client component)
│   │   │   ├── layout.tsx
│   │   │   ├── globals.css
│   │   │   └── api/
│   │   │       ├── documents/
│   │   │       │   ├── route.ts           # GET/POST documents
│   │   │       │   └── [id]/
│   │   │       │       ├── route.ts       # GET detail dokumen
│   │   │       │       ├── extract/route.ts
│   │   │       │       └── export/route.ts
│   │   │       └── stories/
│   │   │           └── [id]/
│   │   │               ├── route.ts       # PATCH/DELETE story
│   │   │               └── sources/route.ts
│   │   ├── lib/
│   │   │   ├── config.ts                  # Validasi environment (Zod)
│   │   │   ├── db.ts                      # Prisma client + adapter better-sqlite3
│   │   │   ├── dto.ts                     # Mapper model → DTO
│   │   │   ├── http.ts                    # Helper respons error
│   │   │   ├── retry.ts                   # withRetry (hanya LlmError retryable)
│   │   │   ├── llm/
│   │   │   │   ├── provider.ts            # Interface LlmProvider + generateStructured
│   │   │   │   ├── openai-compat.ts       # Provider LM Studio
│   │   │   │   ├── gemini.ts              # Provider Gemini
│   │   │   │   ├── schema.ts              # Zod + JSON Schema
│   │   │   │   ├── prompt.ts              # Prompt prefilter/ekstraksi/verifikasi
│   │   │   │   ├── parse.ts               # parseJson (code-fence + ekstraksi JSON)
│   │   │   │   └── errors.ts              # LlmError + isRetryableStatus
│   │   │   ├── embedding/
│   │   │   │   ├── embedder.ts            # Transformers.js lazy singleton
│   │   │   │   └── similarity.ts          # cosine similarity
│   │   │   ├── pipeline/
│   │   │   │   ├── segmenter.ts
│   │   │   │   ├── prefilter.ts
│   │   │   │   ├── extraction.ts
│   │   │   │   ├── verification.ts
│   │   │   │   └── pipeline.ts            # Orkestrator 1→4
│   │   │   └── jobs/queue.ts              # Queue async in-memory
│   │   └── types/index.ts                 # DTO TypeScript
│   ├── tests/                             # Unit test Vitest
│   └── .env.example                       # Contoh environment
└── backend/                               # FastAPI lama — TIDAK DIPAKAI
```

### Justifikasi

- **Next.js fullstack (satu proses):** UI, API, pipeline, dan akses DB berada di satu runtime sehingga tidak perlu CORS, dua proses server, atau duplikasi logika. Model lokal tetap diakses lewat HTTP ke LM Studio.
- **Prisma + SQLite:** tanpa server DB, file lokal mudah dibawa/di-backup untuk kebutuhan skripsi; Prisma memberi type-safety dan migrasi terstruktur.
- **Zod sebagai sumber schema tunggal:** tipe TypeScript, validasi runtime, dan JSON Schema untuk LLM berasal dari definisi yang sama.
- **Abstraksi OpenAI-compatible:** satu client `openai` SDK untuk LM Studio; provider lain cukup mengganti `baseURL`.
- **LM Studio:** structured output via JSON schema; prefilter & verifikasi tanpa biaya dan tanpa limit request.
- **Transformers.js:** embedding berjalan di Node tanpa dependensi Python/torch; model diunduh sekali lalu dipakai dari cache lokal.
- **Job queue in-memory:** memadai untuk single-user lokal; request API langsung mengembalikan `202` dan UI melakukan polling.

---

## Bagian 2: Database Design

### Ringkasan Database

| Item | Detail |
|------|--------|
| Database | SQLite (file: `frontend/dev.db`) |
| ORM | Prisma 7 + `@prisma/adapter-better-sqlite3` |
| Pendekatan | Relasional |
| Migrasi | `prisma migrate dev` (`npm run db:migrate`) |
| Client | Digenerate ke `frontend/src/generated/prisma` (`npm run db:generate`) |

### Entity Overview

| Entity | Key Fields | Relasi |
|--------|-----------|--------|
| Document | id, title, content, status, truncated, error, createdAt, updatedAt | → Sentence (1:N), → UserStory (1:N) |
| Sentence | id, documentId, index, text | ← Document, ↔ UserStory (M:N via StorySentence) |
| UserStory | id, documentId, storyCode, actor, action, benefit, status, createdAt, updatedAt | ← Document, ↔ Sentence (M:N) |
| StorySentence | id, storyId, sentenceId, llmVerdict, confidenceScore, llmReason, embeddingSimilarity, verificationStatus | ← UserStory, ← Sentence |
| EvaluationRun | id, type (baseline/proposed), docCount, metricsJson, createdAt | Belum dipakai |

Constraints & enum:
- `Sentence` — unik `(documentId, index)`.
- `StorySentence` — unik `(storyId, sentenceId)`.
- `Document.status` — `pending | processing | completed | failed`.
- `UserStory.status` — `pending | approved | rejected`.
- `StorySentence.verificationStatus` — `valid | needs_review`.
- Semua relasi anak memakai `onDelete: Cascade`.

### Index Strategy

- `Document(createdAt)` — urutan riwayat dokumen.
- `Sentence(documentId)` + unik `(documentId, index)` — lookup & traceability kalimat.
- `UserStory(documentId)` — list story per dokumen.
- `StorySentence(sentenceId)` + unik `(storyId, sentenceId)` — join cepat & cegah duplikasi tautan.

### Data Flow

1. Analis `POST /api/documents` → document `pending`.
2. UI langsung `POST /api/documents/:id/extract` dengan body opsional `{ provider: "lmstudio" | "gemini" }` → status `processing`, job di-enqueue. Tanpa body, provider mengikuti `EXTRACT_PROVIDER`.
3. Job menjalankan pipeline hybrid dengan provider tersebut hanya pada ekstraksi: hapus hasil lama → segmentasi → prefilter lokal → ekstraksi (Gemini/LM Studio) → simpan `Sentence` & `UserStory` satu per satu → verifikasi lokal → simpan `StorySentence` → status `completed` (atau `failed`).
4. UI membaca `GET /api/documents/:id` setiap 1 detik selama status `pending`/`processing`, sehingga story yang sudah tersimpan tampil bertahap saat verifikasi masih berjalan. Jika pipeline gagal, story parsial tetap ditampilkan.
5. Aksi review (jika dipakai) menulis ke `UserStory`/`StorySentence` melalui API yang tersedia.

---

## Bagian 3: Interface Design

> Seluruh endpoint berada di Next.js Route Handlers (`frontend/src/app/api`), port `3000`, tanpa auth.

### API Routes

| Method | Path | Deskripsi (FR) | Auth |
|--------|------|----------------|------|
| POST | `/api/documents` | Buat dokumen (FR-01) | N/A |
| GET | `/api/documents` | Daftar dokumen + status (FR-02) | N/A |
| GET | `/api/documents/:id` | Detail dokumen: story + sentences + citations (FR-07, FR-12) | N/A |
| DELETE | `/api/documents/:id` | Hapus dokumen beserta sentences/story/citation; ditolak saat `processing` | N/A |
| POST | `/api/documents/:id/extract` | Mulai pipeline (FR-03..06); body opsional `{ provider }` untuk tahap ekstraksi | N/A |
| GET | `/api/documents/:id/export?format=md\|csv&filter=approved\|all\|pending` | Ekspor Markdown/CSV (FR-13) | N/A |
| PATCH | `/api/stories/:id` | Update status / edit story (FR-09, FR-10) | N/A |
| DELETE | `/api/stories/:id` | Hapus story | N/A |
| POST | `/api/stories/:id/sources` | Tambah tautan kalimat sumber (FR-11) | N/A |
| DELETE | `/api/stories/:id/sources?sentenceId=` | Hapus tautan kalimat sumber (FR-11) | N/A |

Konvensi:
- Success → `{ "data": ... }`.
- Error → `{ "error": { "code", "message" } }` dengan status HTTP 400/404/409/422.
- DTO camelCase didefinisikan di `frontend/src/types/index.ts` dan dipetakan di `frontend/src/lib/dto.ts`.
- `POST /api/documents/:id/extract` mengembalikan `202` dengan `{ data: { status: "processing" } }`. Body opsional `{ provider: "lmstudio" | "gemini" }`; nilai lain ditolak `400`.
- Export default `format=md`, `filter=approved`; nilai `filter` yang tidak dikenal jatuh ke `approved`.

### Halaman & UI

Implementasi UI saat ini adalah **satu halaman** (`/`) berbentuk workspace:

- **Sidebar** — riwayat dokumen dikelompokkan (Hari ini, Kemarin, 7 hari terakhir, Lebih lama), status, dan jumlah story.
- **Composer** — input judul opsional + textarea notulen (maks 50.000 karakter) + muat file `.txt` (maks 1 MB di client) + toggle provider **LM Studio / Gemini (ekstraksi)** untuk dokumen baru. Gemini hanya dipakai pada ekstraksi; prefilter & verifikasi tetap lokal. Pilihan disimpan di `localStorage` (`notula.provider`) dan dikirim ke endpoint extract.
- **Panel hasil** — ringkasan status, daftar story, badge verifikasi per citation, daftar seluruh kalimat notulen. Story muncul satu per satu (jeda tampilan ±150 ms) sejak tersimpan; selama verifikasi badge story berbunyi “Memverifikasi…”, dan story parsial tetap tampil bila pipeline gagal.
- **Polling** — detail dokumen dimuat ulang tiap 1 detik selama `pending`/`processing`.
- **Ekspor** — tautan `GET /api/documents/:id/export?format=md&filter=all`.

Halaman `/new`, `/documents/:id`, dan `/evaluate` **belum dibuat**; navigasi dilakukan lewat state di satu halaman.

---

## Bagian 4: Alur Logika & Business Rules

### Alur: Input Dokumen (FR-01, FR-02)

1. Analis mengirim `{ title?, content }`.
2. Server memvalidasi: `content` non-kosong dan `≤ 50.000 karakter`; `title` maks 200 karakter (default "Tanpa Judul").
3. Buat `Document` status `pending`.
4. UI langsung memanggil endpoint extract; bila gagal, notulen tetap tersimpan dan error ditampilkan.

### Alur: Hapus Dokumen

1. Pengguna menekan ikon hapus pada item riwayat di sidebar.
2. UI meminta konfirmasi (`window.confirm`); jika dibatalkan, tidak ada perubahan.
3. `DELETE /api/documents/:id` memeriksa dokumen:
   - tidak ditemukan → 404;
   - status `processing` → 409 (job in-memory tidak bisa dibatalkan);
   - selain itu → hapus dokumen.
4. Relasi `Sentence`, `UserStory`, dan `StorySentence` terhapus otomatis via `onDelete: Cascade`.
5. UI menghapus item dari daftar; jika dokumen yang dihapus sedang dibuka, kembali ke workspace.

### Alur: Ekstraksi (FR-03 s.d. FR-06)

1. `POST /api/documents/:id/extract` menolak bila status `processing` (409), lalu set status `processing` dan enqueue job.
2. **Segmenter** (`segmenter.ts`):
   - Normalisasi `\r\n` dan spasi berlebih.
   - Deteksi transkrip: jika ≥ 3 baris berisi dan rasio baris berpenanda pembicara (`[PERSON5]`, `(PERSON8)`, `Budi:`) ≥ 0,3 → satu baris = satu kalimat; baris tag murni (`<unintelligible/>`, dll.) dibuang.
   - Selain itu gunakan `Intl.Segmenter("id", { granularity: "sentence" })`.
   - Index kalimat **0-based**.
3. **Prefilter** (`prefilter.ts`, selalu LM Studio):
   - Kalimat dipecah menjadi batch berdasarkan `PREFILTER_BATCH_TOKENS` (estimasi 4 karakter/token).
   - Setiap panggilan meminta `{ relevant_sentence_ids }`; nomor yang tidak ada di batch dibuang.
   - Output kosong/tidak valid per batch → fallback semua kalimat batch tersebut.
   - Error layanan (LM Studio mati/5xx) diteruskan → job `failed`.
   - Nomor index asli dipertahankan.
4. **Ekstraksi** (`extraction.ts`):
   - Provider mengikuti mode pipeline (`lmstudio` atau `gemini`).
   - Prompt berisi contoh ID/EN + kalimat tersaring + JSON Schema.
   - Output diparse, divalidasi Zod; duplikat dibuang.
   - Jika gagal validasi → **1× repair retry** dengan pesan error. Error LLM retryable diulang dengan exponential backoff (maks 3 attempt), menghormati `retryDelay` Gemini bila ada.
   - Story > 30 dipangkas menjadi 30 dan `truncated: true`.
5. **Verifikasi** (`verification.ts`, selalu LM Studio):
   - Embedding dihitung sekali untuk semua kalimat + semua story (`passage:` / `query:`) dan selalu lokal.
   - Untuk setiap citation, LM Studio menilai `{ is_valid, confidence_score, reason }`; satu panggilan per citation, berurutan.
   - Status final:
     - `needs_review` jika `is_valid=false`, ATAU `confidence_score < CONF_THRESHOLD`, ATAU (similarity tersedia DAN `embedding_similarity < EMBED_VERIFY_THRESHOLD`).
     - `valid` jika lolos semua syarat di atas.
   - Kalimat sumber di luar rentang → citation `needs_review`.
   - Simpan `llmVerdict`, `confidenceScore`, `llmReason`, `embeddingSimilarity`, `verificationStatus` ke `StorySentence`.
6. Set `Document.status = completed` beserta flag `truncated` (atau `failed` bila tahap kritikal gagal).

### Kebijakan & Sumber Sinyal Verifikasi

| Sinyal | Asal | Sifat | Contoh nilai |
|---|---|---|---|
| `is_valid` + `confidence_score` + `reason` | LLM lokal (LM Studio) | Subjektif — opini model; `confidence_score` **tidak terkalibrasi** | 0.98 |
| `embedding_similarity` | Kode frontend (cosine similarity, Transformers.js) | Objektif — rumus matematis | 0.87 |

- Embedding cadangan hanya **menurunkan** putusan LLM (`valid → needs_review`), tidak pernah menaikkan.
- Jika `USE_EMBEDDING_FALLBACK=false`, sinyal embedding dilewati.
- Ambang batas dapat dikalibrasi lewat environment variable.

### Alur: Review (FR-09 s.d. FR-12)

1. PATCH story → ubah status `pending → approved/rejected` dan/atau edit `actor/action/benefit`.
2. Tambah/hapus sumber → update `StorySentence`. Saat menambah, server memvalidasi `sentenceId` milik dokumen yang sama, menghitung cosine similarity bila embedding aktif, lalu menyimpan tautan dengan status `needs_review` dan alasan "Sumber ditambahkan manual (perlu review)".
3. Sumber manual **tidak** menjalankan ulang verdict LLM; analis tetap perlu meninjau.
4. UI saat ini hanya menampilkan total story dan status verifikasi per citation; ringkasan jumlah per status belum dihitung.

### Alur: Ekspor (FR-13)

- Query story + `StorySentence` + `Sentence`, filter status (`approved` default, `all`, `pending`), lalu bangun Markdown atau CSV.
- CSV berisi kolom `story_code, actor, action, benefit, status, source_indices`.
- Markdown berisi kode story, kalimat "Sebagai/saya ingin/agar", status, dan daftar sumber beserta verdict.

### Environment Variables (`.env`)

Divalidasi oleh `frontend/src/lib/config.ts` saat modul dimuat.

| Var | Default | Fungsi |
|---|---|---|
| `DATABASE_URL` | `file:./dev.db` | Lokasi SQLite |
| `GEMINI_API_KEY` | - (**wajib**) | API key Gemini (dipakai bila provider ekstraksi `gemini`) |
| `GEMINI_MODEL` | `gemini-2.5-flash` | Model Gemini untuk ekstraksi |
| `EXTRACT_PROVIDER` | `lmstudio` | Provider default ekstraksi: `lmstudio` atau `gemini`; dapat dioverride per dokumen lewat body extract |
| `LM_STUDIO_BASE_URL` | `http://localhost:1234/v1` | Endpoint OpenAI-compatible LM Studio |
| `LM_STUDIO_MODEL` | `qwen2.5-3b-instruct` | Model lokal untuk prefilter, verifikasi, dan ekstraksi mode `lmstudio` |
| `PREFILTER_BATCH_TOKENS` | `6000` | Anggaran token per batch prefilter LM Studio (min. 1000) |
| `CONF_THRESHOLD` | `0.6` | Ambang `confidence_score` verifikasi |
| `EMBED_VERIFY_THRESHOLD` | `0.5` | Ambang cosine similarity verifikasi |
| `USE_EMBEDDING_FALLBACK` | `true` | Aktif/nonaktif embedding cadangan |
| `EMBEDDING_MODEL` | `Xenova/multilingual-e5-small` | Model embedding Transformers.js |

> Catatan: `GEMINI_API_KEY` divalidasi wajib **selalu**, bahkan ketika `EXTRACT_PROVIDER=lmstudio`. Isi nilai dummy bila tidak memakai Gemini.

### Business Rules (dari PRD)

- Ekstraksi memakai **satu pemanggilan LLM per dokumen** (kecuali 1× repair retry saat output tidak valid).
- Error 429/5xx yang retryable → exponential backoff; jika Gemini menyertakan `retryDelay`, jeda mengikuti nilai itu (maks 120 detik). Terus gagal → `failed`.
- Cap 30 story; output lebih → dipangkas dan `truncated: true` (transparan ke analis).
- Prefilter & verifikasi selalu LM Studio; bila LM Studio tidak aktif → job `failed` dengan pesan jelas.
- Verifikasi memakai satu panggilan per citation secara berurutan di LM Studio.
- Embedding cadangan hanya menurunkan `valid → needs_review`.
- Story tanpa sumber tetap bisa disetujui oleh analis (via API).
- Hanya story `approved` yang diekspor pada mode default; mode `all`/`pending` tersedia.

---

## Bagian 5: Keamanan, Performa, & Deployment

### Keamanan

- `GEMINI_API_KEY` hanya dibaca di server (`config.ts`), tidak pernah dikirim ke client.
- Validasi panjang input di Route Handler (50.000 karakter) — anti input raksasa.
- Hanya `sentenceId` yang valid untuk dokumen terkait yang diterima saat menambah sumber.
- `.env*` (kecuali `.env.example`), `/dev.db`, `*.db-journal`, `.next/`, dan hasil benchmark masuk `.gitignore` frontend.

### Performa

- Pipeline satu notulen (≤ 5.000 karakter) ditargetkan < 60 detik sampai story tampil.
- Pipeline berjalan di **job queue asinkron in-memory** agar request API cepat balik; UI polling tiap 1 detik dan menampilkan story secara bertahap.
- Prefilter memangkas kalimat tidak relevan sehingga prompt ekstraksi lebih hemat.
- Embedding dimuat sekali (lazy singleton) dan dipakai ulang; matikan lewat `USE_EMBEDDING_FALLBACK=false` bila tidak dibutuhkan.
- Verifikasi LLM berjalan per citation secara berurutan di dalam job.

### Deployment (Lokal)

```bash
cd frontend
npm install
npm run db:generate      # prisma generate
npm run db:migrate       # prisma migrate dev
npm run dev              # http://localhost:3000
```

Prasyarat:
- LM Studio berjalan di `http://localhost:1234/v1` dengan model sesuai `LM_STUDIO_MODEL`.
- `backend/` tidak perlu dijalankan.
- Route Handler memakai runtime Node.js karena `better-sqlite3` adalah native module.

### Development Setup

```bash
cd frontend
cp .env.example .env     # isi GEMINI_API_KEY (wajib) dan konfigurasi LM Studio
npm install
npm run db:generate
npm run db:migrate
npm test                 # vitest run
npm run typecheck        # tsc --noEmit
npm run lint             # eslint
npm run dev
```

> Catatan: model embedding `Xenova/multilingual-e5-small` diunduh sekali oleh Transformers.js saat pertama dipakai (cache lokal; offline setelahnya).

---

## Belum Diimplementasikan

Bagian berikut sudah tercantum di PRD/schema tetapi **belum berjalan** di aplikasi saat ini:

- **Benchmark & halaman `/evaluate`** (FR-14, FR-15): belum ada script evaluasi maupun UI. Tabel `EvaluationRun` sudah ada di schema, tetapi belum ditulis/dibaca kode mana pun.
- **Review di UI** (FR-09, FR-10, FR-11): API `PATCH/DELETE /api/stories/:id` dan endpoint sources sudah tersedia, tetapi UI belum menyediakan tombol setujui/tolak, edit story, atau kelola sumber.
- **Sorot & scroll kalimat sumber** (FR-07): UI menampilkan daftar kalimat dan citation, tetapi belum ada interaksi klik story → highlight/scroll.
- **Ringkasan status review** (FR-12): jumlah `approved/rejected/needs_review` belum dihitung/ditampilkan di header.
- **Upload `.docx/.pdf`**: V1 hanya menerima paste teks dan file `.txt`.
- **Autentikasi/multi-user**: ditunda ke v2; aplikasi single-user lokal.
- **Filter `needs_review` pada export**: tipe filter menyebut `needs_review`, tetapi `parseFilter` belum menanganinya (jatuh ke `approved`).

---

## Catatan Pembatas & Keputusan Terbuka

- **Folder `backend/`** adalah implementasi FastAPI lama dan **tidak dipakai**; seluruh pengembangan diarahkan ke `frontend/`.
- **Job runner in-memory** cukup untuk single-user; job hilang saat server restart (diterima pada skala skripsi).
- **Runtime model lokal = LM Studio** (OpenAI-compatible); Ollama/Groq/Together/OpenRouter dapat dipakai nanti tanpa mengubah interface provider.
- **Model lokal** disarankan mulai dari `qwen2.5-3b-instruct` (pas VRAM 4GB) sebagai baseline.
- **Index kalimat dikunci 0-based** di seluruh schema/prompt/DB; UI menampilkan `index + 1`.
- **Prompt final** berada di `frontend/src/lib/llm/prompt.ts` (prefilter, ekstraksi, verifikasi) dan memuat contoh bilingual ID/EN.
- **Provider ekstraksi dapat dipilih per dokumen baru** (LM Studio/Gemini) lewat UI; default tetap `EXTRACT_PROVIDER=lmstudio` dan body extract bersifat opsional agar kompatibel. Mode Gemini bersifat hybrid: prefilter & verifikasi tetap lokal.
- **Gemini free tier dibatasi 5 request/menit per project/model.** Karena itu verifikasi per-citation tidak dijalankan ke Gemini; hybrid menjaga konsumsi menjadi 1 panggilan per dokumen. `retryDelay` pada 429 dihormati hingga 120 detik.
