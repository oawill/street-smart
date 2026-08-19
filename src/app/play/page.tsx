"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/gameStore";
import { ProgressHeader } from "@/components/ProgressHeader";
import { ScenarioCard } from "@/components/ScenarioCard";
import { ConsequenceCard } from "@/components/ConsequenceCard";
import { TOTAL_ROUNDS } from "@/store/gameStore";

export default function PlayPage() {
  const router = useRouter();
  const phase = useGameStore((s) => s.phase);
  const round = useGameStore((s) => s.roundNumber);
  const iq = useGameStore((s) => s.session.streetSmartIQ);
  const currentScenario = useGameStore((s) => s.currentScenario);
  const selectedDecision = useGameStore((s) => s.selectedDecision);
  const startGame = useGameStore((s) => s.startGame);
  const selectDecision = useGameStore((s) => s.selectDecision);
  const nextRound = useGameStore((s) => s.nextRound);

  useEffect(() => {
    if (phase === "idle") {
      startGame();
    }
  }, [phase, startGame]);

  useEffect(() => {
    if (phase === "finished") {
      router.replace("/results");
    }
  }, [phase, router]);

  if (phase === "idle" || phase === "finished") {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-brand" />
      </div>
    );
  }

  if (!currentScenario) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-foreground">Ran out of fresh situations for this session.</p>
        <button
          onClick={() => router.push("/")}
          className="rounded-full bg-brand px-6 py-3 font-display font-bold text-white"
        >
          Back home
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <ProgressHeader round={round} iq={iq} onExit={() => router.push("/")} />

      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-5 py-6 sm:px-8">
        {phase === "situation" && (
          <ScenarioCard
            key={`s-${currentScenario.id}`}
            scenario={currentScenario}
            disabled={false}
            onChoose={(decision) => selectDecision(decision.id)}
          />
        )}
        {phase === "consequence" && selectedDecision && (
          <ConsequenceCard
            key={`c-${currentScenario.id}`}
            decision={selectedDecision}
            isLastRound={round >= TOTAL_ROUNDS}
            onNext={nextRound}
          />
        )}
      </main>
    </div>
  );
}
