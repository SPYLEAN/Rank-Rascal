import { PLAYER_ROLES, RELEASE_ONE, WORLD_LOCATIONS } from "./game-content";
import { RAZZ_QUESTIONS } from "./razz";
import { UPDATE_ROADMAP } from "./updates";

/**
 * The Razz Canon: everything Ask Razz is allowed to say, as structured entries.
 *
 * Sources: docs/rascal-realms/FIRST_RELEASE.md (Release 1 scope), lib/game-content.ts (heroes,
 * areas; generated below so they can't drift from the pages), lib/updates.ts (roadmap) and the
 * six curated answers in lib/razz.ts. Answers are written in Razz's voice but must stay literally
 * true: no invented dates, prices, platforms or promises.
 *
 * Keywords are matched after normalisation and synonym mapping in lib/razz-engine.ts, so write
 * them in their canonical form (see SYNONYMS there). Multi-word keywords match as phrases.
 * A keyword may carry a weight: ["crown knight", 4]. Default weight is 1.
 */

export type CanonStatus = "confirmed" | "planned" | "concept" | "unannounced";

export type CanonEntry = {
  id: string;
  topic: string;
  /** The question as shown in suggestions. */
  question: string;
  answer: string;
  /** Other ways people ask this. */
  phrasings: readonly string[];
  keywords: readonly (string | readonly [string, number])[];
  /** Ids of entries worth suggesting next. */
  related: readonly string[];
  link: { label: string; href: string };
  status: CanonStatus;
};

const curated = (id: string) => {
  const found = RAZZ_QUESTIONS.find((item) => item.id === id);
  if (!found) throw new Error(`Missing curated Razz answer: ${id}`);
  return found;
};

const slug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const HANDWRITTEN: CanonEntry[] = [
  // ── The game ────────────────────────────────────────────────────────────────
  {
    id: "premise",
    topic: "game",
    question: "What is Rascal Realms: Crownfall?",
    answer:
      "A story-driven co-op action RPG mystery on Roblox, for solo players or squads of up to four. You explore Stickerwood, notice when the world is lying, expose the lie, then fight, solve or traverse whatever the truth reveals. It's in pre-production, made by Rascal Labs.",
    phrasings: ["what is this game", "what kind of game is it", "tell me about the game", "what is crownfall", "what is rascal realms", "whats the game about", "explain the game", "what genre is it"],
    keywords: [["crownfall", 2], ["rascal realms", 2], ["game", 1], ["genre", 2], ["about", 0.5]],
    related: ["story", "loop", "status"],
    link: { label: "Discover the game", href: "/#enter-stickerwood" },
    status: "confirmed",
  },
  {
    id: "story",
    topic: "story",
    question: "What is the story?",
    answer:
      "The Chaos Crown turned royal rules into reality. When it fractured, golden energy went unstable and violet corruption started spreading through the realms. In Stickerwood, the world now edits itself to cover the gaps, so signs, paths and even people can be wrong. Chapter 1 follows the lies all the way to King Wrongway.",
    phrasings: ["what is the story", "what happens in the game", "whats the plot", "tell me the lore", "what is the backstory"],
    keywords: [["story", 3], ["plot", 3], ["lore", 3], ["backstory", 3], ["happen", 1]],
    related: ["lies", "crown", "chapter-acts"],
    link: { label: "Read the story", href: "/game#premise" },
    status: "confirmed",
  },
  {
    id: "crown",
    topic: "story",
    question: "What is the Chaos Crown and Crownfall?",
    answer:
      "The Crown was built to settle facts: declare a rule and the realm obeyed it. Crownfall is the moment it fractured. Nobody explains the cause yet on purpose; the mystery is part of the game. What we know: its violet corruption is reality straining to obey commands that can't all be true.",
    phrasings: ["what is the chaos crown", "what is crownfall", "what happened to the crown", "why did the crown break", "what is the crown"],
    keywords: [["chaos crown", 4], ["crown", 2], ["crownfall", 1], ["fracture", 2], ["corruption", 2], ["violet", 1], ["purple", 1]],
    related: ["story", "lies", "wrongway"],
    link: { label: "History of Stickerwood", href: "/game#premise" },
    status: "confirmed",
  },
  {
    id: "chapter-acts",
    topic: "story",
    question: "How is Chapter 1 structured?",
    answer:
      "A prologue where the Crown fractures, then six acts: arrive in Stickerwood and expose your first lie, discover something is wrong, learn the Ancient Tree's secret, follow the wrong road, face the Overgrown Receipt in the Crown Ruins, then King Wrongway. The epilogue shows how much bigger the Crownfall is.",
    phrasings: ["how many acts are there", "what are the chapters", "what happens in chapter 1", "how does the story go"],
    keywords: [["act", 3], ["chapter 1", 3], ["chapter", 1], ["prologue", 3], ["epilogue", 3], ["structure", 2]],
    related: ["release-one", "wrongway", "length"],
    link: { label: "Chapter 1 on the game page", href: "/game#chapter-one" },
    status: "planned",
  },
  {
    id: "length",
    topic: "release",
    question: "How long is Chapter 1?",
    answer:
      "Production targets, not promises: about 60 to 90 minutes for the main Chapter 1 path, and roughly two to four hours with side quests, fishing, pets, secrets and exploration. Those numbers may change after prototyping.",
    phrasings: ["how long is the game", "how long is chapter 1", "how many hours of gameplay", "how long does it take to finish", "playtime"],
    keywords: [["how long", 3], ["hour", 3], ["minute", 3], ["playtime", 4], ["length", 3], ["finish", 1]],
    related: ["release-one", "chapter-acts"],
    link: { label: "Release 1 targets", href: "/game#chapter-one" },
    status: "planned",
  },
  {
    id: "release-one",
    topic: "release",
    question: "What is in Release 1?",
    answer: `Release 1 is ${RELEASE_ONE.name}: one realm (Stickerwood), ten areas, three launch heroes, Razz, about four pets, eight to twelve fish species, ten to twenty Frauds, the Overgrown Receipt mini-boss and King Wrongway. Co-op, day and night, weather, loot, relics and saving are in scope. Targets may change after prototyping.`,
    phrasings: ["what is in release 1", "what comes in the first release", "what is chapter 1", "what will launch include", "what content is in the first update", "what is the first release"],
    keywords: [["release 1", 4], ["first release", 4], ["release", 1], ["launch", 1], ["include", 2], ["content", 2], ["scope", 3], ["sign that lied", 3]],
    related: ["deferred", "heroes", "stickerwood"],
    link: { label: "Release 1 scope", href: "/game#chapter-one" },
    status: "planned",
  },
  {
    id: "deferred",
    topic: "release",
    question: "What is not in Release 1?",
    answer:
      "Saved for later updates: riding mounts (young creatures are teased first), trading, the full guild system, full alignment and factions, raids, big crafting, a player marketplace, flying mounts, other playable realms, and the Trickster, Lorekeeper and Badge Scout heroes. They're future content, not missing features.",
    phrasings: ["what is not in release 1", "what is coming later", "is trading in the game", "can i ride mounts", "are there raids", "is there a marketplace", "can you craft"],
    keywords: [["later", 2], ["not in", 2], ["trading", 3], ["trade", 3], ["mount", 3], ["ride", 3], ["raid", 3], ["crafting", 3], ["marketplace", 3], ["faction", 3], ["alignment", 3], ["flying", 3], ["deferred", 3]],
    related: ["roadmap", "release-one", "pets"],
    link: { label: "Update roadmap", href: "/updates#roadmap" },
    status: "planned",
  },
  {
    id: "loop",
    topic: "gameplay",
    question: "How do you play?",
    answer:
      "Explore, notice something wrong, investigate, expose the Fraud, then fight, solve or traverse what the truth opens up. You earn loot, grow your hero, and follow the bigger mystery the lie was hiding. Combat comes in peaks, not a constant grind.",
    phrasings: ["how do you play", "what is the gameplay", "what do you do in the game", "what is the gameplay loop", "how does the game work", "is there combat"],
    keywords: [["gameplay", 4], ["loop", 3], ["play", 1], ["combat", 2], ["fight", 2], ["explore", 2], ["mechanic", 2], ["work", 1]],
    related: ["lies", "coop", "progression"],
    link: { label: "The four-move loop", href: "/#enter-stickerwood" },
    status: "confirmed",
  },
  {
    id: "coop",
    topic: "gameplay",
    question: "Can I play with friends?",
    answer:
      "Yes, that's the plan: solo or co-op with up to four players, with shared encounters, shared bosses, revives and multiplayer-safe Frauds built in from the start rather than bolted on later.",
    phrasings: ["can i play with friends", "is it multiplayer", "how many players", "is there co-op", "can i play solo", "is it single player"],
    keywords: [["coop", 4], ["friend", 3], ["player", 2], ["solo", 3], ["squad", 3], ["single player", 3], ["party", 2], ["revive", 2], ["how many", 1]],
    related: ["loop", "heroes"],
    link: { label: "The game", href: "/game" },
    status: "planned",
  },
  {
    id: "lies",
    topic: "world-lies",
    question: curated("lies").question,
    answer:
      "The world itself can lie: signs, paths, bridges, chests, maps, objective markers, even people. A lying object is a Fraud. Every Fraud leaves readable evidence, usually at least two clues, and exposing it makes the false thing fracture and the truth appear. That's the signature system, The World Lies.",
    phrasings: ["why does the world lie", "what is the world lies", "what is a fraud", "how do frauds work", "how do investigations work", "what are frauds", "how do i find the lie"],
    keywords: [["lie", 3], ["fraud", 4], ["world lies", 4], ["investigation", 3], ["evidence", 2], ["clue", 2], ["mystery", 2], ["expose", 2], ["accuse", 2]],
    related: ["fairness", "first-fraud", "loop"],
    link: curated("lies").link ?? { label: "Try an investigation", href: "/#investigate" },
    status: "confirmed",
  },
  {
    id: "fairness",
    topic: "world-lies",
    question: "Is it fair if the world lies?",
    answer:
      "Yes. The rule is: the world may deceive you, but the game itself never cheats. Every Fraud has readable evidence. The interface, tutorials, rules and accessibility info are always reliable. Characters, including me, can be wrong. The game can't be unfair.",
    phrasings: ["is it fair", "is it fair if the world lies", "is it unfair that the world lies", "does the game cheat", "what if i cannot find the clue", "can the ui lie", "is it random"],
    keywords: [["fair", 5], ["world lies", 2], ["cheat", 3], ["unfair", 4], ["random", 2], ["guess", 2], ["reliable", 2]],
    related: ["lies", "first-fraud"],
    link: { label: "The World Lies", href: "/game#world-lies" },
    status: "confirmed",
  },
  {
    id: "first-fraud",
    topic: "world-lies",
    question: "What is the first Fraud?",
    answer:
      "Your first objective is to reach Rascal Plaza. At a crossroads the sign points right. Footprints and broken branches go left, birds react near the real route, a lantern flickers toward it, and the right path loops. I confidently say trust the sign. I'm wrong. You can try it on the homepage.",
    phrasings: ["what is the first fraud", "what is the sign that lied", "what happens at the crossroads", "what is the first mystery", "how does the first quest work"],
    keywords: [["first fraud", 5], ["sign", 3], ["crossroads", 4], ["first mystery", 4], ["first quest", 3], ["footprint", 3], ["sign that lied", 3]],
    related: ["lies", "fairness", "area-rascal-plaza"],
    link: { label: "Play the first mystery", href: "/#investigate" },
    status: "planned",
  },
  // ── Heroes (overview; each hero is generated below) ─────────────────────────
  {
    id: "heroes",
    topic: "heroes",
    question: curated("heroes").question,
    answer: curated("heroes").answer,
    phrasings: ["which hero should i pick", "who are the heroes", "what classes are there", "how many heroes are there", "who can i play as", "which characters are playable", "best hero"],
    keywords: [["hero", 3], ["class", 3], ["playable", 3], ["pick", 2], ["choose", 2], ["best", 1], ["launch hero", 3]],
    related: ["hero-crown-knight", "hero-glitchcaster", "hero-shadow-ranger"],
    link: curated("heroes").link ?? { label: "Meet the heroes", href: "/#heroes" },
    status: "planned",
  },
  {
    id: "future-heroes",
    topic: "heroes",
    question: "When do Trickster, Lorekeeper and Badge Scout arrive?",
    answer:
      "After Release 1, in later updates. The roadmap names v1.2 “Trickster Arrives” as the planned fourth-hero update. Lorekeeper and Badge Scout are canon heroes without an announced update yet. No dates for any of them.",
    phrasings: ["when is trickster coming", "are there more heroes", "future heroes", "new heroes later"],
    keywords: [["future hero", 4], ["more hero", 3], ["new hero", 3], ["later", 1]],
    related: ["heroes", "roadmap"],
    link: { label: "Update roadmap", href: "/updates#roadmap" },
    status: "planned",
  },
  // ── World ───────────────────────────────────────────────────────────────────
  {
    id: "stickerwood",
    topic: "world",
    question: curated("stickerwood").question,
    answer: curated("stickerwood").answer,
    phrasings: ["what is stickerwood", "what is the world like", "how big is the map", "how many areas are there", "where does the game take place", "what places can i explore", "list the areas"],
    keywords: [["stickerwood", 4], ["area", 3], ["map", 3], ["world", 2], ["realm", 2], ["explore", 1], ["open world", 3], ["place", 2], ["how big", 3]],
    related: ["area-starting-village", "area-king-wrongway-citadel", "future-realms"],
    link: curated("stickerwood").link ?? { label: "Open the atlas", href: "/#explore-stickerwood" },
    status: "planned",
  },
  {
    id: "future-realms",
    topic: "world",
    question: "Are there other realms besides Stickerwood?",
    answer:
      "Yes, but you can't go yet. Chapter 1 ends at a viewpoint where other realms and huge Crown fractures are visible but unreachable. Chapter 2 is planned as a new realm. No names or dates until they're real.",
    phrasings: ["are there other realms", "what is after stickerwood", "is there a chapter 2", "will there be more worlds", "what lies beyond"],
    keywords: [["other realm", 5], ["chapter 2", 5], ["beyond", 3], ["more world", 3], ["next realm", 4], ["after stickerwood", 4]],
    related: ["roadmap", "stickerwood"],
    link: { label: "What lies beyond", href: "/#beyond" },
    status: "planned",
  },
  // ── Characters and enemies ──────────────────────────────────────────────────
  {
    id: "razz",
    topic: "razz",
    question: "Who is Razz?",
    answer:
      "Me! A chunky purple box-shaped troublemaker with a lime crown, one normal eye and one glitchy segmented one. I'm your companion, guide and comic relief, and I survived one of the Crown's edits, so I can see where reality was rewritten. I'm also sometimes wrong. And no, I'm not playable.",
    phrasings: ["who is razz", "who are you", "what are you", "is razz playable", "can i play as razz", "tell me about razz", "are you a fox"],
    keywords: [["razz", 4], ["you", 1], ["mascot", 3], ["companion", 3], ["guide", 2], ["fox", 3]],
    related: ["first-fraud", "assistant"],
    link: { label: "Razz on the game page", href: "/game" },
    status: "confirmed",
  },
  {
    id: "wrongway",
    topic: "wrongway",
    question: curated("wrongway").question,
    answer: curated("wrongway").answer,
    phrasings: ["who is king wrongway", "who is the villain", "who is the final boss", "how do you beat wrongway", "what does wrongway do", "tell me about the boss"],
    keywords: [["wrongway", 5], ["king", 3], ["villain", 3], ["boss", 3], ["final boss", 4], ["antagonist", 3]],
    related: ["receipt", "enemies", "area-king-wrongway-citadel"],
    link: curated("wrongway").link ?? { label: "Face him", href: "/#king-wrongway" },
    status: "concept",
  },
  {
    id: "receipt",
    topic: "wrongway",
    question: "What is the Overgrown Receipt?",
    answer:
      "Chapter 1's first mini-boss, waiting in the Crown Ruins. It introduces boss fights: telegraphed patterns, environmental mechanics and better loot, as practice before King Wrongway.",
    phrasings: ["what is the overgrown receipt", "is there a mini boss", "what is the first boss"],
    keywords: [["overgrown receipt", 6], ["receipt", 5], ["mini boss", 5], ["miniboss", 5], ["first boss", 4]],
    related: ["wrongway", "area-crown-ruins"],
    link: { label: "Crown Ruins in the atlas", href: "/#explore-stickerwood" },
    status: "planned",
  },
  {
    id: "enemies",
    topic: "wrongway",
    question: "What enemies are there?",
    answer:
      "Release 1 has Crown Sprouts (basic melee, they teach combat), Glitch Slimes (corrupted, can split and move unpredictably) and Lost Stickers (fast and mischievous), plus planned Crown-Touched versions of existing creatures. Bosses are the Overgrown Receipt and King Wrongway.",
    phrasings: ["what enemies are there", "what monsters are in the game", "what do i fight", "what is a crown sprout", "what is a glitch slime"],
    keywords: [["enemy", 4], ["monster", 4], ["crown sprout", 5], ["glitch slime", 5], ["lost sticker", 5], ["creature", 2], ["fight", 1]],
    related: ["wrongway", "loop"],
    link: { label: "Opposition", href: "/game" },
    status: "planned",
  },
  // ── Systems ─────────────────────────────────────────────────────────────────
  {
    id: "progression",
    topic: "systems",
    question: "How does progression work?",
    answer:
      "You grow through hero level, abilities, weapon upgrades, starter equipment, relics with strange passives, pet bonding, exploration and collectibles. No enormous skill trees in Release 1. It's concept design, not a finished system.",
    phrasings: ["how do i level up", "how does progression work", "is there leveling", "are there skill trees", "how do heroes get stronger", "what are relics"],
    keywords: [["progression", 4], ["level", 3], ["skill tree", 4], ["upgrade", 3], ["stronger", 3], ["relic", 3], ["gear", 3], ["weapon upgrade", 3], ["xp", 3]],
    related: ["currencies", "loot", "pets"],
    link: { label: "Growing stronger", href: "/#quests" },
    status: "concept",
  },
  {
    id: "currencies",
    topic: "systems",
    question: "What currencies are there?",
    answer:
      "Three, on purpose: Gold for shops and everyday upgrades, Crown Shards as the main progression resource from story, bosses and exposed Frauds, and gems and crystals as upgrade materials. No overloaded currency bar.",
    phrasings: ["what currencies are there", "what is gold used for", "what are crown shards", "how do i earn money in game"],
    keywords: [["currency", 5], ["gold", 4], ["crown shard", 5], ["shard", 4], ["gem", 4], ["crystal", 3], ["in game money", 3], ["earn", 1]],
    related: ["progression", "monetisation"],
    link: { label: "Growing stronger", href: "/#quests" },
    status: "planned",
  },
  {
    id: "loot",
    topic: "systems",
    question: "What loot is there?",
    answer:
      "Weapons, equipment, Gold, Crown Shards, gems, materials, relic fragments, keys, pet food, fishing items, cosmetics, lore items and mystery items. Some are deliberately weird, like a Broken Compass that points toward nearby Frauds and a Wrongway Token nobody can explain yet.",
    phrasings: ["what loot is there", "what items are in the game", "are there chests", "what weird items are there"],
    keywords: [["loot", 5], ["item", 3], ["chest", 3], ["broken compass", 5], ["whispering lantern", 5], ["wrongway token", 5], ["reward", 2]],
    related: ["progression", "currencies"],
    link: { label: "The game", href: "/game" },
    status: "concept",
  },
  {
    id: "pets",
    topic: "systems",
    question: "Are there pets?",
    answer:
      "Yes, about four companions at launch. They follow you, react, can be petted and fed, and build trust that unlocks small helpful abilities. They grow from Young to Bonded to Growing. Riding comes in a later update: they're still too young to carry a Rascal.",
    phrasings: ["are there pets", "can i have a pet", "what do pets do", "can pets grow", "how many pets"],
    keywords: [["pet", 5], ["companion", 2], ["bond", 3], ["feed", 2], ["creature", 1], ["animal", 3]],
    related: ["fishing", "deferred"],
    link: { label: "Pets & Fishing quests", href: "/#quests" },
    status: "planned",
  },
  {
    id: "fishing",
    topic: "systems",
    question: "Is there fishing?",
    answer:
      "Yes, a small starter system: a rod, a simple skill mechanic, a few fishing spots, sizes and rarities, a collection journal, and eight to twelve species including at least one Crownfall-corrupted fish. v1.1 “Waters of Stickerwood” is the planned fishing expansion.",
    phrasings: ["is there fishing", "can i fish", "how many fish are there", "what is the fish journal"],
    keywords: [["fish", 5], ["fishing", 5], ["rod", 3], ["catch", 2], ["river", 1]],
    related: ["pets", "area-river-path"],
    link: { label: "River Path in the atlas", href: "/#explore-stickerwood" },
    status: "planned",
  },
  {
    id: "quests",
    topic: "systems",
    question: "What kinds of quests are there?",
    answer:
      "Main Story, Mystery Cases, Side Quests, Exploration, Pets and Fishing quests, and Hidden Quests. Release 1 targets 8 to 12 main quests, 8 to 15 side quests and 10 to 20 Fraud encounters.",
    phrasings: ["what quests are there", "how many quests", "are there side quests", "what are mystery cases"],
    keywords: [["quest", 5], ["mission", 3], ["side quest", 5], ["mystery case", 5], ["hidden quest", 5]],
    related: ["loop", "first-fraud"],
    link: { label: "The quest journal", href: "/#quests" },
    status: "planned",
  },
  {
    id: "world-sim",
    topic: "systems",
    question: "Is there day, night and weather?",
    answer:
      "Yes: sunrise, day, sunset and night, plus clear, cloudy, light rain and storm atmosphere. Night can change which fish, creatures and secrets appear.",
    phrasings: ["is there day and night", "is there weather", "does it rain"],
    keywords: [["day", 2], ["night", 4], ["weather", 5], ["rain", 4], ["storm", 3], ["sunset", 3]],
    related: ["fishing", "stickerwood"],
    link: { label: "The game", href: "/game" },
    status: "planned",
  },
  {
    id: "monetisation",
    topic: "release",
    question: "Is it free? Is it pay-to-win?",
    answer:
      "Pricing hasn't been announced. The stated direction is to earn trust first: long-term Robux items lean toward cosmetics like skins, emotes and effects, not pay-to-win power.",
    phrasings: ["is it free", "how much does it cost", "is it pay to win", "will there be robux purchases", "is there a price", "microtransactions"],
    keywords: [["price", 5], ["free", 4], ["cost", 4], ["pay to win", 6], ["robux", 4], ["microtransaction", 5], ["buy", 2], ["cosmetic", 3]],
    related: ["release-date", "status"],
    link: { label: "Project status", href: "/status" },
    status: "unannounced",
  },
  // ── Release, status and updates ─────────────────────────────────────────────
  {
    id: "status",
    topic: "release",
    question: curated("status").question,
    answer: curated("status").answer,
    phrasings: ["can i play it yet", "can i play it now", "can i play it right now", "is the game out", "is it playable", "can i download it", "where can i play", "is it on roblox yet", "is there a demo"],
    keywords: [["play", 1], ["out", 2], ["playable", 2], ["available", 3], ["download", 3], ["demo", 3], ["yet", 2], ["now", 1]],
    related: ["release-date", "playtest", "updates"],
    link: curated("status").link ?? { label: "See the updates", href: "/updates" },
    status: "confirmed",
  },
  {
    id: "release-date",
    topic: "release",
    question: "When is the release date?",
    answer:
      "Not announced or decided yet. There's no release date, launch window or countdown. When there is one it will be announced on the Updates page first, and I won't guess before then.",
    phrasings: ["when is the release date", "when does it come out", "when will it launch", "when is launch", "release date", "what year does it release", "when can i play"],
    keywords: [["release date", 6], ["when", 2], ["come out", 4], ["release", 2], ["launch date", 5], ["date", 3], ["year", 2], ["month", 2], ["soon", 2]],
    related: ["status", "updates", "playtest"],
    link: { label: "Updates and announcements", href: "/updates" },
    status: "unannounced",
  },
  {
    id: "platform",
    topic: "release",
    question: "What platforms will it be on?",
    answer:
      "It's being built for Roblox. The inventory and interface are planned to work on desktop, controller and mobile. Anything beyond that hasn't been announced.",
    phrasings: ["what platforms", "is it on mobile", "can i play on xbox", "is it on playstation", "can i use a controller", "is it on pc", "is it on switch"],
    keywords: [["platform", 5], ["mobile", 4], ["phone", 3], ["controller", 4], ["pc", 4], ["console", 4], ["xbox", 4], ["playstation", 4], ["switch", 3], ["roblox", 2], ["ipad", 3], ["tablet", 3]],
    related: ["status", "accessibility"],
    link: { label: "The game", href: "/game" },
    status: "planned",
  },
  {
    id: "playtest",
    topic: "community",
    question: "Is there a beta or playtest?",
    answer:
      "Not yet. Send an honest review on the Community page to join the Founding QA candidate pool. When playtesting opens, candidates may be invited in small groups. Joining the pool isn't a guaranteed invite, and there's no date.",
    phrasings: ["is there a beta", "how do i playtest", "can i test the game", "how do i get early access", "is there alpha access", "sign up for beta"],
    keywords: [["beta", 5], ["playtest", 5], ["alpha", 4], ["early access", 5], ["test", 3], ["tester", 4], ["sign up", 3]],
    related: ["review", "status"],
    link: { label: "Review the game", href: "/community#review" },
    status: "unannounced",
  },
  {
    id: "dev-status",
    topic: "release",
    question: "What stage is development at?",
    answer:
      "Phase 1, Foundation: canon, Release 1 scope, art direction, concept art, the teaser and this site. Next is a small prototype with one Stickerwood area, Crown Knight, me, a Crown Sprout, basic combat and the first Fraud sign. No playable build exists yet.",
    phrasings: ["what stage is development at", "how far along is the game", "is it being developed", "what is being worked on", "is the game dead", "development progress"],
    keywords: [["development", 4], ["progress", 3], ["stage", 3], ["phase", 4], ["prototype", 4], ["far along", 4], ["working on", 3], ["dead", 2], ["vertical slice", 5]],
    related: ["status", "updates", "devlog"],
    link: { label: "Project status", href: "/status" },
    status: "confirmed",
  },
  {
    id: "updates",
    topic: "updates",
    question: "Where do announcements come out?",
    answer:
      "On the Updates page first: chapter announcements, reveals, patch notes, events and devlogs, each major update with its own trailer. The Rascal Labs Discord gets them too.",
    phrasings: ["where are the announcements", "where do i get news", "how do i follow updates", "where is the news", "patch notes"],
    keywords: [["update", 3], ["announcement", 5], ["news", 5], ["patch note", 5], ["follow", 3], ["trailer", 2]],
    related: ["roadmap", "teaser", "community"],
    link: { label: "Updates and announcements", href: "/updates" },
    status: "confirmed",
  },
  {
    id: "roadmap",
    topic: "updates",
    question: "What updates are planned after Release 1?",
    answer: `Planned, undated: ${UPDATE_ROADMAP.filter((item) => item.version !== "v1.0")
      .map((item) => `${item.version} ${item.title}`)
      .join(", ")}. Each gets its own reveal when it's real.`,
    phrasings: ["what is the roadmap", "what updates are planned", "what comes after release 1", "future updates", "what is v1.1"],
    keywords: [["roadmap", 6], ["future update", 5], ["planned update", 5], ["after release", 4], ["v1", 3], ["next update", 4]],
    related: ["updates", "future-realms", "future-heroes"],
    link: { label: "Update roadmap", href: "/updates#roadmap" },
    status: "planned",
  },
  {
    id: "teaser",
    topic: "updates",
    question: "Is the teaser real gameplay?",
    answer:
      "No. The teaser is pre-production cinematic art that sets the tone the Roblox build is aiming for. It isn't in-game footage. The same goes for the concept art around the site.",
    phrasings: ["is the teaser real gameplay", "is that gameplay footage", "is the trailer in game", "is the art final"],
    keywords: [["teaser", 5], ["trailer", 4], ["footage", 5], ["cinematic", 4], ["concept art", 4], ["final", 2], ["real", 1]],
    related: ["updates", "dev-status"],
    link: { label: "Watch the teaser", href: "/" },
    status: "confirmed",
  },
  {
    id: "devlog",
    topic: "updates",
    question: "Is there a development log?",
    answer: "Yes. The devlog explains what changed, why, and what still needs evidence from real players. It separates concept work from confirmed work.",
    phrasings: ["is there a devlog", "where is the development log", "dev diary"],
    keywords: [["devlog", 6], ["dev log", 6], ["development log", 6], ["diary", 3], ["blog", 3]],
    related: ["updates", "dev-status"],
    link: { label: "Read the devlog", href: "/devlog" },
    status: "confirmed",
  },
  // ── Community ───────────────────────────────────────────────────────────────
  {
    id: "community",
    topic: "community",
    question: curated("help").question,
    answer: curated("help").answer,
    phrasings: ["how do i help", "how do i join", "is there a discord", "where is the community", "how can i get involved", "discord link"],
    keywords: [["help", 2], ["join", 3], ["discord", 5], ["community", 4], ["involved", 3], ["server", 2], ["rascal labs", 3]],
    related: ["review", "guild", "playtest"],
    link: curated("help").link ?? { label: "Join Rascal Labs", href: "/#join-rascal-labs" },
    status: "confirmed",
  },
  {
    id: "review",
    topic: "community",
    question: "How do I send a review?",
    answer:
      "Use the review form on the Community page. Tell us what pulls you in, what's unclear and one change you'd make. A person reads it. Useful reviews join the Founding QA candidate pool and get a Scout ID, badge and certificate. That's recognition, not a job, payment or guaranteed invite.",
    phrasings: ["how do i send a review", "how do i give feedback", "what is the founding qa", "what is a qa scout", "how do i get the badge", "what is the certificate"],
    keywords: [["review", 5], ["feedback", 5], ["qa", 5], ["scout", 3], ["badge", 3], ["certificate", 4], ["candidate pool", 5]],
    related: ["playtest", "guild"],
    link: { label: "Review the game", href: "/community#review" },
    status: "confirmed",
  },
  {
    id: "guild",
    topic: "community",
    question: "What is the Founders Guild?",
    answer:
      "The real team side of Rascal Labs: builders, artists, engineers, composers, writers and community leads can apply on the Community page. A person reads every application. It's not an employment offer; scope, credit, ownership and pay are agreed in writing before any work. (The in-game guild system is a separate, later feature.)",
    phrasings: ["what is the founders guild", "can i work on the game", "are you hiring", "can i join the team", "do you pay", "is there a job"],
    keywords: [["founders guild", 6], ["guild", 3], ["hiring", 5], ["job", 5], ["work on", 4], ["team", 3], ["apply", 4], ["developer", 3], ["salary", 5], ["volunteer", 3]],
    related: ["community", "review"],
    link: { label: "Apply to the Guild", href: "/community#guild" },
    status: "confirmed",
  },
  {
    id: "creators",
    topic: "community",
    question: "Who is making the game?",
    answer:
      "Rascal Labs, an independent community building it in the open. The website credit goes to SPYLEAN. It isn't affiliated with or endorsed by Roblox or Discord.",
    phrasings: ["who made this", "who is making the game", "who is the developer", "who is spylean", "who owns rascal realms"],
    keywords: [["who made", 5], ["who is making", 5], ["creator", 4], ["developer", 2], ["studio", 4], ["spylean", 6], ["owner", 3]],
    related: ["community", "guild"],
    link: { label: "Join Rascal Labs", href: "/#join-rascal-labs" },
    status: "confirmed",
  },
  {
    id: "rank-rascal",
    topic: "community",
    question: "What happened to the Rank Rascal bot?",
    answer:
      "It's paused. Installation is closed while the team focuses on the game, and preserved bot data stays covered by the privacy policy and deletion process.",
    phrasings: ["what happened to rank rascal", "is the discord bot working", "can i add the bot"],
    keywords: [["rank rascal", 6], ["bot", 5], ["discord bot", 6]],
    related: ["community"],
    link: { label: "Bot archive", href: "/invite" },
    status: "confirmed",
  },
  // ── Safety, accessibility, privacy ──────────────────────────────────────────
  {
    id: "safety",
    topic: "safety",
    question: "Is the community safe?",
    answer:
      "The fiction can be tense, but the community stays respectful: critique work, not people; no harassment, scams or sharing private info; the forms are 13+ and reviewed by people. If someone is in danger, contact a trusted adult or local emergency services.",
    phrasings: ["is it safe", "what are the rules", "what age is it for", "how do i report someone", "is it for kids"],
    keywords: [["safe", 4], ["safety", 5], ["rule", 3], ["age", 4], ["13", 4], ["report", 4], ["harass", 4], ["kid", 3], ["bully", 4]],
    related: ["privacy", "accessibility"],
    link: { label: "Community safety", href: "/safety" },
    status: "confirmed",
  },
  {
    id: "accessibility",
    topic: "safety",
    question: "Will it be accessible?",
    answer:
      "Accessibility is part of the plan: accessibility information is always reliable even when the world lies, Frauds use readable evidence rather than guesswork, and the interface is planned for desktop, controller and mobile. Specific settings haven't been announced yet. This site supports keyboard use and reduced motion.",
    phrasings: ["is it accessible", "are there accessibility options", "is there colorblind mode", "subtitles", "reduced motion"],
    keywords: [["accessible", 5], ["accessibility", 6], ["colorblind", 5], ["subtitle", 4], ["caption", 4], ["disability", 4], ["reduced motion", 4]],
    related: ["safety", "platform"],
    link: { label: "Safety and support", href: "/support" },
    status: "planned",
  },
  {
    id: "privacy",
    topic: "safety",
    question: "Do you store what I type here?",
    answer:
      "No. I run entirely in your browser: your questions are matched against the Crownfall canon on your device and aren't sent to the website's servers or to any AI provider. Please don't type personal details anyway.",
    phrasings: ["do you store my questions", "is this chat private", "where do my messages go", "do you save what i type", "privacy"],
    keywords: [["privacy", 5], ["store", 3], ["save", 3], ["private", 4], ["data", 3], ["track", 3], ["message", 1]],
    related: ["assistant", "safety"],
    link: { label: "Privacy policy", href: "/privacy" },
    status: "confirmed",
  },
  {
    id: "assistant",
    topic: "razz",
    question: "Are you an AI?",
    answer:
      "No. I'm a scripted guide with a very organised book of Crownfall canon. I match your question to answers the team wrote, right here in your browser. If it isn't in the book, I'll tell you it hasn't been announced or decided yet instead of making something up.",
    phrasings: ["are you an ai", "are you a bot", "are you real", "are you chatgpt", "how do you work", "are you a person"],
    keywords: [["ai", 5], ["chatgpt", 5], ["robot", 3], ["real person", 4], ["human", 3], ["how do you work", 5], ["bot", 1]],
    related: ["razz", "privacy"],
    link: { label: "Privacy policy", href: "/privacy" },
    status: "confirmed",
  },
];

const HERO_ENTRIES: CanonEntry[] = PLAYER_ROLES.map((hero) => {
  const name = hero.name.toLowerCase();
  const launch = hero.release === "launch";
  return {
    id: `hero-${slug(hero.name)}`,
    topic: `hero:${slug(hero.name)}`,
    question: `Who is ${hero.name}?`,
    answer: `${hero.name} is a ${hero.role.toLowerCase()} who fights with the ${hero.weapon}. ${hero.combat} In investigations: ${hero.mysterySpecialty} Powers: ${hero.powers.join(", ")}. ${
      launch ? "A Release 1 launch hero." : "A canon hero arriving in a later update, not at launch."
    } No final character model exists yet.`,
    phrasings: [`who is ${name}`, `tell me about ${name}`, `what does ${name} do`, `what weapon does ${name} use`, `is ${name} playable`, `what are ${name} powers`],
    keywords: [[name, 6], ...hero.name.toLowerCase().split(" ").map((part) => [part, 2] as const), ["weapon", 1], ["power", 1], ["ability", 1]],
    related: launch ? ["heroes", "progression"] : ["future-heroes", "heroes"],
    link: { label: "Hero selector", href: "/#heroes" },
    status: launch ? "planned" : "concept",
  };
});

const AREA_ENTRIES: CanonEntry[] = WORLD_LOCATIONS.map((area, index) => {
  const name = area.name.toLowerCase();
  const next = WORLD_LOCATIONS[index + 1];
  return {
    id: `area-${slug(area.name)}`,
    topic: `area:${slug(area.name)}`,
    question: `What is ${area.name}?`,
    answer: `${area.name} (${area.chapterRole}): ${area.description} ${area.changes}`,
    phrasings: [`what is ${name}`, `tell me about ${name}`, `where is ${name}`, `what happens in ${name}`, `what is in ${name}`],
    keywords: [[name, 6], ...name.split(" ").filter((part) => part.length > 3).map((part) => [part, 2] as const)],
    related: [next ? `area-${slug(next.name)}` : "wrongway", "stickerwood"],
    link: { label: "Open the atlas", href: "/#explore-stickerwood" },
    status: "planned",
  };
});

export const RAZZ_CANON: readonly CanonEntry[] = [...HANDWRITTEN, ...HERO_ENTRIES, ...AREA_ENTRIES];

/** Quick questions shown in the drawer, by canon id. */
export const QUICK_QUESTION_IDS = ["stickerwood", "lies", "heroes", "wrongway", "status", "community"] as const;
