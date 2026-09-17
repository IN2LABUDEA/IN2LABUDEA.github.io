# IN2LABUDEA.github.io

Jekyll website for the **In2Lab** research group at Universidad de Antioquia.
Academic style inspired by [uwsampa/research-group-web](https://github.com/uwsampa/research-group-web).

## Quick start

```bash
gem install bundler
bundle install
bundle exec jekyll serve
# → http://localhost:4000
```

## Updating content

### Team members → `_data/people.yml`

Add a new entry at the bottom:

```yaml
- name:    "New Person"
  role:    researcher          # coord | researcher
  degree:  "PhD Computer Science (MIT, 2024)"
  affil:   "Postdoc · since 2025"
  scholar: "https://scholar.google.com/citations?user=XXXXXXXXX"
  web:     null
```

Set `scholar:` or `web:` to `null` if the link isn't available yet.

### Research lines → `_data/research.yml`

Each entry has `icon` (emoji), `title`, and `desc`.

### News → `_posts/`

Short one-liner updates:
```markdown
---
layout: post
shortnews: true
---
Your news text here.
```

Full blog posts:
```markdown
---
layout: post
title: "Paper accepted at ICASSP 2027"
---
We are happy to announce ...
```

File name must follow `YYYY-MM-DD-slug.md`.

### Site-wide settings → `_config.yml`

- `links.*` — GitHub org, GrupLAC, email, UdeA pages
- `title`, `tagline`, `description` — metadata

## File structure

```
IN2LABUDEA.github.io/
├── _config.yml            ← site settings
├── Gemfile
├── index.html             ← home page (news + research + sidebar)
├── research.html          ← research lines page
├── people.html            ← people grid page
├── news.html              ← full news archive
├── README.md
├── _layouts/
│   ├── default.html       ← HTML skeleton
│   └── post.html          ← news/blog post page
├── _includes/
│   ├── nav.html           ← navigation bar
│   ├── footer.html        ← footer
│   └── person-card.html   ← reusable member card
├── _posts/                ← news items and blog posts
├── _data/
│   ├── people.yml         ← team members — EDIT HERE
│   └── research.yml       ← research lines — EDIT HERE
└── assets/
    ├── css/main.css
    ├── js/main.js
    └── img/logo.png
```

## Deployment

1. Create repo `IN2LABUDEA/IN2LABUDEA.github.io` on GitHub.
2. Push all files to `main`.
3. Settings → Pages → Source: Deploy from branch → **main / root**.
4. Site is live at `https://in2labudea.github.io`.
