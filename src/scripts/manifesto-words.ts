// Point of view, read as it lights up. Each word of the two paragraphs gets
// its own slice of a scroll-driven range, so the words brighten one by one as
// the section crosses the screen. The CSS lives in Manifesto.astro.
//
// Only where the browser runs scroll-driven animations and the visitor has not
// asked for reduced motion. Everywhere else nothing is touched: the paragraphs
// keep their markup and the usual .rise reveal.

// Slices, as in the approved mock: the first word starts at 18% of the
// "cover" range, the last one at 18% + 34%, and each takes 7% to light up.
const RANGE_START = 18;
const RANGE_SPAN = 34;
const WORD_SPAN = 7;

export function initManifestoWords(): void {
  if (!CSS.supports("animation-timeline: view()")) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const section = document.querySelector(".manifesto");
  const paragraphs = section
    ? Array.from(section.querySelectorAll(":scope > p"))
    : [];
  const first = paragraphs[0];
  if (!section || !first) return;

  // The timeline subject is the box holding both paragraphs (the eyebrow is
  // not part of the reading), so the ranges match the mock.
  const reading = document.createElement("div");
  reading.className = "manifesto-read";
  first.before(reading);
  reading.append(...paragraphs);

  const words: HTMLSpanElement[] = [];
  for (const p of paragraphs) {
    // These two paragraphs are lit by scroll; the fade-in would be a second
    // animation on the same text.
    p.classList.remove("rise");
    wrapWords(p, words);
  }

  words.forEach((word, i) => {
    const from = RANGE_START + (RANGE_SPAN * i) / words.length;
    word.style.setProperty("--word-from", `${from.toFixed(2)}%`);
    word.style.setProperty("--word-to", `${(from + WORD_SPAN).toFixed(2)}%`);
  });
}

// Wraps every run of non-space characters in a span, descending into inline
// markup (<strong>, <span>) so it stays in place. Spaces stay plain text, so
// the paragraph still reads, and is announced, as running text.
function wrapWords(node: Node, words: HTMLSpanElement[]): void {
  for (const child of Array.from(node.childNodes)) {
    if (child.nodeType !== Node.TEXT_NODE) {
      wrapWords(child, words);
      continue;
    }
    const text = child.textContent ?? "";
    if (!text.trim()) continue;
    const fragment = document.createDocumentFragment();
    for (const part of text.split(/(\s+)/)) {
      if (!part) continue;
      if (/^\s+$/.test(part)) {
        fragment.append(part);
        continue;
      }
      const span = document.createElement("span");
      span.className = "w";
      span.textContent = part;
      words.push(span);
      fragment.append(span);
    }
    child.replaceWith(fragment);
  }
}
