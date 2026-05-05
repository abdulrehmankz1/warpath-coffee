---
description: Run a CRO audit on a specific page or the entire homepage funnel
allowed-tools: Read, Grep, Glob, Agent
argument-hint: [page route, e.g. "home" or "/shop" or "checkout"]
---

Run a CRO audit on the page specified in `$ARGUMENTS` (default: homepage if empty).

1. Locate the page file(s) — typical paths:
   - home → `app/page.tsx` + `components/sections/*.tsx`
   - PDP → `app/shop/[slug]/page.tsx`
   - cart → `app/cart/page.tsx`
   - checkout → `app/checkout/page.tsx`
2. Read those files plus all referenced section/component files.
3. Spawn the `cro-auditor` subagent with the file paths and a self-contained brief.
4. Return its report verbatim. Do not editorialize.

If the requested page doesn't exist yet, say so explicitly and suggest where it should live.
