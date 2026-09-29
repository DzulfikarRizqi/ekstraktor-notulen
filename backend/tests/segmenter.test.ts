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
});