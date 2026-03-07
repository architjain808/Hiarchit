# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Archit Jain, built with **Angular 19 + SSR (prerendering)**, deployed to GitHub Pages at `https://architjain808.github.io/Hiarchit/`.

## Commands

```bash
npm start           # Dev server at localhost:4200 (no base href, hot reload)
npm run build       # Production build with prerender → dist/hiarchit/browser/
npm test            # Unit tests via Karma
node dist/hiarchit/server/server.mjs  # Run SSR server locally after build
```

The production build automatically prerenders all routes (currently just `/`) and sets `baseHref: /Hiarchit/`.

## Architecture

**Single-page portfolio with full-screen sections, implemented as standalone Angular 19 components with SSR prerendering for SEO.**

```
src/app/
  app.component.*          # Root shell — GSAP preloader, resume floating button
  components/
    hero/                  # Section 1: animated headings, 3D parallax shapes, floating badge
    about/                 # Section 2: profile photo, bio, education, skills marquee
    experience/            # Section 3: work history, sticky heading, timeline divider
    projects/              # Section 4: project cards, curtain reveals, parallax images
    custom-cursor/         # Fixed custom cursor (dot + follower ring), browser-only
    code-background/       # Fixed animated typing-effect background, browser-only
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

**GSAP animation pattern** — used in every component:
```typescript
private ctx!: gsap.Context;

ngAfterViewInit() {
  if (isPlatformBrowser(this.platformId)) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    this.initAnimations();
  }
}

private initAnimations() {
  this.ngZone.runOutsideAngular(() => {
    this.ctx = gsap.context(() => { /* animations here */ });
  });
}

ngOnDestroy() { this.ctx?.revert(); }
```

**prefers-reduced-motion:** Every component checks `window.matchMedia('(prefers-reduced-motion: reduce)').matches` before running GSAP. Return early if true. Also globally overridden in `styles.scss`.

**Bootstrap `.text-primary` conflict:** Bootstrap's `.text-primary` class renders blue, overriding our `--text-primary: #1a1a1a`. Fix pattern: add a local SCSS override in the component — `.text-primary { color: var(--text-primary) !important; }`. Do NOT use `.text-primary` for dark text — use the local override or remove the Bootstrap class.

**Curtain reveal pattern** (used in projects): A `div.img-curtain` fills the image container with `var(--accent-primary)` background. GSAP animates `y: '-101%'` on scroll, sliding it off the top to reveal the image beneath. The container must have `overflow: hidden`.

**Overflow-hidden heading reveal** (used in about + projects): Wrap heading in `<div class="overflow-hidden">`, then GSAP `from y: '110%'` — heading rises up from behind the clip.

**Lenis smooth scroll:** `@studio-freight/lenis` is included. Initialise browser-only with SSR guard.

**Asset paths:** All images in `public/assets/images/`. Reference as `assets/images/filename.svg`.

**Responsive:** `.web-view` / `.mob-view` toggle visibility. Breakpoints: 768px (mobile), 992px (tablet).

## Style Architecture — Design Tokens (`src/styles.scss`)

```
Colors:   --bg-primary (#F4F4F0) | --bg-secondary (#fff) | --text-primary (#1a1a1a)
          --text-secondary (#5a5a5a) | --accent-primary (#9AD741) | --color-surface (#e5e5e5)
Fonts:    --font-heading: 'Outfit' | --font-body: 'Inter'  (Google Fonts CDN in index.html)
Duration: --dur-fast (150ms) | --dur-normal (300ms) | --dur-slow (600ms) | --dur-dramatic (1000ms)
Easing:   --ease-spring | --ease-out | --ease-in-out | --ease-elastic
```

Global keyframes defined in `styles.scss`: `fadeIn`, `slideUp`, `slideInLeft`, `scaleIn`, `float`, `signatureReveal`, `pulseRing`, `rotateSlow`, `growWidth`, `scrollBounce`.

Icons: Font Awesome 6 via CDN in `index.html`. Do not use `lucide-angular` (installed but not used).

## GitHub Pages Deployment

1. Repo Settings → Pages → Source: **GitHub Actions**
2. Push to `main` triggers `.github/workflows/deploy.yml`
3. Workflow builds and deploys `dist/hiarchit/browser/`
