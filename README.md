# mpComponents

<div align="center">

[![npm version](https://img.shields.io/npm/v/@konradullrich/mp-components.svg?style=flat-square)](https://www.npmjs.com/package/@konradullrich/mp-components)
[![npm downloads](https://img.shields.io/npm/dm/@konradullrich/mp-components.svg?style=flat-square)](https://www.npmjs.com/package/@konradullrich/mp-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](./LICENSE)
[![CI](https://img.shields.io/github/actions/workflow/status/konradUllrich/componentLibary/ci.yml?branch=main&style=flat-square&label=CI)](https://github.com/konradUllrich/componentLibary/actions/workflows/ci.yml)
[![Tests](https://img.shields.io/github/actions/workflow/status/konradUllrich/componentLibary/test.yml?branch=main&style=flat-square&label=Tests)](https://github.com/konradUllrich/componentLibary/actions/workflows/test.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg?style=flat-square)](https://react.dev/)

**A modern, accessible React component library built with Radix UI primitives, TanStack Form & Tables, and plain CSS.**

[📖 Documentation](https://konradullrich.github.io/componentLibary/) • [🚀 Quick Start](#installation) • [🤝 Contributing](./CONTRIBUTING.md) • [📋 Guidelines](./mpComponents.instructions.md)

</div>

---

## 📚 Documentation

- **[📖 View Live Documentation & Examples →](https://konradullrich.github.io/componentLibary/)**
- **[🤝 Contributing Guide](./CONTRIBUTING.md)** - Get started with development
- **[⚡ Quick Reference](./QUICK_REFERENCE.md)** - One-page cheat sheet for component development
- **[📋 Full Guidelines](./mpComponents.instructions.md)** - Complete development standards
- **[🧪 Testing Guide](./TESTING.md)** - Component testing documentation

## ✨ Features

- 🔷 **Type-Safe Components** — Built with TypeScript in strict mode
- ♿ **Accessibility First** — WCAG 2.1 AA compliant with Radix UI primitives
- 📊 **TanStack Integration** — Advanced form and table handling with TanStack Form & Tables
- 🎨 **CSS-Based Styling** — Plain CSS with BEM naming convention, no CSS-in-JS
- 📦 **Tree-Shakeable** — Clean barrel exports for optimal bundle size
- 🧪 **Well Tested** — Comprehensive unit and component tests with Playwright & Vitest
- 🎯 **Developer Experience** — Hot reload, TypeScript autocomplete, and extensive documentation

## 🚀 Installation

```bash
# npm
npm install @konradullrich/mp-components

# pnpm
pnpm add @konradullrich/mp-components

# yarn
yarn add @konradullrich/mp-components
```

> **Note:** This library requires React 19+ as a peer dependency.

## 📖 Usage

Import components and styles in your React application:

```tsx
import { Button, Input, Dialog } from '@konradullrich/mp-components';
import '@konradullrich/mp-components/styles';

export function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Input placeholder="Enter text..." />
      <Dialog>
        <Dialog.Trigger asChild>
          <Button>Open Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Welcome</Dialog.Title>
          <Dialog.Description>
            This is a dialog component from mpComponents.
          </Dialog.Description>
        </Dialog.Content>
      </Dialog>
    </div>
  );
}
```

For more examples and interactive demos, visit the [**Live Documentation**](https://konradullrich.github.io/componentLibary/).

## 📦 Component Categories

Components are organized into logical categories for easy discovery and usage:

<table>
<tr>
<td width="25%">

### `common/`
General-purpose components

- **Button** - Primary action element
- **Badge** - Status indicators
- **Icon** - Icon wrapper
- **Tooltip** - Contextual help
- **Dialog** - Modal dialogs
- **Dropdown** - Menu dropdowns

</td>
<td width="25%">

### `controls/`
Form elements & inputs

- **Input** - Text input fields
- **Select** - Dropdown selectors
- **Checkbox** - Toggle checkboxes
- **Radio** - Radio buttons
- **Toggle** - On/off switches

</td>
<td width="25%">

### `data-display/`
Data presentation

- **Table** - Data tables
- **List** - Item lists
- **Card** - Content cards
- **Tree** - Hierarchical data

</td>
<td width="25%">

### `layout/`
Page structure

- **Sidebar** - Side navigation
- **Header** - Page headers
- **Footer** - Page footers
- **Navigation** - Nav menus

</td>
</tr>
</table>

### `styles/`
Global CSS variables, themes, and utility styles for consistent design.

## 🛠️ Development

### Prerequisites

- Node.js 18+ or 20+
- pnpm 8+ (recommended) or npm

### Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/konradUllrich/componentLibary.git
cd componentLibary
pnpm install
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm build` | Build the library for production |
| `pnpm build:watch` | Build in watch mode for development |
| `pnpm demo` | Run the interactive demo site locally |
| `pnpm demo:build` | Build the demo site for deployment |
| `pnpm lint` | Lint all TypeScript and TSX files |
| `pnpm type-check` | Run TypeScript compiler checks |
| `pnpm test` | Run unit tests with Vitest |
| `pnpm test:ui` | Run unit tests with Vitest UI |
| `pnpm test:ct` | Run component tests with Playwright |
| `pnpm test:ct:ui` | Run component tests with Playwright UI |
| `pnpm test:e2e` | Run end-to-end tests |

### Demo Site

The demo site showcases all components with interactive examples and comprehensive documentation.

**Run locally:**
```bash
pnpm demo
```

**Build for production:**
```bash
pnpm demo:build
```

#### Router Configuration

The demo site uses TanStack Router with configurable routing modes:

- **URL Mode** (default): Traditional routing with clean URLs (e.g., `/components/button`)
- **Param Mode**: Routes stored in URL parameters (e.g., `/?route=/components/button`)

To use param mode:

```bash
VITE_ROUTER_MODE=param pnpm demo
```

For more details, see [demo/ROUTER_CONFIG.md](./demo/ROUTER_CONFIG.md).

## 📂 Project Structure

```
mpComponents/
├── common/              # Shared, reusable components (Button, Badge, Icon, etc.)
├── controls/            # Form controls and input components (Input, Select, Checkbox, etc.)
├── data-display/        # Data presentation components (Table, List, Card, etc.)
├── layout/              # Layout components (Sidebar, Header, Footer, etc.)
├── styles/              # Global styles, CSS variables, and theming
├── demo/                # Interactive demo site with all component examples
├── e2e/                 # End-to-end tests
├── docs/                # Generated documentation
├── index.ts             # Main barrel export file
├── package.json         # Package configuration
└── README.md            # This file
```

## 🧪 Testing

This library maintains high code quality through comprehensive testing:

- **Component Tests** - Playwright component testing with visual and interaction validation
- **Unit Tests** - Vitest for logic and utility testing
- **Accessibility Tests** - Automated a11y checks using axe-core
- **E2E Tests** - Full application flow testing with Playwright

All tests run automatically in CI/CD pipeline on every commit.

**Learn more:** [TESTING.md](./TESTING.md)

---

## 🎨 Component Development Guidelines

This library follows strict guidelines to ensure quality, accessibility, and maintainability:

| Guideline | Requirement |
|-----------|-------------|
| **TypeScript** | Strict mode enabled - Zero type errors, no `any` or `unknown` |
| **Styling** | Plain CSS with BEM naming convention - No CSS modules or CSS-in-JS |
| **Accessibility** | WCAG 2.1 AA compliance required - Full keyboard navigation |
| **File Size** | Components ≤ 100 lines - Split into smaller files if needed |
| **Radix UI** | Use Radix primitives for complex interactive components |
| **Testing** | Playwright component tests with a11y checks required |
| **Documentation** | JSDoc comments and interactive examples required |

### 📚 Documentation Resources

- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Start here for development setup and workflow
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - One-page cheat sheet for quick reference
- **[mpComponents.instructions.md](./mpComponents.instructions.md)** - Complete development standards and guidelines

---

## 🤝 Contributing

We welcome contributions! Please read our [**Contributing Guide**](./CONTRIBUTING.md) before submitting any pull requests.

**Before contributing:**

1. ✅ Read the [Contributing Guide](./CONTRIBUTING.md) and [Component Guidelines](./mpComponents.instructions.md)
2. ✅ Ensure all code passes TypeScript checks (`pnpm type-check`)
3. ✅ Follow BEM naming convention for CSS classes
4. ✅ Meet WCAG 2.1 AA accessibility standards
5. ✅ Write component tests with accessibility checks
6. ✅ Keep component files ≤ 100 lines (split if larger)

### Quick Links

- [Component Development Guide](./CONTRIBUTING.md)
- [Quick Reference Cheat Sheet](./QUICK_REFERENCE.md)
- [Complete Guidelines](./mpComponents.instructions.md)
- [Testing Documentation](./TESTING.md)

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

Copyright (c) 2025 Intrexx

---

## 💬 Support & Community

- **📖 Documentation:** [https://konradullrich.github.io/componentLibary/](https://konradullrich.github.io/componentLibary/)
- **🐛 Issues:** [GitHub Issues](https://github.com/konradUllrich/componentLibary/issues)
- **💡 Discussions:** [GitHub Discussions](https://github.com/konradUllrich/componentLibary/discussions)
- **📦 npm Package:** [@konradullrich/mp-components](https://www.npmjs.com/package/@konradullrich/mp-components)

---

<div align="center">

**Built with ❤️ using [React](https://react.dev/) • [Radix UI](https://www.radix-ui.com/) • [TanStack](https://tanstack.com/)**

</div>
