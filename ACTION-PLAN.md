# SEO Action Plan: hiarchit.online
**Generated:** March 9, 2026
**Overall Score:** 43/100 → Target: 78/100

---

## PHASE 1 — CRITICAL (Fix Today, < 2 Hours Total)

### Fix #1: Add Canonical Tag 🔴
**File:** `src/index.html` (Angular project)
**Time:** 2 minutes
```html
<!-- Add inside <head> -->
<link rel="canonical" href="https://hiarchit.online/">
```

---

### Fix #2: Fix robots.txt 🔴
**File:** `src/robots.txt`
**Time:** 2 minutes
```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: https://hiarchit.online/sitemap.xml
```

---

### Fix #3: Fix sitemap.xml 🔴
**File:** `src/sitemap.xml`
**Time:** 2 minutes
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://hiarchit.online/</loc>
    <lastmod>2026-03-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

### Fix #4: Add Meta Description + Robots + Canonical (all meta) 🔴
**File:** `src/index.html`
**Time:** 10 minutes

Replace or add in `<head>`:
```html
<!-- SEO Meta Tags -->
<meta name="description" content="Archit Jain — Frontend Engineer with 4+ years building high-performance Angular and React applications. Delivered 15+ projects including UMANG (pan-India e-Governance) and ITPO Booking system.">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
<meta name="author" content="Archit Jain">
<link rel="canonical" href="https://hiarchit.online/">

<!-- Open Graph -->
<meta property="og:type" content="profile">
<meta property="og:title" content="Archit Jain | Frontend Developer — Angular & React Expert">
<meta property="og:description" content="Frontend engineer with 4+ years building scalable web applications. Specializing in Angular, React, TypeScript. Delivered 15+ projects including government-scale platforms.">
<meta property="og:url" content="https://hiarchit.online/">
<meta property="og:image" content="https://hiarchit.online/assets/images/og-preview.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:site_name" content="Archit Jain Portfolio">
<meta property="profile:first_name" content="Archit">
<meta property="profile:last_name" content="Jain">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Archit Jain | Frontend Developer — Angular & React Expert">
<meta name="twitter:description" content="Frontend engineer with 4+ years building scalable web apps. Angular, React & TypeScript specialist.">
<meta name="twitter:image" content="https://hiarchit.online/assets/images/og-preview.png">

<!-- Language -->
<html lang="en"> <!-- Move lang to <html> tag -->
```

Also create `og-preview.png` (1200×630px) — use Figma or Canva to make a branded preview card with your photo and name.

---

### Fix #5: Fix Schema JSON-LD 🔴
**File:** `src/index.html` or Angular component containing JSON-LD
**Time:** 5 minutes

Replace the existing JSON-LD script:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "name": "Archit Jain",
      "url": "https://hiarchit.online/",
      "image": "https://hiarchit.online/assets/images/profile_1.svg",
      "jobTitle": "Frontend Engineer (SDE 2)",
      "description": "Frontend engineer with 4+ years building high-performance Angular and React applications. Specializing in scalable web systems, TypeScript, and modern JavaScript frameworks.",
      "email": "architjain808@gmail.com",
      "worksFor": {
        "@type": "Organization",
        "name": "Daffodils Software",
        "url": "https://www.daffodilsw.com/"
      },
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "Kurukshetra University"
      },
      "knowsAbout": [
        "Angular", "React", "TypeScript", "JavaScript", "HTML5", "CSS3",
        "Next.js", "Redux Toolkit", "RxJS", "GSAP", "Material UI", "React Query"
      ],
      "sameAs": [
        "https://github.com/architjain808",
        "https://www.linkedin.com/in/archit-jain-337a66195/"
      ]
    },
    {
      "@type": "WebSite",
      "name": "Archit Jain — Frontend Developer Portfolio",
      "url": "https://hiarchit.online/"
    }
  ]
}
</script>
```

---

### Fix #6: Resolve Duplicate Domain 🔴
**Time:** 15 minutes

**Option A — Preferred (disable GitHub Pages):**
1. Go to your GitHub repo: `github.com/architjain808/Hiarchit`
2. Settings → Pages
3. Either: set Source to "None" (disables GitHub Pages), OR
4. Set a custom domain redirect from GitHub Pages to hiarchit.online

**Option B — Canonical on GitHub Pages version:**
If you want to keep GitHub Pages, add the canonical to its `index.html` pointing to hiarchit.online. This tells Google that hiarchit.online is the canonical version.

**Option C — 301 Redirect (via Cloudflare or hosting):**
Configure a 301 redirect from `architjain808.github.io/Hiarchit/` → `https://hiarchit.online/`

---

## PHASE 2 — HIGH PRIORITY (This Week, < 4 Hours Total)

### Fix #7: Add Resource Hints for Performance ⚠️
**File:** `src/index.html` — add before `<link rel="stylesheet">` tags
**Time:** 5 minutes
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="image" href="assets/images/profile_1.svg">
```

---

### Fix #8: Add Image Dimensions + Lazy Loading + Alt Text ⚠️
**Time:** 20 minutes

Find all `<img>` tags in Angular components and update:
```html
<!-- Profile (above fold - no lazy load) -->
<img src="assets/images/profile_1.svg"
     alt="Archit Jain — Frontend Engineer"
     width="280" height="280">

<!-- Project images (below fold - use lazy load) -->
<img src="assets/images/umang.png"
     alt="UMANG Web — Angular e-Governance platform screenshot"
     width="600" height="400"
     loading="lazy">

<img src="assets/images/itpo.png"
     alt="ITPO Booking System — Exhibition booking platform for Bharat Mandapam"
     width="600" height="400"
     loading="lazy">

<img src="assets/images/anuvachan.png"
     alt="Anuvachan — Sanskrit/Hindi text transcription tool"
     width="600" height="400"
     loading="lazy">

<img src="assets/images/talenttrace.png"
     alt="TalentTrace — AI-powered recruitment platform"
     width="600" height="400"
     loading="lazy">
```

---

### Fix #9: Fix H1 Tag Structure ⚠️
**Time:** 10 minutes

Find the H1 split in Angular component template and merge:
```html
<!-- Before (split H1 - BAD) -->
<h1>ARCHIT</h1>
<h1>JAIN</h1>

<!-- After (single H1 with CSS span - GOOD) -->
<h1 class="hero-name">
  <span class="name-first">ARCHIT</span>
  <span class="name-last">JAIN</span>
</h1>
```
Keep the same CSS styling, just wrap in one H1 element.

---

### Fix #10: Add No-Script Fallback ⚠️
**File:** `src/index.html`
**Time:** 5 minutes
```html
<noscript>
  <div>
    <h1>Archit Jain — Frontend Engineer</h1>
    <p>Frontend engineer specializing in Angular and React. 4+ years building scalable web applications.</p>
    <p>Contact: <a href="mailto:architjain808@gmail.com">architjain808@gmail.com</a></p>
    <p>This portfolio requires JavaScript. Please enable JavaScript to view the full site.</p>
  </div>
</noscript>
```

---

### Fix #11: Add Security Headers ⚠️
**File:** `src/index.html`
**Time:** 5 minutes
```html
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta http-equiv="X-Frame-Options" content="SAMEORIGIN">
<meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">
```

---

### Fix #12: Set Up Google Analytics + Search Console ⚠️
**Time:** 30 minutes
1. Create Google Analytics 4 property at analytics.google.com
2. Add GA4 tracking script to `src/index.html`
3. Verify site in Google Search Console at search.google.com/search-console
4. Submit sitemap: `https://hiarchit.online/sitemap.xml`
5. Request indexing for `https://hiarchit.online/`

---

## PHASE 3 — MEDIUM PRIORITY (This Month)

### Fix #13: Convert Project PNGs to WebP
**Time:** 30 minutes
```bash
# Using cwebp or online converter
cwebp umang.png -o umang.webp -q 85
cwebp itpo.png -o itpo.webp -q 85
cwebp anuvachan.png -o anuvachan.webp -q 85
cwebp talenttrace.png -o talenttrace.webp -q 85
```
Then use `<picture>` elements with WebP + PNG fallback.

---

### Fix #14: Consider Angular SSR (Server-Side Rendering)
**Time:** 2-4 hours
```bash
ng add @angular/ssr
```
This generates HTML at build time, ensuring search engines can index content without waiting for JavaScript.

---

### Fix #15: Create llms.txt
**File:** `src/llms.txt` (copy to dist folder on build)
**Time:** 10 minutes
```
# Archit Jain — Frontend Developer Portfolio
# https://hiarchit.online/

Archit Jain is a frontend engineer with 4+ years building scalable web applications
using Angular, React, TypeScript, and Next.js.

Currently: Associate IT (SDE 2) at Daffodils Software (Jan 2022–Present)
Education: B.Tech Computer Science, Kurukshetra University (2018–2022)

Key Projects:
- UMANG Web: Pan-India e-Governance aggregation platform (Angular)
- ITPO Booking: Exhibition booking for Bharat Mandapam (Angular)
- Anuvachan: Sanskrit/Hindi text transcription (98% manual effort reduction)
- TalentTrace: AI-powered recruitment platform

Achievements: 46% dev speed improvement, 150+ reusable Angular components, 15+ projects

Contact: architjain808@gmail.com
GitHub: https://github.com/architjain808
LinkedIn: https://www.linkedin.com/in/archit-jain-337a66195/
```

---

### Fix #16: Enhance Content Sections
**Time:** 1-2 hours

Add the following to the page content:
1. **Location mention:** "Based in India" in the bio section
2. **"Available for opportunities"** section near contact
3. **Technology tags** on each project card with specific tech used
4. **Expanded project descriptions** (2-3 sentences each minimum)

---

## PHASE 4 — LOW PRIORITY (Backlog)

| Task | Impact | Effort |
|------|--------|--------|
| Start a technical blog (dev.to or on-site) | High SEO long-term | High |
| Add LinkedIn recommendations section | E-E-A-T | Low |
| Add certifications (AWS, Google, etc.) | E-E-A-T | Medium |
| Add CreativeWork schema per project | Schema richness | Medium |
| Host resume directly (no Google Drive) | UX + Trust | Low |
| Service Worker for offline capability | Performance | High |
| Add a contact form | UX | Medium |

---

---

## PHASE 3 ADDITION — Angular Performance Deep Fixes

### Fix #17: Angular @defer for Below-Fold Sections (Angular 17+)
```html
<!-- In app.component.html or equivalent -->
@defer (on viewport) {
  <app-projects></app-projects>
} @placeholder {
  <div class="section-placeholder" style="min-height: 400px;"></div>
}

@defer (on viewport) {
  <app-contact></app-contact>
} @placeholder {
  <div class="section-placeholder" style="min-height: 200px;"></div>
}
```

### Fix #18: Switch to Async Animations + OnPush Change Detection
```typescript
// app.config.ts — replace BrowserAnimationsModule
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),   // lazy-loads animations
    provideClientHydration(),
  ]
};

// Every component — add OnPush
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
})
```

### Fix #19: Self-Host Google Fonts (eliminate CLS + external request)
```css
/* Download fonts, place in src/assets/fonts/, then in styles.css: */
@font-face {
  font-family: 'Outfit';
  src: url('/assets/fonts/outfit-variable.woff2') format('woff2');
  font-display: optional;   /* zero CLS — no font swap */
  font-weight: 100 900;
}

/* Size-adjusted fallback to minimize FOUT */
@font-face {
  font-family: 'Outfit-fallback';
  src: local('Arial');
  ascent-override: 90%;
  descent-override: 22%;
  size-adjust: 105%;
}

body { font-family: 'Outfit', 'Outfit-fallback', sans-serif; }
```

### Fix #20: Bundle Size Analysis & Budget Enforcement
```json
// angular.json — add/update budgets in production config
"budgets": [
  {
    "type": "initial",
    "maximumWarning": "350kb",
    "maximumError": "500kb"
  },
  {
    "type": "anyComponentStyle",
    "maximumWarning": "4kb",
    "maximumError": "8kb"
  }
]
```
Run `ng build --stats-json` then analyze with `npx webpack-bundle-analyzer dist/hiarchit/browser/stats.json`.

### Fix #21: Netlify/Cloudflare Pages Deployment Config
```toml
# netlify.toml
[build]
  publish = "dist/hiarchit/browser"
  command = "ng build --configuration production"

[[headers]]
  for = "/index.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

## Expected Score After Phase 1+2 Completion

| Category | Current | After Phase 1+2 |
|----------|---------|-----------------|
| Technical SEO | 28 | 72 |
| Content Quality | 60 | 70 |
| On-Page SEO | 42 | 78 |
| Schema | 45 | 75 |
| Performance | 40 | 58 |
| Images | 50 | 72 |
| AI Search Readiness | 35 | 55 |
| **Overall** | **43** | **~72** |

---

## Quick Fix Checklist (Phase 1 — Copy-Paste Ready)

- [ ] Add `<link rel="canonical" href="https://hiarchit.online/">` to index.html
- [ ] Add meta description to index.html
- [ ] Add `lang="en"` to `<html>` tag
- [ ] Add all Open Graph meta tags
- [ ] Add Twitter Card meta tags
- [ ] Add meta robots tag
- [ ] Fix robots.txt sitemap URL → `https://hiarchit.online/sitemap.xml`
- [ ] Fix sitemap.xml URL → `https://hiarchit.online/`
- [ ] Fix schema JSON-LD `url` property → `https://hiarchit.online/`
- [ ] Add email and image to schema
- [ ] Resolve duplicate domain (disable GitHub Pages or add canonical)
- [ ] Create og-preview.png (1200×630px)
- [ ] Submit to Google Search Console and request indexing
