# AGENTS.md

Component catalog for `@mp-ku/mp-components`, for agents working in this repo or consuming the published package. One line per exported component: folder, purpose, live demo (where one exists).

See [CLAUDE.md](./CLAUDE.md) for architecture, commands, and standards — this file is just the component index. Every component's real source of truth is its own `ComponentName.tsx` JSDoc (`@example` blocks show working usage) — this table is for discovery, not a substitute for reading the component.

Demo base URL: `https://konradullrich.github.io/componentLibary/?appRoute=/components/<slug>` (the `appRoute` param drives navigation — see `Router/ROUTER.md`). A `—` in the Demo column means no demo page exists yet.

## `common/` — shared primitives

| Component | Path | Purpose | Demo |
| --- | --- | --- | --- |
| Accordion | [common/Accordion](./common/Accordion) | Stacked set of collapsible panels, built on Radix UI Accordion. | [demo](https://konradullrich.github.io/componentLibary/?appRoute=/components/accordion) |
| Badge | [common/Badge](./common/Badge) | Small colored label for status, category, or count. | [demo](https://konradullrich.github.io/componentLibary/?appRoute=/components/badge) |
| Button | [common/Button](./common/Button) | Accessible button with variants and sizes, built on Radix primitives. | [demo](https://konradullrich.github.io/componentLibary/?appRoute=/components/button) |
| DateComponent | [common/Date](./common/Date) | Renders a locale-aware formatted date/time from a `Date` or ISO string, with fallback text. | [demo](https://konradullrich.github.io/componentLibary/?appRoute=/components/date) |
| Dialog | [common/Dialog](./common/Dialog) | Accessible modal dialog (focus trap, keyboard nav, ARIA) built on Radix UI. | [demo](https://konradullrich.github.io/componentLibary/?appRoute=/components/dialog) |
| Disclosure | [common/Disclosure](./common/Disclosure) | Collapsible show/hide content block, built on Radix UI Collapsible. | [demo](https://konradullrich.github.io/componentLibary/?appRoute=/components/disclosure) |
| Dropdown | [common/Dropdown](./common/Dropdown) | Accessible dropdown menu built on Radix UI, with keyboard nav and focus management. | [demo](https://konradullrich.github.io/componentLibary/?appRoute=/components/dropdown) |
| EmptyState | [common/EmptyState](./common/EmptyState) | Communicates an area has no content yet or needs a user action (empty lists, errors, no access, ...). | [demo](https://konradullrich.github.io/componentLibary/?appRoute=/components/empty-state) |
| Image | [common/Image](./common/Image) | Accessible image with object-fit, rounded corners, aspect-ratio helpers, and error fallback. | — |
| Skeleton | [common/Skeleton](./common/Skeleton) | Placeholder loading indicator (text lines, circles, rectangles) mimicking loading content. | [demo](https://konradullrich.github.io/componentLibary/?appRoute=/components/skeleton) |
| Tabs | [common/Tabs](./common/Tabs) | Tabbed interface with keyboard nav/ARIA, built on Radix UI, controlled or uncontrolled. | [demo](https://konradullrich.github.io/componentLibary/?appRoute=/components/tabs) |
| Text | [common/Text](./common/Text) | Semantic text component with consistent typography (size/weight/element). | [demo](https://konradullrich.github.io/componentLibary/?appRoute=/components/text) |
| ThemeProvider | [common/ThemeProvider](./common/ThemeProvider) | Runtime theme customization via CSS custom properties (colors, spacing, typography, radius, focus). | [demo](https://konradullrich.github.io/componentLibary/?appRoute=/components/theme-provider) |
| Toggle | [common/Toggle](./common/Toggle) | Two-state on/off button, built on Radix UI, controlled or uncontrolled. | [demo](https://konradullrich.github.io/componentLibary/?appRoute=/components/toggle) |
| ToggleGroup | [common/ToggleGroup](./common/ToggleGroup) | Set of toggle buttons with single- or multi-select, roving focus, built on Radix UI. | [demo](https://konradullrich.github.io/componentLibary/?appRoute=/components/toggle-group) |
| Tooltip | [common/Tooltip](./common/Tooltip) | Accessible tooltip; wrap the app/section in `TooltipProvider` first. | [demo](https://konradullrich.github.io/componentLibary/?appRoute=/components/tooltip) |
| UserAvatars | [common/UserAvatars](./common/UserAvatars) | Displays multiple user avatars grouped together with an overflow indicator. | [demo](https://konradullrich.github.io/componentLibary/?appRoute=/components/user-avatars) |

## `controls/` — form elements

| Component | Path | Purpose | Demo |
| --- | --- | --- | --- |
| Checkbox | [controls/Checkbox](./controls/Checkbox) | Accessible checkbox input with top/inline labels, error states, helper text. | [demo](https://konradullrich.github.io/componentLibary/?appRoute=/components/checkbox) |
| CheckboxGroup | [controls/CheckboxGroup](./controls/CheckboxGroup) | Group of checkboxes with unified multi-select state, variants, error states. | [demo](https://konradullrich.github.io/componentLibary/?appRoute=/components/checkbox-group) |
| ColorPicker | [controls/ColorPicker](./controls/ColorPicker) | Native color swatch paired with an editable hex text field. | [demo](https://konradullrich.github.io/componentLibary/?appRoute=/components/color-picker) |
| Combobox | [controls/Combobox](./controls/Combobox) | Accessible search/autocomplete select built on Radix UI Popover. | [demo](https://konradullrich.github.io/componentLibary/?appRoute=/components/combobox) |
| FormBuilder | [controls/FormBuilder](./controls/FormBuilder) | Declarative, type-safe form generation powered by TanStack Form (schema + field-level validators). | [demo](https://konradullrich.github.io/componentLibary/?appRoute=/components/form-builder) |
| FormControl | [controls/FormControl](./controls/FormControl) | Shared layout wrapper (label, helper text, error message) used by Input/Select/Checkbox/etc. | — |
| Input | [controls/Input](./controls/Input) | Text input with variants, sizes, states, labels, helper text, error messages. | [demo](https://konradullrich.github.io/componentLibary/?appRoute=/components/input) |
| Label | [controls/Label](./controls/Label) | Shared label for form inputs, with optional required indicator. | — |
| NativeSelect | [controls/NativeSelect](./controls/NativeSelect) | Native HTML `<select>` with custom styling — simpler alternative to `Select`. | — |
| Radio | [controls/Radio](./controls/Radio) | Accessible radio input with top/inline labels, error states, helper text. | [demo](https://konradullrich.github.io/componentLibary/?appRoute=/components/radio) |
| ReactSelect | [controls/ReactSelect](./controls/ReactSelect) | Accessible select dropdown built on Radix UI, with variants/sizes/labels/error states. | — |
| Select | [controls/Select](./controls/Select) | Adaptive select: native `<select>` on mobile, Radix UI select on desktop. | [demo](https://konradullrich.github.io/componentLibary/?appRoute=/components/select) |
| Slider | [controls/Slider](./controls/Slider) | Styled range input. | [demo](https://konradullrich.github.io/componentLibary/?appRoute=/components/slider) |
| Textarea | [controls/Textarea](./controls/Textarea) | Multi-line text input with label, helper text, error message support. | — |

## `data-display/`

| Component | Path | Purpose | Demo |
| --- | --- | --- | --- |
| CardList | [data-display/CardList](./data-display/CardList) | Displays items in a responsive grid of cards. | [demo](https://konradullrich.github.io/componentLibary/?appRoute=/components/card-list) |
| Datalist | [data-display/Datalist](./data-display/Datalist) | Flexible data display wrapping TanStack Table; switches between table and card variants. | [demo](https://konradullrich.github.io/componentLibary/?appRoute=/components/datalist) |
| Pagination | [data-display/Pagination](./data-display/Pagination) | Pagination controls (page nav + optional size selector); consumes `usePagination`'s return value directly. Default labels are **German** — override via the `labels` prop for other locales. | [demo](https://konradullrich.github.io/componentLibary/?appRoute=/components/pagination) |
| Table | [data-display/Table](./data-display/Table) | TanStack Table integration with semantic HTML and design-token styling. | [demo](https://konradullrich.github.io/componentLibary/?appRoute=/components/table) |

## `layout/`

| Component | Path | Purpose | Demo |
| --- | --- | --- | --- |
| AppLayout | [layout/AppLayout](./layout/AppLayout) | Main app shell: header, sidebar, and content areas with responsive/z-index handling. | [demo](https://konradullrich.github.io/componentLibary/?appRoute=/components/app-layout) |
| Card | [layout/Card](./layout/Card) | Container for card-formatted content; pair with `CardHeader`/`CardContent`/`CardFooter`. | [demo](https://konradullrich.github.io/componentLibary/?appRoute=/components/card) |
| Flex | [layout/Flex](./layout/Flex) | Flexbox layout wrapper (direction, justify, align, gap). | [demo](https://konradullrich.github.io/componentLibary/?appRoute=/components/flex) |
| Grid | [layout/Grid](./layout/Grid) | CSS Grid layout wrapper with responsive column breakpoints; use `GridItem` for per-cell span. | — |
| HorizontalNav | [layout/HorizontalNav](./layout/HorizontalNav) | Horizontal nav that collapses to a select dropdown on mobile. | [demo](https://konradullrich.github.io/componentLibary/?appRoute=/components/horizontal-nav) |
| Page | [layout/Page](./layout/Page) | Full-page content wrapper with max-width centering and consistent padding. | — |
| Panel | [layout/Panel](./layout/Panel) | Container for grouping content, with variants, padding sizes, responsive spacing. | [demo](https://konradullrich.github.io/componentLibary/?appRoute=/components/panel) |
| Section | [layout/Section](./layout/Section) | Content section block with consistent styling. | — |
| Sidebar | [layout/Sidebar](./layout/Sidebar) | Responsive sidebar — collapsible on desktop, drawer on mobile; scoped per instance via its own store. | [demo](https://konradullrich.github.io/componentLibary/?appRoute=/components/sidebar) |

## `intrexx/` — Intrexx-integration components

| Component | Path | Purpose | Demo |
| --- | --- | --- | --- |
| IntrexxIcon | [intrexx/Icon](./intrexx/Icon) | Renders an icon from the Intrexx icon font by class name. | [demo](https://konradullrich.github.io/componentLibary/?appRoute=/components/intrexx-icon) |
| IconPicker | [intrexx/IconPicker](./intrexx/IconPicker) | Browse/search/select icons from the Intrexx icon font, with category and style (line/solid) filtering. | [demo](https://konradullrich.github.io/componentLibary/?appRoute=/components/icon-picker) |
| SortableTree | [intrexx/TreeEditor](./intrexx/TreeEditor) | Drag-and-drop sortable tree editor (built on `@dnd-kit`), exported via `SortableTreeHandle`. | [demo](https://konradullrich.github.io/componentLibary/?appRoute=/components/tree-editor) |

## Shared infrastructure

Not components, but load-bearing for anything above that reads/writes URL state — see [CLAUDE.md](./CLAUDE.md) for the full explanation before touching these:

- [Router/](./Router) — param-based routing (`?appRoute=`), safe for iframe/CMS embedding. See [Router/ROUTER.md](./Router/ROUTER.md).
- [hooks/](./hooks) — `usePersistedState` and friends (`useUrlState`, `usePagination`, `useUrlSort`, `useFilter`) for URL-synced state.
- [stores/](./stores) — Zustand stores (`filterStore`, `sortingStore`, `valueStore`) paired with `useRouterSync`.
