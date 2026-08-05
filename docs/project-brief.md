# Project Brief

> Product intent source of truth for AI coding agents.  
> Known decisions filled below; remaining `{{PLACEHOLDER}}`s are intentionally deferred.  
> Do not invent features, pages, or business claims that contradict this brief.

---

## 1. One-liner

A 12-screen interactive pitch demo that shows a Bonab rebar (milgerd) iron seller what a real iron-shop web app could do — and persuades him to commission one from us.

| Field | Value |
| ----- | ----- |
| **Project name** | `ghavidel-pitch-demo` |
| **Builder / studio name** | `agentsTEAM` |
| **Prospect business name** | `آهن فروشی قویدل · بناب` |
| **Status** | Decisions applied — foundation / pre-UI build |
| **Locale of UI copy** | `fa` (RTL) — Persian only |
| **UI font** | **Iran Yekan** (or Iran Sans) — local licensed files only; see `public/fonts/README.md` |
| **Stage framing** | Demo / portfolio sample for **one** client prospect — not a multi-tenant product |

---

## 2. Product type

| Attribute | Definition |
| --------- | ---------- |
| **What it is** | A small, compact **web app–style marketing demo** that blends a **pitch deck** and an **interactive product sample** |
| **What it feels like** | Sequential narrative (slides/story) + one hands-on feature experience |
| **What it is not** | Not the full iron-sales web application; not a brochure-only static site with no product feel |
| **Delivery form** | Single Next.js web experience; **exactly 12 sequential screens** (see §6) |
| **Primary viewer** | The iron seller / business owner we want to close |

**Core framing for agents:** Every screen exists to move one prospect from “I might need a website” → “I understand a web app is different and valuable” → “I felt one real feature” → “I want to talk / sign.”

---

## 3. Primary goal & success criteria

### Primary goal

Persuade the iron seller to **sign a contract with us to build a real web application**, by presenting a beautiful, attractive, credible sample.

### Success criteria (demo project)

A session with the prospect is successful when **all** of the following hold:

| # | Criterion | How we know |
| - | --------- | ----------- |
| 1 | Prospect can explain **site vs web app** in plain terms | After screens 1–3, he can restate the difference without us coaching |
| 2 | Prospect sees the **future product** as relevant to *his* iron business | After screens 2–7, he recognizes public services + growth paths as “for me” |
| 3 | Prospect **uses** the single interactive demo feature | Completes the main action on screen 9 without help |
| 4 | Prospect accepts **why now** (timing + SEO/feature-led growth) | After screen 10–11, no hard objection that “a simple site is enough” |
| 5 | Prospect **reaches contact with intent** | Reaches screen 12 (“تماس با ما”); real channel success metric still `{{CONTACT_SUCCESS_EVENT}}` (deferred) |
| 6 | Experience quality supports trust | Polished UI, clear Persian/English copy as specified, mobile + desktop usable; no broken flows |

### Non-goals for success measurement

- Real orders, real payments, or real inventory updates in this demo  
- SEO ranking of this demo itself as a long-term content property (SEO is a **narrative argument** on screen 10, not a launch KPI for the demo)  
- Multiple concurrent client customizations

---

## 4. Audiences

There are **two** audiences. Agents must never collapse them.

### 4.1 Our customer (the iron seller)

| Field | Value |
| ----- | ----- |
| **Who** | One client prospect: a **rebar (milgerd) iron seller** who wants to benefit from digital presence |
| **Where** | **Bonab county**, Iran |
| **Role** | Buyer of the **web app build engagement** from us |
| **Job to be done** | Decide whether commissioning a real iron-shop web app is worth it — and from us |
| **Context of use** | Likely mobile-first or mixed; may be shown in a meeting, shared link, or walkthrough; may be hurried or skeptical of “just another website” |
| **What convinces him** | Clarity (site vs app), business relevance (prices, buyers, ops, export), **feeling** one real feature, credible builders + easy contact |

### 4.2 End users inside the product narrative (iron buyers)

These people are **not** who we are selling this demo to. They appear **inside the story** of the future iron-shop web app.

| Field | Value |
| ----- | ----- |
| **Who** | People and businesses who **buy iron / rebar** from the seller |
| **Segments (narrative)** | Local/general buyers; possibly contractors and repeat trade buyers; **export / foreign buyers** (Iraq, Turkey, neighboring countries that buy steel from Iran) — as growth narrative, not live multi-currency commerce in this demo |
| **Jobs to be done (future product)** | Check prices, calculate needs, get alerts, inquire/order, trust the seller digitally |
| **Features built “for them”** | Described on screens 4–6 and experienced via the sample on screen 9 |

### 4.3 Copy rule (who “audience” refers to in UI text)

**Critical for all product copy and UI labels:**

- When the **demo’s product text** says **“audience”**, it almost always means the **iron seller’s customers** (iron buyers) — the end users of the *future* web app.  
- When **internal docs / agent briefs** say **“audience”** without qualifier, clarify: **our customer** vs **end users in the narrative**.  
- Screen 4 title/purpose: “Target audience of the product” = audiences of the **iron-shop web app**, not “audience of this pitch deck.”

| Phrase in UI | Means |
| ------------ | ----- |
| Audience / مخاطبین / مشتریان هدف | Iron buyers (end users of the future app) |
| You / کسب‌وکار شما / صاحب کسب‌وکار | The iron seller viewing the demo |
| We / ما | **agentsTEAM** (the builders) |

---

## 5. Scope

### 5.1 In scope

- Exactly **12 sequential screens** as defined in §6  
- Narrative that contrasts **simple website** vs **web app**, tailored to iron selling  
- Description of the **future** iron-shop web app (product vision only)  
- Public/general service concepts (e.g. daily price board, calculator, SMS alerts) as **pitch content**  
- Growth narratives: more sales (incl. export direction) + internal operations  
- **One** interactive demo feature on **screen 9 only**  
- Why-now + tech/AI industry shift messaging  
- Short about-us + contact channels for us (the builders)  
- Visual/UX quality suitable as a **portfolio sample** and sales tool  
- Responsive web experience (mobile-first; usable on desktop for meetings)

### 5.2 Out of scope

**This repository does not build the full iron-sales product.** Out of scope unless explicitly re-scoped later:

| Out of scope | Notes |
| ------------ | ----- |
| Full iron e-commerce | Catalog, cart, checkout, payments |
| Full ops / ERP | Real team workflows, inventory truth, accounting |
| Multi-client CMS / white-label | This demo targets **one** prospect narrative |
| Real export workflows | Customs, FX, multi-language commerce backend — **story only** on screen 6 |
| Real SMS / notification providers in production | May mock in demo feature if chosen |
| Live daily price feeds from exchanges | Mock or static sample data only unless decided otherwise |
| User accounts, auth, roles for real customers | Unless required as shallow UI chrome inside screen 9 mock |
| Admin dashboards as full products | Mention in narrative (screen 7); do not build full systems |
| Cloning / reverse-engineering third-party sites | Original work only |
| Extra screens beyond the 12 | Do not add “bonus” pages without brief update |
| Multiple interactive features | **Only screen 9** is interactive product demo |

**Future real product** (post-contract) may include many of the above — they belong in pitch language, not in this demo’s build scope.

---

## 6. Information architecture — 12 screens

**Flow type:** Strictly sequential. Each screen has one job. Navigation: primarily **next** (and back); deep-linking optional later.

**Route scheme (locked):** `/p/[step]` with integer `step` **1–12**; `/` redirects to `/p/1`.  
Per-screen copy/IA: [`screens.md`](./screens.md) · Architecture: [`architecture.md`](./architecture.md).

| # | Screen name | Purpose | Key message | CTA / next step |
| - | ----------- | ------- | ----------- | --------------- |
| **1** | **Intro** | Open the pitch; set frame | A **simple website** and a **web app** are not the same thing — and the difference matters for an iron business | Continue to what the product would be |
| **2** | **Product** | Define the future deliverable | The real product is an **iron-shop web app** (not a static calling-card site): tools + services around buying/selling iron | Continue to more differences |
| **3** | **More differences** | Deepen site vs app for *this* industry | For iron selling specifically, a web app supports ongoing use (prices, tools, operations), not only “find us online” | Continue to who the app serves |
| **4** | **Target audience of the product** | Name who the *future app* is for | The app is built around **iron buyers** (and distinct buyer types); dedicated features map to those groups | Continue to public services |
| **5** | **Public / general services** | Show value for any browser visitor | Everyday services for all visitors — e.g. **daily price board**, **calculator**, **SMS alerts** (examples; not a full build list) | Continue to growth: sales |
| **6** | **Growth path — more sales** | Expand commercial upside | The product can grow sales, including toward **export / foreign buyers** (Iraq, Turkey, neighbors buying steel from Iran) | Continue to growth: operations |
| **7** | **Growth path — internal operations** | Expand operational upside | The web app can connect to **internal iron-shop management** (team coordination, order management, etc.) | Continue toward the live sample |
| **8** | **Bridge to the sample feature** | Prepare the hands-on moment | “Next you’ll try **one** sample feature so you can feel the real product” — set expectation, reduce surprise | Go to interactive feature |
| **9** | **Feature (interactive demo)** | Let the prospect **experience** the future product | One well-chosen feature only; interaction > explanation | Continue to why act now |
| **10** | **Why act now** | Create urgency without hype | Good time to build and benefit; **SEO is easier when the web app identifies user needs and ships dedicated features** for them | Continue to tech/AI shift |
| **11** | **Tech / AI shift** | Future-proof the argument | Technology, **AI**, and **agents** will change the industry — being app-ready matters | Continue to contact |
| **12** | **Contact us** | Convert interest to a conversation | Short **about us** (agentsTEAM) + contact channels when available | Temporary CTA: land on screen 12 «تماس با ما»; real channels `{{CONTACT_CHANNELS}}` later |

### Flow summary (agent checklist)

1. Educate (1–3) → 2. Relate to iron business (4–7) → 3. Experience (8–9) → 4. Motivate (10–11) → 5. Convert (12)

---

## 7. Demo feature (Screen 9)

### Requirements

| Rule | Detail |
| ---- | ------ |
| **Count** | Exactly **one** interactive feature |
| **Placement** | **Screen 9 only** (other screens may show static UI mock imagery, but not a second full interactive product) |
| **Goal** | Iron seller **feels** what the final web app would be like — hands-on, not only slides |
| **Fidelity** | Believable for iron trade; realistic labels/numbers; no lorem ipsum |
| **Data** | Sample/mock data acceptable; no requirement for live backend |
| **Scope guard** | Must not balloon into full e-commerce or full ops |

### Chosen feature

**`{{CHOSEN_DEMO_FEATURE}}`** — **DEFERRED** (human has not chosen). Do not implement screen 9 product UI until set.

### Candidates (for human decision; do not implement all)

| ID | Candidate | Why it fits the pitch | Risk if chosen |
| -- | --------- | --------------------- | -------------- |
| A | **Daily price board** (browse today’s rebar/iron prices, maybe filter by size/type) | Instantly relevant to iron sellers; matches screen 5 examples; easy to understand in a meeting | Can look “static” if interaction is only sorting — needs a crisp interaction |
| B | **Iron / rebar calculator** (e.g. weight, length, bar count, rough cost from sample prices) | Hands-on “tool,” clearly web-app not brochure; strong “I would use this” moment | Must stay simple; avoid engineering-software complexity |
| C | **SMS / alert signup mock** (subscribe to price updates for selected products) | Shows retention + digital relationship with buyers; ties to public services | **Narrative / mock UI only** — no real SMS send (`SMS_DEMO_BOUNDARY`) |

**Selection note:** Pick **one** candidate. Record in `{{CHOSEN_DEMO_FEATURE}}` before UI build.  
**Data:** local mock only (`SAMPLE_PRICE_DATA_SOURCE`).  
**Time-to-value:** `{{DEMO_FEATURE_TIME_TO_VALUE_SECONDS}}` — deferred.

### Screen 9 acceptance (once feature chosen)

- [ ] Prospect can complete the primary action in under `{{DEMO_FEATURE_TIME_TO_VALUE_SECONDS}}` seconds (when set)  
- [ ] Empty/loading/error (if any) states are intentional and polished  
- [ ] Mobile usable  
- [ ] Clearly framed as **sample of the future product**, not the full system  
- [ ] No real SMS / payment / backend

---

## 8. Tone, messaging & persuasion principles

### Tone

| Attribute | Direction |
| --------- | --------- |
| **Overall** | Clear, confident, respectful of a traditional trade business — not Silicon Valley hype |
| **Register** | Professional sales + product demo; plain language over jargon |
| **Respect** | Iron trade knowledge is theirs; digital product knowledge is ours — bridge, don’t lecture |
| **Language** | `fa` RTL only; proper nouns: Bonab, milgerd/rebar, قویدل as needed |
| **Personality (builders)** | `formal-technical` |

### Messaging pillars

1. **Website ≠ web app** — a site informs; a web app **serves repeated jobs** (prices, tools, ops, growth).  
2. **Built around iron buyers** — features follow real audience needs (copy rule §4.3).  
3. **Public value first** — even casual visitors get useful services.  
4. **Growth in two directions** — more sales (incl. export narrative) + smoother internal operations.  
5. **Feel it once** — one interactive feature beats ten feature bullets.  
6. **Why now** — timing + SEO via need-driven features, not generic “be online.”  
7. **AI/agents will reshape the industry** — readiness is a competitive stance.  
8. **We’re the builders** — short credibility + easy contact; the demo is proof of craft.

### Persuasion principles (for writers & UI)

- **One idea per screen** — no multi-topic walls of text  
- **Show then tell** on screen 9; tell then show on 1–8  
- **Concrete over abstract** — iron, rebar sizes, Bonab, export neighbors — not vague “digital transformation”  
- **No false claims** — follow **Approved claims (draft)** below; no guaranteed revenue or SEO rankings  
- **Urgency without pressure** — screen 10 argues timing; screen 12 invites contact  
- **Beauty supports trust** — polish is part of the pitch (portfolio-grade UI)

### About us (draft — human polish later)

> **Draft / not final marketing legal copy.**  
> **agentsTEAM** یک تیم توسعه نرم‌افزار و وب‌اپ کسب‌وکار است. این تجربه یک **نمونه نمایشی** برای آهن‌فروشی قویدل · بناب است تا مسیر وب‌اپ حرفه‌ای (جذب و نگه‌داشت مشتری، نه فروش با درگاه) ملموس شود. هدف گفتگو درباره ساخت محصول واقعی است — نه ارائه سیستم عملیاتی زنده.

### Approved claims (cautious draft — human polish later)

Allowed in UI/copy only in this cautious form (or softer):

- این یک **نمونه / دمو** است، نه سامانه عملیاتی زنده با داده واقعی کارخانه.  
- تمرکز محصول آینده: **ابزار جذب و نگه‌داشت**؛ معامله نهایی تلفنی/حضوری.  
- سئو و رشد دیجیتال وقتی روی نیاز واقعی مشتری فیچر ساخته شود، با سایت ویترینی معمولی **متفاوت** است — **بدون** وعده رتبه، ترافیک، یا افزایش فروش تضمینی.  
- هیچ عدد درآمد، تعداد مشتری، یا گواهینامه ساختگی مجاز نیست مگر بعداً تأیید شود.

**Forbidden until explicitly approved:** guaranteed revenue, guaranteed SEO rankings, fake logos, invented client counts.

### Brand & assets

| Item | Value |
| ---- | ----- |
| **Builder brand name** | `agentsTEAM` |
| **Prospect display name in demo** | `آهن فروشی قویدل · بناب` |
| **Logo / assets** | none yet — `{{LOGO_AND_ASSETS_PATHS}}` |
| **Visual direction** | [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) tokens/patterns; original design only — no cloning |
| **UI font** | Iran Yekan (scaffold) or Iran Sans — licensed local files in `public/fonts/` |

---

## 9. Constraints

### Product / content

- Exactly **12** screens; sequential narrative  
- **One** interactive demo feature (screen 9)  
- Faithful to Bonab rebar-seller prospect context  
- Dual-audience copy discipline (§4.3)  
- No reverse-engineering or scraping third-party products  
- Mark unknown business facts with placeholders — do not invent phone numbers, prices as “official,” legal entity names, or contract terms  

### Technical (template defaults; refine as needed)

| Area | Constraint |
| ---- | ---------- |
| **Stack** | Next.js (App Router), React, TypeScript, Tailwind, shadcn/ui — per repo `AGENTS.md` |
| **Technical extras** | **Mobile-first / mobile-friendly required**; otherwise unspecified |
| **Accessibility** | Reasonable baseline only (labels, focus, contrast via tokens) — not a formal WCAG audit target yet |
| **Performance** | No numeric targets for now |
| **Content** | Approved 12-screen copy from brief/screens; **no unapproved hype claims** |
| **i18n** | **fa-only** — no multi-language UI in this demo |
| **Timeline** | No deadline |
| **Export messaging** | **Low** depth (screen 6 secondary) |
| **Sample prices** | **Local mock data only** |
| **SMS in demo** | **Narrative only** — no real SMS send |

### Process

- Spec before build; design system after brief is filled enough to design  
- Build must compile; no drive-by scope expansion into “real app” modules  

---

## 10. Open decisions / placeholders

### Applied (locked)

| Key | Value |
| --- | ----- |
| PROJECT_NAME | `ghavidel-pitch-demo` |
| BUILDER_BRAND_NAME | `agentsTEAM` |
| BUILDER_BRAND_PERSONALITY | `formal-technical` |
| PROSPECT_BUSINESS_NAME | `آهن فروشی قویدل · بناب` |
| UI_LOCALE | `fa` (RTL) |
| I18N_SCOPE | fa-only |
| ROUTE_SCHEME | `/p/[step]` (1–12); `/` → `/p/1` |
| PRIMARY_CONTACT_CTA | Temporary: navigate to screen 12 «تماس با ما»; real channels later |
| ABOUT_US_BLURB | Draft in §8 (needs human polish) |
| APPROVED_CLAIMS | Cautious draft in §8 (needs human polish) |
| TECH_CONSTRAINTS | Mobile-first required |
| A11Y_TARGET | Reasonable baseline only |
| PERF_TARGETS | None numeric |
| CONTENT_POLICY | Approved 12-screen copy; no unapproved hype |
| TIMELINE | No deadline |
| EXPORT_MESSAGING_DEPTH | Low |
| SAMPLE_PRICE_DATA_SOURCE | Local mock only |
| SMS_DEMO_BOUNDARY | Narrative only — no real SMS |
| LOGO_AND_ASSETS_PATHS | none yet |
| UI_FONT | Iran Yekan (scaffold) / Iran Sans allowed |

### Still open (do not invent)

| Placeholder | Notes |
| ----------- | ----- |
| `{{CHOSEN_DEMO_FEATURE}}` | Deferred — pick A/B/C before screen 9 build |
| `{{DEMO_FEATURE_TIME_TO_VALUE_SECONDS}}` | Deferred |
| `{{CONTACT_CHANNELS}}` | Real phone/WhatsApp/etc. |
| `{{CONTACT_SUCCESS_EVENT}}` | How we measure contact intent later |
| `{{LOGO_AND_ASSETS_PATHS}}` | When assets exist |
| `{{DEMO_FEATURE_NAME}}` / `{{DEMO_FEATURE_PURPOSE}}` | Same deferral as chosen feature |
| Font binary files | Human drops licensed Iran Yekan/Sans into `public/fonts/` |

---

## 11. Definition of done (for this demo project)

The demo project is **done** when:

1. **Brief complete** — placeholders above filled or explicitly deferred with owner  
2. **Design system** aligned to this brief (`design-system.md`)  
3. **All 12 screens** implemented per §6 (purpose + key message intact)  
4. **Screen 9** ships exactly one chosen interactive feature; prospect can complete primary action  
5. **Screen 12** exposes real contact paths and short about-us  
6. **Quality bar:** responsive (mobile ~390, tablet ~768, desktop ~1440), polished motion/spacing per design system, no broken navigation in the 12-step flow  
7. **`npm run check`** (or project equivalent) passes  
8. **Sales-ready:** can be opened in a live walkthrough with the Bonab iron seller without apology screens or “lorem” content  
9. **Scope integrity:** no full e-commerce/ops platform accidentally built  
10. **Primary goal enabled:** a clear path exists from first screen to contract conversation  

---

## Design system & process links

- Tokens, type, spacing, components → [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md)  
- Code conventions → [`conventions.md`](./conventions.md)  
- Build workflow → [`workflows.md`](./workflows.md)  
- Light architecture + first slice → [`architecture.md`](./architecture.md)  
- Per-screen IA & Persian copy source → [`screens.md`](./screens.md)  

**Agent rule:** If a request expands scope beyond this brief (e.g. “add checkout,” “build real inventory”), refuse scope creep and point here — or require an explicit brief amendment.  
**Critical product rule:** no payment-gateway iron checkout in Bonab model — attraction & retention tools only; final deal stays phone/in-person (see architecture + screens 2–3).
