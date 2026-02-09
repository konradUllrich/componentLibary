import React, { useState } from "react";
import { Button } from "../../common";
import { Text } from "../../common";

export const ButtonPage: React.FC = () => {
  return (
    <div className="component-page">
      <div className="component-page__header">
        <Text as="h1" size="3xl" weight="bold">
          Button Component
        </Text>
        <Text color="secondary">
          Versatile button component with multiple variants, sizes, and states
        </Text>
      </div>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">
          Variants
        </Text>
        <Text color="secondary" size="sm">
          Different button styles for various contexts
        </Text>
        <div className="component-page__demo">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </section>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">
          Sizes
        </Text>
        <Text color="secondary" size="sm">
          Different button sizes for different contexts
        </Text>
        <div className="component-page__demo">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">
          States
        </Text>
        <Text color="secondary" size="sm">
          Button states including disabled and loading
        </Text>
        <div className="component-page__demo">
          <Button disabled>Disabled</Button>
          <Button isLoading>Loading</Button>
          <Button variant="secondary" disabled>
            Disabled
          </Button>
          <Button variant="secondary" isLoading>
            Loading
          </Button>
          <Button variant="destructive" disabled>
            Disabled
          </Button>
          <Button variant="destructive" isLoading>
            Loading
          </Button>
          <Button variant="ghost" disabled>
            Disabled
          </Button>
          <Button variant="ghost" isLoading>
            Loading
          </Button>
        </div>
      </section>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">
          Usage
        </Text>
        <pre className="code-block">
          <code>{`import { Button } from '@konradullrich/mp-components';

<Button variant="primary" size="md">
  Click me
</Button>

<Button variant="destructive" disabled>
  Can't click
</Button>

<Button isLoading>
  Processing...
</Button>`}</code>
        </pre>
      </section>
    </div>
  );
};
