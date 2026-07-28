import { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAllArticles, Article } from "@/hooks/useArticles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Trash2, Pencil } from "lucide-react";
import { toast } from "sonner";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9а-яё\s-]/gi, "")
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

const emptyForm = { title: "", slug: "", body: "", published: false };

const AdminArticles = () => {
  const queryClient = useQueryClient();
  const { data: articles, isLoading } = useAllArticles();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [slugEdited, setSlugEdited] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["articles"] });
  };

  const saveArticle = useMutation({
    mutationFn: async () => {
      if (editingId) {
        const { error } = await supabase!
          .from("articles")
          .update({
            title: form.title,
            slug: form.slug,
            body: form.body,
            published: form.published,
          })
          .eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase!.from("articles").insert(form);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(editingId ? "Статья обновлена" : "Статья добавлена");
      setForm(emptyForm);
      setEditingId(null);
      setSlugEdited(false);
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
    onSettled: () => setSubmitting(false),
  });

  const deleteArticle = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase!.from("articles").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Удалено");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const startEdit = (article: Article) => {
    setEditingId(article.id);
    setForm({
      title: article.title,
      slug: article.slug,
      body: article.body,
      published: article.published,
    });
    setSlugEdited(true);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
    setSlugEdited(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    saveArticle.mutate();
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Статьи</h1>
        <p className="text-muted-foreground text-sm">
          Опубликованные статьи видны на /blog. Черновики — только здесь.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 rounded-xl border border-border bg-card"
      >
        <Input
          placeholder="Заголовок"
          value={form.title}
          onChange={(e) => {
            const title = e.target.value;
            setForm((f) => ({ ...f, title, slug: slugEdited ? f.slug : slugify(title) }));
          }}
          required
        />
        <Input
          placeholder="URL (slug)"
          value={form.slug}
          onChange={(e) => {
            setSlugEdited(true);
            setForm((f) => ({ ...f, slug: e.target.value }));
          }}
          required
        />
        <Textarea
          placeholder="Текст статьи"
          value={form.body}
          onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
          rows={8}
          required
        />
        <label className="flex items-center gap-3">
          <Switch
            checked={form.published}
            onCheckedChange={(v) => setForm((f) => ({ ...f, published: v }))}
          />
          <span className="text-sm text-foreground">Опубликовано</span>
        </label>
        <div className="flex gap-3">
          <Button type="submit" variant="magical" disabled={submitting}>
            {editingId ? "Сохранить" : "Добавить статью"}
          </Button>
          {editingId && (
            <Button type="button" variant="ghost" onClick={cancelEdit}>
              Отмена
            </Button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        {isLoading && <p className="text-muted-foreground">Загрузка…</p>}
        {!isLoading && articles?.length === 0 && (
          <p className="text-muted-foreground">Статей пока нет.</p>
        )}
        {articles?.map((article) => (
          <div
            key={article.id}
            className="flex items-center justify-between gap-4 p-4 rounded-lg border border-border bg-card"
          >
            <div>
              <p className="font-semibold text-foreground">
                {article.title}{" "}
                {!article.published && (
                  <span className="text-xs text-muted-foreground">(черновик)</span>
                )}
              </p>
              <p className="text-xs text-muted-foreground">/blog/{article.slug}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => startEdit(article)}
                aria-label="Редактировать"
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteArticle.mutate(article.id)}
                aria-label="Удалить"
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminArticles;
