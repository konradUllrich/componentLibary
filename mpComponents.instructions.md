# mpComponents – Full Development Standards

> **Quick Reference:** See [.github/copilot-instructions.md](./.github/copilot-instructions.md) for a condensed cheat-sheet.

**mpComponents** is an accessible React 19 component library built with TypeScript, Radix UI primitives, TanStack Form & Tables, and plain CSS (BEM convention).

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Essential Commands](#essential-commands)
3. [Project Structure](#project-structure)
4. [Development Workflow](#development-workflow)
5. [TypeScript Standards](#typescript-standards)
6. [Component Standards](#component-standards)
7. [CSS & BEM Naming](#css--bem-naming)
8. [Accessibility Requirements](#accessibility-requirements)
9. [Testing Requirements](#testing-requirements)
10. [Radix UI Usage](#radix-ui-usage)
11. [Design Tokens](#design-tokens)
12. [Import Order](#import-order)
13. [Common Patterns](#common-patterns)
14. [Do's and Don'ts](#dos-and-donts)

---

## Project Overview

mpComponents provides reusable, accessible UI primitives for React applications. The library is built on:

- **React 19** with full TypeScript strict-mode support
- **Radix UI** primitives for complex interactive components (dialogs, dropdowns, tooltips, tabs, accordion, select)
- **TanStack Form** for advanced form handling
- **TanStack Table** for data-grid components
- **Plain CSS** with BEM naming for styles (no CSS Modules, no CSS-in-JS)
- **Playwright** for component and E2E testing
- **clsx** for conditional class composition

---

## Essential Commands

```bash
# Type checking – must pass before every commit
pnpm type-check

# Linting – must pass before every commit
pnpm lint

# Component tests
pnpm test:ct

# Component tests (interactive UI)
pnpm test:ct:ui

# E2E tests
pnpm test:e2e

# Full CI suite (type-check + lint + test:ct + test:e2e)
pnpm test:ci

# Build the library
pnpm build

# Start the demo site
pnpm demo
```

**CI/CD Rule:** All PRs must pass `pnpm test:ci` before merge.

---

## Project Structure

```
├── common/              # Shared UI (Button, Badge, Icon, Text, Dialog, Dropdown, Tabs, Tooltip, Accordion)
├── controls/            # Form elements (Input, Select, Checkbox, Radio, Combobox, FormBuilder)
├── data-display/        # Data components (Table, CardList, Datalist, Pagination)
├── layout/              # Layout components (Sidebar, Card, Panel, Flex, AppLayout, HorizontalNav)
├── styles/
│   └── variables.css    # Design system tokens – use these for all styling
├── demo/                # Interactive demo site showcasing all components
├── e2e/                 # End-to-end tests
├── playwright/          # Playwright test config & shared utilities
├── index.ts             # Main barrel export
└── .github/
    └── copilot-instructions.md  # Quick-reference guide for Copilot
```

### Component File Structure

Every component lives in its own folder:

```
ComponentName/
├── ComponentName.tsx       # Main component (≤ ~100 lines; split if larger)
├── ComponentName.css       # Styles (plain CSS, BEM, ≤ ~100 lines; split if larger)
├── ComponentName.test.tsx  # Playwright component tests
├── index.ts                # Re-exports
└── SubComponent.tsx        # (optional) Split if main file exceeds ~100 lines
```

---

## Development Workflow

### Creating a New Component

```
1. Read existing similar components to understand patterns
2. Create folder: Category/ComponentName/
3. Write ComponentName.tsx  (forwardRef, JSDoc, displayName)
4. Write ComponentName.css  (BEM, design tokens, :focus-visible)
5. pnpm type-check && pnpm lint           ← fix any errors NOW
6. Write ComponentName.test.tsx
7. pnpm test:ct                           ← fix any failures NOW
8. Write index.ts re-export
9. Add export to the category's index.ts
10. pnpm type-check && pnpm lint && pnpm test:ct
11. pnpm test:ci                          ← full gate, must be all green
```

### Modifying an Existing Component

```
1. Read the component and its tests thoroughly
2. pnpm test:ct                           ← confirm baseline is green
3. Make the smallest possible change
4. pnpm type-check && pnpm lint && pnpm test:ct
5. Update or add tests if behavior changed
6. pnpm test:ci                          ← full gate
```

### Fixing a Bug

```
1. Reproduce the bug (run demo or read the tests)
2. Write a failing test that demonstrates the bug
3. pnpm test:ct                           ← confirm the test fails
4. Implement the fix
5. pnpm test:ct                           ← confirm the test passes
6. pnpm test:ci                          ← confirm no regressions
```

---

## TypeScript Standards

- **Strict mode** is enabled – all code must pass `tsc --noEmit` with zero errors
- **No `any`** – use proper types or generics
- **No `@ts-ignore` / `@ts-expect-error`** – fix the underlying issue
- **No untyped assertions** (`as SomeType`) without clear justification
- Export `interface` (prefer over `type`) for all component prop shapes
- Use JSDoc (`/** */`) for all public APIs
- Prefer `interface` over `type` for object shapes

```tsx
// ✅ Correct
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style of the button */
  variant?: "primary" | "secondary" | "destructive" | "ghost";
  /** Size variant */
  size?: "sm" | "md" | "lg";
}

// ❌ Wrong
const data: any = fetchData();
const value = something as string; // avoid untyped assertions
// @ts-ignore
```

---

## Component Standards

### Template

```tsx
import React, { forwardRef } from "react";
import clsx from "clsx";
import "./ComponentName.css";

export interface ComponentNameProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Description of the prop */
  variant?: "primary" | "secondary";
}

/**
 * ComponentName – Brief description of what the component does.
 *
 * @example
 * <ComponentName variant="primary">Content</ComponentName>
 */
export const ComponentName = forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ variant = "primary", className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "component-name",
          `component-name--${variant}`,
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

ComponentName.displayName = "ComponentName";
```

### Rules

| Rule | Requirement |
|------|-------------|
| `forwardRef` | Use on **every** component so consumers can access the DOM node |
| `displayName` | Always set – required for React DevTools and error messages |
| Prop interface | Always export so consumers can extend or reference it |
| File length | ≤ ~100 lines per `.tsx` file – split aggressively |
| Spread `...props` | Always spread on the root element to support native HTML attributes |
| `className` override | Accept and merge via `clsx` so consumers can extend styles |
| JSDoc | Required on all exported components and non-obvious props |

---

## CSS & BEM Naming

### BEM Convention

```
.block {}                  /* Component root */
.block__element {}         /* Child part of the component */
.block--modifier {}        /* Variant or state */
.block__element--modifier {} /* Modifier on an element */
```

```css
/* ✅ Correct */
.button { }
.button--primary { }
.button--destructive { }
.button--sm { }
.button__icon { }
.button__label { }

/* ❌ Wrong */
.Button { }           /* No PascalCase */
.button-primary { }   /* Use -- for modifiers */
.buttonIcon { }       /* Use __ for elements */
.btn { }              /* No abbreviations */
```

### CSS Template

```css
/* ComponentName – Brief description */

.component-name {
  display: flex;
  align-items: center;
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  transition: var(--transition-fast);
}

/* ✅ MANDATORY: visible focus indicator for keyboard users */
.component-name:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
}

.component-name:hover:not(:disabled) {
  background: var(--color-primary-dark);
}

.component-name--primary {
  background: var(--color-primary);
  color: var(--color-primary-foreground);
}

.component-name--secondary {
  background: var(--color-secondary);
  color: var(--color-secondary-foreground);
}

/* Reduced-motion support */
@media (prefers-reduced-motion: reduce) {
  .component-name {
    transition: none;
  }
}
```

### Rules

- Plain CSS files only – **no CSS Modules, no CSS-in-JS, no inline styles**
- Always use design tokens from `styles/variables.css`
- ≤ ~100 lines per `.css` file – extract sub-components if needed
- `:focus-visible` styles are **mandatory** – never remove outlines

---

## Accessibility Requirements

Every component must meet **WCAG 2.1 Level AA** minimum:

| Requirement | Details |
|-------------|---------|
| Keyboard navigation | Tab, Enter, Space, Arrow keys, Escape where applicable |
| Focus indicators | Visible `:focus-visible` styles – never `outline: none` |
| Color contrast | 4.5:1 for normal text, 3:1 for large text and UI components |
| Semantic HTML | `<button>`, `<input>`, `<nav>`, `<main>`, `<section>`, etc. |
| ARIA attributes | `aria-label`, `aria-expanded`, `aria-haspopup`, `role`, etc. |
| Screen reader support | Test with VoiceOver (macOS) or NVDA (Windows) |
| Reduced motion | Respect `prefers-reduced-motion` for animations |

```tsx
// ✅ Accessible icon button
<button
  type="button"
  className="icon-button"
  aria-label="Close dialog"
>
  <Icon name="close" aria-hidden="true" />
</button>

// ❌ Not keyboard-accessible
<div onClick={handleClick} className="icon-button">
  <Icon name="close" />
</div>
```

---

## Testing Requirements

Every component **must** have a Playwright component test file (`ComponentName.test.tsx`).

### Test Template

```tsx
import { test, expect } from "@playwright/experimental-ct-react";
import { checkA11y } from "../../playwright/test-utils";
import { ComponentName } from "./ComponentName";

test.describe("ComponentName", () => {
  test("should render with default props", async ({ mount }) => {
    const component = await mount(<ComponentName>Content</ComponentName>);
    await expect(component).toBeVisible();
    await expect(component).toHaveText("Content");
  });

  test("should apply variant classes", async ({ mount }) => {
    const component = await mount(
      <ComponentName variant="secondary">Test</ComponentName>,
    );
    await expect(component).toHaveClass(/component-name--secondary/);
  });

  test("should be keyboard accessible", async ({ mount, page }) => {
    await mount(<ComponentName>Focus me</ComponentName>);
    await page.keyboard.press("Tab");
    await expect(page.locator(".component-name")).toBeFocused();
  });

  test("should pass accessibility checks", async ({ mount, page }) => {
    await mount(<ComponentName>Accessible</ComponentName>);
    await checkA11y(page);
  });
});
```

### Coverage Expectations

| Area | Minimum Coverage |
|------|-----------------|
| Rendering | Default props, all variants, all sizes |
| Interaction | Click, keyboard navigation, focus management |
| Accessibility | axe-core scan, ARIA attributes, focus indicators |
| Edge cases | Disabled state, empty content, long strings |
| Class names | BEM classes applied correctly per variant/state |

### Mounting Multiple Variants

```tsx
// ✅ Mount all variants in a single call
const component = await mount(
  <div>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
  </div>
);

// ❌ Never loop with multiple mount() calls – causes React root conflicts
for (const variant of variants) {
  await mount(<Button variant={variant} />);
}
```

### Available Test Utilities

From `playwright/test-utils.ts`:

- `checkA11y(page, options?)` – run axe-core accessibility scan
- `expectVisible(locator)` – assert element is visible
- `expectAccessibleName(locator, name)` – assert accessible name
- `expectAccessibleRole(locator, role)` – assert ARIA role

---

## Radix UI Usage

Use Radix primitives for complex interactive components — never reimplement these patterns from scratch:

| Component | Radix Primitive |
|-----------|----------------|
| Dialog / Modal | `@radix-ui/react-dialog` |
| Dropdown Menu | `@radix-ui/react-dropdown-menu` |
| Select | `@radix-ui/react-select` |
| Tooltip | `@radix-ui/react-tooltip` |
| Tabs | `@radix-ui/react-tabs` |
| Accordion | `@radix-ui/react-accordion` |
| Popover | `@radix-ui/react-popover` |

Radix handles focus trapping, portal rendering, keyboard navigation, and ARIA roles automatically.

---

## Design Tokens

All tokens are defined in `styles/variables.css`. Always use tokens rather than hard-coded values.

### Key Token Categories

```css
/* Colors */
var(--color-primary)               /* Brand primary */
var(--color-primary-dark)          /* Hover state */
var(--color-primary-foreground)    /* Text on primary background */
var(--color-secondary)
var(--color-destructive)
var(--color-foreground)            /* Default text */
var(--color-foreground-secondary)
var(--color-background)
var(--color-border)
var(--color-ring)                  /* Focus ring */

/* Spacing (4px base) */
var(--spacing-1)   /* 4px  */
var(--spacing-2)   /* 8px  */
var(--spacing-3)   /* 12px */
var(--spacing-4)   /* 16px */
var(--spacing-6)   /* 24px */
var(--spacing-8)   /* 32px */

/* Typography */
var(--font-size-xs)    /* 12px */
var(--font-size-sm)    /* 14px */
var(--font-size-base)  /* 16px */
var(--font-size-lg)    /* 18px */
var(--font-weight-medium)    /* 500 */
var(--font-weight-semibold)  /* 600 */

/* Border radius */
var(--radius-sm)   /* 4px  */
var(--radius-md)   /* 6px  */
var(--radius-lg)   /* 8px  */
var(--radius-xl)   /* 12px */
var(--radius-full) /* 9999px */

/* Shadows */
var(--shadow-sm)
var(--shadow-md)
var(--shadow-lg)

/* Transitions */
var(--transition-fast)   /* 150ms */
var(--transition-base)   /* 300ms */
```

See `styles/variables.css` for the full list and `styles/THEMING.md` for theming guidance.

---

## Import Order

Always follow this sequence:

```tsx
// 1. React
import React, { forwardRef, useState } from "react";

// 2. Third-party packages
import clsx from "clsx";
import * as Dialog from "@radix-ui/react-dialog";

// 3. Internal components
import { Icon } from "../Icon";

// 4. Types only
import type { ButtonVariant } from "./types";

// 5. CSS (always last)
import "./ComponentName.css";
```

---

## Common Patterns

### Conditional Classes

```tsx
className={clsx(
  "button",
  `button--${variant}`,
  size !== "md" && `button--${size}`,
  isDisabled && "button--disabled",
  className,          // always last, allows consumer override
)}
```

### Forwarding Refs

```tsx
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={clsx("button", `button--${variant}`, className)}
      {...props}
    >
      {children}
    </button>
  ),
);
Button.displayName = "Button";
```

### Boolean Prop Naming

```tsx
// ✅ Consistent boolean naming
isLoading
isDisabled
isOpen
hasError
isReadOnly
```

### Event Handler Naming

```tsx
// ✅ Consistent event naming
onClick
onChange
onSubmit
onKeyDown
onOpenChange
```

### Splitting Large Components

When a component exceeds ~100 lines, extract sub-components:

```
Dialog/
├── Dialog.tsx          # Root wrapper (~60 lines)
├── DialogContent.tsx   # Content area (~50 lines)
├── DialogHeader.tsx    # Header part (~30 lines)
├── Dialog.css          # All styles
├── Dialog.test.tsx     # Tests
└── index.ts            # Re-exports all sub-components
```

---

## Do's and Don'ts

| ✅ DO | ❌ DON'T |
|-------|---------|
| Use `clsx()` for conditional classes | Concatenate class strings manually |
| Use `forwardRef` for all components | Omit ref forwarding |
| Set `displayName` on every component | Leave components unnamed |
| Use semantic HTML elements | Use `<div>` for clickable elements |
| Add `:focus-visible` styles | Remove outlines or set `outline: none` |
| Use design tokens for all values | Hard-code colors, spacing, or radii |
| Use Radix UI for dialogs/dropdowns | Re-implement focus traps from scratch |
| Test keyboard navigation | Assume mouse-only usage |
| Export prop interfaces | Keep prop types internal |
| Split files over ~100 lines | Create large monolithic files |
| Spread `...props` on root element | Block native HTML attribute pass-through |
| Test with axe-core | Skip accessibility checks |

---

## Pre-Commit Checklist

Before opening a PR, verify:

- [ ] `pnpm type-check` passes with zero errors
- [ ] `pnpm lint` passes with zero warnings
- [ ] `pnpm test:ct` passes (all tests green)
- [ ] Component file ≤ ~100 lines (split if needed)
- [ ] CSS file ≤ ~100 lines (split if needed)
- [ ] BEM naming followed throughout
- [ ] All design tokens used (no hard-coded values)
- [ ] `:focus-visible` styles present
- [ ] `displayName` set
- [ ] Prop interface exported
- [ ] JSDoc comments on public APIs
- [ ] Tests cover rendering, interaction, and accessibility
- [ ] Component exported in category `index.ts`

---

## Key Resources

- **[.github/copilot-instructions.md](./.github/copilot-instructions.md)** – Quick-reference cheat-sheet
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** – Development setup and contribution process
- **[TESTING.md](./TESTING.md)** – Full testing guide
- **[styles/variables.css](./styles/variables.css)** – All design tokens
- **[styles/THEMING.md](./styles/THEMING.md)** – Theming and customization guide
- **[Radix UI Docs](https://www.radix-ui.com/docs/primitives)** – Primitive component documentation
- **[WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)** – Accessibility reference
- **[BEM Methodology](http://getbem.com/)** – CSS naming convention

---

**When in doubt:** Read a similar existing component and follow its patterns exactly.
