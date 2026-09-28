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

export const CORE_LOOP = [
  { number: "01", title: "Enter a disputed place", copy: "The objective gives you a claim, not an answer. The route, witnesses and environment immediately begin to disagree." },
  { number: "02", title: "Collect independent signals", copy: "Footprints, sound, wear, shadows, old maps, enemy behavior and dialogue each reveal part of the underlying rule." },
  { number: "03", title: "Build a shared theory", copy: "Players pin evidence, challenge assumptions and decide which contradiction is structural rather than decorative." },
  { number: "04", title: "Accuse the lie", copy: "The squad commits to a claim through the SUS system. Confidence is visible; correctness is not." },
  { number: "05", title: "Survive the correction", copy: "A true accusation forces the level to reconcile itself. Paths fold, arenas change and corrupted creatures lose or gain abilities." },
  { number: "06", title: "Carry the consequence", copy: "The repaired world remains changed. New routes, memories and relationships alter later exploration instead of resetting after the quest." },
] as const;

export type LoreStatus = "in-development" | "concept" | "planned";

export const PLAYER_ROLES = [
  {
    name: "Crown Knight",
    combat: "Front-line control, guard breaks and protection under pressure.",
    field: "Anchors unstable objects long enough for the squad to inspect or cross them.",
    tension: "Uses royal technology while questioning the authority that created it.",
    weapon: "Banner-lance and royal aegis",
    powers: ["Guard Break Slam", "Aegis Anchor", "Oath of the Line"],
    mysterySpecialty: "Reading royal seals and authority markings for forgeries.",
    questAffinity: "Story, Guild Missions",
    accent: "#D5A84B",
    status: "in-development" as LoreStatus,
  },
  {
    name: "Glitchcaster",
    combat: "Area control, chain reactions and high-risk manipulation of corruption.",
    field: "Reveals hidden rule fragments and temporarily inverts false environmental states.",
    tension: "The most powerful reader of Crown code is also the easiest for the Crown to read back.",
    weapon: "Fracture rod",
    powers: ["Code Fracture Bolt", "Rule Invert", "Feedback Pulse"],
    mysterySpecialty: "Reading Crown corruption code fragments other heroes can't see.",
    questAffinity: "Mysteries, Hidden Quests",
    accent: "#6B31A8",
    status: "in-development" as LoreStatus,
  },
  {
    name: "Shadow Ranger",
    combat: "Precision damage, traps and control from changing sightlines.",
    field: "Tracks physical continuity—prints, broken fibers, wind and disturbed surfaces.",
    tension: "Trusts material evidence, even when people remember something kinder.",
    weapon: "Whisper bow",
    powers: ["Marked Shot", "Trapline", "Vanish Step"],
    mysterySpecialty: "Physical continuity—prints, broken fibers, wind, disturbed surfaces.",
    questAffinity: "Bounties",
    accent: "#41633B",
    status: "in-development" as LoreStatus,
  },
  {
    name: "Trickster",
    combat: "Mobility, decoys, interruption and opportunistic close-range damage.",
    field: "Tests rules by deliberately breaking their assumptions and finding edge cases.",
    tension: "Treats every system as a game until a consequence refuses to reset.",
    weapon: "Paired sticker-blades",
    powers: ["Decoy Double", "Rule Break", "Opportunist Strike"],
    mysterySpecialty: "Testing rules by breaking their assumptions.",
    questAffinity: "Hidden Quests, Bounties",
    accent: "#E632A9",
    status: "in-development" as LoreStatus,
  },
  {
    name: "Lorekeeper",
    combat: "Light support damage from illuminated glyph bursts; mostly utility and crowd reveal.",
    field: "Restores erased signage and memory fragments so the squad can navigate contradictions.",
    tension: "The more history Lorekeeper restores, the more they risk remembering what King Wrongway needs forgotten.",
    weapon: "The Unabridged Lantern",
    powers: ["Truth Lantern", "Marginalia", "Bound Chronicle"],
    mysterySpecialty: "Erased histories, conflicting written records, contradictory Crown edicts.",
    questAffinity: "Story, Guild Missions",
    accent: "#F3E5C8",
    status: "concept" as LoreStatus,
  },
  {
    name: "Badge Scout",
    combat: "Light ranged utility damage; mostly traversal and puzzle support.",
    field: "Finds hidden collectibles, shortcuts and side discoveries other heroes miss.",
    tension: "Collects \"badges\"—trophies of solved lies—obsessively, and struggles with which discoveries are worth the risk.",
    weapon: "Multi-badge slingpack",
    powers: ["Grapple Badge", "Signal Flare", "Toolkit Swap"],
    mysterySpecialty: "Hidden discoveries, secret passages, environmental puzzle mechanisms.",
    questAffinity: "Hidden Quests, Bounties",
    accent: "#B9F227",
    status: "concept" as LoreStatus,
  },
] as const;

export const WORLD_LOCATIONS = [
  {
    number: "01",
    name: "Starting Village",
    tagline: "The festival of forced cheer",
    description:
      "A crowded festival town where every signboard insists the kingdom's roads are prosperous and safe. The first lie is almost convincing because everyone wants it to be true.",
    mysteries: ["Three contradictory courier notices", "Backward-worn stone steps on the 'safest' road"],
    threats: "Edited public memory and replaced signposts.",
    discoveries: ["A courier shadow without a physical courier"],
    questStyles: "Story",
    notableCharacters: ["The Festival Herald", "The missing royal courier"],
    status: "in-development" as LoreStatus,
    hotspot: { x: 20, y: 66 },
    insignia: "royalCrown",
    image: null,
  },
  {
    number: "02",
    name: "Stickerwood (the Heartwood)",
    tagline: "The grove the realm is named for",
    description:
      "Layered paper-craft trees etched with the realm's oldest, half-legible treaties—the literal heart the whole realm takes its name from. Lantern-lit walkways spiral up through trunks wide enough to hold whole archive rooms, and every plank creaks with a history older than the Crown itself.",
    mysteries: [
      "A missing page from the founding treaty",
      "Carved names that rearrange overnight",
      "A bell that rings the wrong hour on purpose",
      "Sap that runs gold instead of amber near the oldest trunk",
    ],
    threats: "Whispering Crown echoes repeating contradictory oaths, and collapsed archive floors where an edited memory took the real one down with it.",
    discoveries: [
      "A growth-ring timeline older than the Crown's official history",
      "A sealed alcove where the original Stickerwood charter might still be hidden",
    ],
    questStyles: "Story, Hidden Quests",
    notableCharacters: ["Elder Lost Stickers who remember pre-Crown Stickerwood", "The Bellkeeper, who insists the wrong hour is the correct one"],
    status: "concept" as LoreStatus,
    hotspot: { x: 34, y: 48 },
    insignia: "razzMedallion",
    image: "stickerwoodHeartwood",
  },
  {
    number: "03",
    name: "Mystery Forest",
    tagline: "The ancient trails remember",
    description:
      "Ancient trail markers survive beneath newer layers of bark. Wind currents, compass anomalies and Lost Stickers preserve testimony the village won't acknowledge.",
    mysteries: ["Royal axe scars sealed beneath fresh sap", "Wind blowing counter to the leaf drift"],
    threats: "Erased geographic history and inverted shadows.",
    discoveries: ["A discarded courier satchel with a spinning compass"],
    questStyles: "Mysteries",
    notableCharacters: ["Lost Stickers carrying fragments of discarded testimony"],
    status: "in-development" as LoreStatus,
    hotspot: { x: 48, y: 34 },
    insignia: "evidenceCamera",
    image: "mysteryForest",
  },
  {
    number: "04",
    name: "Ancient Tree",
    tagline: "A colossal landmark that links the realm",
    description:
      "A single colossal world-tree that physically connects districts—paths loop, climb and hide shortcuts inside its roots and canopy. Its bark is scarred with generations of carved directions, half of which no longer lead anywhere the tree admits to.",
    mysteries: [
      "Growth rings out of sync with recorded history",
      "A trunk-door that opens only to a correct accusation",
      "Roots that grow toward Crown Ruins no matter which way they're replanted",
    ],
    threats: "Glitch-root tangles that reroute travelers, and canopy platforms that occasionally forget they were ever built.",
    discoveries: [
      "A hollow chamber archive",
      "A hidden rootway that surfaces near Crown Ruins, unmarked on every official map",
    ],
    questStyles: "Mysteries, Guild Missions",
    notableCharacters: ["The Rootbound Archivist", "A pair of Lost Stickers who live on opposite sides of the same branch and refuse to compare notes"],
    status: "concept" as LoreStatus,
    hotspot: { x: 58, y: 45 },
    insignia: "crystalSigil",
    image: "ancientTree",
  },
  {
    number: "05",
    name: "Glitch Grove",
    tagline: "Where royal commands become terrain",
    description:
      "Fractured islands suspend in mid-air, obeying mutually exclusive Crown commands. Every arena is an ongoing reality argument.",
    mysteries: ["Inverted gravity pockets above purple fissures", "Conflicting royal decrees carved on floating pillars"],
    threats: "Contradictory physical laws and artificial gravity.",
    discoveries: ["Looping combat footprints pressed into solid stone"],
    questStyles: "Mysteries, Bounties",
    notableCharacters: ["Glitch Slimes that repeat and multiply unstable states"],
    status: "in-development" as LoreStatus,
    hotspot: { x: 68, y: 40 },
    insignia: "qaController",
    image: "glitchGrove",
  },
  {
    number: "06",
    name: "Rascal Plaza",
    tagline: "Where rumor becomes currency",
    description:
      "A market square where villagers trade rumors—the in-fiction counterpart to the real Rascal Labs community, not the same place. Stalls change owners between visits, and the fountain at its center is rumored to answer questions it was never asked.",
    mysteries: [
      "Contradicting rumor boards",
      "A merchant who insists he's met the squad before",
      "A fountain that occasionally spells out a warning in ripples",
    ],
    threats: "Minor Crown Sprout pickpockets exploiting crowd confusion, and rumors that turn out to be true a beat too late to matter.",
    discoveries: [
      "Side bounty postings and an in-fiction Founders Guild recruitment board",
      "A ledger of trades that never happened, kept meticulously by someone who swears they did",
    ],
    questStyles: "Bounties, Guild Missions",
    notableCharacters: ["The suspiciously familiar Plaza merchant", "A fortune-stall keeper who reads fountain ripples instead of cards"],
    status: "planned" as LoreStatus,
    hotspot: { x: 30, y: 58 },
    insignia: "qaController",
    image: "rascalPlazaRealm",
  },
  {
    number: "07",
    name: "River Path",
    tagline: "A current the maps deny",
    description:
      "A waterway between village and forest, contested by conflicting 'official' water-level records. The current runs faster on the days the maps insist it's calmest.",
    mysteries: [
      "A bridge on no two matching maps",
      "Fish swimming against a current the maps say doesn't exist",
      "A ferry schedule that predicts crossings that haven't happened yet",
    ],
    threats: "Sudden false floods engineered by a Crown correction, and a ferryman who may or may not remember agreeing to take you across.",
    discoveries: [
      "A message in a bottle from a courier who 'never left'",
      "A waterlogged ledger of crossings dated after the bridge was 'never built'",
    ],
    questStyles: "Story, Bounties",
    notableCharacters: ["The courier who allegedly never left", "A ferryman who keeps two logbooks that disagree with each other"],
    status: "planned" as LoreStatus,
    hotspot: { x: 42, y: 62 },
    insignia: "evidenceCamera",
    image: null,
  },
  {
    number: "08",
    name: "Hidden Cove",
    tagline: "A shore that isn't on the new maps",
    description: "A secluded inlet used by Lost Stickers as a hideout, tucked beneath the forest's edge. Shipwreck timber and old coin turn up in the tideline more often than a cove this small should hold.",
    mysteries: [
      "A cove on old maps but not new ones",
      "Footsteps with no visible owner",
      "A shipwreck that predates the ship's official launch date",
    ],
    threats: "Submerged glitch fissures, and tides that rise on a schedule no calendar agrees with.",
    discoveries: [
      "A cache of pre-Crown artifacts",
      "A captain's log describing a voyage the Crown's records say never sailed",
    ],
    questStyles: "Hidden Quests",
    notableCharacters: ["Lost Stickers using the cove as a hideout", "A retired smuggler who trades in secrets instead of goods now"],
    status: "planned" as LoreStatus,
    hotspot: { x: 14, y: 40 },
    insignia: "razzMedallion",
    image: "hiddenCove",
  },
  {
    number: "09",
    name: "Crown Ruins",
    tagline: "King Wrongway's sovereign redoubt",
    description:
      "The kingdom's buried control apparatus and King Wrongway's last unedited decree wait above the realm.",
    mysteries: ["The primordial Crown command inscription", "A grand causeway that exists only when observed"],
    threats: "One compulsory official future.",
    discoveries: ["King Wrongway's original unedited blueprint"],
    questStyles: "Story",
    notableCharacters: ["King Wrongway"],
    status: "in-development" as LoreStatus,
    hotspot: { x: 84, y: 26 },
    insignia: "crownEyeShield",
    image: null,
  },
  {
    number: "10",
    name: "Sky Bridges",
    tagline: "Causeways that believe on command",
    description:
      "Floating causeways linking Glitch Grove to Crown Ruins—a natural extension of the Grove's contradictory-gravity mechanic. Some bridges hold weight only for travelers who believe they will.",
    mysteries: [
      "Bridges that exist only while a specific rule is believed true",
      "A causeway that leads to Crown Ruins on the way there but somewhere else entirely on the way back",
      "Wind that blows uphill on schedule",
    ],
    threats: "Inversion gales, and bridges that fold away mid-crossing if the squad's confidence in the route falters.",
    discoveries: [
      "A suspended shrine holding a discarded royal decree",
      "A sentinel post log recording bridge collapses the current bridge insists never happened",
    ],
    questStyles: "Mysteries, Guild Missions",
    notableCharacters: ["Sentinels bound to a single contradictory command", "A retired royal cartographer who redraws the bridges nightly and won't say why"],
    status: "concept" as LoreStatus,
    hotspot: { x: 76, y: 32 },
    insignia: "crystalSigil",
    image: "skyBridges",
  },
  {
    number: "11",
    name: "King Wrongway Citadel",
    tagline: "The sealed seat beyond the Ruins",
    description:
      "The true seat beyond Crown Ruins—sealed, not enterable in the current Episode 1 design. A future-chapter destination. Its gates are visible from Crown Ruins on clear days: close enough to look reachable, far enough to stay a promise rather than a plan.",
    mysteries: [
      "The sealed throne room",
      "Wrongway's 'one perfect road' blueprint",
      "A single unlit window that changes position each time it's seen from Crown Ruins",
    ],
    threats: "Defenses that activate only once a lie is fully exposed elsewhere in the realm.",
    discoveries: [],
    questStyles: "Story (future)",
    notableCharacters: ["King Wrongway (final confrontation, not yet built)", "A silhouette occasionally seen pacing the ramparts, never confirmed as Wrongway himself"],
    status: "planned" as LoreStatus,
    hotspot: { x: 92, y: 16 },
    insignia: "crownEyeShield",
    image: "kingWrongwayCitadel",
  },
] as const;

export const QUEST_JOURNAL = [
  {
    category: "Story",
    title: "The Safest Path",
    location: "Starting Village",
    summary: "A courier vanishes on the one road every sign insists has never failed.",
    status: "in-development" as LoreStatus,
  },
  {
    category: "Story",
    title: "The Path Remembers",
    location: "Mystery Forest",
    summary: "Follow evidence the village refuses to admit exists.",
    status: "in-development" as LoreStatus,
  },
  {
    category: "Mysteries",
    title: "The Missing Treaty Page",
    location: "Stickerwood (the Heartwood)",
    summary: "One page of the founding treaty is gone. Someone benefits from that.",
    status: "concept" as LoreStatus,
  },
  {
    category: "Mysteries",
    title: "The Bridge Two Maps Disagree On",
    location: "River Path",
    summary: "Two official maps, one bridge, zero agreement.",
    status: "planned" as LoreStatus,
  },
  {
    category: "Bounties",
    title: "The Merchant Who Remembers You Wrong",
    location: "Rascal Plaza",
    summary: "He's certain you've met. You're certain you haven't.",
    status: "planned" as LoreStatus,
  },
  {
    category: "Guild Missions",
    title: "Chart the Ancient Tree's Hollow",
    location: "Ancient Tree",
    summary: "Map a chamber that shouldn't be able to fit inside the trunk.",
    status: "concept" as LoreStatus,
  },
  {
    category: "Hidden Quests",
    title: "The Cove That Isn't on the New Map",
    location: "Hidden Cove",
    summary: "Old maps show a cove. New maps don't. The cove is still there.",
    status: "planned" as LoreStatus,
  },
  {
    category: "Guild Missions",
    title: "Redraw the Bridges Before They Forget",
    location: "Sky Bridges",
    summary: "Map every causeway before tonight's cartographer erases the wrong ones again.",
    status: "concept" as LoreStatus,
  },
  {
    category: "Hidden Quests",
    title: "The Ferryman's Second Logbook",
    location: "River Path",
    summary: "One logbook says the crossing never happened. The other one is lying.",
    status: "planned" as LoreStatus,
  },
] as const;

export const PROGRESSION_CONCEPTS = [
  { name: "Hero Level", copy: "Overall experience earned per hero." },
  { name: "Abilities", copy: "Per-hero power trees, starting from each hero's three signature powers." },
  { name: "Gear", copy: "Equippable items affecting combat and traversal." },
  { name: "Relics", copy: "Rare, corruption-touched items with a story cost as well as a benefit." },
  { name: "Class Mastery", copy: "A per-hero specialization track, unlocked through repeated use." },
  { name: "Badges", copy: "In-game collectible trophies tied to solved Frauds—distinct from the real Discord bot badges." },
] as const;

export const ECONOMY_CONCEPTS = [
  { name: "Crown Shards", copy: "Primary currency, earned by correcting a lie." },
  { name: "Bounty Gold", copy: "Earned from Bounty quests, spent on gear." },
  { name: "Guild Credits", copy: "Earned from Guild Missions, spent on cosmetics and guild-hall upgrades." },
] as const;

export const KING_WRONGWAY = {
  title: "All roads lead to me.",
  copy:
    "King Wrongway is not a cardboard villain. He believes one perfect, compulsory road can prevent a catastrophe the realm barely remembers—even if every other future has to disappear to enforce it. His corruption isn't random damage; it's reality straining to obey a command that can no longer be true everywhere at once.",
  status: "concept" as LoreStatus,
} as const;

export const FUTURE_REALMS_TEASER = {
  title: "Beyond Stickerwood",
  copy:
    "Stickerwood is Episode 1. What lies past King Wrongway's Citadel is sealed for now—no realm names, no dates, just the promise that Crownfall is bigger than one kingdom.",
  status: "planned" as LoreStatus,
} as const;

export const EPISODE_ONE_BEATS = [
  {
    act: "ACT I",
    place: "Starting Village",
    title: "The safest path",
    copy: "A festival celebrates the road that has never failed. Minutes later, a courier disappears on that same route. The sign is spotless, the stones are worn in the wrong direction and every witness remembers a different warning.",
    question: "Can a place be safe if the danger has been removed from everyone's memory?",
  },
  {
    act: "ACT II",
    place: "Mystery Forest",
    title: "The path remembers",
    copy: "The squad follows evidence the village cannot agree exists. Trees carry erased route marks, Lost Stickers repeat fragments of discarded testimony and Razz recognizes a royal seal he claims never to have seen.",
    question: "When memory and physical evidence conflict, which deserves authority?",
  },
  {
    act: "ACT III",
    place: "Glitch Grove",
    title: "A rule without a reason",
    copy: "Broken islands obey contradictory directions from the Crown. Combat and traversal become one deduction: identify which rule controls each fragment before the arena rewrites the squad into a losing position.",
    question: "Is a rule still legitimate when its original purpose has been erased?",
  },
  {
    act: "ACT IV",
    place: "Crown Ruins",
    title: "All roads lead to me",
    copy: "King Wrongway is revealed not as a simple tyrant, but as a ruler trapped inside his final command. He believes one perfect road can prevent the catastrophe from happening again—even if every other future must disappear.",
    question: "Do you destroy a comforting lie when the truth offers no guarantee of safety?",
  },
] as const;

export const STORY_THEMES = [
  ["Truth versus certainty", "The game separates what is provable from what merely feels safe. Players must decide when enough evidence is enough."],
  ["Memory and power", "Who gets to write the shared version of an event—and what happens to people whose memories do not fit?"],
  ["Humor under pressure", "Razz's comedy is a coping strategy and a social tool. It releases tension without treating the stakes as a joke."],
  ["Correction has a cost", "Fixing a lie can reopen a road, restore a person or expose a wound the false world had been hiding."],
] as const;
