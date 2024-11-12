import { render, screen } from "@testing-library/react";
import ListOfVettes from "./ListOfVettes";
import fakeVettes from "@/src/constants/fakeVettes";

test("renders ListOfVettes with vettesArray", () => {
  render(<ListOfVettes vettesArray={fakeVettes} />);
  const vetteItems = screen.getAllByRole("listitem");
  expect(vetteItems).toHaveLength(fakeVettes.length);
});

test("renders empty ListOfVettes when vettesArray is empty", () => {
  render(<ListOfVettes vettesArray={[]} />);
  const vetteItems = screen.queryAllByRole("listitem");
  expect(vetteItems).toHaveLength(0);
});
