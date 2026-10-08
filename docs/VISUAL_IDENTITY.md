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

The deep-dive graph adds one hue per zone: `#3FA396`, `#4E9BC7`, `#D4A643`,
`#E9A0B0`, `#59A14F`, `#B07AA1`, `#A66B3F`, `#9FA8AD`.

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
- Section rhythm: 110 px top and bottom on the case study section only. The
  other sections carry no vertical padding of their own: in the previous CSS
  the container rule overrode the section rule, and the port reproduces what
  was rendered, not what was intended
- Breakpoints in use: 560, 640, 760, 820, 860 px (not consolidated yet)

## Motion in production

- Reveal on scroll: 26 px rise with fade, 0.9 s
- Two blurred glows that drift with the cursor (fine pointers only)
- Card hover: 5 px lift and a radial highlight that follows the cursor
- Marquee of stack names, 36 s loop
- Everything is disabled under `prefers-reduced-motion`

## Voice

Minimal, with impact placed deliberately. Affirmative sentences. No dash used as
stylistic punctuation. Long text is the visitor's choice, never the default.
