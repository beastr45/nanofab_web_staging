# Minnesota Nanofabrication Club — Website

The club's main website: who we are, every machine at a glance, the team,
a blog, and the sponsors. It is built with [Hugo](https://gohugo.io), a
static site generator: you edit small text files, Hugo turns them into
plain HTML, and GitHub Pages serves it for free.

The long-form engineering documentation is a **separate site**, built with
mdBook from the `nanofab_docs` repository. Every machine card here links to
its page there.

**Almost everything you will want to change is one small, labelled file.**
Adding a machine is one Markdown file. Adding a person or a sponsor is a few
lines of YAML. Writing a blog post is one Markdown file. You do not need to
touch HTML or CSS for any routine update.

> **New to this?** Read **[EDITING.md](EDITING.md)** first. It walks through
> changing the site step by step, from the GitHub website or from your own
> computer, with no Hugo knowledge assumed.
>
> **Placeholders still waiting on a person** are listed in **[TODO.md](TODO.md)**.

---

## Contents

1. [Setup and preview](#1-setup-and-preview)
2. [Where everything lives](#2-where-everything-lives)
3. [Add or edit a machine](#3-add-or-edit-a-machine)
4. [Post to the blog](#4-post-to-the-blog)
   - [Events and the calendar](#4a-events-and-the-calendar)
5. [People, advisors and sponsors](#5-people-advisors-and-sponsors)
6. [Site settings: links, navigation, docs URL](#6-site-settings-links-navigation-docs-url)
7. [Changing the design](#7-changing-the-design)
8. [UMN branding rules (read this one)](#8-umn-branding-rules-read-this-one)
9. [Publishing](#9-publishing)

---

## 1. Setup and preview

Install **Hugo extended** (version 0.166.0 is what the deploy uses):

- Mac: `brew install hugo`
- Windows: `winget install Hugo.Hugo.Extended`
- Linux: download `hugo_extended_0.166.0_linux-amd64.tar.gz` from the
  [Hugo releases](https://github.com/gohugoio/hugo/releases), or use your
  package manager.

Then, in this folder:

```sh
hugo server
```

Open the address it prints (normally **http://localhost:1313/nanofab_web/**;
the `/nanofab_web/` part matches the live address). Leave it running: every
time you save a file, the page reloads. Mistakes (a broken YAML file, a
missing quote) show up in the terminal straight away.

You only need **Node.js** if you change the design (section 7).

---

## 2. Where everything lives

```text
content/
  _index.md               the homepage (its text comes from hugo.toml)
  machines/
    _index.md             the /machines/ gallery page (title, intro)
    <machine>.md          ONE FILE PER MACHINE  ← you will edit these most
  blog/
    _index.md             the /blog/ page
    <post>.md             one file per blog post
  team/_index.md          the /team/ page (title, intro)
data/
  officers.yaml           club officers
  leads.yaml              machine and subsystem leads
  advisors.yaml           faculty and staff advisors
  sponsors.yaml           partners and sponsors
  bands.yaml              the bands (Gen One, Gen Two, ChemE R&D…) and process groups
static/images/            photos and logos (officers/, advisors/, sponsors/, lab/, logo/)
hugo.toml                 site settings: links, navigation, docs URL, hero text
layouts/                  the HTML templates (rarely needs editing)
tailwind-input.css        the design (source); static/css/site.css is built from it
static/js/site.js         menu, header, card expand/collapse
.claude/design-language.md  the style guide
```

**YAML tips.** Indentation matters and must be spaces. Put text that
contains a colon in quotes. If the site stops building after you edit a
`.yaml` file, the terminal running `hugo server` tells you the line.

---

## 3. Add or edit a machine

Machines are the heart of the site. **Each machine is one Markdown file in
`content/machines/`**, and appears as a card on **/machines/**. Visitors open
the card in place to read what you wrote, and the card links to the
machine's page on the docs site.

There are **no separate machine pages** on this website any more. The long
write-up (diagrams, schedules, calculations, assembly) belongs on the docs
site; the card is the short version.

### The file

```markdown
---
title: "Tube Furnace"
band: "gen1"
process: "deposition"
step: "Oxide & Anneal"
status: "building"
weight: 20
summary: "Heats wafers to ~1000 °C to grow oxide and drive in dopants."
---

The tube furnace is the most fundamental machine in the fab…

**Thermal oxidation** grows silicon dioxide by…
```

| Field | Required | What it does |
|---|---|---|
| `title` | yes | The machine's name. |
| `band` | yes | Which band it belongs to: `gen1`, `gen2` or `cheme` (see `data/bands.yaml`). |
| `process` | Gen One/Two | Its process group within the band: `patterning`, `doping`, `deposition`, `characterization`, `inspection`, `application`, `facility`. |
| `step` | yes | The process step it performs, in a few words. Shown on the card. |
| `status` | yes | `planned`, `building` or `operational`. |
| `weight` | no | Order inside its group. Lower comes first (10, 20, 30…). |
| `summary` | yes | One plain sentence, shown before the card is opened. |
| `partOf` | no | For a subsystem: the **file name** (without `.md`) of the machine it belongs to, e.g. `partOf: "maskless-stepper"`. The card sits right after its parent. |
| `docs` | no | Only if its docs page is not at the usual address (see below). |
| `image` | no | A photo of the machine, e.g. `image: "/images/machines/spinner.jpg"`. Shown at the top of its card, cropped to 4:3 landscape. Leave it out and a line drawing for its process stands in. |
| `draft` | no | `draft: true` hides the machine from the site entirely. |

**Everything below the second `---`** is the text that appears when the card
is opened. Use normal Markdown: paragraphs, `**bold**`, lists, `### headings`,
`[links](https://…)`. Keep it to a few paragraphs. If you leave it empty, the
card says there is no write-up yet and points to the docs.

### Create a new machine

```sh
hugo new machines/my-machine.md
```

This copies `archetypes/machines.md`, which explains every field. Or just
copy an existing machine file and change it. Then:

1. **Add its docs page.** In the `nanofab_docs` repository, create
   `src/machines/my-machine.md` (the **same file name**) and list it in
   `src/SUMMARY.md`. The card's "Full documentation" button links to
   `docsURL` + `machines/my-machine.html` automatically.
2. **Add a photo when it exists.** Save it in `static/images/machines/`
   (lowercase, hyphens, no spaces, under ~400 KB, landscape), then add
   `image: "/images/machines/my-machine.jpg"` to the front matter. Until
   then the card shows a placeholder drawing from
   `static/images/machines/placeholders/` chosen by `process` (ChemE
   machines get the flask).
3. **Give it a lead.** Add the person to `data/leads.yaml` with `role:` set to
   the machine's title. The card then shows "Lead: …", and the person's card
   on /team/ links to the machine.

### How the gallery is organised

`data/bands.yaml` sets the bands, their order, their one-line tagline and
their process groups. The gallery shows one band after another; inside a
band, machines are ordered by process group (in the order listed in
`bands.yaml`), then by `weight`. The counts in the page header and on the
homepage are computed, so they are always right.

Each band folds: its heading is a button. **Gen One starts open and the
others closed** (the band with `index: 1` in `bands.yaml`); jumping to a band
from the bar under the hero, or following a link to a card, opens it.

A band marked `fab: false` (Operations & Logistics) has no machines; it is
only used to group people on /team/.

### Deep links

Every card has an address: **/machines/#tube-furnace** opens the gallery
with that card (and its band) already open. Use these links in Discord or
the blog.

### The Incubator

The small box at the bottom of /machines/ invites members to pitch a new
project. Its "Propose a project" button opens the form at
`incubatorFormURL` in `hugo.toml`; with that empty, it emails
`contactEmail`. The wording is in `layouts/machines/list.html`.

---

## 4. Post to the blog

A post is **one Markdown file in `content/blog/`**. The file name becomes the
address: `content/blog/first-wafer.md` is published at `/blog/first-wafer/`.
Use lowercase words joined by hyphens.

### Step by step

1. **Make the file.** Copy `archetypes/blog.md` to
   `content/blog/<your-post-name>.md`, or, if Hugo is installed, run:

   ```sh
   hugo new blog/first-wafer.md
   ```

2. **Fill in the top block** (the "front matter", between the two `---`
   lines):

   ```markdown
   ---
   title: "First wafer through the furnace"
   date: 2026-11-02
   kicker: "Build log"
   description: "One or two sentences. Shown in the post list and in link previews."
   author: "Bear BlinSchauer"
   draft: true
   ---
   ```

   | Field | What it does |
   |---|---|
   | `title` | The headline. |
   | `date` | `YYYY-MM-DD`. Sets the order (newest first) and the date shown. A date in the future hides the post until that day. |
   | `kicker` | Optional short label above the title: *Build log*, *Event*, *Site news*. |
   | `description` | One or two sentences for the post list, the homepage and link previews. |
   | `author` | Optional byline. |
   | `draft` | `true` keeps the post off the live site while you write. Delete the line (or set `false`) to publish. |

3. **Write the post** below the second `---` in plain Markdown:

   ```markdown
   We ran the first oxidation today. Here is what happened.

   ## The setup

   Normal paragraphs, **bold**, *italics*, [links](https://example.com),
   and lists:

   - one
   - two

   ![The furnace at 1000 °C](/images/blog/furnace-first-run.jpg)
   ```

   - `## Headings` split the post into sections; they also fill the
     "On this page" list beside it.
   - **Pictures** go in `static/images/blog/` and are referenced as
     `/images/blog/<file>`. The words in the square brackets become the
     caption and the alt text, so describe the picture.
   - **Link to a machine** with `[the furnace](../../machines/#tube-furnace)`.
     That opens its card. (Relative links keep working wherever the site
     is hosted.)

4. **Preview it.** `hugo server -D` (the `-D` shows drafts) and open
   <http://localhost:1313/nanofab_web/blog/>. If you are editing on github.com
   instead, skip this; see [EDITING.md](EDITING.md).

5. **Publish.** Remove `draft: true`, commit, and push to `main` (or click
   **Commit changes** on github.com). The site rebuilds itself in about a
   minute.

The three newest posts also appear on the homepage. With no published
posts, the homepage leaves the blog section out and /blog/ says so.

`content/blog/a-new-website.md` is an example post, kept as a draft. Use it as
a model, then delete it.

---

## 4a. Events and the calendar

**/events/** is driven by the club's **public Google Calendar**. Nobody
edits events on the website: add a speaker event to the Google Calendar and
it appears on the site and in every subscriber's calendar.

Set it up once, in `hugo.toml`:

1. **`calendarID`**: the calendar's ID (Google Calendar → the calendar's
   settings → *Integrate calendar* → *Calendar ID*; for a calendar that
   belongs to a umn.edu account it is just the email address). The calendar
   must be **public** (*Access permissions* → *Make available to public*,
   *See all event details*). This alone turns on the **Add to Google
   Calendar** and **iCal** subscribe buttons.
2. **`calendarAPIKey`** (optional): with a Google Calendar API key, the
   page also draws a month grid and an "Upcoming" list, like the Stone Arch
   Silicon site. How to make and restrict the key is at the top of
   `static/js/calendar.js`. The key is visible in the page source; that is
   normal for this setup.
3. **`eventsLocation`** (optional): where meetings happen, e.g.
   "Keller Hall 3-111". Shown in the page header.

With neither set, the page says the speaker series is starting soon and
points to the Discord.

---

## 5. People, advisors and sponsors

All in `data/`. Each file starts with a comment that explains its fields.

**Officers** (`data/officers.yaml`) and **leads** (`data/leads.yaml`):
`name`, `role` (one string, or a list for more than one role), `photo`
(e.g. `/images/officers/jane-doe.jpg`), optional `photoPosition` (such as
`"center 30%"` if a face is cropped badly) and `order` (to move someone to the
end of their group).

- The homepage shows the officers. **/team/** shows everyone, grouped by
  band: a person whose role names a machine is filed under that machine's
  band, and the role links to the machine's card. Someone listed in both
  files appears once, with all their roles.
- If a role uses a different name from the machine file (for example
  "Spin Coater" for the Spinner), it is matched through a small alias table
  in `layouts/partials/people.html` and `layouts/partials/machine-leads.html`.

**Advisors** (`data/advisors.yaml`): `name`, `dept` (the group heading),
`role` (their title), `bio` (one short line), `link`, optional `linkLabel`,
`photo`, `photoPosition`. Grouped by department in file order.

**Sponsors** (`data/sponsors.yaml`): `name`, `description` (what they do
*with us*), `logo` (`/images/sponsors/…`, trimmed tight, transparent or white
background), `url`, optional `linkLabel`. Logos show in greyscale and turn to
colour on hover.

**Photos.** Square-ish headshots work best; they are cropped square.
Name files in lowercase with hyphens and no spaces. Keep them under ~300 KB.

---

## 6. Site settings: links, navigation, docs URL

Everything is in `hugo.toml`, with comments:

- **`heroTitle`, `heroLead`**: the homepage headline and paragraph. A
  full stop at the end of the headline is drawn in purple.
- **`heroImage`**: the lab photograph behind the homepage hero (shown in
  greyscale, darkened).
- **`discordURL`, `githubURL`, `linkedinURL`, `instagramURL`,
  `contactEmail`**: used in the header, menu, footer and buttons.
- **`docsURL`**: the address of the docs site. The **Docs** link in the
  navigation, the footer, and every machine card's "Full documentation"
  button are built from it. `docsMachinePath` (default `machines/`) is the
  folder inside the docs site that holds the machine pages.
- **`[menus.main]`**: the links in the top navigation, mobile menu and
  footer, in `weight` order. Docs and "Join the club" are added
  automatically after them.
- **`description`, `ogImage`**: what search engines and link previews show.

---

## 7. Changing the design

### The stylesheet

Read **`.claude/design-language.md`** first. It is the style guide: colours,
type scale, spacing, components, and when purple is allowed.

The whole design is one file, **`tailwind-input.css`**: CSS variables for the
tokens, then one class per component. The browser loads the built copy,
`static/css/site.css`, which is committed so that nobody needs Node just to
edit content. After you change `tailwind-input.css` or a template:

```sh
npm install          # once
npm run build:css    # or: npm run watch:css while you work
```

Commit the rebuilt `static/css/site.css` together with your change. Classes
that only JavaScript adds must be listed in `safelist` in
`tailwind.config.js`, or the build drops them.

### The circuitry

The faint traces and vias along the sides of every page are drawn by `static/js/circuit.js` (comments at
the top explain it). Colours and strength are the `.c-*` rules in
`tailwind-input.css`. To turn it off, delete the `circuit.js` line in
`layouts/_default/baseof.html`.

Fonts are IBM Plex Sans and IBM Plex Mono, self-hosted in `static/fonts/`
(SIL Open Font License, `static/fonts/IBM-Plex-OFL.txt`).

---

## 8. UMN branding rules (read this one)

This section is about staying out of trouble with the University, not
about design. A registered student organization (RSO) operates under
tighter trademark rules than a department does.

### What the University actually requires

**You may not use University trademarks.** That covers the wordmark, the
Block M, Goldy, Ski-U-Mah, Row the Boat, and homemade imitations of any
of them. The one exception is the official **"Block M RSO" mark**.

**Your name may not start with "University of Minnesota", "UMN",
"U of M", or "Gopher".** You *may* say you're *at* the University of
Minnesota. So:

| Not allowed | Allowed |
|---|---|
| UMN Nanofabrication Club | Nanofabrication Club at the University of Minnesota |
| Gopher Nanofab | Nanofabrication Club |

This is why `title` in `hugo.toml` is `"Minnesota Nanofabrication Club"`,
and the header shows "Minnesota Nanofabrication" with "Student club ·
University of Minnesota" as a separate line under it, never as part of the
name.

**This exact sentence has to appear on your public platforms** — the
website, Instagram, LinkedIn, all of it:

> This group is a Registered Student Organization and is independent
> from the University of Minnesota.

It's stored once, in `hugo.toml` under `[params.umn]` as
`rsoDisclaimer`, and rendered at the bottom of the footer on every page.
**Don't reword it, and don't remove it** — the footer is now the only
place it appears.

**You also may not** use University marks in a way that suggests the
University endorses a political or religious position, a product, or a
company; or in connection with alcohol, tobacco, firearms, or gambling.

### Where a University mark is allowed to go

This is the part that trips people up, so it's worth being exact.

> **For print or web:** use the Block M RSO mark or Goldy RSO mark at
> the bottom of the piece, separate from your student logo or name, and
> it must be accompanied by the disclaimer.

Three conditions, all required together:

| | |
|---|---|
| **Which mark** | Block M RSO or Goldy RSO — *not* the wordmark, plain Block M, or Goldy |
| **Where** | The bottom of the page, on its own, away from the club logo and name |
| **With what** | The disclaimer, right there next to it |

That's why the mark slot is the **last block in the footer**, below a
rule, with the disclaimer beside it — and why the club logo stays up in
the header, far away from it. Don't lock the two up together.

> **For stationery:** only a Recognized Student Governance Association
> (MSA, COGS, PSG), with permission from the Office for Student Affairs,
> may use University trademarks. A regular RSO may not. This club is an
> RSO, not a governance association.

### The wordmark files are in the project but unused

`UMN_horizontal-digital.svg` and `UMN_horizontal-reversed-digital.svg`
(in `static/images/logo/`) are the full University wordmark — Block M
plus "University of Minnesota", with the ® on it. They're kept because
they were downloaded, but **nothing on the site renders them.**

That's deliberate. The wordmark is a registered University trademark,
and an RSO may only use the RSO marks — and even those belong at the
bottom of the page, not in a header.

There used to be a maroon University bar above the site header. **It has
been removed**, along with the `headerWordmark` setting that could have
put the wordmark in it. The University links that lived there (umn.edu
and the college) are now in the footer, as plain text links, which is
fine — words are not trademarks.

If you ever want a University mark on the site, the answer is the
**Block M RSO mark in the footer block**, not a wordmark at the top.

### Getting the official RSO mark

The Block M RSO mark is **not** on the public logo-download page — that
page needs a University staff login and doesn't carry the RSO version.
You have to request the file:

1. Read the guidelines:
   <https://umarcomm.umn.edu/resources/registered-student-organization-brand-guidelines>
2. Ask **Student Unions & Activities** (your RSO advisor there is the
   fastest route) or **University Marketing Communications** for the
   Block M RSO mark files.
3. When the file arrives, put it in `static/images/logo/` and set, in
   `hugo.toml` under `[params.umn]`:

   ```toml
   rsoMark = "/images/logo/block-m-rso.svg"
   ```

   It appears in the footer block automatically — the bottom of the
   page, next to the disclaimer, which is where the rule says it goes.

**Use it whole and unaltered.** Don't recolor it, crop it, stretch it, or
lock it up next to the club logo — all of those break the guidelines.

### What's safe to keep using

- **Colours.** Colours aren't trademarks. The site no longer uses maroon
  and gold (its palette comes from the club logo), but they would be fine.
- **Plain text links** to `umn.edu` and `cse.umn.edu`.
- **Saying you're a student organization at the University of
  Minnesota**, in words.

### Still to check

Before you launch publicly, run the site past your Student Unions &
Activities advisor. They review RSO materials regularly and will catch
anything this section missed. Nothing here is legal advice — it's a
summary of the published guidelines as of September 2026.

**Sources:**

- [Registered Student Organization Brand Guidelines](https://umarcomm.umn.edu/resources/registered-student-organization-brand-guidelines)
- [Brand Policy: Trademarks, Logos, Colors, and Seal](https://policy.umn.edu/operations/branding)

---

## 9. Publishing

`.github/workflows/deploy.yml` builds the site with Hugo and publishes it to
GitHub Pages on every push to `main`. One-time setup on github.com:
**Settings → Pages → Build and deployment → Source: GitHub Actions**.

The workflow does not run Node; it uses the committed `static/css/site.css`.
That is why you must rebuild and commit it after design changes.

`netlify.toml` is kept for Netlify as an alternative host; GitHub Pages
ignores it.

The docs site (`nanofab_docs`) has its own workflow and publishes to
`https://minnesota-nanofabrication-club.github.io/nanofab_docs/`. If it ends
up somewhere else, change `docsURL` in `hugo.toml`.
