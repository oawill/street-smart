import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";

async function main() {
  const names = ["StreetKing", "AdaSharp", "LagosWolf", "TobiCash", "ChiomaGold", "KanoKid", "PortHarcourtPro", "IbadanAce", "EnuguElite", "JosJet", "KadunaKween", "AbeokutaAlpha"];
  const iqs =        [151, 149, 145, 126, 124, 118, 112, 105, 98, 91, 85, 80];

  for (let i = 0; i < names.length; i++) {
    const email = `${names[i].toLowerCase()}@test.local`;
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      const passwordHash = await hashPassword("TestPass123");
      user = await prisma.user.create({ data: { email, username: names[i], passwordHash } });
    }
    await prisma.gameCompletion.create({ data: { userId: user.id, streetSmartIQ: iqs[i] } });
  }
  console.log("Seeded", names.length, "leaderboard test users with today's completions.");
}
main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
