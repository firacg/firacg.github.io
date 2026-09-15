import { createFileRoute } from "@tanstack/react-router";
import IndexPage from "@/components/IndexPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fira CG — Freelance 2D Artist & Visual Generalist" },
      {
        name: "description",
        content:
          "Game art for Plarium's Throne: Kingdom at War and Vikings: War of Clans, plus personal work.",
      },
      { property: "og:title", content: "Fira CG — Freelance 2D Artist & Visual Generalist" },
      {
        property: "og:description",
        content:
          "Game art for Plarium's Throne: Kingdom at War and Vikings: War of Clans, plus personal work.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://firacg.github.io/portfolio/ksok2-web.webp" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IndexPage,
});
