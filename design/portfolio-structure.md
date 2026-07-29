# Fira CG — portfolio structure rework

Companion to [`visual-style.md`](./visual-style.md) (Studio Gallery direction,
Signal Pink #FF0045 accent). This document maps the structural/UX patterns
learned from 8 reference studio portfolios onto Fira's actual page and
component structure. **Visual/structural only — no changes to Supabase
schema, routes, or CRM logic.** See `firacghandoff/handoff/HANDOFF.md` for
what must stay functionally untouched.

Existing route: `src/routes/index.tsx` renders `IndexPage.tsx`, which stacks
these sections in order: `Navigation` → `Hero` (#home) → `BeforeAfter`
(#process) → `BestWorks` (#featured) → `Gallery` (#gallery) → `CVTimeline`
(#timeline) → `SocialContact` (#contact). The plan below keeps this same
component list and section order (so anchor links / nav don't break) and
describes what changes *inside* each block.

## Cross-site lesson recap (why these changes)

- Filterable image grid + lightbox is the universal skeleton — Fira already
  has this in `Gallery.tsx` (categories: plarium/early/pet-projects). Keep the
  mechanism, restyle the tile.
- Every reference site treats "who is behind this work" as a first-class
  trust element (team page, client logos, stat counters) — for a solo artist
  this collapses into one small, honest bio/credentials block, not a wall of
  fake corporate signals.
- In-image caption overlays (title + category scrim at the bottom of the
  thumbnail) read as premium and save vertical space vs. a caption row below
  the image.
- Named, described case-study cards (Twin Win, Whimsy) work better than a
  plain image carousel for `BestWorks` — a sentence of context per piece.
- Contact/commission is treated as a heavy, dedicated block everywhere, never
  a footer afterthought — `SocialContact` + `CommissionForm` already do this;
  mainly a restyle, not a restructure.

## Section-by-section plan

### Navigation (`Navigation.tsx`)
- Sticky, translucent dark bar (`rgba(18,18,18,0.85)` over `--b-bg`), blurs
  legibly over the hero/gallery as the page scrolls — pattern seen on Melior
  Games.
- Wordmark in Montserrat 800; nav links in Inter caption style, uppercase,
  small tracking. Active section indicated by Signal Pink underline, not a
  filled pill (keep chrome quiet, per the "one accent" rule).

### Hero (`Hero.tsx`) — `#home`
- Keep it short, no stat-counter wall (Fira doesn't have "1000+ games
  shipped" scale numbers, and faking that register reads as corporate/false).
  Instead: headline + one-sentence pitch (already in `CONTENT.md`) + a single
  CTA ("View portfolio" → `#gallery`, or "Commission me" → `#contact`).
- One quiet trust line under the CTA instead of a logo strip: e.g. "Game art
  for Plarium's Throne: Kingdom at War and Vikings: War of Clans" — reusing
  the existing `works` category/project data, not new content.
- Motion: the one deliberate cinematic gesture on the whole site — slow
  3-4s background zoom on a hero illustration, per `visual-style.md`.

### Process (`BeforeAfter.tsx`) — `#process`
- Keep the sketch → final mechanism as-is (it's a genuinely distinctive block
  none of the 8 references have — a differentiator, not something to dilute).
  Restyle only: charcoal panel background, hairline border, Signal Pink for
  the slider handle/active state instead of the current magical-glow.

### Featured (`BestWorks.tsx`) — `#featured`
- Structural change: convert from a plain image carousel to short
  **case-study cards** (Twin Win / Whimsy pattern) — each card: image + title
  + one-sentence description of the project and Fira's role (e.g. "Character
  designs for Throne: Kingdom at War — 12 playable heroes"). Data already
  fits the existing `works` table (`title`, `project`, `category`); the
  one-sentence description can be authored per featured piece, no schema
  change needed (or, if useful later, `project` field can double as that
  description — confirm with Fira before adding a new column).
- Carousel mechanics unchanged (arrows/swipe), just restyle to dark
  panel + pink accent on active dot/arrow.

### Full Gallery (`Gallery.tsx`) — `#gallery`
- Filter bar: keep the existing flat single-row category buttons (already
  matches the universal genre pattern — no nested taxonomy needed). Active
  filter = Signal Pink fill instead of the current "magical" variant.
- Grid: switch tile treatment from a plain image to the **in-image caption
  overlay** pattern (Melior Games) — bottom-third dark gradient scrim with
  the work's title (Inter 500, white) and category tag (Inter 500 uppercase,
  Signal Pink, small). This uses fields already in the `works` table
  (`title`, `category`) — no new data needed.
- Preserve native aspect ratio per tile (masonry-style layout), not a forced
  crop — important for concept art where composition matters (see
  `visual-style.md` "avoid" list).
- Lightbox on click: already implemented (`ZoomIn`/`X` icons in the current
  component) — just restyle the scrim/chrome to match the dark palette.

### CV / About (`CVTimeline.tsx`) — `#timeline`
- Keep the timeline mechanism (existing CV data from `CONTENT.md` — GAMETEQ,
  DEFU Games, Nordcurrent, etc.), but add a short personal intro block above
  it: a one-paragraph "About Fira" bio + (optional) a photo, functioning as
  the "who you're actually working with" trust element that Twin Win Games
  gives its named team members — scaled down to one person. This is new copy
  (needs a short bio from Fira) but no new data infrastructure.

### Contact (`SocialContact.tsx` + `CommissionForm.tsx`) — `#contact`
- No structural change — this block already does what the references treat
  as essential (dedicated section, not a footer link): contact info, socials,
  commission process/restrictions, and the request form + Ko-fi/PayPal
  buttons.
- Restyle only: form fields on charcoal panels with hairline borders, submit
  button in Signal Pink, "How commissions work" panel gets a quiet numbered
  list (this one is a genuine ordered process, so numbering is warranted,
  unlike decorative "01/02/03" card labels seen on some references).

### Blog (`BlogList.tsx`, `BlogPostView.tsx`)
- Out of scope for the studio-portfolio pattern language (no reference site
  had a blog) — just inherit the same color/type tokens from
  `visual-style.md` for consistency (dark canvas, Montserrat headings, Inter
  body) without adopting gallery-specific patterns (no image grid needed
  here).

### Admin (`/admin/*`)
- Not part of this visual system — CRM should stay a plain, functional
  utility UI. Do not apply the gallery/hero treatment there; at most, inherit
  the base color tokens for visual consistency when the admin is viewed
  right after the public site.

## What's intentionally NOT changed

- Supabase schema (`works`, `commission_requests`, `articles`) — untouched.
- Existing category taxonomy (plarium / early / pet-projects) — kept as the
  filter values; only the filter button's visual state changes.
- Routing structure and section anchor IDs — kept identical so nothing
  currently linking to `#gallery`, `#contact`, etc. breaks.
- The lightbox and sketch/before-after mechanisms — kept, only restyled.

## Status (2026-07-29)

Implemented in code, pending your review in a running dev server:

1. **Sitewide reskin applied** — `styles.css` tokens switched from the old
   arcane/magical palette to Studio Gallery (`#121212` canvas, Signal Pink
   `#FF0045` as the one accent), all gradient/glow utilities removed, button
   variants repointed to flat styles. Montserrat (headings) + Inter (body)
   loaded via Google Fonts in `__root.tsx`.
2. **Vertical before/after slider** — `BeforeAfter.tsx` rewritten as a
   drag-to-reveal vertical slider (pointer events + `clip-path`, no new
   dependency). Currently using a placeholder crop of the existing
   `before-after.jpg` (which is a side-by-side sketch/final image, not a
   matched pair) — swap in two full-frame images of the same piece for the
   real version.
3. **Featured → case-study cards** — `BestWorks.tsx` now shows project tag +
   title + a one-line description per slide. Descriptions currently fall back
   to a generic per-category blurb in `works.ts` (`categories[].description`)
   — replace with a specific line per featured piece when ready.
4. **About block** — added above the CV timeline in `CVTimeline.tsx`, using
   `about-photo.jpg` (copied from the old asset folder) and a rewritten bio
   in `profile.ts` (`profile.bio`) — deliberately not reusing the old CV's
   generic "detail-oriented... passionate about... many other things"
   phrasing. Marked as a draft — your own wording should replace it.
5. **Filter labels renamed** — `plarium` → "Клиентские работы", `pet-projects`
   → "Личные проекты" in `works.ts` (category values/schema unchanged).

## Remaining open items

1. Real matched sketch/final image pair for the vertical slider (see #2
   above).
2. A real hero background illustration — `Hero.tsx` currently reuses
   `before-after.jpg` as a dimmed backdrop, which is also a placeholder.
3. Per-piece `BestWorks` descriptions to replace the generic fallback.
4. Your own bio wording to replace the drafted paragraph in `profile.ts`.
5. Not yet run: `bun install && bun run dev` in this environment (bun isn't
   available here) — please verify visually before treating this as final.
