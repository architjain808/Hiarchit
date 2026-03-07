# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Hiarchit — Archit Jain Portfolio
**Updated:** 2026-03-07
**Category:** Portfolio/Personal — Motion-Driven

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable | Source |
|------|-----|--------------|--------|
| Background (warm off-white) | `#F4F4F0` | `--bg-primary` | `styles.scss` |
| Background (pure white) | `#ffffff` | `--bg-secondary` | `styles.scss` — About & Projects bg |
| Text Primary (near-black) | `#1a1a1a` | `--text-primary` | `styles.scss` |
| Text Secondary (mid-gray) | `#5a5a5a` | `--text-secondary` | `styles.scss` |
| Accent Green | `#9AD741` | `--accent-primary` | `styles.scss` — brand identity |
| Warm Charcoal | `#3b3b3b` | `--accent-secondary` | `styles.scss` — decorative dots, dark surfaces |
| Vibrant Yellow | `#fed766` | `--accent-tertiary` | `styles.scss` — **DEFINED BUT UNUSED — see improvements** |
| Signature Gray | `#A1A1A1` | `--color-neutral` | Derived from `sign.svg` path fill |
| Image Mask BG | `#e5e5e5` | `--color-surface` | `about.scss`, `projects.scss` — photo/card bg |

**Color Notes:**
- **`#9AD741`** is the core identity color — used on the cursor, nav underlines, marquee dots, section accent headings, bullet points, and the floating badge hover. It was intentionally matched to the profile background asset (`profile-bg.svg` uses `#98D73C`, same hue family).
- **`#A1A1A1`** (from the signature SVG) is a natural neutral — use it for decorative strokes, ghost borders, muted watermarks, and UI lines that should recede.
- **`#e5e5e5`** (photo mask background) and **`#F4F4F0`** (body bg) are in the same warm-gray family. The profile renders warm-toned because of `mix-blend-mode: multiply` on this background.
- Avoid using `--accent-tertiary: #fed766` until it is given a defined role (e.g., a warning state, a hover highlight). Right now it adds visual noise without purpose.

### Typography

- **Heading Font:** `Outfit` — weights 300–900. Used for all `h1–h6`, `.hero-heading`, `.section-heading`, `.loader-text`, nav items, marquee text, and the resume button.
- **Body Font:** `Inter` — weights 300–600. Used for `p`, `.bio-sub`, list items, metadata, and tags.
- **Letter-spacing:** `-0.04em` on hero headings, `-0.03em` on section headings — tight tracking is a core style choice.
- **Line-height:** `1.1` on headings, `1.6–1.7` on body paragraphs.
- **Text transform:** `uppercase` on hero headings, section headings, nav items, tag labels, and marquee text.

**Google Fonts:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
```

**Fluid type scale (clamp-based, already in use):**
| Role | Clamp |
|------|-------|
| Hero heading | `clamp(4rem, 11vw, 11rem)` |
| Section heading | `clamp(3rem, 8vw, 8rem)` |
| Bio lead | `clamp(1.4rem, 2.5vw, 2.5rem)` |
| Body `p` | `1.125rem` → `1rem` on mobile |
| Preloader text | `clamp(2rem, 5vw, 4rem)` |

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

**Section padding pattern in use:** `padding: 10–15vh 5vw` on desktop, `padding: 10vh 2rem` on tablet/mobile.

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

**Transition variable in use:**
```css
--transition-smooth: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
```
Use this for all non-GSAP hover and state transitions. Short micro-interactions (icon shifts, underlines) use `0.3–0.4s ease`.

---

## Photo & Signature — Placement Guide

### Profile Photo (`assets/images/profile_1.svg`)

**Current placement:** About section, right column — inside `.image-mask` with:
- `border-radius: 40px 10px 40px 10px` (asymmetric, adds character)
- `mask-image: linear-gradient(to bottom, black 70%, transparent 100%)` — softly fades the bottom
- `mix-blend-mode: multiply` over `#e5e5e5` background — renders the photo warm-toned and blended into the palette
- `filter: contrast(1.1) grayscale(20%)` at rest → `grayscale(0%)` on hover

**Why this works:** The multiply blend mode integrates the photo into the bg-primary palette family. It feels like part of the composition rather than a dropped-in image.

**Recommended additional placements:**
- **Hero section (future):** If a photo is ever added to hero, use the same multiply-blend pattern on a small clipped circle or a tall asymmetric container. Do NOT use a plain `<img>` with a white border.
- **Preloader (option):** A very subtle, low-opacity silhouette of the photo behind the text on the preloader screen would add personalization. Opacity `0.03–0.05`.
- **OG/social image:** Use the photo with the green accent overlay for the `og:image` meta tag.

### Signature (`assets/images/sign.svg`)

**Color:** `#A1A1A1` — medium gray, professional and unobtrusive.

**Current placement:** About section, bottom-right of the photo container — `rotate(-5deg)`, `z-index: 4`, `filter: drop-shadow(0 10px 20px rgba(0,0,0,0.1))`. Positioned to overlap the image edge organically.

**Why this works:** The slight rotation makes it feel handwritten rather than placed. The drop shadow gives it depth without a background box.

**Recommended additional placements:**
- **Section divider / watermark:** Place `sign.svg` as a large (width: 40–60%), low-opacity (`opacity: 0.04–0.06`) watermark centered horizontally between the Experience and Projects sections. It acts as a subtle brand mark.
- **Projects section footer:** A small (width: ~120px) instance at the bottom-right of the Projects section with `opacity: 0.2`, above the final project card, reinforces personal authorship.
- **Footer / page end:** If a footer is ever added, the signature should be the centrepiece — larger, at ~40% width, with `--color-neutral (#A1A1A1)` tint and a thin underline or rule.
- **DO NOT** place the signature in the Hero — the hero is for the name in type form. Having both would be redundant.

### Profile Background (`assets/images/profile-bg.svg`)

**Current status: UNUSED.** This asset is a decorative SVG of flowing lines in `#98D73C` (same family as `--accent-primary`). It was clearly created to complement the profile photo.

**Recommended placement:** Behind the About section's `.visual-column` as a decorative backdrop, positioned absolutely with `z-index: 0`, `opacity: 0.15–0.25`, and `overflow: hidden` on the parent. It should feel like an abstract green halo behind the photo, not a foreground element.

### Watermark (`assets/images/WaterMark1.png`)

**Current status: UNUSED.** Evaluate whether this duplicates the role of `sign.svg`. If it is a different visual asset (e.g., a stamp or seal), use it as a low-opacity background element in the Projects section. If it is redundant with `sign.svg`, remove it to reduce asset bloat.

---

## Component Specs

### Buttons

```css
/* Primary Button — Resume / CTA */
.btn-primary {
  background: var(--accent-primary); /* #9AD741 */
  color: var(--bg-primary);           /* #F4F4F0 */
  padding: 12px 24px;
  border-radius: 50px;               /* pill — matches existing .resume-btn-content */
  font-family: var(--font-heading);
  font-weight: 600;
  transition: var(--transition-smooth);
  border: 1px solid rgba(0,0,0,0.05);
  cursor: pointer;
}

.btn-primary:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.2);
}

/* Secondary / Ghost Button */
.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--text-primary);
  padding: 12px 24px;
  border-radius: 50px;
  font-family: var(--font-heading);
  font-weight: 600;
  transition: var(--transition-smooth);
  cursor: pointer;
}

.btn-secondary:hover {
  background: var(--text-primary);
  color: var(--bg-primary);
}

/* Circle Icon Button — project link */
.btn-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
}

.btn-circle:hover {
  background: var(--accent-primary);
  color: var(--bg-primary);
  transform: scale(1.1) rotate(-45deg);
}
```

### Cards (Project Cards)

```css
.project-card {
  /* No background — sits on section bg */
}

.project-card .img-container {
  border-radius: 12px;
  height: 60vh;
  min-height: 400px;
  overflow: hidden;
  clip-path: inset(0% 0% 0% 0%);
  transition: clip-path 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  background-color: var(--color-surface); /* #e5e5e5 */
}

.project-card:hover .img-container {
  clip-path: inset(2% 2% 2% 2%); /* subtle inset crop on hover */
}
```

### Tags / Chips

```css
.tag {
  padding: 6px 16px;
  border-radius: 40px;
  border: 1px solid rgba(0,0,0,0.1);
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: var(--font-body);
}
```

### Nav / Underline Links

```css
.nav-item {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;
  position: relative;
  padding-bottom: 4px;
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0;
  width: 0;
  height: 2px;
  background-color: var(--accent-primary);
  transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-item:hover {
  color: var(--accent-primary);
}

.nav-item:hover::after {
  width: 100%;
}
```

### Skills Marquee

```css
.skills-marquee-container {
  background-color: var(--text-primary);
  color: var(--bg-primary);
  transform: rotate(-2deg) scale(1.05);
  overflow: hidden;
}

.skills-marquee span {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 4vw, 4rem);
  font-weight: 800;
  text-transform: uppercase;
}

.skills-marquee span.dot {
  color: var(--accent-primary);
}
```

### Custom Cursor

```css
.custom-cursor {
  width: 8px; height: 8px;
  background-color: var(--accent-primary);
  border-radius: 50%;
}

.custom-cursor-follower {
  width: 40px; height: 40px;
  background-color: rgba(154, 215, 65, 0.2);
  border: 1px solid var(--accent-primary);
  border-radius: 50%;
}

/* Hover state (on .hoverable elements) */
.custom-cursor-follower--hover {
  scale: 1.5;
  background-color: rgba(154, 215, 65, 0.4);
}
```

Mark interactive elements with the `.hoverable` class to trigger cursor expansion.

### Preloader

```css
.preloader {
  position: fixed; inset: 0;
  background-color: var(--bg-primary);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader-text {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 800;
  color: var(--text-primary);
  overflow: hidden;
}

.loader-text .char {
  display: inline-block;
  transform: translateY(100%); /* GSAP animates to y: 0 */
}
```

---

## Section Patterns

**Actual section order:**
1. **Hero** — full-viewport, 2-column grid (text left, 3D shapes right). Headings use `.hero-heading` with the second line colored `--accent-primary`. Social links as underline nav items.
2. **About** — white bg (`--bg-secondary`). 2-column grid: bio + education left, profile photo right. Signature overlaps the photo container. Skills marquee at the bottom (full-bleed, rotated −2°).
3. **Experience** — warm bg (`--bg-primary`). 4-col sticky heading left, timeline list right. Border-top rule separates list from header.
4. **Projects** — white bg (`--bg-secondary`). Alternating left/right project cards with parallax image containers and circle link buttons.

**Conversion strategy:** No dedicated Contact section currently. The floating "Resume" pill button (fixed, bottom-right) is the primary CTA. Email link is in the Hero nav. Consider adding a minimal Contact section after Projects.

---

## Style Guidelines

**Style:** Motion-Driven + Editorial Typography

**Keywords:** Entrance animations, scroll parallax, custom cursor, preloader, sticky elements, marquee, asymmetric layouts, tight uppercase type, green-on-dark contrasts.

**GSAP Animation Patterns (must follow):**
- Always use `gsap.context()` scoped to the component element for cleanup.
- Run all animations in `ngZone.runOutsideAngular()` to avoid unnecessary change detection.
- Register `ScrollTrigger` inside the browser guard before use: `gsap.registerPlugin(ScrollTrigger)`.
- Clean up in `ngOnDestroy()` via `this.ctx.revert()`.
- Standard scroll entrance: `y: 50–100, opacity: 0` → `y: 0, opacity: 1`, `duration: 1–1.5`, `ease: 'power3.out'`, `start: 'top 85%'`.

---

## Anti-Patterns (Do NOT Use)

- ❌ Corporate templates
- ❌ Generic layouts
- ❌ **Emojis as icons** — Use SVG icons from Lucide (`lucide-angular`) or Font Awesome. The `☄️` in the hero badge is a current violation — replace with an SVG icon.
- ❌ **Mixed icon libraries** — The project uses both Font Awesome 6 (FA icons in HTML) and `lucide-angular` (in package.json). Consolidate to one. Prefer Lucide for new components; migrate FA usage gradually.
- ❌ **Missing `cursor: pointer`** — All clickable elements must have it, or use the `.hoverable` class which the custom cursor already responds to.
- ❌ **Layout-shifting hovers** — Use `transform: translateY()` not `margin`. The existing cards correctly use `transform`.
- ❌ **Low contrast text** — `--text-secondary: #5a5a5a` on `--bg-secondary: #ffffff` gives ~7:1 contrast — good. Do not lighten it further.
- ❌ **Instant state changes** — Always use transitions (150–600ms). The `--transition-smooth` variable is already defined.
- ❌ **Invisible focus states** — Add `:focus-visible` styles for keyboard users; currently none are defined.
- ❌ **Placeholder project backgrounds** — The current linear-gradient placeholders in the Projects section should be replaced with real screenshots or designed mockup images.
- ❌ **Unused CSS variables defined in `:root`** — `--accent-tertiary: #fed766` is declared but never referenced. Either use it or remove it.

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use Lucide SVG instead)
- [ ] All icons from a consistent set — Lucide (`lucide-angular`) preferred
- [ ] `cursor: pointer` on all clickable elements (or `.hoverable` class for custom cursor)
- [ ] Hover states with smooth transitions (0.3–0.6s)
- [ ] Light mode: text contrast ≥ 4.5:1 minimum
- [ ] Focus states visible (`:focus-visible`) for keyboard navigation
- [ ] `prefers-reduced-motion` respected — wrap GSAP init in a check
- [ ] Responsive tested at: 375px, 768px, 992px, 1440px
- [ ] No horizontal scroll on any breakpoint
- [ ] SSR guard on all DOM/window access: `isPlatformBrowser(this.platformId)`
- [ ] GSAP context created and `ctx.revert()` called in `ngOnDestroy`
- [ ] `.hoverable` class added to all interactive elements (for custom cursor)

---

## What Is Already Good vs What Needs Improvement

### Already Good

- **Color system** — all tokens defined in `:root`, used consistently via CSS variables throughout all components. No hardcoded hex values in component SCSS (except `#e5e5e5` in two places).
- **Typography** — fluid clamp-based type scale is well implemented. Tight letter-spacing and uppercase headings create a strong editorial identity.
- **GSAP animation architecture** — `gsap.context()` + `runOutsideAngular()` + `ngOnDestroy` cleanup is correctly implemented across all animated components.
- **Custom cursor** — integrates brand accent (`#9AD741`) and responds to `.hoverable` class. Hidden correctly on touch devices.
- **Preloader** — character-by-character entrance is polished and on-brand.
- **Signature placement** — `sign.svg` in the About section is thoughtfully integrated. The rotation, overlap, and drop-shadow make it feel like a design element, not a dropped asset.
- **Skills marquee** — full-bleed, inverted colors, rotated −2°. Visually bold and memorable.
- **Profile photo treatment** — `mix-blend-mode: multiply` + gradient mask makes the photo feel native to the palette.
- **Responsive layout** — all sections collapse to single-column cleanly at 992px. Hero visual hidden on mobile (correct — it relies on mousemove).
- **SSR compatibility** — browser guards are consistently applied everywhere.
- **Lenis smooth scroll** — included in dependencies.

### Needs Improvement

| Issue | Priority | Detail |
|-------|----------|--------|
| Emoji in hero badge | High | `☄️` in `.floating-badge` violates the icon anti-pattern. Replace with a Lucide or custom SVG icon. |
| Inconsistent icon library | High | Font Awesome 6 (CDN) used in templates, while `lucide-angular` is in `package.json` but not used. Consolidate to one system. |
| No `:focus-visible` styles | High | Keyboard users have no visible focus indicator. Add at minimum: `outline: 2px solid var(--accent-primary); outline-offset: 4px` in `styles.scss`. |
| No `prefers-reduced-motion` handling | Medium | GSAP animations run unconditionally. Wrap `initAnimations()` calls with `window.matchMedia('(prefers-reduced-motion: reduce)').matches` check. |
| Placeholder project images | Medium | Projects section uses gradient placeholders. Replace with real screenshots or styled mockups. |
| `--accent-tertiary: #fed766` unused | Low | Defined in `:root` but never used. Either assign it to a specific role (e.g., highlight tag, warning state) or remove it. |
| `profile-bg.svg` unused | Low | A decorative SVG asset in the same green accent family. Place it behind the About photo column as a background element at low opacity. |
| `WaterMark1.png` unused | Low | Evaluate if this duplicates `sign.svg`. Use as a watermark between sections or remove. |
| No Contact section | Low | The only contact entry point is the email link in the Hero nav. A minimal bottom section with email + LinkedIn would improve conversion. |
| `code-background` component unused | Low | `CodeBackgroundComponent` exists in the codebase but is not mounted in `app.component.html`. Either remove it or decide where to use it. |
| `#e5e5e5` not a CSS variable | Low | The image container background `#e5e5e5` is hardcoded in two places (`about.scss`, `projects.scss`). Move to `--color-surface` in `:root`. |
