import { describe, expect, it } from "vitest";
import { segmentText } from "@/lib/pipeline/segmenter";

describe("segmentText", () => {
  it("memecah teks menjadi kalimat bernomor 0-based", () => {
    const result = segmentText("Selamat pagi. Kita bahas fitur login. Sudah, itu saja.");
    expect(result).toEqual([
      { index: 0, text: "Selamat pagi." },
      { index: 1, text: "Kita bahas fitur login." },
      { index: 2, text: "Sudah, itu saja." },
    ]);
  });

  it("membuang spasi berlebih", () => {
    const result = segmentText("  Hallo   dunia.   ");
    expect(result[0]).toEqual({ index: 0, text: "Hallo dunia." });
  });

  it("menangani teks kosong", () => {
    expect(segmentText("")).toEqual([]);
    expect(segmentText("   ")).toEqual([]);
  });

  it("mode transkrip: satu baris = satu kalimat, penanda pembicara dipertahankan", () => {
    const input = [
      "(PERSON5) Ehm, thank you.",
      "[PERSON8] what are you doing?",
      "You are preparing the link into the-",
      "(PERSON8) Ye, Ye, Ye",
    ].join("\n");
    const result = segmentText(input);
    expect(result).toEqual([
      { index: 0, text: "(PERSON5) Ehm, thank you." },
      { index: 1, text: "[PERSON8] what are you doing?" },
      { index: 2, text: "You are preparing the link into the-" },
      { index: 3, text: "(PERSON8) Ye, Ye, Ye" },
    ]);
  });

  it("mode transkrip: baris tag murni dibuang", () => {
    const input = [
      "(PERSON5) So we start.",
      "<parallel_talk/>",
      "(PERSON7) Okay.",
      "<unintelligible/>",
    ].join("\n");
    const result = segmentText(input);
    expect(result.map((s) => s.text)).toEqual([
      "(PERSON5) So we start.",
      "(PERSON7) Okay.",
    ]);
  });

  it("mode transkrip: dua kalimat dalam satu baris tetap satu unit", () => {
    const input = [
      "(PERSON5) No, no, I'm just aligning that link. It is correct now.",
      "(PERSON7) Fine.",
      "(PERSON8) Yes, thanks. Goodbye.",
    ].join("\n");
    const result = segmentText(input);
    expect(result).toHaveLength(3);
    expect(result[0].text).toBe(
      "(PERSON5) No, no, I'm just aligning that link. It is correct now.",
    );
  });

  it("prosa murni tidak salah terdeteksi sebagai transkrip", () => {
    const input = "Tim sepakat pengguna dapat mendaftar akun menggunakan email.\nAdmin perlu melihat daftar pendaftaran baru setiap hari.\nLaporan dikirim setiap Senin pagi.";
    const result = segmentText(input);
    expect(result).toHaveLength(3);
    expect(result[0].text).toContain("Tim sepakat");
  });

  it("ambang deteksi: rasio penanda di bawah 30% tetap diproses sebagai prosa", () => {
    const lines = [
      "Kita bahas fitur login hari ini.",
      "User harus bisa reset password via email.",
      "Admin dapat melihat log aktivitas.",
      "Notifikasi dikirim via email.",
      "Rudi: sistem harus cepat.",
    ];
    const result = segmentText(lines.join("\n"));
    // 1 dari 5 baris berpenanda (20%) → mode prosa, tanda titik memotong kalimat.
    expect(result[0].text).toBe("Kita bahas fitur login hari ini.");
  });
});
