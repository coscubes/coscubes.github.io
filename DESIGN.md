# Design doc — coscubes.github.io

Living document. If you change how the site works, change this file in the same commit.

## 1. What this site is for

A personal site for a machine-learning researcher, with four jobs, in priority order:

1. **Publish writing.** The blog is the landing page, because writing is the thing most
   likely to be read, shared and linked.
2. **Be findable.** Someone who heard your name should reach your papers in one click.
3. **Be maintainable in plain text.** Adding a post is one markdown file. Adding a paper is
   seven lines of YAML. No HTML editing, ever.
4. **Look like it was made on purpose.** Restrained typography, one accent colour, works in
   both colour schemes and on a phone.

Reference points: [lilianweng.github.io](https://lilianweng.github.io/) for the look,
[huyenchip.com/blog](https://huyenchip.com/blog/) for the structure and the stack.

## 2. Stack

**Jekyll 3.10, hand-written theme, built natively by GitHub Pages.**

The decisive property is that GitHub Pages builds Jekyll server-side with no
configuration. `git push` publishes — there is no Actions workflow to maintain, nothing to
flip in repo settings, no theme submodule to update, and no build that can go red. You can
add a post from the GitHub web UI on a phone.

Rejected, and why:

| Option | Why not |
|---|---|
| Hugo + PaperMod (what Lil'Log uses) | Needs a GitHub Actions workflow *and* a manual switch of Pages source to "GitHub Actions". More machinery, one more failure mode, and customising means overriding a third-party theme. Genuinely close call — Hugo's local preview is better. |
| Jekyll + al-folio / Minimal Mistakes | Hundreds of files you don't control, a busier house style than the references, and customisation means fighting the theme's conventions. |
| Astro / Eleventy | Node-based, so publishing needs CI, and this machine has no npm. |

### Hard constraints that follow from the choice

- **Only GitHub Pages' bundled plugins work.** In use: `jekyll-feed`, `jekyll-seo-tag`,
  `jekyll-sitemap`, `jekyll-paginate`. Notably unavailable: `jekyll-paginate-v2`,
  `jekyll-scholar`, `jekyll-archives`. Current list: <https://pages.github.com/versions/>.
- **Sass is libsass (`jekyll-sass-converter` 1.5.2), not dart-sass.** Use `@import`, never
  `@use` or `@forward`, and plain `/` for division. Modern Sass syntax breaks the build.
- **GitHub Pages force-enables some plugins** regardless of `_config.yml`. Two are
  defused there: `readme_index.enabled: false` (so `README.md` can't become the homepage)
  and `optional_front_matter.remove_originals: true`. `README.md` and `DESIGN.md` are also
  in `exclude`, so they never get published as pages.
- **`exclude` overrides Jekyll's built-in list**, so `Gemfile`/`vendor` must stay listed.
- **Pagination only works on `index.html`.** That's why the homepage is `.html`, not `.md`.

## 3. URL map

| URL | Source | Notes |
|---|---|---|
| `/` | `index.html` | Paginated post list, nothing else. The landing page. |
| `/page2/`, … | `jekyll-paginate` | 10 posts per page. |
| `/blog/:title/` | `_posts/*.md` | Set by `permalink` in `_config.yml`. |
| `/about/` | `about.md` | Bio, research interests, News. |
| `/publications/` | `publications.html` | Renders `_data/publications.yml` + `_data/talks.yml`. |
| ~~`/cv/`~~ | `cv.md` | **Parked** — `published: false`, so it isn't built and the nav entry in `_config.yml` is commented out. Content kept in the file. |
| `/archive/` | `archive.html` | All posts by year. Linked from the footer, not the nav. |
| `/feed.xml`, `/sitemap.xml` | plugins | |
| `/404.html` | `404.html` | |
| `/images/`, `/logos/`, `/pdfs/` | copied verbatim | **Do not move these.** |

Static pages carry an explicit `permalink` in their front matter, because the global
`permalink` setting only governs posts — without it, `about.md` would publish at
`/about.html`.

**The asset directories must keep their paths.** `pdfs/MMM_2019.pdf`,
`pdfs/ICVGIP_2018.pdf` and `pdfs/Kaustubh_IPAS_2018.pdf` were linked from the old site and
may be cited elsewhere; moving them breaks those links silently.

## 4. Content model

| What | Where | How to add |
|---|---|---|
| Blog post | `_posts/YYYY-MM-DD-slug.md` | §7 below |
| Paper | `_data/publications.yml` | one entry, newest first |
| Talk | `_data/talks.yml` | one entry, newest first |
| Social link | `_data/socials.yml` | `icon` must match a case in `_includes/icon.html` |
| Bio, News | `about.md` | plain markdown |
| CV *(parked)* | `cv.md` | plain markdown; not published — see the URL map |
| Name, role, nav | `_config.yml` | |

`publications.html` and `archive.html` are templates, not content — the data lives in YAML
and you shouldn't need to open them.

## 5. Design system

Tokens live in [`_sass/_tokens.scss`](_sass/_tokens.scss) as CSS custom properties, so
both colour schemes share one rule set.

### Colour

One accent, used for links, the active nav underline and focus rings. Everything else is
greyscale. All pairs meet WCAG AA against their background.

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#ffffff` | `#0d1117` |
| `--bg-subtle` | `#f6f8fa` | `#161b22` |
| `--fg` | `#1f2328` | `#e6edf3` |
| `--muted` | `#656d76` | `#9198a1` |
| `--accent` | `#0969da` | `#58a6ff` |
| `--border` | `#d8dee4` | `#30363d` |

Syntax highlighting uses the same mechanism (`--syn-*`), so `_syntax.scss` is one rule set
rather than two themes.

### Type

System font stack — no webfont, so there's nothing to flash and nothing to wait for. (The
old site asked for `'DM Sans'` and never loaded it, so every visitor saw the fallback
anyway.) To switch to Inter: add the Google Fonts `<link>` in `_includes/head.html` and put
`"Inter"` first in `--font-sans`.

Modular scale, ratio 1.2 on a 17px base: `--fs-sm` 13px, `--fs-base` 17px, `--fs-md` 20px,
`--fs-lg` 24px, `--fs-xl` 30px, `--fs-2xl` 36px. Body line-height 1.75, headings 1.25.

### Layout

Single column, `max-width: 44rem` (~700px, about 70 characters), centred, 1.5rem gutters
dropping to 1rem under 544px. No sidebar and no cards: typography carries the page. The
header is **static, not fixed** — the old fixed navbar was pinned at `left/right: 20%`,
which is what broke it on phones.

The homepage is the post list and nothing above it: no intro block, no photo. The bio
lives on `/about/`, where anyone looking for it will go. Because that page carries no
heading of its own, `_includes/header.html` renders the site title as its `<h1>`, keyed
off `page.is_blog_index` (which the paginated continuations inherit from `index.html`'s
front matter). On every other page the site title is a `<p>` and the page's own heading
is the `<h1>`. That keeps exactly one `<h1>` per page, and `.site-title` styles both
elements identically, so there's no visual difference.

### Colour scheme switching

`prefers-color-scheme` sets the default; the header toggle overrides it and persists to
`localStorage` under `theme`. An inline script in `<head>` applies the saved value
**before the stylesheet loads**, so there's no white flash on navigation. The toggle glyph
shows the scheme you'd switch *to*.

### Accessibility

Skip-to-content link, landmark elements, `aria-current` on the active tab, visible
`:focus-visible` rings, alt text on every image, `prefers-reduced-motion` honoured, and a
`viewport` meta tag (the old site had none).

## 6. Working on it

```bash
# one-time
sudo apt-get install -y ruby-full build-essential zlib1g-dev
export GEM_HOME="$HOME/gems" PATH="$HOME/gems/bin:$PATH"   # add to ~/.bashrc
gem install bundler
bundle install

# day to day
bundle exec jekyll serve --livereload      # http://localhost:4000
bundle exec jekyll build --strict_front_matter   # what CI would do, if there were CI
```

To publish: commit and push to `master`. GitHub rebuilds in under a minute and emails you
if the build fails.

## 7. Recipes

**Add a post.** Create `_posts/2026-11-15-my-title.md`:

```markdown
---
layout: post
title: "My title"
date: 2026-11-15
tags: [video, representation-learning]
description: "One sentence for the homepage excerpt and link previews."
math: true          # only if the post has LaTeX
---

Opening paragraph, which also serves as the excerpt if `description` is absent.

<!--more-->

The rest.
```

`description` is preferred over the auto-excerpt because it controls both the homepage
summary and the social preview.

**Maths.** `math: true` loads KaTeX on that page and no other. Write *both* inline and
display maths with `$$ ... $$` — kramdown decides which from context, so `$$x_t$$`
mid-sentence is inline and a `$$ ... $$` block on its own lines is display. Those `$$`
never reach the HTML: kramdown parses the maths and re-emits it as `\( ... \)` and
`\[ ... \]`, which is what `_includes/math.html` configures KaTeX to look for. Don't try
to write `\(` directly in markdown — and don't switch KaTeX to `$`-delimiters either,
because kramdown's parsing is what stops `x_t` being eaten as markdown emphasis.
`_posts/2026-10-26-rendering-test.md` is a worked example of this and every other
formatting feature.

**Add a paper.** Prepend to `_data/publications.yml`:

```yaml
- title: "Paper title"
  authors: "First Author, Kaustubh Sakhalkar, Last Author"
  venue: "Conference, City, Country, Month Day–Day, Year"
  year: 2027
  image: images/thumb.png     # optional
  pdf: pdfs/paper.pdf         # optional, local path or URL
  links:                      # optional
    - name: code
      url: "https://github.com/..."
```

Your name is bolded automatically by matching `site.author.name`, so write it exactly as
published. Entries group by `year` in the order they first appear — keep the file
newest-first.

**Add a talk.** Same shape, in `_data/talks.yml`.

**Turn on the CV download button.** Put the PDF in `pdfs/` and set `cv_pdf:` in
`_config.yml` to its path. The button is hidden while that key is empty.

**Add a social link.** Add to `_data/socials.yml`. The `icon` value must match a `when`
case in `_includes/icon.html`; to add a new one, paste a 24×24 SVG path there (the icons
are filled with `currentColor` so they follow the scheme automatically).

## 8. Open TODOs

Each item is marked with a `TODO` in the relevant file. **Use Liquid comment blocks for
these, not HTML comments** — Liquid comments are stripped at build time, so a half-finished
note never shows up in the published page source, whereas `<!-- ... -->` is served to
every visitor who opens the source.

The same rule applies to placeholders: don't leave a dangling `·` or `2019 –` where a
value is missing. Omit the line (or the whole section) and record what's needed in a
Liquid comment, rather than rendering empty headings.

**`cv.md` is parked, not deleted.** It carries `published: false` and has no nav entry, so
nothing in it is served. If it ever comes back, keep two things in mind. It covers more
ground than `about.md` does, which is deliberate — the bio is a bio, not an employment
history, so don't reconcile the two files. And it leaves out the business metrics the
source PDF carries (revenue figures, model accuracy deltas, fleet counts): this site is
public and those are employers' internal numbers.

- [ ] **Decide the CV's fate** — either bring `/cv/` back (`published: true` plus the nav
      entry) or delete `cv.md`. Leaving it parked indefinitely is the worst of both.
      Any PDF added later needs the phone number and plain email redacted off page 1
      first; then `cv_pdf` in `_config.yml` turns on the download button.
- [ ] **Publications since 2019** — `_data/publications.yml` stops at MMM 2019.
- [ ] **Replace the placeholder first post** — `_posts/2026-10-26-starting-a-blog.md`.
- [ ] **Decide what to do with the rendering test** — `_posts/2026-10-26-rendering-test.md`
      currently sits at the top of the homepage. Keep it, or move it to
      `_drafts/rendering-test.md` (drop the date from the filename; drafts publish only
      with `jekyll serve --drafts`) to keep it as a private reference.
- [ ] Consider a `/tags/` page if tags become numerous (needs a plain-Liquid loop over
      `site.tags`, since `jekyll-archives` isn't available on GitHub Pages).
