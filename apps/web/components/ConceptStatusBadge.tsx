import { CONCEPT_STATUS, type ConceptStatus } from "@/lib/concepts";

const TONE: Record<ConceptStatus, string> = {
  "release-1": "border-antique-gold bg-antique-gold text-ink-plum",
  "in-development": "border-antique-gold text-antique-gold",
  "system-design": "border-paper-cream/60 text-paper-cream",
  "concept-art": "border-paper-cream/60 text-paper-cream",
  "creature-study": "border-paper-cream/60 text-paper-cream",
  "relic-study": "border-paper-cream/60 text-paper-cream",
  companion: "border-paper-cream/60 text-paper-cream",
  "chapter-1": "border-[#B99BFF] text-[#D7C6FF]",
  "future-update": "border-[#B99BFF] text-[#D7C6FF]",
  "future-system": "border-[#B99BFF] text-[#D7C6FF]",
  classified: "border-dashed border-paper-cream/50 text-paper-cream/80",
};

/** A small, text-first status label. Colour only reinforces the words; it never carries meaning alone. */
export function ConceptStatusBadge({ status, className = "" }: { status: ConceptStatus; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] ${TONE[status]} ${className}`}>
      {CONCEPT_STATUS[status]}
    </span>
  );
}
