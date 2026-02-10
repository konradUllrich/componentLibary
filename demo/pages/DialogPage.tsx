import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose, DialogTrigger, Button, Text } from '../../common';

export const DialogPage: React.FC = () => {
  const [basicOpen, setBasicOpen] = useState(false);
  const [controlledOpen, setControlledOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className="component-page">
      <div className="component-page__header">
        <Text as="h1" size="3xl" weight="bold">Dialog Component</Text>
        <Text color="secondary">
          Accessible modal dialog with focus trap, keyboard navigation, and overlay
        </Text>
      </div>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Basic Dialog</Text>
        <Text color="secondary" size="sm">
          Simple dialog with title and description
        </Text>
        <div className="component-page__demo">
          <Dialog open={basicOpen} onOpenChange={setBasicOpen}>
            <DialogTrigger asChild>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent title="Welcome" description="This is a basic dialog example">
              <Text>This dialog demonstrates the basic usage with title and description.</Text>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                <DialogClose asChild>
                  <Button variant="secondary">Close</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Custom Content</Text>
        <Text color="secondary" size="sm">
          Dialog with custom title, description, and content structure
        </Text>
        <div className="component-page__demo">
          <Dialog open={controlledOpen} onOpenChange={setControlledOpen}>
            <DialogTrigger asChild>
              <Button variant="primary">Open Custom Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Custom Dialog Title</DialogTitle>
              <DialogDescription>
                You can compose the dialog content with custom elements and layout.
              </DialogDescription>
              <div style={{ padding: '1rem 0' }}>
                <Text weight="semibold">Dialog Body</Text>
                <Text size="sm" color="secondary">
                  Add any content you need here. The dialog handles focus trapping and 
                  keyboard navigation automatically.
                </Text>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                <DialogClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button>Confirm</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Confirmation Dialog</Text>
        <Text color="secondary" size="sm">
          Dialog for confirming destructive actions
        </Text>
        <div className="component-page__demo">
          <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">Delete Item</Button>
            </DialogTrigger>
            <DialogContent 
              title="Confirm Deletion" 
              description="This action cannot be undone."
            >
              <Text>Are you sure you want to delete this item?</Text>
              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                <DialogClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button variant="destructive">Delete</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Keyboard Navigation</Text>
        <Text color="secondary" size="sm">
          Dialog supports keyboard interactions for accessibility
        </Text>
        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
          <li><Text size="sm"><strong>Escape</strong> - Closes the dialog</Text></li>
          <li><Text size="sm"><strong>Tab</strong> - Navigates between focusable elements (trapped within dialog)</Text></li>
          <li><Text size="sm"><strong>Click overlay</strong> - Closes the dialog</Text></li>
        </ul>
      </section>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Usage</Text>
        <pre className="code-block">
          <code>{`import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogTitle, 
  DialogDescription, 
  DialogClose 
} from '@konradullrich/mp-components';

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
</Dialog>`}</code>
        </pre>
      </section>
    </div>
  );
};
