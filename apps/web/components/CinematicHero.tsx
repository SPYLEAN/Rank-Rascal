import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { BRAND_ASSETS } from "@/lib/brand-assets";
import { HeroVideo } from "@/components/HeroVideo";
import { TeaserPlayer } from "@/components/TeaserPlayer";

/**
 * Title-screen hero built around the Crownfall teaser.
 *
 * Readability is guaranteed by the scrim, not by the footage: the title sits in the
 * lower-left on desktop and the lower third on portrait screens, both areas darkened by
 * gradients, while every hero-loop shot keeps its focal point near the frame centre.
 * The title and CTAs are plain server-rendered markup, so they are present even if the
 * video (or JavaScript) never loads.
 */
export function CinematicHero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate h-[calc(100svh-5rem)] min-h-[560px] overflow-hidden bg-[#0b0912]"
    >
      <HeroVideo />
      <div className="hero-scrim pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-28 sm:px-8 sm:pb-20 lg:pb-24">
        <div className="max-w-2xl">
          <p className="pr-12 text-xs font-semibold uppercase tracking-[0.2em] text-[#E8C877] hero-shadow sm:pr-0">
            A Roblox co-op action RPG mystery · in pre-production
          </p>

          <h1 id="hero-title" className="title-rise -ml-2 mt-6 w-[min(84vw,21rem)] sm:-ml-3 sm:mt-4 sm:w-[30rem] lg:w-[36rem]">
            <Image
              src={BRAND_ASSETS.titleLogo.full}
              alt="Rascal Realms: Crownfall"
              width={1600}
              height={898}
              priority
              sizes="(min-width: 1024px) 576px, (min-width: 640px) 480px, 88vw"
              className="h-auto w-full drop-shadow-[0_10px_30px_rgba(0,0,0,.65)]"
            />
          </h1>
          <p className="mt-1 text-sm font-semibold text-paper-cream/90 hero-shadow">Release 1 · Chapter 1: The Sign That Lied</p>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-cloud-white/90 hero-shadow sm:text-xl">
            Explore a storybook kingdom with 1–4 players. Read the evidence, expose impossible rules, then survive as reality corrects itself.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#enter-stickerwood" className="action-primary group min-h-[56px] px-7 text-base">
              Discover the game
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true" />
            </a>
            <TeaserPlayer className="action-secondary min-h-[56px] bg-[#0b0912]/45 px-7 text-base backdrop-blur-sm">
              <Play className="h-5 w-5" aria-hidden="true" />
              Watch the full teaser
            </TeaserPlayer>
          </div>

          <p className="mt-5 text-xs text-cloud-white/60 hero-shadow">
            Teaser footage is pre-production cinematic art, not in-game footage.
          </p>
        </div>
      </div>
    </section>
  );
}
