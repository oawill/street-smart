import "server-only";
import { prisma } from "@/lib/db";

const QUALIFIED_STATUSES = ["QUALIFIED", "REWARD_PENDING", "REWARD_APPROVED", "PAID"];

export interface PartnerTierProgress {
  qualifiedCount: number;
  currentTier: { name: string; minQualifiedReferrals: number } | null;
  nextTier: { name: string; minQualifiedReferrals: number } | null;
  referralsToNextTier: number | null;
}

/**
 * Tiers are never hard-coded in components — this always reads the seeded,
 * admin-editable PartnerTier table and computes progress from live referral
 * counts.
 */
export async function computePartnerTierProgress(partnerProfileId: string): Promise<PartnerTierProgress> {
  const [qualifiedCount, tiers] = await Promise.all([
    prisma.referral.count({
      where: { partnerProfileId, status: { in: QUALIFIED_STATUSES } },
    }),
    prisma.partnerTier.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  let currentTier: PartnerTierProgress["currentTier"] = null;
  for (const tier of tiers) {
    if (qualifiedCount >= tier.minQualifiedReferrals) {
      currentTier = tier;
    }
  }

  const nextTier = tiers.find((t) => t.minQualifiedReferrals > qualifiedCount) ?? null;

  return {
    qualifiedCount,
    currentTier,
    nextTier,
    referralsToNextTier: nextTier ? nextTier.minQualifiedReferrals - qualifiedCount : null,
  };
}
