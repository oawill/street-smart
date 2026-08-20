import "server-only";
import type { Prisma, PrismaClient } from "@/generated/prisma/client";

type TxClient = PrismaClient | Prisma.TransactionClient;

const COUNTER_KEYS = {
  PARTNER_APPLICATION: "SS-PA-",
  PARTNER_PROFILE_PARTNER: "SS-P-",
  PARTNER_PROFILE_AFFILIATE: "SS-A-",
  REFERRAL: "SS-R-",
  REWARD_LEDGER: "SS-RWD-",
} as const;

type CounterKey = keyof typeof COUNTER_KEYS;

/**
 * Atomically increments a per-entity counter and returns a zero-padded,
 * human-readable public ID (e.g. "SS-P-000124"). Internal relations always
 * use the underlying cuid primary key — these IDs are display/reference
 * only and are never used to look up rows.
 */
export async function nextPublicId(tx: TxClient, counterKey: CounterKey): Promise<string> {
  const counter = await tx.idCounter.upsert({
    where: { key: counterKey },
    update: { value: { increment: 1 } },
    create: { key: counterKey, value: 1 },
  });
  const prefix = COUNTER_KEYS[counterKey];
  return `${prefix}${String(counter.value).padStart(6, "0")}`;
}
