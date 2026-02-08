# mpComponents Quick Reference

A one-page reference for the most important component development guidelines.

## 🎯 Golden Rules

| Rule | Requirement |
|------|-------------|
| **TypeScript** | Pass `tsc --noEmit` with zero errors. No `any`, `unknown`, or `as` type assertions. |
| **CSS** | Plain `.css` files only. No CSS modules, styled-components, or CSS-in-JS. |
| **BEM Naming** | `.block`, `.block__element`, `.block--modifier` for all CSS classes. |
| **clsx** | Use `clsx()` for conditional class names, not string concatenation. |
| **File Size** | Keep components and CSS ≤ ~100 lines. Split aggressively. |
| **Radix UI** | Use Radix primitives for complex interactive components. |
| **Accessibility** | WCAG 2.1 AA minimum. 4.5:1 contrast, keyboard nav, ARIA, screen reader tested. |

## 📦 Component Template

```tsx
import React from "react";
import clsx from "clsx";
import "./Component.css";

export interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Description @default "value" */
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ variant = "primary", className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx("component", `component--${variant}`, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Component.displayName = "Component";
```

## 🎨 CSS Template

```css
/* Component - Description */

/* Block */
.component {
  /* Base styles */
}

/* Modifier */
.component--primary {
  /* Variant styles */
}

/* Element */
.component__element {
  /* Part styles */
}

/* Focus for a11y */
.component:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
```

## 🔤 BEM Examples

```css
/* ✅ Correct BEM */
.sidebar { }                      /* Block */
.sidebar__nav { }                 /* Element */
.sidebar--collapsed { }           /* Modifier */
.sidebar-item { }                 /* Multi-word block */
.sidebar-item__label { }          /* Element of multi-word block */
.sidebar-item--active { }         /* Modifier of multi-word block */

/* ❌ Wrong */
.sidebarNav { }                   /* camelCase */
.sidebar_nav { }                  /* Single underscore */
.sidebar-nav { }                  /* Looks like element but it's actually a block */
```

## 🎭 clsx Usage Patterns

```tsx
// Simple conditional
clsx("base", condition && "base--active")

// Multiple conditions
clsx(
  "base",
  isActive && "base--active",
  isDisabled && "base--disabled",
  size === "lg" && "base--lg"
)

// With user className
clsx("base", `base--${variant}`, className)

// Object syntax
clsx("base", {
  "base--active": isActive,
  "base--disabled": isDisabled
})
```

## ♿ Accessibility Checklist

### Color & Contrast
- [ ] Normal text: 4.5:1 minimum
- [ ] Large text (18pt+): 3:1 minimum
- [ ] UI elements: 3:1 minimum
- [ ] Test with [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Keyboard Navigation
- [ ] Tab to/from component
- [ ] Enter/Space to activate
- [ ] Arrow keys for navigation (menus, lists)
- [ ] Escape to close (dialogs, dropdowns)

### Focus Management
- [ ] Clear focus indicator (2px outline, 2px offset)
- [ ] Use `:focus-visible` (keyboard only)
- [ ] Never `outline: none` without replacement
- [ ] Logical tab order

### ARIA Attributes
```tsx
// Common ARIA patterns
aria-label="Descriptive name"
aria-labelledby="label-id"
aria-describedby="description-id"
aria-invalid={hasError}
aria-required={isRequired}
aria-disabled={isDisabled}
aria-expanded={isOpen}
aria-hidden="true"  // For decorative elements
```

### Semantic HTML
```tsx
// ✅ Good - Semantic
<button>Click</button>
<nav>Navigation</nav>
<main>Content</main>

// ❌ Bad - Non-semantic
<div onClick={...}>Click</div>
<div>Navigation</div>
```

## 🧩 Radix UI Quick Start

```tsx
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Select from "@radix-ui/react-select";

// Use for: Modals, Dropdowns, Select, Tabs, Accordion, 
//          Tooltip, Popover, Context Menu, etc.

// Example: Dialog
<Dialog.Root>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay className="dialog-overlay" />
    <Dialog.Content className="dialog-content">
      <Dialog.Title>Title</Dialog.Title>
      <Dialog.Description>Description</Dialog.Description>
      {/* Content */}
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

## 📁 File Structure

```
ComponentName/
├── ComponentName.tsx       # Component (≤100 lines)
├── ComponentName.css       # Styles (≤100 lines)
├── ComponentName.test.tsx  # Tests
├── index.ts                # export { ComponentName } from "./ComponentName"
└── SubComponent.tsx        # Optional sub-components
```

## 🧪 Test Template

```tsx
import { test, expect } from "@playwright/experimental-ct-react";
import { injectAxe, checkA11y } from "axe-playwright";
import { Component } from "./Component";

test.describe("Component", () => {
  test("renders", async ({ mount }) => {
    const component = await mount(<Component>Test</Component>);
    await expect(component).toBeVisible();
  });

  test("is accessible", async ({ mount, page }) => {
    await mount(<Component>Test</Component>);
    await injectAxe(page);
    await checkA11y(page);
  });

  test("keyboard nav", async ({ mount, page }) => {
    await mount(<Component>Test</Component>);
    await page.keyboard.press("Tab");
    await expect(page.locator(".component")).toBeFocused();
  });
});
```

## ✅ Pre-Commit Checklist

```bash
# Run before committing
pnpm type-check  # Must pass
pnpm lint        # Must pass
pnpm test:ct     # Component tests must pass
```

**Component Requirements:**
- [ ] ≤ 100 lines (component + CSS)
- [ ] Uses plain CSS with BEM
- [ ] Uses `clsx` for conditional classes
- [ ] TypeScript types with no `any`/`unknown`
- [ ] WCAG 2.1 AA accessibility
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Tests include accessibility checks
- [ ] Exported in category index.ts

## 🗂️ Component Categories

| Category | Purpose | Examples |
|----------|---------|----------|
| `common/` | General-purpose | Button, Badge, Icon, Dialog |
| `controls/` | Form inputs | Input, Select, Checkbox, Radio |
| `data-display/` | Data presentation | Table, List, Card, Tree |
| `layout/` | Page structure | Sidebar, Header, Footer, Nav |

## 📚 Essential Links

- [Full Guidelines](./mpComponents.instructions.md)
- [Contributing Guide](./CONTRIBUTING.md)
- [Testing Guide](./TESTING.md)
- [WCAG 2.1 Quick Ref](https://www.w3.org/WAI/WCAG21/quickref/)
- [Radix UI Docs](https://www.radix-ui.com/docs/primitives)
- [BEM Methodology](http://getbem.com/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

**Remember:** Small, focused, accessible components with strict TypeScript and plain CSS!
