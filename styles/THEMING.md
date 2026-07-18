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

- `--mp-color-primary` - Main brand color
- `--mp-color-primary-light` - Lighter variant
- `--mp-color-primary-strong` - Darker variant
- `--mp-color-onPrimary` - Text color on primary background

```css
--mp-color-primary: #007bff;
--mp-color-primary-light: #0d6efd;
--mp-color-primary-strong: #0056b3;
--mp-color-onPrimary: #ffffff;
```

#### Secondary Colors

- `--mp-color-secondary` - Secondary brand color
- `--mp-color-secondary-light` - Lighter variant
- `--mp-color-secondary-dark` - Darker variant
- `--mp-color-secondary-foreground` - Text color on secondary background

#### Semantic Colors

- **Success**: `--mp-color-success`, `--mp-color-success-light`, `--mp-color-success-dark`
- **Warning**: `--mp-color-warning`, `--mp-color-warning-light`, `--mp-color-warning-dark`
- **Destructive/Error**: `--mp-color-destructive`, `--mp-color-destructive-light`, `--mp-color-destructive-dark`
- **Info**: `--mp-color-info`, `--mp-color-info-light`, `--mp-color-info-dark`

#### Neutral/Gray Scale

```css
--mp-color-gray-50: #f9fafb; /* Lightest */
--mp-color-gray-100: #f3f4f6;
--mp-color-gray-200: #e5e7eb;
--mp-color-gray-300: #d1d5db;
--mp-color-gray-400: #9ca3af;
--mp-color-gray-500: #6b7280;
--mp-color-gray-600: #4b5563;
--mp-color-gray-700: #374151;
--mp-color-gray-800: #1f2937;
--mp-color-gray-900: #111827; /* Darkest */
```

#### Background & Text Colors

- `--mp-color-background` - Primary background
- `--mp-color-background-secondary` - Secondary background
- `--mp-color-background-light` - Tertiary background
- `--mp-color-foreground` - Primary text
- `--mp-color-foreground-light` - Secondary text
- `--mp-color-foreground-light` - Tertiary text
- `--mp-color-foreground-muted` - Muted/disabled text

#### Functional Colors

- `--mp-color-border` - Standard border color
- `--mp-color-input` - Input field background
- `--mp-color-ring` - Focus ring color

### Spacing Scale

Consistent spacing system (multiples of 4px):

```css
--mp-spacing-0: 0;
--mp-spacing-1: 0.25rem; /* 4px */
--mp-spacing-2: 0.5rem; /* 8px */
--mp-spacing-3: 0.75rem; /* 12px */
--mp-spacing-4: 1rem; /* 16px */
--mp-spacing-6: 1.5rem; /* 24px */
--mp-spacing-8: 2rem; /* 32px */
/* ... up to 24rem */
```

**Usage in components:**

```css
.button {
  padding: var(--mp-spacing-2) var(--mp-spacing-4);
  margin-bottom: var(--mp-spacing-4);
}
```

### Typography

#### Font Families

- `--font-family-base` - Default sans-serif for UI
- `--font-family-mono` - Monospace for code
- `--font-family-serif` - Serif for headings (optional)

#### Font Sizes

```css
--mp-font-size-xs: 0.75rem; /* 12px */
--mp-font-size-sm: 0.875rem; /* 14px */
--mp-font-size-base: 1rem; /* 16px */
--mp-font-size-lg: 1.125rem; /* 18px */
--mp-font-size-xl: 1.25rem; /* 20px */
--mp-font-size-2xl: 1.5rem; /* 24px */
/* ... up to 5xl */
```

#### Font Weights

```css
--mp-font-weight-light: 300;
--mp-font-weight-normal: 400;
--mp-font-weight-medium: 500;
--mp-font-weight-semibold: 600;
--mp-font-weight-bold: 700;
--mp-font-weight-extrabold: 800;
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
--mp-radius-none: 0;
--mp-radius-sm: 0.25rem; /* 4px */
--mp-radius-md: 0.375rem; /* 6px */
--mp-radius-lg: 0.5rem; /* 8px */
--mp-radius-xl: 0.75rem; /* 12px */
--mp-radius-2xl: 1rem; /* 16px */
--mp-radius-full: 9999px;
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
--mp-button-padding-y-sm: 0.375rem;
--mp-button-padding-x-sm: 0.75rem;
--mp-button-padding-y-md: 0.5rem;
--mp-button-padding-x-md: 1rem;
--mp-button-padding-y-lg: 0.75rem;
--mp-button-padding-x-lg: 1.5rem;
--mp-button-font-size: var(--mp-font-size-base);
--mp-button-font-weight: var(--mp-font-weight-medium);
--mp-button-border-radius: var(--mp-radius-md);
--mp-button-transition: all var(--duration-200) var(--ease-in-out);
```

#### Input

```css
--mp-input-padding-y: 0.5rem;
--mp-input-padding-x: 0.75rem;
--mp-input-font-size: var(--mp-font-size-base);
--mp-input-border-radius: var(--mp-radius-md);
--mp-input-border-width: 1px;
--mp-input-border-color: var(--mp-color-input-border);
--mp-input-focus-border-color: var(--mp-color-ring);
--mp-input-transition: border-color var(--duration-200) var(--ease-in-out);
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
  --mp-color-primary: #6366f1;
  --mp-color-primary-light: #818cf8;
  --mp-color-primary-strong: #4f46e5;

  /* Override spacing */
  --mp-spacing-4: 1.25rem; /* Increase base spacing */

  /* Override typography */
  --font-family-base: "Inter", sans-serif;
  --mp-font-size-base: 15px;
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
  --mp-color-primary: #ff6b35;
  --mp-color-primary-light: #ff8c42;
  --mp-color-primary-strong: #e55100;
  --mp-color-onPrimary: #ffffff;

  /* Company secondary color */
  --mp-color-secondary: #004e89;
  --mp-color-secondary-light: #006ba6;
  --mp-color-secondary-dark: #003d66;

  /* Override font for brand consistency */
  --font-family-base: "Poppins", sans-serif;
  --mp-font-weight-medium: 600; /* Poppins medium = 600 */
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
    --mp-color-background: #1f2937;
    /* ... rest of dark theme */
  }
}
```

## Best Practices

### 1. Use Variables Consistently

```css
/* ✅ Good */
.button {
  color: var(--mp-color-onPrimary);
  background-color: var(--mp-color-primary);
  border-radius: var(--mp-radius-md);
  padding: var(--mp-spacing-2) var(--mp-spacing-4);
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
  color: var(--mp-color-destructive);
}

.success-message {
  color: var(--mp-color-success);
}

/* ❌ Don't map random colors */
.error-message {
  color: var(--mp-color-primary);
}
```

### 3. Spacing Consistency

```css
/* ✅ Use spacing scale */
.card {
  padding: var(--mp-spacing-6);
  margin-bottom: var(--mp-spacing-4);
  gap: var(--mp-spacing-3);
}
```

### 4. Component Tokens for Reusability

```css
/* ✅ Use component tokens */
.button {
  padding: var(--mp-button-padding-y-md) var(--mp-button-padding-x-md);
  font-weight: var(--mp-button-font-weight);
  border-radius: var(--mp-button-border-radius);
  transition: var(--mp-button-transition);
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
        backgroundColor: "var(--mp-color-primary)",
        color: "var(--mp-color-onPrimary)",
        padding: "var(--mp-button-padding-y-md) var(--mp-button-padding-x-md)",
        borderRadius: "var(--mp-button-border-radius)",
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
  padding: var(--mp-spacing-4);
}

@media (min-width: 768px) {
  .container {
    padding: var(--mp-spacing-8);
  }
}
```

## Resources

- **CSS Custom Properties MDN**: https://developer.mozilla.org/en-US/docs/Web/CSS/--*
- **Design Tokens**: https://www.designtokens.org/
- **Radix UI Colors**: https://www.radix-ui.com/docs/colors/getting-started

## Support

For questions or custom theming needs, refer to the main PLAN.md or contact the development team.
