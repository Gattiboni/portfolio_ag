# Decision Log · portfolio_ag

Strategic and technical decisions for the portfolio at
[portfolio.alangattiboni.site](https://portfolio.alangattiboni.site), newest at
the bottom. Each entry records **Context, Alternatives, Decision, Rationale,
Owner, Status**. A decision that is later reversed is not deleted: it gets a new
entry that supersedes it.

Roles: **Alan** decides, validates what the eye has to judge, and makes every
commit. A chat assistant drafts specs, copy and docs. A code agent implements
and never commits. Two gates sit between them: the plan is reviewed before any
file is touched (α), and the result is validated at runtime before anything is
integrated (β). See D014 for who runs which check.

---

## D001 — 2026-10-07 · Rebuild as a versioned project

**Context.** The portfolio in production is a single self-contained HTML file
(1,106 lines) plus five images, uploaded by hand through the host's file
manager. A hero video, a second page and proper per-language URLs are about to
be added.

**Alternatives.** (a) Keep growing the single file. (b) Move to a repository
with a build step and deploy by push.

**Decision.** (b).

**Rationale.** The single file already mixes content in two languages, styles
and four independent scripts. Each planned addition makes it harder to change
one thing without touching the rest. A repository also makes the working method
(decisions, changelog, gates) inspectable, which is part of what the portfolio
is meant to show.

**Owner.** Alan. **Status.** Closed.

---

## D002 — 2026-10-08 · Astro as the framework

**Context.** Two pages, the same content for every visitor, no login, no
database, no form that writes anything. Three interactive islands: a force
graph, a chat demo and a language switch.

**Alternatives.** (a) Astro. (b) Next.js, already used in other projects by the
same author. (c) Plain HTML/CSS/JS bundled with Vite.

**Decision.** (a) Astro.

**Rationale.** Static output with no client JavaScript by default, shipped only
where an island needs it, which matters once a video competes for bandwidth in
the hero. Locale routing is configuration. The existing vanilla scripts port
almost as they are. Against it: less mileage than with Next.js, accepted on a
personal project without a deadline. (c) was rejected because it recreates the
single-file problem with more files.

**Owner.** Alan. **Status.** Closed. Versions are checked at scaffold time, not
taken from memory.

---

## D003 — 2026-10-08 · Vercel for hosting, DNS stays where it is

**Context.** The site is served from shared hosting and updated by manual
upload.

**Alternatives.** (a) Vercel, with a CNAME from the current DNS zone. (b) Stay
on the shared host and build an upload pipeline.

**Decision.** (a).

**Rationale.** Deploy on push, a preview URL per pull request and one-click
rollback, with nothing to maintain. The shared host does not limit a static
site, but every deploy would be either manual or a pipeline to own. The current
host stays untouched for seven days after cutover as rollback.

**Owner.** Alan. **Status.** Closed. Cutover happens in the launch phase; the
domain does not move before parity is reached.

---

## D004 — 2026-10-08 · Language follows the device, with a switch

**Context.** The target audience is hiring teams outside Brazil; Portuguese
speakers should still land in Portuguese. The production site already detects
the browser language in client-side JavaScript, but the server always sends
Portuguese, so crawlers and link previews only ever see Portuguese.

**Alternatives.** (a) English only. (b) English default with a manual switch.
(c) Device detection with a switch and one real URL per language.

**Decision.** (c). A device whose language starts with `pt` gets Portuguese; any
other gets English. A PT/EN switch stays in the header and a manual choice is
remembered. English lives at `/`, Portuguese at `/pt/`. Detection only acts on
the first visit to `/`.

**Rationale.** Keeps the behaviour visitors already have, and adds indexable,
shareable URLs with `hreflang` for each language.

**Owner.** Alan. **Status.** Closed. Mechanism decided on 2026-10-08: a minimal
inline script in the `<head>` of `/` only, run before first paint. A saved
choice of `pt`, or no saved choice and a browser language starting with `pt`,
goes to `/pt/`; anything else stays. `/pt/` never redirects, because an explicit
URL wins. The saved choice uses the same `localStorage` key as the previous
site, so returning visitors keep their language after cutover. An edge rule was
rejected because it would tie the behaviour to one host.

---

## D005 — 2026-10-08 · The employer is not named

**Context.** The main case study is a data platform built for an employer. The
production copy names the company and the chat demo borrows its brand colours
and typefaces.

**Alternatives.** (a) Keep the name and the brand styling. (b) Describe the
company generically and restyle the demo in the portfolio's own palette.

**Decision.** (b). "A portfolio is not a CV."

**Rationale.** The case stands on what was built and how. Naming the company
adds nothing to that, and a third party's visual identity does not belong on a
personal site. This also sets the rule for the deep-dive page: no names of
people or companies, no employee data, no credentials, no figure that
identifies the organisation.

**Owner.** Alan. **Status.** Closed. Applied during the parity port.

---

## D006 — 2026-10-08 · Hero video must be licensed for self-hosted web use

**Context.** The first portfolio opened with a burning match, and visitors
remembered it. The clip came from a design tool's stock library. Its content
licence does not allow downloading stock items as standalone files, and caps
unedited stock in third-party web pages at a resolution far below a
full-screen hero.

**Alternatives.** (a) Use the clip anyway. (b) Replace it with footage under a
licence that allows web use and modification. (c) Shoot original footage.

**Decision.** (b) now, (c) when practical. The original clip is dropped.

**Rationale.** A public repository redistributes whatever is committed to it.
Raw downloads live in `assets-src/`, which is ignored; only optimised outputs
whose licence allows it are committed, and the source URL and author are
credited in the README.

**Owner.** Alan. **Status.** Closed. Clip chosen on 2026-10-08: "Close-up of
Lit Match Burning in Dark" by Scott Precious, downloaded from Pexels under the
Pexels licence. The loop is cut from the original file, not from a copy that
passed through another tool's library.

---

## D007 — 2026-10-08 · Public repository, MIT for the code

**Context.** The repository itself is meant to be read by people evaluating how
the author works.

**Alternatives.** (a) Private. (b) Public without a licence. (c) Public, MIT.

**Decision.** (c), named `portfolio_ag`.

**Rationale.** The code is ordinary and reusable. The MIT licence covers the
code. Copy, images and video are not covered by it: all rights reserved, stated
in the README.

**Owner.** Alan. **Status.** Closed.

---

## D008 — 2026-10-08 · The previous site stays out of version control

**Context.** The production HTML is the source for the parity port and the
rollback reference. It carries the copy that D005 retires.

**Alternatives.** (a) Commit it under `legacy/`. (b) Keep it locally, ignored
by git.

**Decision.** (b).

**Rationale.** Git history is permanent. Committing text that D005 removes
would undo D005 in the one place that cannot be edited later. The same file
remains on the current host until seven days after cutover, so nothing is lost.

**Owner.** Assistant proposed, Alan confirmed. **Status.** Closed.

---

## D009 — 2026-10-08 · Repository documentation in English

**Context.** The site is bilingual. The repository's readers are mostly the
same hiring teams the site is built for.

**Alternatives.** (a) Portuguese, as in the author's other repositories.
(b) English.

**Decision.** (b).

**Rationale.** A decision log nobody on the hiring side can read is not
evidence of anything.

**Owner.** Assistant proposed, Alan confirmed. **Status.** Closed.

---

## D010 — 2026-10-08 · GitHub link ships with the launch

**Context.** The site needs a link to the author's GitHub profile. The profile
has not been reviewed or organised yet.

**Alternatives.** (a) Hold the link until the profile is reviewed. (b) Ship the
link with the launch and review the profile as separate work.

**Decision.** (b). The URL lives in one config file and is referenced from the
header, the contact section and the footer.

**Rationale.** Alan's call: get the site standing first. The profile review is
tracked in the roadmap as later work.

**Owner.** Alan. **Status.** Closed.

---

## D011 — 2026-10-08 · Pinned versions; the toolchain sets the Node floor

**Context.** At scaffold time the newest release of each tool did not form a
working set. The Astro ESLint plugin compatible with ESLint 10 requires Node
22.22.3 or newer, above Astro's own minimum of 22.12.0. TypeScript 7 was
current, but the Astro type checker and typescript-eslint accept 6 at most.

**Alternatives.** (a) Stay on the installed Node and use the previous
generation of the lint stack (ESLint 9). (b) Update Node within the 22 line and
use the current stack. (c) Move to Node 24.

**Decision.** (b). Every dependency is pinned to an exact version. `engines.node`
is `^22.22.3 || ^24.16.0 || >=26.3.0`, the strictest requirement in the
toolchain. TypeScript stays on 6.0.3 until both checkers accept 7.

**Rationale.** A project created today should not start one lint generation
behind. A minor Node update inside the same line changes no behaviour for the
other projects on the same machine; a major jump might. Exact pins make the
build reproducible and make every upgrade a visible diff.

**Owner.** Code agent raised it and stopped, Alan decided. **Status.** Closed.
Revisit the TypeScript pin when `@astrojs/check` and typescript-eslint support 7.

---

## D012 — 2026-10-08 · Fonts self-hosted from Fontsource, latin subset declared by hand

**Context.** The production site loads its three families from a third-party
font CDN. The variable Fontsource packages ship a single stylesheet that covers
every script.

**Alternatives.** (a) Import the package stylesheets as they are. (b) Declare
`@font-face` in the project against the latin files only. (c) Astro's built-in
fonts option, which downloads at build time and generates metric-adjusted
fallbacks.

**Decision.** (b). Fraunces 300 to 600 with italic 300 to 400 and its optical
size axis, Sora 300 to 600, IBM Plex Mono 400 and 500 from the package's static
latin sheets.

**Rationale.** No request leaves the site for a font, and only the latin files
are built. (c) is not adopted now because its documentation covers weight
ranges and says nothing about other variable axes, and the display face depends
on optical size. To adopt it later: declare the three families in the config
and replace the stylesheet import with the font component. To revert: remove
that block and restore `src/styles/fonts.css`.

**Owner.** Code agent proposed, Alan confirmed. **Status.** Closed. (c) is
re-evaluated in the launch phase, when preload and fallback metrics start to
matter for performance.

---

## D013 — 2026-10-08 · ESLint for code, Prettier for everything

**Context.** The scaffold instruction asked for lint and formatting "covering"
Astro, TypeScript, CSS, Markdown and JSON. ESLint needs three more packages to
lint the last three.

**Alternatives.** (a) Add the three ESLint language plugins. (b) ESLint lints
`.astro` and `.ts`; Prettier formats all five.

**Decision.** (b).

**Rationale.** Three dependencies for rules nobody has asked for yet. The
ambiguity was in the instruction, not in the implementation. `docs/` and
`LICENSE` are excluded from Prettier so that committed documents are never
reformatted by a tool.

**Owner.** Assistant. **Status.** Closed.

---

## D014 — 2026-10-08 · Who validates what

**Context.** The first β mixed checks a person should not spend time on (exit
codes, attributes in built HTML, network requests) with checks only a person
can make (does it look right).

**Alternatives.** (a) Alan runs every check. (b) Mechanical and precision
checks go to an agent; visual judgement and decisions stay with Alan.

**Decision.** (b). The code agent runs the command-line checks and pastes raw
output. A second agent drives a real browser for computed styles, loaded fonts
and network requests, and independently re-reads the files the code agent
reported on. Both report before Alan reads the documentation and commits.

**Rationale.** The agent that wrote the code is not the only one that checks
it, and the person's attention goes where it cannot be replaced.

**Owner.** Alan. **Status.** Closed.

---

## D015 — 2026-10-08 · The port is a parity port, with a closed list of differences

**Context.** The previous site had to move into the new project before anything
could be redesigned. Without a rule, a port turns into a redesign one small
improvement at a time, and nobody can tell afterwards which change broke what.

**Alternatives.** (a) Improve while porting. (b) Port with parity and allow only
a written list of differences.

**Decision.** (b). Six differences are allowed: the employer is anonymised and
the chat demo is restyled in the portfolio palette (D005); the contact e-mail
changes; each language is its own static page with detection and a switch
(D004); a menu appears where the links used to vanish (D016); content stays
visible without JavaScript (D017). Section anchors keep the previous ids in both
languages, because published links and the language switch depend on them. The
code agent lists anything else it finds and fixes none of it.

**Rationale.** Parity is the safety net for every later phase. Measured against
production at 1440, 768 and 390 px in both languages, the only geometric
differences are the ones on the list. Favicon and social preview image moved
out of this phase to launch: the preview image should show the new hero, which
does not exist yet.

**Owner.** Assistant proposed, Alan confirmed. **Status.** Closed.

---

## D016 — 2026-10-08 · Mobile menu starts at 820 px, not 720

**Context.** The roadmap said the navigation disappeared below 720 px. That
number came from an older copy of the site. Production hides the links at
820 px and below, and 720 is not a breakpoint at all.

**Alternatives.** (a) 720, as written. (b) 820, where the links actually vanish.

**Decision.** (b). A round icon button opens a full-width panel under the bar
with the same five links. It closes on choosing a link, on Escape and on a tap
outside. Above 820 px nothing changes.

**Rationale.** At 720 the range from 721 to 820 px would have had neither links
nor menu. The instruction was wrong and the code agent stopped to ask instead
of following it.

**Owner.** Code agent raised it, Alan decided. **Status.** Closed.

---

## D017 — 2026-10-08 · Content is visible without JavaScript

**Context.** The reveal-on-scroll effect starts every block at zero opacity and
shows it from a script. On the previous site, a visitor without JavaScript saw
an empty page below the header.

**Alternatives.** (a) A `noscript` style that shows the blocks. (b) A class set
on `<html>` by an inline script, with the hiding rule scoped to it. (c) Keep the
previous behaviour for strict parity.

**Decision.** (a).

**Rationale.** With JavaScript on, nothing changes, so parity holds. (b) solves
the same problem with more CSS and one more inline script on every page. (c)
would inherit a defect on purpose.

**Owner.** Code agent raised it, Alan decided. **Status.** Closed.

---

## D018 — 2026-10-08 · Hero: the name leads, over a looping video that never blocks the page

**Context.** Feedback on the first portfolio was that the burning match gave it
warmth the second version lost. The licensed clip was ready (D006). Two layouts
were built as a navigable mock with the real footage and fonts: the phrase as
headline with the name in a small line, or the name as headline with a role
line above and the phrase below.

**Alternatives.** Layout: (a) phrase leads, (b) name leads. Scroll effect:
(c) a JavaScript scroll listener, (d) CSS scroll-driven animation with a static
fallback. Loading: (e) `autoplay` with sources in the markup, (f) poster first,
sources attached by script after `load`.

**Decision.** (b), (d) and (f). The video is cut from the original file, 6
seconds, loop seam crossfaded, background crushed to pure black so that
`mix-blend-mode: screen` lets the page colour show through instead of a black
box. The fingers holding the match stay in frame: "the human part nobody
notices when they talk about AI". The server sends a real poster image and a
`<video>` with no source. A script attaches the video only after `load`, 720p
at 820 px and below, 1080p above, and not at all under reduced motion, data
saver or without JavaScript. Playback pauses when the hero leaves the screen.

**Rationale.** (b) answers who and what in the first three seconds. (d) keeps
the main thread free and costs nothing where unsupported: Firefox stable does
not ship `animation-timeline` yet, so there the hero simply scrolls away. That
is accepted. (f) means the first paint never waits for video. The largest file
is 114 KB, so weight stopped being a constraint.

**Owner.** Alan chose the layout on the mock; assistant proposed the
architecture. **Status.** Closed. The role line is a placeholder until the
title is decided in Phase 7.

---

## D019 — 2026-10-08 · Images enter the repository only as copies made on the author's machine

**Context.** In Phase 3 the five images of the previous site were written to
the project folder through the assistant's file bridge. That bridge signs every
image it delivers with a C2PA Content Credentials manifest stating that the
assistant provided the file and may have modified it. The manifest added 5,770
bytes to each PNG. The pixel data was untouched, but the files were no longer
the originals, and screenshots of the author's own products carried an
AI-provenance statement that did not describe them. The changelog entry that
called them "byte-identical to the previous site" was wrong: they were
identical to each other, which is what was actually compared.

**Alternatives.** (a) Leave the manifests. (b) Restore the originals and change
how images travel.

**Decision.** (b). The five PNGs were restored from the author's own copies,
verified by hash against the files downloaded from the previous host. From now
on, images and video reach `public/` only by a copy or an encode executed on
the author's machine. The assistant may write text through the bridge; it does
not deliver binaries that way.

**Rationale.** A check that compares two copies of the same altered file proves
nothing about the original. The comparison has to reach back to the source of
truth. The commit that carried the signed files stays in history; nothing in it
is sensitive.

**Owner.** Assistant, who caused it and found it. **Status.** Closed.

---

## D020 — 2026-10-08 · Motion: three moments tied to scroll, chosen on a mock

**Context.** The brief asked for more impact while staying minimal. Five
candidate moments were built as a navigable mock on the real page: (A) the
point of view lights up word by word as it is read, (B) the revenue figure
drawn as two bars, (C) the data travelling along a rail through the bronze,
silver and gold cards, (D) the secondary projects scrolling sideways, (E) a
card expanding into the deep-dive page.

**Alternatives.** Any subset of the five. For the implementation: (a) an
animation library, (b) scroll listeners in JavaScript, (c) CSS scroll-driven
animations with a static fallback, as the hero already does (D018).

**Decision.** A, B and C are built now. D is dropped: it did not behave well in
either of the two browsers Alan tried it in. E is approved and ships with the
page it leads to, in Phase 6. All three use (c). No number was fixed as a cap
on animated moments.

**Rationale.** Each of the three says something the text already says, in the
place where it says it: reading, growth, and the three layers. None is
decoration added to a section. With (c) there is no dependency and no scroll
listener, and where the feature is missing (Firefox stable) or the visitor asks
for reduced motion the content is simply shown: plain text, both bars at full
size, the whole rail, the cards as they were.

Two implementation choices worth keeping. The cards' lit state is one
registered number animated from 0 to 1, and border, glow and opacity are
derived from it in ordinary rules; animating the border itself would have
overridden the hover colours for good. And every scroll-driven animation is
written in longhand properties, because the build minifier folds
`animation-timeline` into the `animation` shorthand and browsers reject the
result.

The mock showed "before" and "after" labels on the bars. They were left out:
they are new copy, and copy belongs to Phase 7.

**Owner.** Alan chose on the mock; assistant specified; code agent built.
**Status.** Closed for A, B and C. E is carried to Phase 6.

---

## D021 — 2026-10-08 · A section index instead of a back-to-top button, fed by one list of sections

**Context.** Alan asked for a back-to-top control that follows the scroll. The
motion mock carried a small progress indicator next to it. His reaction was
that a bare number meant nothing; what would be useful is knowing how many
sections exist and where one is among them.

**Alternatives.** (a) A plain floating back-to-top button. (b) An index built
by a script that scans the page for sections. (c) An index rendered on the
server from the same list that composes the page. For going back to the top:
(d) a line inside the index panel, (e) a separate button beside it.

**Decision.** (c) and (e). The home page now declares its content sections
once: id, component, label and whether the section appears in the bar. The
page, the bar and the index are all rendered from that list. The index is a
round button showing the current section's number inside a ring that fills
with the page, a separate ↑ button, and a native popover with the six
sections as real links. The list starts at the first content section; hero,
marquee and footer are not sections. The footer's back-to-top link is removed.

**Rationale.** With (b) the bar's links stay a second hand-written list and
the index a third; a section could exist on the page and be missing from
either. With (c) that cannot happen, adding a section is one entry, and the
list works without JavaScript because it is in the HTML. (e) was Alan's call
on the mock: more intuitive than hiding the action inside a panel.

The current section is the one under the middle of the screen, found with an
`IntersectionObserver`. There is still no scroll listener in the project. The
last section is too short to reach the middle, so when the footer is fully on
screen the last section becomes the current one. The marquee sits between two
sections without being one: it is attached to the entry it precedes, as an
optional decorative block that reaches neither the bar nor the index.

**Owner.** Alan (the idea and the choices on the mock); assistant (the single
list); code agent (the end-of-page rule and the marquee field).
**Status.** Closed.

---

## Open

- **Section rhythm.** Five of the six sections carry no vertical padding, an
  accident inherited from the previous site and reproduced by the port (D015).
  Standardising it changes the rendered layout, so it is a decision.
- **Text over the hero video.** How much copy sits on the video before the fade.
- **Deep dive: scope, disclosure levels and graph.** Whether every edge in the
  graph must represent a relation declared in the data.
- **Headline and title.** One wording across site, deep dive and CV.
- **Secondary projects.** How many cards stay, and whether the gallery stays
  while its images are small.
