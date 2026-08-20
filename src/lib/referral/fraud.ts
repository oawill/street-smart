import "server-only";
import { prisma } from "@/lib/db";

const VELOCITY_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const VELOCITY_THRESHOLD = 5; // more than this many registrations on one code in the window gets flagged

export interface FraudCheckResult {
  flagged: boolean;
  reason?: string;
}

/**
 * Basic, non-invasive fraud signals for a new referral. Never used to
 * silently reject a referral — only to route it to UNDER_REVIEW so an
 * admin can look at it. Not a substitute for real device fingerprinting
 * or velocity infrastructure; see the final report's limitations section.
 */
export async function checkReferralForFraud(params: {
  referralCodeId: string;
  partnerAccountEmail: string;
  referredUserEmail: string;
}): Promise<FraudCheckResult> {
  if (params.partnerAccountEmail.toLowerCase() === params.referredUserEmail.toLowerCase()) {
    return { flagged: true, reason: "Referred user's email matches the referring account's email (self-referral)." };
  }

  const windowStart = new Date(Date.now() - VELOCITY_WINDOW_MS);
  const recentCount = await prisma.referral.count({
    where: {
      referralCodeId: params.referralCodeId,
      createdAt: { gte: windowStart },
    },
  });

  if (recentCount >= VELOCITY_THRESHOLD) {
    return {
      flagged: true,
      reason: `Excessive signup velocity: ${recentCount + 1} registrations on this code within ${VELOCITY_WINDOW_MS / 60000} minutes.`,
    };
  }

  return { flagged: false };
}
