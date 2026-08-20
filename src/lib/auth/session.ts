import "server-only";
import { cookies } from "next/headers";
import { randomBytes, createHash } from "crypto";
import { prisma } from "@/lib/db";
import type { UserRole } from "@/types/partner";

const SESSION_COOKIE = "ss_session";
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export interface SessionUser {
  id: string;
  email: string;
  username: string;
  firstName: string | null;
  role: UserRole;
}

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/** Creates a new session row and sets the httpOnly session cookie. Call from a Route Handler or Server Action only. */
export async function createSession(userId: string): Promise<void> {
  const token = randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

  await prisma.session.create({
    data: { userId, tokenHash, expiresAt },
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

/** Reads the session cookie (if any) and returns the authenticated user, or null. Safe to call from Server Components. */
export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const tokenHash = hashToken(token);
  const session = await prisma.session.findUnique({
    where: { tokenHash },
    include: { user: true },
  });

  if (!session || session.expiresAt.getTime() < Date.now()) {
    return null;
  }

  const { user } = session;
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    role: user.role as UserRole,
  };
}

/** Deletes the current session row and clears the cookie. Call from a Route Handler or Server Action only. */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    const tokenHash = hashToken(token);
    await prisma.session.deleteMany({ where: { tokenHash } });
  }
  cookieStore.delete(SESSION_COOKIE);
}
