export interface RobloxProfile {
  id: number;
  username: string;
  displayName: string;
  description: string;
  created: string;
  isBanned: boolean;
  avatarUrl: string | null;
  badgeCount: number;
}

export interface LinkedProfile extends RobloxProfile {
  discordUserId: string;
  guildId: string;
  linkedAt: string;
  verified: boolean;
  publicProfile: boolean;
  rascalRep: number;
}

export type BadgeId = "quest_crusader" | "drip_monarch" | "veteran_noob";

export type QuestId = "rotfile_checkin" | "self_dripcheck" | "friendly_rivalry";

export interface BadgeDefinition {
  id: BadgeId;
  name: string;
  description: string;
  criterion: string;
  assetFile: string;
  color: number;
}

export interface EarnedBadge {
  guildId: string;
  discordUserId: string;
  badgeId: BadgeId;
  awardedAt: string;
  reason: string;
}
