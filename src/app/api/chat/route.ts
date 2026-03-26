import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getEmbedding } from "@/lib/rag/embeddings";
import { searchSimilarChunks } from "@/lib/rag/vectorStore";
import { buildSystemPrompt, SourceReference } from "@/lib/rag/prompts";

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const { messages, sessionToken } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response("Messages required", { status: 400 });
    }

    const lastUserMessage = messages.filter((m: { role: string }) => m.role === "user").pop();
    if (!lastUserMessage) {
      return new Response("No user message", { status: 400 });
    }

    // Get or create chat session
    let session = null;
    if (sessionToken) {
      session = await prisma.chatSession.findUnique({
        where: { sessionToken },
      });
    }

    if (!session && sessionToken) {
      session = await prisma.chatSession.create({
        data: { sessionToken },
      });
    }

    // Save user message
    if (session) {
      await prisma.chatMessage.create({
        data: {
          sessionId: session.id,
          role: "user",
          content: lastUserMessage.content,
        },
      });
    }

    // RAG: embed query and search for relevant chunks
    let contextChunks: { content: string; documentTitle?: string; documentSource?: string; sourceId?: string }[] = [];
    try {
      const queryEmbedding = await getEmbedding(lastUserMessage.content);
      const results = await searchSimilarChunks(queryEmbedding, 5);
      contextChunks = results.map((r) => ({
        content: r.content,
        documentTitle: r.documentTitle || undefined,
        documentSource: r.documentSource || undefined,
        sourceId: r.sourceId || undefined,
      }));
    } catch (err) {
      console.error("RAG search failed, continuing without context:", err);
    }

    const { prompt: systemPrompt, sources } = buildSystemPrompt(contextChunks);

    // Stream the response, then append source metadata
    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      messages: messages.slice(-10),
      onFinish: async ({ text }) => {
        if (session) {
          await prisma.chatMessage.create({
            data: {
              sessionId: session.id,
              role: "assistant",
              content: text,
              sources: JSON.stringify(sources),
            },
          });
          await prisma.chatSession.update({
            where: { id: session.id },
            data: { updatedAt: new Date() },
          });
        }
      },
    });

    // Custom stream that appends source metadata after the text
    const textStream = result.textStream;
    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of textStream) {
          controller.enqueue(encoder.encode(chunk));
        }
        // Append source references as a special delimiter + JSON
        if (sources.length > 0) {
          controller.enqueue(encoder.encode(`\n\n[SOURCES]${JSON.stringify(sources)}[/SOURCES]`));
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response("Chat error", { status: 500 });
  }
}
