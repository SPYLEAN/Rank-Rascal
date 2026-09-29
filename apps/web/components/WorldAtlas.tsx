"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BRAND_ASSETS } from "@/lib/brand-assets";
import { WORLD_LOCATIONS } from "@/lib/game-content";

type LocationImageKey = keyof typeof BRAND_ASSETS.locations;

const COUNT = WORLD_LOCATIONS.length;
// The key art is 1672×941; the route is drawn in that same coordinate space.
const W = 1672;
const H = 941;
const POINTS = WORLD_LOCATIONS.map((item) => [(item.hotspot.x / 100) * W, (item.hotspot.y / 100) * H] as const);

/** A gentle curve through every area in chapter order, so the realm reads as one road. */
function routePath(points: readonly (readonly [number, number])[]): string {
  return points.reduce((d, [x, y], i) => {
    if (i === 0) return `M${x} ${y}`;
    const [px, py] = points[i - 1];
    const mx = (px + x) / 2;
    return `${d} Q${mx} ${py} ${mx} ${(py + y) / 2} T${x} ${y}`;
  }, "");
}

const ROUTE = routePath(POINTS);

/**
 * Chapter 06 — Stickerwood as one continuous chapter, not a level-select screen. The route
 * connects every area in story order; choosing a place lights its stretch of road, dims the
 * rest of the realm and explains what progress there changes further along.
 */
export function WorldAtlas() {
  const [active, setActive] = useState(0);
  const location = WORLD_LOCATIONS[active];
  const next = active < COUNT - 1 ? WORLD_LOCATIONS[active + 1] : null;
  const spot = `translate(${(location.hotspot.x - 150) / 3}%, ${(location.hotspot.y - 150) / 3}%)`;
  // Highlight the road walked so far.
  const walked = routePath(POINTS.slice(0, active + 1));

  return (
    <section id="explore-stickerwood" aria-labelledby="atlas-title" className="scroll-mt-20 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="section-kicker">06 · Explore the realm</p>
        <h2 id="atlas-title" className="chapter-title mt-4 max-w-4xl">Ten areas. One road that keeps lying.</h2>
        <p className="chapter-lede">
          Stickerwood is one connected realm. Every truth you prove opens the way to the next place, from a festival village to the King&apos;s citadel.
        </p>
        <p className="mt-3 max-w-2xl text-sm text-cloud-white/75">
          Release 1.0 opens the first stretch: Starting Village, Stickerwood Forest, the First Crossroads and Rascal Plaza. The rest of the road arrives in later updates.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-[92rem] sm:px-8">
        <div className="paper-frame relative aspect-[1672/941] w-full overflow-hidden">
          <Image
            src={BRAND_ASSETS.game.stickerwoodMap}
            alt="Illustrated concept map of Stickerwood, from Starting Village up to King Wrongway Citadel"
            fill
            sizes="(max-width: 1500px) 100vw, 1472px"
            className="object-cover"
          />
          <div className="atlas-spotlight" style={{ transform: spot }} aria-hidden="true" />
          <svg viewBox={`0 0 ${W} ${H}`} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
            <path d={ROUTE} fill="none" stroke="rgba(243,229,200,.55)" strokeWidth="5" strokeDasharray="4 16" strokeLinecap="round" />
            <path key={active} d={walked} fill="none" stroke="#D5A84B" strokeWidth="6" strokeLinecap="round" className="atlas-route" />
          </svg>
          {WORLD_LOCATIONS.map((item, index) => {
            const on = index === active;
            const visited = index < active;
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
                      : visited
                        ? "border-antique-gold bg-ink-plum/85 text-antique-gold group-hover:scale-110"
                        : "border-paper-cream/80 bg-ink-plum/75 text-paper-cream group-hover:scale-110 group-hover:bg-ink-plum group-focus-visible:scale-110"
                  }`}
                >
                  {Number(item.number)}
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
          <p className="absolute bottom-2 right-3 rounded-sm bg-ink-plum/70 px-2 py-0.5 text-[10px] text-paper-cream/90">Concept map · final geography in production</p>
        </div>

        <ol className="no-scrollbar flex gap-1 overflow-x-auto px-5 pt-4 sm:px-0" aria-label="All ten areas in chapter order">
          {WORLD_LOCATIONS.map((item, index) => (
            <li key={item.number} className="flex-none">
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-pressed={index === active}
                className={`min-h-11 whitespace-nowrap border-b-2 px-3 text-sm transition ${
                  index === active ? "border-antique-gold font-semibold text-cloud-white" : "border-transparent text-cloud-white/65 hover:text-cloud-white"
                }`}
              >
                <span className="mr-1.5 text-cloud-white/45">{Number(item.number)}</span>
                {item.name}
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="mx-auto mt-12 grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <figure key={location.number} className="scene-in">
          <div className="paper-frame relative aspect-[16/9] overflow-hidden">
            {/* Every area has its own 16:9 art, so cover fills the 16:9 frame with no visible crop. */}
            <Image
              src={BRAND_ASSETS.locations[location.image as LocationImageKey]}
              alt={`Concept illustration of ${location.name}`}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover object-center"
            />
          </div>
          <figcaption className="mt-2 text-xs text-cloud-white/60">Concept art · not in-game</figcaption>
        </figure>

        <div aria-live="polite">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-cloud-white/70">
            <span>
              Area {Number(location.number)} of {COUNT} · {location.chapterRole}
            </span>
            <span
              className={`rounded-sm px-2 py-0.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] ${
                location.release === "release-1" ? "bg-antique-gold text-ink-plum" : "border border-[#B99BFF] text-[#D7C6FF]"
              }`}
            >
              {location.release === "release-1" ? "Release 1.0" : "Chapter 1 · later update"}
            </span>
          </p>
          <h3 className="mt-2 font-display text-3xl font-extrabold text-cloud-white sm:text-4xl">{location.name}</h3>
          <p className="mt-1 text-lg italic text-paper-cream/90">{location.tagline}</p>
          <p className="mt-4 leading-relaxed text-cloud-white/85">{location.description}</p>

          <dl className="mt-6 grid gap-x-8 gap-y-5 text-sm sm:grid-cols-2">
            <div>
              <dt className="section-kicker">Mysteries</dt>
              <dd className="mt-1.5 space-y-1 text-cloud-white/85">
                {location.mysteries.map((item) => <span key={item} className="block">{item}</span>)}
              </dd>
            </div>
            <div>
              <dt className="section-kicker">Threat</dt>
              <dd className="mt-1.5 text-cloud-white/85">{location.threats}</dd>
            </div>
            <div>
              <dt className="section-kicker">Found here</dt>
              <dd className="mt-1.5 space-y-1 text-cloud-white/85">
                {location.discoveries.map((item) => <span key={item} className="block">{item}</span>)}
              </dd>
            </div>
            <div>
              <dt className="section-kicker">Who you&apos;ll meet</dt>
              <dd className="mt-1.5 space-y-1 text-cloud-white/85">
                {location.notableCharacters.map((name) => <span key={name} className="block">{name}</span>)}
              </dd>
            </div>
          </dl>

          <div className="mt-7 border-l-2 border-antique-gold pl-4">
            <p className="section-kicker">What this changes</p>
            <p className="mt-1.5 text-cloud-white/90">{location.changes}</p>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setActive(active - 1)}
              disabled={active === 0}
              aria-label="Previous area"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cloud-white/30 text-cloud-white transition hover:border-antique-gold disabled:opacity-35"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            {next ? (
              <button type="button" onClick={() => setActive(active + 1)} className="text-link min-h-11">
                Follow the road to {next.name} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : (
              <a href="#king-wrongway" className="text-link min-h-11">
                Meet the King <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>
          <p className="mt-4 text-xs text-cloud-white/65">
            {location.release === "release-1" ? "Part of Release 1.0: A Sign of Trouble." : "Concept for later in Chapter 1. Not part of Release 1.0."} Quest styles:{" "}
            {location.questStyles}
          </p>
        </div>
      </div>
    </section>
  );
}
