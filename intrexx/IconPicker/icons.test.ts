import { describe, it, expect } from "vitest";
import { categories, icons, getIcon, getIconsByCategory } from "./icons";

describe("Icons Data Structure", () => {
  it("should have 101 categories", () => {
    expect(categories).toHaveLength(101);
  });

  it("should have 5056 icons", () => {
    expect(icons).toHaveLength(5056);
  });

  it("should have CloudNetworking at index 18", () => {
    expect(categories[18]).toBe("CloudNetworking");
  });

  it("getIcon should return correct data", () => {
    const icon = getIcon(0);

    expect(icon).toHaveProperty("category");
    expect(icon).toHaveProperty("name");
    expect(icon).toHaveProperty("className");
    expect(icon.className).toMatch(/^icon54-[ls]_/);
  });

  it("getIconsByCategory should return CloudNetworking icons", () => {
    const cloudIcons = getIconsByCategory("CloudNetworking");

    expect(cloudIcons.length).toBeGreaterThan(0);
    expect(cloudIcons[0].category).toBe("CloudNetworking");
  });

  it("getIconsByCategory should return empty array for invalid category", () => {
    const result = getIconsByCategory("InvalidCategory");

    expect(result).toEqual([]);
  });

  it("icons should have correct structure", () => {
    const firstIcon = icons[0];

    expect(firstIcon).toHaveProperty("c");
    expect(firstIcon).toHaveProperty("n");
    expect(typeof firstIcon.c).toBe("number");
    expect(typeof firstIcon.n).toBe("string");
  });

  it("all icon category IDs should be valid", () => {
    icons.forEach((icon) => {
      expect(icon.c).toBeGreaterThanOrEqual(0);
      expect(icon.c).toBeLessThan(categories.length);
    });
  });
});
