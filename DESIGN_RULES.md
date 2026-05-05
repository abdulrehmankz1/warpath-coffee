# Warpath Coffee — Design & Engineering Rules

> **Source of truth:** `warpath-brand-guide.html` (FM-001 v1.0).
> **This document:** how to build it. The brand guide tells you *what* the system looks like — this tells you *what to do* and *what not to do* when you're shipping code.
>
> **Audience:** designers in Figma, frontend engineers in Next.js / React, content writers in CMS.
> **Mandate:** if a PR violates a 🛑 rule, it doesn't ship. ✅ rules are defaults — break them only with a written reason in the PR description.

---

## 0. The One-Page Test

Before you open a PR, every screen must answer **yes** to all five:

1. Does this move the visitor toward **Subscribe**, **Add to Cart**, or **Repeat Order**? If no, justify the screen's existence.
2. Is the **primary CTA above the fold** on every PDP and category page? (At 1280×720 desktop and 390×844 mobile.)
3. Does **bone-canvas + combat black** carry ≥ 80% of the surface, with brass ≤ 12%, olive ≤ 6%, red ≤ 3%?
4. Does the screen survive **`prefers-reduced-motion`** — no broken layouts, no missing content, no stuck animations?
5. Does it pass **axe-core in CI** with zero serious / critical violations?

If any answer is no, the screen ships when the answer is yes. Not before.

---

## 1. Stack & Conventions

### 1.1 Tech (locked — do not substitute)

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js (latest in repo) | **Read `node_modules/next/dist/docs/` before writing route/layout/middleware code.** This Next.js has breaking changes from training-data Next.js. |
| Language | TypeScript strict | `strict: true`, `noUncheckedIndexedAccess: true`. No `any`, no `// @ts-ignore` without a `// reason:` comment. |
| Styling | Tailwind CSS | Tokens defined in `tailwind.config.ts` — see §2. No raw hex/rem in components. |
| Components | shadcn/ui | Copy-in, customize-in-place. Don't wrap shadcn primitives in our own wrappers unless adding behavior. |
| Animation | GSAP (timeline-driven) + Framer Motion (component variants) | GSAP for hero / scroll / marquee. Framer Motion for in-component state transitions. Don't mix on a single element. |
| Icons | Lucide React | `strokeWidth={1.5}` default. Custom military glyphs (chevron, dog-tag, patch, mark) live in `components/icons/` as inline SVGs. |
| Forms | React Hook Form + Zod | Server actions for submit. Inline error rendering, never alerts. |
| Selects | React Select | Only for searchable / multi / async. For 2–7 static options use shadcn `<Select>`. |
| Image | `next/image` | AVIF preferred, WebP fallback. Always `width`/`height`. Never raw `<img>` for product/hero — only for the brand mark. |

### 1.2 File / folder conventions

```
app/                       # Routes (Next.js)
  (marketing)/             # Public pages — home, story, shop
  (commerce)/              # Cart, checkout, account
  api/
components/
  ui/                      # shadcn primitives (don't edit unless extending)
  warpath/                 # Brand-specific composed components
    crate-tile/            # Product crate (PDP hero)
    field-card/            # Doctrine / feature card
    transmission-log/      # Voice / changelog / activity
    ammo-stripe/           # Promo banner
    dog-tag/               # Founder / subscriber badge
    patch/                 # Credential patch
    classified-stamp/      # Limited drop / eyes-only
  icons/                   # Inline SVG icons (mark, chevron, crosshair)
lib/
  tokens.ts                # Re-export of design tokens (TS-typed)
  cn.ts                    # tailwind-merge wrapper
content/                   # MDX or CMS exports
public/
  logo.avif                # Master mark (don't recolor at this layer)
```

- **One component per file.** Filename = component name in PascalCase. `index.ts` only for re-exports.
- **Co-locate.** Component + its styles + its tests + its stories live in the same folder.
- **No barrel files** that re-export an entire folder — they wreck Next.js tree-shaking.

### 1.3 Naming

- Components: `PascalCase` — `CrateTile`, `DogTag`, `TransmissionLog`.
- Files matching components: same name. `crate-tile.tsx` is wrong; `CrateTile.tsx` is right.
- CSS classes (when not Tailwind): `kebab-case` with `wp-` prefix — `wp-crate-bar`.
- Test IDs: `data-testid="crate-tile-add-to-cart"` — kebab, scoped to component.
- Storybook stories: `<Component>.stories.tsx`.

---

## 2. Design Tokens

### 2.1 Color tokens (locked — these go in `tailwind.config.ts`)

```ts
colors: {
  combat: {
    900: '#0B0E0C', // hero bg, nav, footer, primary text on light
    800: '#14181A', // dark card alt
    700: '#1F2528', // hover on dark
    600: '#2C353A',
  },
  espresso: { 900: '#2A1810', 700: '#4A2E1E', 500: '#6B4423' },
  brass:    { 300: '#E2C588', 400: '#D7B468', 500: '#C49A48', 600: '#9F7A30', 700: '#7A5C20' },
  olive:    { 400: '#7A8568', 500: '#5C6647', 600: '#3F4A33', 700: '#2A3322' },
  bone:     { 50: '#F8F2E2', 100: '#F1EADA', 200: '#E8DFC8' },
  canvas:   { 300: '#D4C8AB', 400: '#B8AC8F' },
  ash:      { 500: '#6E695F', 600: '#5A554C', 700: '#4A4641', 800: '#332F2A' },
  cream:    { 50: '#EDE6D5', 100: '#E0D9C4' },
  alert:    { red: '#9C2A22', redDark: '#761F19' },
}
```

### 2.2 Color usage law

| Token | Use for | Never use for |
|---|---|---|
| `combat-900` | Hero bg, nav, footer, body text on light | Body text on `combat-700` or darker (contrast fail) |
| `bone-100` | Page background, light section bg | Long-form text color |
| `brass-500` | Primary CTA, accent rule, italic accent text, badges | Backgrounds for paragraphs > 1 line; body copy |
| `brass-600` | Brass on light backgrounds (text/border), hover | Buttons (use `brass-500`) |
| `olive-600` | Veteran/credential tile, "DO" markers, origin badges | Primary CTA (that's brass) |
| `alert-red` | Low stock, flash sale, error, "ships today" | Decorative dividers, section bg, hover states |
| `espresso-700` | Coffee-origin tile bg, deep gradient stops | Text color on light |

🛑 **Don't:** invent new colors, use red as a primary CTA, use brass for body copy, use olive as a CTA.
✅ **Do:** keep the 55/28/9/5/3 ratio — bone / combat / brass / olive / red — measured by viewport surface area, not by token count.

### 2.3 Type tokens

```ts
fontFamily: {
  display: ['Big Shoulders Display', 'sans-serif'],          // headlines, product names, stencil marks via stencil
  stencil: ['Big Shoulders Stencil Display', 'Big Shoulders Display', 'sans-serif'], // badges, drops, military marks ONLY
  italic:  ['Fraunces', 'serif'],                             // editorial accent (italic)
  body:    ['Inter', 'sans-serif'],                           // UI, body, paragraphs
  mono:    ['JetBrains Mono', 'monospace'],                   // tags, codes, batch numbers, labels
}
```

**Hierarchy law:**

| Use case | Family | Weight | Size / Line |
|---|---|---|---|
| Hero | `display` | 900 | clamp(3.5rem, 13vw, 12rem) / 0.88 |
| H1 | `display` | 900 | clamp(2.4rem, 6.5vw, 5.5rem) / 0.94 |
| H2 | `display` | 800 | 54 / 1.0 |
| H3 | `display` | 800 | 34 / 1.05 |
| H4 | `display` | 700 | 26 / 1.18 |
| Pull-quote / accent line | `italic` | 400 italic | 28 / 1.3 |
| Body lg | `body` | 400 | 18 / 1.7 |
| Body | `body` | 400 | 16 / 1.65 |
| Caption / meta | `mono` | 600 | 11 / 1.5 (uppercase, 0.18em tracking) |
| Eyebrow / tag | `mono` | 700 | 12 / 1 (uppercase, 0.24em tracking) |
| Stencil badge | `stencil` | 800–900 | size of host, never < 14px |
| Stat numeral | `display` | 900 | 112 / 0.88 brass |

🛑 **Don't:** drop body below 16px. Mix `display` + `italic` on the same line. Use `stencil` for paragraphs. Use Fraunces upright (always italic).
✅ **Do:** pair eyebrow (mono) → headline (display) → optional italic accent → body. Always in that order.

### 2.4 Space tokens (8px base)

`xxs 4 · xs 8 · sm 16 · md 24 · lg 40 · xl 56 · 2xl 96 · 3xl 140`

Section vertical padding: `py-24 md:py-[140px]` (96 / 140). Card interior: `p-8 lg:p-10` (32–40). Grid gutter: `gap-6` (24). Never use arbitrary values like `pt-[37px]` — round to a token.

### 2.5 Border / radius / elevation

- **Radius:** `rounded-none` is the default. Only three legitimate values exist: `0` (default), `28px` (large arches — patterns only), `999px` (pill — badges only). 🛑 **No `rounded-md`, `rounded-lg`, `rounded-xl` ever.** That's Bootstrap aesthetic.
- **Borders:** `1px` hairlines in `combat-900` (on light) or `brass-500` at 28% opacity (on dark). Dashed lines (`1px dashed canvas-400`) for internal dividers within cards.
- **Elevation:** Don't use CSS box-shadow as a design element. The system is **flat with corners and rules**, not raised. Two exceptions only:
  1. Hover lift on `CrateTile`: `shadow-[0_8px_24px_rgba(11,14,12,.18)]`.
  2. Brass stamp glow: `shadow-[0_10px_30px_rgba(196,154,72,.40)]`.

### 2.6 Motion tokens

```ts
duration: { instant: '120ms', fast: '180ms', base: '240ms', slow: '420ms', deliberate: '720ms' }
ease:     { out: [0.16, 1, 0.3, 1], in: [0.7, 0, 0.84, 0], inOut: [0.65, 0, 0.35, 1] }
```

- Hover transitions: `fast` + `out`.
- Page enter: `base` + `out`, fade + 8px translate.
- Hero / marquee / scroll-driven: GSAP, `slow` to `deliberate`.
- 🛑 **Bouncy springs are off-brand.** No `damping: 5` overshoots. The brand is precision, not playful.

---

## 3. Layout & Grid

- **Container:** `max-w-[1440px]` centered. Outer page padding: `px-6 md:px-12 lg:px-[90px]`.
- **Grid:** 12 columns, `gap-6` (24px gutter).
- **Default hero split:** 7/5 or 8/4. 🛑 **Never 6/6.** Symmetry is for spec sheets, not heroes.
- **Bento sub-grid:** 6 columns, `auto-rows-[180px]` minimum. No two adjacent tiles share the same span.
- **Section padding:** `py-24` mobile, `py-[140px]` desktop. Tight (`py-16`) only inside contained promo strips.
- **Bleeds:** Product photography may bleed past section edges by 40–80px. Always intentional, controlled with negative margin and `overflow-hidden` on the parent.
- **Scroll snap:** Only on horizontal carousels (`Our Roasts`, `Field Reports`). Never vertical.

---

## 4. Component Rules

### 4.1 The Card Doctrine

There are **four** sanctioned card types. Don't invent a fifth without an RFC.

| Card | Use | Built from |
|---|---|---|
| `FieldCard` (doctrine) | Brand pillars, principles, "what we believe" | Side rail (combat) + body + signature foot. See §11.1 of brand guide. |
| `CrateTile` (product) | PDP hero, flagship product | Crate-bar header + body + meta grid + foot bar with blade-cut CTA |
| `SpecCard` (feature) | "Why us", credentials, trio rows | Dark spec header + hex-clipped icon + headline + body |
| `LogRow` (transmission) | Activity, reviews, voice/copy examples | Status stripe + message + diagnostic |

🛑 **Never use a generic shadcn `<Card>` with rounded corners and a soft shadow.** That's the antithesis of this brand.
🛑 **Never put a top-accent bar (3px brass strip) on a card.** That was the Cleveland template — we removed it.
✅ **Cards are sharp-cornered, structurally layered, and signed.** A card without a footer (signature, source, or meta) is incomplete.

### 4.2 Buttons

- **Shape:** Blade-cut right edge (`clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%)`). Never pill, never pure rectangle.
- **Sizes:** `sm` (32 high), `base` (48 high), `lg` (56 high — only for hero primary).
- **Variants:** `primary` (combat → brass on hover), `brass` (brass → combat on hover), `ghost` (transparent + 1.5px combat outline), `red` (alert-red, pulse animation).
- **Label:** Mono uppercase, `text-xs tracking-[.22em] font-bold`.
- **Op-code badge:** Optional `data-code="OP-CART"` chip floating above the button on hover or always for hero CTAs.
- 🛑 **No icon-only buttons in marketing.** Cart icon is fine in nav. Anywhere else, label + icon.

### 4.3 Navigation

- **Layout:** 3-column op-bar — brand left (with mark + wordmark + small caps tag), nav center (mono uppercase links, gap-8), action right (cart count + primary CTA).
- **Two states:**
  - **Hero nav** (over dark): combat bg, brass divider after brand, cream links.
  - **Scrolled nav** (over content): bone bg, combat divider, combat links. Trigger at `scrollY > 80`.
- **Mobile:** Drawer (right slide-in), full combat bg, stencil section headings, ammo-stripe dividers between groups.
- **Sticky:** Always sticky on scroll. Add a 1px `brass-500` shadow line at the bottom when scrolled.

### 4.4 Forms

- **Frame:** 1px combat border, no radius. Dark op-code header bar across the top (`INTAKE · OP-ENROLL · 001`).
- **Labels:** Mono uppercase, `tracking-[.22em]`, brass-700 on light.
- **Required:** Small `REQ` chip (1px alert-red border) at the right edge of the label row. Never a `*` asterisk.
- **Inputs:** Mono font (this is intentional — feels like a manifest), bone-100 bg, 1px canvas-400 border. Focus ring: 2px brass-500 with 1px offset.
- **Errors:** Inline below input, mono small alert-red, prefixed with `× ERR ·`. Announced via `aria-live="polite"`.
- **Submit:** Always brass (primary), full-width on mobile, content-width on desktop, blade-cut.
- 🛑 **No floating labels.** Labels above input, always visible.

### 4.5 Photography

- **Whitelist:** Bag, bean, brew (pour-over / French press / drip), the cup (crema, steam), roastery (drum / beans in motion), heritage (founder / archival, duotone only), lifestyle (real morning, real kitchen).
- **Frame:** Field-report — 1px combat border + 4 brass-500 corner registration brackets (TL/TR/BL/BR) at 18px square + small mono coord chip top-right (`FR · 03 · A2`).
- **Treatment:** Natural light. Slight warm grain. No HDR. No Instagram filters.
- **Duotone:** Combat × brass, mix-blend multiply at 85% / 25%. Heritage / archival photos only. Never mix duotone and full-color in the same row.
- 🛑 **Banned imagery:** stock handshakes, waving flags, bald eagles, rifles + mug, salutes, camo wallpaper, AI-generated faces, prayer-circle compositions.

### 4.6 Iconography (Military Set)

Reserved set — these are the only sanctioned ornaments. Each has a use; outside that use, it doesn't exist.

| Element | Use only for | Never for |
|---|---|---|
| **Stencil display font** | Drop names, badges, mission-mode banners (limited drops, "OP-047") | Running headlines, body |
| **Dog tag** | Founder credit, roastmaster bio, subscriber name on dashboard | PDPs, marketing pages |
| **Morale patch** | Credential ("Veteran-Owned", "Mission-Grade") on About / Story | PDPs, cart, checkout |
| **Chevron** | Subscription tier indicator (Recruit / Operator / Command) | Decorative arrow |
| **Classified stamp** | Limited drops, eyes-only releases, operator-exclusive | Generic urgency (use red CTA) |
| **Coordinates** | Footer, batch metadata, order confirmation | Headline emphasis |
| **Ammo stripe** | Section break, promo strip cap | Section background |
| **Digital camo** | One small accent on Operator-tier card / gift-card pattern | Wallpaper, behind text |
| **Crosshair** | Logo registration plate, scope marker on hero | Loading spinner, decoration |
| **Star (★)** | Ornament inside stamps, patches | Headline punctuation, list bullets |

**Density law:** ≤ 2 military elements per section · ≤ 1 per hero · camo ≤ 8% of any view's surface · stencil never on the same line as `display`.

### 4.7 The Mark (logo)

- **File:** `public/logo.avif`. Don't re-export at component layer; render via `next/image` with explicit `width`/`height`.
- **Min size:** 48px height (mark only) / 160px width (full lockup).
- **Clear space:** = cap-height of "WARPATH" on every edge. Build it into the component as fixed padding.
- 🛑 **Never** recolor outside the sanctioned palette, rotate, stretch, outline, or apply drop-shadows.
- **Mark-only fallback:** Below 48px, only the mark. Below 32px, don't show the mark — show the wordmark text.

---

## 5. Voice & Copy Rules

These are enforceable in PR review, not just suggestions.

### 5.1 Banned words (auto-flag in CMS)

`artisanal · elevated · experiential · curated · best-in-class · world-class · revolutionary · disruptive · synergy · journey · symphony · forged in fires · warriors for warriors · America's finest · pure essence · liquid gold`

If you're tempted to use any of these, you're padding. Cut and replace with a concrete claim.

### 5.2 Voice pillars (from §11 of guide)

1. **Confident, not cocky** — make defendable claims. "Drink it black, no sugar necessary" beats "world's smoothest."
2. **Plain English. Period.** — Say what it is. "Custom dark roast. Chocolate, almond, clean finish."
3. **Service earns the stripe** — Founder's service is stated, not waved. Never trailing star-emoji "★★★★★".
4. **Bean first, story second** — PDPs lead with taste/roast/brew. Veteran story lives on `/our-story`.

### 5.3 Length law

- Hero headline: ≤ 7 words.
- Subhead: ≤ 18 words, one sentence.
- CTA label: 2–4 words. "Add to Cart" yes, "Click here to add this product to your shopping cart" no.
- PDP description (above fold): ≤ 30 words. Three concrete attributes minimum (roast, notes, origin).
- Eyebrow tag: ≤ 6 words, mono uppercase.

### 5.4 Numbers

- Prices: `$24.99` with cents superscripted on PDPs (`<span class="text-[.6em] align-super">99</span>`), full size in cart.
- Stats: Stencil or display 900, brass color, units in mono below (`10K+ / cups poured`).
- Dates in metadata: `15·05·26` (DD·MM·YY mono with middle-dot separator).

---

## 6. Engineering Discipline

### 6.1 Performance budgets (block PR if exceeded)

| Metric | Budget |
|---|---|
| LCP | ≤ 2.0s on mid-tier mobile (Moto G4 / 4G) |
| CLS | ≤ 0.05 |
| INP | ≤ 200ms |
| JS bundle (initial route) | ≤ 180 KB gzipped |
| Image weight per page | ≤ 800 KB total |
| Fonts | 4 families max, subset to Latin, `font-display: swap`, preconnect Google Fonts |

### 6.2 Accessibility (block PR if violated)

- WCAG 2.2 AA minimum. AAA on all primary color pairs (combat/bone, bone/combat, combat/brass, ash-700/bone).
- Body 16px floor.
- All interactive targets ≥ 44×44 CSS px.
- Focus ring: `outline: 2px solid brass-500; outline-offset: 2px`. Never `outline: none` without a replacement.
- Skip-to-content link, first focusable.
- `prefers-reduced-motion`: GSAP timelines collapse to `progress(1)`, marquees pause, hover translates disabled.
- Color is never the sole signal. Pair with text, icon, or pattern.
- All images: meaningful → real `alt`. Decorative → `alt=""` + `aria-hidden`.

### 6.3 SEO / metadata

- `app/layout.tsx` defines `metadata` with default OG (`/og-default.png` 1200×630, combat bg + brass mark + headline).
- Each route exports `generateMetadata` with route-specific title/description/og.
- Title pattern: `<Page> · Warpath Coffee`. Home: `Warpath Coffee · Drink it black, no sugar necessary`.
- JSON-LD on PDPs (`Product` schema with offers, aggregateRating). On Story page (`Organization` + `Person` for Tej Gill).

### 6.4 CRO instrumentation

Every conversion-relevant element gets a stable `data-event` attribute:

```tsx
<Button data-event="cart_add" data-event-product="op-001">Add to Cart</Button>
```

Server-side analytics receives the event. Client-side analytics is deferred to interaction. We don't sacrifice LCP for tracking.

### 6.5 Testing

- **Unit:** Vitest + Testing Library. Components have a smoke test (renders) + variant tests (each prop branch).
- **E2E:** Playwright. Cover at minimum: home → PDP → add to cart → checkout. Subscribe flow. Search. Account login.
- **Visual:** Storybook + Chromatic on every component. PR fails if visual diff isn't reviewed.
- **A11y:** axe-core in CI, run against every Storybook story and every E2E page.

---

## 7. Anti-Patterns (do not ship)

| ❌ Anti-pattern | ✅ Do this instead |
|---|---|
| Soft rounded card with `shadow-md` and a top "feature" bar | Sharp `FieldCard` with side rail and signature foot |
| Pill button with center-aligned icon-text | Blade-cut button with mono uppercase label |
| Generic "Lorem ipsum" body in mockups | Actual Warpath voice — "Custom dark roast. Chocolate, almond, clean finish." |
| Hero with center-aligned text on stock photo | 7/5 split, left-aligned editorial headline + right product crate |
| Red anywhere except urgency | Brass for primary CTA. Olive for credentials. Red only for low-stock / flash. |
| "★★★★★ Excellent product!" trailing copy | Quoted review with named source: "Smoothest cup I've had. — M. Reyes, USMC vet." |
| Camo wallpaper, eagle silhouette, salute photo | Real product photo with field-report frame |
| `<button>Submit</button>` | `<Button variant="brass" size="lg" data-code="OP-INTAKE">Start Subscription →</Button>` |
| Floating labels over inputs | Mono uppercase label above input with `REQ` chip if required |
| Modal popup on first scroll for newsletter | Inline subscribe block at the bottom of `/our-story`, plus footer signup |
| Three different gold colors in one screen | One brass token (`brass-500` for accents, `brass-600` on light text) |
| Skipping focus rings to "look cleaner" | Visible 2px brass focus ring on every interactive element, period |
| Animated splash / preloader | Stream the page. SSR the hero. No splash. |

---

## 8. Decision Defaults (when in doubt)

If you're picking between two valid options and the brand guide doesn't specifically arbitrate, use these defaults:

- **Light or dark section?** → Light (bone-100). Dark sections are punctuation, not paragraphs.
- **Display or stencil for this label?** → Display. Stencil is reserved for §4.6 use cases only.
- **Pill or blade-cut button?** → Blade-cut. Always.
- **Centered or left-aligned text?** → Left. Center only for stamps, badges, single-line callouts.
- **Two columns or three?** → Three for product/feature grids, two for editorial / doctrine cards, asymmetric (7/5) for heroes.
- **Animate on scroll or on mount?** → On mount with a small stagger. Scroll-driven only for marquee and the "Our Process" pinned section.
- **Subscribe CTA color?** → Brass.
- **Add-to-Cart CTA color?** → Combat (primary).
- **Donate / Support equivalent?** → We don't have one. We sell coffee.

---

## 9. Definition of Done (per component)

Before you mark a PR ready for review, the component must have:

- [ ] All variants implemented per brand guide
- [ ] Tailwind tokens only (no raw hex / px outside config)
- [ ] Storybook story with all variants
- [ ] Smoke test (renders) + variant tests
- [ ] axe-core: 0 serious / critical
- [ ] Keyboard-navigable (tested with no mouse)
- [ ] Screen-reader pass (NVDA or VoiceOver, captured in PR notes)
- [ ] `prefers-reduced-motion` honored
- [ ] Mobile (390w), tablet (768w), desktop (1440w) screenshots in PR
- [ ] Performance: doesn't regress route LCP by > 100ms
- [ ] Copy reviewed against §5 voice rules

---

## 10. Escalation

- Brand-guide ambiguity → ask the brand lead, *then* update the guide.
- Tech-stack deviation needed → write an RFC in `docs/rfcs/`, link in PR.
- New card type / new color / new font weight → open issue with `proposal` label. Don't ship it in a feature PR.
- Banned-word in approved copy → CMS editor + brand lead must both approve, recorded in CMS audit log.

---

**Filed.** v1.0 · 15·05·26 · Warpath Coffee · Brand Operations · Tier 1.
*If a rule here contradicts the brand guide, the brand guide wins. If both are silent, default per §8.*
