import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, CircleDashed, LockKeyhole, RadioTower } from "lucide-react";
import { BRAND_ASSETS } from "@/lib/brand-assets";
import { DEVLOG_ENTRIES } from "@/lib/game-content";

const ENTRY_VISUALS = [
  BRAND_ASSETS.game.stickerwoodKeyArt,
  BRAND_ASSETS.mascotDefault,
  BRAND_ASSETS.game.worldLiesUi,
] as const;

const PIPELINE = [
  { label: "Visual language", state: "Locked", active: false },
  { label: "World prototype", state: "Assembling", active: true },
  { label: "Private playtest", state: "Not opened", active: false },
  { label: "Launch", state: "Unannounced", active: false },
] as const;

export function BuildArchive() {
  return (
    <section id="build-in-public" className="build-archive scroll-mt-24 border-y border-panel-navy-light" aria-labelledby="build-archive-title">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="build-archive-heading">
          <div className="max-w-3xl">
            <p className="section-kicker">Build in public</p>
            <h2 id="build-archive-title" className="section-title">Watch the realm become real.</h2>
            <p className="section-lede">No invented percentages and no launch date disguised as a promise. Every record shows what changed, what is still concept work and what must survive player testing.</p>
          </div>
          <div className="build-live-signal"><RadioTower className="h-5 w-5 text-toxic-lime" aria-hidden="true" /><div><span>Current production signal</span><strong>WORLD PROTOTYPE // ASSEMBLING</strong></div></div>
        </div>

        <div className="build-pipeline" aria-label="Production stages">
          {PIPELINE.map((stage, index) => (
            <div key={stage.label} className={stage.active ? "is-current" : ""}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><strong>{stage.label}</strong><small>{stage.state}</small></div>
              {index === 0 ? <Check className="h-4 w-4" aria-hidden="true" /> : stage.active ? <CircleDashed className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" /> : <LockKeyhole className="h-4 w-4" aria-hidden="true" />}
            </div>
          ))}
        </div>

        <div className="build-card-grid">
          {DEVLOG_ENTRIES.map((entry, index) => (
            <Link key={entry.slug} href={`/devlog#${entry.slug}`} className={`build-card build-card-${index + 1}`}>
              <Image
                src={ENTRY_VISUALS[index]}
                alt=""
                fill
                sizes={index === 0 ? "(max-width: 1024px) 100vw, 58vw" : "(max-width: 1024px) 100vw, 38vw"}
                className={index === 1 ? "object-contain object-right-bottom" : "object-cover"}
              />
              <div className="build-card-shade" />
              <div className="build-card-scan" aria-hidden="true" />
              <div className="build-card-copy">
                <div className="flex items-center justify-between gap-4"><span>{String(index + 1).padStart(2, "0")} // {entry.status}</span><time>{entry.date}</time></div>
                <h3>{entry.title}</h3>
                <p>{entry.summary}</p>
                <strong>Open production record <ArrowRight className="h-4 w-4" aria-hidden="true" /></strong>
              </div>
            </Link>
          ))}
        </div>

        <div className="build-archive-footer">
          <p><span>ARCHIVE RULE</span> Concept art is direction. A prototype is evidence. Only a tested build earns the word final.</p>
          <Link href="/devlog">Enter the complete production record <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
