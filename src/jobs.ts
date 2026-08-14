import { getProfile, listAllProfiles, saveProfile } from "./db.js";
import { evaluateAutomaticBadges } from "./badges.js";
import { getRobloxProfile } from "./roblox.js";

export function startProfileRefreshJob(intervalMs = 6 * 60 * 60_000): NodeJS.Timeout {
  let running = false;
  const refresh = async () => {
    if (running) return;
    running = true;
    try {
      for (const existing of await listAllProfiles()) {
        try {
          const current = await getRobloxProfile(existing.id);
          await saveProfile(existing.guildId, existing.discordUserId, current, existing.verified);
          const refreshed = await getProfile(existing.guildId, existing.discordUserId);
          if (refreshed) await evaluateAutomaticBadges(refreshed);
        } catch (error) {
          console.error(`Profile refresh failed for Roblox ${existing.id}`, error);
        }
        await new Promise((resolve) => setTimeout(resolve, 250));
      }
    } finally {
      running = false;
    }
  };
  const timer = setInterval(() => void refresh(), intervalMs);
  timer.unref();
  return timer;
}
