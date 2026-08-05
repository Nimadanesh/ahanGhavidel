# Architecture — Iron Seller Pitch Demo (Ghavidel / قویدل)

Lean architecture for agents. **Not** an enterprise system design.  
Product intent: [`project-brief.md`](./project-brief.md) · Screen copy/IA: [`screens.md`](./screens.md) · Engineering: [`conventions.md`](./conventions.md) · Visual: [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md)

---

## 1. Purpose & non-goals

### Purpose

A **12-screen sequential pitch + demo** web experience that shows iron shop **قویدل (Ghavidel)** in **Bonab** what a professional iron-shop web app could do — and persuades the owner to **contract us** to build the real product.

Narrative promise of the *future* product: **customer attraction & retention tools** (prices, calculators, alerts, light ops). **Final deals stay phone / in-person** — traditional trust is preserved.

### Non-goals (this repo)

| Out of scope | Why |
| ------------ | --- |
| Online iron checkout / payment gateway | Bonab rebar is not bought via PSP in this model |
| Full e-commerce, inventory ERP, multi-tenant CMS | Demo/pitch only |
| Real SMS provider, live mill price feeds, admin backend | Narrative + mock only |
| Telegram WebApp SDK | Not in repo; not required for the pitch |
| Multiple interactive product demos | **Screen 9 only** |

---

## 2. System context

```
┌─────────────────────────────────────────────────────────┐
│  Browser (mobile-first walkthrough / meeting laptop)    │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Pitch shell                                      │  │
│  │  • Header (builder + shop lines)                  │  │
│  │  • Screen body (1 of 12)                          │  │
│  │  • Footer (page # + prev/next) + swipe            │  │
│  │         │                                         │  │
│  │         ▼  only on screen 9                       │  │
│  │  ┌─────────────────────┐                          │  │
│  │  │ Demo island (mock)  │                          │  │
│  │  └─────────────────────┘                          │  │
│  └───────────────────────────────────────────────────┘  │
│  Content: static/local Persian copy + mock data         │
│  No required backend                                    │
└─────────────────────────────────────────────────────────┘
```

Two layers of “product”:

1. **Pitch surface** — marketing/education screens (1–8, 10–12)  
2. **Demo island** — one hands-on feature (9), isolated components + local state  

---

## 3. Information architecture

### Linear flow

Exactly **12** screens in fixed order. Primary path is sequential; optional deep-link by route is fine.

```
1 Intro → 2 Product → 3 Attract/Retain → 4 Audiences → 5 Spine features
  → 6 Export path → 7 Internal ops → 8 Feature bridge → 9 Demo
  → 10 Why now → 11 Tech/AI → 12 Contact
```

### Shared chrome (all screens)

| Region | Content |
| ------ | ------- |
| **Header** | Right-aligned (RTL-aware): line 1 `توسعه کسب و کار - نرم افزار` · line 2 `آهن فروشی قویدل . بناب` — white/light text per design direction |
| **Body** | Active screen content only |
| **Footer** | Page indicator (`n / 12` or equivalent) · prev arrow · next arrow |

### Navigation requirements

| Mechanism | Requirement |
| --------- | ----------- |
| Footer arrows | Previous / next; disable or no-op at ends as appropriate |
| **Touch swipe** | Horizontal finger swipe between screens (document as UX requirement; implement with shell) |
| Keyboard (nice-to-have) | Arrow keys when not focused in an input (esp. screen 9) |
| Progress | Footer page number always reflects current index 1–12 |

Do not build a labyrinth of cross-links that break the story. Secondary links (e.g. jump to contact) only if explicitly requested later.

Full per-screen copy: **[`docs/screens.md`](./screens.md)**.

---

## 4. Routing map

**Chosen scheme:** App Router dynamic segment under `/p/[step]`

| Route | Screen |
| ----- | ------ |
| `/` | Redirect to `/p/1` |
| `/p/1` … `/p/12` | Screens 1–12 |
| Invalid step | Redirect to nearest valid or `/p/1` |

**Why this scheme**

- Matches Next.js App Router already in the repo  
- Stable numeric order; easy footer math  
- Deep-link friendly for “open on screen 9 in a meeting”  
- Single dynamic page can compose shell + screen registry (thin route file)

**Alternative rejected for now:** twelve separate static folders (`/intro`, …) — more files, same behavior. Can migrate later without changing screen ids.

**Screen ids** (stable in code, independent of URL):  
`intro` · `product` · `attract-retain` · `audiences` · `spine` · `export` · `ops` · `feature-bridge` · `feature-demo` · `why-now` · `tech-shift` · `contact`

Shared constant (to implement later): `SCREEN_ORDER` in e.g. `src/lib/pitch-screens.ts`.

---

## 5. Layering (real folders)

```
src/
  app/
    layout.tsx              # Root html/body, fonts, metadata
    globals.css             # Design tokens (align to DESIGN_SYSTEM.md)
    page.tsx                # Redirect → /p/1
    p/[step]/page.tsx       # Thin: resolve step → screen component
  components/
    ui/                     # shadcn primitives only (Button, …)
    pitch/                  # Shell + one file (or folder) per screen
      PitchShell.tsx        # Header + footer + swipe/nav wiring
      PitchHeader.tsx
      PitchFooter.tsx
      screens/              # IntroScreen, ProductScreen, …
    demo/                   # Screen 9 island ONLY
  hooks/                    # e.g. usePitchNavigation (optional)
  lib/
    utils.ts                # cn()
    pitch-screens.ts        # order, ids, titles metadata (later)
    demo-data.ts            # MOCK_* for screen 9 (later)
  types/                    # PitchStep, ScreenId, …
docs/                       # brief, DS, conventions, this file, screens.md
public/                     # static assets
```

**Minimal additions vs empty template:** `app/p/[step]/`, `components/pitch/`, `components/demo/`. No new state libraries. No new npm packages required for architecture.

---

## 6. Data strategy

| Concern | Approach |
| ------- | -------- |
| Pitch copy | Static content in screen components or small content modules; **Persian UI** source in `docs/screens.md` |
| Prices / calculators / lists | **Mock/local only** (`MOCK_*`) |
| Screen 9 | Client state + mock data; no API |
| Future real product | Mentioned in narrative (admin ease, SMS, PWA offline) — **not implemented** here |
| Telegram | Not a runtime dependency |

**Architectural constraint (future product narrative, screen 5):** price update must feel as easy as a Telegram message or ~3 clicks — if hard, the real product dies. Demo only **explains** this; does not build the admin.

---

## 7. Navigation & state

| State | Where | Notes |
| ----- | ----- | ----- |
| Current step `1…12` | URL `/p/[step]` as source of truth | Shareable, refresh-safe |
| Prev/next | `router.push` to adjacent step | Footer + swipe |
| Swipe gesture | Client shell | Threshold + horizontal intent; ignore vertical scroll |
| Screen 9 local UI state | Inside `components/demo/*` | Must not leak into global pitch store |
| Global app store | **None** by default | Avoid Redux/Zustand unless later justified |

Derived: `isFirst`, `isLast`, `progressLabel`.

---

## 8. Screen 9 isolation

```
PitchShell
  └── FeatureDemoScreen (pitch chrome + framing copy)
        └── <DemoFeature />   ← only heavy interactive island
              props: none or minimal framing
              data: MOCK_* from lib/demo-data
              out: local UX only (no real SMS/order)
```

| Boundary | Rule |
| -------- | ---- |
| Name | `{{DEMO_FEATURE_NAME}}` / `{{CHOSEN_DEMO_FEATURE}}` — **deferred** |
| Purpose | `{{DEMO_FEATURE_PURPOSE}}` — deferred |
| Count | Exactly **one** interactive feature |
| Backend | Mock only |
| After demo | Next goes to screen 10 — do not nest more product tours |

---

## 9. First vertical slice (build this first)

### Slice 1 — Shell + Screen 1 only

**Scope**

1. Routes: `/` → `/p/1`; `/p/[step]` validates 1–12 (other steps may render minimal placeholder body)  
2. `PitchShell`: header (two Persian lines), footer (page #, prev/next)  
3. Swipe navigation wired (even if later screens are placeholders)  
4. **Screen 1** full content from `screens.md`  
5. Design tokens: use semantic classes; foundation alignment to DigiHouse as needed for chrome readability  

**Out of slice 1:** screens 2–12 final copy UI, screen 9 demo, contact integrations.

### Acceptance criteria (Slice 1)

- [ ] Open `/` lands on screen 1 content  
- [ ] Header shows both Persian lines; footer shows `1 / 12` (or equivalent)  
- [ ] Next → step 2 (placeholder OK); Back disabled or no-op on 1  
- [ ] Swipe left/right changes step on touch devices  
- [ ] Screen 1 title + body match `docs/screens.md` meaning  
- [ ] Mobile ~390 usable; no horizontal page break bugs in shell  
- [ ] `npm run typecheck` (and lint) pass  

---

## 10. Diagrams

### Flow

```
[Header: توسعه کسب و کار… / آهن فروشی قویدل . بناب]
[──────────── Screen k content ────────────]
[ ‹ prev ]     k / 12      [ next › ]
     ▲ swipe ◄──────────────► swipe
```

### Component layers

```
app/p/[step]/page.tsx
        │
        ▼
  PitchShell ──────────────┐
    PitchHeader            │
    {children: Screenk}    ├── pitch/*
    PitchFooter            │
        │                  │
        └── (if k=9) ──► demo/* island
```

---

## 11. Open decisions

| Placeholder | Decision needed |
| ----------- | --------------- |
| `{{DEMO_FEATURE_NAME}}` / `{{CHOSEN_DEMO_FEATURE}}` | Screen 9 — **deferred** |
| `{{DEMO_FEATURE_PURPOSE}}` | Bridge + demo purpose — deferred with feature |
| `{{DEMO_FEATURE_TIME_TO_VALUE_SECONDS}}` | Deferred |
| `{{SCREEN_11_COPY}}` | Final tech/AI copy (draft in screens.md) |
| `{{CONTACT_CHANNELS}}` | Real phone / WhatsApp / other |
| `{{CONTACT_SUCCESS_EVENT}}` | Deferred |
| `{{LOGO_AND_ASSETS_PATHS}}` | none yet |
| Iran Yekan/Sans font files | Human drops licensed files into `public/fonts/` |

### Locked decisions

| Key | Value |
| --- | ----- |
| Project | `ghavidel-pitch-demo` |
| Builder | `agentsTEAM` |
| Prospect | `آهن فروشی قویدل · بناب` |
| Locale | `fa` RTL, fa-only |
| Routes | `/p/[step]` 1–12; `/` → `/p/1` |
| Prices | Local mock only |
| SMS | Narrative only — no real send |
| Contact CTA (temp) | Reach screen 12 «تماس با ما» |
| Font family | Iran Yekan (scaffold); Iran Sans allowed swap |

---

## Related docs

| Doc | Role |
| --- | ---- |
| [screens.md](./screens.md) | Per-screen IA + Persian source copy |
| [project-brief.md](./project-brief.md) | Goals, scope, success |
| [conventions.md](./conventions.md) | Code/UX rules |
| [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) | Visual tokens |
| [workflows.md](./workflows.md) | Build loop + DoD |
| [AGENTS.md](../AGENTS.md) | Agent system rules |
