import React from "react";
import { CardList } from "./CardList";
import { Card, CardHeader, CardContent } from "../../layout";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { CardList } from '@mp-ku/mp-components';
import { Card, CardHeader, CardContent } from '@mp-ku/mp-components';

interface Product {
  id: number;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: 'Product 1', price: 99.99 },
  { id: 2, name: 'Product 2', price: 149.99 },
];

<CardList
  items={products}
  renderCard={(product) => (
    <Card variant="elevated">
      <CardHeader>
        <h3>{product.name}</h3>
      </CardHeader>
      <CardContent>
        <p>\${product.price}</p>
      </CardContent>
    </Card>
  )}
  getKey={(product) => product.id}
  columns={3}
/>`;

interface Product {
  id: number;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: "Product 1", price: 99.99 },
  { id: 2, name: "Product 2", price: 149.99 },
  { id: 3, name: "Product 3", price: 39.99 },
];

/** Live render of {@link usageSource}, used on the CardList demo page. */
export const UsageExample = () => (
  <CardList
    items={products}
    renderCard={(product) => (
      <Card variant="elevated">
        <CardHeader>
          <h3>{product.name}</h3>
        </CardHeader>
        <CardContent>
          <p>${product.price}</p>
        </CardContent>
      </Card>
    )}
    getKey={(product) => product.id}
    columns={3}
  />
);
