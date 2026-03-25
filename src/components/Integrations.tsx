"use client";

import { motion } from "framer-motion";

// SVG icon representations of common integrations (abstract/generic)
const integrations = [
  { name: "QuickBooks", abbr: "QB" },
  { name: "Google Workspace", abbr: "GW" },
  { name: "Microsoft 365", abbr: "365" },
  { name: "Zoom", abbr: "ZM" },
  { name: "Canvas LMS", abbr: "CV" },
  { name: "Moodle", abbr: "MDL" },
  { name: "Stripe", abbr: "ST" },
  { name: "Salesforce", abbr: "SF" },
  { name: "Slack", abbr: "SL" },
  { name: "Twilio", abbr: "TW" },
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
              className="group flex h-20 w-28 flex-col items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] transition hover:border-apollo-500/20 hover:bg-white/[0.04]"
            >
              <span className="text-lg font-bold text-gray-400 transition group-hover:text-apollo-400">
                {tool.abbr}
              </span>
              <span className="mt-1 text-[10px] text-gray-600 transition group-hover:text-gray-400">
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
