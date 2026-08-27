import React, { useState } from "react";
import { HorizontalNav } from "./HorizontalNav";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { HorizontalNav } from '@mp-ku/mp-components';

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

<HorizontalNav items={navItems} />`;

/** Live render of {@link usageSource}, used on the HorizontalNav demo page. */
export const UsageExample = () => {
  const [activeId, setActiveId] = useState("home");

  const navItems = [
    {
      id: "home",
      label: "Home",
      href: "/home",
      isActive: activeId === "home",
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setActiveId("home");
      },
    },
    {
      id: "about",
      label: "About",
      href: "/about",
      isActive: activeId === "about",
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setActiveId("about");
      },
    },
  ];

  return <HorizontalNav items={navItems} />;
};
