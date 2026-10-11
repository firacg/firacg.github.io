export const profile = {
  name: "Fira CG",
  fullName: "Daria Dovhenko",
  title: "Freelance 2D Artist & Visual Generalist",
  pitch:
    "I draw for game dev companies — characters, locations, props and items.",
  location: "Currently in Tbilisi, Georgia",
  languages: ["English", "Ukrainian", "Russian", "Japanese (elementary)"],
  skills: ["Game Art", "Character Design", "Concept Development"],
  bio: "Painting is where I started, years at art college before games ever entered the picture. Since 2018 I've worked inside game studios — Nordcurrent, DEFU Games and GAMETEQ — taking characters from a rough thumbnail to a finished piece ready for production. Since July 2026 I have worked independently as a freelance 2D artist and visual generalist.",
};

export const social = {
  instagram: "https://www.instagram.com/fira_cg/",
  artstation: "https://www.artstation.com/maboroshi94",
  behance: "https://www.behance.net/maboroshi94",
  linkedin: "https://www.linkedin.com/in/firacg/",
  telegram: "https://t.me/FiraCG",
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
  restrictions: [
    "UI/UX и интерфейсы",
    "Hyper-casual стиль",
    "Сложные 3D-модели и скульпты",
  ],
  responseHours: "Обычно на связи 9:00–23:00 по времени Тбилиси",
};

export interface ExperienceItem {
  year: string;
  type: "work" | "education";
  title: string;
  company: string;
  location: string;
  description?: string;
  description2?: string;
}

export const experience: ExperienceItem[] = [
  {
    year: "January 2024 — July 2026",
    type: "work",
    title: "2D Artist",
    company: "GAMETEQ",
    location: "Tbilisi, Georgia · Hybrid",
    description:
      "Created 250+ game and marketing illustrations, from concept and composition to finished realism and semi-realism artwork.",
    description2:
      "In-game shop, advertising, social media and promotional artwork; adapted assets for formats and UI layouts. Combined drawing and AI-assisted exploration with manual Photoshop finishing.",
  },
  {
    year: "2021 — 2023",
    type: "work",
    title: "Lead 2D Artist",
    company: "DEFU Games",
    location: "Одесса",
    description:
      "Led seven artists across six projects: hiring, mentoring, task planning and production coordination in Trello and Jira. Developed visual styles, style guides and brand identity; reviewed artwork, provided paintovers and final polish, and prepared layered PSDs for Spine animation.",
    description2:
      "Love Camp, Pulse of Love (Steam), Candy Puzzle, Puzzle Kingdom, Money Rush and Egg Wars. Collaborated with programmers, game designers and art directors.",
  },
  {
    year: "2020 — 2021",
    type: "work",
    title: "2D Artist",
    company: "DEFU Games",
    location: "Одесса",
    description:
      "Created game artwork; subsequently promoted to Lead 2D Artist.",
  },
  {
    year: "2019 — 2020",
    type: "work",
    title: "2D Artist, Freelance",
    company: "Разные клиенты",
    location: "Украина",
    description:
      "Created illustrations, portraits and icons for indie teams and international clients.",
  },
  {
    year: "2018 — 2019",
    type: "work",
    title: "Художник",
    company: "Nordcurrent",
    location: "Одесская область",
    description:
      "Illustrations, locations, props and concepts for Murder by Choice: Mystery Game.",
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
