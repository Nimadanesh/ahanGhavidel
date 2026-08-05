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
