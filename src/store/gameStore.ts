import { create } from "zustand";
import { Decision, GameSessionResult, ProviderContext, Scenario } from "@/types/game";
import {
  applyDecision,
  initSession,
  PlayerSessionState,
  strongestCategories,
  weakestCategories,
} from "@/lib/gameEngine";
import { classify } from "@/lib/classification";
import { localScenarioProvider } from "@/lib/scenarioProvider";
import { useProfileStore } from "./profileStore";

export const TOTAL_ROUNDS = 10;

export type GamePhase = "idle" | "situation" | "consequence" | "finished";

interface GameStoreState {
  session: PlayerSessionState;
  currentScenario: Scenario | null;
  selectedDecision: Decision | null;
  roundNumber: number;
  phase: GamePhase;
  seenScenarioIds: string[];
  result: GameSessionResult | null;
  startGame: () => void;
  selectDecision: (decisionId: string) => void;
  nextRound: () => void;
}

function buildContext(state: GameStoreState): ProviderContext {
  return {
    streetSmartIQ: state.session.streetSmartIQ,
    attributes: state.session.attributes,
    history: state.session.game.history,
    seenScenarioIds: state.seenScenarioIds,
    flags: state.session.game.flags,
    roundNumber: state.roundNumber,
    totalRounds: TOTAL_ROUNDS,
    weakestCategories: weakestCategories(state.session.attributes),
    strongestCategories: strongestCategories(state.session.attributes),
  };
}

export const useGameStore = create<GameStoreState>((set, get) => ({
  session: initSession(),
  currentScenario: null,
  selectedDecision: null,
  roundNumber: 1,
  phase: "idle",
  seenScenarioIds: [],
  result: null,

  startGame: () => {
    const freshState: GameStoreState = {
      ...get(),
      session: initSession(),
      currentScenario: null,
      selectedDecision: null,
      roundNumber: 1,
      phase: "situation",
      seenScenarioIds: [],
      result: null,
    };
    const scenario = localScenarioProvider.getNext(buildContext(freshState));
    // Deliberately does not clear `result` here: the Results page is often
    // still mounted for a moment while "Play Again" navigates to /play, and
    // it redirects home whenever `result` is falsy. Clearing it here would
    // race that redirect against the navigation to /play. It gets replaced
    // with a fresh value the next time a game actually finishes.
    set({
      session: freshState.session,
      currentScenario: scenario,
      selectedDecision: null,
      roundNumber: 1,
      phase: "situation",
      seenScenarioIds: scenario ? [scenario.id] : [],
    });
  },

  selectDecision: (decisionId: string) => {
    const { currentScenario, session } = get();
    if (!currentScenario) return;
    const decision = currentScenario.decisions.find((d) => d.id === decisionId);
    if (!decision) return;
    const newSession = applyDecision(session, currentScenario, decision);
    set({ session: newSession, selectedDecision: decision, phase: "consequence" });
  },

  nextRound: () => {
    const state = get();
    if (state.roundNumber >= TOTAL_ROUNDS) {
      const attributes = state.session.attributes;
      const result: GameSessionResult = {
        streetSmartIQ: state.session.streetSmartIQ,
        classification: classify(state.session.streetSmartIQ),
        attributes,
        history: state.session.game.history,
        strongestCategories: strongestCategories(attributes),
        weakestCategories: weakestCategories(attributes),
        completedAt: Date.now(),
      };
      useProfileStore.getState().recordGameResult(result);
      set({ phase: "finished", result, currentScenario: null, selectedDecision: null });
      return;
    }

    const nextRoundNumber = state.roundNumber + 1;
    const intermediateState: GameStoreState = { ...state, roundNumber: nextRoundNumber };
    const scenario = localScenarioProvider.getNext(buildContext(intermediateState));
    set({
      roundNumber: nextRoundNumber,
      currentScenario: scenario,
      selectedDecision: null,
      phase: "situation",
      seenScenarioIds: scenario ? [...state.seenScenarioIds, scenario.id] : state.seenScenarioIds,
    });
  },
}));
