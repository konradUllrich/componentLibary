import React, { useState } from 'react';
import { Dialog, DialogContent, DialogClose } from './Dialog';

export const DialogWithState = () => {
  const [open, setOpen] = useState(true);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent title="Test">
        <DialogClose>Close</DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export const DialogWithContent = () => {
  const [open, setOpen] = useState(true);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent title="Test">
        <p>Content</p>
      </DialogContent>
    </Dialog>
  );
};
