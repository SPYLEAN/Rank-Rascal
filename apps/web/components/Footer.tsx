import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Heart } from "lucide-react";
import { SocialLinks } from "@/components/SocialLinks";
import { BRAND_ASSETS } from "@/lib/brand-assets";

const linkClass = "transition hover:text-antique-gold";

/** Phones get one compact grid instead of the two long columns. */
const COMPACT_LINKS = [
  { href: "/game", label: "The game" },
  { href: "/updates", label: "Updates" },
  { href: "/labs", label: "Rascal Labs" },
  { href: "/community", label: "Community" },
  { href: "/status", label: "Status" },
  { href: "/safety", label: "Safety" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/support", label: "Support" },
] as const;

/**
 * Full-contrast footer. The bottom padding on small screens keeps the credit line clear of the
 * floating Ask Razz launcher, which sits in the bottom-right corner. On phones it collapses to
 * the social icons, one compact link grid and the legal line (the sticky header carries the logo).
 */
export const Footer: React.FC = () => (
  <footer data-razz-clear className="relative border-t border-antique-gold/25 bg-[#0c0e1a] text-cloud-white/85">
    <div className="mx-auto max-w-7xl px-5 pb-20 pt-8 sm:px-8 sm:pb-14 sm:pt-14">
      <div className="grid gap-5 sm:gap-10 md:grid-cols-4">
        <div className="space-y-3 sm:space-y-4 md:col-span-2">
          <Link href="/" className="hidden sm:inline-flex" aria-label="Rascal Realms: Crownfall home">
            <Image
              src={BRAND_ASSETS.titleLogo.small}
              alt="Rascal Realms: Crownfall"
              width={600}
              height={337}
              className="h-auto w-[112px] sm:w-[210px]"
            />
          </Link>
          <p className="hidden max-w-md text-sm leading-relaxed sm:block">
            Home of Rascal Realms: Crownfall, a story-driven co-op Roblox action RPG mystery in pre-production, built in the open by the Rascal Labs community.
          </p>
          <p className="text-sm text-paper-cream/85">13+ community · every submission is read by a person</p>
          <SocialLinks label="Rascal Realms on social media" compactOnPhones />
        </div>
        <nav aria-label="Footer" className="sm:hidden">
          <ul className="grid grid-cols-3 gap-x-3 text-sm">
            {COMPACT_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className={`${linkClass} flex min-h-11 items-center`}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden sm:block">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-antique-gold">The realm</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link href="/game" className={linkClass}>The game</Link></li>
            <li><Link href="/updates" className={linkClass}>Updates and announcements</Link></li>
            <li><Link href="/labs" className={linkClass}>Rascal Labs concept archive</Link></li>
            <li><Link href="/#heroes" className={linkClass}>Heroes</Link></li>
            <li><Link href="/#explore-stickerwood" className={linkClass}>World atlas</Link></li>
            <li><Link href="/game#locations" className={linkClass}>All ten areas</Link></li>
            <li><Link href="/devlog" className={linkClass}>Development log</Link></li>
            <li><Link href="/community" className={linkClass}>Community</Link></li>
          </ul>
        </div>
        <div className="hidden sm:block">
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
      <div className="mt-5 flex flex-col gap-2 border-t border-cloud-white/15 pt-5 text-sm text-cloud-white/80 sm:mt-12 sm:gap-3 sm:pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p>Rascal Labs is an independent project and is not affiliated with or endorsed by Roblox or Discord.</p>
        <p className="flex flex-wrap items-center gap-x-1.5">
          <span>© {new Date().getFullYear()} Rascal Labs / Rank Rascal ·</span>
          <span className="inline-flex items-center gap-1.5">
            Created by{" "}
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
