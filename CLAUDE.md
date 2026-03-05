# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Archit Jain, built with **Angular 19 + SSR (prerendering)**, deployed to GitHub Pages at `https://architjain808.github.io/Hiarchit/`.

## Commands

```bash
npm start           # Dev server at localhost:4200 (no base href, hot reload)
npm run build       # Production build with prerender → dist/hiarchit/browser/
npm test            # Unit tests via Karma
node dist/hiarchit/server/server.mjs  # Run SSR server locally
```

The production build automatically prerenders all routes (currently just `/`) and sets `baseHref: /Hiarchit/`.

## Architecture

**Single-page portfolio with 3 full-screen sections, implemented as standalone Angular 19 components with SSR prerendering for SEO.**

```
src/app/
  app.component.*          # Root shell — initializes Swiper (desktop only, browser-only)
  components/
    hero/                  # Section 1: banner SVGs + social links
    about/                 # Section 2: profile, bio, education, skills grid
    experience/            # Section 3: work history + projects
    code-background/       # Fixed animated background (browser-only, typing effect)
  services/
    seo.service.ts         # Sets Meta/Title tags at runtime (SSR-compatible)
public/
  assets/images/           # All SVG/PNG assets (served at /assets/images/*)
  404.html                 # GitHub Pages SPA redirect
  robots.txt / sitemap.xml # SEO
.github/workflows/
  deploy.yml               # Auto-deploy to GitHub Pages via Actions on push to main
```

## Key Patterns

**SSR / Browser guard:** Any DOM/window access must be guarded:
```typescript
private platformId = inject(PLATFORM_ID);
if (isPlatformBrowser(this.platformId)) { /* browser-only code */ }
```

**Swiper (v12):** Lazy-loaded via dynamic `import('swiper')` in `AppComponent.ngAfterViewInit`. Only initialized when `window.innerWidth > 768`. On mobile, Swiper is disabled and CSS overrides (`overflow-y: auto`, `height: auto`) enable normal scroll.

**Asset paths:** All images live in `public/assets/images/`. Reference them as `assets/images/filename.svg` in templates (Angular resolves relative to base href).

**Responsive:** `.web-view` / `.mob-view` CSS classes toggle visibility. Breakpoints: 768px (mobile) and 992px (tablet).

## SEO Implementation

- `src/index.html`: Static meta tags, JSON-LD Person schema, canonical URL, Open Graph, Twitter Card
- `SeoService`: Dynamically updates Meta/Title via Angular's platform-browser services (runs on server during prerender, so tags appear in static HTML)
- Prerendered HTML at `dist/hiarchit/browser/index.html` contains all meta tags — fully crawlable without JS

## GitHub Pages Deployment

GitHub Pages must be configured to use **GitHub Actions** (not a branch):
1. Repo Settings → Pages → Source: **GitHub Actions**
2. Push to `main` triggers `.github/workflows/deploy.yml`
3. Workflow builds and deploys `dist/hiarchit/browser/` to Pages

For local production build verification: `npm run build` then serve `dist/hiarchit/browser/` with any static server.

## Style Architecture

- `styles.scss`: Global styles + Bootstrap import + responsive breakpoints + utility classes (`.heading-text`, `.secondary-text`, `.web-view`, `.mob-view`, `.starts`, `.fw-600`, background animation)
- `app.component.scss`: Swiper/section layout + floating resume button
- Component-level `.scss`: Section-specific styles only
- Brand accent: `#9ad741` (green) | Text: `#231f20` | Background: `#ececec`
- Fonts: **Kalnia** (headings) + **Lato** (body) via Google Fonts CDN
