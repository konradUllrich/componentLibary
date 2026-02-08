# mpComponents Instructions

This file defines the standards and conventions for the mpComponents folder structure and component development.

## Folder Organization

```
mpComponents/
├── common/          # Shared, reusable components (Button, Icon, etc.)
├── controls/        # Form controls and input components
├── data-display/    # Components for displaying data (Table, List, etc.)
├── layout/          # Layout components (Sidebar, Header, etc.)
├── styles/          # Global styles, variables, and theming
└── index.ts         # Main export file
```

### Category Guidelines

- **common/**: General-purpose components used across the app (Button, Icon, Badge, etc.)
- **controls/**: Form elements and interactive controls (Input, Select, Checkbox, etc.)
- **data-display/**: Components that present data (Table, List, Card, etc.)
- **layout/**: Page layout components (Sidebar, Header, Footer, Navigation, etc.)
- **styles/**: Global CSS variables, themes, and utility styles

## Component Structure

Each component should follow this file structure:

```
ComponentName/
├── ComponentName.tsx          # Main component file
├── ComponentName.css          # Component-specific styles
├── index.ts                   # Export file
├── SubComponent.tsx           # (optional) Sub-components
└── SubComponent.css           # (optional) Sub-component styles
```

### File Naming

- **Components**: PascalCase (e.g., `SidebarItem.tsx`, `TableHeader.tsx`)
- **Stylesheets**: Match component name (e.g., `SidebarItem.css`)
- **Hooks**: camelCase with `use` prefix (e.g., `useSidebar.ts`)
- **Utils/Helpers**: camelCase (e.g., `parseData.ts`)

## CSS/Styling Conventions

### Use Plain CSS, Not CSS Modules

All components should use **plain CSS imports**, not CSS modules:

```tsx
// ✅ Correct
import "./ComponentName.css";

// ❌ Wrong
import styles from "./ComponentName.module.css";
```

### BEM Naming Convention

Use Block Element Modifier (BEM) for all CSS classes:

```css
/* Block - main component */
.sidebar {
}

/* Element - part of a block */
.sidebar__wrapper {
}
.sidebar__nav {
}

/* Modifier - state or variant */
.sidebar--collapsed {
}
.sidebar--expanded {
}
.sidebar-item--active {
}

/* Combined */
.sidebar__nav--collapsed {
}
.sidebar-item__label--truncated {
}
```

**BEM Rules:**

- Block: `.blockName` (all lowercase, single word or hyphenated)
- Element: `.block__element` (double underscore)
- Modifier: `.block--modifier` (double hyphen)
- Complex names use hyphens: `.data-table`, `.sidebar-item`

### Class Application in Components

Apply BEM classes directly as strings, not as object properties.

**Use `clsx` for conditional class names:**

```tsx
import clsx from "clsx";

// ✅ Correct - using clsx
className={clsx(
  "sidebar-item",
  isActive && "sidebar-item--active",
  isExpanded && "sidebar-item--expanded",
  className
)}

// ✅ Also acceptable - template literals for simple cases
className={`sidebar-item ${isActive ? "sidebar-item--active" : ""}`}

// ❌ Wrong - CSS modules
className={`${styles["sidebar-item"]} ${styles["sidebar-item--active"]}`}
```

**Benefits of clsx:**

- Cleaner conditional class application
- Automatically filters falsy values
- Handles arrays and objects
- Better readability for complex conditions

**clsx patterns:**

```tsx
// Simple conditionals
clsx("base-class", condition && "conditional-class");

// Multiple conditions
clsx(
  "base-class",
  isActive && "base-class--active",
  isDisabled && "base-class--disabled",
  size === "large" && "base-class--large",
);

// With user className
clsx("base-class", modifier && "base-class--modifier", className);

// Array syntax
clsx(["base-class", condition && "base-class--active"]);

// Object syntax
clsx("base-class", {
  "base-class--active": isActive,
  "base-class--disabled": isDisabled,
});
```

### Stylesheet Organization

Each stylesheet should follow this structure:

```css
/* Component Description */

/* Block: ComponentName */
.component-name {
  /* base styles */
}

.component-name--modifier {
  /* modifier styles */
}

/* Element: Specific element */
.component-name__element {
  /* element styles */
}

.component-name__element--modifier {
  /* element modifier styles */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  /* mobile styles */
}
```

## Component Export Pattern

Each component folder must have an `index.ts` file:

```tsx
// index.ts
export { SidebarItem } from "./SidebarItem";
export type { SidebarItemProps } from "./SidebarItem";

export { SidebarSubItem } from "./SidebarSubItem";
export type { SidebarSubItemProps } from "./SidebarSubItem";
```

The main `mpComponents/index.ts` should aggregate exports:

```tsx
// Main index.ts
export * from "./common";
export * from "./controls";
export * from "./data-display";
export * from "./layout";
```

## Component Development Standards

### Keep Components and Stylesheets Small and Readable

**Component files should be approximately 100 lines or less.** If a component grows beyond this:

- **Extract sub-components** into separate files
- **Split complex logic** into custom hooks
- **Break down render logic** into smaller, focused components

**Stylesheet files should also be approximately 100 lines or less.** If styles grow too large:

- **Split by sub-component** - each sub-component gets its own stylesheet
- **Extract shared styles** into utility classes or CSS variables
- **Refactor complex modifiers** into separate components

**Benefits of small files:**

- Easier to understand and maintain
- Faster to navigate and debug
- Better code review experience
- Encourages single responsibility principle
- Reduces merge conflicts

**Example of splitting a large component:**

```tsx
// ❌ Bad - 200+ line component
// Table.tsx with everything in one file

// ✅ Good - Split into focused files
Table.tsx           (30 lines - composition)
TableHeader.tsx     (40 lines)
TableBody.tsx       (50 lines)
TableRow.tsx        (35 lines)
TableCell.tsx       (25 lines)

Table.css           (80 lines - container styles)
TableHeader.css     (40 lines)
TableBody.css       (30 lines)
TableRow.css        (50 lines)
TableCell.css       (35 lines)
```

**Guidelines:**

- Aim for 50-100 lines per file as a comfortable range
- If over 100 lines, look for opportunities to split
- Prioritize readability over strict line counts
- Small, focused files are easier to test and reuse

### Use Radix Primitives When Applicable

Whenever possible, build components on top of **Radix UI Primitives** for accessibility and behavior:

```tsx
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Select from "@radix-ui/react-select";
```

**When to use Radix Primitives:**

- Modal dialogs, popovers, dropdowns, tooltips
- Select, combobox, checkbox, radio groups
- Accordion, tabs, collapsible sections
- Context menus, hover cards
- Any component requiring complex keyboard navigation, focus management, or ARIA attributes

**Benefits:**

- Built-in accessibility (ARIA attributes, keyboard navigation)
- Unstyled by default - full control over styling
- Production-ready behavior and state management
- WAI-ARIA compliant

**Example with Radix:**

```tsx
// Dropdown.tsx
import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";
import "./Dropdown.css";

export interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "start" | "center" | "end";
}

export const Dropdown = ({
  trigger,
  children,
  align = "start",
}: DropdownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="dropdown-content"
          align={align}
          sideOffset={5}
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export const DropdownItem = ({
  children,
  onSelect,
  disabled,
}: {
  children: React.ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
}) => {
  return (
    <DropdownMenu.Item
      className={clsx("dropdown-item", disabled && "dropdown-item--disabled")}
      onSelect={onSelect}
      disabled={disabled}
    >
      {children}
    </DropdownMenu.Item>
  );
};
```

```css
/* Dropdown.css */
.dropdown-content {
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-2);
  box-shadow: var(--shadow-lg);
  min-width: 200px;
}

.dropdown-item {
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: var(--radius-sm);
  cursor: pointer;
  outline: none;
}

.dropdown-item:hover {
  background-color: var(--color-background-secondary);
}

.dropdown-item--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

**Guidelines:**

- Use Radix for complex interactive components
- Apply custom styling with BEM classes
- Wrap Radix primitives in your own components for consistent API
- Don't reinvent accessible components - leverage Radix first

### TypeScript Requirements

- All components must be properly typed with interfaces
- Props interfaces should extend relevant HTML element attributes
- Document props with JSDoc comments

```tsx
export interface ComponentNameProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Component description
   * @default "default-value"
   */
  prop?: string;

  /**
   * Another prop
   */
  children?: React.ReactNode;
}
```

### Ref Forwarding

Use `React.forwardRef` for components that need ref access:

```tsx
export const ComponentName = React.forwardRef<
  HTMLDivElement,
  ComponentNameProps
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={className} {...props} />;
});
```

### Display Names

Always set display names for debugging:

```tsx
ComponentName.displayName = "ComponentName";
```

## Accessibility (A11y) Standards

**Accessibility is not optional - it is a core requirement for all components.**

All components must meet **WCAG 2.1 Level AA** standards minimum. This ensures your components are usable by everyone, including people with disabilities.

### Color and Contrast

**Minimum Contrast Ratios:**

- **Normal text**: 4.5:1 (WCAG AA)
- **Large text** (18pt+): 3:1 (WCAG AA)
- **UI components** (borders, icons): 3:1 (WCAG AA)
- **Preferred**: 7:1 (WCAG AAA) for critical information

**When designing components:**

```css
/* ✅ Good contrast - passes WCAG AA */
.component {
  background-color: #ffffff; /* light */
  color: #1a1a1a; /* dark - 18:1 ratio */
}

/* ❌ Bad contrast - fails WCAG AA */
.component {
  background-color: #ffffff;
  color: #cccccc; /* too light - 2:1 ratio */
}

/* Badge example with good contrast */
.badge--primary.badge--solid {
  background-color: oklab(
    0.99 var(--color-primary-a) var(--color-primary-b)
  ); /* very light */
  color: var(--color-primary-dark); /* darker text for 7:1+ contrast */
}
```

**Testing contrast:**

- Use tools like [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Browser DevTools accessibility panel
- axe DevTools browser extension

### Keyboard Navigation

All interactive components must be fully keyboard accessible:

```tsx
// ✅ Good - component supports keyboard navigation
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onClick?.();
          }
        }}
        {...props}
      />
    );
  },
);

// ❌ Bad - click-only, not keyboard accessible
export const Button = ({ onClick, ...props }) => {
  return <div onClick={onClick} {...props} />;
};
```

**Keyboard requirements:**

- **Tab**: Navigate to/from component
- **Enter/Space**: Activate buttons, toggle checkboxes
- **Arrow Keys**: Navigate within lists, menus, radio groups
- **Escape**: Close dialogs, dismiss menus
- **Tab + Shift**: Navigate backwards

### Focus Management

Every interactive component needs visible focus indicators:

```css
/* ✅ Good - clear focus state */
.button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.input:focus-visible {
  border-color: var(--color-primary);
  box-shadow: var(--focus-shadow);
}

/* ❌ Bad - no focus indicator */
.button:focus {
  outline: none; /* NEVER remove outline without replacement */
}
```

**Focus requirements:**

- Always visible (use `focus-visible` for keyboard, not mouse)
- At least 2px width with 2px offset
- Good contrast (3:1 minimum against background)
- Preserve focus order (don't use `tabindex` unnecessarily)

### ARIA Attributes

Use ARIA attributes to communicate component state and purpose to screen readers:

```tsx
// ✅ Good - semantic ARIA
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, ...props }, ref) => {
    const id = props.id || `checkbox-${Math.random()}`;
    return (
      <>
        <input
          ref={ref}
          id={id}
          type="checkbox"
          aria-label={label}
          aria-invalid={error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
        {error && <div id={`${id}-error`}>{errorMessage}</div>}
      </>
    );
  }
);

// Common ARIA attributes:
aria-label              // Provides accessible name
aria-labelledby         // Links to label element
aria-describedby        // Links to description
aria-invalid            // Indicates error state
aria-required           // Marks required fields
aria-disabled           // Indicates disabled state
aria-expanded           // For collapsible content
aria-hidden="true"      // Hide decorative elements from screen readers
aria-live="polite"      // Announce dynamic updates
```

### Semantic HTML

Always use semantic HTML elements:

```tsx
// ✅ Good - semantic elements
<button>Click me</button>
<nav>Navigation</nav>
<main>Main content</main>
<header>Page header</header>
<footer>Page footer</footer>
<section>Content section</section>
<article>Article content</article>
<aside>Sidebar</aside>

// ❌ Bad - non-semantic divs
<div onClick={...}>Click me</div>
<div>Navigation</div>
<div>Main content</div>
```

**Semantic benefits:**

- Screen readers understand structure and purpose
- Keyboard navigation works out of the box
- Better SEO
- Clearer code intent

### Screen Reader Testing

Test components with screen readers:

**macOS**: VoiceOver (built-in)

```
Enable: Cmd + F5
Navigate: VO (Control + Option) + Arrow Keys
Interact: VO + Space
```

**Windows**: NVDA (free) or JAWS

- [NVDA Download](https://www.nvaccess.org/)
- Common keys: Tab, Enter, Arrow Keys

**Testing checklist:**

- [ ] Component purpose is announced
- [ ] Form labels are associated with inputs
- [ ] Error messages are announced
- [ ] State changes are communicated (checked, expanded, etc.)
- [ ] No content is invisible to screen readers (unless decorative)

### Images and Icons

Provide accessible alternatives for visual content:

```tsx
// ✅ Good - with alt text
<img src="icon.svg" alt="Settings icon" />

// ✅ Good - decorative icon hidden
<span aria-hidden="true">⚙️</span>

// ✅ Good - icon with label
<button>
  <span aria-hidden="true">🔍</span>
  <span>Search</span>
</button>

// ❌ Bad - no alternative
<img src="icon.svg" />
```

### Form Accessibility

Forms must be fully accessible:

```tsx
// ✅ Good - proper form structure
<div className="form-control">
  <label htmlFor="email">Email address</label>
  <input
    id="email"
    type="email"
    aria-required="true"
    aria-describedby="email-help"
  />
  <small id="email-help">We'll never share your email</small>
</div>

// ✅ Good - error indication
<input
  aria-invalid={error}
  aria-describedby={error ? "email-error" : undefined}
/>
{error && <div id="email-error" role="alert">{errorMessage}</div>}

// ❌ Bad - missing label association
<input type="email" placeholder="Email" />
```

**Form requirements:**

- Every input has an associated `<label>` or `aria-label`
- Required fields marked with `aria-required="true"`
- Error messages linked with `aria-describedby`
- Error messages have `role="alert"`

### Color Should Not Be the Only Indicator

Don't rely solely on color to convey information:

```tsx
// ✅ Good - color + pattern + text
<Badge variant="success" icon={<CheckIcon />}>
  Verified
</Badge>

// ✅ Good - color + icon + label
<span className={clsx("status", `status--${status}`)}>
  <span aria-hidden="true">{getStatusIcon(status)}</span>
  {status}
</span>

// ❌ Bad - color only
<div style={{ backgroundColor: "green" }} />
```

### Testing Tools

Use these tools to validate accessibility:

**Automated Testing:**

- [axe DevTools](https://www.deque.com/axe/devtools/) - Browser extension
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Chrome DevTools
- [WAVE](https://wave.webaim.org/) - Web accessibility evaluation tool
- `jest-axe` - Automated testing in Jest

**Manual Testing:**

- Keyboard-only navigation (disable mouse, use Tab/Enter/Arrows)
- Screen reader testing (VoiceOver, NVDA, JAWS)
- Zoom to 200% for low vision testing
- Color contrast checking

**Example automated test:**

```tsx
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

test("Button is accessible", async () => {
  const { container } = render(<Button>Click me</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Accessibility Checklist for Components

Before publishing a component:

- [ ] **Color Contrast**: 4.5:1 minimum for normal text, tested with WebAIM
- [ ] **Keyboard Navigation**: Tab, Enter, Escape, Arrow keys work as expected
- [ ] **Focus Visible**: Clear focus indicator with 2px outline
- [ ] **ARIA Attributes**: Proper roles, labels, states, and descriptions
- [ ] **Semantic HTML**: Using appropriate elements (button, input, label, etc.)
- [ ] **Form Labels**: All inputs have associated labels
- [ ] **Error Handling**: Errors announced and linked to inputs
- [ ] **Screen Reader**: Tested with VoiceOver/NVDA, purpose is clear
- [ ] **Images/Icons**: Alt text or aria-hidden used appropriately
- [ ] **No Color-Only Indicators**: Information conveyed through multiple means
- [ ] **Automated Tests**: axe or similar tool passes with no violations
- [ ] **Focus Order**: Logical tab order with no keyboard traps

### Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM](https://webaim.org/)
- [Inclusive Components](https://inclusive-components.design/)
- [A11ycasts](https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0C9Xc-RgEzwLvoPccPQp) - Video series

---
