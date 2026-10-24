# Needs a human

Everything on the site that is a placeholder, a guess, or waiting on a
decision. Tick items off as they're done, and delete this file when it's
empty. How to make each change: [EDITING.md](EDITING.md).

## Settings (`hugo.toml`)

- [ ] **`docsURL`**: set to `https://minnesota-nanofabrication-club.github.io/nanofab_docs/`
      as a guess. Point it at the real documentation site (the club's
      existing mdBook site, or `nanofab_docs` once published). Every "Docs"
      link and every machine card's "Full documentation" button uses it.
- [ ] **`contactEmail`**: now `nanoclub@umn.edu`. Confirm the address exists
      and someone reads it. It is behind "Get in touch" and "Become a
      sponsor".
- [ ] **`heroTitle` / `heroLead`**: the new headline is "Bare wafer to working
      chip." Keep it or replace it.
- [ ] **`heroImage` / `ogImage`**: both use the old lab photo
      (`/images/lab/nf-lab-web.jpg`). A wide, current photo of the lab
      would be better. It is shown greyscale and darkened.
- [ ] **`rsoMark`**: empty. Request the official Block M RSO mark (README,
      "Getting the official RSO mark"), add the file, and set the path.
- [ ] **`googleSiteVerification`**: empty. Optional; only needed for Google
      Search Console.
- [ ] **Hero coordinates**: the hero shows `44.974° N · 93.232° W` (East Bank,
      UMN). Swap in the lab's exact location if you like, in
      `layouts/index.html`.

## Machines (`content/machines/`)

- [ ] **Photos for every card.** All 23 cards show a placeholder line
      drawing. Each lead adds `image: "/images/machines/<file>.jpg"` once
      the machine exists (EDITING.md, "Add a photo to a machine card").
- [ ] **Write-ups.** These published machines have no text below their
      front matter, so their card says "No write-up here yet":
  - [ ] Cleanroom Microenvironment
  - [ ] Computer Vision Metrology
  - [ ] Dopant Synthesis
  - [ ] Electron Microscope
  - [ ] Hot Plate
  - [ ] Polymer Synthesis
  - [ ] Probe Station
  - [ ] PVD & Vacuum
  - [ ] Reactive Ion Etcher
  - [ ] Spin-On Doping
  - [ ] Ultrasonic Cleaner
  - [ ] Wafer Arm
  - [ ] Wafer Stage Alignment Firmware
- [ ] **No lead on the card.** Nobody in `data/leads.yaml` matches these, so
      their cards show no "Lead":
  - [ ] Hot Plate
  - [ ] Spin-On Doping
  - [ ] Wafer Arm
  - [ ] Cleanroom Microenvironment
- [ ] **Hidden drafts.** These have `draft: true` and don't appear anywhere.
      Publish (delete the line) or delete the file:
  - [ ] Developer Station
  - [ ] Photoresist Stripper
  - [ ] Radiation Hardening
  - [ ] Wet Etch
- [ ] **Statuses.** Check every `status:` (`planned` / `building` /
      `operational`). The homepage counts "in build" from them.

## Blog (`content/blog/`)

- [ ] **Write the first real post.** The blog is empty on the live site, so
      the homepage hides its blog section until a post is published.
- [ ] **Delete `a-new-website.md`**, the example post (kept as a draft), once
      you've used it as a model.

## People and sponsors (`data/`)

- [ ] **`officers.yaml` / `leads.yaml`**: confirm everyone is current. `major`
      and `email` are blank for everyone; fill them in only if you want
      them shown.
- [ ] **`sponsors.yaml`**: confirm each description says what that sponsor
      actually does with the club.

## Documentation site (`../nanofab_docs`, separate repository)

- [ ] **Decide which docs site is canonical.** There is already a club mdBook
      site; `nanofab_docs` was created separately during the redesign.
      Merge its machine pages and theme into the existing one, or replace
      it. Then set `docsURL` above.
- [ ] **Review 16 draft machine pages** marked "Draft, not yet reviewed by
      the team". Numbers the team hadn't chosen were removed, so expect gaps.
- [ ] **PVD & Vacuum** docs page is an empty outline.
- [ ] **Publish it** (it has a GitHub Pages workflow, but no GitHub remote yet).

## Before going public

- [ ] Run the site past the Student Unions & Activities advisor (README,
      "UMN branding rules → Still to check").
