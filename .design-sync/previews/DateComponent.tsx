import React from 'react';
import { DateComponent, Flex, Text } from '@mp-ku/mp-components';

const due = '2024-03-15T14:30:00';

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <Flex gap="md" align="baseline">
    <Text size="sm" color="secondary" style={{ width: 96 }}>{label}</Text>
    {children}
  </Flex>
);

export const Formats = () => (
  <Flex direction="column" gap="sm">
    <Row label="Short"><DateComponent date={due} format="short" /></Row>
    <Row label="Long"><DateComponent date={due} format="long" /></Row>
    <Row label="Date & time"><DateComponent date={due} format="datetime" /></Row>
    <Row label="Time"><DateComponent date={due} format="time" /></Row>
  </Flex>
);

export const Locales = () => (
  <Flex direction="column" gap="sm">
    <Row label="de-DE"><DateComponent date={due} format="long" locale="de-DE" /></Row>
    <Row label="en-US"><DateComponent date={due} format="long" locale="en-US" /></Row>
    <Row label="en-GB"><DateComponent date={due} format="long" locale="en-GB" /></Row>
  </Flex>
);

export const InContext = () => (
  <Text size="sm">
    Invoice due on <DateComponent date={due} format="long" locale="en-US" />
  </Text>
);

export const Fallback = () => (
  <Row label="Last login">
    <DateComponent date="" fallback="Never signed in" />
  </Row>
);
