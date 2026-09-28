import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { BRAND_ASSETS } from "@/lib/brand-assets";

/** Chapter 02 — the warm, believable surface of the realm, before anyone questions it. */
export function EnterStickerwood() {
  return (
    <section id="enter-stickerwood" aria-labelledby="enter-title" className="chapter flex min-h-[88svh] items-end">
      <div className="chapter-art">
        <Image
          src={BRAND_ASSETS.locations.stickerwoodHeartwood}
          alt="The Heartwood of Stickerwood: a treehouse village, lantern-lit walkways and waterfalls in warm afternoon light"
          fill
          sizes="100vw"
          className="object-cover object-[center_60%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(22,14,6,.82)_0%,rgba(22,14,6,.5)_36%,rgba(22,14,6,0)_64%)]" />
      </div>
      <div className="fade-edges" />

      <div className="mx-auto w-full max-w-7xl px-5 pb-24 pt-40 sm:px-8 lg:pb-32">
        <p className="section-kicker">02 · Enter Stickerwood</p>
        <h2 id="enter-title" className="chapter-title mt-4 max-w-3xl">It looks like a storybook.</h2>
        <p className="chapter-lede">
          Stickerwood was built on a promise: whatever the Crown declared, the realm obeyed. Roads stayed where the maps put them.
          Every memory agreed. For a long time, that felt like safety.
        </p>
        <p className="mt-6 text-sm font-medium text-paper-cream/80">Co-op for 1–4 players · Episode 1: Stickerwood · Built for Roblox</p>
        <a href="#world-lies" className="text-link mt-8">
          See why it stopped being true <ArrowDown className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
