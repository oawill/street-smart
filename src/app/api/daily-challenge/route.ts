import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/auth/session";
import { getOrCreateTodayChallenge, findScenarioById, computeDailyChallengeStats } from "@/lib/dailyChallenge";

export async function GET(request: NextRequest) {
  const deviceId = request.nextUrl.searchParams.get("deviceId");
  const user = await getSessionUser();

  const challenge = await getOrCreateTodayChallenge();
  const scenario = findScenarioById(challenge.scenarioId);
  if (!scenario) {
    return NextResponse.json({ error: "Today's challenge scenario is missing." }, { status: 500 });
  }

  const existingResponse = await prisma.dailyChallengeResponse.findFirst({
    where: {
      dailyChallengeId: challenge.id,
      OR: [
        ...(deviceId ? [{ deviceId }] : []),
        ...(user ? [{ userId: user.id }] : []),
      ],
    },
  });

  const situation = {
    id: scenario.id,
    title: scenario.title,
    category: scenario.category,
    city: scenario.city,
    situation: scenario.situation,
    decisions: scenario.decisions.map((d) => ({ id: d.id, label: d.label })),
  };

  if (!existingResponse) {
    return NextResponse.json({ situation, alreadyResponded: false });
  }

  const stats = await computeDailyChallengeStats(challenge.id, scenario);
  const yourDecision = scenario.decisions.find((d) => d.id === existingResponse.decisionId);

  return NextResponse.json({
    situation,
    alreadyResponded: true,
    yourDecisionId: existingResponse.decisionId,
    decisionDetail: yourDecision
      ? {
          consequenceHeadline: yourDecision.consequenceHeadline,
          consequenceBody: yourDecision.consequenceBody,
          whyItMatters: yourDecision.whyItMatters,
        }
      : null,
    stats,
  });
}
