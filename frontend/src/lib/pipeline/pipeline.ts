import { db } from "@/lib/db";
import type { UserStory } from "@/generated/prisma/client";
import type { IndexedSentence } from "@/lib/llm/prompt";
import { segmentText } from "./segmenter";
import { prefilterSentences } from "./prefilter";
import { extractUserStories } from "./extraction";
import { verifyStories } from "./verification";

export async function runPipeline(documentId: string): Promise<void> {
  const document = await db.document.findUniqueOrThrow({
    where: { id: documentId },
  });

  await db.storySentence.deleteMany({
    where: { story: { documentId } },
  });
  await db.userStory.deleteMany({ where: { documentId } });
  await db.sentence.deleteMany({ where: { documentId } });

  const indexed = segmentText(document.content);
  await db.sentence.createMany({
    data: indexed.map((s) => ({
      documentId,
      index: s.index,
      text: s.text,
    })),
  });

  const sentences = await db.sentence.findMany({
    where: { documentId },
    orderBy: { index: "asc" },
  });
  const byIndex = new Map(sentences.map((s) => [s.index, s]));

  const relevantIndices = await prefilterSentences(indexed);
  const filtered: IndexedSentence[] = indexed.filter((s) =>
    relevantIndices.includes(s.index),
  );

  const { stories, truncated } = await extractUserStories(filtered);

  const createdStories: UserStory[] = [];
  for (let i = 0; i < stories.length; i++) {
    const st = stories[i];
    createdStories.push(
      await db.userStory.create({
        data: {
          documentId,
          storyCode: `US-${String(i + 1).padStart(2, "0")}`,
          actor: st.actor,
          action: st.action,
          benefit: st.benefit,
        },
      }),
    );
  }

  const verdicts = await verifyStories(
    stories.map((st, i) => ({
      id: i,
      key: createdStories[i].id,
      actor: st.actor,
      action: st.action,
      benefit: st.benefit,
      sourceIndices: st.source_sentence_ids,
    })),
    indexed,
  );

  for (let i = 0; i < createdStories.length; i++) {
    for (const v of verdicts[i]) {
      const sentence = byIndex.get(v.sourceIndex);
      if (!sentence) continue;
      await db.storySentence.create({
        data: {
          storyId: createdStories[i].id,
          sentenceId: sentence.id,
          llmVerdict: v.llmVerdict,
          confidenceScore: v.confidenceScore,
          llmReason: v.llmReason,
          embeddingSimilarity: v.embeddingSimilarity,
          verificationStatus: v.verificationStatus,
        },
      });
    }
  }

  await db.document.update({
    where: { id: documentId },
    data: { status: "completed", truncated, error: null },
  });
}