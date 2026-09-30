import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BRAND_ASSETS } from "@/lib/brand-assets";

/**
 * Chapter 08 — the Chapter 1 epilogue as a web moment: the clouds part and something vast is
 * visible but unreachable. Future realms stay unnamed and undated; the update roadmap carries
 * what is actually planned.
 */
export function FutureRealmsTeaser() {
  return (
    <section id="beyond" aria-labelledby="beyond-title" className="chapter flex min-h-[80svh] items-end bg-[#050308]">
      <div className="chapter-art">
        <Image
          src={BRAND_ASSETS.locations.skyBridges}
          alt=""
          fill
          sizes="100vw"
          className="beyond-clouds object-cover object-[center_30%]"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(5,3,8,.1)_0%,rgba(5,3,8,.55)_55%,rgba(5,3,8,.92)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-1/3 bg-[linear-gradient(180deg,#050308,rgba(5,3,8,0))]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(0deg,#121526,rgba(18,21,38,0))]" />
      </div>

      <div className="mx-auto w-full max-w-3xl px-5 pb-20 pt-40 text-center sm:px-8">
        <p className="section-kicker">08 · What lies beyond · Planned</p>
        <h2 id="beyond-title" className="chapter-title hero-shadow mt-4">Stickerwood is only the first realm.</h2>
        <p className="hero-shadow mx-auto mt-6 max-w-xl text-lg leading-relaxed text-cloud-white/90">
          Chapter 1 ends at a high viewpoint. The clouds part, and other realms and huge Crown fractures come into view: visible, unreachable, unnamed.
        </p>
        <p className="hero-shadow mx-auto mt-4 max-w-xl text-base leading-relaxed text-paper-cream/85">
          New heroes, pets, fishing and events arrive as updates, each with its own reveal. We won&apos;t name future realms or date them until they&apos;re real.
        </p>
        <Link href="/updates#roadmap" className="text-link mt-8">
          See the update roadmap <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
