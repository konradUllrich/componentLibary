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
  DatalistPage,
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
  EmptyStatePage,
  TogglePage,
  ToggleGroupPage,
  TreeEditorPage,
  IconPickerPage,
  IntrexxIconPage,
} from "./pages";

import "./App.css";
import "./pages/ComponentPage.css";
import { DemoSideBar } from "./SideBar";
import { HomePage } from "./pages/HomePage";
import { UsePersistedStatePage } from "./pages/UsePersistedStatePage";
import { BookOpen, Github, Palette, Home } from "lucide-react";
import { ThemePanel, useThemeEditor } from "../common/ThemeProvider";
import { Route } from "../Router";
import { useLocation } from "../Router/hooks";

export const App: React.FC = () => {
  const [location, navigate] = useLocation(); // Ensure the router's location hook is initialized at the top level of the app
  const { isOpen, toggle } = useThemeEditor();

  console.log({ location });

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
                    id: "home",
                    label: "Home",
                    icon: <Home size={18} />,
                    isActive: location === "/",
                    onClick: () => {
                      navigate("/");
                    },
                  },
                  {
                    id: "use-persisted-state",
                    label: "usePersistedState",
                    icon: <BookOpen size={18} />,
                    isActive: location === "/hooks/use-persisted-state",
                    onClick: () => {
                      navigate("/hooks/use-persisted-state");
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
        <Route
          path="/hooks/use-persisted-state"
          component={UsePersistedStatePage}
        />
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
        <Route path="/components/datalist" component={DatalistPage} />
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
        <Route path="/components/empty-state" component={EmptyStatePage} />
        <Route path="/components/toggle" component={TogglePage} />
        <Route path="/components/toggle-group" component={ToggleGroupPage} />
        <Route path="/components/tree-editor" component={TreeEditorPage} />
        <Route path="/components/intrexx-icon" component={IntrexxIconPage} />
        <Route path="/components/icon-picker" component={IconPickerPage} />
      </AppLayout>
    </>
  );
};
