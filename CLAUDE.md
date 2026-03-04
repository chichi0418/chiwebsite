# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start local dev server (Vite HMR)
npm run build     # TypeScript check + production build → dist/
npm run lint      # ESLint check
npm run preview   # Preview production build locally
```

No test framework is set up. There are no test files.

## Deployment

Pushing to `main` triggers GitHub Actions (`.github/workflows/deploy.yml`) which builds and deploys to GitHub Pages at:
**https://chichi0418.github.io/chiwebsite/**

The Vite base path is hardcoded as `/chiwebsite/` in `vite.config.ts`. Asset paths in page components also use the hardcoded prefix `/chiwebsite/assets`.

## Architecture

**React 19 + TypeScript SPA** with client-side routing via React Router (`basename="/chiwebsite"`).

### i18n
All UI text lives in `src/i18n.ts` as inline JS objects — there are no separate locale JSON files. Two languages: `zh` (default fallback) and `en`. To add/change text, edit the `resources` object in that file. Language is auto-detected from the browser.

### Pages & Routing
Routes defined in `src/App.tsx`. Current pages: Home, About, Projects, Awards.
Each page has a co-located CSS file (`PageName.css` in `src/pages/`).

### CSS Architecture
- `src/index.css` — global reset, CSS custom properties (brand colors, gradients, shadows, `--font-mono`)
- `src/App.css` — legacy unused `.app-body` animation; `.container`/`.button-circle` classes from the old HW1 (kept for reference)
- `src/pages/About.css` — also used by any page that shares the `about-page` / `about-card` layout; contains `.hs-header` and `.dept-header` gradient variants

Key CSS variables defined in `:root` (use these instead of hardcoding):
- `--color-primary: #fe6cc4` (pink)
- `--color-secondary: #6cd9fe` (cyan)
- `--gradient-brand`, `--gradient-brand-reverse`
- `--shadow-card`, `--shadow-hover`
- `--font-mono` (monospace stack for code-style elements)

### Assets
Static files in `public/assets/` — images are JPG/WebP/PNG. No image optimization pipeline exists; images are served as-is.

### Legacy
`legacy/` contains the original static HTML homework (HW1). Not part of the React app.
