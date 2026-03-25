"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What does SRM stand for?",
    a: "SRM stands for Student Relationship Manager. ApolloSRM combines a full Student Information System (SIS) with a CRM, giving you one unified platform for the entire student lifecycle — from recruitment through graduation.",
  },
  {
    q: "How long does implementation take?",
    a: "Most schools are up and running within 2–4 weeks, including data migration. We've completed full data migrations in as little as 2 days. Our automated migration tools and dedicated onboarding team make the process fast and painless.",
  },
  {
    q: "Can ApolloSRM handle regulatory compliance (FERPA, accreditation)?",
    a: "Absolutely. Mission Compliance is a core module that includes built-in tools for FERPA compliance, accreditation reporting, and regulatory audits. Stay audit-ready with automated compliance checks and real-time dashboards.",
  },
  {
    q: "Do I need to replace my existing tools?",
    a: "No. ApolloSRM integrates with the tools you already use — accounting software, LMS platforms, communication tools, and more. Our open API and pre-built connectors mean you can plug in without ripping anything out.",
  },
  {
    q: "How does Apollo Intelligence (AI) work?",
    a: "Apollo Intelligence analyzes student engagement signals — login frequency, assignment patterns, attendance, financial status, and more — to generate predictive risk scores. Advisors get automated alerts when students need intervention, often weeks before traditional methods would flag an issue.",
  },
  {
    q: "Is ApolloSRM suitable for multi-campus institutions?",
    a: "Yes. Our Enterprise plan includes full multi-campus support with centralized administration, campus-level permissions, and consolidated reporting across all locations.",
  },
  {
    q: "What kind of support do you offer?",
    a: "All plans include email support. Professional and Enterprise plans include priority support with faster response times. Enterprise customers get a dedicated success manager for ongoing strategic guidance.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. We use industry-standard encryption (TLS in transit, AES-256 at rest), role-based access controls, regular security audits, and infrastructure hosted on trusted cloud providers. We also support SSO and MFA for all accounts.",
  },
];

function FAQItem({ faq }: { faq: { q: string; a: string } }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/5">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
        aria-expanded={open}
      >
        <span className="pr-4 text-base font-semibold">{faq.q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-gray-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-5 leading-relaxed text-gray-400">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="relative py-32">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-apollo-400">
            FAQ
          </p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Frequently Asked{" "}
            <span className="gradient-text">Questions</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-16"
        >
          {faqs.map((faq) => (
            <FAQItem key={faq.q} faq={faq} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
