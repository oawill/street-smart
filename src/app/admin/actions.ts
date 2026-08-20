"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/guards";
import { nextPublicId } from "@/lib/ids";
import { generateReferralCode } from "@/lib/referral/codes";
import { track } from "@/lib/analytics/track";

export async function approveApplication(applicationId: string) {
  const admin = await requireAdmin();

  const application = await prisma.partnerApplication.findUnique({ where: { id: applicationId } });
  if (!application || application.status !== "PENDING_REVIEW") return;

  const existingProfile = await prisma.partnerProfile.findUnique({ where: { userId: application.userId } });
  if (existingProfile) return;

  const code = await generateReferralCode(application.fullName.split(" ")[0] || "PARTNER");

  await prisma.$transaction(async (tx) => {
    await tx.partnerApplication.update({
      where: { id: applicationId },
      data: { status: "APPROVED", reviewedByUserId: admin.id, reviewedAt: new Date() },
    });

    const publicId = await nextPublicId(tx, "PARTNER_PROFILE_PARTNER");
    await tx.partnerProfile.create({
      data: {
        publicId,
        userId: application.userId,
        partnerType: application.partnerType,
        applicationId: application.id,
        status: "ACTIVE",
        referralCode: { create: { code } },
      },
    });
  });

  await track("partner_application_approved", {
    userId: application.userId,
    metadata: { applicationId },
  });

  revalidatePath("/admin/partners");
  revalidatePath(`/admin/partners/applications/${applicationId}`);
}

export async function rejectApplication(applicationId: string, adminNotes?: string) {
  const admin = await requireAdmin();

  const application = await prisma.partnerApplication.findUnique({ where: { id: applicationId } });
  if (!application || application.status !== "PENDING_REVIEW") return;

  await prisma.partnerApplication.update({
    where: { id: applicationId },
    data: {
      status: "REJECTED",
      reviewedByUserId: admin.id,
      reviewedAt: new Date(),
      adminNotes: adminNotes || null,
    },
  });

  await track("partner_application_rejected", {
    userId: application.userId,
    metadata: { applicationId },
  });

  revalidatePath("/admin/partners");
  revalidatePath(`/admin/partners/applications/${applicationId}`);
}

export async function setPartnerStatus(partnerProfileId: string, status: "ACTIVE" | "SUSPENDED") {
  await requireAdmin();
  await prisma.partnerProfile.update({ where: { id: partnerProfileId }, data: { status } });
  revalidatePath("/admin/partners");
  revalidatePath(`/admin/partners/${partnerProfileId}`);
}

export async function saveAdminNotes(partnerProfileId: string, adminNotes: string) {
  await requireAdmin();
  await prisma.partnerProfile.update({ where: { id: partnerProfileId }, data: { adminNotes } });
  revalidatePath(`/admin/partners/${partnerProfileId}`);
}

export async function approveReward(rewardId: string) {
  const admin = await requireAdmin();

  const reward = await prisma.rewardLedger.findUnique({ where: { id: rewardId } });
  if (!reward || reward.status !== "PENDING") return;

  await prisma.$transaction(async (tx) => {
    await tx.rewardLedger.update({
      where: { id: rewardId },
      data: { status: "APPROVED", approvedByUserId: admin.id, approvedAt: new Date() },
    });
    await tx.referral.update({
      where: { id: reward.referralId },
      data: { status: "REWARD_APPROVED" },
    });
  });

  await track("reward_approved", { partnerProfileId: reward.partnerProfileId, referralId: reward.referralId });

  revalidatePath("/admin/rewards");
  revalidatePath(`/admin/partners/${reward.partnerProfileId}`);
}

export async function markRewardPaid(rewardId: string, formData: FormData) {
  await requireAdmin();

  const reward = await prisma.rewardLedger.findUnique({ where: { id: rewardId } });
  if (!reward || reward.status !== "APPROVED") return;

  const payoutReference = String(formData.get("payoutReference") ?? "").trim() || null;

  await prisma.$transaction(async (tx) => {
    await tx.rewardLedger.update({
      where: { id: rewardId },
      data: { status: "PAID", paidAt: new Date(), payoutReference },
    });
    await tx.referral.update({
      where: { id: reward.referralId },
      data: { status: "PAID" },
    });
  });

  await track("reward_paid", { partnerProfileId: reward.partnerProfileId, referralId: reward.referralId });

  revalidatePath("/admin/rewards");
  revalidatePath(`/admin/partners/${reward.partnerProfileId}`);
}

export async function rejectReward(rewardId: string) {
  await requireAdmin();

  const reward = await prisma.rewardLedger.findUnique({ where: { id: rewardId } });
  if (!reward || reward.status === "PAID") return;

  await prisma.$transaction(async (tx) => {
    await tx.rewardLedger.update({
      where: { id: rewardId },
      data: { status: "REJECTED" },
    });
    await tx.referral.update({
      where: { id: reward.referralId },
      data: { status: "REJECTED" },
    });
  });

  revalidatePath("/admin/rewards");
  revalidatePath(`/admin/partners/${reward.partnerProfileId}`);
}
