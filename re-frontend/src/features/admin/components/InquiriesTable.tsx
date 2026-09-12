"use client";

import { useState } from "react";
import type { Inquiry } from "@/types/inquiry";

export interface InquiriesTableProps {
  inquiries: Inquiry[];
}

export function InquiriesTable({ inquiries }: InquiriesTableProps) {
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const handleAction = (message: string) => {
    setActionFeedback(message);
    setTimeout(() => setActionFeedback(null), 3500);
  };

  return (
    <div className="bg-surface-card rounded-xl p-6 border border-border shadow-1 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary text-white flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">contact_phone</span>
          </div>
          <div>
            <h2 className="font-heading text-headline-sm text-text-primary font-bold">
              Unresolved Buyer Inquiries &amp; CRM
            </h2>
            <p className="font-body text-body-sm text-text-muted">
              64 live leads requiring conveyancing consultation or site inspection.
            </p>
          </div>
        </div>

        <span className="font-body text-label-caps text-verified bg-badge-cofo-bg border border-badge-cofo-border px-3 py-1 rounded-full font-bold self-start sm:self-auto">
          High Intent Diaspora Lead Stream
        </span>
      </div>

      {/* Toast Feedback */}
      {actionFeedback && (
        <div className="p-3 bg-surface-tint border border-border text-secondary font-body text-label-md rounded-lg flex items-center gap-2 animate-in fade-in">
          <span className="material-symbols-outlined text-verified text-base">check_circle</span>
          <span>{actionFeedback}</span>
        </div>
      )}

      {/* Inquiries Stream Cards */}
      <div className="space-y-3">
        {inquiries.map((inquiry, idx) => {
          const avatarBg =
            idx === 0
              ? "bg-primary text-white"
              : idx === 1
              ? "bg-secondary text-white"
              : "bg-surface-tint-strong text-primary border border-border";

          const channelBadgeClass =
            inquiry.leadChannel === "Diaspora Portal"
              ? "bg-badge-cofo-bg text-badge-cofo-text border border-badge-cofo-border"
              : inquiry.leadChannel === "VIP Chauffeur"
              ? "bg-surface-tint-strong text-secondary border border-border"
              : "bg-surface-tint text-text-primary border border-border";

          return (
            <div
              key={inquiry.id}
              className="bg-surface rounded-xl p-4 border border-border flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-surface-tint transition-all"
            >
              {/* Buyer Information Block */}
              <div className="flex items-start gap-3 min-w-0">
                <div
                  className={`w-10 h-10 rounded-full font-display font-bold flex items-center justify-center shrink-0 ${avatarBg}`}
                >
                  {inquiry.initials}
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-display text-headline-sm font-bold text-text-primary">
                      {inquiry.buyerName}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-surface-card border border-border text-text-muted font-body text-label-caps">
                      {inquiry.location}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded font-body text-label-caps font-bold ${channelBadgeClass}`}
                    >
                      {inquiry.leadChannel}
                    </span>
                  </div>

                  <p className="font-body text-body-sm text-text-muted mt-1">
                    Inquired:{" "}
                    <span className="font-semibold text-text-primary">
                      {inquiry.propertyName}
                    </span>{" "}
                    &bull; {inquiry.plotsDemarcation}
                  </p>

                  <div className="flex items-center gap-2 mt-1 font-body text-label-md flex-wrap">
                    <span
                      className={`font-bold flex items-center gap-1 ${
                        inquiry.status === "search_requested"
                          ? "text-error"
                          : "text-secondary"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[15px]">schedule</span>
                      {inquiry.statusLabel}
                    </span>
                    <span className="text-text-muted">&bull; {inquiry.subtext}</span>
                  </div>
                </div>
              </div>

              {/* Lead Actions */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                {inquiry.whatsappNumber && (
                  <a
                    href={`https://wa.me/${inquiry.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-lg bg-verified text-white font-body text-label-md font-semibold flex items-center gap-1.5 hover:opacity-90 transition-opacity"
                  >
                    <svg
                      className="w-4 h-4 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                    </svg>
                    WhatsApp
                  </a>
                )}

                {idx === 0 && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleAction("Title Deed dossier dispatched via email.")}
                      className="px-3 py-2 rounded-lg bg-surface-tint-strong text-primary border border-border font-body text-label-md font-semibold hover:bg-primary hover:text-white transition-colors cursor-pointer"
                    >
                      Send Title Deed
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAction("Land Officer assignment modal dispatched.")}
                      className="p-2 rounded-lg bg-surface border border-border text-text-muted hover:text-text-primary transition-colors cursor-pointer flex items-center justify-center"
                      title="Assign Land Officer"
                    >
                      <span className="material-symbols-outlined text-[18px]">person_add</span>
                    </button>
                  </>
                )}

                {idx === 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleAction("AGIS Search Pack generated and queued.")}
                      className="px-3 py-2 rounded-lg bg-primary text-white font-body text-label-md font-semibold hover:bg-primary-hover transition-colors cursor-pointer"
                    >
                      Issue AGIS Pack
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAction("Call note logged successfully.")}
                      className="px-3 py-2 rounded-lg bg-surface-tint-strong text-primary border border-border font-body text-label-md font-semibold hover:bg-primary hover:text-white transition-colors cursor-pointer"
                    >
                      Log Call Note
                    </button>
                  </>
                )}

                {idx === 2 && (
                  <button
                    type="button"
                    onClick={() => handleAction("Commercial Pro-Forma Invoice displayed.")}
                    className="px-3 py-2 rounded-lg bg-surface-tint-strong text-primary border border-border font-body text-label-md font-semibold hover:bg-primary hover:text-white transition-colors cursor-pointer"
                  >
                    View Invoice
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
