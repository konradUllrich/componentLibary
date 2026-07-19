import React, { ChangeEvent, useState } from "react";
import { Radio } from "../../controls";
import { Text } from "../../common";
import { Flex, Page, Section } from "../../layout";
import { u } from "../../utils";

export const RadioPage: React.FC = () => {
  const [radioValue, setRadioValue] = useState("option1");

  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          Radio Component
        </Text>
        <Text color="secondary">
          Accessible radio input with labels, error states, and controlled
          selection
        </Text>
      </Section>

      <Section title="Basic Radio Group" subtitle="Controlled radio group with inline labels">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Radio
            name="basic-radio"
            value="option1"
            checked={radioValue === "option1"}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRadioValue(e.target.value)
            }
            inlineLabel="Option 1"
          />
          <Radio
            name="basic-radio"
            value="option2"
            checked={radioValue === "option2"}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRadioValue(e.target.value)
            }
            inlineLabel="Option 2"
          />
        </Flex>
      </Section>

      <Section title="With Top Label" subtitle="Radio group with a label above the options">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Radio
            label="Select an option"
            name="labeled-radio"
            value="option1"
            checked={radioValue === "option1"}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRadioValue(e.target.value)
            }
            inlineLabel="Option 1"
          />
          <Radio
            name="labeled-radio"
            value="option2"
            checked={radioValue === "option2"}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRadioValue(e.target.value)
            }
            inlineLabel="Option 2"
          />
        </Flex>
      </Section>

      <Section title="Error State" subtitle="Radio with validation error">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Radio
            label="Choice"
            name="error-radio"
            value="option1"
            checked={radioValue === "option1"}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRadioValue(e.target.value)
            }
            inlineLabel="Option 1"
            error
            errorMessage="You must make a selection"
          />
          <Radio
            name="error-radio"
            value="option2"
            checked={radioValue === "option2"}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRadioValue(e.target.value)
            }
            inlineLabel="Option 2"
            error
          />
        </Flex>
      </Section>

      <Section title="Disabled State" subtitle="Non-interactive radio options">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Radio
            name="disabled-radio"
            value="option1"
            inlineLabel="Disabled"
            disabled
          />
          <Radio
            name="disabled-radio"
            value="option2"
            inlineLabel="Disabled checked"
            disabled
            defaultChecked
          />
        </Flex>
      </Section>

      <Section title="Usage">
        <pre className="code-block">
          <code>{`import { Radio } from '@konradullrich/mp-components';

// Controlled radio group
const [value, setValue] = useState("option1");

<Radio
  name="group"
  value="option1"
  checked={value === "option1"}
  onChange={(e) => setValue(e.target.value)}
  inlineLabel="Option 1"
/>
<Radio
  name="group"
  value="option2"
  checked={value === "option2"}
  onChange={(e) => setValue(e.target.value)}
  inlineLabel="Option 2"
/>

// With error
<Radio
  label="Required choice"
  inlineLabel="Select this"
  error
  errorMessage="You must make a selection"
/>`}</code>
        </pre>
      </Section>
    </Page>
  );
};
