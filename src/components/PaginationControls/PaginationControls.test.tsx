import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PaginationControls from "./PaginationControls";

jest.mock("./usePagination", () => ({
  __esModule: true,
  default: jest.fn((params) => {
    const { currentPage, totalCount, pageSize } = params;
    const totalPages = Math.ceil(totalCount / pageSize);
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  }),
}));

describe("PaginationControls", () => {
  const defaultProps = {
    currentPage: 1,
    totalCount: 100,
    pageSize: 10,
    onPageChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders pagination info correctly", () => {
    render(<PaginationControls {...defaultProps} />);
    expect(screen.getByText(/Showing/)).toHaveTextContent(
      "Showing 1 to 10 of 100 results"
    );
  });

  it("renders correct number of page buttons including DOTS", () => {
    render(<PaginationControls {...defaultProps} />);
    const numberButtons = screen
      .getAllByRole("button")
      .filter(
        (button) =>
          !button.textContent?.includes("Previous") &&
          !button.textContent?.includes("Next")
      );
    expect(numberButtons).toHaveLength(6); // 1, 2, 3, 4, ..., 10
  });

  it("disables previous button on first page", () => {
    render(<PaginationControls {...defaultProps} />);
    const prevButtons = screen.getAllByText("Previous");
    prevButtons.forEach((button) => {
      expect(button.closest("button")).toBeDisabled();
    });
  });

  it("disables next button on last page", () => {
    render(<PaginationControls {...defaultProps} currentPage={10} />);
    const nextButtons = screen.getAllByText("Next");
    nextButtons.forEach((button) => {
      expect(button.closest("button")).toBeDisabled();
    });
  });

  it("calls onPageChange with correct value when clicking next", async () => {
    const user = userEvent.setup();
    render(<PaginationControls {...defaultProps} />);
    await user.click(screen.getAllByText("Next")[0]);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });

  it("calls onPageChange with correct value when clicking previous", async () => {
    const user = userEvent.setup();
    render(<PaginationControls {...defaultProps} currentPage={2} />);
    await user.click(screen.getAllByText("Previous")[0]);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(1);
  });

  it("calls onPageChange with correct page number when clicking numbered button", async () => {
    const user = userEvent.setup();
    render(<PaginationControls {...defaultProps} />);
    await user.click(screen.getByText("3"));
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(3);
  });

  it("handles last page range correctly", () => {
    render(<PaginationControls {...defaultProps} currentPage={10} />);
    expect(screen.getByText(/Showing/)).toHaveTextContent(
      "Showing 91 to 100 of 100 results"
    );
  });

  it("renders DOTS correctly when there are many pages", () => {
    render(<PaginationControls {...defaultProps} currentPage={5} />);
    expect(screen.getAllByText("...")).toHaveLength(2);
  });
});
