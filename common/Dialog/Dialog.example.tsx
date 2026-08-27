import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./Dialog";
import { Button } from "../Button/Button";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose
} from '@mp-ku/mp-components';

// Basic usage with title and description props
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent
    title="Dialog Title"
    description="Dialog description"
  >
    <p>Dialog content</p>
    <DialogClose asChild>
      <Button>Close</Button>
    </DialogClose>
  </DialogContent>
</Dialog>

// Custom structure with composed components
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogTitle>Custom Title</DialogTitle>
    <DialogDescription>Custom Description</DialogDescription>
    <div>Custom content</div>
    <DialogClose asChild>
      <Button>Close</Button>
    </DialogClose>
  </DialogContent>
</Dialog>`;

/** Live render of {@link usageSource}, used on the Dialog demo page. */
export const UsageExample = () => {
  const [isBasicOpen, setIsBasicOpen] = useState(false);
  const [isCustomOpen, setIsCustomOpen] = useState(false);

  return (
    <>
      <Dialog open={isBasicOpen} onOpenChange={setIsBasicOpen}>
        <DialogTrigger asChild>
          <Button>Open</Button>
        </DialogTrigger>
        <DialogContent title="Dialog Title" description="Dialog description">
          <p>Dialog content</p>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog open={isCustomOpen} onOpenChange={setIsCustomOpen}>
        <DialogTrigger asChild>
          <Button>Open custom</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Custom Title</DialogTitle>
          <DialogDescription>Custom Description</DialogDescription>
          <div>Custom content</div>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};
