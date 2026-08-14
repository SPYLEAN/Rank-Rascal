import Image from "next/image";
import React from "react";
import { BRAND_ASSETS } from "@/lib/brand-assets";

interface LoadingRazzProps {
  message?: string;
  size?: number;
  className?: string;
}

export const LoadingRazz: React.FC<LoadingRazzProps> = ({
  message = "Razz is loading certified server stats...",
  size = 140,
  className = "",
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-6 space-y-4 text-center ${className}`}>
      <div className="relative inline-block animate-spin-slow motion-reduce:animate-none">
        <Image
          src={BRAND_ASSETS.animation.loadingWebp}
          alt="Razz spinning around happily loading data"
          width={size}
          height={size}
          className="object-contain"
          priority
        />
      </div>
      {message && (
        <p className="text-xs font-mono text-toxic-lime font-semibold animate-pulse motion-reduce:animate-none">
          {message}
        </p>
      )}
    </div>
  );
};
