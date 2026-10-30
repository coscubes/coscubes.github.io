# coscubes.github.io

My personal site and blog — <https://coscubes.github.io>

Jekyll, built natively by GitHub Pages. **Pushing to `master` publishes the site**; there
is no build step to run and no CI to wait on.

## Adding a post

Create `_posts/YYYY-MM-DD-some-slug.md`:

```markdown
---
layout: post
title: "The title"
date: 2026-11-15
tags: [video, representation-learning]
description: "One sentence, used for the homepage excerpt and link previews."
---

First paragraph.

<!--more-->

The rest.
```

Commit, push, done. Add `math: true` to the front matter for LaTeX support.

## Everything else

| To change | Edit |
|---|---|
| Papers | `_data/publications.yml` |
| Talks | `_data/talks.yml` |
| Bio, research interests, News | `about.md` |
| CV *(parked — `published: false`)* | `cv.md` |
| Social links | `_data/socials.yml` |
| Name, role, nav, site metadata | `_config.yml` |
| Look and feel | `_sass/` |

## Previewing locally

Optional — GitHub builds the site for you either way.

```bash
sudo apt-get install -y ruby-full build-essential zlib1g-dev
export GEM_HOME="$HOME/gems" PATH="$HOME/gems/bin:$PATH"
gem install bundler && bundle install
bundle exec jekyll serve --livereload      # http://localhost:4000
```

## Design doc

[`DESIGN.md`](DESIGN.md) covers the stack decision, the colour and type systems, the
content model, and the list of outstanding `TODO`s. Read it before changing how the site
works.
