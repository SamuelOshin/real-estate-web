"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui";
import { PropertyCard } from "@/features/properties/components/PropertyCard";
import { transitions } from "@/lib/motion/transitions";
import type { Property } from "@/types/property";
import {
  type PublishPropertyFormData,
  initialPublishFormData,
} from "../types";
import { StepEstateIdentity } from "./publish-steps/StepEstateIdentity";
import { StepDemarcation } from "./publish-steps/StepDemarcation";
import { StepLegalTitle } from "./publish-steps/StepLegalTitle";
import { StepFinancials } from "./publish-steps/StepFinancials";
import { PublishSuccess } from "./publish-steps/PublishSuccess";

export function PublishPropertyWizard() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState<PublishPropertyFormData>(initialPublishFormData);
  const [isSuccess, setIsSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const updateFormData = <K extends keyof PublishPropertyFormData>(
    field: K,
    value: PublishPropertyFormData[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Construct dynamic Property for live PropertyCard preview
  const previewProperty: Property = {
    id: "live-preview-listing",
    slug: formData.estateTitle
      ? formData.estateTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
      : "sovereign-heritage-crest",
    title: formData.estateTitle || "The Sovereign Heritage Crest & Golf Resort",
    description: "Official cadastral listing under Alausa / AGIS validation.",
    priceNgn: formData.basePriceNgn || 38500000,
    plotSizeSqm: formData.plotDemarcations.sqm500.enabled
      ? 500
      : formData.plotDemarcations.sqm300.enabled
      ? 300
      : 1000,
    location: {
      area: formData.corridor || "Epe Expressway Megacity Corridor, Lagos",
      state: formData.corridor.includes("Abuja")
        ? "Abuja"
        : formData.corridor.includes("Ibadan")
        ? "Oyo"
        : "Lagos",
    },
    verification: {
      status: formData.titleInstrument.includes("Consent")
        ? "c_of_o"
        : formData.titleInstrument.includes("Gazette")
        ? "gazette_excision"
        : "freehold_survey",
      label: formData.titleInstrument.split("(")[0].trim() || "Governor's Consent",
    },
    media: [
      {
        id: "preview-cover",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKiUbzxCzlS4eIFF2qvVP78YOm6J0Xx0u5IBEKxVlfnTJrXuMJhzTXphcjGerDJu4jGS61OLUEyxRde6iZB7U5PLpkjCoRW0bNDGRvvc6ZfJJBRWBc8ckQBimsQ_u0DJodepJiPoGqLLnDC5ScOjrQROQo6LU5a-4Pe0KP2aWnIJuoBX8jZRIjKPXynPgBVRyTsW16lcZ-yGHC5nZ4VLVFkOT_mDSBTDcOAGIjvqq52iirvYeOFPFm5w",
        thumbnailUrl:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBKiUbzxCzlS4eIFF2qvVP78YOm6J0Xx0u5IBEKxVlfnTJrXuMJhzTXphcjGerDJu4jGS61OLUEyxRde6iZB7U5PLpkjCoRW0bNDGRvvc6ZfJJBRWBc8ckQBimsQ_u0DJodepJiPoGqLLnDC5ScOjrQROQo6LU5a-4Pe0KP2aWnIJuoBX8jZRIjKPXynPgBVRyTsW16lcZ-yGHC5nZ4VLVFkOT_mDSBTDcOAGIjvqq52iirvYeOFPFm5w",
        type: "image",
        sortOrder: 1,
      },
    ],
    status: "published",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setIsSuccess(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Toast Feedback */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={transitions.snappy}
            className="fixed bottom-6 right-6 z-50 p-4 bg-primary text-white rounded-lg shadow-3 font-body text-body-sm flex items-center gap-3 border border-surface-tint-strong"
          >
            <span className="material-symbols-outlined text-verified text-xl">check_circle</span>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Conveyancing Multi-Step Progress Tracker */}
      <div className="w-full bg-surface-card border border-border rounded-xl shadow-1 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Step 1 */}
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-label-lg shrink-0 transition-all ${
                currentStep > 1
                  ? "bg-badge-cofo-bg text-badge-cofo-text border border-badge-cofo-border"
                  : currentStep === 1
                  ? "bg-secondary text-white ring-4 ring-surface-tint-strong"
                  : "bg-surface text-text-muted border border-border"
              }`}
            >
              {currentStep > 1 ? (
                <span className="material-symbols-outlined text-[20px]">check</span>
              ) : (
                "01"
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <span
                className={`font-body text-label-caps uppercase tracking-wider font-bold ${
                  currentStep === 1
                    ? "text-secondary"
                    : currentStep > 1
                    ? "text-verified"
                    : "text-text-muted"
                }`}
              >
                {currentStep > 1 ? "Step 01 • Complete" : "Step 01 • Active"}
              </span>
              <span className="font-heading text-[15px] font-bold text-text-primary truncate">
                Estate Corridor &amp; Phase
              </span>
            </div>
          </button>

          {/* Step 2 */}
          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-label-lg shrink-0 transition-all ${
                currentStep > 2
                  ? "bg-badge-cofo-bg text-badge-cofo-text border border-badge-cofo-border"
                  : currentStep === 2
                  ? "bg-secondary text-white ring-4 ring-surface-tint-strong"
                  : "bg-surface text-text-muted border border-border"
              }`}
            >
              {currentStep > 2 ? (
                <span className="material-symbols-outlined text-[20px]">check</span>
              ) : (
                "02"
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <span
                className={`font-body text-label-caps uppercase tracking-wider font-bold ${
                  currentStep === 2
                    ? "text-secondary"
                    : currentStep > 2
                    ? "text-verified"
                    : "text-text-muted"
                }`}
              >
                {currentStep > 2
                  ? "Step 02 • Complete"
                  : currentStep === 2
                  ? "Step 02 • Active"
                  : "Step 02 • Pending"}
              </span>
              <span className="font-heading text-[15px] font-bold text-text-primary truncate">
                Cadastral &amp; Topography
              </span>
            </div>
          </button>

          {/* Step 3 */}
          <button
            type="button"
            onClick={() => setCurrentStep(3)}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-label-lg shrink-0 transition-all ${
                currentStep > 3
                  ? "bg-badge-cofo-bg text-badge-cofo-text border border-badge-cofo-border"
                  : currentStep === 3
                  ? "bg-secondary text-white ring-4 ring-surface-tint-strong"
                  : "bg-surface text-text-muted border border-border"
              }`}
            >
              {currentStep > 3 ? (
                <span className="material-symbols-outlined text-[20px]">check</span>
              ) : (
                "03"
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <span
                className={`font-body text-label-caps uppercase tracking-wider font-bold ${
                  currentStep === 3
                    ? "text-secondary"
                    : currentStep > 3
                    ? "text-verified"
                    : "text-text-muted"
                }`}
              >
                {currentStep > 3
                  ? "Step 03 • Complete"
                  : currentStep === 3
                  ? "Step 03 • Active"
                  : "Step 03 • Legal Title"}
              </span>
              <span className="font-heading text-[15px] font-bold text-text-primary truncate">
                Deed &amp; Gazette Verification
              </span>
            </div>
          </button>

          {/* Step 4 */}
          <button
            type="button"
            onClick={() => setCurrentStep(4)}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-label-lg shrink-0 transition-all ${
                currentStep === 4
                  ? "bg-secondary text-white ring-4 ring-surface-tint-strong"
                  : "bg-surface text-text-muted border border-border"
              }`}
            >
              04
            </div>
            <div className="flex flex-col min-w-0">
              <span
                className={`font-body text-label-caps uppercase tracking-wider font-bold ${
                  currentStep === 4 ? "text-secondary" : "text-text-muted"
                }`}
              >
                {currentStep === 4 ? "Step 04 • Active" : "Step 04 • Financials"}
              </span>
              <span className="font-display text-[15px] font-bold text-text-primary truncate">
                Pricing, Levies &amp; Escrow
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Main Administrative Workbench Grid (Left 65% / Right 35% Sticky Inspector) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* LEFT 65% FORM DOSSIER */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={transitions.smooth}
            >
              {currentStep === 1 && (
                <StepEstateIdentity
                  formData={formData}
                  onChange={updateFormData}
                  onSyncRtk={() =>
                    showToast("Synced with Handheld RTK GNSS Receiver (Accuracy: ±2cm).")
                  }
                  onFetchLgaCadastre={() =>
                    showToast("Lagos Alausa Lands Directorate index synced.")
                  }
                />
              )}

              {currentStep === 2 && (
                <StepDemarcation formData={formData} onChange={updateFormData} />
              )}

              {currentStep === 3 && (
                <StepLegalTitle
                  formData={formData}
                  onChange={updateFormData}
                  onFileUpload={(_field, fileName) =>
                    showToast(`Attached file: ${fileName}`)
                  }
                />
              )}

              {currentStep === 4 && (
                <StepFinancials formData={formData} onChange={updateFormData} />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Form Step Navigation Footer */}
          <div className="bg-surface-card rounded-xl p-4 border border-border shadow-1 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handlePrevStep}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-base">arrow_back</span>
                  <span>Previous Step</span>
                </Button>
              )}
              <Button
                type="button"
                variant="secondary"
                onClick={() => showToast("Draft saved locally to session cache.")}
                className="flex-1 sm:flex-initial"
              >
                Save Draft
              </Button>
            </div>

            <div className="font-body text-body-sm text-text-muted">
              Step <span className="font-bold text-text-primary">{currentStep}</span> of 4
            </div>

            <Button
              type="button"
              variant="primary"
              onClick={handleNextStep}
              className="w-full sm:w-auto flex items-center justify-center gap-1"
            >
              <span>{currentStep < 4 ? "Next Step" : "Validate & Publish Listing"}</span>
              <span className="material-symbols-outlined text-base">
                {currentStep < 4 ? "arrow_forward" : "check"}
              </span>
            </Button>
          </div>
        </div>

        {/* RIGHT 35% STICKY INSPECTOR PREVIEW */}
        <div className="xl:col-span-4 flex flex-col gap-6 xl:sticky xl:top-24">
          {/* Live Marketplace Card Rendering */}
          <div className="bg-surface-card rounded-xl border border-border shadow-2 overflow-hidden">
            <div className="p-4 bg-surface-tint border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-base">public</span>
                <span className="font-body text-label-caps font-bold text-text-primary uppercase tracking-wider">
                  Live Public Viewport Preview
                </span>
              </div>
              <span className="font-body text-label-caps px-2 py-0.5 rounded-full bg-badge-cofo-bg text-badge-cofo-text border border-badge-cofo-border font-bold">
                SYNCHRONIZED
              </span>
            </div>

            {/* Deliberate Component Reuse: PropertyCard */}
            <div className="p-4">
              <PropertyCard property={previewProperty} />
            </div>
          </div>

          {/* Statutory Publishing Readiness Checklist Card */}
          <div className="bg-surface-card rounded-xl p-5 border border-border shadow-1 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-lg">checklist</span>
                <span className="font-heading text-[15px] font-bold text-text-primary">
                  Conveyancing Audit Checklist
                </span>
              </div>
              <span className="font-body text-label-caps px-2 py-0.5 rounded-full bg-surface-tint-strong text-primary border border-border font-bold">
                3 of 5 READY
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between p-3 bg-surface rounded-lg border border-border">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-verified text-base shrink-0">check_circle</span>
                  <span className="font-body text-body-sm font-medium text-text-primary">
                    Registered Survey Coordinates
                  </span>
                </div>
                <span className="font-body text-label-caps font-bold text-verified">
                  VERIFIED
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-surface rounded-lg border border-border">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-verified text-base shrink-0">check_circle</span>
                  <span className="font-body text-body-sm font-medium text-text-primary">
                    Alausa Lands Bureau Record Linked
                  </span>
                </div>
                <span className="font-body text-label-caps font-bold text-verified">
                  CONFIRMED
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-surface rounded-lg border border-border">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-verified text-base shrink-0">check_circle</span>
                  <span className="font-body text-body-sm font-medium text-text-primary">
                    100% Dry Topography Hydrology
                  </span>
                </div>
                <span className="font-body text-label-caps font-bold text-verified">
                  CERTIFIED
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-surface-tint rounded-lg border border-border">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-base shrink-0">schedule</span>
                  <span className="font-body text-body-sm font-semibold text-text-primary">
                    High-Res Drone Imagery (2/5)
                  </span>
                </div>
                <span className="font-body text-label-caps font-bold text-secondary">
                  INCOMPLETE
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-surface-tint rounded-lg border border-border">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-base shrink-0">history_edu</span>
                  <span className="font-body text-body-sm font-semibold text-text-primary">
                    Legal Solicitor Sign-Off Seal
                  </span>
                </div>
                <span className="font-body text-label-caps font-bold text-secondary">
                  AWAITING
                </span>
              </div>
            </div>

            {/* Publication Actions */}
            <div className="flex flex-col gap-2.5 pt-2">
              <Button
                type="button"
                variant="primary"
                onClick={() => setIsSuccess(true)}
                className="w-full flex items-center justify-center gap-1"
              >
                <span>Publish Directly to Marketplace</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  showToast("Listing queued for publication at tomorrow 08:00 AM WAT.")
                }
                className="w-full"
              >
                Schedule Automated Embargo Launch
              </Button>
            </div>

            <div className="pt-2 text-center border-t border-border">
              <span className="font-body text-label-caps text-text-muted flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                Cryptographically signed under SCUML License No. 084920
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {isSuccess && (
        <PublishSuccess
          formData={formData}
          onReset={() => {
            setIsSuccess(false);
            setCurrentStep(1);
            setFormData(initialPublishFormData);
          }}
        />
      )}
    </div>
  );
}
