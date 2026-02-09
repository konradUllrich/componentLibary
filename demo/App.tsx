import React from "react";
import { ThemePanel } from "../common";
import { SidebarMobileToggle, AppLayout } from "../layout";
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
} from "./pages";
import { useAppNavigation } from "./useAppNavigation";
import "./App.css";
import "./pages/ComponentPage.css";
import { DemoSideBar } from "./SideBar";
import { HomePage } from "./pages/HomePage";
import { ComponentsPage } from "./pages/ComponentsPage";
import { DocsPage } from "./pages/DocsPage";

export const App: React.FC = () => {
  const { currentPage, currentComponent } = useAppNavigation();

  return (
    <AppLayout
      header={
        <>
          <ThemePanel />
          <SidebarMobileToggle />
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
    </AppLayout>
  );
};
