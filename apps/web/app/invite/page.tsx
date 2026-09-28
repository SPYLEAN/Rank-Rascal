import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, PauseCircle } from "lucide-react";
import { RazzMascot } from "@/components/RazzMascot";

export const metadata: Metadata = { title: "Discord Bot Archive" };

export default function InvitePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-royal-purple/45 bg-panel-navy p-8 sm:p-12">
        <RazzMascot pose="detective" size={210} />
        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-reward-yellow/30 bg-reward-yellow/10 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-reward-yellow"><PauseCircle className="h-4 w-4" aria-hidden="true" />Project paused</div>
        <h1 className="mt-5 font-display text-4xl font-extrabold text-cloud-white">The Rank Rascal Discord bot is back in the lab.</h1>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted-text">We paused the bot-first project so the team can focus on Rascal Realms: Crownfall. Existing research and safety work are being preserved, but bot installation is closed.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/game" className="inline-flex items-center justify-center gap-2 rounded-xl bg-toxic-lime px-6 py-3 font-display font-bold text-midnight-bg">Meet the game <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          <Link href="/community" className="inline-flex items-center justify-center rounded-xl border border-cloud-white/25 px-6 py-3 font-display font-bold text-cloud-white">Join the community</Link>
        </div>
      </div>
    </div>
  );
}
