export const profile = {
  name: "Fira CG",
  fullName: "Dariya Dovhenko",
  title: "Freelance 2D Artist & Visual Generalist",
  pitch: "I draw for game dev companies — characters, locations, props and items.",
  location: "Currently in Tbilisi, Georgia",
  languages: ["English", "Ukrainian", "Russian", "Japanese (elementary)"],
  skills: ["Game Art", "Character Design", "Concept Development"],
  bio: "Painting is where I started, years at art college before games ever entered the picture. Since 2018 I've worked inside game studios — Nordcurrent, DEFU Games and GAMETEQ — taking characters from a rough thumbnail to a finished piece ready for production, on titles including Plarium's Throne: Kingdom at War and Vikings: War of Clans. Since July 2026 I have worked independently as a freelance 2D artist and visual generalist.",
};

export const social = {
  instagram: "https://www.instagram.com/fira_cg/",
  artstation: "https://www.artstation.com/maboroshi94",
  behance: "https://www.behance.net/maboroshi94",
  linkedin: "https://www.linkedin.com/in/firacg/",
  tumblr: "https://www.tumblr.com/blog/firacgart",
};

export const payments = {
  kofi: "https://ko-fi.com/firacg",
  paypal: "https://paypal.me/FiraCG",
};

export const commissionInfo = {
  process: [
    "Обсуждение задачи и бриф",
    "Согласование эскиза",
    "Финальная отрисовка",
    "Несколько правок",
    "Сдача проекта",
  ],
  prepayment: "Предоплата 50% после согласования эскиза",
  restrictions: ["UI/UX и интерфейсы", "Hyper-casual стиль", "Сложные 3D-модели и скульпты"],
  responseHours: "Обычно на связи 9:00–23:00 по времени Тбилиси",
};

export interface ExperienceItem {
  year: string;
  type: "work" | "education";
  title: string;
  company: string;
  location: string;
  description?: string;
}

export const experience: ExperienceItem[] = [
  {
    year: "January 2024 — July 2026",
    type: "work",
    title: "2D Artist",
    company: "GAMETEQ",
    location: "Tbilisi, Georgia · Hybrid",
    description: "Full-time 2D Artist.",
  },
  {
    year: "2021 — 2023",
    type: "work",
    title: "Lead 2D Artist",
    company: "DEFU Games",
    location: "Одесса",
    description:
      "Led and contributed to 2D production across Love Camp, Pulse of Love, Candy Puzzle, Puzzle Kingdom, Money Rush and Egg Wars.",
  },
  {
    year: "2020 — 2023",
    type: "work",
    title: "2D Artist",
    company: "DEFU Games",
    location: "Одесса",
  },
  {
    year: "2019 — 2020",
    type: "work",
    title: "2D Artist, Freelance",
    company: "Разные клиенты",
    location: "Украина",
  },
  {
    year: "2018 — 2019",
    type: "work",
    title: "Художник",
    company: "Nordcurrent",
    location: "Одесская область",
    description:
      "Concept art, character close-ups and illustrations for Murder by Choice: Mystery Game.",
  },
  {
    year: "2015 — 2016",
    type: "work",
    title: "UI/UX Designer",
    company: "7-40",
    location: "Одесса",
  },
  {
    year: "2014 — 2015",
    type: "work",
    title: "Designer (UI/UX)",
    company: "Upperline Studio",
    location: "Одесса",
  },
  {
    year: "2016 — 2018",
    type: "education",
    title: "Fine Art",
    company: "Одесское художественное училище им. М. Б. Грекова",
    location: "Одесса",
  },
  {
    year: "2015 — 2016",
    type: "education",
    title: "Graphic Design",
    company: "IT Step Academy",
    location: "Одесса",
  },
  {
    year: "2016 — 2018",
    type: "education",
    title: "Магистр, Менеджмент организаций",
    company: "Одесский международный гуманитарный университет",
    location: "Одесса",
  },
  {
    year: "2010 — 2015",
    type: "education",
    title: "Specialist, Computer Technology",
    company: "ОНПУ",
    location: "Одесса",
  },
];
