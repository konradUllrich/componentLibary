import React from 'react';
import { CardList } from '../../data-display';
import { Card, CardHeader, CardContent } from '../../layout';
import { Text } from '../../common';

export const CardListPage: React.FC = () => {
  const cards = [
    { id: 1, title: 'Card 1', content: 'Content for card 1' },
    { id: 2, title: 'Card 2', content: 'Content for card 2' },
    { id: 3, title: 'Card 3', content: 'Content for card 3' },
    { id: 4, title: 'Card 4', content: 'Content for card 4' },
  ];

  return (
    <div className="component-page">
      <div className="component-page__header">
        <Text as="h1" size="3xl" weight="bold">CardList Component</Text>
        <Text color="secondary">
          Display a grid of cards for structured content
        </Text>
      </div>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Basic CardList</Text>
        <Text color="secondary" size="sm">
          A responsive grid of cards
        </Text>
        <div className="component-page__demo">
          <CardList>
            {cards.map((card) => (
              <Card key={card.id} variant="elevated">
                <CardHeader>
                  <Text weight="semibold">{card.title}</Text>
                </CardHeader>
                <CardContent>
                  <Text color="secondary" size="sm">{card.content}</Text>
                </CardContent>
              </Card>
            ))}
          </CardList>
        </div>
      </section>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Usage</Text>
        <pre className="code-block">
          <code>{`import { CardList } from '@konradullrich/mp-components';
import { Card, CardHeader, CardContent } from '@konradullrich/mp-components';

<CardList>
  <Card variant="elevated">
    <CardHeader>
      <h3>Card Title</h3>
    </CardHeader>
    <CardContent>
      Card content here
    </CardContent>
  </Card>
  {/* More cards... */}
</CardList>`}</code>
        </pre>
      </section>
    </div>
  );
};
