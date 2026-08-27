import React from "react";
import { Card } from "./Card";
import { CardHeader } from "./CardHeader";
import { CardContent } from "./CardContent";
import { CardFooter } from "./CardFooter";
import { Button } from "../../common";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import {
  Card,
  CardHeader,
  CardContent,
  CardFooter
} from '@mp-ku/mp-components';

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
</Card>`;

/** Live render of {@link usageSource}, used on the Card demo page. */
export const UsageExample = () => (
  <>
    <Card variant="elevated" padding="md">
      <CardHeader>
        <h3>Card Title</h3>
      </CardHeader>
      <CardContent>Card content goes here</CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>

    <Card variant="elevated" interactive>
      Content
    </Card>
  </>
);
