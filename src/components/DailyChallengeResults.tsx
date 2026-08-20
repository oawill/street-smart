"use client";

const LETTERS = ["A", "B", "C", "D", "E"];

interface StatRow {
  decisionId: string;
  label: string;
  count: number;
  percent: number;
}

export function DailyChallengeResults({
  consequenceHeadline,
  consequenceBody,
  whyItMatters,
  yourDecisionId,
  totalResponses,
  breakdown,
}: {
  consequenceHeadline: string;
  consequenceBody: string;
  whyItMatters: string;
  yourDecisionId: string;
  totalResponses: number;
  breakdown: StatRow[];
}) {
  return (
    <div className="animate-pop-in rounded-[var(--radius-card)] border border-border bg-surface p-6 shadow-[var(--shadow-card)] sm:p-8">
      <span className="inline-block rounded-full bg-brand-soft px-3 py-1.5 font-display text-sm font-bold text-brand-strong">
        {consequenceHeadline}
      </span>

      <p className="mt-4 text-lg leading-relaxed text-foreground">{consequenceBody}</p>

      <div className="mt-4 rounded-2xl bg-surface-2 p-4">
        <p className="text-xs font-bold uppercase tracking-widest text-muted">Street Lesson</p>
        <p className="mt-1.5 text-sm leading-relaxed text-foreground">{whyItMatters}</p>
      </div>

      <div className="mt-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-muted">
          {totalResponses.toLocaleString()} {totalResponses === 1 ? "person has" : "people have"} played today
        </p>

        <div className="mt-3 flex flex-col gap-2.5">
          {breakdown.map((row, i) => {
            const isYours = row.decisionId === yourDecisionId;
            return (
              <div key={row.decisionId}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className={`flex items-center gap-2 ${isYours ? "font-bold text-foreground" : "text-muted"}`}>
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold ${
                        isYours ? "bg-brand text-white" : "bg-surface-2 text-muted"
                      }`}
                    >
                      {LETTERS[i] ?? i + 1}
                    </span>
                    {isYours ? "Your choice" : row.label}
                  </span>
                  <span className={isYours ? "font-bold text-brand-strong" : "text-muted"}>{row.percent}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-surface-2">
                  <div
                    className={`h-full rounded-full ${isYours ? "bg-brand" : "bg-muted/40"}`}
                    style={{ width: `${row.percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-muted">Come back tomorrow for a new Street Test.</p>
    </div>
  );
}
