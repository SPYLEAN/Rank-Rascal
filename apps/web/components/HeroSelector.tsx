"use client";

import { useId, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BRAND_ASSETS } from "@/lib/brand-assets";
import { PLAYER_ROLES } from "@/lib/game-content";

type SceneKey = keyof typeof BRAND_ASSETS.locations;

/** Canon accents are for light and atmosphere; these lighter variants keep text at ≥4.5:1. */
const READABLE_ACCENT: Record<string, string> = {
  "#6B31A8": "#B99BFF",
  "#41633B": "#9CC98A",
  "#E632A9": "#FF7CC8",
};

/** One concept portrait per hero (BRAND_ASSETS.heroes). The scene behind stays cinematic. */
const HERO_ART: Record<string, string> = {
  "Crown Knight": BRAND_ASSETS.heroes.crownKnight,
  Glitchcaster: BRAND_ASSETS.heroes.glitchcaster,
  "Shadow Ranger": BRAND_ASSETS.heroes.shadowRanger,
  Trickster: BRAND_ASSETS.heroes.trickster,
  Lorekeeper: BRAND_ASSETS.heroes.lorekeeper,
  "Badge Scout": BRAND_ASSETS.heroes.badgeScout,
};

const SCENE_NAMES: Record<SceneKey, string> = {
  startingVillage: "Starting Village",
  stickerwoodHeartwood: "the Heartwood",
  mysteryForest: "Stickerwood Forest",
  ancientTree: "the Ancient Tree",
  rascalPlazaRealm: "Rascal Plaza",
  hiddenCove: "a hidden cove",
  glitchGrove: "Glitch Grove",
  kingWrongwayCitadel: "King Wrongway Citadel",
  skyBridges: "the Sky Bridges",
};

function sceneName(scene: SceneKey): string {
  return SCENE_NAMES[scene] ?? "Stickerwood";
}

/**
 * Chapter 04 — one hero owns the screen. Each hero stands on their own ground (a concept-art
 * location that suits them), with the scene, accent light and copy changing together.
 * No character renders are shown or implied: none exist yet.
 */
export function HeroSelector() {
  const [index, setIndex] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const touchStart = useRef<number | null>(null);
  const baseId = useId();
  const hero = PLAYER_ROLES[index];
  const count = PLAYER_ROLES.length;

  const select = (next: number, focusTab = false) => {
    const wrapped = (next + count) % count;
    if (wrapped === index) return;
    setPrevious(index);
    setIndex(wrapped);
    if (focusTab) document.getElementById(`${baseId}-tab-${wrapped}`)?.focus();
  };

  const onTabKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const target =
      event.key === "ArrowRight" ? index + 1
      : event.key === "ArrowLeft" ? index - 1
      : event.key === "Home" ? 0
      : event.key === "End" ? count - 1
      : null;
    if (target === null) return;
    event.preventDefault();
    select(target, true);
  };

  const onTouchStart = (event: TouchEvent) => {
    touchStart.current = event.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (event: TouchEvent) => {
    if (touchStart.current === null) return;
    const delta = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current;
    if (Math.abs(delta) > 50) select(index + (delta < 0 ? 1 : -1));
    touchStart.current = null;
  };

  const scene = hero.scene as SceneKey;
  const previousScene = previous === null ? null : (PLAYER_ROLES[previous].scene as SceneKey);

  return (
    <section
      id="heroes"
      aria-labelledby="heroes-title"
      className="chapter flex min-h-[92svh] scroll-mt-20 flex-col justify-end"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="chapter-art" style={{ position: "absolute", inset: 0 }}>
        {previousScene && previousScene !== scene ? (
          <Image src={BRAND_ASSETS.locations[previousScene]} alt="" fill sizes="100vw" className="object-cover" aria-hidden="true" />
        ) : null}
        <Image
          key={scene}
          src={BRAND_ASSETS.locations[scene]}
          alt=""
          fill
          sizes="100vw"
          className="scene-in object-cover"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 transition-[background] duration-700"
          style={{
            background: `radial-gradient(circle at 18% 70%, ${hero.accent}33 0%, transparent 45%), linear-gradient(90deg, rgba(13,11,20,.92) 0%, rgba(13,11,20,.7) 42%, rgba(13,11,20,.25) 78%)`,
          }}
        />
      </div>
      <div className="fade-edges" />

      <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-36 sm:px-8 lg:pb-20">
        <p className="section-kicker">04 · Choose your hero</p>
        <h2 id="heroes-title" className="sr-only">Choose your hero</h2>

        <div
          id={`${baseId}-panel`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${index}`}
          className="mt-6 grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] xl:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]"
        >
          <figure key={`${hero.name}-art`} className="scene-in order-first mx-auto w-44 sm:w-56 lg:order-last lg:mx-0 lg:w-full">
            <div className="relative aspect-[1122/1402] overflow-hidden rounded-md shadow-[0_30px_80px_-30px_rgba(0,0,0,.9)] ring-1 ring-antique-gold/50">
              <Image
                src={HERO_ART[hero.name] ?? BRAND_ASSETS.heroes.crownKnight}
                alt={`${hero.name} hero concept art: ${hero.role.toLowerCase()} with the ${hero.weapon}`}
                fill
                sizes="(min-width: 1280px) 416px, (min-width: 1024px) 352px, 224px"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-cloud-white/70 lg:text-left">Hero concept art</figcaption>
          </figure>

          <div className="max-w-3xl">
          <p key={`${hero.name}-role`} className="scene-in flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: READABLE_ACCENT[hero.accent] ?? hero.accent }}>
            {hero.role}
            <span
              className={`rounded-sm px-2 py-0.5 text-[0.68rem] tracking-[0.14em] ${
                hero.release === "launch" ? "bg-antique-gold text-ink-plum" : "border border-paper-cream/40 text-paper-cream/90"
              }`}
            >
              {hero.releaseNote}
            </span>
          </p>
          <h3 key={hero.name} className="scene-in mt-3 font-display text-[clamp(3rem,7.5vw,7rem)] font-extrabold uppercase leading-[.85] tracking-[-0.04em] text-cloud-white">
            {hero.name}
          </h3>
          <p className="mt-4 text-lg text-paper-cream/90">
            <span className="mr-2 text-xs font-semibold uppercase tracking-[0.2em] text-antique-gold">Weapon</span>
            {hero.weapon}
          </p>

          <dl className="mt-8 grid gap-6 text-base sm:grid-cols-3">
            <div>
              <dt className="section-kicker">Powers</dt>
              <dd className="mt-2 space-y-1 text-cloud-white/90">
                {hero.powers.map((power) => <span key={power} className="block">{power}</span>)}
              </dd>
            </div>
            <div>
              <dt className="section-kicker">Reads</dt>
              <dd className="mt-2 text-cloud-white/85">{hero.mysterySpecialty}</dd>
            </div>
            <div>
              <dt className="section-kicker">Drawn to</dt>
              <dd className="mt-2 text-cloud-white/85">{hero.questAffinity}</dd>
            </div>
          </dl>

          <p className="mt-8 max-w-xl text-base italic leading-relaxed text-cloud-white/70">{hero.tension}</p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-cloud-white/15 pt-6">
          <div role="tablist" aria-label="Heroes" className="flex flex-wrap gap-x-6 gap-y-1" onKeyDown={onTabKey}>
            {PLAYER_ROLES.map((role, i) => (
              <button
                key={role.name}
                id={`${baseId}-tab-${i}`}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-controls={`${baseId}-panel`}
                tabIndex={i === index ? 0 : -1}
                onClick={() => select(i)}
                className={`min-h-11 border-b-2 text-sm font-semibold transition ${
                  i === index ? "border-antique-gold text-cloud-white" : "border-transparent text-cloud-white/55 hover:text-cloud-white"
                }`}
              >
                {role.name}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <p className="hidden text-xs text-cloud-white/65 md:block">Scene: {sceneName(scene)} · concept art</p>
            <button type="button" onClick={() => select(index - 1)} aria-label="Previous hero" className="flex h-11 w-11 items-center justify-center rounded-full border border-cloud-white/30 text-cloud-white transition hover:border-antique-gold">
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => select(index + 1)} aria-label="Next hero" className="flex h-11 w-11 items-center justify-center rounded-full border border-cloud-white/30 text-cloud-white transition hover:border-antique-gold">
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
        <p className="mt-3 text-xs text-cloud-white/65 md:hidden">Scene: {sceneName(scene)} · concept art</p>
        <p className="mt-2 text-xs text-cloud-white/65">
          Release 1.0 launches with three heroes. Trickster, Lorekeeper and Badge Scout arrive in later updates.
        </p>
      </div>
    </section>
  );
}
