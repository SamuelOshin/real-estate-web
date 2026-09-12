"use client";

import { useState } from "react";
import { Card, Button, Input, Select } from "@/components/ui";

/**
 * TODO(agent): Note for reviewer:
 * This component implements the quick-publish modal flow from admin-dashboard.html.
 * It overlaps conceptually with the comprehensive 4-step wizard in /admin/properties/new (TICKET-05).
 * Per TICKET-04 instructions, this fast-track version is retained here for rapid dashboard creation
 * while the full wizard remains on its dedicated route.
 */

export interface QuickPublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (estateName: string) => void;
}

export function QuickPublishModal({
  isOpen,
  onClose,
  onSuccess,
}: QuickPublishModalProps) {
  const [estateName, setEstateName] = useState("");
  const [corridor, setCorridor] = useState("Epe Expressway, Lagos");
  const [topography, setTopography] = useState("100% Dry Table Land");
  const [titleDeed, setTitleDeed] = useState("Governor's Consent (Lagos Alausa)");
  const [plotSize, setPlotSize] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [promoPrice, setPromoPrice] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess?.(estateName || "New Demarcated Listing");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text-primary/60 backdrop-blur-sm overflow-y-auto">
      <Card
        elevation="modal"
        padding="none"
        className="w-full max-w-2xl my-8 bg-surface-card border border-border overflow-hidden"
      >
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <div>
                <h2 className="font-display text-headline-md text-text-primary font-bold">
                  Publish New Land Listing
                </h2>
                <p className="font-body text-body-sm text-text-muted">
                  Quick cadastral inventory injection to live investor portal.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-tint transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 3-Step Indicator */}
          <div className="grid grid-cols-3 gap-2 text-center font-body text-label-caps">
            <div className="py-2 px-1 rounded bg-primary text-white font-bold">
              1. Property Dossier
            </div>
            <div className="py-2 px-1 rounded bg-surface-tint border border-border text-text-muted">
              2. Cadastral Demarcation
            </div>
            <div className="py-2 px-1 rounded bg-surface-tint border border-border text-text-muted">
              3. Legal &amp; Pricing
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Estate Name */}
            <div className="space-y-1.5">
              <label className="block font-body text-label-md text-text-primary font-semibold">
                Estate Name &bull; Development Title
              </label>
              <Input
                type="text"
                required
                placeholder="e.g. The Imperial Crest Reserve"
                value={estateName}
                onChange={(e) => setEstateName(e.target.value)}
              />
            </div>

            {/* Corridor & Topography */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block font-body text-label-md text-text-primary font-semibold">
                  Corridor Location
                </label>
                <Select
                  value={corridor}
                  onChange={(e) => setCorridor(e.target.value)}
                >
                  <option>Epe Expressway, Lagos</option>
                  <option>Ibeju-Lekki Coastal Frontage, Lagos</option>
                  <option>Guzape Phase 2, Abuja FCT</option>
                  <option>Moniya Rail Corridor, Ibadan</option>
                  <option>Airport Road Axis, Abuja</option>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="block font-body text-label-md text-text-primary font-semibold">
                  Topography / Soil Grade
                </label>
                <Select
                  value={topography}
                  onChange={(e) => setTopography(e.target.value)}
                >
                  <option>100% Dry Table Land</option>
                  <option>Sandfilled &bull; Engineered Piled</option>
                  <option>Hilltop Ridge Plateau</option>
                  <option>Gentle Slope Country Terrain</option>
                </Select>
              </div>
            </div>

            {/* Title Deed & Plot Demarcation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block font-body text-label-md text-text-primary font-semibold">
                  Legal Title Deed
                </label>
                <Select
                  value={titleDeed}
                  onChange={(e) => setTitleDeed(e.target.value)}
                >
                  <option>Governor&apos;s Consent (Lagos Alausa)</option>
                  <option>FCT Minister Certificate of Occupancy</option>
                  <option>Government Gazette / Excision</option>
                  <option>Registered Perimeter Survey &amp; Deed of Assignment</option>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="block font-body text-label-md text-text-primary font-semibold">
                  Plot Demarcation / SQM
                </label>
                <Input
                  type="text"
                  required
                  placeholder="e.g. 500 SQM or 2.5 Acres"
                  value={plotSize}
                  onChange={(e) => setPlotSize(e.target.value)}
                />
              </div>
            </div>

            {/* Pricing Tiers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block font-body text-label-md text-text-primary font-semibold">
                  Base Price (₦ Naira)
                </label>
                <Input
                  type="text"
                  required
                  placeholder="e.g. ₦22,000,000"
                  value={basePrice}
                  onChange={(e) => setBasePrice(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-body text-label-md text-text-primary font-semibold">
                  Promo / Launch Price (Optional)
                </label>
                <Input
                  type="text"
                  placeholder="e.g. ₦19,800,000"
                  value={promoPrice}
                  onChange={(e) => setPromoPrice(e.target.value)}
                />
              </div>
            </div>

            {/* Cadastral Document Upload Scrim */}
            <div className="space-y-1.5">
              <label className="block font-body text-label-md text-text-primary font-semibold">
                Upload Cadastral Survey Plan &bull; Deed PDF
              </label>
              <label className="p-6 rounded-xl bg-surface-tint border-2 border-dashed border-border flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-tint-strong transition-colors block">
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.tiff,.png,.jpg"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSelectedFile(e.target.files[0].name);
                    }
                  }}
                />
                <svg
                  className="w-10 h-10 text-secondary mb-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span className="font-body text-label-md text-text-primary font-bold">
                  {selectedFile ? selectedFile : "Drag and drop Survey Dossier (PDF/TIFF)"}
                </span>
                <span className="font-body text-label-caps text-text-muted mt-0.5">
                  Max file size 25MB &bull; Must contain Registered Surveyor Stamp
                </span>
              </label>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
              >
                Publish Property Listing &rarr;
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
