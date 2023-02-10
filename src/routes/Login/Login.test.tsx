import { test, vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";

test("login form calls handle submit with correct values", async () => {
  const handleSubmit = vi.fn();

  render(
    <MemoryRouter>
      <Login handleAuth={handleSubmit} />
    </MemoryRouter>
  );

  // Setup user
  const user = userEvent.setup();

  // Enter email
  await user.type(screen.getByLabelText(/email/i), "Email Address:");

  // Enter password
  await user.type(screen.getByLabelText(/password/i), "Password");

  // Submit form
  await user.click(screen.getByRole("button", { name: /sign in/i }));

  // Assert that the form was submitted with the correct values
  expect(handleSubmit).toHaveBeenCalledWith(
    "Email Address:",
    "Password",
    expect.any(Function),
    expect.any(Function)
  );
});

// Should add tests for checking error, and with mocked functions
