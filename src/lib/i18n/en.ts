const en = {
  nav: {
    product: "Product",
    blog: "Blog",
    about: "About",
    contact: "Contact",
    getStarted: "Get Started",
  },
  hero: {
    badge: "AI-Powered Student Relationship Management",
    headline1: "Smart. Simple.",
    headlineHighlight: "Seamless.",
    headline2: "The Future of Student Relationships.",
    description:
      "The all-in-one SIS + CRM platform built for colleges and career schools. Manage enrollment, compliance, financials, and student success — powered by AI.",
    cta: "Get Started",
    explore: "Explore Features",
    statPlatform: "Unified Platform",
    statAI: "Predictive Analytics",
    statMigration: "Data Migration",
  },
  features: {
    label: "Liftoff With Powerful Features",
    title1: "Everything You Need.",
    titleHighlight: "One Platform.",
    description:
      "SRM = SIS + CRM. Apollo unifies student information management with relationship tracking into a single, AI-powered platform.",
  },
  contact: {
    label: "Contact Us",
    title: "Ready for",
    titleHighlight: "Liftoff?",
    description:
      "Let's discuss how ApolloSRM can transform your institution. Reach out and our team will get back to you within 24 hours.",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    institution: "Institution",
    message: "Message",
    send: "Send Message",
    sending: "Sending...",
    successTitle: "Message Sent!",
    successMessage:
      "Thanks for reaching out. Our team will get back to you within 24 hours.",
    sendAnother: "Send another message",
  },
  footer: {
    tagline:
      "Smart. Simple. Seamless. The all-in-one SIS + CRM platform built for colleges and career schools.",
    copyright: "ApolloSRM. All rights reserved.",
  },
};

export default en;

// Recursively widen literal string types to string
type Widen<T> = T extends string
  ? string
  : T extends object
    ? { [K in keyof T]: Widen<T[K]> }
    : T;

export type Dictionary = Widen<typeof en>;
