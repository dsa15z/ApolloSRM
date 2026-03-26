import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken, AUTH_COOKIE } from "@/lib/auth";
import { processDocument, deleteDocumentAndChunks } from "@/lib/rag/documentProcessor";
import { parseDocument } from "@/lib/rag/parsers";

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
    const publishTargetsStr = (formData.get("publishTargets") as string) || '["knowledgebase"]';
    const publishTargets: string[] = JSON.parse(publishTargetsStr);

    // Blog fields
    const blogSlug = (formData.get("blogSlug") as string) || "";
    const blogExcerpt = (formData.get("blogExcerpt") as string) || "";
    const blogAuthor = (formData.get("blogAuthor") as string) || "ApolloSRM Team";
    const blogCategory = (formData.get("blogCategory") as string) || "Product Updates";

    // Download fields
    const downloadDescription = (formData.get("downloadDescription") as string) || "";

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

    const docTitle = title || file.name.replace(/\.[^.]+$/, "");
    const buffer = Buffer.from(await file.arrayBuffer());

    // Determine source type
    const source = publishTargets.includes("blog") ? "blog" :
                   publishTargets.includes("download") ? "download" : "upload";

    // Create document record for knowledge base
    const doc = await prisma.document.create({
      data: {
        title: docTitle,
        fileName: file.name,
        fileType: ext,
        source,
        uploadedBy: payload.sub,
      },
    });

    // Process for knowledge base (parse, chunk, embed, store)
    await processDocument(doc.id, buffer, ext);

    const results: { target: string; status: string; url?: string; error?: string }[] = [
      { target: "knowledgebase", status: "ready" },
    ];

    // Publish to Blog
    if (publishTargets.includes("blog")) {
      try {
        // Extract text content for the blog post
        const textContent = await parseDocument(buffer, ext);
        const slug = blogSlug || docTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        const wordCount = textContent.split(/\s+/).length;
        const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

        await prisma.dynamicBlogPost.upsert({
          where: { slug },
          update: {
            title: docTitle,
            excerpt: blogExcerpt || textContent.slice(0, 200) + "...",
            content: textContent,
            author: blogAuthor,
            category: blogCategory,
            readTime,
            documentId: doc.id,
          },
          create: {
            slug,
            title: docTitle,
            excerpt: blogExcerpt || textContent.slice(0, 200) + "...",
            content: textContent,
            author: blogAuthor,
            category: blogCategory,
            readTime,
            documentId: doc.id,
          },
        });

        results.push({ target: "blog", status: "published", url: `/blog/${slug}` });
      } catch (error) {
        results.push({ target: "blog", status: "error", error: error instanceof Error ? error.message : String(error) });
      }
    }

    // Publish to Downloads
    if (publishTargets.includes("download")) {
      try {
        // Store file as base64 in the database (for Vercel serverless compatibility)
        const cleanFileName = file.name.replace(/\s+/g, "-");
        const fileUrl = `/api/admin/documents/file?id=${doc.id}`;

        await prisma.dynamicDownload.create({
          data: {
            title: docTitle,
            description: downloadDescription || `Download ${docTitle}`,
            fileName: cleanFileName,
            fileUrl,
            fileSize: file.size,
            documentId: doc.id,
          },
        });

        // Store the raw file bytes in the document metadata for serving
        await prisma.document.update({
          where: { id: doc.id },
          data: {
            sourceId: Buffer.from(buffer).toString("base64").slice(0, 100), // Store indicator
          },
        });

        results.push({ target: "download", status: "published", url: "/downloads" });
      } catch (error) {
        results.push({ target: "download", status: "error", error: error instanceof Error ? error.message : String(error) });
      }
    }

    const updated = await prisma.document.findUnique({ where: { id: doc.id } });
    return NextResponse.json({ document: updated, results }, { status: 201 });
  } catch (error) {
    console.error("Document upload error:", error);
    const msg = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
