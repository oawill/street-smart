// Core domain types for Street Smart.

export type Attribute =
  | "financialSense"
  | "scamRadar"
  | "negotiation"
  | "riskAwareness"
  | "peopleSense"
  | "businessInstinct"
  | "careerJudgment"
  | "digitalSafety";

export const ATTRIBUTES: Attribute[] = [
  "financialSense",
  "scamRadar",
  "negotiation",
  "riskAwareness",
  "peopleSense",
  "businessInstinct",
  "careerJudgment",
  "digitalSafety",
];

export const ATTRIBUTE_LABELS: Record<Attribute, string> = {
  financialSense: "Financial Sense",
  scamRadar: "Scam Radar",
  negotiation: "Negotiation",
  riskAwareness: "Risk Awareness",
  peopleSense: "People Sense",
  businessInstinct: "Business Instinct",
  careerJudgment: "Career Judgment",
  digitalSafety: "Digital Safety",
};

export type Category =
  | "money"
  | "scam"
  | "work"
  | "business"
  | "negotiation"
  | "digital"
  | "everyday";

export const CATEGORY_LABELS: Record<Category, string> = {
  money: "Money",
  scam: "Scam Radar",
  work: "Work",
  business: "Business",
  negotiation: "Negotiation",
  digital: "Digital Life",
  everyday: "Everyday Life",
};

export type Difficulty = "easy" | "medium" | "hard";

/**
 * Flags are freeform booleans/numbers set by decisions to drive later
 * delayed-consequence scenarios and gating (requiresFlags/excludesFlags).
 */
export type Flags = Record<string, number | boolean | string>;

export interface GameState {
  cash: number; // ₦, simulated
  income: number; // ₦/month, simulated
  debt: number; // ₦, simulated
  reputation: number; // 0-100
  relationships: number; // 0-100, general social capital
  employment: "employed" | "self-employed" | "unemployed" | "student";
  businessStatus: "none" | "side-hustle" | "registered" | "struggling" | "growing";
  flags: Flags;
  history: DecisionRecord[];
}

export interface DecisionRecord {
  scenarioId: string;
  decisionId: string;
  category: Category;
  difficulty: Difficulty;
  scoreDelta: number;
  attributeDeltas: Partial<Record<Attribute, number>>;
  timestamp: number;
}

export interface Decision {
  id: string;
  label: string;
  /** Short headline shown immediately after choosing, e.g. "Good move. +8 Street Smart" */
  consequenceHeadline: string;
  /** 1-2 sentences describing what happened as a result of the choice. */
  consequenceBody: string;
  /** "Why it matters" explanation shown beneath the consequence. */
  whyItMatters: string;
  /** Delta applied to the player's Street Smart IQ (roughly -12..+12). */
  scoreEffect: number;
  /** Deltas applied to one or more of the 8 tracked attributes. */
  attributeEffects: Partial<Record<Attribute, number>>;
  /** Optional state mutations simulated as a result of this decision. */
  stateEffects?: Partial<Pick<GameState, "cash" | "income" | "debt" | "reputation" | "relationships">>;
  /** Flags to set on the game state when this decision is chosen. */
  setFlags?: Flags;
  /** Marks this as the "safe"/avoidant choice, used for adaptive difficulty & achievements. */
  isCautious?: boolean;
  /** Marks this as the choice that fell for a scam / urgency trap. */
  isTrap?: boolean;
}

export interface Scenario {
  id: string;
  title: string;
  category: Category;
  difficulty: Difficulty;
  city?: string;
  situation: string;
  decisions: Decision[];
  tags: string[];
  /** If set, this scenario only appears after the given flag has been set (delayed consequence). */
  requiresFlags?: string[];
  /** If set, this scenario is skipped when any of these flags are present. */
  excludesFlags?: string[];
  /** If true, this scenario is a follow-up "UPDATE" to an earlier decision. */
  isDelayedConsequence?: boolean;
}

export type StreetSmartClassification =
  | "LEARNER"
  | "GETTING SHARP"
  | "STREET READY"
  | "SHARP"
  | "STREET GENERAL"
  | "UNTOUCHABLE";

export interface ClassificationInfo {
  label: StreetSmartClassification;
  min: number;
  max: number;
  tagline: string;
}

export interface GameSessionResult {
  streetSmartIQ: number;
  classification: ClassificationInfo;
  attributes: Record<Attribute, number>;
  history: DecisionRecord[];
  strongestCategories: Category[];
  weakestCategories: Category[];
  completedAt: number;
}

/** Context passed to a ScenarioProvider so it can pick/generate the next scenario. */
export interface ProviderContext {
  ageRange?: string;
  occupation?: string;
  streetSmartIQ: number;
  attributes: Record<Attribute, number>;
  history: DecisionRecord[];
  seenScenarioIds: string[];
  flags: Flags;
  roundNumber: number; // 1-indexed within the current session
  totalRounds: number;
  weakestCategories: Category[];
  strongestCategories: Category[];
}
