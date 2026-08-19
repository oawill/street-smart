"use client";

import { useRouter } from "next/navigation";
import { useProfileStore } from "@/store/profileStore";
import { useGameStore } from "@/store/gameStore";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useMounted } from "@/hooks/useMounted";
import Link from "next/link";

export default function LandingPage() {
  const router = useRouter();
  const mounted = useMounted();
  const lastIQ = useProfileStore((s) => s.lastIQ);
  const streak = useProfileStore((s) => s.streak);
  const hasPlayed = useProfileStore((s) => s.hasPlayed);

  function handleTestMe() {
    useGameStore.getState().startGame();
    router.push("/play");
  }

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden">
      <BackgroundDecor />

      <header className="relative z-10 flex items-center justify-between px-5 pt-5 sm:px-8">
        <span className="font-display text-sm font-bold tracking-[0.2em] text-muted">
          STREET SMART
        </span>
        <ThemeToggle />
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-10 text-center">
        <h1 className="font-display text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl">
          STREET SMART
        </h1>
        <p className="mt-3 max-w-xs text-base text-muted sm:max-w-sm sm:text-lg">
          Everybody thinks they&apos;re street smart. Let&apos;s find out.
        </p>

        <div className="mt-9 flex flex-col items-center gap-1 rounded-3xl border border-border bg-surface px-8 py-5 shadow-[var(--shadow-card)]">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted">
            Your Street Smart IQ
          </span>
          <span className="font-display text-4xl font-extrabold text-brand">
            {mounted && hasPlayed && lastIQ !== null ? lastIQ : "???"}
          </span>
          {mounted && streak > 1 && (
            <span className="mt-1 text-xs font-medium text-accent">🔥 {streak}-day streak</span>
          )}
        </div>

        <button
          onClick={handleTestMe}
          className="mt-8 w-full max-w-xs rounded-full bg-brand px-8 py-4 font-display text-lg font-bold text-white shadow-[0_8px_24px_-6px_rgba(15,157,88,0.55)] transition-transform active:scale-95"
        >
          {mounted && hasPlayed ? "PLAY AGAIN" : "TEST ME"}
        </button>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <SecondaryLink href="/daily">Daily Challenge</SecondaryLink>
          <SecondaryLink href="/leaderboard">Leaderboard</SecondaryLink>
          <SecondaryLink href="/how-it-works">How It Works</SecondaryLink>
        </div>
      </main>

      <footer className="relative z-10 px-6 pb-6 text-center text-[11px] leading-relaxed text-muted">
        Street Smart is a game for entertainment and education. It is not financial,
        legal or investment advice.
      </footer>
    </div>
  );
}

function SecondaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-brand hover:text-brand"
    >
      {children}
    </Link>
  );
}

function BackgroundDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand/15 blur-3xl" />
      <div className="absolute top-1/3 -right-20 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 h-56 w-56 rounded-full bg-brand/10 blur-3xl" />
    </div>
  );
}
