import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

describe("Button", () => {
  test("fires the onClick prop when clicked", async () => {
    const mockCallback = jest.fn();
    render(<Button onClick={mockCallback}>Click Me!</Button>);

    await userEvent.click(screen.getByRole("button"));
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  test("renders the correct text", () => {
    const TEXT = "Test Text";
    const { getByText } = render(<Button onClick={() => {}}>{TEXT}</Button>);

    getByText(TEXT);
  });

  test("renders the classname prop", () => {
    const { container } = render(
      <Button className="testClass" onClick={() => {}}>
        Here is a button
      </Button>
    );

    expect(container.getElementsByClassName("testClass").length).toBe(1);
  });

  test("renders as a link", () => {
    const { container } = render(
      <Button as="link" href="/test">
        Here is a link
      </Button>
    );

    expect(container.getElementsByTagName("a").length).toBe(1);
  });

  test("is accessible", async () => {
    const mockCallback = jest.fn();

    const { container, rerender } = render(
      <Button onClick={mockCallback}>Accessible Button</Button>
    );

    let results = await axe(container);
    expect(results).toHaveNoViolations();

    // Sizes
    rerender(
      <Button buttonSize="large" onClick={mockCallback}>
        Accessible Button
      </Button>
    );
    results = await axe(container);
    expect(results).toHaveNoViolations();

    // Variants
    rerender(
      <Button intent="primary" onClick={mockCallback}>
        Accessible Button
      </Button>
    );
    results = await axe(container);
    expect(results).toHaveNoViolations();

    rerender(
      <Button intent="secondary" onClick={mockCallback}>
        Accessible Button
      </Button>
    );
    results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
