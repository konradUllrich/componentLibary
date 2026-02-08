# mpComponents

A reusable React component library built with **Radix UI primitives**, **TanStack Form & Tables**, and **plain CSS** for styling.

## 📚 Documentation

- **[📖 View Live Documentation & Examples →](https://konradullrich.github.io/componentLibary/)**
- **[🤝 Contributing Guide](./CONTRIBUTING.md)** - Get started with development
- **[⚡ Quick Reference](./QUICK_REFERENCE.md)** - One-page cheat sheet for component development
- **[📋 Full Guidelines](./mpComponents.instructions.md)** - Complete development standards
- **[🧪 Testing Guide](./TESTING.md)** - Component testing documentation

## Features

- ✅ **Type-Safe Components** — Built with TypeScript
- ✅ **Radix UI Primitives** — Accessible, unstyled component foundations
- ✅ **TanStack Integration** — Advanced form and table handling
- ✅ **CSS-Based Styling** — Plain CSS for predictable styling, no CSS-in-JS
- ✅ **Barrel Exports** — Clean, intuitive import paths
- ✅ **Fully Reusable** — Components for multiple applications

## Installation

```bash
npm install @konradullrich/mp-components
# or
pnpm add @konradullrich/mp-components
```

## Usage

```tsx
import { Button, Input, Dialog } from '@konradullrich/mp-components';
import '@konradullrich/mp-components/styles';

export function App() {
  return (
    <div>
      <Button>Click me</Button>
      <Input placeholder="Enter text..." />
    </div>
  );
}
```

## 🎨 Component Development

### Core Principles

This library follows strict guidelines to ensure quality, accessibility, and maintainability:

- **TypeScript Strict Mode** - Zero type errors, no `any` or `unknown`
- **Plain CSS + BEM** - No CSS modules or CSS-in-JS
- **Accessibility First** - WCAG 2.1 AA compliance required
- **Small Files** - Target ≤100 lines per component/CSS file
- **Radix UI** - Use primitives for complex interactive components
- **Testing Required** - Playwright component tests with a11y checks

### Quick Links

- [CONTRIBUTING.md](./CONTRIBUTING.md) - Start here for development
- [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) - Cheat sheet for guidelines
- [mpComponents.instructions.md](./mpComponents.instructions.md) - Complete standards

## Component Categories

Components are organized into logical categories:

### `common/`
General-purpose components used across the app
- Button
- Badge
- Icon
- Tooltip
- Dialog
- Dropdown

### `controls/`
Form elements and interactive controls
- Input
- Select
- Checkbox
- Radio
- Toggle

### `data-display/`
Components that present data
- Table
- List
- Card
- Tree

### `layout/`
Page layout components
- Sidebar
- Header
- Footer
- Navigation

### `styles/`
Global CSS variables, themes, and utility styles

## Development

### Demo Site

Run the demo site locally:

```bash
npm run demo
```

Build the demo site:

```bash
npm run demo:build
```

The demo site showcases all components with interactive examples and documentation.

#### Router Configuration

The demo site uses TanStack Router with configurable routing modes:

- **URL Mode** (default): Traditional routing with clean URLs (e.g., `/components/button`)
- **Param Mode**: Routes stored in URL parameters (e.g., `/?route=/components/button`)

To use param mode:

```bash
VITE_ROUTER_MODE=param npm run demo
```

For more details, see [demo/ROUTER_CONFIG.md](./demo/ROUTER_CONFIG.md).

### Setup

```bash
pnpm install
```

### Build

```bash
pnpm build
```

### Watch Mode

```bash
pnpm build:watch
```

### Linting

```bash
pnpm lint
```

### Type Checking

```bash
pnpm type-check
```

### Testing

Run component tests with Playwright:

```bash
pnpm test:ct          # Run component tests
pnpm test:ct:headed   # Run with browser UI
pnpm test:ct:ui       # Run with Playwright UI
pnpm test:ct:debug    # Run in debug mode
```

Component tests use Playwright component testing with axe-core for accessibility validation. Tests are located alongside components (e.g., `Button.test.tsx`).

Run unit tests with Vitest:

```bash
pnpm test
pnpm test:ui  # With UI
```

## Structure

```
mpComponents/
├── common/          # Shared, reusable components
├── controls/        # Form controls and input components
├── data-display/    # Data presentation components
├── layout/          # Layout components
├── styles/          # Global styles and theming
├── index.ts         # Main export file
├── README.md        # This file
└── package.json     # Package configuration
```

## License

MIT

## Contributing

**Please read our [Contributing Guide](./CONTRIBUTING.md) before submitting contributions.**

Key requirements:

1. Components follow the structure defined in [mpComponents.instructions.md](./mpComponents.instructions.md)
2. All code passes TypeScript checks (`pnpm type-check`)
3. Styles use plain CSS with BEM naming convention
4. Components meet WCAG 2.1 AA accessibility standards
5. All components have Playwright component tests with accessibility checks
6. Component files are ≤ ~100 lines (split if larger)

For detailed guidelines, templates, and checklists, see:
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Quick start and templates
- [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) - One-page reference
- [mpComponents.instructions.md](./mpComponents.instructions.md) - Complete guidelines

## Support

For issues or questions, please open an issue on GitHub.
