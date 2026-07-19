import React from "react";
import { Input } from "../../controls";
import { Text } from "../../common";
import { Flex, Page, Section } from "../../layout";
import { u } from "../../utils";

export const InputPage: React.FC = () => {
  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          Input Component
        </Text>
        <Text color="secondary">
          Flexible text input with variants, sizes, labels, and validation states
        </Text>
      </Section>

      <Section title="Variants" subtitle="Three visual styles for different contexts">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Input variant="default" placeholder="Default" label="Default" />
          <Input variant="filled" placeholder="Filled" label="Filled" />
          <Input variant="outline" placeholder="Outline" label="Outline" />
        </Flex>
      </Section>

      <Section title="Sizes" subtitle="Three sizes to fit different layout needs">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Input size="sm" placeholder="Small" label="Small" />
          <Input size="md" placeholder="Medium" label="Medium" />
          <Input size="lg" placeholder="Large" label="Large" />
        </Flex>
      </Section>

      <Section title="With Helper Text" subtitle="Contextual help displayed below the input">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Input
            label="Email"
            placeholder="email@example.com"
            helperText="We'll never share your email"
          />
        </Flex>
      </Section>

      <Section title="Error State" subtitle="Validation error with message">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Input
            label="Username"
            placeholder="Enter username"
            error
            errorMessage="This field is required"
          />
        </Flex>
      </Section>

      <Section title="Disabled State" subtitle="Non-interactive input variant">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Input
            label="Disabled"
            placeholder="This input is disabled"
            disabled
          />
        </Flex>
      </Section>

      <Section title="Usage">
        <pre className="code-block">
          <code>{`import { Input } from '@konradullrich/mp-components';

<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  helperText="We'll never share your email"
/>

<Input
  label="Username"
  error
  errorMessage="Username is required"
/>

<Input
  variant="filled"
  size="lg"
  placeholder="Large filled input"
/>`}</code>
        </pre>
      </Section>
    </Page>
  );
};
