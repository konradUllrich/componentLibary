import React from 'react';
import { CheckboxGroup } from '@mp-ku/mp-components';

const channels = [
  { value: 'email', label: 'Email' },
  { value: 'sms', label: 'SMS' },
  { value: 'push', label: 'Push notification' },
];

export const Vertical = () => (
  <CheckboxGroup
    label="Notification channels"
    helperText="Choose how we should reach you"
    options={channels}
    value={['email', 'push']}
  />
);

export const Horizontal = () => (
  <CheckboxGroup
    label="Status filter"
    direction="horizontal"
    variant="filled"
    options={[
      { value: 'open', label: 'Open' },
      { value: 'in-progress', label: 'In progress' },
      { value: 'done', label: 'Done' },
    ]}
    value={['open']}
  />
);

export const WithError = () => (
  <CheckboxGroup
    label="Working days"
    required
    variant="outline"
    options={[
      { value: 'mon', label: 'Monday' },
      { value: 'tue', label: 'Tuesday' },
      { value: 'wed', label: 'Wednesday' },
    ]}
    value={[]}
    error
    errorMessage="Select at least one day"
  />
);
