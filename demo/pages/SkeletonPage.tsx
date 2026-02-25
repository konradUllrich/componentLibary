import React from "react";
import { Skeleton } from "../../common";
import { Page, Section } from "../../layout";
import { Text } from "../../common";

export const SkeletonPage: React.FC = () => {
  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          Skeleton Component
        </Text>
        <Text color="secondary">
          Placeholder loading indicators that mimic the shape of your content
        </Text>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Text
        </Text>
        <Text color="secondary" size="sm">
          Single and multi-line text placeholders
        </Text>
        <div className="component-page__demo" style={{ flexDirection: "column", alignItems: "stretch", gap: "1rem" }}>
          <div>
            <Text size="sm" color="secondary" style={{ marginBottom: "0.5rem" }}>Single line</Text>
            <Skeleton variant="text" />
          </div>
          <div>
            <Text size="sm" color="secondary" style={{ marginBottom: "0.5rem" }}>Multiple lines (3)</Text>
            <Skeleton variant="text" lines={3} />
          </div>
          <div>
            <Text size="sm" color="secondary" style={{ marginBottom: "0.5rem" }}>Custom width</Text>
            <Skeleton variant="text" width="60%" />
          </div>
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Circle
        </Text>
        <Text color="secondary" size="sm">
          Circular placeholder for avatars and icons
        </Text>
        <div className="component-page__demo">
          <Skeleton variant="circle" width={32} height={32} />
          <Skeleton variant="circle" width={40} height={40} />
          <Skeleton variant="circle" width={56} height={56} />
          <Skeleton variant="circle" width={80} height={80} />
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Rectangle
        </Text>
        <Text color="secondary" size="sm">
          Block placeholder for images, cards, and other rectangular content
        </Text>
        <div className="component-page__demo" style={{ flexDirection: "column", alignItems: "stretch", gap: "1rem" }}>
          <Skeleton variant="rectangle" height={40} />
          <Skeleton variant="rectangle" height={120} />
          <Skeleton variant="rectangle" height={200} />
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Animations
        </Text>
        <Text color="secondary" size="sm">
          Pulse (default) and wave (shimmer) animations, or none
        </Text>
        <div className="component-page__demo" style={{ flexDirection: "column", alignItems: "stretch", gap: "1rem" }}>
          <div>
            <Text size="sm" color="secondary" style={{ marginBottom: "0.5rem" }}>Pulse</Text>
            <Skeleton animation="pulse" height={40} />
          </div>
          <div>
            <Text size="sm" color="secondary" style={{ marginBottom: "0.5rem" }}>Wave</Text>
            <Skeleton animation="wave" height={40} />
          </div>
          <div>
            <Text size="sm" color="secondary" style={{ marginBottom: "0.5rem" }}>None</Text>
            <Skeleton animation="none" height={40} />
          </div>
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Scenarios
        </Text>
        <Text color="secondary" size="sm">
          Compose skeletons to match real content layouts
        </Text>
        <div className="component-page__demo" style={{ flexDirection: "column", alignItems: "stretch", gap: "2rem" }}>
          {/* Profile card skeleton */}
          <div>
            <Text size="sm" color="secondary" style={{ marginBottom: "0.75rem" }}>Profile card</Text>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Skeleton variant="circle" width={48} height={48} />
              <div style={{ flex: 1 }}>
                <Skeleton variant="text" width="40%" style={{ marginBottom: "0.5rem" }} />
                <Skeleton variant="text" width="60%" />
              </div>
            </div>
          </div>

          {/* Article skeleton */}
          <div>
            <Text size="sm" color="secondary" style={{ marginBottom: "0.75rem" }}>Article</Text>
            <Skeleton variant="rectangle" height={160} style={{ marginBottom: "1rem" }} />
            <Skeleton variant="text" width="70%" style={{ marginBottom: "0.5rem" }} />
            <Skeleton variant="text" lines={3} />
          </div>

          {/* Table row skeleton */}
          <div>
            <Text size="sm" color="secondary" style={{ marginBottom: "0.75rem" }}>Table rows</Text>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{ display: "flex", gap: "1rem", marginBottom: "0.75rem" }}
              >
                <Skeleton variant="text" width="20%" />
                <Skeleton variant="text" width="30%" />
                <Skeleton variant="text" width="25%" />
                <Skeleton variant="text" width="15%" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Usage
        </Text>
        <pre className="code-block">
          <code>{`import { Skeleton } from '@konradullrich/mp-components';

// Text placeholder
<Skeleton variant="text" />
<Skeleton variant="text" lines={3} />

// Avatar placeholder
<Skeleton variant="circle" width={40} height={40} />

// Image / card placeholder
<Skeleton variant="rectangle" height={200} />

// Wave animation
<Skeleton animation="wave" height={40} />

// Compose for a profile card
<div style={{ display: 'flex', gap: '1rem' }}>
  <Skeleton variant="circle" width={48} height={48} />
  <div style={{ flex: 1 }}>
    <Skeleton variant="text" width="40%" />
    <Skeleton variant="text" width="60%" />
  </div>
</div>`}</code>
        </pre>
      </Section>
    </Page>
  );
};
