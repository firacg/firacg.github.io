import { createFileRoute } from "@tanstack/react-router";
import IndexPage from "@/components/IndexPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fira CG — 2D Artist" },
      {
        name: "description",
        content:
          "Game art for Plarium's Throne: Kingdom at War and Vikings: War of Clans, plus personal work.",
      },
      { property: "og:title", content: "Fira CG — 2D Artist" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IndexPage,
});
