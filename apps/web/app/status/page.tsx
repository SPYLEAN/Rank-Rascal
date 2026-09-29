import type { Metadata } from "next";
import Link from "next/link";
import { SimplePage } from "@/components/SimplePage";

export const metadata: Metadata = {
  title: "Project Status",
  description: "What exists today for Rascal Realms: Crownfall, stage by stage. Development status, not live-service monitoring.",
};

// Stages follow the production phases in docs/rascal-realms/FIRST_RELEASE.md §39.
const ITEMS = [
  { name: "Foundation", status: "Now", tone: "current", detail: "Game bible, Release 1 scope, canon, art direction, concept art, the teaser and this website." },
  { name: "Prototype (vertical slice 0.1)", status: "Next", tone: "next", detail: "One small Stickerwood area, Crown Knight, Razz, a Crown Sprout, basic combat, the first Fraud sign, one quest and saving." },
  { name: "Private playtesting", status: "Not open yet", tone: "later", detail: "Founding QA candidates may be invited in small groups once a build is ready. No date yet." },
  { name: "Release 1: Chapter 1", status: "Unannounced", tone: "later", detail: "The Sign That Lied. No release date has been set." },
  { name: "Rank Rascal Discord bot", status: "Paused", tone: "paused", detail: "Installation and bot feature work are closed while the team focuses on the game. Preserved data stays covered by the privacy policy." },
] as const;

const TONE = {
  current: "bg-antique-gold text-ink-plum",
  next: "border border-antique-gold text-antique-gold",
  later: "border border-cloud-white/35 text-cloud-white/80",
  paused: "border border-cloud-white/35 text-cloud-white/80",
} as const;

export default function StatusPage() {
  return (
    <SimplePage
      kicker="Project status"
      title="What exists today"
      lede="A plain snapshot of development, updated as things change. This is production status, not live-service monitoring."
    >
      <ol className="not-prose border-t border-cloud-white/15">
        {ITEMS.map((item) => (
          <li key={item.name} className="grid gap-3 border-b border-cloud-white/10 py-6 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-8">
            <div>
              <h2 className="!mt-0 font-display text-lg font-bold text-cloud-white">{item.name}</h2>
              <p className="!mt-1 text-sm leading-relaxed text-cloud-white/80">{item.detail}</p>
            </div>
            <span className={`w-fit rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] ${TONE[item.tone]}`}>{item.status}</span>
          </li>
        ))}
      </ol>
      <p>
        For announcements see <Link href="/updates">Updates</Link>; for the reasoning behind decisions, the <Link href="/devlog">development log</Link>.
      </p>
    </SimplePage>
  );
}
