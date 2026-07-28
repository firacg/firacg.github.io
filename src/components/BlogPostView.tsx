import { Link } from "@tanstack/react-router";
import Navigation from "@/components/Navigation";
import { useArticleBySlug } from "@/hooks/useArticles";
import { ArrowLeft } from "lucide-react";

const BlogPostView = ({ slug }: { slug: string }) => {
  const { data: article, isLoading } = useArticleBySlug(slug);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <article className="py-32 px-6 max-w-3xl mx-auto">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Все статьи
        </Link>

        {isLoading && <p className="text-muted-foreground">Загрузка…</p>}
        {!isLoading && !article && <p className="text-muted-foreground">Статья не найдена.</p>}

        {article && (
          <>
            <h1 className="text-4xl font-bold mb-3 text-foreground">{article.title}</h1>
            <p className="text-sm text-muted-foreground mb-8">
              {new Date(article.created_at).toLocaleDateString("ru-RU")}
            </p>
            <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed space-y-4">
              {article.body.split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </>
        )}
      </article>
    </div>
  );
};

export default BlogPostView;
