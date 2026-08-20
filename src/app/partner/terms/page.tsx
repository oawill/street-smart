import Link from "next/link";

const RULES = [
  "Promote Street Smart honestly — no spam, no misleading claims about the game or your Street Smart IQ.",
  "Never impersonate Street Smart, its staff, or claim an official partnership you don't have.",
  "You may not refer yourself. Referrals matching your own account or contact details will not be rewarded.",
  "No fraudulent accounts, fake signups, or artificially inflated click/registration numbers.",
  "Every referral and reward is subject to review and validation before payout — Street Smart may reject referrals that appear fraudulent or abusive.",
  "Rewards are recorded as Pending, then Approved, then Paid. Payout timing depends on admin review and, where applicable, a minimum payout threshold.",
  "Street Smart may modify commission structures, qualification rules, or the program itself at any time, for future referrals.",
  "Accounts found in violation of these terms may be suspended or terminated, and pending rewards forfeited.",
];

export default function PartnerTermsPage() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-6 py-8">
      <Link href="/" className="text-sm font-medium text-muted hover:text-brand">
        ← Back
      </Link>

      <h1 className="mt-6 font-display text-3xl font-extrabold text-foreground">Partner Program Terms</h1>
      <p className="mt-2 text-sm text-muted">
        These terms cover the Street Smart Partner & Affiliate Program specifically, in addition to Street
        Smart&apos;s general terms of use.
      </p>

      <ol className="mt-8 flex flex-col gap-4">
        {RULES.map((rule, i) => (
          <li key={i} className="flex gap-3 text-sm text-foreground">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand-strong">
              {i + 1}
            </span>
            {rule}
          </li>
        ))}
      </ol>

      <p className="mt-8 text-xs text-muted">
        Street Smart is a game for entertainment and education. Partner rewards are not investment returns and
        carry no guarantee of amount or timing.
      </p>
    </div>
  );
}
