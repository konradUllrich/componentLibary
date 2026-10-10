import React from 'react';
import { Accordion, Text } from '@mp-ku/mp-components';

const faq = [
  {
    id: 'billing',
    title: 'How does billing work?',
    content: <Text size="sm" color="secondary">Invoices are created on the first day of each month and sent to the billing contact of your workspace.</Text>,
  },
  {
    id: 'seats',
    title: 'Can I add more team members?',
    content: <Text size="sm" color="secondary">Yes. Additional seats can be added at any time from the workspace settings.</Text>,
  },
  {
    id: 'export',
    title: 'How do I export my data?',
    content: <Text size="sm" color="secondary">Open Settings, choose Data export and select CSV or JSON as the output format.</Text>,
  },
];

export const Default = () => (
  <div style={{ width: 420 }}>
    <Accordion items={faq} value="billing" collapsible />
  </div>
);

export const MultipleOpen = () => (
  <div style={{ width: 420 }}>
    <Accordion items={faq} multiple value={['billing', 'export']} />
  </div>
);

export const WithDisabledItem = () => (
  <div style={{ width: 420 }}>
    <Accordion
      items={[
        faq[0],
        { ...faq[1], title: 'Single sign-on (Enterprise only)', disabled: true },
        faq[2],
      ]}
      collapsible
    />
  </div>
);

export const Horizontal = () => (
  <div style={{ width: 560 }}>
    <Accordion variant="horizontal" items={faq} value="seats" />
  </div>
);
