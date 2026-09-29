"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BRAND_ASSETS } from "@/lib/brand-assets";
import { razzReact } from "@/lib/razz";

/**
 * Chapter 07 — the page darkens on the way in. Scale, silhouette and silence: no buttons, no
 * interface. The citadel slowly comes into focus once it is actually in view, and Razz gets
 * nervous (once per session).
 */
export function KingWrongwayReveal() {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          razzReact("wrongwaySeen");
          observer.disconnect();
        }
      },
      { threshold: 0.45 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="king-wrongway"
      aria-labelledby="wrongway-title"
      className="chapter flex min-h-[110svh] scroll-mt-20 items-center bg-[linear-gradient(180deg,#121526_0%,#0a0710_30%,#050308_100%)]"
    >
      <div className="chapter-art" style={{ position: "absolute", inset: 0 }}>
        <Image
          src={BRAND_ASSETS.locations.kingWrongwayCitadel}
          alt="King Wrongway's citadel: dark spires beneath a violet storm, reached only by broken bridges"
          fill
          sizes="100vw"
          className={`object-cover transition-[opacity,transform,filter] duration-[2600ms] ease-out ${
            seen ? "scale-100 opacity-100 brightness-[.62]" : "scale-110 opacity-0 brightness-[.2]"
          }`}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,3,8,0)_0%,rgba(5,3,8,.55)_55%,#050308_100%)]" />
        <div className="absolute inset-x-0 top-0 h-1/3 bg-[linear-gradient(180deg,#121526,rgba(18,21,38,0))]" />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-[linear-gradient(0deg,#050308,rgba(5,3,8,0))]" />
      </div>

      {/* Without JavaScript nothing would ever reveal the chapter, so show it outright. */}
      <noscript>
        <style>{`#king-wrongway .opacity-0 { opacity: 1 !important; transform: none !important; }`}</style>
      </noscript>

      <div className="mx-auto w-full max-w-4xl px-5 text-center sm:px-8">
        <p className={`section-kicker transition-opacity duration-1000 ${seen ? "opacity-100" : "opacity-0"}`}>07 · Meet King Wrongway</p>
        <h2
          id="wrongway-title"
          className={`mt-6 font-display text-[clamp(2.75rem,9vw,7.5rem)] font-extrabold uppercase leading-[.9] tracking-[-0.04em] text-cloud-white transition-[opacity,transform] delay-500 duration-[1800ms] ${
            seen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          All roads lead to me.
        </h2>
        <p className={`hero-shadow mx-auto mt-8 max-w-xl text-lg leading-relaxed text-cloud-white/90 transition-opacity delay-1000 duration-[1800ms] ${seen ? "opacity-100" : "opacity-0"}`}>
          He isn&apos;t a tyrant who loves power. He&apos;s a ruler trapped inside his last command: one perfect road, and no other futures.
        </p>
        <p className={`hero-shadow mx-auto mt-5 max-w-lg text-base leading-relaxed text-paper-cream/85 transition-opacity delay-1000 duration-[1800ms] ${seen ? "opacity-100" : "opacity-0"}`}>
          Fake bridges. Lying signs. False clones. Telegraphs that point the wrong way. And always enough evidence to find the truth.
        </p>
        <p className={`mt-10 text-xs text-cloud-white/70 transition-opacity delay-1000 duration-[1800ms] ${seen ? "opacity-100" : "opacity-0"}`}>
          Concept · Chapter 1 boss. No final model or encounter exists yet.
        </p>
      </div>
    </section>
  );
}
