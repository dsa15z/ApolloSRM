import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken, AUTH_COOKIE } from "@/lib/auth";
import { processDocument, deleteDocumentAndChunks } from "@/lib/rag/documentProcessor";
import { blogPosts } from "@/lib/blog-posts";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import en from "@/lib/i18n/en";

export const maxDuration = 60;

// Website content extracted from the i18n dictionary and component structure
function getWebsiteContent(): { id: string; title: string; content: string }[] {
  return [
    {
      id: "website-hero",
      title: "ApolloSRM Homepage - Hero",
      content: `ApolloSRM - ${en.hero.badge}
${en.hero.headline1} ${en.hero.headlineHighlight} ${en.hero.headline2}
${en.hero.description}
SIS + CRM Unified Platform. AI-Powered Predictive Analytics. 2 Days Data Migration.`,
    },
    {
      id: "website-features",
      title: "ApolloSRM Features Overview",
      content: `${en.features.label} - ${en.features.title1} ${en.features.titleHighlight}
${en.features.description}

Command Module (SIS Core): ${en.features.commandModuleDesc}
Features: ${en.features.subStudentRecords}, ${en.features.subEnrollmentMgmt}, ${en.features.subAttendanceTracking}, ${en.features.subGradeManagement}, ${en.features.subTermAcademic}, ${en.features.subDocumentMgmt}

Flight Dynamics (CRM): ${en.features.flightDynamicsDesc}
Features: ${en.features.subLeadCapture}, ${en.features.subCampaignAutomation}, ${en.features.subAdmissionsWorkflow}, ${en.features.subProspectTracking}, ${en.features.subChecklistMgmt}, ${en.features.subLeadSourceAnalytics}

Mission Compliance: ${en.features.missionComplianceDesc}
Features: ${en.features.subIPEDSReporting}, ${en.features.subFISAP}, ${en.features.sub9010Calc}, ${en.features.sub1098T}, ${en.features.subNCSARA}, ${en.features.subAuditTrail}

Financial Navigation: ${en.features.financialNavigationDesc}
Features: ${en.features.subTuitionBilling}, ${en.features.subFinancialAid}, ${en.features.subPaymentPlans}, ${en.features.subStudentLedger}, ${en.features.subISIR}, ${en.features.subStripeIntegration}

Apollo Intelligence (AI): ${en.features.apolloIntelligenceDesc}
Features: ${en.features.subPredictiveRetention}, ${en.features.subSmartAlerts}, ${en.features.subOutcomeAnalytics}, ${en.features.subPopulationReports}, ${en.features.subAdHocReports}, ${en.features.subSQLActions}

Mission Portal: ${en.features.missionPortalDesc}
Features: ${en.features.subAdminDashboard}, ${en.features.subStudentPortal}, ${en.features.subParentPortal}, ${en.features.subTeacherPortal}, ${en.features.subRolePermissions}, ${en.features.subMFA}

Academic Operations: ${en.features.academicOpsDesc}
Features: ${en.features.subProgramMgmt}, ${en.features.subCourseCatalog}, ${en.features.subCourseOfferings}, ${en.features.subGradeSetup}, ${en.features.subClockCreditHours}, ${en.features.subBackfillGrades}

Campus Operations: ${en.features.campusOpsDesc}
Features: ${en.features.subMultiCampus}, ${en.features.subEmployeeMgmt}, ${en.features.subRoomScheduling}, ${en.features.subNonWorkingDays}, ${en.features.subEventsMgmt}, ${en.features.subAnnouncementsInternal}

Workflow Engine: ${en.features.workflowEngineDesc}
Features: ${en.features.subCustomWorkflows}, ${en.features.subStatusSetup}, ${en.features.subChecklistCampaigns}, ${en.features.subBulkOperations}, ${en.features.subImportExport}, ${en.features.subSQLTriggers}

Communications Hub: ${en.features.communicationsDesc}
Features: ${en.features.subEmailCampaigns}, ${en.features.subSMSConfig}, ${en.features.subMessageTemplates}, ${en.features.subInternalMessaging}, ${en.features.subEmailBranding}, ${en.features.subAnnouncements}

Reporting & Analytics: ${en.features.reportingAnalyticsDesc}
Features: ${en.features.subCustomReports}, ${en.features.subReportTemplates}, ${en.features.subFilterBuilder}, ${en.features.subGroupReports}, ${en.features.subQueryTree}, ${en.features.subPageVisitAnalytics}

Integration Hub: ${en.features.integrationHubDesc}
Features: ${en.features.subCanvasLMS}, ${en.features.subGoogleClassroom}, ${en.features.subMoodle}, ${en.features.subLeadSquared}, ${en.features.subZohoSAP}, ${en.features.subOpenAPI}`,
    },
    {
      id: "website-why-choose",
      title: "Why Choose ApolloSRM",
      content: `${en.whyChooseUs.modernAI}: ${en.whyChooseUs.modernAIDesc}
${en.whyChooseUs.reliable}: ${en.whyChooseUs.reliableDesc}
${en.whyChooseUs.keepTools}: ${en.whyChooseUs.keepToolsDesc}
${en.whyChooseUs.affordable}: ${en.whyChooseUs.affordableDesc}`,
    },
    {
      id: "website-ai",
      title: "Apollo Intelligence - AI Features",
      content: `${en.ai.title} ${en.ai.titleHighlight}
${en.ai.description}
${en.ai.predictiveRetention}: ${en.ai.predictiveRetentionDesc}
${en.ai.smartAlerts}: ${en.ai.smartAlertsDesc}
${en.ai.outcomeAnalytics}: ${en.ai.outcomeAnalyticsDesc}`,
    },
    {
      id: "website-pricing",
      title: "ApolloSRM Pricing",
      content: `${en.pricing.title} ${en.pricing.titleHighlight}
${en.pricing.description}

Starter Plan: ${en.pricing.starterDesc}. ${en.pricing.starterPrice}. ${en.pricing.starterNote}.
Features: ${en.pricing.featureCommandModule}, ${en.pricing.featureFlightDynamics}, ${en.pricing.featureMissionPortal}, ${en.pricing.featureEmailSupport}, ${en.pricing.featureUpTo500}, ${en.pricing.featureStandardMigration}

Professional Plan: ${en.pricing.professionalDesc}. ${en.pricing.professionalPrice}. ${en.pricing.professionalNote}.
Features: ${en.pricing.featureEverythingStarter}, ${en.pricing.featureMissionCompliance}, ${en.pricing.featureFinancialNav}, ${en.pricing.featureAIBasic}, ${en.pricing.featurePrioritySupport}, ${en.pricing.featureUpTo2500}, ${en.pricing.featureExpeditedMigration}, ${en.pricing.featureAPI}

Enterprise Plan: ${en.pricing.enterpriseDesc}. ${en.pricing.enterprisePrice}. ${en.pricing.enterpriseNote}.
Features: ${en.pricing.featureEverythingPro}, ${en.pricing.featureAIFull}, ${en.pricing.featureMultiCampus}, ${en.pricing.featureCustomIntegrations}, ${en.pricing.featureDedicatedManager}, ${en.pricing.featureUnlimited}, ${en.pricing.featureWhiteGlove}, ${en.pricing.featureSLA}, ${en.pricing.featureOnPremise}`,
    },
    {
      id: "website-about",
      title: "About ApolloSRM",
      content: `${en.about.title} ${en.about.titleHighlight}
${en.about.description1}
${en.about.description2}
${en.about.stat1Value} ${en.about.stat1Label}. ${en.about.stat2Value} ${en.about.stat2Label}. ${en.about.stat3Value} ${en.about.stat3Label}. ${en.about.stat4Value} ${en.about.stat4Label}.`,
    },
    {
      id: "website-faq",
      title: "ApolloSRM FAQ",
      content: `${en.faq.q1}\n${en.faq.a1}\n\n${en.faq.q2}\n${en.faq.a2}\n\n${en.faq.q3}\n${en.faq.a3}\n\n${en.faq.q4}\n${en.faq.a4}\n\n${en.faq.q5}\n${en.faq.a5}\n\n${en.faq.q6}\n${en.faq.a6}\n\n${en.faq.q7}\n${en.faq.a7}\n\n${en.faq.q8}\n${en.faq.a8}`,
    },
    {
      id: "website-workflow",
      title: "ApolloSRM Workflow - Student Lifecycle",
      content: `${en.workflow.title} ${en.workflow.titleHighlight}
${en.workflow.description}
Step 1 - ${en.workflow.recruit}: ${en.workflow.recruitDesc}
Step 2 - ${en.workflow.enroll}: ${en.workflow.enrollDesc}
Step 3 - ${en.workflow.educate}: ${en.workflow.educateDesc}
Step 4 - ${en.workflow.graduate}: ${en.workflow.graduateDesc}`,
    },
    {
      id: "website-testimonials",
      title: "ApolloSRM Testimonials",
      content: `"${en.testimonials.quote1}" — ${en.testimonials.author1}
"${en.testimonials.quote2}" — ${en.testimonials.author2}
"${en.testimonials.quote3}" — ${en.testimonials.author3}`,
    },
  ];
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE)?.value;
  const payload = token ? await verifyToken(token) : null;
  if (!payload || payload.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {

  // Ensure pgvector extension exists
  try {
    await prisma.$queryRawUnsafe(`CREATE EXTENSION IF NOT EXISTS vector`);
  } catch (err) {
    console.error("pgvector extension error (may already exist):", err);
  }

  const results: { source: string; title: string; status: string; error?: string }[] = [];

  // 1. Index website content
  const websiteContent = getWebsiteContent();
  for (const page of websiteContent) {
    try {
      const existing = await prisma.document.findFirst({
        where: { source: "website", sourceId: page.id },
      });
      if (existing) {
        await deleteDocumentAndChunks(existing.id);
      }

      const doc = await prisma.document.create({
        data: {
          title: page.title,
          fileName: `${page.id}.txt`,
          fileType: "txt",
          source: "website",
          sourceId: page.id,
          uploadedBy: payload.sub,
        },
      });

      await processDocument(doc.id, page.content, "txt");
      results.push({ source: "website", title: page.title, status: "ready" });
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      results.push({ source: "website", title: page.title, status: "error", error: msg });
    }
  }

  // 2. Index blog posts
  for (const post of blogPosts) {
    try {
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

      const content = `# ${post.title}\n\n${post.excerpt}\n\n${post.content}`;
      await processDocument(doc.id, content, "txt");
      results.push({ source: "blog", title: post.title, status: "ready" });
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      results.push({ source: "blog", title: post.title, status: "error", error: msg });
    }
  }

  // 3. Index download PDFs
  const downloadPDFs = [
    { file: "ApolloSRM-Intro.pdf", title: "ApolloSRM Introduction" },
    { file: "ApolloSRM-All-in-One.pdf", title: "All-in-One Mission Control" },
    { file: "ApolloSRM-Mission-Support.pdf", title: "Mission Support & Data Freedom" },
    { file: "ApolloSRM-Data-Security.pdf", title: "Data Security Overview" },
    { file: "ApolloSRM-Mobile.pdf", title: "ApolloSRM Mobile" },
  ];

  for (const pdf of downloadPDFs) {
    try {
      const filePath = join(process.cwd(), "public", "downloads", pdf.file);
      if (!existsSync(filePath)) {
        results.push({ source: "download", title: pdf.title, status: "error", error: "File not found" });
        continue;
      }

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

      const buffer = readFileSync(filePath);
      await processDocument(doc.id, buffer, "pdf");
      results.push({ source: "download", title: pdf.title, status: "ready" });
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      results.push({ source: "download", title: pdf.title, status: "error", error: msg });
    }
  }

  const ready = results.filter((r) => r.status === "ready").length;
  const errors = results.filter((r) => r.status === "error").length;

  return NextResponse.json({ results, summary: { total: results.length, ready, errors } });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : undefined;
    console.error("Reindex fatal error:", msg, stack);
    return NextResponse.json({ error: msg, stack }, { status: 500 });
  }
}
