<!-- AUTO-GENERATED from AGENTS.md — do not edit directly.
     Run `bash scripts/sync-agent-rules.sh` to regenerate. -->

---
description: Project conventions for BASE-TEMPLATE
alwaysApply: true
---
<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# BASE-TEMPLATE — Agent-Driven UI/UX Vibe Coding

## What This Is
A reusable starter template for designing and building original UI/UX with AI coding agents. The Next.js + shadcn/ui + Tailwind v4 base is pre-scaffolded. Fill in the project docs, then vibe-code section by section with specs, parallel builders, and visual QA.

## Tech Stack
- **Framework:** Next.js 16 (App Router, React 19, TypeScript strict)
- **UI:** shadcn/ui (Radix primitives, Tailwind CSS v4, `cn()` utility)
- **Icons:** Lucide React (default — extend with custom SVGs as needed)
- **Styling:** Tailwind CSS v4 with oklch design tokens
- **Deployment:** Vercel

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — ESLint check
- `npm run typecheck` — TypeScript check
- `npm run check` — Run lint + typecheck + build

## Code Style
- TypeScript strict mode, no `any`
- Named exports, PascalCase components, camelCase utils
- Tailwind utility classes, no inline styles
- 2-space indentation
- Responsive: mobile-first

## Design Principles
- **Beauty-first** — every pixel matters; polish spacing, type, motion, and hierarchy
- **Spec before build** — write component specs (structure, tokens, states, responsive) before dispatching builders
- **Small tasks, perfect results** — one focused component per builder; split when a prompt exceeds ~150 lines of spec
- **Design system as source of truth** — colors, type, spacing, and components live in `docs/design-system.md` and tokens in `globals.css`
- **Original work** — design and build from the project brief; do not reverse-engineer or copy third-party sites
- **Build must always compile** — every builder verifies `npx tsc --noEmit`; after merges, `npm run build` must pass

## Project Structure
```
src/
  app/              # Next.js routes
  components/       # React components
    ui/             # shadcn/ui primitives
  lib/
    utils.ts        # cn() utility (shadcn)
  types/            # TypeScript interfaces
  hooks/            # Custom React hooks
public/
  images/           # Project images
  videos/           # Project videos
  seo/              # Favicons, OG images, webmanifest
docs/
  project-brief.md  # Goals, audience, brand, constraints
  design-system.md  # Tokens, type, components
  conventions.md    # Code style and folder patterns
  workflows.md      # Plan → design → build → review → iterate
skills/             # Agent skills (add later)
scripts/            # Agent rule sync and project scripts
```

## Agent Behavior
1. **Read project context first** — `docs/project-brief.md`, `docs/design-system.md`, `docs/conventions.md`, `docs/workflows.md`
2. **Plan before coding** — confirm goals, pages, and component inventory with the user when scope is unclear
3. **Foundation first** — tokens, fonts, layout shell, shared primitives before feature sections
4. **Spec → build → merge** — write specs, dispatch small builder tasks (prefer worktrees for parallel work), merge carefully
5. **Visual QA** — desktop (1440), tablet (768), mobile (390); check hover, focus, empty, loading, and error states
6. **No drive-by refactors** — change only what the task requires; match existing patterns

## MOST IMPORTANT NOTES
- When launching agent teams, ALWAYS have each teammate work in their own worktree branch and merge everyone's work at the end, resolving merge conflicts with full orchestrator context.
- After editing `AGENTS.md`, run `bash scripts/sync-agent-rules.sh` to regenerate platform-specific instruction files.
- Skills live in `skills/` (and platform skill dirs when added). Do not invent skills unless the user asks.
- Fill `{{PLACEHOLDER}}` values in docs before starting a real product build.

# Conventions

Code style, naming, folder structure, and component patterns for BASE-TEMPLATE.

## Language & Tooling

- **TypeScript** strict — no `any`; prefer explicit props interfaces
- **React 19** + **Next.js 16** App Router
- **ESLint** via `eslint-config-next`
- Quality gate: `npm run check` (lint + typecheck + build)

## Formatting

- 2-space indentation
- Prefer trailing structure consistent with neighboring files
- No drive-by reformatting of unrelated files

## Naming

| Kind | Convention | Example |
| ---- | ---------- | ------- |
| Components | PascalCase | `HeroSection.tsx` |
| Hooks | `use` + camelCase | `useMediaQuery.ts` |
| Utils | camelCase | `formatDate.ts` |
| Types / interfaces | PascalCase | `PricingTier` |
| CSS variables | kebab semantic tokens | `--primary`, `--muted-foreground` |
| Files | Match default export or main symbol | `button.tsx` in `ui/` |

- **Named exports** for components and utils (except Next.js `page.tsx` / `layout.tsx` route defaults)
- Avoid default exports for shared UI

## Folder Structure

```
src/
  app/                 # Routes, layouts, globals.css only
  components/          # Feature and section components
    ui/                # shadcn / primitive design-system components
  hooks/               # Shared React hooks
  lib/                 # Pure utils (cn, helpers)
  types/               # Shared TypeScript types
public/
  images/
  videos/
  seo/
docs/                  # Project brief, design system, workflows
skills/                # Agent skills (user-supplied)
scripts/               # Maintenance scripts
```

### Placement rules

- **Primitives** (Button, Input) → `src/components/ui/`
- **Sections / features** → `src/components/` (or `src/components/<feature>/` when a feature grows)
- **Route-only composition** → `src/app/**/page.tsx` imports sections; keep pages thin
- **No business logic in `ui/`** — primitives stay presentational

## Components

- Props: typed interface or `type` co-located above the component
- Use `cn()` from `@/lib/utils` to merge class names
- Tailwind utility classes only — no inline `style={}` unless dynamically unavoidable
- Prefer composition over giant prop APIs
- Client components: add `"use client"` only when hooks/events require it; default to Server Components

## Styling

- Design tokens live in `src/app/globals.css` and are documented in `docs/design-system.md`
- Use semantic tokens (`bg-background`, `text-muted-foreground`) over raw colors
- Mobile-first breakpoints
- Respect `prefers-reduced-motion` for non-essential animation

## State & Data

- Local UI state: React state / context as needed
- Server data: follow Next.js App Router patterns for the feature
- Do not invent global state libraries unless the brief requires them

## Accessibility

- Interactive elements must be keyboard reachable
- Prefer native elements (`button`, `a`, `label`) before ARIA
- Focus-visible styles via tokens (`ring`)
- Images: meaningful `alt` (or empty alt for decorative)

## Git & Agent Collaboration

- Small, focused changes per task
- Parallel agents: **one worktree/branch per teammate**; orchestrator merges
- Never commit secrets (`.env*`)
- After editing `AGENTS.md`, run `bash scripts/sync-agent-rules.sh`

## Imports

- Path alias: `@/` → `src/`
- Group: external → internal `@/` → relative
- Do not import from `app/` into `components/` in ways that create cycles

## What Not To Do

- Do not reverse-engineer or copy third-party production sites into this project
- Do not add dependencies without a clear need and user agreement for non-trivial libs
- Do not skip `typecheck` / build verification after structural UI work
- Do not put one-off hex colors or font sizes that bypass the design system without updating `design-system.md`

# Workflows — Vibe Coding with Agents

Step-by-step workflows for designing and building original UI/UX with AI agents in BASE-TEMPLATE.

## Guiding Principles

These separate a polished product UI from a "close enough" mess. Internalize them — they should inform every decision.

### 1. Completeness Beats Speed

Every builder agent must receive **everything** it needs: design tokens, layout intent, content, states, breakpoints, and asset paths. If a builder has to guess a color, font size, or padding value, the spec failed. Take the extra minute to specify one more property.

### 2. Small Tasks, Perfect Results

When an agent gets "build the entire features section," it glosses over details. When it gets a single focused component with exact token and behavior specs, it nails it.

- Simple banner (heading + button)? One agent.
- Complex section with 3 card variants and unique hover states? One agent per variant + one for the section wrapper.
- **Complexity budget:** if a builder prompt exceeds ~150 lines of spec, split it.

### 3. Foundation First

Nothing feature-level ships until foundation exists: global CSS tokens, fonts, base layout shell, shared primitives. This is sequential and non-negotiable. Everything after can be parallel.

### 4. Spec Files Are the Source of Truth

Every non-trivial component gets a short spec **before** a builder is dispatched. The builder receives the spec **inline** in its prompt. The file also persists as an auditable artifact.

Suggested path: `docs/specs/<component-name>.spec.md` (create `docs/specs/` when you start building).

### 5. Build Must Always Compile

Every builder runs `npx tsc --noEmit` (or project typecheck) before finishing. After merges, `npm run build` must pass. A broken build is never acceptable, even temporarily.

### 6. Design Behavior, Not Only Appearance

UI is alive: hover, focus, scroll, load, empty, error. Spec **appearance and behavior** — triggers, before/after, transition timing.

### 7. Original Work Only

This template is for **original** product UI from the project brief and design system — not reverse-engineering third-party sites.

---

## Workflow A — Start a New Project

1. Copy BASE-TEMPLATE into a new repo/folder.
2. `npm install`
3. Fill `docs/project-brief.md` (`{{PLACEHOLDER}}`s).
4. Fill `docs/design-system.md`; implement tokens in `src/app/globals.css` and fonts in `src/app/layout.tsx`.
5. Update `layout.tsx` metadata (`title`, `description`).
6. Confirm `npm run check` passes on the empty shell.
7. Open your agent with `AGENTS.md` loaded; begin Workflow B.

---

## Workflow B — Plan → Design → Build → Review → Iterate

### Phase 0: Align

- [ ] Read project brief + design system
- [ ] Confirm in-scope pages and primary flows with the user
- [ ] List open questions; do not invent brand-critical decisions

### Phase 1: Plan

Produce a short plan (chat or `docs/specs/PLAN.md`):

1. **Page map** — routes and purpose
2. **Section inventory** — top-to-bottom per page
3. **Component inventory** — shared vs page-specific
4. **Interaction model** per section — static | click | hover | scroll | time
5. **Content needs** — real copy, placeholders, images
6. **Risks** — motion, responsive complexity, a11y

### Phase 2: Design foundation

Do this yourself (orchestrator), not a swarm:

1. Tokens in `globals.css` aligned to `design-system.md`
2. Fonts in `layout.tsx`
3. Shell layout (nav/footer placeholders if needed)
4. Essential `ui/` primitives via shadcn as required
5. Verify: `npm run build`

### Phase 3: Spec → dispatch → merge (core loop)

For each section (top to bottom):

#### Step 1 — Spec

Write `docs/specs/<name>.spec.md`:

```markdown
# <ComponentName> Specification

## Overview
- **Target file:** `src/components/<ComponentName>.tsx`
- **Page / section:** ...
- **Interaction model:** static | click-driven | hover | scroll-driven | time-driven

## Structure
- Element hierarchy / subcomponents

## Design tokens & layout
- Spacing, type roles, colors (token names, not guessed hex)
- Breakpoint behavior (390 / 768 / 1440)

## States & behaviors
- default / hover / focus / disabled / loading / empty / error
- Triggers, transitions, motion notes

## Content
- Copy, image paths, aria labels

## Acceptance
- [ ] Matches design system
- [ ] Responsive checks
- [ ] `npx tsc --noEmit` clean
```

#### Step 2 — Dispatch builders

- **Simple section:** one builder
- **Complex section:** one builder per subcomponent, then wrapper
- Each builder gets: full spec inline, token context, target path, typecheck instruction
- Prefer **git worktrees** per parallel builder
- Do not wait — extract/spec the next section while builders run

#### Step 3 — Merge

- Merge worktree branches into mainline
- Resolve conflicts with full product context
- After each merge: `npm run build`
- Fix type errors immediately

### Phase 4: Assemble

- Wire sections in `src/app/**/page.tsx` (keep pages thin)
- Page-level behavior: sticky nav, scroll regions, providers
- Verify: `npm run build`

### Phase 5: Visual QA & iterate

- [ ] Desktop 1440 — section by section
- [ ] Tablet 768
- [ ] Mobile 390
- [ ] Keyboard focus order and focus rings
- [ ] Hover/active states
- [ ] Empty/loading/error if applicable
- [ ] Reduced motion sanity check
- Log gaps → fix specs → fix components → re-QA

### Phase 6: Handoff checklist

- [ ] Brief and design system still accurate
- [ ] No `{{PLACEHOLDER}}` left in shipped UI copy (unless intentional)
- [ ] `npm run check` green
- [ ] Known limitations documented for the user

---

## Workflow C — Iterate on an Existing Screen

1. Reproduce the issue or goal in one sentence.
2. Identify owning component(s) and whether the design system must change.
3. If tokens/patterns change → update `design-system.md` + `globals.css` first.
4. Patch the smallest component; avoid unrelated refactors.
5. Visual QA the affected breakpoints/states.
6. `npm run check`

---

## Workflow D — Multi-Agent Orchestration

1. Orchestrator owns brief, design system, plan, and merge authority.
2. Each teammate: **own worktree/branch**, own file ownership when possible.
3. Shared files (`globals.css`, `page.tsx`): only orchestrator or serialized edits.
4. Inline full specs in builder prompts — do not say "go read the doc" without pasting critical bits.
5. Merge continuously; never batch ten long-lived diverging branches.

---

## Pre-Dispatch Checklist

Before dispatching any builder:

- [ ] Spec written with structure, tokens, states, content, acceptance
- [ ] Interaction model identified
- [ ] Responsive behavior noted for mobile and desktop at minimum
- [ ] Assets/paths identified or explicitly placeholder
- [ ] Prompt under ~150 lines of spec; else split
- [ ] Builder told to run typecheck before finish

---

## What NOT to Do

- **Don't skip the foundation** — building sections on default tokens and "fixing colors later" creates thrash
- **Don't give builders vague aesthetic prompts only** — "make it modern" without tokens/spacing is not a spec
- **Don't bundle unrelated sections** into one agent
- **Don't approximate tokens** — use names from the design system
- **Don't ship default-only states** for interactive UI
- **Don't reverse-engineer third-party sites** into this template
- **Don't leave the build broken** between merges

---

## Completion Report (template)

When a major slice is done, report:

- Sections / components built
- Specs written
- Build status (`npm run check`)
- Visual QA notes (breakpoints, residual gaps)
- Design system updates made
- Open questions for the user
