import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — ApolloSRM",
  description: "Apollo SRM, Inc. Privacy Statement",
};

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20">
        <article className="mx-auto max-w-3xl px-6">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-gray-500">
            Last updated: March 1, 2025
          </p>

          <hr className="my-10 border-white/5" />

          <div className="space-y-8 text-gray-300 leading-relaxed">
            <section>
              <h2 className="mb-4 text-2xl font-bold text-white">
                1. Introduction
              </h2>
              <p>
                Apollo SRM, Inc. (&ldquo;ApolloSRM,&rdquo; &ldquo;we,&rdquo;
                &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to
                protecting your privacy. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you
                visit our website at www.apollosrm.com and use our platform
                services.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-white">
                2. Information We Collect
              </h2>
              <h3 className="mb-2 text-lg font-semibold text-white">
                Information You Provide
              </h3>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  Contact information (name, email, phone number, institution)
                  submitted through our contact forms
                </li>
                <li>
                  Account credentials when you register for our platform
                </li>
                <li>
                  Student and institutional data uploaded to our SIS/CRM
                  platform by authorized administrators
                </li>
              </ul>

              <h3 className="mb-2 mt-6 text-lg font-semibold text-white">
                Information Collected Automatically
              </h3>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  Device information (browser type, operating system, device
                  type)
                </li>
                <li>
                  Usage data (pages visited, features used, session duration)
                </li>
                <li>IP address and approximate geographic location</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-white">
                3. How We Use Your Information
              </h2>
              <ul className="ml-6 list-disc space-y-2">
                <li>Provide, maintain, and improve our platform services</li>
                <li>
                  Respond to your inquiries and provide customer support
                </li>
                <li>
                  Send service-related communications and important updates
                </li>
                <li>
                  Analyze usage patterns to enhance our products and user
                  experience
                </li>
                <li>
                  Comply with legal obligations and regulatory requirements
                </li>
                <li>
                  Protect against unauthorized access, fraud, and abuse
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-white">
                4. Data Security
              </h2>
              <p>
                We implement industry-standard security measures to protect your
                data, including encryption in transit (TLS) and at rest, access
                controls, regular security audits, and secure infrastructure
                hosted on trusted cloud providers. However, no method of
                electronic transmission or storage is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-white">
                5. Data Sharing and Disclosure
              </h2>
              <p>
                We do not sell your personal information. We may share data with:
              </p>
              <ul className="ml-6 mt-2 list-disc space-y-2">
                <li>
                  Service providers who assist in operating our platform (e.g.,
                  hosting, analytics)
                </li>
                <li>
                  Regulatory bodies when required by law or to protect our legal
                  rights
                </li>
                <li>
                  Your institution&apos;s authorized administrators who manage
                  your account
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-white">
                6. FERPA Compliance
              </h2>
              <p>
                ApolloSRM is designed to support institutions in meeting their
                obligations under the Family Educational Rights and Privacy Act
                (FERPA). We act as a &ldquo;school official&rdquo; with a
                legitimate educational interest when processing student
                education records on behalf of our institutional clients.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-white">
                7. Your Rights
              </h2>
              <p>
                Depending on your jurisdiction, you may have the right to
                access, correct, delete, or port your personal data. To exercise
                these rights, contact us at the information below.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-white">
                8. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. We will
                notify you of any material changes by posting the updated policy
                on this page with a revised &ldquo;Last updated&rdquo; date.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-white">
                9. Contact Us
              </h2>
              <p>
                If you have questions about this Privacy Policy or our data
                practices, please contact us through our{" "}
                <a
                  href="/#contact"
                  className="text-apollo-400 underline transition hover:text-apollo-300"
                >
                  contact form
                </a>
                .
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
