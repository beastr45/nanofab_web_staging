# Editing the website: a step-by-step guide

You do **not** need to know Hugo, HTML or CSS to change this site. Every
piece of content is a small text file. You change the file, save it to
GitHub, and the live site rebuilds itself about a minute later.

This guide covers the mechanics. [README.md](README.md) is the reference
for every field.

---

## How it works

```text
 you edit a text file  ──►  commit it to the "main" branch on GitHub
                                        │
                                        ▼
                 GitHub Actions runs Hugo (.github/workflows/deploy.yml)
                                        │
                                        ▼
                    the live site updates (about 1–2 minutes)
```

- **Content** lives in `content/` (machines, blog posts, page intros) and
  `data/` (people, advisors, sponsors).
- **Pictures** live in `static/images/`.
- **Settings** (headline, links, email, the docs address) live in `hugo.toml`.
- Leave `layouts/`, `tailwind-input.css` and `static/css/` alone unless
  you are changing the design (README, section 7).

There are two ways to make a change. Pick one.

---

## Option A: edit on github.com (nothing to install)

Best for small changes: fixing a typo, adding a person, posting to the blog.

### Change an existing file

1. Open the repository on github.com and click into the file, for example
   `content/machines/spinner.md`.
2. Click the **pencil icon** (Edit this file) at the top right of the file.
3. Make the change.
4. Click **Commit changes…**. Write a short message ("Fix spinner summary"),
   leave **Commit directly to the main branch** selected, and confirm.

### Add a new file

1. Open the folder it belongs in (for example `content/blog/`).
2. Click **Add file → Create new file**.
3. Type the file name, ending in `.md` (for example `first-wafer.md`).
4. Paste the content, then **Commit changes…** as above.

### Upload a picture

1. Open the folder (for example `static/images/machines/`).
2. Click **Add file → Upload files**, drag the picture in, and commit.
3. Name it in lowercase with hyphens and no spaces *before* uploading:
   `tube-furnace.jpg`, not `IMG 4031.JPG`.

### Check it worked

Open the **Actions** tab. Your commit shows up as a run:

- **Green check:** it's live. Refresh the site (a hard refresh,
  Ctrl+Shift+R, if you still see the old version).
- **Red X:** nothing changed on the live site; the old version is still
  up. Click the run, then the failed step, and read the last few lines. It
  almost always names the file and line. See [If something breaks](#if-something-breaks).

The drawback of Option A is that you can't preview before publishing. For
anything bigger than a few lines, use Option B, or add `draft: true` to a
blog post until it's ready.

---

## Option B: edit on your own computer (with a live preview)

### One-time setup

1. Install **Git** and **Hugo extended 0.166.0**:
   - Mac: `brew install git hugo`
   - Windows: `winget install Git.Git Hugo.Hugo.Extended`
   - Linux: Git from your package manager. For Hugo, download
     `hugo_extended_0.166.0_linux-amd64.tar.gz` from
     <https://github.com/gohugoio/hugo/releases> and put the `hugo` file on
     your PATH (for example in `~/.local/bin`).
   - Check with `hugo version`; it should say `extended`.
2. Get a copy of the site:

   ```sh
   git clone https://github.com/minnesota-nanofabrication-club/nanofab_web.git
   cd nanofab_web
   ```

   If you can't push to the club repository, fork it on github.com first and
   clone your fork instead.

### Every time you edit

```sh
git pull                 # 1. get everyone else's changes first
hugo server -D           # 2. start the preview (-D also shows drafts)
```

3. Open **<http://localhost:1313/nanofab_web/>**. Leave `hugo server`
   running: every time you save a file, the page reloads by itself. If you
   break something, the error appears in that terminal and in the browser.
4. Edit files in any text editor (VS Code is a good one).
5. When it looks right, stop the server (Ctrl+C) and publish:

   ```sh
   git add -A
   git commit -m "Add the first-wafer blog post"
   git push
   ```

6. Watch the **Actions** tab on github.com as in Option A.

> If `git push` is rejected because someone else pushed first, run
> `git pull`, then `git push` again.

---

## Recipes

Each one names the file to open. The file itself usually has a comment
block at the top explaining its fields.

### Write a blog post

1. Create `content/blog/<post-name>.md`. The name becomes the address:
   `first-wafer.md` is published at `/blog/first-wafer/`.
2. Paste this and fill it in:

   ```markdown
   ---
   title: "First wafer through the furnace"
   date: 2026-11-02
   kicker: "Build log"
   description: "One or two sentences for the post list and link previews."
   author: "Your Name"
   draft: true
   ---

   The post, in plain Markdown. Paragraphs are separated by a blank line.

   ## A section heading

   **Bold**, *italic*, [a link](https://example.com), and a picture:

   ![What the picture shows](/images/blog/first-wafer.jpg)
   ```

3. Put pictures in `static/images/blog/`.
4. Delete the `draft: true` line when it's ready to go live.

Full details: README, "Post to the blog".

### Edit a machine's text

Open `content/machines/<machine>.md`.

- The one-line `summary:` is what shows on the closed card.
- Everything **below the second `---`** is what shows when the card is
  opened. Keep it to a few paragraphs. The long write-up belongs on the
  docs site.
- `status:` is one of `planned`, `building`, `operational`.

### Add a photo to a machine card

1. Take a landscape photo (any size; it is cropped to 4:3). Keep it under
   ~400 KB; phones' originals are far too big, so shrink it first.
2. Upload it to `static/images/machines/`, e.g. `spinner.jpg`.
3. In `content/machines/spinner.md`, add this line between the `---` lines:

   ```yaml
   image: "/images/machines/spinner.jpg"
   ```

The line drawing that was there is replaced.

### Add a new machine

1. Copy an existing file in `content/machines/` to a new name, like
   `plasma-cleaner.md` (or run `hugo new machines/plasma-cleaner.md`).
2. Change the fields: `title`, `band` (`gen1`, `gen2`, `cheme`),
   `process`, `step`, `status`, `summary`, `weight`.
3. Write a few paragraphs below the front matter.
4. Add its docs page in the `nanofab_docs` repository with the **same file
   name** (README section 3).

### Add, change or remove a person

- Officers: `data/officers.yaml`. Leads: `data/leads.yaml`.
  Advisors: `data/advisors.yaml`.
- To add someone, copy a whole block that starts with `- name:` and edit it:

  ```yaml
  - name: Jane Doe
    role: "Treasurer"
    major: ""
    email: ""
    photo: "/images/officers/jane-doe.jpg"
  ```

- Headshots go in `static/images/officers/`, roughly square.
- To remove someone, delete their whole block.

### Add a sponsor

Copy a block in `data/sponsors.yaml`. Put the logo in
`static/images/sponsors/` (trimmed tight, transparent background).

### Add an event

Add it to the club's Google Calendar. That's it: /events/ and everyone who
subscribed pick it up. (The website only needs `calendarID` set once; see
README, "Events and the calendar".)

### Change the homepage headline, links or email

Open `hugo.toml`:

- `heroTitle`: the big headline. `heroLead`: the paragraph under it.
- `heroImage`: the photo behind it.
- `discordURL`, `instagramURL`, `linkedinURL`, `githubURL`, `contactEmail`.
- `docsURL`: where the documentation site lives.
- `incubatorFormURL`: the "Propose a project" form at the bottom of /machines/.
- `calendarID`, `calendarAPIKey`, `eventsLocation`: the /events/ page.
- `fabWidget`: `false` hides the "Our logo, fabricated" animation.
- `[[menus.main]]` blocks: the links in the top bar.

---

## If something breaks

Almost every failed build is one of these:

| Symptom in the error | Cause | Fix |
|---|---|---|
| `yaml: line 12: …` | Bad indentation or an unquoted colon in a `.yaml` file or front matter | Use spaces, not tabs. Put text containing `:` in quotes. |
| `failed to unmarshal YAML` in a `.md` file | The front matter block isn't closed | The block must start **and** end with a line containing only `---`. |
| A picture doesn't show | Wrong path or file-name case | Paths start with `/images/…` and must match the file name exactly, including upper/lower case. |
| Post doesn't appear | `draft: true`, or a `date` in the future | Remove the draft line; check the date. |
| Machine doesn't appear | `draft: true`, or a misspelled `band`/`process` | Compare with another machine file. |

**Undo a bad change:** on github.com, open the file → **History** → find
the last good version and copy it back. With Git: `git revert <commit>` then
`git push`.

Stuck? Ask in the Discord, and include the red error text from the Actions
tab.
