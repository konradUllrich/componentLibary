import React, { useState } from 'react';
import { ComponentShowcase } from '../ComponentShowcase';
import { Text } from '../common';
import {
  ButtonPage,
  BadgePage,
  TextPage,
  FormControlsPage,
  PanelPage,
  AccordionPage,
  DisclosurePage,
  PaginationPage,
} from './pages';
import './App.css';
import './pages/ComponentPage.css';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'components' | 'docs'>('home');
  const [currentComponent, setCurrentComponent] = useState<string | null>(null);

  const handleComponentClick = (component: string) => {
    setCurrentPage('components');
    setCurrentComponent(component);
  };

  const handleComponentsClick = () => {
    setCurrentPage('components');
    setCurrentComponent(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-content">
          <div className="app-logo">
            <Text as="h1" size="xl" weight="bold">mpComponents</Text>
          </div>
          <nav className="app-nav">
            <button 
              className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => {
                setCurrentPage('home');
                setCurrentComponent(null);
              }}
            >
              Home
            </button>
            <button 
              className={`nav-link ${currentPage === 'components' ? 'active' : ''}`}
              onClick={handleComponentsClick}
            >
              Components
            </button>
            <button 
              className={`nav-link ${currentPage === 'docs' ? 'active' : ''}`}
              onClick={() => {
                setCurrentPage('docs');
                setCurrentComponent(null);
              }}
            >
              Documentation
            </button>
            <a 
              href="https://github.com/konradUllrich/componentLibary" 
              target="_blank" 
              rel="noopener noreferrer"
              className="nav-link"
            >
              GitHub
            </a>
          </nav>
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
                  onClick={() => setCurrentPage('components')}
                >
                  View Components
                </button>
                <button 
                  className="button button-secondary"
                  onClick={() => setCurrentPage('docs')}
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
  );
};
