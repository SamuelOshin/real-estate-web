"use client";

import Link from "next/link";
import { Button } from "@/components/ui";
import type { PublishPropertyFormData } from "../../types";

export interface PublishSuccessProps {
  formData: PublishPropertyFormData;
  onReset?: () => void;
}

export function PublishSuccess({ formData, onReset }: PublishSuccessProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text-primary/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-surface-card border border-border rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-3 text-center my-8 animate-in fade-in zoom-in-95">
        <div className="w-16 h-16 rounded-2xl bg-badge-cofo-bg text-verified flex items-center justify-center mx-auto mb-4 border border-badge-cofo-border">
          <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>

        <span className="inline-block font-body text-label-caps uppercase tracking-wider px-3 py-1 rounded-full bg-surface-tint-strong text-primary font-bold mb-2 border border-border">
          Alausa Cadastre Registered
        </span>

        <h3 className="font-display text-headline-md font-bold text-primary mb-2">
          Listing Successfully Published!
        </h3>
        <p className="font-body text-body-md text-text-muted mb-6 text-center">
          The cadastral dossier has been cryptographically sealed under SCUML No. 084920 and propagated to the Prison Gihon Institutional Marketplace.
        </p>

        {/* Details Summary Card */}
        <div className="bg-surface rounded-xl p-4 mb-6 text-left text-body-sm font-body space-y-2 border border-border">
          <div className="flex justify-between">
            <span className="text-text-muted font-medium">Estate Name:</span>
            <span className="text-text-primary font-bold">{formData.estateTitle}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted font-medium">Cadastral Ref:</span>
            <span className="font-mono text-secondary font-bold">
              {formData.cadastralPillarId || "PG-LND-2025-089"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted font-medium">Statutory Corridor:</span>
            <span className="text-text-primary font-semibold truncate max-w-[240px]">
              {formData.corridor}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted font-medium">Market Status:</span>
            <span className="text-verified font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-verified inline-block animate-pulse"></span>
              Live on Marketplace
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/properties" className="flex-1">
            <Button variant="primary" className="w-full">
              View Marketplace &rarr;
            </Button>
          </Link>
          <Link href="/admin/dashboard" className="flex-1">
            <Button variant="secondary" className="w-full">
              Back to Operations
            </Button>
          </Link>
        </div>

        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="mt-4 font-body text-label-md text-text-muted hover:text-text-primary hover:underline cursor-pointer"
          >
            Publish Another Listing
          </button>
        )}
      </div>
    </div>
  );
}
