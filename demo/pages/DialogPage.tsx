import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogTrigger,
  Button,
  Text,
} from "../../common";
import { UsageExample, usageSource } from "../../common/Dialog/Dialog.example";
import { Flex, Page, Section } from "../../layout";
import { u } from "../../utils";

export const DialogPage: React.FC = () => {
  const [basicOpen, setBasicOpen] = useState(false);
  const [controlledOpen, setControlledOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          Dialog Component
        </Text>
        <Text color="secondary">
          Accessible modal dialog with focus trap, keyboard navigation, and
          overlay
        </Text>
      </Section>

      <Section title="Basic Dialog" subtitle="Simple dialog with title and description">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Dialog open={basicOpen} onOpenChange={setBasicOpen}>
            <DialogTrigger asChild>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent
              title="Welcome"
              description="This is a basic dialog example"
            >
              <Text>
                This dialog demonstrates the basic usage with title and
                description.
              </Text>
              <div className="component-page__actions">
                <DialogClose asChild>
                  <Button variant="secondary">Close</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </Flex>
      </Section>

      <Section title="Custom Content" subtitle="Dialog with custom title, description, and content structure">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Dialog open={controlledOpen} onOpenChange={setControlledOpen}>
            <DialogTrigger asChild>
              <Button variant="primary">Open Custom Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Custom Dialog Title</DialogTitle>
              <DialogDescription>
                You can compose the dialog content with custom elements and
                layout.
              </DialogDescription>
              <div style={{ padding: "1rem 0" }}>
                <Text weight="semibold">Dialog Body</Text>
                <Text size="sm" color="secondary">
                  Add any content you need here. The dialog handles focus
                  trapping and keyboard navigation automatically.
                </Text>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  justifyContent: "flex-end",
                }}
              >
                <DialogClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button>Confirm</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </Flex>
      </Section>

      <Section title="Confirmation Dialog" subtitle="Dialog for confirming destructive actions">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">Delete Item</Button>
            </DialogTrigger>
            <DialogContent
              title="Confirm Deletion"
              description="This action cannot be undone."
            >
              <Text>Are you sure you want to delete this item?</Text>
              <div
                style={{
                  marginTop: "1.5rem",
                  display: "flex",
                  gap: "0.5rem",
                  justifyContent: "flex-end",
                }}
              >
                <DialogClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button variant="destructive">Delete</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </Flex>
      </Section>

      <Section title="Keyboard Navigation" subtitle="Dialog supports keyboard interactions for accessibility">
        <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
          <li>
            <Text size="sm">
              <strong>Escape</strong> - Closes the dialog
            </Text>
          </li>
          <li>
            <Text size="sm">
              <strong>Tab</strong> - Navigates between focusable elements
              (trapped within dialog)
            </Text>
          </li>
          <li>
            <Text size="sm">
              <strong>Click overlay</strong> - Closes the dialog
            </Text>
          </li>
        </ul>
      </Section>

      <Section title="Usage">
        <Flex gap="md" className={u({ pt: 4 })}>
          <UsageExample />
        </Flex>
        <pre className="code-block">
          <code>{usageSource}</code>
        </pre>
      </Section>
    </Page>
  );
};
