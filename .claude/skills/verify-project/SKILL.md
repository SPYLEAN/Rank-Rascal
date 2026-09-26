---
name: verify-project
description: Run the full Rank Rascal validation suite (install state, asset/type checks, tests, builds, diff hygiene) and report exact results. Use before opening or updating a PR.
---

# Verify project

From the repository root:

1. `git status --short` and `git branch --show-current`. Refuse to proceed on `main` with uncommitted edits.
2. `npm run preflight`: report which variables are set or missing (names only, never values).
3. `npm run check`: asset manifest, internal-file rule, `tsc` for bot and web.
4. `npm test`: report pass, fail and skip counts. Note that the PostgreSQL integration test is skipped unless `TEST_DATABASE_URL` points at a disposable database.
5. `npm run build`: bot (`tsc`) and website (`next build`).
6. `git diff --check`.
7. If `apps/web` changed, start the site (`.claude/launch.json` → `rank-rascal-web`) and check the affected routes at 320, 375, 768, 1024, 1440 px for overflow, broken images, and console errors.

Report a table of command → result, then any failures verbatim. Never state that something passed unless it ran. Do not deploy, push, or modify secrets.
