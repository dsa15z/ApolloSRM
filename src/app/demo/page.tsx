"use client";

import { Calendar, CheckCircle, Clock, Monitor } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const benefits = [
  {
    icon: Monitor,
    title: "Live Product Walkthrough",
    description: "See every module in action with real data scenarios",
  },
  {
    icon: Calendar,
    title: "Custom Migration Plan",
    description: "Get a tailored timeline for your institution's data",
  },
  {
    icon: Clock,
    title: "30 Minutes",
    description: "Quick, focused demo — no hour-long sales pitches",
  },
  {
    icon: CheckCircle,
    title: "No Commitment",
    description: "Zero pressure. Just see if ApolloSRM is right for you",
  },
];

export default function DemoPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-start gap-16 lg:grid-cols-2">
            {/* Left: Info */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-apollo-400">
                Book a Demo
              </p>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
                See ApolloSRM{" "}
                <span className="gradient-text">In Action</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-gray-400">
                Get a personalized walkthrough of the platform tailored to
                your institution&apos;s needs. Our team will show you how
                ApolloSRM can transform your student management.
              </p>

              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {benefits.map((b) => (
                  <div key={b.title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-apollo-500/10">
                      <b.icon className="h-5 w-5 text-apollo-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{b.title}</h3>
                      <p className="mt-1 text-sm text-gray-400">
                        {b.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                <p className="text-sm font-semibold text-gray-300">
                  What to expect:
                </p>
                <ol className="mt-3 space-y-2 text-sm text-gray-400">
                  <li className="flex gap-2">
                    <span className="font-bold text-apollo-400">1.</span>
                    Pick a time that works for you
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-apollo-400">2.</span>
                    Brief intro call to understand your needs (5 min)
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-apollo-400">3.</span>
                    Live demo of the modules relevant to you (20 min)
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-apollo-400">4.</span>
                    Q&A and custom migration plan discussion (5 min)
                  </li>
                </ol>
              </div>
            </div>

            {/* Right: Calendly Embed */}
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-2">
              <div className="overflow-hidden rounded-xl">
                {/*
                  Replace the Calendly URL below with your actual scheduling link.
                  Example: https://calendly.com/apollosrm/demo
                */}
                <iframe
                  src="https://calendly.com/apollosrm/demo"
                  width="100%"
                  height="700"
                  frameBorder="0"
                  title="Book a Demo with ApolloSRM"
                  className="min-h-[700px] w-full"
                  style={{ background: "transparent" }}
                />
              </div>
              <p className="mt-3 px-4 pb-2 text-center text-xs text-gray-600">
                Can&apos;t find a time?{" "}
                <a
                  href="/#contact"
                  className="text-apollo-400 underline transition hover:text-apollo-300"
                >
                  Contact us directly
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
