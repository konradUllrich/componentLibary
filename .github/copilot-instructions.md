# Copilot Instructions – mpComponents

> **Scope:** These instructions apply to all component work in this repository.  
> **Full docs:** See `/mpComponents.instructions.md` for exhaustive standards.

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
