"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RazzMascot } from "@/components/RazzMascot";
import { RotfilePreview } from "@/components/RotfilePreview";
import { FlexCardPreview } from "@/components/FlexCardPreview";
import { LeaderboardPreview } from "@/components/LeaderboardPreview";
import { BadgeCard } from "@/components/BadgeCard";
import { CANONICAL_THREE_BADGES } from "@/lib/badge-data";
import {
  Sparkles,
  ShieldCheck,
  Award,
  Terminal,
  ArrowRight,
  Flame,
  Clock,
  Layers,
  EyeOff,
  Trophy,
  CheckCircle2,
  Lock,
} from "lucide-react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"rotfile" | "dripcheck" | "fraudcheck" | "leaderboard">("rotfile");
  const discordInviteUrl = process.env.NEXT_PUBLIC_DISCORD_INSTALL_URL || "/invite";

  return (
    <div className="space-y-12 sm:space-y-20 pb-16 overflow-x-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* ========================================================================= */}
      {/* SCROLL 1: HERO & IMMEDIATE IMPACT                                         */}
      {/* ========================================================================= */}
      <section className="relative pt-6 sm:pt-12 pb-8 sm:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-toxic-lime/10 border border-toxic-lime/40 text-toxic-lime font-mono text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-toxic-lime" />
              <span>Certified Roblox Gaming Identity Bot</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-cloud-white tracking-tight leading-tight uppercase">
              PLAY GAMES. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-purple via-toxic-lime to-hot-pink">
                FLEX ACHIEVEMENTS.
              </span> <br />
              COLLECT CHAOS.
            </h1>

            <p className="text-sm sm:text-base text-muted-text max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Turn your gaming identity into verified flexes, collectible badges, friendly server rivalries, and certified brain rot.
            </p>

            {/* Direct Touch CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
              <a
                href={discordInviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-royal-purple hover:bg-royal-purple/90 text-cloud-white px-7 py-3.5 rounded-2xl font-display font-bold text-sm sm:text-base transition-all shadow-sticker-lime hover:translate-x-[2px] hover:translate-y-[2px]"
              >
                <Sparkles className="w-5 h-5 text-toxic-lime" />
                <span>Add to Discord</span>
              </a>

              <Link
                href="/commands"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-panel-navy hover:bg-panel-navy-light text-cloud-white border border-panel-navy-light px-6 py-3.5 rounded-2xl font-display font-semibold text-sm sm:text-base transition-all hover:border-toxic-lime"
              >
                <Terminal className="w-4 h-4 text-toxic-lime" />
                <span>See Commands</span>
              </Link>
            </div>
          </div>

          {/* Hero Mascot Card */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="absolute inset-0 bg-royal-purple/20 rounded-full blur-3xl -z-10 transform scale-90" />

            {/* Floating Decorative Emoji 1 */}
            <div className="absolute -top-3 -left-3 z-20 animate-bounce motion-reduce:animate-none">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-midnight-bg border-2 border-toxic-lime p-1 shadow-sticker">
                <Image src="/brand/emojis/discord/rascal-hype.png" alt="" width={40} height={40} className="object-contain" />
              </div>
            </div>

            {/* Floating Decorative Emoji 2 */}
            <div className="absolute -bottom-3 -right-3 z-20 animate-pulse motion-reduce:animate-none">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-midnight-bg border-2 border-hot-pink p-1 shadow-sticker">
                <Image src="/brand/emojis/discord/rascal-win.png" alt="" width={40} height={40} className="object-contain" />
              </div>
            </div>

            {/* Central Mascot Box */}
            <div className="relative p-5 sm:p-6 rounded-3xl bg-panel-navy/90 border-sticker-purple glow-purple text-center w-full max-w-xs sm:max-w-sm">
              <RazzMascot pose="hero-point" size={240} className="mx-auto" />
              <div className="mt-2 p-2.5 rounded-xl bg-midnight-bg border border-panel-navy-light font-mono text-xs text-toxic-lime">
                &quot;Ready to inspect your server&apos;s rotted stats!&quot;
              </div>
            </div>
          </div>
        </div>

        {/* Compact Security & Trust Grid */}
        <div className="mt-8 p-4 rounded-2xl bg-panel-navy border-sticker grid grid-cols-2 md:grid-cols-4 gap-3 text-center font-mono text-xs text-cloud-white">
          <div className="p-2.5 rounded-xl bg-midnight-bg border border-panel-navy-light/60 flex flex-col items-center justify-center space-y-0.5">
            <ShieldCheck className="w-4 h-4 text-toxic-lime" />
            <span className="font-bold text-cloud-white text-[11px] sm:text-xs">Zero Passwords</span>
            <span className="text-[10px] text-muted-text">PKCE OAuth 2.0</span>
          </div>
          <div className="p-2.5 rounded-xl bg-midnight-bg border border-panel-navy-light/60 flex flex-col items-center justify-center space-y-0.5">
            <Terminal className="w-4 h-4 text-royal-purple" />
            <span className="font-bold text-cloud-white text-[11px] sm:text-xs">9 Commands</span>
            <span className="text-[10px] text-muted-text">Gateway Socket</span>
          </div>
          <div className="p-2.5 rounded-xl bg-midnight-bg border border-panel-navy-light/60 flex flex-col items-center justify-center space-y-0.5">
            <EyeOff className="w-4 h-4 text-hot-pink" />
            <span className="font-bold text-cloud-white text-[11px] sm:text-xs">Opt-In Privacy</span>
            <span className="text-[10px] text-muted-text">/witness-protection</span>
          </div>
          <div className="p-2.5 rounded-xl bg-midnight-bg border border-panel-navy-light/60 flex flex-col items-center justify-center space-y-0.5">
            <Flame className="w-4 h-4 text-reward-yellow" />
            <span className="font-bold text-cloud-white text-[11px] sm:text-xs">Curated Humor</span>
            <span className="text-[10px] text-muted-text">No Insults</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SCROLL 2: INTERACTIVE FEATURE DEMO SWITCHER (COMPACT MOBILE CAROUSEL/TAB) */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-hot-pink/10 border border-hot-pink/40 text-hot-pink font-mono text-xs font-bold uppercase">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Feature Demos</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-cloud-white uppercase">
            What Rank Rascal Does
          </h2>
          <p className="text-xs sm:text-sm text-muted-text">
            Tap a feature tab below to preview live identity cards, Drip Checks, and server leaderboards.
          </p>
        </div>

        {/* Tab Switcher Buttons */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar space-x-2 p-1.5 rounded-2xl bg-panel-navy border border-panel-navy-light">
          <button
            onClick={() => setActiveTab("rotfile")}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === "rotfile"
                ? "bg-royal-purple text-cloud-white shadow-sticker-lime"
                : "text-muted-text hover:text-cloud-white"
            }`}
          >
            🪪 The Rotfile
          </button>
          <button
            onClick={() => setActiveTab("dripcheck")}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === "dripcheck"
                ? "bg-royal-purple text-cloud-white shadow-sticker-lime"
                : "text-muted-text hover:text-cloud-white"
            }`}
          >
            🔥 Drip Check
          </button>
          <button
            onClick={() => setActiveTab("fraudcheck")}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === "fraudcheck"
                ? "bg-royal-purple text-cloud-white shadow-sticker-lime"
                : "text-muted-text hover:text-cloud-white"
            }`}
          >
            🔍 Fraud Check
          </button>
          <button
            onClick={() => setActiveTab("leaderboard")}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === "leaderboard"
                ? "bg-royal-purple text-cloud-white shadow-sticker-lime"
                : "text-muted-text hover:text-cloud-white"
            }`}
          >
            🏆 Yapping Order
          </button>
        </div>

        {/* Interactive Preview Container */}
        <div className="p-6 sm:p-10 rounded-3xl bg-panel-navy border-sticker-purple glow-purple min-h-[380px] flex items-center justify-center">
          {activeTab === "rotfile" && (
            <div className="w-full max-w-xl space-y-4">
              <div className="text-center sm:text-left space-y-1">
                <span className="text-xs font-mono font-bold text-toxic-lime">/rotfile [user]</span>
                <h3 className="font-display font-bold text-xl text-cloud-white">The Verified Roblox Identity Card</h3>
                <p className="text-xs text-muted-text">Pulls verified avatars, Roblox account age, public badges, and Rascal Rep.</p>
              </div>
              <RotfilePreview />
            </div>
          )}

          {activeTab === "dripcheck" && (
            <div className="w-full max-w-xl space-y-4">
              <div className="text-center sm:text-left space-y-1">
                <span className="text-xs font-mono font-bold text-hot-pink">/dripcheck [user]</span>
                <h3 className="font-display font-bold text-xl text-cloud-white">Deterministic Avatar Outfit Heat Inspection</h3>
                <p className="text-xs text-muted-text">Evaluates avatar outfit heat using safe, curated chaotic humor without insults.</p>
              </div>
              <FlexCardPreview />
            </div>
          )}

          {activeTab === "fraudcheck" && (
            <div className="w-full max-w-xl space-y-4">
              <div className="text-center sm:text-left space-y-1">
                <span className="text-xs font-mono font-bold text-reward-yellow">/fraudcheck target:@guildmate</span>
                <h3 className="font-display font-bold text-xl text-cloud-white">Head-to-Head Public Badge Comparison</h3>
                <p className="text-xs text-muted-text">Compares your public badge milestones against a server rival.</p>
              </div>
              <FlexCardPreview />
            </div>
          )}

          {activeTab === "leaderboard" && (
            <div className="w-full max-w-xl space-y-4">
              <div className="text-center sm:text-left space-y-1">
                <span className="text-xs font-mono font-bold text-toxic-lime">/yapping-order</span>
                <h3 className="font-display font-bold text-xl text-cloud-white">Server Activity & Identity Leaderboard</h3>
                <p className="text-xs text-muted-text">Displays top server identity rankings with privacy-aware witness protection.</p>
              </div>
              <LeaderboardPreview />
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SCROLL 3: CANONICAL PRODUCTION BADGES SHOWCASE                             */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="p-6 sm:p-10 rounded-3xl bg-panel-navy border-sticker space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-reward-yellow/10 border border-reward-yellow/40 text-reward-yellow font-mono text-xs font-bold uppercase">
                <Award className="w-3.5 h-3.5" />
                <span>Canonical Illustrated Badges</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-cloud-white uppercase">
                YOUR SERVER MOMENTS JUST DROPPED LOOT.
              </h2>
            </div>
            <Link
              href="/rewards"
              className="inline-flex items-center space-x-2 text-toxic-lime hover:underline font-mono text-xs font-bold self-start sm:self-auto"
            >
              <span>Explore Rewards Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 3 Official Illustrated Badges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {CANONICAL_THREE_BADGES.map((b) => (
              <BadgeCard
                key={b.id}
                title={b.name}
                category={b.category}
                description={b.description}
                rarity="Rascal"
                isUnlocked={false}
                statusLabel="Preview"
                badgeImage={b.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SCROLL 4: SECURITY GUARANTEE & FINAL DISCORD INVITE                        */}
      {/* ========================================================================= */}
      <section className="space-y-8">
        {/* Opt-In Privacy Shield Box */}
        <div className="p-6 sm:p-10 rounded-3xl bg-panel-navy border-sticker-purple grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 flex justify-center">
            <Image
              src="/brand/website-art/razz-privacy-guardian.png"
              alt="Razz protects a verified profile with a privacy shield and key."
              width={320}
              height={480}
              className="w-full h-auto max-w-[180px] sm:max-w-xs object-contain rounded-2xl"
            />
          </div>

          <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-toxic-lime/10 border border-toxic-lime/40 text-toxic-lime font-mono text-xs font-bold uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>Opt-In Privacy & Safety</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-cloud-white uppercase">
              VERIFIED FLEX. PRIVATE WHEN YOU WANT IT.
            </h2>
            <p className="text-xs sm:text-sm text-muted-text leading-relaxed font-sans">
              Roblox handles passwords exclusively via official PKCE OAuth. Rank Rascal never requests passwords, and optional <code className="text-toxic-lime font-mono">/witness-protection</code> lets you hide your profile from public rankings anytime.
            </p>
            <div className="pt-2 flex flex-wrap justify-center lg:justify-start gap-4 text-xs font-mono">
              <Link href="/verify" className="text-toxic-lime hover:underline font-semibold">
                Verification Guide →
              </Link>
              <Link href="/privacy" className="text-toxic-lime hover:underline font-semibold">
                Privacy Policy →
              </Link>
            </div>
          </div>
        </div>

        {/* Final Community Banner CTA */}
        <div className="relative rounded-3xl overflow-hidden border-sticker-lime glow-lime min-h-[300px] flex items-center justify-center text-center p-8 sm:p-12">
          <Image
            src="/brand/website-art/razz-community-clubhouse-banner.png"
            alt="Razz hosts a digital clubhouse."
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover -z-10"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121526] via-[#121526]/85 to-[#121526]/60 -z-10" />

          <div className="max-w-xl mx-auto space-y-5 z-10">
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-cloud-white uppercase">
              YOUR SERVER IS ABOUT TO GET LORE.
            </h2>
            <p className="text-xs sm:text-sm text-muted-text leading-relaxed font-sans">
              Build Rotfiles, hunt badges, challenge friends, and give every gaming session something worth yapping about.
            </p>
            <div className="pt-1">
              <a
                href={discordInviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 bg-royal-purple hover:bg-royal-purple/90 text-cloud-white px-7 py-3.5 rounded-2xl font-display font-bold text-sm sm:text-base transition-all shadow-sticker-lime hover:translate-x-[2px] hover:translate-y-[2px]"
              >
                <Sparkles className="w-5 h-5 text-toxic-lime" />
                <span>Add Rank Rascal</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
