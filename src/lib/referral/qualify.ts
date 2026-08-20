import "server-only";
import { prisma } from "@/lib/db";
import { nextPublicId } from "@/lib/ids";
import { track } from "@/lib/analytics/track";
import type { Prisma } from "@/generated/prisma/client";

/**
 * Picks which ReferralProgram applies to a partner's referral. Campaign
 * programs (time-boxed, promotional) take priority when active; formal
 * partners get PARTNER-rate programs over the STANDARD affiliate rate.
 * Kept deliberately simple for the MVP — see final report limitations.
 */
async function pickApplicableProgram(
  tx: Prisma.TransactionClient,
  partnerType: string
) {
  const now = new Date();
  const activePrograms = await tx.referralProgram.findMany({
    where: {
      active: true,
      OR: [{ startDate: null }, { startDate: { lte: now } }],
      AND: [{ OR: [{ endDate: null }, { endDate: { gte: now } }] }],
    },
    orderBy: { createdAt: "desc" },
  });

  const campaign = activePrograms.find((p) => p.referralType === "CAMPAIGN");
  if (campaign) return campaign;

  if (partnerType !== "AFFILIATE") {
    const partnerRate = activePrograms.find((p) => p.referralType === "PARTNER");
    if (partnerRate) return partnerRate;
  }

  return activePrograms.find((p) => p.referralType === "STANDARD") ?? null;
}

/**
 * Called after a player's game completion is recorded server-side. Evaluates
 * whether their referral (if any) now qualifies, and if so creates exactly
 * one RewardLedger entry. Safe to call every time a game finishes — fully
 * idempotent via the unique RewardLedger.referralId constraint and the
 * REGISTERED-only status guard.
 */
export async function evaluateReferralQualification(userId: string): Promise<void> {
  const referral = await prisma.referral.findUnique({ where: { referredUserId: userId } });
  if (!referral || referral.status !== "REGISTERED") return;

  const completionCount = await prisma.gameCompletion.count({ where: { userId } });
  if (completionCount < 1) return;

  await prisma.$transaction(async (tx) => {
    // Re-check inside the transaction in case of a race between two rapid completions.
    const fresh = await tx.referral.findUnique({ where: { id: referral.id } });
    if (!fresh || fresh.status !== "REGISTERED") return;

    const existingReward = await tx.rewardLedger.findUnique({ where: { referralId: referral.id } });
    if (existingReward) return;

    await tx.referral.update({
      where: { id: referral.id },
      data: { status: "QUALIFIED", qualifiedAt: new Date() },
    });
    await track("referral_qualified", { referralId: referral.id, partnerProfileId: referral.partnerProfileId, client: tx });

    const partner = await tx.partnerProfile.findUniqueOrThrow({ where: { id: referral.partnerProfileId } });
    const program = await pickApplicableProgram(tx, partner.partnerType);

    if (!program) {
      // No configured reward program — the referral stays QUALIFIED with no
      // ledger entry until an admin configures a ReferralProgram. This is a
      // deliberate MVP limitation, not a silent failure: it's visible on the
      // partner/admin dashboards as a qualified referral with no reward yet.
      return;
    }

    const amount = program.rewardAmount * (program.campaignMultiplier ?? 1);
    const publicId = await nextPublicId(tx, "REWARD_LEDGER");

    await tx.rewardLedger.create({
      data: {
        publicId,
        referralId: referral.id,
        partnerProfileId: referral.partnerProfileId,
        referralProgramId: program.id,
        amount,
        currency: program.currency,
        status: "PENDING",
      },
    });

    await tx.referral.update({
      where: { id: referral.id },
      data: { status: "REWARD_PENDING" },
    });

    await track("reward_created", {
      referralId: referral.id,
      partnerProfileId: referral.partnerProfileId,
      metadata: { amount, currency: program.currency },
      client: tx,
    });
  });
}
