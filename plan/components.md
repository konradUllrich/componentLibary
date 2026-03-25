# Component Production Readiness Plan

Each component below is identified as **`[package].[ComponentName]`**.  
Tasks are named and each subtask is numbered.  
Components listed as ✅ **Production-ready** require no further action.

---

## Package: `common`

---

### `common.Accordion`

#### CSS
@copilot resolve the following task 
1. Add `mp-` prefix to all CSS classes (`.accordion` → `.mp-accordion`, `.accordion__item` → `.mp-accordion__item`, etc.) and update all usages in `Accordion.tsx`.

#### Testing
1. Add error/empty state tests (no items, disabled items).
2. Add variant tests covering all `variant` prop values.

#### FileSize
1. Split `Accordion.tsx` (currently ~250 lines) — extract sub-components `AccordionItem` and `AccordionPanel` into separate files.
2. Split `Accordion.css` (currently ~192 lines) — move item/panel styles into separate partial CSS files.

---

### `common.Badge`

#### CSS
1. Add `mp-` prefix to all CSS classes (`.badge` → `.mp-badge`, `.badge--sm` → `.mp-badge--sm`, etc.) and update all usages in `Badge.tsx`.

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

### `common.Date`

#### TypeScript
1. Add `displayName = "DateComponent"` to the exported component.
2. Add JSDoc comment on the component explaining the supported `format` values and locale behaviour.
3. Consider adding `forwardRef` if the component ever renders a wrapping DOM element (currently renders inline text only — low priority).

#### Testing
1. Add basic render test (renders a formatted date string).
2. Add props/variant tests (all `format` values: `short`, `long`, `datetime`, `time`; custom `locale`).
3. Add accessibility tests (`axe-core` scan; verify output is readable by screen readers).
4. Add error/empty state tests (`null` input shows `fallback`, invalid date string shows `fallback`, empty string shows `fallback`).

#### CSS
1. No CSS file needed (renders inline text); confirm no styling is required.

---

### `common.Dialog`

#### CSS
1. Add `mp-` prefix to all CSS classes (`.dialog__overlay` → `.mp-dialog__overlay`, `.dialog__content` → `.mp-dialog__content`, etc.) and update all usages in `Dialog.tsx`.

#### FileSize
1. Split `Dialog.tsx` (currently ~234 lines) — extract `DialogHeader`, `DialogFooter`, and `DialogBody` into separate files.
2. Split `Dialog.css` (currently ~165 lines) — extract overlay, header, and footer rules into partials.

#### Testing
1. Add error/empty state tests (empty body, missing title).

---

### `common.Disclosure`

#### CSS
1. Add `mp-` prefix to all CSS classes (`.disclosure` → `.mp-disclosure`, `.disclosure-trigger` → `.mp-disclosure__trigger`, etc.) and update all usages in `Disclosure.tsx`.

#### FileSize
1. Split `Disclosure.tsx` (currently ~138 lines) — extract the trigger and panel into `DisclosureTrigger` and `DisclosurePanel` files.
2. Split `Disclosure.css` (currently ~110 lines) — extract expanded/collapsed state rules.

#### Testing
1. Add error/empty state tests (empty content, disabled state).

---

### `common.Dropdown`

#### CSS
1. Add `mp-` prefix to all CSS classes (`.dropdown__content` → `.mp-dropdown__content`, `.dropdown__item` → `.mp-dropdown__item`, etc.) and update all usages in `Dropdown.tsx`.

#### FileSize
1. Split `Dropdown.tsx` (currently ~206 lines) — extract `DropdownTrigger`, `DropdownMenu`, and `DropdownItem` into separate files.
2. Split `Dropdown.css` (currently ~104 lines) — extract menu and item rules into a partial.

#### Testing
1. Add error/empty state tests (empty items list, disabled trigger).

---

### `common.EmptyState`

#### CSS
1. Add `mp-` prefix to all CSS classes (`.empty-state` → `.mp-empty-state`, `.empty-state__icon` → `.mp-empty-state__icon`, etc.) and update all usages in `EmptyState.tsx`.

#### FileSize
1. Split `EmptyState.tsx` (currently ~112 lines) — extract icon slot and action slot into sub-components.
2. Split `EmptyState.css` (currently ~141 lines) — extract icon and action styles into partials.

#### Testing
1. Add keyboard navigation tests (focusable action button inside empty state).

---

### `common.Image`

#### CSS
1. Add `mp-` prefix to all CSS classes (`.image` → `.mp-image`, `.image--cover` → `.mp-image--cover`, etc.) and update all usages in `Image.tsx`.

---

### `common.Skeleton`

#### CSS
1. Add `mp-` prefix to all CSS classes (`.skeleton` → `.mp-skeleton`, `.skeleton--text` → `.mp-skeleton--text`, etc.) and update all usages in `Skeleton.tsx`.

#### FileSize
1. Split `Skeleton.tsx` (currently ~131 lines) — extract animation and variant logic into helpers.

#### Testing
1. Add props/variant tests covering all shape variants (text, circle, rect).
2. Add keyboard navigation tests (if skeleton wraps focusable content).
3. Add error/empty state tests (zero-width/height edge cases).

---

### `common.Tabs`

#### CSS
1. Add `mp-` prefix to all CSS classes (`.tabs` → `.mp-tabs`, `.tabs-list` → `.mp-tabs__list`, `.tabs-trigger` → `.mp-tabs__trigger`, etc.) and update all usages in `Tabs.tsx`.

#### FileSize
1. Split `Tabs.tsx` (currently ~144 lines) — extract `TabList`, `Tab`, and `TabPanel` into separate files.
2. Split `Tabs.css` (currently ~138 lines) — extract panel and active-state rules into partials.

#### Testing
1. Add error/empty state tests (no tabs, single tab, disabled tab).

---

### `common.Text`

#### CSS
1. Add `mp-` prefix to all CSS classes (`.text` → `.mp-text`, `.text--xs` → `.mp-text--xs`, etc.) and update all usages in `Text.tsx`.

#### FileSize
1. Split `Text.tsx` (currently ~125 lines) — extract variant mapping into a constants file.
2. Split `Text.css` (currently ~113 lines) — extract scale/variant rules into a partial.

#### Testing
1. Add error/empty state tests (empty string, very long text truncation).

---

### `common.ThemeProvider`

The `ThemeProvider` package is split into two main parts:
- **`ThemeContext`** — React context, `useTheme` hook, localStorage persistence logic (`ThemeContext.tsx`, `types.ts`, `useThemeEditor.ts`)
- **`ThemePanel`** — UI panel that exposes theme editing controls (`ThemePanel.tsx`, `ThemePanel.css`)

A test file `ThemeContext.test.tsx.skip` exists but is currently **skipped**.

#### CSS
1. Add `mp-` prefix to all CSS classes in `ThemePanel.css` (`.theme-panel` → `.mp-theme-panel`, `.theme-panel__toggle` → `.mp-theme-panel__toggle`, etc.) and update all usages in `ThemePanel.tsx`.

#### Testing
1. Unskip `ThemeContext.test.tsx.skip` (rename to `ThemeContext.test.tsx`) and fix any failing assertions.
2. Add basic render test for `ThemePanel` (panel mounts, toggle button is visible).
3. Add props/variant tests for `ThemeContext` (light theme applied, dark theme applied, default theme, custom color overrides).
4. Add props/variant tests for `ThemePanel` (open/close behaviour, color picker updates propagate to context).
5. Add keyboard navigation tests (Tab through ThemePanel controls, Escape closes panel).
6. Add accessibility tests (`axe-core` scan of `ThemePanel`, verify color contrast of panel itself).
7. Add error/empty state tests (corrupt localStorage value falls back to `defaultTheme`).

#### TypeScript
1. Export `ThemeConfig` and `ThemeContextValue` interfaces from `index.ts` so consumers can type their theme overrides.
2. Add `displayName = "ThemePanel"` to `ThemePanel.tsx`.
3. Add JSDoc comments on `useTheme` hook and `ThemePanel` component.

#### FileSize
1. `ThemeContext.tsx` (currently ~150 lines) — consider extracting `loadThemeFromStorage` / `saveThemeToStorage` helpers into a `themeStorage.ts` utility.

---

### `common.Toggle`

#### CSS
1. Add `mp-` prefix to all CSS classes (`.toggle` → `.mp-toggle`, `.toggle--sm` → `.mp-toggle--sm`, etc.) and update all usages in `Toggle.tsx`.

#### FileSize
1. Split `Toggle.tsx` (currently ~121 lines) — extract Radix primitive wrapper logic.
2. Split `Toggle.css` (currently ~107 lines) — extract state modifier rules.

#### Testing
1. Add error/empty state tests (disabled state, no label).

---

### `common.ToggleGroup`

#### CSS
1. Add `mp-` prefix to all CSS classes (`.toggle-group` → `.mp-toggle-group`, `.toggle-group__item` → `.mp-toggle-group__item`, etc.) and update all usages in `ToggleGroup.tsx`.

#### FileSize
1. Split `ToggleGroup.tsx` (currently ~130 lines) — extract `ToggleGroupItem` into a separate file.
2. Split `ToggleGroup.css` (currently ~130 lines) — extract item modifier rules into a partial.

#### Testing
1. Add error/empty state tests (empty group, single item, all disabled).

---

### `common.Tooltip`

#### CSS
1. Add `mp-` prefix to all CSS classes (`.tooltip__content` → `.mp-tooltip__content`, `.tooltip__arrow` → `.mp-tooltip__arrow`, etc.) and update all usages in `Tooltip.tsx`.

#### FileSize
1. Split `Tooltip.tsx` (currently ~188 lines) — extract trigger wrapper and content into `TooltipTrigger` and `TooltipContent` files.

#### Testing
1. Add error/empty state tests (empty content, very long tooltip text overflow).

---

### `common.UserAvatars`

#### CSS
1. Add `mp-` prefix to all CSS classes (`.user-avatar` → `.mp-user-avatar`, `.user-avatar--sm` → `.mp-user-avatar--sm`, etc.) and update all usages in `UserAvatars.tsx`.

#### FileSize
1. Split `UserAvatars.css` (currently ~151 lines) — extract overflow indicator and stacked layout rules.

#### Testing
1. Add keyboard navigation tests (focusable avatar items, overflow indicator).

---

## Package: `controls`

---

### `controls.Checkbox`

#### CSS
1. Add `mp-` prefix to all CSS classes (`.checkbox-container` → `.mp-checkbox`, `.checkbox-input` → `.mp-checkbox__input`, `.checkbox-label` → `.mp-checkbox__label`, etc.) and update all usages in `Checkbox.tsx`.

#### FileSize
1. Split `Checkbox.tsx` (currently ~173 lines) — extract indicator and label layout into sub-components.
2. Split `Checkbox.css` (currently ~212 lines) — extract checked, indeterminate, and disabled state rules into a partial.

---

### `controls.CheckboxGroup`

#### CSS
1. Add `mp-` prefix to all CSS classes (`.checkbox-group` → `.mp-checkbox-group`, `.checkbox-group--horizontal` → `.mp-checkbox-group--horizontal`, etc.) and update all usages in `CheckboxGroup.tsx`.

#### FileSize
1. Split `CheckboxGroup.tsx` (currently ~241 lines) — extract group legend, item list, and validation message into separate files.

---

### `controls.Combobox`

#### CSS
1. Add `mp-` prefix to all CSS classes (`.combobox` → `.mp-combobox`, `.combobox__input` → `.mp-combobox__input`, etc.) and update all usages in `Combobox.tsx`.

#### FileSize
1. Split `Combobox.tsx` (currently ~369 lines) — extract `ComboboxInput`, `ComboboxList`, and `ComboboxItem` into separate files.
2. Split `Combobox.css` (currently ~184 lines) — extract list and item styles into a partial.

---

### `controls.FormBuilder`

#### CSS
1. Add `mp-` prefix to all CSS classes (`.form-builder` → `.mp-form-builder`, `.form-builder__field` → `.mp-form-builder__field`, etc.) and update all usages in `FormBuilder.tsx`.

#### TypeScript
1. Add `forwardRef` to expose the underlying form DOM node.
2. Export `FormBuilderProps` interface (currently unexported).
3. Verify all field-level prop types are individually exported.

#### FileSize
1. Split `FormBuilder.tsx` (currently ~168 lines) — extract field renderer and validation logic into helper files.

---

### `controls.FormControl`

#### CSS
1. Add `mp-` prefix to all CSS classes (`.form-control` → `.mp-form-control`, `.form-control__input` → `.mp-form-control__input`, `.form-control__message` → `.mp-form-control__message`, etc.) and update all usages in `FormControl.tsx`.

#### TypeScript
1. Add `forwardRef` to expose the wrapper DOM node to consumers.

---

### `controls.Input`

#### CSS
1. Add `mp-` prefix to all CSS classes (`.input` → `.mp-input`, `.input--error` → `.mp-input--error`, etc.) and update all usages in `Input.tsx`.

#### FileSize
1. Split `Input.tsx` (currently ~110 lines) — extract prefix/suffix slot logic into `InputAddon` sub-component.

---

### `controls.Label`

#### CSS
1. Add `mp-` prefix to all CSS classes (`.label` → `.mp-label`, `.label__required` → `.mp-label__required`, etc.) and update all usages in `Label.tsx`.

---

### `controls.NativeSelect`

#### CSS
1. Add `mp-` prefix to all CSS classes (`.native-select-container` → `.mp-native-select`, `.native-select` → `.mp-native-select__input`, etc.) and update all usages in `NativeSelect.tsx`.

#### FileSize
1. Split `NativeSelect.tsx` (currently ~118 lines) — extract option rendering into a helper.
2. Split `NativeSelect.css` (currently ~105 lines) — extract state modifier rules.

---

### `controls.Radio`

#### CSS
1. Add `mp-` prefix to all CSS classes (`.radio-container` → `.mp-radio`, `.radio-input` → `.mp-radio__input`, `.radio-label` → `.mp-radio__label`, etc.) and update all usages in `Radio.tsx`.

#### FileSize
1. Split `Radio.tsx` (currently ~165 lines) — extract `RadioGroup` wrapper into a separate file.
2. Split `Radio.css` (currently ~140 lines) — extract checked and disabled state rules into a partial.

---

### `controls.ReactSelect`

#### CSS
1. Add `mp-` prefix to all CSS classes (`.select-trigger` → `.mp-select__trigger`, etc.) and update all usages in `ReactSelect.tsx`.

#### TypeScript
1. Add `forwardRef` so the internal `react-select` ref is forwarded to consumers.

#### FileSize
1. Split `ReactSelect.tsx` (currently ~145 lines) — extract custom option and value components.
2. Split `ReactSelect.css` (currently ~163 lines) — extract menu and state rules into a partial.

---

### `controls.Select`

#### CSS
1. Create `Select.css` — the file is currently missing entirely. Add BEM-named styles with the `mp-` prefix (e.g. `.mp-select`, `.mp-select__trigger`, `.mp-select__item`) matching the component structure.
2. Add `clsx` for all conditional class composition.

#### TypeScript
1. Add `forwardRef` to expose the trigger DOM node.

#### FileSize
1. Split `Select.tsx` (currently ~185 lines) — extract `SelectItem`, `SelectGroup`, and `SelectSeparator` into separate files.

---

### `controls.SmartSelect`

File: `controls/Select/SmartSelect.tsx`. An adaptive select that renders `ReactSelect` on desktop and `NativeSelect` on mobile (via the `useIsMobile` hook). Missing: CSS, test file, `forwardRef`, `displayName`.

#### TypeScript
1. Add `forwardRef` to forward the ref to the underlying `ReactSelect` or `NativeSelect` component.
2. Add `displayName = "SmartSelect"`.
3. Add JSDoc comment explaining the adaptive behaviour and when each implementation is rendered.

#### CSS
1. Add any wrapper-level BEM styles with the `mp-` prefix to the existing `Select.css` (or a dedicated `SmartSelect.css` if styles differ significantly), e.g. `.mp-smart-select`.

#### Testing
1. Add basic render test (SmartSelect renders without errors).
2. Add props/variant tests (passes `label`, `error`, `size`, and `variant` props through to the underlying component).
3. Add keyboard navigation tests (Tab to focus, Arrow keys to navigate options, Enter to select).
4. Add accessibility tests (`axe-core` scan; verify label is associated with the control).
5. Add error/empty state tests (empty options list, error state, disabled state).

---

### `controls.Textarea`

#### CSS
1. Add `mp-` prefix to all CSS classes (`.textarea` → `.mp-textarea`, `.textarea--error` → `.mp-textarea--error`, etc.) and update all usages in `Textarea.tsx`.

---

## Package: `data-display`

---

### `data-display.CardList`

#### CSS
1. Add `mp-` prefix to all CSS classes (`.card-list` → `.mp-card-list`, `.card-list__item` → `.mp-card-list__item`, etc.) and update all usages in `CardList.tsx`.

#### FileSize
1. Split `CardList.tsx` (currently ~147 lines) — extract `CardListItem` into its own file.

---

### `data-display.Datalist`

#### CSS
1. Refactor `Datalist.css` to use BEM naming (`.datalist`, `.datalist__item`, `.datalist__label`, `.datalist__value`, etc.).
2. Add `mp-` prefix to all CSS classes (`.datalist` → `.mp-datalist`, `.datalist__item` → `.mp-datalist__item`, etc.) and update all usages in `Datalist.tsx`.
3. Add `clsx` to `Datalist.tsx` for conditional class composition.

#### FileSize
1. Split `Datalist.tsx` (currently ~204 lines) — extract `DatalistItem` and `DatalistGroup` into separate files.

---

### `data-display.Pagination`

#### CSS
1. Add `mp-` prefix to all CSS classes (`.pagination` → `.mp-pagination`, `.pagination__info` → `.mp-pagination__info`, etc.) and update all usages in `Pagination.tsx`.

#### Cleanup
1. Remove the duplicate `Pagionation.tsx` file (typo — missing the 'i' in Pagination). It is an exact copy of `Pagination.tsx` and should be deleted.

#### FileSize
1. Split `Pagination.tsx` (currently ~159 lines) — extract page-size selector and page-number buttons into sub-components.
2. Split `pagination.css` (currently ~202 lines) — extract button and ellipsis modifier rules into a partial.

#### Testing
1. Add keyboard navigation tests (Arrow keys, Home/End to jump pages, Enter to activate page buttons).

---

### `data-display.Table`

The table is already split into sub-components: `Table.tsx`, `TableBody.tsx`, `TableCell.tsx`, `TableHeader.tsx`, `TableRow.tsx`.

#### CSS
1. Add `mp-` prefix to all CSS classes (`.table-container` → `.mp-table-container`, `.table` → `.mp-table`, `.table__head` → `.mp-table__head`, etc.) and update all usages in `Table.tsx` and sub-components.

#### FileSize
1. Split `Table.css` (currently ~122 lines) — extract row state and column alignment rules.

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

### `layout.Panel`

#### FileSize
1. Split `Panel.tsx` (currently ~107 lines) — extract `PanelHeader` and `PanelBody` into separate files.

#### Testing
1. Add keyboard navigation tests (collapsible panel if applicable).
2. Add error/empty state tests (empty panel, panel with no title).

---

### `layout.Sidebar`

#### TypeScript
1. Add `forwardRef` to expose the sidebar DOM node.
2. Export `SidebarProps` interface.

---

## Package: `intrexx`

---

### `intrexx.IntrexxIcon`

File: `intrexx/Icon/IntrexxIcon.tsx`. The component renders an `<i>` element using a CSS icon class (Intrexx icon font). It already uses `clsx`, exports `IntrexxIconProps`, and sets `aria-hidden="true"` by default. Missing: `displayName`, a test file, and a CSS file.

#### TypeScript
1. Add `displayName = "IntrexxIcon"`.
2. Add an optional `aria-label` prop — when provided, remove `aria-hidden` so the icon is accessible as a standalone element.
3. Add JSDoc comment on the component and the `iconClass` prop.
4. Consider adding a type-safe `IconName` union type (or `enum`) for the supported Intrexx icon classes.

#### CSS
1. Create `IntrexxIcon.css` if base sizing/display styles are needed, using the `mp-` prefix (`.mp-intrexx-icon`, `.mp-intrexx-icon--sm/md/lg`).
2. Add `mp-` prefix to all existing CSS classes in `IntrexxIcon.css` (`.intrexx-icon` → `.mp-intrexx-icon`, etc.) and update all usages in `IntrexxIcon.tsx`.

#### Testing
1. Add basic render test (icon renders the correct `<i>` element).
2. Add props/variant tests (custom `iconClass` and `className` are applied, size variants if added).
3. Add accessibility tests (`axe-core` scan; `aria-hidden` present by default; `aria-label` overrides `aria-hidden`).
4. Add error/empty state tests (no `iconClass` provided renders without error).

---

### `intrexx.IconPicker`

#### CSS
1. Add `mp-` prefix to all CSS classes (`.icon-picker` → `.mp-icon-picker`, `.icon-picker__header` → `.mp-icon-picker__header`, etc.) and update all usages in `IconPicker.tsx`.

#### FileSize
1. Split `IconPicker.tsx` (currently ~274 lines) — extract `IconPickerSearch`, `IconPickerGrid`, and `IconPickerItem` into separate files.
2. Split `IconPicker.css` (currently ~390 lines) — extract grid layout, search bar, and item hover/selected state rules into partials.

#### Testing
1. Add error/empty state tests (no icons match search, empty icon set).

---

### `intrexx.TreeEditor`

#### CSS
1. Add `mp-` prefix to all CSS classes (`.sortable-tree` → `.mp-sortable-tree`, `.sortable-tree__item` → `.mp-sortable-tree__item`, etc.) and update all usages in `TreeEditor.tsx` and related files.

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

#### CSS (if keeping until removal)
1. Add `mp-` prefix to all CSS classes (`.tree-editor` → `.mp-tree-editor`, `.tree-editor__tree` → `.mp-tree-editor__tree`, etc.) and update all usages in `TreeEditorOld.tsx`.

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

## Package: `Router`

---

### `Router.Router`

The `Router` package wraps [wouter](https://github.com/molefrog/wouter) to use a URL search-parameter (`appRoute`) instead of the path, allowing the library to work inside iframes and GitHub Pages. It already has: `displayName`, JSDoc, `Router.test.tsx`, and `RouterHooks.test.tsx`.

#### Testing
1. Add accessibility tests (`axe-core` scan; verify `aria-current="page"` is applied to the active `Link`).
2. Add error/empty state tests (no matching `Route` renders nothing gracefully).

#### TypeScript
1. Verify that `createRoute`, `useSearchParams`, and all re-exported wouter hooks are individually documented with JSDoc `@param` / `@returns` descriptions in `hooks.ts` and `createRoute.ts`.

---

## Summary

| Package | Total | ✅ Production-ready | 🔴 Critical | 🟠 Needs Work |
|---|---|---|---|---|
| `common` | 17 | 0 | 1 (ThemeProvider – skipped tests) | 16 |
| `controls` | 13 | 0 | 1 (Select – missing CSS) | 12 |
| `data-display` | 4 | 0 | 1 (Datalist – missing BEM/clsx) | 3 |
| `layout` | 9 | 0 | 1 (Flex – no tests) | 8 |
| `intrexx` | 4 | 0 | 2 (IntrexxIcon, TreeEditorOld) | 2 |
| `Router` | 1 | 0 | 0 | 1 |
| **Total** | **48** | **0** | **6** | **42** |

---

*Last updated: 2026-03-22 (reviewed for accuracy)*

---

## Copilot Agent Tasks

Lines prefixed with `@copilot:` are automatically picked up by the **Copilot Agent Dispatcher** workflow (`.github/workflows/copilot-agent.yml`).  
Each line creates a GitHub Issue assigned to the Copilot coding agent.

@copilot: Add mp- prefix to all Button CSS classes and update usages in Button.tsx
@copilot: Split Accordion.tsx into AccordionItem and AccordionPanel sub-components
@copilot: Add error and empty state tests for the Dialog component
@copilot: Add mp- prefix to all Badge CSS classes and extract variant rules into Badge.variants.css
@copilot: Add displayName and JSDoc comment to the Date component
