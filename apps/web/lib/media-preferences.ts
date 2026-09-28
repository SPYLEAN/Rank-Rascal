/**
 * Client-only helpers that decide how much motion and media a visitor should receive.
 * Every function is safe to call during render guards (returns the conservative answer
 * when window is unavailable).
 */

type NetworkInformationLike = { saveData?: boolean };

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Save-Data header / Data Saver mode, plus the draft `prefers-reduced-data` query where supported. */
export function prefersReducedData(): boolean {
  if (typeof window === "undefined") return true;
  const connection = (navigator as Navigator & { connection?: NetworkInformationLike }).connection;
  if (connection?.saveData) return true;
  return window.matchMedia("(prefers-reduced-data: reduce)").matches;
}

/** Portrait viewports get the pre-cropped 9:16 hero. Must match the poster <source> media query. */
export const PORTRAIT_QUERY = "(max-aspect-ratio: 4/5)";

export function isPortraitViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(PORTRAIT_QUERY).matches;
}

/**
 * Picks exactly one URL so the browser never downloads both encodes.
 * VP9 WebM is preferred only when the browser is confident it can play it.
 */
export function pickVideoSource(video: HTMLVideoElement, sources: { webm: string; mp4: string }): string {
  return video.canPlayType('video/webm; codecs="vp9"') === "probably" ? sources.webm : sources.mp4;
}

/**
 * Inlined into <head> by the root layout and run before first paint: returning visitors get
 * the shortened Crownfall intro (the CSS reads `data-intro-seen`). Storage failures (private
 * mode, blocked storage) just mean the full intro plays again.
 */
export const INTRO_SEEN_SCRIPT =
  "try{var k='rascalRealms.introSeen';if(localStorage.getItem(k)==='1')document.documentElement.setAttribute('data-intro-seen','1');localStorage.setItem(k,'1')}catch(e){}";

/** Page-wide signals so the hero, intro and teaser player stay in sync without shared state. */
export const INTRO_DONE_EVENT = "rr:intro-done";
export const TEASER_OPEN_EVENT = "rr:teaser-open";
export const TEASER_CLOSE_EVENT = "rr:teaser-close";

type IntroWindow = Window & { __rrIntroDone?: boolean };

export function markIntroDone(): void {
  if (typeof window === "undefined") return;
  (window as IntroWindow).__rrIntroDone = true;
  window.dispatchEvent(new Event(INTRO_DONE_EVENT));
}

export function isIntroDone(): boolean {
  if (typeof window === "undefined") return false;
  return (window as IntroWindow).__rrIntroDone === true;
}
