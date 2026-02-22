import React from 'react';
import { Flex, Page, Section } from '../../layout';
import { Text, Button } from '../../common';

export const FlexPage: React.FC = () => {
  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">Flex Component</Text>
        <Text color="secondary">
          Flexible wrapper component for creating flexbox layouts
        </Text>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">Direction</Text>
        <Text color="secondary" size="sm">
          Control flex direction (row or column)
        </Text>
        <div className="component-page__demo">
          <div>
            <Text weight="medium" size="sm">Row (default)</Text>
            <Flex direction="row" gap="md" style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
              <div style={{ padding: '0.5rem', background: 'white', borderRadius: '4px' }}>Item 1</div>
              <div style={{ padding: '0.5rem', background: 'white', borderRadius: '4px' }}>Item 2</div>
              <div style={{ padding: '0.5rem', background: 'white', borderRadius: '4px' }}>Item 3</div>
            </Flex>
          </div>
          <div>
            <Text weight="medium" size="sm">Column</Text>
            <Flex direction="column" gap="md" style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
              <div style={{ padding: '0.5rem', background: 'white', borderRadius: '4px' }}>Item 1</div>
              <div style={{ padding: '0.5rem', background: 'white', borderRadius: '4px' }}>Item 2</div>
              <div style={{ padding: '0.5rem', background: 'white', borderRadius: '4px' }}>Item 3</div>
            </Flex>
          </div>
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">Justify Content</Text>
        <Text color="secondary" size="sm">
          Control horizontal alignment
        </Text>
        <div className="component-page__demo">
          <div>
            <Text weight="medium" size="sm">Space Between</Text>
            <Flex justify="space-between" gap="sm" style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
              <Button size="sm">Start</Button>
              <Button size="sm">Middle</Button>
              <Button size="sm">End</Button>
            </Flex>
          </div>
          <div>
            <Text weight="medium" size="sm">Center</Text>
            <Flex justify="center" gap="sm" style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
              <Button size="sm">Button 1</Button>
              <Button size="sm">Button 2</Button>
            </Flex>
          </div>
          <div>
            <Text weight="medium" size="sm">Flex End</Text>
            <Flex justify="flex-end" gap="sm" style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
              <Button size="sm">Button 1</Button>
              <Button size="sm">Button 2</Button>
            </Flex>
          </div>
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">Align Items</Text>
        <Text color="secondary" size="sm">
          Control vertical alignment
        </Text>
        <div className="component-page__demo">
          <div>
            <Text weight="medium" size="sm">Center</Text>
            <Flex align="center" gap="md" style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '4px', minHeight: '100px' }}>
              <div style={{ padding: '0.5rem', background: 'white', borderRadius: '4px' }}>Centered</div>
              <div style={{ padding: '1rem', background: 'white', borderRadius: '4px' }}>Different Height</div>
              <div style={{ padding: '0.5rem', background: 'white', borderRadius: '4px' }}>Items</div>
            </Flex>
          </div>
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">Gap Sizes</Text>
        <Text color="secondary" size="sm">
          Different spacing options between items
        </Text>
        <div className="component-page__demo">
          <div>
            <Text weight="medium" size="sm">Small Gap</Text>
            <Flex gap="sm" style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
              <Button size="sm">Item 1</Button>
              <Button size="sm">Item 2</Button>
              <Button size="sm">Item 3</Button>
            </Flex>
          </div>
          <div>
            <Text weight="medium" size="sm">Large Gap</Text>
            <Flex gap="lg" style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
              <Button size="sm">Item 1</Button>
              <Button size="sm">Item 2</Button>
              <Button size="sm">Item 3</Button>
            </Flex>
          </div>
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">Wrap</Text>
        <Text color="secondary" size="sm">
          Items wrap to next line when space is limited
        </Text>
        <div className="component-page__demo">
          <Flex wrap gap="md" style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
            <Button>Button 1</Button>
            <Button>Button 2</Button>
            <Button>Button 3</Button>
            <Button>Button 4</Button>
            <Button>Button 5</Button>
            <Button>Button 6</Button>
            <Button>Button 7</Button>
            <Button>Button 8</Button>
          </Flex>
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">Usage</Text>
        <pre className="code-block">
          <code>{`import { Flex } from '@konradullrich/mp-components';

// Basic row layout
<Flex direction="row" justify="space-between" align="center" gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Flex>

// Column layout
<Flex direction="column" gap="sm">
  <div>Item 1</div>
  <div>Item 2</div>
</Flex>

// With wrapping
<Flex wrap gap="md">
  {items.map(item => <div key={item.id}>{item.name}</div>)}
</Flex>`}</code>
        </pre>
      </Section>
    </Page>
  );
};