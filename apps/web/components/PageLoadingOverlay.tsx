"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BRAND_ASSETS } from "@/lib/brand-assets";

export const PageLoadingOverlay: React.FC = () => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoaded, setInitialLoaded] = useState(false);

  // Initial site load transition
  useEffect(() => {
    setInitialLoaded(true);
  }, []);

  // Route change transition listener
  useEffect(() => {
    if (!initialLoaded) return;
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450); // Fast, funky 450ms transition
    return () => clearTimeout(timer);
  }, [pathname, initialLoaded]);

  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-midnight-bg/90 backdrop-blur-md transition-opacity duration-200"
      aria-live="polite"
      aria-label="Loading page content"
    >
      <div className="relative flex flex-col items-center justify-center space-y-4 p-8 rounded-3xl bg-panel-navy border-sticker-purple glow-purple max-w-xs text-center shadow-2xl animate-scale-up">
        <div className="relative w-36 h-36 flex items-center justify-center">
          <Image
            src={BRAND_ASSETS.animation.loadingGif}
            alt="Razz loading animation"
            width={140}
            height={140}
            className="object-contain"
            priority
            unoptimized
          />
        </div>

        <div className="space-y-1">
          <p className="font-display font-bold text-base text-cloud-white tracking-wide">
            FETCHING SERVING LORE...
          </p>
          <p className="font-mono text-xs text-toxic-lime font-semibold animate-pulse">
            Rank Rascal is cooking ✨
          </p>
        </div>
      </div>
    </div>
  );
};
