import { render, screen } from "@testing-library/react";
import PaginationButton, { BUTTON_STATES } from "./PaginationButton";
import userEvent from "@testing-library/user-event";

describe("PaginationButton", () => {
  it("renders default button with number", () => {
    render(<PaginationButton number={1} />);
    expect(screen.getByRole("button")).toHaveTextContent("1");
  });

  it("renders previous button", () => {
    render(<PaginationButton state={BUTTON_STATES.PREV} />);
    expect(screen.getByText("Previous")).toBeInTheDocument();
  });

  it("renders next button", () => {
    render(<PaginationButton state={BUTTON_STATES.NEXT} />);
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("calls onChange when clicked", async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    render(<PaginationButton onChange={mockOnChange} number={0} />);
    await user.click(screen.getByText("0"));
    expect(mockOnChange).toHaveBeenCalled();
  });

  it("does not call onChange when disabled", async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    render(<PaginationButton disabled onChange={mockOnChange} />);
    await user.click(screen.getByRole("button"));
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it("applies active styles when active prop is true", () => {
    render(<PaginationButton active number={1} />);
    expect(screen.getByRole("button")).toHaveClass("bg-red-50");
  });

  it("applies correct aria attributes when active", () => {
    render(<PaginationButton active number={1} />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-current", "page");
  });

  it("applies disabled styles and attributes", () => {
    render(<PaginationButton disabled number={1} />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-disabled", "true");
  });
});
