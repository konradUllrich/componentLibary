import React from 'react';
import { 
  TooltipProvider, 
  Tooltip, 
  TooltipTrigger, 
  TooltipContent,
  Button,
  Text 
} from '../../common';

export const TooltipPage: React.FC = () => {
  return (
    <div className="component-page">
      <div className="component-page__header">
        <Text as="h1" size="3xl" weight="bold">Tooltip Component</Text>
        <Text color="secondary">
          Accessible tooltip with hover/focus triggers, configurable delays, and positioning
        </Text>
      </div>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Basic Tooltip</Text>
        <Text color="secondary" size="sm">
          Simple tooltip that appears on hover or focus
        </Text>
        <div className="component-page__demo">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button>Hover me</Button>
              </TooltipTrigger>
              <TooltipContent>
                This is a helpful tooltip
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </section>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Tooltip Positioning</Text>
        <Text color="secondary" size="sm">
          Tooltips can be positioned on different sides of the trigger
        </Text>
        <div className="component-page__demo component-page__demo--centered">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost">Top</Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                Tooltip on top
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost">Right</Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                Tooltip on right
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost">Bottom</Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Tooltip on bottom
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost">Left</Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                Tooltip on left
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </section>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">With Different Variants</Text>
        <Text color="secondary" size="sm">
          Tooltips work with all button variants and other components
        </Text>
        <div className="component-page__demo">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="primary">Primary</Button>
              </TooltipTrigger>
              <TooltipContent>
                Primary action button
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary">Secondary</Button>
              </TooltipTrigger>
              <TooltipContent>
                Secondary action button
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="destructive">Destructive</Button>
              </TooltipTrigger>
              <TooltipContent>
                Dangerous action - use with caution
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost">Ghost</Button>
              </TooltipTrigger>
              <TooltipContent>
                Subtle action button
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </section>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Custom Delay</Text>
        <Text color="secondary" size="sm">
          Customize the delay before tooltips appear
        </Text>
        <div className="component-page__demo">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button>Instant (0ms)</Button>
              </TooltipTrigger>
              <TooltipContent>
                Appears immediately
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={700}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button>Default (700ms)</Button>
              </TooltipTrigger>
              <TooltipContent>
                Default delay
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={1500}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button>Slow (1500ms)</Button>
              </TooltipTrigger>
              <TooltipContent>
                Longer delay before appearing
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </section>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Long Content</Text>
        <Text color="secondary" size="sm">
          Tooltips automatically wrap long content
        </Text>
        <div className="component-page__demo">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button>Hover for long text</Button>
              </TooltipTrigger>
              <TooltipContent>
                This is a longer tooltip text that demonstrates how tooltips handle 
                multiple lines of content. The text will wrap automatically within 
                the maximum width constraint.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </section>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Accessibility Features</Text>
        <Text color="secondary" size="sm">
          Tooltip behavior and keyboard support
        </Text>
        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
          <li><Text size="sm"><strong>Hover</strong> - Shows tooltip when mouse hovers over trigger</Text></li>
          <li><Text size="sm"><strong>Focus</strong> - Shows tooltip when trigger receives keyboard focus</Text></li>
          <li><Text size="sm"><strong>Blur</strong> - Hides tooltip when trigger loses focus</Text></li>
          <li><Text size="sm"><strong>Pointer leave</strong> - Hides tooltip when mouse leaves</Text></li>
          <li><Text size="sm"><strong>Role tooltip</strong> - Proper ARIA role for screen readers</Text></li>
        </ul>
      </section>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Usage</Text>
        <pre className="code-block">
          <code>{`import { 
  TooltipProvider, 
  Tooltip, 
  TooltipTrigger, 
  TooltipContent 
} from '@konradullrich/mp-components';

// Wrap your app or section with TooltipProvider
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button>Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      Helpful information
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

// Custom positioning
<Tooltip>
  <TooltipTrigger asChild>
    <Button>Hover</Button>
  </TooltipTrigger>
  <TooltipContent side="right" align="start">
    Tooltip text
  </TooltipContent>
</Tooltip>

// Custom delay
<TooltipProvider delayDuration={0}>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button>Instant</Button>
    </TooltipTrigger>
    <TooltipContent>
      Appears immediately
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`}</code>
        </pre>
      </section>
    </div>
  );
};
