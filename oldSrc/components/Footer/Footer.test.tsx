import { expect, it } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import Footer from "./Footer";

it("renders my name", () => {
  const { getByText } = render(<Footer />);
  getByText(/austin chappell/i);
});

it("is accessible", async () => {
  const { container } = render(<Footer />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
