"use client";

import Link from "next/link";
import { Card, Input } from "@/components/ui";
import type { PropertyFilterState } from "../hooks/usePropertyFilters";

export interface PropertyFiltersProps {
  filters: PropertyFilterState;
  verificationCounts: {
    "Governor's Consent": number;
    "Certificate of Occupancy": number;
    "Government Gazette": number;
    "Registered Survey & Excision": number;
  };
  onToggleUrgency: (urgency: string) => void;
  onToggleVerification: (verification: string) => void;
  onSetTopography: (topography: string) => void;
  onSetMinPrice: (min: string) => void;
  onSetMaxPrice: (max: string) => void;
  onToggleAmenity: (amenity: string) => void;
  onTogglePaymentTerm: (term: string) => void;
  onReset: () => void;
}

const urgencyOptions = [
  "Ready to Build (Immediate Allocation)",
  "Fast Developing (Ongoing Paving)",
  "Capital Appreciation (Land Bank)",
  "Pre-Launch Off-Plan Special",
];

const verificationOptions: Array<keyof PropertyFiltersProps["verificationCounts"]> = [
  "Governor's Consent",
  "Certificate of Occupancy",
  "Government Gazette",
  "Registered Survey & Excision",
];

const topographyOptions = [
  "100% Dry Table Land",
  "Sandfilled / Bermed Table",
  "Hilltop Panoramic View (Abuja)",
  "Level Grade Plateau",
];

const amenityOptions = [
  "Perimeter Wall & Gatehouse",
  "Paved Asphalt Access Roads",
  "Underground Drainage Scheme",
  "Dedicated Transformer & Power",
  "24/7 Armed Security & CCTV",
];

const paymentOptions = [
  "Outright with Discount (5-10%)",
  "6 Months 0% Interest Spread",
  "12 Months Structured Amortization",
  "24 Months Diaspora Escrow Plan",
];

export function PropertyFilters({
  filters,
  verificationCounts,
  onToggleUrgency,
  onToggleVerification,
  onSetTopography,
  onSetMinPrice,
  onSetMaxPrice,
  onToggleAmenity,
  onTogglePaymentTerm,
  onReset,
}: PropertyFiltersProps) {
  return (
    <aside className="sticky top-28 flex w-full flex-col gap-6 rounded-xl border border-border bg-surface-card p-6 shadow-1">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-base">tune</span>
          <h3 className="font-display text-headline-sm font-bold text-primary">Filter Properties</h3>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="font-body text-label-md text-secondary hover:underline"
        >
          Reset All
        </button>
      </div>

      {/* Allocation Urgency / Development Timeline */}
      <div className="flex flex-col gap-2">
        <span className="font-body text-label-caps uppercase tracking-wider text-text-muted">
          Development Timeline
        </span>
        <div className="flex flex-col gap-2 font-body text-body-sm text-text-primary">
          {urgencyOptions.map((urgency) => (
            <label
              key={urgency}
              className="flex cursor-pointer items-center gap-2 transition-colors hover:text-primary"
            >
              <input
                type="checkbox"
                checked={filters.urgencies.includes(urgency)}
                onChange={() => onToggleUrgency(urgency)}
                className="h-4 w-4 rounded accent-primary cursor-pointer"
              />
              <span>{urgency}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Title Classification */}
      <div className="flex flex-col gap-2">
        <span className="font-body text-label-caps uppercase tracking-wider text-text-muted">
          Title Classification
        </span>
        <div className="flex flex-col gap-2 font-body text-body-sm text-text-primary">
          {verificationOptions.map((status) => (
            <label
              key={status}
              className="flex cursor-pointer items-center justify-between transition-colors hover:text-primary"
            >
              <span className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.verifications.includes(status)}
                  onChange={() => onToggleVerification(status)}
                  className="h-4 w-4 rounded accent-primary cursor-pointer"
                />
                <span>{status}</span>
              </span>
              <span className="rounded bg-surface-tint px-2 py-0.5 font-body text-label-caps text-text-muted">
                {verificationCounts[status]}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Topography & Soil Type */}
      <div className="flex flex-col gap-2">
        <span className="font-body text-label-caps uppercase tracking-wider text-text-muted">
          Topography &amp; Soil Type
        </span>
        <div className="flex flex-col gap-2 font-body text-body-sm text-text-primary">
          {topographyOptions.map((topo) => (
            <label
              key={topo}
              className="flex cursor-pointer items-center gap-2 transition-colors hover:text-primary"
            >
              <input
                type="radio"
                name="topography"
                checked={filters.topography === topo}
                onChange={() => onSetTopography(filters.topography === topo ? "all" : topo)}
                onClick={() => {
                  if (filters.topography === topo) {
                    onSetTopography("all");
                  }
                }}
                className="h-4 w-4 accent-primary cursor-pointer"
              />
              <span>{topo}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Slider & Numeric Inputs */}
      <div className="flex flex-col gap-2">
        <span className="font-body text-label-caps uppercase tracking-wider text-text-muted">
          Budget (₦ Nigerian Naira)
        </span>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="filter-min-price" className="block font-body text-body-sm text-text-muted">
              Min (₦)
            </label>
            <Input
              id="filter-min-price"
              type="text"
              placeholder="3,000,000"
              value={filters.minPrice}
              onChange={(e) => onSetMinPrice(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="filter-max-price" className="block font-body text-body-sm text-text-muted">
              Max (₦)
            </label>
            <Input
              id="filter-max-price"
              type="text"
              placeholder="120,000,000"
              value={filters.maxPrice}
              onChange={(e) => onSetMaxPrice(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      {/* Verified Infrastructure Amenities */}
      <div className="flex flex-col gap-2">
        <span className="font-body text-label-caps uppercase tracking-wider text-text-muted">
          Verified Infrastructure
        </span>
        <div className="flex flex-col gap-2 font-body text-body-sm text-text-primary">
          {amenityOptions.map((amenity) => (
            <label
              key={amenity}
              className="flex cursor-pointer items-center gap-2 transition-colors hover:text-primary"
            >
              <input
                type="checkbox"
                checked={filters.amenities.includes(amenity)}
                onChange={() => onToggleAmenity(amenity)}
                className="h-4 w-4 rounded accent-primary cursor-pointer"
              />
              <span>{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Payment Structured Terms */}
      <div className="flex flex-col gap-2">
        <span className="font-body text-label-caps uppercase tracking-wider text-text-muted">
          Payment Structured Terms
        </span>
        <div className="flex flex-col gap-2 font-body text-body-sm text-text-primary">
          {paymentOptions.map((term) => (
            <label
              key={term}
              className="flex cursor-pointer items-center gap-2 transition-colors hover:text-primary"
            >
              <input
                type="checkbox"
                checked={filters.paymentTerms.includes(term)}
                onChange={() => onTogglePaymentTerm(term)}
                className="h-4 w-4 rounded accent-primary cursor-pointer"
              />
              <span>{term}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Instant Advisory CTA Box */}
      <Card elevation="flat" padding="sm" className="bg-surface-tint border-border">
        <div className="flex flex-col gap-1.5">
          <p className="font-display text-label-lg font-bold text-primary">Custom Acquisition?</p>
          <p className="font-body text-body-sm text-text-muted">
            Looking for 5+ hectares for industrial, farming or estate development?
          </p>
          <Link
            href="/contact"
            className="mt-1 font-body text-label-md font-semibold text-secondary hover:underline flex items-center gap-1"
          >
            <span>Speak to Institutional Desk</span>
            <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
          </Link>
        </div>
      </Card>
    </aside>
  );
}
