"use client";

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import { ChevronLeft, ChevronRight, Loader2, X, ZoomIn, ZoomOut } from "lucide-react";
import { CONCEPT_STATUS, type ConceptEntry } from "@/lib/concepts";

type Props = {
  items: readonly ConceptEntry[];
  index: number;
  onIndex: (index: number) => void;
  onClose: () => void;
};

/**
 * Full-sheet viewer for Rascal Labs files. The complete image, never cropped or distorted, on a
 * solid dark backdrop. The full-resolution file loads only now (cards use thumbnails).
 * Keyboard: ← → to move, Esc to close, Z to zoom. Touch: swipe to move. Focus is trapped inside
 * and returned to the opener by the parent.
 */
export function ConceptViewer({ items, index, onIndex, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const [zoomed, setZoomed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const touchX = useRef<number | null>(null);
  const entry = items[index];
  const count = items.length;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    setZoomed(false);
    setLoaded(false);
  }, [index]);

  const go = useCallback(
    (step: number) => {
      if (count > 1) onIndex((index + step + count) % count);
    },
    [count, index, onIndex],
  );

  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Tab") {
      const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("button:not([disabled]), a[href]") ?? []);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
      return;
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    } else if (event.key === "z" || event.key === "Z") {
      setZoomed((value) => !value);
    }
  };

  const onTouchStart = (event: TouchEvent) => {
    touchX.current = zoomed ? null : event.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (event: TouchEvent) => {
    if (touchX.current === null) return;
    const delta = (event.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
    if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1);
    touchX.current = null;
  };

  if (!entry) return null;
  // Small panel crops may be shown up to 2× in fit mode; large sheets never exceed their pixels.
  const fitCap = entry.image.width < 800 ? 2 : 1;
  const zoomWidth = entry.image.width < 800 ? entry.image.width * 3 : entry.image.width;
  const control =
    "flex h-11 min-w-11 items-center justify-center gap-2 rounded-full px-3 text-paper-cream transition hover:bg-paper-cream/10 disabled:opacity-35";

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="concept-viewer"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={onKeyDown}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-3 px-3 py-2 sm:px-5">
          <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-antique-gold">
              Rascal Labs · File {entry.file}
              {count > 1 ? <span className="text-paper-cream/60"> · {index + 1} / {count}</span> : null}
            </p>
            <h2 id={titleId} className="truncate font-display text-base font-bold text-paper-cream sm:text-lg">
              {entry.title}
            </h2>
          </div>
          <div className="flex flex-none items-center gap-1">
            <button type="button" className={control} onClick={() => setZoomed((value) => !value)} aria-pressed={zoomed} aria-label={zoomed ? "Fit to screen" : "Zoom in"}>
              {zoomed ? <ZoomOut className="h-5 w-5" aria-hidden="true" /> : <ZoomIn className="h-5 w-5" aria-hidden="true" />}
            </button>
            <button ref={closeRef} type="button" className={control} onClick={onClose} aria-label="Close viewer">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          className={`relative flex min-h-0 flex-1 ${zoomed ? "overflow-auto" : "items-center justify-center overflow-hidden"} px-2 sm:px-16`}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {!loaded ? (
            <Loader2 className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-spin text-paper-cream/60 motion-reduce:animate-none" aria-hidden="true" />
          ) : null}
          {/* eslint-disable-next-line @next/next/no-img-element -- full-resolution WebP, loaded on demand */}
          <img
            key={entry.id}
            src={entry.image.src}
            alt={entry.alt}
            width={entry.image.width}
            height={entry.image.height}
            onLoad={() => setLoaded(true)}
            onClick={() => setZoomed((value) => !value)}
            className={`m-auto block cursor-zoom-in select-none rounded-sm ${zoomed ? "max-w-none cursor-zoom-out" : "h-auto"} ${loaded ? "opacity-100" : "opacity-0"} transition-opacity`}
            style={
              zoomed
                ? { width: `${zoomWidth}px`, height: "auto" }
                : {
                    // Width is the smallest of: the stage, the upscale cap, and whatever
                    // keeps the height inside the screen, so the box never letterboxes.
                    width: `min(100%, ${entry.image.width * fitCap}px, calc((100svh - 9.5rem) * ${(entry.image.width / entry.image.height).toFixed(4)}))`,
                    height: "auto",
                  }
            }
          />
          {count > 1 ? (
            <>
              <button type="button" onClick={() => go(-1)} aria-label="Previous file" className={`${control} absolute left-1 top-1/2 -translate-y-1/2 bg-black/55 sm:left-3`}>
                <ChevronLeft className="h-6 w-6" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next file" className={`${control} absolute right-1 top-1/2 -translate-y-1/2 bg-black/55 sm:right-3`}>
                <ChevronRight className="h-6 w-6" aria-hidden="true" />
              </button>
            </>
          ) : null}
        </div>

        <p className="px-4 py-2.5 text-center text-xs text-paper-cream/75 sm:text-sm">
          <span className="font-semibold uppercase tracking-[0.12em] text-antique-gold">{CONCEPT_STATUS[entry.status]}</span>
          <span aria-hidden="true"> · </span>
          Concept art. It may change during development.
        </p>
      </div>
    </dialog>
  );
}
