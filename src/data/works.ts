// Works are loaded automatically from src/assets/works/<category>/ — to add a
// piece, upload an image file into the matching folder on GitHub (Add file →
// Upload files) and it appears on the site on the next deploy. No code changes
// needed. See the README.md in each folder for details.

export type WorkCategory = "plarium" | "early" | "pet-projects";

export interface Work {
  id: string;
  title: string;
  project: string;
  category: WorkCategory;
  image: string;
  featured?: boolean;
  /** One-line case-study description for the Featured carousel. Falls back
   *  to the category's generic blurb below when a piece doesn't have its
   *  own — replace with a specific line per featured piece when ready
   *  (see design/portfolio-structure.md, open question 1). */
  description?: string;
}

export const categories: {
  value: WorkCategory;
  label: string;
  project: string;
  description: string;
}[] = [
  {
    value: "plarium",
    label: "Клиентские работы",
    project: "Throne: Kingdom at War / Vikings: War of Clans",
    description: "Game art for Plarium's Throne: Kingdom at War and Vikings: War of Clans.",
  },
  {
    value: "early",
    label: "Ранние работы",
    project: "Личные и ранние проекты",
    description: "Early personal and professional work.",
  },
  {
    value: "pet-projects",
    label: "Личные проекты",
    project: "Фан-арт, стади, эксперименты",
    description: "Personal studies, fan art and experiments.",
  },
];

const imagesByCategory: Record<WorkCategory, Record<string, string>> = {
  plarium: import.meta.glob("/src/assets/works/plarium/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
  early: import.meta.glob("/src/assets/works/early/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
  "pet-projects": import.meta.glob("/src/assets/works/pet-projects/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
};

function titleFromPath(path: string): string {
  const filename = path.split("/").pop() ?? path;
  const withoutExt = filename.replace(/\.[^.]+$/, "");
  return withoutExt.replace(/[-_]+/g, " ").trim();
}

function loadCategory(category: WorkCategory): Work[] {
  const meta = categories.find((c) => c.value === category)!;
  return Object.entries(imagesByCategory[category])
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, image], index) => ({
      id: `${category}-${index + 1}`,
      title: titleFromPath(path),
      project: meta.project,
      category,
      image,
      description: meta.description,
    }));
}

export const works: Work[] = categories.flatMap((c) => loadCategory(c.value));

export const featuredWorks: Work[] = categories
  .flatMap((c) => works.filter((w) => w.category === c.value).slice(0, 2))
  .slice(0, 6);
