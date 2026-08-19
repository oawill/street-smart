import { ClassificationInfo } from "@/types/game";

export const CLASSIFICATIONS: ClassificationInfo[] = [
  {
    label: "LEARNER",
    min: 40,
    max: 69,
    tagline: "You may want to slow down before saying yes.",
  },
  {
    label: "GETTING SHARP",
    min: 70,
    max: 89,
    tagline: "You're learning how the streets work.",
  },
  {
    label: "STREET READY",
    min: 90,
    max: 109,
    tagline: "You can generally hold your own.",
  },
  {
    label: "SHARP",
    min: 110,
    max: 129,
    tagline: "Not much gets past you.",
  },
  {
    label: "STREET GENERAL",
    min: 130,
    max: 149,
    tagline: "You've seen things.",
  },
  {
    label: "UNTOUCHABLE",
    min: 150,
    max: 160,
    tagline: "At this point, you're probably the person everyone calls for advice.",
  },
];

export function classify(iq: number): ClassificationInfo {
  const clamped = Math.max(40, Math.min(160, iq));
  const match = CLASSIFICATIONS.find((c) => clamped >= c.min && clamped <= c.max);
  return match ?? CLASSIFICATIONS[2];
}
