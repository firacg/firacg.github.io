import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Clean Base — Ready for GitHub Merge" },
      {
        name: "description",
        content:
          "A minimal, dependency-light starting point prepared for merging an existing GitHub codebase.",
      },
      { property: "og:title", content: "Clean Base — Ready for GitHub Merge" },
      {
        property: "og:description",
        content:
          "A minimal, dependency-light starting point prepared for merging an existing GitHub codebase.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-lg text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Baseline
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">
          Clean project
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          No placeholder markup, no demo components. Connect GitHub and merge your
          existing codebase on top of this baseline.
        </p>
      </div>
    </main>
  );
}
