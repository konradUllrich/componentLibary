import { Text } from "../../common";
import { Panel } from "../../layout";

export const DocsPage = () => {
  return (
    <div className="docs-page">
      <Text as="h1" size="3xl" weight="bold">
        Documentation
      </Text>

      <Panel variant="elevated" padding="lg">
        <Text as="h2" size="2xl" weight="semibold">
          Installation
        </Text>
        <Panel
          variant="subtle"
          padding="md"
          style={{ marginTop: "var(--spacing-4)" }}
        >
          <code
            style={{ fontSize: "0.875rem", lineHeight: "1.5" }}
          >{`npm install @konradullrich/mp-components
    # or
    pnpm add @konradullrich/mp-components`}</code>
        </Panel>
      </Panel>

      <Panel variant="elevated" padding="lg">
        <Text as="h2" size="2xl" weight="semibold">
          Usage
        </Text>
        <Panel
          variant="subtle"
          padding="md"
          style={{ marginTop: "var(--spacing-4)" }}
        >
          <code
            style={{
              fontSize: "0.875rem",
              lineHeight: "1.5",
              whiteSpace: "pre",
            }}
          >{`import { Button, Input, Dialog } from '@konradullrich/mp-components';
    import '@konradullrich/mp-components/styles';
    
    export function App() {
      return (
        <div>
          <Button>Click me</Button>
          <Input placeholder="Enter text..." />
        </div>
      );
    }`}</code>
        </Panel>
      </Panel>

      <Panel variant="elevated" padding="lg">
        <Text as="h2" size="2xl" weight="semibold">
          Component Categories
        </Text>

        <Panel
          variant="subtle"
          padding="lg"
          style={{ marginTop: "var(--spacing-4)" }}
        >
          <Text as="h3" size="xl" weight="semibold">
            common/
          </Text>
          <Text color="secondary">
            General-purpose components used across the app
          </Text>
          <Text>Button, Badge, Icon, Text, Accordion, Disclosure</Text>
        </Panel>

        <Panel
          variant="subtle"
          padding="lg"
          style={{ marginTop: "var(--spacing-3)" }}
        >
          <Text as="h3" size="xl" weight="semibold">
            controls/
          </Text>
          <Text color="secondary">Form elements and interactive controls</Text>
          <Text>Input, Select, Checkbox, Radio, FormControl</Text>
        </Panel>

        <Panel
          variant="subtle"
          padding="lg"
          style={{ marginTop: "var(--spacing-3)" }}
        >
          <Text as="h3" size="xl" weight="semibold">
            data-display/
          </Text>
          <Text color="secondary">Components that present data</Text>
          <Text>Table, Pagination, CardList, Datalist</Text>
        </Panel>

        <Panel
          variant="subtle"
          padding="lg"
          style={{ marginTop: "var(--spacing-3)" }}
        >
          <Text as="h3" size="xl" weight="semibold">
            layout/
          </Text>
          <Text color="secondary">Page layout components</Text>
          <Text>Panel, Card, Flex, Sidebar, AppLayout, HorizontalNav</Text>
        </Panel>
      </Panel>

      <Panel variant="elevated" padding="lg">
        <Text as="h2" size="2xl" weight="semibold">
          Features
        </Text>
        <ul className="feature-list">
          <li>✅ Type-Safe Components — Built with TypeScript</li>
          <li>
            ✅ Radix UI Primitives — Accessible, unstyled component foundations
          </li>
          <li>✅ TanStack Integration — Advanced form and table handling</li>
          <li>
            ✅ CSS-Based Styling — Plain CSS for predictable styling, no
            CSS-in-JS
          </li>
          <li>✅ Barrel Exports — Clean, intuitive import paths</li>
          <li>✅ Fully Reusable — Components for multiple applications</li>
        </ul>
      </Panel>
    </div>
  );
};
