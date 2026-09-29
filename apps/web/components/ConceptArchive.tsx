"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { ConceptStatusBadge } from "@/components/ConceptStatusBadge";
import { ConceptViewer } from "@/components/ConceptViewer";
import {
  CONCEPT_CATEGORIES,
  CONCEPT_ENTRIES,
  entriesFor,
  type ConceptCategory,
  type ConceptCategoryId,
  type ConceptEntry,
} from "@/lib/concepts";

type Viewing = { category: ConceptCategoryId; index: number } | null;

const WIDE = 1.3;

function previewStyle(entry: ConceptEntry) {
  const ratio = entry.image.width / entry.image.height;
  // Wide panels keep their own shape; tall and square sheets are cropped to 5:4 around `focus`.
  return ratio > WIDE ? { aspectRatio: `${entry.image.width} / ${entry.image.height}` } : { aspectRatio: "5 / 4" };
}

/**
 * The Rascal Labs archive: twelve categories rendered from lib/concepts.ts. Each category shows
 * one file large (cropped preview) with its details, the rest as a strip; opening the preview shows
 * the complete sheet in ConceptViewer. /labs#file-001 opens straight onto a file.
 */
export function ConceptArchive() {
  const [selected, setSelected] = useState<Partial<Record<ConceptCategoryId, number>>>({});
  const [viewing, setViewing] = useState<Viewing>(null);
  const opener = useRef<HTMLElement | null>(null);

  // Deep links: #file-001 selects that file and scrolls to its category.
  useEffect(() => {
    const sync = () => {
      const match = /^#file-(\d+)$/.exec(window.location.hash);
      if (!match) return;
      const entry = CONCEPT_ENTRIES.find((item) => item.file === match[1]);
      if (!entry) return;
      const category = CONCEPT_CATEGORIES.find((item) => item.id === entry.category);
      if (!category) return;
      const index = entriesFor(category).findIndex((item) => item.id === entry.id);
      setSelected((current) => ({ ...current, [category.id]: Math.max(0, index) }));
      window.setTimeout(() => document.getElementById(category.id)?.scrollIntoView({ block: "start" }), 50);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const open = (category: ConceptCategoryId, index: number, trigger: HTMLElement) => {
    opener.current = trigger;
    setViewing({ category, index });
  };

  const close = useCallback(() => {
    setViewing(null);
    window.setTimeout(() => opener.current?.focus(), 0);
  }, []);

  const viewingCategory = viewing ? CONCEPT_CATEGORIES.find((item) => item.id === viewing.category) : undefined;
  const viewingItems = viewingCategory ? entriesFor(viewingCategory) : [];

  return (
    <>
      <nav aria-label="Archive categories" className="sticky top-16 z-30 sm:top-20 border-y border-antique-gold/20 bg-[#0b0a12]/92 backdrop-blur-sm">
        <ol className="no-scrollbar mx-auto flex max-w-7xl gap-1 overflow-x-auto px-5 py-2 sm:px-8">
          {CONCEPT_CATEGORIES.map((category) => (
            <li key={category.id} className="flex-none">
              <a href={`#${category.id}`} className="flex min-h-10 items-center gap-2 rounded-full px-3 text-sm text-paper-cream/80 transition hover:bg-paper-cream/10 hover:text-paper-cream">
                <span className="font-mono text-[11px] text-antique-gold">{category.number}</span>
                {category.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        {CONCEPT_CATEGORIES.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            index={selected[category.id] ?? 0}
            onSelect={(index) => setSelected((current) => ({ ...current, [category.id]: index }))}
            onOpen={(index, trigger) => open(category.id, index, trigger)}
          />
        ))}
      </div>

      {viewing && viewingItems.length ? (
        <ConceptViewer
          items={viewingItems}
          index={viewing.index}
          onIndex={(index) => {
            setViewing({ ...viewing, index });
            setSelected((current) => ({ ...current, [viewing.category]: index }));
          }}
          onClose={close}
        />
      ) : null}
    </>
  );
}

function CategorySection({
  category,
  index,
  onSelect,
  onOpen,
}: {
  category: ConceptCategory;
  index: number;
  onSelect: (index: number) => void;
  onOpen: (index: number, trigger: HTMLElement) => void;
}) {
  const entries = entriesFor(category);
  const entry = entries[Math.min(index, entries.length - 1)];
  const count = entries.length;

  return (
    <section id={category.id} aria-labelledby={`${category.id}-title`} className="labs-category scroll-mt-36 border-t border-antique-gold/15 py-16 lg:py-24">
      <div className="max-w-3xl">
        <p className="font-mono text-sm tracking-[0.2em] text-antique-gold">{category.number}</p>
        <h2 id={`${category.id}-title`} className="mt-2 font-display text-3xl font-extrabold uppercase tracking-[-0.02em] text-paper-cream sm:text-4xl">
          {category.title}
        </h2>
        <p className="mt-3 text-lg text-paper-cream/85">{category.intro}</p>
        {category.note ? <p className="mt-2 text-sm leading-relaxed text-paper-cream/70">{category.note}</p> : null}
      </div>

      {category.layout === "glimpse" ? (
        <Glimpses category={category} />
      ) : entry ? (
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start">
          <button
            type="button"
            onClick={(event) => onOpen(Math.min(index, count - 1), event.currentTarget)}
            className="group block w-full text-left"
            aria-label={`Open ${entry.title}, full sheet`}
          >
            <figure className="concept-sheet">
              <div className="relative overflow-hidden rounded-[2px] bg-[#1a1622]" style={previewStyle(entry)}>
                {/* eslint-disable-next-line @next/next/no-img-element -- pre-built WebP thumbnails with srcset */}
                <img
                  key={entry.id}
                  src={entry.image.thumb}
                  srcSet={entry.image.thumb !== entry.image.src ? `${entry.image.thumb} 720w, ${entry.image.src} ${entry.image.width}w` : undefined}
                  sizes="(min-width: 1280px) 700px, (min-width: 1024px) 55vw, 100vw"
                  alt={entry.alt}
                  width={entry.image.width}
                  height={entry.image.height}
                  loading="lazy"
                  decoding="async"
                  className="scene-in absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.02] motion-reduce:transform-none"
                  style={{ objectPosition: entry.focus ?? "50% 50%" }}
                />
              </div>
              <figcaption className="mt-2 flex items-center justify-between gap-3 px-1 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-plum/70">
                <span>File {entry.file}</span>
                <span className="inline-flex items-center gap-1.5 text-ink-plum">
                  <Expand className="h-3.5 w-3.5" aria-hidden="true" /> View full sheet
                </span>
              </figcaption>
            </figure>
          </button>

          <div aria-live="polite">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper-cream/65">
              Rascal Labs // File {entry.file} · {entry.label}
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold text-paper-cream sm:text-3xl">{entry.title}</h3>
            <ConceptStatusBadge status={entry.status} className="mt-3" />
            <p className="mt-4 text-base leading-relaxed text-paper-cream/85">{entry.shortDescription}</p>
            {entry.updateSlug ? (
              <Link href={`/updates#${entry.updateSlug}`} className="text-link mt-4">
                Read the update <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ) : null}

            {count > 1 ? (
              <>
                <div className="mt-6 flex items-center gap-3">
                  <button type="button" onClick={() => onSelect((index - 1 + count) % count)} aria-label={`Previous ${category.title} file`} className="flex h-11 w-11 items-center justify-center rounded-full border border-paper-cream/30 text-paper-cream transition hover:border-antique-gold">
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <span className="font-mono text-xs text-paper-cream/70">
                    {Math.min(index, count - 1) + 1} / {count}
                  </span>
                  <button type="button" onClick={() => onSelect((index + 1) % count)} aria-label={`Next ${category.title} file`} className="flex h-11 w-11 items-center justify-center rounded-full border border-paper-cream/30 text-paper-cream transition hover:border-antique-gold">
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
                <ul className="no-scrollbar mt-5 flex gap-3 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-visible" aria-label={`${category.title} files`}>
                  {entries.map((item, i) => (
                    <li key={item.id} className="flex-none">
                      <button
                        type="button"
                        onClick={() => onSelect(i)}
                        aria-pressed={i === index}
                        aria-label={`${item.title}, file ${item.file}`}
                        className={`block w-20 overflow-hidden rounded-sm border-2 transition sm:w-24 ${i === index ? "border-antique-gold" : "border-transparent opacity-75 hover:opacity-100"}`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element -- small thumbnail */}
                        <img src={item.image.thumb} alt="" width={96} height={72} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" style={{ objectPosition: item.focus ?? "50% 50%" }} />
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </div>
      ) : null}

      {category.layout !== "glimpse" && category.tiles?.length ? (
        // The tiles are small crops (about 100 px), so the row is capped to keep them crisp.
        <ul className="mt-10 grid max-w-sm grid-cols-2 gap-5 sm:max-w-xl sm:grid-cols-3 lg:max-w-4xl lg:grid-cols-5">
          {category.tiles.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={(event) => onOpen(0, event.currentTarget)}
                className="group block w-full text-left"
                aria-label={`${item.title}: ${item.text} Open the World Lies studies sheet`}
              >
                <span className="concept-sheet block">
                  {/* eslint-disable-next-line @next/next/no-img-element -- tiny tile crop */}
                  <img src={item.image.src} alt={item.alt} width={item.image.width} height={item.image.height} loading="lazy" className="aspect-square w-full rounded-[2px] object-cover [image-rendering:auto]" />
                </span>
                <span className="mt-3 block font-mono text-[11px] uppercase tracking-[0.16em] text-antique-gold">{item.title}</span>
                <span className="mt-1 block text-sm text-paper-cream/85">{item.text}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

/** Beyond Stickerwood: distant, darkened glimpses. No names, no sheet, no viewer. */
function Glimpses({ category }: { category: ConceptCategory }) {
  return (
    <ul className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
      {(category.tiles ?? []).map((item) => (
        <li key={item.id} className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-black ring-1 ring-paper-cream/15">
            {/* eslint-disable-next-line @next/next/no-img-element -- small glimpse crop, intentionally soft */}
            <img src={item.image.src} alt={item.alt} width={item.image.width} height={item.image.height} loading="lazy" className="h-full w-full scale-110 object-cover opacity-70 blur-[1.5px] saturate-[.75]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(11,10,18,0)_20%,rgba(11,10,18,.85)_85%)]" aria-hidden="true" />
          </div>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-antique-gold">{item.title}</p>
          <p className="font-display text-lg font-bold uppercase tracking-wide text-paper-cream">{item.text}</p>
        </li>
      ))}
    </ul>
  );
}
