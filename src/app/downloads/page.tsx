"use client";

import { motion } from "framer-motion";
import { Download, FileText, Play } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { useI18n } from "@/lib/i18n/context";

interface DocItem {
  title: string;
  description: string;
  href: string;
  pages?: string;
}

export default function DownloadsPage() {
  const { t } = useI18n();

  const documents: DocItem[] = [
    {
      title: t.downloads.introTitle,
      description: t.downloads.introDesc,
      href: "/downloads/ApolloSRM-Intro.pdf",
      pages: "1 page",
    },
    {
      title: t.downloads.allInOneTitle,
      description: t.downloads.allInOneDesc,
      href: "/downloads/ApolloSRM-All-in-One.pdf",
      pages: "1 page",
    },
    {
      title: t.downloads.missionSupportTitle,
      description: t.downloads.missionSupportDesc,
      href: "/downloads/ApolloSRM-Mission-Support.pdf",
      pages: "2 pages",
    },
    {
      title: t.downloads.securityTitle,
      description: t.downloads.securityDesc,
      href: "/downloads/ApolloSRM-Data-Security.pdf",
      pages: "1 page",
    },
    {
      title: t.downloads.mobileTitle,
      description: t.downloads.mobileDesc,
      href: "/downloads/ApolloSRM-Mobile.pdf",
      pages: "1 page",
    },
  ];

  return (
    <PageTransition>
      <Navbar />
      <main id="main" className="pt-24">
        <section className="relative py-20">
          <div className="pointer-events-none absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-apollo-500/5 blur-[150px]" />

          <div className="relative mx-auto max-w-5xl px-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-apollo-400">
                {t.downloads.label}
              </p>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
                {t.downloads.title}{" "}
                <span className="gradient-text">{t.downloads.titleHighlight}</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
                {t.downloads.description}
              </p>
            </motion.div>

            {/* Intro Video */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-16"
            >
              <h2 className="mb-6 text-xl font-bold">
                <Play className="mr-2 inline h-5 w-5 text-apollo-400" />
                {t.downloads.introVideo}
              </h2>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                <video
                  controls
                  preload="metadata"
                  className="aspect-video w-full"
                  poster="/logos/apollo-og-image.png"
                >
                  <source
                    src="/downloads/ApolloSRM-Intro-Video.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video element.
                </video>
                <div className="px-6 py-4">
                  <p className="text-sm text-gray-400">
                    {t.downloads.introVideoDesc}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Documents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-16"
            >
              <h2 className="mb-6 text-xl font-bold">
                <FileText className="mr-2 inline h-5 w-5 text-apollo-400" />
                {t.downloads.documents}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {documents.map((doc) => (
                  <a
                    key={doc.href}
                    href={doc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition hover:border-apollo-500/20 hover:bg-white/[0.04]"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-white group-hover:text-apollo-400 transition">
                          {doc.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-gray-400">
                          {doc.description}
                        </p>
                        {doc.pages && (
                          <span className="mt-3 inline-block text-xs text-gray-600">
                            PDF &middot; {doc.pages}
                          </span>
                        )}
                      </div>
                      <Download className="ml-4 h-5 w-5 shrink-0 text-gray-600 transition group-hover:text-apollo-400" />
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
}
