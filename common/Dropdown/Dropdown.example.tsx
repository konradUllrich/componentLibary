import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
} from "./Dropdown";
import { Button } from "../Button";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
} from '@mp-ku/mp-components';

// Basic dropdown
<Dropdown>
  <DropdownTrigger asChild>
    <Button>Open Menu</Button>
  </DropdownTrigger>
  <DropdownContent>
    <DropdownItem onSelect={() => console.log('Edit')}>
      Edit
    </DropdownItem>
    <DropdownItem onSelect={() => console.log('Delete')}>
      Delete
    </DropdownItem>
  </DropdownContent>
</Dropdown>

// With groups and separators
<Dropdown>
  <DropdownTrigger asChild>
    <Button>Actions</Button>
  </DropdownTrigger>
  <DropdownContent>
    <DropdownLabel>File</DropdownLabel>
    <DropdownItem onSelect={...}>New</DropdownItem>
    <DropdownItem onSelect={...}>Open</DropdownItem>
    <DropdownSeparator />
    <DropdownLabel>Edit</DropdownLabel>
    <DropdownItem onSelect={...}>Cut</DropdownItem>
    <DropdownItem onSelect={...}>Copy</DropdownItem>
  </DropdownContent>
</Dropdown>

// Positioning
<DropdownContent side="top" align="start">
  ...
</DropdownContent>`;

/** Live render of {@link usageSource}, used on the Dropdown demo page. */
export const UsageExample = () => (
  <>
    <Dropdown>
      <DropdownTrigger asChild>
        <Button>Open Menu</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem onSelect={() => console.log("Edit")}>Edit</DropdownItem>
        <DropdownItem onSelect={() => console.log("Delete")}>
          Delete
        </DropdownItem>
      </DropdownContent>
    </Dropdown>

    <Dropdown>
      <DropdownTrigger asChild>
        <Button variant="secondary">Actions</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownLabel>File</DropdownLabel>
        <DropdownItem onSelect={() => console.log("New")}>New</DropdownItem>
        <DropdownItem onSelect={() => console.log("Open")}>Open</DropdownItem>
        <DropdownSeparator />
        <DropdownLabel>Edit</DropdownLabel>
        <DropdownItem onSelect={() => console.log("Cut")}>Cut</DropdownItem>
        <DropdownItem onSelect={() => console.log("Copy")}>Copy</DropdownItem>
      </DropdownContent>
    </Dropdown>
  </>
);
