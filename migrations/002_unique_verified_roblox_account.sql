-- One verified holder per Roblox account per server. Previews (verified = FALSE)
-- are unaffected. Additive: no existing data is changed.
CREATE UNIQUE INDEX IF NOT EXISTS profiles_verified_roblox_uidx
  ON profiles (guild_id, roblox_user_id)
  WHERE verified;
