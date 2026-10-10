import React from 'react';
import { Grid, GridItem, Card, Text } from '@mp-ku/mp-components';

const cell: React.CSSProperties = {
  padding: 'var(--mp-spacing-3)',
  background: 'var(--mp-color-background-light)',
  border: '1px solid var(--mp-color-border)',
  borderRadius: 'var(--mp-radius-md)',
  textAlign: 'center',
};

export const Columns = () => (
  <Grid columns={3} gap="md" style={{ width: 420 }}>
    {['January', 'February', 'March', 'April', 'May', 'June'].map((m) => (
      <div key={m} style={cell}><Text size="sm">{m}</Text></div>
    ))}
  </Grid>
);

export const Spanning = () => (
  <Grid columns={4} gap="md" style={{ width: 460 }}>
    <GridItem colSpan="full" style={cell}><Text size="sm" weight="semibold">Header (full width)</Text></GridItem>
    <GridItem colSpan={3} style={cell}><Text size="sm">Main content (3 columns)</Text></GridItem>
    <GridItem style={cell}><Text size="sm">Aside</Text></GridItem>
    <GridItem colSpan={2} style={cell}><Text size="sm">Half</Text></GridItem>
    <GridItem colSpan={2} style={cell}><Text size="sm">Half</Text></GridItem>
  </Grid>
);

export const RowSpan = () => (
  <Grid columns={3} gap="md" style={{ width: 420 }}>
    <GridItem rowSpan={2} style={{ ...cell, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Text size="sm" weight="semibold">Featured</Text>
    </GridItem>
    <div style={cell}><Text size="sm">News</Text></div>
    <div style={cell}><Text size="sm">Events</Text></div>
    <div style={cell}><Text size="sm">Jobs</Text></div>
    <div style={cell}><Text size="sm">Contact</Text></div>
  </Grid>
);

export const CardGrid = () => (
  <Grid columns={2} gap="lg" style={{ width: 460 }}>
    {[
      ['Open tickets', '128'],
      ['Resolved today', '42'],
      ['Avg. response', '1.8 h'],
      ['Satisfaction', '94 %'],
    ].map(([label, value]) => (
      <Card key={label} variant="outlined" padding="md">
        <Text size="sm" color="secondary">{label}</Text>
        <Text size="2xl" weight="bold">{value}</Text>
      </Card>
    ))}
  </Grid>
);
