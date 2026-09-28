import type { Metadata } from "next";
import Link from "next/link";
import { Activity, CheckCircle2, CircleDashed, PauseCircle } from "lucide-react";

export const metadata: Metadata = { title: "Project Status" };

const ITEMS = [
  { name: "Visual pre-production", status: "Complete", icon: CheckCircle2, color: "text-toxic-lime", detail: "Razz, Stickerwood, UI, enemies, boss and production bibles established." },
  { name: "Roblox vertical slice", status: "In development", icon: CircleDashed, color: "text-hot-pink", detail: "Movement, combat, World Lies encounter architecture and modular environment work." },
  { name: "Public playtesting", status: "Not open yet", icon: CircleDashed, color: "text-muted-text", detail: "Founders Guild applications can register interest before the first testing gate." },
  { name: "Discord bot", status: "Paused", icon: PauseCircle, color: "text-reward-yellow", detail: "Bot installation and bot-first feature development are closed while focus shifts to the game." },
] as const;

export default function StatusPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <header className="text-center"><Activity className="mx-auto h-7 w-7 text-toxic-lime" aria-hidden="true" /><p className="archive-label mx-auto mt-4 w-fit">Production state index</p><h1 className="mt-5 font-display text-5xl font-extrabold uppercase text-cloud-white sm:text-6xl">Project status</h1><p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-text">A truthful snapshot of what exists today. This is development status, not live-service monitoring.</p></header>
      <div className="mt-12 border-t border-cloud-white/15">
        {ITEMS.map(({ name, status, icon: Icon, color, detail }, index) => (
          <article key={name} className="grid gap-4 border-b border-cloud-white/10 py-6 sm:grid-cols-[52px_1fr_auto] sm:items-center">
            <span className="font-mono text-xs text-hot-pink">0{index + 1}</span><div className="flex gap-4"><Icon className={`mt-1 h-5 w-5 flex-none ${color}`} aria-hidden="true" /><div><h2 className="font-display text-lg font-bold text-cloud-white">{name}</h2><p className="mt-1 text-sm leading-relaxed text-muted-text">{detail}</p></div></div>
            <span className={`font-mono text-xs font-bold uppercase tracking-wider ${color}`}>{status}</span>
          </article>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-muted-text">For detailed changes, read the <Link href="/devlog" className="text-toxic-lime hover:underline">development log</Link>.</p>
    </div>
  );
}
