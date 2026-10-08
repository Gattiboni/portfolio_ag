# Visual identity · portfolio_ag

Tokens as they existed in the previous production site on 2026-10-08, read from
its CSS, and as reproduced by the parity port (D015). Changes to it are
decisions and go in the decision log.

Single dark theme by choice.

## Colour

| Token | Value | Use |
|---|---|---|
| `--bg` | `#11161B` | Page background |
| `--panel` | `#171E25` | Raised surfaces |
| `--panel-2` | `#1A222A` | Second level of surface |
| `--line` | `rgba(242,237,227,.09)` | Hairlines and borders |
| `--cream` | `#F2EDE3` | Primary text |
| `--cream-dim` | `#BDB8AC` | Body text |
| `--muted` | `#8A948D` | Captions, metadata |
| `--teal` | `#3FA396` | Eyebrows, links, focus ring |
| `--teal-soft` | `rgba(63,163,150,.12)` | Teal tint |
| `--gold` | `#D4A643` | Emphasis, primary action, italic accents |
| `--gold-soft` | `rgba(212,166,67,.12)` | Gold tint |
| `--on-gold` | `#161005` | Text and icons on a gold surface |
| `--bronze` | `#A66B3F` | Medallion: raw layer |
| `--silver` | `#9FA8AD` | Medallion: clean layer |

Bronze, silver and gold are structural, not decorative: they stand for the
three layers of the data architecture in the main case.

The deep-dive graph adds one hue per zone, as tokens `--zone-1` to `--zone-8`:
`#3FA396`, `#4E9BC7`, `#D4A643`, `#E9A0B0`, `#59A14F`, `#B07AA1`, `#A66B3F`,
`#9FA8AD`.

**Removed by D005:** the red and grey tokens and the two extra typefaces that
styled the chat demo after a third party's brand. The demo now uses the tokens
above: card on `--panel`, header and bot bubble on `--panel-2`, message area on
`--bg`, avatar, user bubble and send button in `--gold` with `--on-gold` text,
status dot in `--teal`, all text in Sora.

## Type

| Role | Family | Notes |
|---|---|---|
| Display | Fraunces | Weights 300 to 600; italic 300/400 for gold accents |
| Body | Sora | 300 for running text, 500 for emphasis |
| Mono | IBM Plex Mono | Eyebrows, labels, code; uppercase with wide tracking |

Fonts are self-hosted in the rebuild. The production site loads them from a
third-party CDN.

Scale in production: `h1` `clamp(2.2rem, 5.6vw, 4.3rem)` at line-height 1.08;
`h2` `clamp(1.9rem, 4vw, 2.9rem)` at 1.12; body 1rem at 1.6.

## Hero

- A looping video of a burning match, flame at about two thirds of the width,
  on pure black and blended into the page with `screen`
- Name in Fraunces, `clamp(3rem, 8.2vw, 6.6rem)`, family name in gold italic on
  its own line; role line in mono above; the phrase in Fraunces 300 below
- At 820 px and below the flame sits on top and the words underneath
- Lettering enters over the first second and a half; on scroll the media fades
  and scales slightly, the words lift, and the bar goes from nearly transparent
  to its usual background

## Shape and layout

- Radius: 14 px on cards and panels, 999 px on buttons and chips
- Content width: 1080 px, 28 px side padding
- Section rhythm: `--section-space`, 110 px, is the distance between the
  content of two neighbouring sections; each section carries half above and
  below. A full-width band (the main case) keeps the whole measure inside, and
  content sits 55 px from a band's line. Same values at every width (D022)
- After a jump, a section's label sits 55 px below the fixed bar, which is
  61 px high at every width (`--bar-height`)
- Breakpoints in use: 560, 640, 760, 820, 860, 899, 980 px (not consolidated
  yet). The bar's links collapse into the menu at 899 px and below (D025)
- Wide content, for the deep-dive graph and its panel: 1240 px
  (`--content-width-wide`)

## Bar

- Fixed, 61 px high at every width. Brand, section links, language switch
- One highlighted item, the deep dive: gold text in a thin gold pill, the same
  language as the active language in the switch
- Between 1000 and 900 px its gaps and side padding shrink with the window;
  below 360 px so does the name

## Motion in production

- Reveal on scroll: 26 px rise with fade, 0.9 s
- Two blurred glows that drift with the cursor (fine pointers only)
- Card hover: 5 px lift and a radial highlight that follows the cursor
- Marquee of stack names, 36 s loop
- Everything is disabled under `prefers-reduced-motion`

## Motion added in the rebuild

All three are tied to scroll, in CSS, and mean something in the place where
they happen (D020). Without support for scroll-driven animations, or under
`prefers-reduced-motion`, the static version is shown.

- Point of view: words go from 0.16 to full opacity one after the other as the
  two paragraphs cross the screen
- Revenue metric: a bronze bar at 10% of the width and a gold bar that grows
  from 10% to 100%, 14 px high, above the figure
- Main case: a 1 px rail above the three cards, drawn left to right in a
  bronze, silver, gold gradient with a point of light at its tip; each card
  goes from 0.35 opacity to full, with a border and a soft glow in its layer's
  colour, when the rail reaches it. At 760 px and below there is no rail and
  each card lights as it enters the screen

## Page index

- Fixed 22 px from the bottom right corner, shown after the first screen
- A 48 px round button: section number in mono, two digits, inside a 2 px gold
  ring that fills with the page; a 38 px ↑ button to its left
- Panel 250 px wide above the button: one row per section with a dot, the
  label and the number; sections already passed in `--cream-dim` with gold
  dots, the current one in gold with a halo, the rest in `--muted`; a gold line
  runs down the dots as far as the current section

## Deep dive

- Graph: a static SVG, 1000 × 720. The architecture at the centre inside a
  nucleus of radius 112, its points on a ring; seven zones on an ellipse
  around it, each with its points fanned outwards. Zone 14 px, core 19 px,
  point 6.5 px, each with a soft halo
- Lines: zone to point, thin; zone to nucleus, lit in the zone's colour when
  the zone is active; point to point, dashed and faint at rest, solid gold
  when one of its ends is selected
- States: at rest everything is lit; with a zone active the others dim and its
  points take numbers; with a point active its linked points take a gold ring
- Panel beside the graph, below it at 980 px and under; at 760 px and under a
  reduced graph with the eight zones replaces both
- Card on the home page: gold tint, thin gold border, full width of the case
  content. Navigation between pages cross-fades for 0.35 s; the card takes
  0.55 s to become the page header

## Voice

Minimal, with impact placed deliberately. Affirmative sentences. No dash used as
stylistic punctuation. Long text is the visitor's choice, never the default.
