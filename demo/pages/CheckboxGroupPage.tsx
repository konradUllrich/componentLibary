import React, { useState } from "react";
import { CheckboxGroup } from "../../controls";
import { Text } from "../../common";
import { Flex, Page, Section } from "../../layout";
import { u } from "../../utils";

export const CheckboxGroupPage: React.FC = () => {
  const [checkboxGroup, setCheckboxGroup] = useState<string[]>(["option1"]);

  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          CheckboxGroup Component
        </Text>
        <Text color="secondary">
          A group of checkboxes allowing multiple selections with unified state
          management
        </Text>
      </Section>

      <Section title="Vertical Layout" subtitle="Default vertical direction with label">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <CheckboxGroup
            label="Select options"
            options={[
              { value: "option1", label: "Option 1" },
              { value: "option2", label: "Option 2" },
              { value: "option3", label: "Option 3" },
            ]}
            value={checkboxGroup}
            onValueChange={setCheckboxGroup}
          />
        </Flex>
      </Section>

      <Section title="Horizontal Layout" subtitle='Inline arrangement using direction="horizontal"'>
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <CheckboxGroup
            label="Status filters"
            direction="horizontal"
            options={[
              { value: "active", label: "Active" },
              { value: "pending", label: "Pending" },
              { value: "inactive", label: "Inactive" },
            ]}
            value={checkboxGroup}
            onValueChange={setCheckboxGroup}
          />
        </Flex>
      </Section>

      <Section title="With Variants" subtitle="Different checkbox visual styles">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <CheckboxGroup
            label="Filled variant"
            variant="filled"
            direction="horizontal"
            options={[
              { value: "a", label: "Option A" },
              { value: "b", label: "Option B" },
              { value: "c", label: "Option C" },
            ]}
            value={checkboxGroup}
            onValueChange={setCheckboxGroup}
          />
        </Flex>
      </Section>

      <Section title="Error State" subtitle="Group-level validation error">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <CheckboxGroup
            label="Preferences"
            options={[
              { value: "newsletter", label: "Newsletter" },
              { value: "updates", label: "Product updates" },
            ]}
            value={checkboxGroup}
            onValueChange={setCheckboxGroup}
            error
            errorMessage="You must select at least one option"
          />
        </Flex>
      </Section>

      <Section title="Disabled Options" subtitle="Individual options can be disabled">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <CheckboxGroup
            label="Features"
            options={[
              { value: "feature1", label: "Feature 1" },
              { value: "feature2", label: "Feature 2 (disabled)", disabled: true },
              { value: "feature3", label: "Feature 3" },
            ]}
            value={checkboxGroup}
            onValueChange={setCheckboxGroup}
          />
        </Flex>
      </Section>

      <Section title="Usage">
        <pre className="code-block">
          <code>{`import { CheckboxGroup } from '@konradullrich/mp-components';

const [selected, setSelected] = useState<string[]>([]);

// Vertical (default)
<CheckboxGroup
  label="Select options"
  options={[
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
  ]}
  value={selected}
  onValueChange={setSelected}
/>

// Horizontal with variant
<CheckboxGroup
  label="Filters"
  direction="horizontal"
  variant="filled"
  options={[
    { value: "a", label: "Option A" },
    { value: "b", label: "Option B" },
  ]}
  value={selected}
  onValueChange={setSelected}
/>`}</code>
        </pre>
      </Section>
    </Page>
  );
};
