import "server-only";
import { prisma } from "@/lib/db";

const RESERVED_CODES = new Set([
  "ADMIN",
  "STREETSMART",
  "SUPPORT",
  "TEST",
  "NULL",
  "UNDEFINED",
  "FUCK",
  "SHIT",
  "SEX",
  "PORN",
  "SCAM",
  "FRAUD",
  "FREE",
  "OFFICIAL",
]);

function sanitize(input: string): string {
  return input
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 15);
}

export function isCodeAllowed(rawCode: string): { ok: boolean; reason?: string } {
  const code = sanitize(rawCode);
  if (code.length < 4) return { ok: false, reason: "Code must be at least 4 characters." };
  if (code.length > 15) return { ok: false, reason: "Code must be 15 characters or fewer." };
  if (RESERVED_CODES.has(code)) return { ok: false, reason: "That code is reserved." };
  return { ok: true };
}

/** Generates a unique, URL-safe, easy-to-type referral code, e.g. "BOWE24". */
export async function generateReferralCode(seed: string): Promise<string> {
  const base = sanitize(seed).slice(0, 8) || "PLAYER";

  for (let attempt = 0; attempt < 25; attempt++) {
    const suffix = String(Math.floor(10 + Math.random() * 90)); // 2 digits
    const candidate = `${base}${suffix}`.slice(0, 15);
    if (RESERVED_CODES.has(candidate)) continue;

    const existing = await prisma.referralCode.findUnique({ where: { code: candidate } });
    if (!existing) return candidate;
  }

  // Extremely unlikely fallback: fully random code.
  for (let attempt = 0; attempt < 10; attempt++) {
    const candidate = `SMART${Math.floor(1000 + Math.random() * 9000)}`;
    const existing = await prisma.referralCode.findUnique({ where: { code: candidate } });
    if (!existing) return candidate;
  }

  throw new Error("Could not generate a unique referral code. Please try again.");
}
