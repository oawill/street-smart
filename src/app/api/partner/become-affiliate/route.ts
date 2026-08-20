import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/auth/session";
import { nextPublicId } from "@/lib/ids";
import { generateReferralCode } from "@/lib/referral/codes";

/**
 * Self-serve enrollment: any logged-in player can become a basic Affiliate
 * instantly. Formal Partner types (school, corporate, etc.) always go
 * through /partner/apply and require admin approval.
 */
export async function POST() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "You must be logged in." }, { status: 401 });
  }

  const existing = await prisma.partnerProfile.findUnique({ where: { userId: user.id } });
  if (existing) {
    return NextResponse.json({ error: "You already have a partner account." }, { status: 409 });
  }

  const publicId = await nextPublicId(prisma, "PARTNER_PROFILE_AFFILIATE");
  const code = await generateReferralCode(user.username);

  const profile = await prisma.partnerProfile.create({
    data: {
      publicId,
      userId: user.id,
      partnerType: "AFFILIATE",
      status: "ACTIVE",
      referralCode: { create: { code } },
    },
  });

  return NextResponse.json({ partnerId: profile.publicId });
}
