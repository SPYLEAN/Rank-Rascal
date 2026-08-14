import { RazzMascot } from "@/components/RazzMascot";
import { BadgeCard } from "@/components/BadgeCard";
import { Award, Sparkles, AlertCircle, Flame, ShieldAlert, Zap } from "lucide-react";

export default function RewardsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <RazzMascot pose="badge-present" size={180} className="mx-auto" />
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-reward-yellow/10 border border-reward-yellow/40 text-reward-yellow font-mono text-xs font-bold uppercase">
          <Award className="w-4 h-4" />
          <span>Collectibles & Reputation System</span>
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-cloud-white">
          Rank Rascal Rewards & Lore
        </h1>
        <p className="text-muted-text text-base leading-relaxed">
          Collect digital badges, earn Rascal Rep, unlock Flex Cards, and build your server legacy.
        </p>

        {/* Monetary disclaimer */}
        <div className="bg-panel-navy border border-royal-purple/40 rounded-2xl p-4 text-xs font-mono text-cloud-white/80 max-w-2xl mx-auto flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-toxic-lime flex-shrink-0" />
          <span>
            <strong className="text-toxic-lime">Disclaimer:</strong> Badges, Rascal Rep, and Flex Cards are strictly digital Discord social achievements. They have <strong>zero monetary value</strong> and cannot be traded, sold, or redeemed for real money.
          </span>
        </div>
      </div>

      {/* Rewards System Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Rotfile */}
        <div className="p-6 rounded-3xl bg-panel-navy border-sticker space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-xl text-cloud-white">The Rotfile</h3>
            <span className="px-2.5 py-1 rounded-full bg-toxic-lime/20 border border-toxic-lime/40 text-xs font-mono font-bold text-toxic-lime">
              LIVE FEATURE
            </span>
          </div>
          <p className="text-xs text-muted-text leading-relaxed">
            Your core Roblox Discord identity card showing verified avatar, badge totals, account era, and deterministic drip verdicts.
          </p>
        </div>

        {/* Rascal Rep */}
        <div className="p-6 rounded-3xl bg-panel-navy border-sticker space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-xl text-cloud-white">Rascal Rep</h3>
            <span className="px-2.5 py-1 rounded-full bg-toxic-lime/20 border border-toxic-lime/40 text-xs font-mono font-bold text-toxic-lime">
              LIVE FEATURE
            </span>
          </div>
          <p className="text-xs text-muted-text leading-relaxed">
            Server reputation score calculated from verified public Roblox achievements, account longevity, and Drip Check heat.
          </p>
        </div>

        {/* Flex Cards */}
        <div className="p-6 rounded-3xl bg-panel-navy border-sticker space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-xl text-cloud-white">Flex Cards</h3>
            <span className="px-2.5 py-1 rounded-full bg-toxic-lime/20 border border-toxic-lime/40 text-xs font-mono font-bold text-toxic-lime">
              LIVE FEATURE
            </span>
          </div>
          <p className="text-xs text-muted-text leading-relaxed">
            Head-to-head /fraudcheck comparison cards to show off public badge milestones against server rivals.
          </p>
        </div>

        {/* Collectible Badges */}
        <div className="p-6 rounded-3xl bg-panel-navy border-sticker space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-xl text-cloud-white">Collectible Badges</h3>
            <span className="px-2.5 py-1 rounded-full bg-toxic-lime/20 border border-toxic-lime/40 text-xs font-mono font-bold text-toxic-lime">
              LIVE FEATURE
            </span>
          </div>
          <p className="text-xs text-muted-text leading-relaxed">
            Automatic badges for account creation milestones, badge thresholds, and Drip Check achievements.
          </p>
        </div>

        {/* Server Quests (Roadmap) */}
        <div className="p-6 rounded-3xl bg-panel-navy/60 border border-panel-navy-light space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-xl text-cloud-white">Server Quests</h3>
            <span className="px-2.5 py-1 rounded-full bg-reward-yellow/20 border border-reward-yellow/40 text-xs font-mono font-bold text-reward-yellow">
              ROADMAP CONCEPT
            </span>
          </div>
          <p className="text-xs text-muted-text leading-relaxed">
            Weekly community badge goals where server members collaborate to unlock server-wide roles and titles.
          </p>
        </div>

        {/* Streaks & Daily Recaps (Roadmap) */}
        <div className="p-6 rounded-3xl bg-panel-navy/60 border border-panel-navy-light space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-xl text-cloud-white">Streaks & Recaps</h3>
            <span className="px-2.5 py-1 rounded-full bg-reward-yellow/20 border border-reward-yellow/40 text-xs font-mono font-bold text-reward-yellow">
              ROADMAP CONCEPT
            </span>
          </div>
          <p className="text-xs text-muted-text leading-relaxed">
            Daily activity streak tracking and automated server recap embeds showcasing daily drip winners.
          </p>
        </div>
      </div>

      {/* Badges Gallery */}
      <div className="space-y-6 pt-8">
        <h2 className="font-display font-bold text-2xl text-cloud-white">
          Digital Badge Showcase
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BadgeCard
            title="Veteran Noob"
            category="Roblox Milestones"
            description="Linked a Roblox account created over 5 years ago. Survived ancient Roblox physics."
            rarity="Epic"
            isUnlocked={true}
            statusLabel="Available Now"
          />
          <BadgeCard
            title="Drip Monarch"
            category="Drip Inspections"
            description="Achieved 5 consecutive Heat verdicts on /dripcheck across server channels."
            rarity="Legendary"
            isUnlocked={true}
            statusLabel="Available Now"
          />
          <BadgeCard
            title="Quest Crusader"
            category="Server Quests"
            description="Completed 10 weekly server badge quests together with guildmates."
            rarity="Rascal"
            isUnlocked={false}
            statusLabel="Roadmap Concept"
          />
        </div>
      </div>
    </div>
  );
}
