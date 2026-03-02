import React, { useState } from "react";
import { ToggleGroup, ToggleGroupItem, Text } from "../../common";
import { Page, Section, Panel } from "../../layout";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Bold,
  Italic,
  Underline,
} from "lucide-react";

export const ToggleGroupPage: React.FC = () => {
  const [alignment, setAlignment] = useState<string>("left");
  const [formatting, setFormatting] = useState<string[]>(["bold"]);

  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          ToggleGroup Component
        </Text>
        <Text color="secondary">
          A set of toggle buttons where one or multiple items can be pressed.
          Built on Radix UI with roving focus, keyboard navigation, and full
          ARIA support.
        </Text>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Single Selection
        </Text>
        <Text color="secondary" size="sm">
          Use <code>type="single"</code> for exclusive selection — only one item
          can be active at a time.
        </Text>
        <Panel variant="subtle">
          <div className="component-page__demo">
            <div>
              <Text size="sm" color="secondary" style={{ marginBottom: "0.5rem" }}>
                Uncontrolled
              </Text>
              <ToggleGroup type="single" defaultValue="center" aria-label="Text alignment">
                <ToggleGroupItem value="left" aria-label="Align left">
                  <AlignLeft size={16} />
                </ToggleGroupItem>
                <ToggleGroupItem value="center" aria-label="Align center">
                  <AlignCenter size={16} />
                </ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="Align right">
                  <AlignRight size={16} />
                </ToggleGroupItem>
                <ToggleGroupItem value="justify" aria-label="Justify">
                  <AlignJustify size={16} />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div>
              <Text size="sm" color="secondary" style={{ marginBottom: "0.5rem" }}>
                Controlled — selected: <strong>{alignment || "none"}</strong>
              </Text>
              <ToggleGroup
                type="single"
                value={alignment}
                onValueChange={(v) => setAlignment(v)}
                aria-label="Text alignment controlled"
              >
                <ToggleGroupItem value="left" aria-label="Align left">
                  <AlignLeft size={16} />
                </ToggleGroupItem>
                <ToggleGroupItem value="center" aria-label="Align center">
                  <AlignCenter size={16} />
                </ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="Align right">
                  <AlignRight size={16} />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </Panel>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Multiple Selection
        </Text>
        <Text color="secondary" size="sm">
          Use <code>type="multiple"</code> to allow any number of items to be
          active simultaneously.
        </Text>
        <Panel variant="subtle">
          <div className="component-page__demo">
            <div>
              <Text size="sm" color="secondary" style={{ marginBottom: "0.5rem" }}>
                Uncontrolled
              </Text>
              <ToggleGroup
                type="multiple"
                defaultValue={["bold", "italic"]}
                aria-label="Text formatting"
              >
                <ToggleGroupItem value="bold" aria-label="Bold">
                  <Bold size={16} />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Italic">
                  <Italic size={16} />
                </ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="Underline">
                  <Underline size={16} />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div>
              <Text size="sm" color="secondary" style={{ marginBottom: "0.5rem" }}>
                Controlled — active:{" "}
                <strong>{formatting.length ? formatting.join(", ") : "none"}</strong>
              </Text>
              <ToggleGroup
                type="multiple"
                value={formatting}
                onValueChange={setFormatting}
                aria-label="Text formatting controlled"
              >
                <ToggleGroupItem value="bold" aria-label="Bold">
                  <Bold size={16} />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Italic">
                  <Italic size={16} />
                </ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="Underline">
                  <Underline size={16} />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </Panel>
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
              <ToggleGroup type="single" defaultValue="center" variant="default" aria-label="Alignment default">
                <ToggleGroupItem value="left" aria-label="Align left">
                  <AlignLeft size={16} />
                </ToggleGroupItem>
                <ToggleGroupItem value="center" aria-label="Align center">
                  <AlignCenter size={16} />
                </ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="Align right">
                  <AlignRight size={16} />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div>
              <Text size="sm" color="secondary" style={{ marginBottom: "0.5rem" }}>
                Outline
              </Text>
              <ToggleGroup type="single" defaultValue="center" variant="outline" aria-label="Alignment outline">
                <ToggleGroupItem value="left" aria-label="Align left">
                  <AlignLeft size={16} />
                </ToggleGroupItem>
                <ToggleGroupItem value="center" aria-label="Align center">
                  <AlignCenter size={16} />
                </ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="Align right">
                  <AlignRight size={16} />
                </ToggleGroupItem>
              </ToggleGroup>
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
              <ToggleGroup type="single" defaultValue="left" size="sm" aria-label="Alignment small">
                <ToggleGroupItem value="left" aria-label="Align left">
                  <AlignLeft size={12} />
                </ToggleGroupItem>
                <ToggleGroupItem value="center" aria-label="Align center">
                  <AlignCenter size={12} />
                </ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="Align right">
                  <AlignRight size={12} />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div>
              <Text size="sm" color="secondary" style={{ marginBottom: "0.5rem" }}>
                Medium (default)
              </Text>
              <ToggleGroup type="single" defaultValue="left" size="md" aria-label="Alignment medium">
                <ToggleGroupItem value="left" aria-label="Align left">
                  <AlignLeft size={16} />
                </ToggleGroupItem>
                <ToggleGroupItem value="center" aria-label="Align center">
                  <AlignCenter size={16} />
                </ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="Align right">
                  <AlignRight size={16} />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div>
              <Text size="sm" color="secondary" style={{ marginBottom: "0.5rem" }}>
                Large
              </Text>
              <ToggleGroup type="single" defaultValue="left" size="lg" aria-label="Alignment large">
                <ToggleGroupItem value="left" aria-label="Align left">
                  <AlignLeft size={20} />
                </ToggleGroupItem>
                <ToggleGroupItem value="center" aria-label="Align center">
                  <AlignCenter size={20} />
                </ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="Align right">
                  <AlignRight size={20} />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </Panel>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Disabled State
        </Text>
        <Text color="secondary" size="sm">
          Disable the entire group or individual items.
        </Text>
        <Panel variant="subtle">
          <div className="component-page__demo">
            <div>
              <Text size="sm" color="secondary" style={{ marginBottom: "0.5rem" }}>
                Entire group disabled
              </Text>
              <ToggleGroup
                type="single"
                defaultValue="center"
                disabled
                aria-label="Alignment disabled group"
              >
                <ToggleGroupItem value="left" aria-label="Align left">
                  <AlignLeft size={16} />
                </ToggleGroupItem>
                <ToggleGroupItem value="center" aria-label="Align center">
                  <AlignCenter size={16} />
                </ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="Align right">
                  <AlignRight size={16} />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div>
              <Text size="sm" color="secondary" style={{ marginBottom: "0.5rem" }}>
                Individual item disabled
              </Text>
              <ToggleGroup type="single" defaultValue="left" aria-label="Alignment item disabled">
                <ToggleGroupItem value="left" aria-label="Align left">
                  <AlignLeft size={16} />
                </ToggleGroupItem>
                <ToggleGroupItem value="center" aria-label="Align center" disabled>
                  <AlignCenter size={16} />
                </ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="Align right">
                  <AlignRight size={16} />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </Panel>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Usage
        </Text>
        <pre className="code-block">
          <code>{`import { ToggleGroup, ToggleGroupItem } from '@konradullrich/mp-components';

// Single selection (exclusive)
<ToggleGroup type="single" defaultValue="left" aria-label="Text alignment">
  <ToggleGroupItem value="left" aria-label="Align left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="Align center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right" aria-label="Align right">Right</ToggleGroupItem>
</ToggleGroup>

// Multiple selection (controlled)
<ToggleGroup
  type="multiple"
  value={formatting}
  onValueChange={setFormatting}
  aria-label="Text formatting"
>
  <ToggleGroupItem value="bold" aria-label="Bold">B</ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Italic">I</ToggleGroupItem>
  <ToggleGroupItem value="underline" aria-label="Underline">U</ToggleGroupItem>
</ToggleGroup>

// Outline variant, small size
<ToggleGroup type="single" variant="outline" size="sm" aria-label="Alignment">
  <ToggleGroupItem value="left" aria-label="Left">L</ToggleGroupItem>
  <ToggleGroupItem value="right" aria-label="Right">R</ToggleGroupItem>
</ToggleGroup>

// Disable the entire group
<ToggleGroup type="single" disabled aria-label="Disabled group">
  <ToggleGroupItem value="a">A</ToggleGroupItem>
</ToggleGroup>

// Sizes: "sm" | "md" (default) | "lg"
// Variants: "default" | "outline"`}</code>
        </pre>
      </Section>
    </Page>
  );
};
