import { Badge, Card } from "@/components/ui";

export function RegionalOfficesList() {
  const offices = [
    {
      name: "Lagos Headquarters & Lounge",
      tag: "PRIMARY CONVOY DEPARTURE HUB",
      badge: "Flagship",
      address: "Plot 14, Admiralty Way, Lekki Phase 1, Lagos State, Nigeria",
      phone: "+234 1 800 GIHON / +234 803 123 4567",
      telHref: "+23418008374827",
      hours: "Mon – Fri: 8:00 AM – 6:00 PM | Sat: 9:00 AM – 4:00 PM",
    },
    {
      name: "Abuja Diplomatic Office",
      tag: "FEDERAL CAPITAL TERRITORY",
      address: "Suite 402, Guzape Diplomatic Zone II, Guzape, FCT Abuja",
      phone: "+234 9 461 8900",
      telHref: "+23494618900",
      hours: "Mon – Fri: 8:30 AM – 5:30 PM (AGIS Liaison Desk)",
    },
    {
      name: "Oyo / South-West Regional Hub",
      tag: "AGRI-INDUSTRIAL & DRY PORT CORRIDOR",
      address: "Moniya Inland Growth Corridor, Opposite Dry Port Terminal, Ibadan",
      phone: "+234 2 291 5500",
      telHref: "+23422915500",
      hours: "Mon – Fri: 8:00 AM – 5:00 PM",
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-headline-md font-bold text-primary">
          Physical Regional Offices
        </h3>
        <span className="font-body text-label-caps uppercase font-bold text-verified">
          3 HEADQUARTERS
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {offices.map((office) => (
          <Card key={office.name} elevation="resting" padding="sm" className="border-border">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-display text-headline-sm font-semibold text-primary">
                  {office.name}
                </h4>
                <p className="font-body text-label-caps uppercase font-semibold text-secondary">
                  {office.tag}
                </p>
              </div>
              {office.badge && (
                <Badge variant="verified-cofo">
                  {office.badge}
                </Badge>
              )}
            </div>

            <p className="mt-2 font-body text-body-sm text-text-muted flex items-start gap-1.5">
              <span className="material-symbols-outlined text-base text-primary flex-shrink-0 mt-0.5">
                pin_drop
              </span>
              <span>{office.address}</span>
            </p>

            <div className="mt-2 flex flex-col gap-1.5 border-t border-border pt-2 font-body text-body-sm text-text-muted">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base text-secondary flex-shrink-0">
                  call
                </span>
                <a href={`tel:${office.telHref}`} className="text-primary hover:text-secondary font-medium">
                  {office.phone}
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base text-verified flex-shrink-0">
                  schedule
                </span>
                <span>{office.hours}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
