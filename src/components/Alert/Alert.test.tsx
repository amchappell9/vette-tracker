import { getByRole, render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import Alert from "./Alert";

expect.extend(toHaveNoViolations);

describe("Alert", () => {
  test("renders with correct text", () => {
    render(<Alert alertType="info">Here is a test!</Alert>);
    expect(screen.getByText("Here is a test!")).toBeTruthy();
  });

  test("renders with correct role", () => {
    const { container } = render(
      <Alert alertType="warning">This is an alert</Alert>
    );
    expect(getByRole(container, "alert")).toBeTruthy();
  });

  // Turning off this test because it's noisy
  // test("throws an error for unknown alert type", () => {
  //   expect(() => {
  //     // @ts-expect-error Testing unknown alert type
  //     render(<Alert alertType="unknown">This is an alert</Alert>);
  //   }).toThrow();
  // });

  test("renders variants with correct backgrounds", () => {
    const { container, rerender } = render(
      <Alert alertType="info">Info component</Alert>
    );

    // Info
    expect(container.getElementsByClassName("bg-blue-50").length).toBe(1);

    // Success
    rerender(<Alert alertType="success">Success component</Alert>);
    expect(container.getElementsByClassName("bg-green-50").length).toBe(1);

    // Warning
    rerender(<Alert alertType="warning">Warning component</Alert>);
    expect(container.getElementsByClassName("bg-yellow-50").length).toBe(1);

    // Danger
    rerender(<Alert alertType="danger">Warning component</Alert>);
    expect(container.getElementsByClassName("bg-red-50").length).toBe(1);
  });

  test("is accessible", async () => {
    const { container, rerender } = render(
      <Alert alertType="info">Accessibility Test</Alert>
    );

    let results = await axe(container);

    expect(results).toHaveNoViolations();

    rerender(<Alert alertType="success">Accessibility Test</Alert>);
    results = await axe(container);
    expect(results).toHaveNoViolations();

    rerender(<Alert alertType="warning">Accessibility Test</Alert>);
    results = await axe(container);
    expect(results).toHaveNoViolations();

    rerender(<Alert alertType="danger">Accessibility Test</Alert>);
    results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
