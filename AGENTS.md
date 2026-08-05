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

@docs/conventions.md
@docs/workflows.md
