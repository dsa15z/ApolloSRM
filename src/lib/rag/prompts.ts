export interface SourceReference {
  index: number;
  title: string;
  url: string;
  source: string; // "website", "blog", "download", "upload"
}

function getSourceUrl(documentSource: string, sourceId?: string): string {
  switch (documentSource) {
    case "website":
      // Map website content IDs to page sections
      const sectionMap: Record<string, string> = {
        "website-hero": "/#main",
        "website-features": "/#features",
        "website-pricing": "/#pricing",
        "website-about": "/#about",
        "website-faq": "/#faq",
        "website-ai": "/#ai",
        "website-why": "/#why-choose-us",
        "website-workflow": "/#workflow",
        "website-testimonials": "/#testimonials",
      };
      return sectionMap[sourceId || ""] || "/";
    case "blog":
      return `/blog/${sourceId || ""}`;
    case "download":
      return `/downloads/${sourceId || ""}`;
    case "upload":
      return "/downloads"; // uploaded docs go to downloads page
    default:
      return "/";
  }
}

export function buildSystemPrompt(
  contextChunks: { content: string; documentTitle?: string; documentSource?: string; sourceId?: string }[]
): { prompt: string; sources: SourceReference[] } {
  // Deduplicate sources by title
  const sourceMap = new Map<string, SourceReference>();
  let sourceIndex = 1;

  contextChunks.forEach((c) => {
    const title = c.documentTitle || "ApolloSRM";
    if (!sourceMap.has(title)) {
      sourceMap.set(title, {
        index: sourceIndex++,
        title,
        url: getSourceUrl(c.documentSource || "website", c.sourceId),
        source: c.documentSource || "website",
      });
    }
  });

  const sources = Array.from(sourceMap.values());

  const context = contextChunks
    .map((c) => {
      const ref = sourceMap.get(c.documentTitle || "ApolloSRM");
      return `[Source ${ref?.index || "?"}. ${c.documentTitle || "ApolloSRM"}]\n${c.content}`;
    })
    .join("\n\n---\n\n");

  const sourceList = sources.map((s) => `[${s.index}] ${s.title}`).join("\n");

  const prompt = `You are Apollo, the AI assistant for ApolloSRM — an integrated Student Information System (SIS) and CRM platform for colleges and career schools.

KNOWLEDGE BASE CONTEXT:
---
${context || "No specific context available. Answer based on general ApolloSRM knowledge."}
---

AVAILABLE SOURCES:
${sourceList || "None"}

RULES:
- Answer questions about ApolloSRM based on the context above.
- Be conversational, helpful, and concise (2-4 paragraphs max).
- Never invent features, pricing, or capabilities not mentioned in the context.
- When citing information, use numbered references like [1], [2] that match the source numbers above. Do NOT use markdown links like [Source 1](#) — just use plain [1] or [2].
- If you don't have enough info, say so honestly and suggest they contact the team.
- If the user expresses interest in a demo, pricing, or wants to be contacted, respond with their request acknowledged AND include this exact marker on its own line:
  [CONTACT_REQUEST]
  Then ask for their name, email, phone, institution, and any specific questions.
- When you have collected contact info from the user, include this marker with their details:
  [CONTACT_DATA]{"firstName":"...","lastName":"...","email":"...","phone":"...","institution":"...","message":"..."}[/CONTACT_DATA]
- Stay on topic: ApolloSRM, higher education, SIS/CRM, student management.
- For off-topic questions, politely redirect to ApolloSRM topics.`;

  return { prompt, sources };
}
