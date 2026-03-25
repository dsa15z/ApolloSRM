"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, ArrowRight, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const { t } = useI18n();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        setErrorMsg(json.error || t.contact.errorGeneric);
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setErrorMsg(t.contact.errorNetwork);
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-apollo-500/5 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-apollo-400">
              {t.contact.label}
            </p>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              {t.contact.title} <span className="gradient-text">{t.contact.titleHighlight}</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-gray-400">
              {t.contact.description}
            </p>
          </motion.div>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-12 text-center"
            >
              <CheckCircle className="h-12 w-12 text-emerald-400" />
              <h3 className="text-2xl font-bold">{t.contact.successTitle}</h3>
              <p className="text-gray-400">
                {t.contact.successMessage}
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-4 text-sm text-apollo-400 transition hover:text-apollo-300"
              >
                {t.contact.sendAnother}
              </button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mt-12 space-y-6 rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm"
              onSubmit={handleSubmit}
            >
              {status === "error" && (
                <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-300">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {errorMsg}
                </div>
              )}

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-gray-300">
                    {t.contact.firstName}
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    placeholder={t.contact.firstNamePlaceholder}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-apollo-500/50 focus:ring-2 focus:ring-apollo-500/20"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-gray-300">
                    {t.contact.lastName}
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    placeholder={t.contact.lastNamePlaceholder}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-apollo-500/50 focus:ring-2 focus:ring-apollo-500/20"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                  {t.contact.email}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder={t.contact.emailPlaceholder}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-apollo-500/50 focus:ring-2 focus:ring-apollo-500/20"
                />
              </div>

              <div>
                <label htmlFor="institution" className="mb-2 block text-sm font-medium text-gray-300">
                  {t.contact.institution}
                </label>
                <input
                  id="institution"
                  name="institution"
                  type="text"
                  placeholder={t.contact.institutionPlaceholder}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-apollo-500/50 focus:ring-2 focus:ring-apollo-500/20"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-300">
                  {t.contact.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder={t.contact.messagePlaceholder}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-apollo-500/50 focus:ring-2 focus:ring-apollo-500/20"
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="glow group flex w-full items-center justify-center gap-2 rounded-xl bg-apollo-500 py-3.5 text-base font-semibold text-white transition-all hover:bg-apollo-400 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t.contact.sending}
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    {t.contact.send}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}
