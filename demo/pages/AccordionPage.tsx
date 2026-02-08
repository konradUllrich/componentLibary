import React, { useState } from 'react';
import { Accordion, Text } from '../../common';

export const AccordionPage: React.FC = () => {
  const [accordionValue, setAccordionValue] = useState('item1');

  return (
    <div className="component-page">
      <div className="component-page__header">
        <Text as="h1" size="3xl" weight="bold">Accordion Component</Text>
        <Text color="secondary">
          Collapsible content sections with vertical or tabs layout
        </Text>
      </div>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Vertical (Default)</Text>
        <Text color="secondary" size="sm">
          Traditional accordion with collapsible sections
        </Text>
        <div className="component-page__demo-column">
          <Accordion
            items={[
              {
                id: 'item1',
                title: 'Section 1',
                content: <Text>Content for section 1</Text>,
              },
              {
                id: 'item2',
                title: 'Section 2',
                content: <Text>Content for section 2</Text>,
              },
              {
                id: 'item3',
                title: 'Section 3',
                content: <Text>Content for section 3</Text>,
              },
            ]}
            value={accordionValue as string | undefined}
            onValueChange={(value: string | string[] | undefined) =>
              setAccordionValue(
                Array.isArray(value) ? value[0] : value || 'item1',
              )
            }
          />
        </div>
      </section>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Tabs Variant</Text>
        <Text color="secondary" size="sm">
          Horizontal tabs layout
        </Text>
        <div className="component-page__demo-column">
          <Accordion
            variant="tabs"
            items={[
              {
                id: 'tab1',
                title: 'Tab 1',
                content: <Text>Content for tab 1</Text>,
              },
              {
                id: 'tab2',
                title: 'Tab 2',
                content: <Text>Content for tab 2</Text>,
              },
              {
                id: 'tab3',
                title: 'Tab 3',
                content: <Text>Content for tab 3</Text>,
              },
            ]}
          />
        </div>
      </section>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Usage</Text>
        <pre className="code-block">
          <code>{`import { Accordion } from '@konradullrich/mp-components';

<Accordion
  items={[
    { id: '1', title: 'Section 1', content: <div>Content 1</div> },
    { id: '2', title: 'Section 2', content: <div>Content 2</div> },
  ]}
  value={value}
  onValueChange={setValue}
/>

<Accordion
  variant="tabs"
  items={[
    { id: '1', title: 'Tab 1', content: <div>Content 1</div> },
    { id: '2', title: 'Tab 2', content: <div>Content 2</div> },
  ]}
/>`}</code>
        </pre>
      </section>
    </div>
  );
};
