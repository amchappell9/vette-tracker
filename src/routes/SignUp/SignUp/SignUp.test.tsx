import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import SignUp from "./SignUp";
import { axe } from "vitest-axe";
import { test, vi, expect, it } from "vitest";

test("sign up form calls handle submit with correct values", async () => {
  const handleSubmit = vi.fn();

  render(
    <MemoryRouter>
      <SignUp handleSignUp={handleSubmit} />
    </MemoryRouter>
  );

  // Setup user
  const user = userEvent.setup();

  // Enter first name
  await user.type(screen.getByLabelText(/first name/i), "Austin");

  // Enter last name
  await user.type(screen.getByLabelText(/last name/i), "Chappell");

  // Enter email
  await user.type(screen.getByLabelText(/email/i), "amchappell9@yahoo.com");

  // Enter password
  await user.type(screen.getByLabelText("Password"), "password");

  // Enter confirm password
  await user.type(screen.getByLabelText(/confirm password/i), "password");

  // Submit form
  await user.click(screen.getByRole("button", { name: /sign up/i }));

  // Assert that the form was submitted with the correct values
  expect(handleSubmit).toHaveBeenCalledWith(
    "amchappell9@yahoo.com",
    "password",
    expect.any(Function),
    expect.any(Function)
  );
});

it("is accessible", async () => {
  const { container } = render(
    <MemoryRouter>
      <SignUp handleSignUp={() => null} />
    </MemoryRouter>
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

// The email address should be valid
test("email address should be valid", async () => {
  render(
    <MemoryRouter>
      <SignUp handleSignUp={() => null} />
    </MemoryRouter>
  );

  // Setup user
  const user = userEvent.setup();

  // Enter email
  await user.type(screen.getByLabelText(/email/i), "notanemailaddress");

  // Submit form
  await user.click(screen.getByRole("button", { name: /sign up/i }));

  // Check that error message is displayed
  expect(screen.getByText(/Please enter a valid email address/i));
  // ).toBeInTheDocument();
});
