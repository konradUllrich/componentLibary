# mpComponents - Component Library Plan

## Overview

`mpComponents` is a shared, reusable React component library built with **Radix UI primitives**, **TanStack Form & Tables**, and **plain CSS** for styling. It serves as the foundation for UI consistency and provides reusable components with accessibility and type safety built-in.

---

## Project Goals

✅ **Standardized UI Components** — Centralized component definitions using Radix primitives  
✅ **Type-Safe Forms** — Robust form handling with TanStack Form  
✅ **Advanced Tables** — Flexible, feature-rich tables with TanStack Table  
✅ **Scalable Styling** — Plain CSS with BEM naming for predictable, maintainable styles  
✅ **Easy Consumption** — Clean barrel exports and comprehensive documentation  
✅ **Reusability** — Components built for multiple applications (KanbanReact, KanbanReact2, future apps)

---

## Directory Structure (Current)

```
mpComponents/
├── index.ts                            # Main barrel export
│
├── common/                             # Base UI primitives (Radix components)
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.css
│   │   └── index.ts
│   ├── Input/
│   │   ├── Input.tsx
│   │   ├── Input.css
│   │   └── index.ts
│   ├── Badge/
│   │   ├── Badge.tsx
│   │   ├── Badge.css
│   │   └── index.ts
│   ├── Dialog/
│   │   ├── Dialog.tsx
│   │   ├── Dialog.css
│   │   └── index.ts
│   ├── Dropdown/
│   │   ├── Dropdown.tsx
│   │   ├── Dropdown.css
│   │   └── index.ts
│   ├── Tooltip/
│   │   ├── Tooltip.tsx
│   │   ├── Tooltip.css
│   │   └── index.ts
│   ├── Tabs/
│   │   ├── Tabs.tsx
│   │   ├── Tabs.css
│   │   └── index.ts
│   ├── Accordion/
│   │   ├── Accordion.tsx
│   │   ├── Accordion.css
│   │   └── index.ts
│   ├── Popover/
│   │   ├── Popover.tsx
│   │   ├── Popover.css
│   │   └── index.ts
│   ├── Checkbox/
│   │   ├── Checkbox.tsx
│   │   ├── Checkbox.css
│   │   └── index.ts
│   ├── RadioGroup/
│   │   ├── RadioGroup.tsx
│   │   ├── RadioGroup.css
│   │   └── index.ts
│   ├── Separator/
│   │   ├── Separator.tsx
│   │   ├── Separator.css
│   │   └── index.ts
│   ├── Slider/
│   │   ├── Slider.tsx
│   │   ├── Slider.css
│   │   └── index.ts
│   ├── Spinner/
│   │   ├── Spinner.tsx
│   │   ├── Spinner.css
│   │   └── index.ts
│   ├── Skeleton/
│   │   ├── Skeleton.tsx
│   │   ├── Skeleton.css
│   │   └── index.ts
│   └── index.ts                        # Common components barrel export
│
├── controls/                           # Interactive & form control components
│   ├── FormField/
│   │   ├── FormField.tsx
│   │   ├── FormField.css
│   │   └── index.ts
│   ├── FormInput/
│   │   ├── FormInput.tsx
│   │   ├── FormInput.css
│   │   └── index.ts
│   ├── FormSelect/
│   │   ├── FormSelect.tsx
│   │   ├── FormSelect.css
│   │   └── index.ts
│   ├── FormCheckbox/
│   │   ├── FormCheckbox.tsx
│   │   ├── FormCheckbox.css
│   │   └── index.ts
│   ├── FormTextarea/
│   │   ├── FormTextarea.tsx
│   │   ├── FormTextarea.css
│   │   └── index.ts
│   ├── FormError/
│   │   ├── FormError.tsx
│   │   ├── FormError.css
│   │   └── index.ts
│   ├── useForm/
│   │   ├── useForm.ts                # Custom hook wrapping TanStack Form
│   │   └── index.ts
│   └── index.ts                        # Controls barrel export
│
├── data-display/                       # Data presentation components
│   ├── Table/
│   │   ├── Table.tsx
│   │   ├── Table.css
│   │   └── index.ts
│   ├── TableHeader/
│   │   ├── TableHeader.tsx
│   │   ├── TableHeader.css
│   │   └── index.ts
│   ├── TableBody/
│   │   ├── TableBody.tsx
│   │   ├── TableBody.css
│   │   └── index.ts
│   ├── TableRow/
│   │   ├── TableRow.tsx
│   │   ├── TableRow.css
│   │   └── index.ts
│   ├── TableCell/
│   │   ├── TableCell.tsx
│   │   ├── TableCell.css
│   │   └── index.ts
│   ├── DataTable/
│   │   ├── DataTable.tsx               # Composite table with sorting, filtering, pagination
│   │   ├── DataTable.css
│   │   └── index.ts
│   ├── usePagination/
│   │   ├── usePagination.ts            # Pagination logic hook
│   │   └── index.ts
│   ├── useColumnVisibility/
│   │   ├── useColumnVisibility.ts      # Column management logic hook
│   │   └── index.ts
│   ├── Alert/
│   │   ├── Alert.tsx
│   │   ├── Alert.css
│   │   └── index.ts
│   ├── Toast/
│   │   ├── Toast.tsx
│   │   ├── Toast.css
│   │   ├── useToast.ts
│   │   └── index.ts
│   └── index.ts                        # Data display barrel export
│
├── layout/                             # Layout & structural components
│   ├── Container/
│   │   ├── Container.tsx
│   │   ├── Container.css
│   │   └── index.ts
│   ├── Stack/
│   │   ├── Stack.tsx                   # Flexbox-based layout
│   │   ├── Stack.css
│   │   └── index.ts
│   ├── Grid/
│   │   ├── Grid.tsx                    # CSS Grid layout
│   │   ├── Grid.css
│   │   └── index.ts
│   ├── Flex/
│   │   ├── Flex.tsx
│   │   ├── Flex.css
│   │   └── index.ts
│   └── index.ts                        # Layout barrel export
│
├── hooks/                              # Shared custom hooks
│   ├── useMediaQuery.ts
│   ├── useClickOutside.ts
│   ├── useFocus.ts
│   ├── useDebounce.ts
│   └── index.ts
│
├── styles/                             # Global styles & design tokens
│   ├── variables.css            # CSS custom properties for theming
│   ├── reset.css                       # CSS reset
│   ├── globals.css                     # Global typography, spacing
│   └── index.css
│
├── types/                              # TypeScript types & interfaces
│   ├── component.ts                    # Common component prop types
│   ├── form.ts                         # Form-related types
│   ├── table.ts                        # Table-related types
│   └── index.ts
│
├── utils/                              # Utility functions
│   ├── cn.ts                           # CSS class name utility
│   ├── formatters.ts                   # Data formatting helpers
│   └── index.ts
│
├── docs/                               # Documentation
│   ├── COMPONENTS.md                   # Component catalog & usage
│   ├── THEMING.md                      # Theming & customization guide
│   ├── FORM_GUIDE.md                   # TanStack Form integration guide
│   ├── TABLE_GUIDE.md                  # TanStack Table integration guide
│   └── CONTRIBUTING.md                 # Contribution guidelines
│
├── PLAN.md                             # This file
└── README.md
```

---

## Implementation Phases

### Phase 1: Foundation (Weeks 1-2)

**Goal:** Set up project infrastructure and core primitives

1. **Initialize Package Structure**
   - Create `package.json` with dependencies (Radix UI, TanStack, TypeScript, Vite)
   - Set up TypeScript configuration
   - Configure Vite build system with plain CSS support
   - Configure ESLint and Prettier

2. **Install Dependencies**

   ```bash
   npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-separator @radix-ui/react-tooltip @radix-ui/react-accordion @radix-ui/react-popover @radix-ui/react-checkbox @radix-ui/react-radio-group @radix-ui/react-slider @tanstack/react-form @tanstack/react-table
   ```

3. **Set Up Core Infrastructure**
   - Create global styles and CSS custom properties
   - Define TypeScript types for common patterns
   - Set up utility functions (class name composition, etc.)
   - Create `index.ts` barrel exports

4. **Implement Base Primitives**
   - Button component with variants (primary, secondary, destructive, ghost)
   - Input component with validation states
   - Badge component for labels and tags
   - Separator component for dividers
   - Spinner & Skeleton for loading states

### Phase 2: Forms & Validation (Weeks 3-4)

**Goal:** Create form infrastructure using TanStack Form

1. **Form Hook & Utilities**
   - Custom `useForm` hook wrapping TanStack Form
   - Form field context for error and touched state management
   - Validation schema helpers (if using Zod/Yup)

2. **Form Components**
   - `FormField` — wrapper handling label, input, and error display
   - `FormInput` — Radix-based input with form integration
   - `FormSelect` — dropdown using Radix with form binding
   - `FormCheckbox` — checkbox group with form validation
   - `FormTextarea` — textarea with character limit
   - `FormError` — error message display component

3. **Documentation**
   - Create FORM_GUIDE.md with examples and patterns

### Phase 3: Tables & Data Display (Weeks 5-6)

**Goal:** Implement table system with TanStack Table

1. **Table Foundation**
   - Base Table, TableHeader, TableBody, TableRow, TableCell components
   - Each with plain CSS for styling using BEM naming convention

2. **DataTable Composite**
   - `DataTable` component with built-in:
     - Sorting capabilities
     - Column filtering
     - Pagination
     - Row selection (checkboxes)
     - Column visibility toggle
     - Responsive behavior

3. **Custom Hooks**
   - `usePagination` — pagination state and controls
   - `useColumnVisibility` — manage visible/hidden columns

4. **Documentation**
   - Create TABLE_GUIDE.md with TanStack Table patterns

### Phase 4: Layouts & Additional Components (Weeks 7-8)

**Goal:** Add layout utilities and feedback components

1. **Layout Components**
   - Container, Stack (flexbox), Grid, Flex wrappers
   - Plain CSS for responsive behavior using BEM naming

2. **Feedback Components**
   - Alert component for messages
   - Toast system with `useToast` hook
   - Proper accessibility and styling

3. **Custom Hooks**
   - `useMediaQuery` for responsive logic
   - `useClickOutside` for modals/popovers
   - `useFocus` for focus management
   - `useDebounce` for input debouncing

### Phase 5: Documentation & Testing (Weeks 9-10)

**Goal:** Complete documentation and test coverage

1. **Storybook Setup** (Optional)
   - Configure Storybook
   - Create stories for each component category
   - Interactive documentation and visual testing

2. **Unit Tests**
   - Test critical components (Button, FormField, Table)
   - Mock Radix UI behaviors
   - Test CSS Module class application

3. **Documentation**
   - COMPONENTS.md — full component catalog with examples
   - THEMING.md — CSS customization guide
   - CONTRIBUTING.md — development guidelines

---

## Organization by Category

### common/ — Base Primitives

All base Radix UI primitives that form the foundation for more complex components:

- Button, Input, Badge, Dialog, Dropdown, Tooltip, Tabs, Accordion, Popover, Checkbox, RadioGroup, Separator, Slider, Spinner, Skeleton

### controls/ — Form Controls & Form Components

Components for form handling using TanStack Form:

- FormField, FormInput, FormSelect, FormCheckbox, FormTextarea, FormError
- useForm hook for managing form state and validation

### data-display/ — Data Presentation & Feedback

Components for displaying data and user feedback:

- Table, TableHeader, TableBody, TableRow, TableCell
- DataTable (composite with sorting, filtering, pagination)
- usePagination, useColumnVisibility hooks
- Alert, Toast (with useToast hook)

### layout/ — Layout Utilities

Utility components for page structure and layout:

- Container (max-width wrapper)
- Stack (flexbox column/row)
- Grid (CSS Grid layout)
- Flex (flexbox primitive)

---

## Development Guidelines

### Component Structure (Per React Instructions)

Each component follows this pattern within its category folder:

```
common/Button/
├── Button.tsx           # Component logic
├── Button.css    # Scoped styles
└── index.ts            # Clean export
```

### Imports Within the Repository

Use direct imports for components and styles:

```tsx
import { Button } from "@/mpComponents/common";
import { FormInput, useForm } from "@/mpComponents/controls";
import "./Button.css"; // Import CSS directly, not as module
```

### Plain CSS Best Practices

**Theme Management Pattern:**
All color and dark mode styling is managed exclusively through design tokens in `styles/variables.css`. Component CSS files should **not** define colors, backgrounds, or dark mode overrides. This ensures:

- ✅ Single source of truth for theming
- ✅ Easy global theme switching (light/dark modes)
- ✅ Consistent color palette across all components
- ✅ Reduced CSS duplication

**Component CSS Should Contain:**

- Layout properties (display, flexbox, grid, positioning)
- Spacing (padding, margin, gap)
- Sizing (width, height, min/max constraints)
- Typography (font-size, font-weight, line-height) — already defined as tokens
- Borders (border-style, border-width) — uses --color-border from tokens
- Shadows (from --shadow-\* tokens)
- Transitions and transforms
- Media queries for responsive behavior (NOT dark mode)

**Example:**

```css
/* Button.css */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  padding: var(--spacing-2) var(--spacing-4);
  font-weight: var(--font-weight-medium);
  transition: all var(--duration-200);
  border: none;
  cursor: pointer;
  /* NO explicit colors - inherited from tokens */
}

.button:hover {
  opacity: 0.9;
}

.buttonPrimary {
  background-color: var(--color-primary);
  color: var(--color-primary-foreground);
}

/* NO dark mode media query needed - handled in variables.css */
```

### TypeScript Type Safety

```tsx
// types/component.ts
export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  role?: string;
  "data-testid"?: string;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: "primary" | "secondary" | "destructive" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
```

### Form Integration Example

```tsx
// Usage in KanbanReact2
import { useForm, FormInput, FormField } from "@/mpComponents/controls";
import { Button } from "@/mpComponents/common";

export function LoginForm() {
  const form = useForm({
    defaultValues: { email: "", password: "" },
  });

  return (
    <form
      onSubmit={form.handleSubmit(async (data) => {
        // Handle submission
      })}
    >
      <FormField name="email" label="Email">
        <FormInput type="email" />
      </FormField>
      <FormField name="password" label="Password">
        <FormInput type="password" />
      </FormField>
      <Button type="submit">Login</Button>
    </form>
  );
}
```

### Table Integration Example

```tsx
// Usage in KanbanReact2
import { DataTable } from "@/mpComponents/data-display";
import { useTable } from "@tanstack/react-table";

export function UserTable({ data }) {
  const table = useTable({
    data,
    columns: [...],
  });

  return <DataTable table={table} />;
}
```

---

## Package Configuration

### package.json Structure

```json
{
  "name": "mpComponents",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./primitives": {
      "import": "./dist/primitives/index.js",
      "types": "./dist/primitives/index.d.ts"
    },
    "./forms": {
      "import": "./dist/forms/index.js",
      "types": "./dist/forms/index.d.ts"
    },
    "./tables": {
      "import": "./dist/tables/index.js",
      "types": "./dist/tables/index.d.ts"
    },
    "./layouts": {
      "import": "./dist/layouts/index.js",
      "types": "./dist/layouts/index.d.ts"
    },
    "./feedback": {
      "import": "./dist/feedback/index.js",
      "types": "./dist/feedback/index.d.ts"
    },
    "./hooks": {
      "import": "./dist/hooks/index.js",
      "types": "./dist/hooks/index.d.ts"
    },
    "./styles": "./dist/styles/index.css"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "type-check": "tsc --noEmit",
    "lint": "eslint src --fix"
  }
}
```

---

## Integration and Usage

### Within the Library

Since this is a standalone component library, it can be imported in applications:

```tsx
// In applications using mpComponents
import { Button, Badge, Spinner } from "@konradullrich/mp-components";
import { FormField, FormInput, useForm } from "@konradullrich/mp-components/controls";
import { DataTable, Table, Alert } from "@konradullrich/mp-components/data-display";
import { Container, Stack, Grid } from "@konradullrich/mp-components/layout";
import "@konradullrich/mp-components/styles";
```

### Future Package Distribution

The library is already set up as a standalone package and can be published to npm or consumed via workspace dependencies:

```json
{
  "workspaces": ["packages/mpComponents", "apps/KanbanReact", "apps/KanbanReact2"]
}
```

---

## Design Tokens & Theming

### CSS Variables (styles/variables.css)

```css
:root {
  /* Colors */
  --color-primary: #007bff;
  --color-primary-foreground: #ffffff;
  --color-secondary: #6c757d;
  --color-secondary-foreground: #ffffff;
  --color-destructive: #dc3545;
  --color-background: #ffffff;
  --color-foreground: #212529;
  --color-border: #dee2e6;
  --color-input: #ffffff;
  --color-ring: #0d6efd;

  /* Spacing */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-4: 1rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;

  /* Typography */
  --font-family-base:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;

  /* Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;

  /* Transitions */
  --duration-200: 200ms;
  --duration-300: 300ms;
  --easing: cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## Testing Strategy

### Unit Tests (Vitest)

- Test component rendering and props
- Test form validation and submission
- Test table sorting, filtering, pagination
- Mock Radix UI behaviors

### Component Tests (Playwright CT)

- Visual regression tests
- Interaction tests (click, focus, keyboard)
- Accessibility tests (a11y)

---

## Success Criteria

✅ All primitive components built and tested  
✅ Form system fully integrated with TanStack Form  
✅ Table system fully integrated with TanStack Table  
✅ Plain CSS with BEM naming properly scoped to avoid style conflicts  
✅ Documentation complete with examples  
✅ >80% test coverage for critical components  
✅ Successfully consumed by KanbanReact & KanbanReact2  
✅ Type safety enforced across all components

---

## References & Resources

- **Radix UI Documentation**: https://www.radix-ui.com
- **TanStack Form**: https://tanstack.com/form/latest
- **TanStack Table**: https://tanstack.com/table/latest
- **BEM Naming Convention**: https://getbem.com/
- **Vite Documentation**: https://vitejs.dev

---

## Next Steps

1. Create index.ts barrel exports for each category (common/, controls/, data-display/, layout/)
2. Begin Phase 1 implementation with base primitives in common/
3. Set up shared styles and design tokens
4. Implement form components in controls/ with TanStack Form integration
5. Build table components in data-display/ with TanStack Table
6. Add layout utility components
7. Create comprehensive documentation
8. Set up unit tests with Vitest
9. Optional: Extract to shared package when mature
