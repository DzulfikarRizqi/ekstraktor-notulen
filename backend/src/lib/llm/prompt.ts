import { prefilterJsonSchema, verificationJsonSchema, userStoriesJsonSchema } from "./schema";

export interface IndexedSentence {
  index: number;
  text: string;
}

const formatSentences = (sentences: IndexedSentence[]): string =>
  sentences.map((s) => `[${s.index}] ${s.text}`).join("\n");

// ---- PREFILTER (local LLM / LM Studio) ----

const PREFILTER_SYSTEM = `Anda adalah pemfilter teks rapat teknis.
Tugas Anda adalah menyeleksi nomor indeks kalimat yang memuat kebutuhan fungsional, fitur aplikasi, masalah sistem, atau alur kerja bisnis.

ATURAN:
1. Abaikan kalimat basa-basi, salam pembuka/penutup, jadwal rapat, dan obrolan non-teknis.
2. Jika ragu apakah sebuah kalimat relevan, SERTAKAN nomornya (lebih baik terlalu banyak daripada melewatkan kalimat kebutuhan).
3. HANYA keluarkan nomor indeks yang benar-benar ada pada daftar masukan (anti-halusinasi).
4. Keluarkan HANYA JSON dengan format: {"relevant_sentence_ids": [array_angka]}`;

const PREFILTER_EXAMPLE_INPUT = `[0] Selamat pagi semuanya.
[1] Hari ini kita bahas fitur login.
[2] Nanti user harus bisa reset password via email.
[3] Ya sudah, mari kita makan siang.`;

const PREFILTER_EXAMPLE_OUTPUT = `{"relevant_sentence_ids": [1, 2]}`;

export function buildPrefilterPrompt(sentences: IndexedSentence[]): {
  system: string;
  user: string;
} {
  const user = [
    `CONTOH INPUT:`,
    PREFILTER_EXAMPLE_INPUT,
    ``,
    `CONTOH OUTPUT:`,
    PREFILTER_EXAMPLE_OUTPUT,
    ``,
    `=== INPUT NYATA ===`,
    formatSentences(sentences),
    ``,
    `=== FORMAT JSON WAJIB ===`,
    JSON.stringify(prefilterJsonSchema),
  ].join("\n");
  return { system: PREFILTER_SYSTEM, user };
}

// ---- EKSTRAKSI (Gemini) ----

const EXTRACTION_SYSTEM = `Anda adalah seorang Senior System Analyst yang ahli dalam Requirements Engineering.
Tugas Anda adalah membaca transkrip rapat (yang setiap kalimatnya sudah diberi nomor indeks) dan mengekstrak kebutuhan fungsional menjadi format User Story.

ATURAN KETAT:
1. Anda HANYA boleh merespons dengan format JSON yang valid.
2. DILARANG mengarang kebutuhan sistem yang tidak disebutkan dalam teks.
3. Field "actor", "action", dan "benefit" harus diekstrak dari teks. Jika "benefit" tidak disebutkan, isi dengan string kosong "".
4. Field "source_sentence_ids" WAJIB berisi array angka indeks kalimat (dimulai dari 0) yang menjadi sumber bukti User Story tersebut. HANYA boleh mengutip nomor indeks yang terdapat pada daftar masukan.
5. Dilarang membuat User Story yang isinya identik (duplikat) dengan story lain.`;

const EXTRACTION_EXAMPLE_INPUT = `[0] Selamat siang semuanya, terima kasih sudah hadir di rapat kick-off aplikasi perpustakaan ini.
[1] Langsung saja, dari sisi mahasiswa, saya ingin mereka bisa meminjam buku secara online.
[2] Jadi nggak perlu antre panjang lagi di meja sirkulasi.
[3] Oh iya, Pak, untuk admin perpustakaan bagaimana?
[4] Nah, admin harus bisa menambahkan daftar buku baru ke dalam database sistem.
[5] Terus, kalau bisa sistemnya otomatis ngirim email notifikasi kalau buku sudah lewat masa pinjam.
[6] Betul, supaya denda keterlambatan bisa ditekan.`;

const EXTRACTION_EXAMPLE_OUTPUT = `{
  "user_stories": [
    {
      "actor": "Mahasiswa",
      "action": "meminjam buku secara online",
      "benefit": "tidak perlu antre panjang lagi di meja sirkulasi",
      "source_sentence_ids": [1, 2]
    },
    {
      "actor": "Admin perpustakaan",
      "action": "menambahkan daftar buku baru ke dalam database sistem",
      "benefit": "",
      "source_sentence_ids": [4]
    },
    {
      "actor": "Sistem",
      "action": "otomatis ngirim email notifikasi kalau buku sudah lewat masa pinjam",
      "benefit": "denda keterlambatan bisa ditekan",
      "source_sentence_ids": [5, 6]
    }
  ]
}`;

export function buildExtractionPrompt(
  sentences: IndexedSentence[],
): { system: string; user: string } {
  const user = [
    `=== INPUT CONTOH ===`,
    EXTRACTION_EXAMPLE_INPUT,
    ``,
    `=== OUTPUT CONTOH ===`,
    EXTRACTION_EXAMPLE_OUTPUT,
    ``,
    `=== INPUT NYATA ===`,
    formatSentences(sentences),
    ``,
    `=== FORMAT JSON WAJIB ===`,
    JSON.stringify(userStoriesJsonSchema),
  ].join("\n");
  return { system: EXTRACTION_SYSTEM, user };
}

export function buildExtractionRepairPrompt(error: string): string {
  return [
    `Output sebelumnya tidak valid. Perbaiki dan keluarkan HANYA JSON yang memenuhi skema.`,
    `Kesalahan validasi:`,
    error,
    `Jangan ubah makna konten; perbaiki hanya format JSON-nya.`,
  ].join("\n");
}

// ---- VERIFIKASI (local LLM / LM Studio) ----

const VERIFICATION_SYSTEM = `Anda adalah verifikator data kebutuhan sistem.
Tugas Anda adalah memverifikasi apakah klaim User Story BENAR-BENAR bersumber dari Kalimat Acuan yang diberikan.

ATURAN:
1. Evaluasi apakah Actor, Action, dan Benefit jujur mencerminkan isi Kalimat Acuan.
2. Jika klaim pada User Story membutuhkan kalimat lain DI LUAR Kalimat Acuan yang diberikan agar sepenuhnya didukung, tandai TIDAK sepenuhnya valid (is_valid: false) atau turunkan confidence_score.
3. Jika "benefit" pada User Story kosong, itu BUKAN kekurangan — jangan menandai invalid hanya karena benefit kosong.
4. Bersikap konservatif: jangan mengiyakan bila bukti tidak jelas.
5. Keluarkan HANYA JSON dengan format:
{
  "is_valid": true/false,
  "confidence_score": 0.0 - 1.0,
  "reason": "Alasan singkat"
}`;

export function buildVerificationPrompt(params: {
  sentenceIndex: number;
  sentenceText: string;
  story: { actor: string; action: string; benefit: string };
}): { system: string; user: string } {
  const { sentenceIndex, sentenceText, story } = params;
  const benefitText = story.benefit.trim().length > 0 ? story.benefit : "-";
  const user = [
    `CONTOH INPUT:`,
    `Kalimat Acuan: "[3] Kasir bisa langsung scan barcode barang pakai scanner genggam."`,
    `User Story Gemini:`,
    `- Actor: Kasir`,
    `- Action: scan barcode barang`,
    `- Benefit: -`,
    ``,
    `CONTOH OUTPUT:`,
    `{"is_valid": true, "confidence_score": 0.98, "reason": "Sesuai dengan sumber."}`,
    ``,
    `CONTOH NEGATIF INPUT:`,
    `Kalimat Acuan: "[2] Kita bahas soal jadwal rapat minggu depan."`,
    `User Story Gemini:`,
    `- Actor: Admin`,
    `- Action: menambahkan buku baru`,
    `- Benefit: -`,
    ``,
    `CONTOH NEGATIF OUTPUT:`,
    `{"is_valid": false, "confidence_score": 0.05, "reason": "Kalimat berisi topik tidak berkaitan."}`,
    ``,
    `=== INPUT NYATA ===`,
    `Kalimat Acuan: "[${sentenceIndex}] ${sentenceText}"`,
    `User Story Gemini:`,
    `- Actor: ${story.actor}`,
    `- Action: ${story.action}`,
    `- Benefit: ${benefitText}`,
    ``,
    `=== FORMAT JSON WAJIB ===`,
    JSON.stringify(verificationJsonSchema),
  ].join("\n");
  return { system: VERIFICATION_SYSTEM, user };
}