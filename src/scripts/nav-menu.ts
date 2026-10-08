// Mobile menu. The panel is a native popover, so opening it, Escape and
// tapping outside work without this script. This script places the panel
// right under the bar, keeps aria-expanded in sync, and closes the panel when
// a link is chosen or the viewport grows past the mobile breakpoint.

const DESKTOP_QUERY = "(min-width: 821px)";

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

  matchMedia(DESKTOP_QUERY).addEventListener("change", (e) => {
    if (e.matches && panel.matches(":popover-open")) panel.hidePopover();
  });
}
