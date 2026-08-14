import React from "react";
import Image from "next/image";
import { Trophy, Award, Sparkles, AlertCircle } from "lucide-react";

export const LeaderboardPreview: React.FC = () => {
  const mockLeaderboard = [
    {
      rank: 1,
      username: "NoobMaster69",
      badges: 412,
      rep: 95,
      verdict: "Server Brain Rot Champion",
      avatar: "/brand/emojis/rascal-hype.png",
      badgeColor: "text-reward-yellow",
    },
    {
      rank: 2,
      username: "BloxLegend_2026",
      badges: 342,
      rep: 85,
      verdict: "Certified Drip Master",
      avatar: "/brand/emojis/rascal-win.png",
      badgeColor: "text-cloud-white",
    },
    {
      rank: 3,
      username: "PixelKnight",
      badges: 289,
      rep: 78,
      verdict: "Badge Hunter Extreme",
      avatar: "/brand/emojis/rascal-sus.png",
      badgeColor: "text-hot-pink",
    },
  ];

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-panel-navy border-sticker glow-lime max-w-2xl mx-auto space-y-6">
      {/* Product Demo Warning Header */}
      <div className="flex items-center justify-between border-b border-panel-navy-light pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-midnight-bg border border-toxic-lime/40">
            <Trophy className="w-6 h-6 text-toxic-lime" />
          </div>
          <div>
            <h3 className="font-display font-bold text-cloud-white text-xl flex items-center space-x-2">
              <span>Yapping Order Leaderboard</span>
            </h3>
            <p className="text-xs font-mono text-muted-text">Server Chaos Rankings (/yapping-order)</p>
          </div>
        </div>

        {/* EXPLICIT DEMO BADGE */}
        <div className="flex items-center space-x-1.5 bg-reward-yellow/10 border border-reward-yellow/40 px-3 py-1.5 rounded-full">
          <AlertCircle className="w-4 h-4 text-reward-yellow" />
          <span className="text-xs font-mono font-bold text-reward-yellow uppercase tracking-wider">
            Product Demonstration
          </span>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="space-y-3">
        {mockLeaderboard.map((user) => (
          <div
            key={user.rank}
            className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-midnight-bg border border-panel-navy-light/80 hover:border-royal-purple/50 transition-colors"
          >
            <div className="flex items-center space-x-3 sm:space-x-4">
              <span className={`font-mono font-extrabold text-lg w-6 text-center ${user.badgeColor}`}>
                #{user.rank}
              </span>
              <div className="relative w-10 h-10 rounded-lg bg-panel-navy p-1 border border-panel-navy-light flex-shrink-0">
                <Image src={user.avatar} alt={user.username} width={40} height={40} className="object-contain" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-cloud-white text-sm sm:text-base">
                  {user.username}
                </h4>
                <p className="text-xs text-muted-text/80 font-mono hidden sm:block">{user.verdict}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-xs font-mono text-right">
              <div>
                <div className="flex items-center space-x-1 text-reward-yellow font-bold">
                  <Award className="w-3.5 h-3.5" />
                  <span>{user.badges}</span>
                </div>
                <span className="text-[10px] text-muted-text">Badges</span>
              </div>
              <div className="pl-3 border-l border-panel-navy-light">
                <div className="flex items-center space-x-1 text-toxic-lime font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{user.rep}</span>
                </div>
                <span className="text-[10px] text-muted-text">Rascal Rep</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-2 text-xs font-mono text-cloud-white/50">
        * Rankings reflect opt-in verified public profiles only. Users with Witness Protection enabled are hidden.
      </div>
    </div>
  );
};
