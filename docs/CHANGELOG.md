# Changelog · portfolio_ag

Format: `[DATE] Category — Description`. Newest on top. Entries before
2026-10-07 are retroactive and describe the site before this repository
existed.

---

[2026-10-08] Docs — Decision log: D018 (hero) and D019 (how images enter the repository). Roadmap: Phase 4 closed, two findings from the port resolved, six new ones listed. README: status, structure and credits. Visual identity: hero section.

[2026-10-08] Correction — The Phase 3 validation entry said the five images were "byte-identical to the previous site". They were not. They had been written through the assistant's file bridge, which adds a signed provenance manifest to images (5,770 bytes each), and the check compared two copies of the already altered files. Pixel data was never changed. The originals are restored and verified by hash against the download from the previous host (D019).

[2026-10-08] Validation — Hero β. Code agent: `check` (36 files), `lint`, `format:check`, `build` exit 0 without warnings; six media files hash-identical to the encodes; no scroll listener in `src/`; contrast measured over all 150 frames at 1440 and 390 px in both languages, worst case 5.75:1 after a contrast layer was added on phones (it was 1.02:1 on the role line without it). Browser agent, on the built site in a clean headless Chromium: poster requested at 46 ms, `load` at 396 ms, video at 434 ms; 1080p WebM at 1440 px and 720p at 390 px; poster only, with no video request, under reduced motion, under data saver and without JavaScript; video paused off screen; at 40% of the scroll range the media is at 0.425 opacity and the bar at 0.47; menu open at the top gives the bar its full background. Language: a Portuguese browser arriving with a query string and a hash keeps both through the redirect; with storage blocked, choosing English lands on `/?lang=en` and stays after reload; with storage working the URL stays clean. Sources below the hero unchanged since `6703e04` (only the hero, its lead block, the redirect, the switch and four dictionary lines differ). Lighthouse mobile on the same clean build, three runs: performance 90, 91, 97; LCP 2.7, 2.7, 2.3 s; TBT 0; CLS 0.097, 0, 0. The code agent's runs on the author's machine (78 new against 82 before) are contaminated by an antivirus that injects a 175 KB script into every page. Not tested: Safari and iOS, a real phone.

[2026-10-08] Hero — Video hero in place of the text-only one. Name as `<h1>`, role line above, the phrase below, the supporting paragraph moved to a block right after the hero. Six media files in `public/`: 1080p and 720p in WebM and MP4 (54 to 114 KB) and two posters (4 and 8 KB). `src/scripts/hero-video.ts` attaches the video after `load`. Fade, scale and bar transition on scroll in CSS only, inside `@supports`. Two fixes pre-authorised and applied by the code agent: the hero background fades to transparent over its last 160 px, because a hard edge cut the ambient glow in a straight line; and the bar takes its full background while the mobile menu is open.

[2026-10-08] Fixed — Language switch with storage blocked no longer bounces a Portuguese browser back to `/pt/`. The redirect now keeps the query string.

[2026-10-08] Media — Hero loop cut from the original Pexels file (34.0 to 40.0 s), 0.5 s crossfade on the seam, light denoise, black point raised to pure black. Encoded on the author's machine.

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
