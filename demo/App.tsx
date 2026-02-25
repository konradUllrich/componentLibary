import React from "react";
import { SidebarMobileToggle, AppLayout, HorizontalNav, Flex } from "../layout";
import {
  ButtonPage,
  BadgePage,
  TextPage,
  FormControlsPage,
  FormBuilderPage,
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
  RouterPage,
  SkeletonPage,
} from "./pages";

import "./App.css";
import "./pages/ComponentPage.css";
import { DemoSideBar } from "./SideBar";
import { HomePage } from "./pages/HomePage";
import { DocsPage } from "./pages/DocsPage";
import { BookOpen, Github, Palette } from "lucide-react";
import { ThemePanel, useThemeEditor } from "../common/ThemeProvider";
import { Route } from "../Router";
import { useLocation } from "../Router/hooks";

export const App: React.FC = () => {
  const [location, navigate] = useLocation(); // Ensure the router's location hook is initialized at the top level of the app
  const { isOpen, toggle } = useThemeEditor();

  return (
    <>
      <ThemePanel />
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
                    isActive: location === "docs",
                    onClick: () => {
                      navigate("/docs");
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
                    isActive: isOpen,
                    onClick: (e) => {
                      e.preventDefault();
                      toggle();
                    },
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
        <Route path="/" component={HomePage} />
        <Route path="/docs" component={DocsPage} />
        <Route path="/components/button" component={ButtonPage} />
        <Route path="/components/badge" component={BadgePage} />
        <Route path="/components/text" component={TextPage} />
        <Route path="/components/form-controls" component={FormControlsPage} />
        <Route path="/components/form-builder" component={FormBuilderPage} />
        <Route path="/components/panel" component={PanelPage} />
        <Route path="/components/accordion" component={AccordionPage} />
        <Route path="/components/disclosure" component={DisclosurePage} />
        <Route path="/components/pagination" component={PaginationPage} />
        <Route path="/components/tabs" component={TabsPage} />
        <Route path="/components/user-avatars" component={UserAvatarsPage} />
        <Route path="/components/date" component={DatePage} />
        <Route path="/components/table" component={TablePage} />
        <Route path="/components/card-list" component={CardListPage} />
        <Route path="/components/card" component={CardPage} />
        <Route path="/components/flex" component={FlexPage} />
        <Route
          path="/components/horizontal-nav"
          component={HorizontalNavPage}
        />
        <Route path="/components/sidebar" component={SidebarPage} />
        <Route path="/components/app-layout" component={AppLayoutPage} />
        <Route path="/components/dialog" component={DialogPage} />
        <Route path="/components/dropdown" component={DropdownPage} />
        <Route path="/components/tooltip" component={TooltipPage} />
        <Route path="/components/router" component={RouterPage} />
        <Route path="/components/skeleton" component={SkeletonPage} />
      </AppLayout>
    </>
  );
};
