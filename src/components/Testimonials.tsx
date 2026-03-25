"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Apollo Student Relationship Manager is exactly what the market needs. Easy to use and powerful at a price we can afford.",
    author: "Career School Executive",
    date: "March 2025",
  },
  {
    quote:
      "I am amazed how fast you are moving, you are already much better than our current software.",
    author: "College CEO",
    date: "April 2025",
  },
  {
    quote:
      "WOW! You migrated our data in 2 days! I never thought that was possible.",
    author: "College CTO",
    date: "April 2025",
  },
];

export default function Testimonials() {
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
            Testimonials
          </p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Trusted by <span className="gradient-text">Education Leaders</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
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
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 border-t border-white/5 pt-4">
                <p className="font-semibold">{t.author}</p>
                <p className="text-sm text-gray-500">{t.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
