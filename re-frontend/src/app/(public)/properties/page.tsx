"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Card, Field, Input, Select, Badge } from "@/components/ui";
import { getProperties } from "@/features/properties/api";
import { PropertyFilters } from "@/features/properties/components/PropertyFilters";
import { PropertyGrid } from "@/features/properties/components/PropertyGrid";
import { usePropertyFilters } from "@/features/properties/hooks/usePropertyFilters";
import type { Property } from "@/types/property";

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  useEffect(() => {
    getProperties().then((data) => {
      setProperties(data);
    });
  }, []);

  const {
    filters,
    filteredProperties,
    verificationCounts,
    setSearch,
    setCorridor,
    setTitleStatus,
    setSortBy,
    setPlotSizeTag,
    toggleUrgency,
    toggleVerification,
    setTopography,
    setMinPrice,
    setMaxPrice,
    toggleAmenity,
    togglePaymentTerm,
    resetFilters,
  } = usePropertyFilters(properties);

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Stubbed for future API wiring
    setNewsletterSubmitted(true);
  };

  const plotSizeTags = [
    { label: "All", value: "all" },
    { label: "300 SQM", value: "300" },
    { label: "500 SQM", value: "500" },
    { label: "600 SQM", value: "600" },
    { label: "1,000 SQM (Commercial)", value: "1000" },
    { label: "Acres & Hectares", value: "acres" },
  ];

  return (
    <div className="flex w-full flex-col">
      {/* Search & Breadcrumb Hero Strip */}
      <section className="w-full border-b border-border bg-surface-card py-8 px-4 md:px-6 lg:px-12">
        <div className="mx-auto flex max-w-container flex-col gap-6">
            {/* Top Meta Navigation & Breadcrumbs */}
            <div className="flex flex-wrap items-center justify-between gap-3 font-body text-label-md text-text-muted">
              <nav className="flex items-center gap-2">
                <Link href="/" className="transition-colors hover:text-primary flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-secondary">home</span>
                  <span>Home</span>
                </Link>
                <span>/</span>
                <Link href="/properties" className="transition-colors hover:text-primary">
                  Landed Properties
                </Link>
                <span>/</span>
                <span className="font-semibold text-primary">
                  All Listings ({filteredProperties.length} Verified Plots)
                </span>
              </nav>

              <div className="flex items-center gap-2 rounded-full bg-surface-tint px-3 py-1">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-verified opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-verified" />
                </span>
                <span className="font-body text-label-caps uppercase tracking-wider text-primary">
                  Lagos Alausa &bull; AGIS Abuja Audited
                </span>
              </div>
            </div>

            {/* Main Headline & Subtitle */}
            <div className="flex max-w-4xl flex-col gap-2">
              <h1 className="font-display text-headline-xl text-primary tracking-tight">
                Vetted Landed Properties Across Prime Nigerian Corridors
              </h1>
              <p className="font-body text-body-lg text-text-muted leading-relaxed">
                Every plot is title-verified with Alausa (Lagos) or AGIS (Abuja) search reports, zero
                omo-onile interference, and immediate physical beacon allocation backed by verifiable
                cadastral surveys.
              </p>
            </div>

            {/* Live Search & Interactive Filter Shell */}
            <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-4 shadow-1">
              {/* Top Controls Bar */}
              <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-12">
                {/* Search Bar */}
                <div className="md:col-span-4 relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-secondary text-base pointer-events-none">
                    search
                  </span>
                  <Input
                    id="estateSearchInput"
                    placeholder="Search estate name, corridor, beacon ID..."
                    type="text"
                    value={filters.search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Location Selector */}
                <div className="md:col-span-3 relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-primary text-base pointer-events-none">
                    location_on
                  </span>
                  <Select
                    id="corridorFilterSelect"
                    value={filters.corridor}
                    onChange={(e) => setCorridor(e.target.value)}
                    className="pl-10"
                  >
                    <option value="all">All Corridors (Nigeria)</option>
                    <option value="epe">Epe Expressway (Lagos)</option>
                    <option value="ibeju">Ibeju-Lekki Coastal Corridor</option>
                    <option value="guzape">Guzape &amp; Diplomatic Zone (Abuja)</option>
                    <option value="moniya">Moniya Dry Port Axis (Ibadan)</option>
                    <option value="alaro">Alaro City Special Economic Zone</option>
                  </Select>
                </div>

                {/* Title Status */}
                <div className="md:col-span-3 relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-verified text-base pointer-events-none">
                    verified_user
                  </span>
                  <Select
                    id="titleStatusSelect"
                    value={filters.titleStatus}
                    onChange={(e) => setTitleStatus(e.target.value)}
                    className="pl-10"
                  >
                    <option value="any">Any Sovereign Title</option>
                    <option value="consent">Governor&apos;s Consent (Freehold)</option>
                    <option value="coo">Certificate of Occupancy (C of O)</option>
                    <option value="gazette">Government Gazette</option>
                    <option value="excision">Registered Survey &amp; Excision</option>
                  </Select>
                </div>

                {/* Action Button */}
                <div className="md:col-span-2">
                  <Button
                    variant="primary"
                    className="w-full flex items-center justify-center gap-1.5"
                    type="button"
                    onClick={() => {}}
                  >
                    <span className="material-symbols-outlined text-base">tune</span>
                    <span>Find Plots</span>
                  </Button>
                </div>
              </div>

            {/* Secondary Filter Ribbons & View Modes */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              {/* Plot Quick Tags */}
              <div className="flex flex-wrap items-center gap-2 font-body text-label-md">
                <span className="font-body text-label-caps uppercase tracking-wider text-text-muted">
                  Plot Size:
                </span>
                {plotSizeTags.map((tag) => {
                  const isActive = filters.plotSizeTag === tag.value;
                  return (
                    <button
                      key={tag.value}
                      type="button"
                      onClick={() => setPlotSizeTag(tag.value)}
                      className={`rounded-full px-3 py-1 transition-colors ${
                        isActive
                          ? "bg-primary text-white shadow-1"
                          : "bg-surface-card text-text-primary border border-border hover:bg-surface-tint"
                      }`}
                    >
                      {tag.label}
                    </button>
                  );
                })}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span className="font-body text-label-caps uppercase text-text-muted">
                  Sort by:
                </span>
                <Select
                  value={filters.sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="py-1 px-3"
                >
                  <option value="featured">Featured / Verified First</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="roi">Projected Annual ROI %</option>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Main Layout (Split View: Sidebar Filters + Property Cards) */}
      <section className="w-full py-12 px-4 md:px-6 lg:px-12">
        <div className="mx-auto grid max-w-container grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Left Sidebar Filters */}
          <div className="lg:col-span-4 xl:col-span-3">
            <PropertyFilters
              filters={filters}
              verificationCounts={verificationCounts}
              onToggleUrgency={toggleUrgency}
              onToggleVerification={toggleVerification}
              onSetTopography={setTopography}
              onSetMinPrice={setMinPrice}
              onSetMaxPrice={setMaxPrice}
              onToggleAmenity={toggleAmenity}
              onTogglePaymentTerm={togglePaymentTerm}
              onReset={resetFilters}
            />
          </div>

          {/* Main Content: Property Grid */}
          <div className="flex flex-col gap-6 lg:col-span-8 xl:col-span-9">
            {/* Marketplace Summary Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-surface-card p-4 shadow-1">
              <div className="flex items-center gap-2">
                <Badge variant="verified-cofo">
                  {filteredProperties.length} PLOTS
                </Badge>
                <span className="font-body text-body-sm text-text-muted">
                  Showing 1 - {filteredProperties.length} of vetted institutional allocations
                </span>
              </div>
              <div className="flex items-center gap-2 font-body text-label-md text-text-muted">
                <span className="font-semibold text-verified">
                  &bull; 100% Freehold Cadastral Guarantee
                </span>
              </div>
            </div>

            {/* Property Grid */}
            <PropertyGrid properties={filteredProperties} />

            {/* Pagination / Direct Navigation Component */}
            <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-border bg-surface-card p-4 shadow-1 sm:flex-row">
              <span className="font-body text-body-sm text-text-muted">
                Displaying <strong className="font-semibold text-primary">1 - {filteredProperties.length}</strong> of{" "}
                <strong className="font-semibold text-primary">{filteredProperties.length}</strong> active institutional plots
              </span>
              <div className="flex items-center gap-1">
                <Button variant="secondary" size="sm" disabled className="flex items-center justify-center p-2">
                  <span className="material-symbols-outlined text-base">arrow_back</span>
                </Button>
                <Button variant="primary" size="sm">
                  1
                </Button>
                <Button variant="secondary" size="sm" disabled className="flex items-center justify-center p-2">
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Title Verification & Trust Reassurance Ribbon */}
      <section className="w-full border-t border-border bg-primary py-12 px-4 text-white md:px-6 lg:px-12">
        <div className="mx-auto flex max-w-container flex-col items-center justify-between gap-6 lg:flex-row">
          <div className="flex max-w-2xl flex-col gap-2">
            <div className="flex items-center gap-2">
              <h3 className="font-display text-headline-sm text-white">
                Need an Independent Legal Title Search?
              </h3>
              <span className="rounded bg-surface-tint-strong px-2 py-0.5 font-body text-label-caps uppercase text-primary">
                48-Hr Turnaround
              </span>
            </div>
            <p className="font-body text-body-sm text-surface-tint leading-relaxed">
              Our accredited in-house conveyancing solicitors deliver certified Alausa Lands Bureau or
              AGIS (Abuja) search reports directly before you transfer a single kobo or dollar. Zero
              commitments required.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button variant="secondary" className="w-full">
                Request Title Dossier
              </Button>
            </Link>
            <a
              href="https://wa.me/2348000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button variant="verified" className="w-full">
                Diaspora Hotline
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter Signup: Diaspora Dispatch */}
      <section className="w-full border-t border-border bg-surface-card py-12 px-4 md:px-6 lg:px-12">
        <div className="mx-auto grid max-w-container grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Badge variant="verified-gazette" className="mb-2">
              Institutional Land Safeguard
            </Badge>
            <h3 className="font-display text-headline-lg text-primary">
              Join the Prison Gihon Diaspora Dispatch
            </h3>
            <p className="mt-2 max-w-xl font-body text-body-md text-text-muted">
              Receive audited cadastral layout releases, Alausa land index briefings, and claim your
              exclusive ₦100,000 complimentary physical or drone-survey inspection voucher.
            </p>
          </div>

          <div className="lg:col-span-5">
            {newsletterSubmitted ? (
              <div className="rounded-lg border border-border bg-surface-tint p-4 text-center">
                <p className="font-display text-label-lg font-bold text-primary">
                  Voucher Claimed!
                </p>
                <p className="font-body text-body-sm text-text-muted mt-1">
                  Check your inbox for your ₦100,000 complimentary inspection voucher.
                </p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3 sm:flex-row">
                <div className="flex-1">
                  <Input
                    type="email"
                    required
                    placeholder="Enter institutional or corporate email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                  />
                </div>
                <Button type="submit" variant="primary">
                  Claim ₦100K Voucher
                </Button>
              </form>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-3 font-body text-label-caps text-text-muted">
              <span>RC: 1849204</span>
              <span>&bull;</span>
              <span>EFCC SCUML Certified</span>
              <span>&bull;</span>
              <span>Bank-Grade Escrow Protection</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
