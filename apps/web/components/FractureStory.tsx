"use client";

import { useId, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { BRAND_ASSETS } from "@/lib/brand-assets";

const BEATS = [
  {
    id: "promise",
    label: "The promise",
    copy: "Stickerwood's first rulers forged the Crown to settle arguments. Declare a road, and the road held. Declare a bridge safe, and it stood.",
    // Calm: the corruption beneath is barely visible.
    art: "brightness-[.55] saturate-[.8] scale-[1.06]",
    crack: 0.12,
  },
  {
    id: "edit",
    label: "The edit",
    copy: "After a disaster no one fully remembers, King Wrongway went further. He used the Crown to erase anything uncertain: dangerous roads, doubtful memories, maps that disagreed.",
    art: "brightness-[.68] saturate-100 scale-[1.03]",
    crack: 0.5,
  },
  {
    id: "fracture",
    label: "The fracture",
    copy: "Now the Crown's commands contradict each other, and the world bends itself to cover the gaps. Signs lie. Witnesses disagree. Every lie still leaves evidence.",
    art: "brightness-[.82] saturate-[1.15] scale-100",
    crack: 1,
  },
] as const;

/** Chapter 03 — the lore, told in three beats. Corruption deepens as the visitor steps through. */
export function FractureStory() {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const beat = BEATS[active];

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = BEATS.length - 1;
    const next =
      event.key === "ArrowRight" ? Math.min(active + 1, last)
      : event.key === "ArrowLeft" ? Math.max(active - 1, 0)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  };

  return (
    <section id="world-lies" aria-labelledby="world-lies-title" className="chapter flex min-h-[92svh] scroll-mt-20 items-center bg-void">
      <div className="chapter-art">
        <Image
          src={BRAND_ASSETS.game.fractureBeneathStickerwood}
          alt="Stickerwood splitting open to reveal a buried kingdom and purple Crown corruption beneath the realm"
          fill
          sizes="100vw"
          className={`object-cover transition-[filter,transform] duration-1000 ease-out ${beat.art}`}
        />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M62 0 L58 18 L64 27 L55 44 L61 55 L52 72 L57 84 L50 100"
            fill="none"
            stroke="#E632A9"
            strokeWidth={3}
            vectorEffect="non-scaling-stroke"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={1 - beat.crack}
            className="transition-[stroke-dashoffset] duration-1000 ease-out [filter:drop-shadow(0_0_6px_#6B31A8)]"
          />
        </svg>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(22,14,33,.9)_0%,rgba(22,14,33,.6)_40%,rgba(22,14,33,.1)_75%)]" />
      </div>
      <div className="fade-edges" />

      <div className="mx-auto w-full max-w-7xl px-5 py-32 sm:px-8">
        <p className="section-kicker">03 · Why the world lies</p>
        <h2 id="world-lies-title" className="chapter-title mt-4 max-w-3xl">The Crown made rules real.</h2>

        <div role="tablist" aria-label="The story in three beats" className="mt-10 flex flex-wrap gap-x-8 gap-y-2" onKeyDown={onKeyDown}>
          {BEATS.map((item, index) => (
            <button
              key={item.id}
              id={`${baseId}-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-controls={`${baseId}-panel`}
              tabIndex={index === active ? 0 : -1}
              onClick={() => setActive(index)}
              className={`min-h-11 border-b-2 pb-1 text-left font-display text-sm font-bold uppercase tracking-wider transition ${
                index === active ? "border-antique-gold text-cloud-white" : "border-transparent text-cloud-white/55 hover:text-cloud-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${active}`} className="mt-6 max-w-xl">
          <p key={beat.id} className="scene-in text-lg leading-relaxed text-cloud-white/85">{beat.copy}</p>
        </div>

        <p className="mt-10 max-w-xl border-l-2 border-antique-gold pl-4 text-base italic text-paper-cream/85">
          Rascals don&apos;t take the official story on faith. In a realm like this, that&apos;s the whole job.
        </p>
      </div>
    </section>
  );
}
