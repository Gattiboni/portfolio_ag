# Decision Log · portfolio_ag

Strategic and technical decisions for the portfolio at
[portfolio.alangattiboni.site](https://portfolio.alangattiboni.site), newest at
the bottom. Each entry records **Context, Alternatives, Decision, Rationale,
Owner, Status**. A decision that is later reversed is not deleted: it gets a new
entry that supersedes it.

Roles: **Alan** decides and validates in the browser. A chat assistant drafts
specs, copy and docs. A code agent implements and never commits. Two gates sit
between them: the plan is reviewed before any file is touched (α), and the diff
plus tests are reviewed before anything is integrated (β).

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

**Owner.** Alan. **Status.** Behaviour closed. Mechanism (edge redirect versus
inline script) is open until verified against current platform docs at scaffold
time.

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

**Owner.** Alan. **Status.** Closed. Clip selection in progress.

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

**Owner.** Assistant proposed, Alan to confirm. **Status.** Proposed.

---

## D009 — 2026-10-08 · Repository documentation in English

**Context.** The site is bilingual. The repository's readers are mostly the
same hiring teams the site is built for.

**Alternatives.** (a) Portuguese, as in the author's other repositories.
(b) English.

**Decision.** (b).

**Rationale.** A decision log nobody on the hiring side can read is not
evidence of anything.

**Owner.** Assistant proposed, Alan to confirm. **Status.** Proposed.

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

## Open

- **Motion budget.** How many high-impact animated moments the site allows.
  Decided on top of a navigable mock, not in the abstract.
- **Text over the hero video.** How much copy sits on the video before the fade.
- **Deep dive: scope, disclosure levels and graph.** Whether every edge in the
  graph must represent a relation declared in the data.
- **Headline and title.** One wording across site, deep dive and CV.
- **Secondary projects.** How many cards stay, and whether the gallery stays
  while its images are small.
