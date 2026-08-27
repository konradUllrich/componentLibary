import React from "react";
import { Image } from "./Image";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { Image } from '@mp-ku/mp-components';

<Image src="/photo.jpg" alt="A scenic view" rounded="md" aspectRatio="video" />

<Image
  src="/avatar.jpg"
  alt="User avatar"
  rounded="full"
  objectFit="cover"
  fallbackSrc="/default-avatar.jpg"
/>`;

/** Live render of {@link usageSource}. */
export const UsageExample = () => (
  <>
    <Image src="/photo.jpg" alt="A scenic view" rounded="md" aspectRatio="video" />
    <Image
      src="/avatar.jpg"
      alt="User avatar"
      rounded="full"
      objectFit="cover"
      fallbackSrc="/default-avatar.jpg"
    />
  </>
);
