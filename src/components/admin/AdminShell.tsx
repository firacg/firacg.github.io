import { ReactNode } from "react";
import { Navigate, Link } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { isSupabaseConfigured } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/admin/works", label: "Работы" },
  { to: "/admin/commissions", label: "Заявки" },
  { to: "/admin/articles", label: "Статьи" },
];

const AdminShell = ({ children }: { children: ReactNode }) => {
  const { session, loading, signOut } = useAuth();

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-6">
        <div className="max-w-lg text-center space-y-4">
          <h1 className="text-2xl font-bold">CRM ещё не подключена</h1>
          <p className="text-muted-foreground">
            Нужно создать проект на supabase.com, выполнить{" "}
            <code className="text-primary">supabase/schema.sql</code> в SQL Editor и указать{" "}
            <code className="text-primary">VITE_SUPABASE_URL</code> /{" "}
            <code className="text-primary">VITE_SUPABASE_ANON_KEY</code> в переменных окружения.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground">
        Загрузка…
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="border-b border-border px-6 py-4 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-6 flex-wrap">
          <span className="font-bold text-primary">Fira CG · CRM</span>
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "text-primary" }}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            ↩ На сайт
          </Link>
        </div>
        <Button variant="ghost" size="sm" onClick={signOut}>
          Выйти
        </Button>
      </nav>
      <main className="p-6 max-w-5xl mx-auto">{children}</main>
    </div>
  );
};

export default AdminShell;
