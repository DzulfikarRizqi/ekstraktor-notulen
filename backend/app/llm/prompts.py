import json
from typing import TypedDict

from app.llm.schema import (
    prefilter_json_schema,
    user_stories_json_schema,
    verification_json_schema,
)


class IndexedSentence(TypedDict):
    index: int
    text: str


def _dump(schema: dict) -> str:
    return json.dumps(schema, ensure_ascii=False, separators=(",", ":"))


def format_sentences(sentences: list[IndexedSentence]) -> str:
    return "\n".join(f"[{s['index']}] {s['text']}" for s in sentences)


# ---- PREFILTER (local LLM / LM Studio) ----

PREFILTER_SYSTEM = """Anda adalah pemfilter teks rapat teknis.
Tugas Anda adalah menyeleksi nomor indeks kalimat yang memuat kebutuhan fungsional, fitur aplikasi, masalah sistem, atau alur kerja bisnis.

ATURAN:
1. Abaikan kalimat basa-basi, salam pembuka/penutup, jadwal rapat, dan obrolan non-teknis.
2. Jika ragu apakah sebuah kalimat relevan, SERTAKAN nomornya (lebih baik terlalu banyak daripada melewatkan kalimat kebutuhan).
3. HANYA keluarkan nomor indeks yang benar-benar ada pada daftar masukan (anti-halusinasi).
4. Keluarkan HANYA JSON dengan format: {"relevant_sentence_ids": [array_angka]}"""

PREFILTER_EXAMPLE_INPUT = """[0] Selamat pagi semuanya.
[1] Hari ini kita bahas fitur login.
[2] Nanti user harus bisa reset password via email.
[3] Ya sudah, mari kita makan siang."""

PREFILTER_EXAMPLE_OUTPUT = '{"relevant_sentence_ids": [1, 2]}'


def build_prefilter_prompt(sentences: list[IndexedSentence]) -> dict[str, str]:
    user = "\n".join(
        [
            "CONTOH INPUT:",
            PREFILTER_EXAMPLE_INPUT,
            "",
            "CONTOH OUTPUT:",
            PREFILTER_EXAMPLE_OUTPUT,
            "",
            "=== INPUT NYATA ===",
            format_sentences(sentences),
            "",
            "=== FORMAT JSON WAJIB ===",
            _dump(prefilter_json_schema),
        ]
    )
    return {"system": PREFILTER_SYSTEM, "user": user}


# ---- EKSTRAKSI (Gemini) ----

EXTRACTION_SYSTEM = """Anda adalah seorang Senior System Analyst yang ahli dalam Requirements Engineering.
Tugas Anda adalah membaca transkrip rapat (yang setiap kalimatnya sudah diberi nomor indeks) dan mengekstrak kebutuhan fungsional menjadi format User Story.

ATURAN KETAT:
1. Anda HANYA boleh merespons dengan format JSON yang valid.
2. DILARANG mengarang kebutuhan sistem yang tidak disebutkan dalam teks.
3. Field "actor", "action", dan "benefit" harus diekstrak dari teks. Jika "benefit" tidak disebutkan, isi dengan string kosong "".
4. Field "source_sentence_ids" WAJIB berisi array angka indeks kalimat (dimulai dari 0) yang menjadi sumber bukti User Story tersebut. HANYA boleh mengutip nomor indeks yang terdapat pada daftar masukan.
5. Dilarang membuat User Story yang isinya identik (duplikat) dengan story lain."""

EXTRACTION_EXAMPLE_INPUT = """[0] Selamat siang semuanya, terima kasih sudah hadir di rapat kick-off aplikasi perpustakaan ini.
[1] Langsung saja, dari sisi mahasiswa, saya ingin mereka bisa meminjam buku secara online.
[2] Jadi nggak perlu antre panjang lagi di meja sirkulasi.
[3] Oh iya, Pak, untuk admin perpustakaan bagaimana?
[4] Nah, admin harus bisa menambahkan daftar buku baru ke dalam database sistem.
[5] Terus, kalau bisa sistemnya otomatis ngirim email notifikasi kalau buku sudah lewat masa pinjam.
[6] Betul, supaya denda keterlambatan bisa ditekan."""

EXTRACTION_EXAMPLE_OUTPUT = """{
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
}"""


def build_extraction_prompt(sentences: list[IndexedSentence]) -> dict[str, str]:
    user = "\n".join(
        [
            "=== INPUT CONTOH ===",
            EXTRACTION_EXAMPLE_INPUT,
            "",
            "=== OUTPUT CONTOH ===",
            EXTRACTION_EXAMPLE_OUTPUT,
            "",
            "=== INPUT NYATA ===",
            format_sentences(sentences),
            "",
            "=== FORMAT JSON WAJIB ===",
            _dump(user_stories_json_schema),
        ]
    )
    return {"system": EXTRACTION_SYSTEM, "user": user}


def build_extraction_repair_prompt(error: str) -> str:
    return "\n".join(
        [
            "Output sebelumnya tidak valid. Perbaiki dan keluarkan HANYA JSON yang memenuhi skema.",
            "Kesalahan validasi:",
            error,
            "Jangan ubah makna konten; perbaiki hanya format JSON-nya.",
        ]
    )


# ---- VERIFIKASI (local LLM / LM Studio) ----

VERIFICATION_SYSTEM = """Anda adalah verifikator data kebutuhan sistem.
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
}"""


class VerifiableStory(TypedDict):
    actor: str
    action: str
    benefit: str


def build_verification_prompt(
    sentence_index: int,
    sentence_text: str,
    story: VerifiableStory,
) -> dict[str, str]:
    benefit_text = story["benefit"].strip() if story["benefit"].strip() else "-"
    user = "\n".join(
        [
            "CONTOH INPUT:",
            'Kalimat Acuan: "[3] Kasir bisa langsung scan barcode barang pakai scanner genggam."',
            "User Story Gemini:",
            "- Actor: Kasir",
            "- Action: scan barcode barang",
            "- Benefit: -",
            "",
            "CONTOH OUTPUT:",
            '{"is_valid": true, "confidence_score": 0.98, "reason": "Sesuai dengan sumber."}',
            "",
            "CONTOH NEGATIF INPUT:",
            'Kalimat Acuan: "[2] Kita bahas soal jadwal rapat minggu depan."',
            "User Story Gemini:",
            "- Actor: Admin",
            "- Action: menambahkan buku baru",
            "- Benefit: -",
            "",
            "CONTOH NEGATIF OUTPUT:",
            '{"is_valid": false, "confidence_score": 0.05, "reason": "Kalimat berisi topik tidak berkaitan."}',
            "",
            "=== INPUT NYATA ===",
            f"Kalimat Acuan: \"[{sentence_index}] {sentence_text}\"",
            "User Story Gemini:",
            f"- Actor: {story['actor']}",
            f"- Action: {story['action']}",
            f"- Benefit: {benefit_text}",
            "",
            "=== FORMAT JSON WAJIB ===",
            _dump(verification_json_schema),
        ]
    )
    return {"system": VERIFICATION_SYSTEM, "user": user}