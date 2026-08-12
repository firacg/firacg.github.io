# Security review — Fira CG portfolio

Date: 2026-08-12

## Executive summary

The published application is a static React portfolio with no database, CRM,
authentication, cookies, user accounts, or privileged API credentials. No
critical, high, or medium application-security findings remain after the
cleanup. `npm audit` reports zero known dependency vulnerabilities.

## Resolved findings

### SEC-001 — Supabase client and exposed data model

- Severity: High (resolved)
- Location: former `src/integrations/supabase/`, admin routes, hooks, and
  `supabase/schema.sql`
- Evidence: the entire integration, CRM UI, authentication code, database
  queries, SQL schema, and dependency were removed.
- Impact: the public client no longer exposes database endpoints, query shapes,
  authentication flows, or write surfaces.
- Fix: portfolio data is now bundled statically from the repository.

### SEC-002 — Environment file tracked by Git

- Severity: Medium (resolved for the current tree)
- Location: `.env`, `.gitignore`, `.env.example`
- Evidence: `.env` is removed; `.env` and `.env.*` are ignored while
  `.env.example` is explicitly retained.
- Impact: future local environment values cannot be committed accidentally.
- Historical note: old commits contain only a Supabase publishable key. No
  `service_role`, `sb_secret_`, or service-role variable marker was found in
  repository history.

### SEC-003 — Vulnerable transitive build dependencies

- Severity: High (resolved)
- Location: `package-lock.json`
- Evidence: vulnerable versions of `brace-expansion`, `js-yaml`, and `nanoid`
  were upgraded with compatible lock-file updates. A fresh `npm audit` returns
  zero vulnerabilities.
- Impact: removes known denial-of-service issues from the dependency tree.

### SEC-004 — Unused raw style injection component

- Severity: Low (resolved)
- Location: former `src/components/ui/chart.tsx`
- Evidence: the unused chart component containing `dangerouslySetInnerHTML`
  was deleted.
- Impact: removes an unnecessary HTML/style injection sink from the codebase.

## Verification

- No `eval`, string-to-code execution, raw user HTML, arbitrary redirect,
  postMessage handler, token storage, or credentialed cross-origin request.
- External links that open new tabs use `rel="noreferrer"`.
- Portfolio images and expanded Line art media were checked in the browser;
  no broken `<img>` elements remained.
- Production build and ESLint complete without errors.

## Residual considerations

- The contact form posts directly to FormSubmit. This is an intentional
  third-party form processor and should remain limited to non-sensitive project
  enquiries.
- GitHub Pages controls response headers. Repository-side security headers are
  therefore limited compared with a configurable CDN or application server.
