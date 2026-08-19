"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/gameStore";
import { ClassificationBadge } from "@/components/ClassificationBadge";
import { AttributeBars } from "@/components/AttributeBars";
import { RadarChart } from "@/components/RadarChart";

export default function ResultsPage() {
  const router = useRouter();
  const result = useGameStore((s) => s.result);
  const startGame = useGameStore((s) => s.startGame);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!result) {
      router.replace("/");
    }
  }, [result, router]);

  if (!result) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-brand" />
      </div>
    );
  }

  const shareText = buildShareText(result);

  function handlePlayAgain() {
    startGame();
    router.push("/play");
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable, ignore silently
    }
  }

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-6 py-8">
      <div className="flex flex-col items-center text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-muted">
          Street Smart IQ
        </span>
        <span className="mt-1 animate-pop-in font-display text-6xl font-extrabold text-brand">
          {Math.round(result.streetSmartIQ)}
        </span>
        <div className="mt-3">
          <ClassificationBadge label={result.classification.label} />
        </div>
        <p className="mt-2 max-w-xs text-sm text-muted">{result.classification.tagline}</p>
      </div>

      <div className="mt-8 rounded-[var(--radius-card)] border border-border bg-surface p-4 shadow-[var(--shadow-card)]">
        <RadarChart attributes={result.attributes} />
      </div>

      <div className="mt-6 rounded-[var(--radius-card)] border border-border bg-surface p-6 shadow-[var(--shadow-card)]">
        <AttributeBars attributes={result.attributes} />
      </div>

      {(result.strongestCategories.length > 0 || result.weakestCategories.length > 0) && (
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-brand-soft p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-strong">Strongest</p>
            <p className="mt-1 text-sm font-medium text-foreground">
              {result.strongestCategories.map((c) => categoryLabel(c)).join(", ")}
            </p>
          </div>
          <div className="rounded-2xl bg-danger-soft p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-danger">Needs Work</p>
            <p className="mt-1 text-sm font-medium text-foreground">
              {result.weakestCategories.map((c) => categoryLabel(c)).join(", ")}
            </p>
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3">
        <button
          onClick={handlePlayAgain}
          className="w-full rounded-full bg-brand px-8 py-4 text-center font-display text-lg font-bold text-white transition-transform active:scale-95"
        >
          PLAY AGAIN
        </button>

        <div className="rounded-2xl border border-border bg-surface p-4">
          <p className="text-sm font-semibold text-foreground">Think you&apos;re street smart?</p>
          <p className="mt-1 text-xs text-muted">Challenge a friend to beat your score.</p>
          <div className="mt-3 flex gap-2">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-full bg-[#25D366] px-4 py-2.5 text-center text-sm font-bold text-white transition-transform active:scale-95"
            >
              Share on WhatsApp
            </a>
            <button
              onClick={handleCopy}
              className="flex-1 rounded-full border border-border px-4 py-2.5 text-sm font-bold text-foreground transition-transform active:scale-95"
            >
              {copied ? "Copied!" : "Copy result"}
            </button>
          </div>
        </div>

        <button
          onClick={() => router.push("/")}
          className="w-full rounded-full px-8 py-3 text-center text-sm font-medium text-muted"
        >
          Back home
        </button>
      </div>
    </div>
  );
}

function categoryLabel(category: string): string {
  const map: Record<string, string> = {
    money: "Money",
    scam: "Scam Radar",
    work: "Work",
    business: "Business",
    negotiation: "Negotiation",
    digital: "Digital Life",
    everyday: "Everyday Life",
  };
  return map[category] ?? category;
}

function buildShareText(result: { streetSmartIQ: number; classification: { label: string }; attributes: Record<string, number> }): string {
  const iq = Math.round(result.streetSmartIQ);
  const scamRadar = Math.round(result.attributes.scamRadar ?? 0);
  const financialSense = Math.round(result.attributes.financialSense ?? 0);
  const negotiation = Math.round(result.attributes.negotiation ?? 0);
  return [
    "STREET SMART",
    `I scored: ${iq}`,
    result.classification.label,
    "",
    `Scam Radar: ${scamRadar}%`,
    `Financial Sense: ${financialSense}%`,
    `Negotiation: ${negotiation}%`,
    "",
    "Can you beat me? Play Street Smart.",
  ].join("\n");
}
