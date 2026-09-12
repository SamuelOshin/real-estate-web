"use client";

import { Input, Select, TileRadioGroup, type TileRadioOption } from "@/components/ui";
import type { PublishPropertyFormData } from "../../types";

export interface StepEstateIdentityProps {
  formData: PublishPropertyFormData;
  onChange: <K extends keyof PublishPropertyFormData>(
    field: K,
    value: PublishPropertyFormData[K]
  ) => void;
  onSyncRtk?: () => void;
  onFetchLgaCadastre?: () => void;
}

const devPhaseOptions: TileRadioOption[] = [
  {
    value: "phase_1",
    title: "PHASE 01: Pegging & Clearing",
    subtitle: "Bulldozing & perimeter beaconing",
  },
  {
    value: "phase_2",
    title: "PHASE 02: Drainage & Gatehouse",
    subtitle: "Civil works in active mobilization",
  },
  {
    value: "phase_3",
    title: "PHASE 03: Immediate Allocation",
    subtitle: "Instant plot layout hand-over (Ready)",
  },
  {
    value: "banking",
    title: "BANKING: Capital Land Banking",
    subtitle: "Strategic 5-year capital appreciation",
  },
];

export function StepEstateIdentity({
  formData,
  onChange,
  onSyncRtk,
  onFetchLgaCadastre,
}: StepEstateIdentityProps) {
  return (
    <div className="bg-surface-card rounded-xl p-6 border border-border shadow-1 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-surface-tint text-secondary border border-border">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h2 className="font-display text-headline-md font-bold text-primary">
              Estate Identity &amp; Statutory Corridor
            </h2>
            <p className="font-body text-body-sm text-text-muted">
              Formal cadastral registration name matching Alausa Lands Directorate gazette index.
            </p>
          </div>
        </div>
        <span className="font-body text-label-caps px-2.5 py-1 rounded bg-surface-tint-strong text-primary border border-border font-bold">
          REQUIRED FIELDSET
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Official Estate Title */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="font-body text-label-lg text-text-primary font-semibold flex items-center justify-between">
            <span>
              Official Estate Title <span className="text-error">*</span>
            </span>
            <span className="font-body text-label-caps text-text-muted font-normal">
              Displayed prominently across institutional brochures
            </span>
          </label>
          <Input
            type="text"
            required
            value={formData.estateTitle}
            onChange={(e) => onChange("estateTitle", e.target.value)}
            placeholder="e.g. Imperial Horizon Estate Phase II"
          />
        </div>

        {/* Corridor / Regional Zone */}
        <div className="flex flex-col gap-1.5">
          <label className="font-body text-label-lg text-text-primary font-semibold">
            Corridor / Regional Zone <span className="text-error">*</span>
          </label>
          <Select
            value={formData.corridor}
            onChange={(e) => onChange("corridor", e.target.value)}
          >
            <option>Epe Expressway Megacity Corridor, Lagos</option>
            <option>Ibeju-Lekki Free Trade Zone / Deep Sea Port Axis</option>
            <option>Guzape Phase II Diplomatic Enclave, Abuja FCT</option>
            <option>Alaro City / Lekki-Epe Industrial Growth Corridor</option>
            <option>Moniya Inland Dry Port Axis, Ibadan, Oyo</option>
          </Select>
        </div>

        {/* Local Government Area (LGA) */}
        <div className="flex flex-col gap-1.5">
          <label className="font-body text-label-lg text-text-primary font-semibold">
            Local Government Area (LGA)
          </label>
          <div className="flex gap-2">
            <Input
              type="text"
              value={formData.lga}
              onChange={(e) => onChange("lga", e.target.value)}
              placeholder="e.g. Epe LGA, Lagos State"
              className="flex-1"
            />
            <button
              type="button"
              onClick={onFetchLgaCadastre}
              title="Fetch Alausa Local Cadastre"
              className="px-3.5 py-2 bg-surface-tint border border-border text-secondary rounded-lg hover:bg-surface-tint-strong transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </button>
          </div>
        </div>

        {/* GPS Survey Waypoints & RTK Sync */}
        <div className="flex flex-col gap-3 md:col-span-2 p-4 bg-surface rounded-xl border border-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.343 9.344c5.857-5.858 15.355-5.858 21.213 0" />
              </svg>
              <span className="font-body text-label-lg text-text-primary font-bold">
                Precise Statutory GPS Waypoints (UTM Minna Datum)
              </span>
            </div>
            <button
              type="button"
              onClick={onSyncRtk}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-secondary text-white font-body text-label-md hover:bg-primary transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Sync Handheld RTK GNSS Receiver</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1">
            <div>
              <span className="font-body text-label-caps text-text-muted font-medium">Latitude (N)</span>
              <Input
                type="text"
                value={formData.latitude}
                onChange={(e) => onChange("latitude", e.target.value)}
                className="mt-1 font-mono text-body-sm"
              />
            </div>
            <div>
              <span className="font-body text-label-caps text-text-muted font-medium">Longitude (E)</span>
              <Input
                type="text"
                value={formData.longitude}
                onChange={(e) => onChange("longitude", e.target.value)}
                className="mt-1 font-mono text-body-sm"
              />
            </div>
            <div>
              <span className="font-body text-label-caps text-text-muted font-medium">Cadastral Pillar ID</span>
              <Input
                type="text"
                value={formData.cadastralPillarId}
                onChange={(e) => onChange("cadastralPillarId", e.target.value)}
                className="mt-1 font-mono font-bold text-secondary text-body-sm"
              />
            </div>
          </div>
        </div>

        {/* Development Stage / Phase */}
        <div className="flex flex-col gap-2.5 md:col-span-2">
          <label className="font-body text-label-lg text-text-primary font-semibold">
            Development Phase &amp; Allocation Urgency
          </label>
          <TileRadioGroup
            name="devPhase"
            options={devPhaseOptions}
            value={formData.devPhase}
            onChange={(val) =>
              onChange("devPhase", val as PublishPropertyFormData["devPhase"])
            }
          />
        </div>
      </div>
    </div>
  );
}
