"use client";

import { TileRadioGroup, type TileRadioOption } from "@/components/ui";
import type { PublishPropertyFormData } from "../../types";

export interface StepDemarcationProps {
  formData: PublishPropertyFormData;
  onChange: <K extends keyof PublishPropertyFormData>(
    field: K,
    value: PublishPropertyFormData[K]
  ) => void;
}

const topographyOptions: TileRadioOption[] = [
  {
    value: "dry_table",
    title: "100% Dry Table Land",
    subtitle:
      "Zero sandfilling expenditure required. Solid virgin earth with immediate construction capability.",
  },
  {
    value: "hilltop_ridge",
    title: "Elevated Hilltop Ridge",
    subtitle:
      "Natural gravity drainage system. Commanding territorial views with rock & gravel underbedding.",
  },
  {
    value: "reclaimed_compacted",
    title: "Reclaimed & Compacted",
    subtitle:
      "Sandfilled, compacted, with geo-technical soil test report and civil engineering sign-off.",
  },
];

export function StepDemarcation({ formData, onChange }: StepDemarcationProps) {
  const handleDemarcationToggle = (size: "sqm300" | "sqm500" | "sqm1000") => {
    onChange("plotDemarcations", {
      ...formData.plotDemarcations,
      [size]: {
        ...formData.plotDemarcations[size],
        enabled: !formData.plotDemarcations[size].enabled,
      },
    });
  };

  const handleDemarcationCountChange = (
    size: "sqm300" | "sqm500" | "sqm1000",
    count: number
  ) => {
    onChange("plotDemarcations", {
      ...formData.plotDemarcations,
      [size]: {
        ...formData.plotDemarcations[size],
        allocated: count,
      },
    });
  };

  const handleInfrastructureToggle = (
    key: keyof PublishPropertyFormData["infrastructure"]
  ) => {
    onChange("infrastructure", {
      ...formData.infrastructure,
      [key]: !formData.infrastructure[key],
    });
  };

  return (
    <div className="bg-surface-card rounded-xl p-6 border border-border shadow-1 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-surface-tint text-secondary border border-border">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <h2 className="font-display text-headline-md font-bold text-primary">
              Demarcations, Topography &amp; Infrastructure
            </h2>
            <p className="font-body text-body-sm text-text-muted">
              Define surveyed plot layouts, soil load-bearing capacity, and verified site amenities.
            </p>
          </div>
        </div>
        <span className="font-body text-label-caps px-2.5 py-1 rounded bg-badge-cofo-bg text-badge-cofo-text border border-badge-cofo-border font-bold">
          SOIL CERTIFIED
        </span>
      </div>

      {/* Standard Plot Demarcations with Counters */}
      <div className="flex flex-col gap-3">
        <span className="font-body text-label-lg text-text-primary font-semibold">
          Available Standard Plot Demarcations
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 300 SQM */}
          <div
            className={`p-4 rounded-xl border flex flex-col justify-between gap-3 transition-all ${
              formData.plotDemarcations.sqm300.enabled
                ? "bg-surface-tint border-secondary shadow-1"
                : "bg-surface border-border opacity-70"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="font-display text-headline-sm font-bold text-primary">
                  300 SQM
                </span>
                <p className="font-body text-body-sm text-text-muted">
                  Starter Executive Villa Plot
                </p>
              </div>
              <input
                type="checkbox"
                checked={formData.plotDemarcations.sqm300.enabled}
                onChange={() => handleDemarcationToggle("sqm300")}
                className="w-5 h-5 accent-secondary cursor-pointer mt-1"
              />
            </div>
            <div className="flex items-center justify-between bg-surface-card border border-border px-3 py-1.5 rounded-lg">
              <span className="font-body text-label-caps text-text-muted uppercase font-semibold">
                Allocated Inventory
              </span>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min={0}
                  value={formData.plotDemarcations.sqm300.allocated}
                  onChange={(e) =>
                    handleDemarcationCountChange("sqm300", Number(e.target.value))
                  }
                  className="w-16 text-right font-display text-headline-sm font-bold text-primary bg-transparent outline-none"
                />
                <span className="font-body text-label-caps text-text-muted">Plots</span>
              </div>
            </div>
          </div>

          {/* 500 SQM */}
          <div
            className={`p-4 rounded-xl border flex flex-col justify-between gap-3 transition-all ${
              formData.plotDemarcations.sqm500.enabled
                ? "bg-surface-tint-strong border-secondary shadow-1"
                : "bg-surface border-border opacity-70"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="font-display text-headline-sm font-bold text-primary">
                  500 SQM
                </span>
                <p className="font-body text-body-sm text-secondary font-semibold">
                  Standard Premium Plot
                </p>
              </div>
              <input
                type="checkbox"
                checked={formData.plotDemarcations.sqm500.enabled}
                onChange={() => handleDemarcationToggle("sqm500")}
                className="w-5 h-5 accent-secondary cursor-pointer mt-1"
              />
            </div>
            <div className="flex items-center justify-between bg-surface-card border border-border px-3 py-1.5 rounded-lg">
              <span className="font-body text-label-caps text-secondary font-bold uppercase">
                Allocated Inventory
              </span>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min={0}
                  value={formData.plotDemarcations.sqm500.allocated}
                  onChange={(e) =>
                    handleDemarcationCountChange("sqm500", Number(e.target.value))
                  }
                  className="w-16 text-right font-display text-headline-sm font-bold text-secondary bg-transparent outline-none"
                />
                <span className="font-body text-label-caps text-text-muted">Plots</span>
              </div>
            </div>
          </div>

          {/* 1,000 SQM */}
          <div
            className={`p-4 rounded-xl border flex flex-col justify-between gap-3 transition-all ${
              formData.plotDemarcations.sqm1000.enabled
                ? "bg-surface-tint border-secondary shadow-1"
                : "bg-surface border-border opacity-70"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="font-display text-headline-sm font-bold text-primary">
                  1,000 SQM
                </span>
                <p className="font-body text-body-sm text-text-muted">
                  Commercial / Institutional Acreage
                </p>
              </div>
              <input
                type="checkbox"
                checked={formData.plotDemarcations.sqm1000.enabled}
                onChange={() => handleDemarcationToggle("sqm1000")}
                className="w-5 h-5 accent-secondary cursor-pointer mt-1"
              />
            </div>
            <div className="flex items-center justify-between bg-surface-card border border-border px-3 py-1.5 rounded-lg">
              <span className="font-body text-label-caps text-text-muted uppercase font-semibold">
                Allocated Inventory
              </span>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min={0}
                  value={formData.plotDemarcations.sqm1000.allocated}
                  onChange={(e) =>
                    handleDemarcationCountChange("sqm1000", Number(e.target.value))
                  }
                  className="w-16 text-right font-display text-headline-sm font-bold text-primary bg-transparent outline-none"
                />
                <span className="font-body text-label-caps text-text-muted">Plots</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Topography Grading */}
      <div className="flex flex-col gap-2 pt-2">
        <label className="font-body text-label-lg text-text-primary font-semibold flex items-center justify-between">
          <span>Certified Topographical &amp; Hydrological Grade</span>
          <span className="font-body text-label-caps bg-badge-cofo-bg text-badge-cofo-text border border-badge-cofo-border px-2 py-0.5 rounded font-bold">
            100% DRY TERRAIN
          </span>
        </label>
        <TileRadioGroup
          name="topography"
          options={topographyOptions}
          value={formData.topography}
          onChange={(val) =>
            onChange("topography", val as PublishPropertyFormData["topography"])
          }
        />
      </div>

      {/* Verified Estate Infrastructure Checklist */}
      <div className="flex flex-col gap-3 pt-2">
        <span className="font-body text-label-lg text-text-primary font-semibold">
          Institutional Infrastructure Matrix (Verified On-Ground)
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <label className="flex items-center gap-2.5 p-3 bg-surface rounded-lg border border-border hover:bg-surface-tint cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={formData.infrastructure.perimeterFencing}
              onChange={() => handleInfrastructureToggle("perimeterFencing")}
              className="accent-secondary h-4 w-4 rounded cursor-pointer"
            />
            <span className="font-body text-body-sm text-text-primary font-medium">
              Perimeter Fencing &amp; Biometric Gate
            </span>
          </label>

          <label className="flex items-center gap-2.5 p-3 bg-surface rounded-lg border border-border hover:bg-surface-tint cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={formData.infrastructure.pavedSpineRoad}
              onChange={() => handleInfrastructureToggle("pavedSpineRoad")}
              className="accent-secondary h-4 w-4 rounded cursor-pointer"
            />
            <span className="font-body text-body-sm text-text-primary font-medium">
              Paved Interlocking Spine Road
            </span>
          </label>

          <label className="flex items-center gap-2.5 p-3 bg-surface rounded-lg border border-border hover:bg-surface-tint cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={formData.infrastructure.hydraulicDrainage}
              onChange={() => handleInfrastructureToggle("hydraulicDrainage")}
              className="accent-secondary h-4 w-4 rounded cursor-pointer"
            />
            <span className="font-body text-body-sm text-text-primary font-medium">
              Underground Hydraulic Drainage
            </span>
          </label>

          <label className="flex items-center gap-2.5 p-3 bg-surface rounded-lg border border-border hover:bg-surface-tint cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={formData.infrastructure.transformerSolar}
              onChange={() => handleInfrastructureToggle("transformerSolar")}
              className="accent-secondary h-4 w-4 rounded cursor-pointer"
            />
            <span className="font-body text-body-sm text-text-primary font-medium">
              Dedicated Transformer &amp; Solar Grid
            </span>
          </label>

          <label className="flex items-center gap-2.5 p-3 bg-surface rounded-lg border border-border hover:bg-surface-tint cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={formData.infrastructure.surveyBeacons}
              onChange={() => handleInfrastructureToggle("surveyBeacons")}
              className="accent-secondary h-4 w-4 rounded cursor-pointer"
            />
            <span className="font-body text-body-sm text-text-primary font-medium">
              Numbered Survey Concrete Beacons
            </span>
          </label>

          <label className="flex items-center gap-2.5 p-3 bg-surface rounded-lg border border-border hover:bg-surface-tint cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={formData.infrastructure.armedSecurity}
              onChange={() => handleInfrastructureToggle("armedSecurity")}
              className="accent-secondary h-4 w-4 rounded cursor-pointer"
            />
            <span className="font-body text-body-sm text-text-primary font-medium">
              24/7 Armed Sovereign Security Post
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
