export const GAME_PILLARS = [
  {
    eyebrow: "OBSERVE",
    title: "Read the world, not the sign",
    copy: "Paths, shadows, sounds, old maps and character stories can disagree. Every important lie has evidence you can actually find.",
  },
  {
    eyebrow: "ACCUSE",
    title: "Call out the contradiction",
    copy: "Build a case with your squad, choose what the world is lying about and commit to an accusation through the SUS system.",
  },
  {
    eyebrow: "REWRITE",
    title: "Make reality correct itself",
    copy: "Expose a Fraud and the level changes around you: false routes fold away, new paths open and Crown corruption loses its grip.",
  },
] as const;

export const DEVLOG_ENTRIES = [
  {
    slug: "visual-foundation",
    date: "September 27, 2026",
    status: "ART DIRECTION LOCK",
    title: "Stickerwood has a visual language now",
    summary:
      "We locked the connected-world scale, handcrafted materials and the rule that Crown corruption stays rare enough to mean something.",
    details: [
      "Four districts now share one connected geography instead of feeling like separate maps.",
      "Normal Stickerwood stays warm green, wood, cream, gold and sky blue.",
      "Violet, magenta and electric lime are reserved for lies, corruption and Razz.",
    ],
  },
  {
    slug: "razz-canonical",
    date: "September 27, 2026",
    status: "CHARACTER LOCK",
    title: "This is Razz",
    summary:
      "The purple box-shaped troublemaker is our canonical guide. Earlier fox exploration is retired from production.",
    details: [
      "One normal lime eye and one segmented digital eye define his asymmetry.",
      "His confidence masks how much the Crown and its corruption actually scare him.",
      "The final 3D model, rig and animation set remain production work for Roblox and Blender.",
    ],
  },
  {
    slug: "world-lies-ui",
    date: "September 27, 2026",
    status: "SYSTEM DESIGN",
    title: "The World Lies became a real investigation loop",
    summary:
      "The interface now supports evidence, contradictions, accusations and visible world corrections instead of a decorative suspicion meter.",
    details: [
      "The journal separates sources, evidence links and current deductions.",
      "Wrong accusations explain the failed premise without humiliating the player.",
      "Fraud reveals keep the corrected world visible because the level change is the reward.",
    ],
  },
] as const;

export const FOUNDERS_GUILD_TRACKS = [
  {
    value: "playtester",
    label: "QA & Accessibility Scout",
    copy: "Break builds, question clues, test on different devices and document where the adventure stops being readable or fun.",
  },
  {
    value: "systems",
    label: "Roblox Systems Engineer",
    copy: "Luau, server authority, multiplayer systems, data, tools, performance and secure game architecture.",
  },
  {
    value: "environment",
    label: "Environment Artist / Builder",
    copy: "Roblox Studio, modular kits, lighting, terrain, set dressing, optimization and environmental storytelling.",
  },
  {
    value: "character",
    label: "Character Artist / Animator",
    copy: "Roblox-ready modeling, rigging, expressive animation, combat readability and character performance.",
  },
  {
    value: "ui-vfx",
    label: "UI / VFX Designer",
    copy: "Readable HUD systems, motion, particles, Crown corruption, feedback and mobile-first interaction design.",
  },
  {
    value: "audio",
    label: "Composer / Sound Designer",
    copy: "Adaptive music, material-rich Foley, creature voices, spatial clues and a signature audio identity.",
  },
  {
    value: "narrative",
    label: "Narrative / Quest Designer",
    copy: "Layered mysteries, environmental clues, character voice, quest logic and fair deductions players can prove.",
  },
  {
    value: "community",
    label: "Community / Content Lead",
    copy: "Devlogs, playtest operations, creator relations, moderation, community events and player research.",
  },
] as const;

export const REVIEW_FOCUS_AREAS = [
  { value: "world", label: "World & art direction" },
  { value: "gameplay", label: "Gameplay & co-op systems" },
  { value: "story", label: "Story, mystery & characters" },
  { value: "accessibility", label: "Accessibility & clarity" },
  { value: "website", label: "Website & first impression" },
] as const;

export const STORY_FOUNDATION = {
  premise:
    "Stickerwood was built around a promise: if the Crown declared a rule, the realm would obey it. Roads stayed where maps placed them, memories agreed and dangerous uncertainty could be edited away.",
  fracture:
    "King Wrongway used that power to protect his people from a disaster no one fully remembers. Each correction made the kingdom safer—and less true. Now signs redirect travelers, witnesses remember incompatible histories and entire places vanish when nobody is looking at them.",
  razz:
    "Razz survived one of those edits. His segmented eye can see the seams between the world that exists and the version the Crown is trying to impose. He jokes because panic makes people follow simple answers, but he knows every repaired lie may uncover something worse beneath it.",
  playerPromise:
    "Players are not chosen heroes who automatically know the truth. They are a squad of outsiders who must earn certainty together: observe, argue, accuse and live with the version of reality they restore.",
} as const;

export const LORE_ERAS = [
  {
    year: "I",
    title: "The Unwritten Realm",
    copy: "Before the Crown, Stickerwood changed through memory, weather and choice. Paths moved slowly, stories contradicted one another and uncertainty was treated as part of being alive.",
  },
  {
    year: "II",
    title: "The First Agreement",
    copy: "The old rulers forged the Crown as a civic instrument: one shared declaration could stabilize bridges, borders and public records. It was designed to settle facts, never feelings.",
  },
  {
    year: "III",
    title: "Wrongway's Protection",
    copy: "After a catastrophe splintered the roads, King Wrongway expanded the Crown's authority. Contradiction became a threat. Dissenting maps, memories and routes were rewritten for the sake of order.",
  },
  {
    year: "IV",
    title: "Crownfall",
    copy: "The Crown now issues rules without a stable ruler. Its purple corruption is not random damage—it is reality straining to satisfy commands that can no longer all be true at once.",
  },
] as const;

/** The primary loop from the Release 1 specification (docs/rascal-realms/FIRST_RELEASE.md §5). */
export const CORE_LOOP = [
  { number: "01", title: "Explore", copy: "Stickerwood rewards curiosity: caves, ruins, viewpoints, creatures and places you can see long before you can reach them." },
  { number: "02", title: "Notice something wrong", copy: "A sign, a path, a chest or a person makes a claim that doesn't fit what's around it." },
  { number: "03", title: "Investigate", copy: "Footprints, sound, wear, light, animal behaviour and testimony each reveal part of the truth. Every Fraud has readable evidence." },
  { number: "04", title: "Expose the Fraud", copy: "Commit to the accusation. The false object fractures, Crown energy escapes and the real route appears." },
  { number: "05", title: "Fight, solve or traverse", copy: "Combat comes in peaks, not a constant grind. The corrected world opens routes, arenas and secrets." },
  { number: "06", title: "Loot, grow, go deeper", copy: "Earn Gold, Crown Shards and gear, grow your hero, then follow the larger mystery the lie was protecting." },
] as const;

export type LoreStatus = "in-development" | "concept" | "planned";

/** Release 1 (Chapter 1) ships three heroes. The other three are canon heroes arriving in later updates. */
export type HeroRelease = "launch" | "future";

/** Whether an area is part of Release 1.0 or arrives later in Chapter 1. */
export type AreaRelease = "release-1" | "chapter-1";

export const PLAYER_ROLES = [
  {
    name: "Crown Knight",
    combat: "Accessible melee front line: blocking, protection and survivability under pressure.",
    field: "Anchors unstable objects long enough for the squad to inspect or cross them.",
    tension: "Uses royal technology while questioning the authority that created it.",
    weapon: "Relic Sword and Royal Shield",
    powers: ["Guard Break Slam", "Aegis Anchor", "Oath of the Line"],
    mysterySpecialty: "Reading royal seals and authority markings for forgeries.",
    questAffinity: "Main Story, Mystery Cases",
    accent: "#D5A84B",
    role: "Front-line protector",
    scene: "ancientTree",
    status: "planned" as LoreStatus,
    release: "launch" as HeroRelease,
    releaseNote: "Release 1.0 launch hero",
  },
  {
    name: "Glitchcaster",
    combat: "Ranged magic, area effects and Crown-energy spectacle that rewards smart positioning.",
    field: "Reveals hidden rule fragments and temporarily inverts false environmental states.",
    tension: "The most powerful reader of Crown code is also the easiest for the Crown to read back.",
    weapon: "Fracture Staff",
    powers: ["Code Fracture Bolt", "Rule Invert", "Feedback Pulse"],
    mysterySpecialty: "Reading Crown corruption fragments other heroes can't see.",
    questAffinity: "Mystery Cases, Hidden Quests",
    accent: "#6B31A8",
    role: "Corruption caster",
    scene: "glitchGrove",
    status: "planned" as LoreStatus,
    release: "launch" as HeroRelease,
    releaseNote: "Release 1.0 launch hero",
  },
  {
    name: "Shadow Ranger",
    combat: "Precision, mobility, scouting and evasion from changing sightlines.",
    field: "Tracks physical continuity: prints, broken branches, wind and disturbed surfaces.",
    tension: "Trusts material evidence, even when people remember something kinder.",
    weapon: "Whisper Bow",
    powers: ["Marked Shot", "Trapline", "Vanish Step"],
    mysterySpecialty: "Physical continuity: prints, broken fibres, wind, disturbed surfaces.",
    questAffinity: "Exploration, Side Quests",
    accent: "#41633B",
    role: "Tracker and marksman",
    scene: "mysteryForest",
    status: "planned" as LoreStatus,
    release: "launch" as HeroRelease,
    releaseNote: "Release 1.0 launch hero",
  },
  {
    name: "Trickster",
    combat: "Mobility, decoys, interruption and opportunistic close-range damage.",
    field: "Tests rules by deliberately breaking their assumptions and finding edge cases.",
    tension: "Treats every system as a game until a consequence refuses to reset.",
    weapon: "Paired sticker-blades",
    powers: ["Decoy Double", "Rule Break", "Opportunist Strike"],
    mysterySpecialty: "Testing rules by breaking their assumptions.",
    questAffinity: "Hidden Quests",
    accent: "#E632A9",
    role: "Rule-breaking skirmisher",
    scene: "rascalPlazaRealm",
    status: "concept" as LoreStatus,
    release: "future" as HeroRelease,
    releaseNote: "Future hero update",
  },
  {
    name: "Lorekeeper",
    combat: "Light support damage from illuminated glyph bursts; mostly utility and crowd reveal.",
    field: "Restores erased signage and memory fragments so the squad can navigate contradictions.",
    tension: "The more history Lorekeeper restores, the more they risk remembering what King Wrongway needs forgotten.",
    weapon: "The Unabridged Lantern",
    powers: ["Truth Lantern", "Marginalia", "Bound Chronicle"],
    mysterySpecialty: "Erased histories, conflicting written records, contradictory Crown edicts.",
    questAffinity: "Main Story",
    accent: "#F3E5C8",
    role: "Truth-reading scholar",
    scene: "stickerwoodHeartwood",
    status: "concept" as LoreStatus,
    release: "future" as HeroRelease,
    releaseNote: "Future hero update",
  },
  {
    name: "Badge Scout",
    combat: "Light ranged utility damage; mostly traversal and puzzle support.",
    field: "Finds hidden collectibles, shortcuts and side discoveries other heroes miss.",
    tension: "Collects \"badges\"—trophies of solved lies—obsessively, and struggles with which discoveries are worth the risk.",
    weapon: "Multi-badge slingpack",
    powers: ["Grapple Badge", "Signal Flare", "Toolkit Swap"],
    mysterySpecialty: "Hidden discoveries, secret passages, environmental puzzle mechanisms.",
    questAffinity: "Exploration, Hidden Quests",
    accent: "#B9F227",
    role: "Explorer and gadgeteer",
    scene: "hiddenCove",
    status: "concept" as LoreStatus,
    release: "future" as HeroRelease,
    releaseNote: "Future hero update",
  },
] as const;

/**
 * Stickerwood's ten Release 1 areas, in the order the Release 1 specification lists them (§9).
 * `hotspot` is a percentage position on the clean Stickerwood map (BRAND_ASSETS.game.stickerwoodMap); `changes` says how progress here
 * affects the rest of the realm. Everything is pre-production: no area is built yet.
 */
export const WORLD_LOCATIONS = [
  {
    number: "01",
    name: "Starting Village",
    tagline: "The festival of forced cheer",
    chapterRole: "Act I · Onboarding",
    release: "release-1" as AreaRelease,
    description:
      "A peaceful festival town where you choose your hero, meet Razz and learn to move. Every signboard insists the roads are safe. The first lie is almost convincing because everyone wants it to be true.",
    mysteries: ["The crossroads sign that points the wrong way", "Contradictory courier notices on the village board"],
    threats: "Almost none. That is what makes the first lie work.",
    discoveries: ["First quests, basic merchants and the road to Rascal Plaza"],
    questStyles: "Main Story",
    notableCharacters: ["Razz", "Village merchants and quest-givers"],
    changes: "Exposing the first Fraud reveals the real road to Rascal Plaza.",
    status: "planned" as LoreStatus,
    hotspot: { x: 15, y: 29 },
    image: "startingVillage",
  },
  {
    number: "02",
    name: "Rascal Plaza",
    tagline: "Where every rumor ends up",
    chapterRole: "Act I · Social hub",
    release: "release-1" as AreaRelease,
    description:
      "Stickerwood's main gathering place: merchants, quest-givers and players meeting up. A locked guild board and empty banners hint at things the Plaza isn't ready to open yet.",
    mysteries: ["A merchant who insists he's met you before", "A guild board that stays locked no matter who asks"],
    threats: "Rumors that turn out to be true a beat too late.",
    discoveries: ["Merchants, quest-givers and hooks for future pets, guilds and events"],
    questStyles: "Main Story, Side Quests",
    notableCharacters: ["General Merchant", "Weapon Smith", "Quest-givers"],
    changes: "Rumors traded here send the squad into Stickerwood Forest.",
    status: "planned" as LoreStatus,
    hotspot: { x: 21, y: 35 },
    image: "rascalPlazaRealm",
  },
  {
    number: "03",
    name: "Stickerwood Forest",
    tagline: "The trails remember",
    chapterRole: "Acts I–II · Main exploration",
    release: "release-1" as AreaRelease,
    description:
      "The realm's main exploration zone. Trail markers survive beneath newer bark, caves hide secrets, and Crown Sprouts and Lost Stickers make the woods feel less friendly the further you go.",
    mysteries: ["Old trail marks sealed under fresh sap", "What is behind the waterfall?"],
    threats: "Crown Sprouts and Lost Stickers.",
    discoveries: ["Caves, collectibles, creatures and hidden Frauds"],
    questStyles: "Exploration, Mystery Cases",
    notableCharacters: ["Lost Stickers carrying fragments of discarded testimony"],
    changes: "Deeper paths open toward River Path and the Ancient Tree.",
    status: "planned" as LoreStatus,
    hotspot: { x: 12, y: 51 },
    image: "mysteryForest",
  },
  {
    number: "04",
    name: "River Path",
    tagline: "A current the maps deny",
    chapterRole: "Later update · Fishing and river secrets",
    release: "chapter-1" as AreaRelease,
    description:
      "A quieter stretch of water for fishing, side quests and atmosphere. Official maps disagree about where the bridge is, and the current runs fastest on the days the records call calm.",
    mysteries: ["A bridge on no two matching maps", "A catch that glows violet"],
    threats: "Very little, unless you trust the ferry schedule.",
    discoveries: ["Planned fishing spots and a river that hides more than fish"],
    questStyles: "Fishing Quest, Side Quests",
    notableCharacters: ["The Fishing NPC", "A ferryman who keeps two logbooks that disagree"],
    changes: "A strange catch here points upstream, toward the Ancient Tree.",
    status: "planned" as LoreStatus,
    hotspot: { x: 42, y: 50 },
    image: "riverPath",
  },
  {
    number: "05",
    name: "Ancient Tree",
    tagline: "Visible from everywhere",
    chapterRole: "Act III · The Ancient Tree",
    release: "chapter-1" as AreaRelease,
    description:
      "A colossal landmark you can see from almost every area. Paths loop up its roots and canopy, and its oldest rings hold Stickerwood's history with the Crown.",
    mysteries: ["Growth rings out of step with recorded history", "Roots that grow toward the Crown Ruins however they're replanted"],
    threats: "Glitch-root tangles that reroute travellers.",
    discoveries: ["Lore, traversal routes and a deeper history of the Crown"],
    questStyles: "Main Story, Exploration",
    notableCharacters: ["The Rootbound Archivist"],
    changes: "The truth in its roots shows Crownfall isn't random, and turns the investigation toward King Wrongway.",
    status: "planned" as LoreStatus,
    hotspot: { x: 13, y: 76 },
    image: "ancientTree",
  },
  {
    number: "06",
    name: "Glitch Grove",
    tagline: "Where royal commands become terrain",
    chapterRole: "Act IV · Rising instability",
    release: "chapter-1" as AreaRelease,
    description:
      "Stickerwood starts to come apart. Distorted plants, floating fragments and Crown energy make every path an argument, with harder enemies and more advanced Frauds.",
    mysteries: ["Gravity that flips above violet fissures", "Contradictory decrees carved on floating pillars"],
    threats: "Stronger corrupted enemies and contradictory physical rules.",
    discoveries: ["Crown fragments and harder Fraud encounters"],
    questStyles: "Mystery Cases, Main Story",
    notableCharacters: ["Glitch Slimes that repeat and multiply unstable states"],
    changes: "The corruption thickens the closer the squad gets to the Crown Ruins.",
    status: "planned" as LoreStatus,
    hotspot: { x: 29, y: 82 },
    image: "glitchGrove",
  },
  {
    number: "07",
    name: "Crown Ruins",
    tagline: "What the Crown left behind",
    chapterRole: "Act V · Crown Ruins",
    release: "chapter-1" as AreaRelease,
    description:
      "Late-chapter ruins full of relics, tougher enemies and major lore. Corruption is stronger here, and something enormous is growing out of the paperwork.",
    mysteries: ["A royal inscription that contradicts itself", "Relics that are important but unexplained"],
    threats: "The Overgrown Receipt, Chapter 1's mini-boss.",
    discoveries: ["A major relic and story discovery"],
    questStyles: "Main Story",
    notableCharacters: ["The Overgrown Receipt"],
    changes: "Beating the Overgrown Receipt opens the way up to the Sky Bridges.",
    status: "planned" as LoreStatus,
    hotspot: { x: 40, y: 15 },
    image: "crownRuins",
  },
  {
    number: "08",
    name: "Sky Bridges",
    tagline: "Causeways over nothing",
    chapterRole: "Late chapter · Traversal spectacle",
    release: "chapter-1" as AreaRelease,
    description:
      "Floating islands, waterfalls and bridges across huge vistas. Some crossings hold only while a specific rule is believed true.",
    mysteries: ["Bridges that exist only while a rule is believed", "A route that leads somewhere else on the way back"],
    threats: "Gales and fake bridges that fold mid-crossing.",
    discoveries: ["Viewpoints, secrets and a clearer look at Wrongway Territory"],
    questStyles: "Exploration, Hidden Quests",
    notableCharacters: ["A royal cartographer who redraws the bridges nightly"],
    changes: "The last bridge lands in Wrongway Territory.",
    status: "planned" as LoreStatus,
    hotspot: { x: 64, y: 59 },
    image: "skyBridges",
  },
  {
    number: "09",
    name: "Wrongway Territory",
    tagline: "Every sign disagrees",
    chapterRole: "Acts IV–VI · The wrong road",
    release: "chapter-1" as AreaRelease,
    description:
      "Contradictory signs, strange geometry and warped routes. Nothing here is subtle anymore: the land itself is foreshadowing the boss.",
    mysteries: ["Signs that contradict each other in the same breath", "Routes that bend back on themselves"],
    threats: "Warped paths and heavily corrupted enemies.",
    discoveries: ["Clues to how King Wrongway fights"],
    questStyles: "Main Story, Mystery Cases",
    notableCharacters: ["King Wrongway's influence, everywhere"],
    changes: "Every road here bends toward the Citadel.",
    status: "planned" as LoreStatus,
    hotspot: { x: 80, y: 55 },
    image: "wrongwayTerritory",
  },
  {
    number: "10",
    name: "King Wrongway Citadel",
    tagline: "All roads lead to him",
    chapterRole: "Act VI · The final encounter",
    release: "chapter-1" as AreaRelease,
    description:
      "Chapter 1's final environment: dark, corrupted and hostile, but still unmistakably Stickerwood. King Wrongway waits with fake bridges, false clones and misleading telegraphs, and there is always enough evidence to find the truth.",
    mysteries: ["Which telegraph is lying", "Which bridge is real"],
    threats: "King Wrongway, BOSS-001.",
    discoveries: ["The end of Chapter 1, and a view beyond the clouds"],
    questStyles: "Main Story",
    notableCharacters: ["King Wrongway"],
    changes: "When Wrongway falls, Stickerwood stabilizes, and the view beyond the clouds shows the Crownfall has only begun.",
    status: "planned" as LoreStatus,
    hotspot: { x: 90, y: 12 },
    image: "kingWrongwayCitadel",
  },
] as const;

export const QUEST_CATEGORIES = [
  "Main Story",
  "Mystery Cases",
  "Side Quests",
  "Exploration",
  "Pets & Fishing",
  "Hidden Quests",
] as const;

/**
 * Quest journal. Release 1.0 ships exactly one quest, Q01: A Sign of Trouble; every other entry
 * is a concept or a future update and must be labelled that way wherever it appears.
 * `card` names a location card (BRAND_ASSETS.journalCards).
 */
export type QuestStatus = "release-1" | "concept" | "future-update";

export type QuestEntry = {
  category: (typeof QUEST_CATEGORIES)[number];
  code?: string;
  title: string;
  hook: string;
  summary?: string;
  location: string;
  route?: string;
  reward?: string;
  note?: string;
  status: QuestStatus;
  card: "startingVillage" | "rascalPlaza" | "stickerwoodForest" | "ancientTree" | "skyBridges" | "riverPath";
};

export const QUEST_JOURNAL: readonly QuestEntry[] = [
  {
    category: "Main Story",
    code: "Q01",
    title: "A Sign of Trouble",
    hook: "The road to Rascal Plaza should be simple. It isn't.",
    summary: "Follow Razz through Stickerwood, investigate the first impossible sign, gather evidence and expose your first Fraud.",
    location: "Starting Village",
    route: "Starting Village → First Crossroads → Rascal Plaza",
    reward: "First Crown Shard",
    status: "release-1",
    card: "startingVillage",
  },
  {
    category: "Main Story",
    title: "The Ancient Tree",
    hook: "Stickerwood's older connection to the Crown is written in its rings.",
    location: "Ancient Tree",
    status: "future-update",
    card: "ancientTree",
  },
  {
    category: "Mystery Cases",
    title: "The Merchant Who Remembers You Wrong",
    hook: "He swears you've met before.",
    summary: "He's certain you've met. You're certain you haven't.",
    location: "Rascal Plaza",
    note: "Something about his story keeps changing.",
    status: "concept",
    card: "rascalPlaza",
  },
  {
    category: "Mystery Cases",
    title: "The Bridge Two Maps Disagree On",
    hook: "Two official maps. One bridge. Zero agreement.",
    location: "River Path",
    status: "concept",
    card: "riverPath",
  },
  {
    category: "Side Quests",
    title: "The Ferryman's Second Logbook",
    hook: "One logbook says the crossing never happened. The other one is lying.",
    location: "River Path",
    status: "concept",
    card: "riverPath",
  },
  {
    category: "Exploration",
    title: "Behind the Waterfall",
    hook: "Everyone can see it. Nobody admits there's anything behind it.",
    location: "Stickerwood Forest",
    status: "concept",
    card: "stickerwoodForest",
  },
  {
    category: "Pets & Fishing",
    title: "Too Young to Carry a Rascal",
    hook: "A young creature decides you're family. Feed it, earn its trust, and don't try to ride it yet.",
    location: "Rascal Plaza",
    status: "future-update",
    card: "rascalPlaza",
  },
  {
    category: "Pets & Fishing",
    title: "Something Strange on the Line",
    hook: "Fill the fish journal. One catch is glowing Crown violet.",
    location: "River Path",
    status: "future-update",
    card: "riverPath",
  },
  {
    category: "Hidden Quests",
    title: "Redraw the Bridges Before They Forget",
    hook: "Map every crossing before tonight's cartographer erases the wrong ones again.",
    location: "Sky Bridges",
    status: "concept",
    card: "skyBridges",
  },
];

/**
 * How a hero grows. Release 1.0 ships the foundation (level, abilities, weapons, relics,
 * exploration); pet bonding is a future system and is labelled that way.
 */
export const PROGRESSION_CONCEPTS = [
  { id: "level", name: "Hero level", copy: "Experience earned per hero.", future: false },
  { id: "abilities", name: "Abilities", copy: "Unlock and improve your combat kit.", future: false },
  { id: "weapons", name: "Weapons", copy: "Upgrade signature equipment.", future: false },
  { id: "relics", name: "Relics", copy: "Change how you fight and explore.", future: false },
  { id: "exploration", name: "Exploration", copy: "Discover places, secrets and collectibles.", future: false },
  { id: "bonding", name: "Pet bonding", copy: "Future system concept.", future: true },
] as const;

/** Two core currencies; gems and crystals are upgrade materials, never a third wallet. */
export const ECONOMY_CONCEPTS = [
  { name: "Gold", copy: "Everyday currency.", kind: "currency" },
  { name: "Crown Shards", copy: "Rare progression resource.", kind: "currency" },
  { name: "Gems & Crystals", copy: "Upgrade materials.", kind: "material" },
] as const;

export const KING_WRONGWAY = {
  title: "All roads lead to me.",
  copy:
    "King Wrongway is Chapter 1's boss: misdirection, false certainty and contradictory routes. He isn't a cardboard villain. He believes one perfect road can keep the realm safe, even if every other future has to disappear to enforce it.",
  status: "concept" as LoreStatus,
} as const;

export const FUTURE_REALMS_TEASER = {
  title: "Beyond Stickerwood",
  copy:
    "Stickerwood is Chapter 1. From the final viewpoint, other realms and huge Crown fractures are visible but unreachable. No realm names and no dates until they're real.",
  status: "planned" as LoreStatus,
} as const;

/** Chapter 1 story structure (FIRST_RELEASE.md §10). Release 1.0 covers the opening; the rest arrives in updates. */
export const CHAPTER_ONE_ACTS = [
  { act: "Prologue", place: "The realms", title: "Crownfall", copy: "The Chaos Crown fractures. Golden energy destabilizes and violet corruption spreads through distant realms. Nobody explains why." },
  { act: "Act I", place: "Starting Village → Rascal Plaza", title: "Welcome to Stickerwood", copy: "Choose a hero, meet Razz, learn to move and explore the village. Then a sign at the crossroads tells your first lie." },
  { act: "Act II", place: "Stickerwood Forest", title: "Something is wrong", copy: "Crown Sprouts and Lost Stickers appear, with stranger things to follow. People give conflicting answers and the first corruption shows through." },
  { act: "Act III", place: "Ancient Tree", title: "The Ancient Tree", copy: "Stickerwood has an older connection to the Crown. Crownfall's effects are not random." },
  { act: "Act IV", place: "Glitch Grove · Wrongway Territory", title: "Follow the wrong road", copy: "The investigation points toward King Wrongway. Frauds grow more complex and combat more dangerous." },
  { act: "Act V", place: "Crown Ruins", title: "Crown Ruins", copy: "A major relic and story discovery, and the first mini-boss: the Overgrown Receipt." },
  { act: "Act VI", place: "King Wrongway Citadel", title: "King Wrongway", copy: "A cinematic boss fight built from combat, deception, clues, route manipulation and the environment itself." },
  { act: "Epilogue", place: "A high viewpoint", title: "The Crownfall has only begun", copy: "Stickerwood stabilizes and Razz celebrates. Then the clouds part, and other realms and massive Crown fractures come into view." },
] as const;

/**
 * Release 1.0: the initial playable release (owner brief, 2026-09-29). Deliberately smaller than
 * Chapter 1: the open-world RPG foundation and one polished main quest. Everything else in
 * Chapter 1 (Ancient Tree onward, the Overgrown Receipt, King Wrongway) and all future systems
 * arrive in later updates. Production scope, not a promise; no date has been announced.
 */
/** The honest production record, shown on the homepage (desktop and phone). */
export const PRODUCTION_STAGES = [
  { label: "Foundation", state: "Canon, scope and art direction: now", done: false, current: true },
  { label: "Prototype", state: "Crown Knight, one Fraud, one area", done: false, current: false },
  { label: "Private playtest", state: "Not open yet", done: false, current: false },
  { label: "Release 1.0", state: "A Sign of Trouble · no date yet", done: false, current: false },
] as const;

export const RELEASE_ONE = {
  version: "Release 1.0",
  name: "A Sign of Trouble",
  quest: "Q01: A Sign of Trouble",
  targets: [
    ["Main quest", "1"],
    ["Launch heroes", "3"],
    ["Places", "4"],
    ["Enemy types", "2"],
    ["Currencies", "2"],
  ],
  places: ["Starting Village", "Stickerwood Forest", "the First Crossroads", "Rascal Plaza"],
  heroes: ["Crown Knight", "Glitchcaster", "Shadow Ranger"],
  enemies: ["Crown Sprout", "Lost Sticker"],
  currencies: ["Gold", "Crown Shards"],
  includes: [
    "Razz as your companion",
    "Combat and exploration foundation",
    "Loot, inventory and equipment foundation",
    "Multiplayer foundation and saving",
    "The first World Lies Fraud",
  ],
  deferred: [
    "Fishing and pets",
    "Mounts",
    "The Glitch Slime story, the Overgrown Receipt and King Wrongway",
    "Crown Ruins and the rest of Chapter 1",
    "The full relic ecosystem and later weapons",
    "The full guild system",
    "Trickster, Lorekeeper and Badge Scout",
    "Future realms",
  ],
} as const;

export const STORY_THEMES = [
  ["Truth versus certainty", "The game separates what is provable from what merely feels safe. Players must decide when enough evidence is enough."],
  ["The world may lie; the game won't", "Every Fraud carries readable evidence. Razz can be wrong. The rules, interface and tutorials never are."],
  ["Humor under pressure", "Razz's comedy is a coping strategy and a social tool. It releases tension without treating the stakes as a joke."],
  ["Correction has a cost", "Fixing a lie can reopen a road, restore a person or expose something the false world had been hiding."],
] as const;
