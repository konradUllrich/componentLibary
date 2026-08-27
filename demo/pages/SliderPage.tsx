import React, { ChangeEvent, useState } from "react";
import { Slider } from "../../controls";
import { Text } from "../../common";
import { Flex, Page, Section } from "../../layout";
import { u } from "../../utils";

export const SliderPage: React.FC = () => {
  const [volume, setVolume] = useState(50);
  const [fontSize, setFontSize] = useState(16);
  const [errorValue, setErrorValue] = useState(20);

  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          Slider Component
        </Text>
        <Text color="secondary">
          Styled range input with labels, helper text, and error states
        </Text>
      </Section>

      <Section title="Basic Slider" subtitle="Controlled range input">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Slider
            label={`Volume: ${volume}`}
            value={volume}
            min={0}
            max={100}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setVolume(Number(e.target.value))
            }
          />
        </Flex>
      </Section>

      <Section title="With Step" subtitle="Slider with a custom min, max, and step">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Slider
            label={`Font Size: ${fontSize}px`}
            value={fontSize}
            min={12}
            max={24}
            step={1}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFontSize(Number(e.target.value))
            }
          />
        </Flex>
      </Section>

      <Section title="Error State" subtitle="Slider with validation error">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Slider
            label={`Value: ${errorValue}`}
            value={errorValue}
            min={0}
            max={100}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setErrorValue(Number(e.target.value))
            }
            error
            errorMessage="Value must be at least 30"
          />
        </Flex>
      </Section>

      <Section title="Disabled State" subtitle="Non-interactive slider">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Slider label="Disabled" value={40} disabled />
        </Flex>
      </Section>

      <Section title="Usage">
        <pre className="code-block">
          <code>{`import { Slider } from '@konradullrich/mp-components';

// Controlled slider
const [fontSize, setFontSize] = useState(16);

<Slider
  label={\`Font Size: \${fontSize}px\`}
  value={fontSize}
  min={12}
  max={20}
  onChange={(e) => setFontSize(Number(e.target.value))}
/>

// With error
<Slider
  label="Volume"
  value={volume}
  onChange={(e) => setVolume(Number(e.target.value))}
  error
  errorMessage="Value must be at least 30"
/>`}</code>
        </pre>
      </Section>
    </Page>
  );
};
