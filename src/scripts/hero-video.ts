// Hero video. The server sends the poster as a real <img> and a <video> with
// no source, so the first paint never waits for video. After the page "load"
// event this script decides whether to attach the video at all, picks the
// file for the viewport, and fades the video in over the poster once a frame
// is on screen. Whenever anything fails the poster simply stays.

// Same breakpoint as the poster's <source media> and the hero's CSS.
const SMALL_QUERY = "(max-width: 820px)";

interface NetworkInformationLike {
  saveData?: boolean;
}

export function initHeroVideo(): void {
  const video = document.querySelector<HTMLVideoElement>(
    "video[data-hero-video]",
  );
  if (!video) return;
  if (document.readyState === "complete") start(video);
  else addEventListener("load", () => start(video), { once: true });
}

// Poster only under reduced motion or when the visitor asked to save data.
function posterOnly(): boolean {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  // Unknown media features never match, so this is safe where unsupported.
  if (matchMedia("(prefers-reduced-data: reduce)").matches) return true;
  const connection = (
    navigator as Navigator & { connection?: NetworkInformationLike }
  ).connection;
  return connection?.saveData === true;
}

function start(video: HTMLVideoElement): void {
  if (posterOnly()) return;

  const size = matchMedia(SMALL_QUERY).matches ? "720" : "1080";
  // WebM first; browsers that cannot play it fall through to MP4.
  for (const [ext, type] of [
    ["webm", "video/webm"],
    ["mp4", "video/mp4"],
  ] as const) {
    const source = document.createElement("source");
    source.src = `/video/hero-${size}.${ext}`;
    source.type = type;
    video.append(source);
  }

  // "A frame to show": the first presented frame where the browser reports
  // it, otherwise the "playing" event. Until then the video stays invisible.
  const reveal = (): void => {
    video.classList.add("is-playing");
  };
  if (typeof video.requestVideoFrameCallback === "function") {
    video.requestVideoFrameCallback(reveal);
  } else {
    video.addEventListener("playing", reveal, { once: true });
  }

  const play = (): void => {
    video.play().catch(() => {
      // Autoplay refused or no playable source: the poster stays.
    });
  };

  video.load();

  // Plays only while the hero is on screen. The first callback arrives right
  // away and starts playback when the hero is visible.
  const hero = video.closest(".hero") ?? video;
  new IntersectionObserver((entries) => {
    const entry = entries[entries.length - 1];
    if (!entry) return;
    if (entry.isIntersecting) play();
    else video.pause();
  }).observe(hero);
}
