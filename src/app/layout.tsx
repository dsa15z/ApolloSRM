import type { Metadata } from "next";
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
      </head>
      <body className="bg-navy-950 text-white antialiased">{children}</body>
    </html>
  );
}
