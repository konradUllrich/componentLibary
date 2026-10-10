import React from 'react';
import { ToggleGroup, ToggleGroupItem, Flex } from '@mp-ku/mp-components';

export const SingleSelect = () => (
  <ToggleGroup type="single" defaultValue="center" aria-label="Text alignment">
    <ToggleGroupItem value="left">Left</ToggleGroupItem>
    <ToggleGroupItem value="center">Center</ToggleGroupItem>
    <ToggleGroupItem value="right">Right</ToggleGroupItem>
  </ToggleGroup>
);

export const MultipleSelect = () => (
  <ToggleGroup type="multiple" defaultValue={['bold', 'underline']} aria-label="Text formatting">
    <ToggleGroupItem value="bold" aria-label="Bold"><strong>B</strong></ToggleGroupItem>
    <ToggleGroupItem value="italic" aria-label="Italic"><em>I</em></ToggleGroupItem>
    <ToggleGroupItem value="underline" aria-label="Underline"><span style={{ textDecoration: 'underline' }}>U</span></ToggleGroupItem>
  </ToggleGroup>
);

export const Outline = () => (
  <Flex direction="column" gap="sm" align="flex-start">
    <ToggleGroup type="single" variant="outline" size="sm" defaultValue="week" aria-label="Calendar range">
      <ToggleGroupItem value="day">Day</ToggleGroupItem>
      <ToggleGroupItem value="week">Week</ToggleGroupItem>
      <ToggleGroupItem value="month">Month</ToggleGroupItem>
    </ToggleGroup>
    <ToggleGroup type="single" variant="outline" size="md" defaultValue="week" aria-label="Calendar range">
      <ToggleGroupItem value="day">Day</ToggleGroupItem>
      <ToggleGroupItem value="week">Week</ToggleGroupItem>
      <ToggleGroupItem value="month">Month</ToggleGroupItem>
    </ToggleGroup>
    <ToggleGroup type="single" variant="outline" size="lg" defaultValue="week" aria-label="Calendar range">
      <ToggleGroupItem value="day">Day</ToggleGroupItem>
      <ToggleGroupItem value="week">Week</ToggleGroupItem>
      <ToggleGroupItem value="month">Month</ToggleGroupItem>
    </ToggleGroup>
  </Flex>
);

export const Disabled = () => (
  <Flex direction="column" gap="sm" align="flex-start">
    <ToggleGroup type="single" variant="outline" defaultValue="list" disabled aria-label="View mode">
      <ToggleGroupItem value="list">List</ToggleGroupItem>
      <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
    </ToggleGroup>
    <ToggleGroup type="single" variant="outline" defaultValue="list" aria-label="View mode">
      <ToggleGroupItem value="list">List</ToggleGroupItem>
      <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
      <ToggleGroupItem value="board" disabled>Board</ToggleGroupItem>
    </ToggleGroup>
  </Flex>
);
