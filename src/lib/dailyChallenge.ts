import "server-only";
import { prisma } from "@/lib/db";
import { allScenarios } from "@/lib/scenarios";
import type { Scenario } from "@/types/game";

/** Scenarios that depend on flags set earlier in a 10-round session can't stand alone. */
const ELIGIBLE_SCENARIOS = allScenarios.filter((s) => !s.requiresFlags && !s.isDelayedConsequence);

export function todayDateKey(): string {
  return new Date().toISOString().slice(0, 10); // UTC "YYYY-MM-DD"
}

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

/** Same date always maps to the same scenario, so a race to create the row picks identically either way. */
function pickScenarioForDate(date: string): Scenario {
  const index = hashString(date) % ELIGIBLE_SCENARIOS.length;
  return ELIGIBLE_SCENARIOS[index];
}

export async function getOrCreateTodayChallenge() {
  const date = todayDateKey();
  const existing = await prisma.dailyChallenge.findUnique({ where: { date } });
  if (existing) return existing;

  const scenario = pickScenarioForDate(date);
  try {
    return await prisma.dailyChallenge.create({ data: { date, scenarioId: scenario.id } });
  } catch {
    // Lost a create race to a concurrent request — the row now exists (with
    // the same deterministic scenario), just read it back.
    return prisma.dailyChallenge.findUniqueOrThrow({ where: { date } });
  }
}

export function findScenarioById(scenarioId: string): Scenario | undefined {
  return allScenarios.find((s) => s.id === scenarioId);
}

export interface DailyChallengeStats {
  totalResponses: number;
  breakdown: { decisionId: string; label: string; count: number; percent: number }[];
}

export async function computeDailyChallengeStats(
  dailyChallengeId: string,
  scenario: Scenario
): Promise<DailyChallengeStats> {
  const responses = await prisma.dailyChallengeResponse.findMany({
    where: { dailyChallengeId },
    select: { decisionId: true },
  });

  const totalResponses = responses.length;
  const counts = new Map<string, number>();
  for (const r of responses) {
    counts.set(r.decisionId, (counts.get(r.decisionId) ?? 0) + 1);
  }

  const breakdown = scenario.decisions.map((d) => {
    const count = counts.get(d.id) ?? 0;
    return {
      decisionId: d.id,
      label: d.label,
      count,
      percent: totalResponses > 0 ? Math.round((count / totalResponses) * 100) : 0,
    };
  });

  return { totalResponses, breakdown };
}
