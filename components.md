# Component Production Readiness Plan

Each component below is identified as **`[package].[ComponentName]`**.  
Tasks are named and each subtask is numbered.  
Components listed as ✅ **Production-ready** require no further action.

---

## Package: `common`

---

### `common.Accordion`

#### Testing
1. Add error/empty state tests (no items, disabled items).
2. Add variant tests covering all `variant` prop values.

#### FileSize
1. Split `Accordion.tsx` (currently ~250 lines) — extract sub-components `AccordionItem` and `AccordionPanel` into separate files.
2. Split `Accordion.css` (currently ~192 lines) — move item/panel styles into separate partial CSS files.

---

### `common.Badge`

#### FileSize
1. Split `Badge.css` (currently ~169 lines) — extract modifier/variant rules into a `Badge.variants.css` partial.

#### Testing
1. Add error/empty state tests (empty label, very long text overflow).

---

### `common.Button`

#### FileSize
1. Split `Button.tsx` (currently ~109 lines) — extract icon-slot logic into a `ButtonIcon` sub-component.
2. Split `Button.css` (currently ~174 lines) — extract variant and size modifier rules into a `Button.variants.css` partial.

#### Testing
1. Add error/empty state tests (disabled state interactions, loading state).

---

### `common.Dialog`

#### FileSize
1. Split `Dialog.tsx` (currently ~234 lines) — extract `DialogHeader`, `DialogFooter`, and `DialogBody` into separate files.
2. Split `Dialog.css` (currently ~165 lines) — extract overlay, header, and footer rules into partials.

#### Testing
1. Add error/empty state tests (empty body, missing title).

---

### `common.Disclosure`

#### FileSize
1. Split `Disclosure.tsx` (currently ~138 lines) — extract the trigger and panel into `DisclosureTrigger` and `DisclosurePanel` files.
2. Split `Disclosure.css` (currently ~110 lines) — extract expanded/collapsed state rules.

#### Testing
1. Add error/empty state tests (empty content, disabled state).

---

### `common.Dropdown`

#### FileSize
1. Split `Dropdown.tsx` (currently ~206 lines) — extract `DropdownTrigger`, `DropdownMenu`, and `DropdownItem` into separate files.
2. Split `Dropdown.css` (currently ~104 lines) — extract menu and item rules into a partial.

#### Testing
1. Add error/empty state tests (empty items list, disabled trigger).

---

### `common.EmptyState`

#### FileSize
1. Split `EmptyState.tsx` (currently ~112 lines) — extract icon slot and action slot into sub-components.
2. Split `EmptyState.css` (currently ~141 lines) — extract icon and action styles into partials.

#### Testing
1. Add keyboard navigation tests (focusable action button inside empty state).

---

### `common.Image`

✅ **Production-ready** — no action required.

---

### `common.Skeleton`

#### FileSize
1. Split `Skeleton.tsx` (currently ~131 lines) — extract animation and variant logic into helpers.

#### Testing
1. Add props/variant tests covering all shape variants (text, circle, rect).
2. Add keyboard navigation tests (if skeleton wraps focusable content).
3. Add error/empty state tests (zero-width/height edge cases).

---

### `common.Tabs`

#### FileSize
1. Split `Tabs.tsx` (currently ~144 lines) — extract `TabList`, `Tab`, and `TabPanel` into separate files.
2. Split `Tabs.css` (currently ~138 lines) — extract panel and active-state rules into partials.

#### Testing
1. Add error/empty state tests (no tabs, single tab, disabled tab).

---

### `common.Text`

#### FileSize
1. Split `Text.tsx` (currently ~125 lines) — extract variant mapping into a constants file.
2. Split `Text.css` (currently ~113 lines) — extract scale/variant rules into a partial.

#### Testing
1. Add error/empty state tests (empty string, very long text truncation).

---

### `common.ThemeProvider`

#### Testing
1. Add basic render test (provider mounts, children are visible).
2. Add props/variant tests (light theme applied, dark theme applied, default theme).
3. Add keyboard navigation tests (focus management inside themed tree).
4. Add accessibility tests (`axe-core` scan of themed content).
5. Add error/empty state tests (missing theme value falls back to default).

#### TypeScript
1. Add `forwardRef` if the provider exposes a DOM node.
2. Add `displayName = "ThemeProvider"`.
3. Export `ThemeProviderProps` interface.
4. Add JSDoc comment on the component and all exported props.

#### FileSize
1. Split `ThemeProvider.tsx` (currently ~204 lines) — extract context and hook into `ThemeContext.ts` and `useTheme.ts`.
2. Split `ThemeProvider.css` (currently ~185 lines) — extract light and dark theme variables into separate CSS files.

---

### `common.Toggle`

#### FileSize
1. Split `Toggle.tsx` (currently ~121 lines) — extract Radix primitive wrapper logic.
2. Split `Toggle.css` (currently ~107 lines) — extract state modifier rules.

#### Testing
1. Add error/empty state tests (disabled state, no label).

---

### `common.ToggleGroup`

#### FileSize
1. Split `ToggleGroup.tsx` (currently ~130 lines) — extract `ToggleGroupItem` into a separate file.
2. Split `ToggleGroup.css` (currently ~130 lines) — extract item modifier rules into a partial.

#### Testing
1. Add error/empty state tests (empty group, single item, all disabled).

---

### `common.Tooltip`

#### FileSize
1. Split `Tooltip.tsx` (currently ~188 lines) — extract trigger wrapper and content into `TooltipTrigger` and `TooltipContent` files.

#### Testing
1. Add error/empty state tests (empty content, very long tooltip text overflow).

---

### `common.UserAvatars`

#### FileSize
1. Split `UserAvatars.css` (currently ~151 lines) — extract overflow indicator and stacked layout rules.

#### Testing
1. Add keyboard navigation tests (focusable avatar items, overflow indicator).

---

## Package: `controls`

---

### `controls.Checkbox`

#### FileSize
1. Split `Checkbox.tsx` (currently ~173 lines) — extract indicator and label layout into sub-components.
2. Split `Checkbox.css` (currently ~212 lines) — extract checked, indeterminate, and disabled state rules into a partial.

---

### `controls.CheckboxGroup`

#### FileSize
1. Split `CheckboxGroup.tsx` (currently ~241 lines) — extract group legend, item list, and validation message into separate files.

---

### `controls.Combobox`

#### FileSize
1. Split `Combobox.tsx` (currently ~369 lines) — extract `ComboboxInput`, `ComboboxList`, and `ComboboxItem` into separate files.
2. Split `Combobox.css` (currently ~184 lines) — extract list and item styles into a partial.

---

### `controls.FormBuilder`

#### TypeScript
1. Add `forwardRef` to expose the underlying form DOM node.
2. Export `FormBuilderProps` interface (currently unexported).
3. Verify all field-level prop types are individually exported.

#### FileSize
1. Split `FormBuilder.tsx` (currently ~168 lines) — extract field renderer and validation logic into helper files.

---

### `controls.FormControl`

#### TypeScript
1. Add `forwardRef` to expose the wrapper DOM node to consumers.

---

### `controls.Input`

#### FileSize
1. Split `Input.tsx` (currently ~110 lines) — extract prefix/suffix slot logic into `InputAddon` sub-component.

---

### `controls.Label`

✅ **Production-ready** — no action required.

---

### `controls.NativeSelect`

#### FileSize
1. Split `NativeSelect.tsx` (currently ~118 lines) — extract option rendering into a helper.
2. Split `NativeSelect.css` (currently ~105 lines) — extract state modifier rules.

---

### `controls.Radio`

#### FileSize
1. Split `Radio.tsx` (currently ~165 lines) — extract `RadioGroup` wrapper into a separate file.
2. Split `Radio.css` (currently ~140 lines) — extract checked and disabled state rules into a partial.

---

### `controls.ReactSelect`

#### TypeScript
1. Add `forwardRef` so the internal `react-select` ref is forwarded to consumers.

#### FileSize
1. Split `ReactSelect.tsx` (currently ~145 lines) — extract custom option and value components.
2. Split `ReactSelect.css` (currently ~163 lines) — extract menu and state rules into a partial.

---

### `controls.Select`

#### CSS
1. Create `Select.css` — the file is currently missing entirely. Add BEM-named styles matching the component structure.
2. Add `clsx` for all conditional class composition.

#### TypeScript
1. Add `forwardRef` to expose the trigger DOM node.

#### FileSize
1. Split `Select.tsx` (currently ~185 lines) — extract `SelectItem`, `SelectGroup`, and `SelectSeparator` into separate files.

---

### `controls.Textarea`

✅ **Production-ready** — no action required.

---

## Package: `data-display`

---

### `data-display.CardList`

#### FileSize
1. Split `CardList.tsx` (currently ~147 lines) — extract `CardListItem` into its own file.

---

### `data-display.Datalist`

#### CSS
1. Refactor `Datalist.css` to use BEM naming (`.datalist`, `.datalist__item`, `.datalist__label`, `.datalist__value`, etc.).
2. Add `clsx` to `Datalist.tsx` for conditional class composition.

#### FileSize
1. Split `Datalist.tsx` (currently ~204 lines) — extract `DatalistItem` and `DatalistGroup` into separate files.

---

### `data-display.Pagination`

#### FileSize
1. Split `Pagination.tsx` (currently ~159 lines) — extract page-size selector and page-number buttons into sub-components.
2. Split `Pagination.css` (currently ~202 lines) — extract button and ellipsis modifier rules into a partial.

#### Testing
1. Add keyboard navigation tests (Arrow keys, Home/End to jump pages, Enter to activate page buttons).

---

### `data-display.Table`

#### FileSize
1. Split `Table.tsx` (currently ~103 lines) — extract `TableHeader`, `TableBody`, and `TableFooter` into separate files.
2. Split `Table.css` (currently ~122 lines) — extract row state and column alignment rules.

#### Testing
1. Add props/variant tests (striped, bordered, compact variants).
2. Add keyboard navigation tests (row selection via keyboard, sortable column headers).

---

## Package: `layout`

---

### `layout.AppLayout`

#### TypeScript
1. Add `forwardRef` to expose the root layout DOM node.
2. Export `AppLayoutProps` interface.

---

### `layout.Card`

#### FileSize
1. Split `Card.tsx` (currently ~146 lines) — extract `CardHeader`, `CardBody`, and `CardFooter` into separate files.
2. Split `Card.css` (currently ~200 lines) — extract header, body, footer, and interactive state rules into partials.

#### Testing
1. Add keyboard navigation tests (focusable card, card-as-link pattern).
2. Add error/empty state tests (card with no header, card with no footer).

---

### `layout.Flex`

#### TypeScript
1. Add `displayName = "Flex"`.

#### Testing
1. Add basic render test (Flex container is visible).
2. Add props/variant tests (direction, wrap, align, justify, gap prop combinations).
3. Add keyboard navigation tests (focus moves through children).
4. Add accessibility tests (`axe-core` scan).
5. Add error/empty state tests (empty Flex, single child).

---

### `layout.Grid`

#### FileSize
1. Split `Grid.tsx` (currently ~149 lines) — extract `GridItem` into a separate file.
2. Split `Grid.css` (currently ~230 lines) — extract column/row span helper classes and responsive breakpoints into partials.

#### Testing
1. Add accessibility tests (`axe-core` scan of grid layout).
2. Add error/empty state tests (empty grid, single cell).

---

### `layout.HorizontalNav`

#### FileSize
1. Split `HorizontalNav.tsx` (currently ~157 lines) — extract `HorizontalNavItem` and `HorizontalNavDropdown` into separate files.

---

### `layout.Page`

✅ **Production-ready** — no action required.

---

### `layout.Panel`

#### FileSize
1. Split `Panel.tsx` (currently ~107 lines) — extract `PanelHeader` and `PanelBody` into separate files.

#### Testing
1. Add keyboard navigation tests (collapsible panel if applicable).
2. Add error/empty state tests (empty panel, panel with no title).

---

### `layout.Section`

✅ **Production-ready** — no action required.

---

### `layout.Sidebar`

#### TypeScript
1. Add `forwardRef` to expose the sidebar DOM node.
2. Export `SidebarProps` interface.

---

## Package: `intrexx`

---

### `intrexx.Icon`

#### Implementation
1. Expand the component beyond its current ~14 lines — define a proper icon set prop (`name: IconName`) with a type-safe union of supported icon names.
2. Create `Icon.css` with BEM-named styles (`.icon`, `.icon--sm`, `.icon--md`, `.icon--lg`).
3. Add `aria-hidden="true"` by default; accept an optional `aria-label` prop for standalone icons.

#### TypeScript
1. Add `forwardRef` to expose the SVG DOM node.
2. Add `displayName = "Icon"`.
3. Export `IconProps` interface and `IconName` union type.
4. Add JSDoc comments on the component and all props.

#### Testing
1. Add basic render test (icon renders with correct class).
2. Add props/variant tests (all icon names render without errors, size variants).
3. Add accessibility tests (`axe-core` scan, `aria-hidden` present by default).
4. Add error/empty state tests (unknown icon name falls back gracefully).

#### Exports
1. Add `index.ts` if missing, exporting `Icon`, `IconProps`, and `IconName`.

---

### `intrexx.IconPicker`

#### FileSize
1. Split `IconPicker.tsx` (currently ~274 lines) — extract `IconPickerSearch`, `IconPickerGrid`, and `IconPickerItem` into separate files.
2. Split `IconPicker.css` (currently ~390 lines) — extract grid layout, search bar, and item hover/selected state rules into partials.

#### Testing
1. Add error/empty state tests (no icons match search, empty icon set).

---

### `intrexx.TreeEditor`

#### TypeScript
1. Add `displayName = "TreeEditor"`.
2. Add JSDoc comment on the component and all exported props.

#### FileSize
1. Split `TreeEditor.css` (currently ~121 lines) — extract node, leaf, and drag-handle rules into partials.

#### Testing
1. Add basic render test (tree renders with root node).
2. Add props/variant tests (read-only mode, initial expanded nodes).
3. Add keyboard navigation tests (Arrow keys to navigate nodes, Enter/Space to expand/collapse, Delete to remove a node).
4. Add accessibility tests (`axe-core` scan, `role="tree"` / `role="treeitem"` present).
5. Add error/empty state tests (empty tree, single-node tree, deeply nested tree).

---

### `intrexx.TreeEditorOld`

#### Deprecation
1. Add a deprecation notice (JSDoc `@deprecated` tag and a console warning in development) directing consumers to `TreeEditor`.
2. Open a tracked issue / ticket to remove `TreeEditorOld` once all consumers have migrated.
3. Remove the component entirely once migration is confirmed (delete `TreeEditorOld.tsx`, `TreeEditorOld.css`, and its `index.ts` export).

#### TypeScript (if keeping until removal)
1. Add `forwardRef` to expose the root DOM node.
2. Add `clsx` for any conditional class composition.

#### FileSize (if keeping until removal)
1. Split `TreeEditorOld.css` (currently ~209 lines) — extract state modifier rules into a partial.

---

## Package: `router`

---

### `router.Router`

#### Audit
1. Verify `Router` exports a typed `RouteConfig` interface and all public hooks (`useRoute`, `useLocation`, etc.) are exported from `index.ts`.
2. Confirm all hooks are documented with JSDoc including parameter descriptions and return types.

#### Testing
1. Add basic render test (router renders matched route component).
2. Add props/variant tests (route matching, nested routes, redirect behaviour).
3. Add keyboard navigation tests (link navigation via keyboard, focus management after route change).
4. Add accessibility tests (`axe-core` scan, `aria-current="page"` on active link).
5. Add error/empty state tests (no matching route renders fallback/404, invalid path).

---

## Summary

| Package | Total | ✅ Production-ready | 🔴 Critical | 🟠 Needs Work |
|---|---|---|---|---|
| `common` | 16 | 1 (Image) | 1 (ThemeProvider – no tests) | 14 |
| `controls` | 12 | 2 (Label, Textarea) | 1 (Select – missing CSS) | 9 |
| `data-display` | 4 | 0 | 1 (Datalist – missing BEM/clsx) | 3 |
| `layout` | 9 | 2 (Page, Section) | 1 (Flex – no tests) | 6 |
| `intrexx` | 4 | 0 | 2 (Icon, TreeEditorOld) | 2 |
| `router` | 1 | 0 | 0 | 1 |
| **Total** | **46** | **5** | **6** | **35** |

---

*Last updated: 2026-03-22*
