# PRD — Aplikasi Ekstraksi User Story dari Notulensi Rapat Berbasis LLM dengan Penelusuran Sumber

## Bagian 1: Visi & Tujuan Produk

### Visi Produk
Aplikasi web yang menerima notulensi rapat elisitasi kebutuhan dan otomatis menurunkannya menjadi kandidat user story dalam format baku *"Sebagai …, saya ingin …, agar …”* lengkap dengan penelusuran kembali ke kalimat sumber di notulensi, sehingga analis dapat memverifikasi dan menelusuri setiap user story terhadap dasar keputusannya di dalam dokumen rapat tanpa harus membaca ulang seluruh notulensi secara manual.

### Tujuan Utama
1. **Mengurangi beban kerja analis** — menurunkan waktu pembuatan user story dari notulensi rapat, diukur dari waktu proses 1 notulen < 1 menit di satu dokumen.
2. **Menjaga kualitas format baku** — 100% kandidat user story yang dihasilkan mengikuti format *actor–action–benefit*.
3. **Menjamin penelusuran sumber** — setiap user story memiliki tautan ke minimal 1 kalimat sumber di notulensi; kualitas citation dievaluasi dengan metrik presisi/recall pada dataset benchmark.
4. **Mencegah halusinasi citation** — citation yang tidak didukung kalimat sumber dideteksi (verifikasi LLM lokal + embedding) dan ditandai untuk direview analis.
5. **Menjadi bukti kontribusi skripsi** — menyediakan hasil evaluasi kuantitatif (precision, recall, F1, akurasi citation) atas metode yang diusulkan.

### Value Proposition
- **Traceability end-to-end**: bukan sekadar ekstraksi, tapi setiap user story tertaut ke kalimat sumbernya di notulensi.
- **Biaya minimal**: hanya 1 pemanggilan LLM per dokumen; prefilter & verifikasi menggunakan LLM lokal (LM Studio) + embedding yang berjalan gratis di mesin pengguna (tanpa API berbayar).
- **Pagar anti-halusinasi**: skor konfidensi citation memandu analis mana yang perlu disetujui/ditolak.
- **Workflow review analis**: UI yang menampilkan story ↔ sumber (highlight), dengan aksi setujui/tolak/edit.
- **Ekspor hasil**: memudahkan analis dan menjadi lampiran dokumen tugas akhir.

---

## Bagian 2: User Persona

### Persona 1: Riska — Analis Kebutuhan (Business Analyst)
- **Usia/Pekerjaan:** 27 tahun, Business Analyst di tim pengembangan software.
- **Level Teknis:** Menengah. Terbiasa dengan Excel, dokumen, dan tools kolaborasi; tidak menulis kode.
- **Tujuan:** Menyusun user story yang lengkap dan dapat ditelusuri dari hasil rapat elisitasi kebutuhan bersama klien.
- **Pain Points:** Notulensi rapat panjang dan bercampur topik teknis/keputusan/obrolan; harus membaca ulang seluruh dokumen manual untuk menurunkan user story; sulit menjelaskan ke pengembang "asal usul" setiap kebutuhan.
- **Motivasi:** Ingin hasil user story cepat, konsisten format, dan mudah dipertanggungjawabkan ke klien & pengembang.

### Persona 2: Dimas — Ketua Tim Pengembang / Reviewer
- **Usia/Pekerjaan:** 31 tahun, Technical Lead.
- **Level Teknis:** Mahir.
- **Tujuan:** Memastikan kebutuhan yang datang dari analis benar-benar terkait dengan keputusan di notulensi, sebelum diteruskan ke sprint.
- **Pain Points:** User story yang tanpa jejak asal-usul sering dipertanyakan saat grooming; butuh waktu untuk mencari bagian notulensi yang mendukung suatu kebutuhan.
- **Motivasi:** Ingin mengecek satu klik untuk melihat kalimat sumber setiap user story, dan menolak/menyunting yang tidak valid.

---

## Bagian 3: User Stories

### Modul 1: Input Notulen
- Sebagai analis, saya ingin menempelkan teks notulen atau mengunggah dokumen, agar dapat mulai ekstraksi.
- Sebagai analis, saya ingin melihat daftar dokumen yang pernah diproses, agar dapat membuka kembali hasil ekstraksi sebelumnya.
- Sebagai analis, saya ingin menamai dokumen secara manual, agar mudah dikenali di daftar.

### Modul 2: Ekstraksi User Story
- Sebagai analis, saya ingin memproses notulen menjadi kandidat user story, agar tidak perlu menurunkannya manual.
- Sebagai analis, saya ingin hasil ekstraksi mengikuti format *actor–action–benefit*, agar konsisten dengan standar tim.
- Sebagai analis, saya ingin melihat status proses (memproses/selesai/gagal), agar tahu apakah hasil valid.

### Modul 3: Penelusuran Sumber
- Sebagai analis, saya ingin setiap user story menautkan ke kalimat sumbernya di notulensi, agar asal-usul kebutuhan dapat dilacak.
- Sebagai analis, saya ingin mengklik sebuah user story dan melihat kalimat sumbernya tersorot, agar cepat memverifikasi.
- Sebagai analis, saya ingin melihat skor konfidensi setiap citation, agar tahu mana yang perlu direview lebih teliti.

### Modul 4: Review & Validasi
- Sebagai analis, saya ingin menyetujui user story, agar kebutuhan yang valid masuk daftar final.
- Sebagai analis, saya ingin menolak atau menyunting user story, agar hasil akhir bersih dari kebutuhan palsu/salah.
- Sebagai analis, saya ingin menambah/menghapus tautan kalimat sumber secara manual, agar traceability tetap akurat.
- Sebagai reviewer, saya ingin melihat ringkasan berapa story disetujui/ditolak, agar progres review jelas.

### Modul 5: Ekspor & Evaluasi
- Sebagai analis, saya ingin mengekspor hasil (user story + sumber) ke Markdown/CSV, agar mudah dibagikan.
- Sebagai peneliti, saya ingin menjalankan evaluasi terhadap dataset golden, agar memperoleh metrik presisi/recall untuk skripsi.
- Sebagai peneliti, saya ingin membandingkan baseline murni-prompt vs metode usulan, agar menunjukkan kontribusi metode.

---

## Bagian 4: Functional Requirements

### Modul 1: Input Notulen

**FR-01: Input Teks Notulen**
- **Input:** Teks notulen (paste), judul opsional
- **Proses:** Simpan teks, deteksi panjang, normalisasi whitespace
- **Output:** Dokumen tercatat di DB, siap diekstraksi
- **Aturan:** Teks wajib non-kosong; dokumen maksimal **50.000 karakter**; jika melebihi batas → dokumen **ditolak dengan pesan yang jelas** (chunking ditunda ke v2)

**FR-02: Daftar Dokumen**
- **Input:** Tidak ada (list permintaan GET)
- **Proses:** Ambil dokumen yang pernah diproses beserta status
- **Output:** Daftar dokumen (id, judul, tanggal, status, jumlah story)
- **Aturan:** Urutkan terbaru ke terlama

### Modul 2: Ekstraksi User Story

**FR-03: Segmentasi Kalimat**
- **Input:** Teks notulen
- **Proses:** Pecah teks menjadi kalimat dengan index urut (0,1,2,…)
- **Output:** List kalimat bernomor (sentence index = 0-based)
- **Aturan:** Index 0-based dipakai sebagai basis traceability (UI menampilkan `index + 1`)

**FR-04: Prefilter Kalimat Relevan (Local LLM)**
- **Input:** List kalimat bernomor + model lokal (LM Studio)
- **Proses:** Model lokal mengklasifikasikan kalimat yang relevan untuk penurunan kebutuhan (structured output `{ relevant_sentence_ids }`); buang kalimat tidak relevan (obrolan, teknis murni, basa-basi); nomor index asli (0-based) dipertahankan. Bias inklusif: *"jika ragu, sertakan"* agar kalimat kebutuhan tidak terlewat
- **Output:** Kalimat tersaring yang masuk ke prompt ekstraksi
- **Aturan:** Tanpa panggilan API Gemini (gratis); hanya nomor yang ada di input yang boleh dikeluarkan (anti-halusinasi index); jika output kosong/tidak valid → fallback semua kalimat

**FR-05: Ekstraksi User Story via LLM (Gemini 2.5 Flash)**
- **Input:** Kalimat tersaring (dengan nomor index), prompt terstruktur, JSON schema
- **Proses:** Satu pemanggilan LLM; output JSON berisi user story + source_sentence_ids; retry exponential backoff saat 429/5xx
- **Output:** Kandidat user story: `id, actor, action, benefit, source_sentence_ids` (maksimal **30 story** per dokumen); `source_sentence_ids` berisi index kalimat **0-based**
- **Aturan:** Persis 1 pemanggilan LLM per dokumen; output divalidasi terhadap schema (fallback: perbaiki lalu retry 1×); jika output > 30 story → **dipangkas ke 30** dan ditandai `truncated: true` agar analis tahu hasil tidak lengkap

**FR-06: Verifikasi Citation (Local LLM + Embedding Cadangan)**
- **Input:** User story + kalimat sumber terpilih + model lokal + model embedding lokal
- **Proses:** Model lokal menilai tiap citation → `{ is_valid, confidence_score, reason }` (skema *coverage-gap*: klaim yang membutuhkan kalimat di luar acuan → skor diturunkan; benefit kosong bukan kekurangan). Backend menggabungkan dengan cosine similarity embedding sebagai sinyal cadangan → `verificationStatus`
- **Output:** `is_valid`, `confidence_score`, `reason` (dari LLM) + `embedding_similarity` + `verificationStatus` (`valid`/`needs_review`) per citation
- **Aturan:** Tanpa panggilan API Gemini (gratis); `needs_review` jika `is_valid=false` ATAU `confidence < CONF_THRESHOLD` ATAU `cosine < EMBED_VERIFY_THRESHOLD`; embedding hanya menurunkan putusan, tidak pernah menaikkan

### Modul 3: Penelusuran Sumber

**FR-07: Tampilkan Pasangan Story–Sumber**
- **Input:** Dokumen + hasil ekstraksi
- **Proses:** Sajikan user story dengan daftar kalimat sumber tersorot pada panel notulen
- **Output:** UI side-by-side story ↔ notulen (highlight kalimat sumber)
- **Aturan:** Klik story → kalimat sumber disorot dan scroll otomatis

**FR-08: Konfidensi Citation**
- **Input:** Skor verifikasi per citation
- **Proses:** Render sebagai badge (hijau/kuning)
- **Output:** Badge konfidensi pada tiap citation
- **Aturan:** Status `needs_review` tampil mencolok agar analis cek

### Modul 4: Review & Validasi

**FR-09: Setujui / Tolak User Story**
- **Input:** Aksi analis pada sebuah story
- **Proses:** Update status story (`approved`/`rejected`/`pending`)
- **Output:** Story berpindah status; ringkasan ter-update
- **Aturan:** Story tanpa sumber tetap bisa disetujui jika analis yakin

**FR-10: Edit User Story**
- **Input:** Perubahan actor/action/benefit
- **Proses:** Simpan revisi, tandai hasil editan
- **Output:** Versi terkini story disimpan
- **Aturan:** History revisi tidak diwajibkan di V1

**FR-11: Kelola Tautan Sumber**
- **Input:** Tambah/hapus kalimat sumber manual
- **Proses:** Update `source_sentence_ids`, hitung ulang skor verifikasi
- **Output:** Tautan sumber baru tersimpan
- **Aturan:** Hanya index kalimat yang valid yang diterima

**FR-12: Ringkasan Review**
- **Input:** Dokumen
- **Proses:** Hitung jumlah story per status
- **Output:** Statistik (total, approved, rejected, needs_review)
- **Aturan:** Ditampilkan di header halaman hasil

### Modul 5: Ekspor & Evaluasi

**FR-13: Ekspor Hasil**
- **Input:** Dokumen + status story filter
- **Proses:** Buat dokumen Markdown/CSV berisi story + sumber
- **Output:** File unduhan
- **Aturan:** Hanya story `approved` diekspor kecuali mode "semua"

**FR-14: Jalankan Benchmark (Dataset Golden)**
- **Input:** Folder dataset (notulen + golden user story + golden mapping sumber)
- **Proses:** Jalankan pipeline pada tiap dokumen; bandingkan dgn golden
- **Output:** Laporan metrik (precision/recall/F1 ekstraksi, akurasi citation, efektivitas verifikasi)
- **Aturan:** Berjalan offline dari API utama; hasil disimpan sebagai JSON/Markdown

**FR-15: Bandingkan Baseline vs Metode Usulan**
- **Input:** Konfigurasi pipeline (baseline murni-prompt / usulan 2+3)
- **Proses:** Jalankan keduanya pada dataset yang sama
- **Output:** Tabel perbandingan metrik
- **Aturan:** Memakai model yang sama (Gemini 2.5 Flash) agar adil

---

## Bagian 5: Non-Functional Requirements

### Performa
- Waktu pemrosesan 1 notulen (≤5.000 karakter) < 60 detik s.d. story tampil.
- Waktu muat halaman hasil < 2 detik.
- API response untuk operasi non-LLM < 500 ms.

### Keamanan
- API key LLM disimpan di environment variable, tidak di repo / frontend.
- Input diverifikasi panjangnya (anti input raksasa).
- Mode lokal V1: tidak ada autentikasi multi-user; dokumen disimpan di SQLite lokal.

### Skalabilitas (konteks skripsi)
- Menangani dokumen s.d. 50.000 karakter (dengan chunking jika perlu).
- Kuota LLM: maksimal 1 request/dokumen; total 500 RPM/D gabungan model Flash & Flash-Lite dikelola dengan antrian + backoff.
- Komputasi embedding lokal dapat menangani ribuan kalimat tanpa API; prefilter & verifikasi dijalankan model lokal (LM Studio) sehingga tidak membebani kuota Gemini.

### Usability
- Antarmuka Bahasa Indonesia.
- Responsive (desktop utama, tetap dapat diakses di tablet).
- Alur utama (input → ekstraksi → review) jelas dengan indikator status.

### Reliabilitas
- Penanganan error 429/5xx dengan exponential backoff + retry.
- Penyimpanan otomatis hasil ekstraksi agar tidak hilang saat refresh.
- Pemrosesan asinkron (background job) dengan status yang terlihat.

### Kompatibilitas
- Input: teks mentah (V1), target lanjutan `.txt`, `.docx`, `.pdf`.
- Browser modern (Chrome, Firefox, Edge).

---

## Bagian 6: Out of Scope & Dependensi

### Out of Scope (Tidak Dikerjakan di V1)
- **Autentikasi & multi-user** — ditunda ke v2 (V1 mode singular, lokal).
- **Transkripsi audio/video rapat** — diterima dalam bentuk notulen teks tertulis.
- **Kolaborasi real-time antar analis** — ditunda ke v2.
- **Fine-tuning model** — menggunakan prompt engineering, bukan fine-tune.
- **Ekspor ke Jira/Trello otomatis** — ditunda ke v2.
- **Perbandingan antar-model LLM** — evaluasi difokuskan pada kualitas metode pipeline (baseline vs usulan) pada model Gemini 2.5 Flash.

### Dependensi
- **Google Gemini API (gemini-2.5-flash / flash-lite)** — mesin ekstraksi user story (structured JSON output). 500 RPD gabungan.
- **LM Studio (server OpenAI-compatible `http://localhost:1234/v1`)** — runtime model lokal untuk prefilter & verifikasi citation (gratis, tanpa limit request).
- **`openai` SDK** — client OpenAI-compatible untuk LM Studio; nanti dapat dipakai ke Groq/Together/OpenRouter hanya dengan ganti `base_url`.
- **Next.js + TypeScript** — fullstack framework (frontend + API routes).
- **Prisma ORM + SQLite** — persisten data lokal.
- **Librari pendukung**: `@google/genai` (client Gemini), `zod` + `zod-to-json-schema` (validasi schema), `@huggingface/transformers` (embedding cadangan), `tailwindcss` (styling).

### Asumsi
- Notulensi tersedia dalam bentuk teks (hasil catatan tertulis), tidak dari audio berdurasi panjang.
- Kualitas citasi dapat diukur lewat dataset golden yang dibuat peneliti (dengan validator manusia).
- Biaya/kapasitas API Google AI Studio (free tier) cukup untuk seluruh kebutuhan development, produksi demo, dan benchmark (500 RPD).
- Contoh notulensi representatif dapat dibangun secara sintetis untuk dataset benchmark.