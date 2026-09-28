import { ArrowRight, Play } from "lucide-react";
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E8C877] hero-shadow">
            A Roblox game · in pre-production
          </p>

          <h1 id="hero-title" className="mt-4 font-display uppercase text-cloud-white hero-shadow">
            <span className="block text-[1.35rem] font-bold tracking-[0.2em] text-[#F3E5C8] sm:text-3xl lg:text-4xl">Rascal Realms:</span>
            <span className="mt-1 block text-[3.4rem] font-extrabold leading-[0.88] tracking-[-0.03em] sm:text-[5.5rem] lg:text-[7rem]">
              Crownfall
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-cloud-white/90 hero-shadow sm:text-xl">
            A cinematic co-op Roblox RPG where The World Lies.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#world-lies" className="action-primary group min-h-[56px] px-7 text-base">
              Enter the Realm
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
