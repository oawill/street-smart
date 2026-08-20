import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/auth/session";
import { getOrCreateTodayChallenge, findScenarioById, computeDailyChallengeStats } from "@/lib/dailyChallenge";
import { isRateLimited, clientIpFromHeaders } from "@/lib/rateLimit";
import { track } from "@/lib/analytics/track";

const bodySchema = z.object({
  decisionId: z.string().min(1),
  deviceId: z.string().min(10).max(100),
});

export async function POST(request: NextRequest) {
  const ip = clientIpFromHeaders(request.headers);
  if (isRateLimited(`daily-challenge:${ip}`, 10, 60_000)) {
    return NextResponse.json({ error: "Too many attempts. Try again shortly." }, { status: 429 });
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }
  const { decisionId, deviceId } = parsed.data;

  const user = await getSessionUser();
  const challenge = await getOrCreateTodayChallenge();
  const scenario = findScenarioById(challenge.scenarioId);
  if (!scenario) {
    return NextResponse.json({ error: "Today's challenge scenario is missing." }, { status: 500 });
  }

  const decision = scenario.decisions.find((d) => d.id === decisionId);
  if (!decision) {
    return NextResponse.json({ error: "Invalid decision for today's challenge." }, { status: 400 });
  }

  const existing = await prisma.dailyChallengeResponse.findFirst({
    where: {
      dailyChallengeId: challenge.id,
      OR: [{ deviceId }, ...(user ? [{ userId: user.id }] : [])],
    },
  });

  if (!existing) {
    try {
      await prisma.dailyChallengeResponse.create({
        data: {
          dailyChallengeId: challenge.id,
          deviceId,
          userId: user?.id,
          decisionId,
        },
      });
      await track("daily_challenge_answered", { userId: user?.id, metadata: { decisionId } });
    } catch {
      // Unique constraint hit on a race between two near-simultaneous
      // submissions from the same device/user — treat as already answered.
    }
  }

  const stats = await computeDailyChallengeStats(challenge.id, scenario);
  const finalResponse = existing ?? (await prisma.dailyChallengeResponse.findFirst({
    where: { dailyChallengeId: challenge.id, OR: [{ deviceId }, ...(user ? [{ userId: user.id }] : [])] },
  }));
  const yourDecision = scenario.decisions.find((d) => d.id === finalResponse?.decisionId) ?? decision;

  return NextResponse.json({
    decisionDetail: {
      consequenceHeadline: yourDecision.consequenceHeadline,
      consequenceBody: yourDecision.consequenceBody,
      whyItMatters: yourDecision.whyItMatters,
    },
    yourDecisionId: yourDecision.id,
    stats,
  });
}
