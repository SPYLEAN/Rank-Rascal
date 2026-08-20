import React from "react";
import Image from "next/image";
import { BRAND_ASSETS } from "@/lib/brand-assets";
import { Sparkles } from "lucide-react";

export const ClosingCTA: React.FC = () => {
  const discordInviteUrl =
    process.env.NEXT_PUBLIC_DISCORD_INSTALL_URL || "/invite";

  return (
    <div className="relative rounded-3xl overflow-hidden border-sticker-lime glow-lime min-h-[380px] flex items-center justify-center text-center p-8 sm:p-14">
      <Image
        src={BRAND_ASSETS.websiteArt.communityClubhouse}
        alt="Razz hosts a joyful digital clubhouse filled with profiles, badges and reactions."
        fill
        sizes="(max-width: 1200px) 100vw, 1200px"
        className="object-cover -z-10"
      />
      {/* Readable Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#121526] via-[#121526]/85 to-[#121526]/60 -z-10" />

      <div className="max-w-2xl mx-auto space-y-6 z-10">
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-cloud-white uppercase">
          YOUR SERVER IS ABOUT TO GET LORE.
        </h2>
        <p className="text-sm sm:text-base text-muted-text leading-relaxed font-sans">
          Build Rotfiles, hunt badges, challenge friends and give every gaming session something worth yapping about.
        </p>
        <div className="pt-2">
          <a
            href={discordInviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-royal-purple hover:bg-royal-purple/90 text-cloud-white px-8 py-4 rounded-2xl font-display font-bold text-base transition-all shadow-sticker-lime hover:translate-x-[2px] hover:translate-y-[2px]"
          >
            <Sparkles className="w-5 h-5 text-toxic-lime" />
            <span>Add Rank Rascal (Coming Soon)</span>
          </a>
        </div>
      </div>
    </div>
  );
};
