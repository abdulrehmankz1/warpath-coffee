---
description: Audit the current branch's UI changes against the Warpath brand guide and DESIGN_RULES.md
allowed-tools: Read, Grep, Glob, Bash(git diff *), Bash(git status), Agent
argument-hint: [optional file or section path to focus on]
---

Run a brand audit on the current branch's UI changes. Your job:

1. Get the changed files via `git diff --name-only main...HEAD` and `git status` to see uncommitted work too.
2. Filter for UI files: anything under `app/`, `components/`, `lib/`, or `*.css` files.
3. For each changed file, spawn the `brand-reviewer` subagent in parallel with a self-contained prompt that includes the file path and what to check.
4. Aggregate the findings into a single grouped punch list at the end (🛑 blockers, ⚠️ warnings, ✅ good).
5. If the user passed `$ARGUMENTS`, scope the audit to just that file/folder.

Be terse. Don't re-explain the rules — the subagent knows them. Just deliver the punch list, with file:line citations.
