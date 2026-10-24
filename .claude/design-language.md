# Minnesota Nanofabrication — design language

Binding reference for anyone (human or agent) touching this site's front
end, and for the docs book (`nanofab_docs`), which follows the same rules.
Read it before writing markup, CSS or copy. If a request conflicts with this
file, follow this file and say so.

**Revision 3 (October 2026).** Replaces revision 2 entirely: the warm paper
ground, Fraunces / Libre Franklin / Courier Prime, maroon accent and the
"no navigation, huge presentation blocks" layout are all retired.

---

## 1. The idea

**Stark, confident, editorial.** The references are
[Stone Arch Silicon](https://stone-arch-silicon.github.io/stone-arch-silicon/)
(structure, navigation, type, cards) and [Palantir](https://www.palantir.com/)
(high contrast, black and white, nothing decorative). The site should read
like a serious engineering organization that happens to be students.

**A visitor always knows where they are.** Every page has the persistent top
navigation, a breadcrumb in its title block, and a full sitemap in the
footer. Long pages add a sticky section bar. No page is a dead end.

**The main site is the front door; the docs are the workshop.** The website
is short: who we are, every machine at a glance, the people, the blog, the
sponsors. Long-form engineering (diagrams, schedules, calculations, assembly)
lives in the mdBook docs site and is always one click away.

## 2. Colour

Mostly black and white. **UV purple comes from the club logo and is used
only where something should pop.**

| Token (CSS var) | Value | Use |
|---|---|---|
| `--black` | `#060607` | dark sections, hero, footer |
| `--ink` | `#0d0d0e` | text on light; dark CTA block |
| `--ink-2`, `--ink-3` | `#141416`, `#1d1e21` | raised tiles on dark |
| `--white` | `#ffffff` | light sections |
| `--paper`, `--paper-2` | `#f3f3f1`, `#e6e6e3` | alternate light section, grey CTA, tiles |
| `--uv` | `#6d28d9` | accent on white/paper (7.1:1) |
| `--uv-bright` | `#a78bfa` | accent on black (7.9:1) |
| `--uv-deep` | `#42245f` | the logo's own purple; reference only |
| `--uv-glow` | `124, 58, 237` | rgb triplet for the hero/page-hero glow |

Every section declares a theme: `.theme-dark`, `.theme-light` or
`.theme-paper`. The theme sets `--bg --fg --muted --faint --line --line-2
--tile --accent`. **Components read only those variables**, so a component
works on any theme without changes. Never hard-code a hex in a component.

### When purple is allowed

Purple is a signal, so it has to stay rare. Allowed:

- **Hover / focus** on primary buttons, CTA blocks, links, pills.
- **The current location**: active nav link underline, active sub-nav tab,
  active mobile menu item, the active docs sidebar item.
- **The eyebrow square** (7×7 px) in front of a section label.
- **One word of the hero headline** ("fab.") and the full stop square after
  the About statement.
- **The glow**: a soft radial gradient in the top-right of the home hero and
  inner page heroes. Never more than one glow per screen.
- **Operational** build status (when a machine is running).
- Bullet squares in long-form prose, the left rule on blockquotes and draft
  warnings in the docs.

Not allowed: purple backgrounds on resting elements, purple body text,
purple headings, gradients other than the glow, more than one purple
element competing in a single viewport at rest.

## 3. Type

Two families, self-hosted from `static/fonts/` (SIL OFL): **Geist** for
everything and **Geist Mono** for labels and data. Weights stay light:
headings are 400, emphasis 450–500. Tight negative tracking on large type.

| Role | Class | Size | Tracking |
|---|---|---|---|
| Home hero | `.hero-title` | `clamp(52px, 10vw, 176px)` | −0.06em |
| Inner page title | `.page-title` | `clamp(44px, 6.4vw, 112px)` | −0.052em |
| Statement | `.statement` | `clamp(34px, 5vw, 84px)` | −0.048em |
| Section heading | `.h2` | `clamp(38px, 5vw, 80px)` | −0.045em |
| Band heading | `.band-head h2` | `clamp(32px, 3.8vw, 60px)` | −0.045em |
| Card / tile title | `.mcard-title`, `.path h3` | 24–36px | −0.035em |
| Lead | `.lead`, `.hero-lead` | 17–21px, `--muted` | — |
| Body | `body` | 17px (16px on phones) | −0.006em |
| Long-form prose | `.prose` | 18px, line-height 1.7, max 68ch | — |
| Label (mono) | `.eyebrow`, `.mcard-step`, `.f-h` | 11–12px uppercase | +0.10–0.14em |

Mono labels are small on purpose: they are wayfinding, not reading. Anything
a visitor must read (summaries, bios, body) is never below 15px.

Headings don't end in full stops, **except** the big display statements
(hero, page titles, section `.h2`), which are written as short sentences.

## 4. Space and layout

- Container: `.wrap`, max 1440px, gutter `--gut: clamp(16px, 4vw, 56px)`.
- Section rhythm: `.sec` = `clamp(80px, 12vh, 152px)` top and bottom;
  `.sec-tight` for closing bands.
- Section header: `.sec-head` is a two-column grid: eyebrow across the top,
  heading left, lead or a button right. It collapses to one column at 900px.
- Corners are square. The only rounded things are portrait circles and the
  footer pills.
- Hairlines (`--line`, `--line-2`) separate things; no shadows, no cards
  floating on shadows.
- Breakpoints: 1280 (brand tag drops), 1180 (grids 4→2/3), 1023 (nav links
  fold into the menu, machine grid 3→2), 900 (heads stack), 640 (phones:
  single columns, 2-up team).

## 5. Components

**Header** (`partials/header.html`). Fixed, 72px (64px under 900px).
Transparent over the dark hero, then frosted black or frosted white
depending on the section underneath (`data-nav="dark|light"` on every
section; `site.js` switches it). Brand left; links from `[menus.main]`, Docs
(external, ↗) and the white "Join the club" button right. Under 1024px the
links become a full-screen menu: numbered big links, plus Documentation and
Connect columns. Esc closes it; focus is trapped while open.

**Hero** (home). Full viewport, dark. The lab photograph in greyscale at low
opacity, a bottom/left shade, the UV glow top-right, film grain. Eyebrow,
headline with one purple word, lead and two buttons (solid + line), then a
`.specs` row of four live facts that are also links. Counts are computed from
content, never typed.

**Page hero** (`partials/page-hero.html`). Every inner page opens with it:
dark, faint 64px grid fading out, the glow, breadcrumb, title, lead,
optional `.specs` row.

**Sub-nav** (`.subnav`). Sticky under the header on long pages (Machines,
Team). Numbered links to the page's sections; the one in view gets the
purple underline and `aria-current="location"`. Horizontally scrollable on
phones.

**Buttons.** `.btn-solid` (fill = `--fg`) for the primary action,
`.btn-line` (hairline) for the secondary. Arrow icon slides on hover; ↗ for
external links. Solid buttons turn UV on hover. At most one solid button per
group.

**Directory tiles** (`.paths`). One bordered row of equal tiles; hover
inverts to black with the "go" link in UV. Used for the bands on the home
page.

**Machine cards** (`partials/machine-card.html`). Hairline grid, three
across. Mono "Process · Step" label and build status on top, name, one-line
summary, "+ Read more". The top of the card is a real `<button>` with
`aria-expanded` and `aria-controls`; opening a card makes it span the row
and shows the member's Markdown, a facts list (process, step, build, lead,
part-of) and "Full documentation ↗". `#slug` in the URL opens that card.
Without JavaScript all cards render open.

**Status** (`partials/status.html`). A 7px square plus a word, never colour
alone: Planned (hollow), In build (filled `--fg`), Operational (filled UV).

**People.** Circular greyscale portraits that turn to colour on hover; name
in Geist, roles in small mono caps. Machine roles link to the machine card.

**News list** (`.news`). Date/kicker in mono, title large, arrow right; a
hairline draws across under the row on hover. Used for the blog.

**CTA blocks** (`.cta-block`). Huge type, full width; dark and grey
variants, both turn UV on hover. One pair per page at most, at the end.

**Footer.** Dark. Brand and blurb, Explore / Docs / Connect columns, the
giant wordmark fitted to the width, then the University's required legal
block **last**, on its own (README, "UMN branding rules").

## 6. Motion

Short and quiet: `--ease: cubic-bezier(.2,.7,.2,1)`, 0.2–0.8s. Sections fade
up once as they enter (`.reveal`). Arrows nudge on hover. Nothing loops,
nothing autoplays. `prefers-reduced-motion` turns it all off.

## 7. Copy

- Short, specific, true. Say what something is; skip hype words
  (revolutionary, seamless, cutting-edge, unlock, journey, passionate).
- **Never publish a number the team did not choose or measure.** Targets are
  labelled as targets. This is why the generated machine drafts were taken
  off the site and appear in the docs only under a warning.
- No exclamation marks. It is fine to say something is not built yet.

## 8. Accessibility

- Text contrast: `--muted` on white is 7:1, on black 8:1+. UV tokens were
  chosen for ≥7:1 on their ground.
- Every interactive element is a link or a button and shows a 2px UV focus
  ring (`:focus-visible`).
- Skip link to `#main` on every page. Decorative images have `alt=""`.
- Status is never colour alone; expanded state is in `aria-expanded`.

## 9. Files

| What | Where |
|---|---|
| All styles (source) | `tailwind-input.css` (component layer on CSS variables) |
| Built stylesheet (committed) | `static/css/site.css` — `npm run build:css` |
| Tailwind config, safelist | `tailwind.config.js` |
| Behaviour | `static/js/site.js` |
| Fonts | `static/fonts/` |
| Docs theme | `nanofab_docs/theme/nanofab.css` (same tokens) |

After changing a template or `tailwind-input.css`, run `npm run build:css`
and commit `static/css/site.css` with your change. A class added only by
JavaScript must be listed in the `safelist` in `tailwind.config.js`.
