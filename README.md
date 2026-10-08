# portfolio_ag

Source of [portfolio.alangattiboni.site](https://portfolio.alangattiboni.site):
Alan Gattiboni, Data & AI Solutions Architect. A static site, two pages, two
languages.

**Status: pre-launch.** The build in this repository is deployed at
[portfolio-ag-ten.vercel.app](https://portfolio-ag-ten.vercel.app). The domain
still serves the previous version and moves at launch
([roadmap](docs/ROADMAP.md)).

## What is in it

- **Home.** A hero whose video never blocks first paint: a real poster image is
  served, the video is attached after `load`, and not at all under reduced
  motion or data saver. Three scroll-driven effects in plain CSS, each with a
  static fallback. A section index rendered from the same list that composes
  the page and the bar.
- **Deep dive.** The main case as a graph: a static SVG whose positions are
  computed at build, where every line is a relation declared in the data with
  its reason. A panel with three levels of reading, the same content as a
  list, and real links underneath when JavaScript is off.
- **Content as data.** One file per language for each page. The build fails if
  the two languages diverge in shape, or if a relation points at something
  that does not exist.
- **Two languages.** English at `/`, Portuguese at `/pt/`, one detection rule
  for every page, a switch that keeps the page and the anchor.
- **What is not in it.** No client framework, no animation library, no scroll
  listener, no third-party request.

## Stack

| Layer     | Choice                                                    |
| --------- | --------------------------------------------------------- |
| Framework | Astro 7, static output                                    |
| Language  | TypeScript 6, strict                                      |
| Styling   | Plain CSS, design tokens as custom properties             |
| Fonts     | Fraunces, Sora, IBM Plex Mono, self-hosted, latin subset  |
| Quality   | ESLint 10 for `.astro` and `.ts`, Prettier for everything |
| Hosting   | Vercel                                                    |

Versions are pinned in `package.json`.

## Run

Node `^22.22.3 || ^24.16.0 || >=26.3.0`. No environment variables.

```bash
git clone https://github.com/Gattiboni/portfolio_ag.git
cd portfolio_ag
npm install
npm run dev
```

| Command                | What it does                            |
| ---------------------- | --------------------------------------- |
| `npm run dev`          | Dev server, `http://localhost:4321`     |
| `npm run build`        | Static site into `dist/`                |
| `npm run preview`      | Serves the built site                   |
| `npm run check`        | Type-checks `.astro` and `.ts`          |
| `npm run lint`         | ESLint (`lint:fix` to apply fixes)      |
| `npm run format:check` | Prettier, read-only (`format` to write) |

Before a commit, `check`, `lint`, `format:check` and `build` exit 0 with no
warnings.

## Structure

```
src/
├── components/        # One per section; HomePage holds the list of sections
│   └── deep-dive/     # Graph, panel, list, card
├── config/site.ts     # Contact details, links, locales
├── data/deep-dive/    # Deep-dive content, one file per language
├── i18n/              # Dictionaries (en.ts sets the shape) and routes
├── layouts/           # lang, canonical, hreflang, language detection
├── lib/deep-dive/     # Content type and validation, graph geometry
├── pages/             # Home and deep dive, at / and /pt/
├── scripts/           # One module per behaviour
└── styles/            # Tokens, fonts, global, shared primitives
public/                # Images, posters and the hero loop
docs/                  # Decision log, changelog, roadmap, visual identity
```

## How it is built

One person decides. An assistant drafts specs, copy and docs. A code agent
implements and never commits. The plan is reviewed before any file is touched
(α); the result is validated at runtime, by the code agent on the command line
and by a second agent in a browser, before anything is integrated (β). Each
phase lands as one commit, with its docs.

Every decision is recorded with its context and the alternatives that lost,
including the ones later reversed:

- [Decision log](docs/DECISION_LOG.md)
- [Changelog](docs/CHANGELOG.md)
- [Roadmap](docs/ROADMAP.md)
- [Visual identity](docs/VISUAL_IDENTITY.md)

## Credits and licence

Hero footage: "Close-up of Lit Match Burning in Dark" by Scott Precious, from
[Pexels](https://www.pexels.com/video/close-up-of-lit-match-burning-in-dark-35888102/),
under the Pexels licence; cut, denoised and re-encoded for this site.

Code under the [MIT licence](LICENSE). Copy and images are all rights
reserved.

---

Alan Gattiboni · [LinkedIn](https://www.linkedin.com/in/alangattiboni) ·
[GitHub](https://github.com/Gattiboni)
