---
title: "A new website, and where everything went"
date: 2026-10-24
kicker: "Site news"
# An example post. Kept as a draft so it never shows on the live site;
# copy its shape, then delete it. README, "Post to the blog".
draft: true
description: "The club website has a new look, real navigation, a blog, one page for every machine, and a separate documentation site. Here is the tour."
---

The website has been rebuilt. It looks different, but the bigger change is how it is organized: you should always be able to see where you are and get anywhere else in one click.

## What changed

**Navigation that stays put.** The bar at the top of every page now lists the whole site: **Machines**, **Team**, **Blog**, **Sponsors**, and **Docs**. On a phone it folds into a full-screen menu. Long pages have a second bar that jumps between their sections and shows which one you are reading.

**One page for every machine.** The machines used to be scattered across nineteen separate pages, most of them a title and an empty outline. They are now [one gallery](../../machines/), grouped by band: Gen One, Gen Two and ChemE R&D. Each machine is a card. Open it to read what the team has written, see who leads it and where the build stands, and follow the link to its full documentation.

**A separate documentation site.** The long-form engineering, with diagrams, build schedules, calculations and assembly notes, now lives in its own book, built with [mdBook](https://rust-lang.github.io/mdBook/). It has a sidebar, search, and an edit button on every page. The main site stays short and readable; the docs can be as long as the machines need.

**This blog.** Build logs, milestones and news go here.

## A new look

The colours now come from the club logo: black, white, and UV purple. Purple is used sparingly, only where something should catch your eye: a link under the cursor, the page you are on, the most important button. The type is IBM Plex, set large and light, with a lot of space around it.

## How to add to it

Everything you would want to change is a small text file:

- **A machine** is one Markdown file in `content/machines/`. The text below its front matter is what appears when its card is opened.
- **A blog post** is one Markdown file in `content/blog/`, like this one.
- **People, advisors and sponsors** are lists in `data/officers.yaml`, `data/leads.yaml`, `data/advisors.yaml` and `data/sponsors.yaml`.
- **Documentation** is a Markdown page in the docs repository. Every page there has an edit button.

The README in the website repository walks through each one. If something is wrong or missing, tell us on [Discord](https://discord.gg/G9T6bk84w), or fix it and open a pull request.
