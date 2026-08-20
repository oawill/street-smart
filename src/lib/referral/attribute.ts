import "server-only";
import { prisma } from "@/lib/db";
import { nextPublicId } from "@/lib/ids";
import { track } from "@/lib/analytics/track";
import { checkReferralForFraud } from "./fraud";

/**
 * Attributes a brand-new user to whichever referral code cookie (if any)
 * brought them to the site. Called once, right after the User row is
 * created during registration. Never overwrites an existing attribution —
 * the unique constraint on Referral.referredUserId plus the "only ever
 * called once per new user" call site together implement the "first valid
 * referral wins, permanent" rule from the spec.
 */
export async function attributeReferralOnRegistration(params: {
  newUserId: string;
  newUserEmail: string;
  refCode: string | null;
}): Promise<void> {
  if (!params.refCode) return;

  const code = params.refCode.toUpperCase();
  const referralCode = await prisma.referralCode.findUnique({
    where: { code },
    include: { partnerProfile: { include: { user: true } } },
  });
  if (!referralCode) return;

  // Can't refer yourself with your own link.
  if (referralCode.partnerProfile.userId === params.newUserId) return;

  const fraud = await checkReferralForFraud({
    referralCodeId: referralCode.id,
    partnerAccountEmail: referralCode.partnerProfile.user.email,
    referredUserEmail: params.newUserEmail,
  });

  await prisma.$transaction(async (tx) => {
    const publicId = await nextPublicId(tx, "REFERRAL");
    await tx.referral.create({
      data: {
        publicId,
        referralCodeId: referralCode.id,
        partnerProfileId: referralCode.partnerProfileId,
        referredUserId: params.newUserId,
        status: fraud.flagged ? "UNDER_REVIEW" : "REGISTERED",
        flaggedReason: fraud.flagged ? fraud.reason : null,
        source: "cookie",
      },
    });
  });

  await track("referral_signup", {
    userId: params.newUserId,
    partnerProfileId: referralCode.partnerProfileId,
  });
}
