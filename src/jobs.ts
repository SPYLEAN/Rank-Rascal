import { getProfile, listAllProfiles, saveProfile } from "./db.js";
import { evaluateAutomaticBadges } from "./badges.js";
import { getRobloxProfile } from "./roblox.js";

export function startProfileRefreshJob(intervalMs = 6 * 60 * 60_000): NodeJS.Timeout {
  const refresh = async () => {
    for (const existing of listAllProfiles()) {
      try {
        const current = await getRobloxProfile(existing.id);
        saveProfile(existing.guildId, existing.discordUserId, current, existing.verified);
        const refreshed = getProfile(existing.guildId, existing.discordUserId);
        if (refreshed) evaluateAutomaticBadges(refreshed);
      } catch (error) {
        console.error(`Profile refresh failed for Roblox ${existing.id}`, error);
      }
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  };
  const timer = setInterval(() => void refresh(), intervalMs);
  timer.unref();
  return timer;
}
