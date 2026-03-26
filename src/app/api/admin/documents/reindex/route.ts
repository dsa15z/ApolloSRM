import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken, AUTH_COOKIE } from "@/lib/auth";
import { processDocument, deleteDocumentAndChunks } from "@/lib/rag/documentProcessor";
import { blogPosts } from "@/lib/blog-posts";
import en from "@/lib/i18n/en";

export const maxDuration = 60;

function getWebsiteContent(): { id: string; title: string; content: string }[] {
  return [
    {
      id: "website-hero",
      title: "ApolloSRM Homepage",
      content: `ApolloSRM - ${en.hero.badge}\n${en.hero.headline1} ${en.hero.headlineHighlight} ${en.hero.headline2}\n${en.hero.description}`,
    },
    {
      id: "website-features",
      title: "ApolloSRM Features",
      content: `${en.features.description}\n\nCommand Module: ${en.features.commandModuleDesc}\nFlight Dynamics CRM: ${en.features.flightDynamicsDesc}\nMission Compliance: ${en.features.missionComplianceDesc}\nFinancial Navigation: ${en.features.financialNavigationDesc}\nApollo Intelligence AI: ${en.features.apolloIntelligenceDesc}\nMission Portal: ${en.features.missionPortalDesc}\nAcademic Operations: ${en.features.academicOpsDesc}\nCampus Operations: ${en.features.campusOpsDesc}\nWorkflow Engine: ${en.features.workflowEngineDesc}\nCommunications Hub: ${en.features.communicationsDesc}\nReporting Analytics: ${en.features.reportingAnalyticsDesc}\nIntegration Hub: ${en.features.integrationHubDesc}`,
    },
    {
      id: "website-pricing",
      title: "ApolloSRM Pricing",
      content: `${en.pricing.description}\n\nStarter: ${en.pricing.starterDesc}. ${en.pricing.starterPrice}.\nProfessional: ${en.pricing.professionalDesc}. ${en.pricing.professionalPrice}.\nEnterprise: ${en.pricing.enterpriseDesc}. ${en.pricing.enterprisePrice}.`,
    },
    {
      id: "website-about",
      title: "About ApolloSRM",
      content: `${en.about.description1}\n${en.about.description2}`,
    },
    {
      id: "website-faq",
      title: "ApolloSRM FAQ",
      content: `${en.faq.q1}\n${en.faq.a1}\n\n${en.faq.q2}\n${en.faq.a2}\n\n${en.faq.q3}\n${en.faq.a3}\n\n${en.faq.q4}\n${en.faq.a4}\n\n${en.faq.q5}\n${en.faq.a5}\n\n${en.faq.q6}\n${en.faq.a6}\n\n${en.faq.q7}\n${en.faq.a7}\n\n${en.faq.q8}\n${en.faq.a8}`,
    },
    {
      id: "website-ai",
      title: "Apollo Intelligence AI",
      content: `${en.ai.description}\n${en.ai.predictiveRetention}: ${en.ai.predictiveRetentionDesc}\n${en.ai.smartAlerts}: ${en.ai.smartAlertsDesc}\n${en.ai.outcomeAnalytics}: ${en.ai.outcomeAnalyticsDesc}`,
    },
    {
      id: "website-why",
      title: "Why Choose ApolloSRM",
      content: `${en.whyChooseUs.modernAI}: ${en.whyChooseUs.modernAIDesc}\n${en.whyChooseUs.reliable}: ${en.whyChooseUs.reliableDesc}\n${en.whyChooseUs.keepTools}: ${en.whyChooseUs.keepToolsDesc}\n${en.whyChooseUs.affordable}: ${en.whyChooseUs.affordableDesc}`,
    },
  ];
}

async function indexTextContent(
  id: string, title: string, content: string, source: string, userId: string,
  results: { source: string; title: string; status: string; error?: string }[]
) {
  try {
    const existing = await prisma.document.findFirst({ where: { source, sourceId: id } });
    if (existing) await deleteDocumentAndChunks(existing.id);
    const doc = await prisma.document.create({
      data: { title, fileName: `${id}.txt`, fileType: "txt", source, sourceId: id, uploadedBy: userId },
    });
    await processDocument(doc.id, content, "txt");
    results.push({ source, title, status: "ready" });
  } catch (error) {
    results.push({ source, title, status: "error", error: error instanceof Error ? error.message : String(error) });
  }
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE)?.value;
  const payload = token ? await verifyToken(token) : null;
  if (!payload || payload.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    try { await prisma.$queryRawUnsafe(`CREATE EXTENSION IF NOT EXISTS vector`); } catch {}

    const results: { source: string; title: string; status: string; error?: string }[] = [];

    // 1. Website content
    for (const page of getWebsiteContent()) {
      await indexTextContent(page.id, page.title, page.content, "website", payload.sub, results);
    }

    // 2. Blog posts
    for (const post of blogPosts) {
      const content = `# ${post.title}\n\n${post.excerpt}\n\n${post.content}`;
      await indexTextContent(post.slug, post.title, content, "blog", payload.sub, results);
    }

    // 3. Download PDFs — fetch via HTTP (no filesystem access on Vercel)
    const baseUrl = request.nextUrl.origin;
    const pdfs = [
      { file: "ApolloSRM-Intro.pdf", title: "ApolloSRM Introduction" },
      { file: "ApolloSRM-All-in-One.pdf", title: "All-in-One Mission Control" },
      { file: "ApolloSRM-Mission-Support.pdf", title: "Mission Support & Data Freedom" },
      { file: "ApolloSRM-Data-Security.pdf", title: "Data Security Overview" },
      { file: "ApolloSRM-Mobile.pdf", title: "ApolloSRM Mobile" },
    ];

    for (const pdf of pdfs) {
      try {
        const existing = await prisma.document.findFirst({ where: { source: "download", sourceId: pdf.file } });
        if (existing) await deleteDocumentAndChunks(existing.id);

        const pdfResponse = await fetch(`${baseUrl}/downloads/${pdf.file}`);
        if (!pdfResponse.ok) {
          results.push({ source: "download", title: pdf.title, status: "error", error: `Fetch failed: ${pdfResponse.status}` });
          continue;
        }
        const buffer = Buffer.from(await pdfResponse.arrayBuffer());

        const doc = await prisma.document.create({
          data: { title: pdf.title, fileName: pdf.file, fileType: "pdf", source: "download", sourceId: pdf.file, uploadedBy: payload.sub },
        });
        await processDocument(doc.id, buffer, "pdf");
        results.push({ source: "download", title: pdf.title, status: "ready" });
      } catch (error) {
        results.push({ source: "download", title: pdf.title, status: "error", error: error instanceof Error ? error.message : String(error) });
      }
    }

    const ready = results.filter((r) => r.status === "ready").length;
    const errors = results.filter((r) => r.status === "error").length;
    return NextResponse.json({ results, summary: { total: results.length, ready, errors } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
