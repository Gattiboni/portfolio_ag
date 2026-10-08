// Footer copyright year, computed in the browser so it never goes stale.

export function initFooterYear(): void {
  const el = document.getElementById("yr");
  if (el) el.textContent = String(new Date().getFullYear());
}
