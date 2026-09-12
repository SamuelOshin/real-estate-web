export type LeadChannel =
  | "Diaspora Portal"
  | "VIP Chauffeur"
  | "WhatsApp Hotline"
  | "Web Form";

export type InquiryStatus =
  | "new"
  | "convoy_scheduled"
  | "search_requested"
  | "pro_forma_sent"
  | "hold_active"
  | "closed";

export interface Inquiry {
  id: string;
  buyerName: string;
  initials: string;
  contact: string;
  location: string;
  leadChannel: LeadChannel;
  propertySlug: string;
  propertyName: string;
  plotsDemarcation: string;
  status: InquiryStatus;
  statusLabel: string;
  subtext: string;
  whatsappNumber?: string;
  createdAt: string;
}

export interface PromoCampaign {
  id: string;
  title: string;
  badge: "ACTIVE" | "AUTO-TIER";
  category: string;
  description: string;
  targetAssetsLabel: string;
  targetAssetsValue: string;
  metaRightLabel: string;
  metaRightValue: string;
  code: string;
}

export interface DeedComplianceItem {
  id: string;
  title: string;
  batch: string;
  status: "passed" | "in_review" | "certified";
  statusLabel: string;
}
