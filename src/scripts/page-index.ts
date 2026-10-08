// Page index. The list ships in the server HTML and opens as a native
// popover, so the links, Escape and clicking outside work without this
// script. This script tracks the section under the middle of the screen
// (number on the button, its label, marks in the list), keeps aria-expanded
// in sync, closes the panel when a link is chosen, and shows the control
// after the hero where scroll-driven animations are not available.

// A thin band just above the middle of the viewport, as in the mock: the
// section crossing it is the current one.
const MIDDLE_BAND = "-45% 0px -54% 0px";

// Without scroll-driven animations: shown once the hero's bottom edge rises
// above 20% of the viewport, the middle of the mock's 60vh to 100vh range.
const HERO_GONE = "-20% 0px 0px 0px";

// Share of the footer on screen that counts as the end of the page; a hair
// under 1 so subpixel layouts still reach it.
const END_RATIO = 0.98;

const pad = (n: number): string => String(n).padStart(2, "0");

export function initPageIndex(): void {
  const control = document.querySelector<HTMLElement>("[data-page-index]");
  const button = control?.querySelector<HTMLButtonElement>(
    "button[data-index-button]",
  );
  const panelId = button?.getAttribute("aria-controls");
  const panel = panelId ? document.getElementById(panelId) : null;
  const number = button?.querySelector("[data-index-number]");
  const list = panel?.querySelector("ol");
  if (!control || !button || !panel || !number || !list) return;

  initVisibility(control);

  if ("showPopover" in panel) {
    button.setAttribute("aria-expanded", "false");
    panel.addEventListener("toggle", (e) => {
      const open = (e as ToggleEvent).newState === "open";
      button.setAttribute("aria-expanded", String(open));
    });
  }

  // One entry per link whose target exists on the page, in list order.
  const entries = Array.from(
    list.querySelectorAll<HTMLAnchorElement>("li > a[href^='#']"),
  ).flatMap((link) => {
    const section = document.getElementById(link.hash.slice(1));
    const item = link.parentElement;
    const label = link.querySelector("span")?.textContent ?? "";
    return section && item ? [{ link, item, section, label }] : [];
  });
  if (entries.length === 0) return;

  for (const { link } of entries) {
    link.addEventListener("click", () => {
      if ("hidePopover" in panel && panel.matches(":popover-open")) {
        panel.hidePopover();
      }
    });
  }

  const template = button.dataset.positionLabel ?? "";
  const last = entries.length - 1;
  // The section under the middle band, and whether the page has reached its
  // end. The last section can be too short to ever reach the middle, so at
  // the end of the page it is the current one.
  let inBand = 0;
  let atEnd = false;

  const paint = (): void => {
    const current = atEnd ? last : inBand;
    entries.forEach(({ link, item }, i) => {
      item.classList.toggle("is-done", i < current);
      item.classList.toggle("is-now", i === current);
      if (i === current) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    number.textContent = pad(current + 1);
    const fill = last > 0 ? current / last : 0;
    list.style.setProperty("--pidx-fill", String(fill));
    const entry = entries[current];
    if (template && entry) {
      button.setAttribute(
        "aria-label",
        template
          .replace("{n}", String(current + 1))
          .replace("{total}", String(entries.length))
          .replace("{label}", entry.label),
      );
    }
  };

  const sections = entries.map((e) => e.section);
  const observer = new IntersectionObserver(
    (records) => {
      for (const record of records) {
        if (record.isIntersecting) {
          inBand = sections.indexOf(record.target as HTMLElement);
        }
      }
      // Band above the first section (over the hero): until the first
      // section reaches the middle, it is the current one. Checked on every
      // change, because an instant jump to the top reports only the section
      // being left.
      const band = records[0]?.rootBounds;
      const first = sections[0];
      if (band && first && first.getBoundingClientRect().top > band.top) {
        inBand = 0;
      }
      paint();
    },
    { rootMargin: MIDDLE_BAND },
  );
  sections.forEach((s) => observer.observe(s));

  // The footer is the last block in the flow: once it is all on screen, the
  // page has ended.
  const footer = document.querySelector("footer");
  if (footer) {
    new IntersectionObserver(
      (records) => {
        const record = records[records.length - 1];
        if (!record) return;
        atEnd = record.intersectionRatio >= END_RATIO;
        paint();
      },
      { threshold: [0, END_RATIO] },
    ).observe(footer);
  }
  paint();
}

// Where scroll-driven animations run, CSS alone shows the control. Elsewhere
// it is hidden while the hero fills most of the screen, watched with an
// IntersectionObserver. Pages without a hero show it at once.
function initVisibility(control: HTMLElement): void {
  if (CSS.supports("animation-timeline: scroll()")) return;
  const hero = document.querySelector(".hero");
  if (!hero) {
    control.classList.add("is-shown");
    return;
  }
  new IntersectionObserver(
    (records) => {
      const record = records[records.length - 1];
      if (record) control.classList.toggle("is-shown", !record.isIntersecting);
    },
    { rootMargin: HERO_GONE },
  ).observe(hero);
}
