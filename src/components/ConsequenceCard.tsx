"use client";

import { ATTRIBUTE_LABELS, Decision } from "@/types/game";

export function ConsequenceCard({
  decision,
  isLastRound,
  onNext,
}: {
  decision: Decision;
  isLastRound: boolean;
  onNext: () => void;
}) {
  const tone =
    decision.scoreEffect > 3 ? "positive" : decision.scoreEffect < -3 ? "negative" : "neutral";

  const toneStyles = {
    positive: "text-brand-strong bg-brand-soft",
    negative: "text-danger bg-danger-soft",
    neutral: "text-accent bg-accent-soft",
  }[tone];

  const attributeEntries = Object.entries(decision.attributeEffects) as [string, number][];

  return (
    <div
      key={decision.id}
      className="animate-pop-in rounded-[var(--radius-card)] border border-border bg-surface p-6 shadow-[var(--shadow-card)] sm:p-8"
    >
      <span className={`inline-block rounded-full px-3 py-1.5 font-display text-sm font-bold ${toneStyles}`}>
        {decision.consequenceHeadline}
      </span>

      <p className="mt-4 text-lg leading-relaxed text-foreground">{decision.consequenceBody}</p>

      {attributeEntries.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {attributeEntries.map(([attr, delta]) => (
            <span
              key={attr}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                delta > 0 ? "bg-brand-soft text-brand-strong" : delta < 0 ? "bg-danger-soft text-danger" : "bg-surface-2 text-muted"
              }`}
            >
              {delta > 0 ? "+" : ""}
              {delta} {ATTRIBUTE_LABELS[attr as keyof typeof ATTRIBUTE_LABELS]}
            </span>
          ))}
        </div>
      )}

      <div className="mt-6 rounded-2xl bg-surface-2 p-4">
        <p className="text-xs font-bold uppercase tracking-widest text-muted">Street Lesson</p>
        <p className="mt-1.5 text-sm leading-relaxed text-foreground">{decision.whyItMatters}</p>
      </div>

      <button
        onClick={onNext}
        className="mt-6 w-full rounded-full bg-brand px-8 py-4 text-center font-display text-lg font-bold text-white transition-transform active:scale-95"
      >
        {isLastRound ? "SEE MY RESULTS →" : "NEXT SITUATION →"}
      </button>
    </div>
  );
}
