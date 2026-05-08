export type CampaignStatus = "pending" | "approved" | "rejected" | "completed";

export type Badge = "docs_available" | "verified" | "active_update" | "active_campaign";

export interface Campaign {
  id: string;
  title: string;
  story: string;
  category: string;
  location: string;
  targetAmount: number;
  currentAmount: number;
  recipientName: string;
  recipientBank: string;
  recipientAccount: string;
  recipientQris?: string;
  paymentLink?: string;
  photoUrl: string;
  badges: Badge[];
  status: CampaignStatus;
  createdAt: string;
  updatedAt: string;
  updates: CampaignUpdate[];
}

export interface CampaignUpdate {
  id: string;
  date: string;
  title: string;
  description: string;
  photoUrl?: string;
}

export interface CampaignSubmission {
  title: string;
  story: string;
  category: string;
  location: string;
  targetAmount: number;
  recipientName: string;
  recipientBank: string;
  recipientAccount: string;
  recipientQris?: string;
  paymentLink?: string;
  contactPhone: string;
  contactEmail: string;
}
