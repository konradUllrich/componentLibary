import React from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  Button,
} from '@mp-ku/mp-components';

// Dropdown does not forward `open`/`defaultOpen` to the Radix root, so the
// preview opens the menu by pressing its trigger once after mount.
const useOpenOnMount = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const trigger = ref.current?.querySelector('button');
    if (!trigger) return;
    trigger.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, button: 0, pointerType: 'mouse' }));
  }, []);
  return ref;
};

export const Open = () => {
  const ref = useOpenOnMount();
  return (
    <div ref={ref} style={{ paddingBottom: 220 }}>
      <Dropdown>
        <DropdownTrigger asChild>
          <Button variant="secondary">Project actions</Button>
        </DropdownTrigger>
        <DropdownContent align="start">
          <DropdownLabel>Project</DropdownLabel>
          <DropdownItem>Rename</DropdownItem>
          <DropdownItem>Duplicate</DropdownItem>
          <DropdownItem disabled>Move to workspace</DropdownItem>
          <DropdownSeparator />
          <DropdownItem>Archive</DropdownItem>
        </DropdownContent>
      </Dropdown>
    </div>
  );
};
