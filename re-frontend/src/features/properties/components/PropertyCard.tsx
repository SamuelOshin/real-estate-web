"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { VerificationBadge } from "@/components/ui";
import { formatNaira, formatNairaCompact, formatPlotSize } from "@/lib/utils/format";
import { transitions } from "@/lib/motion/transitions";
import type { Property } from "@/types/property";

function formatTopographyShort(topography?: string): string {
  if (!topography) return "100% Dry Land";
  if (topography.includes("Hilltop")) return "Hilltop View";
  if (topography.includes("Level Grade") || topography.includes("Plateau")) return "Level Plateau";
  if (topography.includes("Sandfilled") || topography.includes("Bermed")) return "Sandfilled Table";
  if (topography.includes("Dry Table")) return "100% Dry Land";
  return topography.replace(/\s*\(.*?\)/, "").slice(0, 16);
}

export function PropertyCard({ property }: { property: Property }) {
  const coverImage = property.media[0];
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
      transition={transitions.spring}
      className="group flex flex-col rounded-xl border border-border bg-surface-card overflow-hidden shadow-1 hover:shadow-2 transition-shadow"
    >
      <Link href={`/properties/${property.slug}`} className="block">
        <div className="relative aspect-[16/10] w-full bg-surface-tint overflow-hidden">
          {coverImage && (
            <Image
              src={coverImage.url}
              alt={property.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}

          {/* Badges Overlay */}
          <div className="absolute left-3 top-3 flex flex-col items-start gap-1 z-10">
            <VerificationBadge
              status={property.verification.status}
              label={property.verification.label}
              compact
            />
            {property.allocationUrgency && (
              <span className="bg-surface-card/95 backdrop-blur-sm text-primary font-body text-[10px] px-2 py-0.5 rounded-full shadow-sm font-semibold whitespace-nowrap">
                {property.allocationUrgency.replace(/\s*\(.*?\)/, "")}
              </span>
            )}
          </div>

          <div className="absolute bottom-3 right-3 bg-primary/85 backdrop-blur-sm text-white px-2 py-0.5 rounded font-body text-[10px] tracking-wide shadow-sm">
            ID: {property.beaconId || `PG-${property.id.slice(0, 7).toUpperCase()}`}
          </div>
        </div>
      </Link>

      <div className="flex flex-col flex-1 justify-between gap-3 p-4">
        <div className="flex flex-col gap-1.5">
          {/* Location & Size */}
          <div className="flex items-center justify-between gap-2 min-w-0 font-body">
            <span className="font-semibold uppercase tracking-wider text-secondary flex items-center gap-1 min-w-0 flex-1 overflow-hidden text-xs">
              <span className="material-symbols-outlined text-[14px] shrink-0">location_on</span>
              <span className="truncate">{property.location.area}</span>
            </span>
            <span className="text-text-muted shrink-0 whitespace-nowrap font-medium text-xs">
              {formatPlotSize(property.plotSizeSqm, property.plotSizeAcres)}
            </span>
          </div>

          {/* Title */}
          <Link href={`/properties/${property.slug}`} className="block">
            <h3 className="font-heading text-base font-bold text-primary group-hover:text-secondary transition-colors line-clamp-1">
              {property.title}
            </h3>
          </Link>

          {/* Description */}
          <p className="font-body text-xs text-text-muted line-clamp-2 leading-relaxed h-[36px]">
            {property.description}
          </p>
        </div>

        {/* Mini Feature Strip */}
        <div className="flex items-center justify-between gap-1.5 rounded-lg bg-surface px-2.5 py-1.5 border border-border">
          <div className="flex items-center gap-1 min-w-0">
            <span className="material-symbols-outlined text-[14px] text-secondary shrink-0">terrain</span>
            <span className="truncate font-medium text-[11px] text-text-primary">
              {formatTopographyShort(property.topography)}
            </span>
          </div>
          <div className="h-3 w-px bg-border shrink-0" />
          <div className="flex items-center gap-1 shrink-0">
            <span className="material-symbols-outlined text-[14px] text-verified shrink-0">schedule</span>
            <span className="font-medium text-[11px] text-text-primary whitespace-nowrap">
              Instant Beacon
            </span>
          </div>
        </div>

        {/* Pricing & Terms */}
        <div className="flex flex-col gap-1 pt-1.5 border-t border-border">
          <div className="flex items-baseline justify-between gap-1">
            <span className="font-heading text-lg font-extrabold text-primary tracking-tight">
              {formatNaira(property.priceNgn)}
            </span>
            {property.priceUsdEquivalent && (
              <span className="font-body text-[11px] font-medium text-text-muted shrink-0 whitespace-nowrap">
                ~${property.priceUsdEquivalent.toLocaleString()} USD
              </span>
            )}
          </div>
          <div className="flex items-center justify-between gap-1 font-body text-[11px] text-text-muted">
            <span className="truncate">
              Initial: <strong className="font-semibold text-text-primary">{formatNairaCompact(property.initialDepositNgn || Math.round(property.priceNgn * 0.1))}</strong> (10%)
            </span>
            <span className="text-secondary font-semibold shrink-0 whitespace-nowrap">
              12 Mos Plan
            </span>
          </div>
        </div>

        {/* Action Bar */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={transitions.snappy}>
            <Link
              href={`/properties/${property.slug}`}
              className="w-full bg-primary hover:bg-secondary text-white font-body text-xs font-semibold py-2 px-2 rounded-lg transition-colors flex items-center justify-center gap-1 shadow-1 whitespace-nowrap"
            >
              <span>View Details</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={transitions.snappy}>
            <Link
              href={`/contact?property=${encodeURIComponent(property.title)}`}
              className="w-full bg-surface-tint hover:bg-surface-tint-strong text-primary border border-border font-body text-xs font-semibold py-2 px-2 rounded-lg transition-colors flex items-center justify-center gap-1 shadow-1 whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[14px] text-secondary">calendar_month</span>
              <span>Book Visit</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}
