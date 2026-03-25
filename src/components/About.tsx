"use client";

import { motion } from "framer-motion";
import { Users, Rocket, Award } from "lucide-react";

export default function About() {
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
              {[
                {
                  icon: Users,
                  label: "25+ Years",
                  sub: "Industry Experience",
                },
                {
                  icon: Rocket,
                  label: "Multiple Exits",
                  sub: "Startup Success",
                },
                {
                  icon: Award,
                  label: "Purpose-Built",
                  sub: "For Education",
                },
                {
                  icon: Rocket,
                  label: "Mission-Driven",
                  sub: "Student Success",
                },
              ].map((item) => (
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
              About ApolloSRM
            </p>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Built by People Who{" "}
              <span className="gradient-text">Know the Mission</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-400">
              Our founders bring over 25 years of commanding successful software
              missions in the education technology space. From guiding startups
              to successful exits, our team has the experience and vision to
              build the platform that colleges and career schools deserve.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-gray-400">
              ApolloSRM was born from a simple belief: schools shouldn&apos;t
              have to choose between affordability and capability. We built a
              platform that delivers enterprise-grade power at a price that
              makes sense for the institutions that need it most.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
