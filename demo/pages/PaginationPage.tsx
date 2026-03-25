import React, { useEffect } from "react";
import {
  Pagination,
  createPaginationStore,
  usePaginationSync,
} from "../../data-display/Pagination";
import { Text } from "../../common";
import { Page, Section } from "../../layout";

const paginationStore = createPaginationStore(10);
paginationStore.getState().setTotalItems(100);

const urlSyncedStoreA = createPaginationStore(10);

const urlSyncedStoreB = createPaginationStore(5);
urlSyncedStoreB.getState().setTotalItems(60);

const SyncedPaginationA: React.FC = () => {
  usePaginationSync(urlSyncedStoreA, { key: "tableA" });
  return <Pagination store={urlSyncedStoreA} />;
};
SyncedPaginationA.displayName = "SyncedPaginationA";

const SyncedPaginationB: React.FC = () => {
  usePaginationSync(urlSyncedStoreB, { key: "tableB" });
  return <Pagination store={urlSyncedStoreB} />;
};
SyncedPaginationB.displayName = "SyncedPaginationB";

export const PaginationPage: React.FC = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      urlSyncedStoreA.getState().setTotalItems(123);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          Pagination Component
        </Text>
        <Text color="secondary">Navigate through pages of data</Text>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Basic Pagination
        </Text>
        <Text color="secondary" size="sm">
          Standard pagination with page numbers and navigation
        </Text>
        <div className="component-page__demo-column">
          <Pagination store={paginationStore} />
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          URL-synced Pagination
        </Text>
        <Text color="secondary" size="sm">
          Page and page size are reflected in and restored from the URL. Use a{" "}
          <code>key</code> to namespace each instance — multiple synced
          paginations on the same page will never collide.
        </Text>
        <div className="component-page__demo-column">
          <Text size="sm" weight="semibold">
            Table A (key=&quot;tableA&quot; → tableA_page, tableA_pageSize)
          </Text>
          <SyncedPaginationA />
          <Text size="sm" weight="semibold">
            Table B (key=&quot;tableB&quot; → tableB_page, tableB_pageSize)
          </Text>
          <SyncedPaginationB />
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Usage
        </Text>
        <pre className="code-block">
          <code>{`import {
  Pagination,
  createPaginationStore,
  usePaginationSync,
} from '@konradullrich/mp-components';

// Store lives outside the component so it is shared / stable.
const store = createPaginationStore(10);
store.getState().setTotalItems(100);

// Without URL sync – plain store.
<Pagination store={store} />

// With URL sync – use key to namespace params (safe for multiple tables).
function UserTable() {
  usePaginationSync(usersStore, { key: "users" });
  // URL params: users_page, users_pageSize
  return <Pagination store={usersStore} />;
}

function OrderTable() {
  usePaginationSync(ordersStore, { key: "orders" });
  // URL params: orders_page, orders_pageSize
  return <Pagination store={ordersStore} />;
}

// Override individual param names if needed:
// usePaginationSync(store, { pageParam: "p", pageSizeParam: "size" });`}</code>
        </pre>
      </Section>
    </Page>
  );
};
