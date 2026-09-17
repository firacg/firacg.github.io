import { createFileRoute } from "@tanstack/react-router";
import { experience, profile, social } from "@/data/profile";

const work = experience.filter((item) => item.type === "work");
const education = experience.filter((item) => item.type === "education");
const english: Record<string, string> = {
  "Художник": "2D Artist",
  "Разные клиенты": "Various clients",
  "Одесса": "Odesa",
  "Украина": "Ukraine",
  "Одесская область": "Odesa region",
  "Одесское художественное училище им. М. Б. Грекова": "Grekov Odesa Art College",
  "Магистр, Менеджмент организаций": "MA, Management of Organisations",
  "Одесский международный гуманитарный университет": "International Humanitarian University, Odesa",
  "ОНПУ": "Odesa Polytechnic",
};
const en = (value: string) => english[value] ?? value;
const skillGroups = [
  {
    title: "Art fundamentals",
    skills: "Composition, anatomy, perspective, color theory, light and shadow, value, form, materials and visual storytelling.",
  },
  {
    title: "Creative software",
    skills: "Adobe Photoshop, Clip Studio Paint, Blender 3D, Adobe Illustrator and Figma.",
  },
  {
    title: "AI-assisted art",
    skills: "Stable Diffusion, ComfyUI, LoRA, checkpoints, Midjourney, Gemini and Higgsfield.",
  },
  {
    title: "Collaboration",
    skills: "Jira, Miro and Trello.",
  },
];

export const Route = createFileRoute("/cv")({
  head: () => ({
    meta: [
      { title: "CV | Dariya Dovhenko - 2D Game Artist & Illustrator" },
      {
        name: "description",
        content: "Dariya Dovhenko is a Tbilisi-based 2D game artist and illustrator. Experience at GAMETEQ, DEFU Games and Nordcurrent; character art, illustration, props and visual development.",
      },
    ],
  }),
  component: CVPage,
});

function CVPage() {
  return (
    <main className="cv-page">
      <header className="cv-header">
        <a className="cv-wordmark" href="/" aria-label="Fira CG portfolio home">FIRA<span>CG</span></a>
        <nav aria-label="CV navigation"><a href="/">Portfolio</a><a href="/downloads/Fira-CG-CV.pdf" download>Download PDF</a></nav>
      </header>

      <div className="cv-shell">
        <div className="cv-intro">
          <p className="cv-kicker">{profile.fullName} / Fira CG</p>
          <h1>2D Game Artist <em>&</em> Illustrator</h1>
          <p className="cv-summary">I create character art, narrative illustrations, props and visual development for games - from early concepts to production-ready images. My background combines traditional painting training with game-studio work across mobile, browser and PC projects.</p>
          <div className="cv-contact" aria-label="Contact and portfolio links">
            <span>Tbilisi, Georgia · Remote / hybrid</span>
            <a href="mailto:firacgi@gmail.com">firacgi@gmail.com</a>
            <a href="/">Website</a>
            <a href={social.artstation} target="_blank" rel="noreferrer">ArtStation</a>
            <a href={social.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={social.instagram} target="_blank" rel="noreferrer">Instagram</a>
            <a href={social.telegram} target="_blank" rel="noreferrer">Telegram</a>
          </div>
          <div className="cv-actions"><a href="/downloads/Fira-CG-CV.pdf" download>Download ATS-friendly PDF <span aria-hidden="true">↓</span></a><a href="/#plarium">See selected game art <span aria-hidden="true">↗</span></a></div>
        </div>

        <div className="cv-content">
          <section className="cv-section" aria-labelledby="cv-experience">
            <div className="cv-section-heading"><span>01 / Career</span><h2 id="cv-experience">Experience</h2></div>
            <div className="cv-entries">
              <article className="cv-entry"><div><time>Jul 2026 - present</time><span>Tbilisi · remote</span></div><div><h3>Freelance 2D Artist & Illustrator</h3><p className="cv-employer">Independent</p><p>Character, illustration and game-art commissions; independently developing concepts through final artwork.</p></div></article>
              {work.filter((item) => !["7-40", "Upperline Studio"].includes(item.company)).map((item) => (
                <article className="cv-entry" key={`${item.company}-${item.title}`}>
                  <div><time>{item.year.replaceAll("January", "Jan").replaceAll("July", "Jul")}</time><span>{en(item.location)}</span></div>
                  <div><h3>{en(item.title)}</h3><p className="cv-employer">{en(item.company)}</p>{item.description && <p>{item.description}</p>}{item.description2 && <p>{item.description2}</p>}</div>
                </article>
              ))}
            </div>
          </section>

          <section className="cv-section" aria-labelledby="cv-focus">
            <div className="cv-section-heading"><span>02 / Practice</span><h2 id="cv-focus">What I work on</h2></div>
            <div className="cv-practice"><div><h3>Illustration & characters</h3><p>Character design, character close-ups, storytelling illustration and key art.</p></div><div><h3>Game-ready art</h3><p>Props and items, concept development, visual consistency and final production polish.</p></div><div><h3>Art direction</h3><p>Lead 2D Artist experience at DEFU Games across six game projects.</p></div></div>
          </section>

          <section className="cv-section" aria-labelledby="cv-skills">
            <div className="cv-section-heading"><span>03 / Toolkit</span><h2 id="cv-skills">Skills & tools</h2></div>
            <div className="cv-skill-groups">{skillGroups.map((group) => <div key={group.title}><h3>{group.title}</h3><p>{group.skills}</p></div>)}</div>
          </section>

          <section className="cv-section" aria-labelledby="cv-education">
            <div className="cv-section-heading"><span>04 / Foundation</span><h2 id="cv-education">Education & languages</h2></div>
            <div className="cv-education"><ul>{education.map((item) => <li key={item.company}><strong>{en(item.title)}</strong><span>{en(item.company)} · {item.year}</span></li>)}</ul><div><h3>Languages</h3><p>English · Ukrainian · Russian</p><p className="cv-footnote">Explore selected <a href="/#plarium">game art</a> and the wider portfolio on <a href={social.artstation} target="_blank" rel="noreferrer">ArtStation</a>.</p></div></div>
          </section>
        </div>
      </div>
      <footer className="cv-footer"><span>Fira CG · Dariya Dovhenko</span><a href="/">Back to portfolio ↑</a></footer>
    </main>
  );
}
