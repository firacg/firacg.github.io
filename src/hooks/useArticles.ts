import { useQuery } from "@tanstack/react-query";
import { supabase, isSupabaseConfigured } from "@/integrations/supabase/client";

export interface Article {
  id: string;
  title: string;
  slug: string;
  body: string;
  published: boolean;
  created_at: string;
}

export function usePublishedArticles() {
  return useQuery({
    queryKey: ["articles", "published"],
    queryFn: async (): Promise<Article[]> => {
      const { data, error } = await supabase!
        .from("articles")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Article[];
    },
    enabled: isSupabaseConfigured,
  });
}

export function useArticleBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: ["articles", "slug", slug],
    queryFn: async (): Promise<Article | null> => {
      const { data, error } = await supabase!
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      return data as Article | null;
    },
    enabled: isSupabaseConfigured && Boolean(slug),
  });
}

export function useAllArticles() {
  return useQuery({
    queryKey: ["articles", "all"],
    queryFn: async (): Promise<Article[]> => {
      const { data, error } = await supabase!
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Article[];
    },
    enabled: isSupabaseConfigured,
  });
}
