import "server-only";
import { prisma } from "@/lib/db";
import type { Prisma, PrismaClient } from "@/generated/prisma/client";

export type AnalyticsEventName =
  | "referral_link_viewed"
  | "referral_signup"
  | "referral_qualified"
  | "reward_created"
  | "reward_approved"
  | "reward_paid"
  | "partner_application_submitted"
  | "partner_application_approved"
  | "partner_application_rejected"
  | "daily_challenge_answered";

interface TrackOptions {
  userId?: string;
  partnerProfileId?: string;
  referralId?: string;
  metadata?: Record<string, unknown>;
  client?: PrismaClient | Prisma.TransactionClient;
}

/**
 * Single, shared event log for the whole app (not just the partner
 * program) — there is no pre-existing analytics system in Street Smart to
 * plug into, so this is intentionally the only one introduced.
 */
export async function track(name: AnalyticsEventName, options: TrackOptions = {}): Promise<void> {
  const db = options.client ?? prisma;
  await db.analyticsEvent.create({
    data: {
      name,
      userId: options.userId,
      partnerProfileId: options.partnerProfileId,
      referralId: options.referralId,
      metadata: options.metadata ? JSON.stringify(options.metadata) : undefined,
    },
  });
}
