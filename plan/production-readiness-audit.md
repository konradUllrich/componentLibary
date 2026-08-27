# Production Readiness Audit — `@mp-ku/mp-components`

Full pass over every component, the shared infrastructure (Router/hooks/stores), the build/CI/publish pipeline, and how legible the codebase is to an AI coding agent working on it cold. Compiled from six independent source reads; every finding is verified against current file contents (not inferred from CLAUDE.md alone) and cited as `file:line`.

**Totals:** 6 critical · 11 high · 13 medium · 8 low/cleanup.

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

### 🟡 Medium — Landmark and keyboard gaps in the layout shell

Done. `AppLayout` header/sidebar now render as `<header>`/`<aside>` with a skip link to `<main>`; `HorizontalNav`'s mobile fallback now wraps the `<select>` in a `<nav>` landmark instead of a bare `<div>`. All changes are class-based only (no tag-selector CSS existed for either component), so consumers styling via `.mp-app-layout__*` / `.mp-horizontal-nav*` classes are unaffected — verified against `kanban`, whose only DOM-shape coupling was the `nav.mp-horizontal-nav` test selector, which still matches.

`layout/AppLayout/AppLayout.tsx:53,55` · `layout/HorizontalNav/HorizontalNav.tsx:117-144`

### 🟡 Medium — No shared spacing vocabulary across layout primitives

`Flex` gap uses `xs|sm|md|lg|xl`; `Card` padding stops at `lg` (no `xl`); `Panel` has its own separate `spacing`/`u()` utility system that Flex/Card/Grid don't share. Three components, three spacing scales.

`layout/Flex/Flex.tsx` · `layout/Card/Card.tsx` · `layout/Panel/Panel.tsx`

### 🟢 Low — Missing tests and stray `any`

No co-located tests for TableHeader/Body/Row/Cell, several Sidebar and Card/Panel subcomponents, or `GridItem`. An `as any` with an eslint-disable sits in `TableBody.tsx:54-55`, contradicting the no-`any` rule.

`data-display/Table/TableBody.tsx:54-55`

---

## 5. Router, hooks, stores, intrexx

The shared foundation most other components build on — bugs here have the widest blast radius of anything in the audit.

### 🟠 High — Storage-restore merge doesn't match its own documentation

The header comment and CLAUDE.md both describe "sessionStorage first, else localStorage." The actual code merges the two per-key — localStorage as a baseline with sessionStorage values overriding matching keys — which can produce a param combination (e.g. `page` from session, `sort` from local) that never existed in either store alone. Either the code or the documentation is wrong; right now it's unclear which was intended.

`Router/routeStateStorage.ts:8-10,64-76`

### 🟠 High — `useUrlSort` has zero test coverage

101 lines, exported from the public `hooks/index.ts`, drives sort state through the URL — and has no test file anywhere in the repo.

`hooks/useUrlSort/useUrlSort.ts`

### 🟡 Medium — `TreeEditorOld` ships in the published bundle as dead weight

The legacy react-dnd-based tree editor is still exported from `intrexx/index.ts` alongside the new `SortableTree`. Nothing in `demo/` references it. Its own `MenuEditor` subtree isn't even re-exported from its own folder — genuinely unreachable code. Beyond the dead weight, having both `TreeEditor` (old) and `SortableTree` (new, actively maintained) both importable creates a real risk of consumers grabbing the wrong one.

`intrexx/index.ts:3` · `intrexx/TreeEditorOld/`

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
