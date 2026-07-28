import { createFileRoute } from "@tanstack/react-router";
import AdminShell from "@/components/admin/AdminShell";
import AdminCommissions from "@/components/admin/AdminCommissions";

export const Route = createFileRoute("/admin/commissions")({
  head: () => ({
    meta: [{ title: "CRM · Заявки — Fira CG" }],
  }),
  component: () => (
    <AdminShell>
      <AdminCommissions />
    </AdminShell>
  ),
});
