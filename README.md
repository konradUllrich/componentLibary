# mpComponents

A reusable React component library built with **Radix UI primitives**, **TanStack Form & Tables**, and **plain CSS** for styling.

## 📚 Documentation & Examples

**[View Live Documentation & Component Examples →](https://konradullrich.github.io/componentLibary/)**

Explore interactive examples of all components, view usage documentation, and see the component library in action on our GitHub Pages site.

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

## Component Guidelines

For detailed guidelines on creating and maintaining components, see [mpComponents.instructions.md](./mpComponents.instructions.md).

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

Contributions are welcome! Please ensure:

1. Components follow the structure defined in `mpComponents.instructions.md`
2. All components are properly exported via barrel exports
3. Styles are written in plain CSS
4. Components are fully typed with TypeScript
5. Components pass linting and type checks
6. New components include Playwright component tests with accessibility checks

## Support

For issues or questions, please open an issue on GitHub.
