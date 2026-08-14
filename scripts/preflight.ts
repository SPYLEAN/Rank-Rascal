import "dotenv/config";
import { existsSync, accessSync, constants } from "node:fs";
import { dirname, resolve } from "node:path";

const required = ["DISCORD_TOKEN", "DISCORD_CLIENT_ID", "PUBLIC_BASE_URL", "ROBLOX_OAUTH_CLIENT_ID", "ROBLOX_OAUTH_CLIENT_SECRET", "APP_SECRET"] as const;
let failed = false;
for (const name of required) {
  if (!process.env[name]?.trim()) { console.error(`✗ ${name} is missing`); failed = true; }
  else console.log(`✓ ${name} is set`);
}
const baseUrl = process.env.PUBLIC_BASE_URL;
if (baseUrl && !/^https:\/\//.test(baseUrl) && !/^http:\/\/localhost(?::\d+)?$/.test(baseUrl)) {
  console.error("✗ PUBLIC_BASE_URL must use HTTPS outside localhost"); failed = true;
}
if ((process.env.APP_SECRET?.length || 0) < 32) { console.error("✗ APP_SECRET must be at least 32 characters"); failed = true; }
const databaseDirectory = dirname(resolve(process.env.DATABASE_PATH || "./data/rank-rascal.db"));
if (existsSync(databaseDirectory)) {
  try { accessSync(databaseDirectory, constants.W_OK); console.log("✓ Database directory is writable"); }
  catch { console.error("✗ Database directory is not writable"); failed = true; }
}
if (failed) process.exit(1);
console.log("\nRank Rascal is ready to cause responsible chaos.");
