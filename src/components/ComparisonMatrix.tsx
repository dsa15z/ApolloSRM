"use client";

import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

type Status = "yes" | "no" | "partial" | "addon";

interface ComparisonRow {
  feature: string;
  apollo: Status;
  diamond: Status;
  apolloNote?: string;
  diamondNote?: string;
}

interface ComparisonCategory {
  category: string;
  rows: ComparisonRow[];
}

function StatusIcon({ status, note }: { status: Status; note?: string }) {
  const label = note ? (
    <span className="ml-1 text-xs text-gray-500">{note}</span>
  ) : null;

  switch (status) {
    case "yes":
      return (
        <span className="inline-flex items-center">
          <Check className="h-5 w-5 text-emerald-400" aria-label="Included" />
          {label}
        </span>
      );
    case "no":
      return (
        <span className="inline-flex items-center">
          <X className="h-5 w-5 text-red-400/60" aria-label="Not available" />
          {label}
        </span>
      );
    case "partial":
      return (
        <span className="inline-flex items-center">
          <Minus className="h-5 w-5 text-yellow-400" aria-label="Partial" />
          {label}
        </span>
      );
    case "addon":
      return (
        <span className="inline-flex items-center">
          <span className="text-xs font-medium text-amber-400/80">Add-on</span>
          {label}
        </span>
      );
  }
}

export default function ComparisonMatrix() {
  const { t } = useI18n();

  const categories: ComparisonCategory[] = [
    {
      category: t.comparison.catCore,
      rows: [
        { feature: t.comparison.studentRecords, apollo: "yes", diamond: "yes" },
        { feature: t.comparison.enrollmentMgmt, apollo: "yes", diamond: "yes" },
        { feature: t.comparison.attendanceTracking, apollo: "yes", diamond: "yes" },
        { feature: t.comparison.gradeManagement, apollo: "yes", diamond: "yes" },
        { feature: t.comparison.documentMgmt, apollo: "yes", diamond: "yes" },
        { feature: t.comparison.multiCampus, apollo: "yes", diamond: "partial", diamondNote: t.comparison.noteLimited },
      ],
    },
    {
      category: t.comparison.catCRM,
      rows: [
        { feature: t.comparison.builtInCRM, apollo: "yes", apolloNote: t.comparison.noteNative, diamond: "addon", diamondNote: t.comparison.noteLeadSquared },
        { feature: t.comparison.leadCapture, apollo: "yes", diamond: "addon" },
        { feature: t.comparison.campaignAutomation, apollo: "yes", diamond: "addon" },
        { feature: t.comparison.prospectTracking, apollo: "yes", diamond: "partial" },
        { feature: t.comparison.leadSourceAnalytics, apollo: "yes", diamond: "partial" },
      ],
    },
    {
      category: t.comparison.catCompliance,
      rows: [
        { feature: t.comparison.ipedsReporting, apollo: "yes", diamond: "yes" },
        { feature: t.comparison.fisap, apollo: "yes", diamond: "partial" },
        { feature: t.comparison.calc9010, apollo: "yes", diamond: "partial" },
        { feature: t.comparison.tax1098T, apollo: "yes", diamond: "yes" },
        { feature: t.comparison.ncsara, apollo: "yes", diamond: "no" },
        { feature: t.comparison.auditTrail, apollo: "yes", diamond: "partial" },
      ],
    },
    {
      category: t.comparison.catFinance,
      rows: [
        { feature: t.comparison.tuitionBilling, apollo: "yes", diamond: "yes" },
        { feature: t.comparison.financialAidMgmt, apollo: "yes", diamond: "yes" },
        { feature: t.comparison.paymentProcessing, apollo: "yes", apolloNote: t.comparison.noteStripe, diamond: "addon", diamondNote: t.comparison.noteDiamondPay },
        { feature: t.comparison.studentLedger, apollo: "yes", diamond: "yes" },
        { feature: t.comparison.isirImport, apollo: "yes", diamond: "yes" },
        { feature: t.comparison.paymentPlans, apollo: "yes", diamond: "addon" },
      ],
    },
    {
      category: t.comparison.catAI,
      rows: [
        { feature: t.comparison.predictiveAnalytics, apollo: "yes", diamond: "no" },
        { feature: t.comparison.atRiskAlerts, apollo: "yes", diamond: "no" },
        { feature: t.comparison.retentionScoring, apollo: "yes", diamond: "no" },
        { feature: t.comparison.smartRecommendations, apollo: "yes", diamond: "no" },
      ],
    },
    {
      category: t.comparison.catPortals,
      rows: [
        { feature: t.comparison.adminDashboard, apollo: "yes", diamond: "yes" },
        { feature: t.comparison.studentPortal, apollo: "yes", diamond: "yes" },
        { feature: t.comparison.parentPortal, apollo: "yes", diamond: "no" },
        { feature: t.comparison.teacherPortal, apollo: "yes", diamond: "yes" },
        { feature: t.comparison.mobileAccess, apollo: "yes", diamond: "yes" },
        { feature: t.comparison.mfaSso, apollo: "yes", diamond: "partial" },
      ],
    },
    {
      category: t.comparison.catIntegrations,
      rows: [
        { feature: t.comparison.lmsIntegration, apollo: "yes", apolloNote: t.comparison.noteCanvasMoodle, diamond: "addon", diamondNote: t.comparison.noteDiamondLMS },
        { feature: t.comparison.openAPI, apollo: "yes", diamond: "yes" },
        { feature: t.comparison.zapierWebhooks, apollo: "yes", diamond: "no" },
        { feature: t.comparison.googleClassroom, apollo: "yes", diamond: "no" },
        { feature: t.comparison.accountingSoftware, apollo: "yes", diamond: "yes" },
      ],
    },
    {
      category: t.comparison.catExperience,
      rows: [
        { feature: t.comparison.modernUI, apollo: "yes", diamond: "partial", diamondNote: t.comparison.noteLegacyUI },
        { feature: t.comparison.bilingualSupport, apollo: "yes", apolloNote: t.comparison.noteEnEs, diamond: "no" },
        { feature: t.comparison.dataMigration, apollo: "yes", apolloNote: t.comparison.note2Days, diamond: "partial", diamondNote: t.comparison.noteWeeks },
        { feature: t.comparison.aiPowered, apollo: "yes", diamond: "no" },
        { feature: t.comparison.customWorkflows, apollo: "yes", diamond: "partial" },
        { feature: t.comparison.placementServices, apollo: "yes", diamond: "yes", diamondNote: t.comparison.noteJobWise },
      ],
    },
  ];

  return (
    <section id="comparison" className="relative py-32">
      {/* Background accents */}
      <div className="pointer-events-none absolute left-0 top-1/4 h-[400px] w-[400px] rounded-full bg-apollo-500/5 blur-[150px]" />
      <div className="pointer-events-none absolute right-0 bottom-1/4 h-[400px] w-[400px] rounded-full bg-emerald-500/5 blur-[150px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-apollo-400">
            {t.comparison.label}
          </p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            {t.comparison.title}{" "}
            <span className="gradient-text">{t.comparison.titleHighlight}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            {t.comparison.description}
          </p>
        </motion.div>

        {/* Matrix table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
        >
          {/* Table header */}
          <div className="grid grid-cols-[1fr_120px_120px] items-center border-b border-white/10 bg-white/[0.03] px-6 py-4 sm:grid-cols-[1fr_160px_160px]">
            <span className="text-sm font-medium text-gray-400">
              {t.comparison.featureLabel}
            </span>
            <span className="text-center text-sm font-bold text-apollo-400">
              ApolloSRM
            </span>
            <span className="text-center text-sm font-medium text-gray-400">
              Diamond SIS
            </span>
          </div>

          {/* Categories */}
          {categories.map((cat) => (
            <div key={cat.category}>
              {/* Category header */}
              <div className="border-b border-white/5 bg-white/[0.04] px-6 py-3">
                <span className="text-sm font-semibold uppercase tracking-wider text-apollo-300/80">
                  {cat.category}
                </span>
              </div>

              {/* Feature rows */}
              {cat.rows.map((row, idx) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-[1fr_120px_120px] items-center px-6 py-3 sm:grid-cols-[1fr_160px_160px] ${
                    idx < cat.rows.length - 1
                      ? "border-b border-white/[0.03]"
                      : "border-b border-white/5"
                  } transition-colors hover:bg-white/[0.02]`}
                >
                  <span className="text-sm text-gray-300">{row.feature}</span>
                  <span className="flex justify-center">
                    <StatusIcon status={row.apollo} note={row.apolloNote} />
                  </span>
                  <span className="flex justify-center">
                    <StatusIcon status={row.diamond} note={row.diamondNote} />
                  </span>
                </div>
              ))}
            </div>
          ))}

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-6 border-t border-white/10 bg-white/[0.03] px-6 py-4">
            <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
              <Check className="h-4 w-4 text-emerald-400" />{" "}
              {t.comparison.legendIncluded}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
              <Minus className="h-4 w-4 text-yellow-400" />{" "}
              {t.comparison.legendPartial}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
              <X className="h-4 w-4 text-red-400/60" />{" "}
              {t.comparison.legendNotAvailable}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
              <span className="text-xs font-medium text-amber-400/80">
                Add-on
              </span>{" "}
              {t.comparison.legendAddon}
            </span>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <p className="mt-6 text-center text-xs text-gray-600">
          {t.comparison.disclaimer}
        </p>
      </div>
    </section>
  );
}
