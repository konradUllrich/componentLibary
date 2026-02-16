# Copilot Instructions – mpComponents

> **Scope:** These instructions apply to all component work in this repository.  
> **Full docs:** See `/mpComponents.instructions.md` for exhaustive standards.

## 📋 Project Overview

**mpComponents** is a modern, accessible React component library built with:
- **React 19** with TypeScript in strict mode
- **Radix UI primitives** for complex interactions
- **TanStack Form & Tables** for advanced data handling
- **Plain CSS** with BEM naming convention
- **Playwright & Vitest** for comprehensive testing

**Purpose:** Provide reusable, accessible, type-safe UI components for building modern web applications.

---

## 🛠️ Essential Commands

Before making changes, always check the current state:

```bash
# Type checking (MUST pass before committing)
pnpm type-check

# Linting (MUST pass before committing)
pnpm lint

# Run component tests
pnpm test:ct

# Run component tests with UI
pnpm test:ct:ui

# Run E2E tests
pnpm test:e2e

# Build library
pnpm build

# Run demo site locally for development
pnpm demo

# Build demo site
pnpm demo:build
```

**CI/CD:** All PRs must pass `pnpm type-check`, `pnpm lint`, and `pnpm test:ct` before merge.

---

## 📂 Project Structure

```
/home/runner/work/componentLibary/componentLibary/
├── common/              # Shared UI (Button, Badge, Icon, Text, Dialog, Dropdown)
├── controls/            # Form elements (Input, Select, Checkbox, Radio, Toggle)
├── data-display/        # Data components (Table, List, Card, Tree)
├── layout/              # Layout components (Sidebar, Header, Footer, Navigation)
├── styles/              # Global CSS variables, themes, design tokens
│   └── variables.css    # Design system tokens (colors, spacing, etc.)
├── demo/                # Interactive demo site with examples
├── e2e/                 # End-to-end tests
├── playwright/          # Playwright test configuration
├── .github/             # GitHub workflows and this file
├── index.ts             # Main barrel export
├── package.json         # Dependencies and scripts
└── mpComponents.instructions.md  # Complete development guidelines
```

---

## 🚨 Non-Negotiable Rules

| Rule          | Requirement                                                     |
| ------------- | --------------------------------------------------------------- |
| CSS           | Plain CSS only – **no CSS modules, no CSS-in-JS**               |
| Naming        | BEM convention (`.block__element--modifier`)                    |
| Classes       | Use `clsx` for conditional class names                          |
| File size     | Components ≤ ~100 lines – split aggressively                    |
| Interactions  | Use Radix UI primitives for dialogs, dropdowns, tooltips, tabs  |
| Accessibility | WCAG 2.1 AA minimum – keyboard nav, 4.5:1 contrast, ARIA        |
| TypeScript    | Strict mode – no `any`, no `@ts-ignore`, fix errors immediately |

---

## File Structure

```
ComponentName/
├── ComponentName.tsx      # Main component
├── ComponentName.css      # Styles (plain CSS, BEM)
├── ComponentName.test.tsx # Unit + a11y tests
├── index.ts               # Re-exports
└── SubComponent.tsx       # (optional) Split large components
```

**Folder categories:**

- `common/` – Shared UI (Button, Badge, Icon, Text)
- `controls/` – Form elements (Input, Select, Checkbox)
- `data-display/` – Data presentation (Table, List, Pagination)
- `layout/` – Page structure (Sidebar, Card, Panel)

---

## Import Order

Always follow this sequence:

```tsx
// 1. React
import React, { forwardRef, useState } from "react";

// 2. Third-party
import clsx from "clsx";
import * as Dialog from "@radix-ui/react-dialog";

// 3. Internal components
import { Icon } from "../Icon";

// 4. Types
import type { ButtonVariant } from "./types";

// 5. Styles (always last)
import "./Button.css";
```

---

## Component Template

```tsx
import React, { forwardRef } from "react";
import clsx from "clsx";
import "./ComponentName.css";

export interface ComponentNameProps {
  /** Description of the prop */
  variant?: "primary" | "secondary";
  /** Additional CSS classes */
  className?: string;
  children?: React.ReactNode;
}

/**
 * ComponentName – Brief description of what it does.
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

## BEM Naming

```css
/* ✅ Correct */
.button {
}
.button--primary {
}
.button--destructive {
}
.button__icon {
}
.button__label {
}

/* ❌ Wrong */
.Button {
} /* No PascalCase */
.button-primary {
} /* Use -- for modifiers */
.buttonIcon {
} /* Use __ for elements */
.btn {
} /* No abbreviations */
```

---

## CSS Guidelines

```css
/* Use design tokens from styles/variables.css */
.button {
  background: var(--color-primary);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: var(--font-size-md);
  transition: var(--transition-fast);
}

/* Focus states are mandatory */
.button:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

/* Hover and active states */
.button:hover:not(:disabled) {
  background: var(--color-primary-dark);
}
```

---

## TypeScript Rules

```tsx
// ✅ Correct – explicit types, no any
interface Props {
  items: string[];
  onSelect: (item: string) => void;
}

// ❌ Wrong – avoid these
const data: any = fetchData(); // No any
const value = something as string; // No type assertions
// @ts-ignore                            // No suppression comments
```

**Requirements:**

- All code must pass `tsc --noEmit`
- Export prop interfaces for all components
- Use JSDoc comments for public APIs
- Prefer `interface` over `type` for objects

---

## Accessibility Checklist

Every component must:

- [ ] Be fully keyboard navigable (Tab, Enter, Space, Arrow keys, Escape)
- [ ] Have visible focus indicators (`:focus-visible`)
- [ ] Include proper ARIA attributes when needed
- [ ] Use semantic HTML (`<button>`, `<nav>`, `<main>`, etc.)
- [ ] Meet 4.5:1 color contrast for text
- [ ] Have `aria-label` on icon-only buttons
- [ ] Support reduced motion preferences

```tsx
// Example: Accessible icon button
<button type="button" aria-label="Close dialog" className="dialog__close">
  <Icon name="close" aria-hidden="true" />
</button>
```

---

## Radix UI Usage

Use Radix primitives for complex interactions – don't reinvent:

| Component    | Use Radix For               |
| ------------ | --------------------------- |
| Dialog/Modal | Focus trap, portal, overlay |
| Dropdown     | Keyboard nav, positioning   |
| Tooltip      | Delay, positioning, a11y    |
| Tabs         | ARIA roles, keyboard nav    |
| Accordion    | Expand/collapse, a11y       |
| Select       | Typeahead, positioning      |

```tsx
// Example: Radix Dialog wrapper
import * as Dialog from "@radix-ui/react-dialog";

export const Modal = ({ children, open, onOpenChange }) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className="modal__overlay" />
      <Dialog.Content className="modal__content">{children}</Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
```

---

## Testing Requirements

```tsx
// ComponentName.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import { ComponentName } from "./ComponentName";

expect.extend(toHaveNoViolations);

describe("ComponentName", () => {
  it("renders correctly", () => {
    render(<ComponentName>Test</ComponentName>);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("handles keyboard navigation", async () => {
    const user = userEvent.setup();
    render(<ComponentName>Test</ComponentName>);
    await user.tab();
    expect(screen.getByText("Test")).toHaveFocus();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ComponentName>Test</ComponentName>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

---

## Quick Reference

| Task                | Do This                                               |
| ------------------- | ----------------------------------------------------- |
| Conditional classes | `clsx("btn", isActive && "btn--active")`              |
| Forward ref         | `forwardRef<HTMLElement, Props>((props, ref) => ...)` |
| Spread props        | `<element {...props}>` (always last)                  |
| Event handlers      | `onEventName` (camelCase)                             |
| Boolean props       | `isLoading`, `isDisabled`, `hasError`                 |
| Design tokens       | `var(--color-primary)`, `var(--spacing-md)`           |

---

## 🚫 Boundaries & Restrictions

**DO NOT:**
- ❌ Modify files in `.git/`, `.husky/`, or `node_modules/`
- ❌ Change build configurations (`vite.config.ts`, `tsconfig.json`) without explicit approval
- ❌ Use CSS modules, styled-components, or any CSS-in-JS solutions
- ❌ Add new dependencies without checking for vulnerabilities and necessity
- ❌ Use `any`, `unknown`, or type assertions without clear justification
- ❌ Remove or modify existing tests unless fixing them is the explicit task
- ❌ Commit secrets, API keys, or sensitive data
- ❌ Break existing component APIs without migration path

**ALWAYS:**
- ✅ Run `pnpm type-check` and `pnpm lint` before committing
- ✅ Write tests for new components (Playwright component tests)
- ✅ Follow BEM naming for all CSS classes
- ✅ Ensure WCAG 2.1 AA accessibility compliance
- ✅ Keep files under ~100 lines (split if needed)
- ✅ Use design tokens from `styles/variables.css`
- ✅ Add JSDoc comments to public component APIs
- ✅ Export components in category `index.ts` files

---

## 🎯 Development Workflow

1. **Explore before changing**: Understand existing patterns before adding new components
2. **Check existing components**: Look for similar components to maintain consistency
3. **Run tests early**: Execute `pnpm test:ct` frequently during development
4. **Use the demo site**: Test components visually with `pnpm demo`
5. **Type-check continuously**: Fix TypeScript errors immediately, don't accumulate them
6. **Test accessibility**: Use keyboard navigation and screen readers
7. **Review before commit**: Ensure code meets all requirements in checklist

---

## 📚 Key Documentation Files

- **[CONTRIBUTING.md](../CONTRIBUTING.md)** - Start here for development setup
- **[mpComponents.instructions.md](../mpComponents.instructions.md)** - Complete guidelines (37KB, exhaustive)
- **[QUICK_REFERENCE.md](../QUICK_REFERENCE.md)** - One-page cheat sheet
- **[TESTING.md](../TESTING.md)** - Testing practices and examples
- **[README.md](../README.md)** - Project overview and usage
- **[styles/THEMING.md](../styles/THEMING.md)** - Theming and design tokens

---

## Common Mistakes to Avoid

```tsx
// ❌ Don't use inline styles
<div style={{ padding: "16px" }}>

// ✅ Use CSS classes with design tokens
<div className="container">

// ❌ Don't concatenate classes
className={"btn " + (isActive ? "btn--active" : "")}

// ✅ Use clsx
className={clsx("btn", isActive && "btn--active")}

// ❌ Don't forget displayName
export const Button = () => { ... }

// ✅ Always set displayName
Button.displayName = "Button";

// ❌ Don't use div for clickable elements
<div onClick={handleClick}>

// ✅ Use semantic elements
<button type="button" onClick={handleClick}>
```

---

## ✅ Example: Well-Structured Component

Here's what a complete, properly structured component looks like:

### Good Component Example (Button.tsx)

```tsx
import React, { forwardRef } from "react";
import clsx from "clsx";
import "./Button.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style variant of the button
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  /**
   * Size of the button
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * Whether the button should take full width of container
   * @default false
   */
  fullWidth?: boolean;
  /** Button content */
  children: React.ReactNode;
}

/**
 * Button component - Primary action element
 *
 * Accessible, keyboard-navigable button with multiple variants and sizes.
 * Follows WCAG 2.1 AA guidelines with proper focus indicators.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { 
      variant = "primary", 
      size = "md", 
      fullWidth = false,
      className, 
      children, 
      type = "button",
      ...props 
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          "button",
          `button--${variant}`,
          `button--${size}`,
          fullWidth && "button--full-width",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
```

### Good CSS Example (Button.css)

```css
/* Button - Primary action element */

/* Base button styles */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-family);
  font-weight: var(--font-weight-medium);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: var(--transition-fast);
  user-select: none;
}

/* Size variants */
.button--sm {
  height: var(--size-8);
  padding: 0 var(--spacing-3);
  font-size: var(--font-size-sm);
}

.button--md {
  height: var(--size-10);
  padding: 0 var(--spacing-4);
  font-size: var(--font-size-md);
}

.button--lg {
  height: var(--size-12);
  padding: 0 var(--spacing-6);
  font-size: var(--font-size-lg);
}

/* Style variants */
.button--primary {
  background-color: var(--color-primary);
  color: var(--color-primary-foreground);
}

.button--primary:hover:not(:disabled) {
  background-color: var(--color-primary-dark);
}

.button--secondary {
  background-color: var(--color-secondary);
  color: var(--color-secondary-foreground);
}

/* Focus state (mandatory for accessibility) */
.button:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

/* Disabled state */
.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Full width modifier */
.button--full-width {
  width: 100%;
}
```

### Good Test Example (Button.test.tsx)

```tsx
import { test, expect } from "@playwright/experimental-ct-react";
import { injectAxe, checkA11y } from "axe-playwright";
import { Button } from "./Button";

test.describe("Button", () => {
  test("should render with default props", async ({ mount }) => {
    const component = await mount(<Button>Click me</Button>);
    await expect(component).toBeVisible();
    await expect(component).toHaveText("Click me");
  });

  test("should apply variant classes correctly", async ({ mount }) => {
    const component = await mount(<Button variant="secondary">Test</Button>);
    await expect(component).toHaveClass(/button--secondary/);
  });

  test("should handle click events", async ({ mount }) => {
    let clicked = false;
    const component = await mount(
      <Button onClick={() => (clicked = true)}>Click</Button>
    );
    await component.click();
    expect(clicked).toBe(true);
  });

  test("should be keyboard accessible", async ({ mount, page }) => {
    await mount(<Button>Focus me</Button>);
    await page.keyboard.press("Tab");
    await expect(page.locator(".button")).toBeFocused();
    await page.keyboard.press("Enter");
  });

  test("should have no accessibility violations", async ({ mount, page }) => {
    await mount(<Button>Accessible</Button>);
    await injectAxe(page);
    await checkA11y(page);
  });

  test("should be disabled when disabled prop is true", async ({ mount }) => {
    const component = await mount(<Button disabled>Disabled</Button>);
    await expect(component).toBeDisabled();
  });
});
```

---

## 🔍 When Working on Tasks

1. **Read existing code first**: Check similar components to match patterns
2. **Ask if unclear**: If requirements are ambiguous, ask for clarification
3. **Make minimal changes**: Only modify what's necessary for the task
4. **Test thoroughly**: Use `pnpm demo` to test visually, `pnpm test:ct` for automated tests
5. **Document your work**: Update comments, JSDoc, and examples as needed
6. **Check accessibility**: Test with keyboard, verify color contrast, check ARIA
7. **Verify types**: Ensure `pnpm type-check` passes with zero errors
8. **Review your changes**: Before finalizing, review all modified files

---

## 🎓 Learning Resources

- **Radix UI Documentation**: https://www.radix-ui.com/docs/primitives
- **WCAG 2.1 Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
- **BEM Methodology**: http://getbem.com/
- **TypeScript Documentation**: https://www.typescriptlang.org/docs/
- **React Best Practices**: https://react.dev/learn
- **Playwright Testing**: https://playwright.dev/docs/test-components

---

**Remember:** Quality over speed. Take time to write clean, accessible, well-tested code that matches the existing patterns in this repository.
