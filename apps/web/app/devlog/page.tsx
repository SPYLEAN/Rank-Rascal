import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BRAND_ASSETS } from "@/lib/brand-assets";
import { DEVLOG_ENTRIES } from "@/lib/game-content";

export const metadata: Metadata = {
  title: "Development Log",
  description: "The honest development log for Rascal Realms: Crownfall: what changed, why, and what still needs evidence.",
};

export default function DevlogPage() {
  return (
    <div className="overflow-x-hidden">
      <header className="chapter flex min-h-[64svh] items-end">
        <div className="chapter-art">
          <Image
            src={BRAND_ASSETS.game.qaTruthLab}
            alt="Concept art: Razz and a squad compare evidence on a disputed route in Stickerwood"
            fill
            priority
            sizes="100vw"
            className="parallax-art object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,10,20,.94)_0%,rgba(12,10,20,.72)_50%,rgba(12,10,20,.2)_100%)]" />
        </div>
        <div className="fade-edges" />
        <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-40 sm:px-8">
          <p className="section-kicker">Development log</p>
          <h1 className="chapter-title mt-4 max-w-4xl">Development without the fog machine.</h1>
          <p className="chapter-lede max-w-2xl">
            Concept, prototype and production are different things. Each entry says which one you&apos;re looking at, what changed, why, and what still needs evidence from real players.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:py-24">
        <ol className="border-t border-cloud-white/15">
          {DEVLOG_ENTRIES.map((entry) => (
            <li key={entry.slug} id={entry.slug} className="scroll-mt-28 border-b border-cloud-white/10 py-12">
              <p className="text-sm text-cloud-white/75">
                <time>{entry.date}</time>
                <span className="mx-2 text-cloud-white/35" aria-hidden="true">·</span>
                <span className="font-semibold uppercase tracking-[0.14em] text-antique-gold">{entry.status.toLowerCase()}</span>
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-cloud-white sm:text-4xl">{entry.title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-cloud-white/85">{entry.summary}</p>
              <ul className="mt-6 space-y-3 border-l-2 border-antique-gold/50 pl-5">
                {entry.details.map((detail) => (
                  <li key={detail} className="leading-relaxed text-cloud-white/85">
                    {detail}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <section className="mt-16 border-t border-antique-gold/40 pt-10">
          <h2 className="font-display text-2xl font-bold text-cloud-white">Disagree with a decision?</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-cloud-white/85">Good. Clear criticism is more useful than passive hype, and a person reads every review.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/community#review" className="action-primary">
              Send a review <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/updates" className="action-secondary">
              See announcements <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
