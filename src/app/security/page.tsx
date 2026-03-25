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
      "All data is encrypted in transit with TLS 1.3 and at rest with AES-256 encryption. Database backups are encrypted and stored in geographically redundant locations.",
  },
  {
    icon: KeyRound,
    title: "Authentication & Access Control",
    description:
      "Multi-factor authentication (MFA) for all accounts. Role-based access control (RBAC) ensures users only see what they need. SSO integration via SAML 2.0 and OpenID Connect.",
  },
  {
    icon: Eye,
    title: "Audit Logging",
    description:
      "Comprehensive audit trails track every data access, modification, and administrative action. Logs are immutable and retained for 7 years to support compliance requirements.",
  },
  {
    icon: Server,
    title: "Infrastructure Security",
    description:
      "Hosted on SOC 2 Type II certified cloud infrastructure with automated patching, intrusion detection, DDoS protection, and 24/7 monitoring.",
  },
  {
    icon: RefreshCw,
    title: "Business Continuity",
    description:
      "99.9% uptime SLA. Automated daily backups with point-in-time recovery. Disaster recovery plan with RTO < 4 hours and RPO < 1 hour.",
  },
  {
    icon: Globe,
    title: "Network Security",
    description:
      "Web Application Firewall (WAF), rate limiting, and IP allowlisting. All API endpoints are authenticated and rate-limited. Regular penetration testing by third-party firms.",
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
    title: "GLBA Safeguards",
    description:
      "For institutions handling financial aid data, ApolloSRM implements controls aligned with the Gramm-Leach-Bliley Act safeguards rule to protect student financial information.",
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
                { label: "Data Ownership", value: "Your data is yours — always. We never sell, share, or use student data for advertising." },
                { label: "Data Portability", value: "Export all your data at any time in standard formats. No vendor lock-in." },
                { label: "Breach Response", value: "72-hour breach notification. Dedicated incident response team with documented runbooks." },
                { label: "Data Deletion", value: "Full data purge upon contract termination. Certified deletion within 30 days." },
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
