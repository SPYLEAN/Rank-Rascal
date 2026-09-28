import Image from "next/image";
import Link from "next/link";
import React from "react";

const linkClass = "transition hover:text-antique-gold";

export const Footer: React.FC = () => (
  <footer className="border-t border-cloud-white/10 bg-[#0c0e1a] text-cloud-white/70">
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
      <div className="grid gap-10 md:grid-cols-4">
        <div className="space-y-4 md:col-span-2">
          <Link href="/" className="inline-flex">
            <Image src="/brand/logo-lockup.png" alt="Rascal Realms: Crownfall" width={190} height={46} className="h-auto w-[190px]" />
          </Link>
          <p className="max-w-md text-sm leading-relaxed">
            Home of Rascal Realms: Crownfall, a co-op Roblox mystery RPG in pre-production, built in the open by the Rascal Labs community.
          </p>
          <p className="text-sm text-paper-cream/60">13+ community · every submission is read by a person</p>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-antique-gold">The realm</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link href="/game" className={linkClass}>The game</Link></li>
            <li><Link href="/#heroes" className={linkClass}>Heroes</Link></li>
            <li><Link href="/#explore-stickerwood" className={linkClass}>World atlas</Link></li>
            <li><Link href="/game#locations" className={linkClass}>All eleven locations</Link></li>
            <li><Link href="/devlog" className={linkClass}>Development log</Link></li>
            <li><Link href="/community" className={linkClass}>Community</Link></li>
            <li>
              <a href={process.env.NEXT_PUBLIC_COMMUNITY_URL || "https://discord.gg/gkneGrpzAn"} target="_blank" rel="noopener noreferrer" className={`${linkClass} font-semibold text-paper-cream`}>
                Discord ↗
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-antique-gold">Project</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link href="/status" className={linkClass}>Project status</Link></li>
            <li><Link href="/safety" className={linkClass}>Safety</Link></li>
            <li><Link href="/privacy" className={linkClass}>Privacy</Link></li>
            <li><Link href="/terms" className={linkClass}>Terms</Link></li>
            <li><Link href="/support" className={linkClass}>Support</Link></li>
            <li><Link href="/invite" className={linkClass}>Discord bot archive</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-12 flex flex-col gap-3 border-t border-cloud-white/10 pt-8 text-xs text-cloud-white/55 sm:flex-row sm:items-center sm:justify-between">
        <p>Rascal Labs is an independent project and is not affiliated with or endorsed by Roblox or Discord.</p>
        <p>
          © {new Date().getFullYear()} Rascal Labs / Rank Rascal · Created by{" "}
          <a
            href="https://spylean-portfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-cloud-white transition hover:text-antique-gold hover:underline hover:underline-offset-4"
          >
            SPYLEAN
          </a>
        </p>
      </div>
    </div>
  </footer>
);
