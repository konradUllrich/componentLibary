import React, { useState } from "react";
import { Toggle, Text } from "../../common";
import { Page, Section, Panel } from "../../layout";
import { Bold, Italic, Underline } from "lucide-react";

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

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Variants
        </Text>
        <Text color="secondary" size="sm">
          Two visual styles: default (ghost) and outline.
        </Text>
        <Panel variant="subtle">
          <div className="component-page__demo">
            <div>
              <Text size="sm" color="secondary" style={{ marginBottom: "0.5rem" }}>
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
              <Text size="sm" color="secondary" style={{ marginBottom: "0.5rem" }}>
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
          </div>
        </Panel>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Sizes
        </Text>
        <Text color="secondary" size="sm">
          Three sizes to fit different layout contexts.
        </Text>
        <Panel variant="subtle">
          <div className="component-page__demo">
            <div>
              <Text size="sm" color="secondary" style={{ marginBottom: "0.5rem" }}>
                Small
              </Text>
              <Toggle size="sm" aria-label="Bold" defaultPressed>
                <Bold size={12} />
              </Toggle>
            </div>
            <div>
              <Text size="sm" color="secondary" style={{ marginBottom: "0.5rem" }}>
                Medium (default)
              </Text>
              <Toggle size="md" aria-label="Bold" defaultPressed>
                <Bold size={16} />
              </Toggle>
            </div>
            <div>
              <Text size="sm" color="secondary" style={{ marginBottom: "0.5rem" }}>
                Large
              </Text>
              <Toggle size="lg" aria-label="Bold" defaultPressed>
                <Bold size={20} />
              </Toggle>
            </div>
          </div>
        </Panel>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Controlled
        </Text>
        <Text color="secondary" size="sm">
          Use <code>pressed</code> and <code>onPressedChange</code> for
          controlled state management.
        </Text>
        <Panel variant="subtle">
          <div className="component-page__demo">
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
          </div>
          <Text size="sm" color="secondary" style={{ marginTop: "0.75rem" }}>
            Bold: {isBold ? "on" : "off"} · Italic: {isItalic ? "on" : "off"}
          </Text>
        </Panel>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Disabled State
        </Text>
        <Text color="secondary" size="sm">
          Disabled toggles are not interactive and appear visually muted.
        </Text>
        <Panel variant="subtle">
          <div className="component-page__demo">
            <Toggle aria-label="Bold" disabled>
              <Bold size={16} />
              <span style={{ marginLeft: "0.25rem" }}>Disabled (off)</span>
            </Toggle>
            <Toggle aria-label="Italic" disabled defaultPressed variant="outline">
              <Italic size={16} />
              <span style={{ marginLeft: "0.25rem" }}>Disabled (on)</span>
            </Toggle>
          </div>
        </Panel>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Usage
        </Text>
        <pre className="code-block">
          <code>{`import { Toggle } from '@konradullrich/mp-components';

// Uncontrolled – default variant
<Toggle aria-label="Bold" defaultPressed>
  B
</Toggle>

// Controlled
<Toggle
  pressed={isBold}
  onPressedChange={setIsBold}
  aria-label="Bold"
>
  B
</Toggle>

// Outline variant, small size
<Toggle variant="outline" size="sm" aria-label="Italic">
  I
</Toggle>

// Disabled
<Toggle disabled aria-label="Underline">
  U
</Toggle>

// Sizes: "sm" | "md" (default) | "lg"
// Variants: "default" | "outline"`}</code>
        </pre>
      </Section>
    </Page>
  );
};
