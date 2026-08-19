import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Attribute, ATTRIBUTES, GameSessionResult } from "@/types/game";

export interface PastGameSummary {
  streetSmartIQ: number;
  classification: string;
  completedAt: number;
}

interface ProfileState {
  hasPlayed: boolean;
  gamesPlayed: number;
  lastIQ: number | null;
  bestIQ: number | null;
  lastAttributes: Record<Attribute, number> | null;
  streak: number;
  lastPlayedDay: string | null;
  recentScenarioIds: string[];
  recentResults: PastGameSummary[];
  recordGameResult: (result: GameSessionResult) => void;
  resetProfile: () => void;
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function dayDiff(a: string, b: string): number {
  const da = new Date(a + "T00:00:00Z").getTime();
  const db = new Date(b + "T00:00:00Z").getTime();
  return Math.round((db - da) / 86400000);
}

const MAX_RECENT_SCENARIOS = 60;

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      hasPlayed: false,
      gamesPlayed: 0,
      lastIQ: null,
      bestIQ: null,
      lastAttributes: null,
      streak: 0,
      lastPlayedDay: null,
      recentScenarioIds: [],
      recentResults: [],
      recordGameResult: (result) => {
        const state = get();
        const today = todayKey();
        let streak = state.streak;
        if (!state.lastPlayedDay) {
          streak = 1;
        } else {
          const diff = dayDiff(state.lastPlayedDay, today);
          if (diff === 0) streak = Math.max(1, streak);
          else if (diff === 1) streak = streak + 1;
          else streak = 1;
        }

        const playedIds = result.history.map((h) => h.scenarioId);
        const recentScenarioIds = [...state.recentScenarioIds, ...playedIds].slice(
          -MAX_RECENT_SCENARIOS
        );

        set({
          hasPlayed: true,
          gamesPlayed: state.gamesPlayed + 1,
          lastIQ: result.streetSmartIQ,
          bestIQ: state.bestIQ !== null ? Math.max(state.bestIQ, result.streetSmartIQ) : result.streetSmartIQ,
          lastAttributes: result.attributes,
          streak,
          lastPlayedDay: today,
          recentScenarioIds,
          recentResults: [
            {
              streetSmartIQ: result.streetSmartIQ,
              classification: result.classification.label,
              completedAt: result.completedAt,
            },
            ...state.recentResults,
          ].slice(0, 20),
        });
      },
      resetProfile: () =>
        set({
          hasPlayed: false,
          gamesPlayed: 0,
          lastIQ: null,
          bestIQ: null,
          lastAttributes: null,
          streak: 0,
          lastPlayedDay: null,
          recentScenarioIds: [],
          recentResults: [],
        }),
    }),
    {
      name: "street-smart-profile",
    }
  )
);

export function defaultAttributes(): Record<Attribute, number> {
  return ATTRIBUTES.reduce((acc, attr) => {
    acc[attr] = 50;
    return acc;
  }, {} as Record<Attribute, number>);
}
