import React from "react";
import Image from "next/image";
import { BRAND_ASSETS } from "@/lib/brand-assets";

export const ReactionRail: React.FC = () => {
  const emojiList = [
    { src: BRAND_ASSETS.emojis.hype, label: "Hype" },
    { src: BRAND_ASSETS.emojis.win, label: "Win" },
    { src: BRAND_ASSETS.emojis.lol, label: "LOL" },
    { src: BRAND_ASSETS.emojis.sus, label: "Sus" },
    { src: BRAND_ASSETS.emojis.cooked, label: "Cooked" },
    { src: BRAND_ASSETS.emojis.loading, label: "Loading" },
  ];

  return (
    <div className="w-full py-4 bg-panel-navy/40 border-y border-panel-navy-light/60 overflow-hidden my-8">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-around gap-6 overflow-x-auto no-scrollbar">
        {emojiList.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-midnight-bg/80 border border-panel-navy-light flex-shrink-0 transition-transform duration-300 hover:scale-110"
          >
            <Image src={item.src} alt="" width={28} height={28} className="object-contain" />
            <span className="text-[11px] font-mono font-semibold text-cloud-white/80">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
