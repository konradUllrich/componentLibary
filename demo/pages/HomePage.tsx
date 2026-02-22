import { Text } from "../../common";
import { Card, Page } from "../../layout";
import { useAppNavigation } from "../useAppNavigation";
import {
  MousePointerClick,
  Tag,
  Type,
  FormInput,
  RectangleVertical,
  ChevronDown,
  Eye,
  ListOrdered,
  LayoutPanelTop,
  Users,
  Calendar,
  Table2,
  LayoutGrid,
  CreditCard,
  BoxSelect,
  Navigation,
  PanelLeft,
  LayoutDashboard,
} from "lucide-react";
import "./HomePage.css";

export const HomePage = () => {
  const { navigateTo } =
    useAppNavigation();

  const handleComponentClick = (component: string) => {
    navigateTo(`/components/${component}`);
  };

  return (
    <Page maxWidth="xl">
      <div className="home-header">
        <Text as="h1" size="3xl" weight="bold">
          Component Library
        </Text>
        <Text color="secondary" size="lg">
          Explore our collection of modern, accessible React components
        </Text>
      </div>

      <div className="component-grid">
        <Card
          variant="outlined"
          padding="lg"
          interactive
          onClick={() => handleComponentClick("button")}
          className="component-card"
        >
          <div className="component-card__icon">
            <MousePointerClick size={24} />
          </div>
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
          className="component-card"
        >
          <div className="component-card__icon">
            <Tag size={24} />
          </div>
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
          className="component-card"
        >
          <div className="component-card__icon">
            <Type size={24} />
          </div>
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
          className="component-card"
        >
          <div className="component-card__icon">
            <FormInput size={24} />
          </div>
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
          className="component-card"
        >
          <div className="component-card__icon">
            <RectangleVertical size={24} />
          </div>
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
          className="component-card"
        >
          <div className="component-card__icon">
            <ChevronDown size={24} />
          </div>
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
          className="component-card"
        >
          <div className="component-card__icon">
            <Eye size={24} />
          </div>
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
          className="component-card"
        >
          <div className="component-card__icon">
            <ListOrdered size={24} />
          </div>
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
          className="component-card"
        >
          <div className="component-card__icon">
            <LayoutPanelTop size={24} />
          </div>
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
          className="component-card"
        >
          <div className="component-card__icon">
            <Users size={24} />
          </div>
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
          className="component-card"
        >
          <div className="component-card__icon">
            <Calendar size={24} />
          </div>
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
          className="component-card"
        >
          <div className="component-card__icon">
            <Table2 size={24} />
          </div>
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
          className="component-card"
        >
          <div className="component-card__icon">
            <LayoutGrid size={24} />
          </div>
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
          className="component-card"
        >
          <div className="component-card__icon">
            <CreditCard size={24} />
          </div>
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
          className="component-card"
        >
          <div className="component-card__icon">
            <BoxSelect size={24} />
          </div>
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
          className="component-card"
        >
          <div className="component-card__icon">
            <Navigation size={24} />
          </div>
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
          className="component-card"
        >
          <div className="component-card__icon">
            <PanelLeft size={24} />
          </div>
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
          className="component-card"
        >
          <div className="component-card__icon">
            <LayoutDashboard size={24} />
          </div>
          <Text as="h3" size="lg" weight="semibold">
            App Layout
          </Text>
          <Text size="sm" color="secondary">
            Complete application layout structure
          </Text>
        </Card>
      </div>
    </Page>
  );
};
