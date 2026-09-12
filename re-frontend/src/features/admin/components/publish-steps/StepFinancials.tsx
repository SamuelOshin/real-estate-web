"use client";

import { Input, Select } from "@/components/ui";
import { formatNaira } from "@/lib/utils/format";
import type { PublishPropertyFormData } from "../../types";

export interface StepFinancialsProps {
  formData: PublishPropertyFormData;
  onChange: <K extends keyof PublishPropertyFormData>(
    field: K,
    value: PublishPropertyFormData[K]
  ) => void;
}

export function StepFinancials({ formData, onChange }: StepFinancialsProps) {
  const usdPrice = (formData.basePriceNgn / 1495.5).toLocaleString("en-US", {
    maximumFractionDigits: 2,
  });

  const gbpPrice = Math.round(formData.basePriceNgn / 1910).toLocaleString("en-US");

  return (
    <div className="bg-surface-card rounded-xl p-6 border border-border shadow-1 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-surface-tint text-secondary border border-border">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <h2 className="font-display text-headline-md font-bold text-primary">
              Financial Valuation, Installments &amp; Escrow
            </h2>
            <p className="font-body text-body-sm text-text-muted">
              Dual-currency multi-tier amortization with automated foreign remittance hedging.
            </p>
          </div>
        </div>
        <span className="font-body text-label-caps px-2.5 py-1 rounded bg-surface-tint-strong text-primary border border-border font-bold">
          ESCROW SECURED
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Naira Base Price */}
        <div className="flex flex-col gap-1.5 p-4 bg-surface rounded-xl border border-border">
          <label className="font-body text-label-lg text-text-primary font-semibold flex items-center justify-between">
            <span>Base Outright Price (₦ NGN)</span>
            <span className="font-body text-label-caps bg-badge-cofo-bg text-badge-cofo-text border border-badge-cofo-border px-2 py-0.5 rounded font-bold">
              500 SQM BASE
            </span>
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-2.5 font-display text-price-display text-primary font-extrabold leading-none">
              ₦
            </span>
            <Input
              type="number"
              min={0}
              step={100000}
              value={formData.basePriceNgn}
              onChange={(e) => onChange("basePriceNgn", Number(e.target.value) || 0)}
              className="pl-9 font-display text-headline-sm font-extrabold text-primary"
            />
          </div>
          <span className="font-body text-label-caps text-text-muted mt-1">
            Current Valuation: {formatNaira(formData.basePriceNgn)} Outright
          </span>
        </div>

        {/* Diaspora Auto Conversion */}
        <div className="flex flex-col gap-1.5 p-4 bg-surface-tint rounded-xl border border-border">
          <label className="font-body text-label-lg text-text-primary font-semibold flex items-center justify-between">
            <span>Automated Diaspora Dollar Hedging</span>
            <span className="font-body text-label-caps text-secondary font-bold">
              CBN FIX ₦1,495.50
            </span>
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-2.5 font-display text-price-display text-secondary font-extrabold leading-none">
              $
            </span>
            <Input
              type="text"
              readOnly
              value={`${usdPrice} USD`}
              className="pl-9 font-display text-headline-sm font-extrabold text-secondary cursor-default bg-surface-card"
            />
          </div>
          <div className="flex items-center justify-between font-body text-label-caps text-text-muted mt-1">
            <span>British Pound Equivalent: &pound;{gbpPrice} GBP</span>
            <span className="text-verified font-bold">Direct SWIFT Escrow</span>
          </div>
        </div>

        {/* Installment Options Switchboard */}
        <div className="md:col-span-2 flex flex-col gap-3 p-4 bg-surface rounded-xl border border-border">
          <span className="font-body text-label-lg text-text-primary font-bold">
            Structured Institutional Installment Options
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="p-3 rounded-lg bg-surface-card border border-border flex items-start gap-3 hover:bg-surface-tint cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={formData.installments6Month}
                onChange={(e) => onChange("installments6Month", e.target.checked)}
                className="accent-secondary h-5 w-5 mt-0.5 rounded cursor-pointer"
              />
              <div className="flex flex-col">
                <span className="font-body text-label-md font-bold text-primary">
                  6-Month Zero-Interest Allocation
                </span>
                <p className="font-body text-body-sm text-text-muted text-[13px] mt-0.5">
                  Initial ₦10,000,000 deposit; balanced into 5 consecutive monthly tranches of ₦5,700,000.
                </p>
              </div>
            </label>

            <label className="p-3 rounded-lg bg-surface-card border border-border flex items-start gap-3 hover:bg-surface-tint cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={formData.installments12Month}
                onChange={(e) => onChange("installments12Month", e.target.checked)}
                className="accent-secondary h-5 w-5 mt-0.5 rounded cursor-pointer"
              />
              <div className="flex flex-col">
                <span className="font-body text-label-md font-bold text-primary">
                  12-Month Extended Amortization
                </span>
                <p className="font-body text-body-sm text-text-muted text-[13px] mt-0.5">
                  Initial ₦5,000,000 down-payment; monthly structured tranches of ₦3,040,000 with title escrow.
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Attach Promo Engine Tier */}
        <div className="flex flex-col gap-1.5">
          <label className="font-body text-label-lg text-text-primary font-semibold">
            Attach Promotional / Incentive Rule
          </label>
          <Select
            value={formData.promoRule}
            onChange={(e) => onChange("promoRule", e.target.value)}
          >
            <option>Early-Bird Outright Settlement (-10% Discount Campaign)</option>
            <option>Diaspora Legal Subsidy (₦500,000 Conveyancing Credit)</option>
            <option>Independence Infrastructure Bundle (Free Deed + Registered Survey)</option>
            <option>No Active Promotional Rule (Market Benchmark)</option>
          </Select>
        </div>

        {/* Hidden Fee Warranty Checkbox */}
        <label className="flex items-center gap-3 p-4 bg-surface rounded-xl border border-border hover:bg-surface-tint cursor-pointer transition-colors">
          <input
            type="checkbox"
            checked={formData.zeroHiddenFeesCovenant}
            onChange={(e) => onChange("zeroHiddenFeesCovenant", e.target.checked)}
            className="accent-secondary h-5 w-5 shrink-0 rounded cursor-pointer"
          />
          <div className="flex flex-col">
            <span className="font-body text-label-md font-bold text-primary">
              Zero Hidden Ancillary Fees Covenant
            </span>
            <span className="font-body text-body-sm text-text-muted text-[12px] mt-0.5">
              All documentation, registered survey, and developmental levies are declared without unstated extortion.
            </span>
          </div>
        </label>
      </div>
    </div>
  );
}
