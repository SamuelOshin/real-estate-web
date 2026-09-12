# Design System — Sovereign Trust (Reconciled)

Status: canonical source of truth for the Next.js template, superseding all
per-page Tailwind CDN configs in the HTML prototype.

> Naming note: "Sovereign Trust" is the internal codename this token set was
> generated under (per `DESIGN (1).md`'s frontmatter) — it does not appear
> anywhere in the actual prototype pages. The real site brand, confirmed
> across every page's `<title>` and header, is **Veritas Prime Properties**.
> `site.config.ts` uses the real brand name; this document's title keeps the
> codename only so it's traceable back to its source file.

## Why this document exists

The prototype (`about-us.html`, `contact-and-inspection.html`, `property-details.html`,
`property-listings.html`, `admin-dashboard.html`, `publish-property.html`) shares one
47-key Material-style token set. `index.html` runs a separate, slightly different
19-key palette. Neither matches the *written* brand description in `DESIGN (1).md`
(Navy `#0B3C68` / Cobalt `#1A56DB` / Emerald `#059669`), and several pages also
hardcode raw hex values directly in markup (e.g. header backgrounds) that match
none of the above.

This document picks one system and every future component reads from it — no
inline hex, no per-page config.

**Decision:** the prose brand description wins. It's the more deliberate,
semantically-driven choice (Emerald reserved specifically for land-title
verification, Cobalt for interaction) versus the auto-generated Material
scaffold names, which get retired.

## Color tokens (canonical)

| Token | Hex | Usage |
|---|---|---|
| `primary` | `#0B3C68` | Institutional anchor — primary CTAs, verification markers, headline text |
| `primary-hover` | `#0A2E52` | Primary button/link hover state |
| `secondary` | `#1A56DB` | Interactive driver — active nav, secondary buttons, map highlights, focus rings |
| `verified` | `#059669` | Reserved exclusively for title-deed verification (C of O, Governor's Consent, Excision/Gazette) |
| `surface` | `#F8FAFC` | Page canvas background |
| `surface-card` | `#FFFFFF` | Card / modal / form surface |
| `surface-tint` | `#F0F7FF` | Highlighted feature backgrounds, active filter states, inspection modals |
| `surface-tint-strong` | `#E0EFFF` | Hover state on badges/cards, secondary container fill |
| `border` | `#E2E8F0` | Hairline dividers, card borders, spec tables |
| `text-primary` | `#0F172A` | Body copy (WCAG AAA on white) |
| `text-muted` | `#475467` | Secondary text, metadata |
| `error` | `#BA1A1A` | Errors, destructive actions |

### Verification badge sub-palette (semantic, not decorative — do not reuse elsewhere)

| Status | Background | Border | Text |
|---|---|---|---|
| Governor's Consent / C of O | `#ECFDF5` | `#A7F3D0` | `#065F46` |
| Gazette / Excision in progress | `#EFF6FF` | `#BFDBFE` | `#1E40AF` |
| Freehold / Registered Survey | `#F8FAFC` | `#CBD5E1` | `#334155` |

## Typography

Headings/commercial figures: **Plus Jakarta Sans**. Body/tabular/legal specs: **Inter**.

| Style | Font | Size | Weight | Line height | Tracking |
|---|---|---|---|---|---|
| display | Plus Jakarta Sans | 48px | 800 | 56px | -0.03em |
| display-mobile | Plus Jakarta Sans | 34px | 800 | 40px | -0.025em |
| headline-xl | Plus Jakarta Sans | 36px | 700 | 44px | -0.025em |
| headline-lg | Plus Jakarta Sans | 28px | 700 | 36px | -0.02em |
| headline-md | Plus Jakarta Sans | 22px | 600 | 30px | -0.015em |
| headline-sm | Plus Jakarta Sans | 18px | 600 | 26px | -0.01em |
| price-display | Plus Jakarta Sans | 26px | 800 | 32px | -0.02em |
| body-lg | Inter | 18px | 400 | 28px | -0.005em |
| body-md | Inter | 15px | 400 | 24px | 0em |
| body-sm | Inter | 13px | 400 | 20px | 0em |
| label-lg | Inter | 14px | 600 | 20px | 0.01em |
| label-md | Inter | 12px | 600 | 16px | 0.02em |
| label-caps | Inter | 11px | 700 | 16px | 0.06em (uppercase) |

Currency (₦) always uses `font-feature-settings: "tnum" 1` for tabular alignment
in pricing grids and amortization tables.

## Spacing & radius

8pt rhythm. `space-2xs` 0.25rem → `space-4xl` 6rem (full scale unchanged from
the prototype's token list — it wasn't in conflict with anything).

| Shape use | Radius |
|---|---|
| Primary cards / listing panels | `1rem`–`1.5rem` |
| Buttons / inputs / dropdowns | `0.5rem` |
| Badges / legal chips | `0.375rem` |
| Floating pill anchors (mobile inspection bar) | `9999px` |

## Elevation

| Level | Use | Shadow |
|---|---|---|
| 0 | Flat resting surface | `border: 1px solid #E2E8F0` only |
| 1 | Card resting | `0 1px 3px rgba(11,60,104,.04), 0 4px 12px rgba(11,60,104,.03)` |
| 2 | Card hover / interactive lift | `0 12px 28px -4px rgba(11,60,104,.08), 0 4px 10px -2px rgba(11,60,104,.04)` |
| 3 | Modals / flyouts | `0 24px 48px -12px rgba(15,23,42,.16)` + `backdrop-blur(8px)` on `rgba(255,255,255,.95)` |

## Component inventory (derived from the 7 prototype pages)

Layout: `Header` (public), `AdminSidebar` + `AdminTopbar` (admin), `Footer`,
`MobileNavDrawer`.

Primitives (`components/ui/`): `Button` (primary/secondary/ghost),
`Input`/`Select`/`Textarea`, `Badge` (incl. verification variant), `Card`,
`Modal`, `Checkbox`/`Radio`, `DateSlotPicker`.

Feature components (`features/properties/`): `PropertyCard`, `PropertyGrid`,
`PropertyFilters`, `PropertyGallery`, `PriceDisplay`, `VerificationBadge`.

Feature components (`features/inquiries/`): `InspectionBookingForm`,
`ContactForm`.

Feature components (`features/admin/`): `PublishPropertyForm` (multi-step),
`ListingsTable`, `StatCard`, `ReviewCommentThread`.

## Open items before implementation

- `index.html`'s bespoke palette needs to be re-skinned to this system — it
  currently renders a visibly different navy/blue than the rest of the site.
- All raw hex classes in markup (e.g. `bg-[#0b2545]`, `text-[#2563eb]`) get
  replaced with the tokens above — none of them currently match any documented
  system.
