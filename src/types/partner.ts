// String-column union types for the Partner & Affiliate Program.
// SQLite has no native enum support in Prisma, so these are enforced only
// at the application layer — every write path in src/lib should go through
// helpers that use these types rather than writing raw strings.

export type UserRole = "PLAYER" | "ADMIN";

export type PartnerApplicationType =
  | "INDIVIDUAL_AFFILIATE"
  | "INFLUENCER"
  | "SCHOOL"
  | "COMMUNITY"
  | "CORPORATE"
  | "OTHER";

export const PARTNER_APPLICATION_TYPE_LABELS: Record<PartnerApplicationType, string> = {
  INDIVIDUAL_AFFILIATE: "Individual Affiliate",
  INFLUENCER: "Influencer / Creator",
  SCHOOL: "School / Educational Institution",
  COMMUNITY: "Community Organization",
  CORPORATE: "Corporate Partner",
  OTHER: "Other",
};

/** PartnerProfile.partnerType — same set as applications, plus self-serve AFFILIATE. */
export type PartnerType = PartnerApplicationType | "AFFILIATE";

export const PARTNER_TYPE_LABELS: Record<PartnerType, string> = {
  ...PARTNER_APPLICATION_TYPE_LABELS,
  AFFILIATE: "Affiliate",
};

export type PartnerApplicationStatus = "PENDING_REVIEW" | "APPROVED" | "REJECTED";

export type PartnerProfileStatus = "ACTIVE" | "SUSPENDED";

export type ReferralStatus =
  | "REGISTERED"
  | "QUALIFIED"
  | "REWARD_PENDING"
  | "REWARD_APPROVED"
  | "PAID"
  | "REJECTED"
  | "UNDER_REVIEW";

export const REFERRAL_STATUS_LABELS: Record<ReferralStatus, string> = {
  REGISTERED: "Registered",
  QUALIFIED: "Qualified",
  REWARD_PENDING: "Pending",
  REWARD_APPROVED: "Approved",
  PAID: "Paid",
  REJECTED: "Rejected",
  UNDER_REVIEW: "Under Review",
};

export type ReferralProgramType = "STANDARD" | "PARTNER" | "CAMPAIGN";

export type RewardType = "FIXED" | "PERCENTAGE" | "POINTS";

export type QualificationRule = "FIRST_GAME_COMPLETED";

export type RewardStatus = "PENDING" | "APPROVED" | "PAID" | "REJECTED";

export const REWARD_STATUS_LABELS: Record<RewardStatus, string> = {
  PENDING: "Pending",
  APPROVED: "Approved",
  PAID: "Paid",
  REJECTED: "Rejected",
};
