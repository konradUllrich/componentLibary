# mpComponents Theming Guide

## Overview

The mpComponents library uses CSS custom properties (variables) for theming. All design tokens are defined in `variables.css` and can be easily customized to match your brand and design system.

## Setup

### 1. Import Variables in Your App

Add the import to your application's main CSS file or entry point:

```css
/* In your main.css or App.tsx */
@import "./mpComponents/styles/variables.css";
```

Or import in TypeScript:

```tsx
// In your App.tsx or main.tsx
import "./mpComponents/styles/variables.css";
```

## Theme Variables

### Color Palette

#### Primary Colors

- `--color-primary` - Main brand color
- `--color-primary-light` - Lighter variant
- `--color-primary-dark` - Darker variant
- `--color-primary-foreground` - Text color on primary background

```css
--color-primary: #007bff;
--color-primary-light: #0d6efd;
--color-primary-dark: #0056b3;
--color-primary-foreground: #ffffff;
```

#### Secondary Colors

- `--color-secondary` - Secondary brand color
- `--color-secondary-light` - Lighter variant
- `--color-secondary-dark` - Darker variant
- `--color-secondary-foreground` - Text color on secondary background

#### Semantic Colors

- **Success**: `--color-success`, `--color-success-light`, `--color-success-dark`
- **Warning**: `--color-warning`, `--color-warning-light`, `--color-warning-dark`
- **Destructive/Error**: `--color-destructive`, `--color-destructive-light`, `--color-destructive-dark`
- **Info**: `--color-info`, `--color-info-light`, `--color-info-dark`

#### Neutral/Gray Scale

```css
--color-gray-50: #f9fafb; /* Lightest */
--color-gray-100: #f3f4f6;
--color-gray-200: #e5e7eb;
--color-gray-300: #d1d5db;
--color-gray-400: #9ca3af;
--color-gray-500: #6b7280;
--color-gray-600: #4b5563;
--color-gray-700: #374151;
--color-gray-800: #1f2937;
--color-gray-900: #111827; /* Darkest */
```

#### Background & Text Colors

- `--color-background` - Primary background
- `--color-background-secondary` - Secondary background
- `--color-background-tertiary` - Tertiary background
- `--color-foreground` - Primary text
- `--color-foreground-secondary` - Secondary text
- `--color-foreground-tertiary` - Tertiary text
- `--color-foreground-muted` - Muted/disabled text

#### Functional Colors

- `--color-border` - Standard border color
- `--color-input` - Input field background
- `--color-ring` - Focus ring color

### Spacing Scale

Consistent spacing system (multiples of 4px):

```css
--spacing-0: 0;
--spacing-1: 0.25rem; /* 4px */
--spacing-2: 0.5rem; /* 8px */
--spacing-3: 0.75rem; /* 12px */
--spacing-4: 1rem; /* 16px */
--spacing-6: 1.5rem; /* 24px */
--spacing-8: 2rem; /* 32px */
/* ... up to 24rem */
```

**Usage in components:**

```css
.button {
  padding: var(--spacing-2) var(--spacing-4);
  margin-bottom: var(--spacing-4);
}
```

### Typography

#### Font Families

- `--font-family-base` - Default sans-serif for UI
- `--font-family-mono` - Monospace for code
- `--font-family-serif` - Serif for headings (optional)

#### Font Sizes

```css
--font-size-xs: 0.75rem; /* 12px */
--font-size-sm: 0.875rem; /* 14px */
--font-size-base: 1rem; /* 16px */
--font-size-lg: 1.125rem; /* 18px */
--font-size-xl: 1.25rem; /* 20px */
--font-size-2xl: 1.5rem; /* 24px */
/* ... up to 5xl */
```

#### Font Weights

```css
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-extrabold: 800;
```

#### Line Heights

```css
--line-height-tight: 1.2;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
--line-height-loose: 2;
```

### Border Radius

```css
--radius-none: 0;
--radius-sm: 0.25rem; /* 4px */
--radius-md: 0.375rem; /* 6px */
--radius-lg: 0.5rem; /* 8px */
--radius-xl: 0.75rem; /* 12px */
--radius-2xl: 1rem; /* 16px */
--radius-full: 9999px;
```

### Shadows

Multiple shadow levels for depth:

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
--shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);
```

### Transitions

#### Durations

```css
--duration-75: 75ms;
--duration-100: 100ms;
--duration-150: 150ms;
--duration-200: 200ms; /* Standard */
--duration-300: 300ms; /* Default */
--duration-500: 500ms;
--duration-700: 700ms;
--duration-1000: 1000ms;
```

#### Timing Functions (Easing)

```css
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

**Usage:**

```css
.button {
  transition: all var(--duration-200) var(--ease-in-out);
}
```

### Z-Index Scale

Organized z-index values to prevent stacking conflicts:

```css
--z-hide: -1; /* Hidden elements */
--z-base: 0; /* Default */
--z-dropdown: 10; /* Dropdowns */
--z-sticky: 20; /* Sticky elements */
--z-fixed: 30; /* Fixed elements */
--z-offcanvas: 40; /* Offcanvas menus */
--z-backdrop: 50; /* Backdrops */
--z-modal: 100; /* Modals */
--z-popover: 110; /* Popovers */
--z-tooltip: 120; /* Tooltips */
--z-notification: 130; /* Notifications/Toast */
```

### Component-Specific Tokens

Pre-configured variables for common components:

#### Button

```css
--button-padding-y-sm: 0.375rem;
--button-padding-x-sm: 0.75rem;
--button-padding-y-md: 0.5rem;
--button-padding-x-md: 1rem;
--button-padding-y-lg: 0.75rem;
--button-padding-x-lg: 1.5rem;
--button-font-size: var(--font-size-base);
--button-font-weight: var(--font-weight-medium);
--button-border-radius: var(--radius-md);
--button-transition: all var(--duration-200) var(--ease-in-out);
```

#### Input

```css
--input-padding-y: 0.5rem;
--input-padding-x: 0.75rem;
--input-font-size: var(--font-size-base);
--input-border-radius: var(--radius-md);
--input-border-width: 1px;
--input-border-color: var(--color-input-border);
--input-focus-border-color: var(--color-ring);
--input-transition: border-color var(--duration-200) var(--ease-in-out);
```

#### Card, Badge, Modal, Table, Form

See `variables.css` for additional component-specific tokens.

## Customization

### Override Variables

Create your own CSS file and override variables before importing components:

```css
/* theme.css */
:root {
  /* Override primary color */
  --color-primary: #6366f1;
  --color-primary-light: #818cf8;
  --color-primary-dark: #4f46e5;

  /* Override spacing */
  --spacing-4: 1.25rem; /* Increase base spacing */

  /* Override typography */
  --font-family-base: "Inter", sans-serif;
  --font-size-base: 15px;
}
```

Then import in order:

```tsx
import "./theme.css"; // Custom theme first
import "./mpComponents/styles/variables.css"; // Will not override your custom values
```

### Brand Customization

#### Example: Company Branded Theme

```css
:root {
  /* Company brand colors */
  --color-primary: #ff6b35;
  --color-primary-light: #ff8c42;
  --color-primary-dark: #e55100;
  --color-primary-foreground: #ffffff;

  /* Company secondary color */
  --color-secondary: #004e89;
  --color-secondary-light: #006ba6;
  --color-secondary-dark: #003d66;

  /* Override font for brand consistency */
  --font-family-base: "Poppins", sans-serif;
  --font-weight-medium: 600; /* Poppins medium = 600 */
}
```

## Dark Mode

The theme includes automatic dark mode support using `prefers-color-scheme: dark`.

### Automatic Dark Mode

Colors automatically adjust based on system preference:

- Background becomes dark
- Text becomes light
- Borders adjust for contrast

### Manual Dark Mode

To implement manual dark mode toggle:

```tsx
// Add class to root element
document.documentElement.classList.add('dark');

// Then add this to your CSS:
@media (prefers-color-scheme: dark),
.dark {
  :root {
    --color-background: #1f2937;
    /* ... rest of dark theme */
  }
}
```

## Best Practices

### 1. Use Variables Consistently

```css
/* ✅ Good */
.button {
  color: var(--color-primary-foreground);
  background-color: var(--color-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-2) var(--spacing-4);
}

/* ❌ Avoid hardcoding colors */
.button {
  color: #ffffff;
  background-color: #007bff;
  border-radius: 6px;
  padding: 8px 16px;
}
```

### 2. Semantic Color Usage

```css
/* ✅ Use semantic colors for intent */
.error-message {
  color: var(--color-destructive);
}

.success-message {
  color: var(--color-success);
}

/* ❌ Don't map random colors */
.error-message {
  color: var(--color-primary);
}
```

### 3. Spacing Consistency

```css
/* ✅ Use spacing scale */
.card {
  padding: var(--spacing-6);
  margin-bottom: var(--spacing-4);
  gap: var(--spacing-3);
}
```

### 4. Component Tokens for Reusability

```css
/* ✅ Use component tokens */
.button {
  padding: var(--button-padding-y-md) var(--button-padding-x-md);
  font-weight: var(--button-font-weight);
  border-radius: var(--button-border-radius);
  transition: var(--button-transition);
}
```

## Component Usage Examples

### Button with Primary Color

```tsx
import styles from "./Button.module.css";

export function Button() {
  return (
    <button
      className={styles.button}
      style={{
        backgroundColor: "var(--color-primary)",
        color: "var(--color-primary-foreground)",
        padding: "var(--button-padding-y-md) var(--button-padding-x-md)",
        borderRadius: "var(--button-border-radius)",
      }}
    >
      Click me
    </button>
  );
}
```

### Responsive Spacing

```css
.container {
  padding: var(--spacing-4);
}

@media (min-width: 768px) {
  .container {
    padding: var(--spacing-8);
  }
}
```

## Resources

- **CSS Custom Properties MDN**: https://developer.mozilla.org/en-US/docs/Web/CSS/--*
- **Design Tokens**: https://www.designtokens.org/
- **Radix UI Colors**: https://www.radix-ui.com/docs/colors/getting-started

## Support

For questions or custom theming needs, refer to the main PLAN.md or contact the development team.
