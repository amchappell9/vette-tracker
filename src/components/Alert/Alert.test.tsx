import { getByRole, render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { axe } from "vitest-axe";
import Alert from "./Alert";

test("renders with correct text", () => {
  render(<Alert alertType="info" message="Here is a test!" />);
  expect(screen.getByText("Here is a test!")).toBeTruthy();
});

test("renders with correct role", () => {
  const { container } = render(
    <Alert alertType="warning" message="This is an alert" />
  );

  expect(getByRole(container, "alert")).toBeTruthy();
});

test("renders variants with correct backgrounds", () => {
  const { container, rerender } = render(
    <Alert alertType="info" message="Info component" />
  );

  // Info
  expect(container.getElementsByClassName("bg-blue-50").length).toBe(1);

  // success
  rerender(<Alert alertType="success" message="Success component" />);
  expect(container.getElementsByClassName("bg-green-50").length).toBe(1);

  // Warning
  rerender(<Alert alertType="warning" message="Warning component" />);
  expect(container.getElementsByClassName("bg-yellow-50").length).toBe(1);

  // Danger
  rerender(<Alert alertType="danger" message="Warning component" />);
  expect(container.getElementsByClassName("bg-red-50").length).toBe(1);
});

// component is accessible
test("is accessible", async () => {
  const { container, rerender } = render(
    <Alert alertType="success" message="Here is an alert!" />
  );
  let results = await axe(container);
  expect(results).toHaveNoViolations();

  rerender(<Alert alertType="success" message="Here is an alert!" />);
  results = await axe(container);
  expect(results).toHaveNoViolations();

  rerender(<Alert alertType="warning" message="Here is an alert!" />);
  results = await axe(container);
  expect(results).toHaveNoViolations();

  rerender(<Alert alertType="danger" message="Here is an alert!" />);
  results = await axe(container);
  expect(results).toHaveNoViolations();
});
