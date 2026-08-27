import { test, expect } from "../../playwright/coverage-fixtures";
import { DateComponent } from "./Date";
import { checkA11y } from "../../playwright/test-utils";

test.describe("DateComponent", () => {
  test("should render a short-format date by default", async ({ mount }) => {
    const component = await mount(
      <DateComponent date="2024-03-15" locale="de-DE" />,
    );
    await expect(component).toHaveText("15.03.2024");
  });

  test("should accept a native Date object", async ({ mount }) => {
    const component = await mount(
      <DateComponent date={new Date("2024-03-15T00:00:00Z")} locale="de-DE" />,
    );
    await expect(component).toHaveText("15.03.2024");
  });

  test("should render the long format", async ({ mount }) => {
    const component = await mount(
      <DateComponent date="2024-03-15" format="long" locale="de-DE" />,
    );
    await expect(component).toHaveText("15. März 2024");
  });

  test("should render the datetime format", async ({ mount }) => {
    const component = await mount(
      <DateComponent
        date="2024-03-15T14:30:00"
        format="datetime"
        locale="de-DE"
      />,
    );
    await expect(component).toHaveText("15.03.2024, 14:30");
  });

  test("should render the time format", async ({ mount }) => {
    const component = await mount(
      <DateComponent date="2024-03-15T14:30:00" format="time" locale="de-DE" />,
    );
    await expect(component).toHaveText("14:30");
  });

  test("should respect a different locale", async ({ mount }) => {
    const component = await mount(
      <DateComponent date="2024-03-15" locale="en-US" />,
    );
    await expect(component).toHaveText("03/15/2024");
  });

  test("should show the default fallback for a null date", async ({
    mount,
  }) => {
    const component = await mount(<DateComponent date={null} />);
    await expect(component).toHaveText("---");
  });

  test("should show the default fallback for an undefined date", async ({
    mount,
  }) => {
    const component = await mount(<DateComponent date={undefined} />);
    await expect(component).toHaveText("---");
  });

  test("should show the default fallback for an invalid date string", async ({
    mount,
  }) => {
    const component = await mount(<DateComponent date="not-a-date" />);
    await expect(component).toHaveText("---");
  });

  test("should show a custom fallback", async ({ mount }) => {
    const component = await mount(
      <DateComponent date={null} fallback="N/A" />,
    );
    await expect(component).toHaveText("N/A");
  });

  test("should apply the mp-date class", async ({ mount }) => {
    const component = await mount(<DateComponent date="2024-03-15" />);
    await expect(component).toHaveClass(/mp-date/);
  });

  test("should apply a custom className", async ({ mount }) => {
    const component = await mount(
      <DateComponent date="2024-03-15" className="custom-date" />,
    );
    await expect(component).toHaveClass(/custom-date/);
  });

  test("should forward ref to the root span element", async ({ mount }) => {
    const component = await mount(<DateComponent date="2024-03-15" />);
    expect(await component.evaluate((node) => node.tagName)).toBe("SPAN");
  });

  test("should pass accessibility checks", async ({ mount, page }) => {
    await mount(<DateComponent date="2024-03-15" />);
    await checkA11y(page);
  });
});
