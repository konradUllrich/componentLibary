import React from "react";
import { Badge, Button, Text } from "../../common";
import { Page, Panel, Section } from "../../layout";
import { useFilter } from "../../hooks/useFilter/useFilter";
import "./UsePersistedStatePage.css";

// ===== 1. Basic usage =====
type ProductFilters = { status: string; category: string };

const BasicExample = () => {
  const { filters, setFilter, clearFilters } = useFilter<ProductFilters>({
    storageKey: "docs-filter-basic",
    defaultFilters: { status: "all", category: "all" },
  });

  return (
    <Panel
      variant="subtle"
      padding="lg"
      className="use-persisted-state-page__example"
    >
      <Text as="h3" size="xl" weight="semibold">
        1. Basic usage
      </Text>
      <Text color="secondary" size="sm">
        Set individual filters with <code>setFilter</code>. Active values
        persist to localStorage and sync to the URL. Reload — filters are
        restored.
      </Text>
      <div className="use-persisted-state-page__actions">
        <Text size="sm" weight="semibold">
          Status:
        </Text>
        {(["all", "active", "inactive", "archived"] as const).map((s) => (
          <Button
            key={s}
            size="sm"
            variant={filters.status === s ? "primary" : "secondary"}
            onClick={() => setFilter("status", s)}
          >
            {s}
          </Button>
        ))}
      </div>
      <div className="use-persisted-state-page__actions">
        <Text size="sm" weight="semibold">
          Category:
        </Text>
        {(["all", "books", "electronics", "clothing"] as const).map((c) => (
          <Button
            key={c}
            size="sm"
            variant={filters.category === c ? "primary" : "secondary"}
            onClick={() => setFilter("category", c)}
          >
            {c}
          </Button>
        ))}
      </div>
      <div className="use-persisted-state-page__actions">
        <Button size="sm" variant="secondary" onClick={clearFilters}>
          Clear
        </Button>
        <Badge variant="info">status: {filters.status ?? "—"}</Badge>
        <Badge variant="info">category: {filters.category ?? "—"}</Badge>
      </div>
      <pre className="use-persisted-state-page__code-block">
        <code>{`type ProductFilters = { status: string; category: string };

const { filters, setFilter, clearFilters } = useFilter<ProductFilters>({
  storageKey: "products",
  defaultFilters: { status: "all", category: "all" },
});

setFilter("status", "active");`}</code>
      </pre>
    </Panel>
  );
};

// ===== 2. setFilters — bulk update =====
type SearchFilters = {
  query: string;
  minPrice: number;
  maxPrice: number;
  inStock: boolean;
};

const BulkUpdateExample = () => {
  const { filters, setFilters, clearFilters } = useFilter<SearchFilters>({
    storageKey: "docs-filter-bulk",
    defaultFilters: { query: "", minPrice: 0, maxPrice: 1000, inStock: false },
  });

  return (
    <Panel
      variant="subtle"
      padding="lg"
      className="use-persisted-state-page__example"
    >
      <Text as="h3" size="xl" weight="semibold">
        2. Bulk update with <code>setFilters</code>
      </Text>
      <Text color="secondary" size="sm">
        Apply multiple filter values in one call — useful for preset buttons.
      </Text>
      <div className="use-persisted-state-page__actions">
        <Button
          size="sm"
          variant="secondary"
          onClick={() =>
            setFilters({ minPrice: 0, maxPrice: 50, inStock: true })
          }
        >
          Budget &amp; in stock
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() =>
            setFilters({ minPrice: 100, maxPrice: 500, inStock: false })
          }
        >
          Mid-range
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() =>
            setFilters({ minPrice: 500, maxPrice: 1000, inStock: false })
          }
        >
          Premium
        </Button>
        <Button size="sm" variant="secondary" onClick={clearFilters}>
          Reset
        </Button>
      </div>
      <div className="use-persisted-state-page__actions">
        <Badge variant="info">
          ${filters.minPrice} – ${filters.maxPrice}
        </Badge>
        <Badge variant={filters.inStock ? "success" : "default"}>
          {filters.inStock ? "in stock only" : "any stock"}
        </Badge>
      </div>
      <pre className="use-persisted-state-page__code-block">
        <code>{`setFilters({ minPrice: 0, maxPrice: 50, inStock: true });`}</code>
      </pre>
    </Panel>
  );
};

// ===== 3. removeFilter — erase single key =====
type TagFilters = { tag: string; author: string; language: string };

const RemoveExample = () => {
  const { filters, setFilter, removeFilter } = useFilter<TagFilters>({
    storageKey: "docs-filter-remove",
    defaultFilters: {},
  });

  const activeFilters = Object.entries(filters).filter(
    ([, v]) => v !== undefined,
  );

  return (
    <Panel
      variant="subtle"
      padding="lg"
      className="use-persisted-state-page__example"
    >
      <Text as="h3" size="xl" weight="semibold">
        3. Remove individual filters with <code>removeFilter</code>
      </Text>
      <Text color="secondary" size="sm">
        Remove a single key without touching the others — like dismissing a
        filter chip.
      </Text>
      <div className="use-persisted-state-page__actions">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setFilter("tag", "react")}
        >
          + tag: react
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setFilter("author", "alice")}
        >
          + author: alice
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setFilter("language", "en")}
        >
          + language: en
        </Button>
      </div>
      {activeFilters.length > 0 && (
        <div className="use-persisted-state-page__actions">
          {activeFilters.map(([key, value]) => (
            <Badge
              key={key}
              variant="info"
              style={{ cursor: "pointer" }}
              onClick={() => removeFilter(key as keyof TagFilters)}
              title={`Click to remove ${key}`}
            >
              {key}: {String(value)} ✕
            </Badge>
          ))}
        </div>
      )}
      <pre className="use-persisted-state-page__code-block">
        <code>{`removeFilter("tag"); // removes only "tag", others unchanged`}</code>
      </pre>
    </Panel>
  );
};

// ===== 4. Storage and URL options =====
type UrlFilters = { sort: string; order: string };

const StorageOptionsExample = () => {
  const withUrl = useFilter<UrlFilters>({
    storageKey: "docs-filter-url",
    defaultFilters: { sort: "name", order: "asc" },
    syncUrl: true,
  });

  const noUrl = useFilter<UrlFilters>({
    storageKey: "docs-filter-no-url",
    defaultFilters: { sort: "name", order: "asc" },
    syncUrl: false,
    storage: false,
  });

  return (
    <Panel
      variant="subtle"
      padding="lg"
      className="use-persisted-state-page__example"
    >
      <Text as="h3" size="xl" weight="semibold">
        4. Storage &amp; URL options
      </Text>
      <Text color="secondary" size="sm">
        Control where state is saved. With <code>syncUrl: true</code> each
        filter key appears as its own URL param (
        <code>?sort=date&amp;order=desc</code>). Pass{" "}
        <code>storage: false</code> to keep state in memory only.
      </Text>
      <div className="use-persisted-state-page__actions">
        <Text size="sm" weight="semibold">
          With URL sync:
        </Text>
        {(["name", "date", "size"] as const).map((s) => (
          <Button
            key={s}
            size="sm"
            variant={withUrl.filters.sort === s ? "primary" : "secondary"}
            onClick={() => withUrl.setFilter("sort", s)}
          >
            sort: {s}
          </Button>
        ))}
        {(["asc", "desc"] as const).map((o) => (
          <Button
            key={o}
            size="sm"
            variant={withUrl.filters.order === o ? "primary" : "secondary"}
            onClick={() => withUrl.setFilter("order", o)}
          >
            {o}
          </Button>
        ))}
      </div>
      <div className="use-persisted-state-page__actions">
        <Text size="sm" weight="semibold">
          Memory only:
        </Text>
        {(["name", "date", "size"] as const).map((s) => (
          <Button
            key={s}
            size="sm"
            variant={noUrl.filters.sort === s ? "primary" : "secondary"}
            onClick={() => noUrl.setFilter("sort", s)}
          >
            sort: {s}
          </Button>
        ))}
      </div>
      <pre className="use-persisted-state-page__code-block">
        <code>{`// URL sync: ?sort=date&order=desc
useFilter({ storageKey: "filters", syncUrl: true });

// Memory only — no URL, no storage
useFilter({ storageKey: "filters", syncUrl: false, storage: false });`}</code>
      </pre>
    </Panel>
  );
};

// ===== Page =====
export const UseFilterPage: React.FC = () => (
  <Page>
    <Section>
      <Text as="h1" size="3xl" weight="bold">
        useFilter
      </Text>
      <Text color="secondary">
        A hook for persisted filter state. Values are saved to localStorage
        (configurable) and synced to URL search params as flat key=value pairs.
        Pair it with any list or table component.
      </Text>
    </Section>

    <Section>
      <BasicExample />
      <BulkUpdateExample />
      <RemoveExample />
      <StorageOptionsExample />
    </Section>
  </Page>
);
