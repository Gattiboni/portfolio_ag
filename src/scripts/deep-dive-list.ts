// Deep-dive list tools: a filter that hides what does not match and opens
// the zones that do, and one button that expands or collapses every zone.
// Both are hidden in the HTML and shown here, since they need this script.

export function initDeepDiveList(): void {
  const tools = document.querySelector<HTMLElement>("[data-dd-tools]");
  const input = tools?.querySelector<HTMLInputElement>("input");
  const button = tools?.querySelector<HTMLButtonElement>("button");
  const zones = [
    ...document.querySelectorAll<HTMLDetailsElement>("details.dd-zone-item"),
  ];
  if (!tools || !input || !button || !zones.length) return;

  // The button offers whatever the next click does, counting only the zones
  // the filter leaves visible.
  const syncButton = () => {
    const shown = zones.filter((z) => !z.classList.contains("dd-hide"));
    const allOpen = shown.length > 0 && shown.every((z) => z.open);
    button.textContent =
      (allOpen ? button.dataset.collapse : button.dataset.expand) ?? "";
  };

  button.addEventListener("click", () => {
    const open = zones.some((z) => !z.open && !z.classList.contains("dd-hide"));
    zones.forEach((z) => (z.open = open));
    syncButton();
  });

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    zones.forEach((z) => {
      let any = false;
      z.querySelectorAll<HTMLElement>(".dd-item").forEach((item) => {
        const hit = !q || (item.textContent ?? "").toLowerCase().includes(q);
        item.classList.toggle("dd-hide", !hit);
        if (hit) any = true;
      });
      z.classList.toggle("dd-hide", !!q && !any);
      if (q) z.open = any;
    });
    syncButton();
  });

  // Zones opened or closed by hand keep the button honest.
  zones.forEach((z) => z.addEventListener("toggle", syncButton));

  tools.hidden = false;
}
