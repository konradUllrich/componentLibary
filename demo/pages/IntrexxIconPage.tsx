import React, { useState } from "react";
import { Button, Text } from "../../common";
import { Panel, Page, Section } from "../../layout";
import { IntrexxIcon, type IntrexxIconProps } from "../../intrexx";

const iconOptions = [
  { label: "Bee", baseClass: "Animals-Bee" },
  { label: "Butterfly", baseClass: "Animals-Butterfly" },
  { label: "Cat", baseClass: "Animals-Cat" },
  { label: "Flower", baseClass: "Nature-Flower" },
  { label: "Leaf", baseClass: "Nature-Leaf1" },
] as const;

const sizes = [12, 16, 20, 24, 32, 36, 48] as const;
const colors: IntrexxIconProps["color"][] = [
  "primary",
  "secondary",
  "success",
  "warning",
  "destructive",
  "info",
  "foreground",
];

export const IntrexxIconPage: React.FC = () => {
  const [style, setStyle] = useState<"line" | "solid">("line");
  const [selectedIcon, setSelectedIcon] = useState<string>(
    iconOptions[0].baseClass,
  );

  const iconClass = `${style === "line" ? "icon54-l_" : "icon54-s_"}${selectedIcon}`;

  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          Intrexx Icon
        </Text>
        <Text color="secondary">
          Lightweight wrapper for the Intrexx icon font with consistent sizing
          and semantic color variants.
        </Text>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Interactive Preview
        </Text>
        <Text color="secondary" size="sm">
          Switch between line and solid styles, then pick one of the bundled
          icon font classes to preview the component API in context.
        </Text>

        <Panel variant="subtle">
          <div
            style={{
              display: "flex",
              gap: "var(--spacing-2)",
              flexWrap: "wrap",
              marginBottom: "var(--spacing-4)",
            }}
          >
            <Button
              variant={style === "line" ? "primary" : "secondary"}
              onClick={() => setStyle("line")}
            >
              Line
            </Button>
            <Button
              variant={style === "solid" ? "primary" : "secondary"}
              onClick={() => setStyle("solid")}
            >
              Solid
            </Button>
          </div>

          <div
            style={{
              display: "flex",
              gap: "var(--spacing-2)",
              flexWrap: "wrap",
              marginBottom: "var(--spacing-6)",
            }}
          >
            {iconOptions.map((option) => (
              <Button
                key={option.baseClass}
                variant={
                  selectedIcon === option.baseClass ? "primary" : "ghost"
                }
                onClick={() => setSelectedIcon(option.baseClass)}
              >
                {option.label}
              </Button>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "var(--spacing-4)",
              alignItems: "stretch",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "var(--spacing-4)",
                padding: "var(--spacing-8)",
                borderRadius: "var(--radius-lg)",
                background: "var(--color-background)",
              }}
            >
              <IntrexxIcon iconClass={iconClass} size={48} color="primary" />
              <div style={{ textAlign: "center" }}>
                <Text weight="semibold">{selectedIcon}</Text>
                <Text size="sm" color="secondary">
                  {iconClass}
                </Text>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "var(--spacing-3)",
                padding: "var(--spacing-6)",
                borderRadius: "var(--radius-lg)",
                background: "var(--color-background)",
              }}
            >
              <Text weight="semibold">Why use the wrapper?</Text>
              <Text color="secondary" size="sm">
                It keeps font class usage isolated to the <code>iconClass</code>{" "}
                prop while giving you typed size and color variants.
              </Text>
              <Text color="secondary" size="sm">
                That makes icon styling consistent across toolbars, buttons,
                menus, and tree items without scattering font utility classes.
              </Text>
            </div>
          </div>
        </Panel>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Sizes
        </Text>
        <Text color="secondary" size="sm">
          The component exposes a fixed scale that maps cleanly to the design
          system.
        </Text>
        <div className="component-page__demo">
          {sizes.map((size) => (
            <div
              key={size}
              style={{
                display: "flex",
                minWidth: "88px",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--spacing-3)",
              }}
            >
              <IntrexxIcon
                iconClass={iconClass}
                size={size}
                color="foreground"
              />
              <Text size="sm" color="secondary">
                {size}px
              </Text>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Color Variants
        </Text>
        <Text color="secondary" size="sm">
          Use semantic color names instead of one-off inline styling.
        </Text>
        <div className="component-page__demo">
          {colors.map((color) => (
            <div
              key={color}
              style={{
                display: "flex",
                minWidth: "120px",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--spacing-3)",
              }}
            >
              <IntrexxIcon iconClass={iconClass} size={32} color={color} />
              <Text size="sm" color="secondary">
                {color}
              </Text>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Usage
        </Text>
        <pre className="code-block">
          <code>{`import { IntrexxIcon } from '@mp-ku/mp-components/intrexx';

function Toolbar() {
  return (
    <IntrexxIcon
      iconClass="icon54-l_Animals-Butterfly"
      size={24}
      color="primary"
    />
  );
}`}</code>
        </pre>
      </Section>
    </Page>
  );
};
