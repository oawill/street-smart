import "server-only";
import { prisma } from "@/lib/db";

export type LeaderboardPeriod = "today" | "week" | "alltime";

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  city: string | null;
  state: string | null;
  streetSmartIQ: number;
  gamesPlayed: number;
}

export interface LeaderboardResult {
  entries: LeaderboardEntry[];
  totalRanked: number;
  currentUserRank: number | null;
}

function periodStart(period: LeaderboardPeriod): Date | undefined {
  const now = new Date();
  if (period === "today") {
    return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  }
  if (period === "week") {
    return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  }
  return undefined;
}

/**
 * Ranks players by their best Street Smart IQ within the period. This
 * trusts GameCompletion.streetSmartIQ, which is client-reported (clamped
 * to 40-160 server-side, but not independently re-scored) — see the
 * known anti-cheat limitation documented alongside the Partner Program.
 */
export async function getLeaderboard(
  period: LeaderboardPeriod,
  currentUserId?: string
): Promise<LeaderboardResult> {
  const since = periodStart(period);

  const grouped = await prisma.gameCompletion.groupBy({
    by: ["userId"],
    where: since ? { completedAt: { gte: since } } : undefined,
    _max: { streetSmartIQ: true },
  });

  const ranked = grouped
    .filter((g) => g._max.streetSmartIQ !== null)
    .sort((a, b) => b._max.streetSmartIQ! - a._max.streetSmartIQ!);

  if (ranked.length === 0) {
    return { entries: [], totalRanked: 0, currentUserRank: null };
  }

  const userIds = ranked.map((g) => g.userId);
  const [users, gamesPlayedGrouped] = await Promise.all([
    prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, username: true, city: true, state: true },
    }),
    prisma.gameCompletion.groupBy({
      by: ["userId"],
      where: { userId: { in: userIds } },
      _count: { _all: true },
    }),
  ]);

  const userMap = new Map(users.map((u) => [u.id, u]));
  const gamesPlayedMap = new Map(gamesPlayedGrouped.map((g) => [g.userId, g._count._all]));

  const entries: LeaderboardEntry[] = ranked.map((g, i) => {
    const user = userMap.get(g.userId);
    return {
      rank: i + 1,
      userId: g.userId,
      username: user?.username ?? "unknown",
      city: user?.city ?? null,
      state: user?.state ?? null,
      streetSmartIQ: g._max.streetSmartIQ!,
      gamesPlayed: gamesPlayedMap.get(g.userId) ?? 0,
    };
  });

  const currentUserRank = currentUserId
    ? (entries.find((e) => e.userId === currentUserId)?.rank ?? null)
    : null;

  return { entries, totalRanked: entries.length, currentUserRank };
}
