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
    releaseNote: "Release 1 launch hero",
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
    releaseNote: "Release 1 launch hero",
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
    releaseNote: "Release 1 launch hero",
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
 * `hotspot` is a percentage position on the concept key art; `changes` says how progress here
 * affects the rest of the realm. Everything is pre-production: no area is built yet.
 */
export const WORLD_LOCATIONS = [
  {
    number: "01",
    name: "Starting Village",
    tagline: "The festival of forced cheer",
    chapterRole: "Act I · Onboarding",
    description:
      "A peaceful festival town where you choose your hero, meet Razz and learn to move. Every signboard insists the roads are safe. The first lie is almost convincing because everyone wants it to be true.",
    mysteries: ["The crossroads sign that points the wrong way", "Contradictory courier notices on the village board"],
    threats: "Almost none. That is what makes the first lie work.",
    discoveries: ["First quests, basic merchants and the road to Rascal Plaza"],
    questStyles: "Main Story",
    notableCharacters: ["Razz", "Village merchants and quest-givers"],
    changes: "Exposing the first Fraud reveals the real road to Rascal Plaza.",
    status: "planned" as LoreStatus,
    hotspot: { x: 39, y: 31 },
    image: null,
  },
  {
    number: "02",
    name: "Rascal Plaza",
    tagline: "Where every rumor ends up",
    chapterRole: "Act I · Social hub",
    description:
      "Stickerwood's main gathering place: merchants, quest-givers, pets underfoot and players meeting up. A locked guild board and empty banners hint at things the Plaza isn't ready to open yet.",
    mysteries: ["A merchant who insists he's met you before", "A guild board that stays locked no matter who asks"],
    threats: "Rumors that turn out to be true a beat too late.",
    discoveries: ["Merchants, the Pet Keeper and future guild and event hooks"],
    questStyles: "Side Quests, Pet Quest",
    notableCharacters: ["General Merchant", "Weapon Smith", "Pet Keeper"],
    changes: "Rumors traded here send the squad into Stickerwood Forest.",
    status: "planned" as LoreStatus,
    hotspot: { x: 47, y: 44 },
    image: "rascalPlazaRealm",
  },
  {
    number: "03",
    name: "Stickerwood Forest",
    tagline: "The trails remember",
    chapterRole: "Acts I–II · Main exploration",
    description:
      "The realm's main exploration zone. Trail markers survive beneath newer bark, caves hide secrets, and Crown Sprouts, Glitch Slimes and Lost Stickers make the woods feel less friendly the further you go.",
    mysteries: ["Old trail marks sealed under fresh sap", "What is behind the waterfall?"],
    threats: "Crown Sprouts, Glitch Slimes and Lost Stickers.",
    discoveries: ["Caves, collectibles, creatures and hidden Frauds"],
    questStyles: "Exploration, Mystery Cases",
    notableCharacters: ["Lost Stickers carrying fragments of discarded testimony"],
    changes: "Deeper paths open toward River Path and the Ancient Tree.",
    status: "planned" as LoreStatus,
    hotspot: { x: 47, y: 64 },
    image: "mysteryForest",
  },
  {
    number: "04",
    name: "River Path",
    tagline: "A current the maps deny",
    chapterRole: "Side content · Fishing and secrets",
    description:
      "A quieter stretch of water for fishing, side quests and atmosphere. Official maps disagree about where the bridge is, and the current runs fastest on the days the records call calm.",
    mysteries: ["A bridge on no two matching maps", "A catch that glows violet"],
    threats: "Very little, unless you trust the ferry schedule.",
    discoveries: ["Fishing spots, a collection journal and at least one Crownfall-corrupted fish"],
    questStyles: "Fishing Quest, Side Quests",
    notableCharacters: ["The Fishing NPC", "A ferryman who keeps two logbooks that disagree"],
    changes: "A strange catch here points upstream, toward the Ancient Tree.",
    status: "planned" as LoreStatus,
    hotspot: { x: 66, y: 62 },
    image: null,
  },
  {
    number: "05",
    name: "Ancient Tree",
    tagline: "Visible from everywhere",
    chapterRole: "Act III · The Ancient Tree",
    description:
      "A colossal landmark you can see from almost every area. Paths loop up its roots and canopy, and its oldest rings hold Stickerwood's history with the Crown.",
    mysteries: ["Growth rings out of step with recorded history", "Roots that grow toward the Crown Ruins however they're replanted"],
    threats: "Glitch-root tangles that reroute travellers.",
    discoveries: ["Lore, traversal routes and a deeper history of the Crown"],
    questStyles: "Main Story, Exploration",
    notableCharacters: ["The Rootbound Archivist"],
    changes: "The truth in its roots shows Crownfall isn't random, and turns the investigation toward King Wrongway.",
    status: "planned" as LoreStatus,
    hotspot: { x: 57, y: 86 },
    image: "ancientTree",
  },
  {
    number: "06",
    name: "Glitch Grove",
    tagline: "Where royal commands become terrain",
    chapterRole: "Act IV · Rising instability",
    description:
      "Stickerwood starts to come apart. Distorted plants, floating fragments and Crown energy make every path an argument, with harder enemies and more advanced Frauds.",
    mysteries: ["Gravity that flips above violet fissures", "Contradictory decrees carved on floating pillars"],
    threats: "Stronger corrupted enemies and contradictory physical rules.",
    discoveries: ["Crown fragments and harder Fraud encounters"],
    questStyles: "Mystery Cases, Main Story",
    notableCharacters: ["Glitch Slimes that repeat and multiply unstable states"],
    changes: "The corruption thickens the closer the squad gets to the Crown Ruins.",
    status: "planned" as LoreStatus,
    hotspot: { x: 74, y: 22 },
    image: "glitchGrove",
  },
  {
    number: "07",
    name: "Crown Ruins",
    tagline: "What the Crown left behind",
    chapterRole: "Act V · Crown Ruins",
    description:
      "Late-chapter ruins full of relics, tougher enemies and major lore. Corruption is stronger here, and something enormous is growing out of the paperwork.",
    mysteries: ["A royal inscription that contradicts itself", "Relics that are important but unexplained"],
    threats: "The Overgrown Receipt, Chapter 1's mini-boss.",
    discoveries: ["A major relic and story discovery"],
    questStyles: "Main Story",
    notableCharacters: ["The Overgrown Receipt"],
    changes: "Beating the Overgrown Receipt opens the way up to the Sky Bridges.",
    status: "planned" as LoreStatus,
    hotspot: { x: 56, y: 16 },
    image: null,
  },
  {
    number: "08",
    name: "Sky Bridges",
    tagline: "Causeways over nothing",
    chapterRole: "Late chapter · Traversal spectacle",
    description:
      "Floating islands, waterfalls and bridges across huge vistas. Some crossings hold only while a specific rule is believed true.",
    mysteries: ["Bridges that exist only while a rule is believed", "A route that leads somewhere else on the way back"],
    threats: "Gales and fake bridges that fold mid-crossing.",
    discoveries: ["Viewpoints, secrets and a clearer look at Wrongway Territory"],
    questStyles: "Exploration, Hidden Quests",
    notableCharacters: ["A royal cartographer who redraws the bridges nightly"],
    changes: "The last bridge lands in Wrongway Territory.",
    status: "planned" as LoreStatus,
    hotspot: { x: 78, y: 79 },
    image: "skyBridges",
  },
  {
    number: "09",
    name: "Wrongway Territory",
    tagline: "Every sign disagrees",
    chapterRole: "Acts IV–VI · The wrong road",
    description:
      "Contradictory signs, strange geometry and warped routes. Nothing here is subtle anymore: the land itself is foreshadowing the boss.",
    mysteries: ["Signs that contradict each other in the same breath", "Routes that bend back on themselves"],
    threats: "Warped paths and heavily corrupted enemies.",
    discoveries: ["Clues to how King Wrongway fights"],
    questStyles: "Main Story, Mystery Cases",
    notableCharacters: ["King Wrongway's influence, everywhere"],
    changes: "Every road here bends toward the Citadel.",
    status: "planned" as LoreStatus,
    hotspot: { x: 80, y: 61 },
    image: null,
  },
  {
    number: "10",
    name: "King Wrongway Citadel",
    tagline: "All roads lead to him",
    chapterRole: "Act VI · The final encounter",
    description:
      "Chapter 1's final environment: dark, corrupted and hostile, but still unmistakably Stickerwood. King Wrongway waits with fake bridges, false clones and misleading telegraphs, and there is always enough evidence to find the truth.",
    mysteries: ["Which telegraph is lying", "Which bridge is real"],
    threats: "King Wrongway, BOSS-001.",
    discoveries: ["The end of Chapter 1, and a view beyond the clouds"],
    questStyles: "Main Story",
    notableCharacters: ["King Wrongway"],
    changes: "When Wrongway falls, Stickerwood stabilizes, and the view beyond the clouds shows the Crownfall has only begun.",
    status: "planned" as LoreStatus,
    hotspot: { x: 91, y: 12 },
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

export const QUEST_JOURNAL = [
  {
    category: "Main Story",
    title: "The Sign That Lied",
    location: "Starting Village",
    summary: "Reach Rascal Plaza. The crossroads sign disagrees with every footprint.",
    status: "concept" as LoreStatus,
  },
  {
    category: "Main Story",
    title: "The Ancient Tree",
    location: "Ancient Tree",
    summary: "Stickerwood's older connection to the Crown is written in its rings.",
    status: "concept" as LoreStatus,
  },
  {
    category: "Mystery Cases",
    title: "The Merchant Who Remembers You Wrong",
    location: "Rascal Plaza",
    summary: "He's certain you've met. You're certain you haven't.",
    status: "concept" as LoreStatus,
  },
  {
    category: "Mystery Cases",
    title: "The Bridge Two Maps Disagree On",
    location: "River Path",
    summary: "Two official maps, one bridge, zero agreement.",
    status: "concept" as LoreStatus,
  },
  {
    category: "Side Quests",
    title: "The Ferryman's Second Logbook",
    location: "River Path",
    summary: "One logbook says the crossing never happened. The other one is lying.",
    status: "concept" as LoreStatus,
  },
  {
    category: "Exploration",
    title: "Behind the Waterfall",
    location: "Stickerwood Forest",
    summary: "Everyone can see it. Nobody admits there's anything behind it.",
    status: "concept" as LoreStatus,
  },
  {
    category: "Pets & Fishing",
    title: "Too Young to Carry a Rascal",
    location: "Rascal Plaza",
    summary: "A young creature decides you're family. Feed it, earn its trust, and don't try to ride it yet.",
    status: "concept" as LoreStatus,
  },
  {
    category: "Pets & Fishing",
    title: "Something Strange on the Line",
    location: "River Path",
    summary: "Fill the fish journal. One catch is glowing Crown violet.",
    status: "concept" as LoreStatus,
  },
  {
    category: "Hidden Quests",
    title: "Redraw the Bridges Before They Forget",
    location: "Sky Bridges",
    summary: "Map every crossing before tonight's cartographer erases the wrong ones again.",
    status: "concept" as LoreStatus,
  },
] as const;

/** Release 1 progression (FIRST_RELEASE.md §23). No enormous skill trees at launch. */
export const PROGRESSION_CONCEPTS = [
  { name: "Hero level", copy: "Experience earned per hero." },
  { name: "Abilities", copy: "Two or three abilities, a signature move and an ultimate per hero." },
  { name: "Weapons and gear", copy: "Weapon upgrades and starter equipment." },
  { name: "Relics", copy: "Unique passives and strange interactions, not simple stat boosts." },
  { name: "Pet bonding", copy: "Trust and growth with around four launch companions." },
  { name: "Exploration", copy: "Completion, collectibles, the fish journal and story progress." },
] as const;

/** Release 1 currencies (FIRST_RELEASE.md §21). Deliberately short. */
export const ECONOMY_CONCEPTS = [
  { name: "Gold", copy: "Everyday currency for shops, basic upgrades and services." },
  { name: "Crown Shards", copy: "The major progression resource, earned from story, bosses and exposed Frauds." },
  { name: "Gems and crystals", copy: "Materials for weapon upgrades and relics." },
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

/** Chapter 1 story structure (FIRST_RELEASE.md §10). */
export const CHAPTER_ONE_ACTS = [
  { act: "Prologue", place: "The realms", title: "Crownfall", copy: "The Chaos Crown fractures. Golden energy destabilizes and violet corruption spreads through distant realms. Nobody explains why." },
  { act: "Act I", place: "Starting Village → Rascal Plaza", title: "Welcome to Stickerwood", copy: "Choose a hero, meet Razz, learn to move and explore the village. Then a sign at the crossroads tells your first lie." },
  { act: "Act II", place: "Stickerwood Forest", title: "Something is wrong", copy: "Crown Sprouts, Glitch Slimes and Lost Stickers appear. People give conflicting answers and the first corruption shows through." },
  { act: "Act III", place: "Ancient Tree", title: "The Ancient Tree", copy: "Stickerwood has an older connection to the Crown. Crownfall's effects are not random." },
  { act: "Act IV", place: "Glitch Grove · Wrongway Territory", title: "Follow the wrong road", copy: "The investigation points toward King Wrongway. Frauds grow more complex and combat more dangerous." },
  { act: "Act V", place: "Crown Ruins", title: "Crown Ruins", copy: "A major relic and story discovery, and the first mini-boss: the Overgrown Receipt." },
  { act: "Act VI", place: "King Wrongway Citadel", title: "King Wrongway", copy: "A cinematic boss fight built from combat, deception, clues, route manipulation and the environment itself." },
  { act: "Epilogue", place: "A high viewpoint", title: "The Crownfall has only begun", copy: "Stickerwood stabilizes and Razz celebrates. Then the clouds part, and other realms and massive Crown fractures come into view." },
] as const;

/** What Release 1 is scoped to include. Production targets, not promises (FIRST_RELEASE.md §42). */
export const RELEASE_ONE = {
  name: "Chapter 1: The Sign That Lied",
  targets: [
    ["Playable heroes", "3"],
    ["Major areas", "10"],
    ["Pets", "About 4"],
    ["Fish species", "8–12"],
    ["Fraud encounters", "10–20"],
    ["Bosses", "1 mini-boss, 1 chapter boss"],
  ],
  includes: ["Co-op from day one", "Day, night and basic weather", "Fishing and pet bonding", "Loot, relics and reliable saving"],
  deferred: ["Mount riding (teased only)", "Trading", "Full guild system", "Trickster, Lorekeeper and Badge Scout", "Other playable realms"],
} as const;

export const STORY_THEMES = [
  ["Truth versus certainty", "The game separates what is provable from what merely feels safe. Players must decide when enough evidence is enough."],
  ["The world may lie; the game won't", "Every Fraud carries readable evidence. Razz can be wrong. The rules, interface and tutorials never are."],
  ["Humor under pressure", "Razz's comedy is a coping strategy and a social tool. It releases tension without treating the stakes as a joke."],
  ["Correction has a cost", "Fixing a lie can reopen a road, restore a person or expose something the false world had been hiding."],
] as const;
