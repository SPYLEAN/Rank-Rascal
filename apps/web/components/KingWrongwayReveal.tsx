import Image from "next/image";
import { Crown } from "lucide-react";
import { BRAND_ASSETS } from "@/lib/brand-assets";
import { KING_WRONGWAY } from "@/lib/game-content";

export function KingWrongwayReveal() {
  return (
    <section className="relative min-h-[620px] overflow-hidden border-y border-panel-navy-light" aria-labelledby="king-wrongway-title">
      <Image
        src={BRAND_ASSETS.game.stickerwoodEnemiesBoss}
        alt="Concept lineup for Crown Sprout, Glitch Slime, Lost Sticker and King Wrongway"
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,8,17,.15)_0%,rgba(7,8,17,.55)_45%,rgba(7,8,17,.96)_78%)]" />
      <div className="relative mx-auto flex min-h-[620px] max-w-7xl items-end justify-end px-4 py-20 sm:px-6 lg:items-center lg:px-8">
        <div className="max-w-xl border-r-2 border-hot-pink bg-midnight-bg/85 p-7 shadow-2xl backdrop-blur-xl sm:p-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-hot-pink/60 bg-hot-pink/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-hot-pink">
            <Crown className="h-3.5 w-3.5" aria-hidden="true" />
            Concept · Episode 1 boss
          </div>
          <h2 id="king-wrongway-title" className="mt-4 font-display text-4xl font-extrabold leading-tight text-cloud-white sm:text-5xl">{KING_WRONGWAY.title}</h2>
          <p className="mt-5 text-base leading-relaxed text-cloud-white/78">{KING_WRONGWAY.copy}</p>
          <p className="mt-5 border-t border-cloud-white/15 pt-4 font-mono text-[11px] uppercase tracking-wider text-muted-text">No final boss model, rig or encounter exists yet—this is narrative direction, not a gameplay demo.</p>
        </div>
      </div>
    </section>
  );
}
