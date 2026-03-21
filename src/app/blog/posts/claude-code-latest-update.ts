import { BlogPost } from '../posts.registry';

export const CLAUDE_CODE_LATEST_UPDATE: BlogPost = {
  slug: 'claude-code-latest-update',
  title: 'Claude Code Just Changed How I Build Software — Here\'s the Proof',
  date: '2026-03-21',
  excerpt:
    'I\'ve been using Claude Code\'s latest update — sub-agents, hooks, persistent memory, MCP servers — for two weeks straight. My review cycle dropped by half. Here\'s exactly what changed.',
  tags: ['Claude Code', 'AI Tools', 'Dev Productivity', 'Automation'],
  readingTime: '7 min read',
  content: `
<p>
  Two weeks ago I started using the latest Claude Code update (Claude 4.5/4.6 Sonnet + Opus models) for every task
  at work. My review cycle dropped by roughly half. Not because Claude writes better code — it always
  did that. Because I stopped doing the work <em>around</em> the code: formatting, linting, test running,
  context re-explaining, route finding.
</p>

<p>
  Four features made this happen. Here's what each one does and what it looks like in a real codebase.
</p>

<h2>1. Sub-agents: the work happens in parallel now</h2>

<p>
  Claude Code can spawn specialised sub-agents mid-task. You don't set them up — Claude decides when
  a sub-task needs its own isolated agent. There are purpose-built types: <strong>Explore</strong>
  (codebase search and analysis), <strong>Plan</strong> (architecture and strategy), and
  <strong>General-Purpose</strong> (web fetch, command execution, research).
</p>

<figure style="margin: 2.5rem 0;">
  <svg viewBox="0 0 680 290" width="100%" xmlns="http://www.w3.org/2000/svg" role="img"
       aria-label="Architecture diagram: Claude Code main agent spawning three sub-agents in parallel">
    <defs>
      <marker id="arrowhead" viewBox="0 0 10 10" refX="8" refY="5"
              markerWidth="6" markerHeight="6" orient="auto">
        <path d="M2 1L8 5L2 9" fill="none" stroke="#A1A1A1"
              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </marker>
    </defs>

    <!-- Main agent -->
    <rect x="215" y="16" width="250" height="60" rx="12"
          style="fill:#9AD741; stroke:none;"/>
    <text x="340" y="41" text-anchor="middle" dominant-baseline="central"
          style="fill:#1a1a1a; font-family:'Outfit',sans-serif; font-size:15px; font-weight:800;">Claude Code</text>
    <text x="340" y="60" text-anchor="middle" dominant-baseline="central"
          style="fill:#1a1a1a; font-family:'Inter',sans-serif; font-size:11px; font-weight:500;">Opus 4.6 · Sonnet 4.6</text>

    <!-- connector lines -->
    <line x1="170" y1="96" x2="100" y2="166" stroke="#e5e5e5" stroke-width="2" marker-end="url(#arrowhead)"/>
    <line x1="340" y1="76" x2="340" y2="166" stroke="#e5e5e5" stroke-width="2" marker-end="url(#arrowhead)"/>
    <line x1="510" y1="96" x2="580" y2="166" stroke="#e5e5e5" stroke-width="2" marker-end="url(#arrowhead)"/>

    <text x="340" y="134" text-anchor="middle"
          style="fill:#A1A1A1; font-family:'Inter',sans-serif; font-size:11px;">spawns in parallel</text>

    <!-- Sub-agent: Explore -->
    <rect x="14" y="166" width="186" height="64" rx="10"
          style="fill:#ffffff; stroke:#e5e5e5; stroke-width:1.5;"/>
    <text x="107" y="190" text-anchor="middle" dominant-baseline="central"
          style="fill:#1a1a1a; font-family:'Outfit',sans-serif; font-size:13px; font-weight:700;">Explore</text>
    <text x="107" y="210" text-anchor="middle" dominant-baseline="central"
          style="fill:#5a5a5a; font-family:'Inter',sans-serif; font-size:11px;">codebase search &amp; map</text>

    <!-- Sub-agent: Plan -->
    <rect x="234" y="166" width="212" height="64" rx="10"
          style="fill:#ffffff; stroke:#e5e5e5; stroke-width:1.5;"/>
    <text x="340" y="190" text-anchor="middle" dominant-baseline="central"
          style="fill:#1a1a1a; font-family:'Outfit',sans-serif; font-size:13px; font-weight:700;">Plan</text>
    <text x="340" y="210" text-anchor="middle" dominant-baseline="central"
          style="fill:#5a5a5a; font-family:'Inter',sans-serif; font-size:11px;">architecture &amp; strategy</text>

    <!-- Sub-agent: General Purpose -->
    <rect x="480" y="166" width="186" height="64" rx="10"
          style="fill:#ffffff; stroke:#e5e5e5; stroke-width:1.5;"/>
    <text x="573" y="190" text-anchor="middle" dominant-baseline="central"
          style="fill:#1a1a1a; font-family:'Outfit',sans-serif; font-size:13px; font-weight:700;">General-Purpose</text>
    <text x="573" y="210" text-anchor="middle" dominant-baseline="central"
          style="fill:#5a5a5a; font-family:'Inter',sans-serif; font-size:11px;">web fetch · run tests</text>

    <!-- merge line -->
    <line x1="340" y1="230" x2="340" y2="262" stroke="#e5e5e5" stroke-width="2" marker-end="url(#arrowhead)"/>
    <text x="340" y="278" text-anchor="middle"
          style="fill:#A1A1A1; font-family:'Inter',sans-serif; font-size:11px;">results merged → main agent writes</text>
  </svg>
  <figcaption style="text-align:center; font-size:0.8rem; color:#5a5a5a; margin-top:0.75rem;">
    Claude dispatches sub-agents that run simultaneously — the main agent synthesises and writes
  </figcaption>
</figure>

<p>
  Practical example: I asked Claude to "refactor the auth service and update all affected tests."
  Old Claude: reads files one by one, misses half the test coverage, asks clarifying questions.
  New Claude: Explore agent maps every file that imports <code>AuthService</code>, Plan agent
  designs the new interface, General-Purpose agent runs the existing test suite to capture the
  baseline — all at the same time. By the time Claude starts writing, it has a complete picture.
</p>

<p>
  The other sub-agent feature nobody talks about: <strong>worktree isolation</strong>. Sub-agents
  can work in a temporary git worktree — a full isolated copy of your repo. If the agent breaks
  the build, the worktree is discarded and your branch is untouched. Zero blast radius on risky
  tasks. This alone made me stop hesitating before large refactors.
</p>

<p>
  There's also <code>run_in_background</code>. Fire off an agent to run your full test suite
  or scrape documentation, and keep working on something else. Claude notifies you when it's done.
</p>

<h2>2. Hooks: a quality gate Claude can't bypass</h2>

<p>
  Hooks are shell commands that Claude Code runs automatically before or after specific events.
  You define them once in <code>settings.json</code> and they fire on every relevant Claude action
  — file edits, bash commands, agent spawns, session end.
</p>

<pre><code>{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "npx prettier --write \\"$CLAUDE_FILE_PATHS\\"" }
        ]
      }
    ]
  }
}</code></pre>

<p>
  That's auto-format on every Claude edit. No follow-up prompt needed. But the real power is
  that hooks can <em>block Claude's next action</em>. If your linter exits non-zero, Claude
  receives that as feedback and must fix the violation before it can continue. It's a quality
  gate Claude has to satisfy — not you. I chain three: Prettier → ESLint → TypeScript check.
  Claude cannot deliver a file that fails any of them.
</p>

<p>
  The hooks I run on every project now: auto-format on edit, run affected unit tests after logic
  file changes, and a post-session hook that prints a git diff so I know exactly what changed
  before I open the PR.
</p>

<h2>3. Persistent memory: context that survives sessions</h2>

<p>
  This is the most underrated feature. Claude Code maintains a file-based memory store per project
  at <code>~/.claude/projects/[project]/memory/</code>. It reads these at the start of every
  session and updates them when it learns something new about how you work.
</p>

<p>Four memory types:</p>

<ul>
  <li><strong>user</strong> — your experience level, preferences, workflow style</li>
  <li><strong>feedback</strong> — rules from past corrections ("never mock the database — we got burned before")</li>
  <li><strong>project</strong> — current goals, deadlines, architectural decisions, stakeholder constraints</li>
  <li><strong>reference</strong> — where things live (Linear project names, Grafana dashboards, Slack channels)</li>
</ul>

<p>
  After three sessions on a project, Claude knows: integration tests only, no mocks; the auth
  rewrite is compliance-driven not tech-debt; deployment freeze starts Thursday. You stop
  re-explaining this at the top of every session. The productivity gain here is invisible until
  you've used it for a week — then losing it would feel like losing a senior teammate.
</p>

<h2>4. MCP servers: Claude with real tools</h2>

<p>
  Model Context Protocol lets you plug external tools into Claude Code. Anthropic ships two that
  change the daily workflow immediately.
</p>

<p>
  <strong>Playwright MCP</strong> — Claude opens a real Chromium browser, navigates your app,
  clicks through flows, takes screenshots, and reports what's broken. One command to install:
</p>

<pre><code>claude mcp add playwright npx @playwright/mcp@latest</code></pre>

<p>
  Now instead of "Claude, here's the error from my test run," you say "check if the checkout
  flow still works after my cart changes" and Claude actually does it — browser open, steps
  executed, screenshot attached to its response.
</p>

<p>
  <strong>IDE MCP</strong> — Claude sees your editor's live diagnostics: TypeScript errors,
  ESLint warnings, the actual red squiggles. It fixes errors it can <em>see</em> in real time,
  not just errors that surface in build output. This closed a feedback loop I didn't even realise
  I was managing manually.
</p>

<h2>The actual workflow change</h2>

<p>
  Before: describe task → Claude implements → review → spot an edge case → re-prompt → repeat
  until you're satisfied.
</p>

<p>
  After: describe task → Claude plans (Plan agent) + maps codebase (Explore agent) simultaneously
  → implements in isolated worktree → hooks auto-format/lint/test → Claude surfaces any failures
  and fixes them → presents a verified, passing result for your review.
</p>

<p>
  You're reviewing a finished result, not a first draft. That's the shift.
</p>

<p>
  The hooks are the fastest win. If you take one thing from this post: add a Prettier hook today.
  You'll see the output quality change immediately. Then add lint. Then type-check. Build the
  quality gate one layer at a time and Claude gets progressively harder to disappoint.
</p>
  `.trim(),
};
