import Link from "next/link";
import { requireAdmin } from "@/lib/auth/guards";
import { prisma } from "@/lib/db";
import { PARTNER_TYPE_LABELS, type PartnerType } from "@/types/partner";
import { approveApplication, rejectApplication } from "@/app/admin/actions";

const APP_STATUS_TABS = ["PENDING_REVIEW", "APPROVED", "REJECTED"] as const;
const PARTNER_STATUS_TABS = ["ACTIVE", "SUSPENDED"] as const;

export default async function AdminPartnersPage({
  searchParams,
}: {
  searchParams: Promise<{ appStatus?: string; partnerStatus?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const appStatus = (params.appStatus as (typeof APP_STATUS_TABS)[number]) || "PENDING_REVIEW";
  const partnerStatus = (params.partnerStatus as (typeof PARTNER_STATUS_TABS)[number]) || "ACTIVE";

  const [applications, partners] = await Promise.all([
    prisma.partnerApplication.findMany({
      where: { status: appStatus },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
    prisma.partnerProfile.findMany({
      where: { status: partnerStatus },
      orderBy: { joinDate: "desc" },
      take: 50,
      include: { user: true, referralCode: true },
    }),
  ]);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col px-5 py-8 sm:px-8">
      <AdminNav active="partners" />

      <h1 className="mt-4 font-display text-2xl font-extrabold text-foreground">Partners</h1>

      <section className="mt-6">
        <h2 className="text-sm font-bold text-foreground">Applications</h2>
        <div className="mt-2 flex gap-2">
          {APP_STATUS_TABS.map((s) => (
            <FilterLink
              key={s}
              href={`/admin/partners?appStatus=${s}&partnerStatus=${partnerStatus}`}
              active={s === appStatus}
              label={s.replace("_", " ")}
            />
          ))}
        </div>

        {applications.length === 0 ? (
          <EmptyState label="No applications here." />
        ) : (
          <div className="mt-3 flex flex-col gap-2">
            {applications.map((a) => (
              <div key={a.id} className="rounded-2xl border border-border bg-surface p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-foreground">{a.fullName}</p>
                    <p className="text-xs text-muted">
                      {a.email} · {PARTNER_TYPE_LABELS[a.partnerType as PartnerType]}
                    </p>
                    <p className="mt-1 text-xs text-muted">{a.publicId}</p>
                  </div>
                  <Link
                    href={`/admin/partners/applications/${a.id}`}
                    className="shrink-0 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:border-brand hover:text-brand"
                  >
                    Review
                  </Link>
                </div>
                {appStatus === "PENDING_REVIEW" && (
                  <div className="mt-3 flex gap-2">
                    <form
                      action={async () => {
                        "use server";
                        await approveApplication(a.id);
                      }}
                    >
                      <button className="rounded-full bg-brand px-4 py-1.5 text-xs font-bold text-white">
                        Approve
                      </button>
                    </form>
                    <form
                      action={async () => {
                        "use server";
                        await rejectApplication(a.id);
                      }}
                    >
                      <button className="rounded-full border border-danger px-4 py-1.5 text-xs font-bold text-danger">
                        Reject
                      </button>
                    </form>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-bold text-foreground">Partners</h2>
        <div className="mt-2 flex gap-2">
          {PARTNER_STATUS_TABS.map((s) => (
            <FilterLink
              key={s}
              href={`/admin/partners?appStatus=${appStatus}&partnerStatus=${s}`}
              active={s === partnerStatus}
              label={s}
            />
          ))}
        </div>

        {partners.length === 0 ? (
          <EmptyState label="No partners here." />
        ) : (
          <div className="mt-3 flex flex-col gap-2">
            {partners.map((p) => (
              <Link
                key={p.id}
                href={`/admin/partners/${p.id}`}
                className="flex items-center justify-between rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-brand"
              >
                <div>
                  <p className="font-semibold text-foreground">
                    {p.user.username} <span className="text-muted">· {p.publicId}</span>
                  </p>
                  <p className="text-xs text-muted">
                    {PARTNER_TYPE_LABELS[p.partnerType as PartnerType]} · {p.referralCode?.code ?? "no code"}
                  </p>
                </div>
                <span className="text-xs text-muted">{p.joinDate.toLocaleDateString()}</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export function AdminNav({ active }: { active: "partners" | "rewards" }) {
  return (
    <nav className="flex items-center justify-between">
      <Link href="/" className="text-sm font-medium text-muted hover:text-brand">
        ← Back to Street Smart
      </Link>
      <div className="flex gap-2 text-xs font-semibold">
        <Link
          href="/admin/partners"
          className={active === "partners" ? "text-brand" : "text-muted hover:text-brand"}
        >
          Partners
        </Link>
        <Link href="/admin/rewards" className={active === "rewards" ? "text-brand" : "text-muted hover:text-brand"}>
          Rewards
        </Link>
      </div>
    </nav>
  );
}

function FilterLink({ href, active, label }: { href: string; active: boolean; label: string }) {
  return (
    <Link
      href={href}
      className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${
        active ? "bg-brand text-white" : "border border-border bg-surface text-muted hover:text-foreground"
      }`}
    >
      {label.toLowerCase()}
    </Link>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <p className="mt-3 rounded-2xl border border-dashed border-border p-5 text-center text-sm text-muted">
      {label}
    </p>
  );
}
