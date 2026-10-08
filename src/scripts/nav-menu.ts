// Mobile menu. The panel is a native popover, so opening it, Escape and
// tapping outside work without this script. This script places the panel
// right under the bar, keeps aria-expanded in sync, and closes the panel when
// a link is chosen or the viewport grows past the bar's breakpoint. The
// breakpoint lives only in Nav.astro: past it the menu button is hidden, and
// that is what this script watches.

export function initNavMenu(): void {
  const button = document.querySelector<HTMLButtonElement>(
    "button[data-menu-button]",
  );
  const panelId = button?.getAttribute("aria-controls");
  const panel = panelId ? document.getElementById(panelId) : null;
  const bar = document.querySelector("nav");
  if (!button || !panel || !bar || !("showPopover" in panel)) return;

  button.setAttribute("aria-expanded", "false");

  panel.addEventListener("beforetoggle", (e) => {
    if ((e as ToggleEvent).newState === "open") {
      panel.style.top = `${bar.getBoundingClientRect().bottom}px`;
    }
  });
  panel.addEventListener("toggle", (e) => {
    const open = (e as ToggleEvent).newState === "open";
    button.setAttribute("aria-expanded", String(open));
  });

  panel
    .querySelectorAll("a")
    .forEach((link) =>
      link.addEventListener("click", () => panel.hidePopover()),
    );

  // A hidden button has no box; the observer reports it when that changes.
  new ResizeObserver(() => {
    if (!button.offsetWidth && panel.matches(":popover-open"))
      panel.hidePopover();
  }).observe(button);
}
