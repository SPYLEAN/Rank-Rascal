"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Crown,
  Gamepad2,
  MessageSquare,
  Radio,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { BRAND_ASSETS } from "@/lib/brand-assets";

export function CommunityPlazaSection() {
  const discordUrl =
    process.env.NEXT_PUBLIC_COMMUNITY_URL || "https://discord.gg/gkneGrpzAn";

  return (
    <section
      id="community-plaza"
      className="reveal-up mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8 lg:pt-32"
      aria-labelledby="community-plaza-title"
    >
      {/* Radiant Illuminated Outer Frame */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-toxic-lime/80 bg-gradient-to-b from-[#191e42] via-[#12152c] to-[#0c0e1e] p-6 shadow-[0_0_80px_rgba(183,255,54,0.22)] sm:p-10 lg:p-14">
        {/* Ambient Top Glows */}
        <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-full max-w-4xl -translate-x-1/2 rounded-full bg-gradient-to-b from-toxic-lime/20 via-hot-pink/15 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-royal-purple/25 blur-3xl" />

        {/* Section Header */}
        <div className="relative z-10 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-toxic-lime bg-toxic-lime/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-toxic-lime shadow-[0_0_15px_rgba(183,255,54,0.3)]">
            <Radio className="h-3.5 w-3.5 animate-pulse text-hot-pink" />
            Rascal Plaza · Squad Assembly
          </div>

          <h2
            id="community-plaza-title"
            className="font-display text-4xl font-extrabold uppercase tracking-tight text-cloud-white sm:text-5xl lg:text-6xl"
          >
            The First Realm Needs <span className="text-toxic-lime [text-shadow:0_0_30px_rgba(183,255,54,.4)]">Witnesses.</span>
          </h2>

          <p className="text-base sm:text-lg leading-relaxed text-cloud-white/85">
            Rascal Realms: Crownfall is built in public with its community. Don’t wait on the sidelines—squad up with fellow investigators, debate physical clues, report world fractures, and claim your place in the early playtest cohorts.
          </p>
        </div>

        {/* Centerpiece Rascal Plaza Banner Artwork */}
        <div className="relative z-10 mt-10 overflow-hidden rounded-2xl border-2 border-reward-yellow/60 shadow-[0_0_40px_rgba(255,216,61,0.25)]">
          <div className="relative aspect-[16/9] w-full min-h-[260px] sm:min-h-[380px]">
            <Image
              src={BRAND_ASSETS.banners.rascalPlaza}
              alt="Rascal Plaza - Chat, squad up, and hang out in the realm with Razz and fellow players"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1022] via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-cloud-white/20 bg-midnight-bg/85 px-4 py-3 backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <Crown className="h-5 w-5 text-reward-yellow" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-cloud-white">
                Official Gathering Grounds · Stickerwood District 01
              </span>
            </div>
            <span className="font-mono text-xs font-semibold text-toxic-lime">
              1–4 PLAYER MULTIPLAYER HUBS
            </span>
          </div>
        </div>

        {/* Dual Community Columns: Discord + Roblox */}
        <div className="relative z-10 mt-10 grid gap-6 md:grid-cols-2">
          {/* Card 1: Official Discord Community */}
          <div className="flex flex-col justify-between rounded-2xl border-2 border-royal-purple/60 bg-gradient-to-br from-[#1b1c3e] via-[#141630] to-[#1a1738] p-7 shadow-xl shadow-royal-purple/20 transition hover:border-toxic-lime">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-toxic-lime bg-toxic-lime/15 px-3 py-1 font-mono text-[11px] font-bold text-toxic-lime">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  OFFICIAL DISCORD · LIVE NOW
                </span>
                <Users className="h-6 w-6 text-hot-pink" />
              </div>

              <h3 className="mt-4 font-display text-2xl font-bold text-cloud-white sm:text-3xl">
                Join the Discord Community
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-cloud-white/80">
                The primary gathering place for Rascal Realms. Talk directly with the developers, share theories about King Wrongway’s lies, and get pinged when private playtest slots open.
              </p>

              <ul className="mt-5 space-y-2.5 text-xs text-cloud-white/85">
                {[
                  "Direct development discussion & weekly sprint notes",
                  "S.U.S. theory board & evidence debates with other squads",
                  "Early notifications for QA playtest cohort invitations",
                  "Exclusive Discord role badges for pre-launch members",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-toxic-lime shadow-[0_0_6px_#B7FF36]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 border-t border-cloud-white/10 pt-5">
              <a
                href={discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="action-primary w-full justify-center gap-2 bg-[#5865F2] hover:bg-cloud-white hover:text-midnight-bg font-mono text-xs uppercase tracking-wider font-bold shadow-[0_0_25px_rgba(88,101,242,0.4)]"
              >
                <Users className="h-4 w-4" />
                <span>Join Official Discord Server</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Card 2: Official Roblox Community Group (Space Reserved!) */}
          <div className="flex flex-col justify-between rounded-2xl border-2 border-reward-yellow/50 bg-gradient-to-br from-[#292218] via-[#1a1728] to-[#25152c] p-7 shadow-xl shadow-reward-yellow/15 transition hover:border-reward-yellow">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-reward-yellow bg-reward-yellow/15 px-3 py-1 font-mono text-[11px] font-bold text-reward-yellow">
                  <Sparkles className="h-3.5 w-3.5" />
                  ROBLOX COMMUNITY · FORMING SOON
                </span>
                <Gamepad2 className="h-6 w-6 text-reward-yellow" />
              </div>

              <h3 className="mt-4 font-display text-2xl font-bold text-cloud-white sm:text-3xl">
                Official Roblox Game Group
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-cloud-white/80">
                The official Roblox group page is being prepared alongside the core game build. Joining early reserves your spot for in-game squad tags, guild perks, and verified playtester badges.
              </p>

              <ul className="mt-5 space-y-2.5 text-xs text-cloud-white/85">
                {[
                  "Official Roblox Studio squad matchmaking & squad clans",
                  "In-game Founder title and custom Razz sticker cosmetics",
                  "Automatic verified rank synchronisation for playtesters",
                  "Space reserved — opening with the first private prototype",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-reward-yellow shadow-[0_0_6px_#FFD83D]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 border-t border-cloud-white/10 pt-5">
              <Link
                href="/community#review"
                className="action-secondary w-full justify-center gap-2 border-reward-yellow/60 text-reward-yellow hover:bg-reward-yellow hover:text-midnight-bg font-mono text-xs uppercase tracking-wider font-bold"
              >
                <BadgeCheck className="h-4 w-4" />
                <span>Reserve Playtest Spot via QA Roster</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bright Glowing "Help Shape the First Playable" Callout */}
        <div className="relative z-10 mt-10 rounded-2xl border-2 border-hot-pink/60 bg-gradient-to-r from-[#201535] via-[#2a1338] to-[#1c1236] p-7 sm:p-10 shadow-[0_0_50px_rgba(255,79,163,0.2)]">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-hot-pink">
                <BadgeCheck className="h-4 w-4 text-toxic-lime" />
                Help Shape The First Playable
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-cloud-white">
                Submit a Review. Earn an Immutable QA ID & Digital Badge.
              </h3>
              <p className="text-sm leading-relaxed text-cloud-white/80">
                Every thoughtful review helps stress-test our premises, device accessibility, and deduction fairness. You'll receive a personalized verified QA badge and certificate by email. Build invitations follow in cohorts, not on request—review does not guarantee playtest access.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link
                href="/community#review"
                className="action-primary justify-center bg-hot-pink hover:bg-cloud-white hover:text-midnight-bg font-mono text-xs uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(255,79,163,0.4)]"
              >
                <span>Submit QA Review</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/game"
                className="action-secondary justify-center font-mono text-xs uppercase tracking-wider font-bold"
              >
                <span>Read World Dossier</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
