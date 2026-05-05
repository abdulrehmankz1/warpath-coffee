---
description: Capture screenshots of the homepage at desktop, tablet, and mobile breakpoints using the Playwright skill
allowed-tools: Skill, Bash(yarn dev *), Read
---

Capture screenshots of the running homepage at three breakpoints for visual review:

1. Verify the dev server is running on `http://localhost:3000` (check, do not start it — if it's not running, ask the user to start `yarn dev`).
2. Use the `playwright-skill` Skill to capture three full-page screenshots:
   - **Desktop:** 1440 × 900 → `screenshots/home-desktop.png`
   - **Tablet:** 768 × 1024 → `screenshots/home-tablet.png`
   - **Mobile:** 390 × 844 → `screenshots/home-mobile.png`
3. After capture, return the three file paths so the user can open them.

If any breakpoint fails to render correctly, capture the console output too and flag it.
