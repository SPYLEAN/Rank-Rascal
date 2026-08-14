import React from "react";
import { GameRoadmapPanel } from "@/components/GameRoadmapPanel";
import { ReactionRail } from "@/components/ReactionRail";
import { Gamepad2 } from "lucide-react";

export default function GamesHubPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-toxic-lime/10 border border-toxic-lime/40 text-toxic-lime font-mono text-xs font-bold uppercase">
          <Gamepad2 className="w-4 h-4" />
          <span>Supported Gaming Platforms</span>
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-cloud-white uppercase">
          YOUR GAMING LORE SHOULD NOT LIVE IN ONE GAME.
        </h1>
        <p className="text-muted-text text-base">
          Rank Rascal currently supports Roblox as our primary live integration. We present an honest roadmap for future titles.
        </p>
      </div>

      <ReactionRail />

      {/* 3 Illustrated Game Panels */}
      <GameRoadmapPanel />
    </div>
  );
}
