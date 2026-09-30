# Ask Razz: the Razz Canon Engine

The floating Razz button opens a small storybook drawer (bottom-right). It holds one greeting, a text box, six quick questions and one answer at a time. Everything runs **in the visitor's browser at zero cost**. There is no server route, no API key and no AI provider. Nothing a visitor types leaves their device.

## How it works

| Piece | File |
|---|---|
| Knowledge base: every answer Razz can give | `apps/web/lib/razz-canon.ts` |
| Matcher: turns a typed question into a canon answer | `apps/web/lib/razz-engine.ts` |
| Drawer UI | `apps/web/components/RazzGuide.tsx` |
| Greeting, six curated answers, in-page reactions | `apps/web/lib/razz.ts` |
| Tests | `test/razz-engine.test.ts` (runs with `npm test`) |

### The canon

Each entry has: an `id`, a `topic`, the `question` shown in suggestions, the canonical `answer`, alternate `phrasings`, weighted `keywords` (synonyms are handled by the engine), `related` entry ids for follow-ups, a site `link`, and a `status`: `confirmed`, `planned`, `concept` or `unannounced`.

Coverage: premise and story, the Chaos Crown, Chapter 1 structure and length, Release 1 scope and what's deferred, the gameplay loop, co-op, The World Lies, fairness, the first Fraud, heroes (overview, future heroes, and one entry per hero), Stickerwood and future realms, all ten areas (one entry each), Razz, King Wrongway, the Overgrown Receipt, enemies, progression, currencies, loot, pets, fishing, quests, day/night and weather, pricing, status, release date, platforms, playtests, development stage, updates, roadmap, the teaser, the devlog, community, reviews, the Founders Guild, the creators, the paused bot, safety, accessibility, privacy, and "are you an AI?".

Hero and area entries are generated from `lib/game-content.ts`, and the roadmap entry from `lib/updates.ts`, so Razz can't drift from what the pages say. To change an answer, edit the canon, not the engine.

### The matcher

1. **Normalise**: lowercase, strip accents and punctuation, expand contractions ("whats" → "what is").
2. **Fold phrases**: "co-op", "multiplayer" → coop; "wrong way" → wrongway; "coming out" → release; and so on.
3. **Stem** lightly (heroes → hero, fishing → fish) and **map synonyms** (monster → enemy, cost → price, zone → area, news → announcement).
4. **Tolerate typos**: words of five or more letters that aren't in the canon vocabulary are corrected to the nearest canon word (edit distance 1, or 2 for longer words), comparing against both raw and stemmed spellings. Everyday words ("right", "world", "today") are never "corrected".
5. **Score** every entry: weighted keyword and phrase hits, where keywords shared by many entries count for less, plus the best phrasing similarity (Dice overlap of content words).
6. **Follow-ups**: if the question refers back ("he", "it", "that one", or very short) and there was a previous answer, entries with the same id or topic, or listed as related, get a boost. "Tell me more" moves to the first related entry.
7. **Decide**:
   - A strong match answers.
   - A moderate match answers only if the question contains a real game word and clearly beats the runner-up.
   - Otherwise an on-topic question gets "not announced or decided yet" or a "did you mean" with the **three closest questions**.
   - An off-topic question gets a polite in-character decline with suggestions.

Guards run before scoring:
- **Prompt-injection text** ("ignore your instructions", "you are now…") gets a fixed in-character refusal; the engine has no instructions to override anyway.
- **Emails and phone numbers** get a "please don't share personal details" reply and are never echoed back.
- **Specific unannounced topics** (PvP, level cap, voice chat, private servers, cross-play, VR, exact launch time) always get "not announced or decided yet".

Razz **never generates text**. Every reply is a canon answer or one of the fixed messages in `MESSAGES`.

### Labels

- Answers show "Answer from the Crownfall canon" plus the entry's status (Confirmed / Planned / Concept / Not announced), and a link to the relevant page.
- The drawer footer says answers come from the canon in the browser and that nothing typed is sent anywhere.

## Privacy

- Questions are processed on the visitor's device and are **not** sent to the website's servers, stored by the site, or sent to Anthropic, OpenAI or any other AI provider.
- The only stored state is the optional "Let Razz interrupt" preference (localStorage) and which one-time reactions were shown this session (sessionStorage).
- The Privacy Policy (section 5) and Terms (section 7) say this; keep them in sync if this changes.

## Mobile placement

On any page, the launcher hides itself while it would overlap an element marked `data-razz-avoid` (currently the community form panel). This is measured on scroll, resize and layout changes, so it holds for every width, form state, error and confirmation. It reappears as soon as the overlap ends.

## Tests

`test/razz-engine.test.ts` covers:
- canon integrity (unique ids, complete fields, valid related links, all heroes and areas);
- no invented years, prices or promised access;
- about 45 paraphrased questions and 9 misspellings;
- follow-ups and "tell me more";
- off-topic questions, prompt-injection text and personal data;
- unknown or unannounced release details;
- a static check that the engine and drawer contain no network calls or AI-provider references.

## Status (2026-09-29)

Built, unit-tested and browser-tested at 320, 390, 768, 1024 and 1440 px. Zero running cost; no environment variables.
