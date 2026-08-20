import { notFound } from "next/navigation";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth/guards";
import { prisma } from "@/lib/db";
import { computePartnerTierProgress } from "@/lib/referral/tiers";
import { PARTNER_TYPE_LABELS, REFERRAL_STATUS_LABELS, type PartnerType, type ReferralStatus } from "@/types/partner";
import { setPartnerStatus } from "@/app/admin/actions";

const QUALIFIED_STATUSES = ["QUALIFIED", "REWARD_PENDING", "REWARD_APPROVED", "PAID"];

function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export default async function AdminPartnerDetailPage({ params }: PageProps<"/admin/partners/[id]">) {
  await requireAdmin();
  const { id } = await params;

  const partner = await prisma.partnerProfile.findUnique({
    where: { id },
    include: {
      user: true,
      referralCode: true,
      referrals: { orderBy: { createdAt: "desc" }, include: { rewardLedgerEntry: true, referredUser: true } },
    },
  });
  if (!partner) notFound();

  const tierProgress = await computePartnerTierProgress(partner.id);
  const registrations = partner.referrals.length;
  const qualified = partner.referrals.filter((r) => QUALIFIED_STATUSES.includes(r.status)).length;
  const conversionRate = registrations > 0 ? (qualified / registrations) * 100 : 0;

  const rewards = partner.referrals.map((r) => r.rewardLedgerEntry).filter((r) => r !== null);
  const lifetime = rewards.reduce((sum, r) => sum + r.amount, 0);
  const pending = rewards.filter((r) => r.status === "PENDING").reduce((s, r) => s + r.amount, 0);
  const approved = rewards.filter((r) => r.status === "APPROVED").reduce((s, r) => s + r.amount, 0);
  const paid = rewards.filter((r) => r.status === "PAID").reduce((s, r) => s + r.amount, 0);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-5 py-8 sm:px-8">
      <Link href="/admin/partners" className="text-sm font-medium text-muted hover:text-brand">
        ← Back to Partners
      </Link>

      <div className="mt-4 flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-foreground">@{partner.user.username}</h1>
          <p className="mt-1 text-sm text-muted">
            {partner.publicId} · {PARTNER_TYPE_LABELS[partner.partnerType as PartnerType]}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${
            partner.status === "ACTIVE" ? "bg-brand-soft text-brand-strong" : "bg-danger-soft text-danger"
          }`}
        >
          {partner.status}
        </span>
      </div>

      <dl className="mt-4 flex flex-col gap-2 rounded-[var(--radius-card)] border border-border bg-surface p-5 text-sm">
        <Row label="Email" value={partner.user.email} />
        <Row label="Referral Code" value={partner.referralCode?.code ?? "—"} />
        <Row label="Joined" value={partner.joinDate.toLocaleDateString()} />
        <Row label="Tier" value={tierProgress.currentTier?.name ?? "—"} />
      </dl>

      <section className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Metric label="Clicks" value={(partner.referralCode?.clickCount ?? 0).toLocaleString()} />
        <Metric label="Registrations" value={registrations.toLocaleString()} />
        <Metric label="Qualified" value={qualified.toLocaleString()} />
        <Metric label="Conversion" value={`${conversionRate.toFixed(1)}%`} />
        <Metric label="Lifetime" value={formatNaira(lifetime)} />
        <Metric label="Pending" value={formatNaira(pending)} tone="accent" />
        <Metric label="Approved" value={formatNaira(approved)} tone="info" />
        <Metric label="Paid" value={formatNaira(paid)} tone="brand" />
      </section>

      <div className="mt-4 flex gap-3">
        {partner.status === "ACTIVE" ? (
          <form
            action={async () => {
              "use server";
              await setPartnerStatus(partner.id, "SUSPENDED");
            }}
          >
            <button className="rounded-full border border-danger px-5 py-2.5 text-sm font-bold text-danger">
              Suspend
            </button>
          </form>
        ) : (
          <form
            action={async () => {
              "use server";
              await setPartnerStatus(partner.id, "ACTIVE");
            }}
          >
            <button className="rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white">Reactivate</button>
          </form>
        )}
      </div>

      <section className="mt-6">
        <h2 className="text-sm font-bold text-foreground">Referrals & Rewards</h2>
        {partner.referrals.length === 0 ? (
          <p className="mt-2 rounded-2xl border border-dashed border-border p-5 text-center text-sm text-muted">
            No referrals yet.
          </p>
        ) : (
          <div className="mt-2 flex flex-col gap-2">
            {partner.referrals.map((r) => (
              <div key={r.id} className="flex items-center justify-between rounded-2xl border border-border bg-surface p-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {r.publicId} <span className="font-normal text-muted">· @{r.referredUser.username}</span>
                  </p>
                  <p className="text-xs text-muted">{r.registeredAt.toLocaleDateString()}</p>
                  {r.flaggedReason && <p className="mt-1 text-xs text-danger">{r.flaggedReason}</p>}
                </div>
                <div className="text-right">
                  <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[11px] font-bold uppercase text-muted">
                    {REFERRAL_STATUS_LABELS[r.status as ReferralStatus]}
                  </span>
                  {r.rewardLedgerEntry && (
                    <p className="mt-1 text-xs font-semibold text-foreground">
                      {formatNaira(r.rewardLedgerEntry.amount)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {partner.adminNotes && (
        <div className="mt-4 rounded-2xl border border-border bg-surface-2 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Admin Notes</p>
          <p className="mt-1 text-sm text-foreground">{partner.adminNotes}</p>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone?: "brand" | "accent" | "info" }) {
  const toneClass =
    tone === "brand" ? "text-brand-strong" : tone === "accent" ? "text-accent" : tone === "info" ? "text-info" : "text-foreground";
  return (
    <div className="rounded-2xl border border-border bg-surface p-3.5">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">{label}</p>
      <p className={`mt-1 font-display text-lg font-extrabold ${toneClass}`}>{value}</p>
    </div>
  );
}
