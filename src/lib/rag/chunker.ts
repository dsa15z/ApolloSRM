const CHUNK_SIZE = 500; // target tokens (~2000 chars)
const CHUNK_OVERLAP = 50; // overlap tokens (~200 chars)
const CHARS_PER_TOKEN = 4;

export interface TextChunk {
  content: string;
  index: number;
  tokenCount: number;
}

export function chunkText(text: string): TextChunk[] {
  const maxChars = CHUNK_SIZE * CHARS_PER_TOKEN;
  const overlapChars = CHUNK_OVERLAP * CHARS_PER_TOKEN;

  // Clean up text
  const cleaned = text.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();

  if (cleaned.length <= maxChars) {
    return [{ content: cleaned, index: 0, tokenCount: Math.ceil(cleaned.length / CHARS_PER_TOKEN) }];
  }

  const chunks: TextChunk[] = [];
  let start = 0;
  let index = 0;

  while (start < cleaned.length) {
    let end = start + maxChars;

    // Try to break at paragraph, then sentence, then word boundary
    if (end < cleaned.length) {
      const slice = cleaned.slice(start, end + 200);
      const paragraphBreak = slice.lastIndexOf("\n\n", maxChars);
      const sentenceBreak = slice.lastIndexOf(". ", maxChars);
      const wordBreak = slice.lastIndexOf(" ", maxChars);

      if (paragraphBreak > maxChars * 0.5) {
        end = start + paragraphBreak + 2;
      } else if (sentenceBreak > maxChars * 0.5) {
        end = start + sentenceBreak + 2;
      } else if (wordBreak > maxChars * 0.5) {
        end = start + wordBreak + 1;
      }
    }

    const content = cleaned.slice(start, end).trim();
    if (content.length > 0) {
      chunks.push({
        content,
        index,
        tokenCount: Math.ceil(content.length / CHARS_PER_TOKEN),
      });
      index++;
    }

    start = end - overlapChars;
    if (start >= cleaned.length) break;
  }

  return chunks;
}
