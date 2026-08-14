import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { config } from "./config.js";
import type { BadgeId, EarnedBadge, LinkedProfile, QuestId, RobloxProfile } from "./types.js";

const path = resolve(config.databasePath);
mkdirSync(dirname(path), { recursive: true });
const db = new DatabaseSync(path);

db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;
  CREATE TABLE IF NOT EXISTS profiles (
    guild_id TEXT NOT NULL,
    discord_user_id TEXT NOT NULL,
    roblox_user_id INTEGER NOT NULL,
    username TEXT NOT NULL,
    display_name TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    created TEXT NOT NULL,
    is_banned INTEGER NOT NULL DEFAULT 0,
    avatar_url TEXT,
    badge_count INTEGER NOT NULL DEFAULT 0,
    linked_at TEXT NOT NULL,
    verified INTEGER NOT NULL DEFAULT 0,
    public_profile INTEGER NOT NULL DEFAULT 1,
    rascal_rep INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (guild_id, discord_user_id)
  );
  CREATE TABLE IF NOT EXISTS oauth_states (
    state_hash TEXT PRIMARY KEY,
    discord_user_id TEXT NOT NULL,
    guild_id TEXT NOT NULL,
    code_verifier TEXT NOT NULL,
    expires_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS guild_settings (
    guild_id TEXT PRIMARY KEY,
    announcements_enabled INTEGER NOT NULL DEFAULT 1,
    humor_level INTEGER NOT NULL DEFAULT 2,
    updated_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS user_badges (
    guild_id TEXT NOT NULL,
    discord_user_id TEXT NOT NULL,
    badge_id TEXT NOT NULL,
    awarded_at TEXT NOT NULL,
    reason TEXT NOT NULL,
    PRIMARY KEY (guild_id, discord_user_id, badge_id),
    FOREIGN KEY (guild_id, discord_user_id)
      REFERENCES profiles (guild_id, discord_user_id) ON DELETE CASCADE
  );
  CREATE TABLE IF NOT EXISTS quest_completions (
    guild_id TEXT NOT NULL,
    discord_user_id TEXT NOT NULL,
    quest_id TEXT NOT NULL,
    period_key TEXT NOT NULL,
    completed_at TEXT NOT NULL,
    PRIMARY KEY (guild_id, discord_user_id, quest_id, period_key),
    FOREIGN KEY (guild_id, discord_user_id)
      REFERENCES profiles (guild_id, discord_user_id) ON DELETE CASCADE
  );
  CREATE INDEX IF NOT EXISTS quest_completions_user_idx
    ON quest_completions (guild_id, discord_user_id, completed_at);
`);

function rowToProfile(row: Record<string, unknown>): LinkedProfile {
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

export function saveProfile(
  guildId: string,
  discordUserId: string,
  profile: RobloxProfile,
  verified = false,
): void {
  const existing = db.prepare(`
    SELECT roblox_user_id FROM profiles
    WHERE guild_id = ? AND discord_user_id = ?
  `).get(guildId, discordUserId) as Record<string, unknown> | undefined;
  if (existing && Number(existing.roblox_user_id) !== profile.id) {
    // Rewards belong to the verified identity that earned them, not merely the Discord account.
    db.prepare("DELETE FROM user_badges WHERE guild_id = ? AND discord_user_id = ?")
      .run(guildId, discordUserId);
    db.prepare("DELETE FROM quest_completions WHERE guild_id = ? AND discord_user_id = ?")
      .run(guildId, discordUserId);
  }
  db.prepare(`
    INSERT INTO profiles (
      guild_id, discord_user_id, roblox_user_id, username, display_name,
      description, created, is_banned, avatar_url, badge_count, linked_at, verified
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(guild_id, discord_user_id) DO UPDATE SET
      roblox_user_id = excluded.roblox_user_id,
      username = excluded.username,
      display_name = excluded.display_name,
      description = excluded.description,
      created = excluded.created,
      is_banned = excluded.is_banned,
      avatar_url = excluded.avatar_url,
      badge_count = excluded.badge_count,
      linked_at = excluded.linked_at,
      verified = excluded.verified
  `).run(
    guildId,
    discordUserId,
    profile.id,
    profile.username,
    profile.displayName,
    profile.description,
    profile.created,
    Number(profile.isBanned),
    profile.avatarUrl,
    profile.badgeCount,
    new Date().toISOString(),
    Number(verified),
  );
}

export interface OAuthState {
  discordUserId: string;
  guildId: string;
  codeVerifier: string;
}

export function createOAuthState(
  stateHash: string,
  discordUserId: string,
  guildId: string,
  codeVerifier: string,
  expiresAt: string,
): void {
  db.prepare("DELETE FROM oauth_states WHERE expires_at < ?").run(new Date().toISOString());
  db.prepare(`
    INSERT INTO oauth_states (state_hash, discord_user_id, guild_id, code_verifier, expires_at)
    VALUES (?, ?, ?, ?, ?)
  `).run(stateHash, discordUserId, guildId, codeVerifier, expiresAt);
}

export function consumeOAuthState(stateHash: string): OAuthState | null {
  const row = db.prepare(`
    DELETE FROM oauth_states WHERE state_hash = ? AND expires_at >= ?
    RETURNING discord_user_id, guild_id, code_verifier
  `).get(stateHash, new Date().toISOString()) as Record<string, unknown> | undefined;
  if (!row) return null;
  return {
    discordUserId: String(row.discord_user_id),
    guildId: String(row.guild_id),
    codeVerifier: String(row.code_verifier),
  };
}

export function listAllProfiles(): LinkedProfile[] {
  return (db.prepare("SELECT * FROM profiles").all() as Record<string, unknown>[]).map(rowToProfile);
}

export interface GuildSettings {
  announcementsEnabled: boolean;
  humorLevel: number;
}

export function getGuildSettings(guildId: string): GuildSettings {
  const row = db.prepare("SELECT * FROM guild_settings WHERE guild_id = ?").get(guildId) as
    | Record<string, unknown>
    | undefined;
  return row
    ? { announcementsEnabled: Boolean(row.announcements_enabled), humorLevel: Number(row.humor_level) }
    : { announcementsEnabled: true, humorLevel: 2 };
}

export function saveGuildSettings(guildId: string, settings: GuildSettings): void {
  db.prepare(`
    INSERT INTO guild_settings (guild_id, announcements_enabled, humor_level, updated_at)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(guild_id) DO UPDATE SET
      announcements_enabled = excluded.announcements_enabled,
      humor_level = excluded.humor_level,
      updated_at = excluded.updated_at
  `).run(guildId, Number(settings.announcementsEnabled), settings.humorLevel, new Date().toISOString());
}

export function getProfile(guildId: string, discordUserId: string): LinkedProfile | null {
  const row = db.prepare("SELECT * FROM profiles WHERE guild_id = ? AND discord_user_id = ?")
    .get(guildId, discordUserId) as Record<string, unknown> | undefined;
  return row ? rowToProfile(row) : null;
}

export function listPublicProfiles(guildId: string): LinkedProfile[] {
  const rows = db.prepare(`
    SELECT * FROM profiles WHERE guild_id = ? AND public_profile = 1
    ORDER BY rascal_rep DESC, badge_count DESC LIMIT 10
  `).all(guildId) as Record<string, unknown>[];
  return rows.map(rowToProfile);
}

export function setPrivacy(guildId: string, discordUserId: string, isPublic: boolean): boolean {
  const result = db.prepare(
    "UPDATE profiles SET public_profile = ? WHERE guild_id = ? AND discord_user_id = ?",
  ).run(Number(isPublic), guildId, discordUserId);
  return result.changes > 0;
}

export function unlinkProfile(guildId: string, discordUserId: string): boolean {
  return db.prepare("DELETE FROM profiles WHERE guild_id = ? AND discord_user_id = ?")
    .run(guildId, discordUserId).changes > 0;
}

function rowToEarnedBadge(row: Record<string, unknown>): EarnedBadge {
  return {
    guildId: String(row.guild_id),
    discordUserId: String(row.discord_user_id),
    badgeId: String(row.badge_id) as BadgeId,
    awardedAt: String(row.awarded_at),
    reason: String(row.reason),
  };
}

export function awardBadge(
  guildId: string,
  discordUserId: string,
  badgeId: BadgeId,
  reason: string,
  awardedAt = new Date().toISOString(),
): boolean {
  const result = db.prepare(`
    INSERT OR IGNORE INTO user_badges (
      guild_id, discord_user_id, badge_id, awarded_at, reason
    ) VALUES (?, ?, ?, ?, ?)
  `).run(guildId, discordUserId, badgeId, awardedAt, reason);
  return result.changes > 0;
}

export function listEarnedBadges(guildId: string, discordUserId: string): EarnedBadge[] {
  const rows = db.prepare(`
    SELECT * FROM user_badges
    WHERE guild_id = ? AND discord_user_id = ?
    ORDER BY awarded_at ASC
  `).all(guildId, discordUserId) as Record<string, unknown>[];
  return rows.map(rowToEarnedBadge);
}

export function recordQuestCompletion(
  guildId: string,
  discordUserId: string,
  questId: QuestId,
  periodKey: string,
  completedAt = new Date().toISOString(),
): boolean {
  const result = db.prepare(`
    INSERT OR IGNORE INTO quest_completions (
      guild_id, discord_user_id, quest_id, period_key, completed_at
    ) VALUES (?, ?, ?, ?, ?)
  `).run(guildId, discordUserId, questId, periodKey, completedAt);
  return result.changes > 0;
}

export function countQuestCompletions(guildId: string, discordUserId: string): number {
  const row = db.prepare(`
    SELECT COUNT(*) AS count FROM quest_completions
    WHERE guild_id = ? AND discord_user_id = ?
  `).get(guildId, discordUserId) as Record<string, unknown>;
  return Number(row.count);
}

export function countDistinctQuestPeriods(
  guildId: string,
  discordUserId: string,
  questId: QuestId,
): number {
  const row = db.prepare(`
    SELECT COUNT(DISTINCT period_key) AS count FROM quest_completions
    WHERE guild_id = ? AND discord_user_id = ? AND quest_id = ?
  `).get(guildId, discordUserId, questId) as Record<string, unknown>;
  return Number(row.count);
}

export function listQuestCompletionsForPeriod(
  guildId: string,
  discordUserId: string,
  periodKey: string,
): QuestId[] {
  const rows = db.prepare(`
    SELECT quest_id FROM quest_completions
    WHERE guild_id = ? AND discord_user_id = ? AND period_key = ?
  `).all(guildId, discordUserId, periodKey) as Record<string, unknown>[];
  return rows.map((row) => String(row.quest_id) as QuestId);
}
