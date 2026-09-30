import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ConceptStatusBadge } from "@/components/ConceptStatusBadge";
import { LABS_PREVIEW, conceptById } from "@/lib/concepts";

/**
 * Chapter 09 — a three-file glimpse into the concept archive. The boards themselves stay in
 * /labs; the homepage only shows cropped previews with a clear concept status.
 */
export function FromRascalLabs() {
  return (
    <section id="from-rascal-labs" aria-labelledby="labs-title" className="labs-archive scroll-mt-20 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="section-kicker">09 · From Rascal Labs</p>
            <h2 id="labs-title" className="chapter-title mt-4 !text-paper-cream">From Rascal Labs</h2>
            <p className="mt-4 font-display text-xl text-paper-cream">Concept studies from the evolving world of Crownfall.</p>
            <p className="mt-2 text-sm text-paper-cream/75">Concepts explore the evolving world of Rascal Realms and may change during development.</p>
          </div>
          <Link href="/labs" className="action-primary">
            Enter Rascal Labs <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {LABS_PREVIEW.map((card, index) => {
            const entry = conceptById(card.entryId);
            if (!entry) return null;
            return (
              <li key={card.category} className="reveal-up" style={{ ["--tilt" as string]: `${index === 1 ? 0.6 : -0.6}deg` }}>
                <Link href={`/labs#${card.category}`} className="group block">
                  <figure className="concept-sheet">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-[#1a1622]">
                      {/* eslint-disable-next-line @next/next/no-img-element -- pre-built 720 px WebP preview */}
                      <img
                        src={entry.image.thumb}
                        alt={entry.alt}
                        width={720}
                        height={Math.round((720 * entry.image.height) / entry.image.width)}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
                        style={{ objectPosition: entry.focus ?? "50% 50%" }}
                      />
                    </div>
                    <figcaption className="px-1 pt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-plum/70">
                      Rascal Labs // File {entry.file}
                    </figcaption>
                  </figure>
                  <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-antique-gold">{card.kicker}</p>
                  <h3 className="mt-1 font-display text-2xl font-extrabold uppercase text-paper-cream">{card.title}</h3>
                  <p className="mt-2 text-paper-cream/85">{card.teaser}</p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <ConceptStatusBadge status={card.status} />
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-[0.12em] text-antique-gold">
                      Explore file <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
