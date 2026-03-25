"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

interface Integration {
  name: string;
  logo: string;
  category: string;
  featured?: boolean;
}

const integrations: Integration[] = [
  // LMS / Education
  { name: "Blackboard", logo: "/logos/blackboard.svg", category: "LMS / Education", featured: true },
  { name: "Canvas LMS", logo: "/logos/canvas.svg", category: "LMS / Education", featured: true },
  { name: "Google Classroom", logo: "/logos/google-classroom.svg", category: "LMS / Education", featured: true },
  { name: "Moodle", logo: "/logos/moodle.svg", category: "LMS / Education", featured: true },
  { name: "Schoology", logo: "/logos/schoology.svg", category: "LMS / Education" },
  { name: "TalentLMS", logo: "/logos/talentlms.svg", category: "LMS / Education" },
  { name: "Teachable", logo: "/logos/teachable.svg", category: "LMS / Education" },
  { name: "Thinkific", logo: "/logos/thinkific.svg", category: "LMS / Education" },

  // CRM / Lead Gen
  { name: "ActiveCampaign", logo: "/logos/activecampaign.svg", category: "CRM / Lead Gen" },
  { name: "HubSpot", logo: "/logos/hubspot.svg", category: "CRM / Lead Gen", featured: true },
  { name: "LeadSquared", logo: "/logos/leadsquared.svg", category: "CRM / Lead Gen", featured: true },
  { name: "Pipedrive", logo: "/logos/pipedrive.svg", category: "CRM / Lead Gen" },
  { name: "Salesforce", logo: "/logos/salesforce.svg", category: "CRM / Lead Gen", featured: true },
  { name: "Zoho CRM", logo: "/logos/zoho-crm.svg", category: "CRM / Lead Gen" },

  // Communication
  { name: "Gmail", logo: "/logos/gmail.svg", category: "Communication", featured: true },
  { name: "Mailchimp", logo: "/logos/mailchimp.svg", category: "Communication", featured: true },
  { name: "Microsoft Teams", logo: "/logos/microsoft-teams.svg", category: "Communication", featured: true },
  { name: "Outlook", logo: "/logos/outlook.svg", category: "Communication" },
  { name: "SendGrid", logo: "/logos/sendgrid.svg", category: "Communication" },
  { name: "Slack", logo: "/logos/slack.svg", category: "Communication", featured: true },
  { name: "Twilio", logo: "/logos/twilio.svg", category: "Communication", featured: true },
  { name: "WhatsApp Business", logo: "/logos/whatsapp.svg", category: "Communication" },
  { name: "Constant Contact", logo: "/logos/constant-contact.svg", category: "Communication" },

  // Scheduling
  { name: "Acuity Scheduling", logo: "/logos/acuity.svg", category: "Scheduling" },
  { name: "Calendly", logo: "/logos/calendly.svg", category: "Scheduling", featured: true },
  { name: "Google Calendar", logo: "/logos/google-calendar.svg", category: "Scheduling", featured: true },
  { name: "Outlook Calendar", logo: "/logos/outlook-calendar.svg", category: "Scheduling" },

  // Documents / E-Signature
  { name: "Adobe Sign", logo: "/logos/adobe-sign.svg", category: "Documents / E-Signature" },
  { name: "DocuSign", logo: "/logos/docusign.svg", category: "Documents / E-Signature", featured: true },
  { name: "Dropbox Sign", logo: "/logos/dropbox-sign.svg", category: "Documents / E-Signature" },
  { name: "Google Docs", logo: "/logos/google-docs.svg", category: "Documents / E-Signature" },
  { name: "PandaDoc", logo: "/logos/pandadoc.svg", category: "Documents / E-Signature" },

  // Payments / Accounting
  { name: "FreshBooks", logo: "/logos/freshbooks.svg", category: "Payments / Accounting" },
  { name: "PayPal", logo: "/logos/paypal.svg", category: "Payments / Accounting" },
  { name: "QuickBooks", logo: "/logos/quickbooks.svg", category: "Payments / Accounting", featured: true },
  { name: "Square", logo: "/logos/square.svg", category: "Payments / Accounting" },
  { name: "Stripe", logo: "/logos/stripe.svg", category: "Payments / Accounting", featured: true },
  { name: "Wave", logo: "/logos/wave.svg", category: "Payments / Accounting" },
  { name: "Xero", logo: "/logos/xero.svg", category: "Payments / Accounting" },

  // Forms / Surveys
  { name: "Cognito Forms", logo: "/logos/cognito-forms.svg", category: "Forms / Surveys" },
  { name: "Google Forms", logo: "/logos/google-forms.svg", category: "Forms / Surveys", featured: true },
  { name: "JotForm", logo: "/logos/jotform.svg", category: "Forms / Surveys" },
  { name: "SurveyMonkey", logo: "/logos/surveymonkey.svg", category: "Forms / Surveys" },
  { name: "Typeform", logo: "/logos/typeform.svg", category: "Forms / Surveys" },

  // Project / Task Management
  { name: "Asana", logo: "/logos/asana.svg", category: "Project Management" },
  { name: "ClickUp", logo: "/logos/clickup.svg", category: "Project Management" },
  { name: "Monday.com", logo: "/logos/monday.svg", category: "Project Management" },
  { name: "Notion", logo: "/logos/notion.svg", category: "Project Management", featured: true },
  { name: "Trello", logo: "/logos/trello.svg", category: "Project Management" },

  // File Storage
  { name: "Box", logo: "/logos/box.svg", category: "File Storage" },
  { name: "Dropbox", logo: "/logos/dropbox.svg", category: "File Storage" },
  { name: "Google Drive", logo: "/logos/google-drive.svg", category: "File Storage", featured: true },
  { name: "OneDrive", logo: "/logos/onedrive.svg", category: "File Storage" },

  // Analytics / Reporting
  { name: "Airtable", logo: "/logos/airtable.svg", category: "Analytics / Reporting" },
  { name: "Google Analytics", logo: "/logos/google-analytics.svg", category: "Analytics / Reporting" },
  { name: "Google Sheets", logo: "/logos/google-sheets.svg", category: "Analytics / Reporting", featured: true },
  { name: "Looker Studio", logo: "/logos/looker-studio.svg", category: "Analytics / Reporting" },

  // HR / Staff
  { name: "ADP", logo: "/logos/adp.svg", category: "HR / Staff" },
  { name: "BambooHR", logo: "/logos/bamboohr.svg", category: "HR / Staff" },
  { name: "Gusto", logo: "/logos/gusto.svg", category: "HR / Staff" },

  // Social / Marketing
  { name: "Facebook Lead Ads", logo: "/logos/facebook-leads.svg", category: "Social / Marketing" },
  { name: "Google Ads", logo: "/logos/google-ads.svg", category: "Social / Marketing" },
  { name: "Instagram", logo: "/logos/instagram.svg", category: "Social / Marketing" },
  { name: "LinkedIn", logo: "/logos/linkedin.svg", category: "Social / Marketing", featured: true },

  // Financial Aid
  { name: "Campus Ivy", logo: "/logos/campus-ivy.svg", category: "Financial Aid", featured: true },
  { name: "DJA", logo: "/logos/dja.svg", category: "Financial Aid", featured: true },
  { name: "ECM", logo: "/logos/ecm.svg", category: "Financial Aid", featured: true },
  { name: "FAME", logo: "/logos/fame.svg", category: "Financial Aid" },
  { name: "Global FAS", logo: "/logos/global-fas.svg", category: "Financial Aid", featured: true },

  // Automation
  { name: "Google Workspace", logo: "/logos/google-workspace.svg", category: "Automation", featured: true },
  { name: "Microsoft 365", logo: "/logos/microsoft-365.svg", category: "Automation", featured: true },
  { name: "Zapier", logo: "/logos/zapier.svg", category: "Automation", featured: true },
  { name: "Zoom", logo: "/logos/zoom.svg", category: "Automation", featured: true },
];

const categories = [
  "All",
  ...Array.from(new Set(integrations.map((i) => i.category))),
];

function IntegrationCard({ tool }: { tool: Integration }) {
  return (
    <div className="group flex h-24 w-[7.5rem] flex-col items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] transition hover:border-apollo-500/20 hover:bg-white/[0.04]">
      <Image
        src={tool.logo}
        alt={`${tool.name} logo`}
        width={32}
        height={32}
        className="opacity-70 transition group-hover:opacity-100"
      />
      <span className="max-w-[6.5rem] truncate text-center text-[10px] font-medium text-gray-500 transition group-hover:text-gray-300">
        {tool.name}
      </span>
    </div>
  );
}

export default function Integrations() {
  const { t } = useI18n();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const categoryNames: Record<string, string> = {
    "LMS / Education": t.integrations.catLMS,
    "CRM / Lead Gen": t.integrations.catCRM,
    "Communication": t.integrations.catComm,
    "Scheduling": t.integrations.catScheduling,
    "Documents / E-Signature": t.integrations.catDocs,
    "Payments / Accounting": t.integrations.catPayments,
    "Forms / Surveys": t.integrations.catForms,
    "Project Management": t.integrations.catPM,
    "File Storage": t.integrations.catStorage,
    "Analytics / Reporting": t.integrations.catAnalytics,
    "HR / Staff": t.integrations.catHR,
    "Social / Marketing": t.integrations.catSocial,
    "Financial Aid": t.integrations.catFinAid,
    "Automation": t.integrations.catAutomation,
  };

  const filtered = useMemo(() => {
    let result = integrations;

    if (activeCategory !== "All") {
      result = result.filter((i) => i.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [search, activeCategory]);

  const isSearching = search.trim() !== "" || activeCategory !== "All";
  const displayed = isSearching || showAll ? filtered : filtered.filter((i) => i.featured);
  const hiddenCount = filtered.length - displayed.length;

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-apollo-400">
            {t.integrations.label}
          </p>
          <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
            {t.integrations.title.replace("{count}", String(integrations.length))}
          </h2>
        </motion.div>

        {/* Search */}
        <div className="mx-auto mt-10 max-w-md">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder={t.integrations.searchPlaceholder}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowAll(true);
              }}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder-gray-500 outline-none transition focus:border-apollo-500/50 focus:ring-2 focus:ring-apollo-500/20"
            />
          </div>
        </div>

        {/* Category pills */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                if (cat !== "All") setShowAll(true);
                else setShowAll(false);
              }}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                activeCategory === cat
                  ? "bg-apollo-500 text-white"
                  : "border border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat === "All" ? t.integrations.all : (categoryNames[cat] ?? cat)}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <AnimatePresence mode="popLayout">
            {displayed.map((tool) => (
              <motion.div
                key={tool.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <IntegrationCard tool={tool} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show More / Less */}
        {!isSearching && hiddenCount > 0 && !showAll && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
            >
              {t.integrations.showAll.replace("{count}", String(integrations.length))}
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        )}

        {!isSearching && showAll && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll(false)}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
            >
              {t.integrations.showFeatured}
              <ChevronUp className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Empty state */}
        {displayed.length === 0 && (
          <div className="mt-10 text-center">
            <p className="text-gray-400">
              {t.integrations.noResults.replace("{query}", search)}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              {t.integrations.noResultsHint}
            </p>
          </div>
        )}

        <p className="mt-8 text-center text-sm text-gray-500">
          {t.integrations.poweredBy}
        </p>
      </div>
    </section>
  );
}
