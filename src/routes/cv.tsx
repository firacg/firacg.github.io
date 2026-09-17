import { createFileRoute } from "@tanstack/react-router";
import { experience, profile, social } from "@/data/profile";

const work = experience.filter(
  (item) => item.type === "work" && !["7-40", "Upperline Studio"].includes(item.company),
);
const education = experience.filter((item) => item.type === "education");
const english: Record<string, string> = {
  Художник: "2D Artist",
  "Разные клиенты": "Various clients",
  Одесса: "Odesa",
  Украина: "Ukraine",
  "Одесская область": "Odesa region",
  "Одесское художественное училище им. М. Б. Грекова": "Grekov Odesa Art College",
  "Магистр, Менеджмент организаций": "MA, Management of Organisations",
  "Одесский международный гуманитарный университет": "International Humanitarian University, Odesa",
  ОНПУ: "Odesa Polytechnic",
};
const en = (value: string) => english[value] ?? value;

const tools = [
  {
    label: "Drawing & painting",
    value: "Character art, illustration, props, environments, composition, colour and light",
  },
  { label: "Software", value: "Photoshop, Clip Studio Paint, Blender, Illustrator, Figma" },
  {
    label: "AI workflows",
    value: "Stable Diffusion, ComfyUI, LoRA, Midjourney, Gemini, Higgsfield",
  },
  { label: "Production", value: "Jira, Miro, Trello" },
];

export const Route = createFileRoute("/cv")({
  head: () => ({
    meta: [
      { title: "CV | Dariya Dovhenko — 2D Game Artist & Illustrator" },
      {
        name: "description",
        content:
          "Dariya Dovhenko is a Tbilisi-based 2D game artist and illustrator. Experience at GAMETEQ, DEFU Games and Nordcurrent; character art, illustration, props and visual development.",
      },
    ],
  }),
  component: CVPage,
});

function CVPage() {
  return (
    <main className="cv-page">
      <header className="cv-header">
        <a className="cv-wordmark" href="/" aria-label="Fira CG portfolio home">
          FIRA<span>CG</span>
        </a>
        <nav aria-label="CV navigation">
          <a href="/">
            Portfolio <span aria-hidden="true">↗</span>
          </a>
          <a href="/downloads/Fira-CG-CV.pdf" download>
            PDF <span aria-hidden="true">↓</span>
          </a>
        </nav>
      </header>

      <div className="cv-shell">
        <section className="cv-intro" aria-labelledby="cv-title">
          <div className="cv-intro-copy">
            <p className="cv-overline">
              Fira CG <span aria-hidden="true">/</span> Curriculum vitae
            </p>
            <h1 id="cv-title">
              Dariya
              <br />
              Dovhenko<span className="cv-title-period">.</span>
            </h1>
            <p className="cv-role">2D game artist & illustrator</p>
            <p className="cv-summary">
              I draw characters, locations and props for games. Most recently, I worked at GAMETEQ
              on art for Plarium’s <cite>Throne: Kingdom at War</cite> and{" "}
              <cite>Vikings: War of Clans</cite>. Before that, I led 2D art at DEFU Games and made
              illustrations for Nordcurrent.
            </p>
            <div className="cv-intro-bottom">
              <p>
                Tbilisi, Georgia
                <br />
                <span>Available for remote or hybrid work</span>
              </p>
              <a className="cv-email" href="mailto:firacgi@gmail.com">
                firacgi@gmail.com <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <figure className="cv-artwork">
            <img
              src="/portfolio/ksok2-web.webp"
              alt="Personal illustration by Dariya Dovhenko: two characters resting together in a sunlit field"
              fetchPriority="high"
            />
            <figcaption>
              <span>Personal illustration, 2026</span>
              <a href="/">
                See the work <span aria-hidden="true">↗</span>
              </a>
            </figcaption>
          </figure>
        </section>

        <div className="cv-content">
          <section className="cv-section" aria-labelledby="cv-experience">
            <div className="cv-section-heading">
              <p>Work history</p>
              <h2 id="cv-experience">Experience</h2>
            </div>
            <div className="cv-entries">
              <article className="cv-entry">
                <div className="cv-entry-date">
                  <time>Jul 2026 — present</time>
                  <span>Tbilisi · remote</span>
                </div>
                <div>
                  <h3>Freelance 2D Artist & Illustrator</h3>
                  <p className="cv-employer">Independent</p>
                  <p>
                    Character and illustration commissions, from sketches through final artwork.
                  </p>
                </div>
              </article>
              {work.map((item) => (
                <article className="cv-entry" key={`${item.company}-${item.title}`}>
                  <div className="cv-entry-date">
                    <time>{item.year.replaceAll("January", "Jan").replaceAll("July", "Jul")}</time>
                    <span>{en(item.location)}</span>
                  </div>
                  <div>
                    <h3>{en(item.title)}</h3>
                    <p className="cv-employer">{en(item.company)}</p>
                    {item.description && <p>{item.description}</p>}
                    {item.description2 && <p>{item.description2}</p>}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="cv-section" aria-labelledby="cv-skills">
            <div className="cv-section-heading">
              <p>Practice</p>
              <h2 id="cv-skills">Skills & tools</h2>
            </div>
            <dl className="cv-skill-groups">
              {tools.map((group) => (
                <div key={group.label}>
                  <dt>{group.label}</dt>
                  <dd>{group.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="cv-section" aria-labelledby="cv-education">
            <div className="cv-section-heading">
              <p>Background</p>
              <h2 id="cv-education">Education</h2>
            </div>
            <div className="cv-education">
              <ul>
                {education.map((item) => (
                  <li key={item.company}>
                    <strong>{en(item.title)}</strong>
                    <span>{en(item.company)}</span>
                    <time>{item.year}</time>
                  </li>
                ))}
              </ul>
              <div className="cv-languages">
                <h3>Languages</h3>
                <p>English · Ukrainian · Russian</p>
              </div>
            </div>
          </section>
        </div>

        <aside className="cv-next">
          <div>
            <p>See the work behind the CV</p>
            <h2>Characters, game art & personal pieces.</h2>
          </div>
          <div className="cv-next-links">
            <a href="/">
              Open portfolio <span aria-hidden="true">↗</span>
            </a>
            <a href={social.artstation} target="_blank" rel="noreferrer">
              ArtStation <span aria-hidden="true">↗</span>
            </a>
            <a href={social.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
            <a href={social.telegram} target="_blank" rel="noreferrer">
              Telegram <span aria-hidden="true">↗</span>
            </a>
          </div>
        </aside>
      </div>
      <footer className="cv-footer">
        <span>{profile.fullName} · Fira CG</span>
        <a href="/downloads/Fira-CG-CV.pdf" download>
          Download CV as PDF ↓
        </a>
      </footer>
    </main>
  );
}
