import { Badge } from "@/components/ui";
import { formatPlotSize } from "@/lib/utils/format";
import type { Property } from "@/types/property";

export interface SpecSheetProps {
  property: Property;
}

export function SpecSheet({ property }: SpecSheetProps) {
  const specs = [
    {
      label: "Plot Demarcation",
      value: formatPlotSize(property.plotSizeSqm, property.plotSizeAcres),
      detail: "Also available in 300 SQM Executive plots",
    },
    {
      label: "Title Status",
      value: property.verification.label,
      detail: "Clean search at Alausa Lands Registry",
    },
    {
      label: "Topography",
      value: property.topography || "100% Dry Table Land",
      detail: "Zero sandfilling / immediate footing",
    },
    {
      label: "Plot Allocation",
      value: "Instant Physical",
      detail: "Numbered concrete beacons on handover",
    },
    {
      label: "GPS Cadastral Zone",
      value: "Epe Growth Corridor",
      detail: "Minna Datum \u2022 AGIS/Lagos standard",
    },
    {
      label: "Security Title",
      value: "Zero Encroachment",
      detail: "Surveyor-General registered boundary",
    },
  ];

  return (
    <div className="rounded-xl border border-border bg-surface-card p-6 shadow-1">
      {/* Header Bar */}
      <div className="-mx-6 -mt-6 mb-6 flex items-center justify-between rounded-t-xl bg-surface p-4 border-b border-border">
        <div>
          <span className="font-body text-label-caps uppercase tracking-wider text-secondary">
            Institutional Property Metrics
          </span>
          <h3 className="font-display text-headline-md font-bold text-primary">
            Key Estate Specifications
          </h3>
        </div>
        <Badge variant="verified-cofo">
          Audited 2025
        </Badge>
      </div>

      {/* 6 Metric Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {specs.map((item) => (
          <div key={item.label} className="rounded-lg border border-border bg-surface p-4">
            <div className="mb-1 font-body text-label-md uppercase font-semibold text-secondary">
              {item.label}
            </div>
            <div className="font-display text-headline-sm font-bold text-primary">
              {item.value}
            </div>
            <p className="mt-1 font-body text-body-sm text-text-muted">
              {item.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
