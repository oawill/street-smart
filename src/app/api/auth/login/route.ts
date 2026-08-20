import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { isRateLimited, clientIpFromHeaders } from "@/lib/rateLimit";

const bodySchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const ip = clientIpFromHeaders(request.headers);
  if (isRateLimited(`login:${ip}`, 15, 60_000)) {
    return NextResponse.json({ error: "Too many attempts. Try again in a minute." }, { status: 429 });
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  const genericError = NextResponse.json({ error: "Incorrect email or password." }, { status: 401 });
  if (!user) return genericError;

  const valid = await verifyPassword(parsed.data.password, user.passwordHash);
  if (!valid) return genericError;

  await createSession(user.id);

  return NextResponse.json({
    user: { id: user.id, email: user.email, username: user.username, role: user.role },
  });
}
