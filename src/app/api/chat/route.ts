import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getEmbedding } from "@/lib/rag/embeddings";
import { searchSimilarChunks } from "@/lib/rag/vectorStore";
import { buildSystemPrompt } from "@/lib/rag/prompts";

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
    let contextChunks: { content: string; documentTitle?: string }[] = [];
    try {
      const queryEmbedding = await getEmbedding(lastUserMessage.content);
      const results = await searchSimilarChunks(queryEmbedding, 5);
      contextChunks = results.map((r) => ({
        content: r.content,
        documentTitle: r.documentTitle || undefined,
      }));
    } catch (err) {
      console.error("RAG search failed, continuing without context:", err);
    }

    const systemPrompt = buildSystemPrompt(contextChunks);

    // Stream the response
    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      messages: messages.slice(-10), // Last 10 messages for context
      onFinish: async ({ text }) => {
        // Save assistant message
        if (session) {
          await prisma.chatMessage.create({
            data: {
              sessionId: session.id,
              role: "assistant",
              content: text,
              sources: JSON.stringify(contextChunks.map((c) => c.documentTitle)),
            },
          });
          await prisma.chatSession.update({
            where: { id: session.id },
            data: { updatedAt: new Date() },
          });
        }
      },
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat error:", error);
    return new Response("Chat error", { status: 500 });
  }
}
