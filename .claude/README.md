# `.claude/` — Warpath Coffee Operations Folder

This folder configures every Claude Code session in this repo. It's checked in so every collaborator (and CI) gets the same agents, commands, hooks, and permissions.

## Layout

```
.claude/
├── README.md                      # This file
├── settings.json                  # Project-shared settings (committed)
├── settings.local.json            # Personal overrides (gitignored — yours only)
├── agents/                        # Specialist subagents
│   ├── brand-reviewer.md          # Audits UI against brand guide + DESIGN_RULES
│   ├── cro-auditor.md             # Audits pages for conversion-rate optimization
│   └── nextjs-engineer.md         # Writes Next.js 16 code per project conventions
├── commands/                      # Slash commands (/<name>)
│   ├── brand-check.md             # /brand-check — audit current branch UI changes
│   ├── cro-audit.md               # /cro-audit [page] — CRO audit a page
│   ├── new-section.md             # /new-section <Name> — scaffold a new section
│   ├── screenshot-home.md         # /screenshot-home — Playwright screenshots @ 3 breakpoints
│   └── verify-build.md            # /verify-build — typecheck + prod build smoke test
├── hooks/                         # Shell hooks (wired in settings.json if you want them active)
│   ├── block-banned-words.sh      # PreToolUse — blocks banned voice words from being written
│   └── warn-config-edit.sh        # PreToolUse — warns when editing config files
├── output-styles/
│   └── warpath-engineer.md        # Default voice — senior agency engineer tone
├── scripts/                       # Local helpers (kept empty for now)
└── skills/
    └── playwright-skill/          # Browser automation (installed)
```

## How to use

- **Slash commands:** type `/brand-check`, `/cro-audit shop`, `/new-section OurProcess`, `/screenshot-home`, `/verify-build`.
- **Subagents** are invoked automatically by the slash commands above, or you can spawn them directly via the Agent tool.
- **Hooks** are NOT wired by default — to activate them, add a `hooks` block to `settings.json`. They're shipped here ready to enable when needed.
- **Output style** is opt-in. Run `/output-style warpath-engineer` once to switch this session's voice.

## Adding things

- New subagent → drop a markdown file in `agents/` with frontmatter (`name`, `description`, `tools`, `model`).
- New slash command → drop a markdown file in `commands/` with frontmatter (`description`, `allowed-tools`, `argument-hint`).
- New skill → drop a folder in `skills/` containing a `SKILL.md`.

## Permissions philosophy

`settings.json` lets Claude do **safe, reversible** things automatically (read, edit project files, run `yarn build`, run `git diff`). It **asks** for things with side effects (`git push`, `git commit`, package.json edits). It **denies** destructive or sensitive operations (`rm -rf /`, `git push --force`, reading `.env`).

See `DESIGN_RULES.md` §1 and `warpath-brand-guide.html` for the design system this project is built against.
