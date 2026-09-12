# Sovereign Trust — Real Estate Template

A reusable Next.js real estate listings template: public listings site +
admin publishing dashboard, built from a reconciled design system (see
`docs/design-system.md`).

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS, tokens sourced from `src/config/theme.tokens.js`
- `class-variance-authority` for component variants (Open/Closed principle)

## Getting started

```bash
npm install
npm run dev
```

Build check: `npm run build`. Type check only: `npm run typecheck`.

## Re-skinning for a new client

This is meant to be a template, not a one-off site. To point it at a
different real estate client:

1. Edit `src/config/theme.tokens.js` — colors, type scale, radius, shadows.
2. Edit `src/config/site.config.ts` — brand name, nav, contact info, currency.
3. Rebuild. No component code should need to change.

## Architecture

```
src/
  app/            Routes only — (public) and (admin) route groups
  components/
    ui/           Presentational primitives (Button, Card, Badge, Input) — no business logic
    layout/       Header, Footer — composed from ui/ + site.config, no hardcoded brand values
  features/
    properties/   PropertyCard, hooks, API layer for the properties domain
    inquiries/    Contact/inspection booking forms
  lib/utils/      cn() class merger, currency/plot-size formatters
  config/         theme.tokens.js (style) + site.config.ts (content) — the two files
                  that change per client
  types/          Shared domain types (Property, etc.)
```

## Status

Scaffolding + design system + `ui/` primitives + layout shell are complete
and build clean (`npm run build` passes, 9/9 routes). Page content is still
placeholder pending migration from the original HTML prototype
(`about-us.html`, `property-listings.html`, `property-details.html`,
`contact-and-inspection.html`, `admin-dashboard.html`, `publish-property.html`).

## Known items

- `next/font` needs real internet access to fetch Google Fonts at build
  time — this only mattered in the sandbox; a real dev/CI environment
  with network access is unaffected.
- Image domains for listing media need to be added to `next.config.ts`
  once the object storage / CDN host is known.
