import { createFileRoute } from "@tanstack/react-router";
import AdminShell from "@/components/admin/AdminShell";
import AdminWorks from "@/components/admin/AdminWorks";

export const Route = createFileRoute("/admin/works")({
  head: () => ({
    meta: [{ title: "CRM · Работы — Fira CG" }],
  }),
  component: () => (
    <AdminShell>
      <AdminWorks />
    </AdminShell>
  ),
});
