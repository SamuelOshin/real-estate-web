import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge, Button, Card, VerificationBadge } from "@/components/ui";
import { formatNaira } from "@/lib/utils/format";
import { getProperties, getPropertyBySlug } from "@/features/properties/api";
import { PropertyGallery } from "@/features/properties/components/PropertyGallery";
import { SpecSheet } from "@/features/properties/components/SpecSheet";
import { AmenitiesGrid } from "@/features/properties/components/AmenitiesGrid";
import { PropertyCard } from "@/features/properties/components/PropertyCard";
import { InspectionBookingForm } from "@/features/inquiries/components/InspectionBookingForm";
import { FadeInWhenVisible, StaggerContainer, StaggerItem } from "@/components/motion";

export async function generateStaticParams() {
  const properties = await getProperties();
  return properties.map((property) => ({
    slug: property.slug,
  }));
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const allProperties = await getProperties();
  const similarProperties = allProperties.filter((p) => p.id !== property.id).slice(0, 3);

  // Extract location name for templating the narrative heading
  // TODO(agent): Note that this narrative content and proximity index should be data-driven per-property.
  const locationName = property.location.state === "Abuja FCT" ? "Abuja" : "Epe";

  return (
    <div className="flex w-full flex-col">
      {/* Breadcrumb Navigation Bar */}
      <section className="w-full border-b border-border bg-surface-card py-3 px-4 md:px-6 lg:px-12 shadow-sm">
        <div className="mx-auto max-w-container">
          <nav className="flex flex-wrap items-center gap-2 font-body text-label-md text-text-muted">
            <Link href="/" className="transition-colors hover:text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-secondary">home</span>
              <span>Home</span>
            </Link>
            <span className="material-symbols-outlined text-xs text-text-muted">chevron_right</span>
            <Link href="/properties" className="transition-colors hover:text-primary">
              Lagos Corridors
            </Link>
            <span className="material-symbols-outlined text-xs text-text-muted">chevron_right</span>
            <Link href="/properties" className="transition-colors hover:text-primary">
              Epe Expressway
            </Link>
            <span className="material-symbols-outlined text-xs text-text-muted">chevron_right</span>
            <span className="font-bold text-primary">{property.title}</span>
          </nav>
        </div>
      </section>

      {/* Property Header & Verification Seals */}
      <section className="w-full border-b border-border bg-surface py-6 px-4 md:px-6 lg:px-12">
        <div className="mx-auto max-w-container">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-tint px-3 py-0.5 font-body text-label-caps uppercase tracking-wider text-primary">
                  <span className="material-symbols-outlined text-[15px] text-verified">verified</span>
                  <span>
                    Lagos State Lands Registry Validated (
                    {property.registrationRef || "Alausa Search Ref: LND-EP-2024-8842"})
                  </span>
                </span>
                <VerificationBadge status={property.verification.status} />
                <Badge variant="neutral">
                  <span className="material-symbols-outlined text-[13px]">shield</span>
                  <span>Zero Omo-Onile Guarantee</span>
                </Badge>
                <Badge variant="verified-cofo">
                  <span className="material-symbols-outlined text-[13px]">domain</span>
                  <span>{property.allocationUrgency || "Ready to Build"}</span>
                </Badge>
              </div>

              <h1 className="font-display text-headline-xl font-extrabold tracking-tight text-primary">
                {property.title} {property.subtitle && `\u2022 ${property.subtitle}`}
              </h1>

              <div className="flex flex-wrap items-center gap-4 font-body text-body-sm text-text-muted">
                <span className="font-medium text-secondary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">location_on</span>
                  <span>{property.location.area}</span>
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-secondary">explore</span>
                  <span>Cadastral GPS: {property.coordinates?.formatted || "Lat 6.5824° N, Long 3.9821° E"}</span>
                </span>
                <span>&bull;</span>
                <span className="font-semibold text-verified flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">landscape</span>
                  <span>{property.beaconsPlantedCount || 184} Cadastral Beacons Planted &bull; Physical Instant Allocation</span>
                </span>
              </div>
            </div>

            {/* Pricing Anchor */}
            <div className="flex min-w-[240px] flex-col items-start rounded-xl border border-border bg-surface-card p-4 shadow-1 sm:items-end">
              <span className="font-body text-label-caps uppercase tracking-wider text-text-muted">
                Outright Investment Price
              </span>
              <div className="my-1 font-display text-headline-xl font-extrabold text-primary leading-none">
                {formatNaira(property.priceNgn)}
              </div>
              <div className="flex items-center gap-2 font-body text-label-md text-text-muted">
                <span>&asymp; ${property.priceUsdEquivalent?.toLocaleString() || "11,800"} USD</span>
                <span>&bull;</span>
                <span className="font-semibold text-verified">
                  All-Inclusive Title &amp; Dev Levy
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* High-Fidelity Media & Architectural Gallery */}
      <section className="w-full bg-surface py-6 px-4 md:px-6 lg:px-12">
        <div className="mx-auto max-w-container">
          <PropertyGallery media={property.media} title={property.title} />
        </div>
      </section>

      {/* Main Content Body (Dossier 65% / Sticky Hub 35%) */}
      <section className="w-full py-8 px-4 md:px-6 lg:px-12 bg-surface">
        <div className="mx-auto grid max-w-container grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Left Column: Comprehensive Land Dossier (8 cols) */}
          <div className="flex flex-col gap-8 lg:col-span-8">
            {/* Key Estate Specifications */}
            <SpecSheet property={property} />

            {/* Structured Acquisition & Payment Options */}
            <div className="rounded-xl border border-border bg-surface-card p-6 shadow-1">
              <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                  <span className="font-body text-label-caps uppercase tracking-wider text-secondary">
                    Transparent Escrow Model
                  </span>
                  <h3 className="font-display text-headline-md font-bold text-primary">
                    Structured Acquisition &amp; Payment Options
                  </h3>
                </div>
                <Badge variant="verified-cofo">Zero Hidden Developmental Charges</Badge>
              </div>

              {/* Price Tier Cards */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Outright Plan */}
                <div className="relative flex flex-col justify-between rounded-xl border-2 border-primary bg-surface p-4 shadow-1">
                  <div className="absolute top-0 right-0 rounded-bl-lg bg-primary px-2.5 py-0.5 font-body text-label-caps uppercase text-white">
                    Best Value
                  </div>
                  <div>
                    <span className="font-body text-label-caps uppercase font-bold text-secondary">
                      Outright Capital
                    </span>
                    <div className="my-2 font-display text-price-display font-extrabold text-primary leading-none">
                      {formatNaira(property.priceNgn)}
                    </div>
                    <p className="mb-3 font-body text-body-sm text-text-muted">
                      One-off single allocation. Immediate Deed of Assignment execution &amp; beacon
                      erection.
                    </p>
                    <ul className="mb-4 space-y-2 font-body text-body-sm text-text-primary">
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-verified">check_circle</span>
                        <span>Deed of Assignment inclusive</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-verified">check_circle</span>
                        <span>Registered Survey Plan inclusive</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-verified">check_circle</span>
                        <span>Corner-piece reservation free</span>
                      </li>
                    </ul>
                  </div>
                  <a href="#diaspora-inspection-hub">
                    <Button variant="primary" className="w-full">
                      Select Outright
                    </Button>
                  </a>
                </div>

                {/* 6 Months Installment */}
                <div className="flex flex-col justify-between rounded-xl border border-border bg-surface p-4 shadow-1">
                  <div>
                    <span className="font-body text-label-caps uppercase font-bold text-text-muted">
                      6-Month Structured
                    </span>
                    <div className="my-2 font-display text-price-display font-extrabold text-primary leading-none">
                      ₦3,200,000{" "}
                      <span className="font-body text-body-sm text-text-muted font-normal">
                        /mo
                      </span>
                    </div>
                    <p className="mb-3 font-body text-body-sm text-text-muted">
                      Total: ₦19,200,000. Balance distributed across 6 equal automated monthly
                      disbursements.
                    </p>
                    <ul className="mb-4 space-y-2 font-body text-body-sm text-text-primary">
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-primary">check</span>
                        <span>₦2,000,000 initial commitment</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-primary">check</span>
                        <span>6 equal monthly tranches</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-primary">check</span>
                        <span>Plot allocation at 60% payment</span>
                      </li>
                    </ul>
                  </div>
                  <a href="#diaspora-inspection-hub">
                    <Button variant="secondary" className="w-full">
                      Select 6-Month Plan
                    </Button>
                  </a>
                </div>

                {/* 12 Months Diaspora Plan */}
                <div className="flex flex-col justify-between rounded-xl border border-border bg-surface p-4 shadow-1">
                  <div>
                    <span className="font-body text-label-caps uppercase font-bold text-text-muted">
                      12-Month Structured
                    </span>
                    <div className="my-2 font-display text-price-display font-extrabold text-primary leading-none">
                      ₦1,750,000{" "}
                      <span className="font-body text-body-sm text-text-muted font-normal">
                        /mo
                      </span>
                    </div>
                    <p className="mb-3 font-body text-body-sm text-text-muted">
                      Total: ₦21,000,000. Long-term capital flexibility with dedicated escrow
                      monitoring.
                    </p>
                    <ul className="mb-4 space-y-2 font-body text-body-sm text-text-primary">
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-primary">check</span>
                        <span>₦1,850,000 initial commitment</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-primary">check</span>
                        <span>Direct USD/GBP escrow locks</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-primary">check</span>
                        <span>Quarterly video progress logs</span>
                      </li>
                    </ul>
                  </div>
                  <a href="#diaspora-inspection-hub">
                    <Button variant="secondary" className="w-full">
                      Select 12-Month Plan
                    </Button>
                  </a>
                </div>
              </div>

              {/* Transparency Guarantee */}
              <div className="mt-4 flex flex-col justify-between gap-2 rounded-lg bg-surface-tint p-3 sm:flex-row sm:items-center">
                <span className="font-body text-body-sm text-text-primary font-medium">
                  All fees fully disclosed up front. Zero corner-piece surcharges or unplanned
                  drainage levy.
                </span>
                <span className="font-body text-label-caps uppercase font-bold text-secondary">
                  Prison Gihon Clean Escrow Guarantee
                </span>
              </div>
            </div>

            {/* Strategic Investment Narrative & Corridor Value Proposition */}
            <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface-card p-6 shadow-1">
              <div>
                <span className="font-body text-label-caps uppercase tracking-wider text-secondary">
                  Macro Corridors of Prosperity
                </span>
                <h3 className="font-display text-headline-md font-bold text-primary">
                  Why Institutional Capital is Aggressively Entering {locationName}
                </h3>
              </div>

              <p className="font-body text-body-md text-text-muted leading-relaxed">
                Situated directly along the widened 6-lane Epe-Itokin expressway expansion and just
                5 minutes east of the bustling{" "}
                <strong className="text-text-primary">Alaro City Industrial District</strong>, The
                Grand Crest Estate stands at the nexus of Lagos State&apos;s most rapid
                infrastructural transformation. The location affords strategic proximity to the
                upcoming{" "}
                <strong className="text-text-primary">
                  Lekki International Airport (Ibeju-Lekki Axis)
                </strong>{" "}
                and the multibillion-dollar{" "}
                <strong className="text-text-primary">
                  Dangote Refinery &amp; Petrochemical Hub
                </strong>
                .
              </p>

              <div className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-2">
                <div className="rounded-lg border border-border bg-surface p-4">
                  <div className="font-display text-headline-sm font-bold text-primary">
                    42.8% Annualized Appreciation
                  </div>
                  <p className="mt-1 font-body text-body-sm text-text-muted">
                    Validated historical capital gain in Epe along serviced arterial layouts between
                    2021 and 2025.
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-surface p-4">
                  <div className="font-display text-headline-sm font-bold text-primary">
                    12 Mins to New Lekki Airport
                  </div>
                  <p className="mt-1 font-body text-body-sm text-text-muted">
                    Direct access to the projected 3,500-hectare passenger and cargo aviation gateway.
                  </p>
                </div>
              </div>

              {/* Corridor Proximity Index */}
              <div className="flex flex-col gap-3 rounded-xl bg-primary p-4 text-white">
                <div className="flex items-center justify-between">
                  <span className="font-body text-label-caps uppercase tracking-wider text-surface-tint">
                    Corridor Proximity Index
                  </span>
                  <span className="font-body text-label-caps uppercase text-surface-tint">
                    Verified Speed Distances
                  </span>
                </div>

                <div className="space-y-3 font-body text-body-sm">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Alaro City Multi-Door Commercial Center</span>
                      <span className="font-bold text-surface-tint">5 Mins &bull; 4.2 KM</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-primary-hover overflow-hidden">
                      <div className="h-full w-[92%] rounded-full bg-secondary" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Augustine University &amp; Atlantic Hall</span>
                      <span className="font-bold text-surface-tint">7 Mins &bull; 6.8 KM</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-primary-hover overflow-hidden">
                      <div className="h-full w-[82%] rounded-full bg-secondary" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Lekki Free Zone, Deep Sea Port &amp; Dangote Hub</span>
                      <span className="font-bold text-surface-tint">20 Mins &bull; 19.5 KM</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-primary-hover overflow-hidden">
                      <div className="h-full w-[64%] rounded-full bg-secondary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Serviced Infrastructure & Planned Amenities */}
            <AmenitiesGrid />

            {/* Legal Title & Alausa Registration Dossier */}
            <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface-card p-6 shadow-1">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                  <span className="font-body text-label-caps uppercase tracking-wider text-secondary">
                    Uncompromising Veracity
                  </span>
                  <h3 className="font-display text-headline-md font-bold text-primary">
                    Legal Title &amp; Alausa Registration Dossier
                  </h3>
                </div>
                <Badge variant="verified-cofo">Audit Verified Title</Badge>
              </div>

              <div className="rounded-xl border border-border bg-surface p-4 space-y-3">
                <div>
                  <h4 className="font-display text-headline-sm font-bold text-primary">
                    Governor&apos;s Consent Freehold Assurance
                  </h4>
                  <p className="mt-1 font-body text-body-sm text-text-muted leading-relaxed">
                    The property has completed thorough gazette perfection and holds a valid
                    Governor&apos;s Consent under Lagos State Lands Registry volume records. The title
                    is 100% devoid of government acquisition or pending agricultural easements.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 pt-2">
                  <div className="rounded-lg border border-border bg-surface-card p-3">
                    <span className="font-body text-label-caps uppercase text-text-muted">
                      Deed Instrument
                    </span>
                    <p className="font-display text-label-lg font-bold text-primary mt-1">
                      Governor&apos;s Consent
                    </p>
                    <span className="font-body text-body-sm text-text-muted">
                      State Reg. No: 44/44/2022E
                    </span>
                  </div>
                  <div className="rounded-lg border border-border bg-surface-card p-3">
                    <span className="font-body text-label-caps uppercase text-text-muted">
                      Surveyor General Plan
                    </span>
                    <p className="font-display text-label-lg font-bold text-primary mt-1">
                      Plan Ref: LS/D/EP/8119
                    </p>
                    <span className="font-body text-body-sm text-text-muted">
                      Red Copy Lodged
                    </span>
                  </div>
                  <div className="rounded-lg border border-border bg-surface-card p-3">
                    <span className="font-body text-label-caps uppercase text-text-muted">
                      Deed Execution
                    </span>
                    <p className="font-display text-label-lg font-bold text-primary mt-1">
                      Institutional Solicitors
                    </p>
                    <span className="font-body text-body-sm text-text-muted">
                      Notary Public Certified
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-between gap-3 sm:flex-row pt-2">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button variant="primary" className="w-full sm:w-auto">
                    Request Alausa Title Search Dossier
                  </Button>
                </Link>
                <span className="font-body text-body-sm text-text-muted">
                  Instant PDF download available to verified users
                </span>
              </div>
            </div>

            {/* Cadastral Location & Satellite Beacon Grid */}
            <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface-card p-6 shadow-1">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-body text-label-caps uppercase tracking-wider text-secondary">
                    Geographic Cartography
                  </span>
                  <h3 className="font-display text-headline-md font-bold text-primary">
                    Cadastral Location &amp; Satellite Beacon Grid
                  </h3>
                </div>
                <span className="rounded bg-surface-tint px-3 py-1 font-body text-label-md font-semibold text-primary">
                  Epe Sector 4
                </span>
              </div>
              <p className="font-body text-body-sm text-text-muted">
                Explore the direct perimeter boundaries and road corridors surrounding{" "}
                {property.title} below.
              </p>
              {/* Map Placeholder */}
              <div className="relative flex h-80 w-full items-center justify-center rounded-xl border border-border bg-surface-tint p-6 text-center shadow-inner">
                <div className="flex flex-col items-center gap-2">
                  <span className="material-symbols-outlined text-4xl text-secondary">
                    map
                  </span>
                  <span className="rounded-full bg-surface-card px-4 py-1.5 font-display text-headline-sm font-bold text-primary shadow-1">
                    Cadastral Map Blueprint
                  </span>
                  <p className="font-body text-body-sm text-text-muted">
                    {property.location.area}
                  </p>
                  <span className="rounded bg-surface-card px-3 py-1 font-mono text-body-sm text-secondary shadow-sm">
                    Coordinates: {property.coordinates?.formatted || "6.5824° N, 3.9821° E"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Reservation & Inspection Booking Hub (4 cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <InspectionBookingForm property={property} />
          </div>
        </div>
      </section>

      {/* Similar Properties Section */}
      <section className="w-full border-t border-border bg-surface py-12 px-4 md:px-6 lg:px-12">
        <div className="mx-auto max-w-container">
          <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <span className="font-body text-label-caps uppercase tracking-wider text-secondary">
                Strategic Comparison
              </span>
              <h2 className="font-display text-headline-xl font-bold text-primary">
                Similar Verified Properties in {locationName} &amp; Lekki Corridor
              </h2>
              <p className="mt-1 font-body text-body-md text-text-muted">
                All selections hold perfected title papers and institutional cadastral beacon
                verification.
              </p>
            </div>
            <Link
              href="/properties"
              className="font-body text-label-lg font-semibold text-secondary hover:underline flex items-center gap-1"
            >
              <span>View All Inventory</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>

          <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {similarProperties.map((simProp) => (
              <StaggerItem key={simProp.id}>
                <PropertyCard property={simProp} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Mobile Fixed Quick Reservation Bar (< 768px) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between gap-4 border-t border-border bg-surface-card/95 p-3 shadow-2 backdrop-blur-xl md:hidden">
        <div className="flex flex-col">
          <span className="font-body text-label-caps uppercase text-text-muted">
            {property.title} &bull; {property.plotSizeSqm} SQM
          </span>
          <span className="font-display text-headline-sm font-bold text-primary leading-none">
            {formatNaira(property.priceNgn)}
          </span>
        </div>
        <a href="#diaspora-inspection-hub">
          <Button variant="secondary" size="sm">
            Book Inspection
          </Button>
        </a>
      </div>
    </div>
  );
}
