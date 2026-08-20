import Link from "next/link";
import { requireUser } from "@/lib/auth/guards";
import { prisma } from "@/lib/db";
import { ApplyForm } from "@/components/partner/ApplyForm";
import { BecomeAffiliateButton } from "@/components/partner/BecomeAffiliateButton";

export default async function PartnerApplyPage() {
  const user = await requireUser("/partner/apply");

  const [existingProfile, pendingApplication] = await Promise.all([
    prisma.partnerProfile.findUnique({ where: { userId: user.id } }),
    prisma.partnerApplication.findFirst({
      where: { userId: user.id, status: "PENDING_REVIEW" },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 py-8">
      <Link href="/" className="text-sm font-medium text-muted hover:text-brand">
        ← Back
      </Link>

      <h1 className="mt-6 font-display text-3xl font-extrabold text-foreground">Partner with Street Smart</h1>
      <p className="mt-2 text-sm text-muted">
        Earn rewards by inviting friends, students or your community to Street Smart.
      </p>

      {existingProfile ? (
        <div className="mt-8 rounded-2xl border border-border bg-surface p-5 text-center">
          <p className="text-sm text-foreground">You already have a partner account.</p>
          <Link
            href="/partner"
            className="mt-4 inline-block w-full rounded-full bg-brand px-8 py-3.5 text-center font-display font-bold text-white"
          >
            GO TO DASHBOARD
          </Link>
        </div>
      ) : pendingApplication ? (
        <div className="mt-8 rounded-2xl border border-border bg-accent-soft p-5 text-center">
          <p className="font-display font-bold text-accent">Application under review</p>
          <p className="mt-1 text-sm text-foreground">
            Reference {pendingApplication.publicId}. We&apos;ll be in touch soon.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-6 rounded-2xl border border-border bg-surface p-5">
            <p className="text-sm font-semibold text-foreground">Just want to invite friends?</p>
            <p className="mt-1 text-xs text-muted">
              Earn rewards by inviting friends to Street Smart — no application needed.
            </p>
            <div className="mt-3">
              <BecomeAffiliateButton />
            </div>
          </div>

          <div className="my-6 flex items-center gap-3 text-xs text-muted">
            <span className="h-px flex-1 bg-border" />
            OR APPLY AS A FORMAL PARTNER
            <span className="h-px flex-1 bg-border" />
          </div>

          <ApplyForm defaultEmail={user.email} />
        </>
      )}
    </div>
  );
}
