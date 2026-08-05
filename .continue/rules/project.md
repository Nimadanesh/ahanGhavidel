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

# ghavidel-pitch-demo — Iron Seller Pitch Demo

## What this is

A **12-screen interactive pitch demo** for **آهن فروشی قویدل · بناب** (rebar / milgerd) — blending a pitch deck with one hands-on product sample. Built by **agentsTEAM**.

**Explicit scope:** this is a **demo / portfolio sales instrument**, not the full iron-sales web application. Do not build e-commerce, payment-gateway checkout, real inventory, multi-tenant CMS, or full ops systems unless the brief is formally amended. Final deals stay phone/in-person; narrative is **attraction & retention tools**.

Product intent: [`docs/project-brief.md`](docs/project-brief.md) · Screens: [`docs/screens.md`](docs/screens.md) · Architecture: [`docs/architecture.md`](docs/architecture.md)

---

## Primary goal

Persuade the iron seller prospect to **sign a contract with us** to build the real web application — by presenting a beautiful, clear, credible sample he can walk through (often on mobile).

Every screen moves him: site vs web app → relevant to *his* business → feels one real feature → why now → contact.

---

## Audiences

Agents must never collapse these two:

| Role | Who |
| ---- | --- |
| **Our customer** | The iron seller / business owner (rebar seller in **Bonab**, Iran) — buyer of the web-app build engagement |
| **End users in the narrative** | **Iron buyers** — people/businesses who would use the *future* iron-shop web app |

**Copy rule:** In product UI text, “audience” / “users” / “customers” almost always means **iron buyers**, not us and not the seller-as-viewer. “You” = the iron seller viewing the pitch. “We” = **agentsTEAM**.

**Locale:** `fa` only, `dir="rtl"`. UI font: **Iran Yekan** (local licensed files in `public/fonts/`) — not Geist.

Full detail: project brief §4.

---

## Tech stack

Documented from the repo as-is — **do not invent new architecture or dependencies**.

| Layer | Choice |
| ----- | ------ |
| **Framework** | Next.js 16 (App Router), React 19, TypeScript strict |
| **UI** | shadcn/ui, `@base-ui/react`, `class-variance-authority`, `cn()` (`clsx` + `tailwind-merge`) |
| **Icons** | Lucide React |
| **Styling** | Tailwind CSS v4, DigiHouse oklch tokens in `src/app/globals.css` ([`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md)) |
| **UI font** | Iran Yekan via `public/fonts/` + CSS `@font-face` (see `public/fonts/README.md`) |
| **Animation helper** | `tw-animate-css` |
| **Node** | `>=24` (see `package.json` engines) |
| **Package manager** | npm (lockfile present) |

---

## Commands

| Command | Purpose |
| ------- | ------- |
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run check` | lint + typecheck + build |

After non-trivial UI work: at least `typecheck`; after merges / before claiming done: `npm run check`.

---

## Design authority

| Source | Role |
| ------ | ---- |
| [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) | **Canonical DigiHouse design system** — colors, type, spacing, radii, motion, Telegram-oriented density |
| [`src/app/globals.css`](src/app/globals.css) | Runtime CSS variables + Tailwind `@theme` |
| [`docs/conventions.md`](docs/conventions.md) | Engineering + UX conventions (no token tables) |
| [`docs/workflows.md`](docs/workflows.md) | Plan → design → build → review |

**Rules:**

1. Do **not** hardcode one-off colors/fonts/radii when a token exists.
2. If code and design system conflict, **`docs/DESIGN_SYSTEM.md` wins** unless the user explicitly overrides.
3. If `globals.css` drifts from the design system, align tokens to the design system — do not invent a third palette.
4. Telegram orientation = **compact, mobile-first, grouped blocks, one accent, clear feedback** — not a Telegram clone, not Telegram WebApp SDKs unless already in the repo and requested.
5. DigiHouse finance-product metaphors (payouts, order books) are **not** this product’s UI — reuse tokens/patterns only.

---

## Code style

- TypeScript strict — no `any`; explicit props types
- Named exports for shared components/utils (Next `page.tsx` / `layout.tsx` default exports OK)
- PascalCase components, `use*` hooks, camelCase utils
- 2-space indentation
- Tailwind utilities only; `cn()` for class merges; avoid inline `style={}` unless dynamic
- Mobile-first responsive
- Server Components by default; `"use client"` only when hooks/events require it
- Pages stay thin; UI lives in `src/components/pitch/` and `src/components/demo/`
- Match neighboring file patterns; no drive-by refactors
- **Original work only** — design from the brief and design system; do not reverse-engineer or copy third-party production sites

---

## Product structure (12-screen flow)

Linear pitch navigation: **back / next / progress** — not a large app IA. Exactly **12** screens.

| # | id | Purpose |
| - | -- | ------- |
| 1 | `intro` | Site vs web app — short frame |
| 2 | `product` | What the future iron-shop web app is |
| 3 | `differences` | More site-vs-app differences for iron selling |
| 4 | `audiences` | Who the *future app* serves (iron buyers) |
| 5 | `public-services` | Public features (price board, calculator, SMS alerts — narrative) |
| 6 | `growth-sales` | More sales + export narrative (Iraq, Turkey, neighbors) |
| 7 | `growth-ops` | Internal ops connected to the web app |
| 8 | `feature-bridge` | Prepare the hands-on sample |
| 9 | `feature-demo` | **One** interactive demo feature only |
| 10 | `why-now` | Timing + SEO via need-driven features |
| 11 | `tech-shift` | Tech / AI / agents industry shift |
| 12 | `contact` | About us (builders) + contact channels |

**Screen 9:** single interactive feature — choice **`{{CHOSEN_DEMO_FEATURE}}` still deferred**; do not implement until chosen. Isolate under `src/components/demo/`. Mock data only; no real SMS.

**Routes (locked):** `/` → `/p/1`; screens at `/p/1` … `/p/12`. Shared `SCREEN_ORDER` map — no scattered magic next-links.

---

## Agent working rules

1. **Read first** — `docs/project-brief.md`, `docs/conventions.md`, `docs/DESIGN_SYSTEM.md` (and `workflows.md` for multi-step work) before large changes.
2. **Plan → implement → verify** — confirm screen purpose from the brief; implement one vertical slice; run lint/typecheck.
3. **Foundation before features** — tokens/fonts/shell/primitives aligned to design system before polishing all 12 screens.
4. **Small slices** — one screen or one shell concern per task when possible; split oversized specs.
5. **No scope creep** — refuse full iron e-commerce, ERP, real SMS/export backends, auth platforms, multi-client CMS. Point to brief §5.2.
6. **Mock data** — realistic iron-trade labels; prefix `MOCK_` / `sample`; local mock prices only; no real SMS/backend.
7. **Beauty and clarity matter** — this is a sales instrument; polish spacing, type, motion, hierarchy.
8. **Visual QA** — mobile-first required (~390); also 768 / 1440; hover (pointer-fine only), focus, empty, loading, error on interactive UI.
9. **Copy discipline** — one idea per screen; dual-audience rule; Persian fa-only; no unapproved hype (see brief approved-claims draft).
10. **Parallel agents** — each teammate on own worktree/branch; orchestrator merges with full context.
11. Do not invent `{{CONTACT_CHANNELS}}` or choose `{{CHOSEN_DEMO_FEATURE}}` without the human.
12. **Contact CTA (temporary):** primary conversion path is reaching screen 12 «تماس با ما» until real channels exist.

---

## Skills

Installed under [`.agents/skills/`](.agents/skills/) (synced to other agent skill dirs by project tooling). **Do not invent skills** that are not installed. Use when the task matches:

| Skill | When |
| ----- | ---- |
| `animation-vocabulary` | Name a motion effect from a vague description |
| `apple-design` | Gesture/spring/translucent/Apple-like interaction foundations |
| `emil-design-eng` | UI polish, component craft, motion decision quality |
| `find-animation-opportunities` | Audit where motion should/shouldn't exist (read-only proposals) |
| `improve-animations` | Motion audit + implementation plans (read-only on source) |
| `review-animations` | Review motion diffs against a high craft bar |
| `improve` | Codebase improvement/roadmap plans for other agents (read-only) |
| `pick-ui-library` | Choose a library from the curated list (explicit invoke) |
| `prototype` | Multi-variant UI exploration behind a picker (explicit invoke) |

Prefer process skills from the agent platform (brainstorming, debugging, verification) when available and relevant.

---

## Project structure

```
src/
  app/                 # Routes, layout, globals.css
  components/
    ui/                # shadcn / primitives only
    pitch/             # 12-screen pitch UI + shell (preferred)
    demo/              # Screen 9 interactive feature only
  hooks/
  lib/                 # cn(), helpers, mock data
  types/
public/
  images/ videos/ seo/
docs/
  project-brief.md     # Product intent
  DESIGN_SYSTEM.md     # DigiHouse visual authority
  conventions.md       # Code/UX conventions
  workflows.md         # Build process
.agents/skills/        # Installed agent skills
scripts/               # sync-agent-rules.sh, etc.
```

Path alias: `@/` → `src/`.

---

## Most important notes

- **Out of scope:** full iron shop backend, checkout, real payments, live price feeds as production systems, multi-tenant white-label, cloning third-party sites, Telegram SDKs without request.
- **In scope:** 12 linear screens, one interactive demo on screen 9, mock data, contact conversion, portfolio-grade UI.
- After editing **`AGENTS.md`**, run: `bash scripts/sync-agent-rules.sh` so generated platform instruction files stay in sync.
- Thin pointers (`CLAUDE.md`, `GEMINI.md`, etc.) must keep pointing at `AGENTS.md` — do not fork conflicting rule sets.
- When `globals.css` still carries default shadcn neutrals, treat aligning it to `DESIGN_SYSTEM.md` as foundation work before pixel-polishing screens.
- Build must compile; verify with `npm run typecheck` / `npm run check` before claiming done.

# Conventions

Code and UI engineering rules for agent-driven vibe coding.  
**Visual tokens are not defined here** — see Design authority.

---

## 1. Design authority

| Source | Role |
| ------ | ---- |
| [`docs/DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) | **Canonical DigiHouse design system** — colors, type scale, spacing, radii, elevation, motion, Telegram-oriented layout patterns |
| [`src/app/globals.css`](../src/app/globals.css) | Runtime CSS variables + Tailwind v4 `@theme` wiring |

**Rules:**

1. **Do not redefine** color, spacing, type-scale, radius, or shadow token tables in this file or in ad-hoc docs.
2. Prefer semantic classes/tokens from the design system (`bg-background`, `bg-card`, `text-muted-foreground`, `border-border`, `bg-primary`, etc.).
3. **If code and design-system conflict, `docs/DESIGN_SYSTEM.md` wins** unless the user explicitly overrides in chat or an amended brief.
4. If `globals.css` drifts from the design system, **align code to the design system** (update tokens in `globals.css`), do not invent a third palette.
5. Product scope and messaging live in [`docs/project-brief.md`](./project-brief.md). Process lives in [`docs/workflows.md`](./workflows.md).

**Telegram orientation (adapted):** DigiHouse describes a native Telegram Mini App feel (grouped blocks, hairlines, compact type, one accent). This project is a **web pitch demo**, not a Telegram bot SDK product. Apply the **visual and interaction density** from the design system; do **not** add Telegram WebApp SDKs, official Telegram assets, or clone Telegram branding beyond what the design system already specifies — unless the user explicitly requests it and the dependency already exists in the repo.

---

## 2. Product context

This repo builds a **12-screen sequential pitch + interactive demo** for one prospect: a Bonab rebar (milgerd) iron seller. Goal: persuade him to commission a real iron-shop web app. It is **not** the full iron e-commerce/ops product. Exactly one interactive product feature lives on **screen 9**; screens 1–8 and 10–12 are narrative/pitch. Every convention below optimizes for a mobile-first walkthrough that feels like a compact web app, not a long marketing landing page.

---

## 3. Stack & file structure

### Stack (actual repo)

| Layer | Choice |
| ----- | ------ |
| Framework | Next.js 16 App Router, React 19, TypeScript strict |
| Styling | Tailwind CSS v4, tokens in `globals.css` |
| UI primitives | shadcn/ui + `@base-ui/react`, `cva`, `cn()` |
| Icons | `lucide-react` (stroke ~1.75 per design system) |
| Quality | `npm run lint` · `npm run typecheck` · `npm run build` · `npm run check` |

### Tree

```
src/
  app/                    # Routes, root layout, globals.css
  components/
    ui/                   # shadcn / design primitives only
    pitch/                # 12-screen pitch sections (preferred)
    demo/                 # Screen 9 interactive feature only
  hooks/                  # Shared hooks
  lib/                    # cn(), pure helpers
  types/                  # Shared TS types
public/
  images/ videos/ seo/
docs/
  project-brief.md
  DESIGN_SYSTEM.md
  conventions.md
  workflows.md
```

### Placement rules

| What | Where |
| ---- | ----- |
| Button, Input, primitives | `src/components/ui/` |
| One pitch screen’s UI | `src/components/pitch/` (e.g. `IntroScreen.tsx`) |
| Screen 9 feature | `src/components/demo/` — **isolated** from other screens’ business UI |
| Route composition | `src/app/**/page.tsx` — **thin**: import screen components, no large JSX essays |
| Shared pitch chrome (progress, back/next shell) | `src/components/pitch/` (e.g. `PitchShell.tsx`) |
| Mock data | `src/lib/demo-data.ts` or colocated under `demo/` — clearly named mock |

- Path alias: `@/` → `src/`
- Default to **Server Components**; add `"use client"` only for hooks, events, or browser APIs
- Named exports for shared components/utils; Next.js `page.tsx` / `layout.tsx` keep framework default exports

---

## 4. Naming conventions

| Kind | Convention | Example |
| ---- | ---------- | ------- |
| React components | PascalCase file + export | `GrowthSalesScreen.tsx` |
| Hooks | `use` + camelCase | `usePitchNavigation.ts` |
| Utils | camelCase file | `formatPrice.ts` |
| Types | PascalCase | `PitchScreenId` |
| CSS variables | semantic kebab (design system) | `--primary`, `--muted-foreground` |
| Mock constants | `MOCK_` or `sample` prefix | `MOCK_REBAR_PRICES` |

### 12-screen naming

Use stable screen ids everywhere (routes, analytics, component map):

| # | id | Component name (suggested) |
| - | -- | -------------------------- |
| 1 | `intro` | `IntroScreen` |
| 2 | `product` | `ProductScreen` |
| 3 | `differences` | `DifferencesScreen` |
| 4 | `audiences` | `AudiencesScreen` |
| 5 | `public-services` | `PublicServicesScreen` |
| 6 | `growth-sales` | `GrowthSalesScreen` |
| 7 | `growth-ops` | `GrowthOpsScreen` |
| 8 | `feature-bridge` | `FeatureBridgeScreen` |
| 9 | `feature-demo` | `FeatureDemoScreen` + demo widgets under `demo/` |
| 10 | `why-now` | `WhyNowScreen` |
| 11 | `tech-shift` | `TechShiftScreen` |
| 12 | `contact` | `ContactScreen` |

Routes (locked): `/` → `/p/1`; `/p/1` … `/p/12`. Keep a single `SCREEN_ORDER` constant; do not hardcode magic next-links without a shared map.

---

## 5. Component patterns

### Presentational vs feature

| Kind | Responsibility | Example |
| ---- | -------------- | ------- |
| **Primitive (`ui/`)** | Look & feel only; no pitch copy, no mock domain logic | `Button`, `Input` |
| **Pitch screen** | One screen’s layout + copy structure; may compose primitives | `IntroScreen` |
| **Demo feature** | Interactive behavior + mock data for screen 9 only | `PriceBoard` / calculator widget |
| **Shell** | Progress, back/next, safe-area frame | `PitchShell` |

### Rules

1. **One idea per screen component** — match project brief §6.
2. **Composition over god components** — if a file exceeds ~150 lines of JSX structure, split.
3. **Prefer existing `ui/` primitives** before custom controls. Extend with `cva` variants when needed.
4. **Custom only when** the design system pattern (grouped list block, inset hairline row, sticky primary CTA) is not covered by a primitive.
5. Props: explicit `type` / `interface` above the component; no `any`.
6. Merge classes with `cn()` from `@/lib/utils`.
7. No business logic inside `ui/`.
8. Do not import from `app/` into `components/` in ways that create cycles.

---

## 6. Telegram-oriented UX conventions

These are **product-feel** guidelines from DigiHouse / Telegram density — **not** a checklist to clone Telegram.

### Layout & density

- **Mobile-first.** Core flow must work at ~390px width; desktop is a centered column (design system max-width ~480px for app-like chrome) plus canvas — not a wide multi-column marketing site for the pitch spine.
- **Compact hierarchy:** short titles, scannable blocks, grouped lists on `bg-card` over `bg-background`, hairline separators — per design system block rules.
- **Thumb-friendly targets:** primary controls ≥ ~44px height where possible; bottom-weighted primary actions on action screens.
- **One primary action per screen** (usually “Next” / screen CTA). Secondary actions stay visually quieter.
- **Safe areas:** respect `env(safe-area-inset-*)` on fixed top/bottom chrome.

### Navigation (linear 12-step pitch)

- **Linear flow:** back + next; optional step indicator (e.g. `3 / 12`).
- **No labyrinth:** no mega-menus, no cross-linking that skips the story without intent.
- **Deep links optional** later; default is sequential.
- Screen 8 must clearly bridge into screen 9; screen 9 must clearly exit to screen 10.
- Progress may be subtle; never look like a 12-tab app bar.

### Motion & feedback

- Follow design-system motion: mostly **&lt; 300ms**, strong ease-out, **`transform` / `opacity` only**.
- Press feedback on tappable controls (`scale(0.97)` or equivalent per DS).
- Gate hover styles with `@media (hover: hover) and (pointer: fine)`.
- Honor `prefers-reduced-motion`: keep opacity/color comprehension aids; drop movement.
- Screen-to-screen transitions: short and purposeful; prefer instant content swap + light motion on chrome if needed. Pitch slides may use slightly longer motion than dense app chrome (still disciplined).
- **Always design:** default, loading (if async), empty, error for interactive controls — especially screen 9.

### What not to force

- Do not require Telegram `MainButton`, haptics APIs, or WebApp `themeParams` unless implemented and requested.
- Do not copy DigiHouse **finance-only** heroes (weekly payout, order book) into this iron pitch — reuse **tokens and patterns**, not unrelated product metaphors.
- Green/red: per design system, reserve for semantic up/down or error — not decorative accents.

---

## 7. Styling rules

1. **Tokens first.** No one-off hex/rgb/oklch when a semantic token exists.
2. **Tailwind utilities** mapped to tokens (`bg-primary`, `text-muted-foreground`). Avoid inline `style={}` except dynamic values (e.g. progress width).
3. **Flat elevation:** color separation (canvas vs card) over heavy shadows; shadows only for overlays/sheets per DS.
4. **One accent:** primary/Telegram blue family from DS — no second brand gradient system.
5. **Typography:** Product UI Persian text uses **Iran Yekan** (scaffold) or **Iran Sans** only — licensed files in `public/fonts/` (see `public/fonts/README.md`). **Do not use Geist** (or other Latin marketing fonts) as primary UI font. DigiHouse scale still applies for sizes/weights; family is Iran Yekan/Sans, then system UI fallback.
6. **Numbers** in any price/calculator UI: `tabular-nums` / `.tnum`.
7. **RTL required:** `lang="fa"` `dir="rtl"` on `html`. Use logical properties (`ps`/`pe`, `ms`/`me`, `start`/`end`) — do not hardcode left/right for core layout. **fa-only** — no multi-language UI in this demo.
8. **Responsive policy:** mobile-first; enhance spacing/type slightly at `sm`/`md`; do not invent desktop-only critical actions.
9. **Icons:** `lucide-react`, `currentColor`, sizes 16/20/24 per DS.

---

## 8. Content & copy conventions

### Two audiences (mandatory)

| Voice in UI | Who |
| ----------- | --- |
| “You” / business owner | The **iron seller** viewing the pitch |
| “Audience” / customers / buyers | **Iron buyers** in the *future product* narrative |
| “We” | **agentsTEAM** |

Never write pitch copy that confuses “our lead” with “his customers.” See project brief §4.3.

### Writing rules

- **One idea per screen**; short scannable blocks; bullets over paragraphs.
- Concrete iron-trade language (rebar/milgerd, prices, Bonab) over vague “digital transformation.”
- CTAs **advance the pitch** (“Continue”, “Try the sample”, “Contact us”) — not random external links mid-story.
- No lorem ipsum in sales-ready builds.
- No invented claims, phones, or stats — use brief placeholders / approved copy only.
- Screen 9 framed as a **sample** of the future app, not the full system.

---

## 9. State, data, and demo boundaries

| Topic | Rule |
| ----- | ---- |
| **Mock data** | Default for all domain data (prices, products, alerts). Label samples honestly if needed. |
| **Real backend** | Out of scope unless user explicitly adds it. |
| **Screen 9** | Only interactive product demo. Isolate components + state under `components/demo/`. |
| **Screens 1–8, 10–12** | Narrative/static or light UI chrome; no second full interactive product. |
| **Auth / payments / inventory** | Out of scope for this demo. |
| **Global state libs** | Do not add Redux/Zustand/etc. unless brief requires; prefer React state + URL step for pitch index. |
| **Env secrets** | Never commit `.env*`; contact endpoints use public placeholders until filled. |
| **Scope creep** | Full iron e-commerce, ERP, multi-tenant CMS, real export workflows → **refuse**; point to project brief §5.2. |

Screen 9 feature choice: `{{CHOSEN_DEMO_FEATURE}}` **deferred** (see brief candidates A–C). Do not implement until chosen. No real SMS. Local mock prices only.

---

## 10. Quality bar / Definition of done (UI)

A UI task is done when:

1. Matches **`docs/DESIGN_SYSTEM.md`** (tokens, density, motion discipline).
2. Matches **`docs/project-brief.md`** for that screen’s purpose and key message.
3. Mobile ~390, tablet ~768, desktop ~1440: core flow usable; pitch readable.
4. Keyboard focus visible; buttons/links are real controls; images have meaningful `alt` (or empty if decorative).
5. Contrast via semantic tokens; no random low-contrast grays.
6. Loading/empty/error handled for interactive pieces.
7. `npm run lint` and `npm run typecheck` pass; after structural UI merges, `npm run check` (or at least `build`) passes.
8. No hardcoded palette bypass without updating the design system **and** `globals.css` together.
9. No clone/scrape of third-party production UIs.

---

## 11. Do / Don't

### Do

- Read brief + design system before building a screen
- Keep pages thin; put UI in `components/pitch` or `components/demo`
- Use `cn()`, `cva`, and existing `ui/` primitives
- Ship one primary CTA per screen
- Keep the 12-step flow linear and obvious
- Isolate screen 9 interactivity
- Use mock data with realistic iron-trade labels
- Verify with lint/typecheck after non-trivial UI work
- Mark unknowns with `{{PLACEHOLDER}}` instead of inventing business facts

### Don't

- Duplicate design-token tables into new markdown or random CSS files
- Bypass tokens with one-off colors/fonts when a token exists
- Build full e-commerce, auth, or ops systems “while you’re here”
- Add a second interactive product demo outside screen 9
- Use desktop-only hover mazes for critical pitch actions
- Animate layout properties or use `ease-in` on UI motion
- Confuse iron seller vs iron-buyer “audience” in copy
- Reverse-engineer or copy third-party sites
- Add Telegram SDKs or official Telegram brand assets without explicit request
- Commit secrets or real personal data in mock content

---

## Quick reference links

| Doc | Use |
| --- | --- |
| [project-brief.md](./project-brief.md) | Goals, 12 screens, scope |
| [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) | Visual tokens & Telegram-like patterns |
| [workflows.md](./workflows.md) | Plan → build → review process |
| `src/app/globals.css` | Live CSS variables |

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
