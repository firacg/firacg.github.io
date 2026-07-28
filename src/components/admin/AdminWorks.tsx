import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { categories, WorkCategory } from "@/data/works";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface WorkRow {
  id: string;
  title: string;
  project: string;
  category: WorkCategory;
  image_url: string;
  featured: boolean;
  sort_order: number;
}

function useAdminWorks() {
  return useQuery({
    queryKey: ["admin-works"],
    queryFn: async (): Promise<WorkRow[]> => {
      const { data, error } = await supabase!
        .from("works")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as WorkRow[];
    },
  });
}

const AdminWorks = () => {
  const queryClient = useQueryClient();
  const { data: works, isLoading } = useAdminWorks();

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<WorkCategory>("plarium");
  const [project, setProject] = useState("");
  const [featured, setFeatured] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const addWork = useMutation({
    mutationFn: async () => {
      if (!file) throw new Error("Выберите файл");
      const ext = file.name.split(".").pop();
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase!.storage.from("works").upload(path, file);
      if (uploadError) throw uploadError;
      const { data: publicUrl } = supabase!.storage.from("works").getPublicUrl(path);
      const meta = categories.find((c) => c.value === category)!;
      const { error: insertError } = await supabase!.from("works").insert({
        title: title || file.name.replace(/\.[^.]+$/, ""),
        project: project || meta.project,
        category,
        image_url: publicUrl.publicUrl,
        featured,
        sort_order: Date.now(),
      });
      if (insertError) throw insertError;
    },
    onSuccess: () => {
      toast.success("Работа добавлена");
      setFile(null);
      setTitle("");
      setProject("");
      setFeatured(false);
      queryClient.invalidateQueries({ queryKey: ["admin-works"] });
      queryClient.invalidateQueries({ queryKey: ["works"] });
    },
    onError: (err: Error) => toast.error(err.message),
    onSettled: () => setSubmitting(false),
  });

  const toggleFeatured = useMutation({
    mutationFn: async ({ id, next }: { id: string; next: boolean }) => {
      const { error } = await supabase!.from("works").update({ featured: next }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-works"] });
      queryClient.invalidateQueries({ queryKey: ["works"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteWork = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase!.from("works").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Удалено");
      queryClient.invalidateQueries({ queryKey: ["admin-works"] });
      queryClient.invalidateQueries({ queryKey: ["works"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    addWork.mutate();
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Работы</h1>
        <p className="text-muted-foreground text-sm">
          Загружайте изображения сюда — они сразу появятся в галерее и (если отметить) в блоке
          «Featured».
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid sm:grid-cols-2 gap-4 p-6 rounded-xl border border-border bg-card"
      >
        <div className="sm:col-span-2">
          <label className="text-sm text-muted-foreground mb-1 block">Файл изображения</label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            required
          />
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">
            Название (необязательно)
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="По умолчанию — имя файла"
          />
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">Категория</label>
          <Select value={category} onValueChange={(v) => setCategory(v as WorkCategory)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm text-muted-foreground mb-1 block">
            Проект/клиент (необязательно)
          </label>
          <Input
            value={project}
            onChange={(e) => setProject(e.target.value)}
            placeholder="По умолчанию — из категории"
          />
        </div>
        <div className="flex items-center gap-3">
          <Switch checked={featured} onCheckedChange={setFeatured} />
          <span className="text-sm text-foreground">Показать в Featured</span>
        </div>
        <div className="sm:col-span-2">
          <Button type="submit" variant="magical" disabled={submitting}>
            {submitting ? "Загружаем…" : "Добавить работу"}
          </Button>
        </div>
      </form>

      <div>
        {isLoading && <p className="text-muted-foreground">Загрузка…</p>}
        {!isLoading && works?.length === 0 && (
          <p className="text-muted-foreground">Пока ничего не загружено.</p>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {works?.map((work) => (
            <div key={work.id} className="rounded-lg border border-border bg-card overflow-hidden">
              <img
                src={work.image_url}
                alt={work.title}
                className="w-full aspect-square object-cover"
              />
              <div className="p-4 space-y-2">
                <p className="font-semibold text-foreground capitalize">{work.title}</p>
                <p className="text-xs text-muted-foreground">
                  {categories.find((c) => c.value === work.category)?.label}
                </p>
                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Switch
                      checked={work.featured}
                      onCheckedChange={(next) => toggleFeatured.mutate({ id: work.id, next })}
                    />
                    Featured
                  </label>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteWork.mutate(work.id)}
                    aria-label="Удалить"
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminWorks;
