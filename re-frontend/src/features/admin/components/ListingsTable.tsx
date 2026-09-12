"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatNaira } from "@/lib/utils/format";
import type { Property } from "@/types/property";

export interface ListingsTableProps {
  initialProperties: Property[];
}

type LocalStatus = "available" | "reserved" | "sold";

export function ListingsTable({ initialProperties }: ListingsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [corridorFilter, setCorridorFilter] = useState("all");
  const [titleFilter, setTitleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Local state for live status updates by operators
  const [propertyStatuses, setPropertyStatuses] = useState<Record<string, LocalStatus>>(() => {
    const map: Record<string, LocalStatus> = {};
    initialProperties.forEach((p, idx) => {
      // Map initial status for realism matching prototype
      if (idx === 1) map[p.id] = "reserved";
      else if (idx === 2 || idx === 4) map[p.id] = "sold";
      else map[p.id] = "available";
    });
    return map;
  });

  const handleStatusChange = (id: string, newStatus: LocalStatus) => {
    setPropertyStatuses((prev) => ({
      ...prev,
      [id]: newStatus,
    }));
  };

  const filteredProperties = useMemo(() => {
    return initialProperties.filter((property) => {
      const currentStatus = propertyStatuses[property.id] || "available";

      // Search match
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        !term ||
        property.title.toLowerCase().includes(term) ||
        property.location.area.toLowerCase().includes(term) ||
        property.verification.label.toLowerCase().includes(term) ||
        (property.beaconId && property.beaconId.toLowerCase().includes(term));

      // Corridor match
      const matchesCorridor =
        corridorFilter === "all" ||
        property.corridor?.toLowerCase() === corridorFilter.toLowerCase() ||
        property.location.area.toLowerCase().includes(corridorFilter.toLowerCase());

      // Title match
      const matchesTitle =
        titleFilter === "all" ||
        (titleFilter === "gov_consent" && property.verification.label.includes("Consent")) ||
        (titleFilter === "c_of_o" && property.verification.status === "c_of_o") ||
        (titleFilter === "gazette" && property.verification.status === "gazette_excision") ||
        (titleFilter === "survey" && property.verification.status === "freehold_survey");

      // Status match
      const matchesStatus =
        statusFilter === "all" || currentStatus === statusFilter;

      return matchesSearch && matchesCorridor && matchesTitle && matchesStatus;
    });
  }, [initialProperties, searchTerm, corridorFilter, titleFilter, statusFilter, propertyStatuses]);

  return (
    <div className="space-y-4">
      {/* Controls & Filter Bar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-headline-md text-text-primary font-bold tracking-tight">
            Active Landed Inventory &amp; Allocation Ledger
          </h2>
          <p className="font-body text-body-sm text-text-muted">
            Real-time cadastral allocations, governor-stamped title deeds, and live diaspora booking statuses.
          </p>
        </div>

        {/* Filters Ribbon */}
        <div className="flex flex-wrap items-center gap-2 w-full xl:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 sm:flex-initial min-w-[200px]">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-text-muted text-base pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Plot, Estate, Title..."
              className="w-full pl-9 pr-3 py-2 bg-surface-tint border border-border rounded-lg text-body-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-secondary transition-colors"
            />
          </div>

          {/* Corridor Dropdown */}
          <select
            value={corridorFilter}
            onChange={(e) => setCorridorFilter(e.target.value)}
            className="flex-1 sm:flex-initial px-3 py-2 bg-surface-tint border border-border rounded-lg text-body-sm text-text-primary font-semibold focus:outline-none focus:border-secondary cursor-pointer"
          >
            <option value="all">All Corridors (Lagos &bull; FCT &bull; Oyo)</option>
            <option value="epe">Epe Expressway Axis</option>
            <option value="ibeju">Ibeju-Lekki Coastal</option>
            <option value="guzape">Guzape Phase 2, Abuja</option>
            <option value="moniya">Moniya Rail Corridor, Ibadan</option>
          </select>

          {/* Title Status Filter */}
          <select
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
            className="flex-1 sm:flex-initial px-3 py-2 bg-surface-tint border border-border rounded-lg text-body-sm text-text-primary font-semibold focus:outline-none focus:border-secondary cursor-pointer"
          >
            <option value="all">All Legal Titles</option>
            <option value="gov_consent">Governor's Consent</option>
            <option value="c_of_o">FCT / Lagos C of O</option>
            <option value="gazette">Govt. Gazette / Excision</option>
            <option value="survey">Registered Perimeter Survey</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex-1 sm:flex-initial px-3 py-2 bg-surface-tint border border-border rounded-lg text-body-sm text-text-primary font-semibold focus:outline-none focus:border-secondary cursor-pointer"
          >
            <option value="all">All Stock Status</option>
            <option value="available">Available (Live)</option>
            <option value="reserved">Reserved (Inspection Hold)</option>
            <option value="sold">Sold &amp; Allocated</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-lg border border-border bg-surface-card shadow-1">
        <table className="w-full min-w-[980px] text-left border-collapse">
          <thead>
            <tr className="bg-surface-tint border-b border-border text-text-muted font-body text-label-caps uppercase tracking-wider">
              <th className="py-3 px-4 font-bold">Estate &amp; Plot ID</th>
              <th className="py-3 px-4 font-bold">Corridor &amp; Coordinates</th>
              <th className="py-3 px-4 font-bold">Title Deed Grade</th>
              <th className="py-3 px-4 font-bold">Demarcation</th>
              <th className="py-3 px-4 font-bold">Base &bull; Promo Price</th>
              <th className="py-3 px-4 font-bold">Inventory Status</th>
              <th className="py-3 px-4 font-bold">Leads</th>
              <th className="py-3 px-4 font-bold text-right">Quick Allocation Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border font-body text-body-sm text-text-primary">
            {filteredProperties.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-text-muted">
                  No estates match the selected filters.
                </td>
              </tr>
            ) : (
              filteredProperties.map((property, idx) => {
                const status = propertyStatuses[property.id] || "available";
                const mockLeadsCount = [22, 16, 19, 31, 14, 27][idx % 6];
                const hasDiscount = idx === 0 || idx === 3 || idx === 4;
                const discountRate = idx === 0 ? 0.1 : idx === 3 ? 0.15 : 0.1;
                const promoPrice = hasDiscount
                  ? Math.round(property.priceNgn * (1 - discountRate))
                  : property.priceNgn;

                return (
                  <tr
                    key={property.id}
                    className="hover:bg-surface-tint transition-colors group"
                  >
                    {/* Estate & Plot ID */}
                    <td className="py-4 px-4 font-medium">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-border bg-surface-tint">
                          {property.media[0]?.url ? (
                            <Image
                              src={property.media[0].url}
                              alt={property.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center font-bold text-text-muted text-xs">
                              VP
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <Link
                            href={`/properties/${property.slug}`}
                            className="font-display text-headline-sm font-bold text-text-primary hover:text-secondary truncate block"
                          >
                            {property.title}
                          </Link>
                          <span className="font-mono text-label-caps text-secondary font-semibold">
                            REF: {property.beaconId || `PG-${property.slug.slice(0, 3).toUpperCase()}-0${idx + 1}`}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Corridor & Coordinates */}
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="font-body text-label-md font-semibold text-text-primary">
                          {property.location.area.split(",")[0] || property.location.state}
                        </span>
                        <span className="font-body text-body-sm text-text-muted">
                          {property.coordinates?.formatted || property.location.area}
                        </span>
                      </div>
                    </td>

                    {/* Title Deed Grade */}
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-badge-cofo-bg text-badge-cofo-text border border-badge-cofo-border font-body text-label-caps font-bold">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                        {property.verification.label}
                      </span>
                    </td>

                    {/* Demarcation */}
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="font-body text-label-md font-bold text-text-primary">
                          {property.plotSizeSqm} SQM
                        </span>
                        <span className="font-body text-label-caps text-text-muted">
                          {property.topography || "Demarcated Survey Plot"}
                        </span>
                      </div>
                    </td>

                    {/* Base & Promo Price */}
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="font-display text-headline-sm font-bold text-secondary">
                          {formatNaira(promoPrice)}
                        </span>
                        {hasDiscount ? (
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="font-body text-label-caps text-text-muted line-through">
                              {formatNaira(property.priceNgn)}
                            </span>
                            <span className="font-body text-label-caps bg-surface-tint-strong text-secondary border border-border px-1 rounded font-bold">
                              -{Math.round(discountRate * 100)}%
                            </span>
                          </div>
                        ) : (
                          <span className="font-body text-label-caps text-text-muted">
                            Outright Settled
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Inventory Status */}
                    <td className="py-4 px-4">
                      {status === "available" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-white font-body text-label-md font-semibold shadow-1">
                          <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                          Available (Live)
                        </span>
                      )}
                      {status === "reserved" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-tint border border-border text-text-primary font-body text-label-md font-semibold">
                          <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
                          Reserved (Hold Active)
                        </span>
                      )}
                      {status === "sold" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-verified text-white font-body text-label-md font-semibold">
                          <span className="material-symbols-outlined text-[16px]">check_circle</span>
                          Sold &bull; Allocated
                        </span>
                      )}
                    </td>

                    {/* Leads */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 text-text-muted font-body text-label-md font-semibold">
                        <span className="material-symbols-outlined text-secondary text-base">forum</span>
                        <span className="text-text-primary">{mockLeadsCount}</span>
                      </div>
                    </td>

                    {/* Quick Allocation Actions */}
                    <td className="py-4 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        {status === "available" && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleStatusChange(property.id, "reserved")}
                              className="px-2.5 py-1 rounded bg-surface-tint text-text-primary font-body text-label-md hover:bg-surface-tint-strong border border-border transition-colors cursor-pointer"
                              title="Mark plot as held under escrow"
                            >
                              Hold Plot
                            </button>
                            <button
                              type="button"
                              onClick={() => handleStatusChange(property.id, "sold")}
                              className="px-2.5 py-1 rounded bg-primary text-white font-body text-label-md hover:bg-primary-hover transition-colors cursor-pointer"
                              title="Issue allocation notice"
                            >
                              Mark Sold
                            </button>
                          </>
                        )}
                        {status === "reserved" && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleStatusChange(property.id, "available")}
                              className="px-2.5 py-1 rounded bg-surface-tint-strong text-secondary font-body text-label-md hover:bg-secondary hover:text-white border border-border transition-colors cursor-pointer"
                              title="Return to public market"
                            >
                              Release Hold
                            </button>
                            <button
                              type="button"
                              onClick={() => handleStatusChange(property.id, "sold")}
                              className="px-2.5 py-1 rounded bg-primary text-white font-body text-label-md hover:bg-primary-hover transition-colors cursor-pointer"
                              title="Confirm payment wire"
                            >
                              Finalize Deed
                            </button>
                          </>
                        )}
                        {status === "sold" && (
                          <span className="font-body text-label-caps text-text-muted mr-1">
                            Deed #LA/2025/{idx + 101}
                          </span>
                        )}
                        <Link
                          href={`/properties/${property.slug}`}
                          className="p-1 rounded text-text-muted hover:bg-surface-tint hover:text-text-primary inline-flex items-center justify-center transition-colors"
                          title="View Cadastral Dossier"
                        >
                          <span className="material-symbols-outlined text-base">folder_open</span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer with Pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-body-sm font-body text-text-muted">
        <div>
          Showing <span className="font-bold text-text-primary">1 - {filteredProperties.length}</span> of{" "}
          <span className="font-bold text-text-primary">142</span> active plots across 4 Nigerian operational regions
        </div>
        <div className="inline-flex items-center gap-1">
          <button
            type="button"
            disabled
            className="p-1.5 rounded border border-border bg-surface text-text-muted opacity-40 cursor-not-allowed flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
          </button>
          <span className="px-3 py-1 rounded bg-primary text-white font-body text-label-md font-bold">
            1
          </span>
          <button
            type="button"
            className="px-3 py-1 rounded border border-border bg-surface text-text-primary font-body text-label-md hover:bg-surface-tint"
          >
            2
          </button>
          <button
            type="button"
            className="px-3 py-1 rounded border border-border bg-surface text-text-primary font-body text-label-md hover:bg-surface-tint"
          >
            3
          </button>
          <button
            type="button"
            className="p-1.5 rounded border border-border bg-surface text-text-primary hover:bg-surface-tint flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
