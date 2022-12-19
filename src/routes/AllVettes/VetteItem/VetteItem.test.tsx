import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { MemoryRouter } from "react-router-dom";
import { VetteObject } from "../../../types/types";
import VetteItem from "./VetteItem";

const vette: VetteObject = {
  year: "2014",
  miles: "20000",
  cost: "46000",
  transmissionType: "Manual",
  exteriorColor: "Laguna Blue",
  interiorColor: "Red",
  submodel: "Z51",
  trim: "3LT",
  packages: ["NPP", "MRC", "PDR"],
  link: "https://www.corvetteforum.com/forums/c7-corvettes-for-sale/4613494-2014-z51-m7-3lt-mag-ride-laguna-blue-21k-mi-46000-nc.html",
  id: "324888926111138385",
  date: "03-01-2022",
  userId: "35467dac-767d-48b2-ac3c-e1e08e30b581",
};

// Test that it displays all of the vette data
it("displays all of the vette data", async () => {
  render(
    <MemoryRouter>
      <VetteItem vette={vette} index={0} listLength={1} />
    </MemoryRouter>
  );

  screen.getByText("2014 Corvette Z51");
  screen.getByText("Added 03/01/2022");
  screen.getAllByText("$46,000");
  screen.getByText("20,000 Miles");
  screen.getAllByText("Z51");
  screen.getAllByText("3LT");
  screen.getByText("Laguna Blue on Red Interior");
  screen.getByText("NPP");
  screen.getByText("MRC");
  screen.getByText("PDR");
});

it("is accessible", async () => {
  const { container } = render(
    <MemoryRouter>
      <ul>
        <VetteItem vette={vette} index={0} listLength={1} />
      </ul>
    </MemoryRouter>
  );
  expect(await axe(container)).toHaveNoViolations();
});
