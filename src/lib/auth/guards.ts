import "server-only";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getSessionUser, type SessionUser } from "./session";

/** Redirects to /login (preserving the intended destination) if not authenticated. */
export async function requireUser(nextPath?: string): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) {
    const suffix = nextPath ? `?next=${encodeURIComponent(nextPath)}` : "";
    redirect(`/login${suffix}`);
  }
  return user;
}

/** Requires an authenticated ADMIN user; renders 404 for anyone else so admin routes don't leak existence. */
export async function requireAdmin(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user || user.role !== "ADMIN") {
    notFound();
  }
  return user;
}

/** Requires an authenticated user who also has a PartnerProfile; redirects to /partner/apply otherwise. */
export async function requirePartnerProfile(nextPath?: string) {
  const user = await requireUser(nextPath);
  const profile = await prisma.partnerProfile.findUnique({
    where: { userId: user.id },
  });
  if (!profile) {
    redirect("/partner/apply");
  }
  return { user, profile };
}
