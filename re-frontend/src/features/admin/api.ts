import type { Inquiry, PromoCampaign, DeedComplianceItem } from "@/types/inquiry";

export const mockInquiries: Inquiry[] = [
  {
    id: "inq-1",
    buyerName: "Engr. Dapo Alabi",
    initials: "DA",
    contact: "+1 214 555 0192",
    location: "Dallas, Texas \u2022 USA",
    leadChannel: "Diaspora Portal",
    propertySlug: "the-grand-crest-estate",
    propertyName: "The Grand Crest Estate",
    plotsDemarcation: "Plot 42-45 \u2022 2 Contiguous Plots",
    status: "convoy_scheduled",
    statusLabel: "Sat 11:00 AM Convoy Scheduled",
    subtext: "Power of Attorney Dossier Prepared",
    whatsappNumber: "234800000000",
    createdAt: "2025-04-12",
  },
  {
    id: "inq-2",
    buyerName: "Mrs. Amina Bello",
    initials: "AB",
    contact: "+234 802 334 9182",
    location: "Maitama, Abuja FCT",
    leadChannel: "VIP Chauffeur",
    propertySlug: "sovereign-heights",
    propertyName: "Sovereign Heights Hilltop",
    plotsDemarcation: "Plot 12B \u2022 600 SQM Luxury Residential",
    status: "search_requested",
    statusLabel: "Alausa/AGIS Search Dossier Requested",
    subtext: "48hr Hold Active",
    whatsappNumber: "234800000000",
    createdAt: "2025-04-13",
  },
  {
    id: "inq-3",
    buyerName: "Mr. Chukwuma Obi",
    initials: "CO",
    contact: "+234 803 881 7291",
    location: "Lekki Phase 1, Lagos",
    leadChannel: "WhatsApp Hotline",
    propertySlug: "atlantic-crest-bay",
    propertyName: "Atlantic Crest Bay",
    plotsDemarcation: "2 Hectares Commercial Agro-Logistics",
    status: "pro_forma_sent",
    statusLabel: "Volume Bulk Discount Tier Applied (15% Off)",
    subtext: "Pro-Forma Sent",
    whatsappNumber: "234800000000",
    createdAt: "2025-04-14",
  },
];

export const mockPromoCampaigns: PromoCampaign[] = [
  {
    id: "promo-1",
    title: "Early-Bird Outright Settlement",
    badge: "ACTIVE",
    category: "Outright Liquidity Incentive",
    description:
      "10% instant price deduction on outright settlement verified within 14 banking days.",
    targetAssetsLabel: "TARGET ASSETS",
    targetAssetsValue: "The Grand Crest \u2022 Heritage Valley",
    metaRightLabel: "EXPIRES",
    metaRightValue: "Apr 30, 2025",
    code: "OUTRIGHT-10",
  },
  {
    id: "promo-2",
    title: "Diaspora Easter Conveyance Waiver",
    badge: "ACTIVE",
    category: "Diaspora Repatriation Perk",
    description:
      "\u20A6500,000 legal perfection allowance + complimentary 4K RTK drone topographical survey.",
    targetAssetsLabel: "MINIMUM THRESHOLD",
    targetAssetsValue: "\u20A615,000,000 Purchase",
    metaRightLabel: "STATUS",
    metaRightValue: "Auto-Applied",
    code: "DIASPORA-EASTER",
  },
  {
    id: "promo-3",
    title: "Commercial Acreage Bulk Subsidies",
    badge: "AUTO-TIER",
    category: "Industrial Corridors",
    description:
      "15% markdown for agro-allied & logistics developments spanning \u2265 5 contiguous hectares.",
    targetAssetsLabel: "QUALIFYING AXIS",
    targetAssetsValue: "Ibeju-Lekki FTZ / Epe",
    metaRightLabel: "APPLIED TO",
    metaRightValue: "Atlantic Crest Bay",
    code: "COMM-ACRE-15",
  },
];

export const mockDeedCompliance: DeedComplianceItem[] = [
  {
    id: "deed-1",
    title: "Governor's Consent Perfection",
    batch: "Batch #LAG-2025-09 (18 Deeds)",
    status: "passed",
    statusLabel: "100% Passed",
  },
  {
    id: "deed-2",
    title: "FCT AGIS Re-Certification",
    batch: "Guzape Ridge Extension",
    status: "in_review",
    statusLabel: "In Review",
  },
  {
    id: "deed-3",
    title: "SCUML / NFIU Anti-Money Laundering",
    batch: "Q1 Investor Audit Compliance",
    status: "certified",
    statusLabel: "Certified",
  },
];

export async function getAdminInquiries(): Promise<Inquiry[]> {
  return Promise.resolve(mockInquiries);
}

export async function getPromoCampaigns(): Promise<PromoCampaign[]> {
  return Promise.resolve(mockPromoCampaigns);
}

export async function getDeedCompliance(): Promise<DeedComplianceItem[]> {
  return Promise.resolve(mockDeedCompliance);
}
