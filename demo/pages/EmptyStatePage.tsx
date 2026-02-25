import React from "react";
import { EmptyState } from "../../common";
import { Page, Section } from "../../layout";
import { Text } from "../../common";
import {
  SearchX,
  FolderOpen,
  AlertTriangle,
  Lock,
  Database,
  Plus,
  RefreshCw,
  Mail,
} from "lucide-react";

export const EmptyStatePage: React.FC = () => {
  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          EmptyState Component
        </Text>
        <Text color="secondary">
          Communicate the absence of content across diverse scenarios — empty
          lists, no search results, errors, and more.
        </Text>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Variants
        </Text>
        <Text color="secondary" size="sm">
          Semantic variants apply a subtle tinted background to reinforce
          context.
        </Text>
        <div
          className="component-page__demo"
          style={{ flexDirection: "column", alignItems: "stretch", gap: "1rem" }}
        >
          <EmptyState
            variant="default"
            title="Nothing here yet"
            description="Create your first item to get started."
            icon={<FolderOpen size={48} />}
            action={
              <button type="button" className="button button--primary button--md">
                <Plus size={16} style={{ marginRight: "0.5rem" }} />
                New item
              </button>
            }
          />

          <EmptyState
            variant="search"
            title="No results found"
            description="Try adjusting your search terms or clearing filters."
            icon={<SearchX size={48} />}
            action={
              <button type="button" className="button button--secondary button--md">
                Clear search
              </button>
            }
          />

          <EmptyState
            variant="error"
            title="Something went wrong"
            description="We could not load your data. Please try again."
            icon={<AlertTriangle size={48} />}
            action={
              <button type="button" className="button button--secondary button--md">
                <RefreshCw size={16} style={{ marginRight: "0.5rem" }} />
                Retry
              </button>
            }
          />

          <EmptyState
            variant="no-data"
            title="No data available"
            description="There is no data to display for the selected period."
            icon={<Database size={48} />}
          />

          <EmptyState
            variant="no-access"
            title="Access restricted"
            description="You do not have permission to view this content. Contact your administrator."
            icon={<Lock size={48} />}
          />
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Sizes
        </Text>
        <Text color="secondary" size="sm">
          Three sizes for different layout contexts.
        </Text>
        <div
          className="component-page__demo"
          style={{ flexDirection: "column", alignItems: "stretch", gap: "1rem" }}
        >
          <div>
            <Text size="sm" color="secondary" style={{ marginBottom: "0.5rem" }}>
              Small
            </Text>
            <EmptyState
              size="sm"
              title="No messages"
              description="Your inbox is empty."
              icon={<Mail size={24} />}
            />
          </div>
          <div>
            <Text size="sm" color="secondary" style={{ marginBottom: "0.5rem" }}>
              Medium (default)
            </Text>
            <EmptyState
              size="md"
              title="No messages"
              description="Your inbox is empty."
              icon={<Mail size={40} />}
            />
          </div>
          <div>
            <Text size="sm" color="secondary" style={{ marginBottom: "0.5rem" }}>
              Large
            </Text>
            <EmptyState
              size="lg"
              title="No messages"
              description="Your inbox is empty."
              icon={<Mail size={56} />}
            />
          </div>
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Without Icon
        </Text>
        <Text color="secondary" size="sm">
          Icon is optional – use a minimal style when space is limited.
        </Text>
        <div className="component-page__demo">
          <EmptyState
            title="No items"
            description="Add an item to see it here."
          />
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Usage
        </Text>
        <pre className="code-block">
          <code>{`import { EmptyState } from '@konradullrich/mp-components';

// Basic
<EmptyState title="Nothing here yet" />

// With description
<EmptyState
  title="No results found"
  description="Try adjusting your search terms."
/>

// With icon
<EmptyState
  variant="search"
  title="No results found"
  description="Try a different query."
  icon={<SearchX size={48} />}
/>

// With action button
<EmptyState
  variant="default"
  title="No items"
  description="Create your first item to get started."
  icon={<FolderOpen size={48} />}
  action={<Button onClick={onCreate}>New item</Button>}
/>

// Sizes: "sm" | "md" (default) | "lg"
<EmptyState size="sm" title="Empty" />

// Variants: "default" | "search" | "error" | "no-data" | "no-access"
<EmptyState variant="error" title="Something went wrong" />`}</code>
        </pre>
      </Section>
    </Page>
  );
};
