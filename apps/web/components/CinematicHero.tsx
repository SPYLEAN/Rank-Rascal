"use client";

import type { PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Sparkles, Users } from "lucide-react";
import { BRAND_ASSETS } from "@/lib/brand-assets";

const HERO_STATS = [
  ["Status", "Pre-production"],
  ["Episode 1", "Stickerwood"],
  ["Target", "1–4 players"],
  ["Platform", "Roblox"],
] as const;

export function CinematicHero() {
  function moveWorld(event: ReactPointerEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    event.currentTarget.style.setProperty("--hero-shift-x", `${(x * -14).toFixed(2)}px`);
    event.currentTarget.style.setProperty("--hero-shift-y", `${(y * -10).toFixed(2)}px`);
    event.currentTarget.style.setProperty("--copy-shift-x", `${(x * 5).toFixed(2)}px`);
    event.currentTarget.style.setProperty("--copy-shift-y", `${(y * 3).toFixed(2)}px`);
  }

  function resetWorld(event: ReactPointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--hero-shift-x", "0px");
    event.currentTarget.style.setProperty("--hero-shift-y", "0px");
    event.currentTarget.style.setProperty("--copy-shift-x", "0px");
    event.currentTarget.style.setProperty("--copy-shift-y", "0px");
  }

  return (
    <section
      onPointerMove={moveWorld}
      onPointerLeave={resetWorld}
      className="hero-world relative min-h-[860px] overflow-hidden border-b border-royal-purple/30 lg:min-h-[940px]"
    >
      <div className="hero-world-layer absolute -inset-8">
        <Image
          src={BRAND_ASSETS.game.stickerwoodKeyArt}
          alt="Razz overlooks the enormous connected realm of Stickerwood as Crown corruption spreads across distant ruins"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center]"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,8,17,.99)_0%,rgba(8,9,19,.93)_32%,rgba(8,9,19,.55)_59%,rgba(8,9,19,.08)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,#121526_0%,transparent_42%)]" />
      <div className="crown-rift absolute -right-32 -top-32 h-[560px] w-[560px] rounded-full border border-hot-pink/20 bg-royal-purple/10 blur-[2px] motion-reduce:hidden" />
      <div className="world-grain absolute inset-0 opacity-25" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden" aria-hidden="true">
        <span className="world-shard world-shard-a" />
        <span className="world-shard world-shard-b" />
        <span className="world-shard world-shard-c" />
        <span className="world-orbit" />
      </div>

      <div className="relative mx-auto flex min-h-[860px] max-w-7xl items-end px-4 pb-24 pt-32 sm:px-6 lg:min-h-[940px] lg:items-center lg:px-8 lg:pb-28 lg:pt-36">
        <div className="hero-copy max-w-4xl space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-toxic-lime/50 bg-midnight-bg/82 px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.15em] text-toxic-lime backdrop-blur-xl">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Official Roblox game · world in construction
          </div>

          <div className="space-y-5">
            <p className="font-mono text-sm font-bold uppercase tracking-[0.3em] text-hot-pink">Rascal Realms: Crownfall</p>
            <h1 className="max-w-5xl font-display text-[3.65rem] font-extrabold uppercase leading-[0.86] tracking-[-0.045em] text-cloud-white sm:text-[5.8rem] lg:text-[7.35rem]">
              The world lies.
              <span className="mt-4 block text-toxic-lime [text-shadow:0_0_36px_rgba(183,255,54,.22)]">Your squad proves it.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-cloud-white/82 sm:text-xl">
              A cinematic co-op action-adventure mystery built for Roblox. Read the landscape, expose false rules and watch an enormous handcrafted realm rewrite itself around your decisions.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/game" className="action-primary group min-h-[56px] px-7 py-4 text-base normal-case tracking-normal">
              Enter Stickerwood
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true" />
            </Link>
            <Link href="/community#guild" className="action-secondary min-h-[56px] bg-midnight-bg/72 px-7 py-4 text-base normal-case tracking-normal backdrop-blur-xl">
              Help build the realm
              <Users className="h-5 w-5 text-hot-pink" aria-hidden="true" />
            </Link>
          </div>

          <div className="intel-corners grid max-w-3xl grid-cols-2 gap-px overflow-hidden border border-cloud-white/15 bg-cloud-white/15 shadow-2xl backdrop-blur-xl sm:grid-cols-4">
            {HERO_STATS.map(([label, value]) => (
              <div key={label} className="bg-midnight-bg/82 px-4 py-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-text">{label}</p>
                <p className="mt-1 text-sm font-bold text-cloud-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <a href="#world-lies" className="absolute bottom-7 right-7 hidden items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cloud-white/55 transition hover:text-toxic-lime lg:flex">
        Descend into the lie
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cloud-white/20 bg-midnight-bg/60 backdrop-blur">
          <ArrowDown className="h-4 w-4 animate-bounce motion-reduce:animate-none" aria-hidden="true" />
        </span>
      </a>
    </section>
  );
}
