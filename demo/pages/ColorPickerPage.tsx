import React, { useState } from "react";
import { ColorPicker } from "../../controls";
import { Text } from "../../common";
import { UsageExample, usageSource } from "../../controls/ColorPicker/ColorPicker.example";
import { Flex, Page, Section } from "../../layout";
import { u } from "../../utils";

export const ColorPickerPage: React.FC = () => {
  const [color, setColor] = useState("#7c3aed");
  const [errorColor, setErrorColor] = useState("#ff0000");

  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          ColorPicker Component
        </Text>
        <Text color="secondary">
          Native color swatch paired with an editable hex text field
        </Text>
      </Section>

      <Section title="Basic ColorPicker" subtitle="Controlled color value">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <ColorPicker
            label="Primary Color"
            value={color}
            onValueChange={setColor}
          />
        </Flex>
      </Section>

      <Section title="With Helper Text" subtitle="ColorPicker with additional guidance">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <ColorPicker
            label="Accent Color"
            value={color}
            onValueChange={setColor}
            helperText="Used for buttons and links"
          />
        </Flex>
      </Section>

      <Section title="Error State" subtitle="ColorPicker with validation error">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <ColorPicker
            label="Brand Color"
            value={errorColor}
            onValueChange={setErrorColor}
            error
            errorMessage="This color does not meet contrast requirements"
          />
        </Flex>
      </Section>

      <Section title="Disabled State" subtitle="Non-interactive color picker">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <ColorPicker
            label="Disabled"
            value="#94a3b8"
            onValueChange={() => {}}
            disabled
          />
        </Flex>
      </Section>

      <Section title="Usage">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <UsageExample />
        </Flex>
        <pre className="code-block">
          <code>{usageSource}</code>
        </pre>
      </Section>
    </Page>
  );
};
