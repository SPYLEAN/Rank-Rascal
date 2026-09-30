import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clapperboard, Play } from "lucide-react";
import { ConceptStatusBadge } from "@/components/ConceptStatusBadge";
import { TeaserPlayer } from "@/components/TeaserPlayer";
import { UnknownSpecimen } from "@/components/UnknownSpecimen";
import { BRAND_ASSETS } from "@/lib/brand-assets";
import { conceptById, conceptHref } from "@/lib/concepts";
import { TRAILERS } from "@/lib/trailers";
import {
  UPDATE_KINDS,
  UPDATE_ROADMAP,
  formatUpdateDate,
  publishedUpdates,
  scheduledCount,
  type UpdateKind,
  type UpdatePost,
} from "@/lib/updates";
import { DISCORD_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Updates & Announcements",
  description: "Chapter announcements, reveals, patch notes, events and devlogs for Rascal Realms: Crownfall, posted here first.",
};

// Scheduled posts appear the moment their publish time passes, so read the clock per request.
export const dynamic = "force-dynamic";

function TrailerSlot({ post, large = false }: { post: UpdatePost; large?: boolean }) {
  if (!post.trailer) return null;
  if ("comingSoon" in post.trailer) {
    return (
      <div className={`paper-frame relative flex aspect-video flex-col items-center justify-center gap-3 overflow-hidden bg-[#0b0912] px-6 text-center ${large ? "" : "max-w-md"}`}>
        <Image src={BRAND_ASSETS.media.teaserPoster} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover opacity-25 blur-[2px]" aria-hidden="true" />
        <Clapperboard className="relative h-7 w-7 text-antique-gold" aria-hidden="true" />
        <p className="relative font-display text-lg font-bold text-cloud-white">Trailer coming</p>
        <p className="relative max-w-xs text-sm text-cloud-white/80">{post.trailer.comingSoon}</p>
      </div>
    );
  }
  const trailer = TRAILERS[post.trailer.id];
  return (
    <TeaserPlayer trailer={trailer} className={`paper-frame group relative block aspect-video w-full overflow-hidden text-left ${large ? "" : "max-w-md"}`}>
      <Image src={trailer.poster} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" aria-hidden="true" />
      <span className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,3,8,.75),rgba(5,3,8,0)_55%)]" aria-hidden="true" />
      <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-antique-gold px-4 py-2 text-sm font-bold text-ink-plum">
        <Play className="h-4 w-4" aria-hidden="true" /> Watch the {trailer.kind}
      </span>
      <span className="sr-only">: {post.title}</span>
    </TeaserPlayer>
  );
}

/** A post about a Rascal Labs file: the file's preview, its status and a way into the archive. */
function LabsFileSlot({ post }: { post: UpdatePost }) {
  const entry = post.labsFile ? conceptById(post.labsFile) : undefined;
  if (!entry) return null;
  return (
    <Link href={conceptHref(entry)} className="group block max-w-md">
      <figure className="concept-sheet">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-[#1a1622]">
          {/* eslint-disable-next-line @next/next/no-img-element -- pre-built 720 px WebP preview */}
          <img
            src={entry.image.thumb}
            alt={entry.alt}
            width={720}
            height={Math.round((720 * entry.image.height) / entry.image.width)}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: entry.focus ?? "50% 50%" }}
          />
        </div>
        <figcaption className="px-1 pt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-plum/75">
          Rascal Labs // File {entry.file}
        </figcaption>
      </figure>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <ConceptStatusBadge status={entry.status} />
        <span className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-[0.12em] text-antique-gold">
          View field study <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export default function UpdatesPage({ searchParams }: { searchParams?: { type?: string } }) {
  const now = new Date();
  const posts = publishedUpdates(now);
  const queued = scheduledCount(now);
  const featured = posts.find((post) => post.featured) ?? posts[0];
  const kindsPresent = Array.from(new Set(posts.map((post) => post.kind)));
  const filter = searchParams?.type && searchParams.type in UPDATE_KINDS ? (searchParams.type as UpdateKind) : null;
  const list = posts.filter((post) => (filter ? post.kind === filter : post.slug !== featured?.slug));

  return (
    <div className="overflow-x-hidden">
      <header className="chapter flex min-h-[56svh] items-end">
        <div className="chapter-art">
          <Image
            src={BRAND_ASSETS.locations.rascalPlazaRealm}
            alt="Concept art of Rascal Plaza, where Stickerwood's news and rumors gather"
            fill
            priority
            sizes="100vw"
            className="parallax-art object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,10,20,.94)_0%,rgba(12,10,20,.7)_50%,rgba(12,10,20,.25)_100%)]" />
        </div>
        <div className="fade-edges" />
        <div className="mx-auto w-full max-w-7xl px-5 pb-14 pt-36 sm:px-8">
          <p className="section-kicker">Latest from the realm</p>
          <h1 className="chapter-title mt-4 max-w-3xl">Updates &amp; announcements</h1>
          <p className="chapter-lede max-w-2xl">
            Chapter announcements, reveals, patch notes, events and devlogs. Posted here first; every major update gets its own trailer.
          </p>
          {queued > 0 ? (
            <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-paper-cream">
              <span className="h-2 w-2 rounded-full bg-antique-gold" aria-hidden="true" />
              {queued === 1 ? "One announcement is scheduled." : `${queued} announcements are scheduled.`} It will appear here automatically.
            </p>
          ) : null}
        </div>
      </header>

      {featured && !filter ? (
        <section aria-labelledby="featured-title" className="mx-auto max-w-7xl px-5 pb-8 pt-10 sm:px-8">
          <article id={featured.slug} className="grid scroll-mt-24 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
            <div>
              <p className="text-sm text-cloud-white/75">
                <span className="font-semibold text-antique-gold">{UPDATE_KINDS[featured.kind]}</span>
                {featured.release ? ` · ${featured.release}` : ""} · <time dateTime={featured.publishAt}>{formatUpdateDate(featured.publishAt)}</time>
              </p>
              <h2 id="featured-title" className="mt-3 font-display text-3xl font-extrabold leading-tight text-cloud-white sm:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-paper-cream/90">{featured.summary}</p>
              <div className="mt-5 space-y-3 leading-relaxed text-cloud-white/80">
                {featured.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {featured.link ? (
                <Link href={featured.link.href} className="text-link mt-6">
                  {featured.link.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              ) : null}
            </div>
            <TrailerSlot post={featured} large />
          </article>
        </section>
      ) : null}

      {!filter ? (
        <section aria-label="Coming next" className="mx-auto max-w-7xl px-5 pt-6 sm:px-8">
          <UnknownSpecimen />
        </section>
      ) : null}

      <section aria-labelledby="all-updates" className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-cloud-white/15 pb-5">
          <h2 id="all-updates" className="font-display text-2xl font-bold text-cloud-white">{filter ? UPDATE_KINDS[filter] : "All updates"}</h2>
          <nav aria-label="Filter updates" className="flex flex-wrap gap-2">
            <Link
              href="/updates"
              aria-current={!filter ? "page" : undefined}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold transition ${!filter ? "border-antique-gold bg-antique-gold text-ink-plum" : "border-cloud-white/25 text-cloud-white/85 hover:border-antique-gold"}`}
            >
              All
            </Link>
            {kindsPresent.map((kind) => (
              <Link
                key={kind}
                href={`/updates?type=${kind}`}
                aria-current={filter === kind ? "page" : undefined}
                className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold transition ${filter === kind ? "border-antique-gold bg-antique-gold text-ink-plum" : "border-cloud-white/25 text-cloud-white/85 hover:border-antique-gold"}`}
              >
                {UPDATE_KINDS[kind]}
              </Link>
            ))}
          </nav>
        </div>

        {list.length === 0 ? (
          <p className="py-10 text-cloud-white/75">Nothing here yet. New posts appear as soon as they&apos;re published.</p>
        ) : (
          <ol className="divide-y divide-cloud-white/10">
            {list.map((post) => (
              <li key={post.slug} id={post.slug} className="grid scroll-mt-24 gap-6 py-10 md:grid-cols-[11rem_minmax(0,1fr)] lg:grid-cols-[11rem_minmax(0,1fr)_20rem]">
                <div className="text-sm">
                  <time dateTime={post.publishAt} className="text-cloud-white/75">{formatUpdateDate(post.publishAt)}</time>
                  <p className="mt-1 font-semibold text-antique-gold">{UPDATE_KINDS[post.kind]}</p>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-cloud-white">{post.title}</h3>
                  <p className="mt-2 leading-relaxed text-cloud-white/85">{post.summary}</p>
                  {post.body.length > 0 ? (
                    <div className="mt-3 space-y-3 leading-relaxed text-cloud-white/75">
                      {post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </div>
                  ) : null}
                  {post.link ? (
                    <Link href={post.link.href} className="text-link mt-4">
                      {post.link.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  ) : null}
                </div>
                {post.trailer ? (
                  <div className="md:col-start-2 lg:col-start-3">
                    <TrailerSlot post={post} />
                  </div>
                ) : post.labsFile ? (
                  <div className="md:col-start-2 lg:col-start-3">
                    <LabsFileSlot post={post} />
                  </div>
                ) : null}
              </li>
            ))}
          </ol>
        )}
      </section>

      <section id="roadmap" aria-labelledby="roadmap-title" className="scroll-mt-24 bg-[#0e1020] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="section-kicker">The road ahead</p>
          <h2 id="roadmap-title" className="section-title max-w-3xl">Every update gets its own reveal.</h2>
          <p className="section-lede max-w-2xl">
            Tease, reveal, countdown, trailer, launch, patch notes, community event, next mystery. These are the planned updates after Chapter 1. No dates until they&apos;re real.
          </p>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-sm bg-cloud-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {UPDATE_ROADMAP.map((item) => (
              <li key={item.version} className="bg-[#0e1020] p-6">
                <p className="font-display text-sm font-extrabold tracking-wide text-antique-gold">{item.version}</p>
                <h3 className="mt-2 font-display text-xl font-bold text-cloud-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cloud-white/80">{item.copy}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-paper-cream/75">{item.status} · trailer at reveal</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="action-primary">
              Get announcements on Discord <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link href="/devlog" className="action-secondary">
              Read the development log <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
