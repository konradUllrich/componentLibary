import React from "react";
import { Button, Text } from "../../common";
import { Grid, Page, Panel, Section } from "../../layout";
import { Pagination } from "../../data-display/Pagination";
import { usePagination } from "../../hooks/usePagination/usePagination";
import "./UsePersistedStatePage.css";

// ===== 1. Drop-in: hook + component, minimal config =====
const BasicExample = () => {
  const pagination = usePagination({
    storageKey: "docs-pg-basic",
    defaultPageSize: 10,
  });

  React.useEffect(() => {
    pagination.setTotalItems(97);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Panel
      variant="subtle"
      padding="lg"
      className="use-persisted-state-page__example"
    >
      <Text as="h3" size="xl" weight="semibold">
        1. Drop-in usage
      </Text>
      <Text color="secondary" size="sm">
        Minimal setup. Pass the hook return directly to{" "}
        <code>&lt;Pagination&gt;</code>. Reload — you'll land on the same page.
      </Text>
      <Pagination pagination={pagination} />
      <pre className="use-persisted-state-page__code-block">
        <code>{`const pagination = usePagination({
  storageKey: "users",
  defaultPageSize: 10,
});
pagination.setTotalItems(totalCount);

<Pagination pagination={pagination} />`}</code>
      </pre>
    </Panel>
  );
};

// ===== 2. Custom page size options =====
const PageSizeExample = () => {
  const pagination = usePagination({
    storageKey: "docs-pg-size",
    defaultPageSize: 5,
  });

  React.useEffect(() => {
    pagination.setTotalItems(100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Panel
      variant="subtle"
      padding="lg"
      className="use-persisted-state-page__example"
    >
      <Text as="h3" size="xl" weight="semibold">
        2. Custom page size options
      </Text>
      <Text color="secondary" size="sm">
        Override <code>pageSizeOptions</code> on the component. Changing size
        resets to page 1.
      </Text>
      <Pagination pagination={pagination} pageSizeOptions={[5, 10, 25, 50]} />
      <pre className="use-persisted-state-page__code-block">
        <code>{`<Pagination
  pagination={pagination}
  pageSizeOptions={[5, 10, 25, 50]}
/>`}</code>
      </pre>
    </Panel>
  );
};

// ===== 3. No size selector =====
const NoSizeSelectorExample = () => {
  const pagination = usePagination({
    storageKey: "docs-pg-nosize",
    defaultPageSize: 10,
    syncUrl: false,
  });

  React.useEffect(() => {
    pagination.setTotalItems(80);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Panel
      variant="subtle"
      padding="lg"
      className="use-persisted-state-page__example"
    >
      <Text as="h3" size="xl" weight="semibold">
        3. Hide size selector
      </Text>
      <Text color="secondary" size="sm">
        Pass <code>showSizeSelector=false</code> when page size is fixed by the
        backend.
      </Text>
      <Pagination pagination={pagination} showSizeSelector={false} />
      <pre className="use-persisted-state-page__code-block">
        <code>{`<Pagination
  pagination={pagination}
  showSizeSelector={false}
/>`}</code>
      </pre>
    </Panel>
  );
};

// ===== 4. Dynamic total (simulate API response) =====
const DynamicTotalExample = () => {
  const pagination = usePagination({
    storageKey: "docs-pg-dynamic",
    defaultPageSize: 10,
    syncUrl: false,
  });

  const totals = [20, 50, 100, 200];

  return (
    <Panel
      variant="subtle"
      padding="lg"
      className="use-persisted-state-page__example"
    >
      <Text as="h3" size="xl" weight="semibold">
        4. Dynamic total items
      </Text>
      <Text color="secondary" size="sm">
        Call <code>setTotalItems</code> when the API returns the count. The
        current page is clamped if it no longer fits.
      </Text>
      <div className="use-persisted-state-page__actions">
        {totals.map((t) => (
          <Button
            key={t}
            size="sm"
            variant={pagination.totalItems === t ? "primary" : "secondary"}
            onClick={() => pagination.setTotalItems(t)}
          >
            {t} items
          </Button>
        ))}
      </div>
      <Pagination pagination={pagination} />
      <pre className="use-persisted-state-page__code-block">
        <code>{`useEffect(() => {
  if (data?.totalCount !== undefined) {
    pagination.setTotalItems(data.totalCount);
  }
}, [data?.totalCount]);`}</code>
      </pre>
    </Panel>
  );
};

// ===== 5. Two independent tables on one page =====
const TwoTablesExample = () => {
  const users = usePagination({
    storageKey: "docs-pg-users",
    defaultPageSize: 10,
    syncUrl: true,
  });
  const orders = usePagination({
    storageKey: "docs-pg-orders",
    defaultPageSize: 5,
    syncUrl: true,
  });

  React.useEffect(() => {
    users.setTotalItems(85);
    orders.setTotalItems(43);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Panel
      variant="subtle"
      padding="lg"
      className="use-persisted-state-page__example"
    >
      <Text as="h3" size="xl" weight="semibold">
        5. Two tables, one page
      </Text>
      <Text color="secondary" size="sm">
        Each instance uses its own <code>storageKey</code> — URL params and
        storage never collide.
      </Text>
      <Text size="sm" weight="semibold">
        Users table
      </Text>
      <Pagination pagination={users} />
      <Text size="sm" weight="semibold">
        Orders table
      </Text>
      <Pagination pagination={orders} />
      <pre className="use-persisted-state-page__code-block">
        <code>{`const users  = usePagination({ storageKey: "users" });
const orders = usePagination({ storageKey: "orders" });

<Pagination pagination={users} />
<Pagination pagination={orders} />`}</code>
      </pre>
    </Panel>
  );
};

// ===== 6. sessionStorage, no URL =====
const SessionStorageExample = () => {
  const pagination = usePagination({
    storageKey: "docs-pg-session",
    defaultPageSize: 10,
    storage: "sessionStorage",
    syncUrl: false,
  });

  React.useEffect(() => {
    pagination.setTotalItems(60);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Panel
      variant="subtle"
      padding="lg"
      className="use-persisted-state-page__example"
    >
      <Text as="h3" size="xl" weight="semibold">
        6. sessionStorage, no URL
      </Text>
      <Text color="secondary" size="sm">
        Tab-local state that disappears when the tab closes and never leaks into
        the URL — ideal for sensitive or ephemeral pagination.
      </Text>
      <Pagination pagination={pagination} />
      <pre className="use-persisted-state-page__code-block">
        <code>{`const pagination = usePagination({
  storageKey: "draft-items",
  storage: "sessionStorage",
  syncUrl: false,
});`}</code>
      </pre>
    </Panel>
  );
};

// ===== 7. Inside a data-fetching hook (code-only) =====
const ReactQueryPatternExample = () => (
  <Panel
    variant="subtle"
    padding="lg"
    className="use-persisted-state-page__example"
  >
    <Text as="h3" size="xl" weight="semibold">
      7. Inside a data-fetching hook
    </Text>
    <Text color="secondary" size="sm">
      Compose <code>usePagination</code> with React Query (or any async
      library). The hook owns pagination state; the query reruns automatically
      when <code>page</code> or <code>pageSize</code> changes.
    </Text>
    <pre className="use-persisted-state-page__code-block">
      <code>{`// hooks/useUsers.ts
export function useUsers() {
  const pagination = usePagination({
    storageKey: "users",
    defaultPageSize: 20,
  });

  const query = useQuery({
    queryKey: ["users", pagination.page, pagination.pageSize],
    queryFn: () =>
      fetch(\`/api/users?page=\${pagination.page}&size=\${pagination.pageSize}\`)
        .then(r => r.json()),
  });

  useEffect(() => {
    if (query.data?.totalCount !== undefined) {
      pagination.setTotalItems(query.data.totalCount);
    }
  }, [query.data?.totalCount]);

  return { users: query.data?.data ?? [], isLoading: query.isLoading, pagination };
}

// UsersPage.tsx
function UsersPage() {
  const { users, isLoading, pagination } = useUsers();
  return (
    <>
      <Table data={users} isLoading={isLoading} />
      <Pagination pagination={pagination} />
    </>
  );
}`}</code>
    </pre>
  </Panel>
);

export const UsePaginationPage = () => {
  return (
    <Page className="use-persisted-state-page">
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          usePagination
        </Text>
        <Text color="secondary">
          A pagination hook built on top of <code>usePersistedState</code>.
          Persists page, page size, and total items to URL search params and Web
          Storage automatically. Pass the hook return directly to{" "}
          <code>&lt;Pagination&gt;</code> — no glue code required.
        </Text>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Quick Start
        </Text>
        <pre className="use-persisted-state-page__code-block">
          <code>{`import { usePagination } from "@mp-ku/mp-components";
import { Pagination } from "@mp-ku/mp-components";

const pagination = usePagination({ storageKey: "my-table" });
pagination.setTotalItems(totalCount);

<Pagination pagination={pagination} />`}</code>
        </pre>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Examples
        </Text>
        <Grid gap="md">
          <BasicExample />
          <PageSizeExample />
          <NoSizeSelectorExample />
          <DynamicTotalExample />
          <TwoTablesExample />
          <SessionStorageExample />
          <ReactQueryPatternExample />
        </Grid>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          API
        </Text>
        <pre className="use-persisted-state-page__code-block">
          <code>{`// Options
usePagination({
  storageKey?: string,          // storage / URL key  (default: "pagination")
  defaultPage?: number,         // default: 1
  defaultPageSize?: number,     // default: 10
  totalItems?: number,          // initial total (default: 0)
  storage?: "localStorage"      // default
           | "sessionStorage",
  syncUrl?: boolean,            // default: true
})

// Returned state
page: number
pageSize: number
totalItems: number
totalPages: number      // derived: ceil(totalItems / pageSize)
hasNext: boolean        // derived: page < totalPages
hasPrevious: boolean    // derived: page > 1

// Actions
setPage(page: number)         // clamped to [1, totalPages]
nextPage()                    // clamped at totalPages
prevPage()                    // clamped at 1
setPageSize(size: number)     // resets page to 1
setTotalItems(count: number)  // clamps current page if needed
reset()                       // restores all defaults`}</code>
        </pre>
        <Text as="p" size="sm" color="secondary">
          Priority order on load: URL param → localStorage/sessionStorage →
          default.
        </Text>
      </Section>
    </Page>
  );
};
