# JobAnxiety.ai — Brand & Style Guide
### Version 1.0 · March 2026

---

## 1. Brand Philosophy

### The Core Tension

The name "JobAnxiety.ai" does something unusual: it names the emotion. Most career platforms hide behind aspirational branding — "BrightPath," "Leap," "Elevate." We don't. We name the thing people feel at 11pm when they read another headline about AI replacing their job.

This creates a brand responsibility: the name acknowledges the anxiety, so the brand must channel it. Not amplify it. Not dismiss it. Channel it into informed action.

**The brand equation**:
```
Anxiety + Data = Clarity
Clarity + Guidance = Agency
Agency + Opportunity = Action
```

Every design decision flows from this: we take the raw nerve of career anxiety and transform it — through trustworthy data, honest editorial, and real job opportunities — into a sense of control.

### Brand Personality

If JobAnxiety.ai were a person, they'd be:

- **A sharp, empathetic data journalist** — not a therapist, not a career coach, not a tech influencer
- Someone who tells you the truth but explains what you can do about it
- Calm under pressure but never dismissive of your fear
- Reads the BLS reports and translates them into human language
- Brings receipts for every claim
- The friend who doesn't say "everything will be fine" but does say "here's what the data actually shows, and here's your next move"

### What We Are Not

- Not a tech startup that thinks layoffs are "disruption"
- Not a self-help platform that treats structural economic forces as mindset problems
- Not a news aggregator that profits from fear without offering solutions
- Not a generic job board with an AI veneer
- Not alarmist ("AI IS COMING FOR YOUR JOB") or dismissive ("just learn to code")

---

## 2. Visual Identity

### Logo System

**Primary Mark**: The wordmark "JobAnxiety.ai" in the display typeface, with ".ai" treated as a distinct but connected element.

```
JOBANXIETY.ai
```

**Construction**:
- "JOBANXIETY" is set in uppercase Instrument Serif (or Fraunces) at heavy weight
- ".ai" is set in the same typeface at regular weight, in the accent color
- The period before "ai" serves as a visual pause — the brand literally pauses before the technology
- Tracking (letter-spacing): +0.02em on "JOBANXIETY", +0.04em on ".ai"

**Logo Variations**:

| Variant | Use Case |
|---------|----------|
| Full wordmark (dark) | Primary use on light backgrounds |
| Full wordmark (light) | On dark backgrounds, hero sections |
| Compact wordmark "JA.ai" | Favicon, app icon, social avatar, mobile header |
| Monogram "JA" | 16px and below contexts |

**Clear Space**: Minimum clear space around the logo = the height of the "J" character on all sides.

**Minimum Size**: Full wordmark — 120px width on screen, 1.5 inches in print. Compact — 24px.

---

### Color System

The palette communicates: "we take this seriously, and we're here to help." It avoids the clinical coldness of fintech and the saccharine warmth of wellness brands. The result: editorial authority with a human undertone.

**Primary Palette**:

```css
:root {
  /* ── Foundation ── */
  --ja-ink:         #1A1D23;     /* Near-black: primary text, highest contrast */
  --ja-charcoal:    #2D3039;     /* Dark surfaces: nav, footer, data cards */
  --ja-slate:       #4A5060;     /* Secondary text, labels */
  --ja-steel:       #6B7280;     /* Tertiary text, metadata, captions */
  --ja-mist:        #9CA3AF;     /* Disabled states, placeholders */

  /* ── Surfaces ── */
  --ja-paper:       #FAFAF9;     /* Page background: warm white, not clinical */
  --ja-cloud:       #F3F4F6;     /* Card backgrounds, secondary surfaces */
  --ja-fog:         #E5E7EB;     /* Borders, dividers, table rules */

  /* ── Signal Colors ── */
  --ja-teal:        #0D9488;     /* Primary action: opportunity, apply, explore */
  --ja-teal-light:  #CCFBF1;     /* Teal tint: hover states, selected states */
  --ja-teal-dark:   #0F766E;     /* Teal pressed state */

  --ja-coral:       #DC2626;     /* Alert: layoff events, displacement data */
  --ja-coral-light: #FEE2E2;     /* Coral tint: alert backgrounds */

  --ja-amber:       #D97706;     /* Caution: unverified data, "reported" confidence */
  --ja-amber-light: #FEF3C7;     /* Amber tint: caution backgrounds */

  --ja-emerald:     #059669;     /* Positive: hiring signals, confirmed data, growth */
  --ja-emerald-light:#D1FAE5;    /* Emerald tint: success backgrounds */

  /* ── Chart / Data Visualization Palette ── */
  /* Tested for WCAG AA contrast + colorblind safety (deuteranopia, protanopia) */
  --ja-chart-1:     #0D9488;     /* Teal: primary data series */
  --ja-chart-2:     #6366F1;     /* Indigo: secondary series */
  --ja-chart-3:     #F59E0B;     /* Amber: tertiary series */
  --ja-chart-4:     #EC4899;     /* Pink: quaternary series */
  --ja-chart-5:     #8B5CF6;     /* Violet: quinary series */
  --ja-chart-6:     #14B8A6;     /* Teal-light: additional series */
}
```

**Color Usage Rules**:

| Context | Color | Why |
|---------|-------|-----|
| Body text | `--ja-ink` on `--ja-paper` | Maximum readability, warm not harsh |
| Headlines | `--ja-ink` | Authority, weight |
| Primary CTA buttons | `--ja-teal` bg, white text | Teal = opportunity, action, forward movement |
| Layoff event badges | `--ja-coral` | Red = alert, but not panic-red — this coral has warmth |
| Confirmed badge | `--ja-emerald` | Green = verified, trustworthy |
| Reported badge | `--ja-amber` | Amber = caution, not yet verified |
| Rumored badge | `--ja-coral-light` with `--ja-coral` text | Lighter treatment = lower confidence |
| Card surfaces | `--ja-cloud` | Subtle lift from page background without heavy shadows |
| Navigation | `--ja-charcoal` bg, white text | Dark nav creates a clear visual header anchor |
| Social proof text | `--ja-teal` | Engagement numbers inherit the "opportunity" color |
| Charts - opportunity data | `--ja-teal` | Consistent: teal = opportunity across the platform |
| Charts - displacement data | `--ja-coral` | Consistent: coral = displacement across the platform |
| Interactive hover states | `--ja-teal-light` bg | Subtle, not distracting |

**Dark Mode** (optional, Phase 2):

```css
[data-theme="dark"] {
  --ja-ink:         #F3F4F6;
  --ja-charcoal:    #111318;
  --ja-paper:       #1A1D23;
  --ja-cloud:       #2D3039;
  --ja-fog:         #3D4150;
  /* Signal colors remain unchanged — they're designed to work on both */
}
```

---

### Typography

The type system serves three modes simultaneously: editorial reading (career guides, essays), data display (dashboards, tables), and UI interaction (buttons, forms, navigation). Each mode has a dedicated typeface.

**Type Stack**:

```css
:root {
  /* ── Editorial ── */
  /* Instrument Serif: warm, modern serif with personality.
     Used for headlines, article titles, pull quotes, and the logo.
     It says "journalism" without saying "newspaper." */
  --ja-font-editorial: 'Instrument Serif', Georgia, 'Times New Roman', serif;

  /* ── UI / Body ── */
  /* DM Sans: geometric sans-serif with optical sizing.
     Clean, modern, reads beautifully at body sizes.
     Used for body text, navigation, buttons, form labels. */
  --ja-font-body: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  /* ── Data / Monospace ── */
  /* JetBrains Mono: designed for on-screen reading of code and data.
     Used for statistics, numbers in dashboards, API docs, data tables.
     Its tabular figures align perfectly in columns. */
  --ja-font-data: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
}
```

**Why these three** (engineering lesson): Most design systems use two typefaces — one for headings and one for body. We use three because we have three distinct content modes that readers need to unconsciously distinguish. When you see Instrument Serif, your brain knows "this is editorial content — read it." When you see JetBrains Mono, your brain knows "this is data — parse it." When you see DM Sans, your brain knows "this is UI — interact with it." This typographic code reduces cognitive load on a platform where readers are already under stress.

**Type Scale**:

```css
:root {
  /* Scale based on 1.25 ratio (Major Third) */
  --ja-text-xs:     0.75rem;     /* 12px — captions, metadata, timestamps */
  --ja-text-sm:     0.875rem;    /* 14px — secondary body, table cells */
  --ja-text-base:   1rem;        /* 16px — body text, UI elements */
  --ja-text-lg:     1.125rem;    /* 18px — lead paragraphs, card titles */
  --ja-text-xl:     1.25rem;     /* 20px — section subheadings */
  --ja-text-2xl:    1.5rem;      /* 24px — section headings */
  --ja-text-3xl:    1.875rem;    /* 30px — page headings */
  --ja-text-4xl:    2.25rem;     /* 36px — hero headings, feature titles */
  --ja-text-5xl:    3rem;        /* 48px — homepage hero stat numbers */
  --ja-text-6xl:    3.75rem;     /* 60px — large display numbers (Market Pulse) */

  /* Line heights */
  --ja-leading-tight:    1.2;    /* headlines */
  --ja-leading-snug:     1.35;   /* subheadings */
  --ja-leading-normal:   1.6;    /* body text — generous for long reads */
  --ja-leading-relaxed:  1.75;   /* career guides, maximum readability */
  --ja-leading-data:     1.4;    /* data tables, compact but legible */
}
```

**Typographic Rules**:

| Element | Font | Size | Weight | Leading | Tracking |
|---------|------|------|--------|---------|----------|
| Homepage hero headline | Editorial | 5xl (48px) | 400 | tight | -0.02em |
| Market Pulse stat numbers | Data | 6xl (60px) | 500 | tight | -0.01em |
| Market Pulse labels | Body | sm (14px) | 500 | snug | 0.04em (uppercase) |
| Page title (H1) | Editorial | 4xl (36px) | 400 | tight | -0.01em |
| Section heading (H2) | Editorial | 2xl (24px) | 400 | snug | 0 |
| Subsection heading (H3) | Body | xl (20px) | 700 | snug | 0 |
| Body text | Body | base (16px) | 400 | normal (1.6) | 0 |
| Lead paragraph | Body | lg (18px) | 400 | relaxed (1.75) | 0 |
| Card title | Body | lg (18px) | 600 | snug | 0 |
| Navigation links | Body | sm (14px) | 500 | tight | 0.02em |
| Button text | Body | sm (14px) | 600 | tight | 0.03em |
| Table headers | Body | xs (12px) | 700 | tight | 0.06em (uppercase) |
| Table cell data | Data | sm (14px) | 400 | data (1.4) | 0 |
| Data badge/chip | Data | xs (12px) | 500 | tight | 0.02em |
| Confidence badge | Body | xs (12px) | 600 | tight | 0.04em (uppercase) |
| Timestamp / "Updated X ago" | Body | xs (12px) | 400 | tight | 0 |
| Social proof ("142 applied") | Data | sm (14px) | 500 | tight | 0 |
| Citation format | Data | xs (12px) | 400 | normal | 0 |

**Body Copy Width**: Max 68 characters per line for editorial content (career guides, articles). This is the optimal reading length — wider lines cause eye-tracking fatigue, narrower lines feel cramped. Data dashboards can use full-width layouts.

---

### Spacing System

```css
:root {
  /* 4px base unit */
  --ja-space-1:   0.25rem;    /* 4px   — icon padding, micro gaps */
  --ja-space-2:   0.5rem;     /* 8px   — inline spacing, badge padding */
  --ja-space-3:   0.75rem;    /* 12px  — tight component spacing */
  --ja-space-4:   1rem;       /* 16px  — standard component spacing */
  --ja-space-5:   1.25rem;    /* 20px  — card padding */
  --ja-space-6:   1.5rem;     /* 24px  — section inner spacing */
  --ja-space-8:   2rem;       /* 32px  — between components */
  --ja-space-10:  2.5rem;     /* 40px  — between sections (mobile) */
  --ja-space-12:  3rem;       /* 48px  — between sections (tablet) */
  --ja-space-16:  4rem;       /* 64px  — between major sections */
  --ja-space-20:  5rem;       /* 80px  — page-level vertical rhythm */
  --ja-space-24:  6rem;       /* 96px  — hero/footer breathing room */
}
```

**Spacing Philosophy**: Generous whitespace is a trust signal. Cramped layouts feel desperate; generous layouts feel authoritative. For a platform where users are already stressed, breathing room reduces cognitive load. The homepage sections should have `--ja-space-16` to `--ja-space-20` between them. Cards should have `--ja-space-5` internal padding. The overall impression should be: "this platform has nothing to hide — there's space to think."

---

### Elevation & Shadow

```css
:root {
  /* Subtle, warm shadows — not the harsh drop shadows of 2020 */
  --ja-shadow-sm:   0 1px 2px rgba(26, 29, 35, 0.05);
  --ja-shadow-md:   0 2px 8px rgba(26, 29, 35, 0.08);
  --ja-shadow-lg:   0 4px 16px rgba(26, 29, 35, 0.10);
  --ja-shadow-xl:   0 8px 32px rgba(26, 29, 35, 0.12);

  /* Borders preferred over shadows for most card boundaries */
  --ja-border:      1px solid var(--ja-fog);
  --ja-border-focus: 2px solid var(--ja-teal);
}
```

**Rule**: Prefer borders over shadows. Shadows create visual hierarchy through depth; borders create hierarchy through containment. For a data-dense platform, containment (borders) reads cleaner than depth (shadows). Use shadows only for modals, dropdowns, and floating elements.

---

### Border Radius

```css
:root {
  --ja-radius-sm:   4px;      /* Badges, chips, small buttons */
  --ja-radius-md:   8px;      /* Cards, inputs, standard buttons */
  --ja-radius-lg:   12px;     /* Featured cards, modals */
  --ja-radius-xl:   16px;     /* Hero elements, large containers */
  --ja-radius-full: 9999px;   /* Pills, avatars, circular elements */
}
```

**Rule**: 8px is the default. The platform should feel precise, not bubbly. Rounded corners are for comfort, not whimsy.

---

## 3. Component Design Patterns

### Confidence Badges

The confidence badge is the platform's signature trust component. It appears on every layoff event, major data claim, and company profile.

```
🟢 CONFIRMED    — Green emerald badge, solid background
                  Used when: SEC filing, WARN Act notice, or 2+ credible sources
                  Font: --ja-font-body, --ja-text-xs, weight 600, uppercase
                  Style: --ja-emerald bg, white text, --ja-radius-sm

🟡 REPORTED     — Amber badge, solid background
                  Used when: single credible news source
                  Font: same as above
                  Style: --ja-amber bg, white text, --ja-radius-sm

🔴 UNVERIFIED   — Coral outline badge (not filled — less visual weight)
                  Used when: social media, anonymous sources, single non-major source
                  Font: same as above
                  Style: --ja-coral-light bg, --ja-coral text, --ja-coral border
                  Note: word is "UNVERIFIED" not "RUMORED" — less judgmental
```

### Social Proof Indicators

```
ENGAGEMENT CHIPS (appear on job listings):
  "142 applied today"     → --ja-font-data, --ja-text-sm, --ja-teal text
  "89 viewed this week"   → same styling, used as fallback
  "🔥 Trending"           → --ja-coral bg, white text, pill shape
  "New"                   → --ja-teal bg, white text, pill shape
  "Closing soon"          → --ja-amber bg, --ja-ink text, pill shape

AGGREGATE SOCIAL PROOF (homepage):
  "12,847 AI roles hiring right now"
  → Number in --ja-font-data, --ja-text-5xl, --ja-ink
  → "AI roles hiring right now" in --ja-font-body, --ja-text-lg, --ja-slate
  → Sparkline chart inline, --ja-teal stroke
```

### Data Cards

```
┌─────────────────────────────────────────────────────────┐
│  LAYOFF EVENT CARD                                       │
│                                                          │
│  [Company Logo]  TechCorp                    🟢 CONFIRMED│
│                                                          │
│  March 27, 2026 · 800 people affected                   │
│  AI cited as contributing factor                         │
│                                                          │
│  Source: SEC 8-K Filing ↗  ·  WARN Notice (CA) ↗        │
│                                                          │
│  ── Context ───────────────────────────────────────────  │
│  TechCorp is simultaneously hiring 120 AI engineers.     │
│  → View company profile                                  │
│                                                          │
│  Border: --ja-border                                     │
│  Background: --ja-paper                                  │
│  Left accent: 3px --ja-coral (for layoff events)         │
│  Padding: --ja-space-5                                   │
│  Radius: --ja-radius-md                                  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  JOB LISTING CARD                                        │
│                                                          │
│  [Company Logo]  Anthropic              🔥 Trending      │
│                                                          │
│  Senior ML Engineer                                      │
│  Remote · $220–280K · Posted 2 days ago                  │
│                                                          │
│  142 people applied today                                │
│                                                          │
│  [Apply ↗]  [Save]                                       │
│                                                          │
│  Border: --ja-border                                     │
│  Background: --ja-paper                                  │
│  Left accent: 3px --ja-teal (for job listings)           │
│  Social proof: --ja-font-data, --ja-teal                 │
│  CTA button: --ja-teal bg, white text                    │
└─────────────────────────────────────────────────────────┘
```

### Market Pulse Bar

The signature homepage component. Should feel like a Bloomberg terminal ticker but warmer.

```
┌─────────────────────────────────────────────────────────────────┐
│ Background: --ja-charcoal                                        │
│ Text: white                                                      │
│ Numbers: --ja-font-data                                          │
│                                                                  │
│  12,847          3,214            14              8              │
│  Active AI       Posted this      Layoff events   Cited AI      │
│  roles           week ↑12%        this month      as factor     │
│  [sparkline]     [sparkline]      [sparkline]     [sparkline]   │
│                                                                  │
│  Updated 8 min ago · 847 companies · Methodology →               │
│  ─────────────────────────────────────────────────────────────   │
│  Sparklines: 30-day trend, --ja-teal for positive, --ja-coral   │
│  for negative. 40px tall, no axis labels (they're ambient data) │
│                                                                  │
│  "Updated X ago": --ja-font-body, --ja-text-xs, --ja-mist      │
│  "Methodology →": --ja-teal, underline on hover                  │
└─────────────────────────────────────────────────────────────────┘
```

### Trust Footer

Every page ends with the same trust strip:

```
─────────────────────────────────────────────────────────────
  JobAnxiety.ai is an independent platform.
  We don't sell recruitment ads or sponsored job placements.
  Our data methodology is open and versioned. Read it →
  All sources are linked. Corrections are public.
─────────────────────────────────────────────────────────────
```

Style: --ja-font-body, --ja-text-sm, --ja-steel, centered, --ja-space-12 above.

---

## 4. Editorial Voice & Tone

### Voice Constants (Always True)

| Attribute | What it means |
|-----------|---------------|
| Honest | We say what the data shows, even when it's uncomfortable. We never minimize genuine risk or inflate small signals. |
| Precise | We use specific numbers, specific sources, specific dates. "Some companies" is lazy; "14 companies this month" is precise. |
| Human | We remember that every data point represents a person. "3,200 people were affected" — not "3,200 positions were eliminated." |
| Empathetic | We acknowledge that career anxiety is rational, not irrational. We never condescend. |
| Actionable | Every scary number is paired with a next step. We never leave the reader in despair. |
| Methodological | We show our work. We version our methodology. We publish corrections. |

### Tone Spectrum (Varies by Context)

```
Warm ←───────────────────────────────────────────→ Clinical
  │                                                    │
  Career guides       Market commentary        API docs
  First-person        Layoff tracker           Methodology
  essays              Dashboard                Snapshot
  Newsletter                                   pages
  "After the layoff"
```

The tone shifts from warm-empathetic (career guides) to cool-precise (data surfaces) depending on the user's mode. Someone reading a career guide is in emotional processing mode. Someone on the dashboard is in analytical mode. Match the tone to the mode.

### Writing Rules

**Headlines**:
```
DO:   "14 Companies Cited AI in March Layoffs — Here's What the Data Shows"
DON'T: "AI Is DESTROYING Jobs at Record Pace!"

DO:   "Will AI Replace Accountants? An Honest Assessment"
DON'T: "Don't Worry, AI Won't Take Your Job (Probably)"

DO:   "3,214 AI Roles Posted This Week"
DON'T: "Thousands of INCREDIBLE AI Jobs Available NOW!"
```

**Data Claims**:
```
DO:   "Our tracker shows 14 layoff events this month where the company
       explicitly cited AI as a contributing factor (source: SEC filings,
       press releases). This is up from 8 last month."

DON'T: "AI caused 14 rounds of layoffs this month."
       (We can't prove causation — only that AI was cited.)

DO:   "Based on our classification methodology (v2.1), we estimate 12,847
       active AI-related job postings across 847 tracked companies."

DON'T: "There are 12,847 AI jobs."
       (It's an estimate based on a classification — say so.)
```

**Addressing Anxiety**:
```
DO:   "If you're worried about your role, that worry is rational.
       Here's what we know about AI's current impact on [your field],
       and here are three concrete things you can do this week."

DON'T: "Don't panic! AI is creating more jobs than it destroys!"
       (This may be true but it's dismissive of the person's specific fear.)

DON'T: "The future of work is terrifying and no one is safe."
       (This is engagement bait, not journalism.)

DO:   "We can't tell you whether your specific job is at risk — that
       depends on your company, your role's specifics, and factors we
       can't predict. What we CAN show you is the data on how your
       broader field is being affected, and the roles that are growing
       for people with your background."
```

**Social Proof**:
```
DO:   "142 people applied today" (factual, specific, verifiable)
DON'T: "🔥🔥🔥 HOT JOB — APPLY BEFORE IT'S GONE!"
DO:   "Trending this week" (data-driven designation)
DON'T: "Editor's Pick" (implies curation we don't do)
```

### Words We Use

| Instead of... | We say... | Why |
|---------------|-----------|-----|
| headcount reduction | layoff | Call it what it is |
| positions eliminated | people affected | People, not positions |
| disruption | displacement | More precise, less Silicon Valley |
| upskilling | learning, building skills | Less corporate jargon |
| leverage | use | Plain language |
| synergy | (nothing, ever) | — |
| pivot | transition, change direction | Less startup jargon |
| AI revolution | AI adoption, AI deployment | Less hype |
| future-proof | prepare, adapt | Less deterministic |
| thought leader | expert, specialist | Less empty |
| utilize | use | Always |

### Words We Never Use

- "exciting" (layoffs are not exciting)
- "incredible opportunity" (patronizing to displaced workers)
- "just" as a minimizer ("just learn Python" — dismissive)
- "disruption" as a positive
- "human capital" (people are not capital)
- "resources" to mean people
- Any superlative without data to back it

---

## 5. Iconography & Visual Elements

### Icon Style

- **Style**: Outlined, 1.5px stroke, square line caps
- **Size**: 20px default, 16px compact, 24px feature
- **Color**: Inherits text color by default; signal colors for status icons
- **Library**: Lucide Icons (open source, consistent with the clean aesthetic)
- **Custom icons needed**: Confidence badges (🟢🟡🔴), sparkline component, displacement ratio symbol

### Chart & Data Visualization Standards

```
General:
  - Font: --ja-font-data for all labels, values, and axes
  - Grid lines: --ja-fog, 1px, dashed
  - Axis labels: --ja-steel, --ja-text-xs
  - Data labels: --ja-ink, --ja-text-sm, --ja-font-data
  - Background: transparent (inherits card/page background)
  - Animation: 600ms ease-out on initial load, no animation on re-render
  - Tooltip: --ja-charcoal bg, white text, --ja-radius-sm, --ja-shadow-lg
  - Always include source attribution below the chart: "Source: JobAnxiety.ai · Methodology v2.1"

Color Assignment:
  - Opportunity / hiring / jobs → --ja-teal series
  - Displacement / layoffs → --ja-coral series
  - Neutral / comparison → --ja-chart-2 (indigo)
  - Use max 5 colors per chart; beyond that, use grouped/stacked approaches

Accessibility:
  - Never rely on color alone — use pattern fills or labels for colorblind users
  - All charts must have alt text describing the key takeaway
  - Interactive charts must be keyboard navigable
  - WCAG AA contrast ratio (4.5:1) on all text within charts

Embeddable Charts:
  - Must render cleanly at 600px width (standard article column)
  - Include "Powered by JobAnxiety.ai" watermark (bottom-right, subtle)
  - Light and dark theme support (auto-detect or param)
  - No cookies, no tracking in embeds
  - Load time < 1 second (lazy-load data, show skeleton first)
```

---

## 6. Layout Principles

### Grid System

```css
/* 12-column grid with responsive breakpoints */
:root {
  --ja-container-sm:   640px;     /* Mobile */
  --ja-container-md:   768px;     /* Tablet */
  --ja-container-lg:   1024px;    /* Desktop */
  --ja-container-xl:   1280px;    /* Wide desktop — max content width */
  --ja-gutter:         24px;      /* Column gap */
}

/* Editorial content: max 720px (for optimal reading width) */
.editorial-content {
  max-width: 720px;
  margin: 0 auto;
}

/* Data dashboards: full container width with sidebar */
.dashboard-layout {
  max-width: var(--ja-container-xl);
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: var(--ja-gutter);
}

/* Job board: card grid */
.job-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: var(--ja-space-6);
}
```

### Page Zones

Every page on the platform has four zones:

```
┌───────────────────────────────────────────────────────────┐
│ ZONE 1: NAVIGATION (sticky)                               │
│ --ja-charcoal bg · logo + primary nav + search + CTA     │
│ Height: 64px                                               │
├───────────────────────────────────────────────────────────┤
│ ZONE 2: CONTEXT BAR (optional, below nav)                 │
│ --ja-cloud bg · breadcrumbs, filters, last-updated time  │
│ Height: 44px · Only shown on data pages                   │
├───────────────────────────────────────────────────────────┤
│                                                           │
│ ZONE 3: CONTENT                                           │
│ --ja-paper bg · the actual page content                  │
│ Padding: --ja-space-16 top, --ja-space-20 bottom         │
│                                                           │
├───────────────────────────────────────────────────────────┤
│ ZONE 4: FOOTER                                            │
│ --ja-charcoal bg · nav links + trust strip + legal       │
│ Padding: --ja-space-16                                    │
└───────────────────────────────────────────────────────────┘
```

---

## 7. Motion & Interaction

### Animation Principles

- **Purpose over decoration**: Every animation should communicate something — a state change, a data update, a transition between views. Never animate for visual flair alone.
- **Speed**: 150ms for micro-interactions (hover, focus), 300ms for component transitions (tabs, accordions), 600ms for page-level animations (data loading, chart rendering).
- **Easing**: `ease-out` for entrances, `ease-in` for exits, `ease-in-out` for state changes.
- **Reduce motion**: Respect `prefers-reduced-motion`. All animations must degrade to instant state changes.

### Specific Interactions

```css
/* Card hover: subtle lift */
.card:hover {
  border-color: var(--ja-teal);
  box-shadow: var(--ja-shadow-md);
  transition: all 150ms ease-out;
}

/* CTA button: background shift */
.btn-primary:hover {
  background: var(--ja-teal-dark);
  transition: background 150ms ease-out;
}

/* Social proof number update: fade-in new number */
.social-proof-count {
  transition: opacity 300ms ease-out;
}

/* Chart loading: skeleton pulse */
.chart-skeleton {
  animation: pulse 1.5s ease-in-out infinite;
  background: linear-gradient(90deg, var(--ja-cloud) 0%, var(--ja-fog) 50%, var(--ja-cloud) 100%);
}

/* Market Pulse sparkline: draw-in on load */
.sparkline path {
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: draw 600ms ease-out forwards;
}
```

---

## 8. Responsive Behavior

### Breakpoint Strategy

| Breakpoint | Width | Layout Changes |
|-----------|-------|----------------|
| Mobile | < 640px | Single column, stacked cards, hamburger nav, compact Market Pulse (2x2 grid instead of 4-across), social proof below card title |
| Tablet | 640–1024px | Two-column card grid, visible nav, full Market Pulse bar, sidebar collapses to top bar on dashboards |
| Desktop | 1024–1280px | Full layout, sidebar navigation on dashboards, 3-column job grid |
| Wide | > 1280px | Content max-width kicks in (1280px), centered with generous margins |

### Mobile-First Priorities

- **Persona B (displaced workers) is 60%+ mobile during active job searching.** The job board must be excellent on mobile.
- Job cards: full-width, with apply button visible without scrolling
- Social proof: condensed to single line ("142 applied · Trending")
- Charts: simplified for mobile (remove axis labels, show tooltip on tap)
- Navigation: hamburger menu with "Jobs" and "Layoffs" as the first two items
- Market Pulse: 2x2 grid of stats instead of horizontal bar

---

## 9. Accessibility Standards

### Minimum Requirements (WCAG 2.1 AA)

| Requirement | Standard | Implementation |
|-------------|----------|----------------|
| Color contrast | 4.5:1 for normal text, 3:1 for large text | All color pairings tested; signal colors pass on both light and dark surfaces |
| Keyboard navigation | All interactive elements focusable and operable | Tab order follows visual order; focus rings use --ja-border-focus |
| Screen reader | All content accessible via screen reader | Semantic HTML, ARIA labels on charts, alt text on all images |
| Motion | Respects prefers-reduced-motion | All animations disabled when preference is set |
| Text sizing | Content readable at 200% zoom | Rem-based sizing, flexible layouts |
| Focus indicators | Visible focus rings on all interactive elements | 2px --ja-teal outline, 2px offset |
| Form labels | All inputs have associated labels | Label elements or aria-label, never placeholder-only |
| Error states | Errors not communicated by color alone | Text descriptions + icons accompany color changes |
| Link purpose | Link text describes destination | No "click here" — use "Read the methodology" |

### Why Accessibility Matters Here Specifically

This platform serves people in crisis. Some will have disabilities. Some will be using assistive technology. Some will be on older devices. A platform built around empathy for displaced workers that isn't accessible is a contradiction. Accessibility is a brand commitment, not a compliance checkbox.

---

## 10. Brand Application Examples

### Email Newsletter Template

```
From: The Market Brief <brief@jobanxiety.ai>
Subject: 3,214 AI roles posted this week · 14 layoff events · The Market Brief

Header: --ja-charcoal bg, white logo
Body: --ja-paper bg, --ja-font-body, max-width 600px
Stats: --ja-font-data for numbers, --ja-teal for positive, --ja-coral for negative
CTA: --ja-teal button, "See All Jobs →"
Footer: trust strip + unsubscribe link
```

### Social Media Templates

```
Twitter/X Card:
  Background: --ja-charcoal
  Headline: --ja-font-editorial, white, --ja-text-2xl
  Stat number: --ja-font-data, --ja-teal, --ja-text-5xl
  Watermark: "JobAnxiety.ai" bottom-right, --ja-steel

  Example:
  ┌─────────────────────────────────────────┐
  │                                          │
  │  This Week in AI Jobs                    │
  │                                          │
  │  3,214                                   │
  │  new roles posted                        │
  │                                          │
  │  ↑12% vs last week · 847 companies      │
  │                                          │
  │                       JobAnxiety.ai      │
  └─────────────────────────────────────────┘
```

### OG Image Template (Dynamic, via @vercel/og)

```
1200x630px
Background: --ja-charcoal
Left 60%: Page title in --ja-font-editorial, white, large
Right 40%: Key stat or mini chart
Bottom: "JobAnxiety.ai · AI Job Market & Layoff Tracker"
Bottom-right: Confidence badge if applicable
```

---

## 11. File & Asset Organization

```
/public
  /fonts
    instrument-serif-regular.woff2
    instrument-serif-italic.woff2
    dm-sans-400.woff2
    dm-sans-500.woff2
    dm-sans-600.woff2
    dm-sans-700.woff2
    jetbrains-mono-400.woff2
    jetbrains-mono-500.woff2
  /logo
    jobanxiety-full-dark.svg
    jobanxiety-full-light.svg
    jobanxiety-compact-dark.svg
    jobanxiety-compact-light.svg
    jobanxiety-favicon.svg
    jobanxiety-favicon-32.png
    jobanxiety-favicon-180.png     (Apple touch icon)
  /og
    og-default.png                  (fallback OG image)
  /icons
    confidence-confirmed.svg
    confidence-reported.svg
    confidence-unverified.svg

/src/styles
  tokens.css                        (all CSS custom properties from this guide)
  typography.css                    (font-face declarations + type utilities)
  components.css                    (card, badge, button component styles)
```

---

## 12. Brand Governance

### Do's

- Always link aggregate numbers to the methodology page
- Always show "last updated" timestamps on data pages
- Always use the confidence badge system for layoff claims
- Always use "--ja-teal" for opportunity/action elements and "--ja-coral" for displacement/alert elements
- Always pair a scary number with a "what you can do" context panel
- Always use Instrument Serif for editorial headlines and JetBrains Mono for data

### Don'ts

- Never use stock photos of "sad office workers" — use data visualizations instead
- Never use the word "exciting" in the context of layoffs or displacement
- Never display social proof numbers below 5 (show nothing instead)
- Never render unverified data in aggregate statistics
- Never use shadows when a border would suffice
- Never auto-play animations or videos
- Never use more than 5 colors in a single chart
- Never present AI job creation and AI layoffs as a simple good-vs-bad narrative
- Never use the logo below minimum size (120px for full, 24px for compact)
- Never modify logo colors — use only the provided dark/light variants
