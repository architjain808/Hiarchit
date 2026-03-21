import { BlogPost } from '../posts.registry';

export const PROFESSIONAL_UI_UX_FOR_DEVELOPERS: BlogPost = {
  slug: 'professional-ui-ux-for-developers',
  title: 'Your App Works. Now Make It Look Professional.',
  date: '2026-03-21',
  excerpt:
    'UI/UX fundamentals and MCP tools like 21st.dev that transformed how I build polished web apps — no design degree required.',
  tags: ['UI/UX', 'Design', 'Web Dev', 'MCP', 'Frontend', 'Tools'],
  readingTime: '9 min read',
  content: `
<article class="blog-post">

  <header class="blog-post__header">
    <div class="blog-post__meta">
      <time>March 21, 2026</time>
      <span class="blog-post__reading-time">9 min read</span>
    </div>
    <h1 class="blog-post__title">Your App Works. Now Make It Look Professional.</h1>
    <p class="blog-post__excerpt">
      I shipped an app last month that made my PM say "this looks like a Google product." Three months earlier,
      the same PM had told me our dashboard "looked like it was built in 2012." The functionality was identical.
      What changed was five design fundamentals I finally committed to — and a set of MCP-powered tools that
      shortcut what normally takes years of design training.
    </p>
  </header>

  <div class="blog-post__body prose">

    <section class="blog-section">
      <h2>Why Developer-Built Apps Look "Dev-Built"</h2>

      <p>
        The problem isn't talent. It's defaults. Developers reach for browser defaults — 16px body text, 8px padding,
        blue links, system fonts. These aren't wrong. They're just not <em>designed</em>. Design is the act of making
        intentional choices. The moment you start making deliberate decisions about spacing, type, and color, your app
        stops looking accidental.
      </p>

      <p>
        Most "ugly" dev apps share three tells: inconsistent spacing (some elements 8px apart, others 24px), a single
        flat grey applied to everything secondary, and default system fonts mixed with downloaded ones. Fix these three
        things alone and you're halfway to a polished product.
      </p>

      <p>
        The good news: you don't need a design degree. You need a mental model, a handful of rules, and the right tools.
        Let me give you all three.
      </p>
    </section>

    <section class="blog-section">
      <h2>The Design Stack — Build It in This Order</h2>

      <p>
        Every professional UI is built on layers. Skip a layer and everything above it wobbles. Here's the stack I now
        follow on every project, from foundation to finish:
      </p>

      <figure class="blog-diagram" aria-label="Design stack pyramid showing five layers from foundation to finish">
        <svg
          viewBox="0 0 680 320"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-labelledby="svg-title-design-stack"
        >
          <title id="svg-title-design-stack">The Professional UI Design Stack — five layers from Spacing (foundation) to Motion (finish)</title>

          <!-- Layer 5: Motion & Delight (top, narrowest) -->
          <rect x="230" y="20" width="220" height="46" rx="8"
                style="fill:#f5f5f0; stroke:#e5e5e5; stroke-width:1.5"/>
          <text x="340" y="43" text-anchor="middle" dominant-baseline="central"
                style="fill:#5a5a5a; font-family:'Inter',sans-serif; font-size:12px; font-weight:600;">
            Motion &amp; Micro-interactions
          </text>

          <!-- Layer 4: Component Library -->
          <rect x="180" y="76" width="320" height="46" rx="8"
                style="fill:#f0f9e0; stroke:#9AD741; stroke-width:1.5"/>
          <text x="340" y="99" text-anchor="middle" dominant-baseline="central"
                style="fill:#1a1a1a; font-family:'Inter',sans-serif; font-size:12px; font-weight:700;">
            Component Library — 21st.dev · shadcn/ui
          </text>

          <!-- Layer 3: Color System -->
          <rect x="130" y="132" width="420" height="46" rx="8"
                style="fill:#f5f5f0; stroke:#e5e5e5; stroke-width:1.5"/>
          <text x="340" y="155" text-anchor="middle" dominant-baseline="central"
                style="fill:#5a5a5a; font-family:'Inter',sans-serif; font-size:12px; font-weight:600;">
            Color System — 1 accent · 2 neutrals · semantic tokens
          </text>

          <!-- Layer 2: Typography Scale -->
          <rect x="80" y="188" width="520" height="46" rx="8"
                style="fill:#f5f5f0; stroke:#e5e5e5; stroke-width:1.5"/>
          <text x="340" y="211" text-anchor="middle" dominant-baseline="central"
                style="fill:#5a5a5a; font-family:'Inter',sans-serif; font-size:12px; font-weight:600;">
            Typography Scale — 3 sizes · 2 weights · 1 font pairing
          </text>

          <!-- Layer 1: Spacing & Grid (bottom, widest, foundation) -->
          <rect x="30" y="244" width="620" height="46" rx="8"
                style="fill:#9AD741; stroke:none;"/>
          <text x="340" y="267" text-anchor="middle" dominant-baseline="central"
                style="fill:#1a1a1a; font-family:'Inter',sans-serif; font-size:13px; font-weight:700;">
            Spacing &amp; Grid System — The Foundation
          </text>

          <!-- "Foundation" label on left -->
          <text x="16" y="267" text-anchor="middle" dominant-baseline="central"
                style="fill:#9AD741; font-family:'Inter',sans-serif; font-size:10px; font-weight:700;"
                transform="rotate(-90, 16, 267)">FOUNDATION</text>

          <!-- "Finish" label on right -->
          <text x="664" y="43" text-anchor="middle" dominant-baseline="central"
                style="fill:#5a5a5a; font-family:'Inter',sans-serif; font-size:10px; font-weight:600;"
                transform="rotate(90, 664, 43)">FINISH</text>
        </svg>
        <figcaption>Build your UI stack in order — a shaky foundation makes every layer above it look wrong.</figcaption>
      </figure>
    </section>

    <section class="blog-section">
      <h2>Layer 1: Spacing &amp; Grid — Stop Eyeballing</h2>

      <p>
        Pick a base unit of <strong>8px</strong> and never deviate. Every gap, padding, and margin should be a
        multiple of 8: that's 8, 16, 24, 32, 48, or 64. Never 10px. Never 18px. Never 35px. When every gap on your
        page shares a common denominator, the layout feels harmonious even if the user can't articulate why.
      </p>

      <p>
        Tailwind CSS enforces this automatically. Its spacing scale — <code>p-2</code> (8px), <code>p-4</code> (16px),
        <code>p-6</code> (24px) — is built on the 4px base unit (half steps of 8). This is one of the biggest reasons
        Tailwind-built UIs tend to look clean out of the box: the framework physically prevents off-scale spacing.
      </p>

      <p>
        The rule I follow: when adding whitespace feels wasteful, add more. Generous space signals confidence. Cramped
        space signals panic. After I increased every section padding by 50% on our dashboard, three people independently
        said it "looked more modern" — without knowing what had changed.
      </p>
    </section>

    <section class="blog-section">
      <h2>Layer 2: Typography Scale — Maximum 3 Sizes, Minimum 2 Weights</h2>

      <p>
        Most apps need exactly three text sizes: a heading (28–36px), a label/subheading (14–16px), and body text
        (15–17px). The mistake I used to make was treating font-size like a continuous dial — 13px here, 21px there,
        17px somewhere else, 19px in a third place. It reads as chaos.
      </p>

      <p>
        A type scale is a fixed set of sizes with a defined ratio. Major Third (1.25×) is my default:
      </p>

      <pre><code>/* Major Third scale — base 16px */
--text-xs:   10.24px;
--text-sm:   12.80px;
--text-base: 16px;
--text-lg:   20px;
--text-xl:   25px;
--text-2xl:  31.25px;
--text-3xl:  39.06px;</code></pre>

      <p>
        <strong>Typescale.com</strong> (<a href="https://typescale.com" target="_blank" rel="noopener">typescale.com</a>)
        generates these in 30 seconds — pick a base, pick a ratio, copy the CSS variables straight into your stylesheet.
      </p>

      <p>
        For font pairing: one heading font (geometric sans like Outfit, DM Sans, or Sora) + one body font (humanist sans
        like Inter or Plus Jakarta Sans). Google Fonts
        (<a href="https://fonts.google.com" target="_blank" rel="noopener">fonts.google.com</a>) has curated pairing
        suggestions built in — look for the "Popular Pairings" sidebar on any font page.
      </p>
    </section>

    <section class="blog-section">
      <h2>Layer 3: Color System — One Accent, Two Neutrals</h2>

      <p>
        Your minimum viable color system: one brand accent (your primary action color), a dark neutral for text, and a
        light neutral for surfaces and borders. Every color decision flows from this. Buttons use accent. Body text uses
        dark neutral. Card backgrounds use light neutral. Secondary text sits mid-point between the two.
      </p>

      <p>
        The trap most developers fall into is using the same grey for everything: disabled buttons, borders, placeholder
        text, dividers, empty states. These elements need to be distinct. Create four or five named surface tokens:
      </p>

      <pre><code>:root {
  --surface-0: #ffffff;    /* page background */
  --surface-1: #f8f8f5;    /* card background */
  --surface-2: #f0f0ea;    /* input background */
  --surface-3: #e5e5e0;    /* borders, dividers */
  --surface-4: #d0d0c8;    /* disabled elements */
}</code></pre>

      <p>
        For picking a palette, I start at
        <strong>Coolors</strong> (<a href="https://coolors.co" target="_blank" rel="noopener">coolors.co</a>): generate,
        lock your brand accent, regenerate until the complementary neutrals feel right. Export as CSS custom properties
        and you're done.
      </p>

      <p>
        <strong>Open Props</strong> (<a href="https://open-props.style" target="_blank" rel="noopener">open-props.style</a>)
        is worth bookmarking too — it's a library of 300+ design tokens (colors, spacing, shadows, easing curves) that
        you include as a stylesheet. Think of it as a design system you can opt into piece by piece.
      </p>
    </section>

    <section class="blog-section">
      <h2>Layer 4: Component Library — Where MCPs Change Everything</h2>

      <p>
        This is where the biggest time savings are in 2026. Designing components from scratch — buttons, modals,
        dropdowns, data tables — used to take days. MCP-connected tools have compressed that to minutes.
      </p>

      <h3>21st.dev — AI Component Generation via MCP</h3>

      <p>
        <strong>21st.dev</strong> (<a href="https://21st.dev" target="_blank" rel="noopener">21st.dev</a>) is the MCP
        server I reach for first. You install it as an MCP server in Claude Code (or Cursor), and from that point
        forward you can generate production-ready UI components from a natural-language prompt, directly inside your
        editor. It pulls from a curated library of professionally designed component patterns and adapts them to your
        tech stack.
      </p>

      <p>
        Real example: I prompted "a pricing table with three tiers, highlighted middle column, toggle for
        monthly/annual, built with Tailwind" and got a working component in under 90 seconds. The component used correct
        spacing scale, semantic color tokens, and keyboard-accessible focus states. Things I would have taken 30 minutes
        to wire up from scratch.
      </p>

      <p>
        To install 21st.dev MCP in Claude Code, add it to your MCP server config:
      </p>

      <pre><code># In your Claude Code MCP settings (settings.json)
{
  "mcpServers": {
    "21st-dev": {
      "command": "npx",
      "args": ["-y", "@21st-dev/mcp@latest", "API_KEY"]
    }
  }
}</code></pre>

      <p>
        Get your API key from <a href="https://21st.dev" target="_blank" rel="noopener">21st.dev</a> — the free tier
        covers 30 component generations per month, which is plenty for personal projects.
      </p>

      <h3>shadcn/ui MCP</h3>

      <p>
        <strong>shadcn/ui</strong> (<a href="https://ui.shadcn.com" target="_blank" rel="noopener">ui.shadcn.com</a>)
        ships with its own MCP server. It gives Claude Code access to the full component documentation and can scaffold
        shadcn components directly into your project using the CLI. The components are unstyled by design — they give
        you accessible, well-structured markup and let you control every visual detail. This is the combination I
        use most: shadcn for structure, Tailwind for styling, 21st.dev when I need a complex pattern fast.
      </p>

      <pre><code># Scaffold a shadcn component with AI guidance
# (With shadcn MCP active, Claude Code reads docs and generates the right CLI command)
npx shadcn@latest add dialog
npx shadcn@latest add data-table</code></pre>

      <h3>Magic UI — Animated Components</h3>

      <p>
        <strong>Magic UI</strong> (<a href="https://magicui.design" target="_blank" rel="noopener">magicui.design</a>)
        is a library of animated React components — number counters, shimmer effects, confetti bursts, particle
        backgrounds — built on Framer Motion. Copy-paste, zero config. When a client says they want something that
        "feels alive," this is my first stop.
      </p>

      <h3>Radix UI — Accessible Primitives</h3>

      <p>
        <strong>Radix UI</strong> (<a href="https://www.radix-ui.com" target="_blank" rel="noopener">radix-ui.com</a>)
        provides headless, fully accessible component primitives. No visual styles — just the correct ARIA roles,
        keyboard interactions, and focus management. shadcn/ui is actually built on Radix primitives. If you're building
        a custom design system from scratch, Radix is your foundation layer for every interactive component.
      </p>
    </section>

    <section class="blog-section">
      <h2>Layer 5: Motion — The Finishing Touch</h2>

      <p>
        Subtle motion communicates state. A button that scales 0.97 on press feels tactile. A modal that fades and
        slides in 150ms feels native. A list that staggers its items on load feels alive. None of these are decorative
        — they're signals that tell the user what just happened.
      </p>

      <p>
        The rule: motion should reinforce information, not distract from it. Duration under 200ms reads as snappy.
        Duration over 400ms reads as slow. Use <code>ease-out</code> for elements entering the screen,
        <code>ease-in</code> for elements leaving. That's the full mental model — everything else is a variation.
      </p>

      <p>
        For Angular specifically, <code>@angular/animations</code> handles most cases without a third-party library.
        For React, <strong>Framer Motion</strong>
        (<a href="https://www.framer.com/motion/" target="_blank" rel="noopener">framer.com/motion</a>) is the
        standard — and it's what Magic UI is built on.
      </p>
    </section>

    <section class="blog-section">
      <h2>My Actual Workflow When Starting a New Project</h2>

      <p>
        Here's the exact sequence I follow, from blank repo to polished UI:
      </p>

      <ol>
        <li>
          <strong>Generate type scale</strong> at
          <a href="https://typescale.com" target="_blank" rel="noopener">typescale.com</a> — Major Third, base 16px.
          Copy into <code>:root {}</code> in my stylesheet.
        </li>
        <li>
          <strong>Pick colors</strong> at
          <a href="https://coolors.co" target="_blank" rel="noopener">coolors.co</a> — lock my brand accent, regenerate
          until neutrals feel right. Export as CSS vars.
        </li>
        <li>
          <strong>Scaffold base components</strong> with shadcn/ui CLI — buttons, inputs, cards, dialogs. Minimum
          required for the feature I'm building.
        </li>
        <li>
          <strong>Generate complex UI patterns</strong> with the 21st.dev MCP inside Claude Code — pricing tables,
          dashboards, data tables, multi-step forms. Describe what I want, get a working component.
        </li>
        <li>
          <strong>Add motion</strong> for interactive elements last — hover states, focus rings, page transitions.
          Never first.
        </li>
        <li>
          <strong>Audit with Refactoring UI</strong>
          (<a href="https://www.refactoringui.com" target="_blank" rel="noopener">refactoringui.com</a>) — the book by
          the Tailwind creators is a checklist disguised as a design book. I re-read one chapter per project and always
          find something to fix.
        </li>
      </ol>

      <p>
        This workflow takes 2–3 hours on a new project and gives me a baseline that I used to spend two days achieving.
        Most of the gain comes from committing to the spacing scale in step 1 and never breaking it.
      </p>
    </section>

    <section class="blog-section">
      <h2>Resource List</h2>

      <p>Every link I mentioned, collected in one place:</p>

      <ul>
        <li>
          <strong>21st.dev MCP</strong> —
          <a href="https://21st.dev" target="_blank" rel="noopener">21st.dev</a>
          — AI component generation via MCP server for Claude Code / Cursor
        </li>
        <li>
          <strong>shadcn/ui</strong> —
          <a href="https://ui.shadcn.com" target="_blank" rel="noopener">ui.shadcn.com</a>
          — copy-paste component library with built-in MCP support
        </li>
        <li>
          <strong>Radix UI</strong> —
          <a href="https://www.radix-ui.com" target="_blank" rel="noopener">radix-ui.com</a>
          — headless, accessible component primitives
        </li>
        <li>
          <strong>Magic UI</strong> —
          <a href="https://magicui.design" target="_blank" rel="noopener">magicui.design</a>
          — animated React components built on Framer Motion
        </li>
        <li>
          <strong>Tailwind CSS</strong> —
          <a href="https://tailwindcss.com" target="_blank" rel="noopener">tailwindcss.com</a>
          — utility-first CSS with a built-in 8px spacing scale
        </li>
        <li>
          <strong>Typescale</strong> —
          <a href="https://typescale.com" target="_blank" rel="noopener">typescale.com</a>
          — generate CSS type scales in 30 seconds
        </li>
        <li>
          <strong>Coolors</strong> —
          <a href="https://coolors.co" target="_blank" rel="noopener">coolors.co</a>
          — color palette generator with CSS export
        </li>
        <li>
          <strong>Google Fonts</strong> —
          <a href="https://fonts.google.com" target="_blank" rel="noopener">fonts.google.com</a>
          — free fonts with curated pairing suggestions
        </li>
        <li>
          <strong>Open Props</strong> —
          <a href="https://open-props.style" target="_blank" rel="noopener">open-props.style</a>
          — 300+ design tokens as CSS custom properties
        </li>
        <li>
          <strong>Framer Motion</strong> —
          <a href="https://www.framer.com/motion/" target="_blank" rel="noopener">framer.com/motion</a>
          — animation library for React
        </li>
        <li>
          <strong>Refactoring UI</strong> —
          <a href="https://www.refactoringui.com" target="_blank" rel="noopener">refactoringui.com</a>
          — design book by the Tailwind creators, practical checklist disguised as theory
        </li>
        <li>
          <strong>Haikei</strong> —
          <a href="https://haikei.app" target="_blank" rel="noopener">haikei.app</a>
          — generate SVG backgrounds, blobs, waves — free and no-login
        </li>
      </ul>
    </section>

    <section class="blog-section">
      <h2>The One Thing That Changes Everything</h2>

      <p>
        Every developer I've shown this system to asks the same question: "Where do I start?" The answer is always the
        same: spacing scale. Commit to 8px multiples before you write a single component. It doesn't cost anything,
        it takes ten minutes, and it makes every subsequent decision easier because you have a constraint.
      </p>

      <p>
        Design isn't subjective taste. It's a set of constraints you apply consistently. The tools — 21st.dev, shadcn,
        Radix — don't replace the fundamentals. They amplify them. Use the tools before you have the fundamentals and
        you'll still ship inconsistent UIs. Use the fundamentals without the tools and you'll spend too much time on
        work that's already been solved.
      </p>

      <p>
        Use both, in the right order.
      </p>
    </section>

  </div>

  <footer class="blog-post__footer">
    <div class="blog-post__share">
      <p>Found this useful? Share it on
        <a href="https://twitter.com/intent/tweet?text=Your%20App%20Works.%20Now%20Make%20It%20Look%20Professional.&url=https://hiarchit.online/blog/professional-ui-ux-for-developers"
           target="_blank" rel="noopener">X</a> or
        <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://hiarchit.online/blog/professional-ui-ux-for-developers"
           target="_blank" rel="noopener">LinkedIn</a>.
      </p>
    </div>
  </footer>

</article>
  `.trim(),
};
