"use client";

import { LogoFull } from "./Logo";
import { useI18n } from "@/lib/i18n/context";

export default function Footer() {
  const { t } = useI18n();

  const footerLinks = {
    [t.footer.product]: [
      { label: t.footer.linkFeatures, href: "/#features" },
      { label: t.footer.linkPricing, href: "/#pricing" },
      { label: t.footer.linkROI, href: "/#roi" },
      { label: t.footer.linkDemo, href: "/demo" },
    ],
    [t.footer.resources]: [
      { label: t.footer.linkBlog, href: "/blog" },
      { label: t.footer.linkDownloads, href: "/downloads" },
      { label: t.footer.linkMigration, href: "/migration" },
      { label: t.footer.linkSecurity, href: "/security" },
      { label: t.footer.linkAbout, href: "/#about" },
    ],
    [t.footer.legal]: [
      { label: t.footer.linkPrivacy, href: "/privacy" },
      { label: t.footer.linkTerms, href: "#" },
      { label: t.footer.linkContact, href: "/#contact" },
    ],
  };

  return (
    <footer className="border-t border-white/5 bg-navy-950">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="/">
              <LogoFull />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-500">
              {t.footer.tagline}
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
                {title}
              </h4>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-500 transition hover:text-gray-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <p className="text-sm text-gray-600">
            {t.footer.company}
          </p>
        </div>
      </div>
    </footer>
  );
}
