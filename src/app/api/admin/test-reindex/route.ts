import { NextResponse } from "next/server";

export async function GET() {
  const checks: Record<string, string> = {};

  // Test each import individually
  try {
    await import("@/lib/prisma");
    checks.prisma = "OK";
  } catch (e) { checks.prisma = `FAIL: ${e instanceof Error ? e.message : e}`; }

  try {
    await import("@/lib/auth");
    checks.auth = "OK";
  } catch (e) { checks.auth = `FAIL: ${e instanceof Error ? e.message : e}`; }

  try {
    await import("@/lib/rag/chunker");
    checks.chunker = "OK";
  } catch (e) { checks.chunker = `FAIL: ${e instanceof Error ? e.message : e}`; }

  try {
    await import("@/lib/rag/embeddings");
    checks.embeddings = "OK";
  } catch (e) { checks.embeddings = `FAIL: ${e instanceof Error ? e.message : e}`; }

  try {
    await import("@/lib/rag/vectorStore");
    checks.vectorStore = "OK";
  } catch (e) { checks.vectorStore = `FAIL: ${e instanceof Error ? e.message : e}`; }

  try {
    await import("@/lib/rag/parsers");
    checks.parsers = "OK";
  } catch (e) { checks.parsers = `FAIL: ${e instanceof Error ? e.message : e}`; }

  try {
    await import("@/lib/rag/documentProcessor");
    checks.documentProcessor = "OK";
  } catch (e) { checks.documentProcessor = `FAIL: ${e instanceof Error ? e.message : e}`; }

  try {
    await import("@/lib/blog-posts");
    checks.blogPosts = "OK";
  } catch (e) { checks.blogPosts = `FAIL: ${e instanceof Error ? e.message : e}`; }

  try {
    await import("@/lib/i18n/en");
    checks.i18n = "OK";
  } catch (e) { checks.i18n = `FAIL: ${e instanceof Error ? e.message : e}`; }

  return NextResponse.json(checks);
}
