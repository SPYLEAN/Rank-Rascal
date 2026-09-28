"use client";

import { useState } from "react";
import Image from "next/image";
import { BRAND_ASSETS } from "@/lib/brand-assets";
import { WORLD_LOCATIONS, type LoreStatus } from "@/lib/game-content";

const STATUS: Record<LoreStatus, string> = {
  "in-development": "In development",
  concept: "Concept",
  planned: "Planned",
};

type LocationImageKey = keyof typeof BRAND_ASSETS.locations;

/**
 * Chapter 06 — the illustrated map dominates. Choosing a place moves a soft spotlight onto it
 * (the rest of the realm dims) and opens its dossier below. The numbered list mirrors the map
 * for keyboard and small-screen use.
 */
export function WorldAtlas() {
  const [active, setActive] = useState(0);
  const location = WORLD_LOCATIONS[active];
  // The spotlight layer is 300% of the stage; translate it so its centre sits on the hotspot.
  const spot = `translate(${(location.hotspot.x - 150) / 3}%, ${(location.hotspot.y - 150) / 3}%)`;

  return (
    <section id="explore-stickerwood" aria-labelledby="atlas-title" className="scroll-mt-20 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="section-kicker">06 · Explore the realm</p>
        <h2 id="atlas-title" className="chapter-title mt-4 max-w-4xl">Eleven places. One argument.</h2>
        <p className="chapter-lede">Stickerwood is one connected world, not a level-select screen. Choose a place to see what it&apos;s hiding.</p>
      </div>

      <div className="mx-auto mt-12 max-w-[92rem] sm:px-8">
        <div className="relative aspect-[1672/941] w-full overflow-hidden sm:rounded-sm">
          <Image
            src={BRAND_ASSETS.game.stickerwoodKeyArt}
            alt="Illustrated concept map of Stickerwood, from Starting Village up to King Wrongway Citadel"
            fill
            sizes="(max-width: 1500px) 100vw, 1472px"
            className="object-cover"
          />
          <div className="atlas-spotlight" style={{ transform: spot }} aria-hidden="true" />
          {WORLD_LOCATIONS.map((item, index) => {
            const on = index === active;
            return (
              <button
                key={item.number}
                type="button"
                onClick={() => setActive(index)}
                aria-pressed={on}
                aria-label={`${item.number}: ${item.name}`}
                className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                style={{ left: `${item.hotspot.x}%`, top: `${item.hotspot.y}%` }}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-[11px] font-bold transition sm:h-9 sm:w-9 sm:text-xs ${
                    on
                      ? "scale-110 border-paper-cream bg-antique-gold text-ink-plum shadow-[0_0_24px_rgba(213,168,75,.7)]"
                      : "border-paper-cream/80 bg-ink-plum/75 text-paper-cream group-hover:scale-110 group-hover:bg-ink-plum group-focus-visible:scale-110"
                  }`}
                >
                  {item.number}
                </span>
                <span
                  className={`pointer-events-none mt-1 hidden whitespace-nowrap rounded-sm bg-ink-plum/85 px-2 py-0.5 text-xs font-semibold text-paper-cream transition lg:block ${
                    on ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                  }`}
                  aria-hidden="true"
                >
                  {item.name}
                </span>
              </button>
            );
          })}
          <p className="absolute bottom-2 right-3 text-[10px] text-paper-cream/70">Concept map · final geography in production</p>
        </div>

        <ol className="no-scrollbar flex gap-1 overflow-x-auto px-5 pt-4 sm:px-0" aria-label="All eleven locations">
          {WORLD_LOCATIONS.map((item, index) => (
            <li key={item.number} className="flex-none">
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-pressed={index === active}
                className={`min-h-11 whitespace-nowrap border-b-2 px-3 text-sm transition ${
                  index === active ? "border-antique-gold font-semibold text-cloud-white" : "border-transparent text-cloud-white/60 hover:text-cloud-white"
                }`}
              >
                <span className="mr-1.5 text-cloud-white/40">{item.number}</span>
                {item.name}
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="mx-auto mt-12 grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]" aria-live="polite">
        {location.image ? (
          <div key={location.image} className="scene-in relative aspect-[16/9] overflow-hidden rounded-sm">
            <Image
              src={BRAND_ASSETS.locations[location.image as LocationImageKey]}
              alt={`Concept illustration of ${location.name}`}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <p className="absolute bottom-2 left-3 text-[10px] text-paper-cream/80">Concept art</p>
          </div>
        ) : (
          <div className="hidden lg:block" />
        )}

        <div>
          <p className="text-sm text-cloud-white/55">
            Location {location.number} · {STATUS[location.status]}
          </p>
          <h3 className="mt-2 font-display text-3xl font-extrabold text-cloud-white sm:text-4xl">{location.name}</h3>
          <p className="mt-1 text-lg italic text-paper-cream/85">{location.tagline}</p>
          <p className="mt-4 leading-relaxed text-cloud-white/80">{location.description}</p>

          <dl className="mt-6 grid gap-x-8 gap-y-5 text-sm sm:grid-cols-2">
            <div>
              <dt className="section-kicker">Mysteries</dt>
              <dd className="mt-1.5 space-y-1 text-cloud-white/80">
                {location.mysteries.map((item) => <span key={item} className="block">{item}</span>)}
              </dd>
            </div>
            <div>
              <dt className="section-kicker">Threat</dt>
              <dd className="mt-1.5 text-cloud-white/80">{location.threats}</dd>
            </div>
            <div>
              <dt className="section-kicker">Found here</dt>
              <dd className="mt-1.5 space-y-1 text-cloud-white/80">
                {location.discoveries.length > 0
                  ? location.discoveries.map((item) => <span key={item} className="block">{item}</span>)
                  : <span className="block">Nothing yet. It&apos;s sealed.</span>}
              </dd>
            </div>
            <div>
              <dt className="section-kicker">Who you&apos;ll meet</dt>
              <dd className="mt-1.5 space-y-1 text-cloud-white/80">
                {location.notableCharacters.map((name) => <span key={name} className="block">{name}</span>)}
              </dd>
            </div>
          </dl>
          <p className="mt-5 text-sm text-cloud-white/55">Quest styles: {location.questStyles}</p>
        </div>
      </div>
    </section>
  );
}
