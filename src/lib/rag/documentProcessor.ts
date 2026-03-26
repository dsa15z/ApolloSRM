import { prisma } from "@/lib/prisma";
import { parseDocument } from "./parsers";
import { chunkText } from "./chunker";
import { getEmbeddings } from "./embeddings";
import { storeChunkEmbeddings } from "./vectorStore";

export async function processDocument(
  documentId: string,
  content: Buffer | string,
  fileType: string
): Promise<void> {
  try {
    await prisma.document.update({
      where: { id: documentId },
      data: { status: "processing" },
    });

    // Parse
    const text = typeof content === "string"
      ? content
      : await parseDocument(content, fileType);

    if (!text || text.trim().length === 0) {
      throw new Error("No text content extracted from document");
    }

    // Chunk
    const chunks = chunkText(text);

    // Create chunk records
    const chunkRecords = await Promise.all(
      chunks.map((chunk) =>
        prisma.chunk.create({
          data: {
            documentId,
            content: chunk.content,
            chunkIndex: chunk.index,
            tokenCount: chunk.tokenCount,
          },
        })
      )
    );

    // Generate embeddings in batch
    const embeddings = await getEmbeddings(chunks.map((c) => c.content));

    // Store embeddings
    await storeChunkEmbeddings(
      chunkRecords.map((record, i) => ({
        id: record.id,
        embedding: embeddings[i],
      }))
    );

    // Update document status
    await prisma.document.update({
      where: { id: documentId },
      data: { status: "ready", chunkCount: chunks.length },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    await prisma.document.update({
      where: { id: documentId },
      data: { status: "error", error: msg },
    });
    throw error;
  }
}

export async function deleteDocumentAndChunks(documentId: string): Promise<void> {
  // Chunks cascade-delete via the relation
  await prisma.document.delete({ where: { id: documentId } });
}
