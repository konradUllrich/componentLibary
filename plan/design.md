# Design & Usability Review

Reviewed by screenshotting the demo site (`pnpm demo`, dark theme, 1440×900) across ~25 component pages. This is a visual/UX review of what's actually rendered — not a code review. Findings are grouped by severity; each has a concrete fix suggestion.

## How this was produced

- Started `pnpm demo` (Vite, served at `/componentLibary/`).
- Navigated every route via the `?appRoute=` param (see `Router/ROUTER.md`) and captured full-page screenshots with a headless Playwright script.
- No console errors on any page.

## High-impact issues

### 1. Low-emphasis variants are functionally invisible
- **Button `Ghost` variant** ([ButtonPage](../demo/pages/ButtonPage.tsx), see `button.png`): no background, no border, no distinguishing color from body text. Next to `Primary`/`Secondary`/`Destructive` it doesn't read as a button at all — a user scanning the row would miss it as clickable.
- **Select `Filled` variant** (`select.png`): looks identical to plain unstyled text — no visible box, no border, no affordance that it's a dropdown trigger.
- **Fix:** every interactive variant needs *some* visible boundary in its resting state — at minimum a 1px border using the existing `--color-border`-style token, even for "quiet" variants. A hover/focus-only affordance isn't enough for the resting state to read as interactive.

### 2. EmptyState action buttons break the design system
- `empty-state.png`: "New item" and "Clear search" render as plain white boxes with black text and a thin black border — flat native-button styling, completely disconnected from the purple `Button` component used everywhere else (dialog, dropdown, card-list all use the branded purple primary button).
- **Fix:** `EmptyState`'s action slot should default to (or the demo should use) the library's own `Button` component instead of a bare `<button>`.

### 3. Locale mixing in Pagination demo
- `pagination.png`: labels read `"1 bis 10 von 100 Einträge"`, `"Anzeigen:"`, `"Eintrage"` — German — while every other page and the rest of the pagination UI (`«`, `‹`, `›`, `»`, page numbers) is English. This is either a hardcoded locale default or leftover test data; if it's the actual default of the `Pagination`/`usePagination` component, that's a bug that will surprise most consumers of the library.
- **Fix:** confirm the default locale is `en`, and make the demo explicit about it either way so it doesn't look accidental.

### 4. Floating theme-toggle button overlaps content
- The purple palette FAB (bottom center, all pages) sits on top of the last visible content block on nearly every page — e.g. cropping the code sample in `theme-provider.png` and `badge.png`, and covering part of a card in `card-list.png`.
- **Fix:** give it a fixed offset from the viewport edge with its own stacking layer and enough page bottom-padding that content can scroll clear of it, or move it into the top nav bar next to the existing "Theme" link (which already exists and does the same job — see #6).

## Medium-impact issues

### 5. Nested "card-like" panels reduce card components' own visual identity
- On `card.png`, `dialog.png`, `dropdown.png`, `button.png`, etc., each demo section is itself wrapped in a bordered dark panel that looks nearly identical to the library's own `Card` component (`Elevated`/`Outlined`/`Flat`). The result: on the Card page specifically, it's hard to tell where the demo chrome ends and the actual rendered `Card` begins — an "Elevated Card" with a "subtle shadow" is essentially invisible against the equally-dark demo panel background.
- **Fix:** give demo section wrappers a visually distinct treatment from the components being demonstrated — e.g. a flat panel with no border/shadow at all, or a subtle label/background tint, so real component output stands apart from scaffolding.

### 6. Redundant theme entry points
- There's a "Theme" link in the top nav (`common/ThemeProvider`) *and* a separate floating palette FAB on every page performing an overlapping/similar role. Two persistent, differently-styled affordances for theming is confusing wayfinding.
- **Fix:** pick one. If the FAB is meant as a quick live-preview toggle distinct from the full theme editor page, style it consistently with the rest of the nav (icon language, size) and dock it somewhere it can't collide with content.

### 7. Table header contrast jumps out of the dark palette
- `table.png`: the table header row uses a bright lavender (`#a5a8f0`-ish) fill with bold white text — the single brightest, most saturated surface on the page, more prominent than primary buttons or page titles. It reads as an alert/highlight rather than "this is column labels."
- **Fix:** pull the header treatment down in saturation/lightness to sit closer to the rest of the dark UI (e.g. a muted surface tone + the existing accent-purple only for sort-active indicators), consistent with how `Badge`/`Button` restrain their brightest color to true call-to-action moments.

### 8. Disabled-button row reads as broken, not disabled
- `button.png`, "States" section: the disabled row shows six items, several rendering as unlabeled/empty rectangles instead of legible greyed-out buttons with their variant label. Worth a direct look in-browser — from the screenshot alone it's ambiguous whether this is a demo data issue (icon-only buttons with no visible icon) or a real disabled-state style bug (text color matching background).
- **Fix:** verify each disabled variant renders label text at sufficient contrast (still should read "disabled" via opacity/cursor, not via invisible text).

### 9. Form fields don't use a grid despite documented support
- `form-builder.png`: `FormBuilder`'s docs text explicitly advertises "the `columns` prop for a responsive grid layout," but the demo's Contact Form stacks every field (First name, Last name, Email, Age, Country, Message) full-width in a single column — including short fields like "Age" that don't need 1000px of width. This undersells the component's own feature.
- **Fix:** make the flagship demo actually use `columns` (e.g. First/Last name side-by-side, Age/Country side-by-side) so the docs claim is visibly demonstrated.

## Low-impact / polish

### 10. Sidebar demo mixes emoji icons with the library's own icon system
- `sidebar.png`: the "Basic Example" nav items use raw emoji (📊 👥 ⚙️ ❓) as icons, while the surrounding app chrome (main sidebar, top nav) uses a consistent line-icon font. Emoji render inconsistently across OS/browser and clash with the custom icon set used one panel over.
- **Fix:** swap the demo's sample icons for the same icon font/component used elsewhere, so the example also demonstrates realistic usage.

### 11. Sidebar brand label sits flush against the panel edge
- Top-left "mpComponents" wordmark has visibly less left padding than the nav items below it — reads slightly clipped/cramped compared to the rest of the sidebar's spacing rhythm. Minor, but noticeable across every single page since the sidebar persists.

### 12. Badge "Usage" section crowds code sample against the FAB
- `badge.png`: the `<Badge>` code sample's last visible line collides directly with the floating theme button (see #4) — same root cause, called out separately because it's the most visually cramped instance.

## What's working well

- **CardList / product grid** (`card-list.png`) is the strongest page in the set: consistent card sizing, clear price hierarchy, purple CTA against a muted secondary action, and a well-placed status pill (`In Stock`/`Out of Stock`) with sensible disabled-state styling on the "Add to Cart" button for out-of-stock items. Worth using as the internal reference for how other component demos should look.
- **Dialog trigger page** (`dialog.png`) and **Dropdown page** (`dropdown.png`) have clean, consistent section rhythm (title → description → single clear CTA) that reads well even before interacting.
- Overall dark theme, spacing scale, and typography hierarchy (page title → section title → body) are consistent page-to-page — the issues above are localized, not systemic.

## Suggested priority order

1. Fix invisible variants (#1) and EmptyState button mismatch (#2) — both directly mislead users about what's clickable.
2. Resolve the pagination locale (#3) — could be an actual library default bug, not just a demo artifact.
3. Fix FAB overlap (#4) and consolidate with the nav Theme link (#6) — cheap layout fix, currently clips content on most pages.
4. Tone down table header contrast (#7) and verify disabled-button legibility (#8).
5. Everything else is polish; batch into a single demo-content pass (#5, #9, #10, #11, #12).
