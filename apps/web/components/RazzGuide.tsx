"use client";

import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Loader2, SendHorizontal, X } from "lucide-react";
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
const MAX_QUESTION = 300;

type Turn = { role: "user" | "assistant"; content: string };
type Asked = {
  question: string;
  answer: string;
  source: "ai" | "scripted" | null;
  link: { label: string; href: string } | null;
  note: string | null;
  loading: boolean;
};

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
 * Ask Razz — a small storybook drawer, not a support chat.
 * Six curated questions answer instantly. Anything else typed in goes to /api/razz, which answers
 * with AI from the game's canon (or from the script when AI isn't configured) and says which.
 * Only the latest answer is shown; a few previous turns are kept in memory for follow-ups.
 * Razz also reacts once per session after the teaser, a solved Fraud and the King Wrongway reveal.
 */
export function RazzGuide() {
  const drawerId = useId();
  const launcherRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [curatedId, setCuratedId] = useState<string | null>(null);
  const [asked, setAsked] = useState<Asked | null>(null);
  const [draft, setDraft] = useState("");
  const [history, setHistory] = useState<Turn[]>([]);
  const [aiAvailable, setAiAvailable] = useState<boolean | null>(null);
  const [bubble, setBubble] = useState<string | null>(null); // desktop speech bubble
  const [pending, setPending] = useState<string | null>(null); // small screens: shown inside the drawer
  const [quiet, setQuiet] = useState(false);
  const bubbleTimer = useRef(0);

  useEffect(() => {
    setQuiet(readStore("local", QUIET_KEY) === "1");
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

  // Ask the server once whether answers will come from AI, so the label is honest up front.
  useEffect(() => {
    if (!open || aiAvailable !== null) return;
    fetch("/api/razz")
      .then((response) => response.json())
      .then((data: { ai?: boolean }) => setAiAvailable(data.ai === true))
      .catch(() => setAiAvailable(false));
  }, [open, aiAvailable]);

  const close = useCallback(() => {
    setOpen(false);
    setCuratedId(null);
    setAsked((current) => (current?.loading ? current : null));
    setPending(null); // a reaction shown inside the drawer has been read
    launcherRef.current?.focus();
  }, []);

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
  }, [open, curatedId, asked?.loading]);

  const ask = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const question = draft.trim().slice(0, MAX_QUESTION);
    if (question.length < 2 || asked?.loading) return;
    setDraft("");
    setCuratedId(null);
    setAsked({ question, answer: "", source: null, link: null, note: null, loading: true });
    try {
      const response = await fetch("/api/razz", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question, history }),
      });
      const data = (await response.json().catch(() => ({}))) as Partial<Asked> & { error?: string };
      if (!response.ok || !data.answer) {
        const answer =
          data.error === "rate_limited"
            ? "Whoa, one question at a time. Give me a few minutes to catch my breath, then ask again."
            : "My crystal ball glitched. Try again in a moment, or pick one of my usual answers.";
        setAsked({ question, answer, source: null, link: null, note: null, loading: false });
        return;
      }
      setAsked({ question, answer: data.answer, source: data.source ?? "scripted", link: data.link ?? null, note: data.note ?? null, loading: false });
      if (data.source === "ai") {
        setHistory((current) => [...current, { role: "user" as const, content: question }, { role: "assistant" as const, content: data.answer as string }].slice(-6));
      }
    } catch {
      setAsked({ question, answer: "I can't reach the realm right now. Check your connection and try again.", source: null, link: null, note: null, loading: false });
    }
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

  const curated = RAZZ_QUESTIONS.find((item) => item.id === curatedId);
  const back = () => {
    setCuratedId(null);
    setAsked(null);
  };
  const showingAnswer = Boolean(curated || asked);

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
        placeholder={showingAnswer ? "Ask a follow-up…" : "Ask anything about Crownfall…"}
        className="min-h-11 w-full min-w-0 rounded-sm border-2 border-ink-plum/30 bg-white/70 px-3 text-sm text-ink-plum outline-none placeholder:text-ink-plum/50 focus:border-wood"
      />
      <button
        type="submit"
        disabled={draft.trim().length < 2 || asked?.loading}
        aria-label="Send question"
        className="flex h-11 w-11 flex-none items-center justify-center rounded-sm bg-ink-plum text-paper-cream transition hover:bg-wood disabled:opacity-40"
      >
        <SendHorizontal className="h-4 w-4" aria-hidden="true" />
      </button>
    </form>
  );

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
          className="storybook relative max-h-[min(36rem,calc(100svh-6.5rem))] w-[min(23rem,calc(100vw-2rem))] overflow-y-auto overscroll-contain px-5 pb-4 pt-5"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <Image src={BRAND_ASSETS.poses.heroPoint} alt="" width={48} height={48} className="h-12 w-12 object-contain" />
              <div>
                <p id={`${drawerId}-title`} className="font-display text-lg font-extrabold">Ask Razz</p>
                <p className="text-xs text-ink-plum/75">Your guide. Occasionally a hazard.</p>
              </div>
            </div>
            <button type="button" onClick={close} aria-label="Close Ask Razz" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-ink-plum/10">
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {curated ? (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-plum/70">{curated.question}</p>
              <p data-autofocus tabIndex={-1} className="mt-2 text-[0.95rem] leading-relaxed outline-none">
                {curated.answer}
              </p>
              <AnswerActions onBack={back} link={curated.link ?? null} onNavigate={close} />
              {askForm}
            </div>
          ) : asked ? (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-plum/70">{asked.question}</p>
              <div ref={answerRef} aria-live="polite" aria-busy={asked.loading}>
                {asked.loading ? (
                  <p data-autofocus tabIndex={-1} className="mt-2 inline-flex items-center gap-2 text-[0.95rem] italic outline-none">
                    <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" /> Razz is checking the evidence…
                  </p>
                ) : (
                  <>
                    {asked.note ? <p className="mt-2 text-xs italic text-ink-plum/75">{asked.note}</p> : null}
                    <p data-autofocus tabIndex={-1} className="mt-2 whitespace-pre-line text-[0.95rem] leading-relaxed outline-none">
                      {asked.answer}
                    </p>
                    {asked.source === "ai" ? (
                      <p className="mt-2 text-[0.7rem] text-ink-plum/70">AI answer from the game&apos;s canon. Razz can be wrong; the site is the source of truth.</p>
                    ) : null}
                  </>
                )}
              </div>
              {!asked.loading ? <AnswerActions onBack={back} link={asked.link} onNavigate={close} /> : null}
              {askForm}
            </div>
          ) : (
            <div className="mt-4">
              {pending ? <p className="mb-3 border-l-2 border-wood pl-3 text-sm italic">{pending}</p> : null}
              <p className="text-[0.95rem] leading-relaxed">{RAZZ_GREETING}</p>
              {askForm}
              <ul className="mt-3 divide-y divide-ink-plum/15 border-y border-ink-plum/15" aria-label="Quick questions">
                {RAZZ_QUESTIONS.map((item, index) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      data-autofocus={index === 0 ? true : undefined}
                      onClick={() => setCuratedId(item.id)}
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

          <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs text-ink-plum/75">
            <span>{aiAvailable ? "Typed questions are answered by AI." : "Quick answers from Razz's script."}</span>
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

function AnswerActions({ onBack, link, onNavigate }: { onBack: () => void; link: { label: string; href: string } | null; onNavigate: () => void }) {
  return (
    <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3">
      <button type="button" onClick={onBack} className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold hover:underline">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to questions
      </button>
      {link ? (
        <Link href={link.href} onClick={onNavigate} className="inline-flex min-h-10 items-center gap-1.5 text-sm font-bold text-wood hover:underline">
          {link.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
}
