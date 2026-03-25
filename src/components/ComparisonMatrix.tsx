"use client";

import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

type Status = "yes" | "no" | "partial" | "addon";

interface CompetitorCell {
  status: Status;
  note?: string;
}

interface ComparisonRow {
  feature: string;
  competitors: CompetitorCell[];
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

  const competitorNames = [
    { name: "ApolloSRM", highlight: true },
    { name: "Diamond SIS", highlight: false },
    { name: "Orbund", highlight: false },
    { name: "Portico", highlight: false },
    { name: "StudentFirst", highlight: false },
  ];

  // Helper: [apollo, diamond, orbund, portico, studentFirst]
  const r = (
    feature: string,
    cells: [CompetitorCell, CompetitorCell, CompetitorCell, CompetitorCell, CompetitorCell]
  ): ComparisonRow => ({ feature, competitors: cells });
  const y = (note?: string): CompetitorCell => ({ status: "yes", note });
  const n = (note?: string): CompetitorCell => ({ status: "no", note });
  const p = (note?: string): CompetitorCell => ({ status: "partial", note });
  const a = (note?: string): CompetitorCell => ({ status: "addon", note });

  const categories: ComparisonCategory[] = [
    {
      category: t.comparison.catCore,
      rows: [
        r(t.comparison.studentRecords, [y(), y(), y(), y(), y()]),
        r(t.comparison.enrollmentMgmt, [y(), y(), y(), y(), y()]),
        r(t.comparison.attendanceTracking, [y(), y(), y(), y(), y()]),
        r(t.comparison.gradeManagement, [y(), y(), y(), y(), y()]),
        r(t.comparison.documentMgmt, [y(), y(), y(), y(), y()]),
        r(t.comparison.multiCampus, [y(), p(t.comparison.noteLimited), y(), y(), y(t.comparison.noteMultiInstitution)]),
      ],
    },
    {
      category: t.comparison.catCRM,
      rows: [
        r(t.comparison.builtInCRM, [y(t.comparison.noteNative), a(t.comparison.noteLeadSquared), y(), y(), y(t.comparison.noteBasicCRM)]),
        r(t.comparison.leadCapture, [y(), a(), y(), y(), p()]),
        r(t.comparison.campaignAutomation, [y(), a(), p(), y(), n()]),
        r(t.comparison.prospectTracking, [y(), p(), y(), y(), p()]),
        r(t.comparison.leadSourceAnalytics, [y(), p(), p(), y(), n()]),
      ],
    },
    {
      category: t.comparison.catCompliance,
      rows: [
        r(t.comparison.ipedsReporting, [y(), y(), y(), p(), p()]),
        r(t.comparison.fisap, [y(), p(), n(), p(), p()]),
        r(t.comparison.calc9010, [y(), p(), y(), p(), n()]),
        r(t.comparison.tax1098T, [y(), y(), y(), n(), p()]),
        r(t.comparison.ncsara, [y(), n(), n(), n(), n()]),
        r(t.comparison.auditTrail, [y(), p(), p(), p(), y()]),
      ],
    },
    {
      category: t.comparison.catFinance,
      rows: [
        r(t.comparison.tuitionBilling, [y(), y(), y(), y(), y()]),
        r(t.comparison.financialAidMgmt, [y(), y(), a(t.comparison.noteCampusIvy), y(), y()]),
        r(t.comparison.paymentProcessing, [y(t.comparison.noteStripe), a(t.comparison.noteDiamondPay), y(t.comparison.noteAuthorizeNet), y(), a(t.comparison.notePaymentus)]),
        r(t.comparison.studentLedger, [y(), y(), y(), y(), y()]),
        r(t.comparison.isirImport, [y(), y(), n(), y(), y()]),
        r(t.comparison.paymentPlans, [y(), a(), y(), y(), a(t.comparison.noteTuitionOptions)]),
      ],
    },
    {
      category: t.comparison.catAI,
      rows: [
        r(t.comparison.predictiveAnalytics, [y(), n(), n(), n(), n()]),
        r(t.comparison.atRiskAlerts, [y(), n(), n(), y(t.comparison.noteRuleBased), n()]),
        r(t.comparison.retentionScoring, [y(), n(), n(), y(t.comparison.noteRuleBased), n()]),
        r(t.comparison.smartRecommendations, [y(), n(), n(), p(), n()]),
      ],
    },
    {
      category: t.comparison.catPortals,
      rows: [
        r(t.comparison.adminDashboard, [y(), y(), y(), y(), y()]),
        r(t.comparison.studentPortal, [y(), y(), y(), y(), y()]),
        r(t.comparison.parentPortal, [y(), n(), p(), n(), n()]),
        r(t.comparison.teacherPortal, [y(), y(), y(), y(), p()]),
        r(t.comparison.mobileAccess, [y(), y(), y(), y(t.comparison.noteNativeApp), y(t.comparison.noteMobileFirst)]),
        r(t.comparison.mfaSso, [y(), p(), p(t.comparison.noteSSO), n(), p(t.comparison.noteViaMicrosoft)]),
      ],
    },
    {
      category: t.comparison.catIntegrations,
      rows: [
        r(t.comparison.lmsIntegration, [y(t.comparison.noteCanvasMoodle), a(t.comparison.noteDiamondLMS), y(t.comparison.noteMoodlePlus), y(t.comparison.noteCanvasMoodle), y(t.comparison.noteGenericLMS)]),
        r(t.comparison.openAPI, [y(), y(), y(), y(), y(t.comparison.noteAPIFirst)]),
        r(t.comparison.zapierWebhooks, [y(), n(), n(), n(), n()]),
        r(t.comparison.googleClassroom, [y(), n(), n(), n(), n()]),
        r(t.comparison.accountingSoftware, [y(), y(), y(t.comparison.noteQuickBooks), n(), y(t.comparison.noteBlackbaud)]),
      ],
    },
    {
      category: t.comparison.catExperience,
      rows: [
        r(t.comparison.modernUI, [y(), p(t.comparison.noteLegacyUI), n(t.comparison.noteLegacyUI), p(), y(t.comparison.noteCloudNative)]),
        r(t.comparison.bilingualSupport, [y(t.comparison.noteEnEs), n(), y(), n(), y(t.comparison.noteMultiLang)]),
        r(t.comparison.dataMigration, [y(t.comparison.note2Days), p(t.comparison.noteWeeks), p(), y(), y(t.comparison.noteMonths)]),
        r(t.comparison.aiPowered, [y(), n(), n(), n(), n()]),
        r(t.comparison.customWorkflows, [y(), p(), y(), y(), y()]),
        r(t.comparison.placementServices, [y(), y(t.comparison.noteJobWise), y(), y(), y()]),
      ],
    },
  ];

  const gridCols = `grid-cols-[1fr_repeat(5,90px)] sm:grid-cols-[1fr_repeat(5,120px)]`;

  return (
    <section id="comparison" className="relative py-32">
      {/* Background accents */}
      <div className="pointer-events-none absolute left-0 top-1/4 h-[400px] w-[400px] rounded-full bg-apollo-500/5 blur-[150px]" />
      <div className="pointer-events-none absolute right-0 bottom-1/4 h-[400px] w-[400px] rounded-full bg-emerald-500/5 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">
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
          className="mt-16 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02]"
        >
          {/* Table header */}
          <div
            className={`grid min-w-[700px] ${gridCols} items-center border-b border-white/10 bg-white/[0.03] px-6 py-4`}
          >
            <span className="text-sm font-medium text-gray-400">
              {t.comparison.featureLabel}
            </span>
            {competitorNames.map((c) => (
              <span
                key={c.name}
                className={`text-center text-sm font-${c.highlight ? "bold" : "medium"} ${
                  c.highlight ? "text-apollo-400" : "text-gray-400"
                }`}
              >
                {c.name}
              </span>
            ))}
          </div>

          {/* Categories */}
          {categories.map((cat) => (
            <div key={cat.category}>
              {/* Category header */}
              <div className="min-w-[700px] border-b border-white/5 bg-white/[0.04] px-6 py-3">
                <span className="text-sm font-semibold uppercase tracking-wider text-apollo-300/80">
                  {cat.category}
                </span>
              </div>

              {/* Feature rows */}
              {cat.rows.map((row, idx) => (
                <div
                  key={row.feature}
                  className={`grid min-w-[700px] ${gridCols} items-center px-6 py-3 ${
                    idx < cat.rows.length - 1
                      ? "border-b border-white/[0.03]"
                      : "border-b border-white/5"
                  } transition-colors hover:bg-white/[0.02]`}
                >
                  <span className="text-sm text-gray-300">{row.feature}</span>
                  {row.competitors.map((cell, ci) => (
                    <span key={ci} className="flex justify-center">
                      <StatusIcon status={cell.status} note={cell.note} />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          ))}

          {/* Legend */}
          <div className="flex min-w-[700px] flex-wrap items-center gap-6 border-t border-white/10 bg-white/[0.03] px-6 py-4">
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
