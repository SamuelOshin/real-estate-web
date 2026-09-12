"use client";

import { useState } from "react";
import { Card, Button, Input, Select } from "@/components/ui";

export interface DiscountCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function DiscountCampaignModal({
  isOpen,
  onClose,
  onSuccess,
}: DiscountCampaignModalProps) {
  const [title, setTitle] = useState("");
  const [discountModel, setDiscountModel] = useState("Percentage Off (%)");
  const [discountValue, setDiscountValue] = useState("");
  const [eligibleEstates, setEligibleEstates] = useState("All Active Inventory");
  const [startDate, setStartDate] = useState("2025-04-01");
  const [expiryDate, setExpiryDate] = useState("2025-04-30");
  const [autoApply, setAutoApply] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text-primary/60 backdrop-blur-sm overflow-y-auto">
      <Card
        elevation="modal"
        padding="none"
        className="w-full max-w-lg my-8 bg-surface-card border border-border overflow-hidden"
      >
        <div className="p-6 space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-secondary text-white flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
              <h3 className="font-display text-headline-md text-text-primary font-bold">
                Create Discount Campaign
              </h3>
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="block font-body text-label-md text-text-primary font-semibold">
                Campaign Title
              </label>
              <Input
                type="text"
                required
                placeholder="e.g. Independence Day Land Rush"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Model & Value */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block font-body text-label-md text-text-primary font-semibold">
                  Discount Model
                </label>
                <Select
                  value={discountModel}
                  onChange={(e) => setDiscountModel(e.target.value)}
                >
                  <option>Percentage Off (%)</option>
                  <option>Fixed Naira Deduction (₦)</option>
                  <option>Free Legal Perfection / C of O</option>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="block font-body text-label-md text-text-primary font-semibold">
                  Discount Value
                </label>
                <Input
                  type="text"
                  required
                  placeholder="e.g. 10% or ₦1,000,000"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                />
              </div>
            </div>

            {/* Eligible Estates */}
            <div className="space-y-1.5">
              <label className="block font-body text-label-md text-text-primary font-semibold">
                Eligible Estates
              </label>
              <Select
                value={eligibleEstates}
                onChange={(e) => setEligibleEstates(e.target.value)}
              >
                <option>All Active Inventory</option>
                <option>The Grand Crest Estate, Epe</option>
                <option>Atlantic Crest Bay, Ibeju-Lekki</option>
                <option>Heritage Valley Estate, Ibadan</option>
                <option>Sovereign Heights Hilltop, Abuja</option>
              </Select>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block font-body text-label-md text-text-primary font-semibold">
                  Start Date
                </label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-body text-label-md text-text-primary font-semibold">
                  Expiry Date
                </label>
                <Input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>
            </div>

            {/* Checkbox */}
            <div className="pt-2">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoApply}
                  onChange={(e) => setAutoApply(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-secondary w-4 h-4 cursor-pointer"
                />
                <span className="font-body text-label-md text-text-primary">
                  Auto-apply at pro-forma generation
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
                Deploy Campaign
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
