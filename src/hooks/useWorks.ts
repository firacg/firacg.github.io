import { works as staticWorks, categories, Work } from "@/data/works";

/** Portfolio works are bundled from src/assets/works at build time. */
export function useWorks(): { works: Work[]; isLoading: boolean } {
  return { works: staticWorks, isLoading: false };
}

export function useFeaturedWorks(): { works: Work[]; isLoading: boolean } {
  const explicit = staticWorks.filter((work) => work.featured);
  if (explicit.length > 0) return { works: explicit.slice(0, 9), isLoading: false };

  const heuristic = categories
    .flatMap((category) =>
      staticWorks.filter((work) => work.category === category.value).slice(0, 2),
    )
    .slice(0, 6);
  return { works: heuristic, isLoading: false };
}
