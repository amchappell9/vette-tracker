import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "./Input";

describe("Input", () => {
  test("renders a normal input", () => {
    render(<Input name="test" />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("renders values properly", () => {
    render(<Input name="test" value="test value" onChange={vi.fn()} />);
    expect(screen.getByDisplayValue("test value")).toBeInTheDocument();
  });

  test("calls onChange when input is changed", async () => {
    const onChange = vi.fn();
    render(<Input name="test" onChange={onChange} />);
    await userEvent.type(screen.getByRole("textbox"), "test");
    expect(onChange).toHaveBeenCalled();
  });

  test("formats miles correctly", async () => {
    const user = userEvent.setup();
    const { getByDisplayValue } = render(
      <label>
        Test
        <Input name="test" maskType="miles" />
      </label>,
    );

    await user.click(screen.getByLabelText("Test"));
    await user.keyboard("1234567");

    expect(await getByDisplayValue("1,234,567")).toBeInTheDocument();
  });

  test("formats dollars correctly", async () => {
    const user = userEvent.setup();
    const { getByDisplayValue } = render(
      <label>
        Test
        <Input name="test" maskType="dollar" />
      </label>,
    );

    await user.click(screen.getByLabelText("Test"));
    await user.keyboard("1234567");

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
