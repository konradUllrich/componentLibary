import React from "react";
import { DateComponent, Text } from "../../common";
import { UsageExample, usageSource } from "../../common/Date/Date.example";
import { Flex, Page, Section } from "../../layout";
import { u } from "../../utils";

export const DatePage: React.FC = () => {
  const sampleDate = new Date("2024-03-15T14:30:00");

  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          Date Component
        </Text>
        <Text color="secondary">
          Display formatted dates with multiple format options and locales
        </Text>
      </Section>

      <Section title="Format Options" subtitle="Different date formatting options">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <div>
            <Text weight="medium" size="sm">
              Short format (default):
            </Text>
            <Text>
              <DateComponent date={sampleDate} format="short" />
            </Text>
          </div>
          <div>
            <Text weight="medium" size="sm">
              Long format:
            </Text>
            <Text>
              <DateComponent date={sampleDate} format="long" />
            </Text>
          </div>
          <div>
            <Text weight="medium" size="sm">
              DateTime format:
            </Text>
            <Text>
              <DateComponent date={sampleDate} format="datetime" />
            </Text>
          </div>
          <div>
            <Text weight="medium" size="sm">
              Time only:
            </Text>
            <Text>
              <DateComponent date={sampleDate} format="time" />
            </Text>
          </div>
        </Flex>
      </Section>

      <Section title="Locales" subtitle="Support for different locale formats (default: de-DE)">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <div>
            <Text weight="medium" size="sm">
              German (de-DE):
            </Text>
            <Text>
              <DateComponent date={sampleDate} format="long" locale="de-DE" />
            </Text>
          </div>
          <div>
            <Text weight="medium" size="sm">
              US English (en-US):
            </Text>
            <Text>
              <DateComponent date={sampleDate} format="long" locale="en-US" />
            </Text>
          </div>
          <div>
            <Text weight="medium" size="sm">
              British English (en-GB):
            </Text>
            <Text>
              <DateComponent date={sampleDate} format="long" locale="en-GB" />
            </Text>
          </div>
        </Flex>
      </Section>

      <Section title="Null/Undefined Handling" subtitle="Graceful handling of missing dates with fallback">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <div>
            <Text weight="medium" size="sm">
              Null date (default fallback):
            </Text>
            <Text>
              <DateComponent date={null} />
            </Text>
          </div>
          <div>
            <Text weight="medium" size="sm">
              Null date (custom fallback):
            </Text>
            <Text>
              <DateComponent date={null} fallback="No date available" />
            </Text>
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
