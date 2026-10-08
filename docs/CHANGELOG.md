# Changelog · portfolio_ag

Format: `[DATE] Category — Description`. Newest on top. Entries before
2026-10-07 are retroactive and describe the site before this repository
existed.

---

[2026-10-08] Docs — README written from the delivered scaffold. Decision log: D011 to D014 added, D006 updated with the chosen clip, D008 and D009 closed.

[2026-10-08] Validation — Scaffold β. Code agent: clean install with 0 vulnerabilities; `check`, `lint`, `format:check` and `build` exit 0 without warnings. Browser agent on the dev server, both routes: background `rgb(17, 22, 27)`, heading in Fraunces, body in Sora 300, label in IBM Plex Mono, `lang` `en` and `pt-BR`, canonical plus three `hreflang` each, three font files served from the site itself, no request to a font CDN, no horizontal scroll. Built files re-read independently: `dist/index.html` and `dist/pt/index.html` match.

[2026-10-08] Scaffold — Astro 7.3.7 at the repository root: strict TypeScript 6.0.3, static output, locales `en` at `/` and `pt` at `/pt/`. ESLint 10 flat config for `.astro` and `.ts`, Prettier for all sources. Design tokens in `src/styles/tokens.css`, fonts self-hosted in the latin subset, contact details and links in `src/config/site.ts`, base layout with canonical and `hreflang`, one placeholder page per language. `.gitattributes` and `.editorconfig` fix line endings to LF.

[2026-10-08] Environment — Node updated from 22.19.0 to the current 22 release: the lint toolchain requires 22.22.3 or newer (D011).

[2026-10-08] Docs — Decision log (D001 to D010), changelog, roadmap and visual identity written before any code.

[2026-10-08] Repo — `Gattiboni/portfolio_ag` created, public, MIT licence. `.gitignore` excludes the previous site (`legacy/`) and raw media sources (`assets-src/`).

[2026-10-08] Decision — Stack and hosting closed: Astro on Vercel, DNS unchanged. Language follows the device with a PT/EN switch. Employer anonymised. Original hero clip dropped over its licence.

[2026-10-08] Audit — Production site inventoried: one HTML file of 1,106 lines, 89 translatable strings, five images no wider than 540 px, no favicon, no social preview image, no navigation below 720 px.

[2026-10-07] Plan — Rebuild planned as a versioned project: hero video with scroll fade, a deep-dive page for the main case, a single back-to-top control, GitHub link.

[2026-07] Release — Second version of the portfolio published as a single self-contained HTML file on shared hosting, replacing the design-tool site. Repositioned around a data platform case study; bilingual PT/EN with browser-language detection.

[before 2026-07] Release — First portfolio, built and hosted in a design tool. Opened with a full-screen video of a burning match.
