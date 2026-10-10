import React from 'react';
import { HorizontalNav } from '@mp-ku/mp-components';

export const Basic = () => (
  <HorizontalNav
    items={[
      { id: 'home', label: 'Home', href: '#home', isActive: true },
      { id: 'products', label: 'Products', href: '#products' },
      { id: 'pricing', label: 'Pricing', href: '#pricing' },
      { id: 'about', label: 'About', href: '#about' },
    ]}
  />
);

export const ActiveInMiddle = () => (
  <HorizontalNav
    items={[
      { id: 'overview', label: 'Overview', href: '#overview' },
      { id: 'activity', label: 'Activity', href: '#activity', isActive: true },
      { id: 'members', label: 'Members', href: '#members' },
      { id: 'settings', label: 'Settings', href: '#settings' },
    ]}
  />
);

export const HiddenItem = () => (
  <HorizontalNav
    items={[
      { id: 'dashboard', label: 'Dashboard', href: '#dashboard', isActive: true },
      { id: 'reports', label: 'Reports', href: '#reports' },
      { id: 'admin', label: 'Administration', href: '#admin', show: false },
      { id: 'help', label: 'Help', href: '#help' },
    ]}
  />
);
