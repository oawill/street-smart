import "dotenv/config";
import { prisma } from "../src/lib/db";
import { hashPassword } from "../src/lib/auth/password";

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@streetsmart.local";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "ChangeMe123!";

  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const passwordHash = await hashPassword(adminPassword);
    await prisma.user.create({
      data: {
        email: adminEmail,
        username: "admin",
        passwordHash,
        role: "ADMIN",
        firstName: "Admin",
      },
    });
    console.log(`Created admin user ${adminEmail} — change this password after first login.`);
  } else {
    console.log(`Admin user ${adminEmail} already exists, skipping.`);
  }

  const standardProgram = await prisma.referralProgram.findFirst({
    where: { referralType: "STANDARD", active: true },
  });
  if (!standardProgram) {
    await prisma.referralProgram.create({
      data: {
        name: "Standard Affiliate Program",
        referralType: "STANDARD",
        rewardType: "FIXED",
        rewardAmount: 500,
        currency: "NGN",
        qualificationRule: "FIRST_GAME_COMPLETED",
        active: true,
      },
    });
    console.log("Created Standard Affiliate Program (₦500 per qualified referral).");
  } else {
    console.log("Standard referral program already exists, skipping.");
  }

  const partnerProgram = await prisma.referralProgram.findFirst({
    where: { referralType: "PARTNER", active: true },
  });
  if (!partnerProgram) {
    await prisma.referralProgram.create({
      data: {
        name: "Approved Partner Program",
        referralType: "PARTNER",
        rewardType: "FIXED",
        rewardAmount: 1000,
        currency: "NGN",
        qualificationRule: "FIRST_GAME_COMPLETED",
        active: true,
      },
    });
    console.log("Created Approved Partner Program (₦1000 per qualified referral).");
  } else {
    console.log("Partner referral program already exists, skipping.");
  }

  const tierCount = await prisma.partnerTier.count();
  if (tierCount === 0) {
    await prisma.partnerTier.createMany({
      data: [
        { name: "Starter", minQualifiedReferrals: 0, sortOrder: 0 },
        { name: "Builder", minQualifiedReferrals: 25, sortOrder: 1 },
        { name: "Pro", minQualifiedReferrals: 100, sortOrder: 2 },
        { name: "Street Ambassador", minQualifiedReferrals: 500, sortOrder: 3 },
      ],
    });
    console.log("Created partner tiers: Starter, Builder, Pro, Street Ambassador.");
  } else {
    console.log("Partner tiers already exist, skipping.");
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
