import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/auth/session";

const bodySchema = z.object({
  bankName: z.string().trim().min(2).max(100),
  accountNumber: z.string().trim().regex(/^\d{6,20}$/, "Account number must be digits only."),
  accountName: z.string().trim().min(2).max(150),
});

export async function POST(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "You must be logged in." }, { status: 401 });
  }

  const profile = await prisma.partnerProfile.findUnique({ where: { userId: user.id } });
  if (!profile) {
    return NextResponse.json({ error: "No partner account found." }, { status: 404 });
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input." }, { status: 400 });
  }

  await prisma.payoutProfile.upsert({
    where: { partnerProfileId: profile.id },
    update: parsed.data,
    create: { ...parsed.data, partnerProfileId: profile.id },
  });

  return NextResponse.json({ ok: true });
}
