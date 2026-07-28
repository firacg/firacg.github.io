import { FormEvent, useState } from "react";
import { useNavigate, Navigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { isSupabaseConfigured } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AdminLoginForm = () => {
  const { session, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  if (!isSupabaseConfigured) {
    return <Navigate to="/admin/works" />;
  }

  if (session) {
    return <Navigate to="/admin/works" />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const err = await signIn(email, password);
    setSubmitting(false);
    if (err) setError(err);
    else navigate({ to: "/admin/works" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 p-8 rounded-xl border border-border bg-card shadow-deep"
      >
        <h1 className="text-2xl font-bold text-center text-foreground mb-2">Вход в CRM</h1>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
        />
        <Input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" variant="magical" className="w-full" disabled={submitting}>
          {submitting ? "Входим…" : "Войти"}
        </Button>
      </form>
    </div>
  );
};

export default AdminLoginForm;
