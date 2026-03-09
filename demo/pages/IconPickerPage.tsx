import React, { useState } from "react";
import { Text } from "../../common";
import { Page, Section, Panel } from "../../layout";
import { IconPicker } from "../../intrexx/IconPicker";

export const IconPickerPage: React.FC = () => {
  const [selectedIcon, setSelectedIcon] = useState<string>("");
  const [selectedName, setSelectedName] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleSelectIcon = (icon: {
    category: string;
    name: string;
    className: string;
  }) => {
    setSelectedIcon(icon.className);
    setSelectedName(icon.name);
    setSelectedCategory(icon.category);
  };

  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          Icon Picker
        </Text>
        <Text color="secondary">
          Browse and select icons from the Intrexx icon font. Supports search,
          category filtering, and line / solid style switching.
        </Text>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Interactive Demo
        </Text>
        <Text color="secondary" size="sm">
          Search for an icon by name or category, toggle between line and solid
          styles, and filter by category. Click any icon to select it.
        </Text>

        {selectedIcon && (
          <Panel variant="subtle">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--spacing-4)",
                flexWrap: "wrap",
              }}
            >
              <i
                className={selectedIcon}
                style={{ fontSize: "2rem", color: "var(--color-primary)" }}
                aria-hidden="true"
              />
              <div>
                <Text weight="semibold">{selectedName}</Text>
                <Text color="secondary" size="sm">
                  {selectedCategory}
                </Text>
                <Text
                  size="sm"
                  color="secondary"
                  style={{ fontFamily: "var(--font-family-mono)" }}
                >
                  {selectedIcon}
                </Text>
              </div>
            </div>
          </Panel>
        )}

        <IconPicker
          onSelectIcon={handleSelectIcon}
          selectedIcon={selectedIcon}
          maxHeight="500px"
        />
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Solid Style
        </Text>
        <Text color="secondary" size="sm">
          Use the <code>defaultStyle</code> prop to start with solid icons.
        </Text>
        <IconPicker defaultStyle="solid" maxHeight="300px" />
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Usage
        </Text>
        <pre className="code-block">
          <code>{`import { IconPicker } from '@mp-ku/mp-components/intrexx';

function MyComponent() {
  const [selectedIcon, setSelectedIcon] = useState('');

  return (
    <IconPicker
      selectedIcon={selectedIcon}
      onSelectIcon={(icon) => setSelectedIcon(icon.className)}
      defaultStyle="line"
      maxHeight="600px"
    />
  );
}`}</code>
        </pre>
      </Section>
    </Page>
  );
};
