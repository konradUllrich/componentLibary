import React from 'react';
import { Radio, Flex } from '@mp-ku/mp-components';

export const Group = () => (
  <Flex direction="column" gap="sm">
    <Radio name="plan" value="free" inlineLabel="Free" />
    <Radio name="plan" value="pro" inlineLabel="Pro" defaultChecked />
    <Radio name="plan" value="enterprise" inlineLabel="Enterprise" />
  </Flex>
);

export const Variants = () => (
  <Flex gap="xl">
    <Flex direction="column" gap="sm">
      <Radio name="variant-default" value="a" variant="default" inlineLabel="Default" />
      <Radio name="variant-default" value="b" variant="default" inlineLabel="Default" defaultChecked />
    </Flex>
    <Flex direction="column" gap="sm">
      <Radio name="variant-outline" value="a" variant="outline" inlineLabel="Outline" />
      <Radio name="variant-outline" value="b" variant="outline" inlineLabel="Outline" defaultChecked />
    </Flex>
    <Flex direction="column" gap="sm">
      <Radio name="variant-filled" value="a" variant="filled" inlineLabel="Filled" />
      <Radio name="variant-filled" value="b" variant="filled" inlineLabel="Filled" defaultChecked />
    </Flex>
  </Flex>
);

export const States = () => (
  <Flex direction="column" gap="md">
    <Radio name="shipping" inlineLabel="Express shipping (unavailable)" disabled />
    <Radio
      name="consent"
      label="Contact preference"
      inlineLabel="Contact me by phone"
      helperText="Optional"
    />
    <Radio
      name="required-choice"
      label="Billing cycle"
      inlineLabel="Monthly"
      required
      error
      errorMessage="You must make a selection"
    />
  </Flex>
);
