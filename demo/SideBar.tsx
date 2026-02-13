import {
  Sidebar,
  SidebarToggle,
  SidebarNav,
  SidebarItem,
  SidebarSubItem,
  SidebarDivider,
} from "../layout";
import { Text } from "../common";
import { useAppNavigation } from "./useAppNavigation";
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
} from "lucide-react";

export const DemoSideBar = () => {
  const { currentPage, currentComponent, navigateTo } = useAppNavigation();

  const handleComponentClick = (component: string) => {
    navigateTo(`/components/${component}`);
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
          isActive={currentPage === "home"}
          onClick={(e) => {
            e.preventDefault();
            navigateTo("/");
          }}
        />
        <SidebarDivider label="Components" />
        <SidebarItem label="Common" icon={<Sparkles size={18} />}>
          <SidebarSubItem
            label="Accordion"
            icon={<ChevronDown size={16} />}
            isActive={currentComponent === "accordion"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("accordion");
            }}
          />
          <SidebarSubItem
            label="Badge"
            icon={<Tag size={16} />}
            isActive={currentComponent === "badge"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("badge");
            }}
          />
          <SidebarSubItem
            label="Button"
            icon={<MousePointer size={16} />}
            isActive={currentComponent === "button"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("button");
            }}
          />
          <SidebarSubItem
            label="Date"
            icon={<Calendar size={16} />}
            isActive={currentComponent === "date"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("date");
            }}
          />
          <SidebarSubItem
            label="Dialog"
            icon={<MessageSquare size={16} />}
            isActive={currentComponent === "dialog"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("dialog");
            }}
          />
          <SidebarSubItem
            label="Disclosure"
            icon={<EyeOff size={16} />}
            isActive={currentComponent === "disclosure"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("disclosure");
            }}
          />
          <SidebarSubItem
            label="Dropdown"
            icon={<ChevronRight size={16} />}
            isActive={currentComponent === "dropdown"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("dropdown");
            }}
          />
          <SidebarSubItem
            label="Tabs"
            icon={<Rows3 size={16} />}
            isActive={currentComponent === "tabs"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("tabs");
            }}
          />
          <SidebarSubItem
            label="Text"
            icon={<Type size={16} />}
            isActive={currentComponent === "text"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("text");
            }}
          />
          <SidebarSubItem
            label="Tooltip"
            icon={<Info size={16} />}
            isActive={currentComponent === "tooltip"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("tooltip");
            }}
          />
          <SidebarSubItem
            label="User Avatars"
            icon={<UserCircle size={16} />}
            isActive={currentComponent === "user-avatars"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("user-avatars");
            }}
          />
        </SidebarItem>
        <SidebarItem label="Controls" icon={<Settings size={18} />}>
          <SidebarSubItem
            label="Form Controls"
            icon={<FormInput size={16} />}
            isActive={currentComponent === "form-controls"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("form-controls");
            }}
          />
        </SidebarItem>
        <SidebarItem label="Data Display" icon={<Database size={18} />}>
          <SidebarSubItem
            label="Card List"
            icon={<Grid3x3 size={16} />}
            isActive={currentComponent === "card-list"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("card-list");
            }}
          />
          <SidebarSubItem
            label="Pagination"
            icon={<Hash size={16} />}
            isActive={currentComponent === "pagination"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("pagination");
            }}
          />
          <SidebarSubItem
            label="Table"
            icon={<Table size={16} />}
            isActive={currentComponent === "table"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("table");
            }}
          />
        </SidebarItem>
        <SidebarItem label="Layout" icon={<Layout size={18} />}>
          <SidebarSubItem
            label="App Layout"
            icon={<LayoutGrid size={16} />}
            isActive={currentComponent === "app-layout"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("app-layout");
            }}
          />
          <SidebarSubItem
            label="Card"
            icon={<CreditCard size={16} />}
            isActive={currentComponent === "card"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("card");
            }}
          />
          <SidebarSubItem
            label="Flex"
            icon={<AlignHorizontalSpaceAround size={16} />}
            isActive={currentComponent === "flex"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("flex");
            }}
          />
          <SidebarSubItem
            label="Horizontal Nav"
            icon={<Menu size={16} />}
            isActive={currentComponent === "horizontal-nav"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("horizontal-nav");
            }}
          />
          <SidebarSubItem
            label="Panel"
            icon={<PanelLeft size={16} />}
            isActive={currentComponent === "panel"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("panel");
            }}
          />
          <SidebarSubItem
            label="Sidebar"
            icon={<SidebarIcon size={16} />}
            isActive={currentComponent === "sidebar"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("sidebar");
            }}
          />
        </SidebarItem>
      </SidebarNav>
    </Sidebar>
  );
};
