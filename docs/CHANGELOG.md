# Changelog · portfolio_ag

Format: `[DATE] Category — Description`. Newest on top. Entries before
2026-10-07 are retroactive and describe the site before this repository
existed.

---

[2026-10-08] Docs — Decision log: D004 closed with its mechanism, D015 to D017 added. Roadmap: Phase 3 rewritten to what was delivered, favicon and social preview image left to launch, nine findings from the port listed with a phase each. Visual identity corrected where it described intent instead of what renders (section rhythm, breakpoints). README updated.

[2026-10-08] Validation — Parity β. Code agent: `check` (34 files), `lint`, `format:check` and `build` exit 0 without warnings; zero occurrences in `src/` and `dist/` of the employer name, the old e-mail provider, the retired brand tokens and typefaces, and any font CDN; its own headless comparison of about 70 selectors at three widths. Browser agent, independently, new against production in a real browser: at 1440 px (window) and at 768 and 390 px (same-origin frames), in both languages, position and height of the 7 sections plus size and 8 to 10 computed styles of 26 to 28 elements. Result: the only difference at 1440 and 768 is the length of the anonymised sentence; at 390 in Portuguese that sentence wraps one more line and the chat is 21 px taller in Sora. Also verified: saved `pt` redirects `/` to `/pt/`, saved `en` stays and keeps the hash, the switch carries `#case` across and saves the choice, links hidden and menu button shown at 768 and 390, chat colours match the D005 table, e-mail from config, no third-party request from the site. Disk re-checked: forbidden terms 0 in `src/` and `dist/`, five images byte-identical to the previous site, changes confined to `src/` and `public/img/`. Not re-verified by the browser agent: reduced motion, menu, carousel and lightbox interaction (covered by the code agent's run and by Alan's visual pass).

[2026-10-08] Port — The previous site now lives in the project: 16 components, one typed dictionary per language (105 keys each, Portuguese held to the English shape by the compiler, plus 12 translated attributes), 8 behaviour modules in strict TypeScript, 5 images copied unchanged. Each language is static HTML; the browser no longer swaps text. Two defects found and fixed on the way by the code agent: the build minifier dropped the unprefixed `backdrop-filter`, leaving the bar without blur in Chrome; and the first `noscript` rule lost to the bundled CSS that loads after it.

[2026-10-08] Changed — Base styles from the scaffold aligned with what the previous site rendered: body colour `--cream`, smooth scrolling, horizontal overflow hidden, selection colour, font smoothing removed. New token `--on-gold`.

[2026-10-08] Deploy — Repository connected to Vercel. First build from `main` (commit `c90a9ad`): clean install, 2 static pages, no warnings in the build log. Both routes re-checked on the deployed URL with the same browser checks as the local β: tokens, three self-hosted font files, `lang`, canonical and `hreflang` pointing at the real domain, no request to a font CDN. The custom domain still points at the previous host. Phase 2 closed.

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
