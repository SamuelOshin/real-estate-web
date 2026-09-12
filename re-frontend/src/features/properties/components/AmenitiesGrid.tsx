export interface AmenityItem {
  name: string;
  description: string;
  category?: string;
}

export interface AmenitiesGridProps {
  amenities?: AmenityItem[];
}

const defaultAmenities: AmenityItem[] = [
  {
    name: "Smart Gatehouse",
    description: "Automated biometric visitor validation & 24/7 armed private patrol unit.",
  },
  {
    name: "Interlocking Roads",
    description: "9-meter wide concrete interlocking spine with covered deep water conduits.",
  },
  {
    name: "Solar Streetlights",
    description: "Continuous solar-powered illumination along all internal access ways.",
  },
  {
    name: "Electric Wire Fence",
    description: "High-grade 8ft sandcrete boundary wall fortified with high-voltage wire monitors.",
  },
  {
    name: "Water Reticulation",
    description: "Central industrial borehole and water softening treatment network.",
  },
  {
    name: "Green Sports Arena",
    description: "Dedicated family recreational green park, children playground, and tennis court.",
  },
];

function getAmenityIcon(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("gate") || lower.includes("security")) return "shield";
  if (lower.includes("road") || lower.includes("interlocking")) return "add_road";
  if (lower.includes("light") || lower.includes("solar")) return "solar_power";
  if (lower.includes("fence")) return "fence";
  if (lower.includes("water")) return "water_drop";
  if (lower.includes("sport") || lower.includes("park") || lower.includes("green")) return "park";
  return "verified";
}

export function AmenitiesGrid({ amenities = defaultAmenities }: AmenitiesGridProps) {
  return (
    <div className="rounded-xl border border-border bg-surface-card p-6 shadow-1">
      <div className="mb-6">
        <span className="font-body text-label-caps uppercase tracking-wider text-secondary">
          Civil Engineering Standard
        </span>
        <h3 className="font-display text-headline-md font-bold text-primary">
          Serviced Infrastructure &amp; Planned Amenities
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {amenities.map((item) => (
          <div
            key={item.name}
            className="flex items-start gap-3 rounded-lg border border-border bg-surface p-4"
          >
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-tint text-secondary font-bold">
              <span className="material-symbols-outlined text-[18px]">
                {getAmenityIcon(item.name)}
              </span>
            </div>
            <div>
              <h4 className="font-display text-headline-sm font-bold text-primary">
                {item.name}
              </h4>
              <p className="mt-1 font-body text-body-sm text-text-muted leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
