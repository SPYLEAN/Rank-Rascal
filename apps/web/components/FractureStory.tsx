"use client";

import type { PointerEvent } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, Layers3, ScanSearch } from "lucide-react";
import { STORY_FOUNDATION } from "@/lib/game-content";
import { BRAND_ASSETS } from "@/lib/brand-assets";

const LAYERS = [
  {
    id: "promise",
    number: "01",
    label: "The promise",
    title: "One rule could steady a kingdom.",
    copy: STORY_FOUNDATION.premise,
  },
  {
    id: "edit",
    number: "02",
    label: "The edit",
    title: "Safety became a way to erase disagreement.",
    copy: "The Crown stopped settling public facts and began correcting memory, direction and possibility. Every contradiction became something the kingdom could delete.",
  },
  {
    id: "fracture",
    number: "03",
    label: "The fracture",
    title: "Reality remembers every version it buried.",
    copy: STORY_FOUNDATION.fracture,
  },
] as const;

export function FractureStory() {
  const [activeLayer, setActiveLayer] = useState(2);
  const layer = LAYERS[activeLayer];

  const moveScene = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--fracture-x", `${x * -18}px`);
    event.currentTarget.style.setProperty("--fracture-y", `${y * -12}px`);
  };

  return (
    <section id="fracture" className="fracture-section scroll-mt-24 border-y border-cloud-white/10" aria-labelledby="fracture-title">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-7 lg:grid-cols-[.78fr_1.22fr] lg:items-end">
          <div>
            <p className="section-kicker">The fracture beneath Stickerwood</p>
            <h2 id="fracture-title" className="section-title max-w-3xl">The kingdom is standing on every truth it erased.</h2>
          </div>
          <p className="section-lede max-w-2xl lg:justify-self-end">Stickerwood is not breaking at random. The buried versions of its roads, memories and promises are pushing back through the world above.</p>
        </div>

        <div className="fracture-stage mt-12" onPointerMove={moveScene} onPointerLeave={(event) => { event.currentTarget.style.setProperty("--fracture-x", "0px"); event.currentTarget.style.setProperty("--fracture-y", "0px"); }}>
          <Image
            src={BRAND_ASSETS.game.fractureBeneathStickerwood}
            alt="Stickerwood splitting open to reveal a buried kingdom, false roads and Crown corruption beneath the realm"
            fill
            sizes="(max-width: 1024px) 100vw, 1280px"
            className="fracture-world-image object-cover"
          />
          <div className="fracture-vignette" />
          <div className="fracture-depth-lines" aria-hidden="true" />
          <div className="fracture-pulse" aria-hidden="true" />
          <div className="fracture-scan-label"><ScanSearch className="h-4 w-4" aria-hidden="true" /> LIE STRATUM {layer.number} DETECTED</div>

          <div className="fracture-story-card" key={layer.id}>
            <p className="archive-meta text-hot-pink">{layer.number} // {layer.label}</p>
            <h3>{layer.title}</h3>
            <p>{layer.copy}</p>
            <Link href="/game#premise">Enter the complete story dossier <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>

          <div className="fracture-layer-switcher" aria-label="Explore the buried story layers">
            {LAYERS.map((item, index) => {
              const Icon = index === 0 ? Layers3 : index === 1 ? Eye : ScanSearch;
              return (
                <button key={item.id} type="button" aria-pressed={index === activeLayer} onClick={() => setActiveLayer(index)}>
                  <span>{item.number}</span><Icon className="h-4 w-4" aria-hidden="true" /><strong>{item.label}</strong>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
