/**
 * "Coming next" without revealing it: a dark river with violet light under the surface. Pure CSS,
 * no artwork (the next update isn't shown), no date, no promise.
 */
export function UnknownSpecimen({ className = "" }: { className?: string }) {
  return (
    <div className={`unknown-specimen relative overflow-hidden rounded-sm ring-1 ring-[#B99BFF]/30 ${className}`}>
      <div className="unknown-specimen-water absolute inset-0" aria-hidden="true" />
      <div className="relative flex min-h-[13rem] flex-col justify-end p-6 sm:p-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#D7C6FF]">Coming next · Rascal Labs // Unknown specimen</p>
        <p className="mt-3 font-display text-2xl font-extrabold uppercase leading-tight text-paper-cream sm:text-3xl">Something is moving downriver.</p>
        <p className="mt-2 text-sm text-paper-cream/75">No date. No details. Yet.</p>
      </div>
    </div>
  );
}
