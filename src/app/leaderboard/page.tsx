import Link from "next/link";
import { getSessionUser } from "@/lib/auth/session";
import { getLeaderboard, type LeaderboardEntry, type LeaderboardPeriod } from "@/lib/leaderboard";

const TABS: { value: LeaderboardPeriod; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "alltime", label: "All Time" },
];

const TOP_N = 10;
const NEARBY_SPAN = 2;

export default async function LeaderboardPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {
  const params = await searchParams;
  const period: LeaderboardPeriod =
    params.period === "week" ? "week" : params.period === "alltime" ? "alltime" : "today";

  const user = await getSessionUser();
  const { entries, totalRanked, currentUserRank } = await getLeaderboard(period, user?.id);

  const top = entries.slice(0, TOP_N);
  const showNearby = currentUserRank !== null && currentUserRank > TOP_N;
  const nearby = showNearby
    ? entries.slice(Math.max(TOP_N, currentUserRank - 1 - NEARBY_SPAN), currentUserRank + NEARBY_SPAN)
    : [];

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-5 py-8 sm:px-8">
      <Link href="/" className="text-sm font-medium text-muted hover:text-brand">
        ← Back
      </Link>

      <h1 className="mt-4 font-display text-2xl font-extrabold text-foreground">Leaderboard</h1>
      <p className="mt-1 text-sm text-muted">Ranked by Street Smart IQ.</p>

      <div className="mt-4 flex gap-2">
        {TABS.map((t) => (
          <Link
            key={t.value}
            href={`/leaderboard?period=${t.value}`}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
              t.value === period
                ? "bg-brand text-white"
                : "border border-border bg-surface text-muted hover:text-foreground"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      {entries.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-border p-8 text-center">
          <p className="text-sm text-muted">
            {period === "today"
              ? "No one has played today yet."
              : period === "week"
                ? "No one has played this week yet."
                : "No ranked games yet."}
          </p>
          <p className="mt-1 text-xs text-muted">Create an account and finish a game to be the first.</p>
        </div>
      ) : (
        <>
          <div className="mt-4 flex flex-col gap-1.5">
            {top.map((entry) => (
              <LeaderboardRow key={entry.userId} entry={entry} isYou={entry.userId === user?.id} />
            ))}
          </div>

          {showNearby && (
            <>
              <div className="my-3 flex items-center gap-2 text-xs text-muted">
                <span className="h-px flex-1 bg-border" />
                {currentUserRank! - NEARBY_SPAN - 1 > TOP_N ? "⋯" : ""}
                <span className="h-px flex-1 bg-border" />
              </div>
              <div className="flex flex-col gap-1.5">
                {nearby.map((entry) => (
                  <LeaderboardRow key={entry.userId} entry={entry} isYou={entry.userId === user?.id} />
                ))}
              </div>
            </>
          )}

          <p className="mt-4 text-center text-xs text-muted">{totalRanked.toLocaleString()} players ranked</p>
        </>
      )}
    </div>
  );
}

function LeaderboardRow({ entry, isYou }: { entry: LeaderboardEntry; isYou: boolean }) {
  const location = [entry.city, entry.state].filter(Boolean).join(", ");
  return (
    <div
      className={`flex items-center justify-between rounded-2xl border px-4 py-3 ${
        isYou ? "border-brand bg-brand-soft" : "border-border bg-surface"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="w-7 shrink-0 text-right font-display text-sm font-bold text-muted">
          #{entry.rank}
        </span>
        <div>
          <p className={`text-sm font-semibold ${isYou ? "text-brand-strong" : "text-foreground"}`}>
            {entry.username}
            {isYou && <span className="ml-1.5 text-xs font-bold uppercase text-brand">You</span>}
          </p>
          <p className="text-xs text-muted">
            {entry.gamesPlayed} game{entry.gamesPlayed === 1 ? "" : "s"}
            {location ? ` · ${location}` : ""}
          </p>
        </div>
      </div>
      <span className={`font-display text-lg font-extrabold ${isYou ? "text-brand-strong" : "text-foreground"}`}>
        {entry.streetSmartIQ}
      </span>
    </div>
  );
}
