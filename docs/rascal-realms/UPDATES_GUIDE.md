# Updates & Announcements: how to post

`/updates` is the site's news desk (FIRST_RELEASE.md §36). The homepage's "Latest from the realm" section shows the newest three posts. Content lives in code, reviewed like any other change. There is no CMS or database.

## Add a post

Edit `apps/web/lib/updates.ts` and add an entry to `UPDATE_POSTS`:

```ts
{
  slug: "trickster-arrives",            // unique, becomes /updates#trickster-arrives
  kind: "character",                    // featured | chapter | patch-notes | character | pet | mount | realm | event | devlog | maintenance | community
  title: "Trickster arrives",
  summary: "One or two sentences shown in lists.",
  body: ["Paragraph one.", "Paragraph two."],   // may be empty
  publishAt: "2026-11-01T17:00:00Z",   // ISO time WITH an offset; Z = UTC
  release: "v1.2",                      // optional
  trailer: { id: "tricksterTrailer" },  // or { comingSoon: "The trailer lands with the countdown." }
  link: { label: "Meet Trickster", href: "/#heroes" },  // optional
  featured: true,                       // optional: pin as the big story at the top of /updates
}
```

## Scheduling

- A post is hidden until `publishAt`, then appears by itself. `/updates` reads the clock on every request. The homepage refreshes at most every 5 minutes (`revalidate = 300` in `app/page.tsx`).
- So: merge and deploy the post early with a future `publishAt`, and it goes live on time with no second deploy.
- Before it publishes, `/updates` shows only "One announcement is scheduled." The title and contents stay private until the time passes. The source code in a public repository is still readable, so keep real secrets out of scheduled posts.
- Times are shown to visitors as dates in UTC.

## Give an update its own trailer

1. Encode the video the same way as the Crownfall teaser (see `scripts/encode-teaser.sh` and `TEASER_EXPORT_SPEC.md`): a WebM (VP9/Opus) and an MP4 (H.264/AAC), plus a WebP poster, into `apps/web/public/media/`. Never ship an untouched master.
2. Register the files in `BRAND_ASSETS.media` (`apps/web/lib/brand-assets.ts`). `npm run check` verifies every registered path exists.
3. Add a `TRAILERS` entry in `apps/web/lib/trailers.ts` with a title, `kind` ("teaser" or "trailer"), the sources, the poster, written scene notes (the accessible description; required) and a one-line honesty note ("Pre-production cinematic art. Not in-game footage." when that is true).
4. Point the post at it: `trailer: { id: "yourTrailerId" }`. It opens in the same accessible theater player as the homepage teaser.

## Point a post at a Rascal Labs file

Set `labsFile: "<concept entry id>"` on the post, with `kind: "labs"` for a pure archive teaser. Also set `updateSlug: "<post slug>"` on the entry in `apps/web/lib/concepts.ts`. The post shows the file's preview and a "View field study" link to `/labs#file-NNN`, and the archive links back. See `RASCAL_LABS.md`.

The "Coming next" card (`components/UnknownSpecimen.tsx`) teases the next update without art, names or dates. Edit its copy when the tease changes.

## Rules

- Never post a date, feature, trailer or build that doesn't exist.
- Future updates stay in `UPDATE_ROADMAP` (undated) until they are really announced.
- Label cinematic or concept footage honestly.
- The release marketing loop is: tease → reveal → countdown → trailer → launch → patch notes → community event → next mystery.
