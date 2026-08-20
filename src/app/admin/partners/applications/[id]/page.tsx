import { notFound } from "next/navigation";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth/guards";
import { prisma } from "@/lib/db";
import { PARTNER_TYPE_LABELS, type PartnerType } from "@/types/partner";
import { approveApplication, rejectApplication } from "@/app/admin/actions";

export default async function ApplicationDetailPage({
  params,
}: PageProps<"/admin/partners/applications/[id]">) {
  await requireAdmin();
  const { id } = await params;

  const application = await prisma.partnerApplication.findUnique({
    where: { id },
    include: { user: true, reviewedBy: true, resultingProfile: true },
  });
  if (!application) notFound();

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-5 py-8 sm:px-8">
      <Link href="/admin/partners" className="text-sm font-medium text-muted hover:text-brand">
        ← Back to Partners
      </Link>

      <h1 className="mt-4 font-display text-2xl font-extrabold text-foreground">{application.fullName}</h1>
      <p className="mt-1 text-sm text-muted">
        {application.publicId} · Applied {application.createdAt.toLocaleString()}
      </p>

      <StatusBadge status={application.status} />

      <dl className="mt-6 flex flex-col gap-3 rounded-[var(--radius-card)] border border-border bg-surface p-5">
        <Row label="Account" value={`@${application.user.username}`} />
        <Row label="Email" value={application.email} />
        <Row label="Phone" value={application.phone} />
        <Row label="Partner Type" value={PARTNER_TYPE_LABELS[application.partnerType as PartnerType]} />
        {application.organizationName && <Row label="Organization" value={application.organizationName} />}
        {(application.city || application.state) && (
          <Row label="Location" value={[application.city, application.state].filter(Boolean).join(", ")} />
        )}
        {application.audienceSize && <Row label="Audience Size" value={application.audienceSize} />}
        {application.website && <Row label="Website" value={application.website} />}
      </dl>

      <div className="mt-4 rounded-[var(--radius-card)] border border-border bg-surface p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">Promotion Plan</p>
        <p className="mt-1.5 text-sm text-foreground">{application.promotionPlan}</p>
      </div>

      {application.status === "PENDING_REVIEW" && (
        <div className="mt-6 flex gap-3">
          <form
            action={async () => {
              "use server";
              await approveApplication(application.id);
            }}
            className="flex-1"
          >
            <button className="w-full rounded-full bg-brand px-6 py-3 font-display font-bold text-white">
              Approve
            </button>
          </form>
          <form
            action={async () => {
              "use server";
              await rejectApplication(application.id);
            }}
            className="flex-1"
          >
            <button className="w-full rounded-full border border-danger px-6 py-3 font-display font-bold text-danger">
              Reject
            </button>
          </form>
        </div>
      )}

      {application.resultingProfile && (
        <Link
          href={`/admin/partners/${application.resultingProfile.id}`}
          className="mt-6 block rounded-2xl border border-border bg-brand-soft p-4 text-center text-sm font-semibold text-brand-strong"
        >
          View partner profile →
        </Link>
      )}

      {application.reviewedBy && (
        <p className="mt-4 text-xs text-muted">
          Reviewed by @{application.reviewedBy.username} on {application.reviewedAt?.toLocaleString()}
        </p>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-muted">{label}</span>
      <span className="text-right font-medium text-foreground">{value}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    PENDING_REVIEW: "bg-accent-soft text-accent",
    APPROVED: "bg-brand-soft text-brand-strong",
    REJECTED: "bg-danger-soft text-danger",
  };
  return (
    <span
      className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase ${styles[status] ?? ""}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}
