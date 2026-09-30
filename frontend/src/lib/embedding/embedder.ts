import { pipeline, type FeatureExtractionPipeline } from "@huggingface/transformers";
import { config } from "@/lib/config";

let extractorPromise: Promise<FeatureExtractionPipeline> | null = null;

const getExtractor = (): Promise<FeatureExtractionPipeline> => {
  if (!extractorPromise) {
    extractorPromise = pipeline(
      "feature-extraction",
      config.EMBEDDING_MODEL as never,
      { dtype: "fp32" },
    ) as Promise<FeatureExtractionPipeline>;
  }
  return extractorPromise;
};

export async function embedTexts(texts: string[]): Promise<number[][]> {
  if (texts.length === 0) return [];
  const extractor = await getExtractor();
  const output = await extractor(texts, { pooling: "mean", normalize: true });
  return output.tolist() as number[][];
}

export async function embedText(text: string): Promise<number[]> {
  const [vector] = await embedTexts([text]);
  return vector ?? [];
}