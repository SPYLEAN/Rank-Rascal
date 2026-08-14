import { resolve } from "node:path";
import {
  awardBadge,
  countDistinctQuestPeriods,
  countQuestCompletions,
  getProfile,
  recordQuestCompletion,
} from "./db.js";
import type { BadgeDefinition, BadgeId, LinkedProfile, QuestId } from "./types.js";

export const BADGES: readonly BadgeDefinition[] = [
  {
    id: "quest_crusader",
    name: "Quest Crusader",
    description: "Completed 10 verified Rank Rascal quests.",
    criterion: "Complete 10 verified daily quests.",
    assetFile: "quest-crusader-256.png",
    color: 0xb7ff36,
  },
  {
    id: "drip_monarch",
    name: "Drip Monarch",
    description: "Showed consistent, opt-in avatar-style participation.",
    criterion: "Complete a self Drip Check on five distinct days.",
    assetFile: "drip-monarch-256.png",
    color: 0xff4fa3,
  },
  {
    id: "veteran_noob",
    name: "Veteran Noob",
    description: "Veteran account. Beginner energy forever.",
    criterion: "Verify a Roblox account at least 1,095 days old.",
    assetFile: "veteran-noob-256.png",
    color: 0x7a4dff,
  },
] as const;

export const QUESTS: ReadonlyArray<{
  id: QuestId;
  name: string;
  description: string;
}> = [
  { id: "rotfile_checkin", name: "Lore Check-in", description: "Open your own verified Rotfile." },
  { id: "self_dripcheck", name: "Drip Department", description: "Run a Drip Check on yourself." },
  { id: "friendly_rivalry", name: "Friendly Rivalry", description: "Run a Fraud Check with another linked player." },
];

const DAY_MS = 86_400_000;

export function getBadgeDefinition(id: BadgeId): BadgeDefinition {
  const badge = BADGES.find((candidate) => candidate.id === id);
  if (!badge) throw new Error(`Unknown badge: ${id}`);
  return badge;
}

export function badgeAssetPath(badge: BadgeDefinition): string {
  return resolve("brand", "badges", "discord", badge.assetFile);
}

export function utcPeriodKey(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

export function accountAgeDays(created: string, now = new Date()): number {
  const createdAt = Date.parse(created);
  if (!Number.isFinite(createdAt)) return 0;
  return Math.max(0, Math.floor((now.getTime() - createdAt) / DAY_MS));
}

export async function evaluateAutomaticBadges(
  profile: LinkedProfile,
  now = new Date(),
): Promise<BadgeDefinition[]> {
  if (!profile.verified) return [];
  const newlyAwarded: BadgeDefinition[] = [];

  const maybeAward = async (id: BadgeId, reason: string) => {
    if (await awardBadge(profile.guildId, profile.discordUserId, id, reason, now.toISOString())) {
      newlyAwarded.push(getBadgeDefinition(id));
    }
  };

  if (accountAgeDays(profile.created, now) >= 1_095) {
    await maybeAward("veteran_noob", "Verified Roblox account is at least 1,095 days old.");
  }
  if (await countDistinctQuestPeriods(profile.guildId, profile.discordUserId, "self_dripcheck") >= 5) {
    await maybeAward("drip_monarch", "Completed self Drip Checks on five distinct UTC days.");
  }
  if (await countQuestCompletions(profile.guildId, profile.discordUserId) >= 10) {
    await maybeAward("quest_crusader", "Completed 10 verified daily Rank Rascal quests.");
  }

  return newlyAwarded;
}

export interface QuestProgressResult {
  recorded: boolean;
  totalCompletions: number;
  newlyAwarded: BadgeDefinition[];
}

export async function recordVerifiedQuest(
  guildId: string,
  discordUserId: string,
  questId: QuestId,
  now = new Date(),
): Promise<QuestProgressResult> {
  const profile = await getProfile(guildId, discordUserId);
  if (!profile?.verified) {
    return { recorded: false, totalCompletions: 0, newlyAwarded: [] };
  }
  const recorded = await recordQuestCompletion(
    guildId,
    discordUserId,
    questId,
    utcPeriodKey(now),
    now.toISOString(),
  );
  const totalCompletions = await countQuestCompletions(guildId, discordUserId);
  const newlyAwarded = await evaluateAutomaticBadges(profile, now);
  return { recorded, totalCompletions, newlyAwarded };
}
