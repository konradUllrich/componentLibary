# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**mpComponents** (`@mp-ku/mp-components`) is a React 19 component library built on Radix UI primitives, TanStack Form/Table, and plain CSS with BEM naming. Published to npm, with a live demo site and documentation built from the same source tree.

## Commands

```bash
pnpm type-check      # tsc --noEmit — must pass before every commit
pnpm lint            # eslint . — must pass before every commit
pnpm test:ct         # Playwright component tests (all *.test.tsx)
pnpm test:ct:ui      # Component tests, interactive UI
pnpm test:ct:headed  # Component tests, headed browser
pnpm test:ct:debug   # Component tests, step-through debugger
pnpm test:e2e        # Playwright E2E tests (documentation site, e2e/ dir)
pnpm test:ci         # type-check && lint && test:ct && test:e2e — full CI gate, must be green before PR merge
pnpm test:agent      # type-check + lint + tests scoped to the current git changes — run this after every change (see below)
pnpm test:ct:coverage  # same component tests, with code coverage collection + threshold gate (see Coverage below)

pnpm demo            # Run the demo site locally (vite.config.demo.ts)
pnpm demo:build      # Build the demo site
pnpm build           # Build the library for publishing (vite.config.ts)
pnpm build:watch     # Build in watch mode
```

Run a single component test file or a specific test by name:

```bash
pnpm test:ct path/to/Component.test.tsx
pnpm test:ct -g "test name substring"
```

Component tests are configured in `playwright-ct.config.ts` (testDir `.`, matches `**/*.test.tsx`, 10s timeout, Chromium only). E2E tests use the separate root `playwright.config.ts` and live under `e2e/`.

## Architecture

### Component categories (barrel-exported from `index.ts`)

- `common/` — shared primitives (Button, Badge, Text, Dialog, Dropdown, Tooltip, Accordion, Tabs, ThemeProvider, EmptyState, ...)
- `controls/` — form elements (Input, Select, Checkbox, Radio, Combobox, FormControl, FormBuilder)
- `data-display/` — Table, Datalist, Pagination, CardList
- `layout/` — Sidebar, Card, Panel, Grid, Flex, AppLayout, HorizontalNav
- `intrexx/` — components specific to the Intrexx integration (TreeEditor, IconPicker)
- `styles/variables.css` — design tokens (colors, spacing, radius, focus rings); all component CSS must reference these vars, never hardcode values
- `Router/`, `hooks/`, `stores/` — see below; these are the architectural core that most components build on

Every component lives in its own folder: `ComponentName.tsx`, `ComponentName.css`, `ComponentName.test.tsx`, `index.ts`. Components should stay ≤ ~100 lines; split into subcomponents if larger.

### Router: param-based routing (`Router/`, see `Router/ROUTER.md`)

The `Router` wraps `wouter` but does **not** control the browser path. It stores the active route inside an `appRoute` search parameter (`?appRoute=/items`), which makes it safe to embed in iframes, GitHub Pages, CMS portals, etc. where the host page owns the path.

- `appRouteLocation.ts` implements custom wouter location hooks (`useAppRouteLocation`, `useAppRouteSearch`) that read/write via the `appRoute` param and subscribe to `popstate`.
- Route search-param state (filters, pagination, sort) is auto-saved/restored across navigation via a two-layer storage scheme, keyed as `${routeStatePrefix}:${routePath}` (prefix defaults to `"mp-route"`, overridable per `<Router>` for multiple routers on one page):
  - **sessionStorage** — written on every store change within a session (`useStoreUrlSync`), and read back by `navigate()`/`<Link>` when the destination has no explicit search params.
  - **localStorage** — same key format, for persistence across browser sessions/tab closes.
  - On read, both stores are **merged per search-param** (not a whole-blob fallback) — different hooks on the same route can each pick their own `storage` backend (e.g. a `viewMode` toggle in localStorage alongside filters in sessionStorage), so both may hold different params under the same route key at once; sessionStorage wins on a same-key collision. See `Router/routeStateStorage.ts` header comment.
- `createRoute()` gives typed helpers (`.build()`, `.useSearch()`, `.useSetSearch()`, `.useParams()`) for a specific path.

### URL-synced state: `hooks/usePersistedState`, `hooks/useUrlState`, `hooks/usePagination`, `hooks/useUrlSort`, `hooks/useFilter`

`usePersistedState` is the shared primitive behind most of these. Current storage model (do not reintroduce the old one — see `usePersistedState.test.tsx` header comment for the authoritative spec):

- **No direct `key → value` writes to raw `localStorage[key]`/`sessionStorage[key]`.** That format was removed.
- `setState` (when `syncUrl=true`, the default) writes to two places: (1) the URL search param, and (2) the route-scoped storage key `${routeStatePrefix}:${currentPath}` as a `URLSearchParams` blob — backend picked by the `storage` option (`"localStorage"` default, or `"sessionStorage"`/`false`).
- Init reads the URL param only (highest priority), then falls back to `defaultValue`.
- `removeIfDefault` (default `true`) deletes the param/storage entry instead of writing the default value.
- `flatUrlParams: true` writes each property of an object value as its own URL param instead of one JSON blob (used for filter-style state, e.g. `?status=active&page=3`).
- All hook options are captured in refs so `setPersistedState`'s identity is stable across renders — don't remove that pattern when editing the hook, it prevents stale-closure bugs.

### Stores (`stores/`)

Zustand-based stores (`filterStore`, `sortingStore`, `valueStore`) paired with `useRouterSync` to keep store state synced with the Router's URL params. `persistors.ts` handles the storage side.

### Theming (`common/ThemeProvider`)

Runtime theme customization via CSS custom properties. `types.ts` defines `ThemeConfig` (colors, spacing, typography, borderRadius as a numeric multiplier, focus). `themeUtils.ts` merges a partial theme with `defaultTheme` and computes the actual CSS variable values (e.g. radius values are `multiplier * remBase`, not raw strings) — when changing `ThemeConfig` shape, update both the type and the CSS-variable computation together, they must stay in sync.

## Standards (from `mpComponents.instructions.md` / `.github/copilot-instructions.md`)

- **TypeScript**: strict mode, no `any`/`@ts-ignore` — fix type errors immediately, don't suppress them.
- **CSS**: plain CSS only (no modules, no CSS-in-JS), BEM naming (`.block__element--modifier`), values from `styles/variables.css` design tokens.
- **Components**: `forwardRef`, exported prop interface, `displayName` set, `clsx` for conditional classes (className spread last).
- **Radix UI**: use for dialogs, dropdowns, selects, tooltips, tabs, accordions rather than reimplementing.
- **Accessibility**: WCAG 2.1 AA is a hard requirement, not aspirational — full keyboard nav, visible focus indicators, 4.5:1 text contrast, semantic HTML, ARIA. Every component test suite must include an axe-core check via `checkA11y` from `playwright/test-utils.ts`; contrast/a11y test failures are real bugs to fix (usually a CSS color token issue), not flaky tests to skip.
- **Tests**: co-located `ComponentName.test.tsx`. Import `test`/`expect` from `playwright/coverage-fixtures` (a thin wrapper around `@playwright/experimental-ct-react`, not the package directly — see Coverage below), computing the relative path to `playwright/coverage-fixtures` from the test file's directory. Mount all variants of a component in one `mount()` call (looping `mount()` causes React root conflicts). Prefer semantic queries (`getByRole`, `getByLabel`) or `data-testid` over CSS class selectors. A test-only helper component's root element should be a wrapping block element (e.g. `<div>`), not a bare inline element — Playwright CT's component-root tracking is unreliable when the mounted root is a bare `<span>`/text-only element.
- **Workflow for changes**: run `pnpm test:ct` (or `pnpm test:agent`) to confirm a green baseline before editing, make the smallest change, then run `pnpm test:agent` before considering the change done; `pnpm test:ci` is the full gate expected to pass before a PR merges.

## Code coverage

`pnpm test:ct:coverage` runs the exact same component tests as `pnpm test:ct`, but with V8 code coverage collection via [monocart-coverage-reports](https://github.com/cenfun/monocart-coverage-reports) (Playwright CT has no native coverage support — component code only ever executes in the browser under CDP). It's a separate command, not part of `pnpm test:ct` / `pnpm test:agent` / `pnpm test:ci`, so normal runs have zero collection overhead.

- **`playwright/coverage.config.ts`** — single source of truth for the `monocart-coverage-reports` options (output dir `./coverage/ct`, reports, source filter, coverage thresholds). Imported by all three pieces below; keep it that way rather than duplicating options.
- **`playwright/coverage-fixtures.ts`** — every `*.test.tsx` file imports `test`/`expect` from here instead of `@playwright/experimental-ct-react` directly. It adds an auto fixture that starts/stops `page.coverage` (JS only — CSS coverage was tried and dropped, see below) and feeds the result to MCR, gated behind the `collectCoverage` fixture **option** (default `false`, a no-op; only `playwright-ct.coverage.config.ts` sets it `true`). This is why coverage collection needs no per-file opt-in yet stays off by default.
- **`playwright-ct.coverage.config.ts`** — the config `test:ct:coverage` runs against. Same test settings as `playwright-ct.config.ts` (keep them in sync — duplicated intentionally rather than spread, see comment in the file) plus `globalSetup`/`globalTeardown` (clean the coverage cache before the run, merge + generate + threshold-check after) and `use: { collectCoverage: true }`.
- **CSS coverage is intentionally not collected.** It was tried first and reports which CSS *selectors* were exercised by a test's DOM — for a component library where most rules are state/variant-dependent, that's mostly noise, and it dragged the "lines" metric down from ~88% to ~68% without reflecting anything real about component-code testedness.
- **Untested files show up only if some test imports them.** The `all` option (empty-coverage entries for files no test ever touches) was deliberately left out — it needs a TS/JSX transformer (e.g. `@swc/core`) to parse never-bundled `.tsx` source, which wasn't worth the added dependency/fragility for a first cut. Coverage % therefore reflects "how well is loaded code tested", not "how much of the repo is loaded" — keep this in mind before trusting the number as a full picture.
- Thresholds live in `playwright/coverage.config.ts`'s `THRESHOLDS` (currently `statements: 70, lines: 70`, checked in the `onEnd` hook, which throws — and so fails the run — when unmet). Raise them as coverage genuinely improves; don't lower them just to make a red run green.
- To add a new test file: import `test`/`expect` from `playwright/coverage-fixtures` (relative path to `playwright/`) exactly like every existing test file — nothing else is needed for it to participate in coverage.

## After every change: run `pnpm test:agent`

**Always run `pnpm test:agent` after editing files in this repo, before reporting the work as done.** It is `scripts/test-agent.mjs` and does, in order:

1. `pnpm type-check` (full project — type errors from a changed file can surface anywhere that imports it)
2. `pnpm lint` (full project)
3. Component tests, scoped by git changes:
   - Looks at `git diff --name-only HEAD` + untracked files to find what changed.
   - For each changed `.ts`/`.tsx`/`.css` file, runs the co-located `*.test.tsx` file(s) in the same directory.
   - If a change touches shared infrastructure (`Router/`, `hooks/`, `stores/`, `styles/`, `playwright/`, `playwright*.config.ts`, `package.json`, `tsconfig*.json`, `vite.config*.ts`, `eslint.config.js`) or no co-located tests can be found, it falls back to the full `test:ct` suite instead of guessing.
   - `pnpm test:agent --full` forces the full suite regardless.

Any non-zero exit means something needs fixing before the change is considered complete — don't just report the failure, fix it (or explain why it's pre-existing/unrelated) and re-run. Use `pnpm test:ci` instead only when you need the E2E suite too (e.g. right before a PR).
