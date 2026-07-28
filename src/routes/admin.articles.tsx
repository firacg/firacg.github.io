import { createFileRoute } from "@tanstack/react-router";
import AdminShell from "@/components/admin/AdminShell";
import AdminArticles from "@/components/admin/AdminArticles";

export const Route = createFileRoute("/admin/articles")({
  head: () => ({
    meta: [{ title: "CRM · Статьи — Fira CG" }],
  }),
  component: () => (
    <AdminShell>
      <AdminArticles />
    </AdminShell>
  ),
});
