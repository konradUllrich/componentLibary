import React from 'react';
import { Page, Text, Button, Flex, Card } from '@mp-ku/mp-components';

export const WithTitle = () => (
  <Page title="Dashboard" subHeader="Overview of your account" maxWidth="md">
    <Text color="secondary" style={{ marginTop: 'var(--mp-spacing-4)' }}>
      Welcome back. You have 3 pending approvals and 2 new messages.
    </Text>
  </Page>
);

export const WithActions = () => (
  <Page
    title="Team members"
    subHeader="Manage who has access to this workspace"
    maxWidth="md"
    actions={
      <Flex gap="sm">
        <Button variant="secondary" size="sm">Export</Button>
        <Button size="sm">Invite member</Button>
      </Flex>
    }
  >
    <Card variant="outlined" padding="md" style={{ marginTop: 'var(--mp-spacing-4)' }}>
      <Text size="sm" color="secondary">12 members, 3 pending invitations</Text>
    </Card>
  </Page>
);

export const SmallHeading = () => (
  <Page title="Billing" subHeader="Plan, payment method and invoices" headerType="h2" maxWidth="sm">
    <Text style={{ marginTop: 'var(--mp-spacing-4)' }}>
      You are on the Business plan, renewing on 1 November 2026.
    </Text>
  </Page>
);
