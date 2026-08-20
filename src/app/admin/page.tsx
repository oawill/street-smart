import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/guards";

export default async function AdminRootPage() {
  await requireAdmin();
  redirect("/admin/partners");
}
