// Reveal on scroll: adds .in to each .rise element the first time it enters
// the viewport. Under reduced motion the CSS already shows .rise as final.

export function initReveal(): void {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12 },
  );
  document.querySelectorAll(".rise").forEach((el) => observer.observe(el));
}
