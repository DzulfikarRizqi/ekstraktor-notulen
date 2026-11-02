import { z } from "zod";
import { db } from "@/lib/db";
import { badRequest, notFound, conflict } from "@/lib/http";
import { enqueueJob } from "@/lib/jobs/queue";
import { runPipeline } from "@/lib/pipeline/pipeline";
import type { PipelineProvider } from "@/types";

const extractSchema = z.object({
  provider: z.enum(["lmstudio", "gemini"]).optional(),
});

export async function POST(
  request: Request,
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

  let provider: PipelineProvider | undefined;
  const rawBody = await request.text();
  if (rawBody.trim()) {
    let body: unknown;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return badRequest("Body harus berupa JSON.");
    }
    const parsed = extractSchema.safeParse(body);
    if (!parsed.success) {
      return badRequest('Provider tidak valid. Gunakan "lmstudio" atau "gemini".');
    }
    provider = parsed.data.provider;
  }

  await db.document.update({
    where: { id },
    data: { status: "processing", truncated: false, error: null },
  });

  enqueueJob(async () => {
    try {
      await runPipeline(id, provider);
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