import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => (
  <footer className="mt-20 border-t border-panel-navy-light bg-[#090b14] text-muted-text">
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 md:grid-cols-4">
        <div className="space-y-4 md:col-span-2">
          <Link href="/" className="inline-flex"><Image src="/brand/logo-lockup.png" alt="Rascal Realms: Crownfall" width={190} height={46} className="h-auto w-[190px]" /></Link>
          <p className="max-w-md text-sm leading-relaxed">Home of Rascal Realms: Crownfall, a co-op Roblox action-adventure mystery in active pre-production, built by the Rascal Labs community.</p>
          <div className="flex items-center gap-2 font-mono text-xs text-toxic-lime"><ShieldCheck className="h-4 w-4" aria-hidden="true" /><span>13+ community · human-reviewed submissions</span></div>
        </div>
        <div>
          <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-cloud-white">World archive</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link href="/game" className="hover:text-toxic-lime">The Game</Link></li>
            <li><Link href="/devlog" className="hover:text-toxic-lime">Development Log</Link></li>
            <li><Link href="/community" className="hover:text-toxic-lime">Community Hub</Link></li>
            <li><a href={process.env.NEXT_PUBLIC_COMMUNITY_URL || "https://discord.gg/gkneGrpzAn"} target="_blank" rel="noopener noreferrer" className="hover:text-toxic-lime font-semibold text-toxic-lime">Discord Community ↗</a></li>
            <li><Link href="/status" className="hover:text-toxic-lime">Project Status</Link></li>
            <li><Link href="/invite" className="hover:text-toxic-lime">Discord Bot Archive</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-cloud-white">Project trust</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link href="/safety" className="hover:text-toxic-lime">Safety</Link></li>
            <li><Link href="/privacy" className="hover:text-toxic-lime">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-toxic-lime">Terms</Link></li>
            <li><Link href="/support" className="hover:text-toxic-lime">Support</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-3 border-t border-panel-navy-light pt-8 text-xs text-muted-text/75 sm:flex-row sm:items-center sm:justify-between">
        <p>Rascal Labs is an independent project and is not affiliated with or endorsed by Roblox or Discord.</p>
        <p>© {new Date().getFullYear()} Rascal Labs / Rank Rascal · Created by <a href="https://spylean-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="font-bold text-cloud-white transition hover:text-toxic-lime hover:underline hover:underline-offset-4">SPYLEAN</a></p>
      </div>
    </div>
  </footer>
);
