// Ambient glows that drift with the cursor, and the radial highlight that
// follows it inside each .card. Fine pointers only, never under reduced motion.

export function initPointerEffects(): void {
  const noMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(pointer: fine)").matches;
  if (!fine || noMotion) return;

  const teal = document.getElementById("gTeal");
  const gold = document.getElementById("gGold");
  if (teal && gold) {
    addEventListener(
      "mousemove",
      (e) => {
        const x = e.clientX / innerWidth - 0.5;
        const y = e.clientY / innerHeight - 0.5;
        teal.style.transform = `translate(${x * 40}px,${y * 40}px)`;
        gold.style.transform = `translate(${x * -30}px,${y * -30}px)`;
      },
      { passive: true },
    );
  }

  document.querySelectorAll<HTMLElement>(".card").forEach((card) => {
    card.addEventListener(
      "mousemove",
      (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      },
      { passive: true },
    );
  });
}
