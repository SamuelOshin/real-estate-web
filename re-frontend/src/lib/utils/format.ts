import { siteConfig } from "@/config/site.config";

/**
 * Formats a Naira amount with tabular numeral alignment, per
 * docs/design-system.md ("Naira Typography" section). Always pair with the
 * `price-display` or `tabular-nums` text style in the component.
 */
export function formatNaira(amount: number): string {
  return `${siteConfig.currency.symbol}${amount.toLocaleString("en-NG")}`;
}

export function formatNairaCompact(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `${siteConfig.currency.symbol}${(amount / 1_000_000_000).toFixed(1).replace(/\.0$/, "")}B`;
  }
  if (amount >= 1_000_000) {
    const millions = amount / 1_000_000;
    const formatted = millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(2).replace(/0$/, "");
    return `${siteConfig.currency.symbol}${formatted}M`;
  }
  if (amount >= 1_000) {
    return `${siteConfig.currency.symbol}${(amount / 1_000).toFixed(0)}k`;
  }
  return formatNaira(amount);
}

export function formatPlotSize(sqm: number, acres?: number): string {
  const parts = [`${sqm.toLocaleString("en-NG")} SQM`];
  if (acres) parts.push(`${acres} acres`);
  return parts.join(" \u00b7 ");
}
