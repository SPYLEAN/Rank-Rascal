"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";
import { ChevronLeft, ChevronRight, Compass, Crosshair, Search, Swords } from "lucide-react";
import { PLAYER_ROLES, type LoreStatus } from "@/lib/game-content";

const STATUS_LABEL: Record<LoreStatus, string> = {
  "in-development": "In development",
  concept: "Concept",
  planned: "Planned",
};

export function HeroSelector() {
  const [index, setIndex] = useState(0);
  const touchStart = useRef<number | null>(null);
  const hero = PLAYER_ROLES[index];

  const go = (delta: number) => {
    setIndex((current) => (current + delta + PLAYER_ROLES.length) % PLAYER_ROLES.length);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStart.current = event.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStart.current === null) return;
    const delta = event.changedTouches[0]?.clientX - touchStart.current;
    if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1);
    touchStart.current = null;
  };

  return (
    <section id="heroes" className="scroll-mt-20 border-y border-panel-navy-light bg-[#0b0e1c] py-20 lg:py-28" aria-labelledby="heroes-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="section-kicker">Six heroes, one squad</p>
          <h2 id="heroes-title" className="section-title">No hero owns the whole truth.</h2>
          <p className="section-lede">Every hero reads a different kind of evidence. Squads of up to four mix and match to build a complete case. Arrow keys, swipe, or the rail below—your pick.</p>
        </div>

        <div
          className="relative mt-12 overflow-hidden rounded-2xl border-2 p-8 shadow-2xl transition-colors duration-500 sm:p-12"
          style={{
            borderColor: `${hero.accent}66`,
            background: `radial-gradient(circle at 15% 20%, ${hero.accent}22, #0d1022 60%)`,
          }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          role="group"
          aria-roledescription="carousel"
          aria-label="Hero selector"
        >
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous hero"
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cloud-white/20 bg-midnight-bg/70 text-cloud-white transition hover:border-toxic-lime hover:text-toxic-lime"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next hero"
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cloud-white/20 bg-midnight-bg/70 text-cloud-white transition hover:border-toxic-lime hover:text-toxic-lime"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>

          <div key={hero.name} className="mx-auto max-w-3xl text-center">
            <span
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em]"
              style={{ borderColor: `${hero.accent}80`, color: hero.accent }}
            >
              Hero {index + 1} of {PLAYER_ROLES.length} · {STATUS_LABEL[hero.status]}
            </span>
            <h3 className="mt-4 font-display text-4xl font-extrabold uppercase text-cloud-white sm:text-6xl">{hero.name}</h3>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-cloud-white/60">{hero.weapon}</p>

            <div className="mt-8 grid gap-6 text-left sm:grid-cols-3">
              <div className="rounded-xl border border-cloud-white/10 bg-midnight-bg/50 p-4">
                <span className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-cloud-white/50"><Swords className="h-3.5 w-3.5" aria-hidden="true" />Powers</span>
                <ul className="mt-2 space-y-1 text-sm text-cloud-white/90">
                  {hero.powers.map((power) => <li key={power}>{power}</li>)}
                </ul>
              </div>
              <div className="rounded-xl border border-cloud-white/10 bg-midnight-bg/50 p-4">
                <span className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-cloud-white/50"><Search className="h-3.5 w-3.5" aria-hidden="true" />Mystery specialty</span>
                <p className="mt-2 text-sm leading-relaxed text-cloud-white/90">{hero.mysterySpecialty}</p>
              </div>
              <div className="rounded-xl border border-cloud-white/10 bg-midnight-bg/50 p-4">
                <span className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-cloud-white/50"><Compass className="h-3.5 w-3.5" aria-hidden="true" />Quest affinity</span>
                <p className="mt-2 text-sm leading-relaxed text-cloud-white/90">{hero.questAffinity}</p>
              </div>
            </div>

            <p className="mx-auto mt-6 max-w-2xl text-sm italic leading-relaxed text-cloud-white/70">
              <Crosshair className="mr-1.5 inline h-3.5 w-3.5" aria-hidden="true" />
              {hero.tension}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Choose a hero">
          {PLAYER_ROLES.map((role, i) => (
            <button
              key={role.name}
              type="button"
              role="tab"
              aria-selected={i === index}
              onClick={() => setIndex(i)}
              className={`rounded-full border px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wider transition ${
                i === index ? "border-toxic-lime bg-toxic-lime text-midnight-bg" : "border-cloud-white/20 text-cloud-white/70 hover:border-toxic-lime hover:text-toxic-lime"
              }`}
            >
              {role.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
