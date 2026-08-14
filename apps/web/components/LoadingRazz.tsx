import Image from "next/image";
import React from "react";
import { BRAND_ASSETS } from "@/lib/brand-assets";

interface LoadingRazzProps {
  message?: string;
  size?: number;
  className?: string;
}

export const LoadingRazz: React.FC<LoadingRazzProps> = ({
  message = "Cooking your server lore…",
  size = 160,
  className = "",
}) => {
  return (
    <div
      className={`relative flex flex-col items-center justify-center p-8 text-center space-y-4 ${className}`}
      role="status"
      aria-live="polite"
    >
      {/* Centered Animation Container with CSS Orbit Line & Sparkles */}
      <div className="relative flex items-center justify-center w-48 h-48 sm:w-56 sm:h-56">
        {/* CSS Orbit Line */}
        <div className="absolute inset-2 rounded-full border border-toxic-lime/30 animate-spin-slow motion-reduce:hidden" />
        
        {/* CSS Sparkles */}
        <div className="absolute top-2 right-4 w-2 h-2 rounded-full bg-hot-pink animate-ping motion-reduce:hidden" />
        <div className="absolute bottom-4 left-6 w-1.5 h-1.5 rounded-full bg-toxic-lime animate-pulse motion-reduce:hidden" />

        {/* Animated Mascot (or static fallback under reduced motion) */}
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
          <picture>
            <source
              media="(prefers-reduced-motion: reduce)"
              srcSet={BRAND_ASSETS.animation.loadStatic}
            />
            <Image
              src={BRAND_ASSETS.animation.loadingSlowGif}
              alt="Razz loading animation"
              width={size}
              height={size}
              className="object-contain w-full h-full"
              priority
              unoptimized
            />
          </picture>
        </div>
      </div>

      {/* Status Text & Progress Dots */}
      <div className="space-y-2 z-10">
        <p className="font-display font-bold text-lg text-cloud-white tracking-wide">
          {message}
        </p>
        <div className="flex items-center justify-center space-x-1.5" aria-hidden="true">
          <div className="w-2 h-2 rounded-full bg-toxic-lime animate-bounce [animation-delay:-0.3s] motion-reduce:animate-none" />
          <div className="w-2 h-2 rounded-full bg-hot-pink animate-bounce [animation-delay:-0.15s] motion-reduce:animate-none" />
          <div className="w-2 h-2 rounded-full bg-royal-purple animate-bounce motion-reduce:animate-none" />
        </div>
      </div>
    </div>
  );
};
