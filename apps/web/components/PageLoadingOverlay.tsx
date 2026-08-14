"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BRAND_ASSETS } from "@/lib/brand-assets";

export const PageLoadingOverlay: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [statusText, setStatusText] = useState("Waking up Razz...");

  useEffect(() => {
    // Only run on initial site entrance / page refresh (mount once)
    const step1 = setTimeout(() => {
      setStatusText("Cooking your server lore...");
    }, 900);

    const step2 = setTimeout(() => {
      setStatusText("Ready for chaos! ✨");
    }, 1800);

    const fadeStart = setTimeout(() => {
      setIsFadingOut(true);
    }, 2400);

    const finish = setTimeout(() => {
      setIsVisible(false);
    }, 2700);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(fadeStart);
      clearTimeout(finish);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#181335] via-[#120f29] to-[#0c0a1b] text-cloud-white transition-opacity duration-300 ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      role="status"
      aria-live="polite"
      aria-label="Site loading screen"
    >
      {/* Background Dotted Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      <div className="relative flex flex-col items-center justify-center space-y-6 p-8 text-center z-10 max-w-sm">
        {/* Orbit Ring & Sparkles */}
        <div className="relative flex items-center justify-center w-48 h-48 sm:w-56 sm:h-56">
          <div className="absolute inset-1 rounded-full border-2 border-toxic-lime/40 animate-spin-slow glow-lime motion-reduce:hidden" />
          <div className="absolute top-2 right-4 w-2.5 h-2.5 rounded-full bg-hot-pink animate-ping motion-reduce:hidden" />
          <div className="absolute bottom-4 left-6 w-2 h-2 rounded-full bg-toxic-lime animate-pulse motion-reduce:hidden" />

          {/* Centered Razz Slow GIF Animation */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
            <picture>
              <source
                media="(prefers-reduced-motion: reduce)"
                srcSet={BRAND_ASSETS.animation.loadStatic}
              />
              <Image
                src={BRAND_ASSETS.animation.loadingSlowGif}
                alt="Razz loading animation"
                width={160}
                height={160}
                className="object-contain w-full h-full"
                priority
                unoptimized
              />
            </picture>
          </div>
        </div>

        {/* Dynamic Status Text with Smooth Expression Pacing */}
        <div className="space-y-3 min-h-[50px] flex flex-col items-center justify-center">
          <p className="font-display font-extrabold text-xl text-cloud-white tracking-wide uppercase transition-all duration-300">
            {statusText}
          </p>
          <div className="flex items-center justify-center space-x-2" aria-hidden="true">
            <div className="w-2.5 h-2.5 rounded-full bg-toxic-lime animate-bounce [animation-delay:-0.3s] motion-reduce:animate-none" />
            <div className="w-2.5 h-2.5 rounded-full bg-hot-pink animate-bounce [animation-delay:-0.15s] motion-reduce:animate-none" />
            <div className="w-2.5 h-2.5 rounded-full bg-royal-purple animate-bounce motion-reduce:animate-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
