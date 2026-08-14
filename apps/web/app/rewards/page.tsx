"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BRAND_ASSETS } from "@/lib/brand-assets";
import { CANONICAL_THREE_BADGES, CanonicalBadge } from "@/lib/badge-data";
import { ReactionRail } from "@/components/ReactionRail";
import { SpeechBubble } from "@/components/SpeechBubble";
import {
  Award,
  AlertCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  X,
  Lock,
  ArrowRight,
  Info,
} from "lucide-react";

export default function RewardsPage() {
  const [selectedBadge, setSelectedBadge] = useState<CanonicalBadge | null>(null);
  const discordInviteUrl =
    process.env.NEXT_PUBLIC_DISCORD_INSTALL_URL || "/invite";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* 1. ILLUSTRATED HERO */}
      <section className="p-8 sm:p-14 rounded-3xl bg-panel-navy border-sticker-purple glow-purple grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4">
          <SpeechBubble text="Your server just dropped loot!" variant="lime" className="z-10" />
          <div className="relative w-full max-w-sm flex justify-center">
            <Image
              src={BRAND_ASSETS.websiteArt.rewardMachine}
              alt="Razz turns a machine that produces collectible badges and quest tickets."
              width={500}
              height={333}
              className="w-full h-auto max-h-80 object-contain rounded-2xl"
              priority
            />
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-reward-yellow/10 border border-reward-yellow/40 text-reward-yellow font-mono text-xs font-bold uppercase tracking-wider">
            <Clock className="w-4 h-4" />
            <span>Badge System — Preview Status</span>
          </div>
          
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-cloud-white uppercase leading-tight">
            YOUR SERVER MOMENTS JUST DROPPED LOOT.
          </h1>
          
          <p className="text-muted-text text-sm sm:text-base leading-relaxed font-sans max-w-2xl">
            Rank Rascal is building a collectible badge system for verified milestones and server activity. Badge earning is under development—all designs are currently in <strong>Preview</strong> status and are not automatically awarded by the Discord bot yet.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <a
              href="#badge-collection"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-toxic-lime text-midnight-bg px-6 py-3.5 rounded-2xl font-display font-bold text-sm hover:bg-toxic-lime/90 shadow-sticker"
            >
              <span>See the badge collection</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={discordInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-royal-purple text-cloud-white px-6 py-3.5 rounded-2xl font-display font-bold text-sm hover:bg-royal-purple/90 shadow-sticker-lime"
            >
              <Sparkles className="w-4 h-4 text-toxic-lime" />
              <span>Add to Discord</span>
            </a>
          </div>
        </div>
      </section>

      {/* MANDATORY PAGE-LEVEL PREVIEW & CASH VALUE NOTICE BANNERS */}
      <section className="space-y-4 max-w-4xl mx-auto">
        <div className="p-4 rounded-2xl bg-reward-yellow/10 border border-reward-yellow/40 text-xs font-mono text-cloud-white flex items-center space-x-3">
          <Info className="w-5 h-5 text-reward-yellow flex-shrink-0" />
          <span>
            <strong>Badge System Notice:</strong> Badge earning is being built. These designs are previews and are not automatically awarded by the Discord bot yet.
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-panel-navy border border-royal-purple/40 text-xs font-mono text-cloud-white/90 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-toxic-lime flex-shrink-0" />
          <span>
            <strong>Non-Monetary Guarantee:</strong> Rank Rascal badges and Rascal Rep have <strong>no cash value</strong>. They cannot be bought, sold, or traded for real currency.
          </span>
        </div>
      </section>

      <ReactionRail />

      {/* 2. HOW REWARDS WILL WORK (PRODUCT PREVIEW FLOW) */}
      <section className="space-y-8">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="px-3 py-1 rounded-full bg-toxic-lime/10 border border-toxic-lime/40 text-toxic-lime font-mono text-xs font-bold uppercase">
            Product Preview
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-cloud-white uppercase">
            How Rewards Will Work
          </h2>
          <p className="text-muted-text text-sm">
            Three simple steps for earning verified social badges once the backend award engine is deployed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-panel-navy border-sticker space-y-4">
            <div className="w-10 h-10 rounded-xl bg-royal-purple/20 border border-royal-purple/40 flex items-center justify-center text-royal-purple font-display font-bold">
              1
            </div>
            <h3 className="font-display font-bold text-lg text-cloud-white">Verify Identity</h3>
            <p className="text-xs text-muted-text leading-relaxed">
              Link your Roblox account securely via official OAuth 2.0 PKCE. Your password is entered exclusively on Roblox.com.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-panel-navy border-sticker space-y-4">
            <div className="w-10 h-10 rounded-xl bg-hot-pink/20 border border-hot-pink/40 flex items-center justify-center text-hot-pink font-display font-bold">
              2
            </div>
            <h3 className="font-display font-bold text-lg text-cloud-white">Complete Action</h3>
            <p className="text-xs text-muted-text leading-relaxed">
              Participate in opt-in server activities, complete distinct-day Drip Checks, or reach verified Roblox account age milestones.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-panel-navy border-sticker space-y-4">
            <div className="w-10 h-10 rounded-xl bg-toxic-lime/20 border border-toxic-lime/40 flex items-center justify-center text-toxic-lime font-display font-bold">
              3
            </div>
            <h3 className="font-display font-bold text-lg text-cloud-white">Unlock Badge Card</h3>
            <p className="text-xs text-muted-text leading-relaxed">
              Receive a collectible badge on your Rotfile card to flex across your Discord server.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FEATURED THREE-BADGE COLLECTION (EDITORIAL PANELS) */}
      <section id="badge-collection" className="space-y-12 pt-8 border-t border-panel-navy-light/40">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-reward-yellow/10 border border-reward-yellow/40 text-reward-yellow font-mono text-xs font-bold uppercase">
            <Award className="w-4 h-4" />
            <span>Canonical Production Badge Collection</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-cloud-white uppercase">
            The Three Production Badge Designs
          </h2>
          <p className="text-xs text-muted-text">
            Official high-resolution 1254px production artwork. All three badges are currently in <strong>Preview</strong> status.
          </p>
        </div>

        {/* Editorial Panels for the 3 Badges */}
        <div className="space-y-10">
          {CANONICAL_THREE_BADGES.map((b, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={b.id}
                className={`p-8 sm:p-12 rounded-3xl bg-panel-navy border-sticker-purple glow-purple grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-300 hover:border-toxic-lime`}
              >
                {/* Image Column */}
                <div
                  className={`lg:col-span-5 flex justify-center ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="relative aspect-square w-full max-w-[240px] sm:max-w-[260px] rounded-3xl bg-midnight-bg p-6 border-2 border-royal-purple/60 flex items-center justify-center shadow-sticker">
                    <Image
                      src={b.image}
                      alt={b.alt}
                      width={240}
                      height={240}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>

                {/* Text & Content Column */}
                <div
                  className={`lg:col-span-7 space-y-5 text-center lg:text-left ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-toxic-lime/20 text-toxic-lime border border-toxic-lime/40">
                      {b.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-reward-yellow/20 text-reward-yellow border border-reward-yellow/40 flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>PREVIEW</span>
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-cloud-white">
                    {b.name}
                  </h3>

                  <p className="text-sm text-cloud-white/90 leading-relaxed font-sans">
                    {b.description}
                  </p>

                  <div className="p-4 rounded-2xl bg-midnight-bg border border-panel-navy-light space-y-1 text-xs font-mono">
                    <span className="text-toxic-lime font-bold block">Unlock Criterion:</span>
                    <p className="text-muted-text">{b.criterion}</p>
                    <span className="text-reward-yellow/90 text-[11px] block mt-1">
                      Note: {b.reason}
                    </span>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setSelectedBadge(b)}
                      className="inline-flex items-center space-x-2 bg-midnight-bg border border-panel-navy-light text-cloud-white hover:text-toxic-lime hover:border-toxic-lime px-4 py-2 rounded-xl text-xs font-mono font-semibold"
                    >
                      <span>Inspect Badge Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. BADGE SHELF DEMONSTRATION (PROFILE SHELF MARKED DEMO) */}
      <section className="p-8 sm:p-10 rounded-3xl bg-panel-navy border-sticker space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-display font-bold text-2xl text-cloud-white">
              Rotfile Badge Shelf Demonstration
            </h3>
            <p className="text-xs text-muted-text font-mono mt-1">
              Sample profile shelf layout for Discord user cards.
            </p>
          </div>
          <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-reward-yellow/20 text-reward-yellow font-mono font-extrabold text-xs border border-reward-yellow/40">
            DEMO SHELF
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {CANONICAL_THREE_BADGES.map((b) => (
            <div
              key={b.id}
              className="p-5 rounded-2xl bg-midnight-bg border border-panel-navy-light flex items-center space-x-4"
            >
              <div className="relative w-16 h-16 rounded-xl bg-panel-navy p-2 border border-panel-navy-light flex-shrink-0">
                <Image src={b.image} alt={b.alt} width={64} height={64} className="object-contain" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-bold text-cloud-white text-sm">{b.name}</h4>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-reward-yellow/20 text-reward-yellow border border-reward-yellow/40">
                  Preview
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. MORE CHAOS IS COOKING (ROADMAP SECTION) */}
      <section className="p-8 sm:p-10 rounded-3xl bg-panel-navy border-sticker-purple grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 flex justify-center">
          <Image
            src={BRAND_ASSETS.poses.badgePresent}
            alt="Razz presenting shiny gaming badges"
            width={260}
            height={260}
            className="object-contain max-h-64"
          />
        </div>

        <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
          <span className="px-3 py-1 rounded-full bg-toxic-lime/10 border border-toxic-lime/40 text-toxic-lime font-mono text-xs font-bold uppercase">
            Future Concepts Roadmap
          </span>
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-cloud-white uppercase">
            MORE CHAOS IS COOKING.
          </h3>
          <p className="text-xs sm:text-sm text-muted-text leading-relaxed font-sans">
            Additional community badges, guild quests, and server achievement collections are being researched. Future concept names will only be published when unique, approved production artwork and backend award logic are completed.
          </p>
        </div>
      </section>

      {/* 6. RESPONSIBLE REWARDS NOTE */}
      <section className="p-6 rounded-2xl bg-midnight-bg border border-panel-navy-light text-xs font-mono text-cloud-white/80 space-y-2">
        <div className="flex items-center space-x-2 text-toxic-lime font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>Responsible Gaming & Fair Progression</span>
        </div>
        <p className="text-muted-text leading-relaxed">
          Rank Rascal badges reward verified participation and gaming milestones. We strictly prohibit real-money transactions, paid loot boxes, gambling mechanics, or random reward purchasing.
        </p>
      </section>

      {/* ACCESSIBLE BADGE DETAIL MODAL */}
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
              <div className="w-20 h-20 rounded-2xl bg-midnight-bg p-2 border-2 border-royal-purple flex items-center justify-center flex-shrink-0">
                <Image
                  src={selectedBadge.image}
                  alt={selectedBadge.alt}
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
                    {selectedBadge.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-reward-yellow/20 text-reward-yellow border border-reward-yellow/40">
                    {selectedBadge.status}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-cloud-white/90 leading-relaxed font-sans">{selectedBadge.description}</p>

            <div className="p-3 rounded-xl bg-midnight-bg border border-panel-navy-light text-xs font-mono space-y-1">
              <span className="text-toxic-lime font-bold block">Unlock Criterion:</span>
              <p className="text-muted-text">{selectedBadge.criterion}</p>
              <span className="text-reward-yellow/90 text-[11px] block mt-1">Reason: {selectedBadge.reason}</span>
            </div>

            <div className="p-3 rounded-xl bg-midnight-bg border border-panel-navy-light flex items-center space-x-3">
              <Image
                src={selectedBadge.discordImage}
                alt="Discord format"
                width={36}
                height={36}
                className="object-contain"
              />
              <div className="text-[11px] font-mono text-cloud-white/80">
                <span className="text-royal-purple font-bold block">Discord Badge Export (256px)</span>
                <span>Optimized for Discord bot embeds & profile popups.</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs font-mono text-cloud-white/60">
              <span>Status: <strong className="text-reward-yellow">Preview</strong></span>
              <span>No Cash Value</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
