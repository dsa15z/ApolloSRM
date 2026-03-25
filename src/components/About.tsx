"use client";

import { motion } from "framer-motion";
import { Users, Rocket, Award } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export default function About() {
  const { t } = useI18n();

  const stats = [
    {
      icon: Users,
      label: t.about.stat1Value,
      sub: t.about.stat1Label,
    },
    {
      icon: Rocket,
      label: t.about.stat2Value,
      sub: t.about.stat2Label,
    },
    {
      icon: Award,
      label: t.about.stat3Value,
      sub: t.about.stat3Label,
    },
    {
      icon: Rocket,
      label: t.about.stat4Value,
      sub: t.about.stat4Label,
    },
  ];

  return (
    <section id="about" className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900/30 to-navy-950" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-2 gap-6">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-center"
                >
                  <item.icon className="mx-auto mb-3 h-8 w-8 text-apollo-400" />
                  <p className="font-bold">{item.label}</p>
                  <p className="mt-1 text-sm text-gray-500">{item.sub}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-apollo-400">
              {t.about.label}
            </p>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              {t.about.title}{" "}
              <span className="gradient-text">{t.about.titleHighlight}</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-400">
              {t.about.description1}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-gray-400">
              {t.about.description2}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
