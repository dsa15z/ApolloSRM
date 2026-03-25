"use client";

import { motion } from "framer-motion";
import { Workflow as WorkflowIcon, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Recruit",
    description: "Capture leads and automate outreach campaigns",
  },
  {
    step: "02",
    title: "Enroll",
    description: "Streamline admissions with digital applications",
  },
  {
    step: "03",
    title: "Educate",
    description: "Track attendance, grades, and academic progress",
  },
  {
    step: "04",
    title: "Graduate",
    description: "Ensure compliance and celebrate student success",
  },
];

export default function Workflow() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-apollo-400">
            How It Works
          </p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Workflow: The Fuel Behind{" "}
            <span className="gradient-text">ApolloSRM</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            From first contact to graduation, ApolloSRM automates and
            streamlines the entire student lifecycle.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-apollo-500/10 text-lg font-bold text-apollo-400">
                {s.step}
              </div>
              <h3 className="text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{s.description}</p>

              {/* Arrow connector (hidden on last item and mobile) */}
              {i < steps.length - 1 && (
                <div className="pointer-events-none absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                  <ArrowRight className="h-6 w-6 text-apollo-500/30" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
