export interface RobloxProfile {
  id: number;
  username: string;
  displayName: string;
  description: string;
  created: string;
  isBanned: boolean;
  avatarUrl: string | null;
  badgeCount: number;
}

export interface LinkedProfile extends RobloxProfile {
  discordUserId: string;
  guildId: string;
  linkedAt: string;
  verified: boolean;
  publicProfile: boolean;
  rascalRep: number;
}
