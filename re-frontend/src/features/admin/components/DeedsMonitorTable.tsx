"use client";

import type { DeedComplianceItem } from "@/types/inquiry";

export interface DeedsMonitorTableProps {
  complianceItems: DeedComplianceItem[];
}

export function DeedsMonitorTable({ complianceItems }: DeedsMonitorTableProps) {
  return (
    <div className="bg-surface-card rounded-xl p-6 border border-border shadow-1 flex flex-col justify-between space-y-6">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-2">
          <h3 className="font-heading text-headline-sm font-bold text-text-primary">
            Conveyancing &amp; Deeds Monitor
          </h3>
          <span className="material-symbols-outlined text-secondary text-xl">gavel</span>
        </div>
        <p className="font-body text-body-sm text-text-muted mb-4">
          Live handshake status with Lagos State Lands Bureau (Alausa) &amp; Abuja AGIS registry.
        </p>

        {/* Compliance Mini Pipeline */}
        <div className="space-y-2.5">
          {complianceItems.map((item) => {
            const isPassed = item.status === "passed" || item.status === "certified";

            return (
              <div
                key={item.id}
                className="p-3 rounded-lg bg-surface border border-border flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  {isPassed ? (
                    <span className="material-symbols-outlined text-verified text-[20px] shrink-0">
                      check_circle
                    </span>
                  ) : (
                    <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">
                      schedule
                    </span>
                  )}
                  <div className="flex flex-col">
                    <span className="font-body text-label-md font-semibold text-text-primary">
                      {item.title}
                    </span>
                    <span className="font-body text-label-caps text-text-muted">
                      {item.batch}
                    </span>
                  </div>
                </div>

                <span
                  className={`font-body text-label-caps font-bold px-2 py-0.5 rounded ${
                    isPassed
                      ? "text-badge-cofo-text bg-badge-cofo-bg border border-badge-cofo-border"
                      : "text-secondary bg-surface-tint-strong border border-border"
                  }`}
                >
                  {item.statusLabel}
                </span>
              </div>
            );
          })}
        </div>

        {/* Chauffeur Inspection Schedule Card */}
        <div className="mt-5 p-4 rounded-lg bg-primary text-white space-y-1.5 shadow-1">
          <div className="flex items-center justify-between">
            <span className="font-body text-label-caps uppercase tracking-wider text-surface-tint">
              Saturday Convoy
            </span>
            <span className="px-2 py-0.5 rounded bg-surface-tint text-primary font-body text-label-caps font-bold">
              3 SUVs Booked
            </span>
          </div>
          <div className="font-heading text-headline-sm font-bold">
            Epe &amp; Alaro Axis Inspection
          </div>
          <p className="font-body text-body-sm text-surface-tint opacity-90">
            Departs 9:00 AM from Prison Gihon Victoria Island HQ. 7 diaspora investors registered.
          </p>
        </div>
      </div>

      {/* Live Exchange Reference */}
      <div className="pt-3 border-t border-border flex items-center justify-between bg-surface p-3 rounded-lg">
        <div className="flex flex-col">
          <span className="font-body text-label-caps text-text-muted uppercase font-semibold">
            CBN NAIRA PEG
          </span>
          <span className="font-body text-label-md font-bold text-text-primary">
            1 USD = ₦1,495.50
          </span>
        </div>
        <button
          type="button"
          className="text-secondary font-body text-label-md font-bold hover:underline cursor-pointer flex items-center gap-1"
        >
          <span>Manage FX Hedging</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
