import React from 'react';
import { ComponentShowcase } from '../ComponentShowcase';
import { Text, ThemePanel } from '../common';
import {
  Sidebar,
  SidebarToggle,
  SidebarMobileToggle,
  SidebarNav,
  SidebarItem,
  SidebarSubItem,
} from '../layout';
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
} from './pages';
import { useAppNavigation } from './useAppNavigation';
import './App.css';
import './pages/ComponentPage.css';

export const App: React.FC = () => {
  const { currentPage, currentComponent, navigateTo, isRouteActive } = useAppNavigation();

  const handleComponentClick = (component: string) => {
    navigateTo(`/components/${component}`);
  };

  const handleComponentsClick = () => {
    navigateTo('/components');
  };

  return (
    <div className="app app-with-sidebar">
      <ThemePanel />
      <Sidebar defaultOpen={true} width="280px">
        <div className="sidebar-header">
          <Text as="h2" size="lg" weight="bold">mpComponents</Text>
        </div>
        <SidebarToggle />
        <SidebarNav>
          <SidebarItem 
            label="Home" 
            icon="🏠"
            isActive={currentPage === 'home'}
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/');
            }}
          />
          <SidebarItem 
            label="Components" 
            icon="🧩"
            isActive={currentPage === 'components' && !currentComponent}
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/components');
            }}
          >
            <SidebarSubItem 
              label="Button" 
              isActive={currentComponent === 'button'}
              onClick={(e) => {
                e.preventDefault();
                handleComponentClick('button');
              }}
            />
            <SidebarSubItem 
              label="Badge" 
              isActive={currentComponent === 'badge'}
              onClick={(e) => {
                e.preventDefault();
                handleComponentClick('badge');
              }}
            />
            <SidebarSubItem 
              label="Text" 
              isActive={currentComponent === 'text'}
              onClick={(e) => {
                e.preventDefault();
                handleComponentClick('text');
              }}
            />
            <SidebarSubItem 
              label="Form Controls" 
              isActive={currentComponent === 'form-controls'}
              onClick={(e) => {
                e.preventDefault();
                handleComponentClick('form-controls');
              }}
            />
            <SidebarSubItem 
              label="Panel" 
              isActive={currentComponent === 'panel'}
              onClick={(e) => {
                e.preventDefault();
                handleComponentClick('panel');
              }}
            />
            <SidebarSubItem 
              label="Accordion" 
              isActive={currentComponent === 'accordion'}
              onClick={(e) => {
                e.preventDefault();
                handleComponentClick('accordion');
              }}
            />
            <SidebarSubItem 
              label="Disclosure" 
              isActive={currentComponent === 'disclosure'}
              onClick={(e) => {
                e.preventDefault();
                handleComponentClick('disclosure');
              }}
            />
            <SidebarSubItem 
              label="Pagination" 
              isActive={currentComponent === 'pagination'}
              onClick={(e) => {
                e.preventDefault();
                handleComponentClick('pagination');
              }}
            />
            <SidebarSubItem 
              label="Tabs" 
              isActive={currentComponent === 'tabs'}
              onClick={(e) => {
                e.preventDefault();
                handleComponentClick('tabs');
              }}
            />
            <SidebarSubItem 
              label="User Avatars" 
              isActive={currentComponent === 'user-avatars'}
              onClick={(e) => {
                e.preventDefault();
                handleComponentClick('user-avatars');
              }}
            />
            <SidebarSubItem 
              label="Date" 
              isActive={currentComponent === 'date'}
              onClick={(e) => {
                e.preventDefault();
                handleComponentClick('date');
              }}
            />
            <SidebarSubItem 
              label="Table" 
              isActive={currentComponent === 'table'}
              onClick={(e) => {
                e.preventDefault();
                handleComponentClick('table');
              }}
            />
            <SidebarSubItem 
              label="Card List" 
              isActive={currentComponent === 'card-list'}
              onClick={(e) => {
                e.preventDefault();
                handleComponentClick('card-list');
              }}
            />
            <SidebarSubItem 
              label="Card" 
              isActive={currentComponent === 'card'}
              onClick={(e) => {
                e.preventDefault();
                handleComponentClick('card');
              }}
            />
            <SidebarSubItem 
              label="Flex" 
              isActive={currentComponent === 'flex'}
              onClick={(e) => {
                e.preventDefault();
                handleComponentClick('flex');
              }}
            />
            <SidebarSubItem 
              label="Horizontal Nav" 
              isActive={currentComponent === 'horizontal-nav'}
              onClick={(e) => {
                e.preventDefault();
                handleComponentClick('horizontal-nav');
              }}
            />
            <SidebarSubItem 
              label="Sidebar" 
              isActive={currentComponent === 'sidebar'}
              onClick={(e) => {
                e.preventDefault();
                handleComponentClick('sidebar');
              }}
            />
            <SidebarSubItem 
              label="App Layout" 
              isActive={currentComponent === 'app-layout'}
              onClick={(e) => {
                e.preventDefault();
                handleComponentClick('app-layout');
              }}
            />
          </SidebarItem>
          <SidebarItem 
            label="Documentation" 
            icon="📖"
            isActive={currentPage === 'docs'}
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/docs');
            }}
          />
          <SidebarItem 
            label="GitHub" 
            icon="⭐"
            href="https://github.com/konradUllrich/componentLibary"
          />
        </SidebarNav>
      </Sidebar>
      
      <div className="app-content">
        <header className="app-header">
          <div className="app-header-content">
            <SidebarMobileToggle />
            <div className="app-logo">
              <Text as="h1" size="xl" weight="bold">mpComponents</Text>
            </div>
          </div>
        </header>

      <main className="app-main">
        {currentPage === 'home' && (
          <div className="home-page">
            <div className="hero">
              <Text as="h1" size="3xl" weight="bold">
                mpComponents
              </Text>
              <Text size="xl" color="secondary">
                A reusable React component library built with Radix UI primitives and TanStack
              </Text>
              <div className="hero-actions">
                <button 
                  className="button button-primary"
                  onClick={() => navigateTo('/components')}
                >
                  View Components
                </button>
                <button 
                  className="button button-secondary"
                  onClick={() => navigateTo('/docs')}
                >
                  Read Documentation
                </button>
              </div>
            </div>

            <div className="features">
              <div className="feature">
                <Text as="h3" size="lg" weight="semibold">Type-Safe Components</Text>
                <Text color="secondary">Built with TypeScript for full type safety</Text>
              </div>
              <div className="feature">
                <Text as="h3" size="lg" weight="semibold">Radix UI Primitives</Text>
                <Text color="secondary">Accessible, unstyled component foundations</Text>
              </div>
              <div className="feature">
                <Text as="h3" size="lg" weight="semibold">TanStack Integration</Text>
                <Text color="secondary">Advanced form and table handling</Text>
              </div>
              <div className="feature">
                <Text as="h3" size="lg" weight="semibold">CSS-Based Styling</Text>
                <Text color="secondary">Plain CSS for predictable styling</Text>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'components' && (
          <div className="components-page">
            {!currentComponent && (
              <div className="component-list">
                <Text as="h1" size="3xl" weight="bold">Components</Text>
                <Text color="secondary">
                  Browse all available components in the library
                </Text>

                <div className="component-grid">
                  <button 
                    className="component-card"
                    onClick={() => handleComponentClick('button')}
                  >
                    <Text as="h3" size="lg" weight="semibold">Button</Text>
                    <Text size="sm" color="secondary">
                      Versatile button component with multiple variants
                    </Text>
                  </button>

                  <button 
                    className="component-card"
                    onClick={() => handleComponentClick('badge')}
                  >
                    <Text as="h3" size="lg" weight="semibold">Badge</Text>
                    <Text size="sm" color="secondary">
                      Small status indicators with different colors
                    </Text>
                  </button>

                  <button 
                    className="component-card"
                    onClick={() => handleComponentClick('text')}
                  >
                    <Text as="h3" size="lg" weight="semibold">Text</Text>
                    <Text size="sm" color="secondary">
                      Flexible text component with styling options
                    </Text>
                  </button>

                  <button 
                    className="component-card"
                    onClick={() => handleComponentClick('form-controls')}
                  >
                    <Text as="h3" size="lg" weight="semibold">Form Controls</Text>
                    <Text size="sm" color="secondary">
                      Input, checkbox, radio, and select components
                    </Text>
                  </button>

                  <button 
                    className="component-card"
                    onClick={() => handleComponentClick('panel')}
                  >
                    <Text as="h3" size="lg" weight="semibold">Panel</Text>
                    <Text size="sm" color="secondary">
                      Container component with different styles
                    </Text>
                  </button>

                  <button 
                    className="component-card"
                    onClick={() => handleComponentClick('accordion')}
                  >
                    <Text as="h3" size="lg" weight="semibold">Accordion</Text>
                    <Text size="sm" color="secondary">
                      Collapsible content sections
                    </Text>
                  </button>

                  <button 
                    className="component-card"
                    onClick={() => handleComponentClick('disclosure')}
                  >
                    <Text as="h3" size="lg" weight="semibold">Disclosure</Text>
                    <Text size="sm" color="secondary">
                      Simple collapsible content
                    </Text>
                  </button>

                  <button 
                    className="component-card"
                    onClick={() => handleComponentClick('pagination')}
                  >
                    <Text as="h3" size="lg" weight="semibold">Pagination</Text>
                    <Text size="sm" color="secondary">
                      Navigate through pages of data
                    </Text>
                  </button>

                  <button 
                    className="component-card"
                    onClick={() => handleComponentClick('tabs')}
                  >
                    <Text as="h3" size="lg" weight="semibold">Tabs</Text>
                    <Text size="sm" color="secondary">
                      Tabbed interface with multiple variants
                    </Text>
                  </button>

                  <button 
                    className="component-card"
                    onClick={() => handleComponentClick('user-avatars')}
                  >
                    <Text as="h3" size="lg" weight="semibold">User Avatars</Text>
                    <Text size="sm" color="secondary">
                      Display user avatars individually or in groups
                    </Text>
                  </button>

                  <button 
                    className="component-card"
                    onClick={() => handleComponentClick('date')}
                  >
                    <Text as="h3" size="lg" weight="semibold">Date</Text>
                    <Text size="sm" color="secondary">
                      Format and display dates in multiple locales
                    </Text>
                  </button>

                  <button 
                    className="component-card"
                    onClick={() => handleComponentClick('table')}
                  >
                    <Text as="h3" size="lg" weight="semibold">Table</Text>
                    <Text size="sm" color="secondary">
                      Display structured data in table format
                    </Text>
                  </button>

                  <button 
                    className="component-card"
                    onClick={() => handleComponentClick('card-list')}
                  >
                    <Text as="h3" size="lg" weight="semibold">Card List</Text>
                    <Text size="sm" color="secondary">
                      Grid of cards for structured content
                    </Text>
                  </button>

                  <button 
                    className="component-card"
                    onClick={() => handleComponentClick('card')}
                  >
                    <Text as="h3" size="lg" weight="semibold">Card</Text>
                    <Text size="sm" color="secondary">
                      Flexible container with variants
                    </Text>
                  </button>

                  <button 
                    className="component-card"
                    onClick={() => handleComponentClick('flex')}
                  >
                    <Text as="h3" size="lg" weight="semibold">Flex</Text>
                    <Text size="sm" color="secondary">
                      Flexbox layout wrapper component
                    </Text>
                  </button>

                  <button 
                    className="component-card"
                    onClick={() => handleComponentClick('horizontal-nav')}
                  >
                    <Text as="h3" size="lg" weight="semibold">Horizontal Nav</Text>
                    <Text size="sm" color="secondary">
                      Responsive horizontal navigation
                    </Text>
                  </button>

                  <button 
                    className="component-card"
                    onClick={() => handleComponentClick('sidebar')}
                  >
                    <Text as="h3" size="lg" weight="semibold">Sidebar</Text>
                    <Text size="sm" color="secondary">
                      Collapsible sidebar navigation
                    </Text>
                  </button>

                  <button 
                    className="component-card"
                    onClick={() => handleComponentClick('app-layout')}
                  >
                    <Text as="h3" size="lg" weight="semibold">App Layout</Text>
                    <Text size="sm" color="secondary">
                      Complete application layout structure
                    </Text>
                  </button>
                </div>
              </div>
            )}

            {currentComponent === 'button' && <ButtonPage />}
            {currentComponent === 'badge' && <BadgePage />}
            {currentComponent === 'text' && <TextPage />}
            {currentComponent === 'form-controls' && <FormControlsPage />}
            {currentComponent === 'panel' && <PanelPage />}
            {currentComponent === 'accordion' && <AccordionPage />}
            {currentComponent === 'disclosure' && <DisclosurePage />}
            {currentComponent === 'pagination' && <PaginationPage />}
            {currentComponent === 'tabs' && <TabsPage />}
            {currentComponent === 'user-avatars' && <UserAvatarsPage />}
            {currentComponent === 'date' && <DatePage />}
            {currentComponent === 'table' && <TablePage />}
            {currentComponent === 'card-list' && <CardListPage />}
            {currentComponent === 'card' && <CardPage />}
            {currentComponent === 'flex' && <FlexPage />}
            {currentComponent === 'horizontal-nav' && <HorizontalNavPage />}
            {currentComponent === 'sidebar' && <SidebarPage />}
            {currentComponent === 'app-layout' && <AppLayoutPage />}

            {currentComponent && (
              <div className="back-button-container">
                <button 
                  className="button button-secondary"
                  onClick={() => setCurrentComponent(null)}
                >
                  ← Back to Components
                </button>
              </div>
            )}
          </div>
        )}

        {currentPage === 'docs' && (
          <div className="docs-page">
            <Text as="h1" size="3xl" weight="bold">Documentation</Text>
            
            <section className="docs-section">
              <Text as="h2" size="2xl" weight="semibold">Installation</Text>
              <pre className="code-block">
                <code>{`npm install @konradullrich/mp-components
# or
pnpm add @konradullrich/mp-components`}</code>
              </pre>
            </section>

            <section className="docs-section">
              <Text as="h2" size="2xl" weight="semibold">Usage</Text>
              <pre className="code-block">
                <code>{`import { Button, Input, Dialog } from '@konradullrich/mp-components';
import '@konradullrich/mp-components/styles';

export function App() {
  return (
    <div>
      <Button>Click me</Button>
      <Input placeholder="Enter text..." />
    </div>
  );
}`}</code>
              </pre>
            </section>

            <section className="docs-section">
              <Text as="h2" size="2xl" weight="semibold">Component Categories</Text>
              
              <div className="category">
                <Text as="h3" size="xl" weight="semibold">common/</Text>
                <Text color="secondary">General-purpose components used across the app</Text>
                <Text>Button, Badge, Icon, Text, Accordion, Disclosure</Text>
              </div>

              <div className="category">
                <Text as="h3" size="xl" weight="semibold">controls/</Text>
                <Text color="secondary">Form elements and interactive controls</Text>
                <Text>Input, Select, Checkbox, Radio, FormControl</Text>
              </div>

              <div className="category">
                <Text as="h3" size="xl" weight="semibold">data-display/</Text>
                <Text color="secondary">Components that present data</Text>
                <Text>Table, Pagination, CardList, Datalist</Text>
              </div>

              <div className="category">
                <Text as="h3" size="xl" weight="semibold">layout/</Text>
                <Text color="secondary">Page layout components</Text>
                <Text>Panel, Card, Flex, Sidebar, AppLayout, HorizontalNav</Text>
              </div>
            </section>

            <section className="docs-section">
              <Text as="h2" size="2xl" weight="semibold">Features</Text>
              <ul className="feature-list">
                <li>✅ Type-Safe Components — Built with TypeScript</li>
                <li>✅ Radix UI Primitives — Accessible, unstyled component foundations</li>
                <li>✅ TanStack Integration — Advanced form and table handling</li>
                <li>✅ CSS-Based Styling — Plain CSS for predictable styling, no CSS-in-JS</li>
                <li>✅ Barrel Exports — Clean, intuitive import paths</li>
                <li>✅ Fully Reusable — Components for multiple applications</li>
              </ul>
            </section>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <Text size="sm" color="secondary">
          © 2024 mpComponents. Licensed under MIT.
        </Text>
      </footer>
      </div>
    </div>
  );
};
