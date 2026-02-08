import React, { ChangeEvent, useState } from "react";
import { Button, Badge, Text, Disclosure, Accordion, Tabs, UserAvatar, UserAvatars, DateComponent } from "./common";
import {
  Input,
  Checkbox,
  Radio,
  Select,
  FormControl,
  CheckboxGroup,
} from "./controls";
import { Panel, Card, CardHeader, CardContent, Flex, HorizontalNav } from "./layout";
import { Pagination, createPaginationStore, Table, TableHeader, TableBody, TableRow, TableCell } from "./data-display";
import "./ComponentShowcase.css";

const paginationStore = createPaginationStore(10);
paginationStore.getState().setTotalItems(100);

/**
 * ComponentShowcase
 *
 * Comprehensive showcase of all mpComponents with their variants.
 */
export const ComponentShowcase: React.FC = () => {
  const [accordionValue, setAccordionValue] = useState("item1");
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("option1");
  const [checkboxGroup, setCheckboxGroup] = useState<string[]>(["option1"]);

  return (
    <div className="showcase">
      <div className="showcase__header">
        <Text as="h1" size="3xl" weight="bold">
          mpComponents Showcase
        </Text>
        <Text color="secondary">
          Comprehensive overview of all components and their variants
        </Text>
      </div>

      {/* Button Section */}
      <section className="showcase__section">
        <Text as="h2" size="2xl" weight="semibold">
          Buttons
        </Text>

        <div className="showcase__group">
          <Text as="h3" size="lg" weight="medium" color="secondary">
            Variants
          </Text>
          <div className="showcase__row">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </div>

        <div className="showcase__group">
          <Text as="h3" size="lg" weight="medium" color="secondary">
            Sizes
          </Text>
          <div className="showcase__row">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>

        <div className="showcase__group">
          <Text as="h3" size="lg" weight="medium" color="secondary">
            States
          </Text>
          <div className="showcase__row">
            <Button disabled>Disabled</Button>
            <Button isLoading>Loading</Button>
          </div>
        </div>
      </section>

      {/* Badge Section */}
      <section className="showcase__section">
        <Text as="h2" size="2xl" weight="semibold">
          Badges
        </Text>

        <div className="showcase__group">
          <Text as="h3" size="lg" weight="medium" color="secondary">
            Variants
          </Text>
          <div className="showcase__row">
            <Badge variant="default">Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </div>

        <div className="showcase__group">
          <Text as="h3" size="lg" weight="medium" color="secondary">
            Appearances
          </Text>
          <div className="showcase__row">
            <Badge appearance="solid">Solid</Badge>
            <Badge appearance="outline">Outline</Badge>
            <Badge appearance="subtle">Subtle</Badge>
          </div>
        </div>
      </section>

      {/* Text Section */}
      <section className="showcase__section">
        <Text as="h2" size="2xl" weight="semibold">
          Text
        </Text>

        <div className="showcase__group">
          <Text as="h3" size="lg" weight="medium" color="secondary">
            Sizes
          </Text>
          <div className="showcase__column">
            <Text size="xs">Extra Small Text</Text>
            <Text size="sm">Small Text</Text>
            <Text size="base">Base Text</Text>
            <Text size="lg">Large Text</Text>
            <Text size="xl">Extra Large Text</Text>
            <Text size="2xl">2XL Text</Text>
            <Text size="3xl">3XL Text</Text>
          </div>
        </div>

        <div className="showcase__group">
          <Text as="h3" size="lg" weight="medium" color="secondary">
            Weights & Colors
          </Text>
          <div className="showcase__column">
            <Text weight="normal">Normal Weight</Text>
            <Text weight="medium">Medium Weight</Text>
            <Text weight="semibold">Semibold Weight</Text>
            <Text weight="bold">Bold Weight</Text>
            <Text color="secondary">Secondary Color</Text>
            <Text color="tertiary">Tertiary Color</Text>
            <Text color="primary">Primary Color</Text>
            <Text color="destructive">Destructive Color</Text>
          </div>
        </div>
      </section>

      {/* Form Controls Section */}
      <section className="showcase__section">
        <Text as="h2" size="2xl" weight="semibold">
          Form Controls
        </Text>

        <div className="showcase__group">
          <FormControl label="Input" helperText="This is a helper text">
            <Input placeholder="Enter text..." />
          </FormControl>

          <FormControl
            label="Input with Error"
            errorMessage="This field is required"
          >
            <Input placeholder="Enter text..." />
          </FormControl>

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

          <FormControl label="Radio Group">
            <div className="showcase__column">
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
      </section>

      {/* Panel Section */}
      <section className="showcase__section">
        <Text as="h2" size="2xl" weight="semibold">
          Panels
        </Text>

        <div className="showcase__group">
          <div className="showcase__column">
            <Panel variant="default" padding="md">
              <Text weight="medium">Default Panel</Text>
              <Text size="sm" color="secondary">
                This is a default panel variant
              </Text>
            </Panel>

            <Panel variant="outlined" padding="md">
              <Text weight="medium">Outlined Panel</Text>
              <Text size="sm" color="secondary">
                This is an outlined panel variant
              </Text>
            </Panel>

            <Panel variant="elevated" padding="md">
              <Text weight="medium">Elevated Panel</Text>
              <Text size="sm" color="secondary">
                This is an elevated panel variant
              </Text>
            </Panel>

            <Panel variant="subtle" padding="md">
              <Text weight="medium">Subtle Panel</Text>
              <Text size="sm" color="secondary">
                This is a subtle panel variant
              </Text>
            </Panel>
          </div>
        </div>
      </section>

      {/* Accordion Section */}
      <section className="showcase__section">
        <Text as="h2" size="2xl" weight="semibold">
          Accordion
        </Text>

        <div className="showcase__group">
          <Text as="h3" size="lg" weight="medium" color="secondary">
            Vertical (Default)
          </Text>
          <Accordion
            items={[
              {
                id: "item1",
                title: "Section 1",
                content: <Text>Content for section 1</Text>,
              },
              {
                id: "item2",
                title: "Section 2",
                content: <Text>Content for section 2</Text>,
              },
              {
                id: "item3",
                title: "Section 3",
                content: <Text>Content for section 3</Text>,
              },
            ]}
            value={accordionValue as string | undefined}
            onValueChange={(value: string | string[] | undefined) =>
              setAccordionValue(
                Array.isArray(value) ? value[0] : value || "item1",
              )
            }
          />
        </div>

        <div className="showcase__group">
          <Text as="h3" size="lg" weight="medium" color="secondary">
            Tabs Variant
          </Text>
          <Accordion
            variant="tabs"
            items={[
              {
                id: "tab1",
                title: "Tab 1",
                content: <Text>Content for tab 1</Text>,
              },
              {
                id: "tab2",
                title: "Tab 2",
                content: <Text>Content for tab 2</Text>,
              },
              {
                id: "tab3",
                title: "Tab 3",
                content: <Text>Content for tab 3</Text>,
              },
            ]}
          />
        </div>
      </section>

      {/* Disclosure Section */}
      <section className="showcase__section">
        <Text as="h2" size="2xl" weight="semibold">
          Disclosure
        </Text>

        <div className="showcase__group">
          <Disclosure label="Click to expand">
            <Text>
              This is collapsible content that can be shown or hidden.
            </Text>
          </Disclosure>
        </div>
      </section>

      {/* Pagination Section */}
      <section className="showcase__section">
        <Text as="h2" size="2xl" weight="semibold">
          Pagination
        </Text>

        <div className="showcase__group">
          <Pagination store={paginationStore} />
        </div>
      </section>

      {/* Tabs Section */}
      <section className="showcase__section">
        <Text as="h2" size="2xl" weight="semibold">
          Tabs
        </Text>

        <div className="showcase__group">
          <Tabs
            items={[
              { id: "tab1", label: "Tab 1", content: <Text>Content for tab 1</Text> },
              { id: "tab2", label: "Tab 2", content: <Text>Content for tab 2</Text> },
              { id: "tab3", label: "Tab 3", content: <Text>Content for tab 3</Text> },
            ]}
          />
        </div>
      </section>

      {/* User Avatars Section */}
      <section className="showcase__section">
        <Text as="h2" size="2xl" weight="semibold">
          User Avatars
        </Text>

        <div className="showcase__group">
          <UserAvatars
            users={[
              { id: "1", name: "John Doe", email: "john@example.com" },
              { id: "2", name: "Jane Smith", email: "jane@example.com" },
              { id: "3", name: "Bob Johnson", email: "bob@example.com" },
            ]}
            maxVisible={3}
            size="sm"
          />
        </div>
      </section>

      {/* Date Component Section */}
      <section className="showcase__section">
        <Text as="h2" size="2xl" weight="semibold">
          Date Component
        </Text>

        <div className="showcase__group">
          <div className="showcase__column">
            <Text>Short: <DateComponent date={new Date()} format="short" /></Text>
            <Text>Long: <DateComponent date={new Date()} format="long" /></Text>
            <Text>DateTime: <DateComponent date={new Date()} format="datetime" /></Text>
          </div>
        </div>
      </section>

      {/* Table Section */}
      <section className="showcase__section">
        <Text as="h2" size="2xl" weight="semibold">
          Table
        </Text>

        <div className="showcase__group">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell as="th">Name</TableCell>
                <TableCell as="th">Email</TableCell>
                <TableCell as="th">Role</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>john@example.com</TableCell>
                <TableCell>Admin</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Jane Smith</TableCell>
                <TableCell>jane@example.com</TableCell>
                <TableCell>User</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Card Section */}
      <section className="showcase__section">
        <Text as="h2" size="2xl" weight="semibold">
          Card
        </Text>

        <div className="showcase__group">
          <div className="showcase__row">
            <Card variant="elevated" padding="md">
              <CardHeader>
                <Text weight="semibold">Card Title</Text>
              </CardHeader>
              <CardContent>
                <Text color="secondary" size="sm">Card content goes here</Text>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Flex Section */}
      <section className="showcase__section">
        <Text as="h2" size="2xl" weight="semibold">
          Flex
        </Text>

        <div className="showcase__group">
          <Flex direction="row" justify="space-between" align="center" gap="md">
            <Button size="sm">Left</Button>
            <Button size="sm">Center</Button>
            <Button size="sm">Right</Button>
          </Flex>
        </div>
      </section>

      {/* Horizontal Nav Section */}
      <section className="showcase__section">
        <Text as="h2" size="2xl" weight="semibold">
          Horizontal Navigation
        </Text>

        <div className="showcase__group">
          <HorizontalNav
            items={[
              { id: "home", label: "Home", href: "#home", isActive: true },
              { id: "about", label: "About", href: "#about" },
              { id: "contact", label: "Contact", href: "#contact" },
            ]}
          />
        </div>
      </section>
    </div>
  );
};

export default ComponentShowcase;
