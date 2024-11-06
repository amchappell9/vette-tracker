import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DropdownBtn from "./DropdownBtn";
import FILTER_TYPES from "@/src/constants/filterTypes";

describe("DropdownBtn", () => {
  const filter = {
    name: "Filter",
    type: FILTER_TYPES.SELECT,
    values: ["Option 1", "Option 2", "Option 3"],
  };

  const onFilterChange = jest.fn();

  test("renders DropdownBtn with default filter name", () => {
    render(<DropdownBtn filter={filter} onFilterChange={onFilterChange} />);
    expect(screen.getByText("Filter")).toBeInTheDocument();
  });

  test("opens dropdown menu on button click", () => {
    render(<DropdownBtn filter={filter} onFilterChange={onFilterChange} />);
    const button = screen.getByText("Filter");
    fireEvent.click(button);
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  test("selects an option and calls onFilterChange", () => {
    render(<DropdownBtn filter={filter} onFilterChange={onFilterChange} />);
    const button = screen.getByText("Filter");
    fireEvent.click(button);
    const option = screen.getAllByText("Option 2");
    fireEvent.click(option[0]);
    screen.getAllByText("Option 2");
    expect(onFilterChange).toHaveBeenCalled();
  });
});
