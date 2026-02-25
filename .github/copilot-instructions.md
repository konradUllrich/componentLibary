# Copilot Instructions – mpComponents

> **This is a quick reference guide.** For exhaustive standards, see [mpComponents.instructions.md](../mpComponents.instructions.md).

**mpComponents** is a React 19 component library with TypeScript, Radix UI, and plain CSS (BEM).

---

## ⚡ Quick Start Commands

```bash
pnpm type-check      # Must pass before committing
pnpm lint            # Must pass before committing
pnpm test:ct         # Run component tests
pnpm test:ct:ui      # Run with interactive UI
pnpm test:e2e        # Run E2E tests
pnpm demo            # Start demo site
pnpm build           # Build library
```

**CI/CD Rule:** All PRs must pass `test:ct`.

---

## 📂 Project Structure

```
├── common/        # Shared UI (Button, Badge, Icon, Text, Dialog, etc.)
├── controls/      # Form elements (Input, Select, Checkbox, Radio, etc.)
├── data-display/  # Data components (Table, Pagination, CardList, etc.)
├── layout/        # Layout components (Sidebar, Card, Panel, Grid, etc.)
├── styles/        # Global CSS variables & theming
├── demo/          # Demo site for components
├── e2e/           # E2E tests
└── index.ts       # Main barrel export
```

---

## 🚨 Non-Negotiable Rules

| Requirement       | Rule                                                       |
| ----------------- | ---------------------------------------------------------- |
| **TypeScript**    | Strict mode, no `any`/`@ts-ignore`, fix errors immediately |
| **CSS**           | Plain CSS only – no modules, no CSS-in-JS                  |
| **Naming**        | BEM convention (`.block__element--modifier`)               |
| **Components**    | Use `clsx` for conditionals, keep ≤100 lines               |
| **Radix UI**      | Use for dialogs, dropdowns, selects, tooltips, tabs        |
| **Accessibility** | WCAG 2.1 AA minimum – keyboard nav, 4.5:1 contrast, ARIA   |

---

## 📦 Component File Structure

```
ComponentName/
├── ComponentName.tsx      # Main component
├── ComponentName.css      # Styles (plain CSS, BEM)
├── ComponentName.test.tsx # Tests (Playwright)
├── index.ts               # Exports
└── SubComponent.tsx       # (optional) Split if needed
```

---

## 💻 Component Template

```tsx
import React, { forwardRef } from "react";
import clsx from "clsx";
import "./ComponentName.css";

export interface ComponentNameProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Prop description */
  variant?: "primary" | "secondary";
}

/**
 * ComponentName – Brief description.
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

---

## 🎨 CSS & BEM Naming

**BEM Rules:**

- **Block**: `.component-name` (all lowercase, hyphenated)
- **Element**: `.component-name__element` (double underscore)
- **Modifier**: `.component-name--modifier` (double hyphen)

```css
/* ✅ Correct */
.button {
}
.button--primary {
}
.button__icon {
}
.button:focus-visible {
  outline: 2px solid var(--color-focus);
}

/* ❌ Wrong */
.Button {
} /* No PascalCase */
.button-primary {
} /* Use -- for modifiers */
.buttonIcon {
} /* Use __ for elements */
```

**Use design tokens from `styles/variables.css`:**

```css
background: var(--color-primary);
padding: var(--spacing-md);
border-radius: var(--radius-md);
```

---

## 🧪 Testing

Each component needs a co-located `.test.tsx` file using Playwright:

```tsx
import { test, expect } from "@playwright/experimental-ct-react";
import { ComponentName } from "./ComponentName";

test.describe("ComponentName", () => {
  test("should render correctly", async ({ mount }) => {
    const component = await mount(<ComponentName>Test</ComponentName>);
    await expect(component).toBeVisible();
  });

  test("should handle keyboard navigation", async ({ mount, page }) => {
    await mount(<ComponentName>Test</ComponentName>);
    await page.keyboard.press("Tab");
    await expect(page.locator(".component-name")).toBeFocused();
  });

  test("should have no a11y violations", async ({ mount, page }) => {
    await mount(<ComponentName>Test</ComponentName>);
    // Use axe-core for accessibility testing
  });
});
```

---

## ♿ Accessibility Essentials

Every component must:

- ✅ Be fully keyboard navigable (Tab, Enter, Space, Arrows, Escape)
- ✅ Have visible focus indicators (never remove `outline`)
- ✅ Meet 4.5:1 color contrast for text
- ✅ Use semantic HTML (`<button>`, `<input>`, `<nav>`, not `<div>`)
- ✅ Include proper ARIA attributes and labels
- ✅ Work with screen readers (test with VoiceOver/NVDA)

```tsx
// ✅ Good – accessible button
<button
  type="button"
  className="button"
  aria-label="Close dialog"
>
  <Icon name="close" aria-hidden="true" />
</button>

// ❌ Bad – not keyboard accessible
<div onClick={handleClick} className="button">
  Close
</div>
```

---

## 📝 Import Order

```tsx
import React, { forwardRef } from "react";
import clsx from "clsx";
import * as Dialog from "@radix-ui/react-dialog";
import { Icon } from "../Icon";
import type { ButtonVariant } from "./types";
import "./ComponentName.css";
```

---

## 🚫 Do's and Don'ts

| ✅ DO                                 | ❌ DON'T                      |
| ------------------------------------- | ----------------------------- |
| Use `clsx()` for conditional classes  | Concatenate class strings     |
| Use `forwardRef` for DOM access       | Use `createRef`               |
| Set `displayName` for debugging       | Leave unnamed components      |
| Use semantic HTML elements            | Use divs for everything       |
| Test with keyboard & screen reader    | Assume mouse-only interaction |
| Split files > 100 lines               | Create large monolithic files |
| Use Radix UI for complex interactions | Reinvent dropdowns/dialogs    |
| Export prop interfaces                | Keep types internal           |

---

## 🔍 Common Patterns

**Conditional CSS:**

```tsx
className={clsx("button", isActive && "button--active", className)}
```

**Spread props safely:**

```tsx
<element {...props} className="..." /> {/* className must come after */}
```

**Boolean prop naming:**

```tsx
(isLoading, isDisabled, hasError, isOpen);
```

**Event handler naming:**

```tsx
(onClick, onChange, onSubmit, onKeyDown);
```

---

## 📚 Key Resources

- **[mpComponents.instructions.md](../mpComponents.instructions.md)** – Complete standards (detailed)
- **[CONTRIBUTING.md](../CONTRIBUTING.md)** – Development setup
- **[TESTING.md](../TESTING.md)** – Testing patterns
- **[styles/variables.css](../styles/variables.css)** – Design tokens
- **[Radix UI Docs](https://www.radix-ui.com/docs/primitives)** – Component primitives
- **[WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)** – Accessibility

---

## ✅ Pre-Commit Checklist

Before pushing, verify:

- [ ] `pnpm test:ct` passes (all tests green)
- [ ] Component ≤ 100 lines (split if needed)
- [ ] CSS file ≤ 100 lines (split if needed)
- [ ] BEM naming followed correctly
- [ ] Accessibility tested (keyboard, screen reader, 4.5:1 contrast)
- [ ] `displayName` set on component
- [ ] Prop interface exported
- [ ] JSDoc comments on public APIs
- [ ] Tests cover main functionality & a11y

---

**When in doubt:** Check similar components in the repo and follow their patterns.
