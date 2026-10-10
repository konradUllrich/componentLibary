import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogClose, Button, Flex, Text } from '@mp-ku/mp-components';

export const Open = () => (
  <Dialog open>
    <DialogTrigger asChild>
      <Button>Delete project</Button>
    </DialogTrigger>
    <DialogContent
      size="sm"
      title="Delete project?"
      description="This permanently removes the project and all of its tasks."
    >
      <DialogClose />
      <Text size="sm" color="secondary">You cannot undo this action.</Text>
      <Flex gap="sm" justify="flex-end">
        <Button variant="secondary">Cancel</Button>
        <Button variant="destructive">Delete</Button>
      </Flex>
    </DialogContent>
  </Dialog>
);
