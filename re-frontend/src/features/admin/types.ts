export interface PublishPropertyFormData {
  // Step 1: Estate Identity & Statutory Corridor
  estateTitle: string;
  corridor: string;
  lga: string;
  latitude: string;
  longitude: string;
  cadastralPillarId: string;
  devPhase: "phase_1" | "phase_2" | "phase_3" | "banking";

  // Step 2: Demarcations, Topography & Infrastructure
  plotDemarcations: {
    sqm300: { enabled: boolean; allocated: number };
    sqm500: { enabled: boolean; allocated: number };
    sqm1000: { enabled: boolean; allocated: number };
  };
  topography: "dry_table" | "hilltop_ridge" | "reclaimed_compacted";
  infrastructure: {
    perimeterFencing: boolean;
    pavedSpineRoad: boolean;
    hydraulicDrainage: boolean;
    transformerSolar: boolean;
    surveyBeacons: boolean;
    armedSecurity: boolean;
  };

  // Step 3: Statutory Legal Title & Conveyancing Dossier
  titleInstrument: string;
  registryRefNumber: string;
  redCopySurveyUploaded: boolean;
  redCopySurveyFileName: string;
  govConsentCtcUploaded: boolean;
  govConsentCtcFileName: string;
  eiaReportUploaded: boolean;
  eiaReportFileName: string;
  zeroOmoOnileGuarantee: boolean;

  // Step 4: Financial Valuation, Installments & Escrow
  basePriceNgn: number;
  installments6Month: boolean;
  installments12Month: boolean;
  promoRule: string;
  zeroHiddenFeesCovenant: boolean;
}

export const initialPublishFormData: PublishPropertyFormData = {
  estateTitle: "The Sovereign Heritage Crest & Golf Resort",
  corridor: "Epe Expressway Megacity Corridor, Lagos",
  lga: "Epe LGA, Lagos State",
  latitude: '6\u00B035\'44.2"N (6.595611)',
  longitude: '3\u00B059\'12.8"E (3.986889)',
  cadastralPillarId: "LS-EP-2024-PL409",
  devPhase: "phase_3",

  plotDemarcations: {
    sqm300: { enabled: true, allocated: 18 },
    sqm500: { enabled: true, allocated: 42 },
    sqm1000: { enabled: true, allocated: 6 },
  },
  topography: "dry_table",
  infrastructure: {
    perimeterFencing: true,
    pavedSpineRoad: true,
    hydraulicDrainage: true,
    transformerSolar: true,
    surveyBeacons: true,
    armedSecurity: true,
  },

  titleInstrument: "Governor's Consent (Lagos State Lands Registry Validated)",
  registryRefNumber: "AL-REG/EP/2024/0984-GC-VOL-12",
  redCopySurveyUploaded: true,
  redCopySurveyFileName: "Survey_Pln_EP_984.pdf",
  govConsentCtcUploaded: true,
  govConsentCtcFileName: "Gov_Consent_Vol12.pdf",
  eiaReportUploaded: false,
  eiaReportFileName: "",
  zeroOmoOnileGuarantee: true,

  basePriceNgn: 38500000,
  installments6Month: true,
  installments12Month: true,
  promoRule: "Early-Bird Outright Settlement (-10% Discount Campaign)",
  zeroHiddenFeesCovenant: true,
};
