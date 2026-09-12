"use client";

import { Input, Select } from "@/components/ui";
import type { PublishPropertyFormData } from "../../types";

export interface StepLegalTitleProps {
  formData: PublishPropertyFormData;
  onChange: <K extends keyof PublishPropertyFormData>(
    field: K,
    value: PublishPropertyFormData[K]
  ) => void;
  onFileUpload?: (field: "eiaReport", fileName: string) => void;
}

export function StepLegalTitle({
  formData,
  onChange,
  onFileUpload,
}: StepLegalTitleProps) {
  return (
    <div className="bg-surface-card rounded-xl p-6 border border-border shadow-1 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-surface-tint text-secondary border border-border">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h2 className="font-display text-headline-md font-bold text-primary">
              Statutory Legal Title &amp; Conveyancing Dossier
            </h2>
            <p className="font-body text-body-sm text-text-muted">
              Validated against Lagos Alausa Lands Bureau and FCT Abuja Geographic Information Systems (AGIS).
            </p>
          </div>
        </div>
        <span className="font-body text-label-caps px-2.5 py-1 rounded bg-secondary text-white font-bold">
          SOVEREIGN GUARANTEED
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Title Instrument */}
        <div className="flex flex-col gap-1.5">
          <label className="font-body text-label-lg text-text-primary font-semibold">
            Statutory Title Instrument <span className="text-error">*</span>
          </label>
          <Select
            value={formData.titleInstrument}
            onChange={(e) => onChange("titleInstrument", e.target.value)}
          >
            <option>Governor&apos;s Consent (Lagos State Lands Registry Validated)</option>
            <option>Certificate of Occupancy (FCT AGIS / Lagos State C of O)</option>
            <option>Government Gazette (#44 Vol 21 Approved Excision)</option>
            <option>Registered Cadastral Survey &amp; Excision in Progress</option>
            <option>Federal Government Allocation &amp; Deed of Sublease</option>
          </Select>
        </div>

        {/* Lands Registry Reference */}
        <div className="flex flex-col gap-1.5">
          <label className="font-body text-label-lg text-text-primary font-semibold">
            Lands Registry Reference Dossier Number <span className="text-error">*</span>
          </label>
          <Input
            type="text"
            required
            value={formData.registryRefNumber}
            onChange={(e) => onChange("registryRefNumber", e.target.value)}
            placeholder="e.g. LND/EP/2024/0984-CO"
            className="font-mono font-semibold"
          />
        </div>

        {/* Mandatory Deeds & Surveys Vault */}
        <div className="md:col-span-2 flex flex-col gap-3">
          <span className="font-body text-label-lg text-text-primary font-semibold">
            Mandatory Institutional Deeds &amp; Surveys (High-Resolution Cryptographic Vault)
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Red Copy Survey Plan */}
            <div className="p-4 rounded-xl bg-surface border border-border flex flex-col justify-between gap-3 text-center hover:bg-surface-tint transition-all">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-surface-tint text-secondary flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-body text-label-md font-bold text-text-primary">
                    Registered Red Copy Survey
                  </span>
                  <span className="font-body text-label-caps bg-badge-cofo-bg text-badge-cofo-text border border-badge-cofo-border px-2 py-0.5 rounded font-bold mt-1">
                    SURVEYOR GENERAL SEALED
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-left p-2 rounded bg-surface-card border border-border">
                <span className="font-body text-label-caps text-text-primary truncate">
                  {formData.redCopySurveyFileName || "Survey_Pln_EP_984.pdf"}
                </span>
                <svg className="w-4 h-4 text-verified shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            {/* Certified True Copy */}
            <div className="p-4 rounded-xl bg-surface border border-border flex flex-col justify-between gap-3 text-center hover:bg-surface-tint transition-all">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-surface-tint text-secondary flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-body text-label-md font-bold text-text-primary">
                    Gov. Consent CTC Copy
                  </span>
                  <span className="font-body text-label-caps bg-badge-cofo-bg text-badge-cofo-text border border-badge-cofo-border px-2 py-0.5 rounded font-bold mt-1">
                    ALAUSA CONVEYED
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-left p-2 rounded bg-surface-card border border-border">
                <span className="font-body text-label-caps text-text-primary truncate">
                  {formData.govConsentCtcFileName || "Gov_Consent_Vol12.pdf"}
                </span>
                <svg className="w-4 h-4 text-verified shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            {/* Drag & Drop Upload Soil & EIA Report */}
            <label className="p-4 rounded-xl bg-surface border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 text-center cursor-pointer hover:bg-surface-tint transition-all">
              <input
                type="file"
                className="hidden"
                accept=".pdf,.tiff"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const name = e.target.files[0].name;
                    onChange("eiaReportUploaded", true);
                    onChange("eiaReportFileName", name);
                    onFileUpload?.("eiaReport", name);
                  }
                }}
              />
              <svg className="w-7 h-7 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="font-body text-label-md font-bold text-secondary">
                {formData.eiaReportFileName || "Upload Soil & EIA Report"}
              </span>
              <span className="font-body text-label-caps text-text-muted">
                PDF, TIFF, max 45MB
              </span>
            </label>
          </div>
        </div>

        {/* Zero "Omo-Onile" Statutory Guarantee Switch */}
        <div className="md:col-span-2 p-4 rounded-xl bg-primary text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-1">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary-hover text-surface-tint shrink-0">
              <svg className="w-6 h-6 text-verified" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-headline-sm font-bold text-white leading-tight">
                Zero &ldquo;Omo-Onile&rdquo; Statutory Indemnity Guarantee
              </span>
              <p className="font-body text-body-sm text-surface-tint opacity-90 mt-0.5">
                Underwritten by Prison Gihon Legal Conveyancing Syndicate with full civil indemnification warranty for diaspora buyers.
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={formData.zeroOmoOnileGuarantee}
              onChange={(e) => onChange("zeroOmoOnileGuarantee", e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-14 h-7 bg-primary-hover peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-secondary"></div>
          </label>
        </div>
      </div>
    </div>
  );
}
