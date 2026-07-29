---
name: "Fira CG — Painted Dark Studio"
version: "1.0"
tags:
  - game concept art portfolio
  - dark UI
  - solo artist
  - 2D character/environment art
author: "Extracted & synthesized for Fira CG (Dariya Dovhenko)"
source_url: ""
created: "2026-07-29"

style_prompt_short: >
  A near-black gallery canvas that lets painted game-art colors do the talking,
  with one flat signal-pink accent, bold uppercase display type, and a single
  quiet cinematic hover-zoom moment on the hero. Studio-grade confidence,
  one-person intimacy.

style_prompt_full: >
  Dark, gallery-like game-concept-art portfolio for a solo 2D artist. Canvas is
  near-black (#121212) everywhere — hero, portfolio grid, footer — because
  colorful painted character/environment art reads best against dark, not white.
  Panels and cards sit one shade up on a charcoal (#1B1B22) with hairline
  (#2A2A33) borders, never a hard box-shadow. Exactly ONE saturated accent
  color is used across the whole site: Signal Pink (#FF0045) — reserved for
  the primary CTA button, the active filter-tab state, link hover, and small
  highlight accents. Never introduce a second bright color; everything else is
  black/white/gray. Headings use Montserrat at weight 800, uppercase, tight
  tracking (-1 to -2%) — confident, condensed, studio-poster energy. Body copy
  and UI labels use Inter at weight 400 (body) / 500 (captions/buttons),
  sentence case, generous line-height (1.6) — quiet and legible, letting
  Montserrat headings carry all the shouting. The portfolio grid is a
  responsive masonry wall (1 column mobile, 2 tablet, 3-4 desktop, 16-20px
  gutters) that preserves each artwork's NATIVE aspect ratio — never force-crop
  a character portrait or wide environment painting into a uniform tile, that
  destroys composition. Each tile shows its title and category as white text
  sitting in a soft dark gradient scrim across the bottom third of the image —
  no separate caption row eating vertical space. A flat single-row filter bar
  sits above the grid (no nested dropdown menus); the active tab is underlined
  or filled in Signal Pink. Motion is fast and quiet everywhere — 0.3-0.4s
  hover zoom (scale 1.04) on grid tiles, 250ms cross-fade on filter switches,
  a soft 8px-translate fade-in as sections scroll into view — except for ONE
  deliberate slow cinematic moment: a 3-4 second slow Ken-Burns zoom on the
  hero background image only, giving the site a single "breathing" gesture
  instead of moving everywhere. Clicking any tile opens a fullscreen lightbox
  (dark scrim, fade+scale-in ~300ms) rather than navigating away. The overall
  mood is painterly, atmospheric, confident but personal — a solo artist's
  gallery, not a corporate SaaS product. The pink accent is a deliberate
  bridge to Fira's existing brand (the old theme's "ethereal pink" gradient
  stop) carried into the new, calmer system as the one surviving color. Avoid:
  gradient-filled accents or glow/blur effects (the old theme's signature —
  this system uses the pink as a single flat fill, never a gradient or glow),
  bouncy/elastic easing, forced-crop image tiles, dense stat-counter walls or
  client-logo strips (replace with a short honest "notable projects" line),
  and a light/white theme as the default surface — white is reserved only for
  isolated text-dense contexts if ever needed.

colors:
  primary:
    - name: "Void Black"
      hex: "#121212"
      role: "dominant page background — hero, gallery, footer, nav"
    - name: "Paper White"
      hex: "#F5F4F2"
      role: "primary text on dark surfaces; off-white, not pure white, for warmth"
  accent:
    - name: "Signal Pink"
      hex: "#FF0045"
      role: "the ONE accent — primary CTA button, active filter tab, link hover, key highlights"
  neutral:
    - name: "Charcoal Panel"
      hex: "#1B1B22"
      role: "cards, panels, form fields — one step up from the void-black canvas"
    - name: "Line Gray"
      hex: "#2A2A33"
      role: "hairline borders, dividers — never a drop shadow"
    - name: "Slate Gray"
      hex: "#8A8A99"
      role: "secondary/muted text — captions, metadata, placeholder text"

typography:
  display:
    family: "Montserrat"
    weight: "800"
    style: "uppercase, tight tracking (-1% to -2% at 32px+), used for H1/H2/section titles and nav wordmark"
  body:
    family: "Inter"
    weight: "400"
    style: "sentence case, 1.6 line-height, comfortable reading for bio/process/blog copy"
  caption:
    family: "Inter"
    weight: "500"
    style: "small, uppercase, wide-ish tracking — filter tabs, category tags, form labels, footer links"
  rules:
    - "Only two font families total: Montserrat (display) + Inter (body/caption) — never introduce a third"
    - "Uppercase is reserved for headings, labels, and buttons — never uppercase full paragraphs"
    - "Tight letter-spacing only applies at 32px+ display sizes; body/caption keep default tracking"

layout:
  grid: "Content max-width 1280px. Portfolio grid: responsive masonry — 1 col mobile, 2 col tablet, 3-4 col desktop, 16-20px gutters"
  alignment: "Left-aligned text blocks throughout; section titles may center only in the Hero"
  aspect_ratio: "Native — every artwork keeps its real aspect ratio, never force-cropped to a uniform tile"
  notes:
    - "Dark canvas is the default everywhere on the public site (hero, gallery, footer); do not introduce a white section unless a future need for dense long-form text truly requires it"
    - "In-image caption overlay: title + one category tag sit inside a bottom-third gradient scrim on each thumbnail — no separate caption strip below the image"
    - "Filter bar is a single flat row of tag buttons above the grid — no nested/hierarchical dropdown menus (this is a solo portfolio, not a multi-service agency)"
    - "Sticky header: translucent dark bar (~80% opacity over #121212) so nav stays legible while scrolling through colorful art without a hard visual seam"
    - "Panels/cards use a hairline border (#2A2A33), never a box-shadow — keeps the flat, print-poster feel"

motion:
  transitions:
    - "grid tile hover: scale(1.04), 0.3-0.4s ease-out"
    - "filter tab switch: 250ms cross-fade of grid contents"
    - "section scroll-reveal: fade-in + 8px translateY, ~400ms, triggered once per section"
    - "lightbox open/close: fade + scale-in, ~300ms"
    - "hero background: one slow 3-4s Ken-Burns zoom — the single cinematic gesture on the whole site"
  animation_style: >
    Fast and quiet everywhere (0.25-0.4s, ease-out, no bounce/elastic curves)
    except one deliberate slow moment on the hero image. Motion should never
    call attention to itself outside of that one hero gesture — it's there to
    make interaction feel responsive, not to entertain.
  pacing: "Quick and confident, with exactly one slow cinematic beat reserved for the hero"

mood:
  keywords:
    - "painterly"
    - "atmospheric"
    - "confident"
    - "personal"
    - "professional"
  era: "contemporary (2020s game-industry portfolio)"
  cultural_reference: "Genre convention of game-art outsourcing studio portfolios (Stepico, Kevuru Games, Whimsy Games) crossed with the quieter, single-artist restraint of Nuare Studio and Ulysses Graphics — studio-grade polish at one-person scale"
  avoid:
    - "gradient or glow treatments on the accent color (the old theme's signature — the new system keeps pink as a flat, single fill)"
    - "purple or cyan as a second accent color (the default in this genre — Signal Pink stays the ONE accent)"
    - "bouncy/elastic easing or playful micro-interactions"
    - "force-cropping artwork into uniform aspect-ratio tiles"
    - "dense stat-counter walls or client-logo strips sized for an agency, not a freelancer"
    - "a light/white theme as the default surface anywhere on the public site"

assets:
  reference_images: []
  gsep_elements: []
  html_snippets: []
  color_palette_image:
    url: ""
---

## Design Principles

The art is the brand — the UI should recede into a dark, quiet canvas and let
painted color carry every visual moment. One accent color, used sparingly,
does more work than five. Every "studio-scale" convention borrowed from the
reference sites (trust strips, stat counters, team blocks, nested filters) is
deliberately downsized to what one person can honestly claim: a short "notable
projects" line instead of client logos, a single About/bio block instead of a
team page, a flat one-row filter instead of a three-level taxonomy. Motion
should be nearly invisible except for one cinematic beat on the hero — quiet
confidence, not a showreel of animation tricks.

## Connectors

### HTML Slides
Map `colors.primary`/`accent`/`neutral` to CSS custom properties
(`--bg`, `--fg`, `--accent`, `--panel`, `--border`, `--muted`). Load
Montserrat 800 and Inter 400/500 from Google Fonts. Use `typography.display`
for h1/h2, `typography.caption` for nav/filter/button labels.

### Figma
Build color styles from `colors.*` directly (6 colors total — deliberately
small palette). Text styles: Display/H1 (Montserrat 800, tight tracking),
Body (Inter 400), Caption (Inter 500, uppercase). Component candidates:
filter-tab (pill or underline, active = accent), gallery-tile (image + bottom
scrim + title/category), CTA button (accent fill, dark text or white text —
check contrast).

## Extraction Notes

Synthesized on 2026-07-29 from a structural/visual audit of 8 game-art studio
and outsourcing portfolio pages, conducted via two parallel research passes
(browser DOM inspection + computed-style extraction, not full visual
screenshots):

- https://blacksteinn.com/conceptart
- https://whimsygames.co/portfolio/
- https://twinwingames.com/project/
- https://meliorgames.com/portfolio/
- https://stepico.com/art/
- https://nuare.com/art-outsourcing/
- https://ulysses-graphics.com/portfolio/
- https://kevurugames.com/game-art/2d-art/

Cross-site patterns that shaped this style: dark/near-black canvas dominant in
6 of 8 sites; exactly one saturated accent color used sparingly for CTAs/active
states in the sites that use color at all; bold uppercase sans-serif display
type (Montserrat/Inter/Geologica/Roboto Condensed) universal, no serif
anywhere; filterable image-grid + lightbox-on-click structure universal;
hover-zoom on thumbnails near-universal (0.26s-0.4s in the fast cases, one
outlier at a deliberate 4s slow zoom on Nuare's hero-less grid). This style
deliberately diverges from Ulysses Graphics' forced 16:9 crop (bad fit for
concept art where composition matters) and keeps native aspect ratios instead
(closer to Blacksteinn/Melior's approach). See `design/portfolio-structure.md`
in this repo for how these patterns map onto Fira's actual page/block
structure.
