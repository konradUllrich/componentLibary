import React, { useState } from "react";
import { Combobox } from "../../controls";
import { Text } from "../../common";
import { UsageExample, usageSource } from "../../controls/Combobox/Combobox.example";
import { Flex, Page, Section } from "../../layout";
import { u } from "../../utils";

export const ComboboxPage: React.FC = () => {
  const [comboboxValue, setComboboxValue] = useState("");

  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          Combobox Component
        </Text>
        <Text color="secondary">
          Searchable autocomplete dropdown with keyboard navigation and
          accessible options
        </Text>
      </Section>

      <Section title="Basic Combobox" subtitle="Searchable dropdown with controlled value">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Combobox
            label="Country"
            placeholder="Search countries..."
            helperText="Type to filter options"
            options={[
              { value: "us", label: "United States" },
              { value: "uk", label: "United Kingdom" },
              { value: "ca", label: "Canada" },
              { value: "au", label: "Australia" },
              { value: "de", label: "Germany" },
              { value: "fr", label: "France" },
              { value: "it", label: "Italy" },
              { value: "es", label: "Spain" },
              { value: "jp", label: "Japan" },
              { value: "cn", label: "China" },
            ]}
            value={comboboxValue}
            onValueChange={setComboboxValue}
          />
        </Flex>
      </Section>

      <Section title="Variants" subtitle="Different visual styles">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Combobox
            label="Default"
            placeholder="Search..."
            variant="default"
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
            ]}
          />
          <Combobox
            label="Filled"
            placeholder="Search..."
            variant="filled"
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
            ]}
          />
          <Combobox
            label="Outline"
            placeholder="Search..."
            variant="outline"
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
            ]}
          />
        </Flex>
      </Section>

      <Section title="Error State" subtitle="Combobox with validation error">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Combobox
            label="Required selection"
            placeholder="Search..."
            error
            errorMessage="Please select a valid option"
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
              { value: "3", label: "Option 3" },
            ]}
          />
        </Flex>
      </Section>

      <Section title="Disabled State" subtitle="Non-interactive combobox">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Combobox
            label="Disabled"
            placeholder="This is disabled..."
            disabled
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
            ]}
          />
        </Flex>
      </Section>

      <Section title="With Disabled Options" subtitle="Individual options can be disabled">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Combobox
            label="Options"
            placeholder="Search..."
            options={[
              { value: "1", label: "Available Option 1" },
              { value: "2", label: "Disabled Option", disabled: true },
              { value: "3", label: "Available Option 2" },
            ]}
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
