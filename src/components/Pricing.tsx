"use client";

import { motion } from "framer-motion";
import { Check, Zap, Building2, Rocket } from "lucide-react";

const plans = [
  {
    name: "Starter",
    icon: Zap,
    description: "For small career schools getting started",
    price: "Contact Us",
    priceNote: "Affordable per-student pricing",
    features: [
      "Command Module (SIS core)",
      "Flight Dynamics (basic CRM)",
      "Mission Portal (student portal)",
      "Email support",
      "Up to 500 students",
      "Standard data migration",
    ],
    highlighted: false,
    cta: "Get Started",
  },
  {
    name: "Professional",
    icon: Building2,
    description: "For growing institutions that need more power",
    price: "Contact Us",
    priceNote: "Best value for mid-size schools",
    features: [
      "Everything in Starter",
      "Mission Compliance (reporting)",
      "Financial Navigation (billing & aid)",
      "Apollo Intelligence (basic AI)",
      "Priority support",
      "Up to 2,500 students",
      "Expedited data migration",
      "API access",
    ],
    highlighted: true,
    cta: "Get Started",
  },
  {
    name: "Enterprise",
    icon: Rocket,
    description: "For multi-campus networks and large institutions",
    price: "Custom",
    priceNote: "Tailored to your mission",
    features: [
      "Everything in Professional",
      "Apollo Intelligence (full suite)",
      "Multi-campus support",
      "Custom integrations",
      "Dedicated success manager",
      "Unlimited students",
      "White-glove migration",
      "SLA guarantee",
      "On-premise option",
    ],
    highlighted: false,
    cta: "Contact Sales",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-apollo-500/5 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-apollo-400">
            Pricing
          </p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Plans That Fit{" "}
            <span className="gradient-text">Your Mission</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            Powerful software at a price colleges and career schools can
            actually afford. No hidden fees, no surprises.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex flex-col rounded-2xl border p-8 ${
                plan.highlighted
                  ? "border-apollo-500/30 bg-apollo-500/5 glow"
                  : "border-white/5 bg-white/[0.02]"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-apollo-500 px-4 py-1 text-xs font-semibold">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <plan.icon
                  className={`mb-4 h-8 w-8 ${plan.highlighted ? "text-apollo-400" : "text-gray-400"}`}
                />
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="mt-1 text-sm text-gray-400">
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                <p className="text-3xl font-extrabold">{plan.price}</p>
                <p className="mt-1 text-xs text-gray-500">{plan.priceNote}</p>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-gray-300"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-apollo-400" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`rounded-xl py-3 text-center text-sm font-semibold transition ${
                  plan.highlighted
                    ? "bg-apollo-500 text-white hover:bg-apollo-400"
                    : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
