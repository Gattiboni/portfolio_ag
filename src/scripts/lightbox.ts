// Lightbox for the gallery: opens on item click, closes on the close button,
// backdrop click or Escape, steps with the arrows (buttons and keyboard), and
// returns focus to the item that opened it. Images are never shown larger
// than their natural size.

export function initLightbox(): void {
  const lb = document.getElementById("lb");
  const img = document.getElementById("lbImg");
  const cap = document.getElementById("lbCap");
  const closeBtn = document.getElementById("lbClose");
  const prevBtn = document.getElementById("lbPrev");
  const nextBtn = document.getElementById("lbNext");
  if (
    !lb ||
    !(img instanceof HTMLImageElement) ||
    !cap ||
    !closeBtn ||
    !prevBtn ||
    !nextBtn
  ) {
    return;
  }
  const items = Array.from(document.querySelectorAll<HTMLElement>(".gal-item"));
  if (items.length === 0) return;

  let current = 0;
  let lastFocus: HTMLElement | null = null;

  const open = (i: number): void => {
    current = (i + items.length) % items.length;
    const item = items[current];
    const thumb = item?.querySelector("img");
    if (!item || !thumb) return;

    img.src = thumb.getAttribute("src") ?? "";
    img.alt = thumb.getAttribute("alt") ?? "";
    img.style.maxWidth = "";
    img.onload = () => {
      img.style.maxWidth = `${Math.min(img.naturalWidth, innerWidth - 64)}px`;
    };

    const title = item.querySelector(".gal-cap b")?.textContent ?? "";
    const caption = item.querySelector(".gal-cap span")?.textContent ?? "";
    const span = document.createElement("span");
    span.textContent = `· ${caption}`;
    cap.replaceChildren(`${title} `, span);

    lb.classList.add("open");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  };

  const close = (): void => {
    lb.classList.remove("open");
    document.body.style.overflow = "";
    lastFocus?.focus();
  };

  items.forEach((item, i) =>
    item.addEventListener("click", () => {
      lastFocus = item;
      open(i);
    }),
  );
  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    open(current - 1);
  });
  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    open(current + 1);
  });
  lb.addEventListener("click", (e) => {
    const target = e.target;
    if (
      target === lb ||
      (target instanceof Element && target.classList.contains("lb-inner"))
    ) {
      close();
    }
  });
  addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") open(current + 1);
    if (e.key === "ArrowLeft") open(current - 1);
  });
}
