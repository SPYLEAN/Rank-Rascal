"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check, RotateCcw } from "lucide-react";
import { BRAND_ASSETS } from "@/lib/brand-assets";
import { razzReact } from "@/lib/razz";

const CLUES = [
  { id: "varnish", title: "Fresh varnish over rotten wood", detail: "The royal seal was painted over an older warning carved into the post." },
  { id: "compass", title: "A courier's compass, spinning", detail: "Boot prints leave the gold road and go down toward the gorge." },
  { id: "hollow", title: "A hollow ring underfoot", detail: "The paving is paper-thin. There is empty air beneath it." },
] as const;

const THEORIES = [
  {
    id: "illusion",
    label: "The causeway is an illusion hiding a collapsed crossing",
    correct: true,
    feedback: "",
  },
  {
    id: "flood",
    label: "Floods washed away the courier's markers",
    correct: false,
    feedback: "Good instinct, wrong culprit. Floodwater can't make stone ring hollow. Look at the paving again.",
  },
  {
    id: "bandits",
    label: "Bandits swapped the signs to trap travellers",
    correct: false,
    feedback: "Bandits can fake a sign, but not a royal seal, and not empty air under solid-looking stone.",
  },
] as const;

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
          alt="A carved wooden signpost on a forest path, pointing toward a sunlit castle road while footprints lead the other way"
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
            The official marker says the causeway is safe. Three clues say otherwise. Prove what the world is hiding. No penalty for being wrong.
          </p>

          <div className="mt-8" aria-live="polite">
            <div className={`sign-plank ${revealed ? "is-true" : ""}`}>
              {revealed ? (
                <>
                  <p className="font-display text-sm font-extrabold uppercase tracking-[0.18em]">Old ford</p>
                  <p className="mt-1 text-sm">Causeway collapsed. Cross at the river.</p>
                </>
              ) : (
                <>
                  <p className="font-display text-sm font-extrabold uppercase tracking-[0.18em]">Royal causeway</p>
                  <p className="mt-1 text-sm">Verified sound by decree. Stay on the gold road.</p>
                </>
              )}
            </div>
          </div>

          {revealed ? (
            <div className="mt-10">
              <p className="section-kicker !text-signal-lime">Truth revealed</p>
              <h3 ref={resultRef} tabIndex={-1} className="mt-3 font-display text-2xl font-bold text-cloud-white sm:text-3xl">
                The false causeway folds away. The old ford is back.
              </h3>
              <p className="mt-4 text-base leading-relaxed text-cloud-white/80">
                The river returns to its canal, and the missing courier&apos;s raft drifts into view with an unedited map inside. In the game, that correction stays: the world remembers you proved it.
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
                <p className="mt-3 text-sm text-cloud-white/60">{found.length} of 3 clues chosen · two or more needed</p>
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
