"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { LogoFull } from "./Logo";
import { useI18n } from "@/lib/i18n/context";
import type { Locale } from "@/lib/i18n";

const navLinks = [
  { key: "product" as const, href: "/#features" },
  { key: "comparison" as const, href: "/#comparison" },
  { key: "downloads" as const, href: "/downloads" },
  { key: "blog" as const, href: "/blog" },
  { key: "contact" as const, href: "/#contact" },
];

const localeLabels: Record<Locale, string> = {
  en: "EN",
  es: "ES",
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { locale, setLocale, t } = useI18n();

  const toggleLocale = () => {
    setLocale(locale === "en" ? "es" : "en");
  };

  return (
    <nav
      className="fixed top-0 z-50 w-full border-b border-white/5 bg-navy-950/80 backdrop-blur-xl"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="/" aria-label="ApolloSRM home">
          <LogoFull />
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-sm font-medium text-gray-300 transition hover:text-white"
            >
              {t.nav[link.key]}
            </a>
          ))}

          {/* Language switcher */}
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-400 transition hover:text-white"
            aria-label={`Switch language to ${locale === "en" ? "Spanish" : "English"}`}
          >
            <Globe className="h-4 w-4" />
            {localeLabels[locale]}
          </button>

          <a
            href="/#contact"
            className="rounded-full bg-apollo-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-apollo-400 hover:shadow-lg hover:shadow-apollo-500/25"
          >
            {t.nav.getStarted}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="text-gray-300 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/5 bg-navy-950/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-gray-300 transition hover:text-white"
                >
                  {t.nav[link.key]}
                </a>
              ))}

              {/* Mobile language switcher */}
              <button
                onClick={toggleLocale}
                className="flex items-center gap-1.5 text-base font-medium text-gray-400 transition hover:text-white"
              >
                <Globe className="h-4 w-4" />
                {locale === "en" ? "Español" : "English"}
              </button>

              <a
                href="/#contact"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-apollo-500 px-5 py-2.5 text-center text-sm font-semibold text-white"
              >
                {t.nav.getStarted}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
