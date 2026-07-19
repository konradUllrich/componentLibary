import React from "react";
import { Select } from "../../controls";
import { Text } from "../../common";
import { Flex, Page, Section } from "../../layout";
import { u } from "../../utils";

export const SelectPage: React.FC = () => {
  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          Select Component
        </Text>
        <Text color="secondary">
          Intelligent dropdown that adapts to mobile with native select and uses
          Radix UI on desktop
        </Text>
      </Section>

      <Section title="Basic Select" subtitle="Dropdown with placeholder and options">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Select
            label="Country"
            placeholder="Select an option..."
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
              { value: "3", label: "Option 3" },
            ]}
          />
        </Flex>
      </Section>

      <Section title="Variants" subtitle="Different visual styles">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Select
            label="Default"
            variant="default"
            placeholder="Default variant"
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
            ]}
          />
          <Select
            label="Filled"
            variant="filled"
            placeholder="Filled variant"
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
            ]}
          />
          <Select
            label="Outline"
            variant="outline"
            placeholder="Outline variant"
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
            ]}
          />
        </Flex>
      </Section>

      <Section title="Sizes" subtitle="Three sizes for different layouts">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Select
            label="Small"
            size="sm"
            placeholder="Small select"
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
            ]}
          />
          <Select
            label="Medium"
            size="md"
            placeholder="Medium select"
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
            ]}
          />
          <Select
            label="Large"
            size="lg"
            placeholder="Large select"
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
            ]}
          />
        </Flex>
      </Section>

      <Section title="Error State" subtitle="Select with validation error">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Select
            label="Required field"
            placeholder="Select an option"
            error
            errorMessage="This field is required"
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
            ]}
          />
        </Flex>
      </Section>

      <Section title="Disabled State" subtitle="Non-interactive select">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Select
            label="Disabled"
            placeholder="This select is disabled"
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
          <Select
            label="Options"
            placeholder="Select..."
            options={[
              { value: "1", label: "Available Option" },
              { value: "2", label: "Disabled Option", disabled: true },
              { value: "3", label: "Another Available Option" },
            ]}
          />
        </Flex>
      </Section>

      <Section title="Usage">
        <pre className="code-block">
          <code>{`import { Select } from '@konradullrich/mp-components';

<Select
  label="Country"
  placeholder="Select a country"
  options={[
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
  ]}
  onValueChange={(value) => console.log(value)}
/>

// With error
<Select
  label="Required"
  error
  errorMessage="Please select an option"
  options={[...]}
/>`}</code>
        </pre>
      </Section>
    </Page>
  );
};
