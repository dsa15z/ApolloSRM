"use client";

import { motion } from "framer-motion";
import {
  MonitorCog,
  Megaphone,
  ShieldCheck,
  Wallet,
  BrainCircuit,
  LayoutDashboard,
} from "lucide-react";

const features = [
  {
    icon: MonitorCog,
    title: "Command Module",
    description:
      "Comprehensive student record and enrollment management. Track every detail from admissions through graduation in one unified system.",
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: Megaphone,
    title: "Flight Dynamics",
    description:
      "Recruitment and admissions tracking with automated outreach. Convert leads to enrolled students with intelligent campaign workflows.",
    color: "from-purple-500 to-pink-400",
  },
  {
    icon: ShieldCheck,
    title: "Mission Compliance",
    description:
      "Built-in reporting and regulatory compliance tools. Stay audit-ready with automated compliance checks and real-time dashboards.",
    color: "from-emerald-500 to-teal-400",
  },
  {
    icon: Wallet,
    title: "Financial Navigation",
    description:
      "Tuition billing, financial aid management, and accounting integration. Simplify the financial lifecycle from enrollment to completion.",
    color: "from-amber-500 to-orange-400",
  },
  {
    icon: BrainCircuit,
    title: "Apollo Intelligence",
    description:
      "Predictive analytics that identify at-risk students before they fall behind. AI-driven insights to boost retention and outcomes.",
    color: "from-rose-500 to-red-400",
  },
  {
    icon: LayoutDashboard,
    title: "Mission Portal",
    description:
      "Self-service portals for students, faculty, and staff. Everyone gets a personalized dashboard with exactly what they need.",
    color: "from-indigo-500 to-violet-400",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Features() {
  return (
    <section id="features" className="relative py-32">
      {/* Background accent */}
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-apollo-500/5 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-apollo-400">
            Liftoff With Powerful Features
          </p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Everything You Need.{" "}
            <span className="gradient-text">One Platform.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            SRM = SIS + CRM. Apollo unifies student information management with
            relationship tracking into a single, AI-powered platform.
          </p>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition-all hover:border-apollo-500/20 hover:bg-white/[0.04]"
            >
              {/* Icon */}
              <div
                className={`mb-5 inline-flex rounded-xl bg-gradient-to-br ${feature.color} p-3`}
              >
                <feature.icon className="h-6 w-6 text-white" />
              </div>

              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="mt-3 leading-relaxed text-gray-400">
                {feature.description}
              </p>

              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-apollo-500/5 to-transparent" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
