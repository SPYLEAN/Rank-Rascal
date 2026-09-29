"use client";

import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight, SendHorizontal, X } from "lucide-react";
import { BRAND_ASSETS } from "@/lib/brand-assets";
import { TEASER_CLOSE_EVENT } from "@/lib/media-preferences";
import { RAZZ_GREETING, RAZZ_LAUNCHER_GREETING, RAZZ_REACT_EVENT, RAZZ_REACTIONS, type RazzReaction } from "@/lib/razz";
import { QUICK_QUESTION_IDS, type CanonEntry, type CanonStatus } from "@/lib/razz-canon";
import { EMPTY_CONTEXT, answerById, askRazz, contextFor, type RazzContext, type RazzResult } from "@/lib/razz-engine";

const QUIET_KEY = "rr.razz.quiet"; // localStorage: the visitor turned interruptions off
const SEEN_PREFIX = "rr.razz.seen."; // sessionStorage: each reaction at most once per session
const GREETED_KEY = "rr.razz.greeted"; // sessionStorage: the launcher greeting was shown
const SMALL_QUERY = "(max-width: 639px)";
const MAX_QUESTION = 300;
const AVOID_SELECTOR = "[data-razz-avoid]";

const STATUS_LABEL: Record<CanonStatus, string> = {
  confirmed: "Confirmed",
  planned: "Planned",
  concept: "Concept",
  unannounced: "Not announced",
};

type Shown = { question: string; result: RazzResult };

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

const quickEntries = QUICK_QUESTION_IDS.map((id) => answerById(id)).filter((entry): entry is CanonEntry => Boolean(entry));

/**
 * Ask Razz — a small storybook drawer, not a support chat.
 * Every answer comes from the Crownfall canon (lib/razz-canon.ts), matched in the browser by
 * lib/razz-engine.ts. Nothing typed here leaves the visitor's device. Only the latest answer is
 * shown; the current topic is kept in memory for follow-ups.
 *
 * Razz also reacts once per session after the teaser, a solved Fraud and the King Wrongway reveal,
 * and steps aside whenever the launcher would overlap an element marked data-razz-avoid (forms).
 */
export function RazzGuide() {
  const drawerId = useId();
  const pathname = usePathname();
  const launcherRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState<Shown | null>(null);
  const [context, setContext] = useState<RazzContext>(EMPTY_CONTEXT);
  const [draft, setDraft] = useState("");
  const [docked, setDocked] = useState(false);
  const [bubble, setBubble] = useState<string | null>(null); // desktop speech bubble
  const [pending, setPending] = useState<string | null>(null); // small screens: shown inside the drawer
  const [quiet, setQuiet] = useState(false);
  const bubbleTimer = useRef(0);

  const [greeting, setGreeting] = useState(false);

  useEffect(() => {
    setQuiet(readStore("local", QUIET_KEY) === "1");
  }, []);

  // A one-line hello beside the launcher: after 1.5 s, gone after 7 s, once per browser session,
  // never while the drawer is open or the launcher has stepped aside for a form.
  useEffect(() => {
    if (readStore("local", QUIET_KEY) === "1" || readStore("session", GREETED_KEY) === "1") return;
    const show = window.setTimeout(() => {
      writeStore("session", GREETED_KEY, "1");
      setGreeting(true);
    }, 1500);
    const hide = window.setTimeout(() => setGreeting(false), 1500 + 7000);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, []);

  const react = useCallback((reaction: RazzReaction) => {
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
  }, []);

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

  // Step aside while the launcher would sit on top of a form (or anything marked
  // data-razz-avoid). Measured geometrically, so it holds at every width, scroll position and
  // form state (errors, confirmations) — not just on known breakpoints.
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const launcher = launcherRef.current;
      if (!launcher) return;
      const zone = launcher.getBoundingClientRect();
      const gap = 12;
      const hit = Array.from(document.querySelectorAll<HTMLElement>(AVOID_SELECTOR)).some((element) => {
        const box = element.getBoundingClientRect();
        return box.left < zone.right + gap && box.right > zone.left - gap && box.top < zone.bottom + gap && box.bottom > zone.top - gap;
      });
      setDocked(hit);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const resize = new ResizeObserver(schedule);
    resize.observe(document.body);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      resize.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  const close = useCallback(() => {
    setOpen(false);
    setShown(null);
    setPending(null); // a reaction shown inside the drawer has been read
    launcherRef.current?.focus();
  }, []);

  // A speech bubble never lingers over a form either.
  useEffect(() => {
    if (docked && !open) setBubble(null);
  }, [docked, open]);

  // Escape and outside clicks close the drawer.
  useEffect(() => {
    if (!open) return;
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

  // Move focus sensibly when the drawer opens or its view changes.
  useEffect(() => {
    if (!open) return;
    drawerRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
  }, [open, shown]);

  const showEntry = (entry: CanonEntry) => {
    setShown({ question: entry.question, result: { kind: "answer", entry, suggestions: relatedFor(entry), context: contextFor(entry) } });
    setContext(contextFor(entry));
  };

  const ask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const question = draft.trim().slice(0, MAX_QUESTION);
    if (!question) return;
    setDraft("");
    // Answered locally from the canon; nothing is sent over the network.
    const result = askRazz(question, context);
    setShown({ question, result });
    setContext(result.context);
  };

  const toggleQuiet = () => {
    const next = !quiet;
    setQuiet(next);
    writeStore("local", QUIET_KEY, next ? "1" : null);
    if (next) {
      setBubble(null);
      setPending(null);
    }
  };

  const askForm = (
    <form onSubmit={ask} className="mt-4 flex items-center gap-2">
      <label htmlFor={`${drawerId}-input`} className="sr-only">
        Ask Razz a question about the game
      </label>
      <input
        id={`${drawerId}-input`}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        maxLength={MAX_QUESTION}
        autoComplete="off"
        placeholder={shown ? "Ask a follow-up…" : "Ask anything about Crownfall…"}
        className="min-h-11 w-full min-w-0 rounded-sm border-2 border-ink-plum/30 bg-white/70 px-3 text-sm text-ink-plum outline-none placeholder:text-ink-plum/50 focus:border-wood"
      />
      <button
        type="submit"
        disabled={!draft.trim()}
        aria-label="Send question"
        className="flex h-11 w-11 flex-none items-center justify-center rounded-sm bg-ink-plum text-paper-cream transition hover:bg-wood disabled:opacity-40"
      >
        <SendHorizontal className="h-4 w-4" aria-hidden="true" />
      </button>
    </form>
  );

  const suggestionList = (entries: CanonEntry[], label: string) =>
    entries.length ? (
      <ul className="mt-3 divide-y divide-ink-plum/15 border-y border-ink-plum/15" aria-label={label}>
        {entries.map((entry, index) => (
          <li key={entry.id}>
            <button
              type="button"
              data-autofocus={!shown && index === 0 ? true : undefined}
              onClick={() => showEntry(entry)}
              className="flex min-h-11 w-full items-center justify-between gap-2 py-2 text-left text-sm font-semibold hover:text-wood"
            >
              {entry.question}
              <ArrowRight className="h-3.5 w-3.5 flex-none opacity-60" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
    ) : null;

  const result = shown?.result;
  const hideLauncher = docked && !open;

  return (
    <div className="pointer-events-none fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-[60] flex flex-col items-end gap-3 sm:right-6">
      {greeting && !bubble && !open && !docked ? (
        <div className="storybook pointer-events-auto relative max-w-[15rem] text-sm leading-snug">
          <button
            type="button"
            onClick={() => {
              setGreeting(false);
              setOpen(true);
            }}
            className="block w-full px-4 py-3 pr-9 text-left"
          >
            {RAZZ_LAUNCHER_GREETING}
          </button>
          <button
            type="button"
            onClick={() => setGreeting(false)}
            aria-label="Dismiss greeting"
            className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full text-ink-plum/70 hover:text-ink-plum"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      ) : null}

      {bubble && !open && !docked ? (
        <div role="status" className="storybook pointer-events-auto relative max-w-[16rem] px-4 py-3 text-sm leading-snug">
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
          className="storybook pointer-events-auto relative max-h-[min(36rem,calc(100svh-6.5rem))] w-[min(23rem,calc(100vw-2rem))] overflow-y-auto overscroll-contain px-5 pb-4 pt-5"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* flex-none: at 320px the header row would otherwise squeeze the image's width only. */}
              <Image src={BRAND_ASSETS.poses.heroPoint} alt="" width={48} height={48} className="h-12 w-12 flex-none object-contain" />
              <div>
                <p id={`${drawerId}-title`} className="font-display text-lg font-extrabold">Ask Razz</p>
                <p className="text-xs text-ink-plum/75">Your guide. Occasionally a hazard.</p>
              </div>
            </div>
            <button type="button" onClick={close} aria-label="Close Ask Razz" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-ink-plum/10">
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {shown && result ? (
            <div className="mt-4" aria-live="polite">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-plum/70">{shown.question}</p>
              {result.kind === "answer" ? (
                <>
                  <p data-autofocus tabIndex={-1} className="mt-2 text-[0.95rem] leading-relaxed outline-none">
                    {result.entry.answer}
                  </p>
                  <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.7rem] text-ink-plum/75">
                    <span>Answer from the Crownfall canon</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold uppercase tracking-[0.1em]">{STATUS_LABEL[result.entry.status]}</span>
                  </p>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3">
                    <button type="button" onClick={() => setShown(null)} className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold hover:underline">
                      <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to questions
                    </button>
                    <Link href={result.entry.link.href} onClick={close} className="inline-flex min-h-10 items-center gap-1.5 text-sm font-bold text-wood hover:underline">
                      {result.entry.link.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                  {result.suggestions.length ? <p className="mt-3 text-xs font-semibold text-ink-plum/75">Related</p> : null}
                  {suggestionList(result.suggestions, "Related questions")}
                </>
              ) : (
                <>
                  <p data-autofocus tabIndex={-1} className="mt-2 text-[0.95rem] leading-relaxed outline-none">
                    {result.message}
                  </p>
                  {suggestionList(result.suggestions, "Suggested questions")}
                  <button type="button" onClick={() => setShown(null)} className="mt-2 inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold hover:underline">
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to questions
                  </button>
                </>
              )}
              {askForm}
            </div>
          ) : (
            <div className="mt-4">
              {pending ? <p className="mb-3 border-l-2 border-wood pl-3 text-sm italic">{pending}</p> : null}
              <p className="text-[0.95rem] leading-relaxed">{RAZZ_GREETING}</p>
              {askForm}
              {suggestionList(quickEntries, "Quick questions")}
            </div>
          )}

          <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs text-ink-plum/75">
            <span>Answers come from the canon, right in your browser. Nothing you type is sent anywhere.</span>
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
            setGreeting(false);
            setOpen(true);
          }
        }}
        aria-expanded={open}
        aria-controls={open ? drawerId : undefined}
        aria-label={pending && !open ? "Ask Razz (Razz has something to say)" : "Ask Razz"}
        className={`relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink-plum bg-paper-cream shadow-[3px_3px_0_#1B1426] transition hover:-translate-y-0.5 ${
          // No transform while hidden: the measured rectangle must stay put, or it would flicker.
          hideLauncher ? "invisible opacity-0" : "pointer-events-auto visible opacity-100"
        }`}
      >
        <Image src={BRAND_ASSETS.insignias.razzMedallion} alt="" width={44} height={44} className="h-11 w-11 object-contain" />
        {pending && !open ? <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-paper-cream bg-signal-lime" aria-hidden="true" /> : null}
      </button>
    </div>
  );
}

function relatedFor(entry: CanonEntry): CanonEntry[] {
  return entry.related.map((id) => answerById(id)).filter((item): item is CanonEntry => Boolean(item)).slice(0, 3);
}
