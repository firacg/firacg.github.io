import { createFileRoute } from "@tanstack/react-router";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [{ title: "Вход в CRM — Fira CG" }],
  }),
  component: AdminLoginForm,
});
