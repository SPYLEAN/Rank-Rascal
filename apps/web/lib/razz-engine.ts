import { QUICK_QUESTION_IDS, RAZZ_CANON, type CanonEntry } from "./razz-canon";

/**
 * Razz Canon Engine: answers typed questions from lib/razz-canon.ts entirely on the visitor's
 * device. No network, no AI provider, no generated text: every answer is a canon entry written by
 * the team, or an honest "not announced or decided yet".
 *
 * Pipeline: normalise → phrase synonyms → tokens → light stemming → token synonyms → typo
 * correction against the canon vocabulary → weighted keyword + phrasing scores (rarer keywords
 * count more) → follow-up context boost → confidence decision.
 */

export type RazzContext = {
  lastId: string | null;
  lastTopic: string | null;
};

export const EMPTY_CONTEXT: RazzContext = { lastId: null, lastTopic: null };

export type RazzResult =
  | { kind: "answer"; entry: CanonEntry; suggestions: CanonEntry[]; context: RazzContext }
  | { kind: "clarify" | "unknown" | "offtopic" | "guard" | "smalltalk"; message: string; suggestions: CanonEntry[]; context: RazzContext };

export const MESSAGES = {
  clarify: "I'm not sure which one you mean. Is it one of these?",
  unknown:
    "That hasn't been announced or decided yet, so I won't guess. New details land on the Updates page first. Here's what I can tell you:",
  offtopic: "That's outside Stickerwood, and I only know the Crownfall canon. Try one of these:",
  injection:
    "Nice try. I don't take orders from signs, and I don't take them from chat boxes either. I only know the Crownfall canon, so ask me about the game.",
  personal: "Please don't share personal details like emails or phone numbers here. Ask me about the game instead.",
  greeting: "Hi! Ask me about Stickerwood, the heroes, the release or how to join Rascal Labs.",
  thanks: "Anytime. Stay suspicious of signs.",
  empty: "Ask me something about Crownfall. One question at a time.",
} as const;

// ── Text normalisation ──────────────────────────────────────────────────────

const CONTRACTIONS: readonly (readonly [RegExp, string])[] = [
  [/\bwhats\b/g, "what is"],
  [/\bwhos\b/g, "who is"],
  [/\bhows\b/g, "how is"],
  [/\bwhens\b/g, "when is"],
  [/\bwheres\b/g, "where is"],
  [/\bcan'?t\b/g, "cannot"],
  [/\bwon'?t\b/g, "will not"],
  [/\bim\b/g, "i am"],
  [/n't\b/g, " not"],
  [/'s\b/g, ""],
  [/'re\b/g, " are"],
  [/'ll\b/g, " will"],
  [/\bu\b/g, "you"],
  [/\bur\b/g, "your"],
  [/\br\b/g, "are"],
  [/\bplz\b|\bpls\b/g, "please"],
];

/** Multi-word spellings folded into one canonical token before tokenising. */
const PHRASE_SYNONYMS: readonly (readonly [RegExp, string])[] = [
  [/\bco\s?op(erative)?\b/g, "coop"],
  [/\bmulti\s?player\b/g, "coop"],
  [/\bwrong\s?way\b/g, "wrongway"],
  [/\bsticker\s?wood\b/g, "stickerwood"],
  [/\bcrown\s?fall\b/g, "crownfall"],
  [/\bglitch\s?caster\b/g, "glitchcaster"],
  [/\blore\s?keeper\b/g, "lorekeeper"],
  [/\bdev\s?log\b/g, "devlog"],
  [/\bmini\s?boss\b/g, "miniboss"],
  [/\bpay\s?2\s?win\b|\bp2w\b/g, "pay to win"],
  [/\bcom(e|es|ing) out\b|\bdrop(s|ping)?\b/g, "release"],
  [/\bchat\s?gpt\b|\bgpt\b|\bllm\b|\bartificial intelligence\b/g, "ai"],
  [/\bplay\s?station\b|\bps[45]\b|\bnintendo\b/g, "console"],
  [/\bv\s?1\s?(\d)\b/g, "v1"],
];

/** Single-token synonyms, applied after stemming. Keys and values are stems. */
const TOKEN_SYNONYMS: Record<string, string> = {
  launch: "releas",
  launched: "releas",
  antagonist: "villain",
  baddie: "villain",
  monster: "enemy",
  mob: "enemy",
  baddy: "enemy",
  class: "hero",
  character: "hero",
  champion: "hero",
  zone: "area",
  region: "area",
  location: "area",
  place: "area",
  biome: "area",
  pricing: "price",
  cost: "price",
  money: "price",
  pric: "price",
  xbox: "console",
  switch: "console",
  phone: "mobile",
  ios: "mobile",
  android: "mobile",
  computer: "pc",
  laptop: "pc",
  news: "announcement",
  announc: "announcement",
  blog: "devlog",
  fishin: "fish",
  gamepad: "controller",
  fibs: "lie",
  lying: "lie",
  liar: "lie",
  fake: "fraud",
  deceiv: "lie",
  decept: "lie",
  hir: "hiring",
  salary: "job",
  wage: "job",
  paid: "pay",
  discrod: "discord",
  bot: "bot",
  robot: "ai",
};

const STEM_EXCEPTIONS = new Set(["news", "status", "chaos", "this", "is", "was", "has", "does", "yes", "bus", "plus", "bonus", "always", "across", "vs", "its", "his", "ps", "us", "gas", "boss", "less", "canvas"]);

const STOPWORDS = new Set(
  "a an the is are was were be been am do does did i you me my your it its this that these those of to in on at for with and or but can could will would should shall may might there here what how who whom whose when where why which about tell please any some get got have has had just so like know want also me us we our they them their he she him her his hers as by from into if then than too very really".split(" "),
);

const ANAPHORA = new Set(["he", "she", "it", "they", "his", "her", "its", "their", "them", "him", "that", "this", "there", "those", "one"]);

/** Everyday words that are never "typos" and never mark a question as being about the game. */
const COMMON_WORDS = new Set(
  "right light might night fight write where there their which would could should about other think thing world first great still never every today maybe these those place people time year good well best new old big small long short right now then really thank today tomorrow yesterday tonight morning evening week month london paris city country school work home house food music movie movies song songs sport sports team teams football soccer cricket basketball weather news".split(
    " ",
  ),
);

/** Everyday intents that are clearly outside Stickerwood, even when they share a word with the canon. */
const OFF_TOPIC = [
  /\bweather (in|at|for|today|tomorrow|this)\b|\bforecast\b/,
  /\bworld cup\b|\bfootball\b|\bsoccer\b|\bcricket\b|\bnba\b|\bnfl\b|\bolympic/,
  /\bhomework\b|\bmath\b|\bequation\b|\bessay\b/,
  /\bcapital of\b|\bpresident\b|\bprime minister\b|\belection\b/,
  /\bjoke\b|\bpoem\b|\bstory about\b|\brecipe\b/,
  /\bstock\b|\bcrypto\b|\bbitcoin\b/,
];

/** Names that always mean the question is about the game. */
const GAME_NAMES = /\b(crownfall|rascal|stickerwood|razz|wrongway|glitchcaster|lorekeeper|roblox)\b/;

function stem(word: string): string {
  if (word.length <= 3 || STEM_EXCEPTIONS.has(word) || /\d/.test(word)) return word;
  let w = word;
  if (w.endsWith("ies") && w.length > 4) w = `${w.slice(0, -3)}y`;
  else if (w.endsWith("ing") && w.length > 5) w = w.slice(0, -3);
  else if (w.endsWith("ed") && w.length > 4) w = w.slice(0, -2);
  else if (/(sh|ch|x|ss)es$/.test(w)) w = w.slice(0, -2);
  else if (w.endsWith("s") && !w.endsWith("ss")) w = w.slice(0, -1);
  if (w.endsWith("e") && w.length > 4) w = w.slice(0, -1);
  return w;
}

/** Lowercase, strip accents and punctuation, expand contractions. No synonym folding. */
function basicNormalise(text: string): string {
  let s = text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[‘’ʼ`]/g, "'");
  for (const [pattern, replacement] of CONTRACTIONS) s = s.replace(pattern, replacement);
  return s.replace(/[^a-z0-9'\s-]/g, " ").replace(/['-]/g, " ").replace(/\s+/g, " ").trim();
}

export function normalise(text: string): string {
  let s = basicNormalise(text);
  for (const [pattern, replacement] of PHRASE_SYNONYMS) s = s.replace(pattern, replacement);
  return s.replace(/\s+/g, " ").trim();
}

function canonical(word: string): string {
  const stemmed = stem(word);
  return TOKEN_SYNONYMS[word] ?? TOKEN_SYNONYMS[stemmed] ?? stemmed;
}

function toTokens(normalised: string): string[] {
  return normalised.split(" ").filter(Boolean).map(canonical);
}

/** Tokens for canon text (keywords and phrasings), with no typo correction. */
function canonTokens(text: string): string[] {
  return toTokens(normalise(text));
}

// ── Typo tolerance ──────────────────────────────────────────────────────────

/** Optimal string alignment distance (Levenshtein plus adjacent swaps), capped for speed. */
function editDistance(a: string, b: string, cap: number): number {
  if (Math.abs(a.length - b.length) > cap) return cap + 1;
  const rows = a.length + 1;
  const cols = b.length + 1;
  const d: number[][] = Array.from({ length: rows }, (_, i) => Array.from({ length: cols }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)));
  for (let i = 1; i < rows; i++) {
    let rowMin = Infinity;
    for (let j = 1; j < cols; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let value = Math.min(d[i - 1]![j]! + 1, d[i]![j - 1]! + 1, d[i - 1]![j - 1]! + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) value = Math.min(value, d[i - 2]![j - 2]! + 1);
      d[i]![j] = value;
      rowMin = Math.min(rowMin, value);
    }
    if (rowMin > cap) return cap + 1;
  }
  return d[a.length]![b.length]!;
}

// ── Index ───────────────────────────────────────────────────────────────────

type IndexedKeyword = { tokens: string[]; weight: number };
type IndexedEntry = {
  entry: CanonEntry;
  keywords: IndexedKeyword[];
  phrasings: Set<string>[];
};

const contentOf = (tokens: string[]) => new Set(tokens.filter((token) => !STOPWORDS.has(token)));

const INDEX: IndexedEntry[] = RAZZ_CANON.map((entry) => ({
  entry,
  keywords: entry.keywords.map((keyword) => {
    const [text, weight] = typeof keyword === "string" ? [keyword, 1] : keyword;
    return { tokens: canonTokens(text), weight };
  }),
  phrasings: [entry.question, ...entry.phrasings].map((phrase) => contentOf(canonTokens(phrase))),
}));

const BY_ID = new Map(RAZZ_CANON.map((entry) => [entry.id, entry]));

/** How many entries use each keyword; shared keywords are worth less. */
const KEYWORD_FREQUENCY = new Map<string, number>();
for (const item of INDEX) {
  for (const key of new Set(item.keywords.map((k) => k.tokens.join(" ")))) {
    KEYWORD_FREQUENCY.set(key, (KEYWORD_FREQUENCY.get(key) ?? 0) + 1);
  }
}

const VOCABULARY = new Set<string>();
for (const item of INDEX) {
  item.keywords.forEach((k) => k.tokens.forEach((t) => VOCABULARY.add(t)));
  item.phrasings.forEach((p) => p.forEach((t) => VOCABULARY.add(t)));
}

/** Unstemmed canon words → their canonical token, so typos are compared before stemming mangles them. */
const RAW_VOCABULARY = new Map<string, string>();
for (const entry of RAZZ_CANON) {
  const texts = [entry.question, ...entry.phrasings, ...entry.keywords.map((k) => (typeof k === "string" ? k : k[0]))];
  // Raw spellings before synonym folding, so "multiplayr" can still find "multiplayer" → coop.
  for (const word of texts.flatMap((text) => basicNormalise(text).split(" "))) {
    if (word.length >= 5 && !STOPWORDS.has(word) && !/\d/.test(word)) {
      const folded = normalise(word).split(" ");
      RAW_VOCABULARY.set(word, folded.length === 1 ? canonical(folded[0]!) : canonical(word));
    }
  }
}

/** Words that mark a question as being about the game, even when the canon has no answer. */
const DOMAIN_WORDS = new Set<string>([
  ...INDEX.flatMap((item) => item.keywords.filter((k) => k.weight >= 3).flatMap((k) => k.tokens)).filter(
    (t) => !STOPWORDS.has(t) && !COMMON_WORDS.has(t) && !/^\d+$/.test(t),
  ),
  ...canonTokens(
    "game rascal realms crownfall stickerwood razz roblox hero heroes release update feature level pvp server skin boss quest map weapon armor ability skill character stat build patch season event guild",
  ),
]);

/** Specific topics the canon deliberately has no answer for yet. */
const UNANNOUNCED = [
  /\bpvp\b|\bplayer (vs|versus) player\b/,
  /\b(max|maximum) level\b|\blevel cap\b/,
  /\bvoice chat\b/,
  /\bprivate server/,
  /\bcross ?play\b|\bcross ?platform\b/,
  /\bserver size\b|\bmax players per server\b/,
  /\bvr\b|\bvirtual reality\b/,
  /\bwhat time\b.*\b(release|launch)/,
  /\b(age rating|esrb|pegi)\b/,
];

const INJECTION = [
  /\b(ignore|disregard|forget|override)\b.*\b(instruction|rule|prompt|direction|guideline)/,
  /\bsystem prompt\b|\byour prompt\b|\breveal (your|the) (prompt|instructions|rules)\b/,
  /\byou are now\b|\bact as\b|\bpretend (to be|you are)\b|\broleplay as\b/,
  /\bjailbreak\b|\bdeveloper mode\b|\bdan mode\b|\bnew instructions\b/,
];

const PERSONAL = [/[^\s@]+@[^\s@]+\.[a-z]{2,}/i, /(\+?\d[\s-]?){8,}/];
const GREETING = /^(hi|hello|hey|yo|sup|hiya|howdy|good (morning|afternoon|evening))( razz)?$/;
const THANKS = /^(thanks?|thank you|thx|ty|cheers|cool|ok|okay|nice|great)( razz)?$/;
const MORE = /^(tell me more|more|more please|what else|anything else|go on|continue|keep going|and then|and)$/;

function closest(word: string, candidates: Iterable<string>): string | null {
  const cap = word.length >= 8 ? 2 : 1;
  let best: { word: string; distance: number } | null = null;
  for (const candidate of candidates) {
    if (candidate.length < 3) continue;
    const distance = editDistance(word, candidate, cap);
    if (distance <= cap && (!best || distance < best.distance || (distance === best.distance && candidate.length > best.word.length))) {
      best = { word: candidate, distance };
    }
  }
  return best?.word ?? null;
}

/** Question tokens with typo correction: raw spelling first, then the stemmed form. */
function questionTokens(normalised: string): string[] {
  return normalised
    .split(" ")
    .filter(Boolean)
    .map((word) => {
      const token = canonical(word);
      // Short and everyday words are too easy to "correct" into something else (math → path,
      // right → fight), so leave them alone.
      if (VOCABULARY.has(token) || STOPWORDS.has(word) || COMMON_WORDS.has(word) || word.length < 5 || /\d/.test(word)) return token;
      const raw = closest(word, RAW_VOCABULARY.keys());
      if (raw) return RAW_VOCABULARY.get(raw) ?? token;
      return token.length >= 5 ? closest(token, VOCABULARY) ?? token : token;
    });
}

function containsSequence(haystack: string[], needle: string[]): boolean {
  if (needle.length === 0 || needle.length > haystack.length) return false;
  outer: for (let i = 0; i <= haystack.length - needle.length; i++) {
    for (let j = 0; j < needle.length; j++) if (haystack[i + j] !== needle[j]) continue outer;
    return true;
  }
  return false;
}

// ── Scoring ─────────────────────────────────────────────────────────────────

function scoreEntries(tokens: string[], context: RazzContext): { entry: CanonEntry; score: number }[] {
  const content = contentOf(tokens);
  const isFollowUp = tokens.some((t) => ANAPHORA.has(t)) || content.size <= 2;
  const last = context.lastId ? BY_ID.get(context.lastId) : undefined;

  return INDEX.map(({ entry, keywords, phrasings }) => {
    let score = 0;
    for (const keyword of keywords) {
      if (!containsSequence(tokens, keyword.tokens)) continue;
      const frequency = KEYWORD_FREQUENCY.get(keyword.tokens.join(" ")) ?? 1;
      score += keyword.weight / Math.sqrt(frequency);
    }
    let bestPhrase = 0;
    for (const phrase of phrasings) {
      if (phrase.size === 0 || content.size === 0) continue;
      let overlap = 0;
      for (const token of content) if (phrase.has(token)) overlap++;
      const dice = (2 * overlap) / (content.size + phrase.size);
      bestPhrase = Math.max(bestPhrase, dice === 1 ? 1.4 : dice);
    }
    score += 5 * bestPhrase;
    if (last && isFollowUp && score > 0) {
      if (entry.id === last.id) score += 2.5;
      if (entry.topic === context.lastTopic) score += 2;
      if (last.related.includes(entry.id)) score += 1;
    }
    return { entry, score };
  }).sort((a, b) => b.score - a.score);
}

const quick = () => QUICK_QUESTION_IDS.map((id) => BY_ID.get(id)).filter((e): e is CanonEntry => Boolean(e)).slice(0, 3);

function relatedOf(entry: CanonEntry): CanonEntry[] {
  return entry.related.map((id) => BY_ID.get(id)).filter((e): e is CanonEntry => Boolean(e)).slice(0, 3);
}

const ANSWER_SCORE = 4.5;
const CONFIDENT_SCORE = 7;
const SUGGEST_SCORE = 2.5;
const MARGIN = 1.2;

/** Top-ranked entries and scores for a question: for tuning and tests, not shown to visitors. */
export function explain(question: string, context: RazzContext = EMPTY_CONTEXT, limit = 5): { id: string; score: number }[] {
  const tokens = questionTokens(normalise(question));
  return scoreEntries(tokens, context)
    .slice(0, limit)
    .map((item) => ({ id: item.entry.id, score: Math.round(item.score * 100) / 100 }));
}

/** The canonical tokens a question reduces to (for tuning). */
export function tokensOf(question: string): string[] {
  return questionTokens(normalise(question));
}

/** Look up an entry directly (quick-question buttons). */
export function answerById(id: string): CanonEntry | undefined {
  return BY_ID.get(id);
}

export function contextFor(entry: CanonEntry): RazzContext {
  return { lastId: entry.id, lastTopic: entry.topic };
}

/** Answer a typed question from the canon. Pure and synchronous; safe to call on every submit. */
export function askRazz(question: string, context: RazzContext = EMPTY_CONTEXT): RazzResult {
  const raw = question.slice(0, 300);
  const text = normalise(raw);

  if (!text) return { kind: "smalltalk", message: MESSAGES.empty, suggestions: quick(), context };
  if (PERSONAL.some((pattern) => pattern.test(raw))) return { kind: "guard", message: MESSAGES.personal, suggestions: quick(), context };
  if (INJECTION.some((pattern) => pattern.test(text))) return { kind: "guard", message: MESSAGES.injection, suggestions: quick(), context };
  if (GREETING.test(text)) return { kind: "smalltalk", message: MESSAGES.greeting, suggestions: quick(), context };
  if (THANKS.test(text)) return { kind: "smalltalk", message: MESSAGES.thanks, suggestions: context.lastId ? relatedOf(BY_ID.get(context.lastId)!) : quick(), context };

  if (MORE.test(text)) {
    const last = context.lastId ? BY_ID.get(context.lastId) : undefined;
    const next = last ? relatedOf(last)[0] : undefined;
    if (next) return { kind: "answer", entry: next, suggestions: relatedOf(next), context: contextFor(next) };
    return { kind: "clarify", message: MESSAGES.clarify, suggestions: quick(), context };
  }

  const tokens = questionTokens(text);
  const followUp = Boolean(context.lastId) && (tokens.some((t) => ANAPHORA.has(t)) || contentOf(tokens).size <= 2);
  const onTopic = GAME_NAMES.test(text) || followUp || tokens.some((token) => DOMAIN_WORDS.has(token));

  if (!GAME_NAMES.test(text) && OFF_TOPIC.some((pattern) => pattern.test(text))) {
    return { kind: "offtopic", message: MESSAGES.offtopic, suggestions: quick(), context };
  }

  if (UNANNOUNCED.some((pattern) => pattern.test(text))) {
    const ranked = scoreEntries(tokens, context).filter((item) => item.score > 0);
    const suggestions = ranked.length ? ranked.slice(0, 3).map((item) => item.entry) : quick();
    return { kind: "unknown", message: MESSAGES.unknown, suggestions, context };
  }

  const ranked = scoreEntries(tokens, context);
  const top = ranked[0];
  const second = ranked[1];
  const closest = ranked.filter((item) => item.score >= 1).slice(0, 3).map((item) => item.entry);

  // A strong phrasing match answers on its own; a moderate one needs at least one game word, so
  // generic words ("world", "best") can't drag an unrelated question onto a canon answer.
  if (top && (top.score >= CONFIDENT_SCORE || (onTopic && top.score >= ANSWER_SCORE && top.score - (second?.score ?? 0) >= MARGIN))) {
    return { kind: "answer", entry: top.entry, suggestions: relatedOf(top.entry), context: contextFor(top.entry) };
  }
  if (top && top.score >= SUGGEST_SCORE && onTopic) {
    return { kind: "clarify", message: MESSAGES.clarify, suggestions: closest.length ? closest : quick(), context };
  }
  if (onTopic) {
    return { kind: "unknown", message: MESSAGES.unknown, suggestions: closest.length ? closest : quick(), context };
  }
  return { kind: "offtopic", message: MESSAGES.offtopic, suggestions: quick(), context };
}
