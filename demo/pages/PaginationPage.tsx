import React from 'react';
import { Pagination, createPaginationStore } from '../../data-display/Pagination';
import { Text } from '../../common';

const paginationStore = createPaginationStore(10);
paginationStore.getState().setTotalItems(100);

export const PaginationPage: React.FC = () => {
  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">Pagination Component</Text>
        <Text color="secondary">
          Navigate through pages of data
        </Text>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">Basic Pagination</Text>
        <Text color="secondary" size="sm">
          Standard pagination with page numbers and navigation
        </Text>
        <div className="component-page__demo-column">
          <Pagination store={paginationStore} />
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">Usage</Text>
        <pre className="code-block">
          <code>{`import { Pagination, createPaginationStore } from '@konradullrich/mp-components';

const paginationStore = createPaginationStore(10);
paginationStore.getState().setTotalItems(100);

<Pagination store={paginationStore} />`}</code>
        </pre>
      </Section>
    </Page>
  );
};