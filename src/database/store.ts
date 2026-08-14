import type { BadgeId, EarnedBadge, LinkedProfile, QuestId, RobloxProfile } from "../types.js";

export interface OAuthState {
  discordUserId: string;
  guildId: string;
  codeVerifier: string;
}

export interface GuildSettings {
  announcementsEnabled: boolean;
  humorLevel: number;
}

export interface DatabaseStore {
  readonly engine: "sqlite" | "postgres";
  saveProfile(guildId: string, discordUserId: string, profile: RobloxProfile, verified?: boolean): Promise<void>;
  createOAuthState(stateHash: string, discordUserId: string, guildId: string, codeVerifier: string, expiresAt: string): Promise<void>;
  consumeOAuthState(stateHash: string): Promise<OAuthState | null>;
  listAllProfiles(): Promise<LinkedProfile[]>;
  getGuildSettings(guildId: string): Promise<GuildSettings>;
  saveGuildSettings(guildId: string, settings: GuildSettings): Promise<void>;
  getProfile(guildId: string, discordUserId: string): Promise<LinkedProfile | null>;
  listPublicProfiles(guildId: string): Promise<LinkedProfile[]>;
  setPrivacy(guildId: string, discordUserId: string, isPublic: boolean): Promise<boolean>;
  unlinkProfile(guildId: string, discordUserId: string): Promise<boolean>;
  awardBadge(guildId: string, discordUserId: string, badgeId: BadgeId, reason: string, awardedAt: string): Promise<boolean>;
  listEarnedBadges(guildId: string, discordUserId: string): Promise<EarnedBadge[]>;
  recordQuestCompletion(guildId: string, discordUserId: string, questId: QuestId, periodKey: string, completedAt: string): Promise<boolean>;
  countQuestCompletions(guildId: string, discordUserId: string): Promise<number>;
  countDistinctQuestPeriods(guildId: string, discordUserId: string, questId: QuestId): Promise<number>;
  listQuestCompletionsForPeriod(guildId: string, discordUserId: string, periodKey: string): Promise<QuestId[]>;
  health(): Promise<boolean>;
  close(): Promise<void>;
}

export function rowToProfile(row: Record<string, unknown>): LinkedProfile {
  return {
    guildId: String(row.guild_id),
    discordUserId: String(row.discord_user_id),
    id: Number(row.roblox_user_id),
    username: String(row.username),
    displayName: String(row.display_name),
    description: String(row.description),
    created: String(row.created),
    isBanned: Boolean(row.is_banned),
    avatarUrl: row.avatar_url ? String(row.avatar_url) : null,
    badgeCount: Number(row.badge_count),
    linkedAt: String(row.linked_at),
    verified: Boolean(row.verified),
    publicProfile: Boolean(row.public_profile),
    rascalRep: Number(row.rascal_rep),
  };
}

export function rowToEarnedBadge(row: Record<string, unknown>): EarnedBadge {
  return {
    guildId: String(row.guild_id),
    discordUserId: String(row.discord_user_id),
    badgeId: String(row.badge_id) as BadgeId,
    awardedAt: String(row.awarded_at),
    reason: String(row.reason),
  };
}
