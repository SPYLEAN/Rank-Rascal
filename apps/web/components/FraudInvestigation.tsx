"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check, RotateCcw } from "lucide-react";
import { BRAND_ASSETS } from "@/lib/brand-assets";
import { razzReact } from "@/lib/razz";

// The canonical first Fraud (docs/rascal-realms/FIRST_RELEASE.md §8). Razz's advice is listed
// with the clues on purpose: characters may be wrong, and confidence is not evidence.
const CLUES = [
  { id: "footprints", title: "Footprints go left", detail: "Fresh boot prints ignore the sign and head down the left path.", evidence: true },
  { id: "branches", title: "Broken branches point left", detail: "Someone pushed through the left trail recently. The right trail is untouched.", evidence: true },
  { id: "lantern", title: "The lantern leans", detail: "Its flame keeps flickering toward the left path, even without wind.", evidence: true },
  { id: "loop", title: "The right path loops", detail: "Follow it for a minute and you're back at this same sign.", evidence: true },
  { id: "razz", title: "Razz trusts the sign", detail: "“It's an official sign. Official signs are official.”", evidence: false },
] as const;

const THEORIES = [
  {
    id: "fraud",
    label: "The sign is a Fraud. Rascal Plaza is down the left path.",
    correct: true,
    feedback: "",
  },
  {
    id: "old-prints",
    label: "The sign is right. The footprints are just old.",
    correct: false,
    feedback: "Old prints wouldn't explain the loop. Walk the right path and you end up back at this sign.",
  },
  {
    id: "both",
    label: "Both paths reach the Plaza, so it doesn't matter.",
    correct: false,
    feedback: "If both roads worked, the right one wouldn't bring you straight back here.",
  },
] as const;

const EVIDENCE_COUNT = CLUES.filter((clue) => clue.evidence).length;

type Phase = "investigating" | "rewriting" | "revealed";

/**
 * Chapter 05 — a fair, deterministic case: the right accusation needs at least two pieces of
 * evidence and the correct theory. Wrong answers explain why, without penalty or mockery.
 * The scene itself reacts: the corruption tint lifts and the sign shows what it hid.
 */
export function FraudInvestigation() {
  const [found, setFound] = useState<string[]>([]);
  const [theory, setTheory] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [phase, setPhase] = useState<Phase>("investigating");
  const timer = useRef(0);
  const resultRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const toggle = (id: string) => {
    setFeedback("");
    setFound((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const accuse = () => {
    if (found.includes("razz")) {
      setFeedback("Razz sounds sure, but confidence isn't evidence. Characters can be wrong; the clues can't. Drop his advice and look again.");
      return;
    }
    if (found.length < 2) {
      setFeedback("Not enough evidence yet. Choose at least two clues that disagree with the sign.");
      return;
    }
    const chosen = THEORIES.find((item) => item.id === theory);
    if (!chosen) {
      setFeedback("Say what you think the world is lying about first.");
      return;
    }
    if (!chosen.correct) {
      setFeedback(chosen.feedback);
      return;
    }
    setFeedback("");
    setPhase("rewriting");
    timer.current = window.setTimeout(() => {
      setPhase("revealed");
      razzReact("fraudSolved");
      window.setTimeout(() => resultRef.current?.focus(), 50);
    }, 1100);
  };

  const reset = () => {
    setFound([]);
    setTheory(null);
    setFeedback("");
    setPhase("investigating");
  };

  const revealed = phase === "revealed";

  return (
    <section id="investigate" aria-labelledby="investigate-title" className="chapter scroll-mt-20">
      <div className="chapter-art" style={{ position: "absolute", inset: 0 }}>
        <Image
          src={BRAND_ASSETS.media.signpost}
          alt="A carved wooden signpost at a forest crossroads in Stickerwood, from the Crownfall teaser"
          fill
          sizes="100vw"
          className="object-cover object-[72%_center]"
        />
        {/* The lie: a Crown-violet cast that lifts when the truth is proven. */}
        <div className={`absolute inset-0 bg-crown-violet/40 mix-blend-color transition-opacity duration-1000 ${revealed ? "opacity-0" : "opacity-100"}`} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,12,20,.94)_0%,rgba(16,12,20,.82)_42%,rgba(16,12,20,.2)_75%)]" />
      </div>
      <div className="fade-edges" />

      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-32 sm:px-8 lg:grid-cols-[minmax(0,34rem)_1fr]">
        <div>
          <p className="section-kicker">05 · Investigate a Fraud</p>
          <h2 id="investigate-title" className={`chapter-title mt-4 ${phase === "rewriting" ? "corrupt-type" : ""}`}>The sign that lied</h2>
          <p className="chapter-lede">
            Your first objective: reach Rascal Plaza. At the crossroads, the sign points right. The world around it disagrees. No penalty for being wrong.
          </p>

          <div className="mt-8" aria-live="polite">
            <div className={`sign-plank ${revealed ? "is-true" : ""} ${phase === "rewriting" ? "sign-fracture" : ""}`}>
              {revealed ? (
                <>
                  <p className="font-display text-sm font-extrabold uppercase tracking-[0.18em]">&larr; Rascal Plaza</p>
                  <p className="mt-1 text-sm">The real road. It was always this way.</p>
                </>
              ) : (
                <>
                  <p className="font-display text-sm font-extrabold uppercase tracking-[0.18em]">Rascal Plaza &rarr;</p>
                  <p className="mt-1 text-sm">This way. Obviously.</p>
                </>
              )}
            </div>
          </div>

          {revealed ? (
            <div className="mt-10">
              <p className="section-kicker !text-signal-lime">Fraud exposed</p>
              <h3 ref={resultRef} tabIndex={-1} className="mt-3 font-display text-2xl font-bold text-cloud-white sm:text-3xl">
                The sign fractures. The real road appears.
              </h3>
              <p className="mt-4 text-base leading-relaxed text-cloud-white/85">
                Crown energy escapes, the false arrow breaks apart and the left path opens toward Rascal Plaza. Razz has to admit he was wrong. In the game this happens in the world itself, and the correction stays.
              </p>
              <button type="button" onClick={reset} className="action-secondary mt-8">
                <RotateCcw className="h-4 w-4" aria-hidden="true" /> Investigate again
              </button>
            </div>
          ) : (
            <div className="mt-10 space-y-8">
              <fieldset>
                <legend className="section-kicker">1 · Find the clues</legend>
                <ul className="mt-3 space-y-2">
                  {CLUES.map((clue) => {
                    const on = found.includes(clue.id);
                    return (
                      <li key={clue.id}>
                        <button
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggle(clue.id)}
                          disabled={phase === "rewriting"}
                          className={`flex w-full items-start gap-3 rounded-sm border-l-2 py-2.5 pl-4 pr-2 text-left transition ${
                            on ? "border-antique-gold bg-antique-gold/10" : "border-cloud-white/20 hover:border-cloud-white/60"
                          }`}
                        >
                          <span className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-sm border ${on ? "border-antique-gold bg-antique-gold text-ink-plum" : "border-cloud-white/40"}`}>
                            {on ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : null}
                          </span>
                          <span>
                            <span className="block font-semibold text-cloud-white">{clue.title}</span>
                            <span className="block text-sm text-cloud-white/70">{clue.detail}</span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </fieldset>

              <fieldset>
                <legend className="section-kicker">2 · What is the world lying about?</legend>
                <div className="mt-3 space-y-2">
                  {THEORIES.map((item) => (
                    <label
                      key={item.id}
                      className={`flex cursor-pointer items-start gap-3 rounded-sm py-2 pl-1 text-cloud-white/85 transition hover:text-cloud-white ${theory === item.id ? "text-cloud-white" : ""}`}
                    >
                      <input
                        type="radio"
                        name="fraud-theory"
                        value={item.id}
                        checked={theory === item.id}
                        onChange={() => {
                          setTheory(item.id);
                          setFeedback("");
                        }}
                        disabled={phase === "rewriting"}
                        className="mt-1 h-4 w-4 accent-antique-gold"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <button type="button" onClick={accuse} disabled={phase === "rewriting"} className="action-primary">
                  3 · Accuse the sign
                </button>
                <p className="mt-3 text-sm text-cloud-white/70">{found.length} chosen · pick two or more of the {EVIDENCE_COUNT} real clues</p>
                <p role="status" className={`mt-4 border-l-2 border-hot-magenta pl-4 text-sm leading-relaxed text-cloud-white ${feedback ? "" : "sr-only"}`}>
                  {feedback || (phase === "rewriting" ? "The world is correcting itself." : "")}
                </p>
              </div>
            </div>
          )}

          <p className="mt-10 text-xs text-cloud-white/50">A playable concept of The World Lies. Not in-game footage or a final interface.</p>
        </div>
      </div>
    </section>
  );
}
