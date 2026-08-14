import React from "react";
import Image from "next/image";
import { BRAND_ASSETS } from "@/lib/brand-assets";
import { BadgeShelf } from "@/components/BadgeShelf";
import { ReactionRail } from "@/components/ReactionRail";
import { SpeechBubble } from "@/components/SpeechBubble";
import { Award, AlertCircle } from "lucide-react";

export default function RewardsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Hero section with Razz Reward Machine */}
      <div className="p-8 sm:p-12 rounded-3xl bg-panel-navy border-sticker-purple glow-purple grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4">
          <SpeechBubble text="Your server just dropped loot!" variant="lime" className="z-10" />
          <div className="relative w-full max-w-sm flex justify-center">
            <Image
              src={BRAND_ASSETS.websiteArt.rewardMachine}
              alt="Razz turns a machine that produces collectible badges and quest tickets."
              width={500}
              height={333}
              className="w-full h-auto max-h-80 object-contain rounded-2xl"
              priority
            />
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-reward-yellow/10 border border-reward-yellow/40 text-reward-yellow font-mono text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Collectibles & Progression</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-cloud-white uppercase leading-tight">
            YOUR SERVER MOMENTS JUST DROPPED LOOT.
          </h1>
          <p className="text-muted-text text-sm sm:text-base leading-relaxed font-sans max-w-2xl">
            Collect decorative badges, finish quests and turn everyday gaming moments into progress. No gambling. No cash value. Just certified server lore.
          </p>
        </div>
      </div>

      <ReactionRail />

      {/* 12 Code-Native UI Badges Shelf */}
      <div className="space-y-6">
        <h2 className="font-display font-extrabold text-2xl text-cloud-white uppercase">
          Digital Social Badge Collection
        </h2>
        <BadgeShelf />
      </div>
    </div>
  );
}
