import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { track } from "@/lib/analytics/track";
import { isRateLimited, clientIpFromHeaders } from "@/lib/rateLimit";

const bodySchema = z.object({
  code: z.string().min(1).max(20),
});

export async function POST(request: NextRequest) {
  const ip = clientIpFromHeaders(request.headers);
  if (isRateLimited(`click:${ip}`, 30, 60_000)) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const code = parsed.data.code.toUpperCase();
  const referralCode = await prisma.referralCode.update({
    where: { code },
    data: { clickCount: { increment: 1 } },
  }).catch(() => null);

  if (!referralCode) {
    // Unknown code — still 200 so we don't leak which codes are valid.
    return NextResponse.json({ ok: true });
  }

  await track("referral_link_viewed", { partnerProfileId: referralCode.partnerProfileId });

  return NextResponse.json({ ok: true });
}
