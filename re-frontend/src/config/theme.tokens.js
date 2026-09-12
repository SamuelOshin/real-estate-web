/**
 * Canonical design tokens — see docs/design-system.md for the full rationale.
 *
 * This is the ONLY place color/type/radius/elevation values are declared.
 * tailwind.config.js reads this file directly. No component should ever
 * hardcode a hex value, an rgba shadow, or a font stack — reference a
 * Tailwind class generated from here instead.
 *
 * To re-skin this template for a different real estate client: edit this
 * file (and site.config.ts for content/branding), then rebuild. Nothing
 * else should need to change.
 */

module.exports = {
  colors: {
    primary: "#0B3C68",
    "primary-hover": "#0A2E52",
    secondary: "#1A56DB",
    verified: "#059669",

    surface: "#F8FAFC",
    "surface-card": "#FFFFFF",
    "surface-tint": "#F0F7FF",
    "surface-tint-strong": "#E0EFFF",

    border: "#E2E8F0",

    "text-primary": "#0F172A",
    "text-muted": "#475467",

    error: "#BA1A1A",

    // Verification badge sub-palette — semantic, not for general reuse.
    "badge-cofo-bg": "#ECFDF5",
    "badge-cofo-border": "#A7F3D0",
    "badge-cofo-text": "#065F46",
    "badge-gazette-bg": "#EFF6FF",
    "badge-gazette-border": "#BFDBFE",
    "badge-gazette-text": "#1E40AF",
    "badge-freehold-bg": "#F8FAFC",
    "badge-freehold-border": "#CBD5E1",
    "badge-freehold-text": "#334155",
  },

  fontFamily: {
    sans: ["var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
    body: ["var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
    display: ["var(--font-plus-jakarta-sans)", "Plus Jakarta Sans", "sans-serif"],
    heading: ["var(--font-plus-jakarta-sans)", "Plus Jakarta Sans", "sans-serif"],
    serif: ["var(--font-playfair-display)", "Playfair Display", "Georgia", "serif"],
  },

  // Matches docs/design-system.md typography table. Used via Tailwind
  // arbitrary utility composition, e.g. className="text-headline-lg".
  fontSize: {
    display: ["48px", { lineHeight: "56px", letterSpacing: "-0.03em", fontWeight: "800" }],
    "display-mobile": ["34px", { lineHeight: "40px", letterSpacing: "-0.025em", fontWeight: "800" }],
    "headline-xl": ["36px", { lineHeight: "44px", letterSpacing: "-0.025em", fontWeight: "700" }],
    "headline-lg": ["28px", { lineHeight: "36px", letterSpacing: "-0.02em", fontWeight: "700" }],
    "headline-md": ["22px", { lineHeight: "30px", letterSpacing: "-0.015em", fontWeight: "600" }],
    "headline-sm": ["18px", { lineHeight: "26px", letterSpacing: "-0.01em", fontWeight: "600" }],
    "price-display": ["26px", { lineHeight: "32px", letterSpacing: "-0.02em", fontWeight: "800" }],
    "body-lg": ["18px", { lineHeight: "28px", letterSpacing: "-0.005em", fontWeight: "400" }],
    "body-md": ["15px", { lineHeight: "24px", letterSpacing: "0em", fontWeight: "400" }],
    "body-sm": ["13px", { lineHeight: "20px", letterSpacing: "0em", fontWeight: "400" }],
    "label-lg": ["14px", { lineHeight: "20px", letterSpacing: "0.01em", fontWeight: "600" }],
    "label-md": ["12px", { lineHeight: "16px", letterSpacing: "0.02em", fontWeight: "600" }],
    "label-caps": ["11px", { lineHeight: "16px", letterSpacing: "0.06em", fontWeight: "700" }],
  },

  borderRadius: {
    sm: "0.25rem",
    DEFAULT: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
    full: "9999px",
  },

  spacing: {
    "2xs": "0.25rem",
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
    "4xl": "6rem",
  },

  boxShadow: {
    // Level 0 has no shadow — it's a 1px border only, applied via `border` utility.
    1: "0 1px 3px rgba(11,60,104,0.04), 0 4px 12px rgba(11,60,104,0.03)",
    2: "0 12px 28px -4px rgba(11,60,104,0.08), 0 4px 10px -2px rgba(11,60,104,0.04)",
    3: "0 24px 48px -12px rgba(15,23,42,0.16)",
  },
};
