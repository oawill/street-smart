-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "firstName" TEXT,
    "city" TEXT,
    "state" TEXT,
    "role" TEXT NOT NULL DEFAULT 'PLAYER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GameCompletion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "streetSmartIQ" INTEGER NOT NULL,
    "completedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "GameCompletion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PartnerApplication" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "publicId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "partnerType" TEXT NOT NULL,
    "organizationName" TEXT,
    "city" TEXT,
    "state" TEXT,
    "promotionPlan" TEXT NOT NULL,
    "audienceSize" TEXT,
    "website" TEXT,
    "agreedToTerms" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'PENDING_REVIEW',
    "reviewedByUserId" TEXT,
    "reviewedAt" DATETIME,
    "adminNotes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PartnerApplication_reviewedByUserId_fkey" FOREIGN KEY ("reviewedByUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PartnerProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "publicId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "partnerType" TEXT NOT NULL,
    "applicationId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "adminNotes" TEXT,
    "joinDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PartnerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PartnerProfile_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "PartnerApplication" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReferralCode" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "partnerProfileId" TEXT NOT NULL,
    "isCustom" BOOLEAN NOT NULL DEFAULT false,
    "customRequestPending" BOOLEAN NOT NULL DEFAULT false,
    "clickCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ReferralCode_partnerProfileId_fkey" FOREIGN KEY ("partnerProfileId") REFERENCES "PartnerProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Referral" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "publicId" TEXT NOT NULL,
    "referralCodeId" TEXT NOT NULL,
    "partnerProfileId" TEXT NOT NULL,
    "referredUserId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'REGISTERED',
    "source" TEXT NOT NULL DEFAULT 'cookie',
    "flaggedReason" TEXT,
    "registeredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "qualifiedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Referral_referralCodeId_fkey" FOREIGN KEY ("referralCodeId") REFERENCES "ReferralCode" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Referral_partnerProfileId_fkey" FOREIGN KEY ("partnerProfileId") REFERENCES "PartnerProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Referral_referredUserId_fkey" FOREIGN KEY ("referredUserId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReferralProgram" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "referralType" TEXT NOT NULL,
    "rewardType" TEXT NOT NULL,
    "rewardAmount" REAL NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'NGN',
    "qualificationRule" TEXT NOT NULL DEFAULT 'FIRST_GAME_COMPLETED',
    "campaignMultiplier" REAL,
    "startDate" DATETIME,
    "endDate" DATETIME,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "RewardLedger" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "publicId" TEXT NOT NULL,
    "referralId" TEXT NOT NULL,
    "partnerProfileId" TEXT NOT NULL,
    "referralProgramId" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "currency" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "approvedByUserId" TEXT,
    "approvedAt" DATETIME,
    "paidAt" DATETIME,
    "payoutReference" TEXT,
    "adminNotes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RewardLedger_referralId_fkey" FOREIGN KEY ("referralId") REFERENCES "Referral" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RewardLedger_partnerProfileId_fkey" FOREIGN KEY ("partnerProfileId") REFERENCES "PartnerProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RewardLedger_referralProgramId_fkey" FOREIGN KEY ("referralProgramId") REFERENCES "ReferralProgram" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RewardLedger_approvedByUserId_fkey" FOREIGN KEY ("approvedByUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PayoutProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "partnerProfileId" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "accountName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PayoutProfile_partnerProfileId_fkey" FOREIGN KEY ("partnerProfileId") REFERENCES "PartnerProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PartnerTier" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "minQualifiedReferrals" INTEGER NOT NULL,
    "sortOrder" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "AnalyticsEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "userId" TEXT,
    "partnerProfileId" TEXT,
    "referralId" TEXT,
    "metadata" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "IdCounter" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "value" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Session_tokenHash_key" ON "Session"("tokenHash");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE INDEX "GameCompletion_userId_idx" ON "GameCompletion"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PartnerApplication_publicId_key" ON "PartnerApplication"("publicId");

-- CreateIndex
CREATE INDEX "PartnerApplication_status_idx" ON "PartnerApplication"("status");

-- CreateIndex
CREATE UNIQUE INDEX "PartnerProfile_publicId_key" ON "PartnerProfile"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "PartnerProfile_userId_key" ON "PartnerProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PartnerProfile_applicationId_key" ON "PartnerProfile"("applicationId");

-- CreateIndex
CREATE INDEX "PartnerProfile_status_idx" ON "PartnerProfile"("status");

-- CreateIndex
CREATE UNIQUE INDEX "ReferralCode_code_key" ON "ReferralCode"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ReferralCode_partnerProfileId_key" ON "ReferralCode"("partnerProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "Referral_publicId_key" ON "Referral"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "Referral_referredUserId_key" ON "Referral"("referredUserId");

-- CreateIndex
CREATE INDEX "Referral_partnerProfileId_idx" ON "Referral"("partnerProfileId");

-- CreateIndex
CREATE INDEX "Referral_status_idx" ON "Referral"("status");

-- CreateIndex
CREATE UNIQUE INDEX "RewardLedger_publicId_key" ON "RewardLedger"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "RewardLedger_referralId_key" ON "RewardLedger"("referralId");

-- CreateIndex
CREATE INDEX "RewardLedger_partnerProfileId_idx" ON "RewardLedger"("partnerProfileId");

-- CreateIndex
CREATE INDEX "RewardLedger_status_idx" ON "RewardLedger"("status");

-- CreateIndex
CREATE UNIQUE INDEX "PayoutProfile_partnerProfileId_key" ON "PayoutProfile"("partnerProfileId");

-- CreateIndex
CREATE INDEX "AnalyticsEvent_name_idx" ON "AnalyticsEvent"("name");

-- CreateIndex
CREATE INDEX "AnalyticsEvent_createdAt_idx" ON "AnalyticsEvent"("createdAt");
