import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/auth/session";
import { evaluateReferralQualification } from "@/lib/referral/qualify";

const bodySchema = z.object({
  streetSmartIQ: z.number().int().min(40).max(160),
});

/**
 * Fire-and-forget beacon called once from the results page when a logged-in
 * player finishes a 10-round game. This is the ONLY point where the
 * (otherwise fully client-side) game touches the server. It intentionally
 * does not re-run scoring — see the final report for what that means for
 * anti-cheat.
 */
export async function POST(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) {
    // Guests can play freely; there's simply nothing to record server-side.
    return NextResponse.json({ ok: true, recorded: false });
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  await prisma.gameCompletion.create({
    data: { userId: user.id, streetSmartIQ: parsed.data.streetSmartIQ },
  });

  await evaluateReferralQualification(user.id);

  return NextResponse.json({ ok: true, recorded: true });
}
