"use client";

import { motion } from "framer-motion";
import {
  MonitorCog,
  Megaphone,
  ShieldCheck,
  Wallet,
  BrainCircuit,
  LayoutDashboard,
  GraduationCap,
  Users,
  CalendarCheck,
  FileText,
  BarChart3,
  Globe,
  type LucideIcon,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface FeatureCard {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  subFeatures: string[];
}

export default function Features() {
  const { t } = useI18n();

  const features: FeatureCard[] = [
    {
      icon: MonitorCog,
      title: t.features.commandModule,
      description: t.features.commandModuleDesc,
      color: "from-blue-500 to-cyan-400",
      subFeatures: [
        t.features.subStudentRecords,
        t.features.subEnrollmentMgmt,
        t.features.subAttendanceTracking,
        t.features.subGradeManagement,
        t.features.subTermAcademic,
        t.features.subDocumentMgmt,
      ],
    },
    {
      icon: Megaphone,
      title: t.features.flightDynamics,
      description: t.features.flightDynamicsDesc,
      color: "from-purple-500 to-pink-400",
      subFeatures: [
        t.features.subLeadCapture,
        t.features.subCampaignAutomation,
        t.features.subAdmissionsWorkflow,
        t.features.subProspectTracking,
        t.features.subChecklistMgmt,
        t.features.subLeadSourceAnalytics,
      ],
    },
    {
      icon: ShieldCheck,
      title: t.features.missionCompliance,
      description: t.features.missionComplianceDesc,
      color: "from-emerald-500 to-teal-400",
      subFeatures: [
        t.features.subIPEDSReporting,
        t.features.subFISAP,
        t.features.sub9010Calc,
        t.features.sub1098T,
        t.features.subNCSARA,
        t.features.subAuditTrail,
      ],
    },
    {
      icon: Wallet,
      title: t.features.financialNavigation,
      description: t.features.financialNavigationDesc,
      color: "from-amber-500 to-orange-400",
      subFeatures: [
        t.features.subTuitionBilling,
        t.features.subFinancialAid,
        t.features.subPaymentPlans,
        t.features.subStudentLedger,
        t.features.subISIR,
        t.features.subStripeIntegration,
      ],
    },
    {
      icon: BrainCircuit,
      title: t.features.apolloIntelligence,
      description: t.features.apolloIntelligenceDesc,
      color: "from-rose-500 to-red-400",
      subFeatures: [
        t.features.subPredictiveRetention,
        t.features.subSmartAlerts,
        t.features.subOutcomeAnalytics,
        t.features.subPopulationReports,
        t.features.subAdHocReports,
        t.features.subSQLActions,
      ],
    },
    {
      icon: LayoutDashboard,
      title: t.features.missionPortal,
      description: t.features.missionPortalDesc,
      color: "from-indigo-500 to-violet-400",
      subFeatures: [
        t.features.subAdminDashboard,
        t.features.subStudentPortal,
        t.features.subParentPortal,
        t.features.subTeacherPortal,
        t.features.subRolePermissions,
        t.features.subMFA,
      ],
    },
    {
      icon: GraduationCap,
      title: t.features.academicOps,
      description: t.features.academicOpsDesc,
      color: "from-sky-500 to-blue-400",
      subFeatures: [
        t.features.subProgramMgmt,
        t.features.subCourseCatalog,
        t.features.subCourseOfferings,
        t.features.subGradeSetup,
        t.features.subClockCreditHours,
        t.features.subBackfillGrades,
      ],
    },
    {
      icon: Users,
      title: t.features.campusOps,
      description: t.features.campusOpsDesc,
      color: "from-teal-500 to-emerald-400",
      subFeatures: [
        t.features.subMultiCampus,
        t.features.subEmployeeMgmt,
        t.features.subRoomScheduling,
        t.features.subNonWorkingDays,
        t.features.subEventsMgmt,
        t.features.subAnnouncementsInternal,
      ],
    },
    {
      icon: CalendarCheck,
      title: t.features.workflowEngine,
      description: t.features.workflowEngineDesc,
      color: "from-orange-500 to-yellow-400",
      subFeatures: [
        t.features.subCustomWorkflows,
        t.features.subStatusSetup,
        t.features.subChecklistCampaigns,
        t.features.subBulkOperations,
        t.features.subImportExport,
        t.features.subSQLTriggers,
      ],
    },
    {
      icon: FileText,
      title: t.features.communications,
      description: t.features.communicationsDesc,
      color: "from-pink-500 to-rose-400",
      subFeatures: [
        t.features.subEmailCampaigns,
        t.features.subSMSConfig,
        t.features.subMessageTemplates,
        t.features.subInternalMessaging,
        t.features.subEmailBranding,
        t.features.subAnnouncements,
      ],
    },
    {
      icon: BarChart3,
      title: t.features.reportingAnalytics,
      description: t.features.reportingAnalyticsDesc,
      color: "from-cyan-500 to-sky-400",
      subFeatures: [
        t.features.subCustomReports,
        t.features.subReportTemplates,
        t.features.subFilterBuilder,
        t.features.subGroupReports,
        t.features.subQueryTree,
        t.features.subPageVisitAnalytics,
      ],
    },
    {
      icon: Globe,
      title: t.features.integrationHub,
      description: t.features.integrationHubDesc,
      color: "from-violet-500 to-purple-400",
      subFeatures: [
        t.features.subCanvasLMS,
        t.features.subGoogleClassroom,
        t.features.subMoodle,
        t.features.subLeadSquared,
        t.features.subZohoSAP,
        t.features.subOpenAPI,
      ],
    },
  ];

  return (
    <section id="features" className="relative py-32">
      {/* Background accent */}
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-apollo-500/5 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-apollo-400">
            {t.features.label}
          </p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            {t.features.title1}{" "}
            <span className="gradient-text">{t.features.titleHighlight}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            {t.features.description}
          </p>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition-all hover:border-apollo-500/20 hover:bg-white/[0.04]"
            >
              {/* Icon */}
              <div
                className={`mb-5 inline-flex rounded-xl bg-gradient-to-br ${feature.color} p-3`}
              >
                <feature.icon className="h-6 w-6 text-white" />
              </div>

              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="mt-3 leading-relaxed text-gray-400">
                {feature.description}
              </p>

              {/* Sub-feature list */}
              <ul className="mt-4 space-y-1.5">
                {feature.subFeatures.map((sub) => (
                  <li
                    key={sub}
                    className="flex items-start gap-2 text-sm text-gray-500"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-apollo-400/60" />
                    {sub}
                  </li>
                ))}
              </ul>

              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-apollo-500/5 to-transparent" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
