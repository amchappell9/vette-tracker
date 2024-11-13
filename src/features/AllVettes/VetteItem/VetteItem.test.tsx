import { render, screen } from "@testing-library/react";
import VetteItem from "./VetteItem";
import { VetteObject } from "@/src/types";
import { format } from "date-fns";

const mockVette: VetteObject = {
  id: "1",
  year: "2020",
  miles: "15000",
  cost: "60000",
  transmissionType: "Automatic",
  exteriorColor: "Red",
  interiorColor: "Black",
  submodel: "Stingray",
  trim: "3LT",
  packages: ["MRC", "NPP"],
  link: "http://example.com",
  date: "01-01-2023",
  userId: "user1",
};

describe("VetteItem", () => {
  it("renders the VetteItem component", () => {
    render(<VetteItem vette={mockVette} index={0} listLength={1} />);
    expect(screen.getByText("2020 Corvette Stingray")).toBeInTheDocument();
    expect(screen.getAllByText("$60,000")).toHaveLength(2);
    expect(screen.getByText("15,000 Miles")).toBeInTheDocument();
    expect(screen.getByText("Red on Black Interior")).toBeInTheDocument();
    expect(screen.getByText("3LT")).toBeInTheDocument();
    expect(screen.getByText("MRC")).toBeInTheDocument();
  });

  it("formats the date correctly", () => {
    render(<VetteItem vette={mockVette} index={0} listLength={1} />);
    const formattedDate = format(new Date(mockVette.date), "MM/dd/yyyy");
    expect(screen.getByText(`Added ${formattedDate}`)).toBeInTheDocument();
  });

  it("links to the correct place", () => {
    render(<VetteItem vette={mockVette} index={0} listLength={1} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/vettes/${mockVette.id}`);
  });
});
