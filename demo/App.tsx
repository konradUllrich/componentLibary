import React from "react";
import { SidebarMobileToggle, AppLayout, HorizontalNav, Flex } from "../layout";
import {
  ButtonPage,
  BadgePage,
  TextPage,
  FormControlsPage,
  PanelPage,
  AccordionPage,
  DisclosurePage,
  PaginationPage,
  TabsPage,
  UserAvatarsPage,
  DatePage,
  TablePage,
  CardListPage,
  CardPage,
  FlexPage,
  HorizontalNavPage,
  SidebarPage,
  AppLayoutPage,
  DialogPage,
  DropdownPage,
  TooltipPage,
} from "./pages";
import { useAppNavigation } from "./useAppNavigation";
import "./App.css";
import "./pages/ComponentPage.css";
import { DemoSideBar } from "./SideBar";
import { HomePage } from "./pages/HomePage";
import { ComponentsPage } from "./pages/ComponentsPage";
import { DocsPage } from "./pages/DocsPage";
import { BookOpen, Github, Palette } from "lucide-react";

export const App: React.FC = () => {
  const { currentPage, currentComponent, navigateTo } = useAppNavigation();

  return (
    <>
      {/* <ThemePanel /> */}
      <AppLayout
        header={
          <>
            <SidebarMobileToggle />
            <Flex justify="flex-end">
              <HorizontalNav
                items={[
                  {
                    id: "docs",
                    label: "Documentation",
                    icon: <BookOpen size={18} />,
                    isActive: currentPage == "docs",
                    onClick: () => {
                      navigateTo("/docs");
                    },
                  },
                  {
                    id: "github",
                    label: "GitHub",
                    icon: <Github size={18} />,
                    href: "https://github.com/konradUllrich/componentLibary",
                  },
                  {
                    id: "theme",
                    label: "Theme",
                    icon: <Palette size={18} />,
                  },
                ]}
              />
            </Flex>

            {/* <Text as="h1" size="xl" weight="bold">
            mpComponents
          </Text> */}
          </>
        }
        sidebar={<DemoSideBar />}
      >
        {currentPage === "home" && <HomePage />}
        {currentPage === "components" && <ComponentsPage />}
        {currentPage === "docs" && <DocsPage />}
        {currentComponent === "button" && <ButtonPage />}
        {currentComponent === "badge" && <BadgePage />}
        {currentComponent === "text" && <TextPage />}
        {currentComponent === "form-controls" && <FormControlsPage />}
        {currentComponent === "panel" && <PanelPage />}
        {currentComponent === "accordion" && <AccordionPage />}
        {currentComponent === "disclosure" && <DisclosurePage />}
        {currentComponent === "pagination" && <PaginationPage />}
        {currentComponent === "tabs" && <TabsPage />}
        {currentComponent === "user-avatars" && <UserAvatarsPage />}
        {currentComponent === "date" && <DatePage />}
        {currentComponent === "table" && <TablePage />}
        {currentComponent === "card-list" && <CardListPage />}
        {currentComponent === "card" && <CardPage />}
        {currentComponent === "flex" && <FlexPage />}
        {currentComponent === "horizontal-nav" && <HorizontalNavPage />}
        {currentComponent === "sidebar" && <SidebarPage />}
        {currentComponent === "app-layout" && <AppLayoutPage />}
        {currentComponent === "dialog" && <DialogPage />}
        {currentComponent === "dropdown" && <DropdownPage />}
        {currentComponent === "tooltip" && <TooltipPage />}
      </AppLayout>
    </>
  );
};
