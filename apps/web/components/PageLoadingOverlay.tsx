"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BRAND_ASSETS } from "@/lib/brand-assets";

export const PageLoadingOverlay: React.FC = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show brief feedback if a route change takes longer than 150ms
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 150);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 450);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
      setIsVisible(false);
    };
  }, [pathname]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#181335] via-[#120f29] to-[#0c0a1b] text-cloud-white transition-opacity duration-200"
      role="status"
      aria-live="polite"
      aria-label="Cooking your server lore"
    >
      {/* Background Dotted Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      <div className="relative flex flex-col items-center justify-center space-y-4 p-8 text-center z-10 max-w-sm">
        {/* Orbit Line & Sparkles */}
        <div className="relative flex items-center justify-center w-44 h-44 sm:w-52 sm:h-52">
          <div className="absolute inset-1 rounded-full border border-toxic-lime/30 animate-spin-slow motion-reduce:hidden" />
          <div className="absolute top-2 right-4 w-2 h-2 rounded-full bg-hot-pink animate-ping motion-reduce:hidden" />
          <div className="absolute bottom-4 left-6 w-1.5 h-1.5 rounded-full bg-toxic-lime animate-pulse motion-reduce:hidden" />

          {/* Razz Animation (with static fallback under reduced motion) */}
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

        {/* Stable Status Message */}
        <div className="space-y-2">
          <p className="font-display font-bold text-lg text-cloud-white tracking-wide">
            Cooking your server lore…
          </p>
          <div className="flex items-center justify-center space-x-1.5" aria-hidden="true">
            <div className="w-2 h-2 rounded-full bg-toxic-lime animate-bounce [animation-delay:-0.3s] motion-reduce:animate-none" />
            <div className="w-2 h-2 rounded-full bg-hot-pink animate-bounce [animation-delay:-0.15s] motion-reduce:animate-none" />
            <div className="w-2 h-2 rounded-full bg-royal-purple animate-bounce motion-reduce:animate-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
