import Image from "next/image";
import { BRAND_ASSETS } from "@/lib/brand-assets";

/**
 * Chapter 08 — distant, incomplete glimpses. The art is deliberately torn, blurred and dim:
 * future realms are planned, unnamed and undated, and the page says so.
 */
export function FutureRealmsTeaser() {
  return (
    <section id="beyond" aria-labelledby="beyond-title" className="relative bg-[linear-gradient(180deg,#050308_0%,#050308_55%,#121526_100%)] py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative h-56 overflow-hidden sm:h-72 [clip-path:polygon(0_12%,6%_4%,14%_10%,23%_2%,34%_9%,46%_3%,57%_11%,68%_4%,79%_10%,90%_2%,100%_8%,100%_90%,92%_97%,81%_91%,70%_99%,58%_92%,47%_98%,35%_91%,24%_97%,12%_90%,0_96%)]" aria-hidden="true">
          <Image
            src={BRAND_ASSETS.locations.skyBridges}
            alt=""
            fill
            sizes="100vw"
            className="scale-110 object-cover object-[center_35%] opacity-60 blur-[6px] saturate-[.7]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#050308_0%,rgba(5,3,8,0)_25%,rgba(5,3,8,0)_75%,#050308_100%)]" />
        </div>

        <div className="mx-auto mt-14 max-w-2xl text-center">
          <p className="section-kicker">08 · What lies beyond · Planned</p>
          <h2 id="beyond-title" className="chapter-title mt-4">Stickerwood is only the first realm.</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-cloud-white/70">
            Past the Citadel, the map runs out on purpose. More realms are planned. We won&apos;t name them or put dates on them until they&apos;re real.
          </p>
        </div>
      </div>
    </section>
  );
}
