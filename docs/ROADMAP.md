# Roadmap · portfolio_ag

What gets built, in what order, and what has to be decided along the way.
`[x]` done · `[ ]` to do · **⚑** a decision that blocks what follows it.
Decisions are recorded in [DECISION_LOG.md](DECISION_LOG.md) when they close.

One rule orders everything: **nothing visual changes before the current site is
ported with parity and committed.** Redesign happens on top of a safety net.

---

## Phase 1 · Foundation

- [x] Inventory of the production site and its assets
- [x] Repository created, licence and `.gitignore` in place
- [x] Decision log, changelog, roadmap and visual identity
- [x] First commit: docs only, before any code

## Phase 2 · Scaffold

- [x] Check current stable versions (Astro, Node, Vercel integration, locale
      routing and language redirect) against the docs on the day
- [x] Astro project at the repository root: strict TypeScript, ESLint, Prettier,
      scripts for `dev`, `build`, `preview`, `lint`, `format`
- [x] Design tokens in one CSS file; fonts self-hosted
- [x] One config file for contact details and external links
- [x] README, written after the scaffold so it describes what exists
- [x] Vercel project connected, deploying `main` to a `vercel.app` URL. The
      domain does not move yet.

## Phase 3 · Parity

- [x] Port the production site section by section, with no visual change other
      than the six differences listed in D015
- [x] One dictionary per language, routes `/` and `/pt/`, switch that keeps the
      current anchor, detection on first visit (D004)
- [x] Menu where the links vanish, at 820 px and below (D016)
- [x] Content visible without JavaScript (D017)
- [x] β: new against production at 1440, 768 and 390 px, both languages
- [ ] Single commit

## Phase 4 · Hero video

- **⚑ How much text sits on the video**
- [ ] Cut a 6 to 10 second seamless loop; MP4 (H.264) and WebM at 1080p and
      720p, no audio track; poster image
- [ ] Poster paints first, video loads after; `autoplay muted loop playsinline`
- [ ] Fade tied to scroll; poster only under reduced motion or data saver
- [ ] Contrast layer so the text passes AA over any frame
- [ ] β: a real iPhone, simulated 4G, Lighthouse before and after

## Phase 5 · Motion

- [ ] Navigable mock with five or six candidate moments
- **⚑ Motion budget**, decided on the mock
- [ ] Build the approved ones, one at a time, each with a static fallback.
      Native CSS first; a library only with a recorded decision
- [ ] One back-to-top control: floating, appears after the first fold, on both
      pages, keyboard accessible
- [ ] β: no horizontal scroll, no visible frame drops on an ordinary laptop,
      visible focus everywhere

## Phase 6 · Deep dive

A second page that explains the main case in depth, generic and anonymised.
Text is the visitor's choice, never the default.

- **⚑ Scope, disclosure levels and whether the graph only draws declared relations**
- [ ] Three levels: a graph with labels and no paragraphs; one plain line per
      node on click; technical detail on request
- [ ] Every figure checked against the project's own changelog and decision log
      before it is published
- [ ] Anonymisation pass (D005)
- [ ] Content in data files, one per language, separate from the graph component
- [ ] Graph usable by keyboard, with a list alternative for screen readers and
      narrow screens
- [ ] β: a non-technical reader follows the story with the first two levels; a
      technical reader reaches the SQL guardrails in under three clicks

## Phase 7 · Copy and positioning

- **⚑ Headline and title · ⚑ Which secondary projects stay**
- [ ] Copy revised section by section in both languages, English written and
      not machine translated
- [ ] GitHub link in the header, contact section and footer (D010)

## Phase 8 · Launch

- [ ] Social preview image per language, favicon, `hreflang`, sitemap, canonical
- [ ] Cookieless analytics
- [ ] Lighthouse targets written down before measuring
- [ ] Cutover: low TTL, CNAME to Vercel, certificate, both languages checked on
      the real domain
- [ ] Previous host untouched for seven days, then removed
- [ ] Changelog and decision log closed with the release

## Found during the parity port

Listed by the code agent and deliberately not fixed in Phase 3 (D015). Each one
has a phase.

- [ ] Language switch with `localStorage` blocked and a Portuguese browser:
      choosing English returns to `/pt/` (Phase 4, before more work lands on
      the header)
- [ ] The language redirect drops the query string, which would lose campaign
      parameters (before analytics, Phase 8)
- [ ] Chat demo text renders at weight 300; the previous site showed 400 because
      its 300 never loaded (Phase 5)
- [ ] Lightbox does not trap keyboard focus and does not cap image height
      (Phase 5)
- [ ] Brand wraps to two lines between 330 and 359 px (Phase 5)
- [ ] Back-to-top exists only in the footer; it should follow the scroll
      (Phase 5, already planned there)
- [ ] Dashes used as stylistic punctuation in the copy, against the voice rule
      (Phase 7)
- [ ] Untranslated strings: the language group label and the chat status line
      (Phase 7)
- [ ] English social description reuses the long meta description while
      Portuguese has a short line (Phase 7)

## Later

- [ ] GitHub profile review and organisation
- [ ] Higher resolution images for the secondary projects
