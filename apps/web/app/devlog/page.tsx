import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, GitBranch, MessageSquareText } from "lucide-react";
import { BRAND_ASSETS } from "@/lib/brand-assets";
import { DEVLOG_ENTRIES } from "@/lib/game-content";

export const metadata: Metadata = {
  title: "Development Log",
  description: "Follow the honest development log for Rascal Realms: Crownfall.",
};

export default function DevlogPage() {
  return (
    <div className="pb-24">
      <header className="relative min-h-[680px] overflow-hidden border-b-2 border-royal-purple/40">
        <Image src={BRAND_ASSETS.banners.announcements} alt="Rascal Realms Announcements and Development Log banner" fill priority sizes="100vw" className="object-cover object-[center_35%]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,8,17,.98)_0%,rgba(7,8,17,.86)_44%,rgba(7,8,17,.3)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,#070811_0%,transparent_50%)]" />
        <div className="world-grain absolute inset-0 opacity-20" />
        <div className="relative mx-auto flex min-h-[650px] max-w-7xl items-end px-4 pb-20 pt-32 sm:px-6 lg:items-center lg:px-8">
          <div className="max-w-4xl">
            <div className="archive-label inline-flex items-center gap-2"><GitBranch className="h-4 w-4" aria-hidden="true" />Public production record</div>
            <h1 className="mt-5 max-w-4xl font-display text-5xl font-extrabold uppercase leading-[.94] text-cloud-white sm:text-7xl lg:text-8xl">Development without the fog machine.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-cloud-white/75">Concept, prototype and production are different things. This record says which one you are looking at, what changed, why it changed and what still needs evidence from real players.</p>
          </div>
        </div>
      </header>

      <div className="mx-auto mt-20 max-w-7xl border-t border-cloud-white/15 px-4 sm:px-6 lg:px-8">
        {DEVLOG_ENTRIES.map((entry, index) => (
          <article key={entry.slug} id={entry.slug} className="scroll-mt-28 border-b border-cloud-white/10 py-10 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-[96px_230px_1fr]">
              <div className="font-mono text-5xl font-bold text-royal-purple/50">{String(index + 1).padStart(2, "0")}</div>
              <div>
                <span className="inline-flex border-l-2 border-toxic-lime bg-toxic-lime/10 px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-toxic-lime">{entry.status}</span>
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-text"><CalendarDays className="h-4 w-4" aria-hidden="true" /><time>{entry.date}</time></div>
              </div>
              <div>
                <h2 className="font-display text-3xl font-bold text-cloud-white sm:text-4xl">{entry.title}</h2>
                <p className="mt-4 text-base leading-relaxed text-muted-text">{entry.summary}</p>
                <ul className="mt-6 space-y-3">
                  {entry.details.map((detail) => (
                    <li key={detail} className="flex gap-3 text-sm leading-relaxed text-cloud-white/85"><CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-hot-pink" aria-hidden="true" /><span>{detail}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="mx-4 mt-16 border-l-2 border-hot-pink bg-[radial-gradient(circle_at_right,rgba(122,77,255,.3),transparent_44%),#191D35] p-7 sm:mx-6 sm:p-10 lg:mx-auto lg:max-w-[1180px]">
        <MessageSquareText className="h-7 w-7 text-toxic-lime" aria-hidden="true" />
        <h2 className="mt-4 font-display text-3xl font-bold text-cloud-white">Disagree with a decision?</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-text">Good. The site has a direct community inbox because clear criticism is more useful than passive hype.</p>
        <Link href="/community" className="action-secondary mt-6">Leave feedback <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
      </section>
    </div>
  );
}
