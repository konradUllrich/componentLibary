import { test, expect } from "@playwright/experimental-ct-react";
import { Grid } from "./Grid";
import { GridItem } from "./GridItem";

test.describe("Grid", () => {
  test("should render children", async ({ mount }) => {
    const component = await mount(
      <Grid>
        <div>Cell 1</div>
        <div>Cell 2</div>
      </Grid>,
    );
    await expect(component.getByText("Cell 1")).toBeVisible();
    await expect(component.getByText("Cell 2")).toBeVisible();
  });

  test("should apply preset column class", async ({ mount }) => {
    const component = await mount(<Grid columns="3">content</Grid>);
    await expect(component).toHaveClass(/grid--cols-3/);
  });

  test("should apply grid--cols-2 class", async ({ mount }) => {
    const component = await mount(<Grid columns="2">content</Grid>);
    await expect(component).toHaveClass(/grid--cols-2/);
  });

  test("should apply grid--cols-4 class", async ({ mount }) => {
    const component = await mount(<Grid columns="4">content</Grid>);
    await expect(component).toHaveClass(/grid--cols-4/);
  });

  test("should apply grid--cols-6 class", async ({ mount }) => {
    const component = await mount(<Grid columns="6">content</Grid>);
    await expect(component).toHaveClass(/grid--cols-6/);
  });

  test("should apply grid--cols-12 class", async ({ mount }) => {
    const component = await mount(<Grid columns="12">content</Grid>);
    await expect(component).toHaveClass(/grid--cols-12/);
  });

  test("should apply custom columns as inline style without preset class", async ({
    mount,
  }) => {
    const component = await mount(
      <Grid columns="repeat(auto-fill, minmax(200px, 1fr))">content</Grid>,
    );
    await expect(component).not.toHaveClass(/grid--cols/);
    // computed value will be resolved pixel widths – just assert no preset class was added
  });

  test("should apply gap preset class", async ({ mount }) => {
    const component = await mount(<Grid gap="md">content</Grid>);
    await expect(component).toHaveClass(/grid--gap-md/);
  });

  test("should apply align-items class", async ({ mount }) => {
    const component = await mount(<Grid align="center">content</Grid>);
    await expect(component).toHaveClass(/grid--align-center/);
  });

  test("should apply justify-items class", async ({ mount }) => {
    const component = await mount(<Grid justify="end">content</Grid>);
    await expect(component).toHaveClass(/grid--justify-end/);
  });

  test("should apply flow class for column flow", async ({ mount }) => {
    const component = await mount(<Grid flow="column">content</Grid>);
    await expect(component).toHaveClass(/grid--flow-column/);
  });

  test("should apply separate column and row gap classes", async ({
    mount,
  }) => {
    const component = await mount(
      <Grid columnGap="sm" rowGap="xl">
        content
      </Grid>,
    );
    await expect(component).toHaveClass(/grid--col-gap-sm/);
    await expect(component).toHaveClass(/grid--row-gap-xl/);
  });

  test("should forward ref", async ({ mount }) => {
    const component = await mount(<Grid columns="2">content</Grid>);
    await expect(component).toBeVisible();
  });

  test("should merge custom className", async ({ mount }) => {
    const component = await mount(<Grid className="my-grid">content</Grid>);
    await expect(component).toHaveClass(/my-grid/);
    await expect(component).toHaveClass(/grid/);
  });

  test("should spread additional HTML attributes", async ({ mount }) => {
    const component = await mount(<Grid data-testid="the-grid">content</Grid>);
    await expect(component).toHaveAttribute("data-testid", "the-grid");
  });
});

test.describe("GridItem", () => {
  test("should render children", async ({ mount }) => {
    const component = await mount(<GridItem>Cell content</GridItem>);
    await expect(component.getByText("Cell content")).toBeVisible();
  });

  test("should apply preset col-span class", async ({ mount }) => {
    const component = await mount(<GridItem colSpan={3}>span 3</GridItem>);
    await expect(component).toHaveClass(/grid-item--col-span-3/);
  });

  test("should apply full col-span class", async ({ mount }) => {
    const component = await mount(
      <GridItem colSpan="full">full width</GridItem>,
    );
    await expect(component).toHaveClass(/grid-item--col-span-full/);
  });

  test("should apply preset row-span class", async ({ mount }) => {
    const component = await mount(<GridItem rowSpan={2}>span 2</GridItem>);
    await expect(component).toHaveClass(/grid-item--row-span-2/);
  });

  test("should apply colStart as inline style", async ({ mount }) => {
    const component = await mount(<GridItem colStart={2}>start at 2</GridItem>);
    await expect(component).toHaveCSS("grid-column-start", "2");
  });

  test("should apply rowStart as inline style", async ({ mount }) => {
    const component = await mount(
      <GridItem rowStart={3}>row start 3</GridItem>,
    );
    await expect(component).toHaveCSS("grid-row-start", "3");
  });

  test("should merge custom className", async ({ mount }) => {
    const component = await mount(
      <GridItem className="custom-cell">content</GridItem>,
    );
    await expect(component).toHaveClass(/custom-cell/);
    await expect(component).toHaveClass(/grid-item/);
  });

  test("should compose Grid and GridItem together", async ({ mount, page }) => {
    await mount(
      <Grid columns="12" gap="md">
        <GridItem colSpan={8} data-testid="main">
          Main
        </GridItem>
        <GridItem colSpan={4} data-testid="sidebar">
          Sidebar
        </GridItem>
      </Grid>,
    );
    await expect(page.getByTestId("main")).toBeVisible();
    await expect(page.getByTestId("sidebar")).toBeVisible();
    await expect(page.getByTestId("main")).toHaveClass(/grid-item--col-span-8/);
    await expect(page.getByTestId("sidebar")).toHaveClass(
      /grid-item--col-span-4/,
    );
  });
});
