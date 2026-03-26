import { PDFParse } from "pdf-parse";

export async function parsePDF(buffer: Buffer): Promise<string> {
  const parser = new PDFParse({ data: new Uint8Array(buffer) });
  const result = await parser.getText();
  return result.text;
}

export async function parseDOCX(buffer: Buffer): Promise<string> {
  const mammoth = await import("mammoth");
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
}

export async function parseTXT(buffer: Buffer): Promise<string> {
  return buffer.toString("utf-8");
}

export async function parseDocument(buffer: Buffer, fileType: string): Promise<string> {
  switch (fileType.toLowerCase()) {
    case "pdf":
      return parsePDF(buffer);
    case "docx":
      return parseDOCX(buffer);
    case "txt":
    case "md":
      return parseTXT(buffer);
    default:
      throw new Error(`Unsupported file type: ${fileType}`);
  }
}
