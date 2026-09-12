"use client";

import { useState } from "react";
import { mockProperties } from "@/features/properties/api";
import {
  mockInquiries,
  mockPromoCampaigns,
  mockDeedCompliance,
} from "@/features/admin/api";
import { PromoCampaignCard } from "@/features/admin/components/PromoCampaignCard";
import { ListingsTable } from "@/features/admin/components/ListingsTable";
import { InquiriesTable } from "@/features/admin/components/InquiriesTable";
import { DeedsMonitorTable } from "@/features/admin/components/DeedsMonitorTable";
import { QuickPublishModal } from "@/features/admin/components/QuickPublishModal";
import { DiscountCampaignModal } from "@/features/admin/components/DiscountCampaignModal";
import { Button } from "@/components/ui";

export default function AdminDashboardPage() {
  const [isQuickPublishOpen, setIsQuickPublishOpen] = useState(false);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleExportCsv = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "ID,Title,Corridor,PlotSize,PriceNGN,Verification,Status\n" +
      mockProperties
        .map(
          (p) =>
            `"${p.id}","${p.title}","${p.location.area}",${p.plotSizeSqm},${p.priceNgn},"${p.verification.label}","${p.status}"`
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "prison-gihon-land-ledger.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Cadastral ledger exported successfully (CSV).");
  };

  return (
    <div className="flex flex-col w-full pb-16 space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-primary text-white rounded-lg shadow-3 font-body text-body-sm flex items-center gap-3 border border-surface-tint-strong animate-in fade-in slide-in-from-bottom-2">
          <span className="material-symbols-outlined text-verified text-xl">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Hero / Institutional Subheader Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 py-2 border-b border-border pb-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-secondary font-body text-label-caps uppercase tracking-wider font-bold">
            <span className="inline-block w-2 h-2 rounded-full bg-secondary animate-ping"></span>
            Operational Registry &bull; Lagos &bull; Abuja FCT &bull; Ibadan Corridors
          </div>
          <h1 className="font-display text-headline-xl text-text-primary font-bold tracking-tight mt-1">
            Institutional Land Operations &amp; Inventory
          </h1>
          <p className="font-body text-body-md text-text-muted max-w-3xl mt-1">
            Autonomous cadastral management, real-time title conveyancing dossier tracker, and promotional yield distribution engine.
          </p>
        </div>

        {/* Quick Global Action Suite */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Button
            type="button"
            variant="primary"
            onClick={() => setIsQuickPublishOpen(true)}
            className="flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[19px]">add_business</span>
            <span>Publish New Property</span>
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsDiscountModalOpen(true)}
            className="flex items-center gap-2 bg-surface-card"
          >
            <span className="material-symbols-outlined text-secondary text-[19px]">local_offer</span>
            <span>New Campaign</span>
          </Button>

          <button
            type="button"
            onClick={handleExportCsv}
            title="Export Cadastral Register"
            className="inline-flex items-center gap-1.5 bg-surface-tint border border-border text-text-primary px-3 py-2 rounded-lg font-body text-label-md font-semibold hover:bg-surface-tint-strong transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-text-muted text-[18px]">sim_card_download</span>
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* Section 1: Top Operational Metrics & KPIs (Institutional Bento Ribbon) */}
      <section
        aria-label="Key Performance Indicators"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 xl:grid-cols-6 gap-3.5 xl:gap-4"
      >
        {/* KPI 1: Total Portfolio Value (Spans 2 on sm, 3 on lg, 2 on xl) */}
        <div className="bg-surface-card p-3.5 sm:p-4 2xl:p-5 rounded-xl border border-border shadow-1 flex flex-col justify-between relative overflow-hidden sm:col-span-2 lg:col-span-3 xl:col-span-2 min-w-0">
          <div className="flex items-center justify-between z-10">
            <span className="font-body text-label-caps text-text-muted uppercase tracking-wider font-semibold truncate">
              Total Portfolio Demarcated
            </span>
            <span className="p-1.5 rounded-lg bg-surface-tint text-secondary border border-border flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px] sm:text-[20px]">account_balance</span>
            </span>
          </div>

          <div className="mt-3 z-10">
            <div className="flex items-baseline gap-1 whitespace-nowrap">
              <span className="font-display text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
                ₦18.45
              </span>
              <span className="font-display text-base sm:text-lg font-semibold text-secondary">
                Billion
              </span>
            </div>
            <div className="flex items-center justify-between text-xs font-body text-text-muted mt-1 gap-1">
              <span className="truncate">Across 38 Serviced Estates</span>
              <span className="font-body text-[11px] text-verified flex items-center gap-0.5 font-bold whitespace-nowrap shrink-0">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                <span>+₦1.2B Q1</span>
              </span>
            </div>
          </div>

          {/* Sparkline */}
          <div className="pt-2 mt-1 z-10">
            <svg className="w-full h-7 text-secondary" fill="none" preserveAspectRatio="none" viewBox="0 0 240 32">
              <path d="M0 24 Q30 28 60 18 T120 14 T180 8 T240 2" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path>
              <path d="M0 24 Q30 28 60 18 T120 14 T180 8 T240 2 L240 32 L0 32 Z" fill="currentColor" fillOpacity="0.08"></path>
            </svg>
          </div>
        </div>

        {/* KPI 2: Available Plots Breakdown */}
        <div className="bg-surface-card p-3.5 sm:p-4 2xl:p-5 rounded-xl border border-border shadow-1 flex flex-col justify-between sm:col-span-1 lg:col-span-3 xl:col-span-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="font-body text-label-caps text-text-muted uppercase tracking-wider font-semibold truncate">
              Available Plots
            </span>
            <span className="p-1.5 rounded-lg bg-surface-tint text-primary border border-border flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px] sm:text-[20px]">holiday_village</span>
            </span>
          </div>

          <div className="my-2">
            <div className="font-display text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">142</div>
            <div className="flex items-center gap-1.5 sm:gap-2 mt-1 font-body text-[11px] text-text-muted whitespace-nowrap overflow-hidden">
              <span className="flex items-center gap-1 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block shrink-0"></span>
                89 Res
              </span>
              <span className="flex items-center gap-1 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block shrink-0"></span>
                32 Com
              </span>
              <span className="flex items-center gap-1 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-surface-tint-strong border border-border inline-block shrink-0"></span>
                21 Acr
              </span>
            </div>
          </div>

          <div className="w-full bg-surface-tint h-2 rounded-full overflow-hidden flex border border-border mt-auto">
            <div className="bg-secondary h-full" style={{ width: "62%" }}></div>
            <div className="bg-primary h-full" style={{ width: "23%" }}></div>
            <div className="bg-surface-tint-strong h-full" style={{ width: "15%" }}></div>
          </div>
        </div>

        {/* KPI 3: Under Escrow / Hold */}
        <div className="bg-surface-card p-3.5 sm:p-4 2xl:p-5 rounded-xl border border-border shadow-1 flex flex-col justify-between sm:col-span-1 lg:col-span-2 xl:col-span-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="font-body text-label-caps text-text-muted uppercase tracking-wider font-semibold truncate">
              Under Escrow / Hold
            </span>
            <span className="p-1.5 rounded-lg bg-surface-tint text-text-muted border border-border flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px] sm:text-[20px]">lock</span>
            </span>
          </div>

          <div className="my-2">
            <div className="font-display text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
              28 <span className="font-body text-xs font-normal text-text-muted">Plots</span>
            </div>
            <div className="font-body text-xs text-text-muted mt-1 leading-snug truncate">
              <span className="font-semibold text-text-primary">7</span> Alausa Search pending
            </div>
          </div>

          <div className="bg-surface-tint px-2 py-1 rounded-lg text-label-caps font-body text-text-muted flex items-center justify-between gap-1 border border-border mt-auto">
            <span className="truncate">Expiring in &lt;24h</span>
            <span className="font-bold text-error whitespace-nowrap shrink-0">4 Plots</span>
          </div>
        </div>

        {/* KPI 4: Lifetime Allocated */}
        <div className="bg-surface-card p-3.5 sm:p-4 2xl:p-5 rounded-xl border border-border shadow-1 flex flex-col justify-between sm:col-span-1 lg:col-span-2 xl:col-span-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="font-body text-label-caps text-text-muted uppercase tracking-wider font-semibold truncate">
              Lifetime Allocated
            </span>
            <span className="p-1.5 rounded-lg bg-badge-cofo-bg text-badge-cofo-text border border-badge-cofo-border flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px] sm:text-[20px]">verified_user</span>
            </span>
          </div>

          <div className="my-2">
            <div className="font-display text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">4,852</div>
            <div className="font-body text-xs text-text-muted mt-1 leading-snug truncate">
              <span className="font-semibold text-text-primary">+14</span> deed packets this month
            </div>
          </div>

          <div className="font-body text-label-caps text-verified font-bold flex items-center gap-1 mt-auto">
            <span className="material-symbols-outlined text-[14px] shrink-0">check_circle</span>
            <span className="truncate">100% Survey Pegging Sync</span>
          </div>
        </div>

        {/* KPI 5: Active Inquiries & Campaigns */}
        <div className="bg-surface-card p-3.5 sm:p-4 2xl:p-5 rounded-xl border border-border shadow-1 flex flex-col justify-between sm:col-span-1 lg:col-span-2 xl:col-span-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="font-body text-label-caps text-text-muted uppercase tracking-wider font-semibold truncate">
              Hot Leads &amp; Promo
            </span>
            <span className="p-1.5 rounded-lg bg-surface-tint text-secondary border border-border flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px] sm:text-[20px]">forum</span>
            </span>
          </div>

          <div className="my-2">
            <div className="flex items-center justify-between gap-1.5">
              <span className="font-display text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">64</span>
              <span className="font-body text-[10px] leading-tight px-1.5 py-0.5 rounded-full bg-badge-cofo-bg text-badge-cofo-text border border-badge-cofo-border font-bold whitespace-nowrap shrink-0">
                3 Promos Live
              </span>
            </div>
            <div className="font-body text-xs text-text-muted flex items-center gap-1.5 mt-1 whitespace-nowrap overflow-hidden">
              <span className="shrink-0"><strong className="font-semibold text-text-primary">38</strong> WhatsApp</span>
              <span className="text-text-muted/40 shrink-0">&bull;</span>
              <span className="shrink-0"><strong className="font-semibold text-text-primary">19</strong> Diaspora</span>
            </div>
          </div>

          <div className="font-body text-label-caps text-secondary font-bold flex items-center gap-1 mt-auto">
            <span className="material-symbols-outlined text-[14px] shrink-0">directions_car</span>
            <span className="truncate">7 VIP Chauffeur Inspections</span>
          </div>
        </div>
      </section>

      {/* Section 2: Promotional Pricing & Strategic Discount Engine */}
      <section className="bg-surface-card rounded-xl p-6 border border-border shadow-1 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-2 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl text-white">payments</span>
            </div>
            <div>
              <h2 className="font-display text-headline-md text-text-primary font-bold">
                Active Cadastral Discounts &amp; Promo Engine
              </h2>
              <p className="font-body text-body-sm text-text-muted">
                Automated ledger concessions, title-subsidy incentives, and diaspora exchange locks.
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsDiscountModalOpen(true)}
            className="flex items-center gap-1.5 self-start md:self-auto"
          >
            <span className="material-symbols-outlined text-secondary text-base">add_circle</span>
            <span>Configure New Promo Tier</span>
          </Button>
        </div>

        {/* Active Promo Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
          {mockPromoCampaigns.map((campaign) => (
            <PromoCampaignCard
              key={campaign.id}
              campaign={campaign}
              onEdit={() => setIsDiscountModalOpen(true)}
            />
          ))}
        </div>
      </section>

      {/* Section 3: Publishing & Interactive Inventory Matrix */}
      <section className="bg-surface-card rounded-xl p-6 border border-border shadow-1">
        <ListingsTable initialProperties={mockProperties} />
      </section>

      {/* Section 4: Real-Time High-Priority Buyer Inquiries & CRM Stream */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <InquiriesTable inquiries={mockInquiries} />
        </div>
        <div className="xl:col-span-1">
          <DeedsMonitorTable complianceItems={mockDeedCompliance} />
        </div>
      </section>

      {/* Modals */}
      <QuickPublishModal
        isOpen={isQuickPublishOpen}
        onClose={() => setIsQuickPublishOpen(false)}
        onSuccess={(estateName) => {
          showToast(`"${estateName}" created as draft listing and synced to ledger.`);
        }}
      />

      <DiscountCampaignModal
        isOpen={isDiscountModalOpen}
        onClose={() => setIsDiscountModalOpen(false)}
        onSuccess={() => {
          showToast("Promotional campaign verified and synced to live investor portal.");
        }}
      />
    </div>
  );
}
