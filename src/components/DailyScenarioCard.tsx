"use client";

import { CATEGORY_LABELS, type Category } from "@/types/game";

const LETTERS = ["A", "B", "C", "D", "E"];

interface DailySituation {
  id: string;
  title: string;
  category: Category;
  city?: string | null;
  situation: string;
  decisions: { id: string; label: string }[];
}

export function DailyScenarioCard({
  situation,
  onChoose,
  disabled,
}: {
  situation: DailySituation;
  onChoose: (decisionId: string) => void;
  disabled: boolean;
}) {
  return (
    <div className="animate-pop-in rounded-[var(--radius-card)] border border-border bg-surface p-6 shadow-[var(--shadow-card)] sm:p-8">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent">
          Today&apos;s Street Test
        </span>
        <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-strong">
          {CATEGORY_LABELS[situation.category]}
        </span>
        {situation.city && (
          <span className="rounded-full bg-surface-2 px-3 py-1 text-xs font-medium text-muted">
            {situation.city}
          </span>
        )}
      </div>

      <p className="text-lg leading-relaxed text-foreground sm:text-xl">{situation.situation}</p>

      <p className="mt-6 mb-3 text-sm font-semibold uppercase tracking-widest text-muted">Your Move</p>

      <div className="flex flex-col gap-3">
        {situation.decisions.map((decision, i) => (
          <button
            key={decision.id}
            disabled={disabled}
            onClick={() => onChoose(decision.id)}
            className="group flex items-start gap-3 rounded-2xl border border-border bg-background px-4 py-3.5 text-left transition-all hover:border-brand hover:bg-brand-soft disabled:pointer-events-none disabled:opacity-60 sm:px-5"
          >
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-2 font-display text-sm font-bold text-muted group-hover:bg-brand group-hover:text-white">
              {LETTERS[i] ?? i + 1}
            </span>
            <span className="text-[15px] leading-snug text-foreground sm:text-base">{decision.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
