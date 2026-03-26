import { prisma } from "@/lib/prisma";

export async function storeChunkEmbedding(chunkId: string, embedding: number[]): Promise<void> {
  const vectorStr = `[${embedding.join(",")}]`;
  await prisma.$queryRawUnsafe(
    `UPDATE "Chunk" SET "embedding" = $1::vector WHERE "id" = $2`,
    vectorStr,
    chunkId
  );
}

export async function storeChunkEmbeddings(
  chunks: { id: string; embedding: number[] }[]
): Promise<void> {
  for (const chunk of chunks) {
    await storeChunkEmbedding(chunk.id, chunk.embedding);
  }
}

export interface SearchResult {
  id: string;
  content: string;
  documentId: string;
  metadata: string;
  similarity: number;
  documentTitle?: string;
  documentSource?: string;
  sourceId?: string;
}

export async function searchSimilarChunks(
  queryEmbedding: number[],
  limit: number = 5,
  minSimilarity: number = 0.3
): Promise<SearchResult[]> {
  const vectorStr = `[${queryEmbedding.join(",")}]`;

  const results = await prisma.$queryRawUnsafe<SearchResult[]>(
    `SELECT c."id", c."content", c."documentId", c."metadata",
            1 - (c."embedding" <=> $1::vector) AS similarity,
            d."title" AS "documentTitle",
            d."source" AS "documentSource",
            d."sourceId" AS "sourceId"
     FROM "Chunk" c
     JOIN "Document" d ON c."documentId" = d."id"
     WHERE d."status" = 'ready'
       AND c."embedding" IS NOT NULL
       AND 1 - (c."embedding" <=> $1::vector) > $2
     ORDER BY c."embedding" <=> $1::vector
     LIMIT $3`,
    vectorStr,
    minSimilarity,
    limit
  );

  return results;
}
