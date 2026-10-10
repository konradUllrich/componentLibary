import React from 'react';
import { Image, Flex, Text } from '@mp-ku/mp-components';

const landscape =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
      <defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cb7e8"/><stop offset="1" stop-color="#e6f1fa"/></linearGradient></defs>
      <rect width="800" height="500" fill="url(#s)"/>
      <circle cx="620" cy="120" r="54" fill="#ffd36b"/>
      <path d="M0 360 L180 200 L320 330 L470 170 L800 380 L800 500 L0 500 Z" fill="#5b7f9e"/>
      <path d="M0 420 L240 300 L420 400 L600 310 L800 420 L800 500 L0 500 Z" fill="#3d6b4f"/>
    </svg>`,
  );

const portrait =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
      <rect width="400" height="400" fill="#d9e4ef"/>
      <circle cx="200" cy="160" r="72" fill="#8a9bb0"/>
      <path d="M60 400 C80 280 320 280 340 400 Z" fill="#8a9bb0"/>
    </svg>`,
  );

export const AspectRatios = () => (
  <Flex gap="md" align="flex-start">
    <Flex direction="column" gap="xs" style={{ width: 200 }}>
      <Image src={landscape} alt="Mountain landscape at noon" aspectRatio="video" objectFit="cover" rounded="md" />
      <Text size="sm" color="secondary">Video (16:9)</Text>
    </Flex>
    <Flex direction="column" gap="xs" style={{ width: 120 }}>
      <Image src={landscape} alt="Mountain landscape at noon" aspectRatio="square" objectFit="cover" rounded="md" />
      <Text size="sm" color="secondary">Square</Text>
    </Flex>
    <Flex direction="column" gap="xs" style={{ width: 100 }}>
      <Image src={landscape} alt="Mountain landscape at noon" aspectRatio="portrait" objectFit="cover" rounded="md" />
      <Text size="sm" color="secondary">Portrait</Text>
    </Flex>
  </Flex>
);

export const Rounded = () => (
  <Flex gap="md" align="center">
    {(['none', 'sm', 'md', 'lg', 'full'] as const).map((r) => (
      <Flex key={r} direction="column" gap="xs" align="center" style={{ width: 80 }}>
        <Image src={portrait} alt="Team member portrait" aspectRatio="square" objectFit="cover" rounded={r} />
        <Text size="sm" color="secondary">{r}</Text>
      </Flex>
    ))}
  </Flex>
);

export const Fallback = () => (
  <div style={{ width: 120 }}>
    <Image src="/missing/profile-photo.jpg" fallbackSrc={portrait} alt="Profile photo of Anna Weber" aspectRatio="square" rounded="full" objectFit="cover" />
  </div>
);
