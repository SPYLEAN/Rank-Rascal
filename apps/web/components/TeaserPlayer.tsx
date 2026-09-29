"use client";

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ListVideo, Pause, Play, RotateCcw, Volume2, VolumeX, X } from "lucide-react";
import {
  TEASER_CLOSE_EVENT,
  TEASER_OPEN_EVENT,
  pickVideoSource,
  prefersReducedMotion,
} from "@/lib/media-preferences";
import { TRAILERS, type Trailer } from "@/lib/trailers";

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return "0:00";
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

type Props = { className?: string; children: ReactNode; trailer?: Trailer };

/**
 * "Watch the full teaser": a theater-style modal player.
 * - Nothing is downloaded until the first open; only one encode is ever requested.
 * - Opening is the intentional start: playback begins with sound (falls back to muted
 *   if the browser refuses). Reduced-motion visitors get the poster and press Play.
 * - Native <dialog>.showModal() makes the page behind it inert (focus stays inside) and
 *   maps Escape to close; focus returns to the trigger.
 */
export function TeaserPlayer({ className, children, trailer = TRAILERS.crownfallTeaser }: Props) {
  const kind = trailer.kind;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const notesId = useId();

  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false); // defers even the poster download until first open
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showNotes, setShowNotes] = useState(false);

  const play = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      await video.play();
    } catch {
      // Sound was refused by the browser: keep watching, muted, and show the sound button state.
      video.muted = true;
      setMuted(true);
      await video.play().catch(() => undefined);
    }
  }, []);

  const openPlayer = () => {
    const dialog = dialogRef.current;
    const video = videoRef.current;
    if (!dialog || !video) return;
    if (!video.getAttribute("src")) {
      video.src = pickVideoSource(video, { webm: trailer.webm, mp4: trailer.mp4 });
    }
    dialog.showModal();
    setOpen(true);
    setHasOpened(true);
    document.documentElement.style.overflow = "hidden";
    window.dispatchEvent(new Event(TEASER_OPEN_EVENT));
    if (!prefersReducedMotion()) {
      video.muted = false;
      video.volume = 0.8;
      setMuted(false);
      void play();
    }
  };

  const closePlayer = useCallback(() => {
    const dialog = dialogRef.current;
    videoRef.current?.pause();
    if (dialog?.open) dialog.close();
    setOpen(false);
    setShowNotes(false);
    document.documentElement.style.overflow = "";
    window.dispatchEvent(new Event(TEASER_CLOSE_EVENT));
    triggerRef.current?.focus();
  }, []);

  // Never leave the page scroll-locked if the component unmounts mid-playback.
  useEffect(() => () => {
    document.documentElement.style.overflow = "";
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      if (ended) video.currentTime = 0;
      void play();
    } else video.pause();
  };

  const replay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    void play();
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const seekTo = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.min(Math.max(seconds, 0), duration || seconds);
    setCurrent(video.currentTime);
  };

  // Strict focus trap: showModal() makes the page inert, but Tab past the last control would
  // still leave for the browser chrome. Wrap at both ends instead.
  const trapTab = (event: KeyboardEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const focusable = Array.from(
      dialog.querySelectorAll<HTMLElement>('button, input, a[href], [tabindex]:not([tabindex="-1"])'),
    ).filter((el) => !el.hasAttribute("disabled") && !el.closest("[hidden]") && el.getClientRects().length > 0);
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
      event.preventDefault();
      first.focus();
    }
  };

  // Media-player shortcuts, only when focus is not on a control that owns those keys.
  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Tab") {
      trapTab(event);
      return;
    }
    const target = event.target as HTMLElement;
    if (target.closest("button, input, a")) return;
    const video = videoRef.current;
    if (!video) return;
    if (event.key === " " || event.key === "k") {
      event.preventDefault();
      togglePlay();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      seekTo(video.currentTime + 5);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      seekTo(video.currentTime - 5);
    } else if (event.key === "m") {
      toggleSound();
    }
  };

  const controlClass =
    "flex h-11 min-w-11 items-center justify-center gap-2 rounded-full px-3 text-cloud-white transition hover:bg-cloud-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-toxic-lime";

  return (
    <>
      <button ref={triggerRef} type="button" onClick={openPlayer} className={className} aria-haspopup="dialog">
        {children}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="teaser-dialog"
        onCancel={(event) => {
          event.preventDefault();
          closePlayer();
        }}
        onClick={(event) => {
          // Clicks on the dark surround (the dialog element itself) close the theater.
          if (event.target === dialogRef.current) closePlayer();
        }}
        onKeyDown={onKeyDown}
      >
        <div className="teaser-stage">
          <div className="flex items-center justify-between gap-4 px-1 pb-3">
            <h2 id={titleId} className="font-display text-sm font-bold uppercase tracking-[0.18em] text-cloud-white/80">
              {trailer.title} <span className="text-cloud-white/60">· {kind === "teaser" ? "Teaser" : "Trailer"}</span>
            </h2>
            <button type="button" onClick={closePlayer} className={controlClass} aria-label={`Close ${kind}`}>
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="relative aspect-video w-full overflow-hidden bg-black">
            <video
              ref={videoRef}
              className="h-full w-full cursor-pointer object-contain"
              poster={hasOpened ? trailer.poster : undefined}
              playsInline
              preload="none"
              disablePictureInPicture
              onClick={togglePlay}
              onPlay={() => {
                setPlaying(true);
                setEnded(false);
              }}
              onPause={() => setPlaying(false)}
              onEnded={() => {
                setPlaying(false);
                setEnded(true);
              }}
              onTimeUpdate={(event) => setCurrent(event.currentTarget.currentTime)}
              onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
              onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
            >
              <p>Your browser cannot play this video.</p>
            </video>

            {open && (!playing || ended) ? (
              <button
                type="button"
                onClick={ended ? replay : togglePlay}
                className="absolute inset-0 m-auto flex h-20 w-20 items-center justify-center rounded-full border border-cloud-white/40 bg-black/55 text-cloud-white backdrop-blur-sm transition hover:border-cloud-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-toxic-lime"
                aria-label={ended ? `Replay ${kind}` : `Play ${kind}`}
              >
                {ended ? <RotateCcw className="h-8 w-8" aria-hidden="true" /> : <Play className="h-8 w-8 translate-x-0.5" aria-hidden="true" />}
              </button>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-1 pt-3 sm:gap-2">
            <button type="button" onClick={togglePlay} className={controlClass} aria-label={playing ? `Pause ${kind}` : `Play ${kind}`}>
              {playing ? <Pause className="h-5 w-5" aria-hidden="true" /> : <Play className="h-5 w-5" aria-hidden="true" />}
            </button>
            <button type="button" onClick={replay} className={controlClass} aria-label={`Restart ${kind}`}>
              <RotateCcw className="h-5 w-5" aria-hidden="true" />
            </button>

            <label className="flex min-w-[10rem] flex-1 items-center gap-3 px-2">
              <span className="sr-only">Seek</span>
              <input
                type="range"
                min={0}
                max={duration || 30.5}
                step={0.1}
                value={current}
                onChange={(event) => seekTo(Number(event.target.value))}
                aria-valuetext={`${formatTime(current)} of ${formatTime(duration)}`}
                className="teaser-seek w-full"
              />
            </label>
            <span className="min-w-[5.5rem] text-center font-mono text-xs tabular-nums text-cloud-white/70" aria-hidden="true">
              {formatTime(current)} / {formatTime(duration)}
            </span>

            <button type="button" onClick={toggleSound} className={controlClass} aria-label={muted ? "Turn sound on" : "Mute sound"}>
              {muted ? <VolumeX className="h-5 w-5" aria-hidden="true" /> : <Volume2 className="h-5 w-5" aria-hidden="true" />}
            </button>
            <button
              type="button"
              onClick={() => setShowNotes((value) => !value)}
              className={controlClass}
              aria-expanded={showNotes}
              aria-controls={notesId}
            >
              <ListVideo className="h-5 w-5" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider">Scene notes</span>
            </button>
          </div>

          <div id={notesId} hidden={!showNotes} className="mt-3 max-h-[32vh] overflow-y-auto border-t border-cloud-white/10 pt-3">
            <p className="px-1 pb-2 text-xs text-cloud-white/65">A written description of the {kind}. Select a moment to jump to it.</p>
            <ol>
              {trailer.scenes.map((scene) => (
                <li key={scene.at}>
                  <button
                    type="button"
                    onClick={() => seekTo(scene.at)}
                    className="flex w-full gap-4 rounded px-1 py-2 text-left text-sm text-cloud-white/85 transition hover:bg-cloud-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-toxic-lime"
                  >
                    <span className="w-10 flex-none font-mono text-xs text-cloud-white/50">{formatTime(scene.at)}</span>
                    <span>{scene.label}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <p className="px-1 pt-3 text-xs text-cloud-white/65">{trailer.note}</p>
        </div>
      </dialog>
    </>
  );
}
