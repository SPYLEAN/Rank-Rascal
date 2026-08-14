import { createHash, randomBytes } from "node:crypto";
import { config } from "./config.js";
import { consumeOAuthState, createOAuthState, saveProfile } from "./db.js";
import { getRobloxProfile } from "./roblox.js";

const AUTHORIZE_URL = "https://apis.roblox.com/oauth/v1/authorize";
const TOKEN_URL = "https://apis.roblox.com/oauth/v1/token";
const USERINFO_URL = "https://apis.roblox.com/oauth/v1/userinfo";

const base64url = (input: Buffer) => input.toString("base64url");
const sha256 = (value: string) => createHash("sha256").update(value).digest();

export function createRobloxAuthorization(discordUserId: string, guildId: string): string {
  if (!config.robloxOAuthConfigured) throw new Error("Roblox OAuth is not configured yet.");
  const state = base64url(randomBytes(32));
  const verifier = base64url(randomBytes(48));
  createOAuthState(
    sha256(state).toString("hex"),
    discordUserId,
    guildId,
    verifier,
    new Date(Date.now() + 10 * 60_000).toISOString(),
  );
  const params = new URLSearchParams({
    client_id: config.robloxClientId(),
    redirect_uri: `${config.publicBaseUrl}/oauth/roblox/callback`,
    response_type: "code",
    scope: "openid profile",
    state,
    code_challenge: base64url(sha256(verifier)),
    code_challenge_method: "S256",
  });
  return `${AUTHORIZE_URL}?${params}`;
}

interface RobloxTokenResponse {
  access_token: string;
  token_type: string;
}

interface RobloxUserInfo {
  sub: string;
  preferred_username?: string;
  nickname?: string;
}

export async function completeRobloxAuthorization(code: string, state: string): Promise<{
  displayName: string;
  username: string;
}> {
  if (!code || !state || state.length > 256) throw new Error("Invalid OAuth response.");
  const stateHash = sha256(state).toString("hex");
  const pending = consumeOAuthState(stateHash);
  if (!pending) throw new Error("This verification link expired or was already used.");

  const tokenResponse = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: config.robloxClientId(),
      client_secret: config.robloxClientSecret(),
      grant_type: "authorization_code",
      code,
      code_verifier: pending.codeVerifier,
      redirect_uri: `${config.publicBaseUrl}/oauth/roblox/callback`,
    }),
  });
  if (!tokenResponse.ok) throw new Error("Roblox rejected the verification request.");
  const token = await tokenResponse.json() as RobloxTokenResponse;

  const userResponse = await fetch(USERINFO_URL, {
    headers: { Authorization: `${token.token_type} ${token.access_token}` },
  });
  if (!userResponse.ok) throw new Error("Roblox identity lookup failed.");
  const identity = await userResponse.json() as RobloxUserInfo;
  const robloxId = Number(identity.sub);
  if (!Number.isSafeInteger(robloxId)) throw new Error("Roblox returned an invalid user ID.");

  const profile = await getRobloxProfile(robloxId);
  saveProfile(pending.guildId, pending.discordUserId, profile, true);
  // Access and ID tokens are deliberately not stored.
  return { displayName: profile.displayName, username: profile.username };
}
