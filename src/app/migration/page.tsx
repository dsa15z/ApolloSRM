import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Database,
  FileCheck,
  Rocket,
  Shield,
  Zap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Data Migration — ApolloSRM",
  description:
    "Switch to ApolloSRM with zero downtime. Automated migration tools move years of student data in days, not months.",
};

const steps = [
  {
    step: "01",
    title: "Discovery & Planning",
    duration: "Day 1",
    description:
      "We analyze your current SIS data structure, identify custom fields, and create a detailed migration plan. No surprises.",
  },
  {
    step: "02",
    title: "Automated Mapping",
    duration: "Day 1-2",
    description:
      "Our migration engine maps your existing schema to ApolloSRM's data model. Pre-built connectors handle the most common SIS formats out of the box.",
  },
  {
    step: "03",
    title: "Validation & Testing",
    duration: "Day 2-3",
    description:
      "Automated validation checks run against every record. Detailed discrepancy reports are generated and reviewed before any data goes live.",
  },
  {
    step: "04",
    title: "Parallel Run",
    duration: "Day 3-5",
    description:
      "Both systems run simultaneously. Your team continues working in the old system while we validate everything in ApolloSRM. Zero disruption.",
  },
  {
    step: "05",
    title: "Cutover & Go Live",
    duration: "Day 5-7",
    description:
      "When you're ready, we flip the switch. Final delta sync captures any changes made during the parallel run. Seamless transition.",
  },
];

const fears = [
  {
    icon: Clock,
    fear: "It'll take months",
    reality:
      "Average migration completes in 2-7 days. Our fastest: 2 days for a full college dataset. Automated pipelines eliminate manual work.",
  },
  {
    icon: Database,
    fear: "We'll lose data",
    reality:
      "Every record is validated against checksums. Detailed audit reports confirm data integrity. Nothing moves to production until you approve.",
  },
  {
    icon: Shield,
    fear: "Downtime will disrupt operations",
    reality:
      "Zero-downtime cutover. Parallel systems run simultaneously during migration. Students and staff never skip a beat.",
  },
  {
    icon: FileCheck,
    fear: "Custom fields won't transfer",
    reality:
      "We map every custom field, workflow, and configuration. If your old system had it, ApolloSRM will have it — often better.",
  },
];

const migrationSources = [
  "CampusVue",
  "CAMS Enterprise",
  "Populi",
  "Jenzabar",
  "Ellucian Banner",
  "Ellucian Colleague",
  "Campus Café",
  "SONIS",
  "Custom / Legacy Systems",
];

export default function MigrationPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          {/* Hero */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-apollo-500/10">
              <Rocket className="h-8 w-8 text-apollo-400" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Switch to ApolloSRM{" "}
              <span className="gradient-text">Without the Pain</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-400">
              We&apos;ve migrated institutions with decades of data in as
              little as 2 days. Our automated tools and experienced team make
              switching effortless.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle className="h-5 w-5" />
                Zero downtime
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle className="h-5 w-5" />
                2-7 day average
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle className="h-5 w-5" />
                100% data integrity
              </div>
            </div>
          </div>

          {/* Addressing Fears */}
          <div className="mt-24">
            <h2 className="text-center text-2xl font-bold sm:text-3xl">
              We Know What Keeps You Up at Night
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {fears.map((item) => (
                <div
                  key={item.fear}
                  className="rounded-2xl border border-white/5 bg-white/[0.02] p-8"
                >
                  <item.icon className="mb-4 h-8 w-8 text-apollo-400" />
                  <p className="text-sm font-semibold uppercase tracking-wider text-red-400">
                    Fear: &ldquo;{item.fear}&rdquo;
                  </p>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-emerald-400">
                    Reality:
                  </p>
                  <p className="mt-1 leading-relaxed text-gray-300">
                    {item.reality}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Migration Timeline */}
          <div className="mt-24">
            <h2 className="text-center text-2xl font-bold sm:text-3xl">
              Your Migration Timeline
            </h2>
            <div className="mt-12 space-y-6">
              {steps.map((step, i) => (
                <div
                  key={step.step}
                  className="flex gap-6 rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-apollo-500/10 text-lg font-bold text-apollo-400">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-bold">{step.title}</h3>
                      <span className="rounded-full bg-apollo-500/10 px-3 py-0.5 text-xs font-medium text-apollo-300">
                        {step.duration}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-gray-400">
                      {step.description}
                    </p>
                  </div>
                  {i < steps.length - 1 && (
                    <ArrowRight className="hidden h-5 w-5 shrink-0 self-center text-apollo-500/30 sm:block" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Supported Sources */}
          <div className="mt-24 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">
              We Migrate From Any Platform
            </h2>
            <p className="mt-4 text-gray-400">
              Pre-built connectors for the most common SIS platforms, plus
              custom migration support for legacy systems.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {migrationSources.map((source) => (
                <span
                  key={source}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300"
                >
                  {source}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-24 rounded-2xl border border-apollo-500/20 bg-apollo-500/5 p-10 text-center">
            <Zap className="mx-auto h-8 w-8 text-apollo-400" />
            <h2 className="mt-4 text-2xl font-bold">
              Ready to Make the Switch?
            </h2>
            <p className="mt-3 text-gray-400">
              Book a demo and we&apos;ll show you exactly how we&apos;ll
              migrate your data — with a custom plan for your institution.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-full bg-apollo-500 px-8 py-3 text-sm font-semibold text-white transition hover:bg-apollo-400"
              >
                Book a Demo
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Talk to Our Migration Team
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
