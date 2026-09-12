export function InspectionDaySteps() {
  const steps = [
    {
      num: "01",
      title: "Departure & Safety Briefing",
      description:
        "Meet our conveyancing leads at the VIP lounge. Receive customized plot blueprints, aerial layout maps, and bottled refreshments.",
    },
    {
      num: "02",
      title: "Cadastral Beacon Verification",
      description:
        "Walk the perimeter with our licensed surveyor. Validate corner boundary markers using handheld RTK GPS receivers against state surveys.",
    },
    {
      num: "03",
      title: "Alausa Title Dossier Handover",
      description:
        "Inspect physical certified true copies (CTC) of Governor’s Consents, registered survey plans, and official gazette numbers on-site.",
    },
    {
      num: "04",
      title: "Zero Commitment / Allocation Q&A",
      description:
        "Zero high-pressure sales tactics. Return relaxed to the pickup lounge with complete documentation for your independent legal review.",
    },
  ];

  return (
    <div className="rounded-xl border border-border bg-surface p-6 shadow-1">
      <div className="mb-4">
        <h3 className="font-display text-headline-md font-bold text-primary">
          What to Expect on Your Inspection Day
        </h3>
        <p className="mt-1 font-body text-body-sm text-text-muted">
          We hold site tours to the standard of an institutional asset audit. Here is the scheduled breakdown of every departure:
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {steps.map((step) => (
          <div
            key={step.num}
            className="flex flex-col gap-2 rounded-lg border border-border bg-surface-card p-4 shadow-1"
          >
            <div className="flex items-center justify-between">
              <span className="rounded bg-surface-tint px-2.5 py-0.5 font-display text-label-caps font-bold text-primary">
                {step.num}
              </span>
              <span className="material-symbols-outlined text-base text-secondary">verified</span>
            </div>
            <h4 className="font-heading text-headline-sm font-semibold text-primary">
              {step.title}
            </h4>
            <p className="font-body text-body-sm text-text-muted leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
