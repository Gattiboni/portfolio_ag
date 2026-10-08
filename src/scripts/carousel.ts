// Gallery carousel: arrow buttons, 3/2/1 items per view by viewport width
// (same thresholds as the CSS) and horizontal swipe on touch.

const GAP = 16;
const SWIPE_THRESHOLD = 45;

export function initCarousel(): void {
  const track = document.getElementById("galTrack");
  const prev = document.getElementById("galPrev");
  const next = document.getElementById("galNext");
  if (
    !track ||
    !(prev instanceof HTMLButtonElement) ||
    !(next instanceof HTMLButtonElement)
  ) {
    return;
  }
  const items = Array.from(track.querySelectorAll<HTMLElement>(".gal-item"));
  const first = items[0];
  if (!first) return;

  let index = 0;
  const perView = (): number =>
    innerWidth <= 560 ? 1 : innerWidth <= 860 ? 2 : 3;
  const maxIndex = (): number => Math.max(0, items.length - perView());

  const slide = (): void => {
    index = Math.min(index, maxIndex());
    const step = first.getBoundingClientRect().width + GAP;
    track.style.transform = `translateX(${-index * step}px)`;
    prev.disabled = index <= 0;
    next.disabled = index >= maxIndex();
  };

  prev.addEventListener("click", () => {
    index--;
    slide();
  });
  next.addEventListener("click", () => {
    index++;
    slide();
  });
  addEventListener("resize", slide, { passive: true });
  slide();

  let startX: number | null = null;
  track.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0]?.clientX ?? null;
    },
    { passive: true },
  );
  track.addEventListener(
    "touchend",
    (e) => {
      const endX = e.changedTouches[0]?.clientX;
      if (startX === null || endX === undefined) return;
      const delta = endX - startX;
      if (Math.abs(delta) > SWIPE_THRESHOLD) {
        index += delta < 0 ? 1 : -1;
        slide();
      }
      startX = null;
    },
    { passive: true },
  );
}
