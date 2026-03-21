import { BlogPost } from '../posts.registry';

export const CLAUDE_MEMORY_FEATURE: BlogPost = {
  slug: 'claude-memory-feature',
  title: '10 Things You Can Do With Claude\'s New Memory Feature (That You Couldn\'t Before)',
  date: '2026-03-21',
  excerpt: 'Claude now remembers you across sessions. Here are 10 practical ways I\'m using it — from locking in my tech stack to building a persistent work log.',
  tags: ['claude', 'ai-tools', 'productivity', 'llm'],
  readingTime: '7 min read',
  content: `
<article class="blog-post">

  <header class="blog-post__header">
    <div class="blog-post__meta">
      <time>March 21, 2026</time>
      <span class="blog-post__reading-time">7 min read</span>
    </div>
    <h1 class="blog-post__title">10 Things You Can Do With Claude's New Memory Feature (That You Couldn't Before)</h1>
    <p class="blog-post__excerpt">I gave Claude the same context 47 times before March 2026. The same tech stack. The same tone preferences. The same "please don't suggest class-based components" reminder. Every new conversation started from zero. That's over now.</p>
  </header>

  <div class="blog-post__body prose">

    <section class="blog-section">
      <p>Anthropic rolled out persistent memory to all Claude users in early March 2026. Claude can now retain facts, preferences, and context across sessions — meaning it actually gets to know you over time rather than resetting to a blank slate every conversation.</p>

      <p>I've been using it since the first day it landed. Here are 10 concrete things I'm doing with it that were genuinely impossible before — not hypothetical features, but actual workflows I now run every day.</p>

      <figure class="blog-diagram" aria-label="Before and after Claude memory: persistent context across conversations">
        <svg viewBox="0 0 680 295" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg-title-memory">
          <title id="svg-title-memory">Before vs After Claude Memory — persistent context across conversations</title>
          <defs>
            <marker id="arrow-mem" viewBox="0 0 10 10" refX="9" refY="3" markerWidth="6" markerHeight="6" orient="auto">
              <polygon points="0 0, 10 3, 0 6" style="fill:#9AD741"/>
            </marker>
          </defs>

          <!-- Left panel: Before -->
          <rect x="10" y="10" width="305" height="270" rx="10" style="fill:#ffffff; stroke:#e5e5e5; stroke-width:1.5"/>
          <text x="162" y="38" style="font-family:sans-serif; font-size:13px; font-weight:700; fill:#1a1a1a" text-anchor="middle">BEFORE MEMORY</text>

          <!-- Session 1 -->
          <rect x="28" y="52" width="270" height="52" rx="6" style="fill:#F4F4F0; stroke:#e5e5e5; stroke-width:1"/>
          <text x="163" y="72" style="font-family:sans-serif; font-size:11px; font-weight:600; fill:#1a1a1a" text-anchor="middle">Session 1</text>
          <text x="163" y="90" style="font-family:sans-serif; font-size:10px; fill:#5a5a5a" text-anchor="middle">You: "I use Angular 19, TypeScript strict..."</text>

          <line x1="163" y1="104" x2="163" y2="118" style="stroke:#e5e5e5; stroke-width:1.5; stroke-dasharray:4,3"/>

          <!-- Session 2 -->
          <rect x="28" y="118" width="270" height="52" rx="6" style="fill:#F4F4F0; stroke:#e5e5e5; stroke-width:1"/>
          <text x="163" y="138" style="font-family:sans-serif; font-size:11px; font-weight:600; fill:#1a1a1a" text-anchor="middle">Session 2</text>
          <text x="163" y="156" style="font-family:sans-serif; font-size:10px; fill:#5a5a5a" text-anchor="middle">You: "I use Angular 19, TypeScript strict..."</text>

          <line x1="163" y1="170" x2="163" y2="184" style="stroke:#e5e5e5; stroke-width:1.5; stroke-dasharray:4,3"/>

          <!-- Session 3 -->
          <rect x="28" y="184" width="270" height="52" rx="6" style="fill:#F4F4F0; stroke:#e5e5e5; stroke-width:1"/>
          <text x="163" y="204" style="font-family:sans-serif; font-size:11px; font-weight:600; fill:#1a1a1a" text-anchor="middle">Session 3</text>
          <text x="163" y="222" style="font-family:sans-serif; font-size:10px; fill:#5a5a5a" text-anchor="middle">You: "I use Angular 19, TypeScript strict..."</text>

          <text x="163" y="258" style="font-family:sans-serif; font-size:11px; fill:#5a5a5a; font-style:italic" text-anchor="middle">Every session starts from scratch</text>

          <!-- Divider -->
          <line x1="338" y1="20" x2="338" y2="275" style="stroke:#e5e5e5; stroke-width:1.5; stroke-dasharray:5,4"/>

          <!-- Right panel: With Memory -->
          <rect x="365" y="10" width="305" height="270" rx="10" style="fill:#f0f9e0; stroke:#9AD741; stroke-width:1.5"/>
          <text x="518" y="38" style="font-family:sans-serif; font-size:13px; font-weight:700; fill:#1a1a1a" text-anchor="middle">WITH MEMORY</text>

          <!-- Memory store -->
          <rect x="383" y="50" width="270" height="50" rx="6" style="fill:#9AD741; stroke:#9AD741; stroke-width:1"/>
          <text x="518" y="70" style="font-family:sans-serif; font-size:11px; font-weight:700; fill:#ffffff" text-anchor="middle">Persistent Memory Store</text>
          <text x="518" y="88" style="font-family:sans-serif; font-size:10px; fill:#ffffff" text-anchor="middle">Stack · Tone · Preferences · Context</text>

          <line x1="518" y1="100" x2="518" y2="116" style="stroke:#9AD741; stroke-width:2" marker-end="url(#arrow-mem)"/>

          <!-- Session 1 -->
          <rect x="383" y="118" width="270" height="52" rx="6" style="fill:#ffffff; stroke:#9AD741; stroke-width:1"/>
          <text x="518" y="138" style="font-family:sans-serif; font-size:11px; font-weight:600; fill:#1a1a1a" text-anchor="middle">Session 1</text>
          <text x="518" y="156" style="font-family:sans-serif; font-size:10px; fill:#5a5a5a" text-anchor="middle">Claude already knows your full setup</text>

          <line x1="518" y1="170" x2="518" y2="184" style="stroke:#9AD741; stroke-width:2" marker-end="url(#arrow-mem)"/>

          <!-- Session 2 -->
          <rect x="383" y="186" width="270" height="52" rx="6" style="fill:#ffffff; stroke:#9AD741; stroke-width:1"/>
          <text x="518" y="206" style="font-family:sans-serif; font-size:11px; font-weight:600; fill:#1a1a1a" text-anchor="middle">Session 2</text>
          <text x="518" y="224" style="font-family:sans-serif; font-size:10px; fill:#5a5a5a" text-anchor="middle">Picks up exactly where you left off</text>

          <text x="518" y="258" style="font-family:sans-serif; font-size:11px; fill:#9AD741; font-weight:600" text-anchor="middle">Gets smarter every session</text>
        </svg>
        <figcaption>Without memory, every Claude session starts from scratch. With memory, your preferences, stack, and context persist across every conversation.</figcaption>
      </figure>
    </section>

    <section class="blog-section">
      <h2>1. Lock In Your Tech Stack Once — Forever</h2>
      <p>Before memory, opening a new Claude tab for a code question meant I'd immediately write a paragraph of context: Angular 19 standalone components, TypeScript strict mode, no NgModules, RxJS only for HTTP calls. Every. Single. Time.</p>

      <p>Now I have one memory entry that reads: <em>"My stack is Angular 19 with standalone components, TypeScript in strict mode, SCSS for styles. I never use class-based components or NgModules. For state, I use Angular Signals. RxJS is reserved for HTTP. Don't suggest Zone.js workarounds — I'm running zoneless."</em></p>

      <p>Claude reads this before responding to anything. When I ask "how do I handle this form validation?", it jumps straight to a reactive forms solution with signals — no preamble, no wrong assumptions, no explaining what standalone means again.</p>
    </section>

    <section class="blog-section">
      <h2>2. Set Your Writing Voice Permanently</h2>
      <p>I write LinkedIn posts, PR descriptions, docs, and client emails. Each one needs to sound like me — direct, no filler, no em-dash bullets. I used to paste my style guide into every conversation where I needed writing help.</p>

      <p>Now I have a voice memory: <em>"My writing style: short sentences, no filler phrases ('let's dive in', 'in today's fast-paced world'). I use numbered lists, not em-dash bullets. I write in first person. Technical but human — I assume the reader can code. Outcome first, explanation second."</em></p>

      <p>Every draft Claude helps me with now sounds consistent. I stopped second-guessing whether the output needed a full rewrite to sound like me.</p>
    </section>

    <section class="blog-section">
      <h2>3. Build a Persistent Project Brief</h2>
      <p>I work on a large Angular codebase at my day job. The app context — what it does, key constraints, team conventions — used to take five minutes to explain before getting to the actual question.</p>

      <p>I wrote a project brief and stored it in memory: the app domain, the folder structure convention, which patterns we use and avoid, the team's PR review preferences. Now when I ask "how should I structure this new feature module?", Claude answers in the context of my actual project, not some generic Angular app.</p>

      <p>This is probably the highest-ROI memory entry I have. It cut my average session startup time by more than half.</p>
    </section>

    <section class="blog-section">
      <h2>4. Create Personal Shortcut Commands</h2>
      <p>I trained Claude to respond to shorthand instructions that I use constantly:</p>

      <pre><code>Memory entry:
"When I say 'quick review', give me code review feedback in bullet
points, max 5 items, prioritize correctness over style, skip obvious
things like missing semicolons."

"When I say 'explain like I'm new to this', avoid jargon and use
real-world analogies before any technical detail."</code></pre>

      <p>These shortcuts work across every conversation now. I type "quick review:" followed by a code block and Claude knows exactly the format and depth I want. No instructions needed, no wasted tokens explaining the output format.</p>
    </section>

    <section class="blog-section">
      <h2>5. Set Standing Constraints That Never Expire</h2>
      <p>At my company, I'm frontend-only. I can't touch the backend, can't add new npm packages without a review process, and we don't use third-party component libraries beyond Angular Material. Before memory, Claude would regularly suggest "just add a Node.js endpoint" or "install ngx-something" as solutions.</p>

      <p>One memory entry eliminated this: <em>"I'm frontend-only. Never suggest backend changes, server-side code, or new npm package installations. Solutions must work within Angular Material + Angular CDK + standard browser APIs only."</em></p>

      <p>Claude now works within my actual constraints instead of the idealized version of the problem.</p>
    </section>

    <section class="blog-section">
      <h2>6. Store Your Boilerplate Preferences</h2>
      <p>Every team has boilerplate standards. Mine are specific: Angular services always use constructor injection with <code>private readonly</code>, every public method gets a JSDoc comment, observables are named with a <code>$</code> suffix, component selectors use the <code>app-</code> prefix.</p>

      <p>When I ask Claude to write a service or component, it now generates code that matches these conventions by default — not because I prompt it every time, but because the preference is stored. The output goes straight into the codebase with minimal changes.</p>

      <pre><code>// What Claude now generates automatically:
@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private readonly http: HttpClient) {}

  /** Fetches the current authenticated user's profile. */
  getProfile(): Observable&lt;UserProfile&gt; {
    return this.http.get&lt;UserProfile&gt;('/api/profile');
  }
}</code></pre>
    </section>

    <section class="blog-section">
      <h2>7. Build a Personal Glossary</h2>
      <p>Every codebase has its own vocabulary. In mine, "feature module" means something specific — a folder containing a routed component, its resolver, its service, and its models. "Helper" means a pure function in <code>utils/</code>. "Widget" is a dumb presentational component with no service dependencies.</p>

      <p>I stored these definitions. Now when I say "I need to refactor this widget into a feature module", Claude doesn't interpret "widget" as any old component — it knows exactly what I mean and generates the migration steps accordingly.</p>

      <p>This sounds minor until you realize how much friction comes from Claude's generic interpretation of domain-specific terms. Once you store your vocabulary, conversations become noticeably faster.</p>
    </section>

    <section class="blog-section">
      <h2>8. Let It Track Your Skill Gaps</h2>
      <p>I know my weak spots: RxJS operators beyond <code>map</code> and <code>switchMap</code>, advanced TypeScript generics, CSS grid in complex layouts. Before memory, I'd have to remind Claude to explain things at the right level every time.</p>

      <p>Now I have a learning profile stored: <em>"I'm comfortable with Angular Signals, basic RxJS, and TypeScript utility types. I'm actively learning advanced RxJS operators and TypeScript generics. When I use a pattern that has a cleaner alternative I might not know, point it out — don't just fix the bug."</em></p>

      <p>This turned Claude into something closer to a senior dev who pairs with me, rather than a search engine that returns the shortest answer. When I write a nested <code>subscribe()</code> call inside a component, it now flags it and shows me the <code>switchMap</code> version unprompted. My RxJS fluency improved faster in the past month than in the previous year.</p>
    </section>

    <section class="blog-section">
      <h2>9. Build a Multi-Session Work Log</h2>
      <p>I asked Claude to maintain a running work log for me. At the end of each session where we work on something meaningful, I say "log this session" — and it writes a summary in the format I specified in memory:</p>

      <pre><code>Memory entry:
"When I say 'log this session', write a 3-bullet summary:
  1. What we worked on
  2. What was decided or changed
  3. What's left / next steps
Then store it as today's date entry."</code></pre>

      <p>At the start of the next session, I say "what's in my work log?" and I get a concise handoff. This is genuinely useful for projects that span multiple days of work across many sessions. I stopped losing context between evenings.</p>
    </section>

    <section class="blog-section">
      <h2>10. Train It to Escalate When Something Matters</h2>
      <p>The most underrated thing I've set up: I told Claude when to push back on me. <em>"If I'm about to introduce a security vulnerability, a race condition, or a breaking change to a public API — tell me before writing the code. Don't just implement what I asked."</em></p>

      <p>Twice in the past two weeks, Claude has stopped mid-response to flag something I hadn't thought through. Once it caught that my proposed solution would expose a user ID in a query parameter. Once it flagged that my refactor would break the existing URL structure and affect cached deep links.</p>

      <p>That's not a Claude capability that's new. What's new is that I don't have to set this expectation in every session. It's a standing instruction now. The cost of forgetting to prompt it dropped to zero.</p>
    </section>

    <section class="blog-section">
      <h2>The Shift That Actually Matters</h2>
      <p>Memory doesn't just save setup time — though it does save a lot of it. The real shift is that Claude moves from a tool you prompt to a system that knows you.</p>

      <p>Every piece of context I've stored compounds. My stack + my voice + my project brief + my shortcut commands + my standing constraints all combine to make every session more productive than the last. A month in, the gap between "how Claude helps me" and "how Claude helps someone who hasn't set up memory" is enormous.</p>

      <p>The concrete action: spend 30 minutes today writing down everything you re-explain to Claude in every session. Your stack, your constraints, your preferred output format, your writing voice, your learning goals. Turn each one into a memory entry. The payoff compounds from the first session onward.</p>
    </section>

  </div>

  <footer class="blog-post__footer">
    <div class="blog-post__share">
      <p>Found this useful? Share it on
        <a href="https://twitter.com/intent/tweet?text=10%20things%20you%20can%20do%20with%20Claude%27s%20new%20memory%20feature&url=https://hiarchit.online/blog/claude-memory-feature"
           target="_blank" rel="noopener">X</a> or
        <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://hiarchit.online/blog/claude-memory-feature"
           target="_blank" rel="noopener">LinkedIn</a>.
      </p>
    </div>
  </footer>

</article>
  `.trim(),
};
