import React from "react";
import Image from "next/image";
import { SpeechBubble } from "@/components/SpeechBubble";
import { BRAND_ASSETS } from "@/lib/brand-assets";

interface IllustratedPageHeroProps {
  badgeLabel: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  speechText?: string;
  badgeColor?: string;
}

export const IllustratedPageHero: React.FC<IllustratedPageHeroProps> = ({
  badgeLabel,
  title,
  subtitle,
  imageSrc,
  imageAlt,
  speechText,
  badgeColor = "bg-toxic-lime/10 text-toxic-lime border-toxic-lime/40",
}) => {
  return (
    <div className="p-8 sm:p-12 rounded-3xl bg-panel-navy border-sticker-purple glow-purple grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4">
        {speechText && <SpeechBubble text={speechText} variant="lime" className="z-10" />}
        <div className="relative w-full max-w-xs flex justify-center">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={450}
            height={450}
            className="w-full h-auto max-h-80 object-contain rounded-2xl"
            priority
          />
        </div>
      </div>

      <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
        <div
          className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border font-mono text-xs font-bold uppercase tracking-wider ${badgeColor}`}
        >
          <span>{badgeLabel}</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-cloud-white uppercase leading-tight">
          {title}
        </h1>
        <p className="text-muted-text text-sm sm:text-base leading-relaxed font-sans max-w-2xl">
          {subtitle}
        </p>
      </div>
    </div>
  );
};
