import { Text } from "../../common";
import { Card, Page, Grid, Section, Flex } from "../../layout";
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
import { useLocation } from "../../Router/hooks";

const COMPONENTS = [
  {
    name: "Button",
    teaser: "Versatile button component with multiple variants",
    icon: <MousePointerClick size={24} />,
    link: "button",
  },
  {
    name: "Badge",
    teaser: "Small status indicators with different colors",
    icon: <Tag size={24} />,
    link: "badge",
  },
  {
    name: "Text",
    teaser: "Flexible text component with styling options",
    icon: <Type size={24} />,
    link: "text",
  },
  {
    name: "Form Controls",
    teaser: "Input, checkbox, radio, and select components",
    icon: <FormInput size={24} />,
    link: "form-controls",
  },
  {
    name: "Panel",
    teaser: "Container component with different styles",
    icon: <RectangleVertical size={24} />,
    link: "panel",
  },
  {
    name: "Accordion",
    teaser: "Collapsible content sections",
    icon: <ChevronDown size={24} />,
    link: "accordion",
  },
  {
    name: "Disclosure",
    teaser: "Simple collapsible content",
    icon: <Eye size={24} />,
    link: "disclosure",
  },
  {
    name: "Pagination",
    teaser: "Navigate through pages of data",
    icon: <ListOrdered size={24} />,
    link: "pagination",
  },
  {
    name: "Tabs",
    teaser: "Tabbed interface with multiple variants",
    icon: <LayoutPanelTop size={24} />,
    link: "tabs",
  },
  {
    name: "User Avatars",
    teaser: "Display user avatars individually or in groups",
    icon: <Users size={24} />,
    link: "user-avatars",
  },
  {
    name: "Date",
    teaser: "Format and display dates in multiple locales",
    icon: <Calendar size={24} />,
    link: "date",
  },
  {
    name: "Table",
    teaser: "Display structured data in table format",
    icon: <Table2 size={24} />,
    link: "table",
  },
  {
    name: "Card List",
    teaser: "Grid of cards for structured content",
    icon: <LayoutGrid size={24} />,
    link: "card-list",
  },
  {
    name: "Card",
    teaser: "Flexible container with variants",
    icon: <CreditCard size={24} />,
    link: "card",
  },
  {
    name: "Flex",
    teaser: "Flexbox layout wrapper component",
    icon: <BoxSelect size={24} />,
    link: "flex",
  },
  {
    name: "Horizontal Nav",
    teaser: "Responsive horizontal navigation",
    icon: <Navigation size={24} />,
    link: "horizontal-nav",
  },
  {
    name: "Sidebar",
    teaser: "Collapsible sidebar navigation",
    icon: <PanelLeft size={24} />,
    link: "sidebar",
  },
  {
    name: "App Layout",
    teaser: "Complete application layout structure",
    icon: <LayoutDashboard size={24} />,
    link: "app-layout",
  },
];

export const HomePage = () => {
  const [, navigate] = useLocation();

  const handleComponentClick = (component: string) => {
    navigate(`/components/${component}`);
  };

  return (
    <Page maxWidth="xl">
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          Component Library
        </Text>
        <Text color="secondary">
          Explore our collection of modern, accessible React components
        </Text>
      </Section>

      <Section>
        <Grid
          data-testid="componentGrid"
          columns="repeat(auto-fill, minmax(250px, 1fr))"
          gap="lg"
        >
          {COMPONENTS.map(({ name, teaser, icon, link }) => (
            <Card
              key={link}
              variant="outlined"
              padding="lg"
              interactive
              onClick={() => handleComponentClick(link)}
              className="component-card"
            >
              <Flex justify="center">{icon}</Flex>
              <Text as="h3" size="lg" weight="semibold">
                {name}
              </Text>
              <Text size="sm" color="secondary">
                {teaser}
              </Text>
            </Card>
          ))}
        </Grid>
      </Section>
    </Page>
  );
};
