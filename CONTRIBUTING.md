# Contributing to mpComponents

Thank you for your interest in contributing to mpComponents! This guide will help you get started.

## 📋 Before You Start

**Read the full guidelines:** [mpComponents.instructions.md](./mpComponents.instructions.md)  
**Quick Reference:** [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and pnpm
- Understanding of React, TypeScript, and CSS
- Familiarity with accessibility standards (WCAG 2.1 AA)

### Setup

```bash
# Clone and install dependencies
git clone https://github.com/konradUllrich/componentLibary.git
cd componentLibary
pnpm install

# Run demo site for development
pnpm demo

# Type checking and linting
pnpm type-check
pnpm lint
```

## ⚡ Core Principles

### 1. **TypeScript Strictness**
- ✅ All code must pass `tsc --noEmit` with zero errors
- ❌ No `any`, `unknown`, or type assertions (`as`) unless absolutely necessary
- ❌ No unaddressed type errors

### 2. **Plain CSS with BEM**
- ✅ Use plain `.css` files (not CSS modules or CSS-in-JS)
- ✅ Follow BEM naming: `.block`, `.block__element`, `.block--modifier`
- ✅ Use `clsx` for conditional class names

### 3. **Accessibility First**
- ✅ Meet WCAG 2.1 AA standards (minimum 4.5:1 color contrast)
- ✅ Full keyboard navigation support
- ✅ Proper ARIA attributes and semantic HTML
- ✅ Test with screen readers

### 4. **Keep Files Small**
- ✅ Target ~100 lines per file (component or CSS)
- ✅ Split large components into smaller, focused pieces
- ✅ Extract logic into custom hooks

### 5. **Use Radix UI Primitives**
- ✅ Prefer Radix UI for complex interactive components
- ✅ Examples: Dialog, Dropdown, Select, Accordion, Tabs

## 📁 Component Structure

Each component should follow this structure:

```
ComponentName/
├── ComponentName.tsx          # Main component (≤100 lines)
├── ComponentName.css          # Styles with BEM naming (≤100 lines)
├── ComponentName.test.tsx     # Playwright component tests
├── index.ts                   # Export file
└── SubComponent.tsx           # Optional sub-components
```

### Example Component Template

```tsx
import React from "react";
import clsx from "clsx";
import "./ComponentName.css";

export interface ComponentNameProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Description of prop
   * @default "default-value"
   */
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

/**
 * ComponentName - Brief description
 *
 * Detailed description and usage guidelines.
 *
 * @example
 * ```tsx
 * <ComponentName variant="primary">
 *   Content here
 * </ComponentName>
 * ```
 */
export const ComponentName = React.forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ variant = "primary", className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "component-name",
          `component-name--${variant}`,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ComponentName.displayName = "ComponentName";
```

### Example CSS Template

```css
/* ComponentName - Brief description */

/* Block: Base component styles */
.component-name {
  display: flex;
  align-items: center;
  padding: var(--spacing-2);
  border-radius: var(--radius-md);
}

/* Modifier: Primary variant */
.component-name--primary {
  background-color: var(--color-primary);
  color: var(--color-primary-foreground);
}

/* Modifier: Secondary variant */
.component-name--secondary {
  background-color: var(--color-secondary);
  color: var(--color-secondary-foreground);
}

/* Focus state for accessibility */
.component-name:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .component-name {
    padding: var(--spacing-1);
  }
}
```

## 🧪 Testing Requirements

All components must include tests:

```tsx
import { test, expect } from "@playwright/experimental-ct-react";
import { injectAxe, checkA11y } from "axe-playwright";
import { ComponentName } from "./ComponentName";

test.describe("ComponentName", () => {
  test("should render with default props", async ({ mount }) => {
    const component = await mount(<ComponentName>Test</ComponentName>);
    await expect(component).toBeVisible();
  });

  test("should be accessible", async ({ mount, page }) => {
    await mount(<ComponentName>Test</ComponentName>);
    await injectAxe(page);
    await checkA11y(page);
  });

  test("should support keyboard navigation", async ({ mount, page }) => {
    await mount(<ComponentName>Test</ComponentName>);
    await page.keyboard.press("Tab");
    await expect(page.locator(".component-name")).toBeFocused();
  });
});
```

Run tests:
```bash
pnpm test:ct        # Component tests
pnpm test           # Unit tests
```

## ✅ Pre-Commit Checklist

Before submitting a PR:

- [ ] **Type Safety**: `pnpm type-check` passes with no errors
- [ ] **Linting**: `pnpm lint` passes with no warnings
- [ ] **File Size**: Component and CSS files ≤ ~100 lines each
- [ ] **BEM Naming**: All CSS classes follow BEM convention
- [ ] **Accessibility**: 
  - [ ] 4.5:1 color contrast for text
  - [ ] Keyboard navigation works
  - [ ] ARIA attributes are correct
  - [ ] Screen reader announces properly
- [ ] **Tests**: Component tests pass with accessibility checks
- [ ] **Documentation**: Props documented with JSDoc comments
- [ ] **Export**: Component exported in category `index.ts`

## 📖 Component Categories

Place your component in the appropriate category:

- **`common/`**: Shared, general-purpose components (Button, Badge, Icon)
- **`controls/`**: Form elements and inputs (Input, Select, Checkbox)
- **`data-display/`**: Data presentation (Table, List, Card)
- **`layout/`**: Page structure (Sidebar, Header, Footer)

## 🔍 Code Review Process

1. Ensure all checklist items are complete
2. Create a pull request with a clear description
3. Address review feedback promptly
4. Ensure CI checks pass (type checking, linting, and tests run automatically)

### Required CI Checks

All pull requests must pass the following automated checks before merge:

- **Type checking**: `npm run type-check` must pass
- **Linting**: `npm run lint` must pass with no warnings
- **Component tests**: `npm run test:ct` must pass

These checks run automatically via GitHub Actions when you open or update a pull request.

## 📚 Resources

- **Full Guidelines**: [mpComponents.instructions.md](./mpComponents.instructions.md)
- **Quick Reference**: [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
- **Testing Guide**: [TESTING.md](./TESTING.md)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives)
- [BEM Methodology](http://getbem.com/)

## 💬 Getting Help

- Open an issue for bugs or feature requests
- Check existing documentation in the `docs/` folder
- Review similar existing components for patterns

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Happy coding! 🎉**
