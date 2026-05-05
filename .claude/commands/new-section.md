---
description: Scaffold a new homepage / landing section per Warpath conventions
allowed-tools: Read, Write, Glob, Bash(npx tsc --noEmit)
argument-hint: <section-name> (PascalCase, e.g. "OurRoastery")
---

Scaffold a new section component at `components/sections/$ARGUMENTS.tsx` following these rules:

1. **Read these files first** to understand conventions:
   - `DESIGN_RULES.md` (§4 component rules, §3 layout)
   - `components/sections/Hero.tsx` (reference for layout pattern)
   - `components/warpath/SectionHeader.tsx`

2. **Section template** must include:
   - Server Component by default (no `'use client'`)
   - `<section>` with `aria-labelledby` pointing to the headline `id`
   - `SectionHeader` with eyebrow + title (with italic accent) + sec chip + desc
   - Container: `mx-auto max-w-[1440px] px-6 md:px-12 lg:px-[90px]`
   - Section padding: `py-24 lg:py-[140px]`
   - Background per brand color usage law (§2.2) — bone-100 default
   - At least one CTA using the `Button` primitive with `data-event` attribute

3. **Wire the export** into `app/page.tsx` if the user wants it on the homepage (ask first).

4. **Run `npx tsc --noEmit`** after creating, report any type errors.

Output: the path to the created file + a one-line summary of what's in it. Do not narrate the work.
