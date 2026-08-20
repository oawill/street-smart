"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getDeviceId } from "@/lib/deviceId";
import { DailyScenarioCard } from "@/components/DailyScenarioCard";
import { DailyChallengeResults } from "@/components/DailyChallengeResults";
import type { Category } from "@/types/game";

interface Situation {
  id: string;
  title: string;
  category: Category;
  city?: string | null;
  situation: string;
  decisions: { id: string; label: string }[];
}

interface DecisionDetail {
  consequenceHeadline: string;
  consequenceBody: string;
  whyItMatters: string;
}

interface Stats {
  totalResponses: number;
  breakdown: { decisionId: string; label: string; count: number; percent: number }[];
}

export default function DailyChallengePage() {
  const [situation, setSituation] = useState<Situation | null>(null);
  const [decisionDetail, setDecisionDetail] = useState<DecisionDetail | null>(null);
  const [yourDecisionId, setYourDecisionId] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const deviceId = getDeviceId();
    fetch(`/api/daily-challenge?deviceId=${encodeURIComponent(deviceId)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          return;
        }
        setSituation(data.situation);
        if (data.alreadyResponded) {
          setYourDecisionId(data.yourDecisionId);
          setDecisionDetail(data.decisionDetail);
          setStats(data.stats);
        }
      })
      .catch(() => setError("Couldn't load today's challenge. Try again shortly."))
      .finally(() => setLoading(false));
  }, []);

  async function handleChoose(decisionId: string) {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/daily-challenge/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decisionId, deviceId: getDeviceId() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      setYourDecisionId(data.yourDecisionId);
      setDecisionDetail(data.decisionDetail);
      setStats(data.stats);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-5 py-8 sm:px-8">
      <Link href="/" className="text-sm font-medium text-muted hover:text-brand">
        ← Back
      </Link>

      <h1 className="mt-4 font-display text-2xl font-extrabold text-foreground">Today&apos;s Street Test</h1>
      <p className="mt-1 text-sm text-muted">Same situation, everyone, once a day.</p>

      <div className="mt-6">
        {loading && (
          <div className="flex justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-brand" />
          </div>
        )}

        {!loading && error && !situation && (
          <p className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted">
            {error}
          </p>
        )}

        {!loading && situation && !decisionDetail && (
          <DailyScenarioCard situation={situation} onChoose={handleChoose} disabled={submitting} />
        )}

        {!loading && situation && decisionDetail && stats && yourDecisionId && (
          <DailyChallengeResults
            consequenceHeadline={decisionDetail.consequenceHeadline}
            consequenceBody={decisionDetail.consequenceBody}
            whyItMatters={decisionDetail.whyItMatters}
            yourDecisionId={yourDecisionId}
            totalResponses={stats.totalResponses}
            breakdown={stats.breakdown}
          />
        )}

        {error && situation && <p className="mt-3 text-center text-sm text-danger">{error}</p>}
      </div>
    </div>
  );
}
