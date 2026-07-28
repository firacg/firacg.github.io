import { createFileRoute } from "@tanstack/react-router";
import BlogPostView from "@/components/BlogPostView";

export const Route = createFileRoute("/blog/$slug")({
  head: () => ({
    meta: [{ title: "Blog — Fira CG" }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = Route.useParams();
  return <BlogPostView slug={slug} />;
}
