import {
  Sidebar,
  SidebarToggle,
  SidebarNav,
  SidebarItem,
  SidebarDivider,
} from "../layout";
import { Text } from "../common";
import {
  Home,
  Sparkles,
  Settings,
  Database,
  Layout,
  ChevronDown,
  Tag,
  MousePointer,
  Calendar,
  MessageSquare,
  EyeOff,
  ChevronRight,
  Rows3,
  Type,
  Info,
  UserCircle,
  FormInput,
  Grid3x3,
  Hash,
  Table,
  LayoutGrid,
  CreditCard,
  AlignHorizontalSpaceAround,
  Menu,
  PanelLeft,
  Sidebar as SidebarIcon,
  Route,
  RectangleHorizontal,
  SquareDashed,
  ToggleLeft,
  Layers,
  GitBranch,
} from "lucide-react";
import { useLocation } from "../Router/hooks";

const SIDEBAR_ELEMENTS = {
  components: {
    common: [
      {
        name: "Accordion",
        icon: <ChevronDown size={16} />,
        link: "/components/accordion",
      },
      { name: "Badge", icon: <Tag size={16} />, link: "/components/badge" },
      {
        name: "Button",
        icon: <MousePointer size={16} />,
        link: "/components/button",
      },
      { name: "Date", icon: <Calendar size={16} />, link: "/components/date" },
      {
        name: "Dialog",
        icon: <MessageSquare size={16} />,
        link: "/components/dialog",
      },
      {
        name: "Disclosure",
        icon: <EyeOff size={16} />,
        link: "/components/disclosure",
      },
      {
        name: "Dropdown",
        icon: <ChevronRight size={16} />,
        link: "/components/dropdown",
      },
      { name: "Tabs", icon: <Rows3 size={16} />, link: "/components/tabs" },
      { name: "Text", icon: <Type size={16} />, link: "/components/text" },
      {
        name: "Tooltip  ",
        icon: <Info size={16} />,
        link: "/components/tooltip",
      },
      {
        name: "User Avatars",
        icon: <UserCircle size={16} />,
        link: "/components/user-avatars",
      },
      { name: "Router", icon: <Route size={16} />, link: "/components/router" },
      {
        name: "Skeleton",
        icon: <RectangleHorizontal size={16} />,
        link: "/components/skeleton",
      },
      {
        name: "Empty State",
        icon: <SquareDashed size={16} />,
        link: "/components/empty-state",
      },
      {
        name: "Toggle",
        icon: <ToggleLeft size={16} />,
        link: "/components/toggle",
      },
      {
        name: "Toggle Group",
        icon: <Layers size={16} />,
        link: "/components/toggle-group",
      },
    ],
    controls: [
      {
        name: "Form Controls",
        icon: <FormInput size={16} />,
        link: "/components/form-controls",
      },
      {
        name: "Form Builder",
        icon: <FormInput size={16} />,
        link: "/components/form-builder",
      },
    ],
    dataDisplay: [
      {
        name: "Card List",
        icon: <Grid3x3 size={16} />,
        link: "/components/card-list",
      },
      {
        name: "Datalist",
        icon: <Table size={16} />,
        link: "/components/datalist",
      },
      {
        name: "Pagination",
        icon: <Hash size={16} />,
        link: "/components/pagination",
      },
      { name: "Table", icon: <Table size={16} />, link: "/components/table" },
    ],
    layout: [
      {
        name: "App Layout",
        icon: <LayoutGrid size={16} />,
        link: "/components/app-layout",
      },
      {
        name: "Card",
        icon: <CreditCard size={16} />,
        link: "/components/card",
      },
      {
        name: "Flex",
        icon: <AlignHorizontalSpaceAround size={16} />,
        link: "/components/flex",
      },
      {
        name: "Horizontal Nav",
        icon: <Menu size={16} />,
        link: "/components/horizontal-nav",
      },
      {
        name: "Panel",
        icon: <PanelLeft size={16} />,
        link: "/components/panel",
      },
      {
        name: "Sidebar",
        icon: <SidebarIcon size={16} />,
        link: "/components/sidebar",
      },
    ],
    intrexx: [
      {
        name: "Intrexx Icon",
        icon: <Type size={16} />,
        link: "/components/intrexx-icon",
      },
      {
        name: "Tree Editor",
        icon: <GitBranch size={16} />,
        link: "/components/tree-editor",
      },
      {
        name: "Icon Picker",
        icon: <Grid3x3 size={16} />,
        link: "/components/icon-picker",
      },
    ],
  },
};

export const DemoSideBar = () => {
  const [location, navigate] = useLocation();

  const handleComponentClick = (component: string) => {
    navigate(`/components/${component}`);
  };

  const isComponentLoaction = (_location: string) => {
    return location === `/components/${_location}`;
  };

  return (
    <Sidebar defaultOpen={true} width="280px">
      <div className="sidebar-header">
        <Text as="h2" size="lg" weight="bold">
          mpComponents
        </Text>
      </div>
      <SidebarToggle />
      <SidebarNav>
        <SidebarItem
          label="Home"
          icon={<Home size={18} />}
          isActive={location === "/"}
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        />
        <SidebarDivider label="Components" />
        <SidebarItem label="Common" icon={<Sparkles size={18} />}>
          {SIDEBAR_ELEMENTS.components.common.map((component) => (
            <SidebarItem
              key={component.name}
              label={component.name}
              icon={component.icon}
              isActive={isComponentLoaction(component.link.split("/").pop()!)}
              onClick={(e) => {
                e.preventDefault();
                handleComponentClick(component.link.split("/").pop()!);
              }}
            />
          ))}
        </SidebarItem>
        <SidebarItem label="Controls" icon={<Settings size={18} />}>
          {SIDEBAR_ELEMENTS.components.controls.map((component) => (
            <SidebarItem
              key={component.name}
              label={component.name}
              icon={component.icon}
              isActive={isComponentLoaction(component.link.split("/").pop()!)}
              onClick={(e) => {
                e.preventDefault();
                handleComponentClick(component.link.split("/").pop()!);
              }}
            />
          ))}
        </SidebarItem>
        <SidebarItem label="Data Display" icon={<Database size={18} />}>
          {SIDEBAR_ELEMENTS.components.dataDisplay.map((component) => (
            <SidebarItem
              key={component.name}
              label={component.name}
              icon={component.icon}
              isActive={isComponentLoaction(component.link.split("/").pop()!)}
              onClick={(e) => {
                e.preventDefault();
                handleComponentClick(component.link.split("/").pop()!);
              }}
            />
          ))}
        </SidebarItem>
        <SidebarItem label="Layout" icon={<Layout size={18} />}>
          {SIDEBAR_ELEMENTS.components.layout.map((component) => (
            <SidebarItem
              key={component.name}
              label={component.name}
              icon={component.icon}
              isActive={isComponentLoaction(component.link.split("/").pop()!)}
              onClick={(e) => {
                e.preventDefault();
                handleComponentClick(component.link.split("/").pop()!);
              }}
            />
          ))}
        </SidebarItem>
        <SidebarItem label="Intrexx" icon={<GitBranch size={18} />}>
          {SIDEBAR_ELEMENTS.components.intrexx.map((component) => (
            <SidebarItem
              key={component.name}
              label={component.name}
              icon={component.icon}
              isActive={isComponentLoaction(component.link.split("/").pop()!)}
              onClick={(e) => {
                e.preventDefault();
                handleComponentClick(component.link.split("/").pop()!);
              }}
            />
          ))}
        </SidebarItem>
      </SidebarNav>
    </Sidebar>
  );
};
