import { db } from "@/lib/db";
import { toDocumentDetailDto } from "@/lib/dto";
import { notFound } from "@/lib/http";

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