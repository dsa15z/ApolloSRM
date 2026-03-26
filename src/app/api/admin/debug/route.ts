import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken, AUTH_COOKIE } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE)?.value;
  const payload = token ? await verifyToken(token) : null;
  if (!payload || payload.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const checks: Record<string, string> = {};

  // Check database connection
  try {
    await prisma.$queryRawUnsafe("SELECT 1");
    checks.database = "OK";
  } catch (err) {
    checks.database = `FAIL: ${err instanceof Error ? err.message : String(err)}`;
  }

  // Check pgvector extension
  try {
    const ext = await prisma.$queryRawUnsafe<{ extname: string }[]>(
      `SELECT extname FROM pg_extension WHERE extname = 'vector'`
    );
    checks.pgvector = ext.length > 0 ? "OK - installed" : "NOT INSTALLED";
  } catch (err) {
    checks.pgvector = `FAIL: ${err instanceof Error ? err.message : String(err)}`;
  }

  // Try to create extension
  try {
    await prisma.$queryRawUnsafe(`CREATE EXTENSION IF NOT EXISTS vector`);
    checks.pgvector_create = "OK";
  } catch (err) {
    checks.pgvector_create = `FAIL: ${err instanceof Error ? err.message : String(err)}`;
  }

  // Check if tables exist
  for (const table of ["Document", "Chunk", "ChatSession", "ChatMessage", "User"]) {
    try {
      const count = await prisma.$queryRawUnsafe<{ count: bigint }[]>(
        `SELECT COUNT(*) as count FROM "${table}"`
      );
      checks[`table_${table}`] = `OK - ${count[0].count} rows`;
    } catch (err) {
      checks[`table_${table}`] = `FAIL: ${err instanceof Error ? err.message : String(err)}`;
    }
  }

  // Check if embedding column exists on Chunk
  try {
    await prisma.$queryRawUnsafe(
      `SELECT "embedding" FROM "Chunk" LIMIT 0`
    );
    checks.chunk_embedding_column = "OK - exists";
  } catch (err) {
    checks.chunk_embedding_column = `FAIL: ${err instanceof Error ? err.message : String(err)}`;
  }

  // Check OpenAI key
  checks.openai_key = process.env.OPENAI_API_KEY ? `SET (${process.env.OPENAI_API_KEY.slice(0, 8)}...)` : "NOT SET";

  return NextResponse.json(checks);
}
