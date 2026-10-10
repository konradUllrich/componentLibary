import React from 'react';
import { FormBuilder } from '@mp-ku/mp-components';

export const Basic = () => (
  <FormBuilder
    defaultValues={{ name: 'Jane Doe', email: '', newsletter: true }}
    fields={[
      { name: 'name', fieldType: 'text', label: 'Full name', required: true },
      { name: 'email', fieldType: 'email', label: 'Email', placeholder: 'jane.doe@example.com', helperText: "We'll never share your email" },
      { name: 'newsletter', fieldType: 'checkbox', label: 'Newsletter', inlineLabel: 'Send me product updates' },
    ]}
    submitLabel="Create account"
    resetLabel="Reset"
    onSubmit={() => {}}
  />
);

export const TwoColumns = () => (
  <FormBuilder
    columns={2}
    defaultValues={{ firstName: 'Jane', lastName: 'Doe', role: 'editor', notes: '' }}
    fields={[
      { name: 'firstName', fieldType: 'text', label: 'First name' },
      { name: 'lastName', fieldType: 'text', label: 'Last name' },
      {
        name: 'role',
        fieldType: 'select',
        label: 'Role',
        colSpan: 2,
        options: [
          { value: 'viewer', label: 'Viewer' },
          { value: 'editor', label: 'Editor' },
          { value: 'admin', label: 'Administrator' },
        ],
      },
      { name: 'notes', fieldType: 'textarea', label: 'Notes', placeholder: 'Anything we should know?', rows: 3, colSpan: 2 },
    ]}
    submitLabel="Invite user"
    onSubmit={() => {}}
  />
);

export const Preferences = () => (
  <FormBuilder
    defaultValues={{ plan: 'pro', channels: ['email'], fontSize: 16, accent: '#7c3aed' }}
    fields={[
      {
        name: 'plan',
        fieldType: 'radioGroup',
        label: 'Plan',
        direction: 'horizontal',
        options: [
          { value: 'free', label: 'Free' },
          { value: 'pro', label: 'Pro' },
          { value: 'enterprise', label: 'Enterprise' },
        ],
      },
      {
        name: 'channels',
        fieldType: 'checkboxGroup',
        label: 'Notification channels',
        direction: 'horizontal',
        options: [
          { value: 'email', label: 'Email' },
          { value: 'sms', label: 'SMS' },
          { value: 'push', label: 'Push' },
        ],
      },
      { name: 'fontSize', fieldType: 'slider', label: 'Font size', min: 12, max: 20 },
      { name: 'accent', fieldType: 'colorPicker', label: 'Accent color' },
    ]}
    submitLabel="Save preferences"
    onSubmit={() => {}}
  />
);
