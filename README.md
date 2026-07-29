# Fira CG — portfolio site

Portfolio + lightweight CRM for Fira CG (Dariya Dovhenko), a solo 2D game
concept artist. One-page public site (Hero → Process → Featured → Gallery →
Experience/About → Contact) plus a `/blog` and a login-gated `/admin` for
managing works, commission requests and articles.

Built with [Lovable](https://lovable.dev) — connected to this GitHub repo, so
pushes to `main` deploy automatically.

## Stack

- **TanStack Start** (SSR, file-based routing under `src/routes/`)
- **React** + **TypeScript**
- **Tailwind CSS v4** (`src/styles.css` — design tokens as CSS custom
  properties, see [Design system](#design-system) below)
- **Supabase** — Postgres + Auth + Storage for the CRM (schema in
  `supabase/` and `firacghandoff/handoff/supabase-schema.sql`)
- **bun** is the intended package manager (`bun.lock`, `bunfig.toml`). npm
  works too if bun isn't available, but don't commit `package-lock.json`
  alongside `bun.lock`.

## Development

```sh
bun install && bun run dev
# or, if bun isn't available:
npm install && npm run dev
```

Copy `.env.example` to `.env` (or `.env.local`) and fill in the Supabase
`VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` (Project Settings → API in the
Supabase dashboard — both values are safe to expose client-side, they're
protected by Row Level Security, not secrecy). Without them the site still
runs using the static fallback data below.

## Data model

Portfolio pieces (`works`) load from Supabase when configured, falling back
to `src/assets/works/<category>/` (drop an image file in, no code change
needed — see the `README.md` in each of those folders) when Supabase isn't
reachable or empty. Categories are defined in `src/data/works.ts`
(`plarium` / `early` / `pet-projects` — internal values, public-facing
labels are friendlier, see that file).

Three Supabase tables total, all RLS-protected (public read, authenticated
write): `works`, `commission_requests` (the public commission form → `/admin`
lead pipeline), `articles` (the `/blog` CMS). Full schema:
[`supabase/schema.sql`](./supabase/schema.sql).

## Design system

The current visual direction — **Studio Gallery**: near-black canvas
(`#121212`), one flat accent color (Signal Pink `#FF0045`, no gradients or
glow), Montserrat for headings / Inter for body — is documented in full at
[`design/visual-style.md`](./design/visual-style.md).

How that system maps onto this site's actual page sections and components
(Hero, BeforeAfter, BestWorks, Gallery, CVTimeline, SocialContact) is in
[`design/portfolio-structure.md`](./design/portfolio-structure.md), including
a list of known placeholder content (draft bio, generic case-study
descriptions, mismatched before/after image pair) that still needs Dariya's
real input before this is considered finished.

## Structure

```
src/
  routes/            file-based routes (index, blog, admin/*)
  components/        page sections (Hero, Gallery, BestWorks, ...)
  components/admin/   CRM screens
  components/ui/      shadcn-style primitives (button, dialog, ...)
  data/               static profile/CV/works data + Supabase fallbacks
  hooks/              useWorks, useArticles, useAuth, ...
  integrations/supabase/  Supabase client
design/               design system + structure docs (this session's work)
supabase/schema.sql   Supabase schema (tables, RLS policies, storage bucket)
```

## Deployment

This repo is connected to a live Lovable project — `git push` to `main`
deploys automatically, no separate build/deploy step needed.
