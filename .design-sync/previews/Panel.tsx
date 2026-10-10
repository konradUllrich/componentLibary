import React from 'react';
import { Panel, PanelHeader, PanelBody, Text, Flex, Badge } from '@mp-ku/mp-components';

export const Variants = () => (
  <Flex gap="md" wrap>
    {(['default', 'outlined', 'elevated', 'subtle'] as const).map((v) => (
      <Panel key={v} variant={v} padding="md" style={{ width: 160 }}>
        <Text weight="semibold" style={{ textTransform: 'capitalize' }}>{v}</Text>
        <Text size="sm" color="secondary">Panel variant</Text>
      </Panel>
    ))}
  </Flex>
);

export const WithHeaderAndBody = () => (
  <Panel variant="default" style={{ width: 380 }}>
    <PanelHeader>
      <Flex justify="space-between" align="center">
        <span>Server status</span>
        <Badge variant="success" appearance="subtle">Operational</Badge>
      </Flex>
    </PanelHeader>
    <PanelBody style={{ padding: 'var(--mp-spacing-4)' }}>
      <Text size="sm" color="secondary">
        All systems are running normally. Last incident was resolved 6 days ago.
      </Text>
    </PanelBody>
  </Panel>
);

export const Padding = () => (
  <Flex gap="md" align="flex-start" wrap>
    {(['sm', 'md', 'lg', 'xl'] as const).map((p) => (
      <Panel key={p} variant="outlined" padding={p}>
        <Text size="sm">padding {p}</Text>
      </Panel>
    ))}
  </Flex>
);

export const CustomSpacing = () => (
  <Panel variant="elevated" spacing={{ pl: 6, pr: 6, pt: 4, pb: 4 }} style={{ width: 380 }}>
    <Text weight="semibold">Quarterly report</Text>
    <Text size="sm" color="secondary">Revenue grew 12 % compared with the previous quarter.</Text>
  </Panel>
);
