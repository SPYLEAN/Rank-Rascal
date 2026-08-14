"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BRAND_ASSETS } from "@/lib/brand-assets";
import { Award, AlertCircle, X, Sparkles, ShieldCheck, Clock } from "lucide-react";

export interface BadgeItem {
  id: string;
  name: string;
  description: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary" | "Rascal";
  criteria: string;
  status: "Preview" | "Coming Soon";
  icon: string;
  discordIcon?: string;
  isOfficialArt: boolean;
  accessibleLabel: string;
}

export const OFFICIAL_ILLUSTRATED_BADGES: BadgeItem[] = [
  {
    id: "quest-crusader",
    name: "Quest Crusader",
    description: "Completed 10 verified Rank Rascal quests across server channels.",
    rarity: "Rascal",
    criteria: "Complete 10 verified Rank Rascal quests.",
    status: "Preview",
    icon: BRAND_ASSETS.badges.questCrusader,
    discordIcon: BRAND_ASSETS.badges.questCrusader256,
    isOfficialArt: true,
    accessibleLabel: "Quest Crusader Badge: Official illustrated badge for completing 10 quests (Preview status).",
  },
  {
    id: "drip-monarch",
    name: "Drip Monarch",
    description: "Completed self Drip Checks on five distinct days with a verified Roblox identity.",
    rarity: "Legendary",
    criteria: "Complete self Drip Checks on five distinct days with a verified Roblox identity.",
    status: "Preview",
    icon: BRAND_ASSETS.badges.dripMonarch,
    discordIcon: BRAND_ASSETS.badges.dripMonarch256,
    isOfficialArt: true,
    accessibleLabel: "Drip Monarch Badge: Official illustrated badge for 5 distinct dripcheck days (Preview status).",
  },
  {
    id: "veteran-noob",
    name: "Veteran Noob",
    description: "Verify a Roblox account at least 1,095 days old.",
    rarity: "Rare",
    criteria: "Verify a Roblox account at least 1,095 days old.",
    status: "Preview",
    icon: BRAND_ASSETS.badges.veteranNoob,
    discordIcon: BRAND_ASSETS.badges.veteranNoob256,
    isOfficialArt: true,
    accessibleLabel: "Veteran Noob Badge: Official illustrated badge for Roblox accounts over 3 years old (Preview status).",
  },
];

export const CONCEPT_BADGES: BadgeItem[] = [
  {
    id: "verified-rascal",
    name: "Verified Rascal",
    description: "Authorized ownership of a Roblox account via PKCE OAuth 2.0.",
    rarity: "Common",
    criteria: "Run /link-roblox and complete verification.",
    status: "Preview",
    icon: BRAND_ASSETS.emojis.win,
    isOfficialArt: false,
    accessibleLabel: "Verified Rascal Badge concept (Preview).",
  },
  {
    id: "early-rascal",
    name: "Early Rascal",
    description: "Joined the Rank Rascal community during initial release phase.",
    rarity: "Rare",
    criteria: "Link a profile during Version 1.0 release.",
    status: "Preview",
    icon: BRAND_ASSETS.emojis.hype,
    isOfficialArt: false,
    accessibleLabel: "Early Rascal Badge concept (Preview).",
  },
  {
    id: "rotfile-ready",
    name: "Rotfile Ready",
    description: "Generated a verified identity card with avatar and public badge totals.",
    rarity: "Common",
    criteria: "Run /rotfile in any Discord channel.",
    status: "Preview",
    icon: BRAND_ASSETS.emojis.lol,
    isOfficialArt: false,
    accessibleLabel: "Rotfile Ready Badge concept (Preview).",
  },
  {
    id: "drip-inspector",
    name: "Drip Inspector",
    description: "Evaluated avatar outfit heat using deterministic safe humor algorithms.",
    rarity: "Rare",
    criteria: "Run /dripcheck on yourself or a server member.",
    status: "Preview",
    icon: BRAND_ASSETS.emojis.win,
    isOfficialArt: false,
    accessibleLabel: "Drip Inspector Badge concept (Preview).",
  },
  {
    id: "badge-goblin",
    name: "Badge Goblin",
    description: "Accumulated over 250 public Roblox achievement badges.",
    rarity: "Epic",
    criteria: "Hold at least 250 verified public Roblox badges.",
    status: "Preview",
    icon: BRAND_ASSETS.emojis.hype,
    isOfficialArt: false,
    accessibleLabel: "Badge Goblin Badge concept (Preview).",
  },
  {
    id: "yapping-apprentice",
    name: "Yapping Apprentice",
    description: "Earned your first 25 Rascal Rep points in server activity rankings.",
    rarity: "Common",
    criteria: "Reach 25 Rascal Rep score.",
    status: "Preview",
    icon: BRAND_ASSETS.emojis.lol,
    isOfficialArt: false,
    accessibleLabel: "Yapping Apprentice Badge concept (Preview).",
  },
  {
    id: "yapping-royalty",
    name: "Yapping Royalty",
    description: "Ranked in the top 3 on a server /yapping-order leaderboard.",
    rarity: "Legendary",
    criteria: "Place top 3 on server Yapping Order.",
    status: "Preview",
    icon: BRAND_ASSETS.emojis.win,
    isOfficialArt: false,
    accessibleLabel: "Yapping Royalty Badge concept (Preview).",
  },
  {
    id: "friendly-rival",
    name: "Friendly Rival",
    description: "Challenged a guildmate to a head-to-head /fraudcheck comparison.",
    rarity: "Rare",
    criteria: "Execute /fraudcheck target:@guildmate.",
    status: "Preview",
    icon: BRAND_ASSETS.emojis.sus,
    isOfficialArt: false,
    accessibleLabel: "Friendly Rival Badge concept (Preview).",
  },
  {
    id: "fraud-detective",
    name: "Fraud Detective",
    description: "Uncovered clean badge milestone consistency across rivals.",
    rarity: "Epic",
    criteria: "Run 5 fraud checks across server channels.",
    status: "Preview",
    icon: BRAND_ASSETS.emojis.sus,
    isOfficialArt: false,
    accessibleLabel: "Fraud Detective Badge concept (Preview).",
  },
  {
    id: "witness-protected",
    name: "Witness Protected",
    description: "Enabled privacy shield controls to manage public leaderboard visibility.",
    rarity: "Common",
    criteria: "Execute /witness-protection enabled:true.",
    status: "Preview",
    icon: BRAND_ASSETS.emojis.cooked,
    isOfficialArt: false,
    accessibleLabel: "Witness Protected Badge concept (Preview).",
  },
  {
    id: "quest-gremlin",
    name: "Quest Gremlin",
    description: "Collaborated on weekly guild achievement badge goals.",
    rarity: "Rascal",
    criteria: "Complete 3 server community quests.",
    status: "Coming Soon",
    icon: BRAND_ASSETS.emojis.loading,
    isOfficialArt: false,
    accessibleLabel: "Quest Gremlin Badge concept (Coming Soon).",
  },
  {
    id: "chaos-collector",
    name: "Chaos Collector",
    description: "Unlocked 10 distinct Rank Rascal digital social badges.",
    rarity: "Legendary",
    criteria: "Collect 10 unique Rank Rascal badges.",
    status: "Coming Soon",
    icon: BRAND_ASSETS.emojis.hype,
    isOfficialArt: false,
    accessibleLabel: "Chaos Collector Badge concept (Coming Soon).",
  },
];

export const BadgeShelf: React.FC = () => {
  const [selectedBadge, setSelectedBadge] = useState<BadgeItem | null>(null);

  return (
    <div className="space-y-12">
      {/* Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-panel-navy border border-royal-purple/40 text-xs font-mono text-cloud-white/90 flex items-center space-x-3">
        <AlertCircle className="w-5 h-5 text-toxic-lime flex-shrink-0" />
        <span>
          <strong className="text-toxic-lime font-bold">Backend Status Notice:</strong> The Discord bot does not automatically award badges yet. All badges are currently displayed in <strong>Preview</strong> status until the backend award engine is deployed. Badges have zero cash value.
        </span>
      </div>

      {/* Official Illustrated Badges Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Sparkles className="w-6 h-6 text-toxic-lime" />
          <div>
            <h3 className="font-display font-extrabold text-2xl text-cloud-white uppercase">
              Official Illustrated Badges (Preview)
            </h3>
            <p className="text-xs text-muted-text">
              High-resolution 1254px production artwork designed for verified milestone progression.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {OFFICIAL_ILLUSTRATED_BADGES.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelectedBadge(b)}
              className="text-left p-6 rounded-3xl bg-panel-navy border-sticker-purple glow-purple transition-all duration-300 hover:-translate-y-1 hover:border-toxic-lime focus:outline-none focus:ring-2 focus:ring-toxic-lime group"
              aria-label={b.accessibleLabel}
            >
              <div className="flex items-start justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-toxic-lime/20 text-toxic-lime border border-toxic-lime/40">
                  {b.rarity}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-reward-yellow/20 text-reward-yellow border border-reward-yellow/40 flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{b.status}</span>
                </span>
              </div>

              <div className="my-4 relative aspect-square w-full max-w-[200px] mx-auto rounded-2xl overflow-hidden bg-midnight-bg/60 p-3 border border-panel-navy-light flex items-center justify-center">
                <Image
                  src={b.icon}
                  alt={b.name}
                  width={200}
                  height={200}
                  className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <h4 className="font-display font-bold text-cloud-white text-xl group-hover:text-toxic-lime">
                {b.name}
              </h4>
              <p className="mt-1 text-xs text-muted-text/90 line-clamp-2 leading-relaxed">
                {b.description}
              </p>

              <div className="mt-4 pt-3 border-t border-panel-navy-light/60 text-[11px] font-mono text-cloud-white/70">
                <span>Criterion: {b.criteria}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Additional Social Badge Concepts */}
      <div className="space-y-6 pt-4 border-t border-panel-navy-light/40">
        <h3 className="font-display font-extrabold text-xl text-cloud-white uppercase">
          Preview Badge Concepts
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONCEPT_BADGES.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelectedBadge(b)}
              className="text-left p-5 rounded-2xl bg-panel-navy border-sticker transition-all duration-300 hover:-translate-y-1 hover:border-toxic-lime focus:outline-none focus:ring-2 focus:ring-toxic-lime group"
              aria-label={b.accessibleLabel}
            >
              <div className="flex items-start justify-between">
                <div className="relative w-10 h-10 rounded-xl bg-midnight-bg p-2 border border-panel-navy-light flex items-center justify-center flex-shrink-0">
                  <Image src={b.icon} alt="" width={28} height={28} className="object-contain" />
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-reward-yellow/10 text-reward-yellow border border-reward-yellow/30">
                  {b.status}
                </span>
              </div>

              <h4 className="mt-3 font-display font-bold text-cloud-white text-base group-hover:text-toxic-lime">
                {b.name}
              </h4>
              <p className="mt-1 text-xs text-muted-text/90 line-clamp-2 leading-relaxed">
                {b.description}
              </p>

              <div className="mt-3 pt-2 border-t border-panel-navy-light/60 flex items-center justify-between text-[10px] font-mono text-cloud-white/60">
                <span>{b.criteria}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Accessible Badge Detail Modal */}
      {selectedBadge && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight-bg/85 backdrop-blur-sm"
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
              <div className="w-20 h-20 rounded-2xl bg-midnight-bg p-2 border-2 border-royal-purple flex items-center justify-center">
                <Image
                  src={selectedBadge.icon}
                  alt={selectedBadge.name}
                  width={160}
                  height={160}
                  className="object-contain w-full h-full"
                />
              </div>
              <div>
                <h3 id="modal-badge-title" className="font-display font-bold text-xl text-cloud-white">
                  {selectedBadge.name}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-toxic-lime/20 text-toxic-lime border border-toxic-lime/40">
                    {selectedBadge.rarity}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-reward-yellow/20 text-reward-yellow border border-reward-yellow/40">
                    {selectedBadge.status}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-cloud-white/90 leading-relaxed font-sans">{selectedBadge.description}</p>

            <div className="p-3 rounded-xl bg-midnight-bg border border-panel-navy-light text-xs font-mono space-y-1">
              <div className="text-toxic-lime font-bold">Unlock Criterion:</div>
              <p className="text-muted-text">{selectedBadge.criteria}</p>
            </div>

            {selectedBadge.discordIcon && (
              <div className="p-3 rounded-xl bg-midnight-bg border border-panel-navy-light flex items-center space-x-3">
                <Image
                  src={selectedBadge.discordIcon}
                  alt="Discord format"
                  width={36}
                  height={36}
                  className="object-contain"
                />
                <div className="text-[11px] font-mono text-cloud-white/80">
                  <span className="text-royal-purple font-bold block">Discord Badge Asset (256px)</span>
                  <span>Optimized for Discord bot embeds & profile popups.</span>
                </div>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between text-xs font-mono text-cloud-white/60">
              <span>Status: <strong className="text-reward-yellow">{selectedBadge.status}</strong></span>
              <span>No Cash Value</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
