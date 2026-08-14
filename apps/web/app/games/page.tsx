import Link from "next/link";
import { Gamepad2, Clock, CheckCircle2, ArrowRight } from "lucide-react";

export default function GamesHubPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-toxic-lime/10 border border-toxic-lime/40 text-toxic-lime font-mono text-xs font-bold uppercase">
          <Gamepad2 className="w-4 h-4" />
          <span>Supported Gaming Platforms</span>
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-cloud-white">
          Games & Integration Hub
        </h1>
        <p className="text-muted-text text-base">
          Rank Rascal currently supports Roblox as our primary live integration. We present an honest roadmap for future titles.
        </p>
      </div>

      {/* Active Live Integration */}
      <div className="p-8 sm:p-10 rounded-3xl bg-panel-navy border-sticker-lime glow-lime grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center space-x-3">
            <span className="font-display font-extrabold text-3xl text-cloud-white">Roblox</span>
            <span className="px-3 py-1 rounded-full bg-toxic-lime/20 border border-toxic-lime/40 text-xs font-mono font-bold text-toxic-lime">
              LIVE INTEGRATION
            </span>
          </div>
          <p className="text-sm text-muted-text leading-relaxed">
            Full support for Roblox OAuth PKCE identity linking, verified Rotfiles, public badge milestone tracking, avatar Drip Inspections, and server Yapping Order leaderboards.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-cloud-white/90">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-toxic-lime" />
              <span>Official PKCE OAuth Verification</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-toxic-lime" />
              <span>Public Badge Counting & Milestones</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-toxic-lime" />
              <span>Avatar Outfit Inspection</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-toxic-lime" />
              <span>Witness Protection Privacy Support</span>
            </li>
          </ul>
          <div className="pt-2">
            <Link
              href="/games/roblox"
              className="inline-flex items-center space-x-2 bg-royal-purple text-cloud-white px-5 py-2.5 rounded-xl font-mono text-xs font-bold hover:bg-royal-purple/90"
            >
              <span>Explore Roblox Integration Details</span>
              <ArrowRight className="w-4 h-4 text-toxic-lime" />
            </Link>
          </div>
        </div>
      </div>

      {/* Honest Roadmap Section */}
      <div className="space-y-6">
        <h2 className="font-display font-bold text-2xl text-cloud-white text-center sm:text-left">
          Roadmap & Upcoming Platforms
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Fortnite */}
          <div className="p-8 rounded-3xl bg-panel-navy/60 border border-panel-navy-light space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-2xl text-cloud-white">Fortnite</h3>
              <span className="px-3 py-1 rounded-full bg-reward-yellow/20 border border-reward-yellow/40 text-xs font-mono font-bold text-reward-yellow flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5" />
                <span>COMING SOON</span>
              </span>
            </div>
            <p className="text-xs text-muted-text leading-relaxed">
              Battle Royale victory stats, crown flex cards, and locker outfit drip inspections are currently under API research.
            </p>
            <div className="p-3 rounded-xl bg-midnight-bg border border-panel-navy-light text-xs font-mono text-cloud-white/70">
              <span className="text-reward-yellow font-bold">Status: </span>
              <span>API feasibility research in progress. No live data or release dates claimed.</span>
            </div>
          </div>

          {/* VALORANT */}
          <div className="p-8 rounded-3xl bg-panel-navy/60 border border-panel-navy-light space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-2xl text-cloud-white">VALORANT</h3>
              <span className="px-3 py-1 rounded-full bg-reward-yellow/20 border border-reward-yellow/40 text-xs font-mono font-bold text-reward-yellow flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5" />
                <span>COMING SOON</span>
              </span>
            </div>
            <p className="text-xs text-muted-text leading-relaxed">
              Competitive rank tracking, headshot percentage flex cards, and agent main rivalry comparisons planned for future releases.
            </p>
            <div className="p-3 rounded-xl bg-midnight-bg border border-panel-navy-light text-xs font-mono text-cloud-white/70">
              <span className="text-reward-yellow font-bold">Status: </span>
              <span>API feasibility research in progress. No live data or release dates claimed.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
