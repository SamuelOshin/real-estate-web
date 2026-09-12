/**
 * Per-client content and branding. This is the file you edit to turn this
 * codebase into a different real estate client's site — nav links, contact
 * details, footer copy, currency defaults. Component code should never
 * hardcode any of this; it should import from here.
 *
 * Visual tokens (color/type/spacing) live in theme.tokens.js, not here —
 * keep brand *content* and brand *style* in separate files.
 */

export const siteConfig = {
  name: "Prison Gihon Global Services",
  tagline: "Institutional-grade land conveyancing, cadastral deed verification, and sovereign title guarantees across Nigeria.",
  logo: {
    text: "Prison Gihon",
    src: "/logo.svg",
    icon: "/logo-icon.svg",
  },
  currency: {
    primary: "NGN",
    symbol: "₦",
    secondary: "USD", // shown as a secondary equivalent for diaspora buyers
  },
  contact: {
    phone: "+234 1 800 44466",
    email: "info@prisongihon.com",
    whatsapp: "+234 800 000 0000",
    address: "4th Floor, Sovereign Tower, Victoria Island, Lagos",
  },
  compliance: {
    rc: "1849204",
    scuml: "084920",
  },
  nav: {
    public: [
      { label: "Home", href: "/" },
      { label: "Properties", href: "/properties" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    admin: [
      { label: "Dashboard", href: "/admin/dashboard" },
      { label: "Publish Property", href: "/admin/properties/new" },
    ],
  },
  social: {
    // instagram: "https://instagram.com/...",
    // linkedin: "https://linkedin.com/company/...",
  },
} as const;

export type SiteConfig = typeof siteConfig;
