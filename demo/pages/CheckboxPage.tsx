import React, { ChangeEvent, useState } from "react";
import { Checkbox } from "../../controls";
import { Text } from "../../common";
import { UsageExample, usageSource } from "../../controls/Checkbox/Checkbox.example";
import { Flex, Page, Section } from "../../layout";
import { u } from "../../utils";

export const CheckBoxPage: React.FC = () => {
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          CheckBox Component
        </Text>
        <Text color="secondary">
          Versatile checkbox with multiple variants, labels, toggle mode, and
          validation states
        </Text>
      </Section>

      <Section title="Variants" subtitle="Different visual styles for various contexts">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <div>
            <Text size="sm" color="secondary" style={{ marginBottom: "0.5rem" }}>
              Default
            </Text>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <Checkbox variant="default" inlineLabel="Default" />
              <Checkbox variant="filled" inlineLabel="Filled" />
              <Checkbox variant="outline" inlineLabel="Outline" />
            </div>
          </div>
        </Flex>
      </Section>

      <Section title="Labels & Inline Labels" subtitle="Support for top labels, inline labels, and required indicators">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <Checkbox
                label="Notifications"
                inlineLabel="Email me updates"
              />
              <Checkbox
                label="Terms"
                inlineLabel="I accept the terms"
                required
              />
              <Checkbox inlineLabel="Inline label only" />
            </div>
          </div>
        </Flex>
      </Section>

      <Section title="Controlled State" subtitle="Managed state with checked and onChange">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Checkbox
            inlineLabel={checkboxChecked ? "Checked" : "Unchecked"}
            checked={checkboxChecked}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCheckboxChecked(e.target.checked)
            }
          />
          <Text size="sm" color="secondary" style={{ marginTop: "0.25rem" }}>
            State: {checkboxChecked ? "checked" : "unchecked"}
          </Text>
        </Flex>
      </Section>

      <Section title="Default Checked" subtitle="Pre-checked state using defaultChecked">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <Checkbox inlineLabel="Pre-checked" defaultChecked />
            <Checkbox inlineLabel="Filled checked" defaultChecked variant="filled" />
          </div>
        </Flex>
      </Section>

      <Section title="Error State" subtitle="Validation error with message">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Checkbox
            label="Terms"
            inlineLabel="I accept the terms"
            error
            errorMessage="You must accept the terms"
          />
        </Flex>
      </Section>

      <Section title="Disabled" subtitle="Non-interactive checkbox states">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <Checkbox inlineLabel="Disabled" disabled />
            <Checkbox inlineLabel="Disabled checked" disabled defaultChecked />
          </div>
        </Flex>
      </Section>

      <Section title="Toggle Switch" subtitle="Checkbox styled as a toggle switch with full state support">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <div>
            <Text size="sm" color="secondary" style={{ marginBottom: "0.5rem" }}>
              Basic
            </Text>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <Checkbox
                variant="toggle"
                label="Notifications"
                inlineLabel="Enable email updates"
              />
              <Checkbox
                variant="toggle"
                inlineLabel="Dark mode"
                defaultChecked
              />
            </div>
          </div>
          <div>
            <Text size="sm" color="secondary" style={{ marginBottom: "0.5rem" }}>
              With helper text
            </Text>
            <Checkbox
              variant="toggle"
              label="Auto-save"
              inlineLabel="Save changes automatically"
              helperText="Changes are saved every 30 seconds"
            />
          </div>
          <div>
            <Text size="sm" color="secondary" style={{ marginBottom: "0.5rem" }}>
              Error state
            </Text>
            <Checkbox
              variant="toggle"
              label="Setting"
              inlineLabel="Enable feature"
              error
              errorMessage="This setting is required"
            />
          </div>
          <div>
            <Text size="sm" color="secondary" style={{ marginBottom: "0.5rem" }}>
              Disabled
            </Text>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <Checkbox variant="toggle" inlineLabel="Disabled toggle" disabled />
              <Checkbox
                variant="toggle"
                inlineLabel="Disabled on"
                disabled
                defaultChecked
              />
            </div>
          </div>
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
