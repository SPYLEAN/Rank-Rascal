import { createHash, randomBytes } from "node:crypto";
import { config } from "./config.js";
import { consumeOAuthState, createOAuthState, getProfile, saveProfile } from "./db.js";
import { evaluateAutomaticBadges } from "./badges.js";
import { UserError, logError } from "./errors.js";
import { getRobloxProfile } from "./roblox.js";

const AUTHORIZE_URL = "https://apis.roblox.com/oauth/v1/authorize";
const TOKEN_URL = "https://apis.roblox.com/oauth/v1/token";
const USERINFO_URL = "https://apis.roblox.com/oauth/v1/userinfo";
const REQUEST_TIMEOUT_MS = 8_000;

const ROBLOX_UNAVAILABLE = "Roblox is not answering right now. Run /link-roblox again for a fresh link.";

async function robloxFetch(url: string, init: RequestInit): Promise<Response> {
  try {
    return await fetch(url, init);
  } catch (error) {
    logError("Roblox OAuth request failed", error);
    throw new UserError(ROBLOX_UNAVAILABLE);
  }
}

async function readJson<T>(response: Response): Promise<T> {
  try {
    return await response.json() as T;
  } catch {
    throw new UserError(ROBLOX_UNAVAILABLE);
  }
}

const base64url = (input: Buffer) => input.toString("base64url");
const sha256 = (value: string) => createHash("sha256").update(value).digest();

export async function createRobloxAuthorization(discordUserId: string, guildId: string): Promise<string> {
  if (!config.robloxOAuthConfigured) throw new UserError("Roblox OAuth is not configured yet.");
  const state = base64url(randomBytes(32));
  const verifier = base64url(randomBytes(48));
  await createOAuthState(
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
  awardedBadges: string[];
}> {
  if (!code || !state || state.length > 256) throw new UserError("Invalid OAuth response.");
  const stateHash = sha256(state).toString("hex");
  const pending = await consumeOAuthState(stateHash);
  if (!pending) throw new UserError("This verification link expired or was already used.");

  const tokenResponse = await robloxFetch(TOKEN_URL, {
    method: "POST",
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
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
  if (!tokenResponse.ok) throw new UserError("Roblox rejected the verification request.");
  const token = await readJson<RobloxTokenResponse>(tokenResponse);

  const userResponse = await robloxFetch(USERINFO_URL, {
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    headers: { Authorization: `${token.token_type} ${token.access_token}` },
  });
  if (!userResponse.ok) throw new UserError("Roblox identity lookup failed.");
  const identity = await readJson<RobloxUserInfo>(userResponse);
  const robloxId = Number(identity.sub);
  if (!Number.isSafeInteger(robloxId)) throw new UserError("Roblox returned an invalid user ID.");

  const profile = await getRobloxProfile(robloxId);
  await saveProfile(pending.guildId, pending.discordUserId, profile, true);
  const linked = await getProfile(pending.guildId, pending.discordUserId);
  const awardedBadges = linked
    ? (await evaluateAutomaticBadges(linked)).map((badge) => badge.name)
    : [];
  // Access and ID tokens are deliberately not stored.
  return { displayName: profile.displayName, username: profile.username, awardedBadges };
}
