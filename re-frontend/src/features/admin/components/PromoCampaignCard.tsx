"use client";

import { Card } from "@/components/ui";
import type { PromoCampaign } from "@/types/inquiry";

export interface PromoCampaignCardProps {
  campaign: PromoCampaign;
  onEdit?: (campaign: PromoCampaign) => void;
}

export function PromoCampaignCard({ campaign, onEdit }: PromoCampaignCardProps) {
  const isAutoTier = campaign.badge === "AUTO-TIER";

  return (
    <Card
      elevation="resting"
      padding="none"
      className="p-5 flex flex-col justify-between hover:shadow-2 transition-all group"
    >
      <div>
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col">
            <span className="font-body text-label-caps text-secondary uppercase font-bold tracking-wider">
              {campaign.category}
            </span>
            <h3 className="font-heading text-headline-sm font-bold text-text-primary mt-1">
              {campaign.title}
            </h3>
          </div>
          <span
            className={`px-2.5 py-1 rounded-full font-body text-label-caps font-bold shrink-0 ${
              isAutoTier
                ? "bg-surface-tint text-text-muted border border-border"
                : "bg-badge-cofo-bg text-badge-cofo-text border border-badge-cofo-border"
            }`}
          >
            {campaign.badge}
          </span>
        </div>

        <p className="font-body text-body-sm text-text-muted mt-2">
          {campaign.description}
        </p>

        <div className="mt-4 bg-surface-tint rounded-lg p-3 flex items-center justify-between border border-border">
          <div className="flex flex-col">
            <span className="font-body text-label-caps text-text-muted uppercase">
              {campaign.targetAssetsLabel}
            </span>
            <span className="font-body text-label-md font-semibold text-text-primary mt-0.5">
              {campaign.targetAssetsValue}
            </span>
          </div>
          <div className="text-right">
            <span className="font-body text-label-caps text-text-muted uppercase">
              {campaign.metaRightLabel}
            </span>
            <span
              className={`font-body text-label-md font-semibold block mt-0.5 ${
                campaign.metaRightLabel === "EXPIRES"
                  ? "text-error"
                  : "text-verified"
              }`}
            >
              {campaign.metaRightValue}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border font-body text-label-md">
        <span className="text-text-muted">
          Code:{" "}
          <code className="font-mono bg-surface-tint px-1.5 py-0.5 rounded text-primary font-semibold border border-border">
            {campaign.code}
          </code>
        </span>
        <button
          type="button"
          onClick={() => onEdit?.(campaign)}
          className="text-secondary hover:underline font-bold transition-colors cursor-pointer flex items-center gap-1"
        >
          <span>Edit Rule</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </Card>
  );
}
