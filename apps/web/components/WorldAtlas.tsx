"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, Footprints, MapPin, ShieldAlert, Sparkles, Users } from "lucide-react";
import { BRAND_ASSETS } from "@/lib/brand-assets";
import { WORLD_LOCATIONS, type LoreStatus } from "@/lib/game-content";

const STATUS_LABEL: Record<LoreStatus, { label: string; className: string }> = {
  "in-development": { label: "In development", className: "border-toxic-lime/60 bg-toxic-lime/10 text-toxic-lime" },
  concept: { label: "Concept", className: "border-hot-pink/60 bg-hot-pink/10 text-hot-pink" },
  planned: { label: "Planned", className: "border-royal-purple/60 bg-royal-purple/15 text-cloud-white/80" },
};

type InsigniaKey = keyof typeof BRAND_ASSETS.insignias;

export function WorldAtlas() {
  const [activeIndex, setActiveIndex] = useState(0);
  const location = WORLD_LOCATIONS[activeIndex];
  const status = STATUS_LABEL[location.status];

  return (
    <section
      id="explore-stickerwood"
      className="atlas-section scroll-mt-20 border-y-2 border-royal-purple/30 bg-[#090b16] py-20 lg:py-32"
      aria-labelledby="atlas-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-toxic-lime bg-toxic-lime/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-toxic-lime">
              <MapPin className="h-3.5 w-3.5 text-hot-pink" aria-hidden="true" />
              Rascal Realms Atlas · Episode 01
            </div>
            <h2 id="atlas-title" className="font-display text-4xl font-extrabold uppercase tracking-tight text-cloud-white sm:text-5xl lg:text-6xl">
              Eleven places. <span className="text-toxic-lime [text-shadow:0_0_30px_rgba(183,255,54,.35)]">One realm that keeps arguing with itself.</span>
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-cloud-white/80">
              Stickerwood is one connected world, not a level-select menu. Every route, shadow and physical clue can carry across borders. Click a place on the map to open its dossier.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-stretch">
          {/* Map viewport */}
          <div className="relative min-h-[440px] overflow-hidden rounded-2xl border-2 border-royal-purple/60 bg-[#070914] shadow-2xl lg:col-span-8">
            <Image
              src={BRAND_ASSETS.game.stickerwoodKeyArt}
              alt="Illustrated concept atlas of Stickerwood, spanning eleven locations from Starting Village to King Wrongway Citadel"
              fill
              sizes="(max-width: 1024px) 100vw, 68vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080a16] via-transparent to-[#080a16]/50 pointer-events-none" />

            {WORLD_LOCATIONS.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={item.number}
                  type="button"
                  aria-pressed={isActive}
                  aria-label={`Open the ${item.name} dossier`}
                  onClick={() => setActiveIndex(index)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-transform ${
                    isActive ? "scale-110 z-30" : "hover:scale-105 z-20"
                  }`}
                  style={{ left: `${item.hotspot.x}%`, top: `${item.hotspot.y}%` }}
                >
                  <div className="relative flex flex-col items-center">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all ${
                        isActive
                          ? "border-toxic-lime bg-toxic-lime/30 shadow-[0_0_25px_#B7FF36]"
                          : "border-royal-purple bg-midnight-bg/85 hover:border-hot-pink"
                      }`}
                    >
                      <span className="font-mono text-[11px] font-black text-cloud-white">{item.number}</span>
                    </div>
                    <span
                      className={`mt-1 hidden rounded border px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-wide sm:block ${
                        isActive
                          ? "border-toxic-lime bg-toxic-lime text-midnight-bg"
                          : "border-cloud-white/20 bg-midnight-bg/85 text-cloud-white/80 group-hover:text-toxic-lime"
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
                </button>
              );
            })}

            <p className="absolute bottom-3 left-3 right-3 rounded-lg border border-cloud-white/10 bg-midnight-bg/80 px-3 py-1.5 text-center font-mono text-[10px] text-cloud-white/60 backdrop-blur-sm sm:text-left">
              Illustrated concept atlas — exact in-game geography is still in production.
            </p>
          </div>

          {/* Dossier */}
          <aside className="flex flex-col justify-between rounded-2xl border-2 border-royal-purple/50 bg-gradient-to-b from-[#141836] via-[#101328] to-[#121528] p-6 lg:col-span-4 shadow-xl">
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-3 border-b border-royal-purple/40 pb-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl border-2 border-toxic-lime bg-royal-purple/30 p-1 shadow-md">
                    <Image
                      src={BRAND_ASSETS.insignias[location.insignia as InsigniaKey]}
                      alt=""
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-hot-pink">Location {location.number}</span>
                    <h3 className="font-display text-2xl font-extrabold text-cloud-white">{location.name}</h3>
                  </div>
                </div>
                <span className={`shrink-0 rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wide ${status.className}`}>
                  {status.label}
                </span>
              </div>

              <p className="font-mono text-xs font-semibold italic text-toxic-lime">&ldquo;{location.tagline}&rdquo;</p>
              <p className="text-sm leading-relaxed text-cloud-white/85">{location.description}</p>

              <div>
                <span className="mb-2 flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-hot-pink">
                  <Eye className="h-3.5 w-3.5 text-toxic-lime" aria-hidden="true" />
                  Mysteries
                </span>
                <ul className="space-y-1.5 text-xs text-cloud-white/80">
                  {location.mysteries.map((item) => (
                    <li key={item} className="flex gap-2"><span className="text-toxic-lime">·</span><span>{item}</span></li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-royal-purple/30 bg-[#0a0c1a] p-3.5 text-xs">
                <span className="mb-1 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-hot-pink">
                  <ShieldAlert className="h-3.5 w-3.5" aria-hidden="true" />
                  Threats
                </span>
                <p className="font-semibold text-cloud-white">{location.threats}</p>
              </div>

              {location.discoveries.length > 0 ? (
                <div>
                  <span className="mb-2 flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-hot-pink">
                    <Footprints className="h-3.5 w-3.5 text-toxic-lime" aria-hidden="true" />
                    Discoveries
                  </span>
                  <ul className="space-y-1.5 text-xs text-cloud-white/80">
                    {location.discoveries.map((item) => (
                      <li key={item} className="flex gap-2"><span className="text-toxic-lime">·</span><span>{item}</span></li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-text"><Sparkles className="h-3 w-3" aria-hidden="true" />Quest styles</span>
                  <p className="mt-1 font-semibold text-cloud-white">{location.questStyles}</p>
                </div>
                <div>
                  <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-text"><Users className="h-3 w-3" aria-hidden="true" />Notable</span>
                  <p className="mt-1 font-semibold text-cloud-white">{location.notableCharacters[0] ?? "Unknown"}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-cloud-white/10 pt-4">
              <Link href="/game#premise" className="action-primary w-full justify-center font-mono text-xs uppercase tracking-wider font-bold">
                <span>Open the world dossier</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>

        {/* Location rail */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {WORLD_LOCATIONS.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={item.number}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveIndex(index)}
                className={`flex items-center gap-3 rounded-xl border-2 p-3 text-left transition-all ${
                  isActive
                    ? "border-toxic-lime bg-[#181d3c] shadow-[0_0_20px_rgba(183,255,54,0.3)]"
                    : "border-royal-purple/40 bg-[#0d1022] hover:border-royal-purple hover:bg-[#141836]"
                }`}
              >
                <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-lg border border-toxic-lime/50 p-0.5">
                  <Image src={BRAND_ASSETS.insignias[item.insignia as InsigniaKey]} alt="" width={36} height={36} className="object-contain" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-hot-pink">
                    <span>{item.number}</span>
                  </div>
                  <p className="truncate font-display text-sm font-bold text-cloud-white">{item.name}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
