import { useNavigate } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarToggle,
  SidebarNav,
  SidebarItem,
  SidebarSubItem,
} from "../layout";
import { Text } from "../common";
import { useAppNavigation } from "./useAppNavigation";

export const DemoSideBar = () => {
  const { currentPage, currentComponent, navigateTo, isRouteActive } =
    useAppNavigation();

  const handleComponentClick = (component: string) => {
    navigateTo(`/components/${component}`);
  };

  const handleComponentsClick = () => {
    navigateTo("/components");
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
          icon="🏠"
          isActive={currentPage === "home"}
          onClick={(e) => {
            e.preventDefault();
            navigateTo("/");
          }}
        />
        <SidebarItem
          label="Components"
          icon="🧩"
          isActive={currentPage === "components" && !currentComponent}
          onClick={(e) => {
            e.preventDefault();
            navigateTo("/components");
          }}
        >
          <SidebarSubItem
            label="Button"
            isActive={currentComponent === "button"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("button");
            }}
          />
          <SidebarSubItem
            label="Badge"
            isActive={currentComponent === "badge"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("badge");
            }}
          />
          <SidebarSubItem
            label="Text"
            isActive={currentComponent === "text"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("text");
            }}
          />
          <SidebarSubItem
            label="Form Controls"
            isActive={currentComponent === "form-controls"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("form-controls");
            }}
          />
          <SidebarSubItem
            label="Panel"
            isActive={currentComponent === "panel"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("panel");
            }}
          />
          <SidebarSubItem
            label="Accordion"
            isActive={currentComponent === "accordion"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("accordion");
            }}
          />
          <SidebarSubItem
            label="Disclosure"
            isActive={currentComponent === "disclosure"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("disclosure");
            }}
          />
          <SidebarSubItem
            label="Pagination"
            isActive={currentComponent === "pagination"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("pagination");
            }}
          />
          <SidebarSubItem
            label="Tabs"
            isActive={currentComponent === "tabs"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("tabs");
            }}
          />
          <SidebarSubItem
            label="User Avatars"
            isActive={currentComponent === "user-avatars"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("user-avatars");
            }}
          />
          <SidebarSubItem
            label="Date"
            isActive={currentComponent === "date"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("date");
            }}
          />
          <SidebarSubItem
            label="Table"
            isActive={currentComponent === "table"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("table");
            }}
          />
          <SidebarSubItem
            label="Card List"
            isActive={currentComponent === "card-list"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("card-list");
            }}
          />
          <SidebarSubItem
            label="Card"
            isActive={currentComponent === "card"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("card");
            }}
          />
          <SidebarSubItem
            label="Flex"
            isActive={currentComponent === "flex"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("flex");
            }}
          />
          <SidebarSubItem
            label="Horizontal Nav"
            isActive={currentComponent === "horizontal-nav"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("horizontal-nav");
            }}
          />
          <SidebarSubItem
            label="Sidebar"
            isActive={currentComponent === "sidebar"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("sidebar");
            }}
          />
          <SidebarSubItem
            label="App Layout"
            isActive={currentComponent === "app-layout"}
            onClick={(e) => {
              e.preventDefault();
              handleComponentClick("app-layout");
            }}
          />
        </SidebarItem>
        <SidebarItem
          label="Documentation"
          icon="📖"
          isActive={currentPage === "docs"}
          onClick={(e) => {
            e.preventDefault();
            navigateTo("/docs");
          }}
        />
        <SidebarItem
          label="GitHub"
          icon="⭐"
          href="https://github.com/konradUllrich/componentLibary"
        />
      </SidebarNav>
    </Sidebar>
  );
};
