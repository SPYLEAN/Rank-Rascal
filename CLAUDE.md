# CLAUDE.md

Read `AGENTS.md` first. It holds the architecture, security, safety, brand, and workflow rules for this repository. This file only adds Claude-specific workflow.

## How to work here

- Start broad or risky work in Plan mode: audit, propose an exact file list, then wait for approval before editing.
- Never work directly on `main`. Use a branch such as `chore/<topic>` or `feat/<topic>`. Commit small, reviewable units. Do not merge.
- Preserve the split architecture: Next.js site in `apps/web`, Gateway worker in `src/`. Never move the worker into Vercel.
- Never read, print, or commit secret values. `.env` exists locally and is gitignored; report variable names and set/unset only. Never paste secrets into chat, docs, screenshots, or logs.
- Do not deploy, change DNS, rotate credentials, register global commands, or enable the install gate. Give the user the exact manual step instead.
- Keep "Add to Discord" as Coming Soon and never invent live status, support emails, or test results.

## Verify before saying "done"

```bash
npm test && npm run check && npm run build && git diff --check
```

For UI changes also start the site (`.claude/launch.json` → `rank-rascal-web`, or `npm run dev --workspace=apps/web`) and check the affected routes at 320, 375, 768, 1024 and 1440 px: no horizontal overflow, no 404 images, no console errors, keyboard focus visible.

## Useful project skills and agents

- Skills: `verify-project` (full validation), `review-pr` (review the current branch), `release-check` (launch-gate checklist).
- Subagents in `.claude/agents/`: `frontend-reviewer`, `security-reviewer`, `test-engineer`. Use them deliberately; each spawn multiplies usage.

## Report format

Lead with the outcome, then: branch and commit, changed files, commands run and results, security/privacy/safety notes, unresolved blockers, manual steps needed from the owner, and the recommended next PR.

## Gotchas

- Windows/OneDrive checkout: `npm ci` can hit file locks. A clone outside OneDrive (for example `C:\Projects`) is more reliable.
- `apps/web/tsconfig.tsbuildinfo` and `.next/` are build output. Do not commit them.
- Website command syntax must match `src/commands.ts` option names exactly.
- The local shell may be Git Bash; Windows paths and `$` in heredocs need care.
