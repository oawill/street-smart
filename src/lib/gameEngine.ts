import {
  ATTRIBUTES,
  Attribute,
  Category,
  Decision,
  DecisionRecord,
  GameState,
  Scenario,
} from "@/types/game";

export const STARTING_IQ = 100;
export const MIN_IQ = 40;
export const MAX_IQ = 160;
export const STARTING_ATTRIBUTE = 50;

export interface PlayerSessionState {
  streetSmartIQ: number;
  attributes: Record<Attribute, number>;
  game: GameState;
}

export const CATEGORY_ATTRIBUTES: Record<Category, Attribute[]> = {
  money: ["financialSense"],
  scam: ["scamRadar", "digitalSafety"],
  work: ["careerJudgment", "negotiation"],
  business: ["businessInstinct", "negotiation"],
  negotiation: ["negotiation"],
  digital: ["digitalSafety", "scamRadar"],
  everyday: ["peopleSense", "riskAwareness"],
};

export function initSession(): PlayerSessionState {
  const attributes = ATTRIBUTES.reduce((acc, attr) => {
    acc[attr] = STARTING_ATTRIBUTE;
    return acc;
  }, {} as Record<Attribute, number>);

  return {
    streetSmartIQ: STARTING_IQ,
    attributes,
    game: {
      cash: 350000,
      income: 450000,
      debt: 0,
      reputation: 60,
      relationships: 60,
      employment: "employed",
      businessStatus: "none",
      flags: {},
      history: [],
    },
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function applyDecision(
  session: PlayerSessionState,
  scenario: Scenario,
  decision: Decision
): PlayerSessionState {
  const newAttributes = { ...session.attributes };
  for (const [attr, delta] of Object.entries(decision.attributeEffects)) {
    const key = attr as Attribute;
    newAttributes[key] = clamp(newAttributes[key] + (delta ?? 0), 0, 100);
  }

  const newIQ = clamp(session.streetSmartIQ + decision.scoreEffect, MIN_IQ, MAX_IQ);

  const state = session.game;
  const stateEffects = decision.stateEffects ?? {};
  const newGame: GameState = {
    ...state,
    cash: state.cash + (stateEffects.cash ?? 0),
    income: state.income + (stateEffects.income ?? 0),
    debt: Math.max(0, state.debt + (stateEffects.debt ?? 0)),
    reputation: clamp(state.reputation + (stateEffects.reputation ?? 0), 0, 100),
    relationships: clamp(state.relationships + (stateEffects.relationships ?? 0), 0, 100),
    flags: { ...state.flags, ...(decision.setFlags ?? {}) },
    history: state.history,
  };

  const record: DecisionRecord = {
    scenarioId: scenario.id,
    decisionId: decision.id,
    category: scenario.category,
    difficulty: scenario.difficulty,
    scoreDelta: decision.scoreEffect,
    attributeDeltas: decision.attributeEffects,
    timestamp: Date.now(),
  };
  newGame.history = [...state.history, record];

  return {
    streetSmartIQ: newIQ,
    attributes: newAttributes,
    game: newGame,
  };
}

export function categoryStrengths(
  attributes: Record<Attribute, number>
): { category: Category; score: number }[] {
  return (Object.keys(CATEGORY_ATTRIBUTES) as Category[]).map((category) => {
    const attrs = CATEGORY_ATTRIBUTES[category];
    const score = attrs.reduce((sum, a) => sum + attributes[a], 0) / attrs.length;
    return { category, score };
  });
}

export function weakestCategories(attributes: Record<Attribute, number>, n = 2): Category[] {
  return [...categoryStrengths(attributes)]
    .sort((a, b) => a.score - b.score)
    .slice(0, n)
    .map((c) => c.category);
}

export function strongestCategories(attributes: Record<Attribute, number>, n = 2): Category[] {
  return [...categoryStrengths(attributes)]
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map((c) => c.category);
}
