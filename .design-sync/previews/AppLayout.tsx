import React from 'react';
import {
  AppLayout,
  AppHeader,
  AppSidebar,
  AppMain,
  Sidebar,
  SidebarToggle,
  SidebarNav,
  SidebarItem,
  SidebarDivider,
  HorizontalNav,
  Page,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Text,
  Badge,
  Flex,
  Button,
} from '@mp-ku/mp-components';

const projects = [
  { name: 'Website relaunch', owner: 'Marketing', status: 'Active', variant: 'success' as const },
  { name: 'Customer portal', owner: 'IT Services', status: 'In review', variant: 'warning' as const },
  { name: 'Onboarding app', owner: 'HR', status: 'Planned', variant: 'info' as const },
  { name: 'Invoice workflow', owner: 'Finance', status: 'Active', variant: 'success' as const },
];

export const ApplicationShell = () => (
  <div style={{ height: 560 }}>
    <AppLayout
      header={
        <AppHeader>
          <Text weight="bold" size="lg">Acme Workspace</Text>
          <HorizontalNav
            items={[
              { id: 'overview', label: 'Overview', isActive: true },
              { id: 'reports', label: 'Reports' },
              { id: 'help', label: 'Help' },
            ]}
          />
        </AppHeader>
      }
      sidebar={
        <AppSidebar>
          <Sidebar defaultOpen width="220px">
            <SidebarToggle />
            <SidebarNav>
              <SidebarItem label="Dashboard" />
              <SidebarItem label="Projects" isActive />
              <SidebarItem label="Tasks" />
              <SidebarDivider label="Administration" />
              <SidebarItem label="Users" />
              <SidebarItem label="Settings" />
            </SidebarNav>
          </Sidebar>
        </AppSidebar>
      }
    >
      <AppMain>
        <Page
          title="Projects"
          subHeader="4 projects across 4 departments"
          actions={<Button size="sm">New project</Button>}
        >
          <Grid columns={2} gap="md" style={{ marginTop: 'var(--mp-spacing-4)' }}>
            {projects.map((p) => (
              <Card key={p.name} variant="outlined" padding="md">
                <CardHeader>
                  <Flex justify="space-between" align="center">
                    <Text weight="semibold">{p.name}</Text>
                    <Badge variant={p.variant} appearance="subtle">{p.status}</Badge>
                  </Flex>
                </CardHeader>
                <CardContent>
                  <Text size="sm" color="secondary">Owner: {p.owner}</Text>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Page>
      </AppMain>
    </AppLayout>
  </div>
);
