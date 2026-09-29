import type { Metadata } from "next";
import { ConceptArchive } from "@/components/ConceptArchive";
import { RELEASE_VS_LABS } from "@/lib/concepts";

export const metadata: Metadata = {
  title: "Rascal Labs Concept Archive",
  description: "Concept studies from the evolving world of Rascal Realms: Crownfall: enemies, companions, rivers, relics, weapons and the realms beyond Stickerwood.",
};

/**
 * The Rascal Labs concept archive. Concept boards live here, not in the cinematic homepage
 * chapters. Every file is data in lib/concepts.ts.
 */
export default function LabsPage() {
  return (
    <div className="labs-archive overflow-x-hidden">
      <header className="relative mx-auto max-w-7xl px-5 pb-14 pt-20 sm:px-8 lg:pt-28">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-antique-gold">From Rascal Labs</p>
        <h1 className="mt-5 font-display font-extrabold uppercase leading-[0.9] tracking-[-0.03em] text-paper-cream">
          <span className="block text-2xl tracking-[0.2em] text-antique-gold sm:text-3xl">Rascal Labs</span>
          <span className="mt-2 block text-5xl sm:text-7xl">Concept Archive</span>
        </h1>
        <p className="mt-6 max-w-2xl font-display text-xl text-paper-cream sm:text-2xl">Fragments from the world we&apos;re building.</p>
        <p className="mt-3 max-w-2xl text-paper-cream/80">
          Concept studies from the evolving world of Crownfall. Concepts explore the evolving world of Rascal Realms and may change during development.
        </p>

        <div className="mt-12 grid gap-8 border-t border-antique-gold/25 pt-8 md:grid-cols-2 md:gap-14">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-antique-gold">In Release 1.0 · A Sign of Trouble</p>
            <p className="mt-3 leading-relaxed text-paper-cream/90">{RELEASE_VS_LABS.release.join(" · ")}</p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#D7C6FF]">From the labs · later, or still exploring</p>
            <p className="mt-3 leading-relaxed text-paper-cream/75">{RELEASE_VS_LABS.labs.join(" · ")}</p>
          </div>
        </div>
      </header>

      <ConceptArchive />
    </div>
  );
}
