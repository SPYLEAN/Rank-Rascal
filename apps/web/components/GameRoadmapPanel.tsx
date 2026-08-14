import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BRAND_ASSETS } from "@/lib/brand-assets";
import { Clock, CheckCircle2, ArrowRight, ShieldAlert } from "lucide-react";

export const GameRoadmapPanel: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* 1. Roblox Panel (Live) */}
      <div className="p-8 sm:p-10 rounded-3xl bg-panel-navy border-sticker-lime glow-lime grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display font-extrabold text-3xl text-cloud-white">Roblox</h3>
            <span className="px-3 py-1 rounded-full bg-toxic-lime/20 border border-toxic-lime/40 text-xs font-mono font-bold text-toxic-lime">
              LIVE INTEGRATION
            </span>
          </div>
          <p className="text-sm text-muted-text leading-relaxed font-sans">
            Connect your Roblox identity, build a Rotfile, inspect your avatar drip and turn public achievements into friendly server competition.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-cloud-white/90">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-toxic-lime flex-shrink-0" />
              <span>Official PKCE OAuth Verification</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-toxic-lime flex-shrink-0" />
              <span>Public Badge Counting & Milestones</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-toxic-lime flex-shrink-0" />
              <span>Avatar Outfit Inspection</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-toxic-lime flex-shrink-0" />
              <span>Witness Protection Privacy Support</span>
            </li>
          </ul>
          <div className="pt-2">
            <Link
              href="/games/roblox"
              className="inline-flex items-center space-x-2 bg-royal-purple text-cloud-white px-5 py-2.5 rounded-xl font-mono text-xs font-bold hover:bg-royal-purple/90"
            >
              <span>View Integration Docs</span>
              <ArrowRight className="w-4 h-4 text-toxic-lime" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-4 flex justify-center">
          <div className="p-6 rounded-2xl bg-midnight-bg border border-panel-navy-light text-center space-y-3">
            <Image
              src={BRAND_ASSETS.appIcon}
              alt="Rank Rascal Roblox Identity"
              width={120}
              height={120}
              className="mx-auto object-contain"
            />
            <span className="text-xs font-mono text-toxic-lime font-bold block">
              Roblox Identity Connected
            </span>
          </div>
        </div>
      </div>

      {/* 2. Fortnite Panel (Coming Soon) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-panel-navy border border-panel-navy-light space-y-6">
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-midnight-bg border border-panel-navy-light min-h-[220px]">
          <Image
            src={BRAND_ASSETS.websiteArt.battleRoyaleBanner}
            alt="Razz glides toward a colorful floating-island competition."
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
          <div className="absolute top-4 right-4 z-10">
            <span className="px-3 py-1.5 rounded-full bg-reward-yellow border border-reward-yellow/80 text-midnight-bg font-mono font-extrabold text-xs tracking-wider flex items-center space-x-1 shadow-sticker">
              <Clock className="w-3.5 h-3.5" />
              <span>COMING SOON</span>
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-display font-extrabold text-2xl text-cloud-white">Fortnite</h3>
          <p className="text-xs text-muted-text leading-relaxed font-sans">
            Battle-royale identity and achievement concepts are under research. No release date has been promised.
          </p>
          <div className="p-3 rounded-xl bg-midnight-bg border border-panel-navy-light text-xs font-mono text-cloud-white/70 flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-reward-yellow flex-shrink-0" />
            <span>Integration details remain under feasibility research. Illustrated figures represent original genre art.</span>
          </div>
        </div>
      </div>

      {/* 3. VALORANT Panel (Coming Soon) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-panel-navy border border-panel-navy-light space-y-6">
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-midnight-bg border border-panel-navy-light min-h-[220px]">
          <Image
            src={BRAND_ASSETS.websiteArt.tacticalBanner}
            alt="Razz leads an original neon tactical squad through a training arena."
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
          <div className="absolute top-4 right-4 z-10">
            <span className="px-3 py-1.5 rounded-full bg-reward-yellow border border-reward-yellow/80 text-midnight-bg font-mono font-extrabold text-xs tracking-wider flex items-center space-x-1 shadow-sticker">
              <Clock className="w-3.5 h-3.5" />
              <span>COMING SOON</span>
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-display font-extrabold text-2xl text-cloud-white">VALORANT</h3>
          <p className="text-xs text-muted-text leading-relaxed font-sans">
            Tactical profile and ranking concepts are under research. No release date has been promised.
          </p>
          <div className="p-3 rounded-xl bg-midnight-bg border border-panel-navy-light text-xs font-mono text-cloud-white/70 flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-reward-yellow flex-shrink-0" />
            <span>Integration details remain under feasibility research. Illustrated figures represent original genre art.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
