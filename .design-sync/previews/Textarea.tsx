import React from 'react';
import { Textarea, Flex } from '@mp-ku/mp-components';

export const Default = () => (
  <Textarea
    label="Description"
    placeholder="Describe the project goals and scope"
    helperText="Max. 500 characters"
    rows={3}
  />
);

export const Filled = () => (
  <Textarea
    label="Meeting notes"
    rows={3}
    defaultValue="Agreed on the new release schedule. Design review moves to Thursday; QA starts next sprint."
  />
);

export const States = () => (
  <Flex direction="column" gap="md">
    <Textarea label="Internal comment" rows={2} defaultValue="Approved by finance." disabled />
    <Textarea label="Reason for rejection" rows={2} required error errorMessage="Please provide a reason" />
  </Flex>
);
