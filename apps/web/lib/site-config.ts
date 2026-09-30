/**
 * Official Rascal Realms profiles. Every social link on the site reads from this file, so the
 * homepage, community area and footer can never disagree.
 *
 * A profile is shown only when its exact official URL is set here (never a guessed handle);
 * set one to null and the site simply leaves it out. URLs supplied by the owner on 2026-10-01.
 */
export type SocialId = "discord" | "instagram" | "youtube";

export type SocialLink = {
  id: SocialId;
  label: string;
  href: string;
};

/** The existing official Discord invite (NEXT_PUBLIC_COMMUNITY_URL can override it per deploy). */
export const DISCORD_URL = process.env.NEXT_PUBLIC_COMMUNITY_URL || "https://discord.gg/gkneGrpzAn";

export const OFFICIAL_PROFILES: Record<SocialId, { label: string; href: string | null; hosts: readonly string[] }> = {
  discord: { label: "Discord", href: DISCORD_URL, hosts: ["discord.gg", "discord.com"] },
  instagram: { label: "Instagram", href: "https://www.instagram.com/rascalrealms/", hosts: ["instagram.com", "www.instagram.com"] },
  youtube: { label: "YouTube", href: "https://www.youtube.com/@SPYLEAN", hosts: ["youtube.com", "www.youtube.com", "youtu.be"] },
};

const ORDER: readonly SocialId[] = ["discord", "instagram", "youtube"];

/** True only for a real https profile on the platform's own domain (never a placeholder). */
export function isOfficialProfileUrl(id: SocialId, href: string | null): href is string {
  if (!href) return false;
  try {
    const url = new URL(href);
    return url.protocol === "https:" && OFFICIAL_PROFILES[id].hosts.includes(url.hostname) && url.pathname.length > 1;
  } catch {
    return false;
  }
}

/** The social group, in display order, with any profile that has no official URL left out. */
export const SOCIAL_LINKS: readonly SocialLink[] = ORDER.flatMap((id) => {
  const { label, href } = OFFICIAL_PROFILES[id];
  return isOfficialProfileUrl(id, href) ? [{ id, label, href }] : [];
});
