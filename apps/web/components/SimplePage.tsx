import type { ReactNode } from "react";

/**
 * Quiet layout for support, status, safety and legal pages: the same type, colour and gold
 * accents as the rest of the site, without the cinematic chapters. Content reads as one column.
 */
export function SimplePage({
  kicker,
  title,
  lede,
  meta,
  children,
}: {
  kicker: string;
  title: string;
  lede?: ReactNode;
  meta?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="relative overflow-x-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_20%_0%,rgba(213,168,75,.14),transparent_60%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-3xl px-5 pb-24 pt-16 sm:px-8 lg:pt-24">
        <header className="border-b border-antique-gold/30 pb-10">
          <p className="section-kicker">{kicker}</p>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-[-0.02em] text-cloud-white sm:text-5xl">{title}</h1>
          {lede ? <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cloud-white/85">{lede}</p> : null}
          {meta ? <div className="mt-4 text-sm text-cloud-white/70">{meta}</div> : null}
        </header>
        <div className="doc mt-10">{children}</div>
      </div>
    </div>
  );
}
