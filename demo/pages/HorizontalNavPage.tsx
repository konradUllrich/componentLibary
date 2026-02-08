import React, { useState } from 'react';
import { HorizontalNav } from '../../layout';
import { Text } from '../../common';

export const HorizontalNavPage: React.FC = () => {
  const [activeId, setActiveId] = useState('home');

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      href: '#home',
      isActive: activeId === 'home',
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setActiveId('home');
      },
    },
    {
      id: 'about',
      label: 'About',
      href: '#about',
      isActive: activeId === 'about',
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setActiveId('about');
      },
    },
    {
      id: 'services',
      label: 'Services',
      href: '#services',
      isActive: activeId === 'services',
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setActiveId('services');
      },
    },
    {
      id: 'contact',
      label: 'Contact',
      href: '#contact',
      isActive: activeId === 'contact',
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setActiveId('contact');
      },
    },
  ];

  return (
    <div className="component-page">
      <div className="component-page__header">
        <Text as="h1" size="3xl" weight="bold">Horizontal Nav Component</Text>
        <Text color="secondary">
          Horizontal navigation that adapts to mobile with select dropdown
        </Text>
      </div>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Basic Navigation</Text>
        <Text color="secondary" size="sm">
          Horizontal navigation bar with active state
        </Text>
        <div className="component-page__demo">
          <HorizontalNav items={navItems} />
        </div>
      </section>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Responsive Behavior</Text>
        <Text color="secondary" size="sm">
          On mobile (width &lt; 768px), the navigation automatically converts to a dropdown select
        </Text>
        <div className="component-page__demo">
          <Text size="sm" color="secondary">
            Try resizing your browser window to see the mobile dropdown version
          </Text>
        </div>
      </section>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Usage</Text>
        <pre className="code-block">
          <code>{`import { HorizontalNav } from '@konradullrich/mp-components';

const [activeId, setActiveId] = useState('home');

const navItems = [
  {
    id: 'home',
    label: 'Home',
    href: '/home',
    isActive: activeId === 'home',
    onClick: (e) => {
      e.preventDefault();
      setActiveId('home');
    },
  },
  {
    id: 'about',
    label: 'About',
    href: '/about',
    isActive: activeId === 'about',
    onClick: (e) => {
      e.preventDefault();
      setActiveId('about');
    },
  },
];

<HorizontalNav items={navItems} />`}</code>
        </pre>
      </section>
    </div>
  );
};
