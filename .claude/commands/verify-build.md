---
description: Run typecheck + production build smoke test and report any errors
allowed-tools: Bash(npx tsc --noEmit), Bash(yarn build *), Read
---

Run the full pre-merge verification:

1. `npx tsc --noEmit` — report any TypeScript errors with file:line refs.
2. `yarn build` — production build via Turbopack. Tail the last ~50 lines of output.
3. If both pass: report `✅ Clean. Ready to ship.` plus the route table from the build output.
4. If either fails: paste the error verbatim, identify the file, suggest the fix in one line. Do not start fixing without confirmation.

Be terse. No commentary. Output is for a senior engineer who knows what they're looking at.
