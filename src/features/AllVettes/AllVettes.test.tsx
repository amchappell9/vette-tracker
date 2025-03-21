import { render, screen } from "@testing-library/react";
import AllVettes from "./AllVettes";
import { VetteObject } from "@/src/types";
import userEvent from "@testing-library/user-event";
import { act } from "react";

const mockVettes: VetteObject[] = [
  {
    id: 1,
    year: 2020,
    miles: 1000,
    cost: 50000,
    transmissionType: "Automatic",
    exteriorColor: "Red",
    interiorColor: "Black",
    submodel: "Z06",
    trim: "1LT",
    packages: [],
    link: "",
    createdDate: "2025-01-01T00:00:00Z",
    updatedDate: "2025-01-01T00:00:00Z",
    userId: "user1",
  },
  {
    id: 2,
    year: 2019,
    miles: 2000,
    cost: 45000,
    transmissionType: "Manual",
    exteriorColor: "Blue",
    interiorColor: "Gray",
    submodel: "Stingray",
    trim: "2LT",
    packages: [],
    link: "",
    createdDate: "2025-01-02T00:00:00Z",
    updatedDate: "2025-01-02T00:00:00Z",
    userId: "user2",
  },
  {
    id: 3,
    year: 2018,
    miles: 3000,
    cost: 40000,
    transmissionType: "Automatic",
    exteriorColor: "Black",
    interiorColor: "Red",
    submodel: "Grand Sport",
    trim: "3LT",
    packages: [],
    link: "",
    createdDate: "2025-01-03T00:00:00Z",
    updatedDate: "2025-01-03T00:00:00Z",
    userId: "user3",
  },
  {
    id: 4,
    year: 2017,
    miles: 4000,
    cost: 35000,
    transmissionType: "Manual",
    exteriorColor: "White",
    interiorColor: "Black",
    submodel: "Z06",
    trim: "2LT",
    packages: [],
    link: "",
    createdDate: "2025-01-04T00:00:00Z",
    updatedDate: "2025-01-04T00:00:00Z",
    userId: "user4",
  },
  {
    id: 5,
    year: 2016,
    miles: 5000,
    cost: 30000,
    transmissionType: "Automatic",
    exteriorColor: "Yellow",
    interiorColor: "Gray",
    submodel: "Stingray",
    trim: "1LT",
    packages: [],
    link: "",
    createdDate: "2025-01-05T00:00:00Z",
    updatedDate: "2025-01-05T00:00:00Z",
    userId: "user5",
  },
  {
    id: 6,
    year: 2015,
    miles: 6000,
    cost: 25000,
    transmissionType: "Manual",
    exteriorColor: "Green",
    interiorColor: "Black",
    submodel: "Grand Sport",
    trim: "3LT",
    packages: [],
    link: "",
    createdDate: "2025-01-06T00:00:00Z",
    updatedDate: "2025-01-06T00:00:00Z",
    userId: "user6",
  },
];

test("renders AddFirstVetteMessage when there are no vettes", () => {
  render(<AllVettes />);
  expect(screen.getByText(/add your first vette!/i)).toBeInTheDocument();
});

test("renders ListOfVettes with correct number of vettes per page", () => {
  render(<AllVettes />);
  // Test has double the number since text is rendered twice, once for mobile and once for desktop
  expect(screen.getAllByText(/corvette/i)).toHaveLength(10);
});

test("renders PaginationControls and handles page changes", async () => {
  const user = userEvent.setup();
  render(<AllVettes />);
  const nextPageButton = screen.getAllByRole("button", { name: /next/i })[0];
  await act(async () => {
    await user.click(nextPageButton);
  });
  expect(screen.getAllByText(/vette/i)).toHaveLength(2);
});
