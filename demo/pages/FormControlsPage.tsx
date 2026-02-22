import React, { ChangeEvent, useState } from "react";
import {
  Input,
  Checkbox,
  Radio,
  Select,
  FormControl,
  CheckboxGroup,
  Combobox,
} from "../../controls";
import { Text } from "../../common";
import { Page, Section } from "../../layout";

export const FormControlsPage: React.FC = () => {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("option1");
  const [checkboxGroup, setCheckboxGroup] = useState<string[]>(["option1"]);
  const [comboboxValue, setComboboxValue] = useState("");

  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          Form Controls
        </Text>
        <Text color="secondary">
          Form input components with validation and error handling
        </Text>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Input
        </Text>
        <Text color="secondary" size="sm">
          Text input with label and helper text
        </Text>
        <div className="component-page__demo-column">
          <FormControl label="Input" helperText="This is a helper text">
            <Input placeholder="Enter text..." />
          </FormControl>

          <FormControl
            label="Input with Error"
            errorMessage="This field is required"
          >
            <Input placeholder="Enter text..." />
          </FormControl>
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Checkbox
        </Text>
        <Text color="secondary" size="sm">
          Single checkbox with label
        </Text>
        <div className="component-page__demo-column">
          <FormControl label="Checkbox">
            <Checkbox
              checked={checkboxChecked}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCheckboxChecked(e.target.checked)
              }
            >
              Accept terms and conditions
            </Checkbox>
          </FormControl>
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Radio Group
        </Text>
        <Text color="secondary" size="sm">
          Multiple radio options
        </Text>
        <div className="component-page__demo-column">
          <FormControl label="Radio Group">
            <div className="component-page__demo-column">
              <Radio
                name="radio-group"
                value="option1"
                checked={radioValue === "option1"}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setRadioValue(e.target.value)
                }
              >
                Option 1
              </Radio>
              <Radio
                name="radio-group"
                value="option2"
                checked={radioValue === "option2"}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setRadioValue(e.target.value)
                }
              >
                Option 2
              </Radio>
            </div>
          </FormControl>
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Checkbox Group
        </Text>
        <Text color="secondary" size="sm">
          Multiple checkbox options
        </Text>
        <div className="component-page__demo-column">
          <FormControl label="Checkbox Group">
            <CheckboxGroup
              options={[
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
                { value: "option3", label: "Option 3" },
              ]}
              value={checkboxGroup}
              onChange={setCheckboxGroup}
            />
          </FormControl>
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Select
        </Text>
        <Text color="secondary" size="sm">
          Dropdown selection
        </Text>
        <div className="component-page__demo-column">
          <FormControl label="Select">
            <Select
              placeholder="Select an option..."
              options={[
                { value: "1", label: "Option 1" },
                { value: "2", label: "Option 2" },
                { value: "3", label: "Option 3" },
              ]}
            />
          </FormControl>
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Combobox
        </Text>
        <Text color="secondary" size="sm">
          Searchable autocomplete dropdown with keyboard navigation
        </Text>
        <div className="component-page__demo-column">
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

          <Combobox
            label="Combobox with Variants"
            placeholder="Filled variant..."
            variant="filled"
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
              { value: "3", label: "Option 3" },
            ]}
          />

          <Combobox
            label="Combobox with Error"
            placeholder="Search..."
            error
            errorMessage="Please select a valid option"
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
              { value: "3", label: "Option 3" },
            ]}
          />

          <Combobox
            label="Disabled Combobox"
            placeholder="This is disabled..."
            disabled
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
            ]}
          />

          <Combobox
            label="With Disabled Options"
            placeholder="Search..."
            options={[
              { value: "1", label: "Available Option 1" },
              { value: "2", label: "Disabled Option", disabled: true },
              { value: "3", label: "Available Option 2" },
            ]}
          />
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Usage
        </Text>
        <pre className="code-block">
          <code>{`import { Input, Checkbox, Select, Combobox, FormControl } from '@konradullrich/mp-components';

<FormControl label="Email" helperText="Enter your email address">
  <Input type="email" placeholder="email@example.com" />
</FormControl>

<FormControl label="Subscribe to newsletter">
  <Checkbox checked={subscribed} onChange={handleChange}>
    Send me updates
  </Checkbox>
</FormControl>

<Combobox
  label="Country"
  placeholder="Search countries..."
  options={[
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
  ]}
  onValueChange={(value) => console.log(value)}
/>`}</code>
        </pre>
      </Section>
    </Page>
  );
};
