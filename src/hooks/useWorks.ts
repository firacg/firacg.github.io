import { useQuery } from "@tanstack/react-query";
import { supabase, isSupabaseConfigured } from "@/integrations/supabase/client";
import { works as staticWorks, categories, Work, WorkCategory } from "@/data/works";

interface WorkRow {
  id: string;
  title: string;
  project: string;
  category: WorkCategory;
  image_url: string;
  featured: boolean;
  sort_order: number;
}

async function fetchWorks(): Promise<Work[]> {
  const { data, error } = await supabase!
    .from("works")
    .select("id, title, project, category, image_url, featured, sort_order")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data as WorkRow[]).map((row) => ({
    id: row.id,
    title: row.title,
    project: row.project,
    category: row.category,
    image: row.image_url,
    featured: row.featured,
  }));
}

/** Portfolio works — reads from Supabase once it's connected, otherwise
 * falls back to the static src/assets/works/ folders. */
export function useWorks(): { works: Work[]; isLoading: boolean } {
  const query = useQuery({
    queryKey: ["works"],
    queryFn: fetchWorks,
    enabled: isSupabaseConfigured,
    staleTime: 60_000,
  });

  if (!isSupabaseConfigured) {
    return { works: staticWorks, isLoading: false };
  }
  if (query.isLoading) {
    return { works: [], isLoading: true };
  }
  if (query.isError || !query.data || query.data.length === 0) {
    return { works: staticWorks, isLoading: false };
  }
  return { works: query.data, isLoading: false };
}

export function useFeaturedWorks(): { works: Work[]; isLoading: boolean } {
  const { works, isLoading } = useWorks();
  if (isLoading) return { works: [], isLoading: true };

  const explicit = works.filter((w) => w.featured);
  if (explicit.length > 0) return { works: explicit.slice(0, 9), isLoading: false };

  const heuristic = categories
    .flatMap((c) => works.filter((w) => w.category === c.value).slice(0, 2))
    .slice(0, 6);
  return { works: heuristic, isLoading: false };
}
