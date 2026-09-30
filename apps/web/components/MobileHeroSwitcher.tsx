"use client";

import { useId, useState, type KeyboardEvent } from "react";
import Image from "next/image";

export type MobileHero = {
  name: string;
  role: string;
  weapon: string;
  specialty: string;
  art: string;
};

/**
 * The three launch heroes as tabs: one compact card at a time instead of three stacked
 * biographies. Arrow keys, Home and End move between tabs (WAI-ARIA tabs pattern).
 */
export function MobileHeroSwitcher({ heroes }: { heroes: readonly MobileHero[] }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const hero = heroes[active];

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = heroes.length - 1;
    const next =
      event.key === "ArrowRight" ? (active + 1) % heroes.length
      : event.key === "ArrowLeft" ? (active - 1 + heroes.length) % heroes.length
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  };

  return (
    <div className="mt-3">
      {/* The middle column fits "Glitchcaster" (one long word); the two-word names wrap. */}
      <div role="tablist" aria-label="Release 1.0 heroes" className="grid grid-cols-[1fr_auto_1fr] gap-1.5" onKeyDown={onKeyDown}>
        {heroes.map((item, index) => (
          <button
            key={item.name}
            id={`${baseId}-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-controls={`${baseId}-panel`}
            tabIndex={index === active ? 0 : -1}
            onClick={() => setActive(index)}
            className={`min-h-11 rounded-sm border px-2 py-1.5 text-center font-display text-[0.78rem] font-bold uppercase leading-tight transition ${
              index === active
                ? "border-antique-gold bg-antique-gold/15 text-cloud-white"
                : "border-cloud-white/20 text-cloud-white/70 hover:text-cloud-white"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        className="mt-3 grid grid-cols-[7rem_1fr] gap-4 rounded-sm border border-cloud-white/12 bg-[#0b0912]/60 p-3"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#0b0912]">
          <Image
            key={hero.name}
            src={hero.art}
            alt={`${hero.name} hero concept art`}
            fill
            sizes="112px"
            className="scene-in object-cover object-top"
          />
        </div>
        <div className="min-w-0">
          <p className="font-display text-lg font-extrabold uppercase leading-tight text-cloud-white">{hero.name}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-antique-gold">{hero.role}</p>
          <p className="mt-2 text-sm leading-snug text-cloud-white/80">
            {hero.weapon}. {hero.specialty}
          </p>
        </div>
      </div>
    </div>
  );
}
