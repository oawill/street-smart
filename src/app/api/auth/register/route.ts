import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { hashPassword, isPasswordStrongEnough } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { attributeReferralOnRegistration } from "@/lib/referral/attribute";
import { isRateLimited, clientIpFromHeaders } from "@/lib/rateLimit";

const bodySchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  username: z
    .string()
    .trim()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers and underscores."),
  password: z.string().min(1),
  firstName: z.string().trim().max(50).optional(),
  city: z.string().trim().max(50).optional(),
  state: z.string().trim().max(50).optional(),
});

export async function POST(request: NextRequest) {
  const ip = clientIpFromHeaders(request.headers);
  if (isRateLimited(`register:${ip}`, 10, 60_000)) {
    return NextResponse.json({ error: "Too many attempts. Try again in a minute." }, { status: 429 });
  }

  const json = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input." }, { status: 400 });
  }
  const { email, username, password, firstName, city, state } = parsed.data;

  if (!isPasswordStrongEnough(password)) {
    return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  }

  const [existingEmail, existingUsername] = await Promise.all([
    prisma.user.findUnique({ where: { email } }),
    prisma.user.findUnique({ where: { username } }),
  ]);
  if (existingEmail) {
    return NextResponse.json({ error: "An account with that email already exists." }, { status: 409 });
  }
  if (existingUsername) {
    return NextResponse.json({ error: "That username is taken." }, { status: 409 });
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, username, passwordHash, firstName, city, state },
  });

  const cookieStore = await cookies();
  const refCode = cookieStore.get("ss_ref")?.value ?? null;
  try {
    await attributeReferralOnRegistration({
      newUserId: user.id,
      newUserEmail: user.email,
      refCode,
    });
  } catch {
    // Referral attribution is best-effort — never block account creation on it.
  }

  await createSession(user.id);

  return NextResponse.json({
    user: { id: user.id, email: user.email, username: user.username, role: user.role },
  });
}
