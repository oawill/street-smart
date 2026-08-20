/*
  Warnings:

  - Added the required column `userId` to the `PartnerApplication` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PartnerApplication" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "publicId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
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
    CONSTRAINT "PartnerApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PartnerApplication_reviewedByUserId_fkey" FOREIGN KEY ("reviewedByUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_PartnerApplication" ("adminNotes", "agreedToTerms", "audienceSize", "city", "createdAt", "email", "fullName", "id", "organizationName", "partnerType", "phone", "promotionPlan", "publicId", "reviewedAt", "reviewedByUserId", "state", "status", "website") SELECT "adminNotes", "agreedToTerms", "audienceSize", "city", "createdAt", "email", "fullName", "id", "organizationName", "partnerType", "phone", "promotionPlan", "publicId", "reviewedAt", "reviewedByUserId", "state", "status", "website" FROM "PartnerApplication";
DROP TABLE "PartnerApplication";
ALTER TABLE "new_PartnerApplication" RENAME TO "PartnerApplication";
CREATE UNIQUE INDEX "PartnerApplication_publicId_key" ON "PartnerApplication"("publicId");
CREATE INDEX "PartnerApplication_status_idx" ON "PartnerApplication"("status");
CREATE INDEX "PartnerApplication_userId_idx" ON "PartnerApplication"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
