"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BRAND_ASSETS } from "@/lib/brand-assets";
import { Sparkles, Award, Lock, CheckCircle2, AlertCircle, X } from "lucide-react";

export interface BadgeItem {
  id: string;
  name: string;
  description: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary" | "Rascal";
  criteria: string;
  status: "Live" | "Preview" | "Coming Soon";
  icon: string;
  accessibleLabel: string;
}

export const TWELVE_BADGES: BadgeItem[] = [
  {
    id: "verified-rascal",
    name: "Verified Rascal",
    description: "Successfully authorized ownership of a Roblox account via PKCE OAuth 2.0.",
    rarity: "Common",
    criteria: "Run /link-roblox and complete verification.",
    status: "Live",
    icon: BRAND_ASSETS.emojis.win,
    accessibleLabel: "Verified Rascal Badge: Common milestone earned by linking Roblox identity.",
  },
  {
    id: "early-rascal",
    name: "Early Rascal",
    description: "Joined the Rank Rascal community during initial public release phase.",
    rarity: "Rare",
    criteria: "Link a profile during Version 1.0 release.",
    status: "Live",
    icon: BRAND_ASSETS.emojis.hype,
    accessibleLabel: "Early Rascal Badge: Rare milestone for early community adopters.",
  },
  {
    id: "rotfile-ready",
    name: "Rotfile Ready",
    description: "Generated a complete verified identity card with avatar and public badge totals.",
    rarity: "Common",
    criteria: "Run /rotfile in any Discord channel.",
    status: "Live",
    icon: BRAND_ASSETS.emojis.lol,
    accessibleLabel: "Rotfile Ready Badge: Common profile display milestone.",
  },
  {
    id: "quest-crusader",
    name: "Quest Crusader",
    description: "Completed 10 verified Rank Rascal quests across server channels.",
    rarity: "Rascal",
    criteria: "Complete 10 verified server quests.",
    status: "Live",
    icon: BRAND_ASSETS.badges.questCrusader,
    accessibleLabel: "Quest Crusader Badge: Official Rank Rascal badge for completing 10 quests.",
  },
  {
    id: "drip-monarch",
    name: "Drip Monarch",
    description: "Completed self Drip Checks on five different days with legendary outfit heat.",
    rarity: "Legendary",
    criteria: "Run /dripcheck on 5 distinct days.",
    status: "Live",
    icon: BRAND_ASSETS.badges.dripMonarch,
    accessibleLabel: "Drip Monarch Badge: Official Rank Rascal badge for 5 distinct dripcheck days.",
  },
  {
    id: "veteran-noob",
    name: "Veteran Noob",
    description: "Verified a Roblox account that is at least three years old.",
    rarity: "Rare",
    criteria: "Verify a Roblox account age over 1,095 days.",
    status: "Live",
    icon: BRAND_ASSETS.badges.veteranNoob,
    accessibleLabel: "Veteran Noob Badge: Official Rank Rascal badge for Roblox accounts over 3 years old.",
  },
  {
    id: "drip-inspector",
    name: "Drip Inspector",
    description: "Evaluated avatar outfit heat using deterministic safe humor algorithms.",
    rarity: "Rare",
    criteria: "Run /dripcheck on yourself or a server member.",
    status: "Live",
    icon: BRAND_ASSETS.emojis.win,
    accessibleLabel: "Drip Inspector Badge: Rare avatar outfit inspection milestone.",
  },
  {
    id: "badge-goblin",
    name: "Badge Goblin",
    description: "Accumulated over 250 public Roblox achievement badges.",
    rarity: "Epic",
    criteria: "Hold at least 250 verified public Roblox badges.",
    status: "Live",
    icon: BRAND_ASSETS.emojis.hype,
    accessibleLabel: "Badge Goblin Badge: Epic public Roblox achievement milestone.",
  },
  {
    id: "yapping-apprentice",
    name: "Yapping Apprentice",
    description: "Earned your first 25 Rascal Rep points in server activity rankings.",
    rarity: "Common",
    criteria: "Reach 25 Rascal Rep score.",
    status: "Live",
    icon: BRAND_ASSETS.emojis.lol,
    accessibleLabel: "Yapping Apprentice Badge: Common server rep milestone.",
  },
  {
    id: "yapping-royalty",
    name: "Yapping Royalty",
    description: "Ranked in the top 3 on a server /yapping-order leaderboard.",
    rarity: "Legendary",
    criteria: "Place top 3 on server Yapping Order.",
    status: "Live",
    icon: BRAND_ASSETS.emojis.win,
    accessibleLabel: "Yapping Royalty Badge: Legendary server leaderboard ranking.",
  },
  {
    id: "friendly-rival",
    name: "Friendly Rival",
    description: "Challenged a guildmate to a head-to-head /fraudcheck comparison.",
    rarity: "Rare",
    criteria: "Execute /fraudcheck target:@guildmate.",
    status: "Live",
    icon: BRAND_ASSETS.emojis.sus,
    accessibleLabel: "Friendly Rival Badge: Rare rivalry comparison milestone.",
  },
  {
    id: "fraud-detective",
    name: "Fraud Detective",
    description: "Uncovered clean badge milestone consistency across rivals.",
    rarity: "Epic",
    criteria: "Run 5 fraud checks across server channels.",
    status: "Live",
    icon: BRAND_ASSETS.emojis.sus,
    accessibleLabel: "Fraud Detective Badge: Epic badge verification milestone.",
  },
  {
    id: "witness-protected",
    name: "Witness Protected",
    description: "Enabled privacy shield controls to manage public leaderboard visibility.",
    rarity: "Common",
    criteria: "Execute /witness-protection enabled:true.",
    status: "Live",
    icon: BRAND_ASSETS.emojis.cooked,
    accessibleLabel: "Witness Protected Badge: Common privacy control milestone.",
  },
  {
    id: "quest-gremlin",
    name: "Quest Gremlin",
    description: "Collaborated on weekly guild achievement badge goals.",
    rarity: "Rascal",
    criteria: "Complete 3 server community quests.",
    status: "Coming Soon",
    icon: BRAND_ASSETS.emojis.loading,
    accessibleLabel: "Quest Gremlin Badge: Rascal rarity roadmap quest concept.",
  },
  {
    id: "chaos-collector",
    name: "Chaos Collector",
    description: "Unlocked 10 distinct Rank Rascal digital social badges.",
    rarity: "Legendary",
    criteria: "Collect 10 unique Rank Rascal badges.",
    status: "Preview",
    icon: BRAND_ASSETS.emojis.hype,
    accessibleLabel: "Chaos Collector Badge: Legendary digital collection milestone.",
  },
];

export const BadgeShelf: React.FC = () => {
  const [selectedBadge, setSelectedBadge] = useState<BadgeItem | null>(null);

  return (
    <div className="space-y-8">
      {/* Cash Value Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-panel-navy border border-royal-purple/40 text-xs font-mono text-cloud-white/90 flex items-center space-x-3">
        <AlertCircle className="w-5 h-5 text-toxic-lime flex-shrink-0" />
        <span>
          <strong className="text-toxic-lime font-bold">Non-Monetary Notice:</strong> Rank Rascal badges and Rascal Rep have <strong>no cash value</strong>. They cannot be bought, sold, or traded for real currency.
        </span>
      </div>

      {/* 12 Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {TWELVE_BADGES.map((b) => (
          <button
            key={b.id}
            onClick={() => setSelectedBadge(b)}
            className="text-left p-5 rounded-2xl bg-panel-navy border-sticker transition-all duration-300 hover:-translate-y-1 hover:shadow-purple-glow focus:outline-none focus:ring-2 focus:ring-toxic-lime group"
            aria-label={b.accessibleLabel}
          >
            <div className="flex items-start justify-between">
              <div className="relative w-12 h-12 rounded-xl bg-midnight-bg p-2 border border-panel-navy-light flex items-center justify-center flex-shrink-0 group-hover:border-toxic-lime">
                <Image src={b.icon} alt="" width={36} height={36} className="object-contain" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-toxic-lime/10 text-toxic-lime border border-toxic-lime/30">
                {b.rarity}
              </span>
            </div>

            <h4 className="mt-3 font-display font-bold text-cloud-white text-base group-hover:text-toxic-lime">
              {b.name}
            </h4>
            <p className="mt-1 text-xs text-muted-text/90 line-clamp-2 leading-relaxed">
              {b.description}
            </p>

            <div className="mt-4 pt-2 border-t border-panel-navy-light/60 flex items-center justify-between text-[11px] font-mono">
              <span className="text-cloud-white/60">Criteria: {b.criteria}</span>
              <span className="text-toxic-lime font-semibold">{b.status}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Accessible Badge Detail Modal */}
      {selectedBadge && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight-bg/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-badge-title"
        >
          <div className="relative w-full max-w-md p-6 rounded-3xl bg-panel-navy border-sticker-purple glow-purple space-y-4">
            <button
              onClick={() => setSelectedBadge(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-midnight-bg border border-panel-navy-light text-cloud-white hover:text-toxic-lime"
              aria-label="Close details modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-midnight-bg p-2 border-2 border-royal-purple flex items-center justify-center">
                <Image src={selectedBadge.icon} alt="" width={48} height={48} className="object-contain" />
              </div>
              <div>
                <h3 id="modal-badge-title" className="font-display font-bold text-xl text-cloud-white">
                  {selectedBadge.name}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-toxic-lime/20 text-toxic-lime border border-toxic-lime/40">
                  {selectedBadge.rarity} Rarity
                </span>
              </div>
            </div>

            <p className="text-xs text-cloud-white/90 leading-relaxed font-sans">{selectedBadge.description}</p>

            <div className="p-3 rounded-xl bg-midnight-bg border border-panel-navy-light text-xs font-mono space-y-1">
              <div className="text-toxic-lime font-bold">Unlock Criteria:</div>
              <p className="text-muted-text">{selectedBadge.criteria}</p>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs font-mono text-cloud-white/60">
              <span>Status: <strong className="text-toxic-lime">{selectedBadge.status}</strong></span>
              <span>No Cash Value</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
