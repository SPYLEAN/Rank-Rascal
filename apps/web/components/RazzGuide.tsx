"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { BRAND_ASSETS } from "@/lib/brand-assets";
import { TEASER_CLOSE_EVENT } from "@/lib/media-preferences";
import {
  RAZZ_GREETING,
  RAZZ_QUESTIONS,
  RAZZ_REACT_EVENT,
  RAZZ_REACTIONS,
  type RazzReaction,
} from "@/lib/razz";

const QUIET_KEY = "rr.razz.quiet"; // localStorage: the visitor turned interruptions off
const SEEN_PREFIX = "rr.razz.seen."; // sessionStorage: each reaction at most once per session
const SMALL_QUERY = "(max-width: 639px)";

function readStore(store: "local" | "session", key: string): string | null {
  try {
    return (store === "local" ? window.localStorage : window.sessionStorage).getItem(key);
  } catch {
    return null;
  }
}

function writeStore(store: "local" | "session", key: string, value: string | null): void {
  try {
    const target = store === "local" ? window.localStorage : window.sessionStorage;
    if (value === null) target.removeItem(key);
    else target.setItem(key, value);
  } catch {
    // Storage blocked: preferences simply won't persist.
  }
}

/**
 * Ask Razz — a small storybook interruption, not a support chat.
 * One greeting, six curated questions with canonical answers, and short in-world reactions
 * after the teaser, a solved Fraud and the King Wrongway reveal. Razz is scripted: there is no
 * free-text input and nothing is generated.
 */
export function RazzGuide() {
  const drawerId = useId();
  const launcherRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [answerId, setAnswerId] = useState<string | null>(null);
  const [bubble, setBubble] = useState<string | null>(null); // desktop speech bubble
  const [pending, setPending] = useState<string | null>(null); // small screens: shown inside the drawer
  const [quiet, setQuiet] = useState(false);
  const bubbleTimer = useRef(0);

  useEffect(() => {
    setQuiet(readStore("local", QUIET_KEY) === "1");
  }, []);

  const react = useCallback(
    (reaction: RazzReaction) => {
      if (readStore("local", QUIET_KEY) === "1") return;
      if (readStore("session", SEEN_PREFIX + reaction) === "1") return;
      writeStore("session", SEEN_PREFIX + reaction, "1");
      const line = RAZZ_REACTIONS[reaction];
      if (window.matchMedia(SMALL_QUERY).matches) {
        // Never cover content on phones: a quiet dot on the launcher instead of a bubble.
        setPending(line);
        return;
      }
      window.clearTimeout(bubbleTimer.current);
      setBubble(line);
      bubbleTimer.current = window.setTimeout(() => setBubble(null), 7000);
    },
    [],
  );

  useEffect(() => {
    const onReact = (event: Event) => react((event as CustomEvent<RazzReaction>).detail);
    const onTeaserClose = () => react("teaserClosed");
    window.addEventListener(RAZZ_REACT_EVENT, onReact);
    window.addEventListener(TEASER_CLOSE_EVENT, onTeaserClose);
    return () => {
      window.removeEventListener(RAZZ_REACT_EVENT, onReact);
      window.removeEventListener(TEASER_CLOSE_EVENT, onTeaserClose);
      window.clearTimeout(bubbleTimer.current);
    };
  }, [react]);

  const close = useCallback(() => {
    setOpen(false);
    setAnswerId(null);
    setPending(null); // a reaction shown inside the drawer has been read
    launcherRef.current?.focus();
  }, []);

  // Escape and outside clicks close the drawer; focus moves into it when it opens.
  useEffect(() => {
    if (!open) return;
    drawerRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!drawerRef.current?.contains(target) && !launcherRef.current?.contains(target)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, close]);

  // Keep focus sensible when switching between the question list and an answer.
  useEffect(() => {
    if (open) drawerRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
  }, [answerId, open]);

  const toggleQuiet = () => {
    const next = !quiet;
    setQuiet(next);
    writeStore("local", QUIET_KEY, next ? "1" : null);
    if (next) {
      setBubble(null);
      setPending(null);
    }
  };

  const answer = RAZZ_QUESTIONS.find((item) => item.id === answerId);

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-[60] flex flex-col items-end gap-3 sm:right-6">
      {bubble && !open ? (
        <div role="status" className="storybook relative max-w-[16rem] px-4 py-3 text-sm leading-snug">
          <p className="pr-5">{bubble}</p>
          <button
            type="button"
            onClick={() => setBubble(null)}
            aria-label="Dismiss Razz's comment"
            className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full text-ink-plum/70 hover:text-ink-plum"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      ) : null}

      {open ? (
        <div
          ref={drawerRef}
          id={drawerId}
          role="dialog"
          aria-modal="false"
          aria-labelledby={`${drawerId}-title`}
          className="storybook relative w-[min(22rem,calc(100vw-2rem))] px-5 pb-4 pt-5"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <Image src={BRAND_ASSETS.poses.heroPoint} alt="" width={48} height={48} className="h-12 w-12 object-contain" />
              <div>
                <p id={`${drawerId}-title`} className="font-display text-lg font-extrabold">Razz</p>
                <p className="text-xs text-ink-plum/65">Your guide. Occasionally a hazard.</p>
              </div>
            </div>
            <button type="button" onClick={close} aria-label="Close Ask Razz" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-ink-plum/10">
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {answer ? (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-plum/60">{answer.question}</p>
              <p data-autofocus tabIndex={-1} className="mt-2 text-[0.95rem] leading-relaxed outline-none">
                {answer.answer}
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <button type="button" onClick={() => setAnswerId(null)} className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold hover:underline">
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Ask something else
                </button>
                {answer.link ? (
                  <Link href={answer.link.href} onClick={close} className="inline-flex min-h-10 items-center gap-1.5 text-sm font-bold text-wood hover:underline">
                    {answer.link.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="mt-4">
              {pending ? <p className="mb-3 border-l-2 border-wood pl-3 text-sm italic">{pending}</p> : null}
              <p className="text-[0.95rem] leading-relaxed">{RAZZ_GREETING}</p>
              <ul className="mt-3 divide-y divide-ink-plum/15 border-y border-ink-plum/15">
                {RAZZ_QUESTIONS.map((item, index) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      data-autofocus={index === 0 ? true : undefined}
                      onClick={() => setAnswerId(item.id)}
                      className="flex min-h-11 w-full items-center justify-between gap-2 py-2 text-left text-sm font-semibold hover:text-wood"
                    >
                      {item.question}
                      <ArrowRight className="h-3.5 w-3.5 flex-none opacity-60" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-3 flex items-center justify-between gap-3 text-xs text-ink-plum/65">
            <span>Scripted character, not an AI.</span>
            <label className="inline-flex min-h-9 cursor-pointer items-center gap-1.5">
              <input type="checkbox" checked={!quiet} onChange={toggleQuiet} className="h-3.5 w-3.5 accent-wood" />
              Let Razz interrupt
            </label>
          </div>
        </div>
      ) : null}

      <button
        ref={launcherRef}
        type="button"
        onClick={() => {
          if (open) close();
          else {
            setBubble(null);
            setOpen(true);
          }
        }}
        aria-expanded={open}
        aria-controls={open ? drawerId : undefined}
        aria-label={pending && !open ? "Ask Razz (Razz has something to say)" : "Ask Razz"}
        className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink-plum bg-paper-cream shadow-[3px_3px_0_#1B1426] transition hover:-translate-y-0.5"
      >
        <Image src={BRAND_ASSETS.insignias.razzMedallion} alt="" width={44} height={44} className="h-11 w-11 object-contain" />
        {pending && !open ? <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-paper-cream bg-signal-lime" aria-hidden="true" /> : null}
      </button>
    </div>
  );
}
