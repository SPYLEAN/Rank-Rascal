import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { UPDATE_KINDS, formatUpdateDate, publishedUpdates } from "@/lib/updates";

const STAGES = [
  { label: "Foundation", state: "Canon, scope and art direction: now", done: false, current: true },
  { label: "Prototype", state: "Crown Knight, one Fraud, one area", done: false, current: false },
  { label: "Private playtest", state: "Not open yet", done: false, current: false },
  { label: "Release 1", state: "Unannounced", done: false, current: false },
] as const;

/**
 * Chapter 09 — the honest production record plus the latest posts from /updates.
 * Reads the schedule at request time, so newly published announcements show up here too.
 */
export function BuildArchive() {
  const latest = publishedUpdates().slice(0, 3);

  return (
    <section id="build-in-public" aria-labelledby="build-title" className="scroll-mt-20 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="section-kicker">09 · Follow development</p>
        <h2 id="build-title" className="chapter-title mt-4">Latest from the realm.</h2>
        <p className="chapter-lede">Concept art is direction. A prototype is evidence. Only a tested build earns the word final.</p>

        <ol className="mt-12 grid gap-6 border-t border-cloud-white/15 pt-6 sm:grid-cols-4" aria-label="Production stages">
          {STAGES.map((stage) => (
            <li key={stage.label} className="flex items-start gap-3">
              <span
                className={`mt-1.5 h-3 w-3 flex-none rounded-full ${
                  stage.done ? "bg-antique-gold" : stage.current ? "border-2 border-antique-gold bg-antique-gold/40" : "border border-cloud-white/45"
                }`}
                aria-hidden="true"
              />
              <div>
                <p className={`font-display font-bold ${stage.done || stage.current ? "text-cloud-white" : "text-cloud-white/75"}`}>
                  {stage.label}
                  {stage.current ? <span className="sr-only"> (current stage)</span> : null}
                </p>
                <p className="text-sm text-cloud-white/70">{stage.state}</p>
              </div>
            </li>
          ))}
        </ol>

        <ul className="mt-16 divide-y divide-cloud-white/10 border-y border-cloud-white/10">
          {latest.map((post) => (
            <li key={post.slug}>
              <Link href={`/updates#${post.slug}`} className="group grid gap-2 py-7 sm:grid-cols-[12rem_1fr_auto] sm:items-baseline sm:gap-8">
                <span className="text-sm text-cloud-white/70">
                  {formatUpdateDate(post.publishAt)}
                  <span className="block font-semibold text-antique-gold">{UPDATE_KINDS[post.kind]}</span>
                </span>
                <span>
                  <span className="block font-display text-xl font-bold text-cloud-white transition group-hover:text-antique-gold">{post.title}</span>
                  <span className="mt-1 block text-cloud-white/80">{post.summary}</span>
                </span>
                <ArrowRight className="hidden h-5 w-5 text-antique-gold transition group-hover:translate-x-1 sm:block" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          <Link href="/updates" className="text-link">
            All updates and announcements <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/devlog" className="text-link">
            Development log <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
