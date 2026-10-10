# design-sync notes — @mp-ku/mp-components

Shape: package (no Storybook; the `*.stories.tsx` files are Playwright-CT helpers, not Storybook stories).
Project: claude.ai/design project pinned in `config.json` (`projectId`).

## Build

- `buildCmd` runs `pnpm build` (vite library build, `preserveModules`) and then concatenates
  `styles/variables.css` + `.design-sync/base.css` + `dist/style.css` into
  `.design-sync/.cache/ds-styles.css`, which is `cfg.cssEntry`. Reason: `dist/style.css` does NOT
  contain the design tokens (consumers import `variables.css` separately), and `tokensGlob` only
  works together with `tokensPkg` (a separate tokens package), which this repo does not have.
- The concatenation strips the ` * @import './styles/variables.css';` line from the doc comment in
  `variables.css` — the validator treats it as a real `@import` and fails `[CSS_IMPORT_MISSING]`.
- `.design-sync/base.css` adds host-level defaults (body font `var(--font-family-base)`, colour,
  background, box-sizing). The library sets no document font itself (the demo does it in
  `demo/index.css`); without this, every preview/design renders in browser-default serif.
- Converter invocation: `--node-modules ./node_modules --entry ./dist/index.js`.
- Render check uses `playwright@1.58.2` installed into `.ds-sync/` (matches the cached
  chromium-1208 and the repo's own pinned playwright).
- With the `preserveModules` vite config, dist imports external deps via paths like
  `../../local/Intrexx-cms/node_modules/.pnpm/clsx@…` (pnpm store location relative to the repo).
  esbuild resolves them fine locally; on another machine with a different store layout, rebuild dist first.

## Grouping

- `.design-sync/overrides/source-kit.mjs` (declared in `libOverrides`) groups components by their
  top-level category folder (`common/`, `controls/`, `data-display/`, `layout/`, `intrexx/`, `Router/`)
  instead of their own subfolder (which produced one-off groups like `card`, `sidebar`, `panel`).
  Needs the symlink `.design-sync/node_modules -> ../.ds-sync/node_modules` (recreate per clone).
- Sub-parts defined inside a parent file (DialogTitle, DropdownItem, TooltipContent, …) are not
  src-matched and fall to `general`; `docsMap` points them at stub docs in `.design-sync/groups/`
  that only carry a `category`.

- `srcDir` is the repo root, so the fuzzy source matcher also sees `.design-sync/previews/<Name>.tsx`.
  Components whose source file name differs from the export name (DateComponent → `common/Date/Date.tsx`,
  SortableTree → `intrexx/TreeEditor/Tree.tsx`) got matched to their preview file and grouped as `design-sync`;
  they are pinned via `componentSrcMap`. Any new preview for a similarly-named component needs the same pin.

## Known library issues found during sync (not fixed by the sync)

- `Button isLoading`: spinner is invisible — `.mp-button--loading { color: transparent }` also hides
  the `currentColor` spinner dots (`common/Button/Button.css:127-153`). Previews avoid the loading state.
- Undefined CSS tokens referenced by component CSS (validate `[TOKENS_MISSING]`):
  `--mp-color-background-secondary`, `--mp-color-error`, `--mp-color-error-light`, `--spacing-sm`,
  `--mp-color-text-secondary`, `--mp-font-size-md`, `--mp-color-foreground-muted`, `--mp-color-muted`.
  Not defined in `styles/variables.css`; affected declarations fall back to inherited/initial values.
- `--mp-color-primary-base` is only set at runtime by ThemeProvider (`common/ThemeProvider/themeUtils.ts:67`),
  never in `variables.css` → primary Badge (`common/Badge/Badge.css:72,89`), Table (`data-display/Table/Table.css:67`)
  and EmptyState colour-mix rules lose their background without a provider.
- User decision 2026-10-10: undefined tokens are shipped as-is (no sync shim, no library fix in this run).
  Affected cells (Checkbox/Radio/Input/Select Variants "filled", Input/Select/Textarea/ColorPicker error states,
  Badge Variants primary) render the real bug and are graded good-with-note.
- Badge `solid` and `subtle` appearances have identical CSS (`common/Badge/Badge.css` ~69 vs 86).
- Toggle `default` variant unpressed is invisible: white `--mp-color-onPrimary` text on transparent
  (`common/Toggle/Toggle.css:61-65`). Previews show unpressed toggles with `variant="outline"`.
- Dropdown does not forward `open`/`defaultOpen` (`common/Dropdown/Dropdown.tsx:104-110`); the preview opens
  it by dispatching `pointerdown` on the trigger after mount.
- Table ignores `children` (`data-display/Table/Table.tsx:57`); TableHeader/Body/Row/Cell can't be composed
  inside it. `useReactTable`/`getCoreRowModel`/`getSortedRowModel` are not exported, so the Table preview
  hand-builds a minimal read-only table object.
- `intrexx/Icon/IntrexxIcon.css:86-88`: `color: "currentColor"` (quoted) is invalid CSS.
- Sidebar: `.mp-sidebar__wrapper { height: 100vh }` — standalone previews need a fixed-height frame;
  expandable SidebarItem chevron is a tiny absolutely-positioned triangle (`layout/Sidebar/SidebarItem.css:100-112`);
  nested items start collapsed with no prop to open them.
- Section `hero` has no horizontal padding on desktop (`layout/Section/Section.css:13-19`).
- FormControl does not style its child; previews pass `<input className="mp-input mp-input--md">`.
- `Tabs`, `Combobox`, `Disclosure`, `CardList`, `IconPicker`, `NativeSelect`, `ReactSelect`, `Label`
  have folders + examples but are not exported from `index.ts`, so they are not in the bundle.

## Fonts

- Intrexx icon font (icon54-line / icon54-solid) lives only in `demo/iconFont/` (host apps provide it).
  User approved shipping it to the design project (2026-10-10): `extraFonts` copies the `@font-face` +
  woff/woff2, and `buildCmd` inserts the glyph class rules (with `@font-face` blocks stripped) into `ds-styles.css` BEFORE `dist/style.css` — same order as `demo/main.tsx`; otherwise the icon54 `font: … 14px` shorthand overrides `.mp-intrexx-icon--<size>`.
  Commercial font — keep only while the licence allows it.

- Base font is a system stack (`-apple-system, …, Arial, sans-serif`); nothing to ship.
- `--font-family-mono` lists "Ubuntu Mono" as a fallback system font; suppressed via
  `runtimeFontPrefixes` (it is never meant to ship).

## Known render warns

- `[TOKENS_MISSING]` 8 tokens — library issue above, not a sync problem.
- `[GRID_OVERFLOW]` was resolved with `cardMode: "column"` for Accordion, EmptyState, Toggle, Flex, Grid, Page,
  Panel, Section (plus the pre-set column/single overrides) — a re-flag on these means a preview got wider.
- Converter runs: `--node-modules ./node_modules --entry ./dist/index.js`; re-sync via `resync.mjs` with
  `--remote .design-sync/.cache/remote-sync.json` (fetch `_ds_sync.json` from the project first).

## Preview authoring tips

- lucide-react is not importable from previews: use inline SVG with `currentColor`, emoji for sidebar icons,
  data-URI SVGs for `Image`.
- Slider is controlled → previews use `useState`. DateComponent fallback: `date=""`.
- Checkbox/Radio variants only differ unchecked → show one unchecked + one checked per variant.
- Single-card overlays (Dialog, Dropdown, Tooltip) keep the open export first/only.
- AppLayout preview: wrap in `<div style={{height:560}}>`; viewport 960 keeps desktop mode (breakpoint 768).
- Pagination needs a real `PaginationState` object; without it the floor card shows "NaN bis NaN von undefined".

## Re-sync risks

- `index.ts` gained an uncommitted `IconPicker` export during this sync (user's change); it ships with a floor card.

- `ds-styles.css` is generated by `buildCmd`; running the converter without re-running `buildCmd`
  ships stale tokens/CSS.
- `base.css` mirrors `demo/index.css` host defaults by hand — if the demo's base font/colour changes, update it.
- The `source-kit.mjs` fork is a copy of the bundled converter lib; on re-sync diff it against
  `.ds-sync/lib/source-kit.mjs` and merge upstream changes.
- `.d.ts` contracts omit inherited native HTML attributes (`disabled`, `onClick`, `placeholder`, …);
  the conventions header tells the design agent they are forwarded.
