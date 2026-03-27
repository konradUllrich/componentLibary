import React from "react";
import { Badge, Button, Text } from "../../common";
import { Input } from "../../controls";
import { Page, Panel, Section } from "../../layout";
import { useSearch } from "../../Router/hooks";
import { usePersistedState } from "../../hooks/usePersistedState/usePersistedState";
import "./UsePersistedStatePage.css";

const readStorage = (key: string) => {
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    return "(not available)";
  }

  const stored = localStorage.getItem(key);
  return stored ?? "(empty)";
};

const QueryExample = () => {
  const [query, setQuery] = usePersistedState({
    key: "docs-query",
    defaultValue: "",
  });

  return (
    <Panel
      variant="subtle"
      padding="lg"
      className="use-persisted-state-page__example"
    >
      <Text as="h3" size="xl" weight="semibold">
        1. Query Text (string)
      </Text>
      <Text color="secondary" size="sm">
        Type in the input and reload the page. Value is restored from URL or
        localStorage.
      </Text>
      <Input
        label="Search Query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Try: persisted state"
      />
      <div className="use-persisted-state-page__actions">
        <Button size="sm" variant="secondary" onClick={() => setQuery("")}>
          Reset
        </Button>
        <Badge variant="info">localStorage: {readStorage("docs-query")}</Badge>
      </div>
    </Panel>
  );
};

const CounterExample = () => {
  const [count, setCount] = usePersistedState({
    key: "docs-count",
    defaultValue: 0,
  });

  return (
    <Panel
      variant="subtle"
      padding="lg"
      className="use-persisted-state-page__example"
    >
      <Text as="h3" size="xl" weight="semibold">
        2. Counter (updater function)
      </Text>
      <Text color="secondary" size="sm">
        Demonstrates setState(prev =&gt; next) and numeric persistence.
      </Text>
      <Text as="p" size="2xl" weight="bold">
        {count}
      </Text>
      <div className="use-persisted-state-page__actions">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setCount((prev) => prev - 1)}
        >
          -1
        </Button>
        <Button size="sm" onClick={() => setCount((prev) => prev + 1)}>
          +1
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setCount(0)}>
          Reset
        </Button>
      </div>
      <Badge variant="info">localStorage: {readStorage("docs-count")}</Badge>
    </Panel>
  );
};

const ObjectExample = () => {
  const [filters, setFilters] = usePersistedState({
    key: "docs-filters",
    defaultValue: {
      category: "all",
      onlyActive: false,
    },
  });

  return (
    <Panel
      variant="subtle"
      padding="lg"
      className="use-persisted-state-page__example"
    >
      <Text as="h3" size="xl" weight="semibold">
        3. Object State (JSON)
      </Text>
      <Text color="secondary" size="sm">
        Persist nested state objects with the default JSON serializer.
      </Text>
      <div className="use-persisted-state-page__actions">
        <Button
          size="sm"
          variant={filters.category === "all" ? "primary" : "secondary"}
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              category: "all",
            }))
          }
        >
          All
        </Button>
        <Button
          size="sm"
          variant={filters.category === "frontend" ? "primary" : "secondary"}
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              category: "frontend",
            }))
          }
        >
          Frontend
        </Button>
        <Button
          size="sm"
          variant={filters.category === "backend" ? "primary" : "secondary"}
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              category: "backend",
            }))
          }
        >
          Backend
        </Button>
      </div>
      <Button
        size="sm"
        variant={filters.onlyActive ? "primary" : "ghost"}
        onClick={() =>
          setFilters((prev) => ({
            ...prev,
            onlyActive: !prev.onlyActive,
          }))
        }
      >
        {filters.onlyActive ? "Only Active: ON" : "Only Active: OFF"}
      </Button>
      <Text as="p" size="sm">
        Current value: {JSON.stringify(filters)}
      </Text>
    </Panel>
  );
};

const CustomSerializerExample = () => {
  const [page, setPage] = usePersistedState({
    key: "docs-custom-page",
    defaultValue: 1,
    serialize: (value: number) => `p:${value}`,
    deserialize: (value: string) => {
      if (!value.startsWith("p:")) {
        return 1;
      }

      const num = Number(value.slice(2));
      return Number.isNaN(num) ? 1 : num;
    },
  });

  return (
    <Panel
      variant="subtle"
      padding="lg"
      className="use-persisted-state-page__example"
    >
      <Text as="h3" size="xl" weight="semibold">
        4. Custom Serializer
      </Text>
      <Text color="secondary" size="sm">
        Uses serialize/deserialize to store compact values like p:4.
      </Text>
      <div className="use-persisted-state-page__actions">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setPage(Math.max(1, page - 1))}
        >
          Previous
        </Button>
        <Badge variant="default">Page {page}</Badge>
        <Button size="sm" onClick={() => setPage(page + 1)}>
          Next
        </Button>
      </div>
      <Badge variant="info">
        localStorage: {readStorage("docs-custom-page")}
      </Badge>
    </Panel>
  );
};

type UserPrefs = {
  username: string;
  age: number;
  darkMode: boolean;
  score: number;
  tags: string[];
  lastSeen: string | null;
};

const MixedObjectExample = () => {
  const [prefs, setPrefs] = usePersistedState<UserPrefs>({
    key: "docs-mixed-obj",
    defaultValue: {
      username: "",
      age: 0,
      darkMode: false,
      score: 0,
      tags: [],
      lastSeen: null,
    },
  });

  const toggleTag = (tag: string) =>
    setPrefs((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));

  const AVAILABLE_TAGS = ["admin", "editor", "viewer"];

  return (
    <Panel
      variant="subtle"
      padding="lg"
      className="use-persisted-state-page__example"
    >
      <Text as="h3" size="xl" weight="semibold">
        6. Mixed-type object
      </Text>
      <Text color="secondary" size="sm">
        A single persisted object containing string, number, boolean, string[]
        and null. All serialised as one JSON entry. Reload to confirm.
      </Text>

      <Input
        label="Username (string)"
        value={prefs.username}
        onChange={(e) =>
          setPrefs((prev) => ({ ...prev, username: e.target.value }))
        }
        placeholder="e.g. alice"
      />

      <Input
        label="Age (number)"
        type="number"
        value={String(prefs.age)}
        onChange={(e) =>
          setPrefs((prev) => ({ ...prev, age: Number(e.target.value) }))
        }
      />

      <div className="use-persisted-state-page__actions">
        <Button
          size="sm"
          variant={prefs.darkMode ? "primary" : "secondary"}
          onClick={() =>
            setPrefs((prev) => ({ ...prev, darkMode: !prev.darkMode }))
          }
        >
          Dark mode: {prefs.darkMode ? "ON" : "OFF"}
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() =>
            setPrefs((prev) => ({ ...prev, score: prev.score + 10 }))
          }
        >
          +10 score ({prefs.score})
        </Button>
      </div>

      <div className="use-persisted-state-page__actions">
        <Text size="sm" weight="semibold">Roles (string[]):</Text>
        {AVAILABLE_TAGS.map((tag) => (
          <Button
            key={tag}
            size="sm"
            variant={prefs.tags.includes(tag) ? "primary" : "secondary"}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </Button>
        ))}
      </div>

      <div className="use-persisted-state-page__actions">
        <Button
          size="sm"
          variant="secondary"
          onClick={() =>
            setPrefs((prev) => ({
              ...prev,
              lastSeen: new Date().toLocaleTimeString(),
            }))
          }
        >
          Stamp lastSeen (string | null)
        </Button>
        {prefs.lastSeen && (
          <Badge variant="info">lastSeen: {prefs.lastSeen}</Badge>
        )}
      </div>

      <Button
        size="sm"
        variant="ghost"
        onClick={() =>
          setPrefs({
            username: "",
            age: 0,
            darkMode: false,
            score: 0,
            tags: [],
            lastSeen: null,
          })
        }
      >
        Reset all
      </Button>

      <pre className="use-persisted-state-page__code-block">
        <code>{`type UserPrefs = {
  username: string;
  age: number;
  darkMode: boolean;
  score: number;
  tags: string[];
  lastSeen: string | null;
};

const [prefs, setPrefs] = usePersistedState<UserPrefs>({
  key: "user-prefs",
  defaultValue: { username: "", age: 0, darkMode: false,
                  score: 0, tags: [], lastSeen: null },
});

// Partial update via updater function
setPrefs((prev) => ({ ...prev, darkMode: !prev.darkMode }));`}</code>
      </pre>
    </Panel>
  );
};

const ArrayExample = () => {
  const [selected, setSelected] = usePersistedState<string[]>({
    key: "docs-array",
    defaultValue: [],
  });

  const toggle = (tag: string) =>
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );

  const TAGS = ["React", "TypeScript", "CSS", "Testing", "Accessibility", "Performance"];

  return (
    <Panel
      variant="subtle"
      padding="lg"
      className="use-persisted-state-page__example"
    >
      <Text as="h3" size="xl" weight="semibold">
        6. Array State
      </Text>
      <Text color="secondary" size="sm">
        Persist an array of selected tags. Uses the default JSON serialiser —
        no custom serialize/deserialize needed. Reload to confirm.
      </Text>
      <div className="use-persisted-state-page__actions">
        {TAGS.map((tag) => (
          <Button
            key={tag}
            size="sm"
            variant={selected.includes(tag) ? "primary" : "secondary"}
            onClick={() => toggle(tag)}
          >
            {tag}
          </Button>
        ))}
      </div>
      <div className="use-persisted-state-page__actions">
        <Button size="sm" variant="ghost" onClick={() => setSelected([])}>
          Clear all
        </Button>
        <Badge variant="info">
          {selected.length > 0 ? selected.join(", ") : "none selected"}
        </Badge>
      </div>
      <Badge variant="default">
        localStorage: {readStorage("docs-array")}
      </Badge>
      <pre className="use-persisted-state-page__code-block">
        <code>{`const [selected, setSelected] = usePersistedState<string[]>({
  key: "tags",
  defaultValue: [],
});

// toggle an item
setSelected((prev) =>
  prev.includes(tag)
    ? prev.filter((t) => t !== tag)
    : [...prev, tag],
);`}</code>
      </pre>
    </Panel>
  );
};

const MultipleKeysExample = () => {
  const [theme, setTheme] = usePersistedState({
    key: "docs-theme",
    defaultValue: "light",
  });
  const [density, setDensity] = usePersistedState({
    key: "docs-density",
    defaultValue: "comfortable",
  });

  return (
    <Panel
      variant="subtle"
      padding="lg"
      className="use-persisted-state-page__example"
    >
      <Text as="h3" size="xl" weight="semibold">
        5. Multiple Independent Keys
      </Text>
      <Text color="secondary" size="sm">
        Different settings are persisted independently and can be shared in one
        URL.
      </Text>

      <div className="use-persisted-state-page__actions">
        <Button
          size="sm"
          variant={theme === "light" ? "primary" : "secondary"}
          onClick={() => setTheme("light")}
        >
          Light
        </Button>
        <Button
          size="sm"
          variant={theme === "dark" ? "primary" : "secondary"}
          onClick={() => setTheme("dark")}
        >
          Dark
        </Button>
      </div>

      <div className="use-persisted-state-page__actions">
        <Button
          size="sm"
          variant={density === "compact" ? "primary" : "secondary"}
          onClick={() => setDensity("compact")}
        >
          Compact
        </Button>
        <Button
          size="sm"
          variant={density === "comfortable" ? "primary" : "secondary"}
          onClick={() => setDensity("comfortable")}
        >
          Comfortable
        </Button>
      </div>

      <Text as="p" size="sm">
        theme={theme}, density={density}
      </Text>
    </Panel>
  );
};

export const UsePersistedStatePage = () => {
  const search = useSearch();

  return (
    <Page className="use-persisted-state-page">
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          usePersistedState
        </Text>
        <Text color="secondary">
          Live feature documentation with practical, interactive examples.
        </Text>
        <Badge variant="default">
          Current URL search: {search || "(empty)"}
        </Badge>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Quick Start
        </Text>
        <pre className="use-persisted-state-page__code-block">
          <code>{`import { usePersistedState } from "../../hooks/usePersistedState";

const [value, setValue] = usePersistedState({
  key: "my-key",
  defaultValue: "",
});`}</code>
        </pre>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Live Examples
        </Text>
        <Text color="secondary" size="sm">
          All examples below update URL search params and localStorage in
          real-time.
        </Text>
        <div className="use-persisted-state-page__grid">
          <QueryExample />
          <CounterExample />
          <ObjectExample />
          <CustomSerializerExample />
          <MultipleKeysExample />
          <MixedObjectExample />
          <ArrayExample />
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          API
        </Text>
        <pre className="use-persisted-state-page__code-block">
          <code>{`usePersistedState<T>({
  key: string,
  defaultValue: T,
  serialize?: (value: T) => string,
  deserialize?: (value: string) => T,
  removeIfDefault?: boolean,
})`}</code>
        </pre>
        <Text as="p" size="sm" color="secondary">
          Priority order on load: URL param -&gt; localStorage -&gt;
          defaultValue.
        </Text>
      </Section>
    </Page>
  );
};
