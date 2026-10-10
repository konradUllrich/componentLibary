import React from 'react';
import { Section, Text, Button, Panel } from '@mp-ku/mp-components';

export const Default = () => (
  <Section title="Recent activity" subtitle="Changes made in the last 7 days" style={{ width: 480 }}>
    <Panel variant="outlined" padding="md">
      <Text size="sm">Anna Schmidt updated the project timeline.</Text>
    </Panel>
  </Section>
);

export const WithActions = () => (
  <Section
    title="API keys"
    subtitle="Keys used by external integrations"
    actions={<Button size="sm">Create key</Button>}
    style={{ width: 480 }}
  >
    <Text size="sm" color="secondary">You have 2 active keys.</Text>
  </Section>
);

export const Hero = () => (
  <div style={{ width: 480 }}>
    <Section variant="hero" style={{ marginTop: 0 }}>
      <Text as="h1" size="3xl" weight="bold">Release notes</Text>
      <Text color="secondary">Everything that changed in version 2.4 of the customer portal.</Text>
    </Section>
    <Section title="New features" subtitle="Shipped on 6 October 2026">
      <Text size="sm">Bulk export for invoices and a redesigned approval inbox.</Text>
    </Section>
  </div>
);
