import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { BRAND_ASSETS } from "@/lib/brand-assets";

/**
 * Chapter 10 — the journey ends in warm light, not another corrupted scene. The project is
 * real, ambitious and built openly; joining is free and promises nothing it can't keep.
 */
export function JoinRascalLabs() {
  const discordUrl = process.env.NEXT_PUBLIC_COMMUNITY_URL || "https://discord.gg/gkneGrpzAn";

  return (
    <section id="join-rascal-labs" aria-labelledby="join-title" className="chapter flex min-h-[90svh] scroll-mt-20 items-end">
      <div className="chapter-art" style={{ position: "absolute", inset: 0 }}>
        <Image
          src={BRAND_ASSETS.game.foundersGuildWorkshop}
          alt="Razz and the builders of Rascal Labs at work in a sunlit Stickerwood workshop"
          fill
          sizes="100vw"
          className="parallax-art object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(26,16,6,.88)_0%,rgba(26,16,6,.55)_38%,rgba(26,16,6,0)_68%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(0deg,rgba(12,14,26,.85),rgba(12,14,26,0))]" />
        <div className="absolute inset-x-0 top-0 h-1/4 bg-[linear-gradient(180deg,#121526,rgba(18,21,38,0))]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 pb-24 pt-40 sm:px-8 lg:pb-32">
        <p className="section-kicker">10 · Join Rascal Labs</p>
        <h2 id="join-title" className="chapter-title mt-4 max-w-3xl">Build the realm with us.</h2>
        <p className="chapter-lede hero-shadow">
          Rascal Labs is the community making Crownfall in the open. Bring your theories, your honest reviews or your craft.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href={discordUrl} target="_blank" rel="noopener noreferrer" className="action-primary">
            Join the Discord <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <Link href="/community#review" className="action-secondary">
            Review the game <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/community#guild" className="action-secondary">
            Apply to the Founders Guild <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <p className="hero-shadow mt-8 max-w-xl text-sm leading-relaxed text-paper-cream/95">
          A person reads every review and application. Joining is free, isn&apos;t a job offer and doesn&apos;t guarantee playtest access.
          The official Roblox group opens with the first private prototype.
        </p>
      </div>
    </section>
  );
}
