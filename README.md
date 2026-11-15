# Byesplus — company website

Marketing site for **Byesplus** — *Less complexity. Plus intelligence.*
A software and AI studio: AI & automation, software, web, mobile, design, video and search growth.

## Stack

React 19 · TypeScript · Vite 6 · Tailwind CSS v4 · Motion · GSAP + Lenis (smooth scroll) · three.js / React Three Fiber (background scene) · lucide-react

## Run locally

```bash
npm install --legacy-peer-deps
npm run dev
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server on port 3000 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build |
| `npm run lint` | TypeScript check (`tsc --noEmit`) |

## Structure

```
src/
  data/companyData.ts   All copy, services, process, FAQs — single source of truth
  sections/             One file per page section, composed in App.tsx
  components/           Nav, Footer, BrandLogo, Decor (PlusField/SectionHeading), Cursor…
  components/3d/        Background plus-lattice scene + CSS fallback
  lib/                  Smooth scroll, reveal/mask animation primitives
  index.css             Design tokens (@theme) and component classes
brand/                  OG + LinkedIn banner images and their HTML sources
```

**Content lives in `src/data/companyData.ts`.** Services, process steps, engagement
models, FAQs and company details are all data — edit there, not in the components.

## Contact form

Posts to [Formspree](https://formspree.io). Set the form id with an env var:

```
VITE_FORMSPREE_ID=your_form_id
```

Without it the build falls back to the id currently hard-coded in
`src/sections/Contact.tsx`.

## Brand

- Navy `#1b2a36` · ink `#070d13` · emerald signal `#10a06b` / `#1fd394` · mist `#eef3f1`
- Type: Plus Jakarta Sans (display + body), JetBrains Mono (labels)
- The `+` from the wordmark is the recurring graphic device: background fields,
  list bullets, section eyebrows and the 3D background objects.

Regenerate the social images by opening `brand/og-source.html` or
`brand/linkedin-banner-source.html` at 1200×630 / 1584×396 and exporting a screenshot.

## Deployment

Deployed on Vercel. The production domain is set in two places —
`COMPANY_INFO.siteUrl` in `src/data/companyData.ts` and the `canonical` / `og:url`
tags in `index.html`.
