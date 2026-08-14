import type { LinkedProfile, RobloxProfile } from "./types.js";

const dripVerdicts = [
  "CERTIFIED MAIN CHARACTER",
  "CATALOGUE FINAL BOSS",
  "LORE-ACCURATE CHAOS",
  "UNREASONABLY DRIPPED",
  "DEFAULT BUT DANGEROUS",
  "THE DRIP DEPARTMENT IS CONFUSED",
] as const;

export function deterministicPick<T>(items: readonly T[], seed: number): T {
  return items[Math.abs(seed) % items.length]!;
}

export function dripVerdict(profile: RobloxProfile): string {
  return deterministicPick(dripVerdicts, profile.id + profile.displayName.length);
}

export function accountAge(created: string): string {
  const years = Math.max(0, Math.floor((Date.now() - new Date(created).getTime()) / 31_556_952_000));
  if (years >= 10) return `${years} years · ANCIENT SPECIMEN`;
  if (years >= 5) return `${years} years · ROBLOX ARCHAEOLOGY`;
  if (years >= 2) return `${years} years · EXPERIENCED RASCAL`;
  return `${years} years · FRESHLY SPAWNED`;
}

export function profileStatus(profile: LinkedProfile): string {
  if (profile.badgeCount >= 800) return "GRASS-TOUCHING POSTPONED";
  if (profile.badgeCount >= 300) return "EXTREMELY BADGED";
  if (profile.badgeCount >= 100) return "MODERATELY COOKED";
  return "THE LORE HAS JUST BEGUN";
}
