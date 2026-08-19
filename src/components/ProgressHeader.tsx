"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { TOTAL_ROUNDS } from "@/store/gameStore";

export function ProgressHeader({
  round,
  iq,
  onExit,
}: {
  round: number;
  iq: number;
  onExit: () => void;
}) {
  const [flash, setFlash] = useState(false);
  const prevIQ = useRef(iq);

  useEffect(() => {
    if (prevIQ.current !== iq) {
      setFlash(true);
      prevIQ.current = iq;
      const t = setTimeout(() => setFlash(false), 500);
      return () => clearTimeout(t);
    }
  }, [iq]);

  const progress = ((round - 1) / TOTAL_ROUNDS) * 100;

  return (
    <div className="sticky top-0 z-10 bg-background/90 px-5 pb-3 pt-5 backdrop-blur sm:px-8">
      <div className="mx-auto flex w-full max-w-lg items-center justify-between">
        <button
          onClick={onExit}
          aria-label="Exit game"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-muted"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>

        <span className="text-xs font-semibold uppercase tracking-widest text-muted">
          Situation {round} of {TOTAL_ROUNDS}
        </span>

        <div
          className={`font-display text-sm font-bold text-brand ${flash ? "animate-count-flash" : ""}`}
        >
          IQ {iq}
        </div>
      </div>

      <div className="mx-auto mt-3 h-1.5 w-full max-w-lg overflow-hidden rounded-full bg-surface-2">
        <motion.div
          className="h-full rounded-full bg-brand"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
