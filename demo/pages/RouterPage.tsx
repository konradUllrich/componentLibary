import React, { useState } from "react";
import { Text } from "../../common";
import { Page, Section } from "../../layout";
import { Router, Route, Link } from "../../Router";

export const RouterPage: React.FC = () => {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          Router
        </Text>
        <Text color="secondary">
          Param-based application router built on top of{" "}
          <a
            href="https://github.com/molefrog/wouter"
            target="_blank"
            rel="noopener noreferrer"
          >
            wouter
          </a>
          . Stores the current route in the <code>appRoute</code> URL search
          parameter instead of the URL path — ideal for embedded environments
          and static hosts.
        </Text>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Basic Usage
        </Text>
        <Text color="secondary" size="sm">
          Wrap your application with <code>Router</code> and use{" "}
          <code>Route</code> and <code>Link</code> to define navigation.
        </Text>
        <div className="component-page__demo" style={{ flexDirection: "column", alignItems: "flex-start" }}>
          <button
            type="button"
            onClick={() => setShowDemo((v) => !v)}
            className="button button--secondary button--md"
          >
            {showDemo ? "Hide" : "Show"} live demo
          </button>
          {showDemo && (
            <div
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                padding: "var(--spacing-4)",
                width: "100%",
              }}
            >
              <Router>
                <nav style={{ display: "flex", gap: "var(--spacing-3)", marginBottom: "var(--spacing-4)" }}>
                  <Link href="/">Home</Link>
                  <Link href="/about">About</Link>
                  <Link href="/contact">Contact</Link>
                </nav>
                <Route path="/">
                  <Text weight="semibold">Home page</Text>
                  <Text color="secondary" size="sm">
                    You are on the home route (<code>/</code>).
                  </Text>
                </Route>
                <Route path="/about">
                  <Text weight="semibold">About page</Text>
                  <Text color="secondary" size="sm">
                    You are on the about route (<code>/about</code>).
                  </Text>
                </Route>
                <Route path="/contact">
                  <Text weight="semibold">Contact page</Text>
                  <Text color="secondary" size="sm">
                    You are on the contact route (<code>/contact</code>).
                  </Text>
                </Route>
              </Router>
            </div>
          )}
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          How It Works
        </Text>
        <Text color="secondary" size="sm">
          Instead of changing the URL path, the router stores the current route
          in a <code>?appRoute=</code> search parameter. This lets the
          application run on any static host without requiring server-side route
          configuration.
        </Text>
        <div className="component-page__demo" style={{ flexDirection: "column", alignItems: "flex-start" }}>
          <Text size="sm">
            Navigating to <code>/about</code> produces a URL like:
          </Text>
          <code style={{ background: "var(--color-muted)", padding: "var(--spacing-2) var(--spacing-3)", borderRadius: "var(--radius-sm)" }}>
            https://example.com/?appRoute=%2Fabout
          </code>
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Available Hooks
        </Text>
        <Text color="secondary" size="sm">
          The following hooks are exported alongside the router components.
        </Text>
        <div className="component-page__demo" style={{ flexDirection: "column", alignItems: "flex-start" }}>
          <ul style={{ margin: 0, paddingLeft: "var(--spacing-5)" }}>
            <li><code>useLocation</code> – current pathname and navigate function</li>
            <li><code>useSearch</code> – current search string</li>
            <li><code>useParams</code> – URL parameters from the matched route</li>
            <li><code>useRoute</code> – checks whether a given path matches</li>
            <li><code>useSearchParams</code> – access and update search params</li>
          </ul>
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Usage
        </Text>
        <pre className="code-block">
          <code>{`import { Router, Route, Link, useLocation } from '@konradullrich/mp-components';

function App() {
  return (
    <Router>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
      </nav>

      <Route path="/">Home page</Route>
      <Route path="/about">About page</Route>
    </Router>
  );
}

// Access current location from any child component
function MyComponent() {
  const [location, navigate] = useLocation();
  return <button onClick={() => navigate('/about')}>{location}</button>;
}`}</code>
        </pre>
      </Section>
    </Page>
  );
};
