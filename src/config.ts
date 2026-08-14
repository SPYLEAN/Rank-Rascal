import "dotenv/config";

function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export const config = {
  discordToken: () => required("DISCORD_TOKEN"),
  discordClientId: () => required("DISCORD_CLIENT_ID"),
  discordGuildId: process.env.DISCORD_GUILD_ID?.trim(),
  databasePath: process.env.DATABASE_PATH?.trim() || "./data/rank-rascal.db",
  publicBaseUrl: (process.env.PUBLIC_BASE_URL?.trim() || "http://localhost:3000").replace(/\/$/, ""),
  port: Number(process.env.PORT || 3000),
  appSecret: () => required("APP_SECRET"),
  robloxClientId: () => required("ROBLOX_OAUTH_CLIENT_ID"),
  robloxClientSecret: () => required("ROBLOX_OAUTH_CLIENT_SECRET"),
  robloxOAuthConfigured: Boolean(
    process.env.ROBLOX_OAUTH_CLIENT_ID?.trim() &&
    process.env.ROBLOX_OAUTH_CLIENT_SECRET?.trim() &&
    process.env.APP_SECRET?.trim(),
  ),
  adminDiscordIds: new Set(
    (process.env.ADMIN_DISCORD_IDS || "").split(",").map((id) => id.trim()).filter(Boolean),
  ),
};
