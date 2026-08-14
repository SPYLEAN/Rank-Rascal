import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { Pool, type PoolClient } from "pg";
import { config } from "../config.js";
import type { BadgeId, EarnedBadge, LinkedProfile, QuestId, RobloxProfile } from "../types.js";
import {
  type DatabaseStore,
  type GuildSettings,
  type OAuthState,
  rowToEarnedBadge,
  rowToProfile,
} from "./store.js";

const MIGRATION_LOCK_ID = 1_490_335_501;

export class PostgresStore implements DatabaseStore {
  readonly engine = "postgres" as const;
  private readonly pool: Pool;

  constructor(databaseUrl: string, ssl: boolean) {
    this.pool = new Pool({
      connectionString: databaseUrl,
      ssl: ssl ? { rejectUnauthorized: true } : false,
      max: config.databasePoolMax,
      connectionTimeoutMillis: 10_000,
      idleTimeoutMillis: 30_000,
    });
    this.pool.on("error", (error) => console.error("PostgreSQL pool error", error));
  }

  async migrate(): Promise<void> {
    const client = await this.pool.connect();
    try {
      await client.query("SELECT pg_advisory_lock($1)", [MIGRATION_LOCK_ID]);
      await client.query(`
        CREATE TABLE IF NOT EXISTS schema_migrations (
          name TEXT PRIMARY KEY,
          checksum TEXT NOT NULL,
          applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `);
      const directory = resolve("migrations");
      const filenames = (await readdir(directory)).filter((name) => name.endsWith(".sql")).sort();
      for (const name of filenames) {
        const sql = await readFile(resolve(directory, name), "utf8");
        const checksum = createHash("sha256").update(sql).digest("hex");
        const existing = await client.query<{ checksum: string }>(
          "SELECT checksum FROM schema_migrations WHERE name = $1",
          [name],
        );
        if (existing.rowCount) {
          if (existing.rows[0]?.checksum !== checksum) {
            throw new Error(`Migration ${name} changed after it was applied.`);
          }
          continue;
        }
        await client.query("BEGIN");
        try {
          await client.query(sql);
          await client.query(
            "INSERT INTO schema_migrations (name, checksum) VALUES ($1, $2)",
            [name, checksum],
          );
          await client.query("COMMIT");
        } catch (error) {
          await client.query("ROLLBACK");
          throw error;
        }
      }
    } finally {
      await client.query("SELECT pg_advisory_unlock($1)", [MIGRATION_LOCK_ID]).catch(() => undefined);
      client.release();
    }
  }

  private async transaction<T>(run: (client: PoolClient) => Promise<T>): Promise<T> {
    const client = await this.pool.connect();
    try {
      await client.query("BEGIN");
      const result = await run(client);
      await client.query("COMMIT");
      return result;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  async saveProfile(guildId: string, discordUserId: string, profile: RobloxProfile, verified = false): Promise<void> {
    await this.transaction(async (client) => {
      const existing = await client.query<{ roblox_user_id: string }>(`
        SELECT roblox_user_id FROM profiles
        WHERE guild_id = $1 AND discord_user_id = $2 FOR UPDATE
      `, [guildId, discordUserId]);
      if (existing.rows[0] && Number(existing.rows[0].roblox_user_id) !== profile.id) {
        await client.query("DELETE FROM user_badges WHERE guild_id = $1 AND discord_user_id = $2", [guildId, discordUserId]);
        await client.query("DELETE FROM quest_completions WHERE guild_id = $1 AND discord_user_id = $2", [guildId, discordUserId]);
      }
      await client.query(`
        INSERT INTO profiles (
          guild_id, discord_user_id, roblox_user_id, username, display_name,
          description, created, is_banned, avatar_url, badge_count, linked_at, verified
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        ON CONFLICT(guild_id, discord_user_id) DO UPDATE SET
          roblox_user_id = EXCLUDED.roblox_user_id,
          username = EXCLUDED.username,
          display_name = EXCLUDED.display_name,
          description = EXCLUDED.description,
          created = EXCLUDED.created,
          is_banned = EXCLUDED.is_banned,
          avatar_url = EXCLUDED.avatar_url,
          badge_count = EXCLUDED.badge_count,
          linked_at = EXCLUDED.linked_at,
          verified = EXCLUDED.verified
      `, [
        guildId, discordUserId, String(profile.id), profile.username, profile.displayName,
        profile.description, profile.created, profile.isBanned, profile.avatarUrl,
        profile.badgeCount, new Date().toISOString(), verified,
      ]);
    });
  }

  async createOAuthState(stateHash: string, discordUserId: string, guildId: string, codeVerifier: string, expiresAt: string): Promise<void> {
    await this.transaction(async (client) => {
      await client.query("DELETE FROM oauth_states WHERE expires_at < $1", [new Date().toISOString()]);
      await client.query(`
        INSERT INTO oauth_states (state_hash, discord_user_id, guild_id, code_verifier, expires_at)
        VALUES ($1, $2, $3, $4, $5)
      `, [stateHash, discordUserId, guildId, codeVerifier, expiresAt]);
    });
  }

  async consumeOAuthState(stateHash: string): Promise<OAuthState | null> {
    const result = await this.pool.query(`
      DELETE FROM oauth_states WHERE state_hash = $1 AND expires_at >= $2
      RETURNING discord_user_id, guild_id, code_verifier
    `, [stateHash, new Date().toISOString()]);
    const row = result.rows[0] as Record<string, unknown> | undefined;
    return row ? {
      discordUserId: String(row.discord_user_id),
      guildId: String(row.guild_id),
      codeVerifier: String(row.code_verifier),
    } : null;
  }

  async listAllProfiles(): Promise<LinkedProfile[]> {
    const result = await this.pool.query("SELECT * FROM profiles");
    return (result.rows as Record<string, unknown>[]).map(rowToProfile);
  }

  async getGuildSettings(guildId: string): Promise<GuildSettings> {
    const result = await this.pool.query("SELECT * FROM guild_settings WHERE guild_id = $1", [guildId]);
    const row = result.rows[0] as Record<string, unknown> | undefined;
    return row
      ? { announcementsEnabled: Boolean(row.announcements_enabled), humorLevel: Number(row.humor_level) }
      : { announcementsEnabled: true, humorLevel: 2 };
  }

  async saveGuildSettings(guildId: string, settings: GuildSettings): Promise<void> {
    await this.pool.query(`
      INSERT INTO guild_settings (guild_id, announcements_enabled, humor_level, updated_at)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT(guild_id) DO UPDATE SET
        announcements_enabled = EXCLUDED.announcements_enabled,
        humor_level = EXCLUDED.humor_level,
        updated_at = EXCLUDED.updated_at
    `, [guildId, settings.announcementsEnabled, settings.humorLevel, new Date().toISOString()]);
  }

  async getProfile(guildId: string, discordUserId: string): Promise<LinkedProfile | null> {
    const result = await this.pool.query("SELECT * FROM profiles WHERE guild_id = $1 AND discord_user_id = $2", [guildId, discordUserId]);
    const row = result.rows[0] as Record<string, unknown> | undefined;
    return row ? rowToProfile(row) : null;
  }

  async listPublicProfiles(guildId: string): Promise<LinkedProfile[]> {
    const result = await this.pool.query(`
      SELECT * FROM profiles WHERE guild_id = $1 AND public_profile = TRUE
      ORDER BY rascal_rep DESC, badge_count DESC LIMIT 10
    `, [guildId]);
    return (result.rows as Record<string, unknown>[]).map(rowToProfile);
  }

  async setPrivacy(guildId: string, discordUserId: string, isPublic: boolean): Promise<boolean> {
    const result = await this.pool.query(
      "UPDATE profiles SET public_profile = $1 WHERE guild_id = $2 AND discord_user_id = $3",
      [isPublic, guildId, discordUserId],
    );
    return (result.rowCount ?? 0) > 0;
  }

  async unlinkProfile(guildId: string, discordUserId: string): Promise<boolean> {
    const result = await this.pool.query("DELETE FROM profiles WHERE guild_id = $1 AND discord_user_id = $2", [guildId, discordUserId]);
    return (result.rowCount ?? 0) > 0;
  }

  async awardBadge(guildId: string, discordUserId: string, badgeId: BadgeId, reason: string, awardedAt: string): Promise<boolean> {
    const result = await this.pool.query(`
      INSERT INTO user_badges (guild_id, discord_user_id, badge_id, awarded_at, reason)
      VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING
    `, [guildId, discordUserId, badgeId, awardedAt, reason]);
    return (result.rowCount ?? 0) > 0;
  }

  async listEarnedBadges(guildId: string, discordUserId: string): Promise<EarnedBadge[]> {
    const result = await this.pool.query(`
      SELECT * FROM user_badges WHERE guild_id = $1 AND discord_user_id = $2 ORDER BY awarded_at ASC
    `, [guildId, discordUserId]);
    return (result.rows as Record<string, unknown>[]).map(rowToEarnedBadge);
  }

  async recordQuestCompletion(guildId: string, discordUserId: string, questId: QuestId, periodKey: string, completedAt: string): Promise<boolean> {
    const result = await this.pool.query(`
      INSERT INTO quest_completions (guild_id, discord_user_id, quest_id, period_key, completed_at)
      VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING
    `, [guildId, discordUserId, questId, periodKey, completedAt]);
    return (result.rowCount ?? 0) > 0;
  }

  async countQuestCompletions(guildId: string, discordUserId: string): Promise<number> {
    const result = await this.pool.query<{ count: string }>(`
      SELECT COUNT(*) AS count FROM quest_completions WHERE guild_id = $1 AND discord_user_id = $2
    `, [guildId, discordUserId]);
    return Number(result.rows[0]?.count ?? 0);
  }

  async countDistinctQuestPeriods(guildId: string, discordUserId: string, questId: QuestId): Promise<number> {
    const result = await this.pool.query<{ count: string }>(`
      SELECT COUNT(DISTINCT period_key) AS count FROM quest_completions
      WHERE guild_id = $1 AND discord_user_id = $2 AND quest_id = $3
    `, [guildId, discordUserId, questId]);
    return Number(result.rows[0]?.count ?? 0);
  }

  async listQuestCompletionsForPeriod(guildId: string, discordUserId: string, periodKey: string): Promise<QuestId[]> {
    const result = await this.pool.query<{ quest_id: string }>(`
      SELECT quest_id FROM quest_completions WHERE guild_id = $1 AND discord_user_id = $2 AND period_key = $3
    `, [guildId, discordUserId, periodKey]);
    return result.rows.map((row) => row.quest_id as QuestId);
  }

  async health(): Promise<boolean> {
    try {
      await this.pool.query("SELECT 1");
      return true;
    } catch {
      return false;
    }
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}
