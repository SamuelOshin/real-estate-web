import Link from "next/link";
import { PublishPropertyWizard } from "@/features/admin/components/PublishPropertyWizard";

export default function PublishPropertyPage() {
  return (
    <div className="flex flex-col w-full pb-16 space-y-6">
      {/* Top Operational Sub-Bar & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2 border-b border-border pb-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 font-body text-label-caps text-text-muted uppercase tracking-wider">
            <Link href="/admin/dashboard" className="hover:text-secondary transition-colors">
              Admin Portal
            </Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <Link href="/properties" className="hover:text-secondary transition-colors">
              Land Inventory
            </Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-secondary font-bold">Publish Listing</span>
          </div>

          <div className="flex items-center gap-3 mt-1">
            <h1 className="font-heading text-headline-lg text-primary tracking-tight font-extrabold">
              New Cadastral Listing Dossier
            </h1>
            <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-surface-tint border border-border text-text-primary">
              <span className="h-2 w-2 rounded-full bg-secondary animate-ping"></span>
              <span className="font-body text-label-caps font-bold">DRAFT #LND-2025-089</span>
            </div>
          </div>
        </div>

        {/* Quick Action Info Pill */}
        <div className="flex items-center gap-2">
          <Link
            href="/properties"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-card border border-border hover:bg-surface-tint text-text-primary font-body text-label-md transition-colors shadow-1"
          >
            <span className="material-symbols-outlined text-secondary text-base">visibility</span>
            <span>View Marketplace</span>
          </Link>
        </div>
      </div>

      {/* Main 4-Step Wizard Container */}
      <PublishPropertyWizard />
    </div>
  );
}
