import { db } from "@/lib/db";
import { notFound, conflict } from "@/lib/http";
import { enqueueJob } from "@/lib/jobs/queue";
import { runPipeline } from "@/lib/pipeline/pipeline";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const document = await db.document.findUnique({ where: { id } });
  if (!document) {
    return notFound("Dokumen tidak ditemukan.");
  }
  if (document.status === "processing") {
    return conflict("Dokumen sedang diproses.");
  }

  await db.document.update({
    where: { id },
    data: { status: "processing", truncated: false, error: null },
  });

  enqueueJob(async () => {
    try {
      await runPipeline(id);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Pipeline gagal tanpa pesan.";
      console.error(`[extract:${id}]`, e);
      await db.document
        .update({
          where: { id },
          data: { status: "failed", error: message },
        })
        .catch(() => undefined);
    }
  });

  return Response.json({ data: { status: "processing" } }, { status: 202 });
}