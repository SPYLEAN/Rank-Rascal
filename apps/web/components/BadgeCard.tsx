"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Sparkles, Lock } from "lucide-react";

export interface BadgeCardProps {
  title: string;
  category: string;
  description: string;
  icon?: string;
  isUnlocked?: boolean;
  statusLabel?: string;
  rarity?: "Common" | "Rare" | "Epic" | "Legendary" | "Rascal";
}

const RARITY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Common: { bg: "bg-panel-navy-light", text: "text-cloud-white", border: "border-panel-navy-light" },
  Rare: { bg: "bg-royal-purple/20", text: "text-royal-purple", border: "border-royal-purple/40" },
  Epic: { bg: "bg-hot-pink/20", text: "text-hot-pink", border: "border-hot-pink/40" },
  Legendary: { bg: "bg-reward-yellow/20", text: "text-reward-yellow", border: "border-reward-yellow/40" },
  Rascal: { bg: "bg-toxic-lime/20", text: "text-toxic-lime", border: "border-toxic-lime/40" },
};

export const BadgeCard: React.FC<BadgeCardProps> = ({
  title,
  category,
  description,
  icon = "/brand/emojis/rascal-win.png",
  isUnlocked = true,
  statusLabel = "Unlocked",
  rarity = "Rare",
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const rarityStyle = RARITY_COLORS[rarity] || RARITY_COLORS.Rare;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative p-5 rounded-2xl bg-panel-navy border-sticker transition-all duration-500 hover:-translate-y-1 hover:shadow-purple-glow ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-4 scale-95 motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:scale-100"
      } ${!isUnlocked ? "opacity-75" : ""}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative w-12 h-12 rounded-xl bg-midnight-bg p-2 border border-panel-navy-light flex items-center justify-center flex-shrink-0">
            <Image src={icon} alt="" width={36} height={36} className="object-contain" />
          </div>
          <div>
            <h4 className="font-display font-bold text-cloud-white text-base leading-snug">{title}</h4>
            <span className="text-xs font-mono text-muted-text">{category}</span>
          </div>
        </div>
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-semibold font-mono border ${rarityStyle.bg} ${rarityStyle.text} ${rarityStyle.border}`}
        >
          {rarity}
        </span>
      </div>

      <p className="mt-3 text-xs text-muted-text/90 leading-relaxed">{description}</p>

      <div className="mt-4 pt-3 border-t border-panel-navy-light/60 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center space-x-1">
          {isUnlocked ? (
            <Sparkles className="w-3.5 h-3.5 text-toxic-lime" />
          ) : (
            <Lock className="w-3.5 h-3.5 text-muted-text" />
          )}
          <span className={isUnlocked ? "text-toxic-lime font-semibold" : "text-muted-text"}>
            {statusLabel}
          </span>
        </div>
        <span className="text-cloud-white/60">Rank Rascal</span>
      </div>
    </div>
  );
};
