-- CreateTable
CREATE TABLE "DailyChallenge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" TEXT NOT NULL,
    "scenarioId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "DailyChallengeResponse" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dailyChallengeId" TEXT NOT NULL,
    "userId" TEXT,
    "deviceId" TEXT NOT NULL,
    "decisionId" TEXT NOT NULL,
    "respondedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "DailyChallengeResponse_dailyChallengeId_fkey" FOREIGN KEY ("dailyChallengeId") REFERENCES "DailyChallenge" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "DailyChallengeResponse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "DailyChallenge_date_key" ON "DailyChallenge"("date");

-- CreateIndex
CREATE INDEX "DailyChallengeResponse_dailyChallengeId_idx" ON "DailyChallengeResponse"("dailyChallengeId");

-- CreateIndex
CREATE UNIQUE INDEX "DailyChallengeResponse_dailyChallengeId_deviceId_key" ON "DailyChallengeResponse"("dailyChallengeId", "deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "DailyChallengeResponse_dailyChallengeId_userId_key" ON "DailyChallengeResponse"("dailyChallengeId", "userId");
