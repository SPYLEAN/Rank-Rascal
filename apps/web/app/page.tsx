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
import { BRAND_ASSETS } from "@/lib/brand-assets";
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
  const discordInviteUrl = process.env.NEXT_PUBLIC_DISCORD_INSTALL_URL || "/invite";

  return (
    <div className="space-y-20 sm:space-y-32 pb-20 overflow-x-hidden">
      {/* ========================================================================= */}
      {/* CHAPTER 1: OVERSIZED HERO (DISCORD.COM INSPIRED MASSIVE IMPACT)           */}
      {/* ========================================================================= */}
      <section className="relative pt-8 sm:pt-16 pb-12 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-toxic-lime/10 border border-toxic-lime/40 text-toxic-lime font-mono text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-toxic-lime" />
              <span>Certified Roblox Gaming Identity Bot</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-cloud-white tracking-tight leading-[1.05] uppercase">
              PLAY GAMES. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-purple via-toxic-lime to-hot-pink">
                FLEX ACHIEVEMENTS.
              </span> <br />
              COLLECT CHAOS.
            </h1>

            <p className="text-base sm:text-lg text-muted-text max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Rank Rascal turns your public Roblox identity into certified Discord server brain rot, Rotfiles, Drip Checks, and competitive server leaderboards.
            </p>

            {/* Oversized Touch-Friendly CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href={discordInviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-royal-purple hover:bg-royal-purple/90 text-cloud-white px-8 py-4 rounded-2xl font-display font-bold text-base sm:text-lg transition-all shadow-sticker-lime hover:translate-x-[2px] hover:translate-y-[2px]"
              >
                <Sparkles className="w-5 h-5 text-toxic-lime" />
                <span>Add to Discord</span>
              </a>

              <Link
                href="/commands"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-panel-navy hover:bg-panel-navy-light text-cloud-white border border-panel-navy-light px-7 py-4 rounded-2xl font-display font-semibold text-base sm:text-lg transition-all hover:border-toxic-lime"
              >
                <Terminal className="w-5 h-5 text-toxic-lime" />
                <span>See Commands</span>
              </Link>
            </div>
          </div>

          {/* Hero Composition: Razz Mascot + Speech Bubble + Floating Stickers */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="absolute inset-0 bg-royal-purple/25 rounded-full blur-3xl -z-10 transform scale-95" />

            {/* Floating Sticker 1 */}
            <div className="absolute -top-4 -left-4 z-20 animate-bounce motion-reduce:animate-none">
              <div className="w-12 h-12 rounded-2xl bg-midnight-bg border-2 border-toxic-lime p-1 shadow-sticker">
                <Image src="/brand/emojis/discord/rascal-hype.png" alt="" width={44} height={44} className="object-contain" />
              </div>
            </div>

            {/* Floating Sticker 2 */}
            <div className="absolute -bottom-4 -right-4 z-20 animate-pulse motion-reduce:animate-none">
              <div className="w-12 h-12 rounded-2xl bg-midnight-bg border-2 border-hot-pink p-1 shadow-sticker">
                <Image src="/brand/emojis/discord/rascal-win.png" alt="" width={44} height={44} className="object-contain" />
              </div>
            </div>

            {/* Central Mascot Box */}
            <div className="relative p-6 sm:p-8 rounded-3xl bg-panel-navy/90 border-sticker-purple glow-purple text-center w-full max-w-sm">
              <RazzMascot pose="hero-point" size={260} className="mx-auto" />
              <div className="mt-3 p-3 rounded-2xl bg-midnight-bg border border-panel-navy-light font-mono text-xs text-toxic-lime">
                &quot;Ready to inspect your server&apos;s rotted stats!&quot;
              </div>
            </div>
          </div>
        </div>

        {/* Clean 4-Column Trust Strip */}
        <div className="mt-12 p-4 sm:p-6 rounded-3xl bg-panel-navy border-sticker grid grid-cols-2 md:grid-cols-4 gap-4 text-center font-mono text-xs text-cloud-white">
          <div className="p-3 rounded-2xl bg-midnight-bg border border-panel-navy-light/60 flex flex-col items-center justify-center space-y-1">
            <ShieldCheck className="w-5 h-5 text-toxic-lime" />
            <span className="font-bold text-cloud-white">Zero Passwords</span>
            <span className="text-[10px] text-muted-text">Official PKCE OAuth</span>
          </div>
          <div className="p-3 rounded-2xl bg-midnight-bg border border-panel-navy-light/60 flex flex-col items-center justify-center space-y-1">
            <Terminal className="w-5 h-5 text-royal-purple" />
            <span className="font-bold text-cloud-white">11 Commands</span>
            <span className="text-[10px] text-muted-text">Gateway Socket</span>
          </div>
          <div className="p-3 rounded-2xl bg-midnight-bg border border-panel-navy-light/60 flex flex-col items-center justify-center space-y-1">
            <EyeOff className="w-5 h-5 text-hot-pink" />
            <span className="font-bold text-cloud-white">Opt-In Privacy</span>
            <span className="text-[10px] text-muted-text">/witness-protection</span>
          </div>
          <div className="p-3 rounded-2xl bg-midnight-bg border border-panel-navy-light/60 flex flex-col items-center justify-center space-y-1">
            <Flame className="w-5 h-5 text-reward-yellow" />
            <span className="font-bold text-cloud-white">Curated Humor</span>
            <span className="text-[10px] text-muted-text">No Harmful Insults</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 2: ALTERNATING Z-PATTERN A — "THE ROTFILE IDENTITY CARD"        */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-panel-navy border-sticker-purple glow-purple grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-toxic-lime/10 border border-toxic-lime/40 text-toxic-lime font-mono text-xs font-bold uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Gaming Identity</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-cloud-white uppercase leading-tight">
              YOUR GAMING LIFE, ALL IN ONE PROFILE CARD.
            </h2>
            <p className="text-sm sm:text-base text-muted-text leading-relaxed font-sans">
              No more fake clout or made-up claims. Connect your Roblox account via official OAuth 2.0 PKCE to generate your verified Rotfile identity card—featuring avatar history, account creation era, public badges, and Rascal Rep.
            </p>
            <ul className="space-y-3 text-xs font-mono text-cloud-white/90 text-left">
              <li className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-toxic-lime flex-shrink-0" />
                <span>Deterministic avatar outfit heat verdicts</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-toxic-lime flex-shrink-0" />
                <span>Official Roblox OAuth 2.0 PKCE identity verification</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-toxic-lime flex-shrink-0" />
                <span>Privacy-aware witness protection controls</span>
              </li>
            </ul>
            <div className="pt-2">
              <Link
                href="/games/roblox"
                className="inline-flex items-center space-x-2 text-toxic-lime hover:underline font-mono text-xs font-bold"
              >
                <span>Learn how Roblox integration works</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Live Interactive Preview */}
          <div className="lg:col-span-6 flex justify-center">
            <RotfilePreview />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 3: ALTERNATING Z-PATTERN B — "DRIP CHECKS & FRAUD CHECKS"         */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-panel-navy border-sticker grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Art / Interactive Demo */}
          <div className="lg:col-span-6 order-2 lg:order-1 flex justify-center">
            <FlexCardPreview />
          </div>

          {/* Right Text Column */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-hot-pink/10 border border-hot-pink/40 text-hot-pink font-mono text-xs font-bold uppercase">
              <Flame className="w-4 h-4" />
              <span>Server Entertainment</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-cloud-white uppercase leading-tight">
              CHAOTIC AVATAR DRIP CHECKS & RIVAL COMPARISONS.
            </h2>
            <p className="text-sm sm:text-base text-muted-text leading-relaxed font-sans">
              Run <code className="text-toxic-lime font-mono">/dripcheck</code> on yourself or server mates to get safe, deterministic outfit heat verdicts with certified humor. Challenge friends with <code className="text-toxic-lime font-mono">/fraudcheck</code> to compare public badge milestones head-to-head.
            </p>
            <div className="p-4 rounded-2xl bg-midnight-bg border border-panel-navy-light text-xs font-mono space-y-1 text-left">
              <span className="text-hot-pink font-bold block">Safe Humor Guarantee:</span>
              <p className="text-muted-text leading-relaxed">
                Drip Check algorithms use safe, playful humor rules. No mean-spirited insults or harmful language ever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 4: ALTERNATING Z-PATTERN C — "CANONICAL PRODUCTION BADGES"        */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-panel-navy border-sticker-purple glow-purple space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column */}
            <div className="lg:col-span-5 flex justify-center">
              <Image
                src={BRAND_ASSETS.websiteArt.rewardMachine}
                alt="Razz produces collectible badges and quest tickets"
                width={500}
                height={333}
                className="w-full h-auto max-w-md object-contain rounded-2xl"
              />
            </div>

            {/* Right Column */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-reward-yellow/10 border border-reward-yellow/40 text-reward-yellow font-mono text-xs font-bold uppercase">
                <Award className="w-4 h-4" />
                <span>Collectible Badges & Quests</span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-cloud-white uppercase leading-tight">
                YOUR SERVER MOMENTS JUST DROPPED LOOT.
              </h2>
              <p className="text-sm sm:text-base text-muted-text leading-relaxed font-sans">
                Unlock official high-resolution 1254px illustrated badges—Quest Crusader, Drip Monarch, and Veteran Noob. Complete daily server quests, track distinct-day Drip Checks, and collect certified server lore.
              </p>
              <div className="pt-1">
                <Link
                  href="/rewards"
                  className="inline-flex items-center space-x-2 text-toxic-lime hover:underline font-mono text-xs font-bold"
                >
                  <span>Explore full badge rewards catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* 3 Official Illustrated Badges Shelf */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
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
      {/* CHAPTER 5: ALTERNATING Z-PATTERN D — "PRIVACY GUARDIAN & SAFETY"          */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-panel-navy border-sticker grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Art */}
          <div className="lg:col-span-5 flex justify-center">
            <Image
              src={BRAND_ASSETS.websiteArt.privacyGuardian}
              alt="Razz protects profile privacy with shield and key"
              width={340}
              height={510}
              className="w-full h-auto max-w-xs object-contain rounded-2xl"
            />
          </div>

          {/* Right Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-toxic-lime/10 border border-toxic-lime/40 text-toxic-lime font-mono text-xs font-bold uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>Opt-In Privacy Controls</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-cloud-white uppercase leading-tight">
              VERIFIED FLEX. PRIVATE WHEN YOU WANT IT.
            </h2>
            <p className="text-sm sm:text-base text-muted-text leading-relaxed font-sans">
              Roblox handles passwords exclusively via official PKCE OAuth. Rank Rascal never requests passwords, and optional <code className="text-toxic-lime font-mono">/witness-protection</code> lets you hide your profile from public server leaderboards whenever you want.
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
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 6: FULL-BLEED DISCORD.COM STYLE HERO BANNER CTA                   */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border-sticker-lime glow-lime min-h-[360px] sm:min-h-[420px] flex items-center justify-center text-center p-8 sm:p-14">
          <Image
            src={BRAND_ASSETS.websiteArt.communityClubhouse}
            alt="Razz hosts a digital clubhouse filled with profiles and badges"
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover -z-10"
          />
          {/* Dark backdrop gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121526] via-[#121526]/85 to-[#121526]/60 -z-10" />

          <div className="max-w-2xl mx-auto space-y-6 z-10">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-cloud-white uppercase leading-tight">
              YOUR SERVER IS ABOUT TO GET LORE.
            </h2>
            <p className="text-sm sm:text-base text-muted-text leading-relaxed font-sans">
              Build Rotfiles, hunt badges, challenge friends, and give every gaming session something worth yapping about.
            </p>
            <div className="pt-2">
              <a
                href={discordInviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 bg-royal-purple hover:bg-royal-purple/90 text-cloud-white px-9 py-4 rounded-2xl font-display font-bold text-base sm:text-lg transition-all shadow-sticker-lime hover:translate-x-[2px] hover:translate-y-[2px]"
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
