import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/auth/session";
import { nextPublicId } from "@/lib/ids";
import { track } from "@/lib/analytics/track";
import { isRateLimited, clientIpFromHeaders } from "@/lib/rateLimit";
import type { PartnerApplicationType } from "@/types/partner";

const PARTNER_TYPES: PartnerApplicationType[] = [
  "INDIVIDUAL_AFFILIATE",
  "INFLUENCER",
  "SCHOOL",
  "COMMUNITY",
  "CORPORATE",
  "OTHER",
];

const bodySchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  email: z.string().trim().toLowerCase().email(),
  phone: z.string().trim().min(5).max(30),
  partnerType: z.enum(PARTNER_TYPES as [string, ...string[]]),
  organizationName: z.string().trim().max(150).optional(),
  city: z.string().trim().max(50).optional(),
  state: z.string().trim().max(50).optional(),
  promotionPlan: z.string().trim().min(10).max(2000),
  audienceSize: z.string().trim().max(50).optional(),
  website: z.string().trim().max(200).optional(),
  agreedToTerms: z.literal(true),
});

export async function POST(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "You must be logged in to apply." }, { status: 401 });
  }

  const ip = clientIpFromHeaders(request.headers);
  if (isRateLimited(`partner-apply:${user.id}:${ip}`, 5, 60_000)) {
    return NextResponse.json({ error: "Too many attempts. Try again shortly." }, { status: 429 });
  }

  const existingProfile = await prisma.partnerProfile.findUnique({ where: { userId: user.id } });
  if (existingProfile) {
    return NextResponse.json({ error: "You already have a partner account." }, { status: 409 });
  }

  const pendingApplication = await prisma.partnerApplication.findFirst({
    where: { userId: user.id, status: "PENDING_REVIEW" },
  });
  if (pendingApplication) {
    return NextResponse.json({ error: "You already have an application under review." }, { status: 409 });
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input." }, { status: 400 });
  }

  const publicId = await nextPublicId(prisma, "PARTNER_APPLICATION");
  const application = await prisma.partnerApplication.create({
    data: { ...parsed.data, publicId, userId: user.id },
  });

  await track("partner_application_submitted", { userId: user.id, metadata: { applicationId: application.id } });

  return NextResponse.json({ application: { publicId: application.publicId } });
}
