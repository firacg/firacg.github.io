import { createFileRoute } from "@tanstack/react-router";
import BlogList from "@/components/BlogList";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [{ title: "Blog — Fira CG" }],
  }),
  component: BlogList,
});
