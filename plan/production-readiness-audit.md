# Production Readiness Audit — `@mp-ku/mp-components`

Full pass over every component, the shared infrastructure (Router/hooks/stores), the build/CI/publish pipeline, and how legible the codebase is to an AI coding agent working on it cold. Compiled from six independent source reads; every finding is verified against current file contents (not inferred from CLAUDE.md alone) and cited as `file:line`.

**Totals:** 6 critical · 11 high · 12 medium · 8 low/cleanup.

## Contents

1. [Fix first — cross-cutting](#1-fix-first--cross-cutting)
2. [`common/`](#2-common)
3. [`controls/`](#3-controls)
4. [`data-display/` & `layout/`](#4-data-display--layout)
5. [Router, hooks, stores, intrexx](#5-router-hooks-stores-intrexx)
6. [Build, CI & npm publish](#6-build-ci--npm-publish)
7. [Making it agent-friendly](#7-making-it-agent-friendly)

---

## 1. Fix first — cross-cutting

All Done

## 2. `common/`

All Done

## 3. `controls/`

All Done

## 4. `data-display/` & `layout/`

All Done

## 5. Router, hooks, stores, intrexx

All Done

## 6. Build, CI & npm publish

All Done

---

## 7. Making it agent-friendly

The good news first: CLAUDE.md is already a genuine onboarding document, JSDoc on exported props is consistently present with `@default` notes, prop patterns are predictable enough across most controls to pattern-match from, and the TypeScript is precise (no stray `any`/`@ts-ignore` in the sampled files, tight generics on the shared hooks) — so `tsc` feedback is trustworthy for an agent's repair loop.

Done:

- Root [`AGENTS.md`](../AGENTS.md) catalog — one line per component: folder path, purpose, demo link (or `—` where no demo page exists yet).
- Fixed `index.ts`'s top-level `@example` — was importing from `@/mpComponents/common`, doesn't match the real published import path; now shows `@mp-ku/mp-components`.
- Pagination's German-default labels were already documented (`@default` values + an English override example on the `labels` prop) — no change needed.
- `onChange` / `onValueChange` split across `controls/` is already consistent (all value-changing controls use `onValueChange`) — no change needed.
- Machine-readable component manifest — `scripts/generate-manifest.mjs` runs `react-docgen-typescript` over `common/`, `controls/`, `data-display/`, `layout/`, `intrexx/` and writes `dist/component-manifest.json` (name, props, types, required/default, JSDoc descriptions) as part of `pnpm build`, so it ships inside the published package and can't drift from source.
- Backfilled JSDoc on `SidebarProps` and `ThemeConfig`/`ThemeColors` (were bare or `//`-commented).

Not done (deferred, lower ROI relative to effort):

| Recommendation                                                                                                                                                                                                                                            | Effort | Impact |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------ |
| **Co-locate a short `.example.tsx` per component**, or expand the current 8-file `.stories.tsx` coverage — cheaper than full Storybook and greppable without hitting a live URL.                                                                          | Medium | Medium |
| **Ship `demo/pages` inside the published npm package** — usage examples still only live on the GitHub Pages site, not in `node_modules`; the new component manifest covers props/types but not worked examples.                                          | High   | Medium |
