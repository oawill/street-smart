import Link from "next/link";
import { requireAdmin } from "@/lib/auth/guards";
import { prisma } from "@/lib/db";
import { REWARD_STATUS_LABELS, type RewardStatus } from "@/types/partner";
import { approveReward, markRewardPaid, rejectReward } from "@/app/admin/actions";
import { AdminNav } from "@/app/admin/partners/page";

const STATUS_TABS: RewardStatus[] = ["PENDING", "APPROVED", "PAID", "REJECTED"];

function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export default async function AdminRewardsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const status = (params.status as RewardStatus) || "PENDING";

  const rewards = await prisma.rewardLedger.findMany({
    where: { status },
    orderBy: { createdAt: "desc" },
    take: 100,
    include: {
      partnerProfile: { include: { user: true } },
      referral: { include: { referredUser: true } },
    },
  });

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col px-5 py-8 sm:px-8">
      <AdminNav active="rewards" />

      <h1 className="mt-4 font-display text-2xl font-extrabold text-foreground">Rewards</h1>

      <div className="mt-4 flex gap-2">
        {STATUS_TABS.map((s) => (
          <Link
            key={s}
            href={`/admin/rewards?status=${s}`}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              s === status ? "bg-brand text-white" : "border border-border bg-surface text-muted hover:text-foreground"
            }`}
          >
            {REWARD_STATUS_LABELS[s]}
          </Link>
        ))}
      </div>

      {rewards.length === 0 ? (
        <p className="mt-4 rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted">
          No {REWARD_STATUS_LABELS[status].toLowerCase()} rewards.
        </p>
      ) : (
        <div className="mt-4 flex flex-col gap-3">
          {rewards.map((r) => (
            <div key={r.id} className="rounded-[var(--radius-card)] border border-border bg-surface p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-foreground">{r.publicId}</p>
                  <p className="text-xs text-muted">
                    <Link href={`/admin/partners/${r.partnerProfileId}`} className="hover:text-brand">
                      @{r.partnerProfile.user.username}
                    </Link>{" "}
                    · referred @{r.referral.referredUser.username}
                  </p>
                  <p className="mt-1 text-xs text-muted">{r.createdAt.toLocaleDateString()}</p>
                </div>
                <span className="font-display text-lg font-extrabold text-foreground">
                  {formatNaira(r.amount)}
                </span>
              </div>

              {r.payoutReference && (
                <p className="mt-2 text-xs text-muted">Payout ref: {r.payoutReference}</p>
              )}

              {r.status === "PENDING" && (
                <div className="mt-3 flex gap-2">
                  <form
                    action={async () => {
                      "use server";
                      await approveReward(r.id);
                    }}
                  >
                    <button className="rounded-full bg-brand px-4 py-1.5 text-xs font-bold text-white">
                      Approve
                    </button>
                  </form>
                  <form
                    action={async () => {
                      "use server";
                      await rejectReward(r.id);
                    }}
                  >
                    <button className="rounded-full border border-danger px-4 py-1.5 text-xs font-bold text-danger">
                      Reject
                    </button>
                  </form>
                </div>
              )}

              {r.status === "APPROVED" && (
                <form
                  action={async (formData: FormData) => {
                    "use server";
                    await markRewardPaid(r.id, formData);
                  }}
                  className="mt-3 flex gap-2"
                >
                  <input
                    name="payoutReference"
                    placeholder="Payout reference (optional)"
                    className="flex-1 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground outline-none focus:border-brand"
                  />
                  <button className="shrink-0 rounded-full bg-brand px-4 py-1.5 text-xs font-bold text-white">
                    Mark Paid
                  </button>
                </form>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
