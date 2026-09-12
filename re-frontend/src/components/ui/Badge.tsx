import { HTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";
import type { TitleStatus } from "@/types/property";

/**
 * The three "verified-*" variants are semantic and map exactly to the title
 * statuses a listing can have (docs/design-system.md "Verification Title
 * Badges"). Don't repurpose those three colors for anything else — the
 * brief is explicit that emerald/blue/slate here mean something legally
 * specific to a buyer, not just a color choice.
 */
const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded font-body text-label-caps uppercase border px-2.5 py-1",
  {
    variants: {
      variant: {
        neutral: "bg-surface-tint border-badge-gazette-border text-text-muted",
        "verified-cofo": "bg-badge-cofo-bg border-badge-cofo-border text-badge-cofo-text",
        "verified-gazette":
          "bg-badge-gazette-bg border-badge-gazette-border text-badge-gazette-text",
        "verified-freehold":
          "bg-badge-freehold-bg border-badge-freehold-border text-badge-freehold-text",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
  )
);
Badge.displayName = "Badge";

/** Maps a Property's title status to the right Badge variant + label, so
 * call sites never have to know the mapping themselves. */
const titleStatusMap: Record<TitleStatus, { variant: BadgeProps["variant"]; label: string }> = {
  c_of_o: { variant: "verified-cofo", label: "Certificate of Occupancy" },
  gazette_excision: { variant: "verified-gazette", label: "Gazette / Excision" },
  freehold_survey: { variant: "verified-freehold", label: "Freehold / Registered Survey" },
};

export interface VerificationBadgeProps {
  status: TitleStatus;
  label?: string;
  className?: string;
  compact?: boolean;
}

export function VerificationBadge({ status, label, className, compact }: VerificationBadgeProps) {
  const mapping = titleStatusMap[status];
  const displayLabel = label || mapping?.label || status;
  return (
    <Badge
      variant={mapping?.variant || "neutral"}
      className={cn(
        "whitespace-nowrap font-bold tracking-wider",
        compact && "px-2 py-0.5 text-[10px] leading-tight rounded-full backdrop-blur-sm shadow-sm",
        className
      )}
    >
      <span className={cn("material-symbols-outlined", compact ? "text-[12px]" : "text-[13px]")}>
        verified
      </span>
      <span>{displayLabel}</span>
    </Badge>
  );
}
