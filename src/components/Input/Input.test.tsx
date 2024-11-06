import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "./Input";
import { act } from "react";

describe("Input", () => {
  test("renders a normal input", () => {
    render(<Input name="test" />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("formats miles correctly", async () => {
    const user = userEvent.setup();
    const { getByDisplayValue, getByRole } = render(
      <label>
        Test
        <Input name="test" maskType="miles" />
      </label>
    );
    // const input = getByRole("textbox");

    await act(async () => {
      await user.click(screen.getByLabelText("Test"));
      await user.keyboard("1234567");
    });

    expect(await getByDisplayValue("1,234,567")).toBeInTheDocument();
  });

  test("formats dollars correctly", async () => {
    const user = userEvent.setup();
    const { getByDisplayValue, getByRole } = render(
      <label>
        Test
        <Input name="test" maskType="dollar" />
      </label>
    );

    await act(async () => {
      await user.click(screen.getByLabelText("Test"));
      await user.keyboard("1234567");
    });

    expect(await getByDisplayValue("$1,234,567")).toBeInTheDocument();
  });

  test("applies custom className when provided", () => {
    render(<Input name="test" className="custom-class" />);
    expect(screen.getByRole("textbox")).toHaveClass("custom-class");
  });

  test("applies error class when haserror is true", () => {
    render(<Input name="test" haserror />);
    expect(screen.getByRole("textbox")).toHaveClass("border-red-500");
  });
});
