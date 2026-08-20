import Link from "next/link";
import { requirePartnerProfile } from "@/lib/auth/guards";
import { prisma } from "@/lib/db";
import { computePartnerTierProgress } from "@/lib/referral/tiers";
import { getBaseUrl } from "@/lib/url";
import { ShareRow } from "@/components/partner/ShareRow";
import { PayoutProfileForm } from "@/components/partner/PayoutProfileForm";
import { PARTNER_TYPE_LABELS, REFERRAL_STATUS_LABELS, type PartnerType, type ReferralStatus } from "@/types/partner";

const QUALIFIED_STATUSES = ["QUALIFIED", "REWARD_PENDING", "REWARD_APPROVED", "PAID"];

function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

function maskAccountNumber(num: string): string {
  if (num.length <= 4) return num;
  return "*".repeat(num.length - 4) + num.slice(-4);
}

export default async function PartnerDashboardPage() {
  const { user, profile } = await requirePartnerProfile("/partner");

  const [referralCode, referrals, payoutProfile, tierProgress, baseUrl] = await Promise.all([
    prisma.referralCode.findUnique({ where: { partnerProfileId: profile.id } }),
    prisma.referral.findMany({
      where: { partnerProfileId: profile.id },
      orderBy: { createdAt: "desc" },
      include: { rewardLedgerEntry: true },
    }),
    prisma.payoutProfile.findUnique({ where: { partnerProfileId: profile.id } }),
    computePartnerTierProgress(profile.id),
    getBaseUrl(),
  ]);

  const totalClicks = referralCode?.clickCount ?? 0;
  const registrations = referrals.length;
  const qualified = referrals.filter((r) => QUALIFIED_STATUSES.includes(r.status)).length;
  const paid = referrals.filter((r) => r.status === "PAID").length;
  const conversionRate = registrations > 0 ? (qualified / registrations) * 100 : 0;

  const pendingEarnings = referrals
    .filter((r) => r.rewardLedgerEntry?.status === "PENDING")
    .reduce((sum, r) => sum + (r.rewardLedgerEntry?.amount ?? 0), 0);
  const approvedEarnings = referrals
    .filter((r) => r.rewardLedgerEntry?.status === "APPROVED")
    .reduce((sum, r) => sum + (r.rewardLedgerEntry?.amount ?? 0), 0);
  const paidEarnings = referrals
    .filter((r) => r.rewardLedgerEntry?.status === "PAID")
    .reduce((sum, r) => sum + (r.rewardLedgerEntry?.amount ?? 0), 0);

  const referralLink = referralCode ? `${baseUrl}/join?ref=${referralCode.code}` : "";

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-5 py-8 sm:px-8">
      <Link href="/" className="text-sm font-medium text-muted hover:text-brand">
        ← Back
      </Link>

      <h1 className="mt-4 font-display text-2xl font-extrabold text-foreground">
        Hello {user.firstName || user.username} 👋
      </h1>
      <p className="mt-1 text-sm text-muted">
        {PARTNER_TYPE_LABELS[profile.partnerType as PartnerType]} · {profile.status === "ACTIVE" ? "Active" : "Suspended"}
      </p>

      {/* Overview */}
      <section className="mt-6 rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-[var(--shadow-card)]">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">Partner ID</span>
            <p className="font-display font-bold text-foreground">{profile.publicId}</p>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">Referral Code</span>
            <p className="font-display font-bold text-brand-strong">{referralCode?.code ?? "—"}</p>
          </div>
        </div>

        {referralCode && (
          <>
            <p className="mt-3 break-all rounded-xl bg-surface-2 px-3 py-2 text-xs text-muted">{referralLink}</p>
            <div className="mt-3">
              <ShareRow link={referralLink} code={referralCode.code} />
            </div>
          </>
        )}
      </section>

      {/* Metrics */}
      <section className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Metric label="Total Clicks" value={totalClicks.toLocaleString()} />
        <Metric label="Registrations" value={registrations.toLocaleString()} />
        <Metric label="Qualified" value={qualified.toLocaleString()} />
        <Metric label="Paid / Converted" value={paid.toLocaleString()} />
        <Metric label="Conversion Rate" value={`${conversionRate.toFixed(1)}%`} />
        <Metric label="Pending Earnings" value={formatNaira(pendingEarnings)} tone="accent" />
        <Metric label="Approved Earnings" value={formatNaira(approvedEarnings)} tone="info" />
        <Metric label="Paid Earnings" value={formatNaira(paidEarnings)} tone="brand" />
      </section>

      {/* Tier progress */}
      <section className="mt-4 rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-[var(--shadow-card)]">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">Your Reach</p>
        <p className="mt-1 text-sm text-foreground">
          <span className="font-display text-lg font-extrabold text-brand-strong">{registrations}</span> players
          joined through you. <span className="font-display text-lg font-extrabold text-brand-strong">{qualified}</span>{" "}
          got Street Smart with their first full game.
        </p>
        {tierProgress.currentTier && (
          <p className="mt-3 text-sm font-semibold text-foreground">
            {tierProgress.currentTier.name}
            {tierProgress.nextTier && (
              <span className="font-normal text-muted">
                {" "}
                — {tierProgress.qualifiedCount} / {tierProgress.nextTier.minQualifiedReferrals} qualified referrals
              </span>
            )}
          </p>
        )}
        {tierProgress.nextTier && (
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full rounded-full bg-brand"
              style={{
                width: `${Math.min(
                  100,
                  (tierProgress.qualifiedCount / tierProgress.nextTier.minQualifiedReferrals) * 100
                )}%`,
              }}
            />
          </div>
        )}
        {tierProgress.nextTier ? (
          <p className="mt-2 text-xs text-muted">
            {tierProgress.referralsToNextTier} more qualified referral
            {tierProgress.referralsToNextTier === 1 ? "" : "s"} to reach {tierProgress.nextTier.name}.
          </p>
        ) : (
          <p className="mt-2 text-xs text-muted">You&apos;ve reached the top tier.</p>
        )}
      </section>

      {/* Referral history */}
      <section className="mt-4">
        <h2 className="text-sm font-bold text-foreground">Referral History</h2>
        {referrals.length === 0 ? (
          <p className="mt-2 rounded-2xl border border-dashed border-border p-5 text-center text-sm text-muted">
            No referrals yet. Share your link to get started.
          </p>
        ) : (
          <div className="mt-2 flex flex-col gap-2">
            {referrals.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between rounded-2xl border border-border bg-surface px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">{r.publicId}</p>
                  <p className="text-xs text-muted">{r.registeredAt.toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <StatusPill status={r.status as ReferralStatus} />
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

      {/* Payout profile */}
      <section className="mt-6 rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-[var(--shadow-card)]">
        <h2 className="text-sm font-bold text-foreground">Payout Details</h2>
        {payoutProfile && (
          <p className="mt-1 text-xs text-muted">
            On file: {payoutProfile.bankName} · {maskAccountNumber(payoutProfile.accountNumber)}
          </p>
        )}
        <p className="mt-1 text-xs text-muted">
          Used only when a payout is processed manually by an admin — Street Smart does not yet run automatic
          transfers.
        </p>
        <div className="mt-3">
          <PayoutProfileForm
            initialBankName={payoutProfile?.bankName ?? ""}
            initialAccountName={payoutProfile?.accountName ?? ""}
          />
        </div>
      </section>

      <p className="mt-6 text-center text-xs text-muted">
        <Link href="/partner/terms" className="underline">
          Partner Program Terms
        </Link>
      </p>
    </div>
  );
}

function Metric({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "brand" | "accent" | "info";
}) {
  const toneClass =
    tone === "brand"
      ? "text-brand-strong"
      : tone === "accent"
        ? "text-accent"
        : tone === "info"
          ? "text-info"
          : "text-foreground";
  return (
    <div className="rounded-2xl border border-border bg-surface p-3.5">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">{label}</p>
      <p className={`mt-1 font-display text-lg font-extrabold ${toneClass}`}>{value}</p>
    </div>
  );
}

function StatusPill({ status }: { status: ReferralStatus }) {
  const styles: Record<ReferralStatus, string> = {
    REGISTERED: "bg-surface-2 text-muted",
    QUALIFIED: "bg-brand-soft text-brand-strong",
    REWARD_PENDING: "bg-accent-soft text-accent",
    REWARD_APPROVED: "bg-info/15 text-info",
    PAID: "bg-brand-soft text-brand-strong",
    REJECTED: "bg-danger-soft text-danger",
    UNDER_REVIEW: "bg-danger-soft text-danger",
  };
  return (
    <span className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-bold uppercase ${styles[status]}`}>
      {REFERRAL_STATUS_LABELS[status]}
    </span>
  );
}
