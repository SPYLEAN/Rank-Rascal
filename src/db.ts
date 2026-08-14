import { config } from "./config.js";
import { PostgresStore } from "./database/postgres.js";
import { SqliteStore } from "./database/sqlite.js";
import type { DatabaseStore, GuildSettings, OAuthState } from "./database/store.js";
import type { BadgeId, QuestId, RobloxProfile } from "./types.js";

let storePromise: Promise<DatabaseStore> | undefined;

async function createStore(): Promise<DatabaseStore> {
  if (config.databaseUrl) {
    const database = new PostgresStore(config.databaseUrl, config.databaseSsl);
    await database.migrate();
    return database;
  }
  return new SqliteStore(config.databasePath);
}

async function store(): Promise<DatabaseStore> {
  storePromise ??= createStore();
  return storePromise;
}

export async function initializeDatabase(): Promise<DatabaseStore["engine"]> {
  return (await store()).engine;
}

export async function databaseHealth(): Promise<{ ok: boolean; engine: DatabaseStore["engine"] }> {
  const database = await store();
  return { ok: await database.health(), engine: database.engine };
}

export async function closeDatabase(): Promise<void> {
  if (!storePromise) return;
  const database = await storePromise;
  storePromise = undefined;
  await database.close();
}

export async function saveProfile(guildId: string, discordUserId: string, profile: RobloxProfile, verified = false) {
  return (await store()).saveProfile(guildId, discordUserId, profile, verified);
}

export async function createOAuthState(stateHash: string, discordUserId: string, guildId: string, codeVerifier: string, expiresAt: string) {
  return (await store()).createOAuthState(stateHash, discordUserId, guildId, codeVerifier, expiresAt);
}

export async function consumeOAuthState(stateHash: string): Promise<OAuthState | null> {
  return (await store()).consumeOAuthState(stateHash);
}

export async function listAllProfiles() {
  return (await store()).listAllProfiles();
}

export async function getGuildSettings(guildId: string): Promise<GuildSettings> {
  return (await store()).getGuildSettings(guildId);
}

export async function saveGuildSettings(guildId: string, settings: GuildSettings) {
  return (await store()).saveGuildSettings(guildId, settings);
}

export async function getProfile(guildId: string, discordUserId: string) {
  return (await store()).getProfile(guildId, discordUserId);
}

export async function listPublicProfiles(guildId: string) {
  return (await store()).listPublicProfiles(guildId);
}

export async function setPrivacy(guildId: string, discordUserId: string, isPublic: boolean) {
  return (await store()).setPrivacy(guildId, discordUserId, isPublic);
}

export async function unlinkProfile(guildId: string, discordUserId: string) {
  return (await store()).unlinkProfile(guildId, discordUserId);
}

export async function awardBadge(guildId: string, discordUserId: string, badgeId: BadgeId, reason: string, awardedAt = new Date().toISOString()) {
  return (await store()).awardBadge(guildId, discordUserId, badgeId, reason, awardedAt);
}

export async function listEarnedBadges(guildId: string, discordUserId: string) {
  return (await store()).listEarnedBadges(guildId, discordUserId);
}

export async function recordQuestCompletion(guildId: string, discordUserId: string, questId: QuestId, periodKey: string, completedAt = new Date().toISOString()) {
  return (await store()).recordQuestCompletion(guildId, discordUserId, questId, periodKey, completedAt);
}

export async function countQuestCompletions(guildId: string, discordUserId: string) {
  return (await store()).countQuestCompletions(guildId, discordUserId);
}

export async function countDistinctQuestPeriods(guildId: string, discordUserId: string, questId: QuestId) {
  return (await store()).countDistinctQuestPeriods(guildId, discordUserId, questId);
}

export async function listQuestCompletionsForPeriod(guildId: string, discordUserId: string, periodKey: string) {
  return (await store()).listQuestCompletionsForPeriod(guildId, discordUserId, periodKey);
}

export type { GuildSettings, OAuthState } from "./database/store.js";
