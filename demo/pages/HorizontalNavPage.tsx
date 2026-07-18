import React, { useState } from "react";
import { HorizontalNav, Page, Section } from "../../layout";
import { Text } from "../../common";

export const HorizontalNavPage: React.FC = () => {
  const [activeId, setActiveId] = useState("home");

  const navItems = [
    {
      id: "home",
      label: "Home",
      href: "#home",
      isActive: activeId === "home",
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setActiveId("home");
      },
    },
    {
      id: "about",
      label: "About",
      href: "#about",
      isActive: activeId === "about",
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setActiveId("about");
      },
    },
    {
      id: "services",
      label: "Services",
      href: "#services",
      isActive: activeId === "services",
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setActiveId("services");
      },
    },
    {
      id: "contact",
      label: "Contact",
      href: "#contact",
      isActive: activeId === "contact",
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setActiveId("contact");
      },
    },
  ];

  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          Horizontal Nav Component
        </Text>
        <Text color="secondary">
          Horizontal navigation that adapts to mobile with select dropdown
        </Text>
      </Section>

      <Section
        title="Basic Navigation"
        subtitle="Horizontal navigation bar with active state"
      >
        <HorizontalNav items={navItems} />
      </Section>

      <Section
        title="Responsive Behavior"
        subtitle="On mobile (width &lt; 768px), the navigation automatically converts to a dropdown select"
      >
        <Text size="sm" color="secondary">
          Try resizing your browser window to see the mobile dropdown version
        </Text>
      </Section>

      <Section title="Usage">
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
      </Section>
    </Page>
  );
};
