/**
 * Rank Rascal Canonical Badge Data Source
 * Contains the EXACT three finished production illustrated reward badges.
 * Do not duplicate definitions across components. All status fields must be 'preview'.
 */

export interface CanonicalBadge {
  id: "quest-crusader" | "drip-monarch" | "veteran-noob";
  name: string;
  description: string;
  criterion: string;
  status: "preview";
  reason: string;
  category: string;
  image: string;
  discordImage: string;
  alt: string;
}

export const CANONICAL_THREE_BADGES: CanonicalBadge[] = [
  {
    id: "quest-crusader",
    name: "Quest Crusader",
    description: "Completed 10 verified Rank Rascal quests.",
    criterion: "10 verified quest completions.",
    status: "preview",
    reason: "Built into the bot and being tested privately; awarded to public servers at launch.",
    category: "Server Quests",
    image: "/brand/badges/quest-crusader.png",
    discordImage: "/brand/badges/discord/quest-crusader-256.png",
    alt: "Purple quest shield with a map, compass star and crooked lime crown.",
  },
  {
    id: "drip-monarch",
    name: "Drip Monarch",
    description: "Showed consistent, opt-in avatar-style participation.",
    criterion: "Complete a self Drip Check on five distinct days with a verified Roblox identity.",
    status: "preview",
    reason: "Built into the bot and being tested privately; awarded to public servers at launch.",
    category: "Participation",
    image: "/brand/badges/drip-monarch.png",
    discordImage: "/brand/badges/discord/drip-monarch-256.png",
    alt: "Crowned purple gem droplet in a royal shield with pink sparkles.",
  },
  {
    id: "veteran-noob",
    name: "Veteran Noob",
    description: "Veteran account. Beginner energy forever.",
    criterion: "Verify a Roblox account at least 1,095 days old.",
    status: "preview",
    reason: "Built into the bot and being tested privately; awarded to public servers at launch.",
    category: "Roblox Milestones",
    image: "/brand/badges/veteran-noob.png",
    discordImage: "/brand/badges/discord/veteran-noob-256.png",
    alt: "Weathered purple shield with a sprouting block, gold laurels and pink bandage.",
  },
];
