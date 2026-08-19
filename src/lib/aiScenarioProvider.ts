import { ProviderContext, Scenario } from "@/types/game";
import { ScenarioProvider } from "./scenarioProvider";

/**
 * Minimal, non-identifying payload sent to an AI model to generate a
 * personalized scenario. Deliberately excludes name, email, phone, exact
 * location, or any other PII — only gameplay signal.
 */
export interface AIScenarioRequest {
  ageRange?: string;
  occupation?: string;
  streetSmartIQ: number;
  weakestCategories: ProviderContext["weakestCategories"];
  strongestCategories: ProviderContext["strongestCategories"];
  recentDecisionSummaries: { category: string; difficulty: string; chooseCautious: boolean; scoreDelta: number }[];
  roundNumber: number;
  totalRounds: number;
}

function toAIRequest(context: ProviderContext): AIScenarioRequest {
  return {
    ageRange: context.ageRange,
    occupation: context.occupation,
    streetSmartIQ: context.streetSmartIQ,
    weakestCategories: context.weakestCategories,
    strongestCategories: context.strongestCategories,
    recentDecisionSummaries: context.history.slice(-5).map((h) => ({
      category: h.category,
      difficulty: h.difficulty,
      chooseCautious: h.scoreDelta >= 0,
      scoreDelta: h.scoreDelta,
    })),
    roundNumber: context.roundNumber,
    totalRounds: context.totalRounds,
  };
}

/**
 * Phase 4 placeholder. Implements the same ScenarioProvider contract as
 * LocalScenarioProvider so it can be swapped in without touching game
 * logic or UI. Currently unimplemented — the MVP runs entirely on the
 * curated local scenario bank.
 */
export class AIScenarioProvider implements ScenarioProvider {
  getNext(context: ProviderContext): Scenario | null {
    void toAIRequest(context);
    throw new Error(
      "AIScenarioProvider is not implemented yet. Use LocalScenarioProvider for now."
    );
  }
}
