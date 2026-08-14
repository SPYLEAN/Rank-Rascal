CREATE TABLE IF NOT EXISTS profiles (
  guild_id TEXT NOT NULL,
  discord_user_id TEXT NOT NULL,
  roblox_user_id TEXT NOT NULL,
  username TEXT NOT NULL,
  display_name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  created TEXT NOT NULL,
  is_banned BOOLEAN NOT NULL DEFAULT FALSE,
  avatar_url TEXT,
  badge_count INTEGER NOT NULL DEFAULT 0 CHECK (badge_count >= 0),
  linked_at TEXT NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  public_profile BOOLEAN NOT NULL DEFAULT TRUE,
  rascal_rep INTEGER NOT NULL DEFAULT 0 CHECK (rascal_rep >= 0),
  PRIMARY KEY (guild_id, discord_user_id)
);

CREATE TABLE IF NOT EXISTS oauth_states (
  state_hash TEXT PRIMARY KEY,
  discord_user_id TEXT NOT NULL,
  guild_id TEXT NOT NULL,
  code_verifier TEXT NOT NULL,
  expires_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS oauth_states_expires_at_idx
  ON oauth_states (expires_at);

CREATE TABLE IF NOT EXISTS guild_settings (
  guild_id TEXT PRIMARY KEY,
  announcements_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  humor_level INTEGER NOT NULL DEFAULT 2 CHECK (humor_level BETWEEN 1 AND 3),
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
