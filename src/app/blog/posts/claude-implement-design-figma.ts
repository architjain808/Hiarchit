import { BlogPost } from '../posts.registry';

export const CLAUDE_IMPLEMENT_DESIGN_FIGMA: BlogPost = {
  slug: 'claude-implement-design-figma',
  title: "Claude's Built-In 'Implement Design' Skill: Turn Any Figma Link Into Code",
  date: '2026-03-23',
  excerpt: "Claude Code has a built-in skill that reads your Figma design via MCP and writes actual component code. Here's exactly how to set it up in minutes.",
  tags: ['claude-code', 'figma', 'mcp', 'ai-tools', 'frontend', 'web-dev'],
  readingTime: '8 min read',
  content: `
<article class="blog-post">

  <header class="blog-post__header">
    <div class="blog-post__meta">
      <time>March 23, 2026</time>
      <span class="blog-post__reading-time">8 min read</span>
    </div>
    <h1 class="blog-post__title">Claude's Built-In 'Implement Design' Skill: Turn Any Figma Link Into Code</h1>
    <p class="blog-post__excerpt">
      I pasted a Figma link into Claude Code and got a fully working React component in under 90 seconds.
      Not a rough draft — the actual component, with the right colors, layout, and spacing. Here's exactly how that works and how you can do it too.
    </p>
  </header>

  <div class="blog-post__body prose">

    <section class="blog-section">
      <h2>What Is the "Implement Design" Skill?</h2>
      <p>
        Claude Code ships with a set of built-in skills — focused prompts that activate specialized behavior for specific tasks.
        One of the most useful ones right now is the <strong>implement design</strong> skill, part of the <code>ui-ux-pro-max</code> skill set.
      </p>
      <p>
        When you trigger it, Claude doesn't just guess what your design looks like from a description.
        It actually <em>reads</em> your Figma file — the real layers, colors, dimensions, and component structure —
        and uses that data to write production-ready UI code.
      </p>
      <p>
        This works because of <strong>Figma MCP</strong>. MCP stands for Model Context Protocol — it's a standard that lets Claude
        connect to external tools and data sources directly inside your terminal session. Figma published an official MCP server
        that gives Claude read access to any Figma file you point it at. No screenshots, no manual copy-paste of design tokens.
        Claude reads the source file.
      </p>
      <p>
        The combination — Figma MCP + Claude Code + the implement design skill — cuts the design-to-code gap from hours to minutes.
        Here's how to set it up.
      </p>

      <figure class="blog-diagram reveal-element" aria-label="Workflow: Figma design to code via Figma MCP and Claude Code">
        <svg
          viewBox="0 0 680 220"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-labelledby="svg-title-figma-flow"
        >
          <title id="svg-title-figma-flow">Figma to Code workflow using Figma MCP and Claude Code</title>
          <defs>
            <marker id="arrowhead" viewBox="0 0 10 10" refX="9" refY="3"
                    markerWidth="6" markerHeight="6" orient="auto">
              <polygon points="0 0, 10 3, 0 6" style="fill:#5a5a5a"/>
            </marker>
          </defs>

          <!-- Step 1: Figma File -->
          <rect x="20" y="70" width="130" height="60" rx="8"
                style="fill:#f0f9e0; stroke:#9AD741; stroke-width:2"/>
          <text x="85" y="96" text-anchor="middle" dominant-baseline="central"
                style="font-family:sans-serif; font-size:13px; font-weight:700; fill:#1a1a1a">Figma File</text>
          <text x="85" y="114" text-anchor="middle" dominant-baseline="central"
                style="font-family:sans-serif; font-size:11px; fill:#5a5a5a">Your design URL</text>

          <!-- Arrow 1 -->
          <line x1="152" y1="100" x2="198" y2="100"
                style="stroke:#5a5a5a; stroke-width:1.5" marker-end="url(#arrowhead)"/>

          <!-- Step 2: Figma MCP -->
          <rect x="200" y="70" width="130" height="60" rx="8"
                style="fill:#ffffff; stroke:#e5e5e5; stroke-width:2"/>
          <text x="265" y="96" text-anchor="middle" dominant-baseline="central"
                style="font-family:sans-serif; font-size:13px; font-weight:700; fill:#1a1a1a">Figma MCP</text>
          <text x="265" y="114" text-anchor="middle" dominant-baseline="central"
                style="font-family:sans-serif; font-size:11px; fill:#5a5a5a">Reads design layers</text>

          <!-- Arrow 2 -->
          <line x1="332" y1="100" x2="378" y2="100"
                style="stroke:#5a5a5a; stroke-width:1.5" marker-end="url(#arrowhead)"/>

          <!-- Step 3: Claude Code + skill -->
          <rect x="380" y="55" width="140" height="90" rx="8"
                style="fill:#9AD741; stroke:#9AD741; stroke-width:2"/>
          <text x="450" y="88" text-anchor="middle" dominant-baseline="central"
                style="font-family:sans-serif; font-size:13px; font-weight:700; fill:#ffffff">Claude Code</text>
          <text x="450" y="106" text-anchor="middle" dominant-baseline="central"
                style="font-family:sans-serif; font-size:11px; fill:#ffffff">implement design</text>
          <text x="450" y="122" text-anchor="middle" dominant-baseline="central"
                style="font-family:sans-serif; font-size:11px; fill:#ffffff">skill active</text>

          <!-- Arrow 3 -->
          <line x1="522" y1="100" x2="568" y2="100"
                style="stroke:#5a5a5a; stroke-width:1.5" marker-end="url(#arrowhead)"/>

          <!-- Step 4: Component Code -->
          <rect x="570" y="70" width="90" height="60" rx="8"
                style="fill:#ffffff; stroke:#e5e5e5; stroke-width:2"/>
          <text x="615" y="96" text-anchor="middle" dominant-baseline="central"
                style="font-family:sans-serif; font-size:13px; font-weight:700; fill:#1a1a1a">Code</text>
          <text x="615" y="114" text-anchor="middle" dominant-baseline="central"
                style="font-family:sans-serif; font-size:11px; fill:#5a5a5a">Ready to ship</text>

          <!-- Labels below -->
          <text x="340" y="185" text-anchor="middle"
                style="font-family:sans-serif; font-size:12px; fill:#5a5a5a">
            One Figma URL → MCP reads it → Claude writes the component
          </text>
        </svg>
        <figcaption>The full pipeline: your Figma URL goes through MCP, Claude reads the actual design data, and writes production code.</figcaption>
      </figure>
    </section>

    <section class="blog-section">
      <h2>Step 1 — Get Your Figma Access Token</h2>
      <p>
        The Figma MCP server needs read access to your Figma files. You give it this through a personal access token.
        Here's how to get one:
      </p>
      <ol>
        <li>Go to <strong>figma.com</strong> and log in.</li>
        <li>Click your profile picture (top left) → <strong>Settings</strong>.</li>
        <li>Scroll to the <strong>Security</strong> section.</li>
        <li>Click <strong>Generate new token</strong>.</li>
        <li>Give it a name like <code>claude-mcp</code> and set scope to <strong>Read-only</strong>.</li>
        <li>Copy the token — you only see it once.</li>
      </ol>
      <p>
        Keep this token somewhere safe. You'll paste it into your Claude Code config in the next step.
        It only has read access, so it cannot modify your Figma files.
      </p>
    </section>

    <section class="blog-section">
      <h2>Step 2 — Add Figma MCP to Claude Code</h2>
      <p>
        Claude Code manages MCP servers through a settings file. Open your terminal and run:
      </p>
      <pre><code>claude mcp add figma-developer-mcp --transport sse https://www.figma.com/mcp/sse --header "X-Figma-Token: YOUR_TOKEN_HERE"</code></pre>
      <p>
        Replace <code>YOUR_TOKEN_HERE</code> with the token you just copied from Figma.
        That one command registers the Figma MCP server globally — it will be available in every Claude Code session from now on.
      </p>
      <p>
        To confirm it registered correctly, run:
      </p>
      <pre><code>claude mcp list</code></pre>
      <p>
        You should see <code>figma-developer-mcp</code> in the list with a status of "connected". If it shows "error",
        double-check that your token is correct and that you have network access to figma.com.
      </p>

      <p>
        Alternatively, if you want to configure it manually, open <code>~/.claude/settings.json</code> and add this inside the <code>mcpServers</code> object:
      </p>
      <pre><code>{
  "mcpServers": {
    "figma-developer-mcp": {
      "command": "npx",
      "args": ["-y", "figma-developer-mcp"],
      "env": {
        "FIGMA_API_KEY": "YOUR_TOKEN_HERE"
      }
    }
  }
}</code></pre>
      <p>
        Both approaches do the same thing. The <code>claude mcp add</code> command is faster if you're not already inside the settings file.
      </p>
    </section>

    <section class="blog-section">
      <h2>Step 3 — Copy Your Figma Link</h2>
      <p>
        Open the Figma file with the design you want to implement. Click the frame or component you want turned into code.
        Then copy the link in one of two ways:
      </p>
      <ul>
        <li><strong>Right-click the frame</strong> → Copy/Paste as → Copy link to selection</li>
        <li>Or just copy the URL from your browser's address bar</li>
      </ul>
      <p>
        A Figma link looks like this:
      </p>
      <pre><code>https://www.figma.com/design/ABC123xyz/My-Project?node-id=12-345</code></pre>
      <p>
        The <code>node-id</code> parameter is what tells Figma MCP exactly which frame or component to read.
        If you copy a link without selecting a specific frame first, it will read the whole page — which works,
        but the output will be broader. For best results, select exactly the component or screen you want.
      </p>
    </section>

    <section class="blog-section">
      <h2>Step 4 — Use the Implement Design Skill in Claude Code</h2>
      <p>
        Now open your project folder in Claude Code. This is the project where you want the generated component to live.
      </p>
      <pre><code>cd my-react-app
claude</code></pre>
      <p>
        Inside Claude Code, trigger the implement design skill by typing your prompt like this:
      </p>
      <pre><code>implement this figma design as a React component with Tailwind CSS:
https://www.figma.com/design/ABC123xyz/My-Project?node-id=12-345</code></pre>
      <p>
        The key word here is <strong>"implement"</strong> — that's what activates the <code>ui-ux-pro-max</code> skill.
        You can also be more specific about your stack:
      </p>
      <pre><code>implement this figma design as a Next.js component using shadcn/ui:
https://www.figma.com/design/ABC123xyz/My-Project?node-id=12-345</code></pre>
      <p>
        Or specify a style if the design is minimal:
      </p>
      <pre><code>implement this figma design as a Vue component, clean minimal style, no extra libraries:
https://www.figma.com/design/ABC123xyz/My-Project?node-id=12-345</code></pre>
      <p>
        Claude will call the Figma MCP tool, read the design file at that node ID, parse the layers and styles,
        and then write the component code into your project directory.
      </p>
    </section>

    <section class="blog-section">
      <h2>What Claude Actually Does When It Reads Your Figma File</h2>
      <p>
        This is the part most tutorials skip, and it's worth understanding so you can get better results.
      </p>
      <p>
        When Claude reads your Figma file via MCP, it gets back a structured JSON object containing:
      </p>
      <ul>
        <li>Every layer name and its type (frame, text, rectangle, component, etc.)</li>
        <li>Exact pixel dimensions and position values</li>
        <li>Fill colors in RGBA format</li>
        <li>Font family, font weight, font size, line height for every text node</li>
        <li>Border radius, shadows, and opacity values</li>
        <li>Component instances and their overrides</li>
      </ul>
      <p>
        Claude then maps this data to your chosen framework. A Figma frame with <code>fill: rgba(154, 215, 65, 1)</code>
        becomes <code>bg-[#9AD741]</code> in Tailwind, or <code>background-color: #9AD741</code> in plain CSS.
        A text layer with <code>fontFamily: Inter, fontWeight: 600, fontSize: 16</code> becomes the matching class or style.
      </p>
      <p>
        The result isn't pixel-perfect in every case — deeply nested auto-layout with complex constraints sometimes
        needs a small manual tweak. But it gets you to 85–90% done instantly, which is what matters.
        I used to spend 45 minutes writing boilerplate for a card component. Now that same card takes 3 minutes to review and adjust.
      </p>

      <figure class="blog-diagram reveal-element" aria-label="How Claude maps Figma data to component code">
        <svg
          viewBox="0 0 680 260"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-labelledby="svg-title-mapping"
        >
          <title id="svg-title-mapping">Figma layer data mapped to component code properties</title>

          <!-- Left side: Figma data -->
          <rect x="20" y="20" width="280" height="220" rx="10"
                style="fill:#ffffff; stroke:#e5e5e5; stroke-width:2"/>
          <text x="160" y="48" text-anchor="middle"
                style="font-family:sans-serif; font-size:13px; font-weight:700; fill:#1a1a1a">Figma JSON Data</text>

          <rect x="36" y="62" width="248" height="32" rx="5"
                style="fill:#f0f9e0; stroke:#9AD741; stroke-width:1.5"/>
          <text x="160" y="79" text-anchor="middle" dominant-baseline="central"
                style="font-family:sans-serif; font-size:11px; fill:#1a1a1a">fill: rgba(154, 215, 65, 1)</text>

          <rect x="36" y="104" width="248" height="32" rx="5"
                style="fill:#f4f4f0; stroke:#e5e5e5; stroke-width:1"/>
          <text x="160" y="121" text-anchor="middle" dominant-baseline="central"
                style="font-family:sans-serif; font-size:11px; fill:#1a1a1a">fontFamily: Inter, fontSize: 16px</text>

          <rect x="36" y="146" width="248" height="32" rx="5"
                style="fill:#f4f4f0; stroke:#e5e5e5; stroke-width:1"/>
          <text x="160" y="163" text-anchor="middle" dominant-baseline="central"
                style="font-family:sans-serif; font-size:11px; fill:#1a1a1a">borderRadius: 8, width: 320, height: 64</text>

          <rect x="36" y="188" width="248" height="32" rx="5"
                style="fill:#f4f4f0; stroke:#e5e5e5; stroke-width:1"/>
          <text x="160" y="205" text-anchor="middle" dominant-baseline="central"
                style="font-family:sans-serif; font-size:11px; fill:#1a1a1a">boxShadow: 0 2px 8px rgba(0,0,0,0.1)</text>

          <!-- Arrow -->
          <line x1="308" y1="130" x2="354" y2="130"
                style="stroke:#9AD741; stroke-width:2.5" marker-end="url(#arrowhead2)"/>
          <defs>
            <marker id="arrowhead2" viewBox="0 0 10 10" refX="9" refY="3"
                    markerWidth="6" markerHeight="6" orient="auto">
              <polygon points="0 0, 10 3, 0 6" style="fill:#9AD741"/>
            </marker>
          </defs>
          <text x="331" y="120" text-anchor="middle"
                style="font-family:sans-serif; font-size:10px; fill:#5a5a5a">maps to</text>

          <!-- Right side: code output -->
          <rect x="358" y="20" width="300" height="220" rx="10"
                style="fill:#1a1a1a; stroke:#e5e5e5; stroke-width:2"/>
          <text x="508" y="48" text-anchor="middle"
                style="font-family:sans-serif; font-size:13px; font-weight:700; fill:#9AD741">Generated Component</text>

          <text x="374" y="76"
                style="font-family:monospace; font-size:10px; fill:#9AD741">&lt;button</text>
          <text x="374" y="93"
                style="font-family:monospace; font-size:10px; fill:#ffffff">  className="bg-[#9AD741]</text>
          <text x="374" y="110"
                style="font-family:monospace; font-size:10px; fill:#ffffff">    rounded-lg w-80 h-16</text>
          <text x="374" y="127"
                style="font-family:monospace; font-size:10px; fill:#ffffff">    font-inter text-base</text>
          <text x="374" y="144"
                style="font-family:monospace; font-size:10px; fill:#ffffff">    shadow-md</text>
          <text x="374" y="161"
                style="font-family:monospace; font-size:10px; fill:#ffffff">    font-semibold"</text>
          <text x="374" y="178"
                style="font-family:monospace; font-size:10px; fill:#9AD741">&gt;</text>
          <text x="374" y="195"
                style="font-family:monospace; font-size:10px; fill:#5a5a5a">  &#123;children&#125;</text>
          <text x="374" y="212"
                style="font-family:monospace; font-size:10px; fill:#9AD741">&lt;/button&gt;</text>
        </svg>
        <figcaption>Claude reads the raw Figma layer data and maps each property to the correct framework-specific code.</figcaption>
      </figure>
    </section>

    <section class="blog-section">
      <h2>Step 5 — Review, Adjust, and Use It</h2>
      <p>
        After Claude writes the component, it will show you the generated file path and a summary of what it built.
        Open the file, check these three things:
      </p>

      <p><strong>1. Do the colors match?</strong></p>
      <p>
        If your Figma file uses design tokens (variables), Claude may have inlined the raw hex values.
        That's usually fine — but if your codebase has a theme file or CSS variables, tell Claude:
        "Replace the hardcoded hex values with my theme tokens from <code>tailwind.config.ts</code>."
        It will re-read your config and update the component in place.
      </p>

      <p><strong>2. Is the layout right?</strong></p>
      <p>
        Figma auto-layout maps pretty cleanly to flexbox. If something looks off — usually deeply nested
        responsive constraints — tell Claude the specific section: "The card header should stack vertically
        below 640px." One follow-up message usually fixes it.
      </p>

      <p><strong>3. Are the interactions wired up?</strong></p>
      <p>
        Figma designs include hover states and click interactions as prototype overlays, but those don't always
        translate directly to code. If your design had a hover effect or modal trigger, tell Claude:
        "Add a hover state that darkens the background by 10% and add an onClick handler."
      </p>

      <p>
        In my workflow, the first output from Claude is good enough to show in a PR as a starting point.
        The adjustments I make are tiny compared to writing the component from scratch.
      </p>
    </section>

    <section class="blog-section">
      <h2>The Exact Skill Prompt Format (Copy-Paste Ready)</h2>
      <p>
        Here's the exact prompt structure I use. Copy it, swap in your Figma URL and framework, and it works:
      </p>
      <pre><code>implement this figma design as a [FRAMEWORK] component:
[YOUR FIGMA URL]

Requirements:
- Use [CSS FRAMEWORK / STYLING APPROACH]
- Match the design exactly — colors, spacing, typography
- Make it responsive for mobile and desktop
- Export as a named component called [ComponentName]</code></pre>
      <p>
        Real example:
      </p>
      <pre><code>implement this figma design as a React component:
https://www.figma.com/design/KqB7Tz3WxYap/Dashboard?node-id=24-88

Requirements:
- Use Tailwind CSS with shadcn/ui where possible
- Match the design exactly — colors, spacing, typography
- Make it responsive for mobile and desktop
- Export as a named component called StatCard</code></pre>
      <p>
        The more specific you are about the component name and requirements, the cleaner the output.
        Claude will write the file, place it in your project, and give you the import path.
      </p>

      <p>
        You can also chain multiple components in one session. After the first component is done, just paste another Figma link:
      </p>
      <pre><code>now implement this one too — it's the sidebar nav:
https://www.figma.com/design/KqB7Tz3WxYap/Dashboard?node-id=24-92</code></pre>
      <p>
        Claude keeps your styling context from the previous component and applies the same conventions to the new one.
        By the time I'm done with a full page, every component uses the same spacing scale and color variables — because Claude
        remembered the pattern it established in the first component.
      </p>
    </section>

    <section class="blog-section">
      <h2>What the Skill Can't Do (Yet)</h2>
      <p>
        Honest assessment — there are things that still need manual work:
      </p>
      <ul>
        <li><strong>Complex animations</strong> — Figma prototype transitions don't transfer to CSS animations automatically. You describe the motion, Claude writes the keyframes.</li>
        <li><strong>Dynamic data binding</strong> — Claude writes the UI shell. You wire up the API calls and state management yourself. That's actually correct separation of concerns.</li>
        <li><strong>Multi-page flows</strong> — It works best on individual screens or components, not an entire user flow at once. Break large designs into smaller frames first.</li>
        <li><strong>Figma component variants</strong> — If your design uses a Figma component with 12 variants, Claude will implement the specific variant shown in the selected frame. It won't auto-generate all 12 variants unless you ask.</li>
      </ul>
      <p>
        None of these are blockers. They're just tasks you handle in the follow-up conversation, same as you would when reviewing any generated code.
      </p>
    </section>

    <section class="blog-section">
      <h2>One Concrete Action You Can Take Today</h2>
      <p>
        Pick the next UI component you have to build. Before you write a single line of code, drop the Figma link
        into Claude Code with the implement design prompt above. See how close the output is to what you'd have written manually.
      </p>
      <p>
        The first time I did this, my reaction was irritation — not because it was bad, but because I'd been spending
        45 minutes on things that took 3 minutes. The skill is already there in Claude Code. You just have to point it at your design.
      </p>
    </section>

  </div>

  <footer class="blog-post__footer">
    <div class="blog-post__share">
      <p>Found this useful? Share it on
        <a href="https://twitter.com/intent/tweet?text=Claude%27s%20Built-In%20%27Implement%20Design%27%20Skill%3A%20Turn%20Any%20Figma%20Link%20Into%20Code&url=https://hiarchit.online/blog/claude-implement-design-figma"
           target="_blank" rel="noopener">X</a> or
        <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://hiarchit.online/blog/claude-implement-design-figma"
           target="_blank" rel="noopener">LinkedIn</a>.
      </p>
    </div>
  </footer>

</article>
  `.trim(),
};
