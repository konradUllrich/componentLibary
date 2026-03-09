import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { IconPicker } from "./IconPicker";

describe("IconPicker", () => {
  it("renders search input", () => {
    render(<IconPicker />);

    const searchInput = screen.getByPlaceholderText("Search icons...");
    expect(searchInput).toBeInTheDocument();
  });

  it("renders category toggle button", () => {
    render(<IconPicker />);

    // Use getByText which is faster than getByRole for this specific case
    const categoryButton = screen.getByText(/categories \(\d+\/\d+\)/i);
    expect(categoryButton).toBeInTheDocument();
  });

  it("renders style toggle buttons", () => {
    render(<IconPicker />);

    const lineButton = screen.getByTitle("Line style icons");
    const solidButton = screen.getByTitle("Solid style icons");

    expect(lineButton).toBeInTheDocument();
    expect(solidButton).toBeInTheDocument();
  });

  it("line style is active by default", () => {
    render(<IconPicker defaultStyle="line" />);

    const lineButton = screen.getByTitle("Line style icons");
    expect(lineButton).toHaveClass("icon-picker__style-btn--active");
  });

  it("can set solid style as default", () => {
    render(<IconPicker defaultStyle="solid" />);

    const solidButton = screen.getByTitle("Solid style icons");
    expect(solidButton).toHaveClass("icon-picker__style-btn--active");
  });
});
