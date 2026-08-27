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

Table, Pagination, Datalist, CardList, and the layout primitives (AppLayout, Card, Grid, Panel, Sidebar, HorizontalNav).

## 5. Router, hooks, stores, intrexx

The shared foundation most other components build on — bugs here have the widest blast radius of anything in the audit.

### 🟢 Low — Duplicated path-parsing logic

`getCurrentPath()`/`getCurrentSearch()` re-implement the same parsing that `getAppRoute()`/`getAppRouteSearchParams()` already do one file over — one of these should just call the other.

`Router/routeStateStorage.ts:19-39` vs `Router/appRouteLocation.ts:15-28`

---

## 6. Build, CI & npm publish

Beyond the two critical items already listed above (broken publish workflow, unbundled peer deps), these determine whether the package actually installs and behaves correctly for someone outside this repo.

### 🟠 High — A filesystem-relative dependency that can't resolve from the registry

`"utilities": "link:@dnd-kit/dom/utilities"` only works inside this monorepo checkout. Anyone installing from npm gets a resolution failure unless this is proven to inline correctly at build time — worth a real `npm pack && npm install` smoke test from a scratch project before the next release.

`package.json:68`

### 🟡 Medium — The 70% coverage gate never runs in CI

`playwright/coverage.config.ts` throws on unmet thresholds, but `test:ct:coverage` is never invoked by any workflow — only the uninstrumented `test:ct` runs. The gate exists only if someone remembers to run it by hand.

`.github/workflows/test.yml`

### 🟢 Low — Stale config and docs

No `CHANGELOG.md` despite conventional-commit messages that would support generating one. `package.json`'s `files` field lists a `src` directory that doesn't exist (components live at repo root). README links to a `QUICK_REFERENCE.md` that isn't in the repo. No `"sideEffects": false` in package.json.

`package.json:16-21` · `README.md`

---

## 7. Making it agent-friendly

The good news first: CLAUDE.md is already a genuine onboarding document, JSDoc on exported props is consistently present with `@default` notes, prop patterns are predictable enough across most controls to pattern-match from, and the TypeScript is precise (no stray `any`/`@ts-ignore` in the sampled files, tight generics on the shared hooks) — so `tsc` feedback is trustworthy for an agent's repair loop. The gaps are specific and mostly cheap to close.

| Recommendation                                                                                                                                                                                                                                            | Effort | Impact |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------ |
| **Add a root `AGENTS.md` catalog** — one line per component: folder path, one-sentence purpose, link to its demo page. Solves "no single fetchable overview" without touching component code.                                                             | Low    | High   |
| **Fix `index.ts`'s top-level `@example`** — it currently imports from `@/mpComponents/common`, which doesn't match the real published import path (`@mp-ku/mp-components`) and would actively mislead an agent consuming the package.                     | Low    | High   |
| **Document the German-default strings explicitly** — Pagination's default labels are German. An agent unaware of this can silently ship German UI text into an English-language consumer app.                                                             | Low    | Medium |
| **Standardize the `onChange` / `onValueChange` split** across `controls/` (see §3) — this is the pattern an agent is most likely to copy wrong when adding a new field.                                                                                   | Medium | High   |
| **Generate a machine-readable component manifest** (via `react-docgen-typescript`, which already reads JSDoc + defaults) at build time — name, props, types, defaults, descriptions, regenerated in CI so it can't drift from source.                     | Medium | High   |
| **Backfill JSDoc** on the stragglers — `SidebarProps` has none, `ThemeConfig`/`ThemeColors` use `//` comments that don't surface in IDE hovers the way `/** */` does.                                                                                     | Medium | Medium |
| **Co-locate a short `.example.tsx` per component**, or expand the current 8-file `.stories.tsx` coverage — cheaper than full Storybook and greppable without hitting a live URL.                                                                          | Medium | Medium |
| **Ship `demo/pages` (or the manifest) inside the published npm package** — right now usage examples exist only on the GitHub Pages site, not in `node_modules`, so an agent working purely from the installed package sees typed source with no examples. | High   | Medium |
