import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Heart } from "lucide-react";
import { BRAND_ASSETS } from "@/lib/brand-assets";

const linkClass = "transition hover:text-antique-gold";

/**
 * Full-contrast footer. The bottom padding on small screens keeps the credit line clear of the
 * floating Ask Razz launcher, which sits in the bottom-right corner.
 */
export const Footer: React.FC = () => (
  <footer className="relative border-t border-antique-gold/25 bg-[#0c0e1a] text-cloud-white/85">
    <div className="mx-auto max-w-7xl px-5 pb-28 pt-14 sm:px-8 sm:pb-14">
      <div className="grid gap-10 md:grid-cols-4">
        <div className="space-y-4 md:col-span-2">
          <Link href="/" className="inline-flex" aria-label="Rascal Realms: Crownfall home">
            <Image
              src={BRAND_ASSETS.titleLogo.small}
              alt="Rascal Realms: Crownfall"
              width={600}
              height={337}
              className="h-auto w-[210px]"
            />
          </Link>
          <p className="max-w-md text-sm leading-relaxed">
            Home of Rascal Realms: Crownfall, a story-driven co-op Roblox action RPG mystery in pre-production, built in the open by the Rascal Labs community.
          </p>
          <p className="text-sm text-paper-cream/85">13+ community · every submission is read by a person</p>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-antique-gold">The realm</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link href="/game" className={linkClass}>The game</Link></li>
            <li><Link href="/updates" className={linkClass}>Updates and announcements</Link></li>
            <li><Link href="/#heroes" className={linkClass}>Heroes</Link></li>
            <li><Link href="/#explore-stickerwood" className={linkClass}>World atlas</Link></li>
            <li><Link href="/game#locations" className={linkClass}>All ten areas</Link></li>
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
      <div className="mt-12 flex flex-col gap-3 border-t border-cloud-white/15 pt-8 text-sm text-cloud-white/80 sm:flex-row sm:items-center sm:justify-between">
        <p>Rascal Labs is an independent project and is not affiliated with or endorsed by Roblox or Discord.</p>
        <p className="flex flex-wrap items-center gap-x-1.5">
          <span>© {new Date().getFullYear()} Rascal Labs / Rank Rascal ·</span>
          <span className="inline-flex items-center gap-1.5">
            Created by
            <a
              href="https://spylean-portfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 font-bold text-cloud-white transition hover:text-[#FF8CC6] hover:underline hover:underline-offset-4"
            >
              SPYLEAN
              <Heart className="spylean-heart h-4 w-4 fill-[#FF5FAE] text-[#FF5FAE]" aria-hidden="true" />
            </a>
          </span>
        </p>
      </div>
    </div>
  </footer>
);
