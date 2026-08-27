import React, { useState } from "react";
import { Text } from "../../common";
import { Page, Section, Panel } from "../../layout";
import { IconPicker } from "../../intrexx/IconPicker";
import { usageSource } from "../../intrexx/IconPicker/IconPicker.example";

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

      <Section title="Interactive Demo" subtitle="Search for an icon by name or category, toggle between line and solid styles, and filter by category. Click any icon to select it.">

        {selectedIcon && (
          <Panel variant="subtle">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--mp-spacing-4)",
                flexWrap: "wrap",
              }}
            >
              <i
                className={selectedIcon}
                style={{ fontSize: "2rem", color: "var(--mp-color-primary)" }}
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

      <Section title="Solid Style" subtitle="Use the defaultStyle prop to start with solid icons.">
        <IconPicker defaultStyle="solid" maxHeight="300px" />
      </Section>

      <Section title="Usage">
        <pre className="code-block">
          <code>{usageSource}</code>
        </pre>
      </Section>
    </Page>
  );
};
