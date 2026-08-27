import React, { useState } from "react";
import { Toggle, Text } from "../../common";
import { Page, Section, Flex } from "../../layout";
import { Bold, Italic, Underline } from "lucide-react";
import { u } from "../../utils";
import { UsageExample, usageSource } from "../../common/Toggle/Toggle.example";

export const TogglePage: React.FC = () => {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(true);

  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          Toggle Component
        </Text>
        <Text color="secondary">
          A two-state button that can be turned on or off. Built on Radix UI for
          full accessibility with keyboard navigation and ARIA attributes.
        </Text>
      </Section>

      <Section title="Variants" subtitle="Two visual styles: default (ghost) and outline.">

        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <div>
            <Text
              size="sm"
              color="secondary"
              style={{ marginBottom: "0.5rem" }}
            >
              Default
            </Text>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Toggle aria-label="Bold" defaultPressed variant="default">
                <Bold size={16} />
              </Toggle>
              <Toggle aria-label="Italic" variant="default">
                <Italic size={16} />
              </Toggle>
              <Toggle aria-label="Underline" variant="default">
                <Underline size={16} />
              </Toggle>
            </div>
          </div>
          <div>
            <Text
              size="sm"
              color="secondary"
              style={{ marginBottom: "0.5rem" }}
            >
              Outline
            </Text>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Toggle aria-label="Bold" defaultPressed variant="outline">
                <Bold size={16} />
              </Toggle>
              <Toggle aria-label="Italic" variant="outline">
                <Italic size={16} />
              </Toggle>
              <Toggle aria-label="Underline" variant="outline">
                <Underline size={16} />
              </Toggle>
            </div>
          </div>
        </Flex>
      </Section>

      <Section title="Sizes" subtitle="Three sizes to fit different layout contexts.">

        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <div>
            <Text
              size="sm"
              color="secondary"
              style={{ marginBottom: "0.5rem" }}
            >
              Small
            </Text>
            <Toggle size="sm" aria-label="Bold" defaultPressed>
              <Bold size={12} />
            </Toggle>
          </div>
          <div>
            <Text
              size="sm"
              color="secondary"
              style={{ marginBottom: "0.5rem" }}
            >
              Medium (default)
            </Text>
            <Toggle size="md" aria-label="Bold" defaultPressed>
              <Bold size={16} />
            </Toggle>
          </div>
          <div>
            <Text
              size="sm"
              color="secondary"
              style={{ marginBottom: "0.5rem" }}
            >
              Large
            </Text>
            <Toggle size="lg" aria-label="Bold" defaultPressed>
              <Bold size={20} />
            </Toggle>
          </div>
        </Flex>
      </Section>

      <Section title="Controlled" subtitle="Use pressed and onPressedChange for controlled state management.">

        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Toggle
            pressed={isBold}
            onPressedChange={setIsBold}
            aria-label="Bold"
          >
            <Bold size={16} />
            <span style={{ marginLeft: "0.25rem" }}>Bold</span>
          </Toggle>
          <Toggle
            pressed={isItalic}
            onPressedChange={setIsItalic}
            aria-label="Italic"
            variant="outline"
          >
            <Italic size={16} />
            <span style={{ marginLeft: "0.25rem" }}>Italic</span>
          </Toggle>
        </Flex>
        <Text size="sm" color="secondary" style={{ marginTop: "0.75rem" }}>
          Bold: {isBold ? "on" : "off"} · Italic: {isItalic ? "on" : "off"}
        </Text>
      </Section>

      <Section title="Disabled State" subtitle="Disabled toggles are not interactive and appear visually muted.">

        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Toggle aria-label="Bold" disabled>
            <Bold size={16} />
            <span style={{ marginLeft: "0.25rem" }}>Disabled (off)</span>
          </Toggle>
          <Toggle aria-label="Italic" disabled defaultPressed variant="outline">
            <Italic size={16} />
            <span style={{ marginLeft: "0.25rem" }}>Disabled (on)</span>
          </Toggle>
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
