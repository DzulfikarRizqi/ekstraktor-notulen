import { db } from "@/lib/db";
import { toDocumentDetailDto } from "@/lib/dto";
import { conflict, notFound } from "@/lib/http";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const document = await db.document.findUnique({
    where: { id },
    include: {
      sentences: { orderBy: { index: "asc" } },
      userStories: {
        orderBy: { storyCode: "asc" },
        include: {
          storySentences: { include: { sentence: true } },
        },
      },
    },
  });
  if (!document) {
    return notFound("Dokumen tidak ditemukan.");
  }
  return Response.json({ data: toDocumentDetailDto(document) });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const document = await db.document.findUnique({
    where: { id },
    select: { id: true, status: true },
  });
  if (!document) {
    return notFound("Dokumen tidak ditemukan.");
  }
  if (document.status === "processing") {
    return conflict("Dokumen sedang diproses. Tunggu hingga selesai sebelum menghapus.");
  }

  await db.document.delete({ where: { id } });
  return Response.json({ data: { ok: true } });
}