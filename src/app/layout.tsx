import type { Metadata } from "next";
import Analytics from "@/components/Analytics";
import ChatWidget from "@/components/ChatWidget";
import { I18nProvider } from "@/lib/i18n/context";
import { AuthProvider } from "@/components/AuthProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "ApolloSRM — Smart. Simple. Seamless. The Future of Student Relationships.",
  description:
    "An integrated Student Information System (SIS) and CRM platform for colleges and career schools, featuring AI-powered analytics and workflow automation.",
  keywords: [
    "SIS",
    "CRM",
    "student information system",
    "student relationship management",
    "higher education software",
    "college management",
    "career school software",
    "enrollment management",
  ],
  icons: {
    apple: "/logos/apollo-rocket-dark.png",
  },
  openGraph: {
    title: "ApolloSRM — The Future of Student Relationships",
    description:
      "An integrated SIS + CRM platform for colleges and career schools, featuring AI-powered analytics and workflow automation.",
    url: "https://www.apollosrm.com",
    siteName: "ApolloSRM",
    images: [{ url: "/og-image.png", width: 1456, height: 816, alt: "ApolloSRM" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ApolloSRM — The Future of Student Relationships",
    description:
      "An integrated SIS + CRM platform for colleges and career schools, featuring AI-powered analytics and workflow automation.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* Theme-aware favicon: white rocket on dark theme, blue rocket on light theme */}
        <link rel="icon" href="/favicon-dark.png" media="(prefers-color-scheme: dark)" />
        <link rel="icon" href="/favicon-blue.png" media="(prefers-color-scheme: light)" />
      </head>
      <body className="bg-navy-950 text-white antialiased">
        <a href="#main" className="skip-to-content">
          Skip to content
        </a>
        <AuthProvider>
          <I18nProvider>
            {children}
          </I18nProvider>
        </AuthProvider>
        <ChatWidget />
        <Analytics />
      </body>
    </html>
  );
}
