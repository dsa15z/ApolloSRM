"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Puzzle, TrendingUp } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export default function WhyChooseUs() {
  const { t } = useI18n();

  const reasons = [
    {
      icon: Zap,
      title: t.whyChooseUs.modernAI,
      description: t.whyChooseUs.modernAIDesc,
    },
    {
      icon: Shield,
      title: t.whyChooseUs.reliable,
      description: t.whyChooseUs.reliableDesc,
    },
    {
      icon: Puzzle,
      title: t.whyChooseUs.keepTools,
      description: t.whyChooseUs.keepToolsDesc,
    },
    {
      icon: TrendingUp,
      title: t.whyChooseUs.affordable,
      description: t.whyChooseUs.affordableDesc,
    },
  ];
  return (
    <section className="relative py-32">
      <div className="pointer-events-none absolute left-0 bottom-0 h-[400px] w-[400px] rounded-full bg-purple-500/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-apollo-400">
            {t.whyChooseUs.label}
          </p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            {t.whyChooseUs.title}{" "}
            <span className="gradient-text">{t.whyChooseUs.titleHighlight}</span>
          </h2>
        </motion.div>

        <div className="mt-20 grid gap-12 lg:grid-cols-2">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-5"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-apollo-500/20 bg-apollo-500/10">
                <reason.icon className="h-6 w-6 text-apollo-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{reason.title}</h3>
                <p className="mt-2 leading-relaxed text-gray-400">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
