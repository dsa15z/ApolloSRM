import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken, AUTH_COOKIE } from "@/lib/auth";
import { processDocument, deleteDocumentAndChunks } from "@/lib/rag/documentProcessor";
import { blogPosts } from "@/lib/blog-posts";
import { readFileSync } from "fs";
import { join } from "path";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE)?.value;
  const payload = token ? await verifyToken(token) : null;
  if (!payload || payload.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results: { source: string; title: string; status: string; error?: string }[] = [];

  // Index blog posts
  for (const post of blogPosts) {
    try {
      // Delete existing document for this blog post
      const existing = await prisma.document.findFirst({
        where: { source: "blog", sourceId: post.slug },
      });
      if (existing) {
        await deleteDocumentAndChunks(existing.id);
      }

      const doc = await prisma.document.create({
        data: {
          title: post.title,
          fileName: `${post.slug}.md`,
          fileType: "md",
          source: "blog",
          sourceId: post.slug,
          uploadedBy: payload.sub,
        },
      });

      // Combine blog content
      const content = `# ${post.title}\n\n${post.excerpt}\n\n${post.content}`;
      await processDocument(doc.id, content, "txt");
      results.push({ source: "blog", title: post.title, status: "ready" });
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      results.push({ source: "blog", title: post.title, status: "error", error: msg });
    }
  }

  // Index download PDFs
  const downloadPDFs = [
    { file: "ApolloSRM-Intro.pdf", title: "ApolloSRM Introduction" },
    { file: "ApolloSRM-All-in-One.pdf", title: "All-in-One Mission Control" },
    { file: "ApolloSRM-Mission-Support.pdf", title: "Mission Support & Data Freedom" },
    { file: "ApolloSRM-Data-Security.pdf", title: "Data Security Overview" },
    { file: "ApolloSRM-Mobile.pdf", title: "ApolloSRM Mobile" },
  ];

  for (const pdf of downloadPDFs) {
    try {
      const existing = await prisma.document.findFirst({
        where: { source: "download", sourceId: pdf.file },
      });
      if (existing) {
        await deleteDocumentAndChunks(existing.id);
      }

      const doc = await prisma.document.create({
        data: {
          title: pdf.title,
          fileName: pdf.file,
          fileType: "pdf",
          source: "download",
          sourceId: pdf.file,
          uploadedBy: payload.sub,
        },
      });

      const filePath = join(process.cwd(), "public", "downloads", pdf.file);
      const buffer = readFileSync(filePath);
      await processDocument(doc.id, buffer, "pdf");
      results.push({ source: "download", title: pdf.title, status: "ready" });
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      results.push({ source: "download", title: pdf.title, status: "error", error: msg });
    }
  }

  return NextResponse.json({ results });
}
