# Workflows — Vibe Coding with Agents

Step-by-step workflows for designing and building the **iron-seller pitch demo** with AI agents.

**Canonical workflow file:** this document (`docs/workflows.md`).

## When to use this workflow

Use this for all non-trivial UI/product work on this repo:

- Building or revising any of the **12 sequential pitch screens**
- Pitch shell (back / next / progress)
- **Screen 9** interactive demo feature (exactly one)
- Foundation work (tokens, fonts, shell) aligned to DigiHouse design system
- Polish, motion, and visual QA before a sales walkthrough

Do **not** use this workflow to expand into a full iron e-commerce, ERP, payments, or multi-tenant product — that is out of scope (see `docs/project-brief.md` §5.2).

**Product reminder:** this is a **demo / pitch sales instrument** that persuades a Bonab rebar (milgerd) iron seller to contract us to build the real web app — not the real app itself.

---

## Standard loop

1. **Brief check** — read `docs/project-brief.md` for the screen’s purpose + key message; confirm dual-audience copy rule
2. **Conventions + design authority** — `docs/conventions.md`, `docs/DESIGN_SYSTEM.md`, tokens in `src/app/globals.css`
3. **Plan** — one slice (screen or vertical concern); note mock data and CTA
4. **Build** — implement the slice; keep pages thin (`pitch/` / `demo/`)
5. **Verify** — typecheck/lint; primary navigation works; mobile-first smoke
6. **Design / motion review** — tokens, density, reduced motion; optional skills (below)
7. **Done** — meet per-slice DoD; then next slice

Prefer finishing a screen’s **message + UI + CTA** before jumping ahead.

---

## Guiding Principles

These separate a polished product UI from a "close enough" mess. Internalize them — they should inform every decision.

### 1. Completeness Beats Speed

Every builder agent must receive **everything** it needs: design tokens, layout intent, content, states, breakpoints, and asset paths. If a builder has to guess a color, font size, or padding value, the spec failed. Take the extra minute to specify one more property.

### 2. Small Tasks, Perfect Results (slice sizing)

When an agent gets "build everything," it glosses over details. When it gets one focused slice with exact token and behavior specs, it nails it.

**Default slice size for this product:**

| Slice | When |
| ----- | ---- |
| **One pitch screen** | Default unit of work (message + layout + CTA) |
| **Pitch shell only** | Progress, back/next, safe-area frame — once, early |
| **Screen 9 demo widget** | Interactive feature isolated under `src/components/demo/` |
| **Subcomponent split** | Complex screen with multiple distinct interactive parts |

- Simple screen (heading + bullets + next)? One agent.
- Complex screen + unique interactive states? Split subcomponents, then compose.
- **Complexity budget:** if a builder prompt exceeds ~150 lines of spec, split it.
- Prefer **finishing** the current screen’s intent before starting the next number in the 12-screen flow.

### 3. Foundation First

Nothing feature-level ships until foundation exists: global CSS tokens aligned to `docs/DESIGN_SYSTEM.md`, fonts, pitch shell, shared `ui/` primitives. Sequential and non-negotiable. Screen work after that can be parallel **by screen**, not by inventing new product domains.

### 4. Spec Files Are the Source of Truth

Every non-trivial screen/component gets a short spec **before** a builder is dispatched. The builder receives the spec **inline** in its prompt. The file also persists as an auditable artifact.

Suggested path: `docs/specs/<screen-or-component>.spec.md` (create `docs/specs/` when you start building). Tie each screen spec to brief screen # and id (`intro`, `product`, … `contact`).

### 5. Build Must Always Compile

Every builder runs `npm run typecheck` (or `npx tsc --noEmit`) before finishing. After merges, `npm run build` must pass. Prefer `npm run check` before calling a major slice done. A broken build is never acceptable, even temporarily.

### 6. Design Behavior, Not Only Appearance

UI is alive: hover (pointer-fine only), focus, load, empty, error. Spec **appearance and behavior** — especially for screen 9 and pitch navigation.

### 7. Original Work Only

Build **original** UI from the project brief and design system — not reverse-engineering third-party sites. No cloning/scraping workflows.

### 8. Stay Inside the Demo

Refuse scope creep into full iron shop backends, checkout, real payments, live production feeds, or multi-client CMS. Narrative mentions of those futures are copy-only unless the brief is amended.

---

## Workflow A — Bootstrap / realign this demo

1. `npm install`
2. Confirm locked decisions in brief (project `ghavidel-pitch-demo`, fa RTL, routes `/p/[step]`, agentsTEAM). Still deferred: `{{CHOSEN_DEMO_FEATURE}}`, `{{CONTACT_CHANNELS}}`.
3. Treat `docs/DESIGN_SYSTEM.md` as token authority; `globals.css` DigiHouse-aligned; UI font Iran Yekan files in `public/fonts/`.
4. Confirm `docs/conventions.md` + `AGENTS.md` match the 12-screen pitch product.
5. Metadata already points at قویدل pitch; adjust if branding changes.
6. Confirm `npm run check` passes on the shell.
7. Open your agent with `AGENTS.md` loaded; begin Workflow B.

---

## Workflow B — Plan → Design → Build → Review → Iterate

### Phase 0: Align

- [ ] Read `docs/project-brief.md` + `docs/DESIGN_SYSTEM.md` + `docs/conventions.md`
- [ ] Confirm scope: **12 linear screens** + **one** interactive feature on screen 9 — not full iron app
- [ ] List open questions; do not invent brand-critical decisions (contact, claims, feature choice)

### Phase 1: Plan

Produce a short plan (chat or `docs/specs/PLAN.md`):

1. **Screen map** — 12 ids/routes and purpose (from brief §6); `{{ROUTE_SCHEME}}`
2. **Shell** — progress, back/next, safe-area
3. **Component inventory** — `pitch/*` screens, `demo/*` for screen 9, shared `ui/`
4. **Interaction model** per screen — static narrative vs click (screen 9 is the interactive product sample)
5. **Content needs** — copy, mock iron-trade data, images; dual-audience rule
6. **Risks** — motion, RTL/`{{UI_LOCALE}}`, responsive, a11y

### Phase 2: Design foundation

Do this yourself (orchestrator), not a swarm:

1. Tokens in `globals.css` aligned to `docs/DESIGN_SYSTEM.md`
2. Fonts in `layout.tsx` (match design system)
3. Pitch shell (progress + back/next) — not a marketing mega-nav
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
- Target: `src/components/pitch/` or `src/components/demo/`

## Design tokens & layout
- Spacing, type roles, colors (**token names** from DESIGN_SYSTEM — not guessed hex)
- Breakpoint behavior (390 / 768 / 1440); mobile-first

## States & behaviors
- default / hover (pointer-fine) / focus / disabled / loading / empty / error
- Pitch nav: back / next / progress as applicable
- Triggers, transitions, motion notes

## Content
- Copy (seller “you” vs iron-buyer “audience”), image paths, aria labels
- Mock data names if any (`MOCK_*`)

## Acceptance
- [ ] Matches brief intent for this screen
- [ ] Matches design system + conventions
- [ ] Mobile-first; primary CTA / nav works
- [ ] `npm run typecheck` clean
- [ ] No full-app scope creep
```

#### Step 2 — Dispatch builders

- **Simple screen:** one builder
- **Complex screen:** one builder per subcomponent, then compose
- Each builder gets: full spec inline, token context, target path, typecheck instruction
- Prefer **git worktrees** per parallel builder
- Parallelize **different screens** only after shell + tokens are stable; avoid two agents editing the same route file

#### Step 3 — Merge

- Merge worktree branches into mainline
- Resolve conflicts with full product context
- After each merge: `npm run build`
- Fix type errors immediately

### Phase 4: Assemble

- Wire screens in `src/app/**/page.tsx` (keep pages thin)
- Shared `SCREEN_ORDER` / route map — no scattered magic next-links
- Verify linear path 1→12; verify: `npm run build`

### Phase 5: Visual QA & iterate

- [ ] Desktop 1440 — screen by screen
- [ ] Tablet 768
- [ ] Mobile 390
- [ ] Keyboard focus order and focus rings
- [ ] Hover/active states (pointer-fine)
- [ ] Empty/loading/error on screen 9 (and any interactive chrome)
- [ ] Reduced motion sanity check
- Log gaps → fix specs → fix components → re-QA

### Phase 6: Handoff checklist

- [ ] Brief and design system still accurate
- [ ] No critical `{{PLACEHOLDER}}` left in shipped UI copy (unless intentional demo labels)
- [ ] `npm run check` green
- [ ] Known limitations documented for the user
- [ ] Whole-demo DoD (below) reviewed

---

## Workflow C — Iterate on an Existing Screen

1. Reproduce the issue or goal in one sentence (include screen id if applicable).
2. Identify owning component(s) under `pitch/` or `demo/`; check whether design system must change.
3. If tokens/patterns change → update `docs/DESIGN_SYSTEM.md` + `globals.css` first (keep them in sync).
4. Patch the smallest component; avoid unrelated refactors or new product domains.
5. Visual QA the affected breakpoints/states.
6. `npm run check`

---

## Workflow D — Multi-Agent Orchestration

1. Orchestrator owns brief, design system, plan, and merge authority.
2. Each teammate: **own worktree/branch**, own file ownership when possible (one screen per owner is ideal).
3. Shared files (`globals.css`, shell, route map): only orchestrator or serialized edits.
4. Inline full specs in builder prompts — do not say "go read the doc" without pasting critical bits.
5. Merge continuously; never batch ten long-lived diverging branches.

---

## Definition of Done (per slice / screen)

A slice is done only when **all** apply:

- [ ] Matches `docs/project-brief.md` intent for that screen (purpose + key message + CTA)
- [ ] Uses design-system tokens and `docs/conventions.md` (no one-off palette bypass)
- [ ] Mobile-first; primary CTA and pitch navigation work (back / next / progress as applicable)
- [ ] Dual-audience copy rule respected (seller “you” vs iron-buyer “audience”)
- [ ] Interactive pieces have sensible default / focus / empty / loading / error as needed
- [ ] `npm run lint` and `npm run typecheck` pass for touched work; `npm run build` after merges
- [ ] No scope creep into full iron e-commerce, ops backend, or extra interactive demos outside screen 9

---

## Definition of Done (whole demo project)

The pitch demo is sales-ready when:

- [ ] All **12 screens** are reachable **in order** (linear flow)
- [ ] Screen **9** has **exactly one** interactive feature experience (`{{CHOSEN_DEMO_FEATURE}}`)
- [ ] Screens 1–8 and 10–11 deliver brief messages without a second full product demo
- [ ] Screen **12 (contact)** is complete enough for prospect follow-up — real channels when known, else explicit `{{CONTACT_CHANNELS}}` / `{{PRIMARY_CONTACT_CTA}}` owned by a human
- [ ] Short about-us for builders present (`{{ABOUT_US_BLURB}}` / `{{BUILDER_BRAND_NAME}}`)
- [ ] Visual polish suitable as a **sales / portfolio sample** (spacing, type, motion, hierarchy)
- [ ] `npm run check` green
- [ ] Critical brief placeholders filled or explicitly deferred with owner

---

## Skills usage (optional)

Installed under `.agents/skills/`. Use when the task matches; **do not invent** skills that are not installed.

| Situation | Skill |
| --------- | ----- |
| Need a multi-step improvement/roadmap plan (read-only on source) | `improve` |
| UI polish / motion decision quality | `emil-design-eng` |
| Find where motion should/shouldn’t exist (proposals only) | `find-animation-opportunities` |
| Motion audit + implementation plans (read-only) | `improve-animations` |
| Review a motion diff against a high bar | `review-animations` |
| Name a vague motion effect | `animation-vocabulary` |
| Apple-like gesture/spring foundations | `apple-design` |
| Explicit multi-variant UI exploration | `prototype` (invoke only) |
| Explicit library pick from curated list | `pick-ui-library` (invoke only) |

Platform process skills (brainstorming, debugging, verification, planning) apply when available.

---

## Pre-Dispatch Checklist

Before dispatching any builder:

- [ ] Spec written with structure, tokens, states, content, acceptance
- [ ] Screen id / brief purpose identified
- [ ] Interaction model identified
- [ ] Responsive behavior noted for mobile and desktop at minimum
- [ ] Assets/paths identified or explicitly placeholder / mock
- [ ] Prompt under ~150 lines of spec; else split
- [ ] Builder told to run `npm run typecheck` before finish
- [ ] Scope boundary clear (demo/pitch only)

---

## What NOT to Do

- **Don't skip the foundation** — building screens on default shadcn neutrals while DigiHouse is authority creates thrash
- **Don't give builders vague aesthetic prompts only** — "make it modern" without tokens/spacing is not a spec
- **Don't bundle unrelated screens** into one agent
- **Don't approximate tokens** — use names from `docs/DESIGN_SYSTEM.md`
- **Don't ship default-only states** for interactive UI (especially screen 9)
- **Don't reverse-engineer third-party sites** into this project
- **Don't leave the build broken** between merges
- **Don't build the full iron web app** “while you’re here”
- **Don't add a second interactive product demo** outside screen 9
- **Don't redefine design tokens** inside conventions or random CSS files

---

## Completion Report (template)

When a major slice is done, report:

- Screens / components built (ids)
- Specs written
- Build status (`npm run check`)
- Visual QA notes (breakpoints, residual gaps)
- Design system / token alignment notes
- Open questions / remaining `{{PLACEHOLDER}}`s for the user
