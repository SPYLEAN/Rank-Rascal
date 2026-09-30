"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Compass,
  Crown,
  Eye,
  FileQuestion,
  HelpCircle,
  RotateCcw,
  Scan,
  ShieldAlert,
  Sparkles,
  Zap,
} from "lucide-react";
import { BRAND_ASSETS } from "@/lib/brand-assets";
import {
  playAccusationChime,
  playClueSelect,
  playScanPulse,
  playUiClick,
} from "@/lib/sound-effects";

interface EvidenceClue {
  id: string;
  code: string;
  title: string;
  source: string;
  officialClaim: string;
  physicalTruth: string;
  contradictionTag: string;
  severity: "MODERATE" | "HIGH" | "CRITICAL";
}

const CASE_CLUES: EvidenceClue[] = [
  {
    id: "sign",
    code: "CLUE-01",
    title: "Varnished Royal Causeway Sign",
    source: "Field Signboard · Road Marker 04",
    officialClaim: "“Causeway verified structurally sound by royal decree. Do not deviate from the gold pavement.”",
    physicalTruth: "The timber underneath the fresh gloss is rotted driftwood from the gorge below. The royal seal was applied over an older warning carved into the stone.",
    contradictionTag: "FABRICATED SAFETY CLAIM",
    severity: "HIGH",
  },
  {
    id: "compass",
    code: "CLUE-02",
    title: "Courier's Frozen Magnetic Needle",
    source: "Recovered Satchel · Dried Riverbed",
    officialClaim: "“Courier logs report safe passage delivered to the royal archives.”",
    physicalTruth: "The courier never reached the bridge. Heavy boot tracks plunge directly down the gorge slope where the compass needle spins in tight frantic loops.",
    contradictionTag: "ERASED TRANSIT RECORD",
    severity: "MODERATE",
  },
  {
    id: "seam",
    code: "CLUE-03",
    title: "Sub-Surface Glitch Seam",
    source: "Acoustic Ground Scanner · 14:08",
    officialClaim: "“Paving extends 3 meters deep into solid bedrock.”",
    physicalTruth: "The road stone is less than two millimeters thick. Striking the pavement with a pickaxe produces a hollow electronic echo. There is empty air underneath.",
    contradictionTag: "ENFORCED ILLUSION SEAM",
    severity: "CRITICAL",
  },
];

const THEORIES = [
  {
    id: "illusion",
    label: "Theory A: The Causeway is an enforced illusion hiding a collapsed gorge crossing",
    isCorrect: true,
    explanation: "King Wrongway's Crown command is forcing the illusion of a solid bridge over empty air to hide the fact that the kingdom's main trade line collapsed.",
  },
  {
    id: "weather",
    label: "Theory B: Seasonal flooding washed away the courier's markers",
    isCorrect: false,
    explanation: "Water damage cannot explain why the paving stones ring with digital feedback and repeat texture patterns every four meters.",
  },
  {
    id: "highwayman",
    label: "Theory C: Bandits swapped the signs to ambush travelers",
    isCorrect: false,
    explanation: "Bandits cannot carve authentic royal resonance seals or make bedrock sound hollow with acoustic scanners.",
  },
] as const;

export function SusInvestigationTerminal() {
  const [selectedClues, setSelectedClues] = useState<string[]>(["sign"]);
  const [selectedTheory, setSelectedTheory] = useState<string>("illusion");
  const [isRewriting, setIsRewriting] = useState(false);
  const [isResolved, setIsResolved] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const toggleClue = (id: string) => {
    playClueSelect();
    setFeedback(null);
    setSelectedClues((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const liePressure = Math.min(
    100,
    Math.round((selectedClues.length / CASE_CLUES.length) * 85 + (selectedClues.length === 3 ? 15 : 0))
  );

  const handleAccusation = () => {
    if (selectedClues.length < 2) {
      playScanPulse();
      setFeedback("Squad case incomplete: Link at least 2 independent pieces of contradiction evidence before committing an accusation.");
      return;
    }

    const currentTheory = THEORIES.find((t) => t.id === selectedTheory);
    if (!currentTheory?.isCorrect) {
      playScanPulse();
      setFeedback(
        `Failed premise: ${currentTheory?.explanation} Re-examine the sub-surface seam and the courier's magnetic trail.`
      );
      return;
    }

    // Correct accusation: execute rewrite sequence
    playAccusationChime();
    setIsRewriting(true);
    setFeedback(null);

    setTimeout(() => {
      setIsRewriting(false);
      setIsResolved(true);
    }, 1200);
  };

  const handleReset = () => {
    playUiClick();
    setIsResolved(false);
    setSelectedClues(["sign"]);
    setSelectedTheory("illusion");
    setFeedback(null);
  };

  return (
    <div className="intel-frame relative overflow-hidden border border-royal-purple/40 bg-panel-navy shadow-2xl">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-royal-purple/30 bg-[#0d1022] px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-3 w-3 items-center justify-center">
            <span className={`h-2.5 w-2.5 rounded-full ${isResolved ? "bg-toxic-lime shadow-[0_0_10px_#B7FF36]" : "animate-pulse bg-hot-pink shadow-[0_0_10px_#FF4FA3]"}`} />
          </span>
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-toxic-lime">
              S.U.S. FIELD ACCUSATION TERMINAL · UNIT 01
            </span>
            <h3 className="font-display text-base font-bold text-cloud-white">
              Episode 1: Case 01 · The Sign That Lied
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-4 font-mono text-xs">
          <div className="flex items-center gap-2 border border-cloud-white/10 bg-midnight-bg px-3 py-1 text-cloud-white/80">
            <Scan className="h-3.5 w-3.5 text-toxic-lime" />
            <span>SW-CAUSEWAY // 14:08</span>
          </div>
          {isResolved && (
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-hot-pink transition hover:text-toxic-lime"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Case</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Terminal Screen */}
      <div className={`relative p-6 sm:p-8 transition-all duration-700 ${isRewriting ? "scale-[0.99] opacity-75 blur-[1px]" : ""}`}>
        {isRewriting && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-midnight-bg/95 backdrop-blur-md">
            <div className="flex items-center gap-3 font-mono text-sm font-bold uppercase tracking-[0.25em] text-toxic-lime">
              <Zap className="h-5 w-5 animate-bounce text-hot-pink" />
              <span>OVERRULING REALITY · CROWN CORRECTION IN PROGRESS...</span>
            </div>
            <div className="mt-4 h-1.5 w-64 overflow-hidden rounded-full bg-panel-navy-light">
              <div className="h-full w-full animate-[pulse_0.6s_ease-in-out_infinite] bg-gradient-to-r from-toxic-lime via-hot-pink to-royal-purple" />
            </div>
            <p className="mt-3 font-mono text-xs text-cloud-white/60">
              False causeway dissolving · Restoring geographic memory...
            </p>
          </div>
        )}

        {!isResolved ? (
          <div>
            {/* Context & instructions */}
            <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-8">
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-hot-pink">
                  Active Discrepancy Record
                </p>
                <p className="mt-1 text-base text-cloud-white/85">
                  The objective marker points your squad toward the grand causeway bridge. Yet every physical sensor and environmental artifact tells an incompatible story.
                  Inspect the field clues below and link the contradictions to charge your squad&apos;s S.U.S. deduction.
                </p>
              </div>

              {/* Dynamic Lie Pressure Meter */}
              <div className="border border-royal-purple/35 bg-midnight-bg/85 p-4 lg:col-span-4">
                <div className="flex items-center justify-between text-xs font-mono font-bold">
                  <span className="text-cloud-white/70 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldAlert className="h-3.5 w-3.5 text-hot-pink" />
                    Lie Pressure Index
                  </span>
                  <span className={liePressure >= 85 ? "text-toxic-lime" : "text-hot-pink"}>
                    {liePressure}%
                  </span>
                </div>
                <div className="mt-2.5 h-2 w-full overflow-hidden bg-panel-navy">
                  <div
                    className={`h-full transition-all duration-500 ${
                      liePressure >= 85
                        ? "bg-toxic-lime shadow-[0_0_12px_#B7FF36]"
                        : "bg-hot-pink shadow-[0_0_12px_#FF4FA3]"
                    }`}
                    style={{ width: `${liePressure}%` }}
                  />
                </div>
                <p className="mt-2 font-mono text-[10px] text-cloud-white/50">
                  {selectedClues.length === 3
                    ? "✓ Full contradiction parity locked. Accusation primed."
                    : selectedClues.length === 2
                    ? "Contradiction verified. Select all 3 for maximum certainty."
                    : "Insufficient proof. Need at least 2 independent signals."}
                </p>
              </div>
            </div>

            {/* Evidence Cards */}
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {CASE_CLUES.map((clue) => {
                const isSelected = selectedClues.includes(clue.id);
                return (
                  <button
                    key={clue.id}
                    type="button"
                    onClick={() => toggleClue(clue.id)}
                    aria-pressed={isSelected}
                    className={`group text-left transition-all p-5 border ${
                      isSelected
                        ? "border-toxic-lime bg-[#141b2c] shadow-[0_0_20px_rgba(183,255,54,0.12)]"
                        : "border-panel-navy-light/60 bg-midnight-bg/60 hover:border-royal-purple/60 hover:bg-panel-navy/60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-hot-pink">
                        {clue.code}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 font-mono text-[10px] font-bold ${
                          isSelected
                            ? "bg-toxic-lime text-midnight-bg"
                            : "bg-panel-navy text-cloud-white/60"
                        }`}
                      >
                        {isSelected ? "LINKED TO CASE" : "CLICK TO LINK"}
                      </span>
                    </div>

                    <h4 className="mt-3 font-display text-base font-bold text-cloud-white group-hover:text-toxic-lime transition">
                      {clue.title}
                    </h4>
                    <p className="mt-1 font-mono text-[11px] text-muted-text">
                      {clue.source}
                    </p>

                    <div className="mt-4 space-y-2 border-t border-cloud-white/10 pt-3 text-xs leading-relaxed">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-hot-pink block">
                          Official Sign:
                        </span>
                        <p className="italic text-cloud-white/60">{clue.officialClaim}</p>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-toxic-lime block">
                          Physical Evidence:
                        </span>
                        <p className="text-cloud-white/85">{clue.physicalTruth}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-cloud-white/5 pt-2">
                      <span className="font-mono text-[10px] text-royal-purple group-hover:text-hot-pink transition">
                        {clue.contradictionTag}
                      </span>
                      <CheckCircle2
                        className={`h-4 w-4 ${
                          isSelected ? "text-toxic-lime" : "text-cloud-white/20"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Theory Formulation & Accuse Bar */}
            <div className="mt-8 border-t border-cloud-white/10 pt-6">
              <label className="font-mono text-xs font-bold uppercase tracking-wider text-toxic-lime block mb-3">
                Squad Theory Formulation (Select What The World Is Lying About)
              </label>

              <div className="space-y-2.5">
                {THEORIES.map((theory) => (
                  <label
                    key={theory.id}
                    className={`flex items-start gap-3 p-3.5 border cursor-pointer transition text-sm ${
                      selectedTheory === theory.id
                        ? "border-royal-purple bg-royal-purple/15 text-cloud-white"
                        : "border-panel-navy-light/40 bg-midnight-bg/40 text-cloud-white/70 hover:border-royal-purple/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="squad-theory"
                      value={theory.id}
                      checked={selectedTheory === theory.id}
                      onChange={() => {
                        playUiClick();
                        setSelectedTheory(theory.id);
                        setFeedback(null);
                      }}
                      className="mt-1 accent-toxic-lime"
                    />
                    <span>{theory.label}</span>
                  </label>
                ))}
              </div>

              {feedback && (
                <div className="mt-4 flex items-start gap-2.5 border border-hot-pink/40 bg-hot-pink/10 p-3.5 text-xs text-cloud-white leading-relaxed">
                  <AlertTriangle className="h-4 w-4 text-hot-pink flex-shrink-0 mt-0.5" />
                  <span>{feedback}</span>
                </div>
              )}

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 font-mono text-xs text-muted-text">
                  <Compass className="h-4 w-4 text-toxic-lime" />
                  <span>{selectedClues.length} of 3 Contradictions Connected</span>
                </div>

                <button
                  type="button"
                  onClick={handleAccusation}
                  className="action-primary group px-8 py-3.5 text-sm uppercase tracking-wider font-mono font-bold"
                >
                  <Zap className="h-4 w-4 transition group-hover:scale-125" />
                  Commit S.U.S. Accusation
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Restored Reality State */
          <div className="relative py-4">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-toxic-lime">
              <Sparkles className="h-4 w-4" />
              Contradiction Exposed · Reality Corrected
            </div>

            <h3 className="mt-3 font-display text-3xl font-extrabold text-cloud-white sm:text-4xl">
              The False Bridge Collapses. The Gorge Path Awakens.
            </h3>

            <div className="mt-6 grid gap-6 md:grid-cols-12 md:items-center">
              <div className="md:col-span-7 space-y-4 text-base leading-relaxed text-cloud-white/85">
                <p>
                  As your squad submitted the accusation, King Wrongway&apos;s royal veneer shattered. The illusion of solid stone faded into purple particles, revealing the true geography beneath: the ancient ford across the gorge.
                </p>
                <p className="text-sm text-muted-text">
                  Water rushes once again through the rocky canal. The courier&apos;s lost raft floats into view with an intact cargo chest, unlocking an unedited parchment containing coordinates to the hidden sanctuary in Glitch Grove.
                </p>
                <div className="border-l-2 border-toxic-lime pl-4 text-xs font-mono text-toxic-lime">
                  WORLD STATE UPDATE: Causeway bypassed · Permanent water route established · Lost Courier journal unlocked.
                </div>
              </div>

              {/* Razz Mascot Debrief */}
              <div className="md:col-span-5 border border-royal-purple/40 bg-midnight-bg/90 p-5">
                <div className="flex items-center gap-3">
                  <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden border border-toxic-lime/50 bg-royal-purple/20 p-1">
                    <Image
                      src={BRAND_ASSETS.poses.detective}
                      alt="Razz the detective mascot"
                      width={56}
                      height={56}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-hot-pink">
                      Field Guide Debrief
                    </span>
                    <h5 className="font-display text-sm font-bold text-cloud-white">
                      Razz's Notes
                    </h5>
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-cloud-white/80 italic">
                  “Ha! Never trust royal varnish on rotted timber! Look at that gorge now—the river returned the second King Wrongway&apos;s sign lost its grip. That&apos;s how we fight this kingdom: one truth at a time.”
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 border-t border-cloud-white/10 pt-6">
              <button
                type="button"
                onClick={handleReset}
                className="action-secondary text-xs uppercase tracking-wider font-mono font-bold"
              >
                <RotateCcw className="h-4 w-4" />
                Test Another Accusation
              </button>
              <Link
                href="/game#world-lies"
                className="action-primary text-xs uppercase tracking-wider font-mono font-bold"
              >
                Explore Full SUS System Specs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
