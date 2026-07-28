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
}

export const categories: { value: WorkCategory; label: string; project: string }[] = [
  { value: "plarium", label: "Plarium", project: "Throne: Kingdom at War / Vikings: War of Clans" },
  { value: "early", label: "Ранние работы", project: "Личные и ранние проекты" },
  { value: "pet-projects", label: "Пет-проекты", project: "Фан-арт, стади, эксперименты" },
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
    }));
}

export const works: Work[] = categories.flatMap((c) => loadCategory(c.value));

export const featuredWorks: Work[] = categories
  .flatMap((c) => works.filter((w) => w.category === c.value).slice(0, 2))
  .slice(0, 6);
