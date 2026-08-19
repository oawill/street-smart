import { allScenarios } from "../src/lib/scenarios";

const ids = new Map<string, number>();
for (const s of allScenarios) {
  ids.set(s.id, (ids.get(s.id) ?? 0) + 1);
}
const dupes = [...ids.entries()].filter(([, count]) => count > 1);

const allFlags = new Set<string>();
for (const s of allScenarios) {
  for (const d of s.decisions) {
    if (d.setFlags) {
      for (const f of Object.keys(d.setFlags)) allFlags.add(f);
    }
  }
}

const missingFlagRefs: string[] = [];
const delayedScenarios: string[] = [];
for (const s of allScenarios) {
  if (s.requiresFlags) {
    delayedScenarios.push(s.id);
    for (const f of s.requiresFlags) {
      if (!allFlags.has(f)) missingFlagRefs.push(`${s.id} requires "${f}" which no decision ever sets`);
    }
  }
}

const byCategory: Record<string, number> = {};
const byDifficulty: Record<string, number> = {};
let decisionCount = 0;
let tradeoffCount = 0;
for (const s of allScenarios) {
  byCategory[s.category] = (byCategory[s.category] ?? 0) + 1;
  byDifficulty[s.difficulty] = (byDifficulty[s.difficulty] ?? 0) + 1;
  if (s.decisions.length < 3 || s.decisions.length > 5) {
    console.log(`WARN: ${s.id} has ${s.decisions.length} decisions (expected 3-5)`);
  }
  for (const d of s.decisions) {
    decisionCount++;
    const deltas = Object.values(d.attributeEffects);
    const hasPositive = deltas.some((v) => (v ?? 0) > 0);
    const hasNegative = deltas.some((v) => (v ?? 0) < 0);
    if (hasPositive && hasNegative) tradeoffCount++;
  }
}

console.log("Total scenarios:", allScenarios.length);
console.log("By category:", byCategory);
console.log("By difficulty:", byDifficulty);
console.log("Total decisions:", decisionCount);
console.log("Decisions with a genuine tradeoff (mixed +/- attributes):", tradeoffCount, `(${Math.round((tradeoffCount / decisionCount) * 100)}%)`);
console.log("Delayed-consequence scenarios (requiresFlags):", delayedScenarios.length, delayedScenarios);
console.log("Duplicate scenario IDs:", dupes.length ? dupes : "none");
console.log("Missing flag references:", missingFlagRefs.length ? missingFlagRefs : "none");

let cautiousScenarios = 0;
let cautiousAlwaysBest = 0;
for (const s of allScenarios) {
  const cautious = s.decisions.filter((d) => d.isCautious);
  if (cautious.length === 0) continue;
  cautiousScenarios++;
  const maxScore = Math.max(...s.decisions.map((d) => d.scoreEffect));
  const cautiousMax = Math.max(...cautious.map((d) => d.scoreEffect));
  if (cautiousMax >= maxScore) cautiousAlwaysBest++;
}
console.log(
  `Scenarios where the cautious/walk-away option is the single best-scoring choice: ${cautiousAlwaysBest}/${cautiousScenarios}`
);
