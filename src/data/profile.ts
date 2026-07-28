export const profile = {
  name: "Fira CG",
  fullName: "Dariya Dovhenko",
  title: "2D Artist",
  pitch: "I draw for game dev companies — characters, locations, props and items.",
  location: "Currently in Tbilisi, Georgia",
  languages: ["English", "Ukrainian", "Russian", "Japanese (elementary)"],
  email: "maboroshi94@gmail.com",
  skills: ["Game Art", "Character Design", "Concept Development"],
};

export const social = {
  instagram: "https://www.instagram.com/fira_cg/",
  artstation: "https://www.artstation.com/maboroshi94",
  behance: "https://www.behance.net/maboroshi94",
  linkedin: "https://www.linkedin.com/in/firacg/",
  tumblr: "https://www.tumblr.com/blog/firacgart",
  telegram: "https://t.me/Fira_cg_art",
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
    year: "2024 — сейчас",
    type: "work",
    title: "2D Artist",
    company: "GAMETEQ",
    location: "Тбилиси",
  },
  {
    year: "2021 — 2023",
    type: "work",
    title: "Lead 2D Artist",
    company: "DEFU Games",
    location: "Одесса",
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
    year: "2016 — 2020",
    type: "education",
    title: "Младший специалист, Живопись",
    company: "Одесское художественное училище им. М. Б. Грекова",
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
