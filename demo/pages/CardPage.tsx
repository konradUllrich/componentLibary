import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, Page, Section } from '../../layout';
import { Text, Button } from '../../common';

export const CardPage: React.FC = () => {
  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">Card Component</Text>
        <Text color="secondary">
          Flexible container component for displaying content in card format
        </Text>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">Variants</Text>
        <Text color="secondary" size="sm">
          Different card styles for various contexts
        </Text>
        <div className="component-page__demo">
          <Card variant="elevated" padding="md">
            <CardHeader>
              <Text weight="semibold">Elevated Card</Text>
            </CardHeader>
            <CardContent>
              <Text color="secondary" size="sm">
                This card has a subtle shadow for elevation
              </Text>
            </CardContent>
          </Card>

          <Card variant="outlined" padding="md">
            <CardHeader>
              <Text weight="semibold">Outlined Card</Text>
            </CardHeader>
            <CardContent>
              <Text color="secondary" size="sm">
                This card has a border outline
              </Text>
            </CardContent>
          </Card>

          <Card variant="flat" padding="md">
            <CardHeader>
              <Text weight="semibold">Flat Card</Text>
            </CardHeader>
            <CardContent>
              <Text color="secondary" size="sm">
                This card has no border or shadow
              </Text>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">With Footer</Text>
        <Text color="secondary" size="sm">
          Cards can include header, content, and footer sections
        </Text>
        <div className="component-page__demo">
          <Card variant="elevated" padding="md">
            <CardHeader>
              <Text weight="semibold">Complete Card</Text>
            </CardHeader>
            <CardContent>
              <Text color="secondary" size="sm">
                This card demonstrates all three sections: header, content, and footer.
              </Text>
            </CardContent>
            <CardFooter>
              <Button size="sm" variant="primary">Action</Button>
              <Button size="sm" variant="secondary">Cancel</Button>
            </CardFooter>
          </Card>
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">Padding Options</Text>
        <Text color="secondary" size="sm">
          Control card padding size
        </Text>
        <div className="component-page__demo">
          <Card variant="outlined" padding="sm">
            <Text size="sm">Small Padding</Text>
          </Card>
          <Card variant="outlined" padding="md">
            <Text size="sm">Medium Padding</Text>
          </Card>
          <Card variant="outlined" padding="lg">
            <Text size="sm">Large Padding</Text>
          </Card>
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">Interactive Card</Text>
        <Text color="secondary" size="sm">
          Cards can be interactive with hover effects
        </Text>
        <div className="component-page__demo">
          <Card variant="elevated" padding="md" interactive>
            <CardHeader>
              <Text weight="semibold">Interactive Card</Text>
            </CardHeader>
            <CardContent>
              <Text color="secondary" size="sm">
                Hover over this card to see the effect
              </Text>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">Usage</Text>
        <pre className="code-block">
          <code>{`import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardFooter 
} from '@konradullrich/mp-components';

// Basic card
<Card variant="elevated" padding="md">
  <CardHeader>
    <h3>Card Title</h3>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Interactive card
<Card variant="elevated" interactive>
  Content
</Card>`}</code>
        </pre>
      </Section>
    </Page>
  );
};