import React, { useState } from "react";
import { CardList } from "../../data-display";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Page,
  Section,
} from "../../layout";
import { Text, Button, Badge } from "../../common";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  tags: string[];
}

export const CardListPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const products: Product[] = [
    {
      id: 1,
      name: "Wireless Headphones",
      description:
        "Premium noise-cancelling headphones with 30-hour battery life",
      price: 299.99,
      category: "Audio",
      inStock: true,
    },
    {
      id: 2,
      name: "Smart Watch",
      description: "Fitness tracking and notifications on your wrist",
      price: 399.99,
      category: "Wearables",
      inStock: true,
    },
    {
      id: 3,
      name: "Laptop Stand",
      description: "Ergonomic aluminum stand for better posture",
      price: 49.99,
      category: "Accessories",
      inStock: false,
    },
    {
      id: 4,
      name: "Mechanical Keyboard",
      description: "RGB backlit with cherry MX switches",
      price: 159.99,
      category: "Peripherals",
      inStock: true,
    },
    {
      id: 5,
      name: "USB-C Hub",
      description: "7-in-1 adapter with HDMI, USB 3.0, and SD card reader",
      price: 79.99,
      category: "Accessories",
      inStock: true,
    },
    {
      id: 6,
      name: "Webcam",
      description: "1080p HD camera with auto-focus and noise reduction",
      price: 89.99,
      category: "Peripherals",
      inStock: true,
    },
  ];

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Getting Started with React",
      excerpt:
        "Learn the basics of React and start building modern web applications",
      author: "Jane Smith",
      date: "2024-02-15",
      tags: ["React", "JavaScript", "Tutorial"],
    },
    {
      id: 2,
      title: "TypeScript Best Practices",
      excerpt:
        "Essential tips for writing clean and maintainable TypeScript code",
      author: "John Doe",
      date: "2024-02-14",
      tags: ["TypeScript", "Best Practices"],
    },
    {
      id: 3,
      title: "Component Design Patterns",
      excerpt: "Explore common patterns for building reusable React components",
      author: "Alice Johnson",
      date: "2024-02-13",
      tags: ["React", "Design Patterns"],
    },
  ];

  const renderProductCard = (product: Product) => (
    <Card variant="elevated" interactive>
      <CardHeader>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text weight="semibold" size="lg">
            {product.name}
          </Text>
          <Badge variant={product.inStock ? "default" : "destructive"}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Text color="secondary" size="sm" style={{ marginBottom: "0.5rem" }}>
          {product.description}
        </Text>
        <Text
          weight="semibold"
          size="xl"
          style={{ color: "var(--color-primary)" }}
        >
          ${product.price}
        </Text>
      </CardContent>
      <CardFooter>
        <Button variant="primary" size="sm" disabled={!product.inStock}>
          Add to Cart
        </Button>
        <Button variant="ghost" size="sm" style={{ marginLeft: "0.5rem" }}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );

  const renderBlogCard = (post: BlogPost) => (
    <Card variant="outlined">
      <CardHeader>
        <Text weight="semibold" size="lg">
          {post.title}
        </Text>
        <Text color="secondary" size="xs" style={{ marginTop: "0.25rem" }}>
          By {post.author} • {post.date}
        </Text>
      </CardHeader>
      <CardContent>
        <Text color="secondary" size="sm" style={{ marginBottom: "0.75rem" }}>
          {post.excerpt}
        </Text>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {post.tags.map((tag) => (
            <Badge key={tag} variant="default" size="sm">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm">
          Read More →
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          CardList Component
        </Text>
        <Text color="secondary">
          Display a responsive grid of cards for structured content
        </Text>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Product Cards (3 columns)
        </Text>
        <Text color="secondary" size="sm">
          A grid of product cards with interactive elements
        </Text>
        <div className="component-page__demo">
          <CardList
            items={products}
            renderCard={renderProductCard}
            getKey={(product) => product.id}
            columns={3}
          />
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Blog Posts (2 columns)
        </Text>
        <Text color="secondary" size="sm">
          Blog post cards with tags and metadata
        </Text>
        <div className="component-page__demo">
          <CardList
            items={blogPosts}
            renderCard={renderBlogCard}
            getKey={(post) => post.id}
            columns={2}
          />
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Loading State
        </Text>
        <Text color="secondary" size="sm">
          Display loading indicator
        </Text>
        <div className="component-page__demo">
          <div style={{ marginBottom: "1rem" }}>
            <Button
              onClick={() => setIsLoading(!isLoading)}
              variant="ghost"
              size="sm"
            >
              {isLoading ? "Hide" : "Show"} Loading State
            </Button>
          </div>
          <CardList
            items={products.slice(0, 3)}
            renderCard={renderProductCard}
            getKey={(product) => product.id}
            isLoading={isLoading}
            columns={3}
          />
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Empty State
        </Text>
        <Text color="secondary" size="sm">
          Display message when no items are available
        </Text>
        <div className="component-page__demo">
          <CardList
            items={[]}
            renderCard={renderProductCard}
            getKey={(product) => product.id}
            emptyMessage="No products found"
            columns={3}
          />
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Usage
        </Text>
        <pre className="code-block">
          <code>{`import { CardList } from '@konradullrich/mp-components';
import { Card, CardHeader, CardContent } from '@konradullrich/mp-components';

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
        <p>$\{product.price}</p>
      </CardContent>
    </Card>
  )}
  getKey={(product) => product.id}
  columns={3}
/>`}</code>
        </pre>
      </Section>
    </Page>
  );
};
