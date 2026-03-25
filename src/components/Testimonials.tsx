"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export default function Testimonials() {
  const { t } = useI18n();

  const testimonials = [
    {
      quote: t.testimonials.quote1,
      author: t.testimonials.author1,
      date: t.testimonials.date1,
    },
    {
      quote: t.testimonials.quote2,
      author: t.testimonials.author2,
      date: t.testimonials.date2,
    },
    {
      quote: t.testimonials.quote3,
      author: t.testimonials.author3,
      date: t.testimonials.date3,
    },
  ];

  return (
    <section id="testimonials" className="relative py-32">
      <div className="pointer-events-none absolute right-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-apollo-500/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-apollo-400">
            {t.testimonials.label}
          </p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            {t.testimonials.title}{" "}
            <span className="gradient-text">{t.testimonials.titleHighlight}</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative rounded-2xl border border-white/5 bg-white/[0.02] p-8"
            >
              <Quote className="mb-4 h-8 w-8 text-apollo-500/30" />
              <p className="text-lg leading-relaxed text-gray-300">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="mt-6 border-t border-white/5 pt-4">
                <p className="font-semibold">{item.author}</p>
                <p className="text-sm text-gray-500">{item.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
