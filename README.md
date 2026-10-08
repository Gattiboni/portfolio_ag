# portfolio_ag

Source of [portfolio.alangattiboni.site](https://portfolio.alangattiboni.site),
the portfolio of Alan Gattiboni: data and AI platforms, from diagnosis to
production.

**Status: rebuild in progress.** The site currently online is the previous
version, a single hand-uploaded HTML file. This repository holds its
replacement. So far it contains the foundation only: tooling, design tokens,
fonts, locale routing and one placeholder page per language. Nothing here is
deployed to the domain yet. The order of work is in
[docs/ROADMAP.md](docs/ROADMAP.md).

## Why the repository is public

The way the site is built is part of what it is meant to show. Every decision
is recorded with its context and the alternatives that lost, including the ones
that were reversed. Start with [docs/DECISION_LOG.md](docs/DECISION_LOG.md).

## Principles

- **Incremental.** No decision may be an obvious obstacle to the next one.
- **Modular.** Anything can be plugged in or pulled out without a rewrite.
- **No technical debt.** No workarounds, no "we will fix it later".
- **Documentation closes with the work.** If it changed, it is in the
  changelog. If it was decided, it is in the decision log.

## Stack

| Layer      | Choice                                                          |
| ---------- | --------------------------------------------------------------- |
| Framework  | Astro 7, static output                                          |
| Language   | TypeScript 6, strict                                            |
| Styling    | Plain CSS with design tokens as custom properties               |
| Fonts      | Fraunces, Sora, IBM Plex Mono, self-hosted, latin subset        |
| Locales    | English at `/`, Portuguese at `/pt/`                            |
| Lint       | ESLint 10 for `.astro` and `.ts`                                |
| Formatting | Prettier for `.astro`, `.ts`, `.css`, `.md`, `.json`            |
| Hosting    | Vercel, planned. DNS stays at the current provider until launch |

Exact versions are pinned in `package.json`. The reasons behind each choice are
in the decision log: D002 (framework), D003 (hosting), D004 (language), D011
(versions), D012 (fonts), D013 (lint scope).

## Requirements

Node `^22.22.3 || ^24.16.0 || >=26.3.0`. The floor is set by the lint
toolchain, not by Astro (D011).

## Setup

```bash
git clone https://github.com/Gattiboni/portfolio_ag.git
cd portfolio_ag
npm install
npm run dev
```

The dev server prints its address, by default `http://localhost:4321`.
There are no environment variables.

## Scripts

| Command                | What it does                                     |
| ---------------------- | ------------------------------------------------ |
| `npm run dev`          | Starts the dev server                            |
| `npm run build`        | Builds the static site into `dist/`              |
| `npm run preview`      | Serves the built site locally                    |
| `npm run check`        | Type-checks `.astro` and `.ts` files             |
| `npm run lint`         | Runs ESLint and reports                          |
| `npm run lint:fix`     | Runs ESLint and fixes what it can                |
| `npm run format`       | Formats sources with Prettier                    |
| `npm run format:check` | Lists files that are not formatted, changes none |

Before a commit: `check`, `lint`, `format:check` and `build` all exit 0 with no
warnings.

## Structure

```
portfolio_ag/
├── src/
│   ├── config/site.ts        # Contact details, links, locales. One place.
│   ├── layouts/              # BaseLayout: lang, canonical, hreflang
│   ├── pages/                # index.astro (en), pt/index.astro (pt)
│   └── styles/               # tokens.css, fonts.css, global.css
├── docs/
│   ├── DECISION_LOG.md       # Decisions with context and alternatives
│   ├── CHANGELOG.md          # What happened, newest on top
│   ├── ROADMAP.md            # Phases, order, open decisions
│   └── VISUAL_IDENTITY.md    # Colour, type, shape, motion, voice
├── astro.config.ts
├── eslint.config.js
└── package.json
```

Two folders exist locally and are ignored by git: `legacy/`, the previous site
kept as porting source (D008), and `assets-src/`, raw media before optimisation
(D006).

## How the work is done

One person decides. A chat assistant drafts specs, copy and documentation. A
code agent implements and never commits. Two gates sit between them:

- **α**: the plan is reviewed before any file is touched.
- **β**: the result is validated at runtime before anything is integrated.
  Command-line checks are run by the code agent, browser checks by a second
  agent that also re-reads the built files, and what the eye has to judge is
  judged by the person (D014).

Each phase lands as one commit, with the changelog and the decision log closed
in the same commit.

## Licence

The code is under the [MIT licence](LICENSE). The content is not: copy, images
and video are all rights reserved.

---

Alan Gattiboni · [LinkedIn](https://www.linkedin.com/in/alangattiboni) ·
[GitHub](https://github.com/Gattiboni)
