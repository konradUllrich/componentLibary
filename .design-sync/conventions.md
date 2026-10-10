# mpComponents — how to build with this library

React 19 components on Radix UI. All exports live on `window.MpComponents` (e.g. `MpComponents.Button`).
Styling is plain CSS with BEM classes (`.mp-button--primary`) driven by CSS custom properties.
`styles.css` already loads the design tokens, the base body font, the Intrexx icon font and all component CSS.
You do not need a provider or wrapper for components to render styled.

## Rules

- **Use components for UI, tokens for your own layout glue.** Never restyle or override the `mp-*` classes, and never invent new `mp-*` class names.
- **Native HTML attributes are forwarded** even when a `<Name>.d.ts` does not list them: `disabled`, `onClick`, `type`, `placeholder`, `value`/`onChange`, `aria-*`.
- **Layout**: use `Flex` (`direction`, `gap="xs|sm|md|lg|xl"`, `align`, `justify`, `wrap`), `Grid`/`GridItem`, `Page`, `Section`, `Card`, `Panel`, and `AppLayout` with `AppHeader`/`AppSidebar`/`AppMain` for a full app shell.
- **Spacing helper**: `u({ pt: 4, mb: 2 })` returns utility classes (`p|m` + `t|b|l|r`, values `0-6|auto`, responsive `{ base, sm, md, lg, xl }`).
- **Typography**: use `Text` (`as`, `size="xs|sm|base|lg|xl|2xl|3xl"`, `weight`, `color="default|primary|secondary|tertiary|success|warning|destructive"`) instead of raw `<h1>`/`<p>`.
- **Icons**: `IntrexxIcon iconClass="icon54-l_BasicIcons-Home"` (line set `icon54-l_*`, solid set `icon54-s_*`); `size` 12–48, `color` such as `primary` or `foreground`.
- **Overlays**: `Dialog` + `DialogTrigger` + `DialogContent` (`title`, `description`, `size`); `DialogClose` renders the corner × button. Do not use `DialogClose` for footer buttons. `Tooltip` needs a `TooltipProvider` ancestor.
- **Avoid known library issues**:
  - `Button isLoading` shows no spinner.
  - `Badge variant="primary"` and the `Toggle` `default` variant when unpressed render without a background. Prefer `Badge variant="info"` and `Toggle variant="outline"`.
  - `Card`'s `CardFooter` has no gap: wrap its buttons in `<Flex gap="sm">`.

## Tokens (`var(--…)`, defined in `_ds_bundle.css` via `styles.css`)

- **Colours**:
  - text and backgrounds: `--mp-color-foreground`, `--mp-color-foreground-light`, `--mp-color-background`, `--mp-color-background-light`, `--mp-color-background-strong`
  - borders: `--mp-color-border`, `--mp-color-border-light`
  - semantic: `--mp-color-primary` (`-light`, `-strong`); `--mp-color-success|warning|destructive|info` (each with `-light`, `-dark`, `-foreground`)
- **Spacing**: `--mp-spacing-0|1|2|3|4|5|6|8|10|12|16|20|24` (4 px steps: `--mp-spacing-4` = 1rem).
- **Radius**: `--mp-radius-none|sm|md|lg|full`. **Shadow**: `--shadow-sm|base|md|lg|xl`.
- **Type**: `--font-family-base`, `--mp-font-size-xs…5xl`, `--mp-font-weight-normal|medium|semibold|bold`, `--line-height-tight|normal|relaxed`.
- **Focus**: `--mp-focus-color`, `--mp-focus-size`, `--mp-focus-offset`.

Read `styles.css` and `_ds_bundle.css` (the tokens are its first `:root` block) before styling, and the per-component `<Name>.prompt.md` / `<Name>.d.ts` before using a component.

## Example

```jsx
const { Card, CardHeader, CardContent, CardFooter, Flex, Text, Badge, Button } = window.MpComponents;

<Flex direction="column" gap="md" style={{ padding: 'var(--mp-spacing-6)' }}>
  <Card variant="elevated" padding="md" style={{ maxWidth: 360 }}>
    <CardHeader>
      <Flex justify="space-between" align="center">
        <Text as="h3" size="lg" weight="semibold">Website relaunch</Text>
        <Badge variant="success" appearance="subtle">Active</Badge>
      </Flex>
    </CardHeader>
    <CardContent>
      <Text color="secondary">Redesign of the public website including the new CMS integration.</Text>
    </CardContent>
    <CardFooter>
      <Flex gap="sm" justify="flex-end">
        <Button variant="secondary" size="sm">Details</Button>
        <Button size="sm">Open project</Button>
      </Flex>
    </CardFooter>
  </Card>
</Flex>
```
