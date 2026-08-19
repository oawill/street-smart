import { StreetSmartClassification } from "@/types/game";

const STYLES: Record<StreetSmartClassification, string> = {
  LEARNER: "bg-danger-soft text-danger",
  "GETTING SHARP": "bg-accent-soft text-accent",
  "STREET READY": "bg-info/15 text-info",
  SHARP: "bg-brand-soft text-brand-strong",
  "STREET GENERAL": "bg-brand-soft text-brand-strong",
  UNTOUCHABLE: "bg-accent-soft text-accent",
};

export function ClassificationBadge({ label }: { label: StreetSmartClassification }) {
  return (
    <span
      className={`inline-block rounded-full px-4 py-1.5 font-display text-sm font-bold uppercase tracking-wide ${STYLES[label]}`}
    >
      {label}
    </span>
  );
}
