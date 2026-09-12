# Migration Tickets

Each ticket is one PR. Do not start a ticket until the previous one has
passed review, since later tickets (04, 05) reuse components ticket 01
introduces (`PropertyFilters`, `PropertyGrid`). Read `AGENT_GUIDELINES.md`
in full before starting any ticket.

---

## TICKET-01 — Public Property Listings Page

**Source file:** `property-listings.html`
**Route:** `src/app/(public)/properties/page.tsx` (already exists as a
placeholder — replace its contents)

### Explicit requirements

Hero: heading "Vetted Landed Properties Across Prime Nigerian Corridors."

**`PropertyFilters` sidebar** (new component,
`src/features/properties/components/PropertyFilters.tsx`) — a controlled
component, filter state lifted to the parent page:

- Allocation urgency checkboxes: Ready to Build (Immediate Allocation),
  Fast Developing (Ongoing Paving), Capital Appreciation (Land Bank),
  Pre-Launch Off-Plan Special.
- Verification status checkboxes, each showing a count from the data (read
  the count from the properties array length per status — do not
  hardcode the numbers shown in the prototype, e.g. "44"; those were
  static demo numbers): Governor's Consent, Certificate of Occupancy,
  Government Gazette, Registered Survey & Excision.
- Topography checkboxes: 100% Dry Table Land, Sandfilled / Bermed Table,
  Hilltop Panoramic View (Abuja), Level Grade Plateau.
- Price range: Min (₦) / Max (₦) numeric inputs, using the `Input`
  primitive.
- Amenities checkboxes (read the full list directly from the source HTML
  — "Perimeter Wall & Gatehouse" is one of them, there are more; copy them
  all).
- 3 dropdown/select controls exist in the source (sort order, location,
  and one more) — inspect the HTML for their exact option lists and
  reproduce them with the native `<select>` styled per `Input.tsx`'s field
  base styles (extend `Input.tsx` to export a `Select` if one doesn't
  exist yet — check first).

**`PropertyGrid`** (new component, same folder) — responsive grid,
3-column desktop / 2-column tablet / 1-column mobile (per
`docs/design-system.md` reflow rules), rendering `PropertyCard` (already
built — reuse it, do not modify its API unless you find a genuine gap).

Six listing cards' worth of mock data: The Grand Crest Estate, Sovereign
Heights, Oasis Greenfield Park, Heritage Valley Estate, Atlantic Crest Bay,
Serene Palms Sanctuary. Pull whatever detail exists per card in the source
HTML (location, price, plot size, verification status) into
`src/features/properties/api.ts`'s mock data array — create this file if
it doesn't exist, typed as `Property[]`.

CTA banner: "Need an Independent Legal Title Search?" section — build as
a simple `Card` with heading + body + `Button`.

Newsletter signup: "Join the Veritas Prime Diaspora Dispatch" — a `Field`
+ `Input` (email) + `Button`, no real submission logic needed yet (stub an
`onSubmit` that does nothing but is clearly marked for future wiring).

### Files you will create / modify

- `src/app/(public)/properties/page.tsx` (modify)
- `src/features/properties/components/PropertyFilters.tsx` (create)
- `src/features/properties/components/PropertyGrid.tsx` (create)
- `src/features/properties/api.ts` (create)
- `src/features/properties/hooks/usePropertyFilters.ts` (create — houses
  the filter state logic, kept out of the page component per SRP)
- Possibly `src/components/ui/Select.tsx` if one doesn't already exist —
  check `src/components/ui/index.ts` first.

### Acceptance criteria

- All four filter groups + price range + amenities list present and
  functional (checking a box actually filters the visible grid against
  the mock data).
- Grid reflows 3 → 2 → 1 columns at the breakpoints in
  `docs/design-system.md`.
- `npm run build` passes.

### Out of scope

- Real backend/API integration (mock data only).
- The individual property detail page (TICKET-02).

---

## TICKET-02 — Property Detail Page

**Source file:** `property-details.html`
**Route:** `src/app/(public)/properties/[slug]/page.tsx` (replace
placeholder)

### Explicit requirements

- Title block: "The Grand Crest Estate • Signature Serviced Residential
  Plot" pattern — estate name + subtitle, pull from the `Property` record
  matched by slug (extend `getPropertyBySlug` in
  `features/properties/api.ts`).
- `PropertyGallery` component (new,
  `src/features/properties/components/PropertyGallery.tsx`): image
  gallery, main image + thumbnail strip, using `next/image`.
- "Key Estate Specifications" — a spec table/list component (new,
  `SpecSheet.tsx` in the same folder) rendering plot size, location,
  topography, title status, etc. as label/value pairs using `body-sm` /
  `label-lg` type tokens.
- "Structured Acquisition & Payment Options" section — read the actual
  payment structure options from the source HTML and list them (this is
  informational content, not a form, on this page).
- "Why Institutional Capital is Aggressively Entering Epe" — a narrative
  content block. Treat "Epe" as data (the property's location), not
  hardcoded text — the heading should template the location in from the
  property record if the source pattern supports it; otherwise keep as
  static copy for this property and leave a `// TODO(agent):` noting it
  should be data-driven per-property.
- "Serviced Infrastructure & Planned Amenities" — icon grid: Smart
  Gatehouse, Interlocking Roads, Solar Streetlights, Electric Wire Fence,
  Water Reticulation, Green Sports Arena. Build as a reusable
  `AmenitiesGrid` component since this list-of-icon-plus-label pattern
  will very likely recur on other property pages.
- "Legal Title & Alausa Registration Dossier" with "Governor's Consent
  Freehold Assurance" — use the existing `VerificationBadge` component,
  don't rebuild badge styling here.
- "Cadastral Location & Satellite Beacon Grid" — a map placeholder is fine
  for this ticket (a `Card` with a static image or a labeled gray box);
  do not integrate a real maps SDK in this ticket.
- Inquiry form at the bottom: Full Legal Name, WhatsApp Phone Number,
  Official Corporate / Personal Email, Preferred Date, Plot Option
  (select). Build this as `InspectionBookingForm` in
  `src/features/inquiries/components/` — this exact form reappears in
  TICKET-03's contact page, so build it as one shared, parameterizable
  component now rather than duplicating it there. Accept a prop for which
  property it's pre-scoped to (optional — the contact page version won't
  have one).

### Files you will create / modify

- `src/app/(public)/properties/[slug]/page.tsx` (modify)
- `src/features/properties/components/PropertyGallery.tsx` (create)
- `src/features/properties/components/SpecSheet.tsx` (create)
- `src/features/properties/components/AmenitiesGrid.tsx` (create)
- `src/features/inquiries/components/InspectionBookingForm.tsx` (create)
- `src/features/properties/api.ts` (modify — add `getPropertyBySlug`)

### Acceptance criteria

- Page renders real data for at least the "Grand Crest Estate" mock
  record added in TICKET-01.
- `InspectionBookingForm` has no hardcoded property reference baked in —
  it takes the property (or lack thereof) as a prop.
- `npm run build` passes, including the dynamic route.

### Out of scope

- Real map integration.
- Payment processing.

---

## TICKET-03 — Contact & Inspection Page

**Source file:** `contact-and-inspection.html`
**Route:** `src/app/(public)/contact/page.tsx` (replace placeholder)

This is the largest single page in the prototype (13 inputs, 8 selects) —
read the full source file carefully before starting.

### Explicit requirements

Three distinct forms/flows on this page — do not merge them into one form:

1. **Estate Site Inspection Reservation** — reuse
   `InspectionBookingForm` from TICKET-02 (import it, don't recreate it).
   Fields per the source: Title, Full Legal Name, Official/Personal
   Email, Phone/WhatsApp Number, Preferred Inspection Modality (3 tile
   options — Saturday Tour/Chauffeured, Private Weekday 1-on-1, Live 4K
   Drone/Real-time — build as a `TileRadioGroup` primitive if
   `components/ui/` doesn't already have an equivalent; check first),
   Select Estate of Interest, Preferred Date, Time Slot, Lagos/Abuja
   Meeting & Pickup Point, Specific Land Questions / Survey Verification
   (textarea).
2. **Direct Land Title & Conveyancing Inquiry** — separate form: Contact
   Name, Corporate Entity / Private Buyer (and whatever other fields the
   source HTML shows — read it directly, the extraction here is
   incomplete).
3. **Diaspora Private Video Consultation** — read the source HTML for
   this section's actual fields/CTA; it may be a simpler CTA card rather
   than a full form — check before building a form for it.

Informational sections (no form fields, static content blocks):

- "What to Expect on Your Inspection Day" — 4 steps: Departure & Safety
  Briefing, Cadastral Beacon Verification, Alausa Title Dossier Handover,
  Zero Commitment / Allocation Q&A. This is a genuine sequence — a
  numbered 1-2-3-4 step layout is appropriate here (unlike most of the
  site, per the frontend-design guidance against numbering non-sequences).
- "Physical Regional Offices" — Lagos Headquarters & Lounge, Abuja
  Diplomatic Office, Oyo / South-West Regional Hub — address cards.
- "Dedicated International Desks" — read source for content.
- "Regional Highway & Site Waypoints" — map placeholder, same rule as
  TICKET-02 (no real map SDK yet).

### Files you will create / modify

- `src/app/(public)/contact/page.tsx` (modify)
- `src/components/ui/TileRadioGroup.tsx` (create, only if no equivalent
  exists)
- `src/features/inquiries/components/ConveyancingInquiryForm.tsx`
  (create)
- `src/features/inquiries/components/InspectionDaySteps.tsx` (create)
- `src/features/inquiries/components/RegionalOfficesList.tsx` (create)

### Acceptance criteria

- All three flows present and visually distinct from each other (this
  page has historically been the one most likely to get flattened into a
  single form by mistake — it is explicitly three separate things).
- `InspectionBookingForm` is imported from TICKET-02's location, not
  duplicated.
- `npm run build` passes.

### Out of scope

- Actual form submission / backend wiring for any of the three forms.

---

## TICKET-04 — Admin Dashboard

**Source file:** `admin-dashboard.html`
**Route:** `src/app/(admin)/admin/dashboard/page.tsx` (replace
placeholder)

### Explicit requirements

- Header/hero: "Institutional Land Operations & Inventory."
- "Active Cadastral Discounts & Promo Engine" — 3 promo cards: Early-Bird
  Outright Settlement, Diaspora Easter Conveyance Waiver, Commercial
  Acreage Bulk Subsidies. Build `PromoCampaignCard` (new,
  `src/features/admin/components/`) using the `Card` primitive.
- "Active Landed Inventory & Allocation Ledger" — a data table of
  listings. Build `ListingsTable` (new, same folder) — columns should
  include at minimum: estate name, location, price, status, verification
  badge. Use the mock `Property[]` data from TICKET-01's `api.ts`.
- "Unresolved Buyer Inquiries & CRM" — a leads table. Build
  `InquiriesTable` (new, same folder). Since no inquiry data model exists
  yet, add an `Inquiry` type to `src/types/` (id, buyerName, contact,
  propertySlug, status, createdAt — check the source HTML for any
  additional columns shown) and a small mock array in a new
  `src/features/admin/api.ts`.
- "Conveyancing & Deeds Monitor" — a documents/payment tracking table.
  Build `DeedsMonitorTable` (new, same folder). Add whatever fields the
  source table actually shows as columns — read the HTML, don't guess.
- Two modal-triggered forms — build both as modals using the `Card`
  primitive with `elevation="modal"` (do not build a separate Modal
  primitive unless you check `components/ui/` first and confirm one
  doesn't exist):
  - **"Publish New Land Listing"** — this appears to be a *quick* version
    of the full flow in TICKET-05's `publish-property.html`. Fields:
    Estate Name / Development Title, Corridor Location, Topography / Soil
    Grade, Legal Title Deed (select), Plot Demarcation / SQM, Base Price
    (₦), Promo/Launch Price (optional), Upload Cadastral Survey Plan/Deed
    PDF (file input — stub the upload handler, no real storage
    integration this ticket). Note in your PR description that this
    overlaps with TICKET-05's full wizard — do not try to unify them in
    this ticket, just flag the overlap for a human decision.
  - **"Create Discount Campaign"** — Campaign Title, Discount Model
    (select), Discount Value, Eligible Estates (multi-select or
    checkboxes — check the source), Start Date, Expiry Date, "Auto-apply
    at pro-forma generation" checkbox.

### Files you will create / modify

- `src/app/(admin)/admin/dashboard/page.tsx` (modify)
- `src/features/admin/components/PromoCampaignCard.tsx` (create)
- `src/features/admin/components/ListingsTable.tsx` (create)
- `src/features/admin/components/InquiriesTable.tsx` (create)
- `src/features/admin/components/DeedsMonitorTable.tsx` (create)
- `src/features/admin/components/QuickPublishModal.tsx` (create)
- `src/features/admin/components/DiscountCampaignModal.tsx` (create)
- `src/features/admin/api.ts` (create)
- `src/types/inquiry.ts` (create)

### Acceptance criteria

- All three tables render mock data with correct columns per the source.
- Both modals open/close (local component state is fine — no routing
  needed for modal state).
- The PR description explicitly flags the Quick Publish / full wizard
  overlap with TICKET-05 as an open question for the reviewer.
- `npm run build` passes.

### Out of scope

- Reconciling the quick-publish modal with the full publish wizard
  (TICKET-05) — flag, don't resolve.
- Real file upload handling.

---

## TICKET-05 — Publish Property Wizard

**Source file:** `publish-property.html`
**Route:** `src/app/(admin)/admin/properties/new/page.tsx` (replace
placeholder)

This is the largest form in the prototype (31 inputs across what the
source renders as a 4-step flow) — do not attempt it as a single flat
form.

### Explicit requirements

Build a `PublishPropertyWizard` (new,
`src/features/admin/components/PublishPropertyWizard.tsx`) with a shared
step-shell showing progress across 4 steps, each a separate component in
`src/features/admin/components/publish-steps/`:

1. **`StepEstateIdentity`** — "Estate Identity & Statutory Corridor":
   Official Estate Title (required), Corridor/Regional Zone (required),
   Local Government Area (LGA), Development Phase & Allocation Urgency —
   4 tiles: PHASE 01 (Pegging & Clearing), PHASE 02 (Drainage &
   Gatehouse), PHASE 03 · READY (Immediate Physical Allocation), BANKING
   (Capital Land Banking). Reuse `TileRadioGroup` from TICKET-03 if it
   exists by the time this ticket starts; otherwise build it here and
   note in the PR that TICKET-03 should reuse it (check ticket order —
   coordinate with whichever ticket lands first).
2. **`StepDemarcation`** — "Demarcations, Topography & Infrastructure":
   Certified Topographical & Hydrological survey options — 100% Dry Table
   Land, Elevated Hilltop Ridge, Reclaimed & Compacted (tile choice, not
   checkboxes — read the source carefully, these render as single-select
   cards with descriptions, e.g. "Zero sandfilling e[xpense]..."),
   infrastructure checkboxes (Perimeter Fencing & Biometric Gate, Paved
   Interlocking Spine Road, Underground Hydraulic Drainage — there are
   more in the source, list them all).
3. **`StepLegalTitle`** — "Statutory Legal Title & Conveyancing Dossier":
   title type select + document upload fields. Read the source for the
   exact fields — the extraction pass on this page didn't capture this
   step's detail, so this section needs a careful direct read of the HTML.
4. **`StepFinancials`** — "Financial Valuation, Installments & Escrow":
   pricing and installment plan configuration. Same note — read the
   source directly for exact fields.

**Live preview panel:** the source shows a rendered example ("The
Sovereign Heritage Crest") functioning as a live preview of how the
listing will appear once published. Implement this by feeding the
in-progress form state into the existing `PropertyCard` component (from
TICKET-01) — this is a deliberate reuse point, don't build a separate
preview card.

**Success state:** "Listing Successfully Published!" — a confirmation
screen shown after the final step submits (mock submission — no real
persistence needed, just transition local wizard state to a "complete"
view).

### Files you will create / modify

- `src/app/(admin)/admin/properties/new/page.tsx` (modify)
- `src/features/admin/components/PublishPropertyWizard.tsx` (create)
- `src/features/admin/components/publish-steps/StepEstateIdentity.tsx`
  (create)
- `src/features/admin/components/publish-steps/StepDemarcation.tsx`
  (create)
- `src/features/admin/components/publish-steps/StepLegalTitle.tsx`
  (create)
- `src/features/admin/components/publish-steps/StepFinancials.tsx`
  (create)
- `src/features/admin/components/publish-steps/PublishSuccess.tsx`
  (create)

### Acceptance criteria

- All 4 steps navigable forward/back without losing entered data (lift
  wizard state to `PublishPropertyWizard`, pass down + up via props — this
  is a good test of whether the agent actually applied SRP or crammed
  state into one giant component).
- Live preview panel updates as fields are filled in, using the real
  `PropertyCard` component.
- PR description explicitly lists every field found in Steps 3 and 4
  (since the ticket couldn't fully specify them) so the reviewer can
  verify against the source HTML directly.
- `npm run build` passes.

### Out of scope

- Real submission/persistence.
- Reconciling with the Quick Publish modal from TICKET-04.

---

## TICKET-06 — About Page + Home Page Content Reconciliation

**Source files:** `about-us.html` and `index.html`
**Routes:** `src/app/(public)/about/page.tsx` (replace placeholder),
`src/app/(public)/page.tsx` (update — currently has placeholder hero copy)

### Explicit requirements

**About page:**

- "The Veritas Genesis: Why We Redefined Nigerian Real Estate" — narrative
  section.
- Feature pair: "GPS Cadastral Beacons" and "Zero Omo-Onile Guarantee" —
  read the source for their descriptions.
- "Our Sovereign Land Charter" / "Built Upon Unyielding Institutional
  Values" / "De-risking Land Ownership" / "Sub-Saharan Cadastral
  Standard" — "The Four Tenets" is a genuine sequence, numbering is
  appropriate here.
- "Leadership & Legal Advisory Board" — team grid: Arc. Babatunde
  Adeleke, Barr. Folashade Balogun (SAN), Engr. Chinedu Okafor, Zainab
  Al-Hassan (CFA). Read source for titles/bios. Build a `TeamMemberCard`
  (new, `src/features/about/components/`).
- "Institutional Affiliations & Statutory Compliance Seals" — logo strip;
  placeholder logos/text are fine if no real assets exist.

**Home page reconciliation:**

`index.html` runs its own bespoke color palette (documented as a known
deviation in `docs/design-system.md`'s "Open items" section) and has real
marketing copy that the current `src/app/(public)/page.tsx` placeholder
does not use. Read `index.html` directly and replace the placeholder
hero/sections with its actual copy and section structure, styled with the
canonical tokens from `theme.tokens.js` (not the page's own bespoke
palette — that palette is retired per the design system doc, not
migrated).

### Files you will create / modify

- `src/app/(public)/about/page.tsx` (modify)
- `src/app/(public)/page.tsx` (modify)
- `src/features/about/components/TeamMemberCard.tsx` (create)

### Acceptance criteria

- About page's copy matches `about-us.html` directly, not a paraphrase.
- Home page uses real copy from `index.html`, restyled with canonical
  tokens — reviewer should not be able to find any of `index.html`'s
  original bespoke hex values anywhere in the new code.
- `npm run build` passes.

### Out of scope

- Real team member photos (placeholder avatars are fine).
- Real partner/affiliation logos.

---

## TICKET-07 — Authentication (Frontend Scaffolding + Backend Wiring Contract)

See detailed specification in `docs/agents/TICKET-07-auth.md`.

### Explicit requirements

- Mock auth system: login, session check, logout, route-level protection on `/admin/*`, and permission-gated UI.
- Next.js BFF architecture: browser calls `/api/auth/*`, which sets an HttpOnly cookie (`vp_session`).
- Role definitions (`super_admin`, `agent`, `finance_docs`) and permission matrix (`permissions.config.ts`).
- Route protection at edge via `src/middleware.ts`.
- `<AuthProvider>` root context and `<RequirePermission>`, `useAuth()`, `usePermission()` hooks.
- `<AdminUserMenu />` integration into admin layout.
- Login form and minimal auth layout.

