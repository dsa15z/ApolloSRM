import { LogoFull } from "./Logo";

const footerLinks = {
  Product: [
    { label: "Command Module", href: "#features" },
    { label: "Flight Dynamics", href: "#features" },
    { label: "Mission Compliance", href: "#features" },
    { label: "Apollo Intelligence", href: "#features" },
  ],
  Company: [
    { label: "About", href: "#about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "#contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "#" },
  ],
};

export default function Footer() {
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
              Smart. Simple. Seamless. The all-in-one SIS + CRM platform
              built for colleges and career schools.
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
            &copy; {new Date().getFullYear()} ApolloSRM. All rights reserved.
          </p>
          <p className="text-sm text-gray-600">
            Apollo SRM, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
