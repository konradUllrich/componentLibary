import React, { useState } from 'react';
import { ColorPicker, Flex } from '@mp-ku/mp-components';

export const Default = () => {
  const [color, setColor] = useState('#7c3aed');
  return (
    <ColorPicker
      label="Primary color"
      helperText="Used for buttons and links"
      value={color}
      onValueChange={setColor}
    />
  );
};

export const WithError = () => {
  const [color, setColor] = useState('#fde047');
  return (
    <ColorPicker
      label="Brand color"
      value={color}
      onValueChange={setColor}
      error
      errorMessage="This color does not meet contrast requirements"
    />
  );
};

export const Disabled = () => (
  <Flex direction="column" gap="md">
    <ColorPicker label="Accent color (locked)" value="#0d9488" onValueChange={() => {}} disabled />
  </Flex>
);
