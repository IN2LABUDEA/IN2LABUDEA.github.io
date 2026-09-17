# IN2LABUDEA.github.io

Static website for the **In2Lab** research group at Universidad de Antioquia, built with [Jekyll](https://jekyllrb.com/) and hosted via **GitHub Pages**.

## Quick start (local preview)

```bash
gem install bundler
bundle install
bundle exec jekyll serve
# open http://localhost:4000
```

## Updating content

All editable content lives in `_data/` and `_includes/`. You **never** need to touch HTML to update team members or research lines.

### Add or update a team member → `_data/team.yml`

Each entry has these fields:

| Field    | Required | Description |
|----------|----------|-------------|
| `name`   | ✅ | Full display name |
| `role`   | ✅ | Role label (e.g. `Researcher`, `Coordinator`) |
| `degree` | ✅ | Highest degree(s) with institution and year |
| `affil`  | ✅ | Appointment type and start year |
| `coord`  | ✅ | `true` only for the group coordinator |
| `scholar`| ✅ | Google Scholar profile URL, or `null` |
| `web`    | ✅ | Personal/institutional page URL, or `null` |

Example — add a new member at the end of the file:

```yaml
- name:    "New Researcher"
  role:    "Researcher"
  degree:  "PhD Computer Science (MIT, 2024)"
  affil:   "Postdoc · since 2025"
  coord:   false
  scholar: "https://scholar.google.com/citations?user=XXXXXXXXX"
  web:     null
```

To fill in a missing Scholar link, change `null` to the full URL.

### Add or update a research line → `_data/research.yml`

Each entry has `icon` (emoji), `title`, and `description`.

### Site-wide settings → `_config.yml`

- `links.*` — GitHub org, GrupLAC, email, UdeA engineering
- `stats.*` — hero section numbers (researchers, PhDs, research lines, active since)

## File structure

```
IN2LABUDEA.github.io/
├── _config.yml             ← site settings, links, stats
├── Gemfile                 ← github-pages gem dependency
├── index.html              ← front matter + include calls only
├── README.md               ← this file
├── _layouts/
│   └── default.html        ← HTML skeleton (head, fonts, script tags)
├── _includes/
│   ├── nav.html            ← sticky navigation bar
│   ├── hero.html           ← animated hero section
│   ├── about.html          ← about the group + info sidebar
│   ├── research.html       ← research lines (loops over _data/research.yml)
│   ├── team.html           ← team grid (loops over _data/team.yml)
│   ├── contact.html        ← contact section
│   └── footer.html         ← footer
├── _data/
│   ├── team.yml            ← 13 researchers — EDIT HERE to update the team
│   └── research.yml        ← 6 research lines — EDIT HERE to update topics
└── assets/
    ├── css/main.css        ← all styles (tokens, layout, components)
    ├── js/main.js          ← canvas animation + mobile nav
    └── img/logo.png        ← IngySoft / Universidad de Antioquia logo
```

## Deployment

Push to the `main` branch of `IN2LABUDEA/IN2LABUDEA.github.io`. GitHub Pages builds automatically with Jekyll. The site will be live at `https://in2labudea.github.io`.

Enable Pages in **Settings → Pages → Source: Deploy from a branch → main / root**.
