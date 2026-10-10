import React, { useState } from 'react';
import { Slider, Flex } from '@mp-ku/mp-components';

export const Default = () => {
  const [fontSize, setFontSize] = useState(16);
  return (
    <Slider
      label={`Font size: ${fontSize}px`}
      value={fontSize}
      min={12}
      max={20}
      onChange={(e) => setFontSize(Number(e.target.value))}
    />
  );
};

export const WithHelper = () => {
  const [volume, setVolume] = useState(70);
  return (
    <Slider
      label={`Volume: ${volume}%`}
      helperText="Applies to all notification sounds"
      value={volume}
      min={0}
      max={100}
      onChange={(e) => setVolume(Number(e.target.value))}
    />
  );
};

export const States = () => {
  const [opacity, setOpacity] = useState(20);
  return (
    <Flex direction="column" gap="md">
      <Slider label="Line height: 1.5" value={15} min={10} max={20} disabled onChange={() => {}} />
      <Slider
        label={`Opacity: ${opacity}%`}
        value={opacity}
        min={0}
        max={100}
        onChange={(e) => setOpacity(Number(e.target.value))}
        error
        errorMessage="Value must be at least 30"
      />
    </Flex>
  );
};
