"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const integrations = [
  { name: "Canvas LMS", logo: "/logos/canvas.svg" },
  { name: "DJA", logo: "/logos/dja.svg" },
  { name: "DocuSign", logo: "/logos/docusign.svg" },
  { name: "Gmail", logo: "/logos/gmail.svg" },
  { name: "Google Classroom", logo: "/logos/google-classroom.svg" },
  { name: "Google Workspace", logo: "/logos/google-workspace.svg" },
  { name: "LeadSquared", logo: "/logos/leadsquared.svg" },
  { name: "Microsoft 365", logo: "/logos/microsoft-365.svg" },
  { name: "Moodle", logo: "/logos/moodle.svg" },
  { name: "QuickBooks", logo: "/logos/quickbooks.svg" },
  { name: "Salesforce", logo: "/logos/salesforce.svg" },
  { name: "Slack", logo: "/logos/slack.svg" },
  { name: "Stripe", logo: "/logos/stripe.svg" },
  { name: "Twilio", logo: "/logos/twilio.svg" },
  { name: "Zapier", logo: "/logos/zapier.svg" },
  { name: "Zoom", logo: "/logos/zoom.svg" },
];

export default function Integrations() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-apollo-400">
            Keep Your Tools, We&apos;ll Handle the Launch
          </p>
          <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
            Integrates With the Tools You Already Use
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6"
        >
          {integrations.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="group flex h-24 w-32 flex-col items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] transition hover:border-apollo-500/20 hover:bg-white/[0.04]"
            >
              <Image
                src={tool.logo}
                alt={`${tool.name} logo`}
                width={36}
                height={36}
                className="opacity-70 transition group-hover:opacity-100"
              />
              <span className="text-[11px] font-medium text-gray-500 transition group-hover:text-gray-300">
                {tool.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-8 text-center text-sm text-gray-500">
          ...and many more via our open REST API and webhook system.
        </p>
      </div>
    </section>
  );
}
