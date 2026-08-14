import React from "react";
import Image from "next/image";
import { Award, Zap, Trophy, ShieldAlert } from "lucide-react";

export const FlexCardPreview: React.FC = () => {
  return (
    <div className="relative p-6 sm:p-8 rounded-3xl bg-panel-navy border-sticker-pink glow-pink max-w-md mx-auto transform rot-tilt-right transition-transform duration-300 hover:rotate-0">
      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <span className="px-3 py-1 rounded-full bg-hot-pink/20 border border-hot-pink/40 text-xs font-mono font-bold text-hot-pink uppercase tracking-wide">
          FLEX CARD CARD #04
        </span>
        <span className="text-xs font-mono text-reward-yellow font-semibold flex items-center space-x-1">
          <Trophy className="w-3.5 h-3.5" />
          <span>RANK #1 SERVER</span>
        </span>
      </div>

      {/* Main Flex Visual */}
      <div className="mt-6 flex items-center space-x-4 bg-midnight-bg p-4 rounded-2xl border border-panel-navy-light">
        <div className="relative w-16 h-16 rounded-xl bg-panel-navy p-1 border border-hot-pink/60 flex-shrink-0">
          <Image
            src="/brand/emojis/rascal-hype.png"
            alt="Flex Avatar"
            width={64}
            height={64}
            className="object-contain"
          />
        </div>
        <div>
          <h4 className="font-display font-bold text-cloud-white text-lg">ChaosKing99</h4>
          <p className="text-xs font-mono text-toxic-lime font-semibold">1,240 Public Badges</p>
          <p className="text-xs text-muted-text mt-0.5 font-mono">Fraudcheck Status: CLEAN</p>
        </div>
      </div>

      {/* Achievement Highlights */}
      <div className="mt-4 grid grid-cols-2 gap-3 text-xs font-mono">
        <div className="p-3 rounded-xl bg-midnight-bg border border-panel-navy-light/60">
          <div className="flex items-center space-x-1 text-reward-yellow">
            <Award className="w-3.5 h-3.5" />
            <span className="font-bold">Badge Flex</span>
          </div>
          <p className="text-cloud-white font-semibold mt-1">Top 1% Server</p>
        </div>
        <div className="p-3 rounded-xl bg-midnight-bg border border-panel-navy-light/60">
          <div className="flex items-center space-x-1 text-toxic-lime">
            <Zap className="w-3.5 h-3.5" />
            <span className="font-bold">Rascal Rep</span>
          </div>
          <p className="text-cloud-white font-semibold mt-1">98 / 100 Rep</p>
        </div>
      </div>

      {/* Footer warning tag */}
      <div className="mt-5 pt-3 border-t border-panel-navy-light/60 flex items-center justify-between text-[11px] font-mono text-cloud-white/60">
        <span className="flex items-center space-x-1">
          <ShieldAlert className="w-3.5 h-3.5 text-hot-pink" />
          <span>Calculated Verdict</span>
        </span>
        <span className="text-cloud-white/40">Rank Rascal Showcase</span>
      </div>
    </div>
  );
};
