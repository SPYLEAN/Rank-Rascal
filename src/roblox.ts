import type { RobloxProfile } from "./types.js";

const headers = { "User-Agent": "RankRascal/0.1 (Discord bot prototype)" };

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, { ...init, headers: { ...headers, ...init?.headers } });
  if (!response.ok) throw new Error(`Roblox API returned ${response.status}`);
  return response.json() as Promise<T>;
}

export async function resolveUsername(username: string): Promise<number | null> {
  const result = await request<{ data: Array<{ id: number }> }>(
    "https://users.roblox.com/v1/usernames/users",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usernames: [username], excludeBannedUsers: false }),
    },
  );
  return result.data[0]?.id ?? null;
}

async function getBadgeCount(userId: number): Promise<number> {
  let count = 0;
  let cursor: string | null = null;
  // Cap traversal to keep a Discord interaction responsive and API-friendly.
  for (let page = 0; page < 10; page += 1) {
    const query = new URLSearchParams({ limit: "100", sortOrder: "Desc" });
    if (cursor) query.set("cursor", cursor);
    const result: { data: unknown[]; nextPageCursor: string | null } = await request(
      `https://badges.roblox.com/v1/users/${userId}/badges?${query}`,
    );
    count += result.data.length;
    cursor = result.nextPageCursor;
    if (!cursor) break;
  }
  return count;
}

export async function getRobloxProfile(userId: number): Promise<RobloxProfile> {
  const [user, avatar, badgeCount] = await Promise.all([
    request<{
      id: number;
      name: string;
      displayName: string;
      description: string;
      created: string;
      isBanned: boolean;
    }>(`https://users.roblox.com/v1/users/${userId}`),
    request<{ data: Array<{ imageUrl: string; state: string }> }>(
      `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=420x420&format=Png&isCircular=false`,
    ),
    getBadgeCount(userId).catch(() => 0),
  ]);

  return {
    id: user.id,
    username: user.name,
    displayName: user.displayName,
    description: user.description,
    created: user.created,
    isBanned: user.isBanned,
    avatarUrl: avatar.data[0]?.state === "Completed" ? avatar.data[0].imageUrl : null,
    badgeCount,
  };
}

export async function findRobloxProfile(username: string): Promise<RobloxProfile | null> {
  const id = await resolveUsername(username);
  return id ? getRobloxProfile(id) : null;
}
