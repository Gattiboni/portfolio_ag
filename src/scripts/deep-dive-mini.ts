// Reduced graph (narrow screens). Each zone is a link to that zone in the
// list; this script only opens the zone's <details> before the browser
// follows the link and scrolls, so the zone arrives open.

export function initDeepDiveMini(): void {
  const svg = document.querySelector<SVGSVGElement>("svg[data-dd-mini]");
  if (!svg) return;

  const zoneLink = (target: EventTarget | null) =>
    (target as Element | null)?.closest<SVGAElement>("a[data-zone]");

  svg.addEventListener("click", (e) => {
    const link = zoneLink(e.target);
    const zone = link && document.getElementById(link.dataset.zone ?? "");
    if (zone instanceof HTMLDetailsElement) zone.open = true;
  });
  // Enter fires a click on links; Space has to be handled here.
  svg.addEventListener("keydown", (e) => {
    if (e.key !== " ") return;
    const link = zoneLink(e.target);
    if (!link) return;
    e.preventDefault();
    link.dispatchEvent(
      new MouseEvent("click", { bubbles: true, cancelable: true }),
    );
  });
}
