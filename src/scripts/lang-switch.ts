// PT/EN switch. The links work without JavaScript (they open the top of the
// other locale). With JavaScript they also remember the choice under the same
// localStorage key the previous site used, and keep the current anchor.

const STORAGE_KEY = "lang";

export function initLangSwitch(): void {
  document
    .querySelectorAll<HTMLAnchorElement>("a[data-lang-link]")
    .forEach((link) => {
      link.addEventListener("click", (e) => {
        try {
          localStorage.setItem(STORAGE_KEY, link.dataset.langLink ?? "");
        } catch {
          // Storage unavailable: the switch still navigates.
        }
        // Let the browser handle new-tab and new-window clicks.
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
          return;
        e.preventDefault();
        // Already on this locale: nothing to load, as in the previous site.
        if (link.getAttribute("aria-current") === "page") return;
        location.assign(link.pathname + location.hash);
      });
    });
}
