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
 *
 * Phones get Chapter 1 of the four-chapter mobile journey: one line of copy, the teaser as the
 * primary action, and the bottom of the frame left clear for the Ask Razz greeting.
 */
export function CinematicHero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate h-[calc(100svh-4rem)] min-h-[560px] sm:h-[calc(100svh-5rem)] overflow-hidden bg-[#0b0912]"
    >
      <HeroVideo />
      <div className="hero-scrim pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-60 sm:px-8 sm:pb-20 lg:pb-24">
        <div className="max-w-2xl">
          <p className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-[#E8C877] hero-shadow sm:block">
            A Roblox co-op action RPG mystery · in pre-production
          </p>

          <h1 id="hero-title" className="title-rise -ml-2 w-[min(72vw,17rem)] sm:-ml-3 sm:mt-4 sm:w-[30rem] lg:w-[36rem]">
            <Image
              src={BRAND_ASSETS.titleLogo.full}
              alt="Rascal Realms: Crownfall"
              width={1600}
              height={898}
              priority
              sizes="(min-width: 1024px) 576px, (min-width: 640px) 480px, 72vw"
              className="h-auto w-full drop-shadow-[0_10px_30px_rgba(0,0,0,.65)]"
            />
          </h1>
          <p className="mt-1 hidden text-sm font-semibold text-paper-cream/90 hero-shadow sm:block">Release 1.0 · A Sign of Trouble</p>

          <p className="mt-3 text-base leading-relaxed text-cloud-white/90 hero-shadow sm:hidden">
            A 1–4 player Roblox action-RPG mystery where you read the evidence, expose rules that lie, and survive as reality corrects itself.
          </p>
          <p className="mt-4 hidden max-w-2xl text-lg leading-relaxed text-cloud-white/90 hero-shadow sm:block sm:text-xl">
            Explore a storybook kingdom with 1–4 players. Read the evidence, expose impossible rules, then survive as reality corrects itself.
          </p>

          {/* Phones lead with the teaser, larger screens with the game overview. The "Discover"
              link is written twice (one per breakpoint) so tab order always matches what is seen. */}
          <div data-razz-clear className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            <div className="hidden sm:block">
              <a href="#enter-stickerwood" className="action-primary group min-h-[56px] px-7 text-base">
                Discover the game
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true" />
              </a>
            </div>
            <TeaserPlayer className="action-secondary hero-cta-teaser min-h-[56px] px-7 text-base sm:bg-[#0b0912]/45 sm:backdrop-blur-sm">
              <Play className="h-5 w-5" aria-hidden="true" />
              <span className="sm:hidden">Watch the teaser</span>
              <span className="hidden sm:inline">Watch the full teaser</span>
            </TeaserPlayer>
            <div className="sm:hidden">
              <a href="#what-players-do" className="action-secondary group w-full bg-[#0b0912]/45 backdrop-blur-sm">
                Discover the game
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true" />
              </a>
            </div>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-cloud-white/70 hero-shadow sm:hidden">
            Crownfall is in pre-production. The teaser is cinematic art, not in-game footage.
          </p>
          <p className="mt-5 hidden text-xs text-cloud-white/60 hero-shadow sm:block">
            Teaser footage is pre-production cinematic art, not in-game footage.
          </p>
        </div>
      </div>
    </section>
  );
}
