# Fira CG Portfolio

Static portfolio for Fira CG, a freelance 2D artist and visual generalist.

## Development

```bash
npm ci
npm run dev
```

Production build:

```bash
npm run build
```

The portfolio content and media are bundled from the repository. It has no CRM,
database, authentication, or required environment variables. Add portfolio media
under `public/portfolio/` or static gallery work under `src/assets/works/`.

Deployment is handled by `.github/workflows/deploy-pages.yml`.
