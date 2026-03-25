import Script from "next/script";

/**
 * Plausible Analytics — privacy-friendly, no cookies, GDPR compliant.
 * Set NEXT_PUBLIC_PLAUSIBLE_DOMAIN env var to enable.
 * Example: NEXT_PUBLIC_PLAUSIBLE_DOMAIN=apollosrm.com
 */
export default function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  if (!domain) return null;

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
