import { render, screen } from "@testing-library/react";
import VetteItem from "./VetteItem";
import { VetteObject } from "@/src/types";
import { format } from "date-fns";

const mockVette: VetteObject = {
  id: 1,
  year: 2020,
  miles: 15000,
  cost: 60000,
  transmissionType: "Automatic",
  exteriorColor: "Red",
  interiorColor: "Black",
  submodel: "Stingray",
  trim: "3LT",
  packages: ["MRC", "NPP"],
  link: "http://example.com",
  createdDate: "2023-01-15T14:30:00",
  updatedDate: "2023-01-15T14:30:00",
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
    // Use local time for date construction to match display logic
    const createdDate = new Date(2023, 0, 15, 14, 30); // Jan is 0, 2:30 PM
    const formattedDate = format(createdDate, "MM/dd/yyyy 'at' h:mm a");
    expect(screen.getByText(`Added ${formattedDate}`)).toBeInTheDocument();
  });

  it("formats the date correctly when updated", () => {
    render(
      <VetteItem
        vette={{
          ...mockVette,
          updatedDate: new Date(2023, 0, 18, 9, 15).toISOString(), // 9:15 AM
        }}
        index={0}
        listLength={1}
      />
    );
    const formattedDate = format(
      new Date(2023, 0, 18, 9, 15),
      "MM/dd/yyyy 'at' h:mm a"
    );
    expect(screen.getByText(`Updated ${formattedDate}`)).toBeInTheDocument();
  });

  it("links to the correct place", () => {
    render(<VetteItem vette={mockVette} index={0} listLength={1} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/vettes/${mockVette.id}`);
  });
});
