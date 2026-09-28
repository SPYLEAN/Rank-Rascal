import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DEVLOG_ENTRIES } from "@/lib/game-content";

const STAGES = [
  { label: "Visual language", state: "Locked", done: true, current: false },
  { label: "World prototype", state: "Being built now", done: false, current: true },
  { label: "Private playtest", state: "Not open yet", done: false, current: false },
  { label: "Launch", state: "Unannounced", done: false, current: false },
] as const;

/** Chapter 09 — the honest production record. No percentages, no dates dressed as promises. */
export function BuildArchive() {
  return (
    <section id="build-in-public" aria-labelledby="build-title" className="scroll-mt-20 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="section-kicker">09 · Follow development</p>
        <h2 id="build-title" className="chapter-title mt-4">Built in public.</h2>
        <p className="chapter-lede">Concept art is direction. A prototype is evidence. Only a tested build earns the word final.</p>

        <ol className="mt-12 grid gap-6 border-t border-cloud-white/15 pt-6 sm:grid-cols-4" aria-label="Production stages">
          {STAGES.map((stage) => (
            <li key={stage.label} className="flex items-start gap-3">
              <span
                className={`mt-1.5 h-3 w-3 flex-none rounded-full ${
                  stage.done ? "bg-antique-gold" : stage.current ? "border-2 border-antique-gold" : "border border-cloud-white/35"
                }`}
                aria-hidden="true"
              />
              <div>
                <p className={`font-display font-bold ${stage.done || stage.current ? "text-cloud-white" : "text-cloud-white/60"}`}>{stage.label}</p>
                <p className="text-sm text-cloud-white/60">{stage.state}</p>
              </div>
            </li>
          ))}
        </ol>

        <ul className="mt-16 divide-y divide-cloud-white/10 border-y border-cloud-white/10">
          {DEVLOG_ENTRIES.map((entry) => (
            <li key={entry.slug}>
              <Link href={`/devlog#${entry.slug}`} className="group grid gap-2 py-7 sm:grid-cols-[12rem_1fr_auto] sm:items-baseline sm:gap-8">
                <span className="text-sm text-cloud-white/55">{entry.date}</span>
                <span>
                  <span className="block font-display text-xl font-bold text-cloud-white transition group-hover:text-antique-gold">{entry.title}</span>
                  <span className="mt-1 block text-cloud-white/70">{entry.summary}</span>
                </span>
                <ArrowRight className="hidden h-5 w-5 text-antique-gold transition group-hover:translate-x-1 sm:block" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/devlog" className="text-link mt-8">
          Read the full development log <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
