import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import Button from "./Button";

it("fires the onClick prop when clicked", async () => {
  const mockCallback = jest.fn();
  const user = userEvent.setup();

  render(<Button onClick={mockCallback}>Click Me!</Button>);

  await user.click(screen.getByRole("button"));
  expect(mockCallback).toBeCalledTimes(1);
});

it("renders the correct text", () => {
  const TEXT = "Test Text";
  const { getByText } = render(<Button onClick={() => {}}>{TEXT}</Button>);

  getByText(TEXT);
});

it("renders the classname prop", () => {
  const { container } = render(
    <Button className="testClass" onClick={() => {}}>
      Here is a button
    </Button>
  );

  expect(container.getElementsByClassName("testClass").length).toBe(1);
});

it("is accessible", async () => {
  const mockCallback = jest.fn();

  const { container, rerender } = render(
    <Button onClick={mockCallback}>Accessible Button</Button>
  );

  let results = await axe(container);
  expect(results).toHaveNoViolations();

  // Sizes
  rerender(
    <Button size="large" onClick={mockCallback}>
      Accessible Button
    </Button>
  );
  results = await axe(container);
  expect(results).toHaveNoViolations();

  rerender(
    <Button size="full" onClick={mockCallback}>
      Accessible Button
    </Button>
  );
  results = await axe(container);
  expect(results).toHaveNoViolations();

  // Variants
  rerender(
    <Button variant="red" onClick={mockCallback}>
      Accessible Button
    </Button>
  );
  results = await axe(container);
  expect(results).toHaveNoViolations();

  rerender(
    <Button variant="secondary" onClick={mockCallback}>
      Accessible Button
    </Button>
  );
  results = await axe(container);
  expect(results).toHaveNoViolations();
});
