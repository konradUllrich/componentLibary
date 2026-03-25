import React from "react";
import { Text } from "../../common";
import { Page, Section } from "../../layout";
import { StoresPageValueDemo } from "./StoresPageValueDemo";
import { StoresPageFilterDemo } from "./StoresPageFilterDemo";
import { StoresPageSortingDemo } from "./StoresPageSortingDemo";
import { StoresPageRouterSyncDemo } from "./StoresPageRouterSyncDemo";

export const StoresPage: React.FC = () => (
  <Page>
    <Section variant="hero">
      <Text as="h1" size="3xl" weight="bold">
        Stores
      </Text>
      <Text color="secondary">
        Lightweight{" "}
        <a href="https://github.com/pmndrs/zustand" target="_blank" rel="noopener noreferrer">
          Zustand
        </a>
        -based state containers for filters, sorting, single values, persistence, and URL sync. Create stores
        outside components for stable references; subscribe with <code>useStore</code> from zustand.
      </Text>
    </Section>

    <Section>
      <Text as="h2" size="2xl" weight="semibold">Overview</Text>
      <Text color="secondary" size="sm">All stores are exported from <code>@konradullrich/mp-components</code>.</Text>
      <div className="component-page__demo-column">
        <ul style={{ margin: 0, paddingLeft: "var(--spacing-5)", display: "flex", flexDirection: "column", gap: "var(--spacing-2)" }}>
          <li><code>createValueStore&lt;T&gt;(initialValue)</code> – single typed value with <code>setValue</code> / <code>reset</code></li>
          <li><code>createFilterStore&lt;TFilter&gt;(initialFilters?)</code> – key/value filter state</li>
          <li><code>createSortingStore(options?)</code> – multi-column sort state</li>
          <li><code>createLocalStoragePersistor(key)</code> / <code>createSessionStoragePersistor(key)</code> – plug into any store</li>
          <li><code>useRouterSync(store, options)</code> – bi-directional URL search-param sync</li>
          <li><code>createPaginationStore</code> – see the Pagination page (<code>/components/pagination</code>)</li>
        </ul>
      </div>
    </Section>

    <Section>
      <Text as="h2" size="2xl" weight="semibold">valueStore</Text>
      <Text color="secondary" size="sm">
        Holds a single typed value. <code>setValue</code> accepts a new value or an updater function.
      </Text>
      <StoresPageValueDemo />
      <pre className="code-block">
        <code>{`const themeStore = createValueStore<'light' | 'dark' | 'system'>('system');

const { value, setValue, reset } = useStore(themeStore);

setValue('dark');                              // direct
setValue((prev) => prev === 'light' ? 'dark' : 'light'); // updater
reset();                                       // back to 'system'`}</code>
      </pre>
    </Section>

    <Section>
      <Text as="h2" size="2xl" weight="semibold">filterStore</Text>
      <Text color="secondary" size="sm">
        Key/value filter state. Type the filter record for autocomplete and full type safety.
      </Text>
      <StoresPageFilterDemo />
      <pre className="code-block">
        <code>{`type MyFilters = { status: string; category: string };
const store = createFilterStore<MyFilters>({ status: 'active' });

const { filters, setFilter, setFilters, removeFilter, clearFilters, reset } = useStore(store);

setFilter('category', 'books');   // merge one key
setFilters({ status: '', category: 'music' }); // merge many
removeFilter('status');           // remove one key
clearFilters();                   // remove all`}</code>
      </pre>
    </Section>

    <Section>
      <Text as="h2" size="2xl" weight="semibold">sortingStore</Text>
      <Text color="secondary" size="sm">
        Multi-column sort state. <code>toggleSort</code> cycles asc&nbsp;→&nbsp;desc&nbsp;→&nbsp;removed.
        Click the column headers in the demo to try it.
      </Text>
      <StoresPageSortingDemo />
      <pre className="code-block">
        <code>{`const store = createSortingStore({ initialSort: [{ key: 'name', direction: 'asc' }] });

const { sortColumns, toggleSort, setSortColumn, removeSortColumn, clearSort } = useStore(store);

toggleSort('name');              // asc → desc
toggleSort('name');              // desc → removed
setSortColumn('age', 'asc');    // set explicitly`}</code>
      </pre>
    </Section>

    <Section>
      <Text as="h2" size="2xl" weight="semibold">Persistors</Text>
      <Text color="secondary" size="sm">
        Plug a persistor into any store&apos;s <code>options.persistor</code> to automatically save and
        restore state via <code>localStorage</code> or <code>sessionStorage</code>.
      </Text>
      <pre className="code-block">
        <code>{`import {
  createFilterStore,
  createLocalStoragePersistor,
  createSessionStoragePersistor,
} from '@konradullrich/mp-components';

// Persist filters across page reloads
const filterStore = createFilterStore(
  { status: 'active' },
  { persistor: createLocalStoragePersistor('my-app:filters') },
);

// Persist only the current session
const sortStore = createSortingStore({
  persistor: createSessionStoragePersistor('my-app:sorting'),
});

// Persist only a subset of state
const themeStore = createValueStore('light', {
  persistor: createLocalStoragePersistor('my-app:theme', {
    partialize: (s) => ({ value: s.value }),
  }),
});`}</code>
      </pre>
    </Section>

    <Section>
      <Text as="h2" size="2xl" weight="semibold">useRouterSync</Text>
      <Text color="secondary" size="sm">
        Bi-directionally syncs any Zustand store with URL search params. URL&nbsp;→&nbsp;Store on mount;
        Store&nbsp;→&nbsp;URL on every change.
      </Text>
      <StoresPageRouterSyncDemo />
      <pre className="code-block">
        <code>{`const store = createFilterStore<{ q: string; category: string }>();

function FilterPanel() {
  useRouterSync(store, {
    serialize:   (s) => ({ q: s.filters.q ?? '', cat: s.filters.category ?? '' }),
    deserialize: (p) => ({ filters: { q: p.get('q') ?? '', category: p.get('cat') ?? '' } }),
    replace: true, // default – won't pollute browser history
  });
}`}</code>
      </pre>
    </Section>

    <Section>
      <Text as="h2" size="2xl" weight="semibold">Combining Stores</Text>
      <Text color="secondary" size="sm">
        Compose <code>filterStore</code>, <code>sortingStore</code>, and <code>createPaginationStore</code>{" "}
        for full-featured data tables.
      </Text>
      <pre className="code-block">
        <code>{`const filterStore = createFilterStore<MyFilters>();
const sortStore   = createSortingStore();
const pageStore   = createPaginationStore(20);

function DataTable() {
  const { filters }     = useStore(filterStore);
  const { sortColumns } = useStore(sortStore);
  const { page }        = useStore(pageStore);

  const data = useMemo(
    () => fetchData({ filters, sortColumns, page }),
    [filters, sortColumns, page],
  );

  // Reset to page 1 whenever filters change
  useEffect(() => { pageStore.getState().setPage(1); }, [filters]);
}`}</code>
      </pre>
    </Section>
  </Page>
);

StoresPage.displayName = "StoresPage";
