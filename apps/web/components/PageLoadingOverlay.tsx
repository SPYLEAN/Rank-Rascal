"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { BRAND_ASSETS } from "@/lib/brand-assets";

const SEEN_KEY = "rascalRealms.introSeen";

type Stage = "black" | "fracture" | "crack" | "lie" | "reveal" | "resolve" | "fadeout";

function readIntroSeen(): boolean {
  try {
    return window.localStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function writeIntroSeen(): void {
  try {
    window.localStorage.setItem(SEEN_KEY, "1");
  } catch {
    // Private browsing or blocked storage — the full intro will just play every visit.
  }
}

/**
 * The Crownfall entrance: black, a small purple fracture, the crack widening,
 * "THE WORLD LIES.", Stickerwood revealed through the break, the title resolving,
 * then a seamless fade into the homepage. No progress bar, no fake percentages,
 * no coordinates or telemetry — this is a cinematic beat, not a loading screen.
 */
export const PageLoadingOverlay: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [stage, setStage] = useState<Stage>("black");
  const [skip, setSkip] = useState(false);

  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      writeIntroSeen();
      setIsVisible(false);
      return;
    }

    const returning = readIntroSeen();
    setSkip(returning);
    writeIntroSeen();

    // First-time visitors get the full ~3.4s sequence. Returning visitors get a
    // short ~1s version of the same beats, never a full replay.
    const t = returning
      ? { fracture: 80, crack: 260, lie: 460, reveal: 640, resolve: 820, fadeStart: 1000, hide: 1300 }
      : { fracture: 300, crack: 900, lie: 1500, reveal: 2050, resolve: 2650, fadeStart: 3150, hide: 3550 };

    const timers = [
      window.setTimeout(() => setStage("fracture"), t.fracture),
      window.setTimeout(() => setStage("crack"), t.crack),
      window.setTimeout(() => setStage("lie"), t.lie),
      window.setTimeout(() => setStage("reveal"), t.reveal),
      window.setTimeout(() => setStage("resolve"), t.resolve),
      window.setTimeout(() => setStage("fadeout"), t.fadeStart),
      window.setTimeout(() => setIsVisible(false), t.hide),
    ];

    return () => timers.forEach(window.clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  if (!isVisible) return null;

  const revealed = stage === "reveal" || stage === "resolve" || stage === "fadeout";
  const cracked = stage === "crack" || stage === "lie" || revealed;
  const showFracture = stage !== "black";

  return (
    <div
      className={`fixed inset-0 z-[70] flex items-center justify-center overflow-hidden bg-[#050308] transition-opacity duration-500 ${
        stage === "fadeout" ? "opacity-0 pointer-events-none" : "opacity-100"
      } ${skip ? "duration-300" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Entering Rascal Realms: Crownfall"
    >
      {/* Stickerwood, revealed only through the fracture */}
      <div
        className={`absolute inset-0 transition-all ease-out ${skip ? "duration-300" : "duration-700"} ${
          revealed ? "opacity-100" : "opacity-0"
        }`}
        style={{
          clipPath: revealed
            ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
            : "polygon(48% 38%, 52% 38%, 54% 52%, 60% 58%, 50% 100%, 40% 58%, 46% 52%)",
        }}
        aria-hidden="true"
      >
        <Image
          src={BRAND_ASSETS.game.stickerwoodKeyArt}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#050308]/55" />
      </div>

      {/* The fracture line itself, before the reveal */}
      {showFracture && !revealed ? (
        <div
          aria-hidden="true"
          className={`absolute h-[70vmin] w-[3px] origin-center bg-gradient-to-b from-transparent via-royal-purple to-transparent shadow-[0_0_30px_8px_rgba(122,77,255,0.55)] transition-transform ${
            skip ? "duration-200" : "duration-700"
          } ${cracked ? "scale-y-100 scale-x-[7]" : "scale-y-[0.18] scale-x-100"}`}
        />
      ) : null}

      {/* Copy */}
      <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center">
        <p
          className={`font-display text-3xl font-extrabold uppercase tracking-[0.08em] text-cloud-white transition-all duration-500 sm:text-5xl ${
            stage === "lie" || revealed ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          The world lies.
        </p>
        <p
          className={`font-mono text-xs font-bold uppercase tracking-[0.3em] text-toxic-lime transition-all duration-500 sm:text-sm ${
            stage === "resolve" || stage === "fadeout" ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          Rascal Realms: Crownfall
        </p>
      </div>
    </div>
  );
};
