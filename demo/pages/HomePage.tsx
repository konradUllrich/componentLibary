import { Text } from "../../common";
import { Card } from "../../layout";
import { useAppNavigation } from "../useAppNavigation";

export const HomePage = () => {
  const { currentPage, currentComponent, navigateTo, isRouteActive } =
    useAppNavigation();

  const handleComponentClick = (component: string) => {
    navigateTo(`/components/${component}`);
  };

  const handleComponentsClick = () => {
    navigateTo("/components");
  };
  return (
    <div className="component-list">
      <Text as="h1" size="3xl" weight="bold">
        Components
      </Text>
      <Text color="secondary">
        Browse all available components in the library
      </Text>

      <div className="component-grid">
        <Card
          variant="outlined"
          padding="lg"
          interactive
          onClick={() => handleComponentClick("button")}
          style={{ cursor: "pointer" }}
        >
          <Text as="h3" size="lg" weight="semibold">
            Button
          </Text>
          <Text size="sm" color="secondary">
            Versatile button component with multiple variants
          </Text>
        </Card>

        <Card
          variant="outlined"
          padding="lg"
          interactive
          onClick={() => handleComponentClick("badge")}
          style={{ cursor: "pointer" }}
        >
          <Text as="h3" size="lg" weight="semibold">
            Badge
          </Text>
          <Text size="sm" color="secondary">
            Small status indicators with different colors
          </Text>
        </Card>

        <Card
          variant="outlined"
          padding="lg"
          interactive
          onClick={() => handleComponentClick("text")}
          style={{ cursor: "pointer" }}
        >
          <Text as="h3" size="lg" weight="semibold">
            Text
          </Text>
          <Text size="sm" color="secondary">
            Flexible text component with styling options
          </Text>
        </Card>

        <Card
          variant="outlined"
          padding="lg"
          interactive
          onClick={() => handleComponentClick("form-controls")}
          style={{ cursor: "pointer" }}
        >
          <Text as="h3" size="lg" weight="semibold">
            Form Controls
          </Text>
          <Text size="sm" color="secondary">
            Input, checkbox, radio, and select components
          </Text>
        </Card>

        <Card
          variant="outlined"
          padding="lg"
          interactive
          onClick={() => handleComponentClick("panel")}
          style={{ cursor: "pointer" }}
        >
          <Text as="h3" size="lg" weight="semibold">
            Panel
          </Text>
          <Text size="sm" color="secondary">
            Container component with different styles
          </Text>
        </Card>

        <Card
          variant="outlined"
          padding="lg"
          interactive
          onClick={() => handleComponentClick("accordion")}
          style={{ cursor: "pointer" }}
        >
          <Text as="h3" size="lg" weight="semibold">
            Accordion
          </Text>
          <Text size="sm" color="secondary">
            Collapsible content sections
          </Text>
        </Card>

        <Card
          variant="outlined"
          padding="lg"
          interactive
          onClick={() => handleComponentClick("disclosure")}
          style={{ cursor: "pointer" }}
        >
          <Text as="h3" size="lg" weight="semibold">
            Disclosure
          </Text>
          <Text size="sm" color="secondary">
            Simple collapsible content
          </Text>
        </Card>

        <Card
          variant="outlined"
          padding="lg"
          interactive
          onClick={() => handleComponentClick("pagination")}
          style={{ cursor: "pointer" }}
        >
          <Text as="h3" size="lg" weight="semibold">
            Pagination
          </Text>
          <Text size="sm" color="secondary">
            Navigate through pages of data
          </Text>
        </Card>

        <Card
          variant="outlined"
          padding="lg"
          interactive
          onClick={() => handleComponentClick("tabs")}
          style={{ cursor: "pointer" }}
        >
          <Text as="h3" size="lg" weight="semibold">
            Tabs
          </Text>
          <Text size="sm" color="secondary">
            Tabbed interface with multiple variants
          </Text>
        </Card>

        <Card
          variant="outlined"
          padding="lg"
          interactive
          onClick={() => handleComponentClick("user-avatars")}
          style={{ cursor: "pointer" }}
        >
          <Text as="h3" size="lg" weight="semibold">
            User Avatars
          </Text>
          <Text size="sm" color="secondary">
            Display user avatars individually or in groups
          </Text>
        </Card>

        <Card
          variant="outlined"
          padding="lg"
          interactive
          onClick={() => handleComponentClick("date")}
          style={{ cursor: "pointer" }}
        >
          <Text as="h3" size="lg" weight="semibold">
            Date
          </Text>
          <Text size="sm" color="secondary">
            Format and display dates in multiple locales
          </Text>
        </Card>

        <Card
          variant="outlined"
          padding="lg"
          interactive
          onClick={() => handleComponentClick("table")}
          style={{ cursor: "pointer" }}
        >
          <Text as="h3" size="lg" weight="semibold">
            Table
          </Text>
          <Text size="sm" color="secondary">
            Display structured data in table format
          </Text>
        </Card>

        <Card
          variant="outlined"
          padding="lg"
          interactive
          onClick={() => handleComponentClick("card-list")}
          style={{ cursor: "pointer" }}
        >
          <Text as="h3" size="lg" weight="semibold">
            Card List
          </Text>
          <Text size="sm" color="secondary">
            Grid of cards for structured content
          </Text>
        </Card>

        <Card
          variant="outlined"
          padding="lg"
          interactive
          onClick={() => handleComponentClick("card")}
          style={{ cursor: "pointer" }}
        >
          <Text as="h3" size="lg" weight="semibold">
            Card
          </Text>
          <Text size="sm" color="secondary">
            Flexible container with variants
          </Text>
        </Card>

        <Card
          variant="outlined"
          padding="lg"
          interactive
          onClick={() => handleComponentClick("flex")}
          style={{ cursor: "pointer" }}
        >
          <Text as="h3" size="lg" weight="semibold">
            Flex
          </Text>
          <Text size="sm" color="secondary">
            Flexbox layout wrapper component
          </Text>
        </Card>

        <Card
          variant="outlined"
          padding="lg"
          interactive
          onClick={() => handleComponentClick("horizontal-nav")}
          style={{ cursor: "pointer" }}
        >
          <Text as="h3" size="lg" weight="semibold">
            Horizontal Nav
          </Text>
          <Text size="sm" color="secondary">
            Responsive horizontal navigation
          </Text>
        </Card>

        <Card
          variant="outlined"
          padding="lg"
          interactive
          onClick={() => handleComponentClick("sidebar")}
          style={{ cursor: "pointer" }}
        >
          <Text as="h3" size="lg" weight="semibold">
            Sidebar
          </Text>
          <Text size="sm" color="secondary">
            Collapsible sidebar navigation
          </Text>
        </Card>

        <Card
          variant="outlined"
          padding="lg"
          interactive
          onClick={() => handleComponentClick("app-layout")}
          style={{ cursor: "pointer" }}
        >
          <Text as="h3" size="lg" weight="semibold">
            App Layout
          </Text>
          <Text size="sm" color="secondary">
            Complete application layout structure
          </Text>
        </Card>
      </div>
    </div>
  );
};
