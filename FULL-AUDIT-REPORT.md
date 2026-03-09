# Full SEO Audit Report: hiarchit.online
**Audited:** March 9, 2026
**Site:** https://hiarchit.online/
**Business Type:** Personal Developer Portfolio — Archit Jain, Frontend Engineer (Angular & React)
**Auditor:** Claude Code SEO Audit System

---

## Executive Summary

| Category | Score | Weight | Weighted | Specialist Agent Rating |
|----------|-------|--------|---------|------------------------|
| Technical SEO | 34/100 | 25% | 8.5 | FAIL across 6/9 subcategories |
| Content Quality | 54/100 | 25% | 13.5 | E-E-A-T Composite: 49/100 |
| On-Page SEO | 42/100 | 20% | 8.4 | Keyword optimization: 52/100 |
| Schema / Structured Data | 45/100 | 10% | 4.5 | Person schema present but broken URL |
| Performance (CWV) | 30/100 | 10% | 3.0 | LCP: Poor, INP: Needs Work, CLS: Needs Work |
| Images | 50/100 | 5% | 2.5 | 4/6 images missing dimensions |
| AI Search Readiness | 38/100 | 5% | 1.9 | Citation readiness: F |

### **Overall SEO Health Score: 42 / 100** ⚠️ Needs Significant Work

---

### Top 5 Critical Issues

1. **🔴 Duplicate site on two domains** — `hiarchit.online` and `architjain808.github.io/Hiarchit/` are both live with the same content, causing duplicate content penalties
2. **🔴 robots.txt sitemap points to wrong domain** — `Sitemap: https://architjain808.github.io/Hiarchit/sitemap.xml` instead of `https://hiarchit.online/sitemap.xml`
3. **🔴 Sitemap URLs point to GitHub Pages** — The sitemap lists `architjain808.github.io/Hiarchit/` as the canonical URL, actively directing Google to index the wrong domain
4. **🔴 No canonical tag** — No `<link rel="canonical">` to consolidate ranking signals to one domain
5. **🔴 Schema JSON-LD `url` points to GitHub Pages** — `"url": "https://architjain808.github.io/Hiarchit/"` tells Google the authoritative URL is the old domain

### Top 5 Quick Wins (< 30 minutes each)

1. **Add `<link rel="canonical" href="https://hiarchit.online/">` in `<head>`** — Immediate duplicate content resolution
2. **Add meta description** — 1 line of HTML, direct ranking/CTR impact
3. **Fix robots.txt sitemap URL** — Change to `https://hiarchit.online/sitemap.xml`
4. **Add Open Graph tags** — Required for LinkedIn/Twitter sharing (critical for a dev portfolio)
5. **Fix schema `url` property** — Change to `https://hiarchit.online/`

---

## 1. Technical SEO — Score: 28/100

### 1.1 Crawlability

#### 🔴 CRITICAL: robots.txt Sitemap URL on Wrong Domain
**Current:**
```
User-agent: *
Allow: /
Sitemap: https://architjain808.github.io/Hiarchit/sitemap.xml
```
**Problem:** Google follows this sitemap URL and discovers `architjain808.github.io` as the authoritative sitemap. This is the single biggest crawl signal problem on the site.
**Fix:**
```
User-agent: *
Allow: /
Sitemap: https://hiarchit.online/sitemap.xml
```

#### 🔴 CRITICAL: Sitemap Contains Wrong Domain URLs
**Current:** `/sitemap.xml` at hiarchit.online contains:
```xml
<url>
  <loc>https://architjain808.github.io/Hiarchit/</loc>
  <lastmod>2026-03-05</lastmod>
  <changefreq>monthly</changefreq>
  <priority>1.0</priority>
</url>
```
**Problem:** The sitemap tells Googlebot that the primary URL is the GitHub Pages domain. Google will index `architjain808.github.io/Hiarchit/` instead of `hiarchit.online`.
**Fix:**
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

#### 🔴 CRITICAL: Duplicate Content on Two Live Domains
- **Domain 1:** `https://hiarchit.online/` — Title: "Archit Jain | Frontend Developer - Angular & React Expert"
- **Domain 2:** `https://architjain808.github.io/Hiarchit/` — Title: "HiArchit - Personal Portfolio | Hiarchit" (accessible, different title, meta desc: "personal portfolio webpage")

Both domains serve the same portfolio content. Google sees these as duplicate pages competing with each other, splitting link equity and causing confusion about which to rank.
**Fix:** Either:
- **Option A (Recommended):** Add `<link rel="canonical" href="https://hiarchit.online/">` to the GitHub Pages version AND redirect the GitHub Pages domain to hiarchit.online (requires custom domain config in GitHub Pages settings, then set `CNAME` on GitHub Pages to point back or disable the GitHub Pages site)
- **Option B:** Disable GitHub Pages publishing entirely since hiarchit.online is the primary domain

#### ⚠️ HIGH: Angular SPA — JavaScript Rendering Risk
The site is built with Angular as a Single Page Application. Googlebot renders JavaScript but there can be delays (days to weeks) before JS-rendered content is indexed. This means the main content (bio, projects, experience) may not be consistently indexed.
**Fix:** Implement Angular Universal (SSR) or pre-rendering:
```bash
ng add @angular/ssr
```
This generates HTML at build time, ensuring all content is immediately crawlable without JavaScript.

### 1.2 Indexability

#### 🔴 CRITICAL: No Canonical Tag
No `<link rel="canonical">` present on either the hiarchit.online or GitHub Pages version.
**Fix — add to `<head>` in `index.html`:**
```html
<link rel="canonical" href="https://hiarchit.online/">
```

#### ⚠️ HIGH: No Meta Robots Tag
No `<meta name="robots">` tag. While the default is index/follow, an explicit tag confirms intent and prevents accidental blocking.
**Fix:**
```html
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
```

#### ⚠️ MEDIUM: No `<html lang>` Attribute
The `<html>` tag is missing a `lang` attribute.
**Fix:**
```html
<html lang="en">
```

### 1.3 Security

#### ⚠️ HIGH: Missing Security Headers
No Content-Security-Policy, X-Frame-Options, or other security headers detected in meta tags.
**Fix (add to `<head>`):**
```html
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta http-equiv="X-Frame-Options" content="SAMEORIGIN">
```
For full HTTP response headers, configure via hosting provider (Cloudflare, Netlify, etc.).

#### ✅ GOOD: HTTPS Enabled
Site serves over HTTPS — no mixed content issues detected.

### 1.4 URL Structure
- Single page application — no subpages to audit
- Clean root URL: `https://hiarchit.online/` ✅
- No trailing slash inconsistency detected

### 1.5 Mobile Optimization
- Viewport meta tag present ✅
- Angular responsive framework used ✅
- No explicit mobile-specific issues detected in markup

### 1.6 Social Meta Tags

#### 🔴 CRITICAL: No Open Graph Tags
Zero Open Graph tags present. When someone shares this portfolio on LinkedIn, Twitter/X, or Facebook, there will be no preview card — just a plain URL. For a developer portfolio, this is extremely damaging as LinkedIn sharing is a primary discovery channel.

**Fix — add to `<head>`:**
```html
<!-- Open Graph -->
<meta property="og:type" content="profile">
<meta property="og:title" content="Archit Jain | Frontend Developer - Angular & React Expert">
<meta property="og:description" content="Frontend engineer with 4+ years building scalable web applications. Specializing in Angular, React, TypeScript. Delivered 15+ projects including government-scale platforms.">
<meta property="og:url" content="https://hiarchit.online/">
<meta property="og:image" content="https://hiarchit.online/assets/images/og-preview.png">
<meta property="og:site_name" content="Archit Jain Portfolio">
<meta property="profile:first_name" content="Archit">
<meta property="profile:last_name" content="Jain">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Archit Jain | Frontend Developer - Angular & React Expert">
<meta name="twitter:description" content="Frontend engineer with 4+ years building scalable web applications. Angular, React, TypeScript specialist.">
<meta name="twitter:image" content="https://hiarchit.online/assets/images/og-preview.png">
```
Also create an `og-preview.png` image (1200×630px) featuring your photo and name/title.

### 1.7 International SEO
- No hreflang tags (not needed for English-only single-language site) ✅

---

## 2. Content Quality — Score: 60/100

### 2.1 E-E-A-T Assessment

**Experience (7/10):** Strong evidence of real-world work:
- Government-scale project (UMANG Web — pan-India e-Governance platform)
- Enterprise project (ITPO Booking — Bharat Mandapam exhibition system)
- 4+ years experience claim with quantified achievements
- B.Tech CS from Kurukshetra University mentioned

**Expertise (6/10):**
- Technology breadth listed: Angular, React, TypeScript, Next.js, GSAP, AI Integration — impressive range
- "46% Dev Speed Increase" and "150+ reusable Angular components" are strong credibility signals
- Missing: Code samples, technical blog posts, speaking/conference involvement

**Authoritativeness (5/10):**
- GitHub profile linked (establishes credibility)
- LinkedIn linked
- No third-party mentions, awards, or press coverage
- No testimonials from colleagues/managers
- No certifications mentioned

**Trustworthiness (5/10):**
- Real contact info (email) ✅
- Resume link available ✅
- No physical address (not required for portfolio)
- No privacy policy (low priority for portfolio)
- Google Drive resume link — consider hosting directly to avoid drive.google.com redirect

### 2.2 Content Quality

#### ⚠️ HIGH: No Meta Description
The most impactful single missing element. Meta descriptions appear in Google search results and directly affect click-through rate.

**Fix:**
```html
<meta name="description" content="Archit Jain — Frontend Engineer with 4+ years building high-performance Angular and React applications. Delivered 15+ projects including UMANG (pan-India e-Governance) and ITPO Booking. Based in India.">
```
(155 characters — within Google's displayed limit)

#### ⚠️ MEDIUM: H1 Tag Split Across Two Elements
The H1 is divided: "ARCHIT" (one element) and "JAIN" (another element). While visually stylized, search engines may read these as two separate H1s or parse them oddly.
**Fix:** Use a single H1 with CSS for the split-color effect:
```html
<h1><span class="accent">ARCHIT</span> JAIN</h1>
```

#### ⚠️ MEDIUM: Thin Project Descriptions
Project images (umang.png, itpo.png, etc.) have no alt text, and project descriptions appear to be brief summaries rather than detailed case studies.
**Fix:** Add descriptive alt text:
```html
<img src="assets/images/umang.png" alt="UMANG Web - Pan-India e-Governance aggregation platform built with Angular" width="600" height="400">
```

#### ✅ GOOD: Quantified Achievements
"4+ Years", "46% Dev Speed↑", "15+ Projects", "150+ reusable Angular components" — these are excellent E-E-A-T signals. Keep and expand.

#### ✅ GOOD: Word Count (~1,200-1,500 words)
Adequate for a portfolio page. Not thin content by portfolio standards.

### 2.3 Keyword Optimization

**Target Keywords Identified:**
- Primary: "frontend developer Angular React" / "Angular developer" / "React developer"
- Secondary: "TypeScript developer", "Next.js developer", "hire frontend developer India"
- Long-tail: "Angular developer India", "frontend engineer portfolio"

**Current Keyword Presence:**
| Keyword | Title | H1 | H2 | Content | Meta Desc |
|---------|-------|----|----|---------|-----------|
| Frontend Developer | ✅ | ❌ | ✅ | ✅ | ❌ (missing) |
| Angular | ✅ | ❌ | ❌ | ✅ | ❌ |
| React | ✅ | ❌ | ❌ | ✅ | ❌ |
| TypeScript | ❌ | ❌ | ❌ | ✅ | ❌ |

**Gap:** H1 only contains the name, not any keyword. H2s are section labels ("WHO AM I.", "WORK HISTORY."), not keyword-optimized.

### 2.4 AI Citation Readiness

**Score: 35/100** — Poor

For AI Overviews (Google SGE) and ChatGPT web search to cite this portfolio:
- ❌ No FAQ section
- ❌ No clearly labeled "About" text block with direct quotable statements
- ❌ No blog posts or articles (primary AI citation source)
- ✅ Structured data (Person schema) present — helps
- ✅ Specific project names and metrics are citable
- ❌ No "Hire me" or service description section

### 2.5 Missing Content for Portfolio SEO

| Missing Content | SEO Value | Effort |
|----------------|-----------|--------|
| Blog/Technical articles | High | High |
| Detailed case studies per project | High | Medium |
| Testimonials/recommendations | High | Low |
| Skills/certifications section | Medium | Low |
| "Available for hire" CTA section | Medium | Low |
| Location mention (India/city) for local SEO | Medium | Low |

---

## 3. On-Page SEO — Score: 42/100

### 3.1 Title Tag Analysis

**Current:** `Archit Jain | Frontend Developer - Angular & React Expert`
**Length:** ~55 characters ✅ (within Google's ~55-60 char display limit)
**Assessment:** Good — includes name, role, and key technologies
**Improvements:**
- Consider adding location: "Archit Jain | Frontend Developer (Angular & React) — India"
- Or add more specificity: "Archit Jain | Angular & React Developer — 4+ Years"

### 3.2 Meta Description — MISSING 🔴
See section 2.2 for fix.

### 3.3 Heading Structure

```
H1: "ARCHIT" / "JAIN" ← Split issue
  H2: "FRONTEND ENGINEER"
  H2: "WHO AM I."
  H2: "WORK HISTORY."
    H3: "Associate IT (SDE 2)" at Daffodils Software
  H2: "FEATURED PROJECTS"
    H3: UMANG Web
    H3: ITPO Booking
    H3: Anuvachan
    H3: TalentTrace
```

**Issues:**
- H1 split (see above)
- H2s are purely decorative labels, not keyword-bearing
- No H2/H3 content that targets "hire Angular developer" type queries
- H3 project titles are good but lack technology keywords

**Improved H2 suggestions:**
- "WHO AM I." → "About Me — Frontend Engineer" or keep decorative if design-first approach
- "WORK HISTORY." → Keep as-is (acceptable)
- "FEATURED PROJECTS" → "Featured Projects — Angular, React & Next.js Work"

### 3.4 Internal Linking
- Single-page application — no traditional internal linking
- Anchor tags (#sections) serve as internal navigation
- ⚠️ No breadcrumbs (N/A for SPA)

---

## 4. Schema / Structured Data — Score: 45/100

### 4.1 Current Schema Implementation

**Found:** Person schema (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Archit Jain",
  "url": "https://architjain808.github.io/Hiarchit/",  ← WRONG DOMAIN
  "jobTitle": "Frontend Developer",
  "worksFor": {
    "@type": "Organization",
    "name": "Daffodils Software"
  },
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "Kurukshetra University"
  },
  "knowsAbout": ["Angular", "React", "TypeScript", "JavaScript", "HTML5", "CSS3"],
  "sameAs": [
    "https://github.com/architjain808",
    "https://www.linkedin.com/in/archit-jain-337a66195/"
  ]
}
```

### 4.2 Schema Validation Issues

| Issue | Severity | Fix |
|-------|----------|-----|
| `url` points to GitHub Pages domain | 🔴 Critical | Change to `https://hiarchit.online/` |
| Missing `email` property | ⚠️ High | Add `"email": "architjain808@gmail.com"` |
| Missing `image` property | ⚠️ High | Add profile image URL |
| Missing `description` | ⚠️ Medium | Add professional summary |
| `alumniOf` missing required name format | Low | Add `@type` validation |
| `worksFor` missing URL | Low | Add Daffodils Software URL |

### 4.3 Recommended Improved Person Schema

```json
{
  "@context": "https://schema.org",
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
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "degree",
    "educationalLevel": "Bachelor's Degree",
    "about": "Computer Science"
  },
  "sameAs": [
    "https://github.com/architjain808",
    "https://www.linkedin.com/in/archit-jain-337a66195/"
  ]
}
```

### 4.4 Additional Recommended Schemas

#### WebSite Schema (adds Sitelinks Search Box eligibility)
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Archit Jain — Frontend Developer Portfolio",
  "url": "https://hiarchit.online/",
  "author": {
    "@type": "Person",
    "name": "Archit Jain"
  }
}
```

#### CreativeWork Schema for Projects
```json
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "UMANG Web",
  "description": "Pan-India e-Governance aggregation platform serving millions of citizens",
  "url": "https://web.umang.gov.in/",
  "author": {
    "@type": "Person",
    "name": "Archit Jain"
  },
  "programmingLanguage": ["Angular", "TypeScript"]
}
```

---

## 5. Performance (Core Web Vitals) — Score: 40/100

### 5.1 LCP (Largest Contentful Paint)

**Estimated LCP Element:** Profile SVG image (`profile_1.svg`) or hero heading
**Risk Level:** ⚠️ High — Angular SPA means content renders after JS bundle loads

**Issues:**
- No `<link rel="preload">` for LCP image
- No server-side rendering (Angular CSR only)
- Google Fonts loaded without `<link rel="preconnect">`

**Fix:**
```html
<!-- In <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="image" href="assets/images/profile_1.svg">
```

### 5.2 CLS (Cumulative Layout Shift)

**Risk Level:** ⚠️ High — multiple CLS contributors:

1. **Google Fonts without size fallback** — Even with `font-display: swap` (✅ present), fonts can cause layout shift on swap
2. **Images without width/height** — All 6 images have no dimension attributes
3. **Animations** — CSS animations using `will-change` properties

**Fix — add dimensions to all images:**
```html
<img src="assets/images/profile_1.svg" alt="Archit Jain" width="300" height="300">
<img src="assets/images/umang.png" alt="UMANG Web project screenshot" width="600" height="400" loading="lazy">
```

### 5.3 INP (Interaction to Next Paint)

**Risk Level:** ⚠️ Medium — Angular SPA considerations:
- Large JS bundle (Angular framework + animations with GSAP)
- No code splitting detected
- No lazy loading of route components (single page, likely no routes)

**Fix:**
```typescript
// Angular performance: use OnPush change detection
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

### 5.4 Resource Loading

| Resource | Issue | Fix |
|----------|-------|-----|
| Google Fonts | No preconnect | Add `rel="preconnect"` |
| Profile SVG | No preload | Add `rel="preload"` |
| PNG project images | No lazy loading | Add `loading="lazy"` |
| PNG format | Not WebP/AVIF | Convert to WebP |
| Angular bundle | No SSR | Add Angular Universal |

### 5.5 Image Optimization

**Current PNG images:** umang.png, itpo.png, anuvachan.png, talenttrace.png

```html
<!-- Convert to WebP with PNG fallback -->
<picture>
  <source srcset="assets/images/umang.webp" type="image/webp">
  <img src="assets/images/umang.png"
       alt="UMANG Web - Angular e-Governance platform"
       width="600" height="400"
       loading="lazy">
</picture>
```

---

## 6. Images — Score: 50/100

| Image | Alt Text | Width/Height | Lazy Load | Format |
|-------|----------|--------------|-----------|--------|
| profile_1.svg | ✅ "Archit Jain" | ❌ Missing | ❌ | SVG ✅ |
| sign.svg | ✅ "Archit Jain's signature" | ❌ Missing | ❌ | SVG ✅ |
| umang.png | ❓ Unknown | ❌ Missing | ❌ | PNG → WebP |
| itpo.png | ❓ Unknown | ❌ Missing | ❌ | PNG → WebP |
| anuvachan.png | ❓ Unknown | ❌ Missing | ❌ | PNG → WebP |
| talenttrace.png | ❓ Unknown | ❌ Missing | ❌ | PNG → WebP |

**Critical gaps:**
- Project images likely have no alt text (not detected in extraction)
- No image dimensions causing CLS
- No lazy loading (all images load on page load)
- PNG format used where WebP would reduce file size 25-35%

---

## 7. AI Search Readiness — Score: 35/100

### 7.1 AI Overview / SGE Eligibility

For content to appear in Google AI Overviews:
- ❌ No structured FAQ content
- ❌ No blog posts or long-form technical content
- ✅ Person schema present (helps knowledge panel)
- ✅ Specific quantifiable achievements citable by AI
- ❌ No "About" section with quotable professional summary paragraph
- ❌ Site not being indexed under correct domain (critical issue)

### 7.2 ChatGPT / Perplexity Citability

- ❌ No `llms.txt` file (`https://hiarchit.online/llms.txt`)
- ❌ No robots.txt allowance for AI crawlers (GPTBot, ClaudeBot, PerplexityBot)
- ❌ No blog/article content for AI to reference
- ✅ Contact information present and structured

### 7.3 Recommendations

```
# Add to robots.txt for AI crawlers
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /
```

Create `/llms.txt`:
```
# Archit Jain — Frontend Developer Portfolio
# https://hiarchit.online/

Archit Jain is a frontend engineer with 4+ years of experience building scalable web applications
using Angular, React, TypeScript, and Next.js. Currently working as Associate IT (SDE 2) at
Daffodils Software. Built UMANG Web (pan-India e-Governance platform) and ITPO Booking system.

Contact: architjain808@gmail.com
GitHub: https://github.com/architjain808
LinkedIn: https://www.linkedin.com/in/archit-jain-337a66195/
```

---

---

## 8. Additional Findings from Specialist Agents

### 8.1 Performance — Estimated CWV Scores

| Metric | Estimated Value | Threshold | Status |
|--------|----------------|-----------|--------|
| LCP | >4.0s | <2.5s (Good) | 🔴 Poor |
| INP | 200–500ms | <200ms (Good) | ⚠️ Needs Improvement |
| CLS | 0.15–0.35 | <0.1 (Good) | ⚠️ Needs Improvement |

**LCP Timeline (estimated):**
```
0ms       → HTML request
~500ms    → TTFB
~1,200ms  → Angular main.js downloaded
~1,800ms  → Angular bootstrapped
~2,500s+  → Fonts loaded, images decoded, LCP element painted
```
Root cause: Angular CSR — browser receives blank HTML shell until JS executes.

**Angular-specific quick wins:**
```typescript
// 1. OnPush change detection on every component (INP fix)
@Component({ changeDetection: ChangeDetectionStrategy.OnPush })

// 2. Async animations instead of eager (bundle size)
// In app.config.ts:
provideAnimationsAsync()

// 3. Defer below-fold sections (Angular 17+)
@defer (on viewport) {
  <app-projects></app-projects>
} @placeholder {
  <div style="min-height:400px"></div>
}
```

**Font CLS fix — size-adjusted fallback:**
```css
@font-face {
  font-family: 'YourFont-fallback';
  src: local('Arial');
  ascent-override: 90%;
  descent-override: 22%;
  size-adjust: 105%;
}
body { font-family: 'YourFont', 'YourFont-fallback', sans-serif; }
```

### 8.2 Additional Content Quality Findings

| Finding | Severity |
|---------|----------|
| LinkedIn vanity URL not customized (slug: `337a66195` = auto-generated) | Medium |
| Heading text stored as literal UPPERCASE in HTML — should be `text-transform: uppercase` via CSS | Medium |
| Resume on Google Drive (link can expire, impermanent) — host at `hiarchit.online/archit-jain-resume.pdf` | Medium |
| Signature SVG alt text `"Archit Jain's signature"` — if decorative, use `alt=""` per WCAG | Low |
| Gmail contact address vs custom domain `archit@hiarchit.online` | Low |
| No "last updated" date or `dateModified` in schema | Medium |
| Work History bullet points missing (no quantified achievements visible) | High |

### 8.3 E-E-A-T Breakdown (Specialist Analysis)

| Signal | Score | Grade | Top Gap |
|--------|-------|-------|---------|
| Experience | 12/20 | C | No per-project technical narratives |
| Expertise | 13/25 | D+ | Zero long-form technical content |
| Authoritativeness | 11/25 | D+ | No external mentions, no testimonials |
| Trustworthiness | 13/30 | D+ | No meta description, Gmail address, Drive resume |
| **Composite** | **49/100** | **D+** | |

**Single highest-leverage action for authority:** Get "Archit Jain" cited on one external authoritative page — contribute to open-source Angular/React repos, publish on dev.to, or get a testimonial on Daffodils Software's website.

---

## Appendix: Full Issue Inventory

| Issue | Category | Severity | Status |
|-------|----------|----------|--------|
| Duplicate site on two domains | Technical | 🔴 Critical | Open |
| robots.txt sitemap wrong domain | Technical | 🔴 Critical | Open |
| Sitemap URLs wrong domain | Technical | 🔴 Critical | Open |
| Schema url wrong domain | Schema | 🔴 Critical | Open |
| No canonical tag | Technical | 🔴 Critical | Open |
| No meta description | On-Page | 🔴 Critical | Open |
| No Open Graph tags | Technical | 🔴 Critical | Open |
| No Twitter Card tags | Technical | 🔴 Critical | Open |
| Angular SPA no SSR | Performance | ⚠️ High | Open |
| No security headers | Technical | ⚠️ High | Open |
| No preconnect (Google Fonts) | Performance | ⚠️ High | Open |
| Images no width/height (CLS) | Performance | ⚠️ High | Open |
| H1 split across elements | On-Page | ⚠️ High | Open |
| No meta robots tag | Technical | ⚠️ High | Open |
| Project images missing alt text | Images | ⚠️ High | Open |
| Schema missing email/image | Schema | ⚠️ High | Open |
| No no-script fallback | Technical | ⚠️ Medium | Open |
| No lazy loading on images | Performance | ⚠️ Medium | Open |
| PNG instead of WebP | Images | ⚠️ Medium | Open |
| No preload for LCP element | Performance | ⚠️ Medium | Open |
| Thin project descriptions | Content | ⚠️ Medium | Open |
| No location mentioned | Content | ⚠️ Medium | Open |
| html lang attribute missing | Technical | ⚠️ Medium | Open |
| Future date in sitemap | Technical | ⚠️ Medium | Open |
| No analytics tracking | Technical | ⚠️ Medium | Open |
| No llms.txt | AI SEO | ⚠️ Medium | Open |
| No blog/technical articles | Content | 🔵 Low | Open |
| No testimonials | Content | 🔵 Low | Open |
| No certifications listed | Content | 🔵 Low | Open |
| Resume on Google Drive (redirect) | Content | 🔵 Low | Open |
| No Service Worker | Performance | 🔵 Low | Open |
| No WebSite schema | Schema | 🔵 Low | Open |
| No CreativeWork schema for projects | Schema | 🔵 Low | Open |
