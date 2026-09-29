"use client";

import React, { useEffect, useRef, useState } from "react";
import { BRAND_ASSETS } from "@/lib/brand-assets";
import { PORTRAIT_QUERY, markIntroDone, prefersReducedMotion } from "@/lib/media-preferences";

/** Seconds, first visit. Returning visitors run the same beats at INTRO_SHORT_SCALE. */
const INTRO_TOTAL_S = 3.55;
const INTRO_SHORT_SCALE = 0.37;

/**
 * The Crownfall entrance: black, a small purple fracture, the crack widening,
 * "THE WORLD LIES.", Stickerwood revealed through the break, the title resolving,
 * then a fade into the homepage.
 *
 * The whole sequence is CSS keyframes that start at first paint (see `.intro` in
 * globals.css), so it finishes on time even on a slow device or with JavaScript disabled.
 * JavaScript only reports completion so the hero video can start on the matching frame.
 * `prefers-reduced-motion: reduce` hides it entirely.
 */
export const PageLoadingOverlay: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    let timer = 0;
    const finish = () => {
      window.clearTimeout(timer);
      markIntroDone();
      setGone(true);
    };
    if (!el || prefersReducedMotion() || getComputedStyle(el).display === "none") {
      finish();
      return;
    }
    const short = document.documentElement.getAttribute("data-intro-seen") === "1";
    const totalMs = INTRO_TOTAL_S * (short ? INTRO_SHORT_SCALE : 1) * 1000;
    // performance.now() is time since navigation; the CSS animation started at first paint,
    // so this is (conservatively) how long is left. Hydration may land after it already ended.
    const remaining = totalMs - performance.now();
    if (remaining <= 0) {
      finish();
      return;
    }
    const onEnd = (event: AnimationEvent) => {
      if (event.animationName === "intro-out") finish();
    };
    el.addEventListener("animationend", onEnd);
    timer = window.setTimeout(finish, remaining + 150);
    return () => {
      el.removeEventListener("animationend", onEnd);
      window.clearTimeout(timer);
    };
  }, []);

  if (gone) return null;

  return (
    <div ref={ref} className="intro" role="status" aria-label="Entering Rascal Realms: Crownfall">
      {/* Stickerwood, revealed through the fracture. Same poster as the hero, so the browser
          fetches it once and the reveal dissolves into an identical frame. */}
      <div className="intro-reveal" aria-hidden="true">
        <picture>
          <source media={PORTRAIT_QUERY} srcSet={BRAND_ASSETS.media.posterMobile} />
          {/* eslint-disable-next-line @next/next/no-img-element -- shared, pre-optimized poster */}
          <img
            src={BRAND_ASSETS.media.poster}
            alt=""
            width={1920}
            height={964}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </picture>
        <div className="absolute inset-0 bg-[#050308]/55" />
      </div>

      <div className="intro-crack" aria-hidden="true" />

      <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center">
        <p className="intro-lie font-display text-3xl font-extrabold uppercase tracking-[0.08em] text-cloud-white sm:text-5xl">
          The world lies.
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element -- 77 KB pre-optimized title art */}
        <img
          src={BRAND_ASSETS.titleLogo.small}
          alt=""
          width={600}
          height={337}
          className="intro-title h-auto w-[min(72vw,20rem)] drop-shadow-[0_8px_24px_rgba(0,0,0,.7)]"
        />
      </div>
    </div>
  );
};
