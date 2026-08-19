import { Category, Difficulty, Flags, ProviderContext, Scenario } from "@/types/game";
import { allScenarios } from "./scenarios";
import { CATEGORY_ATTRIBUTES } from "./gameEngine";

/**
 * Abstraction over "where the next scenario comes from". The MVP ships with
 * LocalScenarioProvider, drawing from a curated local bank. A future
 * AIScenarioProvider can implement the same interface, generating
 * personalized scenarios from minimal, non-identifying player context
 * (see ProviderContext) without changing any calling code.
 */
export interface ScenarioProvider {
  getNext(context: ProviderContext): Scenario | null;
}

const ALL_CATEGORIES: Category[] = [
  "money",
  "scam",
  "work",
  "business",
  "negotiation",
  "digital",
  "everyday",
];

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function meetsFlagRequirements(scenario: Scenario, flags: Flags): boolean {
  if (scenario.requiresFlags && !scenario.requiresFlags.every((f) => Boolean(flags[f]))) {
    return false;
  }
  if (scenario.excludesFlags && scenario.excludesFlags.some((f) => Boolean(flags[f]))) {
    return false;
  }
  return true;
}

/**
 * Adaptive difficulty: the target difficulty for a category rises as the
 * player demonstrates strength in that category's attributes, and eases
 * off if they're struggling. Early rounds are biased easier regardless.
 */
function targetDifficulty(context: ProviderContext, category: Category): Difficulty {
  const attrs = CATEGORY_ATTRIBUTES[category];
  const avg = attrs.reduce((sum, a) => sum + context.attributes[a], 0) / attrs.length;

  if (context.roundNumber <= 2) {
    return avg >= 65 ? "medium" : "easy";
  }
  if (avg >= 72) return "hard";
  if (avg >= 55) return "medium";
  return "easy";
}

export class LocalScenarioProvider implements ScenarioProvider {
  getNext(context: ProviderContext): Scenario | null {
    const seen = new Set(context.seenScenarioIds);
    const candidates = allScenarios.filter(
      (s) => !seen.has(s.id) && meetsFlagRequirements(s, context.flags)
    );
    if (candidates.length === 0) return null;

    // Delayed-consequence "UPDATE" scenarios only become eligible once their
    // required flags are set by an earlier decision. Once eligible, surface
    // them fairly often so the game feels connected rather than random.
    const delayedReady = candidates.filter((s) => s.isDelayedConsequence);
    if (delayedReady.length > 0 && context.roundNumber >= 4 && Math.random() < 0.6) {
      return pickRandom(delayedReady);
    }

    const usedCategories = new Set(context.history.map((h) => h.category));
    const unusedCategories = ALL_CATEGORIES.filter((c) => !usedCategories.has(c));
    const categoryPool = unusedCategories.length > 0 ? unusedCategories : ALL_CATEGORIES;

    // Lightly weight toward the player's weaker categories so a full session
    // still probes their soft spots, without making the game feel unfair.
    const weakSet = new Set(context.weakestCategories);
    const weightedPool = categoryPool.flatMap((c) => (weakSet.has(c) ? [c, c] : [c]));
    const chosenCategory = pickRandom(weightedPool);

    const desiredDifficulty = targetDifficulty(context, chosenCategory);

    let pool = candidates.filter(
      (s) => s.category === chosenCategory && s.difficulty === desiredDifficulty && !s.isDelayedConsequence
    );
    if (pool.length === 0) {
      pool = candidates.filter((s) => s.category === chosenCategory && !s.isDelayedConsequence);
    }
    if (pool.length === 0) {
      pool = candidates.filter((s) => !s.isDelayedConsequence);
    }
    if (pool.length === 0) {
      pool = candidates;
    }

    return pickRandom(pool);
  }
}

export const localScenarioProvider = new LocalScenarioProvider();
