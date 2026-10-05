import { Fragment, useEffect, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Download,
  Instagram,
  Linkedin,
  MapPin,
  Pause,
  Palette,
  Play,
  Send,
  X,
} from "lucide-react";
import { payments, social } from "@/data/profile";

const contactApiUrl = import.meta.env.VITE_CONTACT_API_URL?.trim();

const stages = [
  { src: "/portfolio/raspberry-01-line.png", label: "Line" },
  { src: "/portfolio/raspberry-02-values.webp", label: "Values" },
  { src: "/portfolio/raspberry-03-light.png", label: "Volume" },
  { src: "/portfolio/raspberry-04-texture-web.webp", label: "Texture" },
  { src: "/portfolio/raspberry-05-final-web.webp", label: "Final" },
];

const SHOW_RASPBERRY_PROCESS = false;
const SHOW_COLE_TURNER = false;

const lineart = [
  ["Line_low-cover.webp", "Line_low-1.webp", "Lowe"],
  ["Line_skeggi-cover.webp", "Line_skeggi-1.webp", "Skeggi"],
  ["love_vkg-cover.webp", "love_vkg-1.webp", "Viking story"],
  ["THR_cat_knight-cover.webp", "THR_cat_knight-1.webp", "Cat knight"],
  ["VKG_daynight-cover.webp", "VKG_daynight-1.webp", "Day & night"],
  ["VKG_wolf-cover.webp", "VKG_wolf-1.webp", "The wolf"],
];

const sketches = [
  ["2026/portrait1.webp", "Portrait studies / 01"],
  ["2026/portrait2.webp", "Portrait studies / 02"],
  ["2026/portraits3.webp", "Portrait studies / 03"],
  ["2026/hands.webp", "Hands and expression"],
  ["2026/muscle.webp", "Anatomy notes"],
  ["2026/sketchesthumb.webp", "Thumbnail sketches"],
  ["2026/thumbnails2.webp", "Composition thumbnails"],
  ["2026/trees.webp", "Tree studies"],
  ["2026/bike.webp", "Flower bicycle"],
  ["2026/casual.webp", "Casual game study"],
];

const heroSocials = [
  { label: "ArtStation", href: social.artstation, icon: Palette },
  { label: "Instagram", href: social.instagram, icon: Instagram },
  { label: "LinkedIn", href: social.linkedin, icon: Linkedin },
];

const socialPosts = [
  {
    title: "Throne: Kingdom at War",
    href: "https://www.artstation.com/artwork/41omxl",
    src: "/portfolio/artstation/01.webp",
  },
  {
    title: "Throne: Kingdom at War",
    href: "https://www.artstation.com/artwork/o0X3RO",
    src: "/portfolio/artstation/02.webp",
  },
  {
    title: "Throne: Kingdom at War",
    href: "https://www.artstation.com/artwork/xdA1yW",
    src: "/portfolio/artstation/03.webp",
  },
  {
    title: "Throne: Kingdom at War",
    href: "https://www.artstation.com/artwork/Y8LwZw",
    src: "/portfolio/artstation/04.webp",
  },
  {
    title: "KSOK",
    href: "https://www.artstation.com/artwork/DYk0Wo",
    src: "/portfolio/artstation/05.webp",
  },
  {
    title: "Throne: Kingdom at War",
    href: "https://www.artstation.com/artwork/lE1B5G",
    src: "/portfolio/artstation/06.webp",
  },
  {
    title: "Throne: Kingdom at War",
    href: "https://www.artstation.com/artwork/lE1Bba",
    src: "/portfolio/artstation/07.webp",
  },
  {
    title: "Vikings: War of Clans",
    href: "https://www.artstation.com/artwork/gRYk8L",
    src: "/portfolio/artstation/08.webp",
  },
  {
    title: "Throne: Kingdom at War",
    href: "https://www.artstation.com/artwork/La5oWR",
    src: "/portfolio/artstation/09.webp",
  },
  {
    title: "Throne: Kingdom at War",
    href: "https://www.artstation.com/artwork/O3qLke",
    src: "/portfolio/artstation/10.webp",
  },
  {
    title: "Easter Illustration",
    href: "https://www.artstation.com/artwork/L4nQa5",
    src: "/portfolio/artstation/11.webp",
  },
  {
    title: "Vikings: War of Clans",
    href: "https://www.artstation.com/artwork/lGgJxo",
    src: "/portfolio/artstation/12.webp",
  },
];

const criticalAssets = [
  "/portfolio/ksok2-web.webp",
  "/portfolio/nyanchi/blink-1.png",
  "/portfolio/nyanchi/pixel-speech-frame.svg",
];

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function PortfolioImage({
  loading = "lazy",
  decoding = "async",
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  return <img loading={loading} decoding={decoding} {...props} />;
}

function PortfolioPreloader() {
  const [phase, setPhase] = useState<"loading" | "leaving" | "gone">("loading");
  const [progress, setProgress] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  useEffect(() => {
    const startedAt = performance.now();
    let leaveTimer = 0;
    let removeTimer = 0;
    let cancelled = false;

    const finish = () => {
      if (cancelled) return;
      setProgress(100);
      const remaining = Math.max(0, 900 - (performance.now() - startedAt));
      leaveTimer = window.setTimeout(() => {
        setPhase("leaving");
        removeTimer = window.setTimeout(() => setPhase("gone"), 720);
      }, remaining);
    };

    const base = import.meta.env.BASE_URL;
    const warmImage = (path: string) =>
      new Promise<void>((resolve) => {
        const url = `${base}${path.replace(/^\//, "")}`;
        const image = new Image();
        image.decoding = "async";
        image.onload = () => resolve();
        image.onerror = () => resolve();
        image.src = url;
      });

    const preload = async () => {
      try {
        let completed = 0;
        await Promise.race([
          Promise.all(
            criticalAssets.map(async (asset) => {
              await warmImage(asset);
              completed += 1;
              if (!cancelled) {
                setLoadedCount(completed);
                setProgress(Math.round((completed / criticalAssets.length) * 100));
              }
            }),
          ),
          new Promise((resolve) => window.setTimeout(resolve, 4000)),
        ]);
      } catch (error) {
        console.warn(error);
      }
      finish();
    };

    void preload();
    return () => {
      cancelled = true;
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      className={`portfolio-preloader ${phase}`}
      role="status"
      aria-live="polite"
      aria-label={`Loading portfolio assets: ${progress}%`}
    >
      <svg className="paint-logo" viewBox="0 0 760 200">
        <defs>
          <filter id="paint-front" x="-5%" y="-15%" width="110%" height="135%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.009 0.035"
              numOctaves="2"
              seed="11"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="3.5"
              xChannelSelector="R"
              yChannelSelector="B"
            />
          </filter>
          <mask id="paint-reveal" maskUnits="userSpaceOnUse" x="0" y="0" width="760" height="200">
            <rect width="760" height="200" fill="#000" />
            <path
              className="paint-reveal-wave"
              filter="url(#paint-front)"
              fill="#fff"
              style={{ transform: `translateY(${158 - progress * 1.58}px)` }}
              d="M-20 48 C55 41 105 55 178 47 C252 39 300 56 376 47 C450 38 510 54 580 46 C648 39 708 52 780 44 L780 220 L-20 220 Z"
            />
          </mask>
        </defs>
        <g className="paint-logo-ghost">
          <text x="380" y="140" textAnchor="middle">
            <tspan>FIRA</tspan>
            <tspan className="paint-logo-cg" dx="16">
              CG
            </tspan>
          </text>
        </g>
        <g className="paint-logo-fill" mask="url(#paint-reveal)">
          <text x="380" y="140" textAnchor="middle">
            <tspan>FIRA</tspan>
            <tspan className="paint-logo-cg" dx="16">
              CG
            </tspan>
          </text>
        </g>
      </svg>
      <p>
        Painting the final layer <span>{progress}%</span>
      </p>
      <small>
        {loadedCount} / {criticalAssets.length} essentials ready
      </small>
    </div>
  );
}

function CinematicVideo({ src, label, index }: { src: string; label: string; index: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.dataset.userPaused = "false";
      void video.play();
      setPaused(false);
    } else {
      video.dataset.userPaused = "true";
      video.pause();
      setPaused(true);
    }
  };

  return (
    <figure className="video-frame reveal">
      <video
        ref={videoRef}
        data-src={src}
        muted
        loop
        playsInline
        preload="none"
        data-autoplay
        aria-label={label}
      />
      <div className="video-chrome">
        <span>{index} / Process film</span>
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={paused ? "Play video" : "Pause video"}
        >
          {paused ? <Play /> : <Pause />}
        </button>
      </div>
      <figcaption>{label}</figcaption>
    </figure>
  );
}

function ProcessCase() {
  const [active, setActive] = useState(stages.length - 1);

  return (
    <section className="case-study section-pad" id="process">
      <Reveal className="section-intro">
        <p className="eyebrow">Selected case / Raspberry fairy</p>
        <h2>
          From the first line
          <br />
          to final light.
        </h2>
        <p className="section-copy">
          A production-minded process: composition, values, volume, colour and a final texture pass.
        </p>
      </Reveal>
      <div className="process-stage reveal">
        <PortfolioImage
          src={stages[active].src}
          alt={`Raspberry fairy — ${stages[active].label} stage`}
        />
        <div className="process-progress" aria-label="Artwork process stages">
          {stages.map((stage, index) => (
            <button
              key={stage.label}
              className={index === active ? "active" : ""}
              onClick={() => setActive(index)}
              aria-pressed={index === active}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {stage.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

const PortfolioShowcase = ({
  nyanchiOpen,
  setNyanchiOpen,
}: {
  nyanchiOpen: boolean;
  setNyanchiOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedLineart, setSelectedLineart] = useState<(typeof lineart)[number] | null>(null);
  const [selectedArtwork, setSelectedArtwork] = useState<{
    src: string;
    alt: string;
    title: string;
  } | null>(null);
  const [motionSlide, setMotionSlide] = useState(0);
  const [nyanchiCollapsed, setNyanchiCollapsed] = useState(false);
  const [nyanchiEngaged, setNyanchiEngaged] = useState(false);
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [contactError, setContactError] = useState("");
  const [nyanchiFrame, setNyanchiFrame] = useState(1);
  const [nyanchiAction, setNyanchiAction] = useState<
    "idle" | "eat" | "call" | "nose" | "drink" | "play"
  >("idle");

  useEffect(() => {
    if (!nyanchiOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setNyanchiOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [nyanchiOpen, setNyanchiOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) => entry.isIntersecting && entry.target.classList.add("is-visible"),
        ),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const videos = Array.from(document.querySelectorAll<HTMLVideoElement>("video[data-autoplay]"));
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(({ target, isIntersecting }) => {
          const video = target as HTMLVideoElement;
          if (isIntersecting && video.dataset.userPaused !== "true") {
            if (!video.src && video.dataset.src) {
              video.src = video.dataset.src;
              video.load();
            }
            void video.play().catch(() => undefined);
          } else {
            video.pause();
          }
        }),
      { rootMargin: "600px 0px", threshold: 0.01 },
    );
    videos.forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const lengths = { idle: 8, eat: 16, call: 8, nose: 12, drink: 16, play: 12 };
    const animation = window.setInterval(
      () =>
        setNyanchiFrame((frame) => {
          if (frame >= lengths[nyanchiAction]) {
            if (nyanchiAction !== "idle") setNyanchiAction("idle");
            return 1;
          }
          return frame + 1;
        }),
      170,
    );
    return () => window.clearInterval(animation);
  }, [nyanchiAction]);

  const playNyanchi = (action: "eat" | "call" | "nose" | "drink" | "play") => {
    setNyanchiFrame(1);
    setNyanchiAction(action);
  };

  const nyanchiImage = (() => {
    if (nyanchiAction === "idle") return `/portfolio/nyanchi/blink-${nyanchiFrame}.png`;
    if (nyanchiAction === "nose") {
      const noseFrames = ["1.0", "1.1", "2", "3", "4", "5", "6", "7", "8", "9.1", "9.2", "9.3"];
      return `/portfolio/nyanchi/nose/${noseFrames[nyanchiFrame - 1]}.png`;
    }
    if (nyanchiAction === "play") {
      const playFrames = ["1.0", "1.1", "2", "3", "4", "5", "6", "7", "8", "9.1", "9.2", "9.3"];
      return `/portfolio/nyanchi/play/${playFrames[nyanchiFrame - 1]}.png`;
    }
    return `/portfolio/nyanchi/${nyanchiAction}/${nyanchiFrame}.png`;
  })();

  useEffect(() => {
    if (!selectedLineart) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setSelectedLineart(null);
    const frame = window.requestAnimationFrame(() => {
      document.getElementById("lineart-expanded-project")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    });
    window.addEventListener("keydown", close);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("keydown", close);
    };
  }, [selectedLineart]);

  useEffect(() => {
    if (!selectedArtwork) return;
    const previousOverflow = document.body.style.overflow;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setSelectedArtwork(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", close);
    };
  }, [selectedArtwork]);

  return (
    <main>
      <PortfolioPreloader />
      <section className="editorial-hero" id="home">
        <PortfolioImage
          className="hero-canvas"
          src="/portfolio/ksok2-web.webp"
          alt="Two men resting in a sunlit meadow"
          loading="eager"
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <p className="hero-side">Characters · Illustration · Game art</p>
        <div className="hero-content">
          <p className="eyebrow">Independent 2D artist / Tbilisi</p>
          <h1>
            <span>Fira</span>
            <span className="hero-cg">CG</span>
          </h1>
          <p className="hero-lede">
            I turn characters, creatures and props into images with a story you can feel.
          </p>
          <div className="hero-actions" aria-label="Downloads">
            <a href="/cv">View CV</a>
            <a href="/downloads/Fira-CG-CV.pdf" download>
              <Download /> Download CV
            </a>
          </div>
        </div>
        <nav className="hero-socials" aria-label="Portfolio and social media">
          {heroSocials.map(({ label, href, icon: Icon }) => (
            <a href={href} target="_blank" rel="noreferrer" key={label}>
              <Icon />
              <span>{label}</span>
            </a>
          ))}
        </nav>
        <a className="scroll-cue" href="#lineart">
          Selected work <ArrowDownRight />
        </a>
      </section>

      <section className="lineart-section section-pad" id="lineart">
        <Reveal className="section-intro horizontal">
          <div>
            <p className="eyebrow">Production work</p>
            <h2>Line art</h2>
          </div>
          <p>
            <strong>Hand-drawn · No AI.</strong>
            <br />
            Production-ready line art for games.
          </p>
        </Reveal>
        <div className="lineart-track">
          {lineart.map(([src, full, title], index) => (
            <Fragment key={src}>
              <button
                className={`lineart-card reveal ${selectedLineart?.[1] === full ? "is-open" : ""}`}
                onClick={() =>
                  setSelectedLineart((current) =>
                    current?.[1] === full ? null : ([src, full, title] as (typeof lineart)[number]),
                  )
                }
                aria-expanded={selectedLineart?.[1] === full}
                aria-controls="lineart-expanded-project"
                aria-label={`Expand ${title} full line art project below`}
              >
                <PortfolioImage src={`/portfolio/lineart/${src}`} alt={`${title} line art`} />
                <span className="lineart-caption">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {title}
                  <ArrowUpRight />
                </span>
              </button>
              {selectedLineart?.[1] === full && (
                <article className="lineart-expanded" id="lineart-expanded-project">
                  <header>
                    <button
                      type="button"
                      onClick={() => setSelectedLineart(null)}
                      aria-label="Close project"
                    >
                      <X />
                    </button>
                  </header>
                  <PortfolioImage
                    src={`/portfolio/lineart/${full}`}
                    alt={`${title} full line art and sketch`}
                  />
                </article>
              )}
            </Fragment>
          ))}
        </div>
      </section>

      <section className="social-wall section-pad" id="plarium">
        <Reveal className="section-intro horizontal">
          <div>
            <p className="eyebrow">Game art / selected posts</p>
            <h2>Plarium & beyond</h2>
          </div>
          <p>
            Open the original posts to see current reactions, comments and full-resolution details.
          </p>
        </Reveal>
        <div className="social-grid">
          {socialPosts.map((post) => (
            <a
              className="social-card reveal"
              href={post.href}
              target="_blank"
              rel="noreferrer"
              key={post.href}
            >
              <PortfolioImage src={post.src} alt={`${post.title} preview`} />
              <div>
                <span>ArtStation</span>
                <h3>{post.title}</h3>
                <ArrowUpRight />
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="about section-pad" id="about">
        <Reveal className="about-lead">
          <p className="eyebrow">About / Dariya Dovhenko</p>
          <h2>
            Traditional training.
            <br />
            Eight years in games.
            <br />
            Still curious.
          </h2>
        </Reveal>
        <div className="about-grid reveal">
          <div className="about-story">
            <p>
              Painting is where I started, with years at art college before games entered the
              picture.
            </p>
            <p>
              Since 2018 I’ve worked inside Nordcurrent, DEFU Games and GAMETEQ — taking characters
              from rough thumbnails to production-ready art.
            </p>
            <p>
              Since July 2026 I’ve worked independently as a freelance 2D artist and visual
              generalist.
            </p>
          </div>
          <dl>
            <div>
              <dt>Now</dt>
              <dd>Freelance 2D Artist & Visual Generalist</dd>
            </div>
            <div>
              <dt>Before</dt>
              <dd>Lead 2D Artist · DEFU Games</dd>
            </div>
            <div>
              <dt>Based</dt>
              <dd>Tbilisi, Georgia</dd>
            </div>
            <div>
              <dt>Languages</dt>
              <dd>English · Ukrainian · Russian</dd>
            </div>
          </dl>
        </div>
        <div className="career-notes reveal">
          <article>
            <p className="eyebrow">Selected experience</p>
            <h3>Production across PC, mobile and browser games.</h3>
            <ul>
              <li>
                <strong>GAMETEQ · January 2024—July 2026</strong>
                <span>2D Artist · Plarium's Throne: Kingdom at War and Vikings: War of Clans · Tbilisi, Georgia</span>
              </li>
              <li>
                <strong>DEFU Games · 2020—2023</strong>
                <span>
                  2D Artist, then Lead Artist. Developed visual style and led 2D production across
                  Love Camp, Pulse of Love, Candy Puzzle, Puzzle Kingdom, Money Rush and Egg Wars.
                </span>
              </li>
              <li>
                <strong>Nordcurrent · 2018—2019</strong>
                <span>
                  Illustrations, locations, props and concepts for Murder by Choice: Mystery Game.
                </span>
              </li>
              <li>
                <strong>Freelance · 2019—2020</strong>
                <span>
                  Illustrations, portraits and icons for indie teams and international clients.
                </span>
              </li>
            </ul>
          </article>
          <article>
            <p className="eyebrow">Education</p>
            <h3>Fine art, design and technology.</h3>
            <ul>
              <li>
                <strong>Grekov Odesa Art College</strong>
                <span>Fine Art · 2016—2018</span>
              </li>
              <li>
                <strong>International Humanitarian University</strong>
                <span>MA, International Organizations Management · 2016—2018</span>
              </li>
              <li>
                <strong>IT Step Academy</strong>
                <span>Graphic Design · 2015—2016</span>
              </li>
              <li>
                <strong>Odesa Polytechnic National University</strong>
                <span>Bachelor’s degree, Computer Technology · 2010—2015</span>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section className="sketchbook section-pad" id="sketchbook">
        <Reveal className="sketchbook-intro">
          <div>
            <p className="eyebrow">Notes from the margins</p>
            <h2>Sketchbook</h2>
          </div>
          <p>Small studies, kept deliberately quiet at the edge of the finished work.</p>
        </Reveal>
        <div className="sketch-grid">
          {sketches.map(([src, title]) => (
            <figure className="sketch-card reveal" key={src}>
              <PortfolioImage src={`/portfolio/sketchbook/${src}`} alt={title} />
              <figcaption>{title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="manifesto section-pad" id="selected">
        <div className="manifesto-hologram" aria-hidden="true">
          <div className="manifesto-card">
            <div className="manifesto-card-face manifesto-card-front">
              <PortfolioImage src="/portfolio/terezina/therezina-card-front.webp" alt="" />
            </div>
            <div className="manifesto-card-face manifesto-card-back">
              <PortfolioImage src="/portfolio/terezina/therezina-card-back.webp" alt="" />
            </div>
          </div>
        </div>
        <Reveal>
          <p className="eyebrow">What I do</p>
          <div className="manifesto-copy">
            <p>Production art pipelines,</p>
            <p>Expressive characters, atmosphere, readable emotions and game-ready visuals.</p>
          </div>
        </Reveal>
        <div className="capabilities reveal" aria-label="Jump to a discipline">
          <a href="#featured">Character design</a>
          <a href="#key-art">Key art</a>
          <a href="#objects">Props & items</a>
          <a href="#gaz-station">Visual development</a>
        </div>
      </section>

      <section className="featured-work" id="featured">
        <article className="feature feature-wide reveal">
          <div className="feature-media">
            <PortfolioImage
              src="/portfolio/therizina-final-web.webp"
              alt="Two colourful therizinosaurs in a jungle"
            />
          </div>
          <div className="feature-meta">
            <p>Creature illustration · Fan art</p>
            <h2>Therizinosaurus</h2>
            <span>Colour, atmosphere and creature storytelling</span>
          </div>
        </article>

        {SHOW_COLE_TURNER && (
          <div className="feature-grid feature-grid-solo section-pad">
            <article className="feature feature-square feature-solo reveal">
              <div className="feature-media">
                <PortfolioImage
                  src="/portfolio/cole-turner-web.webp"
                  alt="Portrait illustration of Cole Turner"
                />
              </div>
              <div className="feature-meta">
                <p>Portrait · Fan art</p>
                <h3>Cole Turner</h3>
                <span>Shape, likeness and controlled colour.</span>
              </div>
            </article>
          </div>
        )}
      </section>

      <section className="kcd-case section-pad" id="key-art">
        <Reveal className="section-intro kcd-intro">
          <p className="eyebrow">Key art / Kingdom Come: Deliverance</p>
          <h2>Flower field</h2>
        </Reveal>
        <figure className="kcd-hero reveal">
          <button
            className="artwork-preview"
            type="button"
            onClick={() =>
              setSelectedArtwork({
                src: "/portfolio/kcd/flowerfield-final.webp",
                alt: "Two medieval characters in a flower field",
                title: "Flower field",
              })
            }
            aria-label="Open Flower field full size"
          >
            <PortfolioImage
              src="/portfolio/kcd/flowerfield-final-preview.webp"
              alt="Two medieval characters in a flower field"
            />
            <span>
              View full artwork <ArrowUpRight />
            </span>
          </button>
          <figcaption>Final illustration</figcaption>
        </figure>
        <div className="kcd-process">
          {[
            ["flowerfield-blockout.webp", "3D blockout"],
            ["flowerfield-paintover.webp", "Paintover"],
            ["flowerfield-henry.webp", "Character detail / Henry"],
            ["flowerfield-ptacek.webp", "Character detail / Hans"],
          ].map(([src, title]) => (
            <figure className="reveal" key={src}>
              <PortfolioImage
                src={`/portfolio/kcd/${src.replace(".webp", "-preview.webp")}`}
                alt={title}
              />
              <figcaption>{title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {SHOW_RASPBERRY_PROCESS && <ProcessCase />}

      <section className="gaz-case section-pad" id="gaz-station">
        <Reveal className="gaz-heading">
          <div>
            <p className="eyebrow">3D environment / Blender</p>
            <h2>
              Midnight
              <br />
              fuel stop.
            </h2>
          </div>
          <div className="gaz-summary">
            <p>
              A real-world station rebuilt as a cinematic winter environment — from architectural
              reference and modular modelling to materials, lighting and final atmosphere.
            </p>
            <a
              className="gaz-location"
              href="https://maps.app.goo.gl/zLTAu8trPcm9G9558"
              target="_blank"
              rel="noreferrer"
            >
              <MapPin /> Real location reference <ArrowUpRight />
            </a>
            <ul aria-label="Project disciplines">
              <li>Environment design</li>
              <li>Modelling & texturing</li>
              <li>Lighting & look development</li>
            </ul>
          </div>
        </Reveal>

        <figure className="gaz-hero reveal">
          <PortfolioImage
            src="/portfolio/gaz-station/final.webp"
            alt="Cinematic 3D gas station at night in snow"
          />
          <figcaption>
            <span>01</span> Final frame / night lighting
          </figcaption>
        </figure>

        <div className="gaz-process-film">
          <CinematicVideo
            src="/portfolio/motion/anime-pipeline.mp4"
            label="Storyboards to final frame"
            index="02"
          />
        </div>
      </section>

      <section className="motion-case section-pad" id="motion">
        <div className="motion-copy reveal">
          <p className="eyebrow">Process in motion</p>
          <h2>A painting is a sequence of decisions.</h2>
          <p>Watch the image move from broad structure to light, colour and final detail.</p>
        </div>
        <div className="motion-gallery reveal">
          <div className="motion-carousel-window">
            <div
              className="motion-carousel-track"
              style={{ transform: `translateX(-${motionSlide * 100}%)` }}
            >
              <div className="motion-slide" aria-hidden={motionSlide !== 0}>
                <CinematicVideo
                  src="/portfolio/ksok-process.mp4"
                  label="Process film / KSOK"
                  index="01"
                />
              </div>
              <div className="motion-slide" aria-hidden={motionSlide !== 1}>
                <button
                  className="motion-artwork-preview artwork-preview"
                  type="button"
                  onClick={() =>
                    setSelectedArtwork({
                      src: "/portfolio/ksok2.webp",
                      alt: "Two men resting in a sunlit meadow",
                      title: "KSOK — final artwork",
                    })
                  }
                  aria-label="Open KSOK final artwork full size"
                >
                  <PortfolioImage
                    src="/portfolio/ksok2-preview.webp"
                    alt="Two men resting in a sunlit meadow"
                  />
                  <span>
                    View full artwork <ArrowUpRight />
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="motion-pagination" role="tablist" aria-label="Process gallery pages">
            {["Process video", "Final artwork"].map((label, index) => (
              <button
                type="button"
                className={motionSlide === index ? "active" : ""}
                onClick={() => setMotionSlide(index)}
                role="tab"
                aria-selected={motionSlide === index}
                aria-label={`Show ${label.toLowerCase()}`}
                key={label}
              >
                <span />
              </button>
            ))}
            <p>{motionSlide === 0 ? "Process video" : "Final artwork · tap to enlarge"}</p>
          </div>
        </div>
      </section>

      <section className="red-interlude">
        <div className="red-copy reveal">
          <p className="eyebrow">Kingdom Come: Deliverance II / portrait studies</p>
          <h2>From actors to characters.</h2>
        </div>
        <div className="red-portraits">
          <PortfolioImage src="/portfolio/henry-2-web.webp" alt="Red monochrome male portrait" />
          <PortfolioImage
            src="/portfolio/henry-3-web.webp"
            alt="Second red monochrome male portrait"
          />
        </div>
      </section>

      <section className="support-block section-pad" id="support">
        <PortfolioImage
          src="/portfolio/kcd/flowerfield-final.webp"
          alt="Flower field illustration detail"
        />
        <div className="support-shade" />
        <Reveal className="support-copy">
          <p className="eyebrow">Support independent art</p>
          <h2>Help the next story find its colour.</h2>
          <p>
            If a sketch, creature or tiny painted world made your day, you can leave a coffee for
            the work that comes next.
          </p>
          <a href={payments.kofi} target="_blank" rel="noreferrer">
            Support on Ko-fi <ArrowUpRight />
          </a>
        </Reveal>
      </section>

      <section className="contact section-pad" id="contact">
        <div className="contact-main reveal">
          <p className="eyebrow">Available for selected projects</p>
          <h2>
            Have a world
            <br />
            to draw?
          </h2>
          <button className="protected-email" type="button" onClick={() => setNyanchiOpen(true)}>
            <span>Send a message</span>
            <ArrowUpRight />
          </button>
        </div>
      </section>

      <section className="closer-section" id="closer">
        <div className="closer-intro section-pad">
          <Reveal className="closer-copy">
            <p className="eyebrow">Beyond the portfolio</p>
            <h2>Get to know me beyond the screen.</h2>
            <p>
              Drawing is the centre of my practice, but curiosity rarely stays in one medium. Away
              from production work I paint, build tiny worlds and sculpt dinosaurs by hand.
            </p>
          </Reveal>
          <figure className="closer-workspace reveal">
            <PortfolioImage
              src="/portfolio/closer/fira-at-work.jpg"
              alt="Fira drawing at her home workstation"
            />
            <figcaption>At the desk / digital painting in progress</figcaption>
          </figure>
        </div>

        <div className="closer-sculptures section-pad">
          <div className="closer-sculptures-copy reveal">
            <p className="eyebrow">A small hands-on hobby</p>
            <h3>Dinosaurs made slowly, one piece of clay at a time.</h3>
            <p>
              Personal studies in weight, silhouette and anatomy — playful objects rather than
              polished portfolio pieces.
            </p>
          </div>
          <div className="sculpture-strip">
            <figure className="reveal">
              <PortfolioImage
                src="/portfolio/closer/dinosaurs-together.jpg"
                alt="Handmade dinosaur sculptures arranged on a studio table"
              />
              <figcaption>Small studio herd</figcaption>
            </figure>
            <figure className="reveal">
              <PortfolioImage
                src="/portfolio/closer/triceratops-process.jpg"
                alt="Triceratops clay sculpture in progress"
              />
              <figcaption>Building the form</figcaption>
            </figure>
            <figure className="reveal">
              <PortfolioImage
                src="/portfolio/closer/triceratops-hand.jpg"
                alt="Small handmade triceratops sculpture held in one hand"
              />
              <figcaption>Hand-sized study</figcaption>
            </figure>
            <figure className="reveal">
              <PortfolioImage
                src="/portfolio/closer/ankylosaur-study.webp"
                alt="Detailed handmade ankylosaur clay sculpture"
              />
              <figcaption>Armour and texture study</figcaption>
            </figure>
            <figure className="reveal">
              <PortfolioImage
                src="/portfolio/closer/triceratops-seated.jpg"
                alt="Small triceratops clay sculpture held in one hand"
              />
              <figcaption>Character and gesture</figcaption>
            </figure>
            <figure className="reveal">
              <PortfolioImage
                src="/portfolio/closer/triceratops-table.webp"
                alt="Handmade triceratops sculpture displayed on a wooden base"
              />
              <figcaption>Tabletop study</figcaption>
            </figure>
          </div>
        </div>

        <div className="objects section-pad closer-chapter" id="objects">
          <Reveal className="section-intro compact">
            <p className="eyebrow">Game objects / 2024</p>
            <h2>
              Small worlds
              <br />
              in glass.
            </h2>
          </Reveal>
          <div className="object-row">
            {[
              "potion-blue-web.webp",
              "potion-purple.webp",
              "potion-green-web.webp",
              "potion-red-web.webp",
            ].map((src, index) => (
              <figure className="object-card reveal" key={src}>
                <PortfolioImage
                  src={`/portfolio/${src}`}
                  alt={`Fantasy potion concept ${index + 1}`}
                />
                <figcaption>
                  <span>0{index + 1}</span> Potion study
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="analog-section section-pad closer-chapter" id="analog">
          <Reveal className="section-intro horizontal">
            <div>
              <p className="eyebrow">Traditional media</p>
              <h2>Analog practice</h2>
            </div>
            <p>Oil, coloured pencil and watercolour keep observation tactile.</p>
          </Reveal>
          <div className="analog-featured">
            {[
              ["oil-flowers.webp", "Oil", "Marigold still life"],
              ["pencil-apples.webp", "Coloured pencil", "Apple material study"],
              ["watercolour-study.webp", "Watercolour", "Fruit and botanical studies"],
              ["pencil-gems.webp", "Coloured pencil", "Gems and translucency"],
            ].map(([src, medium, title]) => (
              <figure className="reveal" key={src}>
                <PortfolioImage src={`/portfolio/analog/${src}`} alt={title} />
                <figcaption>
                  <span>{medium}</span> {title}
                </figcaption>
              </figure>
            ))}
          </div>
          <details className="analog-more reveal" open>
            <summary>
              <span>Process videos</span>
              <span>Five short studio studies</span>
            </summary>
            <div className="analog-videos">
              {[
                ["474lUHUTajc", "Coloured pencil process / 01"],
                ["ryR83A-hfoU", "Coloured pencil process / 02"],
                ["rXI-KXZsh44", "Coloured pencil process / 03"],
                ["vlUS3GKEL8U", "Coloured pencil process / 04"],
                ["fnTQXLGQ5v8", "Coloured pencil process / 05"],
              ].map(([id, title]) => (
                <a
                  className="analog-video-card"
                  href={`https://www.youtube.com/watch?v=${id}`}
                  target="_blank"
                  rel="noreferrer"
                  key={id}
                >
                  <PortfolioImage
                    src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
                    alt={`${title} YouTube preview`}
                  />
                  <span className="analog-video-play" aria-hidden="true">
                    Play
                  </span>
                  <strong>{title}</strong>
                  <ArrowUpRight />
                </a>
              ))}
            </div>
          </details>
        </div>
      </section>

      <footer className="site-footer section-pad">
        <div className="footer-lead">
          <a className="footer-brand" href="#home" aria-label="Back to the top">
            Fira <span>CG</span>
          </a>
          <p>2D artist & visual generalist · Tbilisi, Georgia</p>
          <button
            className="footer-email protected-email"
            type="button"
            onClick={() => setNyanchiOpen(true)}
          >
            <span>Send a message</span>
            <ArrowUpRight />
          </button>
        </div>
        <div className="footer-bottom">
          <nav aria-label="Social links">
            <a href={social.artstation} target="_blank" rel="noreferrer">
              ArtStation
            </a>
            <a href={social.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={social.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </nav>
          <span>© {new Date().getFullYear()} Fira CG · All artwork rights reserved</span>
        </div>
        <div className="footer-bottom" style={{ marginTop: "1.25rem", borderTop: "none" }}>
          <nav aria-label="Case study presentations">
            <a href="/spotify-pause/en/" target="_blank" rel="noreferrer">
              Spotify case study · EN
            </a>
            <a href="/spotify-pause/" target="_blank" rel="noreferrer">
              Презентация Spotify · RU
            </a>
          </nav>
        </div>
      </footer>

      {selectedArtwork && (
        <div
          className="artwork-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={selectedArtwork.title}
        >
          <button
            className="artwork-lightbox-backdrop"
            type="button"
            onClick={() => setSelectedArtwork(null)}
            aria-label="Close full-size artwork"
          />
          <div className="artwork-lightbox-content">
            <button
              className="artwork-lightbox-close"
              type="button"
              onClick={() => setSelectedArtwork(null)}
              aria-label="Close full-size artwork"
            >
              <X />
            </button>
            <PortfolioImage src={selectedArtwork.src} alt={selectedArtwork.alt} loading="eager" />
            <p>{selectedArtwork.title}</p>
          </div>
        </div>
      )}

      <aside
        className={`nyanchi-helper ${nyanchiOpen ? "is-open" : ""} ${nyanchiCollapsed ? "is-collapsed" : ""} ${nyanchiEngaged ? "is-engaged" : ""}`}
        aria-label="Nyanchi contact helper"
      >
        {nyanchiOpen && (
          <button
            className="nyanchi-backdrop"
            onClick={() => setNyanchiOpen(false)}
            aria-label="Close contact form"
          />
        )}
        {nyanchiOpen && (
          <div
            className="nyanchi-card"
            id="nyanchi-contact-form"
            role="dialog"
            aria-modal="true"
            aria-labelledby="nyanchi-contact-title"
          >
            <button
              className="nyanchi-close"
              onClick={() => setNyanchiOpen(false)}
              aria-label="Close Nyanchi"
            >
              <X />
            </button>
            <p id="nyanchi-contact-title">
              <strong>Nyanchi says hello.</strong>
              <br />
              Leave Fira a message.
            </p>
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                const form = event.currentTarget;
                const formData = new FormData(form);

                setContactStatus("sending");
                setContactError("");

                if (!contactApiUrl) {
                  setContactStatus("error");
                  setContactError(
                    "The contact form is temporarily unavailable. Please try again later.",
                  );
                  return;
                }

                try {
                  const response = await fetch(contactApiUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      name: formData.get("name"),
                      email: formData.get("email"),
                      message: formData.get("message"),
                      company: formData.get("company"),
                    }),
                  });

                  if (!response.ok) throw new Error("Message delivery failed");

                  form.reset();
                  setContactStatus("sent");
                } catch {
                  setContactStatus("error");
                  setContactError("The message could not be sent. Please try again later.");
                }
              }}
            >
              <label className="contact-honeypot" aria-hidden="true">
                Company
                <input name="company" tabIndex={-1} autoComplete="off" />
              </label>
              <label>
                Name
                <input name="name" required placeholder="Your name" />
              </label>
              <label>
                Reply to
                <input name="email" type="email" required placeholder="you@example.com" />
              </label>
              <label>
                Message
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell me about your project…"
                />
              </label>
              <button type="submit" disabled={contactStatus === "sending"}>
                <Send /> {contactStatus === "sending" ? "Sending…" : "Send message"}
              </button>
              {contactStatus === "sent" && (
                <p className="form-status is-success" role="status">
                  Message sent. Fira will reply to the email you provided.
                </p>
              )}
              {contactStatus === "error" && (
                <p className="form-status is-error" role="alert">
                  {contactError}
                </p>
              )}
              <small className="form-privacy">
                Your name, reply email and message are delivered privately to Fira in Telegram so
                she can answer your enquiry. Do not include sensitive information.
              </small>
            </form>
          </div>
        )}
        <div className="nyanchi-stage" inert={nyanchiCollapsed || nyanchiOpen}>
          <div className="nyanchi-actions" aria-label="Play with Nyanchi">
            <button onClick={() => playNyanchi("eat")} aria-label="Feed Nyanchi" title="Feed">
              <PortfolioImage src="/portfolio/nyanchi/ui-icons/eat_icon.png" alt="" />
            </button>
            <button
              onClick={() => playNyanchi("drink")}
              aria-label="Give Nyanchi water"
              title="Drink"
            >
              <PortfolioImage src="/portfolio/nyanchi/ui-icons/drink_icon.png" alt="" />
            </button>
            <button onClick={() => playNyanchi("call")} aria-label="Call Nyanchi" title="Call">
              <PortfolioImage src="/portfolio/nyanchi/ui-icons/call_icon.png" alt="" />
            </button>
            <button onClick={() => playNyanchi("nose")} aria-label="Pet Nyanchi" title="Pet">
              <PortfolioImage src="/portfolio/nyanchi/ui-icons/heart_icon.png" alt="" />
            </button>
            <button onClick={() => playNyanchi("play")} aria-label="Play with Nyanchi" title="Play">
              <PortfolioImage src="/portfolio/nyanchi/ui-icons/play_icon.png" alt="" />
            </button>
          </div>
          <button
            className="nyanchi-speech"
            onClick={() => setNyanchiOpen((open) => !open)}
            aria-expanded={nyanchiOpen}
            aria-controls="nyanchi-contact-form"
          >
            <span>Get in touch with FIRACG</span>
          </button>
          <button
            className="nyanchi-pet"
            onClick={() => {
              setNyanchiEngaged((engaged) => !engaged);
              playNyanchi("nose");
            }}
            aria-label={nyanchiEngaged ? "Make Nyanchi smaller" : "Make Nyanchi bigger"}
          >
            <PortfolioImage
              src={nyanchiImage}
              alt="Nyanchi, Fira's interactive desktop cat"
              loading="eager"
            />
          </button>
        </div>
        <button
          className="nyanchi-toggle"
          type="button"
          disabled={nyanchiOpen}
          onClick={() => {
            setNyanchiCollapsed((collapsed) => !collapsed);
            setNyanchiEngaged(false);
          }}
          aria-label={nyanchiCollapsed ? "Expand Nyanchi helper" : "Collapse Nyanchi helper"}
          aria-expanded={!nyanchiCollapsed}
        >
          {nyanchiCollapsed ? <ChevronLeft /> : <ChevronRight />}
        </button>
      </aside>
    </main>
  );
};

export default PortfolioShowcase;
