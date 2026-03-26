import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken, AUTH_COOKIE } from "@/lib/auth";
import { processDocument, deleteDocumentAndChunks } from "@/lib/rag/documentProcessor";

export async function DELETE(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE)?.value;
  const payload = token ? await verifyToken(token) : null;
  if (!payload || payload.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Document ID required" }, { status: 400 });
  }

  try {
    await deleteDocumentAndChunks(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE)?.value;
  const payload = token ? await verifyToken(token) : null;
  if (!payload || payload.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const documents = await prisma.document.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(documents);
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE)?.value;
  const payload = token ? await verifyToken(token) : null;
  if (!payload || payload.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const title = (formData.get("title") as string) || "";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    if (!["pdf", "docx", "txt", "md"].includes(ext)) {
      return NextResponse.json({ error: "Unsupported file type. Use PDF, DOCX, or TXT." }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large. Max 10MB." }, { status: 400 });
    }

    // Create document record
    const doc = await prisma.document.create({
      data: {
        title: title || file.name.replace(/\.[^.]+$/, ""),
        fileName: file.name,
        fileType: ext,
        source: "upload",
        uploadedBy: payload.sub,
      },
    });

    // Process document (parse, chunk, embed, store)
    const buffer = Buffer.from(await file.arrayBuffer());
    await processDocument(doc.id, buffer, ext);

    const updated = await prisma.document.findUnique({ where: { id: doc.id } });
    return NextResponse.json(updated, { status: 201 });
  } catch (error) {
    console.error("Document upload error:", error);
    const msg = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
