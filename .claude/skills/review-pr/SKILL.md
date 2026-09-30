---
name: review-pr
description: Review the current Rank Rascal branch against main for architecture drift, secrets, safety/privacy regressions and unsupported claims. Use before asking the owner to merge.
---

# Review PR

1. `git fetch origin main` and review `git diff origin/main...HEAD` in full, including file list and deletions.
2. Check against `AGENTS.md`:
   - Architecture invariants (worker not in Vercel, Interactions Endpoint blank, interactions stub inactive, Linked Roles disabled, install gate closed).
   - No secrets, tokens, database URLs, or `.env` content in the diff, docs, or screenshots.
   - Safety and humor rules, verified-versus-preview separation, Witness Protection, unlink cascade.
   - Claims: no fake live status, no invented support email, Coming Soon preserved, command syntax matches `src/commands.ts`.
   - Domain is `rankrascal.lol` (site) and `api.rankrascal.lol` (worker), not `.com`.
3. Run the `verify-project` skill.
4. For risky areas delegate deliberately to `security-reviewer` or `frontend-reviewer`.
5. Output: outcome first, then findings ranked by severity with `file:line`, then the PR-ready summary (changed files and why, validation evidence, remaining risks, manual steps for the owner). Do not merge.
