"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui";
import type { PropertyMedia } from "@/types/property";

export interface PropertyGalleryProps {
  media: PropertyMedia[];
  title: string;
}

export function PropertyGallery({ media, title }: PropertyGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showDossierToast, setShowDossierToast] = useState(false);

  const mainMedia = media[selectedImageIndex] || media[0];
  const supportingMedia = media.slice(1, 4);

  const handleRequestDossier = () => {
    setShowDossierToast(true);
    setTimeout(() => setShowDossierToast(false), 5000);
  };

  const tileLabels = [
    { category: "Cadastral Survey Map", title: "Master Layout Blueprint" },
    { category: "Aerial Perspective", title: "Live Drone View & Corridor" },
    { category: "Planned Architecture", title: "Gatehouse & Drainage 3D" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Main Hero Shot (8 cols) */}
        <div className="relative min-h-[380px] overflow-hidden rounded-xl bg-surface-tint shadow-1 lg:col-span-8 lg:min-h-[490px]">
          {mainMedia && (
            <Image
              src={mainMedia.url}
              alt={title}
              fill
              priority
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          )}
          {/* Subtle gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />

          {/* Badges in top-left */}
          <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-lg bg-surface-card/90 px-3 py-1 font-body text-label-caps uppercase tracking-wider text-primary shadow-1 backdrop-blur-md">
              <span className="material-symbols-outlined text-xs text-secondary">verified</span>
              <span>Cadastral Phase 1 Live Survey</span>
            </span>
            <span className="flex items-center gap-1.5 rounded-lg bg-verified px-3 py-1 font-body text-label-caps uppercase tracking-wider text-white shadow-1 backdrop-blur-md">
              <span className="material-symbols-outlined text-xs">terrain</span>
              <span>100% Dry Table Land</span>
            </span>
          </div>

          {/* Bottom title & CTA */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-col justify-between gap-3 text-white sm:flex-row sm:items-end">
            <div>
              <span className="font-body text-label-caps uppercase tracking-wider text-surface-tint">
                Gatehouse &amp; Boulevard Infrastructure
              </span>
              <h2 className="font-display text-headline-lg font-bold text-white">
                {title}
              </h2>
              <p className="max-w-lg font-body text-body-sm text-surface-tint">
                Engineered interlocking pavement with dual subterranean drainages ready for immediate
                duplex construction.
              </p>
            </div>
            <a href="#diaspora-inspection-hub">
              <Button variant="secondary" size="md">
                View 4K Drone Tour
              </Button>
            </a>
          </div>
        </div>

        {/* 3 Supporting Preview Tiles (4 cols) */}
        <div className="flex flex-col justify-between gap-4 lg:col-span-4">
          {supportingMedia.map((item, idx) => {
            const actualIndex = idx + 1;
            const meta = tileLabels[idx] || {
              category: "Inspection Media",
              title: `Site Perspective ${idx + 1}`,
            };
            const isSelected = selectedImageIndex === actualIndex;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedImageIndex(actualIndex)}
                className={`group relative h-36 w-full cursor-pointer overflow-hidden rounded-xl border text-left shadow-1 transition-all lg:h-[150px] ${
                  isSelected ? "border-secondary ring-2 ring-secondary" : "border-border"
                }`}
              >
                <Image
                  src={item.url}
                  alt={meta.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/40 transition-colors group-hover:bg-primary/20" />
                <div className="absolute inset-0 flex items-end justify-between p-3 text-white">
                  <div>
                    <span className="font-body text-label-caps uppercase text-surface-tint">
                      {meta.category}
                    </span>
                    <p className="font-display text-headline-sm font-semibold leading-tight text-white">
                      {meta.title}
                    </p>
                  </div>
                  <span className="rounded-full bg-surface-card/90 p-2 text-primary shadow-1 transition-all group-hover:bg-primary group-hover:text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface-card p-3 shadow-1">
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" size="sm" type="button" onClick={handleRequestDossier} className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">description</span>
            <span>Download Cadastral Master Plan (PDF &bull; 4.2 MB)</span>
          </Button>
          <a href="#diaspora-inspection-hub">
            <Button variant="secondary" size="sm" type="button" className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">map</span>
              <span>View Beacon Allocation Chart</span>
            </Button>
          </a>
          <Button variant="secondary" size="sm" type="button" onClick={handleRequestDossier} className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>Verify Alausa Registry Record</span>
          </Button>
        </div>
        <div className="flex items-center gap-2 font-body text-label-md text-text-muted">
          <span className="text-verified font-medium flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">verified_user</span>
            <span>Verified Surveyor General Coordinates</span>
          </span>
          <span>&bull;</span>
          <span className="font-semibold text-primary">14 Plots Allocated This Month</span>
        </div>
      </div>

      {/* Dossier Toast notification */}
      {showDossierToast && (
        <div className="fixed bottom-6 right-6 z-50 flex max-w-md items-center gap-3 rounded-xl border border-border bg-primary p-4 text-white shadow-2">
          <div className="text-xs">
            <p className="font-display text-label-lg font-bold text-white">
              Alausa Title Dossier Dispatched!
            </p>
            <p className="font-body text-body-sm text-surface-tint mt-0.5">
              Verified survey plan (LS/D/EP/8119) &amp; Governor&apos;s Consent record ready.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowDossierToast(false)}
            className="ml-auto text-surface-tint hover:text-white flex items-center"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>
      )}
    </div>
  );
}
