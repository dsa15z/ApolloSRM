import type { Metadata } from "next";
import {
  Shield,
  Lock,
  Eye,
  Server,
  FileCheck,
  Users,
  RefreshCw,
  Globe,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Security & Compliance — ApolloSRM",
  description:
    "Learn how ApolloSRM protects student data with enterprise-grade security, FERPA compliance, and industry-standard encryption.",
};

const securityFeatures = [
  {
    icon: Lock,
    title: "Encryption Everywhere",
    description:
      "PII encrypted at rest with AES-256 (SSE-KMS) and in transit with TLS 1.2+. KMS key rotation and strict key policies enforced. Secrets stored in AWS Secrets Manager — never in code or images.",
  },
  {
    icon: KeyRound,
    title: "Authentication & Access Control",
    description:
      "Federated SSO with MFA for admins — no long-lived access keys. Least-privilege IAM roles with application-level RBAC and full audit trails. Role-based permissions ensure users only see what they need.",
  },
  {
    icon: Eye,
    title: "Audit Logging",
    description:
      "Centralized logging with immutable S3 retention. 24x7 alerting with runbooks and on-call escalation. Comprehensive audit trails track every data access, modification, and admin action.",
  },
  {
    icon: Server,
    title: "Cloud-Native Infrastructure",
    description:
      "Multi-tenant SIS on AWS with prod/stage/dev isolated by account and VPC. Private subnets for app and data tiers with least-privilege Security Groups and NACLs. S3 Block Public Access enforced.",
  },
  {
    icon: RefreshCw,
    title: "Business Continuity",
    description:
      "Daily encrypted snapshots with RDS point-in-time recovery and Multi-AZ. Targets: RTO ≤ 4 hours, RPO ≤ 15 minutes. 30–90 day retention with vault lock.",
  },
  {
    icon: Globe,
    title: "Network & Application Security",
    description:
      "ALB/CloudFront at the edge with AWS WAF and Shield. HSTS enforced on all endpoints. Secure SDLC with code review, SAST/DAST, dependency and image scanning. OWASP Top 10 controls throughout.",
  },
];

const complianceItems = [
  {
    icon: FileCheck,
    title: "FERPA Compliant",
    description:
      "ApolloSRM is designed to support institutions in meeting FERPA obligations. We act as a school official with a legitimate educational interest and maintain strict policies around student education records.",
  },
  {
    icon: ShieldCheck,
    title: "SOC 2 Type II",
    description:
      "Our infrastructure and practices are audited annually against SOC 2 Trust Service Criteria for security, availability, and confidentiality.",
  },
  {
    icon: Users,
    title: "Data Processing Agreements",
    description:
      "We provide comprehensive DPAs that outline our responsibilities as a data processor, including data handling, breach notification procedures, and sub-processor management.",
  },
  {
    icon: Shield,
    title: "GDPR / CCPA / GLBA",
    description:
      "Privacy compliance via DPA/SCCs for GDPR and CCPA. Subprocessors disclosed. Payment cards handled only by PCI processor. GLBA-aligned safeguards for student financial information.",
  },
];

export default function SecurityPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          {/* Hero */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-apollo-500/10">
              <Shield className="h-8 w-8 text-apollo-400" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Security &{" "}
              <span className="gradient-text">Compliance</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-400">
              Protecting student data isn&apos;t just a feature — it&apos;s
              foundational to everything we build. ApolloSRM implements
              enterprise-grade security so your institution can focus on
              student success.
            </p>
          </div>

          {/* Security Features */}
          <div className="mt-24">
            <h2 className="text-center text-2xl font-bold sm:text-3xl">
              Security Architecture
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {securityFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-white/5 bg-white/[0.02] p-8"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-apollo-500/10">
                    <feature.icon className="h-6 w-6 text-apollo-400" />
                  </div>
                  <h3 className="text-lg font-bold">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance */}
          <div className="mt-24">
            <h2 className="text-center text-2xl font-bold sm:text-3xl">
              Compliance & Certifications
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {complianceItems.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-5 rounded-2xl border border-white/5 bg-white/[0.02] p-8"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                    <item.icon className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Data Handling Summary */}
          <div className="mt-24 rounded-2xl border border-white/5 bg-white/[0.02] p-10">
            <h2 className="text-2xl font-bold">Our Data Commitments</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Data Freedom Guarantee", value: "Your data is yours. Period. Export any time in clean formats. No ransom-by-process, no special fees, no hostage situations disguised as software." },
                { label: "No Lockouts. Ever.", value: "We don't punish customers for asking hard questions. We don't slow-walk exports. If ApolloSRM isn't the right fit, we help you transition like adults." },
                { label: "Incident Response", value: "Triage → containment → eradication → recovery → post-mortem. Customer notification without undue delay, within 72 hours if reportable." },
                { label: "Privacy & Compliance", value: "FERPA-ready, SOC 2-aligned. GDPR/CCPA via DPA/SCCs. Data minimization with tenant-level deletion on request or termination." },
              ].map((item) => (
                <div key={item.label}>
                  <h3 className="font-semibold text-apollo-400">
                    {item.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-400">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-24 text-center">
            <h2 className="text-2xl font-bold">Have Security Questions?</h2>
            <p className="mt-3 text-gray-400">
              Our team is happy to discuss our security practices, provide
              documentation, or complete your institution&apos;s security
              questionnaire.
            </p>
            <Link
              href="/#contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-apollo-500 px-8 py-3 text-sm font-semibold text-white transition hover:bg-apollo-400"
            >
              Contact Our Security Team
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
