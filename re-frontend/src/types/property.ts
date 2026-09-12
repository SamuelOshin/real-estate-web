export type TitleStatus = "c_of_o" | "gazette_excision" | "freehold_survey";

export interface VerificationDetail {
  status: TitleStatus;
  label: string; // e.g. "Certificate of Occupancy"
}

export interface PropertyMedia {
  id: string;
  url: string;
  thumbnailUrl: string;
  type: "image" | "video";
  sortOrder: number;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  priceNgn: number;
  priceUsdEquivalent?: number;
  plotSizeSqm: number;
  plotSizeAcres?: number;
  location: {
    area: string; // e.g. "Epe, Lagos"
    state: string;
    lat?: number;
    lng?: number;
  };
  verification: VerificationDetail;
  media: PropertyMedia[];
  status: "draft" | "pending_review" | "published" | "archived" | "sold";
  allocationUrgency?: string;
  topography?: string;
  amenities?: string[];
  paymentTerms?: string[];
  features?: string[];
  corridor?: string;
  initialDepositNgn?: number;
  projectedRoiPercent?: number;
  beaconId?: string;
  subtitle?: string;
  registrationRef?: string;
  planRef?: string;
  deedInstrument?: string;
  beaconsPlantedCount?: number;
  coordinates?: { lat: number; lng: number; formatted?: string };
  createdAt: string;
  updatedAt: string;
}
