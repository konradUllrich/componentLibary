import React from 'react';
import { Disclosure, Text } from '../../common';

export const DisclosurePage: React.FC = () => {
  return (
    <div className="component-page">
      <div className="component-page__header">
        <Text as="h1" size="3xl" weight="bold">Disclosure Component</Text>
        <Text color="secondary">
          Simple collapsible content section
        </Text>
      </div>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Basic Usage</Text>
        <Text color="secondary" size="sm">
          Click to expand and collapse content
        </Text>
        <div className="component-page__demo-column">
          <Disclosure label="Click to expand">
            <Text>
              This is collapsible content that can be shown or hidden.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
          </Disclosure>

          <Disclosure label="Another disclosure">
            <Text>
              Each disclosure operates independently.
            </Text>
          </Disclosure>
        </div>
      </section>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Usage</Text>
        <pre className="code-block">
          <code>{`import { Disclosure } from '@konradullrich/mp-components';

<Disclosure label="Click to expand">
  <p>Hidden content that can be toggled</p>
</Disclosure>`}</code>
        </pre>
      </section>
    </div>
  );
};
