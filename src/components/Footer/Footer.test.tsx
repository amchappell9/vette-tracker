import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import Footer from "./Footer";

expect.extend(toHaveNoViolations);

describe("Footer", () => {
  test("renders with correct text", () => {
    render(<Footer />);
    expect(screen.getByText("Made by")).toBeInTheDocument();
    expect(screen.getByText("Austin Chappell")).toBeInTheDocument();
  });

  test("renders with correct link", () => {
    render(<Footer />);
    const link = screen.getByText("Austin Chappell").closest("a");
    expect(link).toHaveAttribute("href", "https://github.com/amchappell9");
  });

  test("is accessible", async () => {
    const { container } = render(<Footer />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
