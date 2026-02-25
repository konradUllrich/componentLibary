# mpComponents

<div align="center">

[![Tests](https://img.shields.io/github/actions/workflow/status/konradUllrich/componentLibary/test.yml?branch=main&style=flat-square&label=Tests)](https://github.com/konradUllrich/componentLibary/actions/workflows/test.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg?style=flat-square)](https://react.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](./LICENSE)

**A modern, accessible React 19 component library with Radix UI, TanStack integration, and plain CSS.**

[📖 Documentation](https://konradullrich.github.io/componentLibary/) • [🚀 Quick Start](#quick-start) • [🤝 Contributing](./CONTRIBUTING.md)

</div>

---

## ✨ Features

- **TypeScript Strict** — Zero type errors, fully typed
- **Accessible** — WCAG 2.1 AA with keyboard navigation & screen reader support
- **Radix UI** — Built on Radix UI primitives for complex interactions
- **Plain CSS + BEM** — No modules or CSS-in-JS, consistent styling
- **Well Tested** — Playwright component & E2E tests with a11y checks
- **Tree-Shakeable** — Optimized barrel exports

---

## Quick Start

```bash
# Install
pnpm add @mp-ku/mp-components

# Import
import { Button } from "@mp-ku/mp-components";
import "@mp-ku/mp-components/styles";

# Use
export function App() {
  return <Button variant="primary">Click me</Button>;
}
```

> **Requires React 19+**

For more examples, visit the [**Live Documentation**](https://konradullrich.github.io/componentLibary/).

---

## 📂 Component Categories

```
common/      # Button, Badge, Icon, Text, Dialog, Dropdown, Accordion, Tabs, etc.
controls/    # Input, Select, Checkbox, Radio, CheckboxGroup, Combobox, FormControl, etc.
data-display/# Table, Pagination, CardList, Datalist
layout/      # Sidebar, Card, Panel, Grid, Flex, Page, Section, HorizontalNav, AppLayout
styles/      # Global CSS variables & theming
```

---

## 🛠️ Development

### Commands

```bash
pnpm type-check      # TypeScript checks (must pass)
pnpm lint            # ESLint checks (must pass)

pnpm test:ct         # Component tests
pnpm test:ct:ui      # Component tests with UI
pnpm test:e2e        # E2E tests

pnpm demo            # Run demo site locally
pnpm demo:build      # Build demo site
pnpm build           # Build library
pnpm build:watch     # Build in watch mode
```

### Setup

```bash
git clone https://github.com/konradUllrich/componentLibary.git
cd componentLibary
pnpm install
pnpm demo            # Start demo site
```

---

## 🧪 Testing

All components are tested with:

- **Playwright Component Tests** — Real browser rendering with visual & interaction validation
- **Accessibility Tests** — Automated a11y checks (WCAG 2.1 AA)
- **Keyboard Navigation** — Full keyboard support verified

See [TESTING.md](./TESTING.md) for detailed testing guidelines.

---

## 📋 Standards & Guidelines

| Requirement       | Rule                                          |
| ----------------- | --------------------------------------------- |
| **TypeScript**    | Strict mode, no `any`, fix errors immediately |
| **CSS**           | Plain CSS only, BEM naming convention         |
| **Accessibility** | WCAG 2.1 AA minimum, full keyboard nav        |
| **File Size**     | Components ≤ 100 lines (split if larger)      |
| **Radix UI**      | Use for dialogs, dropdowns, tooltips, etc.    |
| **Testing**       | Playwright tests with a11y checks required    |

**Quick Links:**

- 📖 [Full Guidelines](./mpComponents.instructions.md)
- ⚡ [Quick Reference](./QUICK_REFERENCE.md)
- 🤝 [Contributing Guide](./CONTRIBUTING.md)

---

## 🤝 Contributing

We welcome contributions! Please:

1. Read [CONTRIBUTING.md](./CONTRIBUTING.md) & [Component Guidelines](./mpComponents.instructions.md)
2. Ensure `pnpm type-check` and `pnpm lint` pass
3. Write Playwright tests with accessibility checks
4. Follow BEM naming for CSS
5. Keep components ≤ 100 lines

Before submitting PRs, verify all tests pass:

```bash
pnpm test:ci   # Type check + lint + component tests + E2E tests
```

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

---

## 💬 Links

- **📖 Documentation:** [https://konradullrich.github.io/componentLibary/](https://konradullrich.github.io/componentLibary/)
- **📦 NPM Package:** [@mp-ku/mp-components](https://www.npmjs.com/package/@mp-ku/mp-components)
- **🐛 Issues:** [GitHub Issues](https://github.com/konradUllrich/componentLibary/issues)

<div align="center">

**Built with ❤️ using [React 19](https://react.dev/) • [Radix UI](https://www.radix-ui.com/) • [TypeScript](https://www.typescriptlang.org/)**

</div>
