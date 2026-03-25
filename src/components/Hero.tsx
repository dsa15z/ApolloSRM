"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0">
        {/* Radial gradient */}
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-apollo-500/10 blur-[120px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Stars */}
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="animate-twinkle absolute h-px w-px rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-apollo-500/30 bg-apollo-500/10 px-4 py-1.5 text-sm text-apollo-300">
            <Sparkles className="h-4 w-4" />
            {t.hero.badge}
          </div>

          {/* Headline */}
          <h1 className="mx-auto max-w-4xl text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            {t.hero.headline1}{" "}
            <span className="gradient-text">{t.hero.headlineHighlight}</span>
            <br />
            <span className="mt-2 block text-4xl font-bold text-gray-300 sm:text-5xl lg:text-6xl">
              {t.hero.headline2}
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl">
            {t.hero.description}
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#contact"
              className="glow group inline-flex items-center gap-2 rounded-full bg-apollo-500 px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-apollo-400 hover:shadow-xl hover:shadow-apollo-500/25"
            >
              {t.hero.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
            >
              {t.hero.explore}
            </a>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-20 grid max-w-3xl grid-cols-3 gap-8 rounded-2xl border border-white/5 bg-white/[0.02] px-8 py-6 backdrop-blur-sm"
        >
          {[
            { value: t.hero.statValue1, label: t.hero.statLabel1 },
            { value: t.hero.statValue2, label: t.hero.statLabel2 },
            { value: t.hero.statValue3, label: t.hero.statLabel3 },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-xl font-bold text-apollo-400 sm:text-2xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-gray-500 sm:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
