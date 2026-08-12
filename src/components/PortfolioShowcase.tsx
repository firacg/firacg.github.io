import { useEffect, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Download,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Pause,
  Palette,
  Play,
  Send,
  X,
} from "lucide-react";
import { payments, profile, social } from "@/data/profile";

const stages = [
  { src: "/portfolio/raspberry-01-line.png", label: "Line" },
  { src: "/portfolio/raspberry-02-values.webp", label: "Values" },
  { src: "/portfolio/raspberry-03-light.png", label: "Volume" },
  { src: "/portfolio/raspberry-04-texture.webp", label: "Texture" },
  { src: "/portfolio/raspberry-05-final.webp", label: "Final" },
];

const lineart = [
  ["Line_low-cover.png", "Line_low-1.png", "Lowe"],
  ["Line_skeggi-cover.png", "Line_skeggi-1.png", "Skeggi"],
  ["love_vkg-cover.png", "love_vkg-1.png", "Viking story"],
  ["THR_cat_knight-cover.png", "THR_cat_knight-1.png", "Cat knight"],
  ["VKG_daynight-cover.png", "VKG_daynight-1.png", "Day & night"],
  ["VKG_wolf-cover.png", "VKG_wolf-1.png", "The wolf"],
];

const sketches = [
  ["portrait-girl.png", "Portrait study"],
  ["portrait-boy.png", "Value study"],
  ["madmax-studies.png", "Furiosa studies"],
  ["gesture-030324.png", "Gesture practice"],
  ["gesture-170424.png", "Weekly sketching"],
  ["composition-studies.png", "Composition notes"],
  ["anatomy-hands.png", "Hands / anatomy"],
  ["anatomy-hand-forms.png", "Hand construction"],
  ["anatomy-torso.png", "Torso construction"],
  ["master-studies.png", "Master studies"],
];

const heroSocials = [
  { label: "ArtStation", href: social.artstation, icon: Palette },
  { label: "Instagram", href: social.instagram, icon: Instagram },
  { label: "LinkedIn", href: social.linkedin, icon: Linkedin },
  { label: "Telegram", href: social.telegram, icon: Send },
];

const socialPosts = [
  {
    platform: "ArtStation",
    title: "KSOK — full project",
    href: "https://www.artstation.com/artwork/DYk0Wo",
    src: "/portfolio/ksok2.webp",
  },
  {
    platform: "Instagram",
    title: "Character art & process",
    href: "https://www.instagram.com/fira_cg/p/Dbp6SL1DO3c/?img_index=2",
    src: "/portfolio/kcd/flowerfield-final.webp",
  },
  {
    platform: "Instagram",
    title: "New work from the studio",
    href: "https://www.instagram.com/fira_cg/p/DTKdMGgDO5Q/",
    src: "/portfolio/therizina-final.webp",
  },
  {
    platform: "Instagram",
    title: "Sketches and studies",
    href: "https://www.instagram.com/p/DG0_z6QMOwp/?img_index=2",
    src: "/portfolio/sketchbook/madmax-studies.webp",
  },
];

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function PortfolioPreloader() {
  const [phase, setPhase] = useState<"loading" | "leaving" | "gone">("loading");
  const [progress, setProgress] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [assetCount, setAssetCount] = useState(0);

  useEffect(() => {
    const startedAt = performance.now();
    let leaveTimer = 0;
    let removeTimer = 0;
    let cancelled = false;

    const finish = () => {
      if (cancelled) return;
      setProgress(100);
      const remaining = Math.max(0, 2350 - (performance.now() - startedAt));
      leaveTimer = window.setTimeout(() => {
        setPhase("leaving");
        removeTimer = window.setTimeout(() => setPhase("gone"), 720);
      }, remaining);
    };

    const base = import.meta.env.BASE_URL;
    const warmAsset = async (path: string) => {
      const url = `${base}${path.replace(/^\//, "")}`;
      const response = await fetch(url, { cache: "force-cache" });
      if (!response.ok) throw new Error(`Unable to preload ${url}: ${response.status}`);
      await response.blob();
    };

    const preload = async () => {
      try {
        const response = await fetch(`${base}portfolio-manifest.json`, { cache: "no-cache" });
        if (!response.ok) throw new Error("Portfolio manifest is unavailable");
        const { assets } = (await response.json()) as { assets: string[] };
        setAssetCount(assets.length);
        let completed = 0;
        const queue = [...assets];
        const workers = Array.from({ length: Math.min(6, queue.length) }, async () => {
          while (!cancelled) {
            const asset = queue.shift();
            if (!asset) return;
            try {
              await warmAsset(asset);
            } catch (error) {
              console.warn(error);
            }
            completed += 1;
            if (!cancelled) {
              setLoadedCount(completed);
              setProgress(Math.round((completed / assets.length) * 100));
            }
          }
        });
        await Promise.all(workers);
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
      {assetCount > 0 && (
        <small>
          {loadedCount} / {assetCount} assets ready
        </small>
      )}
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
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
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
        <img src={stages[active].src} alt={`Raspberry fairy — ${stages[active].label} stage`} />
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

const PortfolioShowcase = () => {
  const [selectedLineart, setSelectedLineart] = useState<(typeof lineart)[number] | null>(null);
  const [nyanchiOpen, setNyanchiOpen] = useState(false);
  const [nyanchiQuiet, setNyanchiQuiet] = useState(false);
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
  }, [nyanchiOpen]);

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
    document.querySelectorAll<HTMLImageElement>("main img:not(.hero-canvas)").forEach((image) => {
      image.loading = "lazy";
      image.decoding = "async";
    });

    const videos = Array.from(document.querySelectorAll<HTMLVideoElement>("video[data-autoplay]"));
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(({ target, isIntersecting }) => {
          const video = target as HTMLVideoElement;
          if (isIntersecting && video.dataset.userPaused !== "true") {
            void video.play().catch(() => undefined);
          } else {
            video.pause();
          }
        }),
      { rootMargin: "120px 0px", threshold: 0.18 },
    );
    videos.forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (nyanchiOpen) {
      setNyanchiQuiet(false);
      return;
    }

    const artwork = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".feature-media, .kcd-hero, .process-stage, .gaz-hero, .gaz-sequence, .motion-gallery, .object-row, .red-portraits, .lineart-track, .lineart-expanded",
      ),
    );
    let frame = 0;

    const updateNyanchiMode = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const safeZone = {
          left: window.innerWidth - Math.min(390, window.innerWidth * 0.34),
          right: window.innerWidth,
          top: window.innerHeight - Math.min(470, window.innerHeight * 0.58),
          bottom: window.innerHeight,
        };
        const overlapsArtwork = artwork.some((element) => {
          const rect = element.getBoundingClientRect();
          return (
            rect.right > safeZone.left &&
            rect.left < safeZone.right &&
            rect.bottom > safeZone.top &&
            rect.top < safeZone.bottom
          );
        });
        setNyanchiQuiet(overlapsArtwork);
      });
    };

    updateNyanchiMode();
    window.addEventListener("scroll", updateNyanchiMode, { passive: true });
    window.addEventListener("resize", updateNyanchiMode);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateNyanchiMode);
      window.removeEventListener("resize", updateNyanchiMode);
    };
  }, [nyanchiOpen]);

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
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [selectedLineart]);

  return (
    <main>
      <PortfolioPreloader />
      <section className="editorial-hero" id="home">
        <img
          className="hero-canvas"
          src="/portfolio/ksok2.webp"
          alt="Two men resting in a sunlit meadow"
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
            <a href="/downloads/Fira-CG-CV.pdf" download>
              <Download /> Download CV
            </a>
            <a href="/downloads/Fira-CG-Portfolio.pdf" download>
              <Download /> Download Portfolio
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
        <a className="scroll-cue" href="#selected">
          Selected work <ArrowDownRight />
        </a>
      </section>

      <section className="manifesto section-pad" id="selected">
        <div className="manifesto-hologram" aria-hidden="true">
          <div className="manifesto-card">
            <div className="manifesto-card-face manifesto-card-front">
              <img src="/portfolio/terezina/therezina-card-front.webp" alt="" />
            </div>
            <div className="manifesto-card-face manifesto-card-back">
              <img src="/portfolio/terezina/therezina-card-back.webp" alt="" />
            </div>
          </div>
        </div>
        <Reveal>
          <p className="eyebrow">What I do</p>
          <div className="manifesto-copy">
            <p>Concept art with a painter’s eye.</p>
            <p>A production artist’s discipline.</p>
            <p>Expressive characters, readable worlds and game-ready visual ideas.</p>
          </div>
        </Reveal>
        <div className="capabilities reveal" aria-label="Jump to a discipline">
          <a href="#featured">Character design</a>
          <a href="#key-art">Key art</a>
          <a href="#objects">Props & items</a>
          <a href="#process">Visual development</a>
        </div>
      </section>

      <section className="featured-work" id="featured">
        <article className="feature feature-wide reveal">
          <div className="feature-media">
            <img
              src="/portfolio/therizina-final.webp"
              alt="Two colourful therizinosaurs in a jungle"
            />
          </div>
          <div className="feature-meta">
            <p>Creature illustration · Fan art</p>
            <h2>Therizina</h2>
            <span>Colour, atmosphere and creature storytelling</span>
          </div>
        </article>

        <div className="feature-grid section-pad">
          <article className="feature feature-portrait reveal">
            <div className="feature-media feature-video-pair">
              <div>
                <div className="card-blend-float" aria-label="Therizina holographic card">
                  <img
                    src="/portfolio/terezina/therezina-card-front.webp"
                    alt="Finished Therizina card with holographic light moving across its surface"
                  />
                </div>
                <span>Final card</span>
              </div>
              <div>
                <video
                  src="/portfolio/therizina-motion/card-process.mp4"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  data-autoplay
                  aria-label="Therizina card creation process"
                />
                <span>Making of</span>
              </div>
            </div>
            <div className="feature-meta">
              <p>Motion presentation · Process</p>
              <h3>Card in motion</h3>
              <span>A floating final card paired with its full creation process.</span>
            </div>
          </article>
          <article className="feature feature-square reveal">
            <div className="feature-media">
              <img src="/portfolio/cole-turner.webp" alt="Portrait illustration of Cole Turner" />
            </div>
            <div className="feature-meta">
              <p>Portrait · Fan art</p>
              <h3>Cole Turner</h3>
              <span>Shape, likeness and controlled colour.</span>
            </div>
          </article>
        </div>
      </section>

      <section className="kcd-case section-pad" id="key-art">
        <Reveal className="section-intro horizontal">
          <div>
            <p className="eyebrow">Key art / Kingdom Come: Deliverance</p>
            <h2>Flower field</h2>
          </div>
          <p>
            Characters, staging and a 3D-assisted paintover brought together as one narrative image.
          </p>
        </Reveal>
        <figure className="kcd-hero reveal">
          <img
            src="/portfolio/kcd/flowerfield-final.webp"
            alt="Two medieval characters in a flower field"
          />
          <figcaption>Final illustration</figcaption>
        </figure>
        <div className="kcd-process">
          {[
            ["flowerfield-blockout.png", "3D blockout"],
            ["flowerfield-paintover.png", "Paintover"],
            ["flowerfield-henry.png", "Character detail / Henry"],
            ["flowerfield-ptacek.png", "Character detail / Hans"],
          ].map(([src, title]) => (
            <figure className="reveal" key={src}>
              <img src={`/portfolio/kcd/${src}`} alt={title} />
              <figcaption>{title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <ProcessCase />

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
            <ul aria-label="Project disciplines">
              <li>Environment design</li>
              <li>Modelling & texturing</li>
              <li>Lighting & look development</li>
            </ul>
          </div>
        </Reveal>

        <figure className="gaz-hero reveal">
          <img
            src="/portfolio/gaz-station/final.webp"
            alt="Cinematic 3D gas station at night in snow"
          />
          <figcaption>
            <span>01</span> Final frame / night lighting
          </figcaption>
        </figure>
      </section>

      <section className="motion-case section-pad" id="motion">
        <div className="motion-copy reveal">
          <p className="eyebrow">Process in motion</p>
          <h2>A painting is a sequence of decisions.</h2>
          <p>Watch the image move from broad structure to light, colour and final detail.</p>
        </div>
        <div className="motion-gallery">
          {[
            ["/portfolio/ksok-process.mp4", "Process film / KSOK"],
            ["/portfolio/motion/anime-pipeline.mp4", "Storyboards to final frame"],
          ].map(([src, label], index) => (
            <CinematicVideo
              key={src}
              src={src}
              label={label}
              index={String(index + 1).padStart(2, "0")}
            />
          ))}
        </div>
      </section>

      <section className="red-interlude">
        <div className="red-copy reveal">
          <p className="eyebrow">Portrait experiments</p>
          <h2>Faces under pressure.</h2>
        </div>
        <div className="red-portraits">
          <img src="/portfolio/henry-2.webp" alt="Red monochrome male portrait" />
          <img src="/portfolio/henry-3.webp" alt="Second red monochrome male portrait" />
        </div>
      </section>

      <section className="lineart-section section-pad" id="lineart">
        <Reveal className="section-intro horizontal">
          <div>
            <p className="eyebrow">Production work</p>
            <h2>Line art</h2>
          </div>
          <p>Clean silhouettes, confident gesture and detail that survives at game scale.</p>
        </Reveal>
        <div className="lineart-track">
          {lineart.map(([src, full, title], index) => (
            <button
              className={`lineart-card reveal ${selectedLineart?.[1] === full ? "is-open" : ""}`}
              key={src}
              onClick={() =>
                setSelectedLineart((current) =>
                  current?.[1] === full ? null : ([src, full, title] as (typeof lineart)[number]),
                )
              }
              aria-expanded={selectedLineart?.[1] === full}
              aria-controls="lineart-expanded-project"
              aria-label={`Show ${title} full line art project below`}
            >
              <img src={`/portfolio/lineart/${src}`} alt={`${title} line art`} />
              <span className="lineart-caption">
                <span>{String(index + 1).padStart(2, "0")}</span>
                {title}
                <ArrowUpRight />
              </span>
            </button>
          ))}
        </div>
        {selectedLineart && (
          <article className="lineart-expanded" id="lineart-expanded-project">
            <header>
              <div>
                <p className="eyebrow">Full project / sketch to line</p>
                <h3>{selectedLineart[2]}</h3>
              </div>
              <button onClick={() => setSelectedLineart(null)} aria-label="Collapse project">
                <X />
              </button>
            </header>
            <img
              src={`/portfolio/lineart/${selectedLineart[1]}`}
              alt={`${selectedLineart[2]} full line art and sketch`}
            />
          </article>
        )}
      </section>

      <section className="social-wall section-pad" id="social">
        <Reveal className="section-intro horizontal">
          <div>
            <p className="eyebrow">Around the web</p>
            <h2>Follow the work</h2>
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
              <img src={post.src} alt={`${post.title} preview`} />
              <div>
                <span>{post.platform}</span>
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
                <strong>GAMETEQ · 2024—July 2026</strong>
                <span>2D production art and visual development.</span>
              </li>
              <li>
                <strong>DEFU Games · 2020—2023</strong>
                <span>
                  2D Artist, then Lead Artist across Love Camp, Pulse of Love, Candy Puzzle, Puzzle
                  Kingdom, Money Rush and Egg Wars.
                </span>
              </li>
              <li>
                <strong>Nordcurrent · 2018—2019</strong>
                <span>
                  Concept art, character close-ups and illustration for Murder by Choice: Mystery
                  Game.
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

      <section className="support-block section-pad" id="support">
        <img src="/portfolio/kcd/flowerfield-final.webp" alt="Flower field illustration detail" />
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

      <section className="sketchbook section-pad" id="sketchbook">
        <Reveal className="sketchbook-intro">
          <div>
            <p className="eyebrow">Notes from the margins</p>
            <h2>Sketchbook</h2>
          </div>
          <p>Small studies, kept deliberately quiet at the edge of the finished work.</p>
        </Reveal>
        <div className="sketch-grid">
          {sketches.slice(0, 6).map(([src, title]) => (
            <figure className="sketch-card reveal" key={src}>
              <img src={`/portfolio/sketchbook/${src}`} alt={title} />
              <figcaption>{title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="contact section-pad" id="contact">
        <div className="contact-main reveal">
          <p className="eyebrow">Available for selected projects</p>
          <h2>
            Have a world
            <br />
            to draw?
          </h2>
          <a href={`mailto:${profile.email}`}>
            {profile.email}
            <ArrowUpRight />
          </a>
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
            <img
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
              <img
                src="/portfolio/closer/dinosaurs-together.jpg"
                alt="Handmade dinosaur sculptures arranged on a studio table"
              />
              <figcaption>Small studio herd</figcaption>
            </figure>
            <figure className="reveal">
              <img
                src="/portfolio/closer/triceratops-process.jpg"
                alt="Triceratops clay sculpture in progress"
              />
              <figcaption>Building the form</figcaption>
            </figure>
            <figure className="reveal">
              <img
                src="/portfolio/closer/triceratops-hand.jpg"
                alt="Small handmade triceratops sculpture held in one hand"
              />
              <figcaption>Hand-sized study</figcaption>
            </figure>
            <figure className="reveal">
              <img
                src="/portfolio/closer/ankylosaur-study.webp"
                alt="Detailed handmade ankylosaur clay sculpture"
              />
              <figcaption>Armour and texture study</figcaption>
            </figure>
            <figure className="reveal">
              <img
                src="/portfolio/closer/triceratops-seated.jpg"
                alt="Small triceratops clay sculpture held in one hand"
              />
              <figcaption>Character and gesture</figcaption>
            </figure>
            <figure className="reveal">
              <img
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
            {["potion-blue.png", "potion-purple.png", "potion-green.png", "potion-red.png"].map(
              (src, index) => (
                <figure className="object-card reveal" key={src}>
                  <img src={`/portfolio/${src}`} alt={`Fantasy potion concept ${index + 1}`} />
                  <figcaption>
                    <span>0{index + 1}</span> Potion study
                  </figcaption>
                </figure>
              ),
            )}
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
                <img src={`/portfolio/analog/${src}`} alt={title} />
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
                  <img
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

        <div className="beyond section-pad closer-chapter">
          <Reveal className="section-intro horizontal">
            <div>
              <p className="eyebrow">Experiments</p>
              <h2>Beyond 2D</h2>
            </div>
            <p>Scenes, materials and small animated environments made for curiosity.</p>
          </Reveal>
          <div className="beyond-grid">
            <figure className="reveal beyond-anime">
              <video
                src="/portfolio/motion/anime-pipeline.mp4"
                muted
                loop
                playsInline
                preload="metadata"
                data-autoplay
                aria-label="Anime production pipeline"
                onTimeUpdate={(event) => {
                  if (event.currentTarget.currentTime > 3) event.currentTarget.currentTime = 0;
                }}
              />
              <figcaption>Anime pipeline / storyboard → key frame → post FX</figcaption>
            </figure>
            <figure className="reveal">
              <img
                src="/portfolio/halloween-scene.webp"
                alt="Halloween still life scene with pumpkins, candles and a cat"
              />
              <figcaption>Halloween scene / lighting & materials</figcaption>
            </figure>
            <figure className="reveal">
              <video
                src="/portfolio/motion/pixel-kitchen.mp4"
                muted
                loop
                playsInline
                preload="metadata"
                data-autoplay
                aria-label="Animated pixel-art kitchen"
              />
              <figcaption>Pixel-art game environment / animated kitchen</figcaption>
            </figure>
            <article className="browser-game reveal">
              <p className="eyebrow">Interactive fiction</p>
              <h3>A browser game built from words and choices.</h3>
              <span>Preview coming soon</span>
            </article>
          </div>
        </div>
      </section>

      <footer className="site-footer section-pad">
        <div className="contact-bottom">
          <p>
            <MapPin /> Tbilisi, Georgia
          </p>
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
            <a href={social.telegram} target="_blank" rel="noreferrer">
              Telegram
            </a>
            <a className="secondary-social" href={social.behance} target="_blank" rel="noreferrer">
              Behance
            </a>
            <a href={`mailto:${profile.email}`}>
              <Mail /> Email
            </a>
          </nav>
          <span>© {new Date().getFullYear()} Fira CG</span>
        </div>
      </footer>

      <aside
        className={`nyanchi-helper ${nyanchiOpen ? "is-open" : ""} ${nyanchiQuiet ? "is-quiet" : ""}`}
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
            <form action="https://formsubmit.co/firacgi@gmail.com" method="POST">
              <input type="hidden" name="_subject" value="Portfolio message via Nyanchi" />
              <input type="hidden" name="_captcha" value="false" />
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
              <button type="submit">
                <Send /> Send message
              </button>
            </form>
            <a className="nyanchi-telegram" href={social.telegram} target="_blank" rel="noreferrer">
              <Send /> Or message @firacg
            </a>
            <a className="nyanchi-kofi" href={payments.kofi} target="_blank" rel="noreferrer">
              Leave a coffee <ArrowUpRight />
            </a>
          </div>
        )}
        <div className="nyanchi-stage">
          <div className="nyanchi-actions" aria-label="Play with Nyanchi">
            <button onClick={() => playNyanchi("eat")} aria-label="Feed Nyanchi" title="Feed">
              <img src="/portfolio/nyanchi/ui-icons/eat_icon.png" alt="" />
            </button>
            <button
              onClick={() => playNyanchi("drink")}
              aria-label="Give Nyanchi water"
              title="Drink"
            >
              <img src="/portfolio/nyanchi/ui-icons/drink_icon.png" alt="" />
            </button>
            <button onClick={() => playNyanchi("call")} aria-label="Call Nyanchi" title="Call">
              <img src="/portfolio/nyanchi/ui-icons/call_icon.png" alt="" />
            </button>
            <button onClick={() => playNyanchi("nose")} aria-label="Pet Nyanchi" title="Pet">
              <img src="/portfolio/nyanchi/ui-icons/heart_icon.png" alt="" />
            </button>
            <button onClick={() => playNyanchi("play")} aria-label="Play with Nyanchi" title="Play">
              <img src="/portfolio/nyanchi/ui-icons/play_icon.png" alt="" />
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
            onClick={() => playNyanchi("nose")}
            aria-label="Poke Nyanchi's nose"
          >
            <img src={nyanchiImage} alt="Nyanchi, Fira's interactive desktop cat" />
          </button>
        </div>
      </aside>
    </main>
  );
};

export default PortfolioShowcase;
