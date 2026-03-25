"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Target, Bell, BarChart3 } from "lucide-react";

const capabilities = [
  {
    icon: Target,
    title: "Predictive Retention",
    description: "Identify at-risk students before they disengage",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Automated notifications when intervention is needed",
  },
  {
    icon: BarChart3,
    title: "Outcome Analytics",
    description: "Real-time dashboards tracking student success metrics",
  },
];

export default function AISection() {
  return (
    <section className="relative overflow-hidden py-32">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900/50 to-navy-950" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-apollo-500/8 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-apollo-400">
              Apollo Intelligence
            </p>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              AI That Powers{" "}
              <span className="gradient-text">Your Mission</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-400">
              Our AI engine continuously analyzes student data to surface
              actionable insights. From enrollment predictions to retention
              risk scoring, Apollo Intelligence helps your team make
              data-driven decisions that improve outcomes.
            </p>

            <div className="mt-10 space-y-6">
              {capabilities.map((cap) => (
                <div key={cap.title} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-apollo-500/10">
                    <cap.icon className="h-5 w-5 text-apollo-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{cap.title}</h4>
                    <p className="mt-1 text-sm text-gray-400">
                      {cap.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <div className="glow-strong relative flex h-80 w-80 items-center justify-center rounded-full border border-apollo-500/20 bg-gradient-to-br from-navy-800 to-navy-950">
              <div className="absolute inset-4 rounded-full border border-apollo-500/10" />
              <div className="absolute inset-12 rounded-full border border-apollo-500/10" />
              <BrainCircuit className="h-20 w-20 text-apollo-400" />

              {/* Orbiting dots */}
              {[0, 120, 240].map((deg) => (
                <div
                  key={deg}
                  className="absolute h-full w-full"
                  style={{ transform: `rotate(${deg}deg)` }}
                >
                  <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-apollo-500 shadow-lg shadow-apollo-500/50" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
