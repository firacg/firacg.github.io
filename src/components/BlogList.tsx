import { Link } from "@tanstack/react-router";
import Navigation from "@/components/Navigation";
import { usePublishedArticles } from "@/hooks/useArticles";
import { isSupabaseConfigured } from "@/integrations/supabase/client";

const BlogList = () => {
  const { data: articles, isLoading } = usePublishedArticles();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <section className="py-32 px-6 max-w-4xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-4 text-foreground">
          Blog
        </h1>
        <p className="text-xl text-muted-foreground mb-12">Devlogs, process notes, and updates.</p>

        {!isSupabaseConfigured && (
          <p className="text-muted-foreground">Блог появится, как только будет подключена CRM.</p>
        )}
        {isSupabaseConfigured && isLoading && <p className="text-muted-foreground">Загрузка…</p>}
        {isSupabaseConfigured && !isLoading && articles?.length === 0 && (
          <p className="text-muted-foreground">Пока нет опубликованных статей.</p>
        )}

        <div className="space-y-6">
          {articles?.map((article) => (
            <Link
              key={article.id}
              to="/blog/$slug"
              params={{ slug: article.slug }}
              className="block p-6 rounded-xl border border-border bg-card hover:border-primary transition-all duration-300"
            >
              <h2 className="text-2xl font-bold text-foreground mb-2">{article.title}</h2>
              <p className="text-sm text-muted-foreground">
                {new Date(article.created_at).toLocaleDateString("ru-RU")}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogList;
