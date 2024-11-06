import { render } from "@testing-library/react";
import Card from "./Card";

describe("Card", () => {
  test("renders children", () => {
    const text = <h1>Heading</h1>;

    const { getByText } = render(<Card>{text}</Card>);

    getByText("Heading");
  });
});
